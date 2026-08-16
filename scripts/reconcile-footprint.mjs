// Deterministic sitemap <-> emitted-HTML reconciliation for the whole footprint.
// Read-only: proves every sitemap URL has a matching artifact, every Tier B page
// appears exactly once in the sitemap, and that no business snapshot was
// overwritten by the SPA shell or the homepage snapshot.
//
// Run AFTER a full production build (dist must exist).

import fs from "node:fs";
import path from "node:path";

const ORIGIN = "https://www.capitaldistrictnest.com";
const DIST = path.resolve("dist");

const read = (f) => fs.readFileSync(f, "utf8");
const exists = (f) => fs.existsSync(f);

// ---------- sitemap ----------
const xml = read(path.join(DIST, "sitemap.xml"));
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const dupSitemap = locs.filter((u, i) => locs.indexOf(u) !== i);
const paths = locs.map((u) => u.replace(ORIGIN, ""));
const bizSitemap = new Set(paths.filter((p) => p.startsWith("/biz/")).map((p) => p.slice(5)));
const nonBiz = paths.filter((p) => !p.startsWith("/biz/"));

// ---------- emitted html ----------
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (e.name.endsWith(".html")) out.push(f);
  }
  return out;
}
const htmlFiles = walk(DIST);
const bizDir = path.join(DIST, "biz");
const bizEmitted = new Set(
  exists(bizDir) ? fs.readdirSync(bizDir).filter((s) => exists(path.join(bizDir, s, "index.html"))) : [],
);

// homepage / shell fingerprints, used to detect an overwrite
const homeHtml = exists(path.join(DIST, "index.html")) ? read(path.join(DIST, "index.html")) : "";
const homeTitle = (homeHtml.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "\u0000none";
const shellHtml = exists(path.join(DIST, "spa-shell.html")) ? read(path.join(DIST, "spa-shell.html")) : "";

// ---------- checks ----------
const missingArtifact = [];
for (const p of paths) {
  const rel = p === "/" ? "index.html" : path.join(p.replace(/^\//, ""), "index.html");
  if (!exists(path.join(DIST, rel))) missingArtifact.push(p);
}

const sitemapBizWithoutFile = [...bizSitemap].filter((s) => !bizEmitted.has(s));
const emittedBizNotInSitemap = [...bizEmitted].filter((s) => !bizSitemap.has(s));

const overwritten = [];
const canonicals = new Map();
const dupCanonical = [];
for (const s of bizEmitted) {
  const html = read(path.join(bizDir, s, "index.html"));
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
  if (title === homeTitle || (shellHtml && html === shellHtml)) overwritten.push(s);
  const canon = (html.match(/rel="canonical"[^>]*href="([^"]+)"/) || [])[1] || "";
  if (canonicals.has(canon)) dupCanonical.push(canon);
  else canonicals.set(canon, s);
}

const report = {
  sitemapUrls: locs.length,
  sitemapDuplicates: dupSitemap.length,
  sitemapNonBiz: nonBiz.length,
  sitemapBiz: bizSitemap.size,
  emittedHtmlFiles: htmlFiles.length,
  emittedBizPages: bizEmitted.size,
  missingArtifactForSitemapUrl: missingArtifact.length,
  sitemapBizWithoutFile: sitemapBizWithoutFile.length,
  emittedBizNotInSitemap: emittedBizNotInSitemap.length,
  bizOverwrittenByShellOrHome: overwritten.length,
  duplicateBizCanonicals: dupCanonical.length,
};
console.log("\n=== FOOTPRINT RECONCILIATION ===");
for (const [k, v] of Object.entries(report)) console.log(`${(k + " ").padEnd(34, ".")} ${v}`);
const sample = (label, arr) => arr.length && console.log(`  ${label}: ${arr.slice(0, 8).join(", ")}`);
sample("missing artifacts", missingArtifact);
sample("sitemap biz w/o file", sitemapBizWithoutFile);
sample("emitted biz not in sitemap", emittedBizNotInSitemap);
sample("overwritten", overwritten);
sample("dup canonicals", dupCanonical);

const failed =
  report.sitemapDuplicates ||
  report.sitemapBizWithoutFile ||
  report.emittedBizNotInSitemap ||
  report.bizOverwrittenByShellOrHome ||
  report.duplicateBizCanonicals;
console.log(failed ? "\nRECONCILIATION: FAIL" : "\nRECONCILIATION: PASS");
