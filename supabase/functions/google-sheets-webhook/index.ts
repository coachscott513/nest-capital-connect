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

    const requestData = await req.json();
    console.log('Received data:', requestData);

    // Send data to Google Sheets via the webhook using GET with query parameters
    const queryParams = new URLSearchParams();
    Object.entries(requestData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        queryParams.append(key, String(value));
      }
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