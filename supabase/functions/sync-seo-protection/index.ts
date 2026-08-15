// Admin-only. Rebuilds the SEO protection manifest from Google Search Console.
// Read-only against GSC: lists verified properties, queries Search Analytics,
// and never submits a sitemap or requests indexing.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE_ORIGIN = "https://www.capitaldistrictnest.com";

// Documented protection thresholds (see docs/policy/seo-protection.md).
const OPPORTUNITY_MIN_IMPRESSIONS_90D = 25;

type Row = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

function routeFamilyOf(path: string): string {
  if (path === "/" || path === "") return "/";
  if (path.startsWith("/biz/")) return "/biz/*";
  if (path.startsWith("/businesses")) return "/businesses*";
  if (path.startsWith("/local")) return "/local";
  if (path.startsWith("/living-in")) return "/living-in/*";
  if (path.startsWith("/towns/")) return "/towns/*";
  if (path.startsWith("/communities")) return "/communities*";
  if (path.startsWith("/homes")) return "/homes*";
  if (path.startsWith("/rentals")) return "/rentals*";
  if (path.startsWith("/market-report")) return "/market-reports*";
  if (path.startsWith("/blog")) return "/blog*";
  if (path.startsWith("/stories")) return "/stories*";
  if (path.startsWith("/claim-business")) return "/claim-business";
  if (path.startsWith("/investor/") || path.startsWith("/investment")) return "/investor*";
  if (path.startsWith("/listings/")) return "/listings/*";
  return "other";
}

// Routes the founder has locked regardless of what the data says.
const FOUNDER_LOCKED = new Set([
  "/", "/local", "/living-in/delmar", "/living-in/rotterdam", "/grants",
]);

