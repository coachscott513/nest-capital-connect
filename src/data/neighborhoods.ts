/**
 * Micro-neighborhood / street corridor data per town.
 * Powers:
 *  - <NeighborhoodGuide /> on /living-in/:slug
 *  - /living-in/:townSlug/:neighborhoodSlug micro-pages (legacy alias)
 *  - /neighborhoods (NeighborhoodsHub)
 *  - /neighborhoods/:slug (NeighborhoodDetail — canonical)
 *  - Homepage <NeighborhoodExplorer /> section
 */

export type NeighborhoodType =
  | "street"
  | "corridor"
  | "downtown"
  | "district"
  | "village-center"
  | "neighborhood";

export type NeighborhoodStatus = "live" | "building" | "coming_soon";

export interface MicroNeighborhood {
  slug: string;
  name: string;
  townSlug: string;
  townName: string;
  county?: string;
  countySlug?: string;
  type?: NeighborhoodType;
  description: string;
  tags: string[];
  displayOrder?: number;
  imageUrl?: string;
  businessCount?: number;
  eventCount?: number;
  /** Legacy: kept for backward compat. Prefer `homepageFeatured`. */
  featured?: boolean;
  /** Lifecycle status — drives badges, CTAs, and SEO indexing. */
  status?: NeighborhoodStatus;
  /** Show in the homepage featured rail (max 6). */
  homepageFeatured?: boolean;
  /** Order within the homepage rail. */
  homepageOrder?: number;
}

