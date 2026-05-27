// Generates public/sitemap.xml at predev/prebuild.
// Includes: curated static routes + all active /towns/:slug + all active /biz/:slug
// from Supabase. Excludes broken slugs, inactive rows, admin/owner/thank-you routes.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://www.capitaldistrictnest.com";
const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || "https://hstoxhgsvzlnwmagxfho.supabase.co";
const SUPABASE_ANON =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzdG94aGdzdnpsbndtYWd4ZmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNDcwMDIsImV4cCI6MjA4MDcyMzAwMn0.f7M0jSPjRBc0i4rUBDgCmdwg85ZT1DtuiYO0d6wAsVc";

type Entry = { path: string; changefreq?: string; priority?: string; lastmod?: string };

const today = new Date().toISOString().slice(0, 10);

// ── Curated static + content hub routes ─────────────────────────────
const STATIC: Entry[] = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/local", changefreq: "daily", priority: "0.95" },
  { path: "/analyze", changefreq: "weekly", priority: "1.0" },
  { path: "/analyze-home", changefreq: "weekly", priority: "0.9" },
  { path: "/analyze-any-property", changefreq: "weekly", priority: "1.0" },
  { path: "/markets", changefreq: "weekly", priority: "0.9" },
  { path: "/blog", changefreq: "daily", priority: "0.9" },
  { path: "/financing", changefreq: "monthly", priority: "0.9" },
  { path: "/communities", changefreq: "weekly", priority: "0.9" },
  { path: "/intelligence", changefreq: "weekly", priority: "0.9" },
  { path: "/sell-investment-property", changefreq: "monthly", priority: "0.9" },
  { path: "/first-time-homebuyers", changefreq: "monthly", priority: "0.9" },
  { path: "/investor-tools", changefreq: "weekly", priority: "0.9" },
  { path: "/rentals", changefreq: "weekly", priority: "0.8" },
  { path: "/loan-types", changefreq: "monthly", priority: "0.9" },
  { path: "/buyer-roadmap", changefreq: "monthly", priority: "0.8" },
  { path: "/reviews", changefreq: "monthly", priority: "0.7" },
  { path: "/pricing", changefreq: "monthly", priority: "0.7" },
  { path: "/claim-business", changefreq: "monthly", priority: "0.6" },
  // Living-In SEO pages
  ...[
    "delmar", "albany", "troy", "schenectady", "saratoga-springs",
    "clifton-park", "niskayuna", "guilderland", "voorheesville",
    "queensbury", "amsterdam",
  ].map((s) => ({ path: `/living-in-${s}`, changefreq: "weekly", priority: "0.9" })),
  // Analyzer sub-pages
  ...["condo", "single-family", "rental", "multifamily", "luxury", "commercial", "land"].map(
    (s) => ({ path: `/analyze/${s}`, changefreq: "monthly", priority: "0.8" })
  ),
  // Market pages
  { path: "/single-family-market", changefreq: "weekly", priority: "0.8" },
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

  // Towns
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
        path: `/towns/${slug}`,
        changefreq: "weekly",
        priority: "0.85",
        lastmod: (t.updated_at || today).slice(0, 10),
      });
    });
  } catch (e) {
    console.warn("sitemap: town fetch failed", e);
  }

  // Businesses — paginate to handle >1000 rows
  try {
    const pageSize = 1000;
    const seenBiz = new Set<string>();
    let from = 0;
    for (;;) {
      const { data, error } = await sb
        .from("businesses")
        .select("slug, updated_at, plan_tier, is_claimed")
        .eq("is_active", true)
        .range(from, from + pageSize - 1);
      if (error) {
        console.warn("sitemap: business fetch error", error.message);
        break;
      }
      if (!data || data.length === 0) break;
      data.forEach((b: any) => {
        const slug = (b.slug || "").trim().toLowerCase();
        if (isExcluded(slug) || seenBiz.has(slug)) return;
        seenBiz.add(slug);
        // Claimed / paid tiers get higher priority
        const tier = (b.plan_tier || "").toLowerCase();
        const priority =
          tier === "premium_partner" || tier === "spotlight"
            ? "0.75"
            : tier === "featured" || b.is_claimed
            ? "0.65"
            : "0.5";
        out.push({
          path: `/biz/${slug}`,
          changefreq: "monthly",
          priority,
          lastmod: (b.updated_at || today).slice(0, 10),
        });
      });
      if (data.length < pageSize) break;
      from += pageSize;
    }
  } catch (e) {
    console.warn("sitemap: business fetch failed", e);
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
        `    <lastmod>${e.lastmod || today}</lastmod>`,
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
