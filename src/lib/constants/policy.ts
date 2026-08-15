/**
 * Capital District Nest — Intelligence Graph policy constants.
 *
 * Single source of truth for the neutrality, provenance and SEO-protection
 * rules. Anything that displays or mutates business data reads from here
 * rather than re-stating rules inline.
 *
 * Wave 1 completion corrections:
 *  - eligibility_state is a CONTENT-QUALITY contract with exactly four states.
 *  - record_status is a separate OPERATIONAL state (quarantine, closure, merge).
 *  - numeric source "confidence" is retired in favour of a controlled
 *    evidence/authority state. No un-measured number is shown as a score.
 *  - "owner truth wins" is replaced by a scoped owner-authority rule.
 */

/* ------------------------------------------------------------ eligibility */

/** Eligibility states — mirrors the DB check constraint on businesses.eligibility_state. */
export const ELIGIBILITY_STATES = [
  "registry_only",
  "verified_basic",
  "claimed_enriched",
  "editorial_featured",
] as const;
export type EligibilityState = (typeof ELIGIBILITY_STATES)[number];

export const ELIGIBILITY_LABELS: Record<EligibilityState, string> = {
  registry_only: "Registry listing",
  verified_basic: "Verified basics",
  claimed_enriched: "Claimed by owner",
  editorial_featured: "Editorial feature",
};

export const ELIGIBILITY_DESCRIPTIONS: Record<EligibilityState, string> = {
  registry_only:
    "Imported directory record. Nothing here has been verified by our team or by the business.",
  verified_basic:
    "Core details (name, location, contact) checked against a documented source.",
  claimed_enriched: "The owner has claimed this listing and supplied the details.",
  editorial_featured: "Researched and written by the Capital District Nest editorial team.",
};

/** Which eligibility states may appear in search, rails and category shelves. */
export const DISCOVERY_ELIGIBLE: EligibilityState[] = [
  "verified_basic",
  "claimed_enriched",
  "editorial_featured",
];

/* --------------------------------------------------------- record status */

/**
 * Operational record state. Deliberately separate from eligibility: a record
 * can be editorially excellent AND reported closed, or registry-only AND
 * perfectly active. Never render this as a quality signal.
 */
export const RECORD_STATUSES = [
  "active",
  "quarantined",
  "suppressed",
  "reported_closed",
  "merged",
] as const;
export type RecordStatus = (typeof RECORD_STATUSES)[number];

export const RECORD_STATUS_LABELS: Record<RecordStatus, string> = {
  active: "Active",
  quarantined: "Quarantined",
  suppressed: "Suppressed",
  reported_closed: "Reported closed",
  merged: "Merged into another record",
};

export const RECORD_STATUS_DESCRIPTIONS: Record<RecordStatus, string> = {
  active: "Normal operational record.",
  quarantined: "Held back from discovery surfaces while a data issue is reviewed.",
  suppressed: "Hidden from the public site by an operator decision.",
  reported_closed: "A closure has been reported and is awaiting evidence review.",
  merged: "Superseded by a canonical record; retained for history and redirects.",
};

/** Record states that keep a business out of discovery surfaces. */
export const NON_DISCOVERABLE_STATUSES: RecordStatus[] = [
  "quarantined",
  "suppressed",
  "merged",
];

/* ------------------------------------------------------ source provenance */

/** Provenance types — mirrors business_sources.source_type. */
export const SOURCE_TYPE_LABELS: Record<string, string> = {
  google_places: "Public places data",
  manual_import: "Imported spreadsheet",
  website_scrape: "Business website capture",
  owner_claimed: "Business owner",
  editorial: "Capital District Nest editorial",
  public_record: "Public record",
  founder_assert: "Added by our team",
  unknown: "Unattributed",
};

/**
 * Controlled source authority — mirrors business_sources.evidence_state.
 * This REPLACES the arbitrary numeric confidence values (0.4 / 0.6 / 0.8) that
 * the Wave 1 backfill assigned without any measured basis. Those numbers were
 * nulled; the column is reserved for a future measured resolver and is never
 * displayed as a quality score, nor used for ranking or eligibility.
 */
export const EVIDENCE_STATES = [
  "imported_unverified",
  "official_source",
  "owner_asserted",
  "staff_verified",
  "public_record",
  "editorial",
  "unknown",
] as const;
export type EvidenceState = (typeof EVIDENCE_STATES)[number];

export const EVIDENCE_STATE_LABELS: Record<EvidenceState, string> = {
  imported_unverified: "Imported, unverified",
  official_source: "Official source",
  owner_asserted: "Asserted by the owner",
  staff_verified: "Checked by our team",
  public_record: "Public record",
  editorial: "Editorial research",
  unknown: "Unknown",
};

/** Per-field display state used by the answer-first profile. */
export const FIELD_STATES = ["verified", "owner_confirmed", "imported_unverified", "unavailable"] as const;
export type FieldState = (typeof FIELD_STATES)[number];

export const FIELD_STATE_LABELS: Record<FieldState, string> = {
  verified: "Verified",
  owner_confirmed: "Owner confirmed",
  imported_unverified: "Imported · unverified",
  unavailable: "Not available",
};

