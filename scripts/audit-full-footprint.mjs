// Full-footprint acceptance audit: every URL in dist/sitemap.xml is checked
// against its emitted HTML artifact. Read-only.
//
// Run AFTER a full production build.

import fs from "node:fs";
import path from "node:path";

const ORIGIN = "https://www.capitaldistrictnest.com";
const DIST = path.resolve("dist");
const xml = fs.readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

const homeFile = path.join(DIST, "index.html");
const homeHtml = fs.existsSync(homeFile) ? fs.readFileSync(homeFile, "utf8") : "";
const homeTitle = (homeHtml.match(/<title>([\s\S]*?)<\/title>/) || [])[1]?.trim() || "\u0000";
const homeH1 = (homeHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.replace(/<[^>]+>/g, "").trim() || "\u0000";

const family = (p) => {
  if (p === "/") return "/ (home)";
  if (p.startsWith("/biz/")) return "/biz/*";
  const seg = p.split("/")[1];
  return "/" + seg;
};

const defects = {};
const add = (fam, kind, url) => {
  defects[fam] ??= {};
  (defects[fam][kind] ??= []).push(url);
};

let checked = 0;
for (const url of urls) {
  const p = url.replace(ORIGIN, "") || "/";
  const fam = family(p);
  const file = path.join(DIST, p === "/" ? "index.html" : path.join(p.replace(/^\//, ""), "index.html"));
  if (!fs.existsSync(file)) {
    add(fam, "missingArtifact", p);
    continue;
  }
  checked += 1;
  const html = fs.readFileSync(file, "utf8");
  const head = html.split("</head>")[0] || html;

  const titles = [...head.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/g)].map((m) => m[1].trim());
  const canons = [...head.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)].map((m) => m[1]);
  const robots = [...head.matchAll(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/g)].map((m) => m[1]);
  const ogUrls = [...head.matchAll(/<meta[^>]+property="og:url"[^>]+content="([^"]+)"/g)].map((m) => m[1]);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  const ld = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const body = (html.split("<body")[1] || "").replace(/<script[\s\S]*?<\/script>/g, "");
  const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  if (titles.length !== 1 || !titles[0]) add(fam, "titleCount", p);
  if (p !== "/" && titles[0] === homeTitle) add(fam, "homepageTitleLeak", p);
  if (canons.length !== 1) add(fam, "canonicalCount", p);
  if (canons[0] && canons[0] !== url) add(fam, "canonicalMismatch", `${p} -> ${canons[0]}`);
  if (canons[0] && !canons[0].startsWith(ORIGIN)) add(fam, "canonicalHost", p);
  if (robots.length > 1) add(fam, "robotsCount", p);
  if (robots[0] && /noindex/i.test(robots[0])) add(fam, "unintendedNoindex", p);
  if (new Set(ogUrls).size > 1) add(fam, "ogUrlConflict", p);
  if (ogUrls[0] && canons[0] && ogUrls[0] !== canons[0]) add(fam, "ogUrlCanonicalMismatch", p);
  if (h1s.length === 0) add(fam, "missingH1", p);
  if (p !== "/" && h1s[0] && h1s[0] === homeH1) add(fam, "homepageH1Leak", p);
  if (text.length < 200) add(fam, "thinBody", p);
  if (/your-domain\.com/.test(html)) add(fam, "placeholderDomain", p);

  const types = [];
  for (const raw of ld) {
    try {
      const j = JSON.parse(raw);
      const collect = (n) => {
        if (!n || typeof n !== "object") return;
        if (Array.isArray(n)) return n.forEach(collect);
        if (n["@type"]) types.push(...[].concat(n["@type"]));
        if (n["@graph"]) collect(n["@graph"]);
      };
      collect(j);
    } catch {
      add(fam, "brokenJsonLd", p);
    }
  }
  if (!p.startsWith("/biz/") && types.includes("LocalBusiness") && fam !== "/ (home)") {
    // LocalBusiness on a non-business page is only acceptable on the brand's own
    // org/contact surfaces; flag everything else for review.
    if (!/^\/(contact|about|for-businesses|privacy-policy|closing-team|investor-tools)/.test(p))
      add(fam, "localBusinessOnNonBusinessPage", p);
  }
}

console.log(`\n=== FULL SITEMAP AUDIT === (${urls.length} urls, ${checked} artifacts read)`);
const fams = Object.keys(defects).sort();
if (!fams.length) console.log("no defects");
for (const f of fams) {
  const kinds = defects[f];
  const total = Object.values(kinds).reduce((a, b) => a + b.length, 0);
  console.log(`\n${f}  (${total} defects)`);
  for (const [k, v] of Object.entries(kinds)) {
    console.log(`  ${(k + " ").padEnd(30, ".")} ${v.length}  e.g. ${v.slice(0, 3).join(" | ")}`);
  }
}
