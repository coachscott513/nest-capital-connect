/**
 * Deterministic post-build snapshot audit (Tier A + Tier B).
 * Uses the SHARED head contract in scripts/head-contract.mjs so this audit and
 * scripts/audit-full-footprint.mjs evaluate the identical route list with the
 * identical rules. Any divergence is a bug, not a policy difference.
 */
import path from "node:path";
import {
  auditRoutes,
  groupDefects,
  isTierB,
  NON_BLOCKING,
} from "./head-contract.mjs";

const DIST = path.resolve("dist");
const r = auditRoutes(DIST);
const byKind = groupDefects(r.defects);

const fmt = (arr = []) =>
  arr.length
    ? `${arr.length}\n      ${arr.slice(0, 25).join("\n      ")}${arr.length > 25 ? `\n      … +${arr.length - 25} more` : ""}`
    : "0";

console.log(`
=== SNAPSHOT AUDIT (shared head contract) ===
sitemap file .................. ${r.sitemapFile}
sitemap checksum .............. ${r.checksum}
sitemap URLs .................. ${r.routes.length}
  Tier A ...................... ${r.routes.filter((p) => !isTierB(p)).length}
  Tier B (/biz/*) ............. ${r.routes.filter(isTierB).length}
artifacts read ................ ${r.checked.length}
missing artifacts ............. ${fmt(r.missingArtifact)}
thin bodies (non-blocking) .... ${r.thin.length}`);

const kinds = Object.keys(byKind).sort();
if (!kinds.length) console.log("defects ....................... 0");
for (const k of kinds) console.log(`${(k + " ").padEnd(30, ".")} ${fmt(byKind[k])}`);

const blocking = kinds.filter((k) => !NON_BLOCKING.has(k));
const blockingCount = blocking.reduce((a, k) => a + byKind[k].length, 0) + r.missingArtifact.length;

if (blockingCount) {
  console.error(
    `\nSNAPSHOT AUDIT FAILED: ${[
      ...blocking.map((k) => `${k}=${byKind[k].length}`),
      r.missingArtifact.length ? `missingArtifact=${r.missingArtifact.length}` : null,
    ]
      .filter(Boolean)
      .join(", ")}`,
  );
  process.exit(1);
}
console.log("\nSNAPSHOT AUDIT PASSED");
