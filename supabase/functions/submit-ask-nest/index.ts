// Ask Nest — structured business-information request intake.
//
// browser -> submit-ask-nest -> validate -> rate limit -> split PII from analytics
//         -> ask_nest_requests (private, admin/service-role only)
//         -> engagement_events (metadata only, never PII)
//
// Data minimization (accepted contract):
//   - `report_incorrect` may be fully anonymous: no name, no email, no phone.
//   - every other request type needs a name plus EXACTLY ONE reachable
//     contact method (email OR phone). Both are never required.
//
// Privacy contract:
//   message, name, email, phone NEVER reach engagement_events.
//   Technical attribution is derived server-side: first from the visitor's own
//   earliest recorded engagement event for this anonymous session, otherwise
//   from the Referer header against an allowlist. A client field can never set
//   trusted attribution. Self-reported discovery is stored as self-report only.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const REQUEST_TYPES = [
  "verify_operating",
  "current_contact",
  "ask_about_service",
  "find_similar",
  "report_incorrect",
  "real_estate_town",
  "other_local_help",
] as const;

const DISCOVERY = [
  "google",
  "chatgpt",
  "other_ai_assistant",
  "social_media",
  "another_website",
  "person_referral",
  "already_knew",
  "other",
] as const;

const emptyToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

const BodySchema = z.object({
  request_type: z.enum(REQUEST_TYPES),
  business_slug: z.string().max(160).nullable().optional(),
  town_slug: z.string().max(80).nullable().optional(),
  service_intent: z.string().max(80).nullable().optional(),
  message: z.string().min(2).max(2000),
  contact_name: z.preprocess(emptyToUndefined, z.string().min(1).max(120).optional()),
  contact_email: z.preprocess(emptyToUndefined, z.string().email().max(200).optional()),
  contact_phone: z.preprocess(emptyToUndefined, z.string().min(7).max(40).optional()),
  self_reported_discovery: z.preprocess(emptyToUndefined, z.enum(DISCOVERY).optional()),
  session_id: z.preprocess(emptyToUndefined, z.string().uuid().optional()),
  // Honeypot: must stay empty. Bots fill it.
  website: z.preprocess(emptyToUndefined, z.string().max(200).optional()),
});

/** Allowlisted normalized AI-assistant hosts. Host only — never a full URL. */
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

function hostOnly(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const host = value.includes("://") ? new URL(value).hostname : value.split("/")[0];
    const clean = host.toLowerCase().replace(/^www\./, "").split("?")[0].split("#")[0];
    return /^[a-z0-9.\-]{1,160}$/.test(clean) ? clean : null;
  } catch {
    return null;
  }
}

function classifyHost(host: string | null): string {
  if (!host) return "direct";
  if (AI_ASSISTANT_HOSTS.has(host)) return "ai_assistant";
  if (/(^|\.)(google|bing|duckduckgo|yahoo|ecosia|brave)\./.test(host + ".")) return "organic_search";
  if (/(^|\.)(facebook|instagram|linkedin|x|twitter|t|reddit|tiktok|pinterest|youtube)\./.test(host + "."))
    return "social";
  if (/capitaldistrictnest\.com$|lovable\.app$|localhost/.test(host)) return "internal";
  return "referral";
}

/**
 * utm_source is read from the Referer's own query string only (server-side) and
 * only when it names an allowlisted assistant host. Nothing else is stored.
 */
function trustedSourceFamily(referer: string | null): string {
  const host = hostOnly(referer);
  if (host && AI_ASSISTANT_HOSTS.has(host)) return "ai_assistant";
  if (referer) {
    try {
      const utm = new URL(referer).searchParams.get("utm_source")?.toLowerCase() ?? "";
      const utmHost = hostOnly(utm);
      if (utmHost && AI_ASSISTANT_HOSTS.has(utmHost)) return "ai_assistant";
    } catch {
      /* ignore */
    }
  }
  return classifyHost(host);
}

