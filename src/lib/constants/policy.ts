/**
 * Capital District Nest — Intelligence Graph policy constants.
 *
 * Single source of truth for the neutrality, provenance and SEO-protection
 * rules that Sprint 1 introduced. Anything that displays or mutates business
 * data should read from here rather than re-stating rules inline.
 */

/** Eligibility states — mirrors the DB check constraint on businesses.eligibility_state. */
export const ELIGIBILITY_STATES = [
  "registry_only",
  "verified_basic",
  "claimed_enriched",
  "editorial_featured",
  "quarantined",
  "suppressed",
] as const;
export type EligibilityState = (typeof ELIGIBILITY_STATES)[number];

export const ELIGIBILITY_LABELS: Record<EligibilityState, string> = {
  registry_only: "Registry listing",
  verified_basic: "Verified basics",
  claimed_enriched: "Claimed by owner",
  editorial_featured: "Editorial feature",
  quarantined: "Quarantined",
  suppressed: "Suppressed",
};

export const ELIGIBILITY_DESCRIPTIONS: Record<EligibilityState, string> = {
  registry_only:
    "Imported directory record. Basic facts only, not verified by our team or the owner.",
  verified_basic:
    "Core details (name, location, contact) checked against a documented source.",
  claimed_enriched: "The owner has claimed this listing and supplied the details.",
  editorial_featured: "Researched and written by the Capital District Nest editorial team.",
  quarantined: "Held back from discovery surfaces while a data issue is reviewed.",
  suppressed: "Hidden from the public site.",
};

/** Which eligibility states may appear in search, rails and category shelves. */
export const DISCOVERY_ELIGIBLE: EligibilityState[] = [
  "verified_basic",
  "claimed_enriched",
  "editorial_featured",
];

/** Provenance types — mirrors business_sources.source_type. */
export const SOURCE_TYPE_LABELS: Record<string, string> = {
  google_places: "Public places data",
  manual_import: "Imported spreadsheet",
  owner_claimed: "Business owner",
  editorial: "Capital District Nest editorial",
  founder_assert: "Added by our team",
  unknown: "Unattributed",
};

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
    id: "owner-truth-wins",
    title: "The owner is the highest authority on their own facts",
    body: "When an owner-supplied fact conflicts with imported data, the owner's version wins and the imported value is retained as history.",
  },
  {
    id: "no-invented-facts",
    title: "Nothing is invented",
    body: "Hours, ratings, awards, bios and history are never generated. Missing information stays visibly missing.",
  },
  {
    id: "reversible-corrections",
    title: "Every correction is reversible",
    body: "Corrections are stored with before/after values, evidence and a reviewer, so any change can be explained or undone.",
  },
] as const;

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
