import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface JourneyEmailRequest {
  firstName: string;
  email: string;
  journeyType: "investor" | "first-time" | "land" | "financing";
  subject: string;
  leadMagnet: string;
}

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

  try {
    const { firstName, email, journeyType, subject, leadMagnet }: JourneyEmailRequest = await req.json();
    const content = journeyContent[journeyType] || journeyContent.investor;

    // Send user email
    const userEmailResponse = await resend.emails.send({
      from: "Capital District Nest <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a1a1a;">${content.heading}</h1>
          <p>Hi ${firstName},</p>
          <p>${content.body}</p>
          <p><strong>Your download:</strong> ${leadMagnet}</p>
          <p>Our team will follow up shortly with your personalized resources. In the meantime, feel free to explore:</p>
          <p style="margin: 24px 0;">
            <a href="${content.ctaUrl}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">${content.cta}</a>
          </p>
          <p>Questions? Reply to this email or call Scott directly at (518) 676-2347.</p>
          <p>Best,<br>The Capital District Nest Team</p>
        </div>
      `,
    });

    // Send internal notification
    await resend.emails.send({
      from: "Capital District Nest <onboarding@resend.dev>",
      to: ["scott@capitaldistrictnest.com"],
      subject: `NEW Lead Magnet Request — ${journeyType.toUpperCase()} Journey`,
      html: `
        <h2>New Lead Magnet Download</h2>
        <p><strong>Journey:</strong> ${journeyType}</p>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Resource:</strong> ${leadMagnet}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p>Follow up with personalized content for their ${journeyType} journey.</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-journey-email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
