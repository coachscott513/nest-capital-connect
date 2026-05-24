// Capital District local business directory.
// Hand-curated seed data; structure mirrors a future Supabase `businesses` table.
// Powers /local, town-page partner sections, search/filter, and the detail modal.

export type BusinessCategory =
  // Real Estate & Home Buying
  | "Mortgage Lender"
  | "Bank/Credit Union"
  | "Real Estate Attorney"
  | "Insurance"
  | "Home Inspector"
  // Home Services
  | "Contractor"
  | "Roofer"
  | "Plumber"
  | "Electrician"
  | "HVAC"
  | "Landscaper"
  | "Handyman"
  | "Cleaner"
  // Local Lifestyle
  | "Restaurant"
  | "Coffee"
  | "Bakery"
  | "Gym"
  | "Salon"
  | "Retail"
  | "Auto"
  | "Pet"
  | "Wellness"
  | "Bookstore"
  // Professional
  | "Accountant"
  | "Financial Advisor"
  | "Attorney"
  | "Marketing"
  | "Home Service";

export type CategoryGroup =
  | "Real Estate & Home Buying"
  | "Home Services"
  | "Local Lifestyle"
  | "Professional Services";

export const CATEGORY_GROUPS: Record<CategoryGroup, BusinessCategory[]> = {
  "Real Estate & Home Buying": [
    "Mortgage Lender",
    "Bank/Credit Union",
    "Real Estate Attorney",
    "Insurance",
    "Home Inspector",
  ],
  "Home Services": [
    "Contractor",
    "Roofer",
    "Plumber",
    "Electrician",
    "HVAC",
    "Landscaper",
    "Handyman",
    "Cleaner",
    "Home Service",
  ],
  "Local Lifestyle": [
    "Restaurant",
    "Coffee",
    "Bakery",
    "Gym",
    "Salon",
    "Retail",
    "Auto",
    "Pet",
    "Wellness",
    "Bookstore",
  ],
  "Professional Services": [
    "Accountant",
    "Financial Advisor",
    "Attorney",
    "Marketing",
  ],
};

export interface BusinessSocials {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
}


export interface Business {
  slug: string;
  name: string;
  /** Town slug, e.g. "delmar". Use "capital-district" for region-wide. */
  town: string;
  /** Display label for the town. */
  townLabel?: string;
  county?: string;
  category: BusinessCategory;
  subcategory?: string;
  tagline: string;
  about?: string;
  why?: string[];
  services?: string[];
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  hours?: string;
  lat?: number;
  lng?: number;
  /** Owner has claimed the listing — unlocks contact details, hours, socials. */
  claimed?: boolean;
  /** Legacy alias for `claimed`. Prefer `claimed` going forward. */
  verified?: boolean;
  /** Premium paid placement — top of category, town pages, badge. */
  featured?: boolean;
  /** Reserved for future tiers (e.g. spotlight, sponsored). */
  premium?: boolean;
  tags?: string[];
  logo?: string;
  image?: string;
  socials?: BusinessSocials;
  /** Optional cinematic hero video. */
  heroVideo?: string;
  /** Editorial "Known For" / "Why locals go here" bullets. */
  knownFor?: string[];
  /** Atmosphere / vibe one-liner. */
  atmosphere?: string;
  /** Premium full-bleed gallery images. */
  gallery?: string[];
  /** Recurring specials, events, promotions. */
  specials?: Array<{
    title: string;
    when?: string;
    tag?: string;
    cta?: { label: string; href: string };
  }>;
  /** Community signal pills, e.g. "Locally loved". */
  signals?: string[];
  /** Booking link (reservations, appointments). */
  bookingUrl?: string;
  /** Nearby connected entities. */
  nearby?: Array<{ label: string; kind?: "business" | "landmark" | "neighborhood" | "event"; href?: string }>;
}

