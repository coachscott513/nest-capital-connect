// Sends a team notification email whenever a new row is inserted into public.leads.
// Triggered by a Postgres pg_net trigger — see migration `enable_lead_notifications`.
// Failures are logged but never block the original insert.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
// Until capitaldistrictnest.com is verified inside Resend, the sandbox sender
// (onboarding@resend.dev) can only deliver to the Resend account owner.
// Override via `LEAD_NOTIFY_TO` once team@capitaldistrictnest.com is reachable.
const TEAM_EMAIL = Deno.env.get("LEAD_NOTIFY_TO") || "scott@capitaldistrictnest.com";
// Once the domain is verified, set FROM via env: LEAD_NOTIFY_FROM="Capital District Nest <team@capitaldistrictnest.com>"
const FROM = Deno.env.get("LEAD_NOTIFY_FROM") || "Capital District Nest <onboarding@resend.dev>";

type LeadRow = {
  id?: string;
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  type?: string | null;
  lead_type?: string | null;
  origin_town?: string | null;
  location?: string | null;
  price_range?: string | null;
  bedrooms?: string | null;
  message?: string | null;
  created_at?: string | null;
};

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const nl2br = (s: unknown) => esc(s).replace(/\n/g, "<br />");

const prettyType = (t?: string | null) => {
  if (!t) return "Lead";
  return t
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const extractFromMessage = (msg: string, key: string): string | null => {
  const re = new RegExp(`^\\s*${key}\\s*:\\s*(.+)$`, "im");
  const m = msg.match(re);
  return m ? m[1].trim() : null;
};

const buildSubject = (lead: LeadRow) => {
  const type = prettyType(lead.type);
  const msg = lead.message || "";
  const businessName = extractFromMessage(msg, "Business");
  const tier = extractFromMessage(msg, "Requested tier");
  const eventName = extractFromMessage(msg, "Event");
  const town = lead.origin_town || extractFromMessage(msg, "Town");

  const labelBits = [
    businessName,
    eventName,
    lead.full_name,
    tier && `Tier: ${tier}`,
    town,
  ].filter(Boolean);

  const tail = labelBits.length ? ` — ${labelBits.slice(0, 2).join(" · ")}` : "";
  return `New Capital District Nest Lead: ${type}${tail}`;
};

const buildHtml = (lead: LeadRow) => {
  const rows: Array<[string, string]> = [];
  const push = (k: string, v: unknown) => {
    if (v === null || v === undefined || v === "") return;
    rows.push([k, String(v)]);
  };
  push("Type", prettyType(lead.type));
  push("Lead category", lead.lead_type);
  push("Name", lead.full_name);
  push("Email", lead.email);
  push("Phone", lead.phone);
  push("Town", lead.origin_town || lead.location);
  push("Price range", lead.price_range);
  push("Bedrooms", lead.bedrooms);
  push("Received", lead.created_at);
  push("Lead ID", lead.id);

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(
          k,
        )}</td><td style="padding:6px 0;color:#0B0F19;font-size:14px;">${esc(v)}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="padding:22px 26px;background:#0B0F19;color:#ffffff;">
        <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#5eead4;font-weight:600;">New lead</div>
        <div style="font-size:20px;font-weight:600;margin-top:6px;">${esc(prettyType(lead.type))}</div>
      </div>
      <div style="padding:22px 26px;">
        <table style="border-collapse:collapse;width:100%;">${tableRows}</table>
        ${lead.message ? `<div style="margin-top:22px;padding-top:18px;border-top:1px solid #e5e7eb;">
          <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.12em;font-weight:600;margin-bottom:8px;">Full context</div>
          <div style="font-size:14px;color:#0B0F19;line-height:1.55;white-space:pre-wrap;">${nl2br(lead.message)}</div>
        </div>` : ""}
      </div>
      <div style="padding:14px 26px;background:#f9fafb;color:#6b7280;font-size:12px;">
        Reply directly to this email to reach the lead, or follow up at ${esc(lead.email || "—")} / ${esc(lead.phone || "—")}.
      </div>
    </div>
  </body></html>`;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!RESEND_API_KEY) {
      console.error("[notify-new-lead] RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ ok: false, error: "RESEND_API_KEY missing" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json().catch(() => ({}));
    // Accept either { record: {...} } (pg_net / db webhook style) or a bare lead row.
    const lead: LeadRow = body?.record ?? body?.lead ?? body ?? {};

    if (!lead || !lead.id) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing lead payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const subject = buildSubject(lead);
    const html = buildHtml(lead);

    const replyTo = lead.email && /.+@.+\..+/.test(lead.email) ? lead.email : TEAM_EMAIL;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TEAM_EMAIL],
        reply_to: replyTo,
        subject,
        html,
      }),
    });

    const text = await resp.text();
    if (!resp.ok) {
      console.error("[notify-new-lead] resend error", resp.status, text);
      return new Response(
        JSON.stringify({ ok: false, status: resp.status, error: text }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.log("[notify-new-lead] sent", { id: lead.id, type: lead.type });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[notify-new-lead] exception", err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