export const MICRO_NEIGHBORHOODS: Record<string, MicroNeighborhood[]> = {
  albany: [
    { slug: "lark-street", name: "Lark Street", townSlug: "albany", townName: "Albany", county: "Albany County", countySlug: "albany", type: "corridor",
      status: "live", homepageFeatured: true, homepageOrder: 1, featured: true,
      description: "Restaurants, taverns, cafés, shops, wellness, services, and events along one of Albany's most recognizable corridors.",
      tags: ["Dining", "Taverns", "Retail", "Events"] },
    { slug: "downtown-albany", name: "Downtown Albany", townSlug: "albany", townName: "Albany", county: "Albany County", countySlug: "albany", type: "downtown",
      status: "building",
      description: "State capital core — government, dining, nightlife, museums, and historic architecture.",
      tags: ["Civic", "Dining", "Nightlife", "Culture"] },
    { slug: "warehouse-district", name: "Warehouse District", townSlug: "albany", townName: "Albany", county: "Albany County", countySlug: "albany", type: "district",
      status: "coming_soon",
      description: "Breweries, distilleries, and loft conversions in Albany's reinvented industrial corridor.",
      tags: ["Breweries", "Loft", "Food Halls"] },
    { slug: "center-square", name: "Center Square", townSlug: "albany", townName: "Albany", county: "Albany County", countySlug: "albany", type: "neighborhood",
      status: "coming_soon",
      description: "Historic brownstone neighborhood walking distance to Lark and the Capitol.",
      tags: ["Historic", "Walkable", "Residential"] },
    { slug: "pine-hills", name: "Pine Hills", townSlug: "albany", townName: "Albany", county: "Albany County", countySlug: "albany", type: "neighborhood",
      status: "building",
      description: "College-town energy around Madison and Western Ave — cafés, pubs, and student housing.",
      tags: ["College", "Cafés", "Pubs"] },
    { slug: "new-scotland-avenue", name: "New Scotland Avenue", townSlug: "albany", townName: "Albany", county: "Albany County", countySlug: "albany", type: "corridor",
      status: "building",
      description: "Medical district corridor with hospitals, services, and quiet residential pockets.",
      tags: ["Medical", "Services", "Residential"] },
  ],
  "saratoga-springs": [
    { slug: "broadway-saratoga", name: "Broadway Saratoga", townSlug: "saratoga-springs", townName: "Saratoga Springs", county: "Saratoga County", countySlug: "saratoga", type: "corridor",
      status: "building", homepageFeatured: true, homepageOrder: 2, featured: true,
      description: "Dining, shopping, hotels, nightlife, galleries, events, and local businesses in the heart of Saratoga Springs.",
      tags: ["Dining", "Retail", "Hotels", "Events"] },
    { slug: "race-course-area", name: "Saratoga Race Course Area", townSlug: "saratoga-springs", townName: "Saratoga Springs", county: "Saratoga County", countySlug: "saratoga", type: "district",
      status: "building",
      description: "The summer epicenter — racing, hospitality, and seasonal pop-ups.",
      tags: ["Racing", "Seasonal", "Hospitality"] },
    { slug: "beekman-street-arts", name: "Beekman Street Arts District", townSlug: "saratoga-springs", townName: "Saratoga Springs", county: "Saratoga County", countySlug: "saratoga", type: "district",
      status: "building",
      description: "Galleries, studios, indie cafés, and the city's creative core.",
      tags: ["Arts", "Galleries", "Cafés"] },
    { slug: "congress-park", name: "Congress Park Area", townSlug: "saratoga-springs", townName: "Saratoga Springs", county: "Saratoga County", countySlug: "saratoga", type: "district",
      status: "building",
      description: "Mineral springs, museums, and historic residential streets surrounding the park.",
      tags: ["Historic", "Parks", "Museums"] },
  ],
  troy: [
    { slug: "downtown-troy", name: "Downtown Troy", townSlug: "troy", townName: "Troy", county: "Rensselaer County", countySlug: "rensselaer", type: "downtown",
      status: "building", homepageFeatured: true, homepageOrder: 3, featured: true,
      description: "Riverfront dining, markets, shops, offices, apartments, events, and creative spaces in one of the region's most active downtowns.",
      tags: ["Dining", "Nightlife", "Historic"] },
    { slug: "river-street", name: "River Street", townSlug: "troy", townName: "Troy", county: "Rensselaer County", countySlug: "rensselaer", type: "street",
      status: "building",
      description: "Waterfront corridor with the Troy Farmers Market, shops, and Hudson views.",
      tags: ["Waterfront", "Market", "Retail"] },
    { slug: "monument-square", name: "Monument Square", townSlug: "troy", townName: "Troy", county: "Rensselaer County", countySlug: "rensselaer", type: "district",
      status: "building",
      description: "Civic heart of Troy — gathering space for festivals, concerts, and events.",
      tags: ["Civic", "Events", "Festivals"] },
    { slug: "hoosick-street", name: "Hoosick Street Corridor", townSlug: "troy", townName: "Troy", county: "Rensselaer County", countySlug: "rensselaer", type: "corridor",
      status: "building",
      description: "Commercial corridor connecting Troy to Brunswick — services, retail, and dining.",
      tags: ["Retail", "Services", "Dining"] },
  ],
  schenectady: [
    { slug: "downtown-schenectady", name: "Downtown Schenectady", townSlug: "schenectady", townName: "Schenectady", county: "Schenectady County", countySlug: "schenectady", type: "downtown",
      status: "building",
      description: "Proctors district — theater, restaurants, and the city's entertainment core.",
      tags: ["Theater", "Dining", "Civic"] },
    { slug: "jay-street", name: "Jay Street", townSlug: "schenectady", townName: "Schenectady", county: "Schenectady County", countySlug: "schenectady", type: "street",
      status: "building", homepageFeatured: true, homepageOrder: 4, featured: true,
      description: "Restaurants, arts, entertainment, retail, and local experiences near downtown Schenectady.",
      tags: ["Walkable", "Retail", "Cafés"] },
    { slug: "mohawk-harbor", name: "Mohawk Harbor", townSlug: "schenectady", townName: "Schenectady", county: "Schenectady County", countySlug: "schenectady", type: "district",
      status: "coming_soon",
      description: "Riverfront development with dining, hotel, casino, and waterfront living.",
      tags: ["Waterfront", "Dining", "Entertainment"] },
    { slug: "stockade-district", name: "Stockade District", townSlug: "schenectady", townName: "Schenectady", county: "Schenectady County", countySlug: "schenectady", type: "district",
      status: "building",
      description: "Oldest continuously inhabited neighborhood in the U.S. — colonial homes and quiet streets.",
      tags: ["Historic", "Residential", "Walking"] },
  ],
  delmar: [
    { slug: "four-corners-delmar", name: "Four Corners Delmar", townSlug: "delmar", townName: "Delmar", county: "Albany County", countySlug: "albany", type: "village-center",
      status: "building", homepageFeatured: true, homepageOrder: 5, featured: true,
      description: "Local dining, services, shops, and neighborhood life in the center of Delmar.",
      tags: ["Dining", "Coffee", "Retail"] },
    { slug: "delaware-avenue", name: "Delaware Avenue", townSlug: "delmar", townName: "Delmar", county: "Albany County", countySlug: "albany", type: "corridor",
      status: "building",
      description: "The main commercial corridor connecting Delmar to Albany — services and shops.",
      tags: ["Services", "Retail", "Dining"] },
    { slug: "glenmont", name: "Glenmont", townSlug: "delmar", townName: "Delmar", county: "Albany County", countySlug: "albany", type: "neighborhood",
      status: "building",
      description: "Family-friendly residential hamlet south of Delmar with newer construction.",
      tags: ["Residential", "Schools", "Family"] },
    { slug: "slingerlands", name: "Slingerlands", townSlug: "delmar", townName: "Delmar", county: "Albany County", countySlug: "albany", type: "neighborhood",
      status: "building",
      description: "Established Bethlehem hamlet — large lots, top-rated schools, mature neighborhoods.",
      tags: ["Residential", "Schools", "Established"] },
  ],
  "clifton-park": [
    { slug: "clifton-park-center", name: "Clifton Park Center", townSlug: "clifton-park", townName: "Clifton Park", county: "Saratoga County", countySlug: "saratoga", type: "district",
      status: "building",
      description: "Town center mall and surrounding retail — the commercial heart of Clifton Park.",
      tags: ["Retail", "Dining", "Services"] },
    { slug: "route-146", name: "Route 146 Corridor", townSlug: "clifton-park", townName: "Clifton Park", county: "Saratoga County", countySlug: "saratoga", type: "corridor",
      status: "building",
      description: "The town's main east-west artery, lined with shops, restaurants, and services.",
      tags: ["Retail", "Dining", "Corridor"] },
    { slug: "exit-9", name: "Exit 9 Area", townSlug: "clifton-park", townName: "Clifton Park", county: "Saratoga County", countySlug: "saratoga", type: "district",
      status: "building",
      description: "Highway-access commercial hub with hotels, restaurants, and big-box retail.",
      tags: ["Hotels", "Retail", "Dining"] },
  ],
  colonie: [
    { slug: "wolf-road", name: "Wolf Road", townSlug: "colonie", townName: "Colonie", county: "Albany County", countySlug: "albany", type: "corridor",
      status: "building", homepageFeatured: true, homepageOrder: 6, featured: true,
      description: "Hotels, restaurants, retail, offices, services, and regional business activity along one of the Capital District's busiest corridors.",
      tags: ["Retail", "Dining", "Services"] },
    { slug: "central-avenue", name: "Central Avenue", townSlug: "colonie", townName: "Colonie", county: "Albany County", countySlug: "albany", type: "corridor",
      status: "building",
      description: "Historic commercial spine running from Albany through Colonie.",
      tags: ["Retail", "Auto", "Services"] },
    { slug: "latham-circle", name: "Latham Circle", townSlug: "colonie", townName: "Colonie", county: "Albany County", countySlug: "albany", type: "district",
      status: "building",
      description: "Northern Colonie commercial hub at the I-87/Route 9 junction.",
      tags: ["Retail", "Dining", "Hub"] },
    { slug: "loudonville", name: "Loudonville", townSlug: "colonie", townName: "Colonie", county: "Albany County", countySlug: "albany", type: "neighborhood",
      status: "building",
      description: "Upscale residential hamlet with tree-lined streets and Siena College nearby.",
      tags: ["Residential", "Upscale", "Schools"] },
  ],
  niskayuna: [
    { slug: "upper-union-street", name: "Upper Union Street", townSlug: "niskayuna", townName: "Niskayuna", county: "Schenectady County", countySlug: "schenectady", type: "street",
      status: "building",
      description: "Walkable neighborhood corridor with cafés, small shops, and community gathering.",
      tags: ["Walkable", "Cafés", "Retail"] },
    { slug: "town-center", name: "Niskayuna Town Center", townSlug: "niskayuna", townName: "Niskayuna", county: "Schenectady County", countySlug: "schenectady", type: "district",
      status: "building",
      description: "Civic and retail center — services, dining, and town offices.",
      tags: ["Civic", "Retail", "Services"] },
    { slug: "balltown-road", name: "Balltown Road Corridor", townSlug: "niskayuna", townName: "Niskayuna", county: "Schenectady County", countySlug: "schenectady", type: "corridor",
      status: "building",
      description: "Main north-south corridor with established residential and retail mix.",
      tags: ["Retail", "Residential", "Corridor"] },
  ],
  guilderland: [
    { slug: "stuyvesant-plaza", name: "Stuyvesant Plaza", townSlug: "guilderland", townName: "Guilderland", county: "Albany County", countySlug: "albany", type: "district",
      status: "coming_soon",
      description: "Open-air shopping plaza with independent boutiques, restaurants, and services on Western Avenue.",
      tags: ["Retail", "Dining", "Boutiques"] },
  ],
  "lake-george": [
    { slug: "lake-george-village", name: "Lake George Village", townSlug: "lake-george", townName: "Lake George", county: "Warren County", countySlug: "warren", type: "village-center",
      status: "coming_soon",
      description: "Lakefront village — hotels, dining, boat tours, summer events, and Adirondack gateway.",
      tags: ["Lakefront", "Hotels", "Tourism", "Events"] },
  ],
  "glens-falls": [
    { slug: "downtown-glens-falls", name: "Downtown Glens Falls", townSlug: "glens-falls", townName: "Glens Falls", county: "Warren County", countySlug: "warren", type: "downtown",
      status: "coming_soon",
      description: "Walkable downtown with restaurants, galleries, the Wood Theater, and a growing arts scene.",
      tags: ["Dining", "Arts", "Walkable"] },
  ],
};

