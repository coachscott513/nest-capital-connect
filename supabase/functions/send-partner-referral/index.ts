import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");



const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReferralRequest {
  clientName: string;
  clientPhone: string;
  projectType: "commercial" | "residential";
  partnerId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clientName, clientPhone, projectType, partnerId }: ReferralRequest = await req.json();

    // Validate inputs
    if (!clientName || !clientPhone || !projectType || !partnerId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get partner details from database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: partner } = await supabase
      .from("business_partners")
      .select(`
        id,
        local_voices (
          business_name,
          owner_name,
          town_slug
        )
      `)
      .eq("id", partnerId)
      .single();

    const businessName = partner?.local_voices?.business_name || "Unknown Business";
    const ownerName = partner?.local_voices?.owner_name || "Unknown Owner";
    const townSlug = partner?.local_voices?.town_slug || "unknown";

    // Send email to Scott via Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Nest Partner <notifications@capitaldistrictnest.com>",
        to: ["scott@capitaldistrictnest.com"],
        subject: `New Partner Referral from ${businessName}`,
        html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;"><h1 style="color: #0d9488;">New Partner Referral</h1><div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;"><h2 style="margin-top: 0;">Referred By</h2><p><strong>Business:</strong> ${businessName}</p><p><strong>Owner:</strong> ${ownerName}</p><p><strong>Town:</strong> ${townSlug}</p></div><div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;"><h2 style="margin-top: 0; color: #0d9488;">Client Details</h2><p><strong>Name:</strong> ${clientName}</p><p><strong>Phone:</strong> ${clientPhone}</p><p><strong>Project Type:</strong> ${projectType === 'commercial' ? 'Commercial' : 'Residential'}</p></div><p style="color: #71717a; font-size: 14px;">This referral has been logged in the database.</p></div>`,
      }),
    });

    console.log("Referral email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-partner-referral:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
