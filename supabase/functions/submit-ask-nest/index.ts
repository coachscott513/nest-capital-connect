// Ask Nest — structured business-information request intake.
//
// browser -> submit-ask-nest -> validate -> split PII from analytics
//         -> ask_nest_requests (private, admin/service-role only)
//         -> engagement_events (metadata only, never PII)
//
// Privacy contract:
//   message, name, email, phone NEVER reach engagement_events.
//   The technical source family is derived server-side from the Referer header
//   against an allowlist. A client field can never set trusted attribution.
//   Self-reported discovery is stored as self-report and is never promoted to
//   technical attribution.
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

const BodySchema = z.object({
  request_type: z.enum(REQUEST_TYPES),
  business_slug: z.string().max(160).nullable().optional(),
  town_slug: z.string().max(80).nullable().optional(),
  service_intent: z.string().max(80).nullable().optional(),
  message: z.string().min(2).max(2000),
  contact_name: z.string().min(1).max(120),
  contact_email: z.string().email().max(200),
  contact_phone: z.string().min(7).max(40),
  self_reported_discovery: z.enum(DISCOVERY).optional(),
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

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

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
        contact_name: body.contact_name,
        contact_email: body.contact_email,
        contact_phone: body.contact_phone,
        self_reported_discovery: body.self_reported_discovery ?? null,
        technical_source_family,
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
      metadata: {
        intent_category: body.request_type,
        // Self-report is stored as self-report — it never becomes traffic_source.
        surface: "ask_nest",
      },
    });

    return json({ ok: true, id: inserted.id });
  } catch (e) {
    console.error("submit-ask-nest failed", e);
    return json({ error: "unexpected error", details: String(e) }, 500);
  }
});
