import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxJuOMNFYLXHzXsyDcBRy-Ug-rxutzRxHQk6hGRdnM/dev"

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Require shared secret header to prevent abuse
  const expectedSecret =
    Deno.env.get('SHEETS_WEBHOOK_SECRET') || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const provided =
    req.headers.get('x-webhook-secret') ||
    (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!expectedSecret || provided !== expectedSecret) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    console.log('Google Sheets webhook function called');

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Enforce a payload size cap (16 KB) to prevent abuse
    const raw = await req.text();
    if (raw.length > 16_384) {
      return new Response(
        JSON.stringify({ error: 'Payload too large' }),
        { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const requestData = JSON.parse(raw);

    // Whitelist allowed fields to prevent arbitrary spreadsheet pollution
    const ALLOWED_FIELDS = new Set([
      'name', 'full_name', 'email', 'phone', 'message', 'type',
      'location', 'town', 'origin_town', 'bedrooms', 'price_range',
      'lead_type', 'source', 'page_url', 'referrer', 'created_at',
    ]);

    const queryParams = new URLSearchParams();
    Object.entries(requestData).forEach(([key, value]) => {
      if (!ALLOWED_FIELDS.has(key)) return;
      if (value === null || value === undefined) return;
      // Cap individual values at 500 chars
      queryParams.append(key, String(value).slice(0, 500));
    });


    
    const response = await fetch(`${GOOGLE_SHEETS_WEBHOOK_URL}?${queryParams.toString()}`, {
      method: 'GET',
    });

    const responseText = await response.text();
    console.log('Google Sheets response:', responseText);

    if (!response.ok) {
      console.error('Google Sheets webhook error:', response.status, responseText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send data to Google Sheets',
          details: responseText 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Data sent to Google Sheets successfully',
        response: responseText 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in google-sheets-webhook function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
})