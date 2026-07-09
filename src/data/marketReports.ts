/**
 * Capital District Market Report data
 * ------------------------------------
 * Editorial snapshots per town used by /market-reports/:town.
 * These are hand-curated reference figures that reflect the current
 * market posture — update on the same cadence as the weekly feed.
 *
 * All figures are approximate and should be reviewed each quarter.
 */

export type MarketReport = {
  slug: string;
  name: string;
  county: string;
  updated: string; // "Q4 2025" or similar
  medianSalePrice: number;
  medianYoY: number; // percent, e.g. 6.4
  daysOnMarket: number;
  domYoY: number; // negative = faster market
  activeInventory: number;
  inventoryYoY: number;
  monthsOfSupply: number;
  medianPricePerSqft: number;
  saleToListRatio: number; // percent
  summary: string;
};

export const MARKET_REPORTS: MarketReport[] = [
  {
    slug: "albany",
    name: "Albany",
    county: "Albany County",
    updated: "Q4 2025",
    medianSalePrice: 285000,
    medianYoY: 6.2,
    daysOnMarket: 21,
    domYoY: -8,
    activeInventory: 148,
    inventoryYoY: -12,
    monthsOfSupply: 1.6,
    medianPricePerSqft: 178,
    saleToListRatio: 101.4,
    summary:
      "Persistent supply-side pressure keeps Albany a seller's market. Well-priced homes near Pine Hills, Delaware Ave, and Center Square continue to draw multiple offers within the first weekend.",
  },
  {
    slug: "troy",
    name: "Troy",
    county: "Rensselaer County",
    updated: "Q4 2025",
    medianSalePrice: 245000,
    medianYoY: 8.1,
    daysOnMarket: 24,
    domYoY: -6,
    activeInventory: 96,
    inventoryYoY: -9,
    monthsOfSupply: 1.7,
    medianPricePerSqft: 162,
    saleToListRatio: 100.6,
    summary:
      "Troy's multi-family market remains the strongest cap-rate story in the region. Single-family demand is expanding out of downtown into North Central and Lansingburgh.",
  },
  {
    slug: "schenectady",
    name: "Schenectady",
    county: "Schenectady County",
    updated: "Q4 2025",
    medianSalePrice: 235000,
    medianYoY: 5.4,
    daysOnMarket: 26,
    domYoY: -4,
    activeInventory: 112,
    inventoryYoY: -7,
    monthsOfSupply: 1.9,
    medianPricePerSqft: 148,
    saleToListRatio: 99.8,
    summary:
      "Steady price appreciation with balanced buyer activity. Stockade and Upper Union pull premiums; entry-level product under $200K clears in under two weeks.",
  },
  {
    slug: "saratoga-springs",
    name: "Saratoga Springs",
    county: "Saratoga County",
    updated: "Q4 2025",
    medianSalePrice: 585000,
    medianYoY: 7.8,
    daysOnMarket: 32,
    domYoY: -3,
    activeInventory: 84,
    inventoryYoY: -5,
    monthsOfSupply: 2.4,
    medianPricePerSqft: 312,
    saleToListRatio: 100.2,
    summary:
      "Luxury and downtown-walkable inventory continues to trade at premium multiples. Buyers relocating from NYC and Boston remain the dominant price-setters above $700K.",
  },
  {
    slug: "delmar",
    name: "Delmar",
    county: "Albany County",
    updated: "Q4 2025",
    medianSalePrice: 445000,
    medianYoY: 6.9,
    daysOnMarket: 18,
    domYoY: -10,
    activeInventory: 42,
    inventoryYoY: -18,
    monthsOfSupply: 1.2,
    medianPricePerSqft: 235,
    saleToListRatio: 102.6,
    summary:
      "Bethlehem schools continue to compress inventory. Homes in the Four Corners walk-zone routinely close above list within one weekend.",
  },
  {
    slug: "clifton-park",
    name: "Clifton Park",
    county: "Saratoga County",
    updated: "Q4 2025",
    medianSalePrice: 465000,
    medianYoY: 5.6,
    daysOnMarket: 19,
    domYoY: -7,
    activeInventory: 78,
    inventoryYoY: -11,
    monthsOfSupply: 1.4,
    medianPricePerSqft: 224,
    saleToListRatio: 101.1,
    summary:
      "Shenendehowa demand keeps Clifton Park among the fastest-moving suburbs. New construction absorbs quickly; resale under $500K faces the tightest competition.",
  },
  {
    slug: "niskayuna",
    name: "Niskayuna",
    county: "Schenectady County",
    updated: "Q4 2025",
    medianSalePrice: 425000,
    medianYoY: 5.1,
    daysOnMarket: 22,
    domYoY: -5,
    activeInventory: 58,
    inventoryYoY: -8,
    monthsOfSupply: 1.6,
    medianPricePerSqft: 208,
    saleToListRatio: 100.9,
    summary:
      "School-district-driven demand from GE, GlobalFoundries, and Union College professionals continues to support tight supply and above-ask activity in mid-priced product.",
  },
  {
    slug: "guilderland",
    name: "Guilderland",
    county: "Albany County",
    updated: "Q4 2025",
    medianSalePrice: 385000,
    medianYoY: 5.9,
    daysOnMarket: 21,
    domYoY: -6,
    activeInventory: 64,
    inventoryYoY: -10,
    monthsOfSupply: 1.5,
    medianPricePerSqft: 196,
    saleToListRatio: 101.0,
    summary:
      "Consistent suburban demand anchored by top-rated schools and Crossgates-adjacent commercial base. Sub-$350K listings clear fastest.",
  },
  {
    slug: "colonie",
    name: "Colonie",
    county: "Albany County",
    updated: "Q4 2025",
    medianSalePrice: 345000,
    medianYoY: 5.2,
    daysOnMarket: 20,
    domYoY: -6,
    activeInventory: 92,
    inventoryYoY: -9,
    monthsOfSupply: 1.5,
    medianPricePerSqft: 188,
    saleToListRatio: 101.2,
    summary:
      "Highest transaction volume in the Capital District. Airport-corridor and Loudonville submarkets pull the strongest premiums.",
  },
  {
    slug: "latham",
    name: "Latham",
    county: "Albany County",
    updated: "Q4 2025",
    medianSalePrice: 335000,
    medianYoY: 4.8,
    daysOnMarket: 22,
    domYoY: -4,
    activeInventory: 46,
    inventoryYoY: -6,
    monthsOfSupply: 1.6,
    medianPricePerSqft: 182,
    saleToListRatio: 100.5,
    summary:
      "Commuter-friendly location and North Colonie schools keep demand steady. Ranch and split-level product under $325K remains the most competitive segment.",
  },
  {
    slug: "queensbury",
    name: "Queensbury",
    county: "Warren County",
    updated: "Q4 2025",
    medianSalePrice: 365000,
    medianYoY: 6.4,
    daysOnMarket: 28,
    domYoY: -2,
    activeInventory: 72,
    inventoryYoY: -4,
    monthsOfSupply: 2.1,
    medianPricePerSqft: 194,
    saleToListRatio: 99.6,
    summary:
      "Lake George halo plus Glens Falls economy continue to lift Queensbury values. Second-home buyers add seasonal urgency in Q2 and Q3.",
  },
  {
    slug: "lake-george",
    name: "Lake George",
    county: "Warren County",
    updated: "Q4 2025",
    medianSalePrice: 525000,
    medianYoY: 8.6,
    daysOnMarket: 42,
    domYoY: 3,
    activeInventory: 38,
    inventoryYoY: -3,
    monthsOfSupply: 3.2,
    medianPricePerSqft: 296,
    saleToListRatio: 97.8,
    summary:
      "Waterfront and near-water listings drive the median. Second-home and short-term-rental demand from downstate remains the dominant buyer profile.",
  },
  {
    slug: "amsterdam",
    name: "Amsterdam",
    county: "Montgomery County",
    updated: "Q4 2025",
    medianSalePrice: 165000,
    medianYoY: 7.2,
    daysOnMarket: 34,
    domYoY: -5,
    activeInventory: 58,
    inventoryYoY: -6,
    monthsOfSupply: 2.4,
    medianPricePerSqft: 108,
    saleToListRatio: 98.9,
    summary:
      "Strongest cash-flow market in the region. Investor demand for two-to-four unit product continues to compress days-on-market and lift median prices.",
  },
  {
    slug: "gloversville",
    name: "Gloversville",
    county: "Fulton County",
    updated: "Q4 2025",
    medianSalePrice: 145000,
    medianYoY: 6.8,
    daysOnMarket: 38,
    domYoY: -3,
    activeInventory: 52,
    inventoryYoY: -5,
    monthsOfSupply: 2.7,
    medianPricePerSqft: 96,
    saleToListRatio: 98.4,
    summary:
      "Cap rates in Fulton County remain the highest in the Capital District. Owner-occupant activity is expanding alongside sustained out-of-market investor interest.",
  },
];

export function getMarketReport(slug?: string): MarketReport | undefined {
  if (!slug) return undefined;
  return MARKET_REPORTS.find((r) => r.slug === slug);
}
