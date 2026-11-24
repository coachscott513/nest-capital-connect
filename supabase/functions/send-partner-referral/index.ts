import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");



const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};


const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

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

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
  const json = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });

  try {
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    if (!token) return json({ error: "Sign in required" }, 401);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData?.user) return json({ error: "Sign in required" }, 401);

    const { clientName, clientPhone, projectType, partnerId }: ReferralRequest = await req.json();

    if (
      typeof clientName !== "string" || clientName.trim().length < 1 || clientName.length > 200 ||
      typeof clientPhone !== "string" || !/^[0-9+\-\s().]{7,40}$/.test(clientPhone) ||
      (projectType !== "commercial" && projectType !== "residential") ||
      typeof partnerId !== "string" || partnerId.length > 64
    ) {
      return json({ error: "Invalid referral details" }, 400);
    }

    // Only the partner account that owns this partner record may send referrals for it.
    const { data: partner } = await supabase
      .from("business_partners")
      .select(`
        id,
        user_id,
        local_voices (
          business_name,
          owner_name,
          town_slug
        )
      `)
      .eq("id", partnerId)
      .eq("user_id", userData.user.id)
      .maybeSingle();

    if (!partner) return json({ error: "Not allowed for this partner" }, 403);

    const lv: any = (partner as any).local_voices;
    const localVoice = Array.isArray(lv) ? lv[0] : lv;
    const businessName = localVoice?.business_name || "Unknown Business";
    const ownerName = localVoice?.owner_name || "Unknown Owner";
    const townSlug = localVoice?.town_slug || "unknown";

    // Send email to Scott via Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Nest Partner <notifications@capitaldistrictnest.com>",
        to: ["team@capitaldistrictnest.com"],
        subject: `New Partner Referral from ${esc(businessName)}`,
        html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;"><h1 style="color: #0d9488;">New Partner Referral</h1><div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;"><h2 style="margin-top: 0;">Referred By</h2><p><strong>Business:</strong> ${esc(businessName)}</p><p><strong>Owner:</strong> ${esc(ownerName)}</p><p><strong>Town:</strong> ${esc(townSlug)}</p></div><div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;"><h2 style="margin-top: 0; color: #0d9488;">Client Details</h2><p><strong>Name:</strong> ${esc(clientName)}</p><p><strong>Phone:</strong> ${esc(clientPhone)}</p><p><strong>Project Type:</strong> ${projectType === 'commercial' ? 'Commercial' : 'Residential'}</p></div><p style="color: #71717a; font-size: 14px;">This referral has been logged in the database.</p></div>`,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Referral email failed:", emailResponse.status);
      return json({ error: "Notification could not be sent" }, 502);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-partner-referral:", error);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
