/**
 * Per-town visual + copy overrides for the master TownPageTemplate.
 * Add new towns here — page will gracefully fall back to defaults.
 */

export interface TownCallout {
  title: string;
  body: string;
}

export interface TownMarketStats {
  medianPrice: string;
  medianNote?: string;
  activeListings: string;
  activeNote?: string;
  avgDom: string;
  domNote?: string;
}

export interface TownFeel {
  morning: string;
  families: string;
  weekends: string;
  commute: string;
}

export interface TownRibbonStat {
  label: string;
  value: string;
}

export interface TownScore {
  team: string;
  league: string;
  status: string;
  detail?: string;
}

export interface TownFinanceLink {
  title: string;
  body: string;
  href: string;
}

export interface TownPartnerSeed {
  id: string;
  name: string;
  category: string;
  tagline: string;
  about?: string;
  phone?: string;
  website?: string;
  address?: string;
  hours?: string;
  image?: string;
}

export interface TownLiveNowItem {
  label: string;
  text: string;
  tone?: "event" | "market" | "business" | "sports" | "civic";
}

export interface TownWeeklyChangeItem {
  icon?: "up" | "down" | "new" | "permit" | "school" | "park" | "spark";
  label: string;
  detail?: string;
}

export interface TownWeekendItem {
  day: string;
  time?: string;
  category: string;
  title: string;
  location?: string;
  image?: string;
  href?: string;
}

export interface TownOverride {
  heroImage: string;
  whyImage: string;
  callouts: [TownCallout, TownCallout, TownCallout];
  stats: TownMarketStats;
  whyHeadline?: string;
  whyCopy: string;
  whyBullets: string[];
  heroHeadline?: string;
  heroSub?: string;
  feel?: TownFeel;
  neighborhoods?: string[];
  accentGlow?: string;
  /** Glassmorphic micro-intelligence ribbon under the hero */
  ribbon?: TownRibbonStat[];
  /** Rotating "right now" pulses inside the hero */
  heroPulses?: string[];
  /** Bloomberg-style live ticker under the ribbon */
  liveNow?: TownLiveNowItem[];
  /** "What Changed This Week" intelligence feed */
  changedThisWeek?: TownWeeklyChangeItem[];
  /** "This Weekend in [Town]" — exactly 5 curated items */
  thisWeekend?: TownWeekendItem[];
  /** Minimal local sports scorecards */
  sports?: TownScore[];
  /** Buyer / investor utility links */
  financeLinks?: TownFinanceLink[];
  /** Hyper-local partner seeds for the Trusted Local Partners section */
  partners?: TownPartnerSeed[];
}

const DEFAULT_HERO =
  "https://images.unsplash.com/photo-1605146768851-eda79da39897?auto=format&fit=crop&w=2400&q=80";
const DEFAULT_WHY =
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1800&q=80";

