/**
 * Documented demand snapshot — the public mirror of public.demand_signals.
 *
 * RULE: a card may only claim to be demand-derived if it maps to a recorded
 * demand source. Every entry below traces to Search Console query rows for
 * sc-domain:capitaldistrictnest.com over the window named in WINDOW.
 *
 * Nothing here is invented, and nothing here is a category we wished for.
 * Notary, dentists, plumbers and restaurants were removed from the earlier
 * preview because they were not all demonstrated in the measured baseline;
 * only the notary family survived, and only on its measured evidence.
 */

export const DEMAND_WINDOW = { start: "2026-05-15", end: "2026-08-12" } as const;
export const DEMAND_SOURCE = "search_console" as const;

export type DemandSignal = {
  /** Grouped, human-readable service label. */
  label: string;
  /** Normalized need slug — the private evidence key. */
  slug: string;
  /** Representative intent phrasing, taken from the measured queries. */
  intent: string;
  clicks: number;
  impressions: number;
  /** The exact measured queries this label groups. Kept for auditability. */
  evidenceQueries: string[];
  href: string;
};

export const DEMAND_SIGNALS: DemandSignal[] = [
  {
    label: "Notary services",
    slug: "notary",
    intent: "notary near me",
    clicks: 8,
    impressions: 32,
    evidenceQueries: ["m&g swift notary services llc"],
    href: "/local?q=notary",
  },
  {
    label: "House cleaning",
    slug: "cleaning",
    intent: "house cleaners near me",
    clicks: 2,
    impressions: 2,
    evidenceQueries: ["house cleaners near me", "apartment cleaning services near me"],
    href: "/local?q=cleaning",
  },
  {
    label: "Kayak & paddle rental",
    slug: "kayak-rental",
    intent: "kayak for rent near me",
    clicks: 3,
    impressions: 4,
    evidenceQueries: [
      "kayak for rent near me",
      "kayaks for rent near me",
      "paddle board rental near me",
    ],
    href: "/local?q=kayak%20rental",
  },
  {
    label: "Catering",
    slug: "catering",
    intent: "catering in albany ny",
    clicks: 3,
    impressions: 9,
    evidenceQueries: ["catering in albany ny", "giuliano's catering"],
    href: "/local?q=catering",
  },
  {
    label: "Car insurance",
    slug: "car-insurance",
    intent: "car insurance quotes",
    clicks: 3,
    impressions: 5,
    evidenceQueries: ["car insurance", "car insurance quotes", "cheap car insurance quotes"],
    href: "/local?q=car%20insurance",
  },
  {
    label: "Dumpster & roll-off rental",
    slug: "dumpster-rental",
    intent: "dumpster rental near me",
    clicks: 2,
    impressions: 16,
    evidenceQueries: ["dumpster rental near me", "dumpster rental schenectady ny"],
    href: "/local?q=dumpster%20rental",
  },
  {
    label: "Knife & tool sharpening",
    slug: "sharpening",
    intent: "knife sharpening near me",
    clicks: 2,
    impressions: 12,
    evidenceQueries: ["knife sharpening near me", "garden tool sharpening near me"],
    href: "/local?q=sharpening",
  },
  {
    label: "Laundry & wash-and-fold",
    slug: "laundry",
    intent: "laundry near me",
    clicks: 2,
    impressions: 4,
    evidenceQueries: ["laundry near me", "laundry service"],
    href: "/local?q=laundry",
  },
  {
    label: "Used auto parts & salvage",
    slug: "used-auto-parts",
    intent: "used auto parts schenectady, ny",
    clicks: 2,
    impressions: 4,
    evidenceQueries: ["used auto parts schenectady, ny", "salvage yards near me"],
    href: "/local?q=used%20auto%20parts",
  },
  {
    label: "Halal food & grocery",
    slug: "halal",
    intent: "halal grocery near me",
    clicks: 2,
    impressions: 3,
    evidenceQueries: ["halal grocery near me", "halal food schenectady ny"],
    href: "/local?q=halal",
  },
  {
    label: "Sawmill & wood planing",
    slug: "sawmill-planing",
    intent: "sawmill services near me",
    clicks: 2,
    impressions: 2,
    evidenceQueries: ["sawmill services near me", "wood planing services near me"],
    href: "/local?q=sawmill",
  },
  {
    label: "Trucking companies",
    slug: "trucking",
    intent: "trucking companies near me",
    clicks: 1,
    impressions: 2,
    evidenceQueries: ["trucking companies near me"],
    href: "/local?q=trucking",
  },
  {
    label: "Security guard classes",
    slug: "security-classes",
    intent: "security classes near me",
    clicks: 1,
    impressions: 1,
    evidenceQueries: ["security classes near me"],
    href: "/local?q=security%20training",
  },
  {
    label: "Tent rental",
    slug: "tent-rental",
    intent: "tent rental prices near me",
    clicks: 1,
    impressions: 1,
    evidenceQueries: ["tent rental prices near me"],
    href: "/local?q=tent%20rental",
  },
];
