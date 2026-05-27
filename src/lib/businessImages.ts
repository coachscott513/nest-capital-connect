/* =============================================================
   Shared category fallback image system for business cards & modals
   Used to ensure every business — even free / unclaimed listings —
   renders a polished visual instead of a blank gray box.
   ============================================================= */

import type { Business } from "@/data/businesses";

const FALLBACKS: Array<[RegExp, string]> = [
  [/coffee|cafe|café|espresso|roaster/i,
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1600&q=80"],
  [/bakery|patisserie|donut|bagel|pastry/i,
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80"],
  [/butcher|market|grocery|deli|provisions/i,
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1600&q=80"],
  [/restaurant|bar|pub|pizz|diner|grill|food|eatery|sandwich|kitchen|bistro/i,
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"],

  [/roof/i,
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1600&q=80"],
  [/plumb/i,
    "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1600&q=80"],
  [/electric/i,
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80"],
  [/hvac|heating|cooling|furnace/i,
    "https://images.unsplash.com/photo-1631545806609-37942d0e9929?auto=format&fit=crop&w=1600&q=80"],
  [/landscap|lawn|tree|garden/i,
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80"],
  [/clean/i,
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80"],
  [/handyman|handywoman|contractor|construction|remodel|builder|home service/i,
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"],

  [/real estate|property management|realtor/i,
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=80"],
  [/mortgage|lender|loan/i,
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80"],
  [/bank|credit union/i,
    "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1600&q=80"],
  [/insurance/i,
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80"],
  [/attorney|lawyer|legal|law/i,
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80"],
  [/accountant|cpa|tax|bookkeep|financial|advisor|wealth/i,
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80"],
  [/inspector|inspection/i,
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80"],
  [/marketing|advertis|agency/i,
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"],

  [/dental|dentist|orthodont/i,
    "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1600&q=80"],
  [/medical|doctor|clinic|health|physician/i,
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80"],
  [/wellness|chiropract|massage|acupunct|therap/i,
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80"],

  [/gym|fitness|yoga|pilates|crossfit/i,
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80"],
  [/salon|barber|spa|nail|hair|beauty/i,
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80"],

  [/pet|vet|groom|kennel/i,
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1600&q=80"],
  [/auto|mechanic|tire|car wash|oil change|garage/i,
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=80"],
  [/book|library/i,
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80"],
  [/retail|shop|store|boutique/i,
    "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=1600&q=80"],
];

const DEFAULT_FALLBACK =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80";

export const fallbackImageForCategory = (
  ...hints: Array<string | null | undefined>
): string => {
  const hay = hints.filter(Boolean).join(" ");
  for (const [re, url] of FALLBACKS) {
    if (re.test(hay)) return url;
  }
  return DEFAULT_FALLBACK;
};

export const resolveBusinessImage = (b: Partial<Business> | null | undefined): string => {
  if (!b) return DEFAULT_FALLBACK;
  if (b.image) return b.image;
  return fallbackImageForCategory(b.category, b.subcategory, b.tagline);
};

/**
 * Returns true ONLY if the business has uploaded real media
 * (hero image, gallery, or hero video). Used to decide whether
 * to render an image-based card / cinematic modal hero vs. the
 * text-first editorial layout. Category stock fallbacks DO NOT
 * count as "real media" — we never want to fake business photos.
 */
export const hasRealBusinessMedia = (
  b: Partial<Business> | null | undefined,
): boolean => {
  if (!b) return false;
  if (b.heroVideo) return true;
  if (b.image) return true;
  if (Array.isArray(b.gallery) && b.gallery.length > 0) return true;
  return false;
};

export const DEFAULT_BUSINESS_IMAGE = DEFAULT_FALLBACK;
