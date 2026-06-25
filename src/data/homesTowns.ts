/* Capital District Nest Homes — town board source of truth */

export type HomesTown = {
  slug: string;
  name: string;
  county: string;
  blurb?: string;
  /** Optional public search URL for this town's active listings */
  externalSearchUrl?: string;
};

export const HOMES_TOWNS: HomesTown[] = [
  { slug: "delmar", name: "Delmar", county: "Albany County" },
  { slug: "albany", name: "Albany", county: "Albany County" },
  { slug: "troy", name: "Troy", county: "Rensselaer County" },
  { slug: "schenectady", name: "Schenectady", county: "Schenectady County" },
  { slug: "saratoga-springs", name: "Saratoga Springs", county: "Saratoga County" },
  { slug: "clifton-park", name: "Clifton Park", county: "Saratoga County" },
  { slug: "colonie", name: "Colonie", county: "Albany County" },
  { slug: "niskayuna", name: "Niskayuna", county: "Schenectady County" },
  { slug: "guilderland", name: "Guilderland", county: "Albany County" },
  { slug: "latham", name: "Latham", county: "Albany County" },
  { slug: "queensbury", name: "Queensbury", county: "Warren County" },
  { slug: "lake-george", name: "Lake George", county: "Warren County" },
  { slug: "amsterdam", name: "Amsterdam", county: "Montgomery County" },
  { slug: "gloversville", name: "Gloversville", county: "Fulton County" },
];

/**
 * Neutral property search constant — kept for backwards-compatible imports.
 * Public site does NOT link to any single brokerage IDX. Consumers should
 * treat an empty string as "no outbound search link" and hide the CTA.
 */
export const REMAX_SEARCH_URL = "";
export const PROPERTY_SEARCH_URL = "";

export function getHomesTown(slug?: string): HomesTown | undefined {
  if (!slug) return undefined;
  return HOMES_TOWNS.find((t) => t.slug === slug);
}

/**
 * Resolve a town for the /homes/listings/:townSlug route.
 * Always returns a town when a slug is provided — falls back to a
 * derived display name so unknown slugs (e.g. towns only present in
 * the property_listings table or sitemap) still render a real page
 * instead of redirecting to /homes.
 */
export function resolveHomesTown(slug?: string): HomesTown | undefined {
  if (!slug) return undefined;
  const known = HOMES_TOWNS.find((t) => t.slug === slug);
  if (known) return known;
  const name = slug
    .split("-")
    .map((s) => (s.length ? s[0].toUpperCase() + s.slice(1) : s))
    .join(" ");
  return { slug, name, county: "Capital District" };
}
