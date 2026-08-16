// Generates public/sitemap.xml at predev/prebuild.
// Includes: curated static routes + all active /towns/:slug + every
// publicly-eligible /biz/:slug from Supabase, using the SAME shared contract
// (scripts/biz-eligibility.mjs) that drives Tier B static HTML generation, so
// sitemap membership and crawler-facing HTML can never drift apart.
// SEO-protected /biz/* URLs that map to a real active record are included via
// a protected-record override even when they fail the quality floor.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
// @ts-ignore - plain ESM module shared with the Tier B generator
import { fetchEligibleBusinesses } from "./biz-eligibility.mjs";


const BASE_URL = "https://www.capitaldistrictnest.com";
const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || "https://hstoxhgsvzlnwmagxfho.supabase.co";
const SUPABASE_ANON =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzdG94aGdzdnpsbndtYWd4ZmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNDcwMDIsImV4cCI6MjA4MDcyMzAwMn0.f7M0jSPjRBc0i4rUBDgCmdwg85ZT1DtuiYO0d6wAsVc";

type Entry = { path: string; changefreq?: string; priority?: string; lastmod?: string };


// ── Curated static + content hub routes ─────────────────────────────
const STATIC: Entry[] = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/local", changefreq: "daily", priority: "0.95" },
  { path: "/weekly", changefreq: "daily", priority: "0.95" },
  { path: "/homes", changefreq: "daily", priority: "0.9" },
  { path: "/communities", changefreq: "weekly", priority: "0.9" },
  { path: "/submit-event", changefreq: "monthly", priority: "0.6" },
  { path: "/finances", changefreq: "weekly", priority: "1.0" },
  { path: "/analyze-home", changefreq: "weekly", priority: "0.9" },
  { path: "/analyze-any-property", changefreq: "weekly", priority: "1.0" },
  { path: "/markets", changefreq: "weekly", priority: "0.9" },
  { path: "/blog", changefreq: "daily", priority: "0.9" },
  { path: "/financing", changefreq: "monthly", priority: "0.9" },
  { path: "/intelligence", changefreq: "weekly", priority: "0.9" },
  { path: "/sell-investment-property", changefreq: "monthly", priority: "0.9" },
  { path: "/first-time-homebuyers", changefreq: "monthly", priority: "0.9" },
  { path: "/investor-tools", changefreq: "weekly", priority: "0.9" },
  { path: "/rentals", changefreq: "weekly", priority: "0.8" },
  { path: "/loan-types", changefreq: "monthly", priority: "0.9" },
  { path: "/buyer-roadmap", changefreq: "monthly", priority: "0.8" },
  { path: "/reviews", changefreq: "monthly", priority: "0.7" },
  { path: "/pricing", changefreq: "monthly", priority: "0.7" },
  { path: "/business", changefreq: "weekly", priority: "0.9" },
  { path: "/claim-business", changefreq: "monthly", priority: "0.6" },
  // Market Reports — open-access housing data
  { path: "/market-reports", changefreq: "weekly", priority: "0.9" },
  ...[
    "albany", "troy", "schenectady", "saratoga-springs", "delmar",
    "clifton-park", "niskayuna", "guilderland", "colonie", "latham",
    "queensbury", "lake-george", "amsterdam", "gloversville",
  ].map((slug) => ({
    path: `/market-reports/${slug}`,
    changefreq: "weekly" as const,
    priority: "0.85",
  })),
  // Living-In town pages (canonical: /living-in/:slug)
  ...[
    "delmar", "albany", "troy", "schenectady", "saratoga-springs",
    "clifton-park", "niskayuna", "guilderland", "voorheesville",
    "queensbury", "amsterdam",
  ].map((s) => ({ path: `/living-in/${s}`, changefreq: "weekly", priority: "0.9" })),
  // Analyzer sub-pages
  ...["condo", "single-family", "rental", "multifamily", "luxury", "commercial", "land"].map(
    (s) => ({ path: `/analyze/${s}`, changefreq: "monthly", priority: "0.8" })
  ),
  // Market pages
  { path: "/albany-multi-unit", changefreq: "weekly", priority: "0.8" },
  { path: "/schenectady-multi-unit", changefreq: "weekly", priority: "0.8" },
  { path: "/troy-multi-unit", changefreq: "weekly", priority: "0.8" },
  { path: "/albany-investment-properties", changefreq: "weekly", priority: "0.8" },
  { path: "/investment-properties", changefreq: "weekly", priority: "0.8" },
  { path: "/land-buyers", changefreq: "monthly", priority: "0.8" },
  { path: "/schenectady-county-real-estate", changefreq: "weekly", priority: "0.8" },
  // Investor pages
  { path: "/investor/nyc-to-albany-roi", changefreq: "monthly", priority: "0.7" },
  { path: "/investor/albany-multi-unit-market", changefreq: "monthly", priority: "0.7" },
  { path: "/investor/1031-nyc-to-albany", changefreq: "monthly", priority: "0.7" },
  { path: "/investor/best-neighborhoods-cash-flow-capital-district", changefreq: "monthly", priority: "0.7" },
  { path: "/investor/saratoga-multi-unit-market", changefreq: "monthly", priority: "0.7" },
  { path: "/investor/fulton-montgomery-multi-unit-market", changefreq: "monthly", priority: "0.7" },
  // Buyer journey
  { path: "/buyer-journey/first-time-buyer", changefreq: "monthly", priority: "0.7" },
  { path: "/buyer-journey/financing", changefreq: "monthly", priority: "0.7" },
  { path: "/buyer-journey/investor", changefreq: "monthly", priority: "0.7" },
  { path: "/buyer-journey/land-buyer", changefreq: "monthly", priority: "0.7" },
  // Search hubs
  { path: "/search/single-family", changefreq: "weekly", priority: "0.7" },
  { path: "/search/investors", changefreq: "weekly", priority: "0.7" },
  { path: "/search/foreclosures", changefreq: "weekly", priority: "0.7" },
  { path: "/search/land", changefreq: "weekly", priority: "0.7" },
  { path: "/search/rentals", changefreq: "weekly", priority: "0.7" },
  // Supplementary
  { path: "/grants", changefreq: "monthly", priority: "0.5" },
  { path: "/cash-flow-report", changefreq: "monthly", priority: "0.5" },
  { path: "/market-insights", changefreq: "weekly", priority: "0.5" },
  { path: "/vendors", changefreq: "monthly", priority: "0.5" },
  { path: "/ask", changefreq: "monthly", priority: "0.5" },
  { path: "/site-index", changefreq: "monthly", priority: "0.4" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
];

