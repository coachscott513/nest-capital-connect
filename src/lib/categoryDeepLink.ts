import { OFFICIAL_CATEGORIES, type OfficialCategory } from "@/data/officialCategories";

/* =============================================================
   CATEGORY DEEP LINK RESOLVER
   Maps friendly URL slugs (e.g. "home-services", "restaurants",
   "legal-services") used by homepage panels & hub rooms into a
   structured { official, search } the /local directory can apply.
   Single-vertical slugs map to an exact OFFICIAL_CATEGORIES value
   so the dropdown populates. "Group" slugs (multi-category) seed
   the search box instead so results span multiple categories.
   ============================================================= */

export interface ResolvedCategoryParam {
  official?: OfficialCategory;
  search?: string;
  group?: string;
}

const norm = (s: string) =>
  s.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/&/g, "and");

// Group slugs that span multiple official categories. We seed the
// search box (which fans out via SEARCH_SYNONYMS in the data hook)
// instead of pinning a single dropdown value.
const GROUP_SEARCH: Record<string, string> = {
  "home-services": "contractor",
  "contractors-home-services": "contractor",
  "contractors-and-home-services": "contractor",
  "contractors": "contractor",
  "professional-services": "professional",
  "health-wellness": "wellness",
  "health-and-wellness": "wellness",
  "wellness": "wellness",
  "finance-legal": "finance",
  "mortgage-legal-finance": "finance",
  "mortgage-legal-and-finance": "finance",
};

// Single-vertical slug aliases → exact OFFICIAL_CATEGORIES value.
const SLUG_TO_OFFICIAL: Record<string, OfficialCategory> = {
  "restaurants": "Restaurant",
  "restaurant": "Restaurant",
  "dining": "Restaurant",
  "food-beverage": "Food and Beverage",
  "food-and-beverage": "Food and Beverage",
  "cafe": "Food and Beverage",
  "coffee": "Food and Beverage",
  "real-estate": "Real Estate",
  "realtor": "Real Estate",
  "property-management": "Property Management",
  "insurance": "Insurance",
  "legal-services": "Legal Services",
  "legal": "Legal Services",
  "attorney": "Legal Services",
  "attorneys": "Legal Services",
  "lawyer": "Legal Services",
  "accounting": "Accounting",
  "accountant": "Accounting",
  "cpa": "Accounting",
  "banking-finance": "Banking and Finance",
  "banking-and-finance": "Banking and Finance",
  "mortgage": "Banking and Finance",
  "healthcare": "Healthcare",
  "health": "Healthcare",
  "doctor": "Healthcare",
  "doctors": "Healthcare",
  "dental": "Dental",
  "dentist": "Dental",
  "dentists": "Dental",
  "fitness": "Fitness",
  "gym": "Fitness",
  "yoga": "Fitness",
  "salon": "Salon and Spa",
  "salon-and-spa": "Salon and Spa",
  "spa": "Salon and Spa",
  "beauty": "Beauty and Personal Care",
  "beauty-and-personal-care": "Beauty and Personal Care",
  "automotive-repair": "Automotive Repair",
  "auto": "Automotive Repair",
  "automotive-sales": "Automotive Sales",
  "retail": "Retail",
  "shopping": "Retail",
  "shop": "Retail",
  "store": "Retail",
  "plumber": "Plumbing",
  "plumbing": "Plumbing",
  "electrician": "Electrician",
  "electricians": "Electrician",
  "hvac": "HVAC",
  "roofing": "Roofing",
  "roofer": "Roofing",
  "landscaping": "Landscaping",
  "landscaper": "Landscaping",
  "painting": "Painting",
  "painter": "Painting",
  "general-contractor": "Construction",
  "construction": "Construction",
  "handyman": "Home Improvement",
  "home-improvement": "Home Improvement",
  "home-service": "Home Improvement",
  "pest-control": "Pest Control",
  "cleaning": "Cleaning Services",
  "cleaning-services": "Cleaning Services",
  "janitorial": "Janitorial Services",
  "janitorial-services": "Janitorial Services",
  "pet": "Pet Services",
  "pet-services": "Pet Services",
  "vet": "Veterinary",
  "veterinary": "Veterinary",
  "consulting": "Consulting",
  "marketing": "Advertising and Marketing",
  "advertising-and-marketing": "Advertising and Marketing",
  "education": "Education",
  "hospitality": "Hospitality",
  "entertainment": "Entertainment",
  "photography": "Photography",
  "florist": "Florist",
  "architect": "Architecture",
  "architecture": "Architecture",
  "engineering": "Engineering",
  "interior-design": "Interior Design",
  "software": "Software",
  "it": "Information Technology",
  "information-technology": "Information Technology",
  "telecom": "Telecommunications",
  "media": "Media and Publishing",
  "nonprofit": "Nonprofit",
  "catering": "Catering",
  "graphic-design": "Graphic Design",
  "agriculture": "Agriculture",
  "manufacturing": "Manufacturing",
  "logistics": "Logistics",
  "security": "Security Services",
  "security-services": "Security Services",
  "staffing": "Staffing and Recruiting",
  "travel": "Travel and Tourism",
  "trucking": "Trucking",
  "wholesale": "Wholesale",
};

export const resolveCategoryParam = (
  raw: string | null | undefined,
): ResolvedCategoryParam => {
  if (!raw) return {};
  const officialMatch = OFFICIAL_CATEGORIES.find(
    (c) => c.toLowerCase() === raw.toLowerCase(),
  );
  if (officialMatch) return { official: officialMatch };
  const slug = norm(raw);
  if (SLUG_TO_OFFICIAL[slug]) return { official: SLUG_TO_OFFICIAL[slug] };
  if (GROUP_SEARCH[slug]) return { search: GROUP_SEARCH[slug], group: slug };
  return { search: raw };
};
