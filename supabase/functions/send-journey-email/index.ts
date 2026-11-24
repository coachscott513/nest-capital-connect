import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { EmailAccessError, verifiedEmail, requestName, journeyResource } from "../_shared/verified-email.ts";

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

const journeyContent: Record<string, { heading: string; body: string; cta: string; ctaUrl: string }> = {
  investor: {
    heading: "Your Investor Toolkit is Ready",
    body: "Thank you for your interest in Capital District investment properties. You've taken the first step toward building long-term wealth through real estate.",
    cta: "View Investment Properties",
    ctaUrl: "https://capitaldistrictnest.com/investment-landing",
  },
  "first-time": {
    heading: "Your First-Time Buyer Checklist is Ready",
    body: "Congratulations on taking the first step toward homeownership! We've put together everything you need to navigate the buying process with confidence.",
    cta: "See Available Programs",
    ctaUrl: "https://capitaldistrictnest.com/first-time-homebuyers",
  },
  land: {
    heading: "Your Land Due Diligence Guide is Ready",
    body: "Smart land buying starts with thorough research. We've compiled everything you need to evaluate land purchases in the Capital District.",
    cta: "Browse Land Listings",
    ctaUrl: "https://capitaldistrictnest.com/albany-land",
  },
  financing: {
    heading: "Your Mortgage Options Guide is Ready",
    body: "Understanding your financing options is crucial. We've put together a comprehensive comparison of loan types and assistance programs available to you.",
    cta: "Explore Financing Options",
    ctaUrl: "https://capitaldistrictnest.com/first-time-homebuyers",
  },
};

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
    const firstName = requestName(body.firstName);
    const { journeyType, subject, leadMagnet } = journeyResource(body.journeyType);
    const content = journeyContent[journeyType];

    // Send user email
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Capital District Nest <team@capitaldistrictnest.com>",
        to: [email],
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a1a1a;">${content.heading}</h1>
            <p>Hi ${esc(firstName)},</p>
            <p>${content.body}</p>
            <p><strong>Your download:</strong> ${esc(leadMagnet)}</p>
            <p>Our team will follow up shortly with your personalized resources. In the meantime, feel free to explore:</p>
            <p style="margin: 24px 0;">
              <a href="${content.ctaUrl}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">${content.cta}</a>
            </p>
            <p>Questions? Reply to this email or call us directly at (518) 522-7265.</p>
            <p>Best,<br>The Capital District Nest Team</p>
          </div>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      console.error('Guide email provider rejected delivery', userEmailResponse.status);
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
        subject: `NEW Lead Magnet Request — ${journeyType.toUpperCase()} Journey`,
        html: `
          <h2>New Lead Magnet Download</h2>
          <p><strong>Journey:</strong> ${esc(journeyType)}</p>
          <p><strong>Name:</strong> ${esc(firstName)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Resource:</strong> ${esc(leadMagnet)}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <hr>
          <p>Follow up with personalized content for their ${esc(journeyType)} journey.</p>
        `,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const status = error instanceof EmailAccessError ? error.status : error instanceof SyntaxError ? 400 : 500;
    return new Response(JSON.stringify({ error: error instanceof EmailAccessError ? error.message : 'Unable to send this guide. Please try again.' }), {
      status,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
