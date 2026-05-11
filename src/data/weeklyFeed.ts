/**
 * CAPITAL DISTRICT NEST — WEEKLY FEED
 * Hand-curated. Update every Friday.
 *
 * type controls the icon + accent label.
 * scope: "region" appears on the homepage. A town slug (e.g. "delmar")
 * appears on that town's page. Items can also appear on both via "all".
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
  scope: "region" | "all" | string; // "delmar", "albany", etc.
}

export const weeklyFeed: WeeklyFeedItem[] = [
  // ===== REGION =====
  {
    title: "47 homes sold across Albany County",
    description: "Median sale price up 4.2% from last week. Tightest inventory in Delmar and Loudonville.",
    type: "real_estate",
    date: "May 7, 2026",
    scope: "region",
  },
  {
    title: "Saratoga market heating up",
    description: "Pre-track season pending sales jumped 18% week-over-week.",
    type: "market",
    date: "May 6, 2026",
    scope: "region",
  },
  {
    title: "New café opening on Delaware Ave",
    description: "Independent roaster taking over the old Stewart's space in Delmar.",
    type: "business",
    date: "May 5, 2026",
    scope: "delmar",
  },
  {
    title: "Tulip Festival weekend in Albany",
    description: "Washington Park, Saturday & Sunday. Expect heavy traffic on Madison.",
    type: "event",
    date: "May 9, 2026",
    scope: "region",
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
