// Shared Capital District county directory.
// Single source of truth for /communities and any town-page fallback lookups.

export type CDTown = { name: string; slug: string; median: string };
export type CDCounty = { name: string; landmark: string; towns: CDTown[] };

export const CAPITAL_DISTRICT_COUNTIES: CDCounty[] = [
  {
    name: "Albany County",
    landmark: "Empire State Plaza · NYS Capitol",
    towns: [
      { name: "Albany", slug: "albany", median: "$245K" },
      { name: "Bethlehem", slug: "bethlehem", median: "$455K" },
      { name: "Berne", slug: "berne", median: "$295K" },
      { name: "Coeymans", slug: "coeymans", median: "$255K" },
      { name: "Cohoes", slug: "cohoes", median: "$235K" },
      { name: "Colonie", slug: "colonie", median: "$315K" },
      { name: "Delmar", slug: "delmar", median: "$470K" },
      { name: "Green Island", slug: "green-island", median: "$215K" },
      { name: "Guilderland", slug: "guilderland", median: "$385K" },
      { name: "Knox", slug: "knox", median: "$285K" },
      { name: "Latham", slug: "latham", median: "$345K" },
      { name: "New Scotland", slug: "new-scotland", median: "$395K" },
      { name: "Rensselaerville", slug: "rensselaerville", median: "$275K" },
      { name: "Watervliet", slug: "watervliet", median: "$225K" },
      { name: "Westerlo", slug: "westerlo", median: "$265K" },
    ],
  },
  {
    name: "Saratoga County",
    landmark: "Saratoga Race Course · SPAC",
    towns: [
      { name: "Ballston Spa", slug: "ballston-spa", median: "$345K" },
      { name: "Charlton", slug: "charlton", median: "$425K" },
      { name: "Clifton Park", slug: "clifton-park", median: "$395K" },
      { name: "Corinth", slug: "corinth", median: "$245K" },
      { name: "Galway", slug: "galway", median: "$315K" },
      { name: "Greenfield", slug: "greenfield", median: "$355K" },
      { name: "Halfmoon", slug: "halfmoon", median: "$385K" },
      { name: "Malta", slug: "malta", median: "$425K" },
      { name: "Mechanicville", slug: "mechanicville", median: "$235K" },
      { name: "Milton", slug: "milton", median: "$335K" },
      { name: "Moreau", slug: "moreau", median: "$285K" },
      { name: "Providence", slug: "providence", median: "$265K" },
      { name: "Saratoga Springs", slug: "saratoga-springs", median: "$625K" },
      { name: "Stillwater", slug: "stillwater", median: "$345K" },
      { name: "Waterford", slug: "waterford", median: "$265K" },
      { name: "Wilton", slug: "wilton", median: "$475K" },
    ],
  },
  {
    name: "Rensselaer County",
    landmark: "RPI · Hudson Riverfront",
    towns: [
      { name: "Berlin", slug: "berlin", median: "$215K" },
      { name: "Brunswick", slug: "brunswick", median: "$365K" },
      { name: "East Greenbush", slug: "east-greenbush", median: "$375K" },
      { name: "Hoosick", slug: "hoosick", median: "$235K" },
      { name: "Nassau", slug: "nassau", median: "$295K" },
      { name: "North Greenbush", slug: "north-greenbush", median: "$345K" },
      { name: "Petersburg", slug: "petersburg", median: "$225K" },
      { name: "Pittstown", slug: "pittstown", median: "$285K" },
      { name: "Poestenkill", slug: "poestenkill", median: "$345K" },
      { name: "Rensselaer", slug: "rensselaer", median: "$255K" },
      { name: "Sand Lake", slug: "sand-lake", median: "$315K" },
      { name: "Schaghticoke", slug: "schaghticoke", median: "$265K" },
      { name: "Schodack", slug: "schodack", median: "$335K" },
      { name: "Stephentown", slug: "stephentown", median: "$245K" },
      { name: "Troy", slug: "troy", median: "$265K" },
    ],
  },
  {
    name: "Schenectady County",
    landmark: "Stockade District · Proctors Theatre",
    towns: [
      { name: "Duanesburg", slug: "duanesburg", median: "$295K" },
      { name: "Glenville", slug: "glenville", median: "$295K" },
      { name: "Niskayuna", slug: "niskayuna", median: "$365K" },
      { name: "Princetown", slug: "princetown", median: "$275K" },
      { name: "Rotterdam", slug: "rotterdam", median: "$245K" },
      { name: "Schenectady", slug: "schenectady", median: "$215K" },
    ],
  },
  {
    name: "Schoharie County",
    landmark: "Howe Caverns · Schoharie Valley",
    towns: [
      { name: "Cobleskill", slug: "cobleskill", median: "$215K" },
      { name: "Esperance", slug: "esperance", median: "$235K" },
      { name: "Jefferson", slug: "jefferson", median: "$225K" },
      { name: "Middleburgh", slug: "middleburgh", median: "$205K" },
      { name: "Schoharie", slug: "schoharie", median: "$225K" },
      { name: "Sharon Springs", slug: "sharon-springs", median: "$215K" },
      { name: "Summit", slug: "summit", median: "$195K" },
      { name: "Wright", slug: "wright", median: "$235K" },
    ],
  },
  {
    name: "Fulton County",
    landmark: "Great Sacandaga Lake · Adirondack Foothills",
    towns: [
      { name: "Broadalbin", slug: "broadalbin", median: "$215K" },
      { name: "Caroga Lake", slug: "caroga-lake", median: "$245K" },
      { name: "Gloversville", slug: "gloversville", median: "$135K" },
      { name: "Johnstown", slug: "johnstown", median: "$165K" },
      { name: "Mayfield", slug: "mayfield", median: "$225K" },
      { name: "Northville", slug: "northville", median: "$235K" },
    ],
  },
  {
    name: "Montgomery County",
    landmark: "Mohawk Valley · Erie Canal Heritage",
    towns: [
      { name: "Amsterdam", slug: "amsterdam", median: "$155K" },
      { name: "Canajoharie", slug: "canajoharie", median: "$165K" },
      { name: "Fonda", slug: "fonda", median: "$175K" },
      { name: "Fort Plain", slug: "fort-plain", median: "$155K" },
      { name: "Palatine Bridge", slug: "palatine-bridge", median: "$185K" },
      { name: "St. Johnsville", slug: "st-johnsville", median: "$145K" },
    ],
  },
];

export type CountyTownLookup = {
  name: string;
  slug: string;
  county: string;
  countyLandmark: string;
  median: string;
  nearby: { name: string; slug: string }[];
};

const lookup = new Map<string, CountyTownLookup>();
for (const c of CAPITAL_DISTRICT_COUNTIES) {
  for (const t of c.towns) {
    lookup.set(t.slug, {
      name: t.name,
      slug: t.slug,
      county: c.name,
      countyLandmark: c.landmark,
      median: t.median,
      nearby: c.towns.filter((x) => x.slug !== t.slug).slice(0, 5).map((x) => ({ name: x.name, slug: x.slug })),
    });
  }
}

export const findTownInDirectory = (slug: string): CountyTownLookup | undefined =>
  lookup.get(slug);