// Excluded route patterns (defense-in-depth)
const isExcluded = (slug: string) =>
  !slug ||
  /[^a-z0-9-]/i.test(slug) || // only safe URL chars
  slug.length < 2 ||
  slug.length > 120;

async function fetchDynamic(): Promise<Entry[]> {
  const sb = createClient(SUPABASE_URL, SUPABASE_ANON);
  const out: Entry[] = [];

  // Towns — canonical URL is /living-in/:slug
  try {
    const { data: towns } = await sb
      .from("town_market_data")
      .select("town_slug, updated_at, is_active")
      .eq("is_active", true);
    const seenTowns = new Set<string>();
    (towns || []).forEach((t: any) => {
      const slug = (t.town_slug || "").trim().toLowerCase();
      if (isExcluded(slug) || seenTowns.has(slug)) return;
      seenTowns.add(slug);
      out.push({
        path: `/living-in/${slug}`,
        changefreq: "weekly",
        priority: "0.85",
        lastmod: t.updated_at ? String(t.updated_at).slice(0, 10) : undefined,
      });
    });
  } catch (e) {
    console.warn("sitemap: town fetch failed", e);
  }

  // Businesses — shared eligibility contract (scripts/biz-eligibility.mjs).
  // Same membership the Tier B static HTML generator uses, plus SEO-protected
  // record overrides. Thin/synthetic/quarantined rows stay out.
  try {
    const biz: any[] = await fetchEligibleBusinesses(sb);
    const stats = (biz as any).stats || { eligible: biz.length, overrides: [], heldProtected: [] };
    for (const b of biz) {
      // Slug validity is already enforced by the shared contract
      // (hasCanonicalSlug); do not re-filter with the stricter static-route
      // charset check, which would silently drop valid underscore slugs.
      const slug = String(b.slug || "").trim().toLowerCase();
      const tier = String(b.plan_tier || "").toLowerCase();
      const priority =
        tier === "premium_partner" || tier === "spotlight" || tier === "anchor"
          ? "0.75"
          : tier === "featured" || b.is_claimed
          ? "0.65"
          : "0.5";
      out.push({
        path: `/biz/${slug}`,
        changefreq: "monthly",
        priority,
        lastmod: b.updated_at ? String(b.updated_at).slice(0, 10) : undefined,
      });
    }
    console.log(
      `sitemap: businesses ${biz.length} (eligible ${stats.eligible} + protected overrides ${stats.overrides.length}); protected held ${stats.heldProtected.length}${
        stats.heldProtected.length ? " -> " + stats.heldProtected.join(", ") : ""
      }`
    );
  } catch (e) {
    console.warn("sitemap: business fetch failed", e);
  }

  // Property board town pages (/homes/listings/:townSlug) — one per distinct town with listings.
  try {
    const { data: townRows } = await sb
      .from("property_listings")
      .select("town_slug")
      .neq("status", "archived")
      .not("town_slug", "is", null)
      .limit(10000);
    const townCounts = new Map<string, number>();
    (townRows || []).forEach((r: any) => {
      const slug = (r.town_slug || "").trim().toLowerCase();
      if (isExcluded(slug)) return;
      townCounts.set(slug, (townCounts.get(slug) || 0) + 1);
    });
    Array.from(townCounts.entries()).forEach(([slug, count]) => {
      if (count < 3) return; // skip thin town boards
      out.push({
        path: `/homes/listings/${slug}`,
        changefreq: "weekly",
        priority: "0.75",
      });
    });
  } catch (e) {
    console.warn("sitemap: property town fetch failed", e);
  }

  // Approved property link previews (only indexable rows with public URL).
  try {
    const { data: approved } = await sb
      .from("property_listings")
      .select("town_slug, address_slug, updated_at")
      .eq("status", "approved")
      .eq("is_indexable", true)
      .not("public_listing_url", "is", null)
      .limit(5000);
    (approved || []).forEach((r: any) => {
      const t = (r.town_slug || "").trim().toLowerCase();
      const a = (r.address_slug || "").trim().toLowerCase();
      if (isExcluded(t) || isExcluded(a)) return;
      out.push({
        path: `/homes/listings/${t}/${a}`,
        changefreq: "weekly",
        priority: "0.55",
        lastmod: r.updated_at ? String(r.updated_at).slice(0, 10) : undefined,
      });
    });
  } catch (e) {
    console.warn("sitemap: approved listings fetch failed", e);
  }

  // Claimed listing agents.
  try {
    const { data: agents } = await sb
      .from("listing_agents")
      .select("slug, updated_at, claim_status, is_featured")
      .limit(5000);
    (agents || []).forEach((a: any) => {
      const slug = (a.slug || "").trim().toLowerCase();
      if (isExcluded(slug)) return;
      if (a.claim_status !== "claimed" && !a.is_featured) return;
      out.push({
        path: `/homes/agents/${slug}`,
        changefreq: "monthly",
        priority: "0.6",
        lastmod: a.updated_at ? String(a.updated_at).slice(0, 10) : undefined,
      });
    });
  } catch (e) {
    console.warn("sitemap: agent fetch failed", e);
  }

  return out;
}

function renderXml(entries: Entry[]): string {
  const seen = new Set<string>();
  const urls = entries
    .filter((e) => {
      if (seen.has(e.path)) return false;
      seen.add(e.path);
      return true;
    })
    .map((e) =>
      [
        "  <url>",
        `    <loc>${BASE_URL}${e.path}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : "",
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : "",
        e.priority ? `    <priority>${e.priority}</priority>` : "",
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n")
    );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

(async () => {
  const dynamic = await fetchDynamic();
  const all = [...STATIC, ...dynamic];
  const xml = renderXml(all);
  writeFileSync(resolve("public/sitemap.xml"), xml);
  console.log(
    `sitemap.xml written — ${all.length} entries (${STATIC.length} static + ${dynamic.length} dynamic)`
  );
})();