export const COUNTIES: Array<{
  slug: string;
  name: string;
  towns: string[];
  featured: string[];
  description: string;
}> = [
  {
    slug: "albany",
    name: "Albany County",
    towns: ["Albany", "Delmar", "Colonie", "Guilderland", "Latham", "Voorheesville"],
    featured: ["Lark Street", "Center Square", "Four Corners Delmar", "Wolf Road"],
    description: "State capital county — historic neighborhoods, suburbs, and the region's busiest retail corridors.",
  },
  {
    slug: "saratoga",
    name: "Saratoga County",
    towns: ["Saratoga Springs", "Clifton Park", "Ballston Spa", "Mechanicville"],
    featured: ["Broadway Saratoga", "Beekman Street Arts", "Clifton Park Center"],
    description: "Racing, springs, and the fastest-growing communities in the Capital Region.",
  },
  {
    slug: "schenectady",
    name: "Schenectady County",
    towns: ["Schenectady", "Niskayuna", "Rotterdam", "Scotia"],
    featured: ["Jay Street", "Mohawk Harbor", "Stockade District", "Upper Union Street"],
    description: "Proctors, GE history, Mohawk waterfront, and walkable neighborhoods.",
  },
  {
    slug: "rensselaer",
    name: "Rensselaer County",
    towns: ["Troy", "East Greenbush", "Brunswick", "Rensselaer"],
    featured: ["Downtown Troy", "River Street", "Monument Square"],
    description: "Hudson waterfront, restored 19th-century downtown, and a thriving food scene.",
  },
  {
    slug: "warren",
    name: "Warren County",
    towns: ["Queensbury", "Glens Falls", "Lake George"],
    featured: ["Downtown Glens Falls", "Lake George Village", "Aviation Mall Area"],
    description: "Gateway to the Adirondacks — lake life, ski country, and growing year-round downtowns.",
  },
];

