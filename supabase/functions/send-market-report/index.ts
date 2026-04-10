import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

interface MarketReportRequest {
  name: string;
  email: string;
  market: string;
  reportUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(clientIp)) {
    return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
      status: 429,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const { name, email, market, reportUrl }: MarketReportRequest = await req.json();

    console.log(`Sending ${market} market report to ${email}`);

    // Send user email with the report link
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Capital District Nest <hello@capitaldistrictnest.com>",
        to: [email],
        subject: `Your ${market} Market Report`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a1a1a;">Your ${market} Market Report</h1>
            <p>Hi ${name},</p>
            <p>Thank you for your interest in the ${market} real estate market. Here's your up-to-date market report with recent sales, pricing trends, and market activity.</p>
            
            <p style="margin: 24px 0;">
              <a href="${reportUrl}" style="background: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Your Market Report (PDF)</a>
            </p>
            
            <p style="color: #666; font-size: 14px;">This report updates every 48 hours with the latest sales and pricing data.</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
            
            <h3 style="color: #1a1a1a;">Want a Property-Specific Breakdown?</h3>
            <p>Text any address to <strong>518-676-2347</strong> for a custom analysis including:</p>
            <ul style="color: #444;">
              <li>Rent potential & cash flow estimates</li>
              <li>Tax history & comparable sales</li>
              <li>Cap rate & ROI projections</li>
            </ul>
            
            <p>Questions? Reply to this email or call us directly at (518) 676-2347.</p>
            <p>Best,<br>The Capital District Nest Team</p>
          </div>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      const errorText = await userEmailResponse.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    // Send internal notification
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Capital District Nest <hello@capitaldistrictnest.com>",
        to: ["scott@capitaldistrictnest.com"],
        subject: `NEW Market Report Request — ${market}`,
        html: `
          <h2>New Market Report Download</h2>
          <p><strong>Market:</strong> ${market}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <hr>
          <p>Follow up with personalized content for their ${market} search.</p>
        `,
      }),
    });

    console.log(`Successfully sent ${market} market report to ${email}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-market-report:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
