import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "scott@capitaldistrictnest.com";

interface DealDeskRequest {
  firstName: string;
  email: string;
  propertyAddress: string;
  strategy: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: DealDeskRequest = await req.json();
    console.log("Received deal desk request:", data);

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Send confirmation email to user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Capital Deal Desk <onboarding@resend.dev>",
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

    const userEmailResult = await userEmailResponse.json();
    console.log("User confirmation email sent:", userEmailResult);

    // Send internal notification to admin
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Capital Deal Desk <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: `New Snapshot Request: ${data.propertyAddress}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #10b981;">New Investor Snapshot Request</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600;">First Name</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${data.firstName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600;">Email</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600;">Property Address/Link</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${data.propertyAddress}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600;">Strategy</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${data.strategy}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600;">Notes</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${data.notes || "None"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600;">Timestamp</td>
                <td style="padding: 8px 0;">${timestamp}</td>
              </tr>
            </table>
          </div>
        `,
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
