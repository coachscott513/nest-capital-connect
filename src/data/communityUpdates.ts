/**
 * Community Updates — editorial module for every town.
 *
 * Architecture: This file is the local content source AND the shape used by
 * the future `community_updates` Supabase table + municipality submission
 * portal. Adding a DB backend later means swapping the loader in
 * `useCommunityUpdates` to read from Supabase and merging with this static
 * fallback. All consumers already read via the hook, so no page needs to
 * change when that switch happens.
 *
 * Editorial rule: Community-first, non-political. Announcements, projects,
 * public services, civic programs — no candidates, no endorsements.
 */

export type CommunityUpdateDepartment =
  | "Town Hall"
  | "Village Hall"
  | "Mayor"
  | "Town Supervisor"
  | "Economic Development"
  | "Parks & Recreation"
  | "Public Works"
  | "Community Projects"
  | "Farmers Market"
  | "Library"
  | "Senior Services"
  | "Youth Programs"
  | "Public Safety"
  | "Volunteer"
  | "Community Event"
  | "School District"
  | "Chamber of Commerce";

export type CommunityUpdateContributorType =
  | "municipality"
  | "library"
  | "chamber"
  | "school_district"
  | "parks_department"
  | "community_org"
  | "editorial";

export interface CommunityUpdate {
  id: string;
  townSlug: string;           // matches /living-in/:townSlug
  townName: string;
  headline: string;
  summary: string;
  department: CommunityUpdateDepartment;
  contributorType: CommunityUpdateContributorType;
  source: string;             // e.g. "Town of Bethlehem"
  publishedDate: string;      // ISO
  image?: string;
  officialLink?: string;
  verified?: boolean;         // shown as badge
  tags?: string[];
}

/**
 * Editorial seed content. Keep entries short, factual, non-political.
 * When a municipality onboards, migrate their items to the DB and delete
 * or archive the corresponding editorial rows here.
 */
export const communityUpdates: CommunityUpdate[] = [
  {
    id: "delmar-farmers-market-2026",
    townSlug: "delmar",
    townName: "Delmar",
    headline: "Delmar Farmers Market returns for the 2026 season",
    summary:
      "Weekly outdoor market featuring Capital District farms, bakers, and makers. Saturdays at the Bethlehem Central Middle School lot.",
    department: "Farmers Market",
    contributorType: "community_org",
    source: "Delmar Farmers Market",
    publishedDate: "2026-05-01",
    officialLink: "https://delmarmarket.org",
    verified: false,
    tags: ["market", "weekend"],
  },
  {
    id: "delmar-library-summer-programs",
    townSlug: "delmar",
    townName: "Delmar",
    headline: "Bethlehem Public Library announces summer youth programs",
    summary:
      "Reading challenges, STEM workshops, and family movie nights running June through August. Registration opens in late May.",
    department: "Library",
    contributorType: "library",
    source: "Bethlehem Public Library",
    publishedDate: "2026-05-06",
    officialLink: "https://bethlehempubliclibrary.org",
    verified: false,
    tags: ["youth", "library"],
  },
  {
    id: "albany-park-improvements",
    townSlug: "albany",
    townName: "Albany",
    headline: "Washington Park improvement projects scheduled for summer",
    summary:
      "Pathway resurfacing and lighting upgrades will roll out in phases. Most areas of the park remain open during construction.",
    department: "Parks & Recreation",
    contributorType: "parks_department",
    source: "City of Albany",
    publishedDate: "2026-05-04",
    officialLink: "https://www.albanyny.gov",
    verified: false,
    tags: ["parks", "infrastructure"],
  },
  {
    id: "troy-downtown-initiative",
    townSlug: "troy",
    townName: "Troy",
    headline: "Downtown Troy small-business initiative expands storefront grants",
    summary:
      "A new round of matching grants supports facade improvements and signage for independent Troy retailers.",
    department: "Economic Development",
    contributorType: "municipality",
    source: "City of Troy",
    publishedDate: "2026-05-03",
    officialLink: "https://www.troyny.gov",
    verified: false,
    tags: ["small business", "downtown"],
  },
  {
    id: "saratoga-springs-road-work",
    townSlug: "saratoga-springs",
    townName: "Saratoga Springs",
    headline: "Broadway paving schedule announced for early summer",
    summary:
      "Nightly milling and paving with rolling lane closures. Expect delays on Broadway between Congress and Van Dam.",
    department: "Public Works",
    contributorType: "municipality",
    source: "City of Saratoga Springs",
    publishedDate: "2026-05-02",
    officialLink: "https://www.saratoga-springs.org",
    verified: false,
    tags: ["road work"],
  },
  {
    id: "schenectady-senior-programs",
    townSlug: "schenectady",
    townName: "Schenectady",
    headline: "Senior Center opens summer wellness series",
    summary:
      "Free classes covering nutrition, walking programs, and technology basics for older adults. Weekly through August.",
    department: "Senior Services",
    contributorType: "community_org",
    source: "Schenectady Senior Center",
    publishedDate: "2026-05-05",
    verified: false,
    tags: ["seniors", "wellness"],
  },
  {
    id: "niskayuna-volunteer-day",
    townSlug: "niskayuna",
    townName: "Niskayuna",
    headline: "Town-wide volunteer day scheduled at community parks",
    summary:
      "Residents can sign up for morning cleanup shifts at Blatnick Park and Craig Elementary trails.",
    department: "Volunteer",
    contributorType: "municipality",
    source: "Town of Niskayuna",
    publishedDate: "2026-05-07",
    officialLink: "https://www.niskayuna.org",
    verified: false,
    tags: ["volunteer"],
  },
  {
    id: "clifton-park-public-safety",
    townSlug: "clifton-park",
    townName: "Clifton Park",
    headline: "Clifton Park issues seasonal reminder on trail and bike safety",
    summary:
      "Public safety notice ahead of peak trail season covering helmet use, night visibility, and shared-path etiquette.",
    department: "Public Safety",
    contributorType: "municipality",
    source: "Town of Clifton Park",
    publishedDate: "2026-05-06",
    verified: false,
    tags: ["safety"],
  },
];

export function getCommunityUpdatesByTown(townSlug: string): CommunityUpdate[] {
  const slug = townSlug.toLowerCase();
  return communityUpdates
    .filter((u) => u.townSlug.toLowerCase() === slug)
    .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
}

export function getAllCommunityUpdates(): CommunityUpdate[] {
  return [...communityUpdates].sort((a, b) =>
    a.publishedDate < b.publishedDate ? 1 : -1,
  );
}

export function getTownSlugsWithUpdates(): string[] {
  return Array.from(new Set(communityUpdates.map((u) => u.townSlug)));
}
