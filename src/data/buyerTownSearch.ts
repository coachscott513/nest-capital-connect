export interface BuyerTownConfig {
  slug: string;
  name: string;
  county: string;
  cityGeoId?: string; // RealScout geo_id for map link
  neighborhoods: string;
  intro: string;
  livingSlug?: string; // /living-in/{slug}
  listingsSlug?: string; // /homes/listings/{slug}
}

export const buyerTowns: Record<string, BuyerTownConfig> = {
  albany: {
    slug: "albany",
    name: "Albany",
    county: "Albany County",
    cityGeoId: "3601000",
    neighborhoods:
      "Albany NY homes for sale, Albany multi-family, downtown Albany, Pine Hills, Center Square, New Scotland, Delaware Avenue.",
    intro:
      "Albany offers a mix of historic homes, downtown condos, multi-family properties, rental opportunities, and neighborhood-driven residential markets. Capital District Nest helps buyers search listings, understand local context, estimate cash needed, and evaluate properties before making a move.",
  },
  delmar: {
    slug: "delmar",
    name: "Delmar",
    county: "Albany County",
    neighborhoods:
      "Delmar NY homes for sale, Bethlehem NY homes, Bethlehem Central School District, living in Delmar.",
    intro:
      "Delmar is a family-oriented Bethlehem community known for the Bethlehem Central School District, walkable Delaware Avenue, and steady demand from Albany-area professionals. Capital District Nest surfaces buyer context, school info, and property tools alongside search.",
  },
  "saratoga-springs": {
    slug: "saratoga-springs",
    name: "Saratoga Springs",
    county: "Saratoga County",
    neighborhoods:
      "Saratoga Springs homes for sale, Saratoga condos, Saratoga luxury homes, downtown Saratoga.",
    intro:
      "Saratoga Springs blends downtown condos, historic Victorians, luxury estates, and racing-season demand. Capital District Nest pairs listing search with local buyer tools and Capital Region context.",
  },
  troy: {
    slug: "troy",
    name: "Troy",
    county: "Rensselaer County",
    neighborhoods:
      "Troy NY homes for sale, Troy multi-family, downtown Troy, RPI area, Lansingburgh.",
    intro:
      "Troy is a magnet for multi-family investors, downtown urban buyers, and RPI-area renters. Capital District Nest layers rental math, cash-to-buy estimates, and neighborhood context onto search.",
  },
  schenectady: {
    slug: "schenectady",
    name: "Schenectady",
    county: "Schenectady County",
    neighborhoods:
      "Schenectady homes for sale, Schenectady multi-family, Stockade, Union Street, Bellevue.",
    intro:
      "Schenectady offers attainable single-family homes, historic Stockade properties, and strong multi-family cash-flow opportunities. Search listings and evaluate deals with Capital District Nest tools.",
  },
  "clifton-park": {
    slug: "clifton-park",
    name: "Clifton Park",
    county: "Saratoga County",
    neighborhoods:
      "Clifton Park homes for sale, Shenendehowa schools, Southern Saratoga County.",
    intro:
      "Clifton Park is a top pick for Shenendehowa schools, Southern Saratoga County commuters, and family buyers. Capital District Nest surfaces listings alongside school and buyer-cost context.",
  },
  guilderland: {
    slug: "guilderland",
    name: "Guilderland",
    county: "Albany County",
    neighborhoods: "Guilderland homes for sale, Guilderland schools, Albany County suburbs.",
    intro:
      "Guilderland is an established Albany County suburb known for its school district, Route 20 corridor, and quiet residential neighborhoods. Search homes and compare buyer scenarios with Capital District Nest.",
  },
  niskayuna: {
    slug: "niskayuna",
    name: "Niskayuna",
    county: "Schenectady County",
    neighborhoods: "Niskayuna homes for sale, Niskayuna schools, Schenectady County suburbs.",
    intro:
      "Niskayuna is a Schenectady County suburb known for schools, GE-adjacent housing demand, and stable resale. Capital District Nest pairs search with buyer and investor tools.",
  },
  colonie: {
    slug: "colonie",
    name: "Colonie",
    county: "Albany County",
    neighborhoods: "Colonie NY homes for sale, Latham, Loudonville, Wolf Road, South Colonie schools.",
    intro:
      "Colonie is the Capital Region's largest suburb, spanning Latham, Loudonville, and the Wolf Road corridor. Search homes with Capital District Nest local buyer context.",
  },
  queensbury: {
    slug: "queensbury",
    name: "Queensbury",
    county: "Warren County",
    neighborhoods: "Queensbury NY homes for sale, Glens Falls area, Adirondack gateway.",
    intro:
      "Queensbury sits at the Adirondack gateway with Glens Falls-adjacent housing and lake-country appeal. Capital District Nest surfaces listings with buyer tools and local context.",
  },
  "lake-george": {
    slug: "lake-george",
    name: "Lake George",
    county: "Warren County",
    neighborhoods: "Lake George homes for sale, waterfront, Adirondack cabins, seasonal properties.",
    intro:
      "Lake George blends primary homes, seasonal cabins, and waterfront properties in the southern Adirondacks. Search listings and evaluate seasonal rental math with Capital District Nest.",
  },
};

export const buyerTownSlugs = Object.keys(buyerTowns);
