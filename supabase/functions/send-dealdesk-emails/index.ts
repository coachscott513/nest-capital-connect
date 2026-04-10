import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 requests per minute per IP

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

const ADMIN_EMAIL = "scott@capitaldistrictnest.com";

interface DealDeskRequest {
  firstName: string;
  email: string;
  propertyAddress: string;
  strategy: string;
  notes?: string;
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
    const data: DealDeskRequest = await req.json();
    console.log("Received deal desk request:", data);

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    });

    const isProInterest = data.strategy === "pro-membership";

    // Send confirmation email to user (skip for Pro interest)
    let userEmailResult = null;
    if (!isProInterest) {
      // NOTE: Using Resend-managed sender while custom domain verification propagates
      const userEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Capital Deal Desk <onboarding@resend.dev>",
          reply_to: "deals@capitaldistrictnest.com",
          to: [data.email],
          subject: "We received your Investor Snapshot request",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #10b981;">Capital Deal Desk</h2>
              <p>Hi ${data.firstName},</p>
              <p>Got it — we're preparing your same-day Investor Snapshot for:</p>
              <p style="background: #f4f4f4; padding: 12px; border-radius: 6px; font-weight: 500;">${data.propertyAddress}</p>
              <p>You'll receive it shortly.</p>
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
              <p style="color: #666; font-size: 14px;">Capital Deal Desk — Wall Street Tools. Main Street Soul.</p>
            </div>
          `,
        }),
      });

      userEmailResult = await userEmailResponse.json();
      console.log("User confirmation email sent:", userEmailResult);
    }

    // Build admin email content based on type
    const adminSubject = isProInterest 
      ? `NEW Pro Interest — ${data.email}`
      : `NEW Deal Desk Request — ${data.propertyAddress}`;

    const adminHtml = isProInterest
      ? `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #10b981; margin-bottom: 24px;">🎯 NEW Pro Interest</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9; width: 140px;">Timestamp</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">${timestamp}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">Name</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">${data.firstName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">Email</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
          </table>
          <div style="background: #fff3cd; padding: 16px; border-radius: 8px; border-left: 4px solid #ffc107;">
            <p style="margin: 0; font-size: 14px; color: #333;">
              <strong>ACTION: Send Pro signup link to this user.</strong>
            </p>
          </div>
        </div>
      `
      : `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #10b981; margin-bottom: 24px;">NEW Deal Desk Request</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9; width: 140px;">Timestamp</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">${timestamp}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">Name</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">${data.firstName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">Email</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">Address/Link</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5; word-break: break-all;">${data.propertyAddress}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">Strategy</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">${data.strategy}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">Notes</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">${data.notes || "None"}</td>
            </tr>
          </table>

          <div style="background: #f4f4f4; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; color: #666;">PROCESSING CHECKLIST</h3>
            <div style="font-size: 14px; line-height: 1.8;">
              ☐ Pull RPR report<br/>
              ☐ Pull tax/assessment basics<br/>
              ☐ Create Snapshot PDF packet<br/>
              ☐ Send delivery email + upsell
            </div>
          </div>

          <div style="background: #e8f5e9; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; font-size: 14px; color: #333;">
              <strong>Reply to this email with the finished PDF to deliver it.</strong><br/>
              <span style="color: #666;">(This makes your inbox your queue.)</span>
            </p>
          </div>
        </div>
      `;

    // NOTE: Using Resend-managed sender while custom domain verification propagates
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Capital Deal Desk <onboarding@resend.dev>",
        reply_to: "deals@capitaldistrictnest.com",
        to: [ADMIN_EMAIL],
        subject: adminSubject,
        html: adminHtml,
      }),
    });

    const adminEmailResult = await adminEmailResponse.json();
    console.log("Admin notification email sent:", adminEmailResult);

    return new Response(
      JSON.stringify({ success: true, userEmail: userEmailResult, adminEmail: adminEmailResult }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error sending deal desk emails:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
