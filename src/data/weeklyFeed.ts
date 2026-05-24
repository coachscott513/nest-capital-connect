/**
 * CAPITAL DISTRICT NEST — WEEKLY FEED
 * Hand-curated. Update every Friday.
 *
 * DATE FIELDS:
 * - `date` is the human-readable label rendered on the card.
 * - `startDate` / `endDate` (ISO YYYY-MM-DD) drive freshness logic. Items
 *   whose endDate is in the past are filtered out automatically. Items
 *   without dates are treated as evergreen.
 *
 * scope    — "region" appears on homepage. A town slug appears on that town's
 *            page. "all" appears on both.
 * featured — preferred hero candidate. The component still validates against
 *            the date; expired featured items fall back to the next best
 *            upcoming event/music/sports item, then to recent stories.
 */

export type WeeklyFeedType =
  | "real_estate"
  | "business"
  | "event"
  | "market"
  | "music"
  | "sports"
  | "dining"
  | "development"
  | "family"
  | "networking";

export interface WeeklyFeedItem {
  title: string;
  description: string;
  type: WeeklyFeedType;
  date: string;
  scope: "region" | "all" | string;
  /** ISO YYYY-MM-DD. Used for freshness filtering. */
  startDate?: string;
  /** ISO YYYY-MM-DD. Falls back to startDate if absent. */
  endDate?: string;
  featured?: boolean;
  town?: string;
  venue?: string;
  time?: string;
  image?: string;
  cta?: { label: string; href: string };
}

