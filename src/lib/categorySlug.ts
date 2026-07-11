import { OFFICIAL_CATEGORIES, type OfficialCategory } from "@/data/officialCategories";

export const categoryToSlug = (c: string): string =>
  c
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const SLUG_MAP: Record<string, OfficialCategory> = OFFICIAL_CATEGORIES.reduce(
  (acc, cat) => {
    acc[categoryToSlug(cat)] = cat;
    return acc;
  },
  {} as Record<string, OfficialCategory>,
);

// A few friendly aliases so /businesses/restaurants and /businesses/coffee work.
const ALIASES: Record<string, OfficialCategory> = {
  restaurants: "Restaurant",
  coffee: "Food and Beverage",
  cafes: "Food and Beverage",
  contractors: "Construction",
  attorneys: "Legal Services",
  lawyers: "Legal Services",
  mortgage: "Banking and Finance",
  dentists: "Dental",
  doctors: "Healthcare",
  gyms: "Fitness",
  salons: "Salon and Spa",
  vets: "Veterinary",
  realtors: "Real Estate",
  plumbers: "Plumbing",
  electricians: "Electrician",
  roofers: "Roofing",
  landscapers: "Landscaping",
  painters: "Painting",
};

export const slugToCategory = (slug: string): OfficialCategory | undefined => {
  if (!slug) return undefined;
  const key = slug.toLowerCase();
  return SLUG_MAP[key] ?? ALIASES[key];
};
