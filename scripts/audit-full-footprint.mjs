// Full-footprint acceptance audit. Read-only.
// Shares scripts/head-contract.mjs with scripts/audit-snapshots.mjs so both
// audits check the same paths with the same rules and report the same counts,
// grouped here by route family. Run AFTER a full production build.

import fs from "node:fs";
import path from "node:path";
import {
  auditRoutes,
  groupDefects,
  artifactPath,
  parseSnapshot,
  isTierB,
  NON_BLOCKING,
} from "./head-contract.mjs";

const DIST = path.resolve("dist");
const r = auditRoutes(DIST);
const byKind = groupDefects(r.defects);

const family = (p) => {
  if (p === "/") return "/ (home)";
  if (isTierB(p)) return "/biz/*";
  return "/" + p.split("/")[1];
};

// Homepage identity leakage (family-level check, layered on the shared contract)
const homeFile = path.join(DIST, "index.html");
const home = fs.existsSync(homeFile) ? parseSnapshot(fs.readFileSync(homeFile, "utf8")) : null;
const leaks = { title: [], h1: [] };
if (home) {
  for (const route of r.checked) {
    if (route === "/") continue;
    const s = parseSnapshot(fs.readFileSync(artifactPath(DIST, route), "utf8"));
    if (home.titles[0] && s.titles[0] === home.titles[0]) leaks.title.push(route);
    if (home.h1s[0] && s.h1s[0] === home.h1s[0]) leaks.h1.push(route);
  }
}

const perFamily = {};
for (const { kind, detail } of r.defects) {
  const route = String(detail).split(" ")[0];
  const fam = family(route);
  ((perFamily[fam] ??= {})[kind] ??= []).push(detail);
}
for (const route of r.missingArtifact) ((perFamily[family(route)] ??= {}).missingArtifact ??= []).push(route);
for (const route of leaks.title) ((perFamily[family(route)] ??= {}).homepageTitleLeak ??= []).push(route);
for (const route of leaks.h1) ((perFamily[family(route)] ??= {}).homepageH1Leak ??= []).push(route);

console.log(`\n=== FULL SITEMAP AUDIT (shared head contract) ===`);
console.log(`sitemap ....................... ${r.sitemapFile} (checksum ${r.checksum})`);
console.log(`urls .......................... ${r.routes.length}`);
console.log(`  Tier A ...................... ${r.routes.filter((p) => !isTierB(p)).length}`);
console.log(`  Tier B (/biz/*) ............. ${r.routes.filter(isTierB).length}`);
console.log(`artifacts read ................ ${r.checked.length}`);
console.log(`thin bodies (non-blocking) .... ${r.thin.length}`);

const fams = Object.keys(perFamily).sort();
if (!fams.length) console.log("\nno defects");
for (const f of fams) {
  const kinds = perFamily[f];
  const total = Object.values(kinds).reduce((a, b) => a + b.length, 0);
  console.log(`\n${f}  (${total} defects)`);
  for (const [k, v] of Object.entries(kinds))
    console.log(`  ${(k + " ").padEnd(30, ".")} ${v.length}  e.g. ${v.slice(0, 3).join(" | ")}`);
}

const blockingKinds = Object.keys(byKind).filter((k) => !NON_BLOCKING.has(k));
const blockingCount =
  blockingKinds.reduce((a, k) => a + byKind[k].length, 0) +
  r.missingArtifact.length +
  leaks.title.length +
  leaks.h1.length;

console.log(`\nshared-contract defect total .. ${blockingCount}`);
console.log(blockingCount ? "\nFULL SITEMAP AUDIT: FAIL" : "\nFULL SITEMAP AUDIT: PASS");
process.exit(blockingCount ? 1 : 0);
