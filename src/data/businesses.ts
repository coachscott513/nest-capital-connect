// Curated local business directory — sample seed data for Delmar.
// Hardcoded for now; structure mirrors a future Supabase `businesses` table.

export type BusinessCategory =
  | "Restaurant"
  | "Coffee"
  | "Bakery"
  | "Home Service"
  | "Fitness"
  | "Retail"
  | "Wellness"
  | "Bookstore";

export interface Business {
  slug: string;
  name: string;
  town: string;
  category: BusinessCategory;
  tagline: string;
  about: string;
  why: string[];
  phone?: string;
  website?: string;
  address: string;
  hours?: string;
  lat?: number;
  lng?: number;
}

export const delmarBusinesses: Business[] = [
  {
    slug: "four-corners-luncheonette",
    name: "Four Corners Luncheonette",
    town: "delmar",
    category: "Restaurant",
    tagline: "Delmar's classic neighborhood diner.",
    about:
      "A long-standing Four Corners staple known for breakfast all day, friendly service, and being the unofficial morning meeting room of Delmar.",
    why: ["Locals' default Saturday breakfast", "Cash-only old-school charm", "Coffee refills without asking"],
    address: "Delaware Ave, Delmar, NY",
    hours: "Mon–Sat 6a–2p",
  },
  {
    slug: "perfect-blend",
    name: "The Perfect Blend",
    town: "delmar",
    category: "Coffee",
    tagline: "Independent coffee + local meeting spot.",
    about:
      "Locally roasted coffee, light bites, and the kind of slow morning crowd that makes a coffee shop feel like a town square.",
    why: ["Real espresso, not chain coffee", "Quiet enough to actually work", "Owner usually behind the counter"],
    address: "Delaware Ave, Delmar, NY",
    hours: "Daily 6:30a–5p",
  },
  {
    slug: "delmar-marketplace",
    name: "Delmar Marketplace",
    town: "delmar",
    category: "Retail",
    tagline: "Independent grocer with a local-first selection.",
    about:
      "Smaller-format grocery focused on local producers, prepared foods, and the kind of curation Stewart's can't match.",
    why: ["Local dairy and produce", "Best prepared dinners in town", "Walkable from most of central Delmar"],
    address: "Delaware Ave, Delmar, NY",
    hours: "Daily 7a–9p",
  },
  {
    slug: "bountiful-bread",
    name: "Bountiful Bread",
    town: "delmar",
    category: "Bakery",
    tagline: "Bread, pastries, and the line to prove it.",
    about:
      "Artisan loaves baked daily plus pastries that disappear by 10am on weekends. The Saturday line is part of the experience.",
    why: ["Sourdough sells out by noon", "Croissants are the real thing", "Cult following across the Capital District"],
    address: "Delaware Ave, Delmar, NY",
    hours: "Wed–Sun 7a–3p",
  },
  {
    slug: "bethlehem-public-library",
    name: "Bethlehem Public Library",
    town: "delmar",
    category: "Bookstore",
    tagline: "Not a business — but the heart of Delmar.",
    about:
      "Consistently one of the most-used libraries per capita in New York. Programs, study rooms, and a children's wing that anchors family life here.",
    why: ["Free programs nearly every night", "Quiet study rooms you can book", "Kids' section is genuinely great"],
    address: "451 Delaware Ave, Delmar, NY",
    hours: "Mon–Thu 9a–9p · Fri–Sat 9a–5p",
  },
  {
    slug: "swifty-printing",
    name: "Swifty Printing",
    town: "delmar",
    category: "Home Service",
    tagline: "Local print shop that still picks up the phone.",
    about:
      "Family-run print, signage, and small-business marketing services. The kind of place that knows what you mean when you say 'the usual.'",
    why: ["Same-day turnaround on most jobs", "Real humans, not a portal", "Trusted by most Delmar small businesses"],
    address: "Delaware Ave, Delmar, NY",
    hours: "Mon–Fri 8a–5p",
  },
  {
    slug: "delmar-yoga",
    name: "Delmar Yoga",
    town: "delmar",
    category: "Wellness",
    tagline: "Drop-in studio with a strong morning crowd.",
    about:
      "Heated and unheated classes, beginner-friendly schedule, and instructors who actually remember your name after week two.",
    why: ["6am classes that actually start at 6am", "Drop-ins welcome", "Community feel, not gym vibes"],
    address: "Delaware Ave, Delmar, NY",
    hours: "Daily 6a–8p",
  },
  {
    slug: "main-square-shoppes",
    name: "Main Square Shoppes",
    town: "delmar",
    category: "Retail",
    tagline: "Walkable cluster of independent shops.",
    about:
      "A small mixed-use square that quietly anchors a lot of Delmar's daily errands — gifts, services, and food without leaving the village.",
    why: ["Park once, do five errands", "Independent tenants only", "Holiday shopping without the mall"],
    address: "Delaware Ave, Delmar, NY",
    hours: "Varies by tenant",
  },
  {
    slug: "elm-avenue-park",
    name: "Elm Avenue Park",
    town: "delmar",
    category: "Wellness",
    tagline: "The town park that everyone actually uses.",
    about:
      "Pool, trails, fields, and the summer concert series that defines Delmar evenings from June to August.",
    why: ["Free summer concerts", "Best playground in Bethlehem", "Trail loop popular with morning runners"],
    address: "Elm Ave, Delmar, NY",
    hours: "Dawn–Dusk",
  },
];

export function getBusinessesByTown(town: string): Business[] {
  return delmarBusinesses.filter((b) => b.town === town.toLowerCase());
}

export function getBusinessBySlug(slug: string): Business | undefined {
  return delmarBusinesses.find((b) => b.slug === slug);
}
