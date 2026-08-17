// Shared crawler-facing head contract.
//
// Single source of truth used by BOTH scripts/audit-snapshots.mjs and
// scripts/audit-full-footprint.mjs so the two audits cannot diverge: same
// route list, same parsing, same defect vocabulary, same verdict inputs.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export const ORIGIN = "https://www.capitaldistrictnest.com";

// Neutral shell default title shipped in index.html. Never valid on ANY
// indexable route — the homepage included.
export const SHELL_DEFAULT_TITLE = "Capital District Nest";

// Routes whose canonical is deliberately owned by an external property.
//
// VERIFIED CONTRACT (2026-08-17):
//   /analyze-any-deal      -> external https://www.analyzeanydeal.com. Intentional
//                             bridge page for the shared engine; NOT in the sitemap.
//   /analyze-any-property  -> SELF-canonical. Substantive unique internal landing
//                             page ("Run the Numbers or Review the Evidence") that
//                             deep-links to AnalyzeAnyProperty; it is in the sitemap.
//   /analyze-home          -> SELF-canonical. Substantive internal Analyze Any Home
//                             landing page; it is in the sitemap.
//   /analyze-any-home      -> not routed and not in the sitemap; no contract needed.
export const EXTERNAL_CANONICAL_ALLOWLIST = {
  "/analyze-any-deal": "https://www.analyzeanydeal.com",
};


export const PRIVATE_ROUTE_RE =
  /^\/(admin|auth|dashboard|partner-dashboard|partner-auth|partner-success|reset-password|seo-audit|reports)/;

export const isPrivateRoute = (p) => PRIVATE_ROUTE_RE.test(p);
export const isTierB = (p) => p.startsWith("/biz/");

/** Canonical route list, identical for both audits. */
export function sitemapRoutes(distDir) {
  const distMap = path.join(distDir, "sitemap.xml");
  const file = fs.existsSync(distMap) ? distMap : path.resolve("public/sitemap.xml");
  const xml = fs.readFileSync(file, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const routes = locs.map((u) => {
    const p = u.replace(ORIGIN, "").replace(/\/+$/, "");
    return p || "/";
  });
  return {
    file,
    locs,
    routes,
    checksum: crypto.createHash("sha256").update(xml).digest("hex").slice(0, 16),
  };
}

export const artifactPath = (distDir, route) =>
  route === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, route.replace(/^\//, ""), "index.html");

/** Attribute-order agnostic meta reader. */
export function metaContents(head, name) {
  const out = [];
  for (const m of head.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = m[0];
    const nameAttr = tag.match(/\bname\s*=\s*"([^"]*)"/i)?.[1];
    if (!nameAttr || nameAttr.toLowerCase() !== name.toLowerCase()) continue;
    out.push(tag.match(/\bcontent\s*=\s*"([^"]*)"/i)?.[1] ?? "");
  }
  return out;
}

export function propertyContents(head, property) {
  const out = [];
  for (const m of head.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = m[0];
    const prop = tag.match(/\bproperty\s*=\s*"([^"]*)"/i)?.[1];
    if (!prop || prop.toLowerCase() !== property.toLowerCase()) continue;
    out.push(tag.match(/\bcontent\s*=\s*"([^"]*)"/i)?.[1] ?? "");
  }
  return out;
}

export function canonicalHrefs(head) {
  const out = [];
  for (const m of head.matchAll(/<link\b[^>]*>/gi)) {
    const tag = m[0];
    const rel = tag.match(/\brel\s*=\s*"([^"]*)"/i)?.[1];
    if (!rel || rel.toLowerCase() !== "canonical") continue;
    out.push(tag.match(/\bhref\s*=\s*"([^"]*)"/i)?.[1] ?? "");
  }
  return out;
}

export function parseSnapshot(html) {
  const headEnd = html.indexOf("</head>");
  const head = headEnd === -1 ? html : html.slice(0, headEnd + 7);
  return {
    head,
    titles: [...head.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/g)].map((m) => m[1].trim()),
    canonicals: canonicalHrefs(head),
    robots: metaContents(head, "robots"),
    ogUrls: propertyContents(head, "og:url"),
    readiness: metaContents(head, "x-prerender-head"),
    readinessReason: metaContents(head, "x-prerender-head-reason"),
    h1s: [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
      m[1].replace(/<[^>]+>/g, "").trim(),
    ),
    jsonLd: [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map(
      (m) => m[1],
    ),
    text: (html.split("<body")[1] || "")
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  };
}

/** Route identity tokens for data-driven routes. */
export function routeIdentity(route) {
  return (
    route.match(
      /^\/(?:living-in|market-reports|homes\/listings|rentals|towns|biz|business)\/([^/]+)$/,
    )?.[1] || null
  );
}

/**
 * The one head contract. Returns a list of `{kind, detail}` defects.
 * `requireReadiness` is true for Tier A (browser-rendered) snapshots only;
 * Tier B `/biz/*` pages are emitted deterministically without a browser.
 */