/** The numeric confidence column is explicitly unassessed. */
export const CONFIDENCE_IS_UNASSESSED = true;

/* -------------------------------------------------------- owner authority */

/**
 * Corrected authority contract. "Owner truth wins" was too absolute: it would
 * have let a business overwrite legal identity, licensing status, public
 * records and substantiated closure reports.
 */
export const OWNER_AUTHORITY_RULE =
  "Verified owner assertions receive the strongest authority for owner-controlled operational facts, while legal identity, licensing, public-record status, disputes, closures, and third-party facts remain evidence- and review-governed.";

/** Fields a verified owner may assert directly, with the strongest authority. */
export const OWNER_ASSERTABLE_FIELDS = [
  "Current hours",
  "Services offered",
  "Service areas",
  "Contact information",
  "Official website",
  "Approved media",
] as const;

/** Fields no owner may unilaterally override — evidence and review govern them. */
export const EVIDENCE_GOVERNED_FIELDS = [
  "Legal identity",
  "Licensing or disciplinary status",
  "Public records",
  "Substantiated closure reports",
  "Third-party editorial facts",
  "A legitimate correction dispute",
] as const;

/**
 * Neutrality principles. These are product rules, not marketing copy —
 * ranking and presentation code must be able to point at the rule it follows.
 */
export const NEUTRALITY_PRINCIPLES = [
  {
    id: "no-pay-to-rank",
    title: "Paying does not buy rank",
    body: "Sponsorship and partner tiers change how a business can present itself. They never change its position in search results, category shelves or answer summaries.",
  },
  {
    id: "evidence-over-volume",
    title: "Evidence beats volume",
    body: "A record is promoted because its facts are verified, not because it has more fields filled in or more scraped attributes.",
  },
  {
    id: "scoped-owner-authority",
    title: "Owner authority is strong, but scoped",
    body: OWNER_AUTHORITY_RULE,
  },
  {
    id: "no-invented-facts",
    title: "Nothing is invented",
    body: "Hours, ratings, awards, bios, categories and history are never generated. Missing information stays visibly missing, and an unverified record is never described in definitive language.",
  },
  {
    id: "no-unmeasured-scores",
    title: "No un-measured scores",
    body: "We do not publish a confidence number we did not measure. Provenance is expressed as a controlled evidence state, not as a made-up decimal.",
  },
  {
    id: "reversible-corrections",
    title: "Every correction is reversible",
    body: "Corrections are stored with before/after values, evidence and a reviewer, so any change can be explained or undone.",
  },
] as const;

/* ------------------------------------------------------- SEO protection */

/** SEO protection tiers — mirrors seo_protected_urls.protection_tier. */
export type ProtectionTier = "founder_locked" | "protected" | "opportunity";

export const PROTECTION_TIER_LABELS: Record<ProtectionTier, string> = {
  founder_locked: "Founder locked",
  protected: "Protected",
  opportunity: "Opportunity",
};

export const PROTECTION_TIER_RULES: Record<ProtectionTier, string> = {
  founder_locked:
    "Core route. No slug change, no noindex, no merge — regardless of what the data says.",
  protected:
    "Earned organic clicks in the last 90 days. No slug change, no noindex, no merge without an explicit per-URL override.",
  opportunity:
    "Impressions but no clicks. Safe to improve in place; still no slug change or merge without an override.",
};

/** Threshold used by the sync-seo-protection function. Keep in sync with the edge function. */
export const OPPORTUNITY_MIN_IMPRESSIONS_90D = 25;

/** Actions that the protection manifest can veto. */
export const PROTECTED_ACTIONS = ["slug_change", "noindex", "merge", "delete"] as const;
export type ProtectedAction = (typeof PROTECTED_ACTIONS)[number];

export function isActionAllowed(
  action: ProtectedAction,
  row?: {
    protection_tier?: string | null;
    allow_slug_change?: boolean | null;
    allow_noindex?: boolean | null;
    allow_merge?: boolean | null;
  } | null,
): boolean {
  if (!row) return true; // Unprotected URL.
  if (row.protection_tier === "founder_locked") return false;
  if (action === "slug_change") return !!row.allow_slug_change;
  if (action === "noindex") return !!row.allow_noindex;
  if (action === "merge" || action === "delete") return !!row.allow_merge;
  return false;
}

/* ------------------------------------------------- traffic classification */

/** Controlled traffic sources — mirrors engagement_events.traffic_source. */
export const TRAFFIC_SOURCES = [
  "organic_search",
  "direct",
  "social",
  "ai_assistant",
  "referral",
  "internal_test",
  "bot",
  "unknown",
] as const;
export type TrafficSource = (typeof TRAFFIC_SOURCES)[number];

export const TRAFFIC_SOURCE_LABELS: Record<TrafficSource, string> = {
  organic_search: "Organic search",
  direct: "Direct",
  social: "Social",
  ai_assistant: "AI assistant",
  referral: "Referral",
  internal_test: "Internal test",
  bot: "Bot",
  unknown: "Unknown",
};
