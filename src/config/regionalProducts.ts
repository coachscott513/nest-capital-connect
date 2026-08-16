/**
 * Regional product configuration.
 *
 * Capital District Nest is one regional distribution layer. Analyze Any Deal
 * (financial decision engine) and Analyze Any Property (property evidence)
 * are SHARED products intended to serve multiple Nest markets. Components must
 * read destinations from here — never hardcode a product URL in JSX.
 *
 * Only non-PII campaign context may be placed in a destination URL:
 * source, market, placement, intent. Never an address, parcel, owner/client
 * name, email, phone, MLS field, or any financial value.
 */

import {
  analyzeAnyDealDestination,
  analyzeAnyPropertyUrl,
  type ProductDestination,
} from "@/config/externalProducts";

export type MarketKey = "capital-district";
export type RegionalBrandKey = "capital-district-nest";

export interface RegionalMarketConfig {
  marketKey: MarketKey;
  regionalBrandKey: RegionalBrandKey;
  displayName: string;
  /** Best internal live-search destination for this market. */
  searchHomesPath: string;
  /** Homepage search anchor fallback. */
  searchAnchor: string;
  labels: {
    searchHomes: string;
    dealCalculator: string;
    analyzeProperty: string;
    talkToHuman: string;
    /** Constrained tablet variants — still explicit, never a single "Analyze". */
    dealCalculatorShort: string;
    analyzePropertyShort: string;
  };
}

export const CAPITAL_DISTRICT: RegionalMarketConfig = {
  marketKey: "capital-district",
  regionalBrandKey: "capital-district-nest",
  displayName: "Capital District",
  searchHomesPath: "/homes/search",
  searchAnchor: "/#search",
  labels: {
    searchHomes: "Search Homes",
    dealCalculator: "Deal Calculator",
    analyzeProperty: "Analyze Property",
    talkToHuman: "Talk to Scott",
    dealCalculatorShort: "Deal Calc",
    analyzePropertyShort: "Property",
  },
};

/** Active market for this deployment. Future Nest sites swap this constant. */
export const ACTIVE_MARKET = CAPITAL_DISTRICT;

export type SharedProduct =
  | "search_homes"
  | "analyze_any_deal"
  | "analyze_any_property"
  | "talk_to_scott";

/** Analyze Any Deal — shared financial decision engine. */
export function dealCalculatorDestination(placement: string, intent = "buying"): ProductDestination {
  return analyzeAnyDealDestination({ placement, intentType: intent });
}

/** Analyze Any Property — shared property-evidence product (always external). */
export function analyzePropertyDestination(placement: string): ProductDestination {
  return { kind: "external", href: analyzeAnyPropertyUrl({ placement }) };
}

/** Non-PII analytics context shared by every regional product surface. */
export function productAnalyticsContext(sourceLocation: string) {
  return {
    market: ACTIVE_MARKET.marketKey.replace(/-/g, "_"),
    regional_brand: ACTIVE_MARKET.regionalBrandKey.replace(/-/g, "_"),
    source_location: sourceLocation,
  };
}
