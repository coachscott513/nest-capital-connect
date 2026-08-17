/**
 * Deterministic post-build snapshot audit.
 * Parses every URL in public/sitemap.xml, opens its prerendered snapshot in
 * dist/, and validates the crawler-facing head/content contract.
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const HOST = "https://www.capitaldistrictnest.com";

// Routes whose canonical is deliberately owned by an external property.
const EXTERNAL_CANONICAL_ALLOWLIST = {
  "/analyze-any-deal": "https://www.analyzeanydeal.com",
  "/analyze-any-property": "https://www.analyzeanyproperty.com",
  "/analyze-any-home": "https://www.analyzeanyhome.com",
  "/analyze-home": "https://www.analyzeanyhome.com",
};

const HOMEPAGE_TITLE_FINGERPRINT = "The Digital Front Door of the Capital District";
const HOMEPAGE_BODY_FINGERPRINT = "Search anything local.";
// Neutral shell default title shipped in index.html — never valid on an inner route.
const SHELL_DEFAULT_TITLE = "Capital District Nest";

const xml = fs.readFileSync(path.join(ROOT, "public/sitemap.xml"), "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

function snapshotPath(route) {
  if (route === "/") return path.join(ROOT, "dist/index.html");
  return path.join(ROOT, "dist", route.replace(/^\//, ""), "index.html");
}

const totals = {
  sitemapUrls: urls.length,
  snapshotPresent: 0,
  snapshotMissing: [],
  nonemptyTitle: 0,
  multipleTitles: [],
  emptyTitle: [],
  multipleCanonicals: [],
  missingCanonical: [],
  homepageCanonicalOnNonHome: [],
  nonWwwCanonical: [],
  duplicateRobots: [],
  unintendedNoindex: [],
  homepageFingerprintMismatch: [],
  missingBodyOrH1: [],
  placeholderSchemaRefs: [],
  routeContentMismatch: [],
  externalCanonicalOk: [],
};

for (const url of urls) {
  const route = new URL(url).pathname.replace(/\/+$/, "") || "/";
  const file = snapshotPath(route);
  if (!fs.existsSync(file)) {
    totals.snapshotMissing.push(route);
    continue;
  }
  totals.snapshotPresent++;
  const html = fs.readFileSync(file, "utf8");
  const head = html.slice(0, html.indexOf("</head>") + 7);

  // title
  const titles = [...head.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/g)].map((m) => m[1].trim());
  if (titles.length > 1) totals.multipleTitles.push(`${route} (${titles.length})`);
  if (titles.length === 0 || !titles[0]) totals.emptyTitle.push(route);
  else totals.nonemptyTitle++;

  // canonical
  const canonicals = [...head.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)].map((m) => m[1]);
  if (canonicals.length > 1) totals.multipleCanonicals.push(`${route} (${canonicals.length})`);
  if (canonicals.length === 0) totals.missingCanonical.push(route);

  const allowed = EXTERNAL_CANONICAL_ALLOWLIST[route];
  const canonical = canonicals[0];
  if (canonical) {
    if (allowed && canonical.startsWith(allowed)) {
      totals.externalCanonicalOk.push(`${route} -> ${canonical}`);
    } else {
      if (route !== "/" && (canonical === `${HOST}/` || canonical === HOST))
        totals.homepageCanonicalOnNonHome.push(route);
      if (/^https:\/\/capitaldistrictnest\.com/.test(canonical))
        totals.nonWwwCanonical.push(`${route} -> ${canonical}`);
      const expected = route === "/" ? `${HOST}/` : `${HOST}${route}`;
      if (!allowed && canonical !== expected && !canonical.startsWith(`${HOST}${route}?`))
        totals.routeContentMismatch.push(`${route} canonical=${canonical}`);
    }
  }

  // robots
  const robots = [...head.matchAll(/<meta[^>]*name="robots"[^>]*content="([^"]*)"[^>]*>/g)].map((m) => m[1]);
  if (robots.length > 1) totals.duplicateRobots.push(`${route} (${robots.length})`);
  if (robots.some((r) => /noindex/i.test(r))) totals.unintendedNoindex.push(route);

  // homepage identity leakage
  if (route !== "/") {
    if (titles[0] && titles[0].includes(HOMEPAGE_TITLE_FINGERPRINT))
      totals.homepageFingerprintMismatch.push(`${route} title`);
    else if (html.includes(`<h1`) && html.includes(`>${HOMEPAGE_BODY_FINGERPRINT}<`))
      totals.homepageFingerprintMismatch.push(`${route} body-h1`);
  }

  // body / h1
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  const bodyText = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  if (h1s.length === 0 || bodyText.trim().length < 500) totals.missingBodyOrH1.push(route);

  // placeholder schema refs
  if (/your-domain\.com|example\.com|lovableproject\.com/.test(head))
    totals.placeholderSchemaRefs.push(route);
}

const fmt = (arr) => (arr.length ? `${arr.length}\n      ${arr.slice(0, 25).join("\n      ")}${arr.length > 25 ? `\n      … +${arr.length - 25} more` : ""}` : "0");

console.log(`
=== SNAPSHOT AUDIT ===
sitemap URLs .................. ${totals.sitemapUrls}
snapshots present ............. ${totals.snapshotPresent}
snapshots missing ............. ${fmt(totals.snapshotMissing)}
nonempty titles ............... ${totals.nonemptyTitle}
empty title ................... ${fmt(totals.emptyTitle)}
>1 title ...................... ${fmt(totals.multipleTitles)}
>1 canonical .................. ${fmt(totals.multipleCanonicals)}
missing canonical ............. ${fmt(totals.missingCanonical)}
homepage canonical off-home ... ${fmt(totals.homepageCanonicalOnNonHome)}
non-www canonical ............. ${fmt(totals.nonWwwCanonical)}
duplicate robots .............. ${fmt(totals.duplicateRobots)}
noindex ....................... ${fmt(totals.unintendedNoindex)}
homepage fingerprint leak ..... ${fmt(totals.homepageFingerprintMismatch)}
missing body/H1 ............... ${fmt(totals.missingBodyOrH1)}
placeholder schema refs ....... ${fmt(totals.placeholderSchemaRefs)}
route/canonical mismatch ...... ${fmt(totals.routeContentMismatch)}
approved external canonicals .. ${fmt(totals.externalCanonicalOk)}
`);
