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
