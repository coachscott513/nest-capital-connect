// Capital District Nest — first outreach batch of business previews.
// Rule: ONLY verified public info. Names + municipality + category + factual
// original summary. Contact fields (phone, website, socials, address, hours)
// are intentionally omitted — the owner supplies them on claim. Never fabricate.

import type { OfficialCategory } from "@/data/officialCategories";

export type PreviewLabel =
  | "spotlight"
  | "preview"
  | "owner_review_pending"
  | "owner_verified";

export type PreviewGroup =
  | "Food & Drink"
  | "Home & Property"
  | "Professional Services"
  | "Health & Wellness"
  | "Retail & Lifestyle"
  | "Nonprofit & Community";

export interface PreviewBusiness {
  slug: string;
  name: string;
  /** Parent taxonomy — must be one of the 54 official categories. */
  category: OfficialCategory;
  /** Optional precise label shown to users (e.g. "Mortgage Lending"). */
  displayCategory?: string;
  categoryGroup: PreviewGroup;
  town: string;
  county?: string;
  summary: string;
  /** Optional deeper editorial paragraph — flagships only. */
  editorial?: string;
  label: PreviewLabel;
  addedAt: string;
  /** Points to a dedicated custom page instead of the generic template. */
  customRoute?: string;
}

export const PREVIEW_BUSINESSES: PreviewBusiness[] = [
  // ────── FOOD & DRINK ──────
  {
    slug: "the-roosevelt-room",
    name: "The Roosevelt Room",
    category: "Restaurant",
    categoryGroup: "Food & Drink",
    town: "North Greenbush",
    county: "Rensselaer",
    summary:
      "A neighborhood restaurant and cocktail room in North Greenbush known for craft plates, warm service, and a room that feels like a local secret.",
    label: "spotlight",
    addedAt: "2026-07-01",
    customRoute: "/business/the-roosevelt-room",
  },
  {
    slug: "iron-gate-cafe",
    name: "Iron Gate Café",
    category: "Restaurant",
    categoryGroup: "Food & Drink",
    town: "Albany",
    county: "Albany",
    summary:
      "A long-running Lark Street breakfast and brunch spot beloved for its patio, weekend lines, and a menu that keeps regulars coming back.",
    label: "spotlight",
    addedAt: "2026-07-10",
  },
  {
    slug: "superior-merchandise-company",
    name: "Superior Merchandise Company",
    category: "Restaurant",
    categoryGroup: "Food & Drink",
    town: "Troy",
    county: "Rensselaer",
    summary:
      "A River Street coffee, cocktail, and small-plates room that anchors downtown Troy's café-to-bar rhythm.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "lucas-confectionery",
    name: "Lucas Confectionery",
    category: "Restaurant",
    categoryGroup: "Food & Drink",
    town: "Troy",
    county: "Rensselaer",
    summary:
      "A neighborhood wine bar in a restored Second Street storefront — one of the rooms that helped define Troy's food scene.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "nine-pin-cider-works",
    name: "Nine Pin Cider Works",
    category: "Food and Beverage",
    categoryGroup: "Food & Drink",
    town: "Albany",
    county: "Albany",
    summary:
      "New York's first farm cidery, producing hard cider in a working Warehouse District tasting room in Albany.",
    label: "preview",
    addedAt: "2026-07-11",
  },

  // ────── HOME & PROPERTY ──────
  {
    slug: "cassone",
    name: "Cassone",
    category: "Construction",
    categoryGroup: "Home & Property",
    town: "Capital District",
    summary:
      "A regional leader in modular buildings, trailers, and industrial structures — one of the Capital District's most recognizable commercial brands.",
    label: "spotlight",
    addedAt: "2026-07-08",
    customRoute: "/business/cassone",
  },
  {
    slug: "family-danz-heating-cooling",
    name: "Family Danz Heating & Cooling",
    category: "Construction",
    categoryGroup: "Home & Property",
    town: "Albany",
    county: "Albany",
    summary:
      "A family-owned HVAC company serving Capital District homes with heating, cooling, and indoor-air installations and service.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "grasshopper-heating-cooling",
    name: "Grasshopper Heating & Cooling",
    category: "Construction",
    categoryGroup: "Home & Property",
    town: "Latham",
    county: "Albany",
    summary:
      "A Latham-based heating, cooling, and plumbing company known regionally for residential HVAC service across the Capital District.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "murray-painting",
    name: "Murray Painting",
    category: "Construction",
    categoryGroup: "Home & Property",
    town: "Capital District",
    summary:
      "A residential and commercial painting company working across the Capital District on interior repaints, exteriors, and finish work.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "crisafulli-bros",
    name: "Crisafulli Bros. Plumbing & Heating",
    category: "Construction",
    categoryGroup: "Home & Property",
    town: "Albany",
    county: "Albany",
    summary:
      "One of the Capital District's largest and longest-running plumbing, heating, cooling, and electrical service companies.",
    label: "preview",
    addedAt: "2026-07-11",
  },

  // ────── PROFESSIONAL SERVICES ──────
  {
    slug: "christie-hoyt-mortgage-team",
    name: "Christie Hoyt Mortgage Team",
    category: "Banking and Finance",
    categoryGroup: "Professional Services",
    town: "Capital District",
    summary:
      "A Capital District mortgage team helping first-time buyers, move-up families, and investors navigate loan options across New York.",
    label: "spotlight",
    addedAt: "2026-07-11",
  },
  {
    slug: "tully-rinckey",
    name: "Tully Rinckey PLLC",
    category: "Legal Services",
    categoryGroup: "Professional Services",
    town: "Albany",
    county: "Albany",
    summary:
      "A full-service law firm headquartered in Albany serving individuals, families, businesses, and federal employees across the Capital District.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "denofio-insurance-agency",
    name: "Denofio Insurance Agency",
    category: "Banking and Finance",
    categoryGroup: "Professional Services",
    town: "Niskayuna",
    county: "Schenectady",
    summary:
      "An independent Niskayuna insurance agency that has served Capital District families and businesses for more than 50 years — auto, home, business, and flood coverage.",
    label: "owner_verified",
    addedAt: "2026-06-15",
  },
  {
    slug: "marvin-and-company",
    name: "Marvin and Company, P.C.",
    category: "Banking and Finance",
    categoryGroup: "Professional Services",
    town: "Latham",
    county: "Albany",
    summary:
      "A regional certified public accounting and consulting firm with offices in Latham and Queensbury serving Capital District businesses and families.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "pyramid-brokerage-company",
    name: "Pyramid Brokerage Company",
    category: "Real Estate",
    categoryGroup: "Professional Services",
    town: "Albany",
    county: "Albany",
    summary:
      "One of Upstate New York's largest commercial real estate brokerages, with an Albany office serving Capital District tenants, owners, and investors.",
    label: "preview",
    addedAt: "2026-07-11",
  },

  // ────── HEALTH & WELLNESS ──────
  {
    slug: "delmar-dental-medicine",
    name: "Delmar Dental Medicine",
    category: "Dental",
    categoryGroup: "Health & Wellness",
    town: "Delmar",
    county: "Albany",
    summary:
      "A neighborhood dental practice in Delmar providing general and family dentistry to Bethlehem-area residents.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "best-fitness-albany",
    name: "Best Fitness",
    category: "Fitness",
    categoryGroup: "Health & Wellness",
    town: "Albany",
    county: "Albany",
    summary:
      "A regional fitness club with multiple Capital District locations offering strength, cardio, group classes, and personal training.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "complexions-spa",
    name: "Complexions Spa for Beauty & Wellness",
    category: "Salon and Spa",
    categoryGroup: "Health & Wellness",
    town: "Saratoga Springs",
    county: "Saratoga",
    summary:
      "A day spa and wellness center with locations in Saratoga Springs and Albany offering facials, massage, and skin care.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "shaker-veterinary-hospital",
    name: "Shaker Veterinary Hospital",
    category: "Veterinary",
    categoryGroup: "Health & Wellness",
    town: "Latham",
    county: "Albany",
    summary:
      "A full-service small-animal veterinary hospital in Latham serving Capital District pet owners.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "sunnyview-rehabilitation-hospital",
    name: "Sunnyview Rehabilitation Hospital",
    category: "Healthcare",
    categoryGroup: "Health & Wellness",
    town: "Schenectady",
    county: "Schenectady",
    summary:
      "A Schenectady-based inpatient and outpatient physical rehabilitation hospital, part of the St. Peter's Health Partners network.",
    label: "preview",
    addedAt: "2026-07-11",
  },

  // ────── RETAIL & LIFESTYLE ──────
  {
    slug: "emil-j-nagengast-florist",
    name: "Emil J. Nagengast Florist",
    category: "Florist",
    categoryGroup: "Retail & Lifestyle",
    town: "Albany",
    county: "Albany",
    summary:
      "A long-established Albany florist serving the Capital District with everyday arrangements, weddings, and events.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "some-girls-boutique",
    name: "Some Girls Boutique",
    category: "Retail",
    categoryGroup: "Retail & Lifestyle",
    town: "Troy",
    county: "Rensselaer",
    summary:
      "A downtown Troy women's boutique carrying independent and modern-classic clothing lines on Broadway.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "capital-district-photography",
    name: "Capital District Photography",
    category: "Photography",
    categoryGroup: "Retail & Lifestyle",
    town: "Capital District",
    summary:
      "Placeholder slot for a founding photographer preview. Awaiting verified selection before publication.",
    label: "owner_review_pending",
    addedAt: "2026-07-11",
  },
  {
    slug: "lia-auto-group",
    name: "Lia Auto Group",
    category: "Automotive Sales",
    categoryGroup: "Retail & Lifestyle",
    town: "Albany",
    county: "Albany",
    summary:
      "A family-owned Capital District automotive group operating multiple new-car dealerships across the region.",
    label: "preview",
    addedAt: "2026-07-11",
  },
  {
    slug: "regional-food-bank-of-northeastern-ny",
    name: "Regional Food Bank of Northeastern New York",
    category: "Nonprofit",
    categoryGroup: "Retail & Lifestyle",
    town: "Latham",
    county: "Albany",
    summary:
      "A nonprofit food bank based in Latham supplying food to hundreds of member agencies across 23 counties of Northeastern New York.",
    label: "preview",
    addedAt: "2026-07-11",
  },
];

export const getPreviewBySlug = (slug: string) =>
  PREVIEW_BUSINESSES.find((b) => b.slug === slug);

export const PREVIEW_LABEL_TEXT: Record<PreviewLabel, string> = {
  spotlight: "Spotlight",
  preview: "Profile Preview",
  owner_review_pending: "Owner Review Pending",
  owner_verified: "Owner Verified",
};