/** Coarse, salted, non-reversible fingerprint. Never stored alongside PII. */
async function fingerprint(req: Request): Promise<string> {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("cf-connecting-ip") ??
    "unknown";
  const ua = req.headers.get("user-agent") ?? "unknown";
  const salt = SERVICE_ROLE_KEY.slice(0, 24);
  const bytes = new TextEncoder().encode(`${salt}|${ip}|${ua}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    if (req.method !== "POST") return json({ error: "method not allowed" }, 405);
    if (Number(req.headers.get("content-length") || 0) > 12000) {
      return json({ error: "payload too large" }, 413);
    }

    const parsed = BodySchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return json({ error: "invalid payload", details: parsed.error.flatten().fieldErrors }, 400);
    }
    const body = parsed.data;

    // Honeypot — accept silently so bots learn nothing, store nothing.
    if (body.website) return json({ ok: true });

    // --- data minimization rules --------------------------------------------
    const anonymousAllowed = body.request_type === "report_incorrect";
    const hasContact = Boolean(body.contact_email || body.contact_phone);
    const hasName = Boolean(body.contact_name);
    if (!anonymousAllowed && (!hasName || !hasContact)) {
      return json(
        {
          error: "contact required",
          details: { contact: ["Provide your name and either an email address or a phone number."] },
        },
        400,
      );
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

    // --- rate limit: 5 requests per rolling hour per coarse fingerprint ------
    const fp = await fingerprint(req);
    const now = new Date();
    const { data: limitRow } = await admin
      .from("ask_nest_rate_limits")
      .select("fingerprint, window_start, hits")
      .eq("fingerprint", fp)
      .maybeSingle();

    const windowOpen =
      limitRow && new Date(limitRow.window_start as string).getTime() > now.getTime() - 60 * 60 * 1000;

    if (windowOpen && (limitRow!.hits as number) >= 5) {
      return json({ error: "rate limited", retry_after_minutes: 60 }, 429);
    }

    await admin.from("ask_nest_rate_limits").upsert(
      {
        fingerprint: fp,
        window_start: windowOpen ? (limitRow!.window_start as string) : now.toISOString(),
        hits: windowOpen ? (limitRow!.hits as number) + 1 : 1,
        expires_at: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      },
      { onConflict: "fingerprint" },
    );

    // Resolve the business only against a real row — never trust a client id.
    let business_id: string | null = null;
    let town_slug = body.town_slug ?? null;
    if (body.business_slug) {
      const { data: biz } = await admin
        .from("businesses")
        .select("id, town_slug")
        .eq("slug", body.business_slug)
        .maybeSingle();
      if (biz) {
        business_id = biz.id as string;
        town_slug = town_slug ?? ((biz.town_slug as string | null) ?? null);
      }
    }

    const technical_source_family = trustedSourceFamily(req.headers.get("referer"));

    // --- first-touch attribution: server-side lookup, never client-asserted --
    let first_touch_source: string | null = null;
    let first_touch_evidence = "unavailable";
    if (body.session_id) {
      const { data: firstEvent } = await admin
        .from("engagement_events")
        .select("traffic_source, referrer_host, created_at")
        .eq("session_id", body.session_id)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (firstEvent) {
        first_touch_source =
          (firstEvent.traffic_source as string | null) ??
          classifyHost(hostOnly(firstEvent.referrer_host as string | null));
        first_touch_evidence = "server_session_lookup";
      }
    }
    if (!first_touch_source) {
      first_touch_source = technical_source_family;
      first_touch_evidence = "server_referer_only";
    }

    // --- PII path: private request table -------------------------------------
    const { data: inserted, error } = await admin
      .from("ask_nest_requests")
      .insert({
        request_type: body.request_type,
        business_id,
        business_slug: body.business_slug ?? null,
        town_slug,
        service_intent: body.service_intent ?? null,
        message: body.message,
        contact_name: body.contact_name ?? null,
        contact_email: body.contact_email ?? null,
        contact_phone: body.contact_phone ?? null,
        self_reported_discovery: body.self_reported_discovery ?? null,
        technical_source_family,
        session_id: body.session_id ?? null,
        first_touch_source,
        first_touch_evidence,
      })
      .select("id")
      .single();

    if (error) {
      console.error(`ask_nest_requests insert failed: ${error.message}`);
      return json({ error: "could not store request", details: error.message }, 500);
    }

    // --- analytics path: metadata only, no message, no contact details -------
    await admin.from("engagement_events").insert({
      event_id: crypto.randomUUID(),
      event_type: "ask_nest_submit",
      event_schema_version: 2,
      business_id,
      business_slug: body.business_slug ?? null,
      town_slug,
      route_path: body.business_slug ? `/biz/${body.business_slug}` : null,
      traffic_class: "consumer",
      traffic_source: technical_source_family,
      session_id: body.session_id ?? null,
      metadata: {
        intent_category: body.request_type,
        // Self-report is stored as self-report — it never becomes traffic_source.
        surface: "ask_nest",
        first_touch_source,
        first_touch_evidence,
        anonymous: !hasContact,
      },
    });

    // --- founder notification (best effort, never blocks the request) --------
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Capital District Nest <team@capitaldistrictnest.com>",
            to: ["team@capitaldistrictnest.com"],
            subject: `Ask Nest: ${body.request_type.replace(/_/g, " ")}${
              body.business_slug ? ` — ${body.business_slug}` : ""
            }`,
            text: [
              `A new Ask Nest request is waiting. Due within one business day.`,
              ``,
              `Type: ${body.request_type}`,
              `Business: ${body.business_slug ?? "—"}`,
              `Town: ${town_slug ?? "—"}`,
              ``,
              `Message:`,
              body.message,
              ``,
              `From: ${body.contact_name ?? "Anonymous"}`,
              `Email: ${body.contact_email ?? "—"}`,
              `Phone: ${body.contact_phone ?? "—"}`,
              ``,
              `Open the queue: https://www.capitaldistrictnest.com/admin/ask-nest`,
            ].join("\n"),
          }),
        });
      } catch (notifyError) {
        console.error("ask nest notification failed", notifyError);
      }
    }

    return json({ ok: true, id: inserted.id });
  } catch (e) {
    console.error("submit-ask-nest failed", e);
    return json({ error: "unexpected error", details: String(e) }, 500);
  }
});
