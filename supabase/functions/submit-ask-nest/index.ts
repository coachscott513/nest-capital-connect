// Ask Nest — structured business-information request intake.
//
// browser -> submit-ask-nest -> validate -> rate limit -> split PII from analytics
//         -> ask_nest_requests (private, admin/service-role only)
//         -> engagement_events (metadata only, never PII)
//         -> founder notification (subject/metadata only, no message body)
//
// Privacy contract:
//   message, name, email, phone NEVER reach engagement_events.
//   Technical attribution is derived server-side from the Referer against an
//   allowlist, or from the first server-recorded event of the same anonymous
//   session. A client field can never set trusted attribution.
//   Self-reported discovery is stored as self-report and is never promoted.
//
// Data minimization:
//   name + (email OR phone) required. Correction reports may be anonymous.
//
// Retention:
//   contact details and message text are erased 180 days after a request is
//   resolved/closed via public.purge_ask_nest_pii().
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_TO = Deno.env.get("ASK_NEST_NOTIFY_TO") || "team@capitaldistrictnest.com";
const NOTIFY_FROM = Deno.env.get("LEAD_NOTIFY_FROM") || "Capital District Nest <onboarding@resend.dev>";

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

const BodySchema = z
  .object({
    request_type: z.enum(REQUEST_TYPES),
    business_slug: z.string().max(160).nullable().optional(),
    town_slug: z.string().max(80).nullable().optional(),
    service_intent: z.string().max(80).nullable().optional(),
    message: z.string().min(2).max(2000),
    contact_name: z.string().max(120).optional(),
    contact_email: z.string().email().max(200).optional().or(z.literal("")),
    contact_phone: z.string().max(40).optional().or(z.literal("")),
    self_reported_discovery: z.enum(DISCOVERY).optional(),
    session_id: z.string().uuid().optional(),
    // Honeypot — must stay empty.
    company_website: z.string().max(200).optional(),
  })
  .superRefine((v, ctx) => {
    if (v.request_type === "report_incorrect") return; // corrections may be anonymous
    const hasEmail = !!v.contact_email?.trim();
    const hasPhone = !!v.contact_phone?.trim();
    if (!v.contact_name?.trim()) {
      ctx.addIssue({ code: "custom", path: ["contact_name"], message: "Your name is required." });
    }
    if (!hasEmail && !hasPhone) {
      ctx.addIssue({
        code: "custom",
        path: ["contact_email"],
        message: "Add an email address or a phone number so we can reply.",
      });
    }
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

function hostOnly(value: string | null): string | null {
  if (!value) return null;
  try {
    const host = value.includes("://") ? new URL(value).hostname : value.split("/")[0];
    const clean = host.toLowerCase().replace(/^www\./, "").split("?")[0].split("#")[0];
    return /^[a-z0-9.\-]{1,160}$/.test(clean) ? clean : null;
  } catch {
    return null;
  }
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
  if (!host) return "direct";
  if (/(^|\.)(google|bing|duckduckgo|yahoo|ecosia|brave)\./.test(host + ".")) return "organic_search";
  if (/(^|\.)(facebook|instagram|linkedin|x|twitter|t|reddit|tiktok|pinterest|youtube)\./.test(host + "."))
    return "social";
  if (/capitaldistrictnest\.com$|lovable\.app$|localhost/.test(host)) return "internal";
  return "referral";
}

/** Coarse, salted-per-hour fingerprint. No raw IP is ever stored. */
async function fingerprint(req: Request): Promise<string> {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";
  const hourSalt = new Date().toISOString().slice(0, 13);
  const data = new TextEncoder().encode(`${ip}|${req.headers.get("user-agent") ?? ""}|${hourSalt}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const MAX_PER_HOUR = 5;

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

    // Silent bot rejection — looks successful, stores nothing.
    if (body.company_website && body.company_website.trim().length > 0) {
      return json({ ok: true });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

    // ---- abuse protection -------------------------------------------------
    const fp = await fingerprint(req);
    const windowStart = new Date();
    windowStart.setMinutes(0, 0, 0);
    const { data: limitRow } = await admin
      .from("ask_nest_rate_limits")
      .select("hits")
      .eq("fingerprint", fp)
      .eq("window_start", windowStart.toISOString())
      .maybeSingle();

    const hits = (limitRow?.hits ?? 0) + 1;
    if (hits > MAX_PER_HOUR) {
      return json({ error: "too many requests", retry_after_minutes: 60 }, 429);
    }
    await admin.from("ask_nest_rate_limits").upsert(
      {
        fingerprint: fp,
        window_start: windowStart.toISOString(),
        hits,
        expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      },
      { onConflict: "fingerprint,window_start" },
    );

    // Resolve the business only against a real row — never trust a client id.
    let business_id: string | null = null;
    let town_slug = body.town_slug ?? null;
    let business_name: string | null = null;
    if (body.business_slug) {
      const { data: biz } = await admin
        .from("businesses")
        .select("id, name, town_slug")
        .eq("slug", body.business_slug)
        .maybeSingle();
      if (biz) {
        business_id = biz.id as string;
        business_name = (biz.name as string | null) ?? null;
        town_slug = town_slug ?? ((biz.town_slug as string | null) ?? null);
      }
    }

    const technical_source_family = trustedSourceFamily(req.headers.get("referer"));

    // ---- first-touch attribution -----------------------------------------
    // The submit request's own Referer is internal, so first touch comes from
    // the FIRST server-recorded event of the same anonymous session. That value
    // was derived server-side at landing and cannot be set by the client.
    let first_touch_source: string | null = null;
    let first_touch_evidence: "server_session_lookup" | "server_referer_only" | "unavailable" =
      "unavailable";
    if (body.session_id) {
      const { data: firstEvent } = await admin
        .from("engagement_events")
        .select("traffic_source")
        .eq("session_id", body.session_id)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (firstEvent?.traffic_source) {
        first_touch_source = firstEvent.traffic_source as string;
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
        contact_name: body.contact_name?.trim() || null,
        contact_email: body.contact_email?.trim() || null,
        contact_phone: body.contact_phone?.trim() || null,
        self_reported_discovery: body.self_reported_discovery ?? null,
        technical_source_family,
        session_id: body.session_id ?? null,
        first_touch_source,
        first_touch_evidence,
        status: "new",
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
      },
    });

    // --- founder notification: metadata only, never the message body ---------
    if (RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: NOTIFY_FROM,
            to: [NOTIFY_TO],
            subject: `Ask Nest: ${body.request_type}${business_name ? ` — ${business_name}` : ""}`,
            text: [
              "A new Ask Nest request is waiting in the admin inbox.",
              "",
              `Type: ${body.request_type}`,
              `Business: ${business_name ?? body.business_slug ?? "—"}`,
              `Town: ${town_slug ?? "—"}`,
              `Due: within one business day`,
              "",
              "Open /admin/ask-nest to read the request and reply.",
              "(The question and contact details are intentionally not included in this email.)",
            ].join("\n"),
          }),
        });
      } catch (notifyErr) {
        console.error("ask nest notification failed", String(notifyErr));
      }
    }

    return json({ ok: true, id: inserted.id });
  } catch (e) {
    console.error("submit-ask-nest failed", e);
    return json({ error: "unexpected error", details: String(e) }, 500);
  }
});
