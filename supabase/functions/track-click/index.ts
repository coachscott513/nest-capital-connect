// Redirect + click-tracking engine for /go/:slug
// Called from the client React route. Returns JSON with the destination URL
// plus records a click event via the service role.
import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const BOT_UA = /bot|crawler|spider|preview|facebookexternalhit|slackbot|whatsapp|linkedin|discord|headless/i;

async function sha256(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function detectDevice(ua: string): string {
  if (/mobile|iphone|android/i.test(ua)) return 'mobile';
  if (/ipad|tablet/i.test(ua)) return 'tablet';
  return 'desktop';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const slug = (url.searchParams.get('slug') || '').trim().toLowerCase();
    const recipient = url.searchParams.get('r') || '';
    const referrer = url.searchParams.get('ref') || req.headers.get('referer') || '';

    if (!slug) {
      return new Response(JSON.stringify({ error: 'slug required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: link } = await supabase
      .from('tracked_links')
      .select('id, destination_url, campaign_id, business_id, region_id, is_active')
      .eq('slug', slug)
      .maybeSingle();

    const destination = link?.is_active ? link.destination_url : '/';
    const ua = req.headers.get('user-agent') || '';
    const isBot = BOT_UA.test(ua);
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
    const country = req.headers.get('cf-ipcountry') || req.headers.get('x-country') || null;
    const salt = Deno.env.get('CLICK_HASH_SALT') || 'cdn-default-salt';

    const [ipHash, emailHash] = await Promise.all([
      ip ? sha256(salt + ip) : Promise.resolve(null),
      recipient ? sha256(salt + recipient.toLowerCase()) : Promise.resolve(null),
    ]);

    // Fire-and-forget insert
    supabase.from('link_clicks').insert({
      link_id: link?.id ?? null,
      slug,
      campaign_id: link?.campaign_id ?? null,
      business_id: link?.business_id ?? null,
      region_id: link?.region_id ?? null,
      recipient_email_hash: emailHash,
      user_agent: ua.slice(0, 500),
      device: detectDevice(ua),
      referrer: referrer.slice(0, 500),
      utm_source: url.searchParams.get('utm_source'),
      utm_medium: url.searchParams.get('utm_medium'),
      utm_campaign: url.searchParams.get('utm_campaign'),
      utm_content: url.searchParams.get('utm_content'),
      utm_term: url.searchParams.get('utm_term'),
      ip_hash: ipHash,
      country,
      is_bot: isBot,
    }).then(() => {});

    // Bump aggregate + recipient score if not bot
    if (link?.id && !isBot) {
      supabase.rpc('increment', {}).then(() => {}); // no-op if missing
      supabase.from('tracked_links')
        .update({ click_count: (link as any).click_count ? (link as any).click_count + 1 : 1 })
        .eq('id', link.id).then(() => {});

      if (link.campaign_id && emailHash) {
        supabase.from('outreach_recipients')
          .update({
            status: 'clicked',
            last_seen_at: new Date().toISOString(),
            first_click_at: new Date().toISOString(),
          })
          .eq('campaign_id', link.campaign_id)
          .eq('email_hash', emailHash)
          .is('first_click_at', null)
          .then(() => {});
      }
    }

    return new Response(JSON.stringify({ destination, found: !!link }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('track-click error', err);
    return new Response(JSON.stringify({ destination: '/', error: String(err) }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