const STOCK = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const businesses: Business[] = [
  // ───────── FEATURED PARTNERS (region-wide) ─────────
  {
    slug: "broadview-fcu",
    name: "Broadview Federal Credit Union",
    town: "capital-district",
    townLabel: "Capital District",
    county: "Albany",
    category: "Bank/Credit Union",
    subcategory: "Mortgage & Banking",
    tagline: "Local mortgage guidance for Capital Region buyers.",
    about:
      "A New York-based credit union offering first-time buyer programs, low down payment options, and personal mortgage guidance for families across the Capital District.",
    services: ["First-time buyer programs", "Mortgages", "HELOCs", "Personal banking"],
    phone: "(800) 727-3328",
    website: "https://www.broadviewfcu.com",
    address: "Capital District, NY",
    hours: "Mon–Fri · 9:00 AM – 5:00 PM",
    featured: true,
    verified: true,
    image: STOCK("photo-1556761175-5973dc0f32e7"),
  },
  {
    slug: "us-mortgage",
    name: "US Mortgage",
    town: "capital-district",
    townLabel: "Capital District",
    category: "Mortgage Lender",
    tagline: "Low down payment and investor financing across New York.",
    about:
      "A direct mortgage lender supporting first-time buyers, investors, and move-up families with conventional, FHA, VA, and DSCR loan programs.",
    services: ["Conventional", "FHA", "VA", "DSCR investor loans"],
    phone: "(800) 562-6715",
    website: "https://www.usmortgage.com",
    address: "Serving New York State",
    hours: "Mon–Fri · 9:00 AM – 6:00 PM",
    featured: true,
    verified: true,
    image: STOCK("photo-1582407947304-fd86f028f716"),
  },
  {
    slug: "deangelis-law",
    name: "DeAngelis Law Firm",
    town: "capital-district",
    townLabel: "Capital District",
    category: "Real Estate Attorney",
    tagline: "Calm, clear residential closings across the Capital District.",
    about:
      "Residential real estate attorneys handling purchases, sales, refinances, and investor closings throughout the Capital Region.",
    services: ["Purchase closings", "Sale closings", "Refinance", "Investor closings"],
    phone: "(518) 522-7265",
    website: "https://www.deangelislaw.com",
    address: "Capital District, NY",
    hours: "Mon–Fri · 9:00 AM – 5:00 PM",
    featured: true,
    verified: true,
    image: STOCK("photo-1450101499163-c8848c66ca85"),
  },

  // ───────── DELMAR ─────────
  {
    slug: "four-corners-luncheonette",
    name: "Four Corners Luncheonette",
    town: "delmar",
    townLabel: "Delmar",
    county: "Albany",
    category: "Restaurant",
    tagline: "Delmar's classic neighborhood diner.",
    about:
      "A long-standing Four Corners staple known for breakfast all day, friendly service, and being the unofficial morning meeting room of Delmar.",
    why: ["Locals' default Saturday breakfast", "Cash-only old-school charm"],
    address: "Delaware Ave, Delmar, NY",
    hours: "Mon–Sat 6a–2p",
  },
  {
    slug: "perfect-blend",
    name: "The Perfect Blend",
    town: "delmar",
    townLabel: "Delmar",
    county: "Albany",
    category: "Coffee",
    tagline: "Independent coffee + local meeting spot.",
    about: "Locally roasted coffee, light bites, and a slow-morning crowd.",
    address: "Delaware Ave, Delmar, NY",
    hours: "Daily 6:30a–5p",
  },
  {
    slug: "bountiful-bread",
    name: "Bountiful Bread",
    town: "delmar",
    townLabel: "Delmar",
    county: "Albany",
    category: "Bakery",
    tagline: "Bread, pastries, and the line to prove it.",
    address: "Delaware Ave, Delmar, NY",
    hours: "Wed–Sun 7a–3p",
  },
  {
    slug: "bethlehem-public-library",
    name: "Bethlehem Public Library",
    town: "delmar",
    townLabel: "Delmar",
    county: "Albany",
    category: "Bookstore",
    tagline: "Not a business — but the heart of Delmar.",
    address: "451 Delaware Ave, Delmar, NY",
    hours: "Mon–Thu 9a–9p · Fri–Sat 9a–5p",
  },
  {
    slug: "delmar-yoga",
    name: "Delmar Yoga",
    town: "delmar",
    townLabel: "Delmar",
    county: "Albany",
    category: "Wellness",
    tagline: "Drop-in studio with a strong morning crowd.",
    address: "Delaware Ave, Delmar, NY",
    hours: "Daily 6a–8p",
  },

  // ───────── ALBANY ─────────
  {
    slug: "lark-street-tavern",
    name: "Lark Street Tavern",
    town: "albany",
    townLabel: "Albany",
    county: "Albany",
    category: "Restaurant",
    tagline: "Center Square neighborhood pub with a loyal crowd.",
    address: "Lark St, Albany, NY",
    hours: "Daily 11a–11p",
  },
  {
    slug: "stacks-espresso",
    name: "Stacks Espresso Bar",
    town: "albany",
    townLabel: "Albany",
    county: "Albany",
    category: "Coffee",
    tagline: "Downtown espresso with a serious bean program.",
    address: "Broadway, Albany, NY",
    hours: "Mon–Fri 7a–4p",
  },
  {
    slug: "capital-district-roofing",
    name: "Capital District Roofing Co.",
    town: "albany",
    townLabel: "Albany",
    county: "Albany",
    category: "Roofer",
    tagline: "Residential roofing across Albany County.",
    services: ["Roof replacement", "Repairs", "Gutters"],
    phone: "(518) 555-0101",
    address: "Albany, NY",
  },
  {
    slug: "hudson-valley-inspections",
    name: "Hudson Valley Home Inspections",
    town: "albany",
    townLabel: "Albany",
    county: "Albany",
    category: "Home Inspector",
    tagline: "Pre-purchase inspections across the Capital Region.",
    phone: "(518) 555-0144",
  },

  // ───────── SARATOGA SPRINGS ─────────
  {
    slug: "mrs-londons-bakery",
    name: "Mrs. London's Bakery",
    town: "saratoga-springs",
    townLabel: "Saratoga Springs",
    county: "Saratoga",
    category: "Bakery",
    tagline: "Iconic Broadway pastry shop.",
    address: "Broadway, Saratoga Springs, NY",
    hours: "Wed–Sun 8a–5p",
  },
  {
    slug: "uncommon-grounds-saratoga",
    name: "Uncommon Grounds",
    town: "saratoga-springs",
    townLabel: "Saratoga Springs",
    county: "Saratoga",
    category: "Coffee",
    tagline: "Local coffee + bagels staple downtown.",
    address: "Broadway, Saratoga Springs, NY",
  },
  {
    slug: "saratoga-prime-realty-law",
    name: "Saratoga Prime Realty Law",
    town: "saratoga-springs",
    townLabel: "Saratoga Springs",
    county: "Saratoga",
    category: "Real Estate Attorney",
    tagline: "Closings and investor work in Saratoga County.",
    phone: "(518) 555-0190",
  },

  // ───────── TROY ─────────
  {
    slug: "the-shop-troy",
    name: "The Shop",
    town: "troy",
    townLabel: "Troy",
    county: "Rensselaer",
    category: "Restaurant",
    tagline: "River Street brunch favorite.",
    address: "River St, Troy, NY",
  },
  {
    slug: "collar-city-hvac",
    name: "Collar City HVAC",
    town: "troy",
    townLabel: "Troy",
    county: "Rensselaer",
    category: "HVAC",
    tagline: "Heating, cooling, and tune-ups across Rensselaer County.",
    phone: "(518) 555-0211",
    services: ["AC install", "Furnace repair", "Mini-splits"],
  },
  {
    slug: "river-street-coffee",
    name: "River Street Coffee",
    town: "troy",
    townLabel: "Troy",
    county: "Rensselaer",
    category: "Coffee",
    tagline: "Independent roaster on the Hudson.",
    address: "River St, Troy, NY",
  },

  // ───────── SCHENECTADY ─────────
  {
    slug: "stockade-electric",
    name: "Stockade Electric",
    town: "schenectady",
    townLabel: "Schenectady",
    county: "Schenectady",
    category: "Electrician",
    tagline: "Licensed residential electrical across Schenectady County.",
    phone: "(518) 555-0233",
  },
  {
    slug: "proctors-cafe",
    name: "Proctors Cafe",
    town: "schenectady",
    townLabel: "Schenectady",
    county: "Schenectady",
    category: "Coffee",
    tagline: "Pre-show coffee right next to Proctors Theatre.",
    address: "State St, Schenectady, NY",
  },

  // ───────── CLIFTON PARK ─────────
  {
    slug: "shen-plumbing",
    name: "Shen Plumbing & Heating",
    town: "clifton-park",
    townLabel: "Clifton Park",
    county: "Saratoga",
    category: "Plumber",
    tagline: "Family-run plumbing serving the Route 9 corridor.",
    phone: "(518) 555-0277",
    services: ["Repairs", "Water heaters", "Fixtures"],
  },
  {
    slug: "exit-9-fitness",
    name: "Exit 9 Fitness",
    town: "clifton-park",
    townLabel: "Clifton Park",
    county: "Saratoga",
    category: "Gym",
    tagline: "24/7 strength + cardio gym off Route 9.",
    address: "Route 9, Clifton Park, NY",
  },

  // ───────── NISKAYUNA ─────────
  {
    slug: "niskayuna-landscape",
    name: "Niskayuna Landscape Co.",
    town: "niskayuna",
    townLabel: "Niskayuna",
    county: "Schenectady",
    category: "Landscaper",
    tagline: "Design, install, and weekly maintenance.",
    phone: "(518) 555-0301",
  },

  // ───────── COLONIE ─────────
  {
    slug: "wolf-road-auto",
    name: "Wolf Road Auto",
    town: "colonie",
    townLabel: "Colonie",
    county: "Albany",
    category: "Auto",
    tagline: "Honest auto repair on Wolf Road.",
    address: "Wolf Rd, Colonie, NY",
  },
  {
    slug: "colonie-handyman",
    name: "Colonie Handyman Services",
    town: "colonie",
    townLabel: "Colonie",
    county: "Albany",
    category: "Handyman",
    tagline: "Punch-list jobs done in a single visit.",
    phone: "(518) 555-0344",
  },

  // ───────── GUILDERLAND ─────────
  {
    slug: "western-ave-cleaners",
    name: "Western Ave Cleaners",
    town: "guilderland",
    townLabel: "Guilderland",
    county: "Albany",
    category: "Cleaner",
    tagline: "Move-in / move-out + recurring residential cleans.",
    phone: "(518) 555-0388",
  },
  {
    slug: "guilderland-cpa",
    name: "Guilderland CPA Group",
    town: "guilderland",
    townLabel: "Guilderland",
    county: "Albany",
    category: "Accountant",
    tagline: "Tax + bookkeeping for households and small businesses.",
  },
];

// ───────── helpers ─────────

export function getBusinessesByTown(town: string): Business[] {
  return businesses.filter((b) => b.town === town.toLowerCase());
}

export function getBusinessBySlug(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}

export function getCategoryGroup(cat: BusinessCategory): CategoryGroup | null {
  for (const [group, cats] of Object.entries(CATEGORY_GROUPS) as [
    CategoryGroup,
    BusinessCategory[],
  ][]) {
    if (cats.includes(cat)) return group;
  }
  return null;
}

// Backward compat for any legacy imports.
export const delmarBusinesses = businesses.filter((b) => b.town === "delmar");
