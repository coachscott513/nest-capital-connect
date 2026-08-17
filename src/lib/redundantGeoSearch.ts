/**
 * Presentation-only normalization for `/local` query state.
 *
 * When a town filter is already active, a geography-only search term such as
 * "ny" or "new york" adds nothing to the query and only creates visual
 * clutter in the filtered header. Those known-redundant terms are treated as
 * a no-op in presentation. Any other user-entered search is preserved.
 */
const REDUNDANT_GEO_TERMS = new Set([
  "ny",
  "n.y.",
  "nys",
  "new york",
  "new york state",
  "new york, ny",
  "usa",
  "united states",
  "capital district",
  "capital region",
  "capital district ny",
  "capital region ny",
]);

export const isRedundantGeoSearch = (raw: string | null | undefined, hasTownContext: boolean) => {
  if (!hasTownContext) return false;
  const value = (raw ?? "").trim().toLowerCase().replace(/\s+/g, " ").replace(/[.,]+$/, "");
  if (!value) return false;
  return REDUNDANT_GEO_TERMS.has(value);
};

/** Returns the search term that should actually be applied/displayed. */
export const normalizeLocalSearch = (raw: string | null | undefined, hasTownContext: boolean) =>
  isRedundantGeoSearch(raw, hasTownContext) ? "" : (raw ?? "").trim();
