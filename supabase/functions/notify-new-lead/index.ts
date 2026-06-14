// Sends a team notification email whenever a new row is inserted into any
// lead-style table (public.leads, intel_report_leads, analyzer_leads,
// rental_applications, deal_desk_requests, market_report_leads, investment_leads).
// Triggered by a Postgres pg_net trigger — see migrations enabling lead notifications.
// Failures are logged but never block the original insert.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
// Until capitaldistrictnest.com is verified inside Resend, the sandbox sender
// (onboarding@resend.dev) can only deliver to the Resend account owner.
// Override via `LEAD_NOTIFY_TO` once team@capitaldistrictnest.com is reachable.
const TEAM_EMAIL = Deno.env.get("LEAD_NOTIFY_TO") || "scott@capitaldistrictnest.com";
// Once the domain is verified, set FROM via env: LEAD_NOTIFY_FROM="Capital District Nest <team@capitaldistrictnest.com>"
const FROM = Deno.env.get("LEAD_NOTIFY_FROM") || "Capital District Nest <onboarding@resend.dev>";

type Row = Record<string, unknown> & {
  id?: string;
  created_at?: string | null;
  email?: string | null;
};

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const nl2br = (s: unknown) => esc(s).replace(/\n/g, "<br />");

const titleCase = (t?: string | null) => {
  if (!t) return "";
  return String(t)
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const extractFromMessage = (msg: string, key: string): string | null => {
  const re = new RegExp(`^\\s*${key}\\s*:\\s*(.+)$`, "im");
  const m = msg.match(re);
  return m ? m[1].trim() : null;
};

// Per-table descriptors for subject + body. Keeps the function generic.
type TableDescriptor = {
  label: string;                              // human label for the subject
  nameKeys: string[];                         // candidate fields for "Name"
  emailKey?: string;
  phoneKey?: string;
  // ordered list of [display label, row key] pairs to include in the table body
  fields: Array<[string, string]>;
  // optional secondary identifier (business / property / report) for the subject
  identifierKeys?: string[];
};

const TABLE_DESCRIPTORS: Record<string, TableDescriptor> = {
  leads: {
    label: "Lead",
    nameKeys: ["full_name"],
    emailKey: "email",
    phoneKey: "phone",
    fields: [
      ["Type", "type"],
      ["Lead category", "lead_type"],
      ["Name", "full_name"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["Town", "origin_town"],
      ["Location", "location"],
      ["Price range", "price_range"],
      ["Bedrooms", "bedrooms"],
    ],
  },
  intel_report_leads: {
    label: "Intel Report Request",
    nameKeys: ["full_name"],
    emailKey: "email",
    phoneKey: "phone",
    identifierKeys: ["report_slug"],
    fields: [
      ["Report", "report_slug"],
      ["Name", "full_name"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["Page", "page_url"],
      ["Referrer", "referrer"],
    ],
  },
  analyzer_leads: {
    label: "Investment Analyzer",
    nameKeys: ["full_name"],
    emailKey: "email",
    phoneKey: "phone",
    identifierKeys: ["property_address", "property_city"],
    fields: [
      ["User type", "user_type"],
      ["Name", "full_name"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["Property", "property_address"],
      ["City", "property_city"],
      ["State", "property_state"],
      ["Asking price", "asking_price"],
      ["Loan type", "loan_type"],
      ["Cap rate", "cap_rate"],
      ["NOI", "noi"],
      ["Monthly cash flow", "monthly_cash_flow"],
      ["Cash to close", "cash_to_close"],
      ["Source URL", "source_url"],
      ["UTM source", "utm_source"],
      ["UTM medium", "utm_medium"],
      ["UTM campaign", "utm_campaign"],
    ],
  },
  rental_applications: {
    label: "Rental Application",
    nameKeys: ["full_name"],
    emailKey: "email",
    phoneKey: "phone",
    identifierKeys: ["current_address"],
    fields: [
      ["Name", "full_name"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["Annual income", "annual_income"],
      ["Move-in date", "move_in_date"],
      ["Current address", "current_address"],
      ["Rental ID", "rental_id"],
    ],
  },
  deal_desk_requests: {
    label: "Deal Desk Request",
    nameKeys: ["first_name"],
    emailKey: "email",
    identifierKeys: ["property_address", "strategy"],
    fields: [
      ["Name", "first_name"],
      ["Email", "email"],
      ["Strategy", "strategy"],
      ["Property", "property_address"],
      ["Lead type", "lead_type"],
      ["Updates opt-in", "agreed_to_updates"],
    ],
  },
  market_report_leads: {
    label: "Market Report Request",
    nameKeys: ["full_name"],
    emailKey: "email",
    phoneKey: "phone",
    identifierKeys: ["town_name", "address_to_analyze"],
    fields: [
      ["Town", "town_name"],
      ["Buyer type", "buyer_type"],
      ["Name", "full_name"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["Address to analyze", "address_to_analyze"],
    ],
  },
  investment_leads: {
    label: "Investment Lead",
    nameKeys: ["full_name"],
    emailKey: "email",
    phoneKey: "phone",
    identifierKeys: ["property_address"],
    fields: [
      ["Lead type", "lead_type"],
      ["Name", "full_name"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["Property", "property_address"],
      ["Purchase price", "purchase_price"],
      ["Estimated rent", "estimated_rent"],
      ["Source page", "source_page"],
    ],
  },
  partner_referrals: {
    label: "Partner Referral",
    nameKeys: ["client_name"],
    phoneKey: "client_phone",
    identifierKeys: ["project_type"],
    fields: [
      ["Client name", "client_name"],
      ["Client phone", "client_phone"],
      ["Project type", "project_type"],
      ["Status", "status"],
      ["Partner ID", "partner_id"],
    ],
  },
  listing_claims: {
    label: "Listing Claim",
    nameKeys: ["claimant_name"],
    emailKey: "claimant_email",
    phoneKey: "claimant_phone",
    identifierKeys: ["mls_number", "agent_slug"],
    fields: [
      ["Claimant name", "claimant_name"],
      ["Email", "claimant_email"],
      ["Phone", "claimant_phone"],
      ["MLS #", "mls_number"],
      ["Agent slug", "agent_slug"],
      ["Requested public URL", "requested_public_url"],
      ["Message", "message"],
      ["Status", "status"],
    ],
  },
};

const pickFirst = (row: Row, keys: string[]): string | null => {
  for (const k of keys) {
    const v = row[k];
    if (v !== null && v !== undefined && v !== "") return String(v);
  }
  return null;
};

const buildSubject = (sourceTable: string, row: Row): string => {
  const desc = TABLE_DESCRIPTORS[sourceTable];
  const label = desc?.label || titleCase(sourceTable) || "Lead";
  const msg = String(row.message ?? row.notes ?? "");
  const businessName = msg ? extractFromMessage(msg, "Business") : null;
  const eventName = msg ? extractFromMessage(msg, "Event") : null;
  const tier = msg ? extractFromMessage(msg, "Requested tier") : null;
  const name = pickFirst(row, desc?.nameKeys ?? ["full_name", "first_name", "name"]);
  const identifier = desc?.identifierKeys ? pickFirst(row, desc.identifierKeys) : null;

  const bits = [businessName, eventName, name, identifier, tier && `Tier: ${tier}`]
    .filter(Boolean)
    .slice(0, 2);
  const tail = bits.length ? ` — ${bits.join(" · ")}` : "";
  return `New Capital District Nest Lead: ${label}${tail}`;
};

const buildHtml = (sourceTable: string, row: Row): string => {
  const desc = TABLE_DESCRIPTORS[sourceTable];
  const label = desc?.label || titleCase(sourceTable) || "Lead";

  // Build field rows from the descriptor (or fall back to all scalar fields).
  const rows: Array<[string, string]> = [];
  const push = (k: string, v: unknown) => {
    if (v === null || v === undefined || v === "") return;
    rows.push([k, String(v)]);
  };

  if (desc) {
    for (const [labelText, key] of desc.fields) push(labelText, row[key]);
  } else {
    for (const [k, v] of Object.entries(row)) {
      if (k === "message" || k === "notes" || k === "id" || k === "created_at") continue;
      if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
        push(titleCase(k), v);
      }
    }
  }

  push("Source table", sourceTable);
  push("Received", row.created_at as string | undefined);
  push("Lead ID", row.id);

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(
          k,
        )}</td><td style="padding:6px 0;color:#0B0F19;font-size:14px;">${esc(v)}</td></tr>`,
    )
    .join("");

  const longText = (row.message ?? row.notes ?? row.description) as string | undefined;

  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="padding:22px 26px;background:#0B0F19;color:#ffffff;">
        <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#5eead4;font-weight:600;">New lead</div>
        <div style="font-size:20px;font-weight:600;margin-top:6px;">${esc(label)}</div>
      </div>
      <div style="padding:22px 26px;">
        <table style="border-collapse:collapse;width:100%;">${tableRows}</table>
        ${longText ? `<div style="margin-top:22px;padding-top:18px;border-top:1px solid #e5e7eb;">
          <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.12em;font-weight:600;margin-bottom:8px;">Full context</div>
          <div style="font-size:14px;color:#0B0F19;line-height:1.55;white-space:pre-wrap;">${nl2br(longText)}</div>
        </div>` : ""}
      </div>
      <div style="padding:14px 26px;background:#f9fafb;color:#6b7280;font-size:12px;">
        Reply directly to this email to reach the lead, or follow up at ${esc((row[desc?.emailKey ?? "email"] as string) || "—")} / ${esc((row[desc?.phoneKey ?? "phone"] as string) || "—")}.
      </div>
    </div>
  </body></html>`;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  // Require a shared secret (pg_net trigger should send this header).
  // Falls back to the service-role key so existing triggers using it keep working.
  const expectedSecret =
    Deno.env.get("LEAD_NOTIFY_WEBHOOK_SECRET") ||
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const provided =
    req.headers.get("x-webhook-secret") ||
    (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
  if (!expectedSecret || provided !== expectedSecret) {
    return new Response(
      JSON.stringify({ ok: false, error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {

    if (!RESEND_API_KEY) {
      console.error("[notify-new-lead] RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ ok: false, error: "RESEND_API_KEY missing" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json().catch(() => ({}));
    const row: Row = body?.record ?? body?.lead ?? body ?? {};
    const sourceTable: string = body?.source_table || body?.table || "leads";

    if (!row || !row.id) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing lead payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const desc = TABLE_DESCRIPTORS[sourceTable];
    const subject = buildSubject(sourceTable, row);
    const html = buildHtml(sourceTable, row);
    const emailVal = desc?.emailKey ? (row[desc.emailKey] as string | undefined) : (row.email as string | undefined);
    const replyTo = emailVal && /.+@.+\..+/.test(emailVal) ? emailVal : TEAM_EMAIL;

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

    console.log("[notify-new-lead] sent", { id: row.id, source_table: sourceTable });
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
