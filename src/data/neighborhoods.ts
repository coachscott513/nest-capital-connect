/**
 * Micro-neighborhood / street corridor data per town.
 * Powers the NeighborhoodGuide section on /living-in/:slug and the
 * /living-in/:townSlug/:neighborhoodSlug micro-pages.
 */

export interface MicroNeighborhood {
  slug: string;
  name: string;
  townSlug: string;
  townName: string;
  county?: string;
  description: string;
  tags: string[];
  displayOrder?: number;
  imageUrl?: string;
  businessCount?: number;
  eventCount?: number;
}

export const MICRO_NEIGHBORHOODS: Record<string, MicroNeighborhood[]> = {
  albany: [
    { slug: "lark-street", name: "Lark Street", townSlug: "albany", townName: "Albany", county: "Albany County",
      description: "Restaurants, cafés, taverns, shops, wellness, and local events along one of Albany's most recognizable corridors.",
      tags: ["Dining", "Taverns", "Retail", "Events"] },
    { slug: "downtown-albany", name: "Downtown Albany", townSlug: "albany", townName: "Albany", county: "Albany County",
      description: "State capital core — government, dining, nightlife, museums, and historic architecture.",
      tags: ["Civic", "Dining", "Nightlife", "Culture"] },
    { slug: "warehouse-district", name: "Warehouse District", townSlug: "albany", townName: "Albany", county: "Albany County",
      description: "Breweries, distilleries, and loft conversions in Albany's reinvented industrial corridor.",
      tags: ["Breweries", "Loft", "Food Halls"] },
    { slug: "center-square", name: "Center Square", townSlug: "albany", townName: "Albany", county: "Albany County",
      description: "Historic brownstone neighborhood walking distance to Lark and the Capitol.",
      tags: ["Historic", "Walkable", "Residential"] },
    { slug: "pine-hills", name: "Pine Hills", townSlug: "albany", townName: "Albany", county: "Albany County",
      description: "College-town energy around Madison and Western Ave — cafés, pubs, and student housing.",
      tags: ["College", "Cafés", "Pubs"] },
    { slug: "new-scotland-avenue", name: "New Scotland Avenue", townSlug: "albany", townName: "Albany", county: "Albany County",
      description: "Medical district corridor with hospitals, services, and quiet residential pockets.",
      tags: ["Medical", "Services", "Residential"] },
  ],
  "saratoga-springs": [
    { slug: "broadway", name: "Broadway Saratoga", townSlug: "saratoga-springs", townName: "Saratoga Springs", county: "Saratoga County",
      description: "Saratoga's main street — boutiques, restaurants, hotels, and year-round events.",
      tags: ["Dining", "Retail", "Hotels", "Events"] },
    { slug: "race-course-area", name: "Saratoga Race Course Area", townSlug: "saratoga-springs", townName: "Saratoga Springs", county: "Saratoga County",
      description: "The summer epicenter — racing, hospitality, and seasonal pop-ups.",
      tags: ["Racing", "Seasonal", "Hospitality"] },
    { slug: "beekman-street-arts", name: "Beekman Street Arts District", townSlug: "saratoga-springs", townName: "Saratoga Springs", county: "Saratoga County",
      description: "Galleries, studios, indie cafés, and the city's creative core.",
      tags: ["Arts", "Galleries", "Cafés"] },
    { slug: "congress-park", name: "Congress Park Area", townSlug: "saratoga-springs", townName: "Saratoga Springs", county: "Saratoga County",
      description: "Mineral springs, museums, and historic residential streets surrounding the park.",
      tags: ["Historic", "Parks", "Museums"] },
  ],
  troy: [
    { slug: "downtown-troy", name: "Downtown Troy", townSlug: "troy", townName: "Troy", county: "Rensselaer County",
      description: "Restored 19th-century downtown packed with restaurants, bars, and music venues.",
      tags: ["Dining", "Nightlife", "Historic"] },
    { slug: "river-street", name: "River Street", townSlug: "troy", townName: "Troy", county: "Rensselaer County",
      description: "Waterfront corridor with the Troy Farmers Market, shops, and Hudson views.",
      tags: ["Waterfront", "Market", "Retail"] },
    { slug: "monument-square", name: "Monument Square", townSlug: "troy", townName: "Troy", county: "Rensselaer County",
      description: "Civic heart of Troy — gathering space for festivals, concerts, and events.",
      tags: ["Civic", "Events", "Festivals"] },
    { slug: "hoosick-street", name: "Hoosick Street Corridor", townSlug: "troy", townName: "Troy", county: "Rensselaer County",
      description: "Commercial corridor connecting Troy to Brunswick — services, retail, and dining.",
      tags: ["Retail", "Services", "Dining"] },
  ],
  schenectady: [
    { slug: "downtown-schenectady", name: "Downtown Schenectady", townSlug: "schenectady", townName: "Schenectady", county: "Schenectady County",
      description: "Proctors district — theater, restaurants, and the city's entertainment core.",
      tags: ["Theater", "Dining", "Civic"] },
    { slug: "jay-street", name: "Jay Street", townSlug: "schenectady", townName: "Schenectady", county: "Schenectady County",
      description: "Pedestrian street lined with indie shops, cafés, and small businesses.",
      tags: ["Walkable", "Retail", "Cafés"] },
    { slug: "mohawk-harbor", name: "Mohawk Harbor", townSlug: "schenectady", townName: "Schenectady", county: "Schenectady County",
      description: "Riverfront development with dining, hotel, casino, and waterfront living.",
      tags: ["Waterfront", "Dining", "Entertainment"] },
    { slug: "stockade-district", name: "Stockade District", townSlug: "schenectady", townName: "Schenectady", county: "Schenectady County",
      description: "Oldest continuously inhabited neighborhood in the U.S. — colonial homes and quiet streets.",
      tags: ["Historic", "Residential", "Walking"] },
  ],
  delmar: [
    { slug: "four-corners", name: "Four Corners Delmar", townSlug: "delmar", townName: "Delmar", county: "Albany County",
      description: "The heart of Delmar — coffee, dining, shops, and town gathering spot.",
      tags: ["Dining", "Coffee", "Retail"] },
    { slug: "delaware-avenue", name: "Delaware Avenue", townSlug: "delmar", townName: "Delmar", county: "Albany County",
      description: "The main commercial corridor connecting Delmar to Albany — services and shops.",
      tags: ["Services", "Retail", "Dining"] },
    { slug: "glenmont", name: "Glenmont", townSlug: "delmar", townName: "Delmar", county: "Albany County",
      description: "Family-friendly residential hamlet south of Delmar with newer construction.",
      tags: ["Residential", "Schools", "Family"] },
    { slug: "slingerlands", name: "Slingerlands", townSlug: "delmar", townName: "Delmar", county: "Albany County",
      description: "Established Bethlehem hamlet — large lots, top-rated schools, mature neighborhoods.",
      tags: ["Residential", "Schools", "Established"] },
  ],
  "clifton-park": [
    { slug: "clifton-park-center", name: "Clifton Park Center", townSlug: "clifton-park", townName: "Clifton Park", county: "Saratoga County",
      description: "Town center mall and surrounding retail — the commercial heart of Clifton Park.",
      tags: ["Retail", "Dining", "Services"] },
    { slug: "route-146", name: "Route 146 Corridor", townSlug: "clifton-park", townName: "Clifton Park", county: "Saratoga County",
      description: "The town's main east-west artery, lined with shops, restaurants, and services.",
      tags: ["Retail", "Dining", "Corridor"] },
    { slug: "exit-9", name: "Exit 9 Area", townSlug: "clifton-park", townName: "Clifton Park", county: "Saratoga County",
      description: "Highway-access commercial hub with hotels, restaurants, and big-box retail.",
      tags: ["Hotels", "Retail", "Dining"] },
  ],
  colonie: [
    { slug: "wolf-road", name: "Wolf Road", townSlug: "colonie", townName: "Colonie", county: "Albany County",
      description: "Capital Region's primary retail corridor — Crossgates-area dining, shopping, services.",
      tags: ["Retail", "Dining", "Services"] },
    { slug: "central-avenue", name: "Central Avenue", townSlug: "colonie", townName: "Colonie", county: "Albany County",
      description: "Historic commercial spine running from Albany through Colonie.",
      tags: ["Retail", "Auto", "Services"] },
    { slug: "latham-circle", name: "Latham Circle", townSlug: "colonie", townName: "Colonie", county: "Albany County",
      description: "Northern Colonie commercial hub at the I-87/Route 9 junction.",
      tags: ["Retail", "Dining", "Hub"] },
    { slug: "loudonville", name: "Loudonville", townSlug: "colonie", townName: "Colonie", county: "Albany County",
      description: "Upscale residential hamlet with tree-lined streets and Siena College nearby.",
      tags: ["Residential", "Upscale", "Schools"] },
  ],
  niskayuna: [
    { slug: "upper-union-street", name: "Upper Union Street", townSlug: "niskayuna", townName: "Niskayuna", county: "Schenectady County",
      description: "Walkable neighborhood corridor with cafés, small shops, and community gathering.",
      tags: ["Walkable", "Cafés", "Retail"] },
    { slug: "town-center", name: "Niskayuna Town Center", townSlug: "niskayuna", townName: "Niskayuna", county: "Schenectady County",
      description: "Civic and retail center — services, dining, and town offices.",
      tags: ["Civic", "Retail", "Services"] },
    { slug: "balltown-road", name: "Balltown Road Corridor", townSlug: "niskayuna", townName: "Niskayuna", county: "Schenectady County",
      description: "Main north-south corridor with established residential and retail mix.",
      tags: ["Retail", "Residential", "Corridor"] },
  ],
};

export function getNeighborhoodsForTown(townSlug: string): MicroNeighborhood[] {
  return MICRO_NEIGHBORHOODS[townSlug.toLowerCase()] ?? [];
}

export function findNeighborhood(townSlug: string, neighborhoodSlug: string): MicroNeighborhood | undefined {
  return getNeighborhoodsForTown(townSlug).find((n) => n.slug === neighborhoodSlug.toLowerCase());
}
