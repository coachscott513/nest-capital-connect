// Tier B: deterministic, data-backed static HTML for every eligible
// /biz/:slug page. No browser, no per-page Puppeteer wait — pure string
// templating from a single paginated Supabase read, so thousands of pages
// cost seconds, not hours.
//
// Each emitted document carries route-specific title/description, a
// self-canonical www URL, index,follow, a real H1 and factual body copy, and
// LocalBusiness schema built only from fields present on the real record.
// It loads the same hashed JS/CSS as the app, so React hydrates the normal
// route and the approved visible design is unchanged.
//
// Run AFTER `vite build` (dist must exist).

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { fetchEligibleBusinesses } from "./biz-eligibility.mjs";

const ORIGIN = "https://www.capitaldistrictnest.com";
const DIST = path.resolve("dist");

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://hstoxhgsvzlnwmagxfho.supabase.co";
const SUPABASE_ANON =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzdG94aGdzdnpsbndtYWd4ZmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNDcwMDIsImV4cCI6MjA4MDcyMzAwMn0.f7M0jSPjRBc0i4rUBDgCmdwg85ZT1DtuiYO0d6wAsVc";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const t = (v) => (typeof v === "string" ? v.trim() : "");

function assetTags() {
  const html = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
  const scripts = [...html.matchAll(/<script[^>]+type="module"[^>]*src="\/assets\/[^"]+"[^>]*><\/script>/g)]
    .map((m) => m[0])
    .join("\n    ");
  const styles = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^"]+"[^>]*>/g)]
    .map((m) => m[0])
    .join("\n    ");
  if (!scripts) throw new Error("no hashed module script found in dist/index.html");
  return { scripts, styles };
}

function locality(b) {
  const town = t(b.town_name) || t(b.city);
  return [town, t(b.state) || "NY"].filter(Boolean).join(", ");
}

function describe(b) {
  const base = t(b.description) || t(b.long_description);
  if (base.length > 60) return base.slice(0, 300);
  return `${t(b.name)} is a ${t(b.category).toLowerCase()} business in ${locality(b)}. Find address, contact details and local context on Capital District Nest.`;
}

function schema(b, url) {
  const address = {
    "@type": "PostalAddress",
    ...(t(b.address) && { streetAddress: t(b.address) }),
    ...((t(b.city) || t(b.town_name)) && { addressLocality: t(b.city) || t(b.town_name) }),
    addressRegion: t(b.state) || "NY",
    ...(t(b.zipcode) && { postalCode: t(b.zipcode) }),
    addressCountry: "US",
  };
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: t(b.name),
    url,
    address,
    ...(t(b.phone) && { telephone: t(b.phone) }),
    ...(t(b.website) && { sameAs: [t(b.website)] }),
    ...(t(b.category) && { additionalType: t(b.category) }),
  };
}

function doc(b, { scripts, styles }) {
  const url = `${ORIGIN}/biz/${b.slug}`;
  const title = `${t(b.name)} — ${locality(b)} | Capital District Nest`;
  const desc = describe(b);
  const facts = [
    t(b.address) && `<li>Address: ${esc(b.address)}</li>`,
    t(b.phone) && `<li>Phone: ${esc(b.phone)}</li>`,
    t(b.website) && `<li>Website: ${esc(b.website)}</li>`,
    t(b.category) && `<li>Category: ${esc(b.category)}</li>`,
  ]
    .filter(Boolean)
    .join("\n        ");

  return `<!DOCTYPE html>
<html lang="en" class="dark" style="background-color: #0B0B0B;">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.png" type="image/png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="business.business" />
    <meta property="og:site_name" content="Capital District Nest" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="${url}" />
    <script type="application/ld+json">${JSON.stringify(schema(b, url))}</script>
    ${styles}
    ${scripts}
  </head>
  <body style="background-color: #0B0B0B; color: #FFFFFF;">
    <div id="root"><main>
      <h1>${esc(b.name)}</h1>
      <p>${esc(desc)}</p>
      <ul>
        ${facts}
      </ul>
    </main></div>
  </body>
</html>
`;
}

const started = Date.now();
const sb = createClient(SUPABASE_URL, SUPABASE_ANON);
const rows = await fetchEligibleBusinesses(sb);
const tags = assetTags();
let written = 0;
for (const b of rows) {
  const dir = path.join(DIST, "biz", b.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), doc(b, tags), "utf8");
  written += 1;
}
console.log(`[prerender-biz] wrote ${written} eligible /biz pages in ${((Date.now() - started) / 1000).toFixed(1)}s`);