export function checkHead({ route, html, requireReadiness }) {
  const s = parseSnapshot(html);
  const d = [];
  const push = (kind, detail) => d.push({ kind, detail: detail ?? route });

  // title
  if (s.titles.length !== 1) push("titleCount", `${route} (${s.titles.length})`);
  if (!s.titles[0]) push("emptyTitle", route);
  // No exemption: the homepage must ship its own route-specific title too.
  if (s.titles[0] === SHELL_DEFAULT_TITLE) push("shellDefaultTitle", route);

  // readiness marker
  if (requireReadiness) {
    if (s.readiness.length === 0) push("missingReadinessMarker", route);
    else if (s.readiness.length > 1)
      push("duplicateReadinessMarker", `${route} (${s.readiness.length}: ${s.readiness.join("|")})`);
    else if (s.readiness[0] === "timeout")
      push("prerenderHeadTimeout", `${route} (${s.readinessReason[0] || "unknown"})`);
    else if (s.readiness[0] !== "ready")
      push("invalidReadinessMarker", `${route} (${s.readiness[0]})`);
  }

  // canonical
  const allowed = EXTERNAL_CANONICAL_ALLOWLIST[route];
  if (s.canonicals.length !== 1) push("canonicalCount", `${route} (${s.canonicals.length})`);
  const canonical = s.canonicals[0];
  if (canonical) {
    if (allowed) {
      if (!canonical.startsWith(allowed)) push("externalCanonicalMismatch", `${route} -> ${canonical}`);
    } else {
      if (/^https:\/\/capitaldistrictnest\.com/.test(canonical))
        push("nonWwwCanonical", `${route} -> ${canonical}`);
      const expected = route === "/" ? `${ORIGIN}/` : `${ORIGIN}${route}`;
      if (canonical !== expected && !canonical.startsWith(`${expected}?`))
        push("canonicalMismatch", `${route} -> ${canonical}`);
      if (route !== "/" && (canonical === `${ORIGIN}/` || canonical === ORIGIN))
        push("homepageCanonicalOnNonHome", route);
    }
  }

  // robots
  if (s.robots.length > 1) push("duplicateRobots", `${route} (${s.robots.length})`);
  if (s.robots.some((r) => /noindex/i.test(r))) push("unintendedNoindex", route);

  // open graph
  if (new Set(s.ogUrls).size > 1) push("ogUrlConflict", route);
  if (s.ogUrls[0] && canonical && s.ogUrls[0] !== canonical) push("ogUrlCanonicalMismatch", route);

  // h1
  if (s.h1s.length === 0) push("missingH1", route);
  else if (!s.h1s[0]) push("emptyH1", route);

  // route identity
  // /biz slugs are `<name>-<random-hash>`; the hash never appears in the title,
  // so it is dropped before matching. Short names (CVS, ATM, GE) legitimately
  // produce only sub-4-char tokens, so the floor is 2 characters.
  const identity = routeIdentity(route);
  if (identity && s.titles[0]) {
    const isBiz = /^\/(?:biz|business)\//.test(route);
    const parts = identity.split("-");
    const usable = isBiz && parts.length > 1 ? parts.slice(0, -1) : parts;
    const tokens = usable.filter((t) => t.length >= (isBiz ? 2 : 4));
    const hay = s.titles[0].toLowerCase();
    if (tokens.length && !tokens.some((t) => hay.includes(t)))
      push("unresolvedRouteIdentity", `${route} title="${s.titles[0]}"`);
  }


  // json-ld validity
  for (const raw of s.jsonLd) {
    try {
      JSON.parse(raw);
    } catch {
      push("brokenJsonLd", route);
    }
  }

  if (/your-domain\.com|example\.com|lovableproject\.com/.test(s.head))
    push("placeholderSchemaRefs", route);

  return { snapshot: s, defects: d };
}

/** Runs the contract over the shared route list; both audits call this. */
export function auditRoutes(distDir) {
  const { routes, checksum, file, locs } = sitemapRoutes(distDir);
  const defects = [];
  const missingArtifact = [];
  const checked = [];
  const thin = [];
  for (const route of routes) {
    const f = artifactPath(distDir, route);
    if (!fs.existsSync(f)) {
      missingArtifact.push(route);
      continue;
    }
    checked.push(route);
    const html = fs.readFileSync(f, "utf8");
    const { snapshot, defects: d } = checkHead({
      route,
      html,
      requireReadiness: !isTierB(route),
    });
    if (snapshot.text.length < 200) thin.push(route);
    defects.push(...d);
  }
  return { routes, locs, checksum, sitemapFile: file, checked, missingArtifact, defects, thin };
}

export function groupDefects(defects) {
  const byKind = {};
  for (const { kind, detail } of defects) (byKind[kind] ??= []).push(detail);
  return byKind;
}

// Everything except truthful thinness blocks acceptance.
export const NON_BLOCKING = new Set(["thinBody"]);
