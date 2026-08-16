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
  category?: string;
}

export interface TownDiscoverCard {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  image: string;
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
  /** "Discover [Town]" modular bento cards */
  discoverCards?: TownDiscoverCard[];
}

// Editorial Upstate New York scenic fallbacks — rolling hills, Hudson Valley,
// historic small-town residential. NEVER corporate skyscrapers or out-of-state
// stock with foreign signage (e.g. Annapolis, Toronto, NYC).
const DEFAULT_HERO =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=80";
const DEFAULT_WHY =
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1800&q=80";

export const townOverrides: Record<string, TownOverride> = {
  delmar: {
    heroImage: "/assets/towns/delmar-hero.jpg",
    whyImage: "/assets/towns/delmar-why.jpg",
    heroHeadline: "Discover Delmar.",
    heroSub:
      "Explore the places, businesses, neighborhoods, events, and local rhythm that make Delmar one of the Capital Region's most desirable communities.",
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
      "Bethlehem Central Schools",
      "Walkable Four Corners",
      "Fast Albany commute",
      "Local cafés & businesses",
      "Parks and youth programs",
      "Strong long-term demand",
      "Community-centered lifestyle",
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
    heroPulses: [
      "Farmers Market opens Saturday 9 AM at Four Corners",
      "Bethlehem Eagles win 5–2 vs Shenendehowa",
      "Median price up 2.4% month over month",
      "Tulip Festival weekend — Albany traffic elevated",
      "3 new Delmar listings hit the market today",
      "Live music tonight at The War Room Tavern",
    ],
    liveNow: [
      { label: "Event",    tone: "event",    text: "Farmers Market opens Saturday 9 AM at Four Corners" },
      { label: "Business", tone: "business", text: "New café opening near Four Corners next month" },
      { label: "Sports",   tone: "sports",   text: "Bethlehem baseball sectional game tonight" },
      { label: "Market",   tone: "market",   text: "Delmar inventory remains tight — 12 active listings" },
      { label: "Nightlife",tone: "event",    text: "Live music tonight at The War Room Tavern" },
      { label: "Civic",    tone: "civic",    text: "Tulip Festival traffic elevated through downtown Albany" },
      { label: "Schools",  tone: "civic",    text: "Bethlehem CSD spring concert series begins this week" },
      { label: "Market",   tone: "market",   text: "3 Delmar homes went pending in the last 48 hours" },
    ],
    changedThisWeek: [
      { icon: "up",     label: "3 Delmar homes sold over asking",            detail: "Average 4.1% above list price" },
      { icon: "permit", label: "New café permit filed near Four Corners",    detail: "Espresso bar + bakery concept" },
      { icon: "school", label: "Bethlehem CSD ranking updated",              detail: "Now Top 5% in New York State" },
      { icon: "park",   label: "Town board approves trail expansion",        detail: "New connector through Elm Avenue Park" },
      { icon: "down",   label: "Rental inventory tightened again",           detail: "Down 2 units week over week" },
      { icon: "new",    label: "New mixed-use proposal on Delaware Avenue",  detail: "Retail below, residential above" },
    ],
    thisWeekend: [
      {
        day: "Sat", time: "9 AM",
        category: "Farmers Market",
        title: "Delmar Farmers Market — opening weekend",
        location: "Bethlehem Central Middle School",
        image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80",
        href: "#",
      },
      {
        day: "Fri", time: "8 PM",
        category: "Live Music",
        title: "Live acoustic set at The War Room Tavern",
        location: "Delaware Avenue, Delmar",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
        href: "#",
      },
      {
        day: "Sat", time: "1 PM",
        category: "College Baseball",
        title: "Siena baseball home opener",
        location: "Siena College, Loudonville",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
        href: "#",
      },
      {
        day: "Sun", time: "10 AM",
        category: "Brunch",
        title: "Roux launches a new spring brunch menu",
        location: "Delaware Avenue, Delmar",
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80",
        href: "#",
      },
      {
        day: "Sun", time: "All Day",
        category: "Festival",
        title: "Tulip Festival in Washington Park",
        location: "Albany — 10 minutes from Delmar",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80",
        href: "#",
      },
    ],
    sports: [
      { team: "Bethlehem YMCA", league: "YMCA", status: "Open", detail: "Youth programs, fitness, swimming, basketball, and family activities." },
      { team: "Bethlehem Youth Basketball", league: "Youth Programs", status: "Registration", detail: "Community leagues and youth development." },
      { team: "Local Fitness & Training", league: "Gyms & Wellness", status: "Open", detail: "Gyms, wellness, and training facilities around Delmar." },
      { team: "Bethlehem Eagles Athletics", league: "School Athletics", status: "In Season", detail: "Schedules, programs, and school spirit." },
      { team: "Town Parks & Recreation", league: "Parks & Rec", status: "Daily", detail: "Fields, trails, playgrounds, and outdoor activities." },
    ],
    financeLinks: [
      { category: "Buying a Home", title: "First-Time Buyer Programs", body: "Programs, grants, and step-by-step help.", href: "/first-time-buyers" },
      { category: "Buying a Home", title: "Affordability Calculator", body: "Understand what fits your monthly budget.", href: "/financing" },
      { category: "Buying a Home", title: "Mortgage Payment Estimator", body: "Estimate principal, interest, taxes, and insurance.", href: "/financing" },
      { category: "Buying a Home", title: "Local Grant Programs", body: "Down payment help, rebates, and community resources.", href: "/grants" },

      { category: "Property & Taxes", title: "Bethlehem Property Taxes", body: "Estimate taxes and understand assessments.", href: "https://egov.basny.com/bethlehem/" },
      { category: "Property & Taxes", title: "School Tax Information", body: "Bethlehem Central school tax overview.", href: "#schools" },
      { category: "Property & Taxes", title: "Estimated Utility Costs", body: "Typical monthly utility ranges for Delmar homes.", href: "/financing" },
      { category: "Property & Taxes", title: "Insurance Guidance", body: "Homeowners insurance basics and local considerations.", href: "/financing" },

      { category: "Investing", title: "Cash Flow Analyzer", body: "Run cash flow, cap rate, and long-term projections.", href: "/finances" },
      { category: "Investing", title: "Investor Underwriting", body: "Underwrite a Delmar deal with investor-grade math.", href: "/finances" },
      { category: "Investing", title: "Rental Property Analysis", body: "Model rent, expenses, and returns for Delmar rentals.", href: "/finances" },
      { category: "Investing", title: "Market Demand Trends", body: "Track pricing, velocity, and absorption trends.", href: "/delmar-market-insights" },
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
    discoverCards: [
      {
        eyebrow: "Daily Life",
        title: "Morning in Delmar",
        body: "Coffee shops, sidewalks, and local routines that define daily life.",
        cta: "Explore Cafés",
        href: "#businesses",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80",
      },
      {
        eyebrow: "Neighborhoods",
        title: "Neighborhoods",
        body: "From Four Corners to Slingerlands — every pocket has its own feel.",
        cta: "Explore Neighborhoods",
        href: "#homes",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
      },
      {
        eyebrow: "Community",
        title: "Community",
        body: "Events, parks, local traditions, and community life.",
        cta: "See What's Happening",
        href: "#weekend",
        image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80",
      },
      {
        eyebrow: "Schools",
        title: "Schools & Education",
        body: "Why Bethlehem schools continue attracting long-term buyers.",
        cta: "Explore Schools",
        href: "#schools",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
      },
      {
        eyebrow: "Dining",
        title: "Dining & Local Favorites",
        body: "The local businesses residents return to every week.",
        cta: "Explore Local Businesses",
        href: "#businesses",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
      },
      {
        eyebrow: "Real Estate",
        title: "Real Estate Snapshot",
        body: "Inventory, pricing, demand, and market movement.",
        cta: "View Market",
        href: "#homes",
        image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1600&q=80",
      },
    ],
  },
  albany: {
    heroImage: "/assets/towns/albany-hero.jpg",
    whyImage: "/assets/towns/albany-why.jpg",
    heroHeadline: "Discover Albany.",
    heroSub:
      "The capital city — Washington Park, Lark Street, Empire State Plaza, and the urban rhythm of New York's seat of government.",
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
      "Empire State Plaza & cultural anchors",
      "Direct Amtrak to NYC",
    ],
    accentGlow: "rgba(13,110,102,0.35)",
    ribbon: [
      { label: "Median Price", value: "$245K" },
      { label: "School Rank", value: "Top 30%" },
      { label: "Velocity", value: "Steady" },
      { label: "Albany Commute", value: "0 Mins" },
    ],
    heroPulses: [
      "Tulip Festival weekend in Washington Park",
      "Alive at Five concerts return to Jennings Landing",
      "New restaurant opens on Lark Street",
      "Empire State Plaza summer events begin",
      "9 Albany homes closed this week",
    ],
    liveNow: [
      { label: "Event",    tone: "event",    text: "Tulip Festival this weekend in Washington Park" },
      { label: "Business", tone: "business", text: "New café opens on Lark Street next month" },
      { label: "Sports",   tone: "sports",   text: "UAlbany Great Danes home game Saturday" },
      { label: "Market",   tone: "market",   text: "Pine Hills inventory tightening — 4 pending this week" },
      { label: "Civic",    tone: "civic",    text: "Capitol legislative session in final stretch" },
      { label: "Nightlife",tone: "event",    text: "Live music tonight at Savoy Taproom" },
    ],
    changedThisWeek: [
      { icon: "up",     label: "Pine Hills homes sold over asking", detail: "Average 3.1% above list" },
      { icon: "permit", label: "Mixed-use permit on Lark Street",   detail: "Retail + 12 residential units" },
      { icon: "new",    label: "New restaurant lease in Center Square", detail: "Wine bar concept opening fall" },
      { icon: "park",   label: "Washington Park spring plantings complete", detail: "Tulip Festival ready" },
      { icon: "school", label: "Albany Med expansion approved",     detail: "Adds 200 jobs to Capital Region" },
    ],
    thisWeekend: [
      { day: "Sat", time: "All Day", category: "Festival", title: "Tulip Festival in Washington Park", location: "Washington Park, Albany", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80" },
      { day: "Fri", time: "7 PM", category: "Dining", title: "Tasting menu at 677 Prime", location: "677 Broadway, Albany", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sat", time: "10 AM", category: "Market", title: "Delaware Avenue street fair", location: "Delaware Ave, Albany", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sun", time: "11 AM", category: "Brunch", title: "Sunday brunch at Iron Gate Café", location: "Lark Street, Albany", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sat", time: "8 PM", category: "Theater", title: "Live show at The Egg", location: "Empire State Plaza", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80" },
    ],
    sports: [
      { team: "UAlbany Great Danes", league: "NCAA D-I", status: "In Season", detail: "Football, basketball, and lacrosse at UAlbany." },
      { team: "Albany Empire", league: "Arena Football", status: "Open", detail: "MVP Arena home games." },
      { team: "Siena Saints", league: "NCAA D-I", status: "In Season", detail: "Loudonville hoops a short drive north." },
      { team: "Washington Park Rec", league: "Community", status: "Daily", detail: "Tennis, pickleball, and city league play." },
      { team: "Albany YMCA", league: "YMCA", status: "Open", detail: "Youth programs, fitness, and family activities." },
    ],
    financeLinks: [
      { category: "Buying a Home", title: "First-Time Buyer Programs", body: "Programs, grants, and step-by-step help.", href: "/first-time-buyers" },
      { category: "Buying a Home", title: "Affordability Calculator", body: "Understand what fits your monthly budget.", href: "/financing" },
      { category: "Buying a Home", title: "Mortgage Payment Estimator", body: "Estimate principal, interest, taxes, and insurance.", href: "/financing" },
      { category: "Buying a Home", title: "Albany Down Payment Help", body: "City and state assistance programs.", href: "/grants" },

      { category: "Property & Taxes", title: "Albany Property Taxes", body: "City tax rates and assessment lookup.", href: "https://www.albanyny.gov/358/Treasurer" },
      { category: "Property & Taxes", title: "City School Tax Info", body: "Albany City School District tax overview.", href: "#schools" },
      { category: "Property & Taxes", title: "Utility Cost Estimates", body: "Typical monthly utility ranges in Albany.", href: "/financing" },
      { category: "Property & Taxes", title: "Insurance Guidance", body: "Homeowners insurance basics for city homes.", href: "/financing" },

      { category: "Investing", title: "Cash Flow Analyzer", body: "Run cash flow on Albany rentals.", href: "/finances" },
      { category: "Investing", title: "Multi-Family Underwriting", body: "Underwrite 2–4 units citywide.", href: "/albany-multi-unit" },
      { category: "Investing", title: "Pine Hills Investment Map", body: "Highest-yield Albany pockets.", href: "/best-neighborhoods-cash-flow" },
      { category: "Investing", title: "Market Demand Trends", body: "Track pricing and absorption.", href: "/albany-intelligence" },
    ],
    partners: [
      { id: "677-prime", name: "677 Prime", category: "Steakhouse · Downtown", tagline: "Albany's premier steakhouse on Broadway.", about: "Capital Region's flagship steakhouse — dry-aged steaks, raw bar, and the city's power-dinner room.", address: "677 Broadway, Albany, NY", hours: "Mon–Sat · 5:00 PM – 10:00 PM", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80" },
      { id: "iron-gate", name: "Iron Gate Café", category: "Café · Lark Street", tagline: "Lark Street's brunch institution.", about: "Albany's beloved brunch spot — eggs benedict, mimosas, and Sunday lines down the block.", address: "182 Washington Ave, Albany, NY", hours: "Wed–Sun · 8:00 AM – 3:00 PM", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=80" },
      { id: "savoy-taproom", name: "Savoy Taproom", category: "Bar & Kitchen", tagline: "Lark Street craft beer and small plates.", about: "A modern taproom serving Capital Region craft beer with a chef-driven kitchen.", address: "301 Lark St, Albany, NY", hours: "Daily · 4:00 PM – 12:00 AM", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80" },
      { id: "grappa-72", name: "Grappa '72", category: "Italian", tagline: "Classic Italian on Albany Shaker Road.", about: "Family-run Italian — house-made pasta, veal Milanese, and a regional wine list.", address: "818 Central Ave, Albany, NY", hours: "Tue–Sun · 5:00 PM – 10:00 PM", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1600&q=80" },
    ],
    discoverCards: [
      { eyebrow: "Daily Life", title: "Morning in Albany", body: "Coffee on Lark, walks through Washington Park, and the rhythm of the capital.", cta: "Explore Cafés", href: "#businesses", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Neighborhoods", title: "Neighborhoods", body: "From Pine Hills to Center Square — every pocket has its own character.", cta: "Explore Neighborhoods", href: "#homes", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Community", title: "Community", body: "Tulip Festival, Alive at Five, and the events that make Albany.", cta: "See What's Happening", href: "#weekend", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Schools", title: "Schools & Education", body: "Public, charter, and private options across the city.", cta: "Explore Schools", href: "#schools", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Dining", title: "Dining & Local Favorites", body: "677 Prime, Iron Gate, Savoy Taproom, Grappa '72 — Albany's table.", cta: "Explore Local Businesses", href: "#businesses", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Real Estate", title: "Real Estate Snapshot", body: "Inventory, pricing, demand, and citywide market movement.", cta: "View Market", href: "#homes", image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1600&q=80" },
    ],
  },
  "saratoga-springs": {
    heroImage: "/assets/towns/saratoga-hero.jpg",
    whyImage: "/assets/towns/saratoga-why.jpg",
    heroHeadline: "Discover Saratoga Springs.",
    heroSub:
      "Broadway dining, the Race Course, SPAC, mineral springs, and Skidmore — the Capital Region's year-round resort city.",
    callouts: [
      { title: "Downtown Broadway", body: "Walkable shops, restaurants, theater." },
      { title: "Saratoga Race Course", body: "Iconic summer racing season." },
      { title: "Luxury Market Activity", body: "Strongest premium segment in the region." },
    ],
    stats: {
      medianPrice: "$625K",
      medianNote: "Premium market",
      activeListings: "94",
      activeNote: "Citywide",
      avgDom: "10",
      domNote: "Extreme demand",
    },
    whyCopy:
      "Saratoga Springs offers the rare combination of a walkable downtown, year-round culture, and a luxury real estate market.",
    whyBullets: [
      "Walkable Broadway downtown",
      "Year-round arts & culture",
      "Top-tier dining scene",
      "Iconic summer race meet",
      "Skidmore College & SPAC",
      "Strongest school district in the region",
    ],
    accentGlow: "rgba(13,110,102,0.35)",
    ribbon: [
      { label: "Median Price", value: "$625K" },
      { label: "School Rank", value: "Top 3%" },
      { label: "Velocity", value: "Extreme" },
      { label: "Albany Commute", value: "35 Mins" },
    ],
    heroPulses: [
      "Track meet approaches — July 11 opening day",
      "SPAC announces summer headliners",
      "New tasting menu launches at Seneca",
      "Broadway pop-up patios return for spring",
      "4 homes pending above asking this week",
    ],
    liveNow: [
      { label: "Event",    tone: "event",    text: "Saratoga Race Course meet opens July 11" },
      { label: "Business", tone: "business", text: "New Broadway boutique opens this weekend" },
      { label: "Sports",   tone: "sports",   text: "Skidmore lacrosse home game Saturday" },
      { label: "Market",   tone: "market",   text: "East Side Victorian sells $80K over asking" },
      { label: "Civic",    tone: "civic",    text: "City Council approves new downtown design district" },
      { label: "Nightlife",tone: "event",    text: "Live jazz tonight at 9 Maple Avenue" },
    ],
    changedThisWeek: [
      { icon: "up",     label: "5 East Side homes sold over asking", detail: "Average 6.3% above list" },
      { icon: "permit", label: "New restaurant permit on Broadway", detail: "Modern American concept" },
      { icon: "school", label: "Saratoga CSD again ranked Top 3% NY", detail: "Statewide testing release" },
      { icon: "new",    label: "SPAC unveils 2026 summer lineup",   detail: "Orchestra, ballet, and major concerts" },
      { icon: "park",   label: "Congress Park spring restoration done", detail: "Reopening with new lighting" },
    ],
    thisWeekend: [
      { day: "Sat", time: "9 AM", category: "Market", title: "Saratoga Farmers Market", location: "High Rock Park", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80" },
      { day: "Fri", time: "7 PM", category: "Dining", title: "Tasting menu at Osteria Danny", location: "26 Henry St, Saratoga", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sat", time: "8 PM", category: "Live Music", title: "Caffè Lena concert", location: "Phila Street, Saratoga", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sun", time: "10 AM", category: "Bakery", title: "Pastry hour at Mrs. London's", location: "464 Broadway, Saratoga", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sun", time: "All Day", category: "Park", title: "Congress Park reopening walk", location: "Downtown Saratoga", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80" },
    ],
    sports: [
      { team: "Skidmore Thoroughbreds", league: "NCAA D-III", status: "In Season", detail: "Lacrosse, hockey, and rowing on campus." },
      { team: "Saratoga Race Course", league: "Thoroughbred Racing", status: "July 11 Opener", detail: "America's oldest sporting venue." },
      { team: "Saratoga Springs HS", league: "Section II", status: "In Season", detail: "Lacrosse, hockey, and rowing powerhouse." },
      { team: "Saratoga Rowing", league: "Junior Rowing", status: "Open", detail: "One of the top youth programs in the Northeast." },
      { team: "Saratoga YMCA", league: "YMCA", status: "Open", detail: "Family programs, fitness, and youth sports." },
    ],
    financeLinks: [
      { category: "Buying a Home", title: "Luxury Buyer Guide", body: "Premium market playbook for Saratoga.", href: "/first-time-buyers" },
      { category: "Buying a Home", title: "Affordability Calculator", body: "Understand what fits your monthly budget.", href: "/financing" },
      { category: "Buying a Home", title: "Jumbo Mortgage Estimator", body: "High-balance loan estimates for Saratoga prices.", href: "/financing" },
      { category: "Buying a Home", title: "Relocation Guide", body: "Out-of-market buyer roadmap.", href: "/nyc-to-albany-playbook" },

      { category: "Property & Taxes", title: "Saratoga Property Taxes", body: "City tax rates and assessment lookup.", href: "https://www.saratoga-springs.org" },
      { category: "Property & Taxes", title: "School Tax Information", body: "Saratoga Springs CSD tax overview.", href: "#schools" },
      { category: "Property & Taxes", title: "Utility Cost Estimates", body: "Typical monthly utility ranges.", href: "/financing" },
      { category: "Property & Taxes", title: "Insurance Guidance", body: "Homeowners insurance for premium homes.", href: "/financing" },

      { category: "Investing", title: "Short-Term Rental Analyzer", body: "Run STR math for the track season.", href: "/finances" },
      { category: "Investing", title: "Multi-Family Underwriting", body: "Underwrite a Saratoga 2–4 unit.", href: "/saratoga-multi-unit-market" },
      { category: "Investing", title: "Track-Season Yield Model", body: "Six-week rental income math.", href: "/finances" },
      { category: "Investing", title: "Market Demand Trends", body: "Track pricing and absorption citywide.", href: "/saratoga-intelligence" },
    ],
    partners: [
      { id: "seneca", name: "Seneca", category: "Modern American · Broadway", tagline: "Saratoga's tasting-menu destination.", about: "A chef-driven counter and dining room — seasonal tasting menus and a thoughtful natural wine list.", address: "16 Caroline St, Saratoga Springs, NY", hours: "Wed–Sun · 5:00 PM – 10:00 PM", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80" },
      { id: "osteria-danny", name: "Osteria Danny", category: "Italian", tagline: "Modern Italian on Henry Street.", about: "Handmade pasta, wood-fired plates, and a regional Italian wine list in a warm room.", address: "26 Henry St, Saratoga Springs, NY", hours: "Tue–Sun · 5:00 PM – 10:00 PM", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1600&q=80" },
      { id: "hatties", name: "Hattie's", category: "Southern · Comfort", tagline: "Saratoga's iconic fried chicken since 1938.", about: "An institution — Hattie's fried chicken, biscuits, and Southern hospitality on Phila Street.", address: "45 Phila St, Saratoga Springs, NY", hours: "Daily · 11:30 AM – 10:00 PM", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80" },
      { id: "mrs-londons", name: "Mrs. London's Bakery", category: "Bakery & Café", tagline: "Broadway's iconic French bakery.", about: "Hand-laminated croissants, French pastry, and the morning ritual of downtown Saratoga.", address: "464 Broadway, Saratoga Springs, NY", hours: "Tue–Sun · 7:00 AM – 5:00 PM", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=80" },
    ],
    discoverCards: [
      { eyebrow: "Daily Life", title: "Morning in Saratoga", body: "Coffee at Mrs. London's, walks through Congress Park, downtown that wakes up early.", cta: "Explore Cafés", href: "#businesses", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Neighborhoods", title: "Neighborhoods", body: "East Side Victorians, West Side bungalows, and the downtown core.", cta: "Explore Neighborhoods", href: "#homes", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Community", title: "Community", body: "SPAC, the Race Course, Skidmore, and the events that define the year.", cta: "See What's Happening", href: "#weekend", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Schools", title: "Schools & Education", body: "Saratoga Springs CSD — consistently top 3% in New York State.", cta: "Explore Schools", href: "#schools", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Dining", title: "Dining & Local Favorites", body: "Seneca, Osteria Danny, Hattie's, Mrs. London's — Broadway's table.", cta: "Explore Local Businesses", href: "#businesses", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Real Estate", title: "Real Estate Snapshot", body: "Premium inventory, jumbo financing, and the strongest demand in the region.", cta: "View Market", href: "#homes", image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1600&q=80" },
    ],
  },
  troy: {
    heroImage: "/assets/towns/troy-hero.jpg",
    whyImage: "/assets/towns/troy-why.jpg",
    heroHeadline: "Discover Troy.",
    heroSub:
      "Restored brownstones, the Waterfront Farmers Market, RPI, and one of the most exciting urban revivals in the Northeast.",
    callouts: [
      { title: "Historic Downtown", body: "19th-century architecture, restored." },
      { title: "Creative Community", body: "RPI, Sage, and a growing arts scene." },
      { title: "Revitalization Underway", body: "New development along the river." },
    ],
    stats: {
      medianPrice: "$265K",
      medianNote: "Citywide median",
      activeListings: "78",
      activeNote: "Across neighborhoods",
      avgDom: "12",
      domNote: "High demand",
    },
    whyCopy:
      "Troy pairs historic 19th-century architecture with one of the most exciting urban revitalization stories in the Northeast.",
    whyBullets: [
      "Restored historic brownstones",
      "RPI and Russell Sage anchors",
      "Riverfront redevelopment",
      "Vibrant arts and food scene",
      "Saturday farmers market culture",
      "10 minutes to downtown Albany",
    ],
    accentGlow: "rgba(13,110,102,0.35)",
    ribbon: [
      { label: "Median Price", value: "$265K" },
      { label: "School Rank", value: "Top 25%" },
      { label: "Velocity", value: "High" },
      { label: "Albany Commute", value: "10 Mins" },
    ],
    heroPulses: [
      "Troy Waterfront Farmers Market Saturday 9 AM",
      "Troy Night Out last Friday of the month",
      "New restaurant opens in the Pottery District",
      "RPI commencement weekend approaches",
      "Two brownstones go pending in 48 hours",
    ],
    liveNow: [
      { label: "Event",    tone: "event",    text: "Troy Waterfront Farmers Market Saturday at Monument Square" },
      { label: "Business", tone: "business", text: "New wine bar opens on Broadway this month" },
      { label: "Sports",   tone: "sports",   text: "RPI Engineers hockey playoff game tonight" },
      { label: "Market",   tone: "market",   text: "South Troy two-family sells $25K over asking" },
      { label: "Civic",    tone: "civic",    text: "Troy approves waterfront mixed-use proposal" },
      { label: "Nightlife",tone: "event",    text: "Live music tonight at Bradley's Tavern" },
    ],
    changedThisWeek: [
      { icon: "up",     label: "4 Troy brownstones sold over asking", detail: "Average 4.8% above list" },
      { icon: "permit", label: "Pottery District loft conversion approved", detail: "18 new residential units" },
      { icon: "new",    label: "New restaurant lease in Monument Square", detail: "Oyster bar concept" },
      { icon: "park",   label: "Riverfront Park spring cleanup complete", detail: "Concert series begins June" },
      { icon: "school", label: "RPI announces $500M campus expansion", detail: "New engineering quad" },
    ],
    thisWeekend: [
      { day: "Sat", time: "9 AM", category: "Market", title: "Troy Waterfront Farmers Market", location: "Monument Square", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80" },
      { day: "Fri", time: "7 PM", category: "Dining", title: "Wood-fired tasting at Bacchus", location: "Congress St, Troy", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sat", time: "11 AM", category: "Brunch", title: "Brunch at Little Pecks", location: "Broadway, Troy", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80" },
      { day: "Fri", time: "9 PM", category: "Bar", title: "Oysters & natural wine at Plumb", location: "River Street, Troy", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sun", time: "All Day", category: "Walk", title: "Historic brownstone walking tour", location: "Washington Park, Troy", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80" },
    ],
    sports: [
      { team: "RPI Engineers", league: "NCAA D-I Hockey", status: "In Season", detail: "Houston Field House hockey nights." },
      { team: "Russell Sage Gators", league: "NCAA D-III", status: "In Season", detail: "Downtown Troy collegiate athletics." },
      { team: "Troy High Flying Horses", league: "Section II", status: "In Season", detail: "City school athletics across all seasons." },
      { team: "Troy YMCA", league: "YMCA", status: "Open", detail: "Pool, fitness, and youth programs." },
      { team: "Riverfront Rec", league: "Parks & Rec", status: "Daily", detail: "Trails, fields, and community pickup games." },
    ],
    financeLinks: [
      { category: "Buying a Home", title: "First-Time Buyer Programs", body: "Programs, grants, and step-by-step help.", href: "/first-time-buyers" },
      { category: "Buying a Home", title: "Affordability Calculator", body: "Understand what fits your monthly budget.", href: "/financing" },
      { category: "Buying a Home", title: "Renovation Loan Guide", body: "203(k) and HomeStyle for Troy brownstones.", href: "/financing" },
      { category: "Buying a Home", title: "Local Grant Programs", body: "City and county down payment assistance.", href: "/grants" },

      { category: "Property & Taxes", title: "Troy Property Taxes", body: "City tax rates and lookup.", href: "https://www.troyny.gov/284/Tax-Bill" },
      { category: "Property & Taxes", title: "School Tax Information", body: "Troy CSD tax overview.", href: "#schools" },
      { category: "Property & Taxes", title: "Utility Cost Estimates", body: "Typical monthly utility ranges.", href: "/financing" },
      { category: "Property & Taxes", title: "Insurance for Historic Homes", body: "Brownstone-specific insurance considerations.", href: "/financing" },

      { category: "Investing", title: "Two-Family Cash Flow", body: "Run cash flow on Troy 2–4 units.", href: "/troy-multi-unit" },
      { category: "Investing", title: "BRRRR Underwriting", body: "Brownstone rehab + refinance math.", href: "/finances" },
      { category: "Investing", title: "Rental Market Analysis", body: "Model rent and returns for Troy rentals.", href: "/finances" },
      { category: "Investing", title: "Market Demand Trends", body: "Track pricing and absorption citywide.", href: "/troy-intelligence" },
    ],
    partners: [
      { id: "bacchus", name: "Bacchus Wood-Fired", category: "Wood-Fired Kitchen", tagline: "Troy's wood-fired tasting destination.", about: "Open-fire cooking with seasonal menus, a smart wine list, and a warm Congress Street dining room.", address: "Congress St, Troy, NY", hours: "Wed–Sun · 5:00 PM – 10:00 PM", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80" },
      { id: "nighthawks", name: "Nighthawks", category: "American · Late Night", tagline: "Troy's late-night neighborhood spot.", about: "Smash burgers, cocktails, and the after-show crowd in downtown Troy.", address: "Broadway, Troy, NY", hours: "Wed–Sun · 5:00 PM – 1:00 AM", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80" },
      { id: "little-pecks", name: "Little Pecks", category: "Café & Bakery", tagline: "Troy's daytime café and pastry counter.", about: "Coffee, pastries, sandwiches — the daytime ritual of downtown Troy.", address: "Broadway, Troy, NY", hours: "Tue–Sun · 7:00 AM – 3:00 PM", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=80" },
      { id: "plumb-oyster", name: "Plumb Oyster Bar", category: "Oysters & Natural Wine", tagline: "Troy's oyster and natural wine room.", about: "A small, focused oyster bar with a tightly curated natural wine list on River Street.", address: "River Street, Troy, NY", hours: "Wed–Sat · 5:00 PM – 11:00 PM", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1600&q=80" },
    ],
    discoverCards: [
      { eyebrow: "Daily Life", title: "Morning in Troy", body: "Coffee at Little Pecks, walks through Washington Park, brownstone streets coming awake.", cta: "Explore Cafés", href: "#businesses", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Neighborhoods", title: "Neighborhoods", body: "The Pottery District, South Troy, downtown brownstones, and Lansingburgh.", cta: "Explore Neighborhoods", href: "#homes", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Community", title: "Community", body: "Saturday market, Troy Night Out, RPI hockey, and the Hudson riverfront.", cta: "See What's Happening", href: "#weekend", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Schools", title: "Schools & Education", body: "RPI, Russell Sage, and Troy CSD — anchored by major institutions.", cta: "Explore Schools", href: "#schools", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Dining", title: "Dining & Local Favorites", body: "Bacchus, Nighthawks, Little Pecks, Plumb Oyster — Troy's table.", cta: "Explore Local Businesses", href: "#businesses", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Real Estate", title: "Real Estate Snapshot", body: "Brownstones, two-families, and one of the Capital Region's hottest urban markets.", cta: "View Market", href: "#homes", image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1600&q=80" },
    ],
  },
  schenectady: {
    heroImage: "/assets/towns/schenectady-hero.jpg",
    whyImage: "/assets/towns/schenectady-why.jpg",
    heroHeadline: "Discover Schenectady.",
    heroSub:
      "Proctors Theatre, Mohawk Harbor, Union College, and one of the Capital Region's strongest value markets.",
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
      avgDom: "14",
      domNote: "High velocity",
    },
    whyCopy:
      "Schenectady offers historic neighborhoods, a major engineering employer base, and one of the strongest affordability stories in the Capital Region.",
    whyBullets: [
      "Historic Stockade district",
      "Engineering and tech employers",
      "Affordable home prices",
      "Proximity to Albany and Saratoga",
      "Union College and Proctors anchors",
      "Mohawk Harbor waterfront",
    ],
    accentGlow: "rgba(13,110,102,0.35)",
    ribbon: [
      { label: "Median Price", value: "$215K" },
      { label: "School Rank", value: "Top 40%" },
      { label: "Velocity", value: "High" },
      { label: "Albany Commute", value: "20 Mins" },
    ],
    heroPulses: [
      "Proctors Broadway tour opens this week",
      "Stockade Outdoor Art Show approaches",
      "New restaurant opens on Jay Street",
      "Union College spring season underway",
      "Mohawk Harbor adds new tenants",
    ],
    liveNow: [
      { label: "Event",    tone: "event",    text: "Proctors Broadway tour now playing on State Street" },
      { label: "Business", tone: "business", text: "New tasting room opens on Jay Street" },
      { label: "Sports",   tone: "sports",   text: "Union College hockey home game Saturday" },
      { label: "Market",   tone: "market",   text: "Upper Union home sells in 4 days over asking" },
      { label: "Civic",    tone: "civic",    text: "Mohawk Harbor adds two new waterfront tenants" },
      { label: "Nightlife",tone: "event",    text: "Live music tonight at Rivers Casino" },
    ],
    changedThisWeek: [
      { icon: "up",     label: "Upper Union homes sold over asking", detail: "Average 3.5% above list" },
      { icon: "permit", label: "Stockade restoration permit approved", detail: "Three historic facades" },
      { icon: "new",    label: "New restaurant on Jay Street", detail: "Mediterranean concept" },
      { icon: "park",   label: "Central Park spring concerts return", detail: "Weekly Wednesday series" },
      { icon: "school", label: "Union College adds engineering program", detail: "New computer science major" },
    ],
    thisWeekend: [
      { day: "Sun", time: "10 AM", category: "Market", title: "Schenectady Greenmarket", location: "Jay Street", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sat", time: "7 PM", category: "Theater", title: "Broadway tour at Proctors", location: "State Street", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80" },
      { day: "Fri", time: "8 PM", category: "Dining", title: "Moroccan tasting menu at Tara Kitchen", location: "Jay Street", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sat", time: "8 AM", category: "Bakery", title: "Morning pastry at Perreca's", location: "North Jay Street", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sun", time: "All Day", category: "Waterfront", title: "Mohawk Harbor riverfront walk", location: "Erie Boulevard", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80" },
    ],
    sports: [
      { team: "Union College Dutchmen", league: "NCAA D-I Hockey", status: "In Season", detail: "Messa Rink hockey weekends." },
      { team: "Schenectady Patriots", league: "Section II", status: "In Season", detail: "City school athletics year-round." },
      { team: "Mohawk Harbor Events", league: "Community", status: "Open", detail: "Waterfront concerts, runs, and races." },
      { team: "Schenectady YMCA", league: "YMCA", status: "Open", detail: "Family fitness and youth programs." },
      { team: "Central Park Rec", league: "Parks & Rec", status: "Daily", detail: "Trails, pools, and community sports." },
    ],
    financeLinks: [
      { category: "Buying a Home", title: "First-Time Buyer Programs", body: "Programs, grants, and step-by-step help.", href: "/first-time-buyers" },
      { category: "Buying a Home", title: "Affordability Calculator", body: "Understand what fits your monthly budget.", href: "/financing" },
      { category: "Buying a Home", title: "Renovation Loan Guide", body: "203(k) financing for Schenectady homes.", href: "/financing" },
      { category: "Buying a Home", title: "Local Grant Programs", body: "City and county down payment assistance.", href: "/grants" },

      { category: "Property & Taxes", title: "Schenectady Property Taxes", body: "City tax rates and lookup.", href: "https://www.cityofschenectady.com" },
      { category: "Property & Taxes", title: "School Tax Information", body: "Schenectady CSD tax overview.", href: "#schools" },
      { category: "Property & Taxes", title: "Utility Cost Estimates", body: "Typical monthly utility ranges.", href: "/financing" },
      { category: "Property & Taxes", title: "Insurance Guidance", body: "Homeowners insurance basics.", href: "/financing" },

      { category: "Investing", title: "Cash Flow Analyzer", body: "Run cash flow on Schenectady rentals.", href: "/finances" },
      { category: "Investing", title: "Multi-Family Underwriting", body: "Underwrite 2–4 units citywide.", href: "/schenectady-multi-unit" },
      { category: "Investing", title: "Cash-Flow Neighborhoods", body: "Highest-yield pockets in the city.", href: "/best-neighborhoods-cash-flow" },
      { category: "Investing", title: "Market Demand Trends", body: "Track pricing and absorption.", href: "/schenectady-intelligence" },
    ],
    partners: [
      { id: "perrecas", name: "Perreca's Bakery", category: "Bakery", tagline: "Schenectady's iconic Italian bakery since 1913.", about: "Wood-fired Italian bread and the morning ritual of North Jay Street.", address: "North Jay Street, Schenectady, NY", hours: "Tue–Sat · 7:00 AM – 4:00 PM", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=80" },
      { id: "johnnys", name: "Johnny's Italian American", category: "Italian", tagline: "A Schenectady institution since the 1950s.", about: "Red-sauce classics, veal parm, and Friday-night family dinners.", address: "Schenectady, NY", hours: "Wed–Sun · 5:00 PM – 10:00 PM", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1600&q=80" },
      { id: "tara-kitchen", name: "Tara Kitchen", category: "Moroccan", tagline: "Jay Street's beloved Moroccan kitchen.", about: "Tagines, couscous, and a warm dining room — a local favorite for more than a decade.", address: "Jay Street, Schenectady, NY", hours: "Tue–Sun · 5:00 PM – 10:00 PM", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80" },
      { id: "civitellos", name: "Civitello's", category: "Italian · Family", tagline: "A multi-generation Schenectady kitchen.", about: "Family Italian — pasta, parmigiana, and Sunday-gravy energy on weeknights.", address: "Schenectady, NY", hours: "Tue–Sat · 4:00 PM – 9:30 PM", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80" },
    ],
    discoverCards: [
      { eyebrow: "Daily Life", title: "Morning in Schenectady", body: "Bread at Perreca's, coffee on Jay Street, the Stockade waking up.", cta: "Explore Cafés", href: "#businesses", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Neighborhoods", title: "Neighborhoods", body: "Stockade, Upper Union, GE Realty Plot, and Mont Pleasant.", cta: "Explore Neighborhoods", href: "#homes", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Community", title: "Community", body: "Proctors, Mohawk Harbor, Union hockey, and the Stockade Art Show.", cta: "See What's Happening", href: "#weekend", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Schools", title: "Schools & Education", body: "Union College, Schenectady CSD, and area private options.", cta: "Explore Schools", href: "#schools", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Dining", title: "Dining & Local Favorites", body: "Perreca's, Johnny's, Tara Kitchen, Civitello's — Schenectady's table.", cta: "Explore Local Businesses", href: "#businesses", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Real Estate", title: "Real Estate Snapshot", body: "Strongest cash-flow market in the region. Stockade colonials and Upper Union value.", cta: "View Market", href: "#homes", image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1600&q=80" },
    ],
  },
  "clifton-park": {
    heroImage:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=2400&q=80",
    whyImage:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1800&q=80",
    heroHeadline: "Discover Clifton Park.",
    heroSub:
      "Shenendehowa schools, Clifton Common, Vischer Ferry, and the Capital Region's top family suburb — midway between Albany and Saratoga.",
    callouts: [
      { title: "Family-Friendly Suburbs", body: "Quiet streets, modern subdivisions." },
      { title: "New Development", body: "One of the fastest-growing areas." },
      { title: "Strong School Districts", body: "Shenendehowa schools draw families." },
    ],
    stats: {
      medianPrice: "$395K",
      medianNote: "Up YoY",
      activeListings: "68",
      activeNote: "Across the town",
      avgDom: "11",
      domNote: "High demand",
    },
    whyCopy:
      "Clifton Park is one of the Capital Region's most desirable family suburbs — modern homes, top schools, and easy access to Albany and Saratoga.",
    whyBullets: [
      "Shenendehowa school district",
      "Modern suburban neighborhoods",
      "Easy I-87 access",
      "Halfway between Albany and Saratoga",
      "Vischer Ferry Nature Preserve",
      "Strong youth sports & rec programs",
    ],
    accentGlow: "rgba(13,110,102,0.35)",
    ribbon: [
      { label: "Median Price", value: "$395K" },
      { label: "School Rank", value: "Top 10%" },
      { label: "Velocity", value: "High" },
      { label: "Albany Commute", value: "22 Mins" },
    ],
    heroPulses: [
      "Shen lacrosse home game Friday night",
      "Clifton Common summer concerts return",
      "New restaurant opens in Clifton Park Center",
      "Vischer Ferry trail expansion underway",
      "Two listings go pending in 48 hours",
    ],
    liveNow: [
      { label: "Event",    tone: "event",    text: "Clifton Common concert series begins next month" },
      { label: "Business", tone: "business", text: "New café opens in Clifton Park Center this spring" },
      { label: "Sports",   tone: "sports",   text: "Shen lacrosse home game Friday at 7 PM" },
      { label: "Market",   tone: "market",   text: "Inventory tightens — 4 listings pending this week" },
      { label: "Civic",    tone: "civic",    text: "Town board approves new park master plan" },
      { label: "Nightlife",tone: "event",    text: "Live music tonight at Druthers Brewing" },
    ],
    changedThisWeek: [
      { icon: "up",     label: "5 Clifton Park homes sold over asking", detail: "Average 3.8% above list" },
      { icon: "permit", label: "New Clifton Park Center retail filed", detail: "Two restaurant pads approved" },
      { icon: "school", label: "Shen named Top 10% in NY State", detail: "Statewide academic rankings" },
      { icon: "park",   label: "Vischer Ferry trail expansion begins", detail: "New connector to towpath" },
      { icon: "new",    label: "New mixed-use proposal off Route 146", detail: "Retail + 80 residential units" },
    ],
    thisWeekend: [
      { day: "Sat", time: "9 AM", category: "Trail", title: "Vischer Ferry morning hike", location: "Vischer Ferry Preserve", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80" },
      { day: "Fri", time: "7 PM", category: "Sports", title: "Shen lacrosse home game", location: "Shenendehowa HS", image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sat", time: "11 AM", category: "Café", title: "Brunch at MochaLisa's Caffé", location: "Clifton Park Center", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sat", time: "6 PM", category: "Dining", title: "Dinner at Ravenswood", location: "Clifton Park, NY", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80" },
      { day: "Sun", time: "All Day", category: "General Store", title: "Vischer Ferry General Store visit", location: "Vischer Ferry, NY", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80" },
    ],
    sports: [
      { team: "Shenendehowa Plainsmen", league: "Section II", status: "In Season", detail: "One of the top public-school programs in the Northeast." },
      { team: "Shen Lacrosse", league: "Section II", status: "In Season", detail: "Perennial state title contender." },
      { team: "Clifton Park Youth Sports", league: "Youth Programs", status: "Registration", detail: "Soccer, baseball, lacrosse, hockey." },
      { team: "Clifton Park YMCA", league: "YMCA", status: "Open", detail: "Family fitness and youth programs." },
      { team: "Clifton Common Rec", league: "Parks & Rec", status: "Daily", detail: "Fields, courts, trails, and community events." },
    ],
    financeLinks: [
      { category: "Buying a Home", title: "First-Time Buyer Programs", body: "Programs, grants, and step-by-step help.", href: "/first-time-buyers" },
      { category: "Buying a Home", title: "Affordability Calculator", body: "Understand what fits your monthly budget.", href: "/financing" },
      { category: "Buying a Home", title: "Mortgage Payment Estimator", body: "Estimate principal, interest, taxes, and insurance.", href: "/financing" },
      { category: "Buying a Home", title: "Relocation Guide", body: "Out-of-market buyer roadmap.", href: "/nyc-to-albany-playbook" },

      { category: "Property & Taxes", title: "Clifton Park Property Taxes", body: "Town tax rates and lookup.", href: "https://cliftonparkny.gov" },
      { category: "Property & Taxes", title: "Shen School Tax Info", body: "Shenendehowa CSD tax overview.", href: "#schools" },
      { category: "Property & Taxes", title: "Utility Cost Estimates", body: "Typical monthly utility ranges.", href: "/financing" },
      { category: "Property & Taxes", title: "Insurance Guidance", body: "Homeowners insurance basics.", href: "/financing" },

      { category: "Investing", title: "Cash Flow Analyzer", body: "Run cash flow on Clifton Park rentals.", href: "/finances" },
      { category: "Investing", title: "New-Construction Underwriting", body: "Underwrite new builds and townhouses.", href: "/finances" },
      { category: "Investing", title: "Rental Demand Trends", body: "Track family rental demand.", href: "/finances" },
      { category: "Investing", title: "Market Demand Trends", body: "Track pricing and absorption townwide.", href: "/clifton-park-intelligence" },
    ],
    partners: [
      { id: "mochalisas", name: "MochaLisa's Caffé", category: "Coffee & Café", tagline: "Clifton Park's morning meeting spot.", about: "Locally roasted espresso, pastries, and the daily routine of Clifton Park families.", address: "Clifton Park Center, NY", hours: "Mon–Sun · 6:30 AM – 6:00 PM", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80" },
      { id: "ravenswood", name: "Ravenswood", category: "Modern American", tagline: "Refined dining in Clifton Park.", about: "A modern American restaurant — seasonal menus, a serious wine list, and a warm room.", address: "Clifton Park, NY", hours: "Wed–Sun · 5:00 PM – 10:00 PM", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80" },
      { id: "peddlers", name: "Peddlers Bar & Bistro", category: "Bar & Bistro", tagline: "A Clifton Park dining mainstay.", about: "A long-standing local — comfort menu, big bar, and weekly date-night energy.", address: "Clifton Park, NY", hours: "Daily · 11:30 AM – 11:00 PM", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80" },
      { id: "vischer-ferry", name: "Vischer Ferry General Store", category: "General Store · Café", tagline: "A hidden Capital Region treasure.", about: "Coffee, breakfast, and weekend brunch from a historic general store at the edge of the preserve.", address: "Vischer Ferry, NY", hours: "Wed–Sun · 7:00 AM – 2:00 PM", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1600&q=80" },
    ],
    discoverCards: [
      { eyebrow: "Daily Life", title: "Morning in Clifton Park", body: "Coffee at MochaLisa's, school carpool lines, the suburban rhythm of the Northway corridor.", cta: "Explore Cafés", href: "#businesses", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Neighborhoods", title: "Neighborhoods", body: "Shen district pockets, Vischer Ferry, and the Clifton Park Center area.", cta: "Explore Neighborhoods", href: "#homes", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Community", title: "Community", body: "Clifton Common concerts, Shen athletics, and town festivals.", cta: "See What's Happening", href: "#weekend", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Schools", title: "Schools & Education", body: "Shenendehowa Central — consistently top 10% in New York.", cta: "Explore Schools", href: "#schools", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Dining", title: "Dining & Local Favorites", body: "MochaLisa's, Ravenswood, Peddlers, Vischer Ferry General Store.", cta: "Explore Local Businesses", href: "#businesses", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80" },
      { eyebrow: "Real Estate", title: "Real Estate Snapshot", body: "Family colonials, new construction, and the Capital Region's most consistent family-suburb demand.", cta: "View Market", href: "#homes", image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1600&q=80" },
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
