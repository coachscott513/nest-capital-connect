import { CAPITAL_DISTRICT_COUNTIES } from "@/data/capitalDistrictCounties";

export type SearchIntentType = "business" | "town" | "real_estate" | "event" | "unknown";

export interface SearchIntentResult {
  type: SearchIntentType;
  query: string;
  town?: { name: string; slug: string };
  search?: string;
  category?: string;
  route: string;
}

const BUSINESS_TERMS = [
  "finance", "financial", "financial advisor", "mortgage", "lender", "bank", "credit union",
  "coffee", "cafe", "cafes", "café", "cafés", "restaurant", "restaurants", "dining", "bar",
  "bakery", "attorney", "lawyer", "contractor", "hvac", "plumber", "electrician", "roofer",
  "gym", "dentist", "doctor", "insurance", "accountant", "salon", "retail", "shop", "service",
];

const EVENT_RE = /\b(events?|festival|festivals|concerts?|live music|things to do|weekend|farmers market)\b/i;
const REAL_ESTATE_RE = /\b(homes?|houses?|listings?|mls|property|properties|for sale|open houses?|\d+\s*(bed|bedroom|br)|land|lots?|acreage|multi[-\s]?family|multifamily|duplex|triplex|investment properties?|rental|rentals?|condos?|townhomes?)\b/i;
const BUSINESS_RE = new RegExp(`\\b(${BUSINESS_TERMS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "i");
const MLS_RE = /\b(mls\s*#?\s*)?[a-z]?\d{5,8}\b/i;
const ADDRESS_RE = /\b\d{1,6}\s+[a-z0-9.'-]+\s+(st|street|ave|avenue|rd|road|dr|drive|ln|lane|blvd|boulevard|ct|court|way|pl|place|ter|terrace|hwy|highway)\b/i;

const TOWNS = CAPITAL_DISTRICT_COUNTIES.flatMap((county) => county.towns)
  .sort((a, b) => b.name.length - a.name.length);

const normalize = (value: string) => value.trim().replace(/\s+/g, " ");
const squish = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const normalizeSearchParam = (value: string) =>
  normalize(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const findTown = (query: string) => {
  const normalized = squish(query);
  return TOWNS.find((town) => {
    const name = squish(town.name);
    const slug = town.slug.replace(/-/g, " ");
    return normalized === name || normalized === slug || normalized.includes(name) || normalized.includes(slug);
  });
};

const stripTown = (query: string, town?: { name: string; slug: string }) => {
  if (!town) return normalize(query);
  const slugWords = town.slug.replace(/-/g, " ");
  const withoutTown = query
    .replace(new RegExp(`\\b${town.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "ig"), " ")
    .replace(new RegExp(`\\b${slugWords.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "ig"), " ");
  return normalize(withoutTown) || normalize(query);
};

const buildLocalRoute = (search: string, town?: { name: string; slug: string }) => {
  const params = new URLSearchParams();
  if (search) params.set("search", normalizeSearchParam(search));
  if (town) params.set("town", town.name);
  return `/local?${params.toString()}`;
};

export function resolveSearchIntent(raw: string): SearchIntentResult {
  const query = normalize(raw);
  if (!query) return { type: "unknown", query, route: "/local" };

  const town = findTown(query);
  const realEstate = REAL_ESTATE_RE.test(query) || MLS_RE.test(query) || ADDRESS_RE.test(query);
  const business = BUSINESS_RE.test(query);
  const event = EVENT_RE.test(query);
  const search = stripTown(query, town);

  if (event && !realEstate) {
    return { type: "event", query, town, search, route: buildLocalRoute(search, town) };
  }

  if (business && !realEstate) {
    return { type: "business", query, town, search, category: search, route: buildLocalRoute(search, town) };
  }

  if (realEstate) {
    const params = new URLSearchParams();
    if (town) params.set("town", town.name);
    if (/\b(investment properties?|multi[-\s]?family|multifamily|duplex|triplex)\b/i.test(query)) {
      return { type: "real_estate", query, town, search, route: `/investment-properties${params.toString() ? `?${params}` : ""}` };
    }
    return { type: "real_estate", query, town, search, route: `/homes${params.toString() ? `?${params}` : ""}` };
  }

  if (town && squish(query) === squish(town.name)) {
    return { type: "town", query, town, route: `/living-in/${town.slug}` };
  }

  return { type: town ? "business" : "unknown", query, town, search, route: buildLocalRoute(search, town) };
}

export const getSearchRoute = (query: string) => resolveSearchIntent(query).route;