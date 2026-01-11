// Capital District Towns and Cities Data
// This centralized data structure manages all Capital District locations
// for consistent URL management and SEO optimization

export interface TownData {
  name: string;
  county: string;
  slug: string;
  type: 'city' | 'town' | 'village' | 'hamlet';
  description: string;
  keywords: string[];
  neighborhoods?: string[];
  priority: 'high' | 'medium' | 'low'; // For SEO prioritization
}

export const capitalDistrictTowns: TownData[] = [
  // Albany County - High Priority
  {
    name: "Albany",
    county: "Albany",
    slug: "albany",
    type: "city",
    description: "The capital city of New York State and heart of the Capital District",
    keywords: ["Albany NY real estate", "Albany homes for sale", "Albany investment properties", "Albany rentals"],
    neighborhoods: ["Center Square", "Pine Hills", "Helderberg", "Arbor Hill", "Delaware", "New Scotland"],
    priority: "high"
  },
  {
    name: "Bethlehem",
    county: "Albany",
    slug: "bethlehem",
    type: "town",
    description: "Affluent suburban town including Delmar, Elsmere, and Slingerlands",
    keywords: ["Bethlehem NY real estate", "Delmar homes", "Slingerlands properties", "Elsmere real estate"],
    neighborhoods: ["Delmar", "Elsmere", "Slingerlands", "Selkirk"],
    priority: "high"
  },
  {
    name: "Colonie",
    county: "Albany",
    slug: "colonie",
    type: "town",
    description: "Large suburban town with diverse neighborhoods and commercial centers",
    keywords: ["Colonie NY real estate", "Latham homes", "Loudonville properties", "Newtonville real estate"],
    neighborhoods: ["Latham", "Loudonville", "Newtonville", "Shaker Road", "McKownville"],
    priority: "high"
  },
  {
    name: "Guilderland",
    county: "Albany",
    slug: "guilderland",
    type: "town",
    description: "Growing suburban community with excellent schools",
    keywords: ["Guilderland NY real estate", "Guilderland Center homes", "Voorheesville properties"],
    neighborhoods: ["Guilderland Center", "Altamont"],
    priority: "medium"
  },

  // Schenectady County - High Priority
  {
    name: "Schenectady",
    county: "Schenectady",
    slug: "schenectady",
    type: "city",
    description: "Historic city experiencing revitalization and growth",
    keywords: ["Schenectady NY real estate", "Schenectady homes for sale", "Schenectady investment properties"],
    neighborhoods: ["Stockade", "Union College area", "Eastern Avenue", "Bellevue"],
    priority: "high"
  },
  {
    name: "Niskayuna",
    county: "Schenectady",
    slug: "niskayuna",
    type: "town",
    description: "Upscale suburban town with top-rated schools",
    keywords: ["Niskayuna NY real estate", "Niskayuna homes for sale", "Niskayuna luxury properties"],
    priority: "high"
  },
  {
    name: "Glenville",
    county: "Schenectady",
    slug: "glenville",
    type: "town",
    description: "Growing suburban community including Scotia and Burnt Hills",
    keywords: ["Glenville NY real estate", "Scotia homes", "Burnt Hills properties"],
    neighborhoods: ["Scotia", "Burnt Hills"],
    priority: "medium"
  },
  {
    name: "Rotterdam",
    county: "Schenectady",
    slug: "rotterdam",
    type: "town",
    description: "Diverse suburban town with affordable housing options",
    keywords: ["Rotterdam NY real estate", "Rotterdam homes for sale", "Rotterdam investment properties"],
    priority: "medium"
  },

  // Rensselaer County - High Priority
  {
    name: "Troy",
    county: "Rensselaer",
    slug: "troy",
    type: "city",
    description: "Historic riverfront city with Victorian architecture and growing arts scene",
    keywords: ["Troy NY real estate", "Troy homes for sale", "Troy investment properties", "Troy rentals"],
    neighborhoods: ["Downtown Troy", "Lansingburgh", "South Troy", "Wynantskill"],
    priority: "high"
  },
  {
    name: "East Greenbush",
    county: "Rensselaer",
    slug: "east-greenbush",
    type: "town",
    description: "Suburban town with family-friendly neighborhoods",
    keywords: ["East Greenbush NY real estate", "East Greenbush homes for sale"],
    priority: "medium"
  },
  {
    name: "North Greenbush",
    county: "Rensselaer",
    slug: "north-greenbush",
    type: "town",
    description: "Rural town including Wynantskill village",
    keywords: ["North Greenbush NY real estate", "Wynantskill homes"],
    neighborhoods: ["Wynantskill"],
    priority: "medium"
  },
  {
    name: "Brunswick",
    county: "Rensselaer",
    slug: "brunswick",
    type: "town",
    description: "Growing suburban town with new developments",
    keywords: ["Brunswick NY real estate", "Brunswick homes for sale"],
    priority: "medium"
  },

  // Saratoga County - High Priority
  {
    name: "Saratoga Springs",
    county: "Saratoga",
    slug: "saratoga-springs",
    type: "city",
    description: "Historic spa city known for horse racing and cultural attractions",
    keywords: ["Saratoga Springs NY real estate", "Saratoga homes for sale", "Saratoga luxury properties"],
    neighborhoods: ["Downtown Saratoga", "East Side", "West Side"],
    priority: "high"
  },
  {
    name: "Clifton Park",
    county: "Saratoga",
    slug: "clifton-park",
    type: "town",
    description: "Thriving suburban community with excellent amenities",
    keywords: ["Clifton Park NY real estate", "Clifton Park homes for sale"],
    priority: "high"
  },
  {
    name: "Ballston Spa",
    county: "Saratoga",
    slug: "ballston-spa",
    type: "village",
    description: "Charming village with historic downtown",
    keywords: ["Ballston Spa NY real estate", "Ballston Spa homes for sale"],
    priority: "medium"
  },
  {
    name: "Malta",
    county: "Saratoga",
    slug: "malta",
    type: "town",
    description: "Fast-growing town with new residential developments",
    keywords: ["Malta NY real estate", "Malta homes for sale"],
    priority: "medium"
  },
  {
    name: "Halfmoon",
    county: "Saratoga",
    slug: "halfmoon",
    type: "town",
    description: "Suburban town with mix of residential and commercial development",
    keywords: ["Halfmoon NY real estate", "Halfmoon homes for sale"],
    priority: "medium"
  },

  // Additional Albany County Towns
  {
    name: "Cohoes",
    county: "Albany",
    slug: "cohoes",
    type: "city",
    description: "Historic mill city on the Mohawk River with Cohoes Falls",
    keywords: ["Cohoes NY real estate", "Cohoes homes for sale", "Cohoes investment"],
    priority: "high"
  },
  {
    name: "Watervliet",
    county: "Albany",
    slug: "watervliet",
    type: "city",
    description: "Small city with affordable housing and high yields",
    keywords: ["Watervliet NY real estate", "Watervliet homes for sale"],
    priority: "high"
  },
  {
    name: "Green Island",
    county: "Albany",
    slug: "green-island",
    type: "village",
    description: "Small village with exceptional investment returns",
    keywords: ["Green Island NY real estate", "Green Island investment"],
    priority: "high"
  },
  {
    name: "Voorheesville",
    county: "Albany",
    slug: "voorheesville",
    type: "village",
    description: "Small village near Thacher State Park",
    keywords: ["Voorheesville NY real estate"],
    priority: "medium"
  },
  {
    name: "Latham",
    county: "Albany",
    slug: "latham",
    type: "hamlet",
    description: "Commercial hub with Newton Plaza",
    keywords: ["Latham NY real estate", "Latham homes for sale"],
    priority: "medium"
  },
  {
    name: "Loudonville",
    county: "Albany",
    slug: "loudonville",
    type: "hamlet",
    description: "Upscale neighborhood near Siena College",
    keywords: ["Loudonville NY real estate", "Loudonville luxury homes"],
    priority: "medium"
  },
  {
    name: "Menands",
    county: "Albany",
    slug: "menands",
    type: "village",
    description: "Small village with strong investment potential",
    keywords: ["Menands NY real estate"],
    priority: "medium"
  },
  {
    name: "Ravena",
    county: "Albany",
    slug: "ravena",
    type: "village",
    description: "Village with affordable properties",
    keywords: ["Ravena NY real estate"],
    priority: "medium"
  },
  {
    name: "Altamont",
    county: "Albany",
    slug: "altamont",
    type: "village",
    description: "Village home to the Altamont Fair",
    keywords: ["Altamont NY real estate"],
    priority: "medium"
  },

  // Additional Rensselaer County Towns
  {
    name: "Rensselaer",
    county: "Rensselaer",
    slug: "rensselaer",
    type: "city",
    description: "Riverfront city across from Albany with Amtrak access",
    keywords: ["Rensselaer NY real estate", "Rensselaer homes for sale"],
    priority: "high"
  },
  {
    name: "Averill Park",
    county: "Rensselaer",
    slug: "averill-park",
    type: "hamlet",
    description: "Hamlet with Crystal Lake recreation",
    keywords: ["Averill Park NY real estate", "Averill Park homes"],
    priority: "medium"
  },
  {
    name: "Wynantskill",
    county: "Rensselaer",
    slug: "wynantskill",
    type: "hamlet",
    description: "Hamlet near Burden Lake",
    keywords: ["Wynantskill NY real estate"],
    priority: "medium"
  },
  {
    name: "Schaghticoke",
    county: "Rensselaer",
    slug: "schaghticoke",
    type: "town",
    description: "Rural town with the famous fairgrounds",
    keywords: ["Schaghticoke NY real estate"],
    priority: "medium"
  },
  {
    name: "Sand Lake",
    county: "Rensselaer",
    slug: "sand-lake",
    type: "town",
    description: "Rural town including Averill Park hamlet",
    keywords: ["Sand Lake NY real estate", "Averill Park homes"],
    neighborhoods: ["Averill Park"],
    priority: "low"
  },
  {
    name: "Schodack",
    county: "Rensselaer",
    slug: "schodack",
    type: "town",
    description: "Town including Castleton-on-Hudson village",
    keywords: ["Schodack NY real estate", "Castleton-on-Hudson homes"],
    neighborhoods: ["Castleton-on-Hudson"],
    priority: "low"
  },

  // Additional Saratoga County Towns
  {
    name: "Mechanicville",
    county: "Saratoga",
    slug: "mechanicville",
    type: "city",
    description: "Small city with historic character and strong yields",
    keywords: ["Mechanicville NY real estate"],
    priority: "high"
  },
  {
    name: "Stillwater",
    county: "Saratoga",
    slug: "stillwater",
    type: "town",
    description: "Historic town with Saratoga Battlefield",
    keywords: ["Stillwater NY real estate"],
    priority: "medium"
  },
  {
    name: "Waterford",
    county: "Saratoga",
    slug: "waterford",
    type: "town",
    description: "Historic town at Flight of Locks",
    keywords: ["Waterford NY real estate"],
    priority: "medium"
  },
  {
    name: "Wilton",
    county: "Saratoga",
    slug: "wilton",
    type: "town",
    description: "Upscale suburban town",
    keywords: ["Wilton NY real estate"],
    priority: "medium"
  },
  {
    name: "Milton",
    county: "Saratoga",
    slug: "milton",
    type: "town",
    description: "Rural town with Ballston Lake",
    keywords: ["Milton NY real estate"],
    priority: "low"
  },

  // Greene County - Catskill Mountains Gateway
  {
    name: "Catskill",
    county: "Greene",
    slug: "catskill",
    type: "village",
    description: "Historic village and gateway to the Catskill Mountains",
    keywords: ["Catskill NY real estate", "Catskill homes for sale", "Catskill investment properties"],
    neighborhoods: ["Catskill Village", "Leeds", "Palenville"],
    priority: "high"
  },
  {
    name: "Coxsackie",
    county: "Greene",
    slug: "coxsackie",
    type: "village",
    description: "Riverfront village on the Hudson with strong investment potential",
    keywords: ["Coxsackie NY real estate", "Coxsackie homes for sale"],
    priority: "high"
  },
  {
    name: "Windham",
    county: "Greene",
    slug: "windham",
    type: "town",
    description: "Ski resort town in the Catskill Mountains",
    keywords: ["Windham NY real estate", "Windham ski properties", "Windham vacation homes"],
    priority: "medium"
  },
  {
    name: "Hunter",
    county: "Greene",
    slug: "hunter",
    type: "town",
    description: "Mountain town home to Hunter Mountain ski resort",
    keywords: ["Hunter NY real estate", "Hunter Mountain homes", "Hunter vacation properties"],
    priority: "medium"
  },
  {
    name: "Athens",
    county: "Greene",
    slug: "athens",
    type: "village",
    description: "Historic Hudson River village with lighthouse views",
    keywords: ["Athens NY real estate", "Athens Hudson River homes"],
    priority: "medium"
  },

  // Schoharie County - Rural Investment Corridor
  {
    name: "Schoharie",
    county: "Schoharie",
    slug: "schoharie",
    type: "village",
    description: "County seat with historic Old Stone Fort and agricultural heritage",
    keywords: ["Schoharie NY real estate", "Schoharie homes for sale"],
    priority: "high"
  },
  {
    name: "Cobleskill",
    county: "Schoharie",
    slug: "cobleskill",
    type: "village",
    description: "College town home to SUNY Cobleskill with student housing demand",
    keywords: ["Cobleskill NY real estate", "Cobleskill student housing", "SUNY Cobleskill rentals"],
    priority: "high"
  },
  {
    name: "Middleburgh",
    county: "Schoharie",
    slug: "middleburgh",
    type: "village",
    description: "Schoharie Valley village with affordable rural properties",
    keywords: ["Middleburgh NY real estate", "Middleburgh homes for sale"],
    priority: "medium"
  },
  {
    name: "Sharon Springs",
    county: "Schoharie",
    slug: "sharon-springs",
    type: "village",
    description: "Historic spa village experiencing revitalization",
    keywords: ["Sharon Springs NY real estate", "Sharon Springs historic homes"],
    priority: "medium"
  }
];

// Helper functions for URL management and SEO
export const getTownBySlug = (slug: string): TownData | undefined => {
  return capitalDistrictTowns.find(town => town.slug === slug);
};

export const getTownsByCounty = (county: string): TownData[] => {
  return capitalDistrictTowns.filter(town => town.county === county);
};

export const getTownsByPriority = (priority: 'high' | 'medium' | 'low'): TownData[] => {
  return capitalDistrictTowns.filter(town => town.priority === priority);
};

// Updated URL generation to use canonical /towns/:slug format
export const generateTownUrl = (town: TownData, type: 'real-estate' | 'rentals' = 'real-estate'): string => {
  if (type === 'rentals') {
    return `/${town.slug}-rentals`;
  }
  return `/towns/${town.slug}`;
};

export const generateCanonicalUrl = (town: TownData, type: 'real-estate' | 'rentals' = 'real-estate'): string => {
  return `https://capitaldistrictnest.com${generateTownUrl(town, type)}`;
};