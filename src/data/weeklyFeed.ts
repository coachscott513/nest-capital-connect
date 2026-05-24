/**
 * CAPITAL DISTRICT NEST — WEEKLY FEED
 * Hand-curated. Update every Friday.
 *
 * type      — controls icon + accent label
 * scope     — "region" appears on homepage. A town slug (e.g. "delmar")
 *             appears on that town's page. Use "all" to appear on both.
 * featured  — set true on ONE region item per week. That item becomes
 *             the editorial hero on the homepage WeeklyFeed.
 * town      — optional pretty town label for the card chip (e.g. "Albany")
 * image     — optional hero image URL (only used for the featured item)
 * cta       — optional { label, href } for the featured item
 */

export type WeeklyFeedType =
  | "real_estate"
  | "business"
  | "event"
  | "market";

export interface WeeklyFeedItem {
  title: string;
  description: string;
  type: WeeklyFeedType;
  date: string;
  scope: "region" | "all" | string;
  featured?: boolean;
  town?: string;
  image?: string;
  cta?: { label: string; href: string };
}

export const weeklyFeed: WeeklyFeedItem[] = [
  // ===== REGION =====
  {
    title: "Tulip Festival takes over Washington Park",
    description:
      "150,000 tulips, live music on three stages, and 100+ local vendors. Saturday & Sunday in Albany. Expect heavy traffic on Madison and State.",
    type: "event",
    date: "May 9–10, 2026",
    scope: "region",
    featured: true,
    town: "Albany",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80",
    cta: { label: "See the full weekend guide", href: "#weekly-feed" },
  },
  {
    title: "47 homes sold across Albany County",
    description:
      "Median sale price up 4.2% from last week. Tightest inventory in Delmar and Loudonville.",
    type: "real_estate",
    date: "May 7, 2026",
    scope: "region",
    town: "Albany County",
  },
  {
    title: "Saratoga market heating up",
    description:
      "Pre-track season pending sales jumped 18% week-over-week.",
    type: "market",
    date: "May 6, 2026",
    scope: "region",
    town: "Saratoga",
  },
  {
    title: "New café opening on Delaware Ave",
    description:
      "Independent roaster taking over the old Stewart's space in Delmar.",
    type: "business",
    date: "May 5, 2026",
    scope: "all",
    town: "Delmar",
  },
  {
    title: "Proctors announces summer Broadway slate",
    description:
      "Hamilton, MJ The Musical, and Six headline a packed Schenectady season.",
    type: "event",
    date: "May 4, 2026",
    scope: "region",
    town: "Schenectady",
  },
  {
    title: "Mohawk Harbor adds two new restaurants",
    description:
      "Waterfront Italian and a Japanese izakaya open along the river this month.",
    type: "business",
    date: "May 3, 2026",
    scope: "region",
    town: "Schenectady",
  },
  {
    title: "Saratoga Race Course opens July 11",
    description:
      "40-day meet kicks off Independence Day weekend. Reserved seating on sale now.",
    type: "event",
    date: "Jul 11, 2026",
    scope: "region",
    town: "Saratoga",
  },
  {
    title: "Troy Farmers Market returns to River Street",
    description:
      "Saturdays 9am–1pm. 60+ vendors, live music, and full street closure on River.",
    type: "event",
    date: "Saturdays",
    scope: "region",
    town: "Troy",
  },

  // ===== DELMAR =====
  {
    title: "3 homes sold in Delmar this week",
    description: "Highest sale: $612K on Roweland Ave. Average 7 days on market.",
    type: "real_estate",
    date: "May 7, 2026",
    scope: "delmar",
  },
  {
    title: "Inventory down 12% in Bethlehem",
    description: "Just 11 active single-family listings under $700K.",
    type: "market",
    date: "May 6, 2026",
    scope: "delmar",
  },
  {
    title: "Bethlehem Farmers Market opens Saturday",
    description: "9am at the Four Corners. New vendors this season.",
    type: "event",
    date: "May 10, 2026",
    scope: "delmar",
  },
];
