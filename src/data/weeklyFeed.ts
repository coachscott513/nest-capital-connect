/**
 * CAPITAL DISTRICT NEST — WEEKLY FEED
 * Hand-curated. Update every Friday.
 *
 * Categories drive icons, pill colors, and the filter system on the homepage.
 * scope     — "region" appears on homepage. A town slug appears on that town's
 *             page. "all" appears on both.
 * featured  — set true on ONE region item per week (becomes editorial hero).
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
  featured?: boolean;
  town?: string;
  venue?: string;
  time?: string;
  image?: string;
  cta?: { label: string; href: string };
}

export const weeklyFeed: WeeklyFeedItem[] = [
  // ===== EDITORIAL HERO =====
  {
    title: "Tulip Festival takes over Washington Park",
    description:
      "150,000 tulips, live music on three stages, and 100+ local vendors. Expect heavy traffic on Madison and State all weekend.",
    type: "event",
    date: "May 9–10",
    time: "10:00 AM – 6:00 PM",
    scope: "region",
    featured: true,
    town: "Albany",
    venue: "Washington Park",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80",
    cta: { label: "See the full weekend guide", href: "#weekly-feed" },
  },

  // ===== MUSIC =====
  {
    title: "Jazz Festival kicks off at SPAC",
    description:
      "Two nights of headliners under the pavilion. Lawn tickets still available.",
    type: "music",
    date: "May 26",
    time: "7:00 PM",
    venue: "SPAC",
    town: "Saratoga",
    scope: "region",
  },
  {
    title: "Trampled by Turtles at The Egg",
    description: "Folk-rock sextet on a rare Capital Region stop.",
    type: "music",
    date: "May 22",
    time: "8:00 PM",
    venue: "The Egg",
    town: "Albany",
    scope: "region",
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
  },

  // ===== SPORTS =====
  {
    title: "Albany Firebirds home opener",
    description: "Arena football returns to MVP Arena with a divisional matchup.",
    type: "sports",
    date: "May 17",
    time: "7:00 PM",
    venue: "MVP Arena",
    town: "Albany",
    scope: "region",
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
  },
  {
    title: "Siena vs. UAlbany rivalry tip-off",
    description: "Capital District hoops crosstown showdown returns this season.",
    type: "sports",
    date: "Nov 14",
    time: "7:00 PM",
    venue: "MVP Arena",
    town: "Albany",
    scope: "region",
  },
  {
    title: "Albany Patroons playoff push",
    description: "Two home games at Washington Avenue Armory this weekend.",
    type: "sports",
    date: "May 24–25",
    venue: "Washington Avenue Armory",
    town: "Albany",
    scope: "region",
  },

  // ===== DINING =====
  {
    title: "New rooftop restaurant opens in Troy",
    description: "River-view bar and Mediterranean menu debuts on River Street.",
    type: "dining",
    date: "Opens Fri May 23",
    venue: "River Street",
    town: "Troy",
    scope: "region",
  },
  {
    title: "Mohawk Harbor adds two new restaurants",
    description:
      "Waterfront Italian and a Japanese izakaya open along the river this month.",
    type: "dining",
    date: "May",
    venue: "Mohawk Harbor",
    town: "Schenectady",
    scope: "region",
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
  },
  {
    title: "New café opening on Delaware Ave",
    description: "Independent roaster taking over the old Stewart's space.",
    type: "dining",
    date: "May 5",
    venue: "Delaware Ave",
    town: "Delmar",
    scope: "all",
  },

  // ===== DEVELOPMENT =====
  {
    title: "Downtown Albany mixed-use project approved",
    description:
      "120 residential units + ground-floor retail on Broadway. Construction starts Q3.",
    type: "development",
    date: "May 6",
    town: "Albany",
    scope: "region",
  },
  {
    title: "Empire State Plaza renovation underway",
    description: "Phase 1 of the concourse modernization breaks ground.",
    type: "development",
    date: "May",
    venue: "Empire State Plaza",
    town: "Albany",
    scope: "region",
  },
  {
    title: "Clifton Park Center expansion proposal",
    description:
      "Town board reviews 80,000 sq ft retail + dining addition next week.",
    type: "development",
    date: "May 20",
    venue: "Clifton Park Center",
    town: "Clifton Park",
    scope: "region",
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
  },
  {
    title: "Rivers Casino summer concert series announced",
    description: "Outdoor stage lineup includes country, R&B, and tribute acts.",
    type: "event",
    date: "Jun – Aug",
    venue: "Rivers Casino",
    town: "Schenectady",
    scope: "region",
  },

  // ===== FAMILY =====
  {
    title: "Crossgates kids' weekend takeover",
    description:
      "Free magician, balloon artists, and play zones throughout the mall Saturday.",
    type: "family",
    date: "May 18",
    venue: "Crossgates",
    town: "Albany",
    scope: "region",
  },
  {
    title: "Family movie night in Washington Park",
    description: "Free outdoor screening with food trucks. Bring a blanket.",
    type: "family",
    date: "May 31",
    time: "Dusk",
    venue: "Washington Park",
    town: "Albany",
    scope: "region",
  },

  // ===== NETWORKING =====
  {
    title: "Capital Region Chamber YPN mixer",
    description: "Young professionals networking night at Mohawk Harbor.",
    type: "networking",
    date: "May 23",
    time: "5:30 PM",
    venue: "Mohawk Harbor",
    town: "Schenectady",
    scope: "region",
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
  },

  // ===== REAL ESTATE / MARKET =====
  {
    title: "47 homes sold across Albany County",
    description:
      "Median sale price up 4.2% from last week. Tightest inventory in Delmar and Loudonville.",
    type: "real_estate",
    date: "May 7",
    town: "Albany County",
    scope: "region",
  },
  {
    title: "Saratoga market heating up",
    description:
      "Pre-track season pending sales jumped 18% week-over-week.",
    type: "market",
    date: "May 6",
    town: "Saratoga",
    scope: "region",
  },
  {
    title: "Troy multi-family demand at 5-year high",
    description: "Investor offers averaging 98% of list across 2–4 unit stock.",
    type: "market",
    date: "May 5",
    town: "Troy",
    scope: "region",
  },

  // ===== DELMAR (town-scoped) =====
  {
    title: "3 homes sold in Delmar this week",
    description: "Highest sale: $612K on Roweland Ave. Average 7 days on market.",
    type: "real_estate",
    date: "May 7",
    scope: "delmar",
  },
  {
    title: "Inventory down 12% in Bethlehem",
    description: "Just 11 active single-family listings under $700K.",
    type: "market",
    date: "May 6",
    scope: "delmar",
  },
  {
    title: "Bethlehem Farmers Market opens Saturday",
    description: "9am at the Four Corners. New vendors this season.",
    type: "event",
    date: "May 10",
    time: "9:00 AM",
    venue: "Four Corners",
    scope: "delmar",
  },
];