async function gsc(path: string, init: RequestInit, headers: Record<string, string>) {
  const res = await fetch(`${GATEWAY}${path}`, { ...init, headers: { ...headers, ...(init.headers || {}) } });
  if (!res.ok) {
    const body = await res.text();
    console.error(`GSC request failed [${res.status}] ${path}: ${body}`);
    throw new Error(`[${res.status}] ${body}`);
  }
  return res.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Caller must be a signed-in admin.
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData } = await userClient.auth.getUser();
    if (!userData?.user) {
      return new Response(JSON.stringify({ error: "Not signed in" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: isAdmin } = await userClient.rpc("has_role", {
      _user_id: userData.user.id, _role: "admin",
    });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Admin role required" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    const connectionKey = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
    if (!lovableKey || !connectionKey) {
      return new Response(JSON.stringify({ error: "Search Console connection is not configured" }), {
        status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const headers = {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": connectionKey,
      "Content-Type": "application/json",
    };

    // Resolve the verified property at runtime — never hardcoded.
    const sites = await gsc("/webmasters/v3/sites", { method: "GET" }, headers);
    const target = new URL(SITE_ORIGIN);
    const matches = (sites.siteEntry ?? []).filter((e: { siteUrl: string; permissionLevel?: string }) => {
      if (e.permissionLevel === "siteUnverifiedUser") return false;
      if (e.siteUrl.startsWith("sc-domain:")) {
        const domain = e.siteUrl.slice(10).toLowerCase();
        const host = target.hostname.toLowerCase();
        return host === domain || host.endsWith(`.${domain}`);
      }
      try { return target.href.startsWith(new URL(e.siteUrl).href); } catch { return false; }
    });
    const body = await req.json().catch(() => ({}));
    const selected: string | undefined = body?.site_url;
    let siteUrl: string;
    if (selected) {
      const ok = matches.find((m: { siteUrl: string }) => m.siteUrl === selected);
      if (!ok) throw new Error("Selected property is not verified for this site");
      siteUrl = ok.siteUrl;
    } else if (matches.length === 1) {
      siteUrl = matches[0].siteUrl;
    } else if (matches.length === 0) {
      return new Response(JSON.stringify({ error: "No verified Search Console property covers this site" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({
        status: "selection_required",
        candidates: matches.map((m: { siteUrl: string }) => m.siteUrl),
      }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const end: string = body?.end_date ?? new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10);
    const endMs = Date.parse(`${end}T00:00:00Z`);
    const start28 = new Date(endMs - 27 * 86400000).toISOString().slice(0, 10);
    const start90 = new Date(endMs - 89 * 86400000).toISOString().slice(0, 10);

    const fetchPages = async (startDate: string) => {
      const out: Row[] = [];
      for (let startRow = 0; startRow < 5000; startRow += 500) {
        const res = await gsc(
          `/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
          { method: "POST", body: JSON.stringify({ startDate, endDate: end, dimensions: ["page"], rowLimit: 500, startRow }) },
          headers,
        );
        const rows: Row[] = res.rows ?? [];
        out.push(...rows);
        if (rows.length < 500) break;
      }
      return out;
    };

    const rows90 = await fetchPages(start90);
    const rows28 = await fetchPages(start28);

    const by28 = new Map<string, Row>();
    for (const r of rows28) by28.set(r.keys[0], r);

    const admin = createClient(supabaseUrl, serviceKey);

    // Slug -> business id, so /biz/* URLs resolve to real records.
    const slugToId = new Map<string, string>();
    for (let from = 0; ; from += 1000) {
      const { data } = await admin.from("businesses").select("id,slug").range(from, from + 999);
      if (!data || data.length === 0) break;
      for (const b of data) if (b.slug) slugToId.set(b.slug, b.id);
      if (data.length < 1000) break;
    }

    const manifest: Record<string, unknown>[] = [];
    const seen = new Set<string>();

    for (const r of rows90) {
      const url = r.keys[0];
      let path = url;
      try { path = new URL(url).pathname; } catch { /* keep raw */ }
      const r28 = by28.get(url);
      const clicks90 = r.clicks ?? 0;
      const impressions90 = r.impressions ?? 0;

      let tier: string | null = null;
      let reason = "";
      if (FOUNDER_LOCKED.has(path)) {
        tier = "founder_locked";
        reason = "Founder-locked core route";
      } else if (clicks90 > 0) {
        tier = "protected";
        reason = `Earned ${clicks90} organic click(s) in the 90-day window`;
      } else if (impressions90 >= OPPORTUNITY_MIN_IMPRESSIONS_90D) {
        tier = "opportunity";
        reason = `No clicks but ${impressions90} impressions (>= ${OPPORTUNITY_MIN_IMPRESSIONS_90D}) in the 90-day window`;
      }
      if (!tier) continue;

      const slug = path.startsWith("/biz/") ? path.slice(5) : null;
      seen.add(url);
      manifest.push({
        url,
        route_family: routeFamilyOf(path),
        business_id: slug ? (slugToId.get(slug) ?? null) : null,
        business_slug: slug,
        clicks_28d: r28?.clicks ?? 0,
        clicks_90d: clicks90,
        impressions_28d: r28?.impressions ?? 0,
        impressions_90d: impressions90,
        ctr: r.ctr ?? 0,
        average_position: r.position ?? null,
        protection_tier: tier,
        protection_reason: reason,
        source_window: `${start90}..${end}`,
        updated_at: new Date().toISOString(),
      });
    }

    // Founder-locked routes are protected even with no Search Console rows.
    for (const path of FOUNDER_LOCKED) {
      const url = `${SITE_ORIGIN}${path === "/" ? "/" : path}`;
      if (seen.has(url)) continue;
      manifest.push({
        url,
        route_family: routeFamilyOf(path),
        clicks_28d: 0, clicks_90d: 0, impressions_28d: 0, impressions_90d: 0,
        protection_tier: "founder_locked",
        protection_reason: "Founder-locked core route (no Search Console rows in window)",
        source_window: `${start90}..${end}`,
        updated_at: new Date().toISOString(),
      });
    }

    let written = 0;
    for (let i = 0; i < manifest.length; i += 500) {
      const chunk = manifest.slice(i, i + 500);
      const { error } = await admin
        .from("seo_protected_urls")
        .upsert(chunk, { onConflict: "url", ignoreDuplicates: false });
      if (error) throw new Error(`Manifest upsert failed: ${error.message}`);
      written += chunk.length;
    }

    const counts = manifest.reduce<Record<string, number>>((acc, m) => {
      const t = String(m.protection_tier);
      acc[t] = (acc[t] ?? 0) + 1;
      return acc;
    }, {});

    return new Response(JSON.stringify({
      status: "ok",
      site_url: siteUrl,
      window: { start_90d: start90, start_28d: start28, end },
      pages_seen_90d: rows90.length,
      written,
      counts,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("sync-seo-protection failed:", message);
    return new Response(JSON.stringify({ error: "Search Console sync failed", details: message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
