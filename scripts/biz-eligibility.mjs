import fs from "node:fs";
// Shared public-eligibility contract for DB-backed business pages.
// Used by BOTH the sitemap generator and the Tier B static HTML generator so
// sitemap membership and crawler-facing HTML can never drift apart.
//
// A business is publicly eligible when its identity is real and canonical and
// it carries enough verifiable public facts to justify an indexable page:
//   - active, not quarantined, canonical slug present
//   - a real name
//   - a real locality (town_slug or city)
//   - a category
//   - at least one hard contact fact (address, phone or website)
// Thin/synthetic rows fail the floor and stay out of the sitemap and out of
// Tier B output (they remain client-rendered and self-govern their robots).

export const BIZ_SELECT =
  "id, slug, name, category, town_slug, town_name, city, state, zipcode, address, phone, website, description, long_description, plan_tier, is_claimed, is_active, quarantine_status, record_status, updated_at";

const clean = (v) => (typeof v === "string" ? v.trim() : "");

export const isSuppressed = (b) =>
  b.is_active === false ||
  (clean(b.record_status) && clean(b.record_status) !== "active") ||
  (clean(b.quarantine_status) && clean(b.quarantine_status) !== "none");

const BAD_SLUG = /^(undefined|null|test|example|new|edit|admin|index)$/i;

export const hasCanonicalSlug = (b) => {
  const s = clean(b.slug).toLowerCase();
  return !!s && s.length >= 2 && s.length <= 120 && !BAD_SLUG.test(s) && !s.includes("/");
};

export function isEligible(b) {
  if (!b || isSuppressed(b) || !hasCanonicalSlug(b)) return false;
  if (clean(b.name).length < 2) return false;
  if (!clean(b.town_slug) && !clean(b.city)) return false;
  if (!clean(b.category)) return false;
  return !!(clean(b.address) || clean(b.phone) || clean(b.website));
}

// All active rows, paginated, de-duplicated by canonical slug.
async function fetchActiveBusinesses(sb) {
  const pageSize = 1000;
  const seen = new Set();
  const rows = [];
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await sb
      .from("businesses")
      .select(BIZ_SELECT)
      .eq("is_active", true)
      .order("slug", { ascending: true })
      .range(from, from + pageSize - 1);
    if (error) throw new Error(`businesses fetch failed: ${error.message}`);
    if (!data || data.length === 0) break;
    for (const b of data) {
      const slug = clean(b.slug).toLowerCase();
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      rows.push({ ...b, slug });
    }
    if (data.length < pageSize) break;
  }
  return rows;
}

// SEO-protected /biz/* slugs that must keep their indexable contract.
// Sourced from a repo manifest generated from seo_protected_urls (the table is
// not anon-readable at build time, and only the failing delta matters).
export function loadProtectedOverrides() {
  const file = new URL("./seo-protected-overrides.json", import.meta.url);
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  return {
    overrides: new Set((raw.overrides || []).map((s) => String(s).toLowerCase())),
    hold: raw.resolution_hold || [],
  };
}

// The single source of truth for BOTH sitemap membership and Tier B HTML:
// every publicly-eligible business, plus every SEO-protected /biz/* URL that
// maps to a real, active, non-suppressed record (protected-record override),
// unless a founder-locked override explicitly allows noindex.
export async function fetchEligibleBusinesses(sb, opts = {}) {
  const { includeProtected = true } = opts;
  const active = await fetchActiveBusinesses(sb);
  const { overrides: protectedSlugs, hold } = includeProtected
    ? loadProtectedOverrides()
    : { overrides: new Set(), hold: [] };
  const rows = [];
  const overrides = [];
  const heldProtected = [];
  for (const b of active) {
    if (isSuppressed(b) || !hasCanonicalSlug(b)) continue;
    if (isEligible(b)) {
      rows.push(b);
      continue;
    }
    if (protectedSlugs.has(b.slug) && clean(b.name).length >= 2) {
      rows.push({ ...b, protectedOverride: true });
      overrides.push(b.slug);
    }
  }
  const bySlug = new Set(rows.map((r) => r.slug));
  for (const slug of protectedSlugs) {
    if (!bySlug.has(slug)) heldProtected.push(slug);
  }
  for (const h of hold) heldProtected.push(h.slug);
  rows.stats = { eligible: rows.length - overrides.length, overrides, heldProtected };
  return rows;
}

