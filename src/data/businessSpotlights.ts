import type { OfficialCategory } from "@/data/officialCategories";
import rooseveltHero from "@/assets/roosevelt-hero.jpg";

export interface BusinessSpotlight {
  slug: string;
  businessName: string;
  category: OfficialCategory;
  town: string;
  summary: string;
  heroImage?: string;
  hasVideo?: boolean;
  profileRoute?: string;
  status: "published" | "coming_soon";
}

/**
 * Hand-curated Capital District Nest Spotlights. Up to 3 per category.
 * These are NOT rankings — they are editorial features. Copy on the
 * page must always read "businesses we're currently highlighting", never
 * "best" / "top" / "recommended over everyone else".
 */
export const BUSINESS_SPOTLIGHTS: BusinessSpotlight[] = [
  {
    slug: "the-roosevelt-room",
    businessName: "The Roosevelt Room",
    category: "Restaurant",
    town: "Troy",
    summary:
      "A neighborhood restaurant and cocktail room in North Greenbush known for craft plates, warm service, and a room that feels like a local secret.",
    heroImage: rooseveltHero,
    hasVideo: true,
    profileRoute: "/business/the-roosevelt-room",
    status: "published",
  },
  {
    slug: "spotlight-coffee-coming-soon",
    businessName: "Spotlight coming soon",
    category: "Food and Beverage",
    town: "Capital District",
    summary:
      "We're producing our first coffee-shop Spotlight. Own a café worth featuring? Tell us your story.",
    status: "coming_soon",
  },
  {
    slug: "spotlight-contractor-coming-soon",
    businessName: "Spotlight coming soon",
    category: "Construction",
    town: "Capital District",
    summary:
      "We're producing our first Home & Property Spotlight — contractors, builders, and remodelers doing standout local work.",
    status: "coming_soon",
  },
  {
    slug: "spotlight-legal-coming-soon",
    businessName: "Spotlight coming soon",
    category: "Legal Services",
    town: "Capital District",
    summary:
      "We're producing our first Professional Services Spotlight featuring a Capital District law firm known for care and clarity.",
    status: "coming_soon",
  },
  {
    slug: "spotlight-wellness-coming-soon",
    businessName: "Spotlight coming soon",
    category: "Fitness",
    town: "Capital District",
    summary:
      "We're producing our first Health & Wellness Spotlight — the studios, gyms, and practitioners locals actually go to.",
    status: "coming_soon",
  },
];

export const spotlightsForCategory = (cat: string) =>
  BUSINESS_SPOTLIGHTS.filter((s) => s.category === cat).slice(0, 3);
