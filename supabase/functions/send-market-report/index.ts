import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { EmailAccessError, verifiedEmail, requestName, marketResource } from "../_shared/verified-email.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}


const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") return new Response(null, { status: 405, headers: corsHeaders });

  try {
    const authClient = createClient(Deno.env.get("SUPABASE_URL") || "", Deno.env.get("SUPABASE_ANON_KEY") || "");
    const email = await verifiedEmail(req, authClient);
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(clientIp)) {
    return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
      status: 429,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

    const body = await req.json();
    const name = requestName(body.name);
    const { market, reportUrl } = marketResource(body.market);

    // Send user email with the report link
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Capital District Nest <team@capitaldistrictnest.com>",
        to: [email],
        subject: `Your ${esc(market)} Market Report`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a1a1a;">Your ${esc(market)} Market Report</h1>
            <p>Hi ${esc(name)},</p>
            <p>Thank you for your interest in the ${esc(market)} real estate market. Here's your up-to-date market report with recent sales, pricing trends, and market activity.</p>
            
            <p style="margin: 24px 0;">
              <a href="${esc(reportUrl)}" style="background: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Your Market Report (PDF)</a>
            </p>
            
            <p style="color: #666; font-size: 14px;">This report updates every 48 hours with the latest sales and pricing data.</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
            
            <h3 style="color: #1a1a1a;">Want a Property-Specific Breakdown?</h3>
            <p>Text any address to <strong>518-522-7265</strong> for a custom analysis including:</p>
            <ul style="color: #444;">
              <li>Rent potential & cash flow estimates</li>
              <li>Tax history & comparable sales</li>
              <li>Cap rate & ROI projections</li>
            </ul>
            
            <p>Questions? Reply to this email or call us directly at (518) 522-7265.</p>
            <p>Best,<br>The Capital District Nest Team</p>
          </div>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      console.error('Report email provider rejected delivery', userEmailResponse.status);
      throw new Error('Email delivery failed');
    }

    // Send internal notification
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Capital District Nest <team@capitaldistrictnest.com>",
        to: ["team@capitaldistrictnest.com"],
        subject: `NEW Market Report Request — ${esc(market)}`,
        html: `
          <h2>New Market Report Download</h2>
          <p><strong>Market:</strong> ${esc(market)}</p>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <hr>
          <p>Follow up with personalized content for their ${esc(market)} search.</p>
        `,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const status = error instanceof EmailAccessError ? error.status : error instanceof SyntaxError ? 400 : 500;
    return new Response(JSON.stringify({ error: error instanceof EmailAccessError ? error.message : 'Unable to send this report. Please try again.' }), {
      status,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
