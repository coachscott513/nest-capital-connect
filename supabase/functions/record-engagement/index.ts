// Server-side ingestion path for first-party engagement events.
//
// browser -> record-engagement -> validate -> sanitize -> classify -> rate-limit
//         -> idempotent service-role insert
//
// The browser can no longer write to public.engagement_events directly (INSERT
// was revoked from anon/authenticated). Everything below is the only writer.
//
// Privacy contract enforced here (never persisted):
//   full user agent, full referrer URL, raw search terms, query strings,
//   fragments, form content, email, phone, name, address, tokens, raw IP.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const FP_SECRET = Deno.env.get("ENGAGEMENT_FINGERPRINT_SECRET") || "";
const TEST_TOKEN = Deno.env.get("ENGAGEMENT_TEST_TOKEN") || "";

const SCHEMA_VERSION = 2;

/* ------------------------------------------------------------------ input */

const SAFE_TEXT = /^[a-z0-9 ._\-\/&']{0,120}$/i;

const BodySchema = z.object({
  event_id: z.string().uuid(),
  event_type: z.string().min(2).max(64).regex(/^[a-z_]+$/),
  event_schema_version: z.number().int().min(1).max(9).optional(),
  region_slug: z.string().max(64).optional(),
  business_id: z.string().uuid().nullable().optional(),
  business_slug: z.string().max(160).nullable().optional(),
  town_slug: z.string().max(80).nullable().optional(),
  service_slug: z.string().max(80).nullable().optional(),
  route_path: z.string().max(300).nullable().optional(),
  result_count: z.number().int().min(0).max(100000).nullable().optional(),
  referrer_host: z.string().max(160).nullable().optional(),
  /** Rotating, anonymous per-visit token. Never tied to an identity. */
  session_id: z.string().uuid().nullable().optional(),
  /**
   * Landing utm_source, host-shaped only. It is checked against the assistant
   * allowlist and can ONLY ever produce `ai_assistant_utm` — a client can never
   * set `ai_assistant`, `organic_search` or any other trusted value.
   */
  utm_source_hint: z.string().max(80).nullable().optional(),
  client_bot_signal: z.boolean().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});


// Only these metadata keys survive. Everything else is dropped silently.
const METADATA_ALLOWLIST = new Set([
  "source_location",
  "form_location",
  "search_type",
  "intent_type",
  "category_slug",
  "business_category",
  "property_type",
  "urgency",
  "query_length_bucket",
  "zero_result",
  "tier",
  "story_id",
  "story_category",
  "has_video",
  "video_provider",
  "product_type",
  "product_category",
  "report_type",
  "success",
  "intent_category",
  "claim_step",
  "surface",
]);

const CONVERSION_EVENTS = new Set([
  "contact_form_submit",
  "newsletter_signup",
  "financial_intro_submit",
  "claim_started",
  "claim_submitted",
  "pricing_click",
]);

/* -------------------------------------------------------------- utilities */

const BOT_UA =
  /(bot|crawl|spider|slurp|preview|facebookexternalhit|slackbot|whatsapp|telegram|embedly|headless|phantomjs|puppeteer|playwright|selenium|cypress|lighthouse|pagespeed|gtmetrix|pingdom|uptimerobot|scrapy|python-requests|curl\/|wget\/|node-fetch|axios\/|okhttp|java\/|go-http-client|prerender|wkhtmltopdf)/i;

function deviceClass(ua: string): string {
  if (!ua) return "unknown";
  if (/ipad|tablet|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|android|ipod/i.test(ua)) return "mobile";
  return "desktop";
}

function browserFamily(ua: string): string {
  if (!ua) return "unknown";
  if (/edg\//i.test(ua)) return "edge";
  if (/opr\/|opera/i.test(ua)) return "opera";
  if (/firefox\//i.test(ua)) return "firefox";
  if (/chrome\/|crios/i.test(ua)) return "chrome";
  if (/safari\//i.test(ua)) return "safari";
  return "other";
}

/** Host only — never a full URL, never a query string or fragment. */
function hostOnly(value: string | null | undefined): string | null {
  if (!value) return null;
  const raw = value.trim();
  if (!raw) return null;
  try {
    const host = raw.includes("://") ? new URL(raw).hostname : raw.split("/")[0];
    const clean = host.toLowerCase().replace(/^www\./, "").split("?")[0].split("#")[0];
    return /^[a-z0-9.\-]{1,160}$/.test(clean) ? clean : null;
  } catch {
    return null;
  }
}

/**
 * Explicit allowlist of normalized assistant hosts. Host only — never a full URL,
 * never a query string. Anything not on this list is NOT called an AI referral.
 */
const AI_ASSISTANT_HOSTS = new Set([
  "chatgpt.com",
  "chat.openai.com",
  "openai.com",
  "perplexity.ai",
  "claude.ai",
  "anthropic.com",
  "copilot.microsoft.com",
  "gemini.google.com",
  "bard.google.com",
  "you.com",
  "phind.com",
  "poe.com",
  "chat.mistral.ai",
  "chat.deepseek.com",
  "grok.com",
  "x.ai",
  "kagi.com",
]);

function trafficSource(host: string | null): string {
  if (!host) return "direct";
  if (AI_ASSISTANT_HOSTS.has(host)) return "ai_assistant";
  if (/(^|\.)(google|bing|duckduckgo|yahoo|ecosia|brave)\./.test(host + ".")) return "organic_search";
  if (/(^|\.)(facebook|instagram|linkedin|x|twitter|t|reddit|tiktok|pinterest|youtube)\./.test(host + "."))
    return "social";
  if (/capitaldistrictnest\.com$|lovable\.app$|localhost/.test(host)) return "internal";
  return "referral";
}

/** Strip query strings and fragments from any route we persist. */
function safeRoute(value: string | null | undefined): string | null {
  if (!value) return null;
  const path = value.split("?")[0].split("#")[0].trim();
  if (!path.startsWith("/")) return null;
  return path.slice(0, 200);
}

function sanitizeMetadata(input: Record<string, unknown> = {}) {
  const out: Record<string, string | number | boolean> = {};
  let count = 0;
  for (const [k, v] of Object.entries(input)) {
    if (count >= 15) break;
    if (!METADATA_ALLOWLIST.has(k)) continue;
    if (v === null || v === undefined || v === "") continue;
    if (typeof v === "boolean") out[k] = v;
    else if (typeof v === "number") out[k] = Number.isFinite(v) ? v : 0;
    else if (typeof v === "string") {
      const s = v.slice(0, 120);
      // Reject anything that smells like contact data or free text with PII.
      if (/@|\+?\d[\d\s().-]{6,}/.test(s)) continue;
      if (!SAFE_TEXT.test(s)) continue;
      out[k] = s;
    } else continue;
    count++;
  }
  return out;
}

async function hmacFingerprint(ip: string): Promise<string | null> {
  if (!ip || !FP_SECRET) return null;
  const daySalt = new Date().toISOString().slice(0, 10);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(FP_SECRET + daySalt),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/* ------------------------------------------------------------------ serve */

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    if (req.method !== "POST") return json({ error: "method not allowed" }, 405);

    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > 8000) return json({ error: "payload too large" }, 413);

    const parsed = BodySchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return json({ error: "invalid payload", details: parsed.error.flatten().fieldErrors }, 400);
    }
    const body = parsed.data;

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // ---- 1. event registry gate (DB is still the final authority via FK) ----
    const { data: registryRow } = await admin
      .from("engagement_event_types")
      .select("event_type, is_active")
      .eq("event_type", body.event_type)
      .maybeSingle();
    if (!registryRow || registryRow.is_active !== true) {
      return json({ error: "unknown or inactive event_type" }, 400);
    }

    // ---- 2. classification --------------------------------------------------
    const ua = req.headers.get("user-agent") || "";
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "";

    let traffic_class: "consumer" | "internal_test" | "bot" | "unknown" = "consumer";
    if (!ua) traffic_class = "unknown";
    if (BOT_UA.test(ua) || body.client_bot_signal === true) traffic_class = "bot";

    // internal_test can ONLY be set server-side, from one of three sources:
    //   (a) a signed test token held only by the server,
    //   (b) an authenticated admin session,
    //   (c) an approved non-public test environment (local dev / id-preview host).
    // A public visitor on the production domain can never be labelled a test.
    let internal_test = false;
    const testTokenHeader = req.headers.get("x-engagement-test-token") || "";
    const originHost = hostOnly(req.headers.get("origin") || req.headers.get("referer"));
    const isApprovedTestOrigin =
      !!originHost && (/^localhost(:\d+)?$/.test(originHost) || originHost.startsWith("id-preview--"));

    if (TEST_TOKEN && testTokenHeader && testTokenHeader === TEST_TOKEN) {
      internal_test = true;
    } else if (isApprovedTestOrigin) {
      internal_test = true;
    } else {
      const authHeader = req.headers.get("Authorization") || "";
      const bearer = authHeader.replace(/^Bearer\s+/i, "");
      if (bearer && bearer !== ANON_KEY) {
        const userClient = createClient(SUPABASE_URL, ANON_KEY, {
          global: { headers: { Authorization: `Bearer ${bearer}` } },
          auth: { persistSession: false },
        });
        const { data: userData } = await userClient.auth.getUser();
        const uid = userData?.user?.id;
        if (uid) {
          const { data: isAdmin } = await admin.rpc("has_role", {
            _user_id: uid,
            _role: "admin",
          });
          if (isAdmin === true) internal_test = true;
        }
      }
    }

    // A verified internal test session (admin JWT or signed token) is stronger
    // evidence than a user-agent heuristic, so it wins over the bot verdict.
    if (internal_test) traffic_class = "internal_test";

    // ---- 3. rate limit (rotating HMAC fingerprint, never raw IP) -----------
    if (traffic_class === "consumer") {
      const fingerprint = await hmacFingerprint(ip);
      if (fingerprint) {
        const bucket = CONVERSION_EVENTS.has(body.event_type) ? "conversion" : "general";
        const limit = bucket === "conversion" ? 20 : 150;
        const windowStart = new Date(Math.floor(Date.now() / 600000) * 600000).toISOString();
        const { data: rl } = await admin
          .from("engagement_rate_limits")
          .select("hits")
          .eq("fingerprint", fingerprint)
          .eq("bucket", bucket)
          .eq("window_start", windowStart)
          .maybeSingle();
        const hits = (rl?.hits ?? 0) + 1;
        if (hits > limit) return json({ ok: true, throttled: true });
        await admin.from("engagement_rate_limits").upsert(
          {
            fingerprint,
            bucket,
            window_start: windowStart,
            hits,
            expires_at: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
          },
          { onConflict: "fingerprint,bucket,window_start" },
        );
        // Opportunistic cleanup so rate-limit state never outlives 48h.
        if (Math.random() < 0.02) {
          await admin.from("engagement_rate_limits").delete().lt("expires_at", new Date().toISOString());
        }
      }
    }

    // ---- 4. business attribution (must resolve to a real row) --------------
    let business_id: string | null = null;
    let business_slug: string | null = null;
    if (body.business_id) {
      const { data: biz } = await admin
        .from("businesses")
        .select("id, slug")
        .eq("id", body.business_id)
        .maybeSingle();
      if (biz) {
        business_id = biz.id;
        business_slug = biz.slug ?? null;
      }
    }
    if (!business_slug && body.business_slug) {
      // Display/reference context only — never treated as canonical identity.
      business_slug = String(body.business_slug).slice(0, 160).toLowerCase();
    }

    // ---- 5. sanitize + insert (idempotent) ---------------------------------
    const referrer_host = hostOnly(body.referrer_host ?? req.headers.get("referer"));

    const row = {
      event_id: body.event_id,
      event_type: body.event_type,
      event_schema_version: SCHEMA_VERSION,
      region_slug: body.region_slug?.slice(0, 64) || "capital-district",
      business_id,
      business_slug,
      town_slug: body.town_slug ? String(body.town_slug).slice(0, 80).toLowerCase() : null,
      service_slug: body.service_slug ? String(body.service_slug).slice(0, 80).toLowerCase() : null,
      route_path: safeRoute(body.route_path),
      result_count: body.result_count ?? null,
      traffic_class,
      referrer_host,
      traffic_source: trafficSource(referrer_host),
      device_class: deviceClass(ua),
      browser_family: browserFamily(ua),
      internal_test,
      metadata: sanitizeMetadata(body.metadata),
      // v1 columns are deprecated and must stay null on every new write.
      user_agent: null,
      referrer: null,
    };

    const { error } = await admin
      .from("engagement_events")
      .upsert(row, { onConflict: "event_id", ignoreDuplicates: true });

    if (error) {
      console.error("record-engagement insert failed", error.message);
      return json({ ok: false }, 200);
    }

    return json({ ok: true, event_id: body.event_id, traffic_class, internal_test });
  } catch (err) {
    console.error("record-engagement error", (err as Error)?.message);
    return json({ ok: false }, 200);
  }
});