export const weeklyFeed: WeeklyFeedItem[] = [
  // ===== MUSIC =====
  {
    title: "Jazz Festival kicks off at SPAC",
    description:
      "Two nights of headliners under the pavilion to open the summer season. Lawn tickets still available.",
    type: "music",
    date: "May 26–27",
    time: "7:00 PM",
    venue: "SPAC",
    town: "Saratoga",
    scope: "region",
    featured: true,
    startDate: "2026-05-26",
    endDate: "2026-05-27",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1600&q=80",
    cta: { label: "See the full SPAC summer slate", href: "#weekly-feed" },
  },
  {
    title: "Live on the Hudson returns to Troy",
    description: "Free Friday concert series along the Troy Waterfront.",
    type: "music",
    date: "Fridays through August",
    time: "6:00 PM",
    venue: "Riverfront Park",
    town: "Troy",
    scope: "region",
    startDate: "2026-05-29",
    endDate: "2026-08-28",
  },
  {
    title: "Alive at Five lineup announced",
    description:
      "Albany's free Thursday concert series returns to Tricentennial Park in June.",
    type: "music",
    date: "Starts Jun 4",
    time: "5:00 PM",
    venue: "Tricentennial Park",
    town: "Albany",
    scope: "region",
    startDate: "2026-06-04",
    endDate: "2026-07-30",
  },

  // ===== SPORTS =====
  {
    title: "Albany Patroons playoff push",
    description: "Two home games at Washington Avenue Armory this weekend.",
    type: "sports",
    date: "May 24–25",
    venue: "Washington Avenue Armory",
    town: "Albany",
    scope: "region",
    startDate: "2026-05-24",
    endDate: "2026-05-25",
  },
  {
    title: "Saratoga Race Course opens July 11",
    description:
      "40-day meet kicks off Independence Day weekend. Reserved seating on sale now.",
    type: "sports",
    date: "Jul 11",
    venue: "Saratoga Race Course",
    town: "Saratoga",
    scope: "region",
    startDate: "2026-07-11",
    endDate: "2026-09-01",
  },
  {
    title: "Albany Firebirds vs. Jacksonville",
    description: "Arena football divisional matchup at MVP Arena.",
    type: "sports",
    date: "May 30",
    time: "7:00 PM",
    venue: "MVP Arena",
    town: "Albany",
    scope: "region",
    startDate: "2026-05-30",
  },

  // ===== DINING =====
  {
    title: "Mohawk Harbor adds two new restaurants",
    description:
      "Waterfront Italian and a Japanese izakaya open along the river this month.",
    type: "dining",
    date: "Opens May 30",
    venue: "Mohawk Harbor",
    town: "Schenectady",
    scope: "region",
    startDate: "2026-05-30",
    endDate: "2026-06-30",
  },
  {
    title: "Lark Street Tavern launches new brunch",
    description: "Saturday + Sunday brunch with bottomless mimosas.",
    type: "dining",
    date: "Weekends",
    time: "10:00 AM – 2:00 PM",
    venue: "Lark Street",
    town: "Albany",
    scope: "region",
    startDate: "2026-05-24",
    endDate: "2026-09-01",
  },
  {
    title: "New café opening on Delaware Ave",
    description: "Independent roaster taking over the old Stewart's space.",
    type: "dining",
    date: "Opens May 29",
    venue: "Delaware Ave",
    town: "Delmar",
    scope: "all",
    startDate: "2026-05-29",
    endDate: "2026-06-15",
  },
  {
    title: "Restaurant Week returns to Downtown Albany",
    description: "$25 three-course menus at 30+ restaurants across Albany.",
    type: "dining",
    date: "Jun 9–15",
    venue: "Downtown Albany",
    town: "Albany",
    scope: "region",
    startDate: "2026-06-09",
    endDate: "2026-06-15",
  },

  // ===== DEVELOPMENT =====
  {
    title: "Downtown Albany mixed-use project approved",
    description:
      "120 residential units + ground-floor retail on Broadway. Construction starts Q3.",
    type: "development",
    date: "This week",
    town: "Albany",
    scope: "region",
    startDate: "2026-05-22",
    endDate: "2026-06-22",
  },
  {
    title: "Empire State Plaza renovation underway",
    description: "Phase 1 of the concourse modernization breaks ground.",
    type: "development",
    date: "May",
    venue: "Empire State Plaza",
    town: "Albany",
    scope: "region",
    startDate: "2026-05-15",
    endDate: "2026-06-30",
  },
  {
    title: "Clifton Park Center expansion proposal",
    description:
      "Town board reviews 80,000 sq ft retail + dining addition.",
    type: "development",
    date: "Jun 3 hearing",
    venue: "Clifton Park Town Hall",
    town: "Clifton Park",
    scope: "region",
    startDate: "2026-06-03",
  },

  // ===== EVENTS / FESTIVALS =====
  {
    title: "Proctors announces summer Broadway slate",
    description:
      "Hamilton, MJ The Musical, and Six headline a packed Schenectady season.",
    type: "event",
    date: "Summer 2026",
    venue: "Proctors",
    town: "Schenectady",
    scope: "region",
    startDate: "2026-06-15",
    endDate: "2026-08-31",
  },
  {
    title: "Troy Farmers Market returns to River Street",
    description:
      "Saturdays 9am–1pm. 60+ vendors, live music, full street closure on River.",
    type: "event",
    date: "Saturdays",
    time: "9:00 AM – 1:00 PM",
    venue: "River Street",
    town: "Troy",
    scope: "region",
    startDate: "2026-05-24",
    endDate: "2026-10-31",
  },
  {
    title: "Rivers Casino summer concert series announced",
    description: "Outdoor stage lineup includes country, R&B, and tribute acts.",
    type: "event",
    date: "Jun – Aug",
    venue: "Rivers Casino",
    town: "Schenectady",
    scope: "region",
    startDate: "2026-06-01",
    endDate: "2026-08-31",
  },
  {
    title: "Memorial Day weekend on Lark Street",
    description:
      "Block party, live music, and outdoor patios across Lark Street businesses.",
    type: "event",
    date: "May 24–25",
    venue: "Lark Street",
    town: "Albany",
    scope: "region",
    startDate: "2026-05-24",
    endDate: "2026-05-25",
  },

  // ===== FAMILY =====
  {
    title: "Family movie night in Washington Park",
    description: "Free outdoor screening with food trucks. Bring a blanket.",
    type: "family",
    date: "May 31",
    time: "Dusk",
    venue: "Washington Park",
    town: "Albany",
    scope: "region",
    startDate: "2026-05-31",
  },
  {
    title: "Children's Museum free admission day",
    description: "Sponsored by Broadview FCU — Sunday only.",
    type: "family",
    date: "May 31",
    venue: "miSci",
    town: "Schenectady",
    scope: "region",
    startDate: "2026-05-31",
  },

  // ===== NETWORKING =====
  {
    title: "Capital Region Chamber YPN mixer",
    description: "Young professionals networking night at Mohawk Harbor.",
    type: "networking",
    date: "May 28",
    time: "5:30 PM",
    venue: "Mohawk Harbor",
    town: "Schenectady",
    scope: "region",
    startDate: "2026-05-28",
  },
  {
    title: "Tech Valley pitch night",
    description: "Five Capital District founders pitch live to investors.",
    type: "networking",
    date: "Jun 6",
    time: "6:00 PM",
    venue: "UAlbany ETEC",
    town: "Albany",
    scope: "region",
    startDate: "2026-06-06",
  },

  // ===== REAL ESTATE / MARKET (evergreen weekly) =====
  {
    title: "47 homes sold across Albany County",
    description:
      "Median sale price up 4.2% from last week. Tightest inventory in Delmar and Loudonville.",
    type: "real_estate",
    date: "Updated this week",
    town: "Albany County",
    scope: "region",
    startDate: "2026-05-22",
    endDate: "2026-05-29",
  },
  {
    title: "Saratoga market heating up",
    description:
      "Pre-track season pending sales jumped 18% week-over-week.",
    type: "market",
    date: "Updated this week",
    town: "Saratoga",
    scope: "region",
    startDate: "2026-05-22",
    endDate: "2026-05-29",
  },
  {
    title: "Troy multi-family demand at 5-year high",
    description: "Investor offers averaging 98% of list across 2–4 unit stock.",
    type: "market",
    date: "Updated this week",
    town: "Troy",
    scope: "region",
    startDate: "2026-05-22",
    endDate: "2026-05-29",
  },

  // ===== DELMAR (town-scoped) =====
  {
    title: "3 homes sold in Delmar this week",
    description: "Highest sale: $612K on Roweland Ave. Average 7 days on market.",
    type: "real_estate",
    date: "Updated this week",
    scope: "delmar",
    startDate: "2026-05-22",
    endDate: "2026-05-29",
  },
  {
    title: "Inventory down 12% in Bethlehem",
    description: "Just 11 active single-family listings under $700K.",
    type: "market",
    date: "Updated this week",
    scope: "delmar",
    startDate: "2026-05-22",
    endDate: "2026-05-29",
  },
  {
    title: "Bethlehem Farmers Market returns Saturday",
    description: "9am at the Four Corners. New vendors this season.",
    type: "event",
    date: "Saturdays",
    time: "9:00 AM",
    venue: "Four Corners",
    scope: "delmar",
    startDate: "2026-05-30",
    endDate: "2026-10-31",
  },
];