export function getNeighborhoodsForTown(townSlug: string): MicroNeighborhood[] {
  return MICRO_NEIGHBORHOODS[townSlug.toLowerCase()] ?? [];
}

export function findNeighborhood(townSlug: string, neighborhoodSlug: string): MicroNeighborhood | undefined {
  return getNeighborhoodsForTown(townSlug).find((n) => n.slug === neighborhoodSlug.toLowerCase());
}

export function getAllNeighborhoods(): MicroNeighborhood[] {
  return Object.values(MICRO_NEIGHBORHOODS).flat();
}

export function findNeighborhoodBySlug(slug: string): MicroNeighborhood | undefined {
  const s = slug.toLowerCase();
  return getAllNeighborhoods().find((n) => n.slug === s);
}

export function getNeighborhoodsByCounty(countySlug: string): MicroNeighborhood[] {
  const s = countySlug.toLowerCase();
  return getAllNeighborhoods().filter((n) => n.countySlug === s);
}

const STATUS_RANK: Record<NeighborhoodStatus, number> = {
  live: 0,
  building: 1,
  coming_soon: 2,
};

export function sortByStatus(list: MicroNeighborhood[]): MicroNeighborhood[] {
  return [...list].sort((a, b) => {
    const sa = STATUS_RANK[a.status ?? "building"];
    const sb = STATUS_RANK[b.status ?? "building"];
    if (sa !== sb) return sa - sb;
    const oa = a.homepageOrder ?? a.displayOrder ?? 999;
    const ob = b.homepageOrder ?? b.displayOrder ?? 999;
    return oa - ob;
  });
}

