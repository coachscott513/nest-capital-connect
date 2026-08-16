// Deterministic audit of the Tier B /biz static output in dist/.
import fs from "node:fs";
import path from "node:path";

const ORIGIN = "https://www.capitaldistrictnest.com";
const root = path.resolve("dist/biz");
const slugs = fs.existsSync(root) ? fs.readdirSync(root) : [];
const fail = { title: [], canonical: [], robots: [], h1: [], schema: [], nonwww: [], homeLeak: [] };

for (const slug of slugs) {
  const f = path.join(root, slug, "index.html");
  if (!fs.existsSync(f)) continue;
  const html = fs.readFileSync(f, "utf8");
  const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)].map((m) => m[1].trim());
  const canons = [...html.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)].map((m) => m[1]);
  const robots = [...html.matchAll(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/g)].map((m) => m[1]);
  if (titles.length !== 1 || !titles[0]) fail.title.push(slug);
  if (canons.length !== 1 || canons[0] !== `${ORIGIN}/biz/${slug}`) fail.canonical.push(slug);
  if (robots.length !== 1 || !/^index, follow/.test(robots[0])) fail.robots.push(slug);
  if (!/<h1>[^<]{2,}<\/h1>/.test(html)) fail.h1.push(slug);
  if (!/"@type":"LocalBusiness"/.test(html)) fail.schema.push(slug);
  if (/https:\/\/capitaldistrictnest\.com/.test(html)) fail.nonwww.push(slug);
  if (/Organization"|"WebSite"|Search anything local/.test(html)) fail.homeLeak.push(slug);
}

console.log(`\n=== /biz TIER B AUDIT ===\npages ......................... ${slugs.length}`);
for (const [k, v] of Object.entries(fail)) {
  console.log(`${(k + " ").padEnd(30, ".")} ${v.length}${v.length ? "  e.g. " + v.slice(0, 3).join(", ") : ""}`);
}
