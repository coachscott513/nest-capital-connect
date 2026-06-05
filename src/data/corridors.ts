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
      {
        id: "el-loco", name: "El Loco Mexican Café", category: "dining", t: 14, side: "n",
        status: "featured", tier: "spotlight",
        blurb: "Lark Street institution since 1976 — Tex-Mex, margaritas, and a hand-painted patio.",
        address: "465 Madison Ave, Albany, NY 12208",
        phone: "(518) 436-1855",
        website: "https://ellocomex.com",
        hours: "Tue–Sun · 4pm–10pm",
        openNow: true,
        partnerLabel: "Lark Street Partner",
        specials: "Margarita Mondays · $7 house margs",
        instagram: "https://instagram.com/ellocomexicancafe",
      },
      {
        id: "lark-tav", name: "Lark Tavern", category: "taverns", t: 22, side: "s",
        status: "featured", tier: "premier",
        blurb: "Iconic Albany tavern with live music, craft beer, and late-night bites.",
        address: "453 Madison Ave, Albany, NY 12208",
        phone: "(518) 396-3616",
        website: "https://thelarktavern.com",
        hours: "Daily · 11am–2am",
        openNow: true,
        partnerLabel: "Featured on Lark Street",
        instagram: "https://instagram.com/larktavern",
        facebook: "https://facebook.com/larktavern",
      },
      {
        id: "stacks", name: "Stacks Espresso", category: "coffee", t: 30, side: "n",
        status: "claimed", tier: "featured",
        blurb: "Locally-roasted pour-overs and house pastries.",
        address: "261 Lark St, Albany, NY 12210",
        phone: "(518) 992-0070",
        website: "https://stacksespresso.com",
        hours: "Mon–Sun · 7am–6pm",
      },
      { id: "available-1", name: "Available Storefront", category: "retail", t: 36, side: "s", status: "available", blurb: "Claim this corner spot." },
      {
        id: "wine-bar", name: "Lark Wine Bar", category: "taverns", t: 42, side: "n",
        status: "claimed", tier: "featured",
        blurb: "Natural wine, small plates, and rotating local pours.",
        address: "200 Lark St, Albany, NY 12210",
        phone: "(518) 813-4477",
        website: "https://larkwinebar.com",
        hours: "Wed–Sat · 5pm–11pm",
        instagram: "https://instagram.com/larkwinebar",
      },
      {
        id: "elissa", name: "Elissa Halloran Designs", category: "retail", t: 50, side: "s",
        status: "featured", tier: "featured",
        blurb: "Curated boutique — handmade jewelry, gifts, and locally designed apparel.",
        address: "225 Lark St, Albany, NY 12210",
        phone: "(518) 432-7090",
        hours: "Tue–Sat · 11am–6pm",
      },
      { id: "available-2", name: "Available Storefront", category: "services", t: 56, side: "n", status: "available" },
      {
        id: "yono", name: "Yono's", category: "dining", t: 64, side: "s",
        status: "claimed", tier: "featured",
        blurb: "Upscale Indonesian-American fine dining.",
        address: "25 Chapel St, Albany, NY 12210",
        phone: "(518) 436-7747",
        website: "https://yonosrestaurant.com",
        hours: "Tue–Sat · 5pm–10pm",
      },
      { id: "lark-yoga", name: "Center Square Yoga", category: "wellness", t: 70, side: "n", status: "claimed", blurb: "Vinyasa, yin, and community classes." },
      { id: "available-3", name: "Available Storefront", category: "dining", t: 76, side: "s", status: "available" },
      {
        id: "the-low", name: "The Low Beat", category: "events", t: 84, side: "n",
        status: "featured", tier: "premier",
        blurb: "Live music + DJ nights — Albany's late-night listening room.",
        address: "335 Central Ave, Albany, NY 12206",
        website: "https://thelowbeat.com",
        hours: "Thu–Sat · 8pm–2am",
        specials: "Fri · Indie Night · 9pm",
        instagram: "https://instagram.com/thelowbeat",
      },
      { id: "salon-x", name: "Salon West", category: "services", t: 90, side: "s", status: "claimed", blurb: "Color, cuts, and styling by appointment." },
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