/** Strict 6-card homepage rail: only neighborhoods explicitly opted in. */
export function getHomepageFeaturedNeighborhoods(limit = 6): MicroNeighborhood[] {
  return sortByStatus(getAllNeighborhoods().filter((n) => n.homepageFeatured)).slice(0, limit);
}

/** Legacy helper — kept for backward compatibility. */
export function getFeaturedNeighborhoods(): MicroNeighborhood[] {
  return getHomepageFeaturedNeighborhoods();
}

export interface StatusMeta {
  label: string;
  primaryCta: string;
  primaryHref: (n: MicroNeighborhood) => string;
  secondaryCta?: string;
  secondaryHref?: (n: MicroNeighborhood) => string;
  dotClass: string;
  badgeClass: string;
}

export function statusMeta(status: NeighborhoodStatus): StatusMeta {
  switch (status) {
    case "live":
      return {
        label: "Live Guide",
        primaryCta: "Explore",
        primaryHref: (n) => `/neighborhoods/${n.slug}`,
        dotClass: "bg-[#5eead4]",
        badgeClass: "border-[#5eead4]/40 text-[#5eead4] bg-[#5eead4]/10",
      };
    case "building":
      return {
        label: "Building Now",
        primaryCta: "Preview Guide",
        primaryHref: (n) => `/neighborhoods/${n.slug}`,
        secondaryCta: "Add Your Business",
        secondaryHref: (n) =>
          `/claim-business?neighborhood=${n.slug}&town=${n.townSlug}`,
        dotClass: "bg-amber-300",
        badgeClass: "border-amber-300/40 text-amber-200 bg-amber-300/10",
      };
    case "coming_soon":
    default:
      return {
        label: "Coming Soon",
        primaryCta: "Suggest a Business",
        primaryHref: (n) =>
          `/claim-business?neighborhood=${n.slug}&town=${n.townSlug}&intent=suggest-business`,
        secondaryCta: "Request This Neighborhood",
        secondaryHref: (n) =>
          `/submit-event?intent=neighborhood-suggestion&neighborhood=${n.slug}&town=${n.townSlug}`,
        dotClass: "bg-white/40",
        badgeClass: "border-white/20 text-white/70 bg-white/[0.05]",
      };
  }
}