export const townOverrides: Record<string, TownOverride> = {
  delmar: {
    heroImage:
      "https://images.unsplash.com/photo-1502175353174-a7a05e4bebb4?auto=format&fit=crop&w=2400&q=80",
    whyImage: DEFAULT_WHY,
    heroHeadline:
      "Tree-lined streets, top schools, and a slower pace — minutes from Albany.",
    heroSub:
      "Explore coffee shops, neighborhoods, local businesses, homes, and what makes Delmar one of the Capital Region's most sought-after communities.",
    callouts: [
      { title: "Bethlehem Central Schools", body: "Top-rated K–12 district." },
      { title: "10 Minutes to Albany", body: "Easy commute to downtown." },
      { title: "Strong Residential Demand", body: "Homes move fast year-round." },
    ],
    stats: {
      medianPrice: "$445K",
      medianNote: "Up 4.2% YoY",
      activeListings: "12",
      activeNote: "As of this week",
      avgDom: "8",
      domNote: "Strong demand",
    },
    whyCopy:
      "Delmar combines suburban comfort, strong schools, and easy access to Albany — a community where families stay for decades.",
    whyBullets: [
      "Tree-lined neighborhoods",
      "Bethlehem Central schools",
      "Local dining at Four Corners",
      "12-minute Albany commute",
    ],
    feel: {
      morning:
        "Coffee at Four Corners, a walk past quiet front porches, school buses on Delaware Avenue.",
      families:
        "Bethlehem Central schools, weekend soccer at Elm Avenue Park, story time at the library.",
      weekends:
        "Saturday farmers market, brunch on Delaware Ave, ice cream at the Snowman after dinner.",
      commute:
        "12 minutes to downtown Albany. Quick to I-87, the airport, and the Thruway.",
    },
    neighborhoods: [
      "Four Corners",
      "Elsmere",
      "Slingerlands",
      "Delaware Avenue",
      "Glenmont",
    ],
    accentGlow: "rgba(13,110,102,0.35)",
    ribbon: [
      { label: "Median Price", value: "$445K" },
      { label: "School Rank", value: "Top 5%" },
      { label: "Velocity", value: "High" },
      { label: "Albany Commute", value: "12 Mins" },
    ],
    sports: [
      { team: "Bethlehem Eagles", league: "Section II Baseball", status: "W 5–2", detail: "vs Shenendehowa" },
      { team: "Siena Saints", league: "MAAC Basketball", status: "Final", detail: "Sat night home win" },
      { team: "UAlbany Great Danes", league: "America East", status: "Sun 1pm", detail: "vs Vermont" },
      { team: "RPI Engineers", league: "ECAC Hockey", status: "L 3–4 OT", detail: "vs Union" },
      { team: "Union Dutchmen", league: "ECAC Hockey", status: "W 4–3 OT", detail: "vs RPI" },
      { team: "Skidmore Thoroughbreds", league: "Liberty League", status: "Sat 12pm", detail: "Lacrosse vs RPI" },
    ],
    financeLinks: [
      { title: "First-Time Buyer Help",     body: "Programs, grants, and step-by-step guidance.", href: "/first-time-buyers" },
      { title: "Bethlehem Tax Estimator",   body: "Estimate property taxes for any Delmar home.", href: "https://egov.basny.com/bethlehem/" },
      { title: "Affordability Calculator",  body: "See what you can comfortably afford.",          href: "/financing" },
      { title: "Local Grant Programs",       body: "Down payment and closing cost assistance.",     href: "/grants" },
      { title: "Investor Underwriting",     body: "Run cash flow, cap rate, and DSCR instantly.",  href: "/analyze" },
    ],
    partners: [
      {
        id: "perfect-blend",
        name: "The Perfect Blend Café",
        category: "Coffee & Café · Four Corners",
        tagline: "The morning ritual at Delmar's Four Corners.",
        about:
          "A neighborhood coffee shop at Four Corners — locally roasted espresso, fresh pastries, and the kind of place where every regular has a usual order.",
        address: "Four Corners, Delmar, NY",
        hours: "Mon–Sun · 6:30 AM – 6:00 PM",
        image:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "mccarrolls-butcher",
        name: "McCarroll's The Village Butcher",
        category: "Butcher & Provisions",
        tagline: "Capital Region's classic neighborhood butcher.",
        about:
          "A family-run butcher and provisions shop serving Delmar for generations — dry-aged steaks, house-made sausage, and weekly specials for the family table.",
        address: "Delaware Avenue, Delmar, NY",
        hours: "Tue–Sat · 9:00 AM – 6:00 PM",
        image:
          "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "swiftys",
        name: "Swifty's Restaurant & Pub",
        category: "Restaurant & Pub",
        tagline: "Delmar's go-to for dinner, drinks, and game night.",
        about:
          "A long-standing Delmar pub and restaurant — comfort menu, local beer, and the community living room for weekend dinners and Sunday games.",
        address: "Delaware Avenue, Delmar, NY",
        hours: "Daily · 11:30 AM – 11:00 PM",
        image:
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "roux",
        name: "Roux",
        category: "Modern Dining",
        tagline: "Refined neighborhood dining on Delaware Avenue.",
        about:
          "A modern American restaurant bringing a more elevated dining experience to Delmar — seasonal menus, a thoughtful wine list, and a warm room.",
        address: "Delaware Avenue, Delmar, NY",
        hours: "Wed–Sun · 5:00 PM – 10:00 PM",
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
      },
    ],
  },
  albany: {
    heroImage:
      "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?auto=format&fit=crop&w=2400&q=80",
    whyImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1800&q=80",
    callouts: [
      { title: "Capital Region Hub", body: "New York State's seat of government." },
      { title: "Walkable Neighborhoods", body: "Pine Hills, Center Square, Delaware Ave." },
      { title: "Investment Opportunities", body: "Strong cash-flow market for investors." },
    ],
    stats: {
      medianPrice: "$245K",
      medianNote: "Citywide median",
      activeListings: "186",
      activeNote: "Across all neighborhoods",
      avgDom: "21",
      domNote: "Steady absorption",
    },
    whyCopy:
      "Albany blends historic urban character with one of the strongest small-city investment markets in the Northeast.",
    whyBullets: [
      "Walkable historic neighborhoods",
      "Capital Region job hub",
      "Strong rental demand",
      "Multiple universities nearby",
    ],
  },
  "saratoga-springs": {
    heroImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2400&q=80",
    whyImage:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1800&q=80",
    callouts: [
      { title: "Downtown Broadway", body: "Walkable shops, restaurants, theater." },
      { title: "Saratoga Race Course", body: "Iconic summer racing season." },
      { title: "Luxury Market Activity", body: "Strongest premium segment in the region." },
    ],
    stats: {
      medianPrice: "$615K",
      medianNote: "Premium market",
      activeListings: "94",
      activeNote: "Citywide",
      avgDom: "14",
      domNote: "Competitive",
    },
    whyCopy:
      "Saratoga Springs offers the rare combination of a walkable downtown, year-round culture, and a luxury real estate market.",
    whyBullets: [
      "Walkable Broadway downtown",
      "Year-round arts and culture",
      "Top-tier dining scene",
      "Iconic summer race meet",
    ],
  },
  troy: {
    heroImage:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=2400&q=80",
    whyImage:
      "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=1800&q=80",
    callouts: [
      { title: "Historic Downtown", body: "19th-century architecture, restored." },
      { title: "Creative Community", body: "RPI, Sage, and a growing arts scene." },
      { title: "Revitalization Underway", body: "New development along the river." },
    ],
    stats: {
      medianPrice: "$235K",
      medianNote: "Citywide median",
      activeListings: "78",
      activeNote: "Across neighborhoods",
      avgDom: "18",
      domNote: "Healthy turnover",
    },
    whyCopy:
      "Troy pairs historic 19th-century architecture with one of the most exciting urban revitalization stories in the Northeast.",
    whyBullets: [
      "Restored historic architecture",
      "RPI and Russell Sage anchors",
      "Riverfront redevelopment",
      "Vibrant arts and food scene",
    ],
  },
  schenectady: {
    heroImage:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2400&q=80",
    whyImage:
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1800&q=80",
    callouts: [
      { title: "Stockade Historic District", body: "One of the oldest in the U.S." },
      { title: "GE & Tech Heritage", body: "Long-standing engineering job base." },
      { title: "Affordable Entry Point", body: "Strong value for first-time buyers." },
    ],
    stats: {
      medianPrice: "$215K",
      medianNote: "Citywide median",
      activeListings: "112",
      activeNote: "Across neighborhoods",
      avgDom: "22",
      domNote: "Steady",
    },
    whyCopy:
      "Schenectady offers historic neighborhoods, a major engineering employer base, and one of the strongest affordability stories in the Capital Region.",
    whyBullets: [
      "Historic Stockade district",
      "Engineering and tech employers",
      "Affordable home prices",
      "Proximity to Albany and Saratoga",
    ],
  },
  "clifton-park": {
    heroImage:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=2400&q=80",
    whyImage:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1800&q=80",
    callouts: [
      { title: "Family-Friendly Suburbs", body: "Quiet streets, modern subdivisions." },
      { title: "New Development", body: "One of the fastest-growing areas." },
      { title: "Strong School Districts", body: "Shenendehowa schools draw families." },
    ],
    stats: {
      medianPrice: "$435K",
      medianNote: "Up YoY",
      activeListings: "68",
      activeNote: "Across the town",
      avgDom: "12",
      domNote: "Competitive",
    },
    whyCopy:
      "Clifton Park is one of the Capital Region's most desirable family suburbs — modern homes, top schools, and easy access to Albany and Saratoga.",
    whyBullets: [
      "Shenendehowa school district",
      "Modern suburban neighborhoods",
      "Easy I-87 access",
      "Halfway between Albany and Saratoga",
    ],
  },
  niskayuna: {
    heroImage:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=2400&q=80",
    whyImage:
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1800&q=80",
    callouts: [
      { title: "Top-Ranked Schools", body: "Niskayuna CSD draws families." },
      { title: "Quiet Neighborhoods", body: "Mature trees, established streets." },
      { title: "GE Research Anchor", body: "Long-standing engineering base." },
    ],
    stats: {
      medianPrice: "$365K",
      medianNote: "Townwide median",
      activeListings: "32",
      activeNote: "Across the town",
      avgDom: "11",
      domNote: "Strong demand",
    },
    whyCopy:
      "Niskayuna is a quiet, established suburb with one of the highest-ranked school districts in the region.",
    whyBullets: [
      "Niskayuna Central Schools",
      "Established neighborhoods",
      "Mohawk River access",
      "Quick commute to Schenectady & Albany",
    ],
  },
  colonie: {
    heroImage:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2400&q=80",
    whyImage:
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=1800&q=80",
    callouts: [
      { title: "Central Location", body: "Minutes from Albany and the airport." },
      { title: "Wide Inventory", body: "From starter homes to executive." },
      { title: "Stable Suburb", body: "Long-standing residential demand." },
    ],
    stats: {
      medianPrice: "$315K",
      medianNote: "Townwide median",
      activeListings: "104",
      activeNote: "Across the town",
      avgDom: "14",
      domNote: "Healthy",
    },
    whyCopy:
      "Colonie is one of the Capital Region's most central and convenient suburbs — well-connected, well-priced, and consistently in demand.",
    whyBullets: [
      "Central Capital Region location",
      "Wide range of price points",
      "Albany Airport access",
      "South Colonie & North Colonie schools",
    ],
  },
  guilderland: {
    heroImage:
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=2400&q=80",
    whyImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80",
    callouts: [
      { title: "Guilderland Schools", body: "Strong, well-regarded district." },
      { title: "Western Albany Suburb", body: "Quick access to downtown." },
      { title: "Family Neighborhoods", body: "Quiet, established communities." },
    ],
    stats: {
      medianPrice: "$355K",
      medianNote: "Townwide median",
      activeListings: "58",
      activeNote: "Across the town",
      avgDom: "13",
      domNote: "Steady",
    },
    whyCopy:
      "Guilderland delivers quiet family neighborhoods, a strong school district, and quick access to both Albany and the western suburbs.",
    whyBullets: [
      "Guilderland Central Schools",
      "Established residential streets",
      "Quick I-90 access",
      "Crossgates and retail nearby",
    ],
  },
};

const FALLBACK: TownOverride = {
  heroImage: DEFAULT_HERO,
  whyImage: DEFAULT_WHY,
  callouts: [
    { title: "Strong Local Schools", body: "Well-regarded district." },
    { title: "Capital Region Access", body: "Convenient regional commute." },
    { title: "Active Local Market", body: "Consistent buyer demand." },
  ],
  stats: {
    medianPrice: "—",
    medianNote: "Updated weekly",
    activeListings: "—",
    activeNote: "Live MLS feed",
    avgDom: "—",
    domNote: "Updated weekly",
  },
  whyCopy:
    "A welcoming Capital Region community with established neighborhoods, local businesses, and convenient access across the region.",
  whyBullets: [
    "Established neighborhoods",
    "Capital Region access",
    "Local restaurants and services",
    "Active community life",
  ],
};

export const getTownOverride = (slug: string): TownOverride =>
  townOverrides[slug] ?? FALLBACK;
