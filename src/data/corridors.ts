import type { CorridorPin, CrossStreet } from "@/components/maps/CorridorStreetMap";

export interface CorridorData {
  crossStreets: CrossStreet[];
  pins: CorridorPin[];
}

/**
 * Per-neighborhood corridor data for <CorridorStreetMap />.
 * Lark Street is the first art-directed proof-of-concept; others fall
 * back to a generated placeholder corridor of available storefronts.
 */
export const CORRIDOR_DATA: Record<string, CorridorData> = {
  "lark-street": {
    crossStreets: [
      { t: 8, name: "Madison Ave" },
      { t: 26, name: "Hudson Ave" },
      { t: 44, name: "Lancaster" },
      { t: 62, name: "State St" },
      { t: 80, name: "Washington Ave" },
      { t: 95, name: "Western Ave" },
    ],
    pins: [
      { id: "el-loco",     name: "El Loco Mexican Café",  category: "dining",   t: 14, side: "n", status: "featured", blurb: "Lark Street institution since 1976." },
      { id: "lark-tav",    name: "Lark Tavern",            category: "taverns",  t: 22, side: "s", status: "featured", blurb: "Iconic Albany tavern + live music." },
      { id: "stacks",      name: "Stacks Espresso",        category: "coffee",   t: 30, side: "n", status: "claimed",  blurb: "Pour-overs and pastries." },
      { id: "available-1", name: "Available Storefront",   category: "retail",   t: 36, side: "s", status: "available", blurb: "Claim this corner spot." },
      { id: "wine-bar",    name: "Lark Wine Bar",          category: "taverns",  t: 42, side: "n", status: "claimed",  blurb: "Natural wine + small plates." },
      { id: "elissa",      name: "Elissa Halloran Designs",category: "retail",   t: 50, side: "s", status: "featured", blurb: "Curated boutique." },
      { id: "available-2", name: "Available Storefront",   category: "services", t: 56, side: "n", status: "available" },
      { id: "yono",        name: "Yono's",                 category: "dining",   t: 64, side: "s", status: "claimed",  blurb: "Upscale Indonesian-American." },
      { id: "lark-yoga",   name: "Center Square Yoga",     category: "wellness", t: 70, side: "n", status: "claimed" },
      { id: "available-3", name: "Available Storefront",   category: "dining",   t: 76, side: "s", status: "available" },
      { id: "the-low",     name: "The Low Beat",           category: "events",   t: 84, side: "n", status: "featured", blurb: "Live music + DJ nights." },
      { id: "salon-x",     name: "Salon West",             category: "services", t: 90, side: "s", status: "claimed" },
    ],
  },
};

/** Fallback corridor for neighborhoods without curated data. */
export function generatePlaceholderCorridor(): CorridorData {
  return {
    crossStreets: [
      { t: 12, name: "1st" },
      { t: 36, name: "Center" },
      { t: 62, name: "Park" },
      { t: 88, name: "End" },
    ],
    pins: [
      { id: "pl-1", name: "Available Storefront", category: "dining",   t: 16, side: "n", status: "available" },
      { id: "pl-2", name: "Available Storefront", category: "coffee",   t: 28, side: "s", status: "available" },
      { id: "pl-3", name: "Available Storefront", category: "retail",   t: 44, side: "n", status: "available" },
      { id: "pl-4", name: "Available Storefront", category: "services", t: 58, side: "s", status: "available" },
      { id: "pl-5", name: "Available Storefront", category: "taverns",  t: 72, side: "n", status: "available" },
      { id: "pl-6", name: "Available Storefront", category: "wellness", t: 86, side: "s", status: "available" },
    ],
  };
}

export function getCorridorData(slug: string): CorridorData {
  return CORRIDOR_DATA[slug] ?? generatePlaceholderCorridor();
}
