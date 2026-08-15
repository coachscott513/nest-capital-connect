/**
 * Read-only sitemap reconciliation.
 *
 * Compares public/sitemap.xml against the SEO protection manifest
 * (seo_protected_urls) and reports three sets:
 *   - protected URLs missing from the sitemap  (demand at risk)
 *   - sitemap URLs with no earned search value (noise)
 *   - protected URLs that are present and correct
 *
 * This script NEVER writes the sitemap and NEVER submits anything to
 * Google Search Console. Run it, read the report, decide separately.
 *
 * Usage: bunx tsx scripts/reconcile-sitemap.ts
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://www.capitaldistrictnest.com";

function sitemapPaths(): Set<string> {
  const xml = readFileSync(resolve("public/sitemap.xml"), "utf8");
  const paths = new Set<string>();
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    try {
      paths.add(new URL(m[1]).pathname);
    } catch {
      /* ignore malformed entry */
    }
  }
  return paths;
}

async function manifest() {
  const url = process.env.VITE_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY!;
  const supabase = createClient(url, key);
  const rows: { url: string; protection_tier: string; clicks_90d: number }[] = [];
  for (let from = 0; from < 20000; from += 1000) {
    const { data, error } = await supabase
      .from("seo_protected_urls")
      .select("url,protection_tier,clicks_90d")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    rows.push(...(data as typeof rows));
    if (data.length < 1000) break;
  }
  return rows;
}

async function main() {
  const inSitemap = sitemapPaths();
  const rows = await manifest();
  if (rows.length === 0) {
    console.warn(
      "Manifest read returned 0 rows. seo_protected_urls is admin-only; run this script with SUPABASE_SERVICE_ROLE_KEY set, or read the same reconciliation from /admin/mission-control.",
    );
  }

  const missing: typeof rows = [];
  const present: typeof rows = [];
  for (const r of rows) {
    let path = r.url;
    try {
      path = new URL(r.url).pathname;
    } catch {
      /* keep raw */
    }
    (inSitemap.has(path) ? present : missing).push(r);
  }

  const manifestPaths = new Set(
    rows.map((r) => {
      try {
        return new URL(r.url).pathname;
      } catch {
        return r.url;
      }
    }),
  );
  const unearned = [...inSitemap].filter((p) => !manifestPaths.has(p));

  console.log(`Base URL:            ${BASE_URL}`);
  console.log(`Sitemap URLs:        ${inSitemap.size}`);
  console.log(`Manifest URLs:       ${rows.length}`);
  console.log(`Protected & present: ${present.length}`);
  console.log(`Protected & MISSING: ${missing.length}`);
  console.log(`Sitemap w/o demand:  ${unearned.length}`);
  console.log("\n-- Highest-value URLs missing from the sitemap --");
  for (const r of missing.sort((a, b) => b.clicks_90d - a.clicks_90d).slice(0, 40)) {
    console.log(`${String(r.clicks_90d).padStart(4)} clicks  ${r.protection_tier.padEnd(15)} ${r.url}`);
  }
  console.log("\nNo files were written and nothing was submitted to Search Console.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
