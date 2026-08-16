/**
 * External product destinations owned by the founder.
 *
 * AnalyzeAnyProperty (AAP) is a separate product. Capital District Nest links
 * and deep-links to it — it never duplicates its calculation engine and never
 * passes private property, owner, or client information in a URL.
 */

export const ANALYZE_ANY_PROPERTY_URL = "https://analyzeanyproperty.com";

export type DecisionType =
  | "multi_unit"
  | "land"
  | "flip"
  | "first_property"
  | "featured";

/**
 * Build a privacy-safe deep link into AnalyzeAnyProperty.
 * Only non-identifying campaign context is allowed in the query string.
 */
export function analyzeAnyPropertyUrl(opts: {
  path?: string;
  placement: string;
  decisionType?: DecisionType;
}): string {
  const url = new URL(opts.path ?? "/", ANALYZE_ANY_PROPERTY_URL);
  url.searchParams.set("source", "capital-district-nest");
  url.searchParams.set("placement", opts.placement);
  if (opts.decisionType) url.searchParams.set("decision_type", opts.decisionType);
  return url.toString();
}

/**
 * Verified RealScout configuration already present in the project.
 * `mapUrl` is scoped to the Albany city geo id — it is NOT a region-wide
 * Capital District map. Label it truthfully until a verified regional URL
 * is supplied.
 */
export const REALSCOUT = {
  agentEncodedId: "QWdlbnQtMzE2NTU3",
  /** Albany city geo id (3601000). Albany-only — do not call this region-wide. */
  albanyMapUrl:
    "https://scottalvarez863.realscout.com/homesearch/map?geo_type=city&geo_id=3601000",
  /** No verified Capital District–wide external map URL exists yet. */
  capitalDistrictMapUrl: null as string | null,
};

/**
 * Verified scheduling URL for Scott. None is configured yet, so the
 * "Choose a time" action stays hidden rather than being invented.
 */
export const SCOTT_SCHEDULING_URL: string | null = null;

/* ============================================================================
   ANALYZE ANY DEAL — SHARED CALCULATION ENGINE BOUNDARY
   ----------------------------------------------------------------------------
   Analyze Any Deal is the shared decision/calculation engine intended to power
   Capital District Nest and future regional Nest sites (Syracuse, Rochester, …)
   without each region forking its own financial logic.

   Today the engine is reached through the INTERNAL route `/analyze-any-deal`,
   which acts as this region's adapter/fallback. When a verified external
   engine domain exists it can be supplied via `VITE_ANALYZE_ANY_DEAL_URL`
   without touching any component — every caller goes through the helpers below.

   No external Analyze Any Deal URL is hardwired in this sprint.
   ========================================================================== */

/** Region slug for this Nest deployment. Non-identifying. */
export const REGION_SLUG = "capital-district";

/** Internal regional adapter route. Never remove — legacy analyzers depend on it. */
export const ANALYZE_ANY_DEAL_INTERNAL_ROUTE = "/analyze-any-deal";

const rawAadUrl =
  (import.meta.env?.VITE_ANALYZE_ANY_DEAL_URL as string | undefined)?.trim() || "";

/** True only when a verified external engine URL has been configured. */
export const hasExternalAnalyzeAnyDeal = /^https?:\/\//i.test(rawAadUrl);

export type ProductDestination =
  | { kind: "internal"; to: string; href?: undefined }
  | { kind: "external"; href: string; to?: undefined };

/**
 * Resolve where "Deal Calculator / Analyze Any Deal" should send the user.
 * Falls back to the internal route whenever no verified external URL exists.
 * Only non-identifying campaign context is ever placed in the URL.
 */
export function analyzeAnyDealDestination(opts: {
  placement: string;
  intentType?: string;
  path?: string;
}): ProductDestination {
  if (!hasExternalAnalyzeAnyDeal) {
    return { kind: "internal", to: ANALYZE_ANY_DEAL_INTERNAL_ROUTE };
  }
  const url = new URL(opts.path ?? "/", rawAadUrl);
  url.searchParams.set("source", "capital-district-nest");
  url.searchParams.set("region", REGION_SLUG);
  url.searchParams.set("placement", opts.placement);
  if (opts.intentType) url.searchParams.set("intent_type", opts.intentType);
  return { kind: "external", href: url.toString() };
}

