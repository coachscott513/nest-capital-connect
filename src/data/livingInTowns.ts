/**
 * Reusable Town Page data — drives every /living-in-{slug} page.
 * Edit this file weekly to refresh content. No code changes needed.
 *
 * Structure:
 *   townName, slug, county, township, zip, schoolDistrict
 *   updatedDate          → "May 7, 2026"
 *   listingSearchUrl     → direct IDX link
 *   listingEmbedUrl?     → iframe src (defaults to listingSearchUrl)
 *   weeklyUpdates[4]     → curated cards
 *   featuredBusiness     → ONE spotlight per town
 *   events[3]            → community/this week
 *   essentials[]         → 6–8 official local resource links
 *   nearbyTowns[]        → internal links to other /living-in slugs
 *   seoTitle, seoDescription, seoIntro
 */

export type WeeklyUpdateType = "listings" | "sold" | "business" | "event";

export interface WeeklyUpdate {
  type: WeeklyUpdateType;
  title: string;
  description: string;
  date: string;
}

export interface FeaturedBusinessLite {
  name: string;
  category: string;
  tagline: string;
  phone?: string;
  website?: string;
  address?: string;
}

export interface TownEvent {
  title: string;
  date: string;
  description: string;
}

export type EssentialIcon =
  | "townHall"
  | "tax"
  | "permit"
  | "school"
  | "trash"
  | "utility"
  | "dmv"
  | "safety";

export interface Essential {
  icon: EssentialIcon;
  title: string;
  description: string;
  href: string;
}

export interface NearbyTown {
  slug: string;
  name: string;
}

export interface LivingInTown {
  townName: string;
  slug: string;
  county: string;
  township?: string;
  zip: string;
  schoolDistrict: string;
  updatedDate: string;
  listingSearchUrl: string;
  listingEmbedUrl?: string;
  weeklyUpdates: WeeklyUpdate[];
  featuredBusiness?: FeaturedBusinessLite;
  events: TownEvent[];
  essentials: Essential[];
  nearbyTowns: NearbyTown[];
  seoTitle: string;
  seoDescription: string;
  seoIntro: string;
}

const REMAX = (city: string) =>
  `/homes/search)}`;

// ── Helper: default essentials shell (Capital District–wide fallbacks) ─────
const baseEssentials = (townSite: string, schoolUrl: string, taxUrl: string): Essential[] => [
  { icon: "townHall", title: "Town Website",       description: "Official town services & news.",       href: townSite },
  { icon: "tax",      title: "Property Taxes",     description: "Search bills and assessments.",        href: taxUrl },
  { icon: "permit",   title: "Building Permits",   description: "Apply for permits & view rules.",      href: townSite },
  { icon: "school",   title: "School District",    description: "Calendar, enrollment & info.",         href: schoolUrl },
  { icon: "trash",    title: "Trash & Recycling",  description: "Pickup schedules & guidelines.",       href: townSite },
  { icon: "utility",  title: "Utilities",          description: "Water, sewer & power providers.",      href: "https://www.nationalgridus.com/" },
  { icon: "dmv",      title: "DMV Office",         description: "Registry, license & registration.",    href: "https://dmv.ny.gov/offices" },
  { icon: "safety",   title: "Public Safety",      description: "Police & emergency services.",         href: townSite },
];

// ───────────────────────── TOWNS ──────────────────────────

export const livingInTowns: Record<string, LivingInTown> = {
  delmar: {
    townName: "Delmar",
    slug: "delmar",
    county: "Albany County",
    township: "town of Bethlehem",
    zip: "12054",
    schoolDistrict: "Bethlehem Central School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Delmar"),
    weeklyUpdates: [
      { type: "listings", title: "4 new listings on the market",        description: "Mostly 3–4 bed colonials between $475K–$640K.",         date: "May 7, 2026" },
      { type: "sold",     title: "5 homes closed this week",            description: "Median sale price ~$485K, average 8 days on market.",   date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Four Corners Luncheonette", description: "The unofficial morning meeting room of Delmar.",       date: "May 5, 2026" },
      { type: "event",    title: "Delmar Farmers Market opens",          description: "Saturdays at the Bethlehem Library, 9 AM – 1 PM.",     date: "May 11, 2026" },
    ],
    featuredBusiness: {
      name: "Four Corners Luncheonette",
      category: "Restaurant",
      tagline: "Delmar's classic neighborhood diner — breakfast all day.",
      phone: "(518) 439-7889",
      address: "Four Corners, Delmar, NY",
    },
    events: [
      { title: "Delmar Farmers Market",      date: "Saturdays · May–Oct", description: "Local produce, baked goods, and crafts at the library." },
      { title: "Bethlehem Library Story Time", date: "Wed mornings",       description: "Weekly free programming for kids and families." },
      { title: "Town of Bethlehem 5K",       date: "June 14, 2026",       description: "Annual community run starting at Elm Avenue Park." },
    ],
    essentials: [
      { icon: "townHall", title: "Town of Bethlehem",   description: "Official services, departments, and announcements.", href: "https://www.townofbethlehem.org" },
      { icon: "tax",      title: "Property Taxes",      description: "Search tax bills and property assessments.",         href: "https://egov.basny.com/bethlehem/" },
      { icon: "permit",   title: "Building Permits",    description: "Permits, zoning, and inspections.",                  href: "https://www.townofbethlehem.org/179/Building-Department" },
      { icon: "school",   title: "Bethlehem Schools",   description: "District info, calendar, and enrollment.",            href: "https://www.bethlehemschools.org" },
      { icon: "trash",    title: "Trash & Recycling",   description: "Pickup schedule and recycling guidelines.",           href: "https://www.townofbethlehem.org/492/Recycling-Transfer-Station-Trash" },
      { icon: "utility",  title: "Water & Sewer",       description: "Water, sewer, and town utility services.",            href: "https://www.townofbethlehem.org/170/Water-Sewer" },
    ],
    nearbyTowns: [
      { slug: "albany",        name: "Albany" },
      { slug: "slingerlands",  name: "Slingerlands" },
      { slug: "glenmont",      name: "Glenmont" },
      { slug: "guilderland",   name: "Guilderland" },
      { slug: "voorheesville", name: "Voorheesville" },
    ],
    seoTitle: "Living in Delmar, NY | Homes, Schools & Local Guide",
    seoDescription: "Homes for sale in Delmar, NY. Bethlehem Central schools, market activity, local businesses, and lifestyle in one of the Capital District's most desirable communities.",
    seoIntro: "Delmar is one of the most sought-after suburbs in the Capital District, known for top-rated Bethlehem Central schools, walkable Four Corners, and a 10-minute commute to downtown Albany.",
  },

  albany: {
    townName: "Albany",
    slug: "albany",
    county: "Albany County",
    zip: "12207",
    schoolDistrict: "Albany City School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Albany"),
    weeklyUpdates: [
      { type: "listings", title: "12 new listings citywide",            description: "Pine Hills, Buckingham Pond, and Center Square activity.", date: "May 7, 2026" },
      { type: "sold",     title: "9 homes closed this week",            description: "Median sale price ~$245K across all neighborhoods.",       date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Stacks Espresso Bar",      description: "Local coffee favorite on Lark Street.",                    date: "May 5, 2026" },
      { type: "event",    title: "Tulip Festival in Washington Park",    description: "Mother's Day weekend — Albany's signature spring event.",  date: "May 9, 2026" },
    ],
    featuredBusiness: {
      name: "Stacks Espresso Bar",
      category: "Coffee",
      tagline: "Lark Street's neighborhood coffee shop.",
      address: "260 Lark St, Albany, NY",
    },
    events: [
      { title: "Tulip Festival",        date: "May 9–10, 2026",      description: "Albany's iconic spring celebration in Washington Park." },
      { title: "Alive at Five concerts", date: "Thursdays, June–Aug", description: "Free outdoor concerts at Jennings Landing." },
      { title: "Albany Riverfront Jazz", date: "Sept 12, 2026",       description: "All-day waterfront jazz festival." },
    ],
    essentials: [
      { icon: "townHall", title: "City of Albany",      description: "Official city services and departments.",     href: "https://www.albanyny.gov" },
      { icon: "tax",      title: "Property Taxes",      description: "View and pay city tax bills.",                href: "https://www.albanyny.gov/358/Treasurer" },
      { icon: "permit",   title: "Building & Permits",  description: "Permits, codes, and city departments.",       href: "https://www.albanyny.gov/158/Departments" },
      { icon: "school",   title: "Albany Schools",      description: "District info, calendar, and enrollment.",     href: "https://www.albanyschools.org" },
      { icon: "trash",    title: "Trash & Recycling",   description: "Garbage collection and recycling services.",   href: "https://www.albanyny.gov/2359/Garbage-Collection" },
      { icon: "utility",  title: "City Services",       description: "Water, services, and public works.",           href: "https://www.albanyny.gov/158/Departments" },
    ],
    nearbyTowns: [
      { slug: "delmar",     name: "Delmar" },
      { slug: "colonie",    name: "Colonie" },
      { slug: "watervliet", name: "Watervliet" },
      { slug: "troy",       name: "Troy" },
      { slug: "guilderland", name: "Guilderland" },
    ],
    seoTitle: "Living in Albany, NY | Neighborhoods, Homes & Local Guide",
    seoDescription: "Homes for sale in Albany, NY. Pine Hills, Center Square, Buckingham Pond — neighborhoods, schools, and lifestyle in New York's capital city.",
    seoIntro: "Albany is the political and cultural capital of New York's Capital District — a walkable, historic city with distinct neighborhoods, strong urban revival, and an unbeatable cost of living.",
  },

  troy: {
    townName: "Troy",
    slug: "troy",
    county: "Rensselaer County",
    zip: "12180",
    schoolDistrict: "Troy City School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Troy"),
    weeklyUpdates: [
      { type: "listings", title: "8 new listings this week",        description: "Brownstones in the Pottery District and South Troy two-families.", date: "May 7, 2026" },
      { type: "sold",     title: "6 homes closed this week",        description: "Median sale price ~$215K across the city.",                       date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Whistling Kettle",     description: "Tea house and brunch destination on Broadway.",                    date: "May 5, 2026" },
      { type: "event",    title: "Troy Waterfront Farmers Market",  description: "Saturdays year-round in downtown Troy.",                            date: "Saturdays" },
    ],
    featuredBusiness: {
      name: "The Whistling Kettle",
      category: "Restaurant",
      tagline: "Tea, brunch, and a Troy Broadway institution.",
      address: "254 Broadway, Troy, NY",
    },
    events: [
      { title: "Troy Waterfront Farmers Market", date: "Saturdays year-round", description: "One of the largest farmers markets in the Northeast." },
      { title: "Troy Night Out",                 date: "Last Friday monthly",  description: "Downtown art, food, and shopping festival." },
      { title: "Troy Pig Out",                   date: "July 18, 2026",        description: "BBQ competition and street festival downtown." },
    ],
    essentials: [
      { icon: "townHall", title: "City of Troy",        description: "Official city services and departments.",  href: "https://www.troyny.gov" },
      { icon: "tax",      title: "Property Taxes",      description: "View, search, and pay property taxes.",    href: "https://www.troyny.gov/284/Tax-Bill" },
      { icon: "permit",   title: "Forms & Permits",     description: "Building permits and city forms.",         href: "https://www.troyny.gov/1335/Forms-Permits" },
      { icon: "school",   title: "Troy Schools",        description: "District info, calendar, and enrollment.", href: "https://www.troycsd.org" },
      { icon: "utility",  title: "Online Services",     description: "Payments, utilities, and city services.",  href: "https://www.troyny.gov/1343/Online-Services" },
      { icon: "townHall", title: "City Departments",    description: "Assessor, code, public works, and more.",  href: "https://www.troyny.gov/101/Departments" },
    ],
    nearbyTowns: [
      { slug: "watervliet",   name: "Watervliet" },
      { slug: "cohoes",       name: "Cohoes" },
      { slug: "albany",       name: "Albany" },
      { slug: "east-greenbush", name: "East Greenbush" },
      { slug: "latham",       name: "Latham" },
    ],
    seoTitle: "Living in Troy, NY | Brownstones, Riverfront & Local Guide",
    seoDescription: "Homes for sale in Troy, NY. Historic brownstones, Pottery District lofts, and South Troy two-families along the Hudson riverfront.",
    seoIntro: "Troy is the Capital District's most architecturally rich city — Victorian brownstones, a thriving Saturday farmers market, and a walkable downtown along the Hudson.",
  },

  schenectady: {
    townName: "Schenectady",
    slug: "schenectady",
    county: "Schenectady County",
    zip: "12305",
    schoolDistrict: "Schenectady City School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Schenectady"),
    weeklyUpdates: [
      { type: "listings", title: "10 new listings this week",     description: "Stockade colonials and Upper Union value plays.",       date: "May 7, 2026" },
      { type: "sold",     title: "7 homes closed this week",      description: "Median sale price ~$195K — strong cash flow market.",   date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Ambition Coffee",    description: "Jay Street downtown's go-to coffee shop.",              date: "May 5, 2026" },
      { type: "event",    title: "Proctors Theatre season",       description: "Broadway tours and concerts on State Street.",           date: "Year-round" },
    ],
    featuredBusiness: {
      name: "Ambition Coffee & Eatery",
      category: "Coffee",
      tagline: "Jay Street's neighborhood café and brunch spot.",
      address: "154 Jay St, Schenectady, NY",
    },
    events: [
      { title: "Proctors Theatre season",   date: "Year-round",         description: "Broadway tours and major concerts." },
      { title: "Stockade Outdoor Art Show", date: "Sept 12–13, 2026",   description: "100+ artists in the historic Stockade neighborhood." },
      { title: "Schenectady Greenmarket",   date: "Sundays year-round", description: "Farmers market on Jay Street pedestrian zone." },
    ],
    essentials: [
      { icon: "townHall", title: "City of Schenectady", description: "Official city services and departments.",   href: "https://www.cityofschenectady.com" },
      { icon: "tax",      title: "Taxes & Finance",     description: "Property taxes and city payments.",         href: "https://www.cityofschenectady.com" },
      { icon: "permit",   title: "Building Department", description: "Permits, codes, and inspections.",          href: "https://www.cityofschenectady.com" },
      { icon: "school",   title: "Schenectady Schools", description: "District info, calendar, and enrollment.",  href: "https://www.schenectadyschools.org" },
      { icon: "trash",    title: "Trash & Recycling",   description: "Public works and sanitation services.",     href: "https://www.cityofschenectady.com" },
      { icon: "utility",  title: "Utilities",           description: "Water, sewer, and city services.",          href: "https://www.cityofschenectady.com" },
    ],
    nearbyTowns: [
      { slug: "niskayuna",    name: "Niskayuna" },
      { slug: "colonie",      name: "Colonie" },
      { slug: "latham",       name: "Latham" },
      { slug: "clifton-park", name: "Clifton Park" },
      { slug: "albany",       name: "Albany" },
    ],
    seoTitle: "Living in Schenectady, NY | Stockade, Homes & Local Guide",
    seoDescription: "Homes for sale in Schenectady, NY. Historic Stockade district, Upper Union Street value, and one of the Capital District's strongest cash-flow markets.",
    seoIntro: "Schenectady offers historic charm in the Stockade, family neighborhoods on Upper Union, and some of the strongest cash-flow real estate in the Capital Region.",
  },

  "saratoga-springs": {
    townName: "Saratoga Springs",
    slug: "saratoga-springs",
    county: "Saratoga County",
    zip: "12866",
    schoolDistrict: "Saratoga Springs City School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Saratoga Springs"),
    weeklyUpdates: [
      { type: "listings", title: "6 new listings this week",       description: "East Side Victorians and West Side single-families.",  date: "May 7, 2026" },
      { type: "sold",     title: "4 homes closed this week",       description: "Median sale price ~$615K — highest in the region.",    date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Mrs. London's Bakery", description: "Broadway's famous French bakery & café.",              date: "May 5, 2026" },
      { type: "event",    title: "Track season approaches",         description: "Saratoga Race Course meet runs July 11 – Sept 1.",     date: "July 2026" },
    ],
    featuredBusiness: {
      name: "Mrs. London's Bakery",
      category: "Bakery",
      tagline: "Broadway's iconic French bakery.",
      address: "464 Broadway, Saratoga Springs, NY",
    },
    events: [
      { title: "Saratoga Race Course meet", date: "July 11 – Sept 1",    description: "Oldest active sporting venue in the country." },
      { title: "SPAC summer season",        date: "June – August",       description: "Live at SPAC: orchestras, ballet, and concerts." },
      { title: "Saratoga Farmers Market",   date: "Saturdays year-round", description: "Year-round market downtown at High Rock Park." },
    ],
    essentials: [
      { icon: "townHall", title: "Saratoga Springs",    description: "Official city services and announcements.",   href: "https://www.saratoga-springs.org" },
      { icon: "tax",      title: "Property Search",     description: "Assessments, property info, and payments.",   href: "https://www.saratoga-springs.org/101/Services" },
      { icon: "permit",   title: "Forms & Permits",     description: "Building, planning, zoning, and permits.",    href: "https://www.saratoga-springs.org" },
      { icon: "school",   title: "Saratoga Schools",    description: "District info, calendar, and enrollment.",     href: "https://www.saratogaschools.org" },
      { icon: "trash",    title: "Trash & Recycling",   description: "Transfer station and public works services.", href: "https://www.saratoga-springs.org/574/Department-of-Public-Works" },
      { icon: "utility",  title: "City Services",       description: "Payments, utilities, and city services.",     href: "https://www.saratoga-springs.org/101/Services" },
    ],
    nearbyTowns: [
      { slug: "clifton-park", name: "Clifton Park" },
      { slug: "latham",       name: "Latham" },
      { slug: "niskayuna",    name: "Niskayuna" },
      { slug: "schenectady",  name: "Schenectady" },
      { slug: "troy",         name: "Troy" },
    ],
    seoTitle: "Living in Saratoga Springs, NY | Homes & Local Guide",
    seoDescription: "Homes for sale in Saratoga Springs, NY. Historic Victorians, Broadway dining, the Race Course, and the Capital District's most desirable resort city.",
    seoIntro: "Saratoga Springs is the Capital District's resort city — Broadway dining, mineral springs, the Race Course, SPAC, and one of the strongest school districts in the region.",
  },

  "clifton-park": {
    townName: "Clifton Park",
    slug: "clifton-park",
    county: "Saratoga County",
    zip: "12065",
    schoolDistrict: "Shenendehowa Central School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Clifton Park"),
    weeklyUpdates: [
      { type: "listings", title: "9 new listings this week",      description: "Family colonials and split-levels near Shen schools.",      date: "May 7, 2026" },
      { type: "sold",     title: "8 homes closed this week",      description: "Median sale price ~$425K, average 11 days on market.",      date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Druthers Brewing",   description: "Clifton Park's local craft brewery and restaurant.",         date: "May 5, 2026" },
      { type: "event",    title: "Shenendehowa lacrosse season",  description: "One of the top public-school programs in the Northeast.",    date: "Spring 2026" },
    ],
    featuredBusiness: {
      name: "Druthers Brewing Company",
      category: "Restaurant",
      tagline: "Clifton Park's craft brewery and family restaurant.",
      address: "175 Park Ave, Clifton Park, NY",
    },
    events: [
      { title: "Clifton Common concerts", date: "Summer Wednesdays", description: "Free outdoor concerts at the Clifton Common." },
      { title: "Shen Music Festival",     date: "April 2026",        description: "Annual high school music showcase." },
      { title: "Clifton Park 4th of July", date: "July 4, 2026",      description: "Fireworks at Clifton Common." },
    ],
    essentials: [
      { icon: "townHall", title: "Town of Clifton Park",  description: "Official town services and announcements.", href: "https://cliftonparkny.gov" },
      { icon: "tax",      title: "Town Services",         description: "Taxes, permits, forms, and departments.",   href: "https://cliftonparkny.gov" },
      { icon: "permit",   title: "Permits & Forms",       description: "Building permits and town forms.",          href: "https://cliftonparkny.gov" },
      { icon: "school",   title: "Shenendehowa Schools",  description: "District info, calendar, and enrollment.",  href: "https://www.shenet.org" },
      { icon: "trash",    title: "Trash & Recycling",     description: "Town and county disposal resources.",       href: "https://cliftonparkny.gov" },
      { icon: "utility",  title: "Utilities",             description: "Water, sewer, and local services.",         href: "https://cliftonparkny.gov" },
    ],
    nearbyTowns: [
      { slug: "latham",            name: "Latham" },
      { slug: "saratoga-springs",  name: "Saratoga Springs" },
      { slug: "niskayuna",         name: "Niskayuna" },
      { slug: "colonie",           name: "Colonie" },
      { slug: "schenectady",       name: "Schenectady" },
    ],
    seoTitle: "Living in Clifton Park, NY | Shen Schools & Local Guide",
    seoDescription: "Homes for sale in Clifton Park, NY. Top-ranked Shenendehowa schools, family neighborhoods, and easy access to Albany, Saratoga, and the Northway.",
    seoIntro: "Clifton Park is the Capital District's top family suburb — Shenendehowa schools, family-friendly neighborhoods, and 25 minutes to either Albany or Saratoga.",
  },

  guilderland: {
    townName: "Guilderland",
    slug: "guilderland",
    county: "Albany County",
    zip: "12084",
    schoolDistrict: "Guilderland Central School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Guilderland"),
    weeklyUpdates: [
      { type: "listings", title: "5 new listings this week",         description: "Western Ave colonials and Altamont-area homes.",     date: "May 7, 2026" },
      { type: "sold",     title: "4 homes closed this week",         description: "Median sale price ~$385K, strong school demand.",    date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Mexican Radio",         description: "Western Ave restaurant — Guilderland favorite.",     date: "May 5, 2026" },
      { type: "event",    title: "Altamont Fair coming this summer", description: "Annual county fair, August 2026.",                   date: "Aug 2026" },
    ],
    featuredBusiness: {
      name: "Mexican Radio",
      category: "Restaurant",
      tagline: "Lively Tex-Mex on Western Avenue.",
      address: "Western Ave, Guilderland, NY",
    },
    events: [
      { title: "Altamont Fair",          date: "August 2026",      description: "Capital Region's largest agricultural fair." },
      { title: "Guilderland Farmers Market", date: "Sundays summer", description: "Local market at Tawasentha Park." },
      { title: "Town park summer concerts", date: "July",            description: "Free Wednesday night concerts at Tawasentha." },
    ],
    essentials: [
      { icon: "townHall", title: "Town of Guilderland",   description: "Official town services and departments.",   href: "https://www.townofguilderland.gov" },
      { icon: "tax",      title: "Town Departments",      description: "Assessor, taxes, building, and services.",  href: "https://www.townofguilderland.gov/101/Departments" },
      { icon: "permit",   title: "Building & Zoning",     description: "Permits, zoning, and inspections.",         href: "https://www.townofguilderland.gov/101/Departments" },
      { icon: "school",   title: "Guilderland Schools",   description: "District info, calendar, and enrollment.",  href: "https://www.guilderlandschools.org" },
      { icon: "trash",    title: "Town Services",         description: "Trash, public works, and resident services.", href: "https://www.townofguilderland.gov/101/Departments" },
      { icon: "utility",  title: "Utilities",             description: "Water, sewer, and town services.",          href: "https://www.townofguilderland.gov/101/Departments" },
    ],
    nearbyTowns: [
      { slug: "albany",        name: "Albany" },
      { slug: "delmar",        name: "Delmar" },
      { slug: "voorheesville", name: "Voorheesville" },
      { slug: "colonie",       name: "Colonie" },
      { slug: "slingerlands",  name: "Slingerlands" },
    ],
    seoTitle: "Living in Guilderland, NY | Schools, Homes & Local Guide",
    seoDescription: "Homes for sale in Guilderland, NY. Top-rated Guilderland schools, Western Ave shopping, and easy commute to Albany and the Northway.",
    seoIntro: "Guilderland combines top-ranked schools, suburban convenience along Western Avenue, and quick access to both Albany and the Adirondack Northway.",
  },

  latham: {
    townName: "Latham",
    slug: "latham",
    county: "Albany County",
    township: "town of Colonie",
    zip: "12110",
    schoolDistrict: "North Colonie Central School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Latham"),
    weeklyUpdates: [
      { type: "listings", title: "7 new listings this week",         description: "Family ranches and split-levels near North Colonie schools.", date: "May 7, 2026" },
      { type: "sold",     title: "5 homes closed this week",         description: "Median sale price ~$365K, strong family demand.",             date: "May 6, 2026" },
      { type: "business", title: "Spotlight: 677 Prime",             description: "Wolf Road's premier steakhouse.",                              date: "May 5, 2026" },
      { type: "event",    title: "Town of Colonie 4th of July",      description: "Fireworks at the Crossings of Colonie park.",                  date: "July 4, 2026" },
    ],
    featuredBusiness: {
      name: "677 Prime",
      category: "Restaurant",
      tagline: "Capital District steakhouse on Broadway.",
      address: "677 Broadway, Albany, NY (near Latham)",
    },
    events: [
      { title: "Crossings Park concerts", date: "Summer Thursdays", description: "Free outdoor concerts at the Crossings of Colonie." },
      { title: "Latham Farmers Market",   date: "Saturdays summer",  description: "Seasonal market in central Latham." },
      { title: "North Colonie Music Fest", date: "May 2026",         description: "Annual school music celebration." },
    ],
    essentials: [
      { icon: "townHall", title: "Town of Colonie",      description: "Official town services and departments.",      href: "https://www.townofcolonie.gov" },
      { icon: "tax",      title: "Tax Department",       description: "General tax, school tax, and water bills.",    href: "https://www.townofcolonie.gov/departments/tax/" },
      { icon: "permit",   title: "Building Services",    description: "Building permits, forms, and inspections.",    href: "https://www.townofcolonie.gov/departments/building/" },
      { icon: "school",   title: "North Colonie Schools",description: "District info, calendar, and enrollment.",     href: "https://www.northcolonie.org" },
      { icon: "trash",    title: "Town Services",        description: "Yard waste, public works, and services.",      href: "https://www.townofcolonie.gov" },
      { icon: "utility",  title: "Utilities",            description: "Water, tax, and local services.",              href: "https://www.townofcolonie.gov/departments/tax/" },
    ],
    nearbyTowns: [
      { slug: "colonie",      name: "Colonie" },
      { slug: "clifton-park", name: "Clifton Park" },
      { slug: "niskayuna",    name: "Niskayuna" },
      { slug: "watervliet",   name: "Watervliet" },
      { slug: "cohoes",       name: "Cohoes" },
    ],
    seoTitle: "Living in Latham, NY | North Colonie Schools & Local Guide",
    seoDescription: "Homes for sale in Latham, NY. North Colonie schools, central location near the airport, and easy access to Albany, Schenectady, and Saratoga.",
    seoIntro: "Latham sits at the literal center of the Capital District — North Colonie schools, the airport, and 15 minutes to Albany, Schenectady, or Saratoga.",
  },

  niskayuna: {
    townName: "Niskayuna",
    slug: "niskayuna",
    county: "Schenectady County",
    zip: "12309",
    schoolDistrict: "Niskayuna Central School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Niskayuna"),
    weeklyUpdates: [
      { type: "listings", title: "5 new listings this week",         description: "Mid-century ranches and updated colonials.",                date: "May 7, 2026" },
      { type: "sold",     title: "4 homes closed this week",         description: "Median sale price ~$455K — strong school demand.",          date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Mohawk Commons shops",  description: "Local retail and dining hub in Niskayuna.",                  date: "May 5, 2026" },
      { type: "event",    title: "Niska-Day community festival",     description: "Annual town celebration in May.",                            date: "May 17, 2026" },
    ],
    featuredBusiness: {
      name: "Bountiful Bread",
      category: "Bakery",
      tagline: "Stuyvesant Plaza's beloved bakery & café.",
      address: "Stuyvesant Plaza, Niskayuna, NY",
    },
    events: [
      { title: "Niska-Day",               date: "May 17, 2026",  description: "Annual town festival with parade, music, and rides." },
      { title: "Mohawk-Hudson bike path", date: "Year-round",    description: "Top-rated cycling and walking trail along the river." },
      { title: "Niskayuna Co-op events",  date: "Year-round",    description: "Cooking classes and community programs." },
    ],
    essentials: [
      { icon: "townHall", title: "Town of Niskayuna",    description: "Official town services and departments.",   href: "https://www.niskayuna.gov" },
      { icon: "tax",      title: "Property Taxes",       description: "Receiver of Taxes and tax information.",    href: "https://www.niskayuna.gov/departments/receiver_of_taxes/index.php" },
      { icon: "permit",   title: "Building Department",  description: "Permits, forms, and inspections.",          href: "https://www.niskayuna.gov/departments/building_department/index.php" },
      { icon: "school",   title: "Niskayuna Schools",    description: "District info, calendar, and enrollment.",  href: "https://www.niskayunaschools.org" },
      { icon: "townHall", title: "Departments",          description: "Town departments and public services.",     href: "https://www.niskayuna.gov/departments/" },
      { icon: "utility",  title: "Utilities & Taxes",    description: "Utility bills and tax resources.",          href: "https://www.niskayuna.gov/departments/receiver_of_taxes/view_your_tax_bill_online.php" },
    ],
    nearbyTowns: [
      { slug: "schenectady",  name: "Schenectady" },
      { slug: "colonie",      name: "Colonie" },
      { slug: "latham",       name: "Latham" },
      { slug: "clifton-park", name: "Clifton Park" },
      { slug: "albany",       name: "Albany" },
    ],
    seoTitle: "Living in Niskayuna, NY | Schools, Homes & Local Guide",
    seoDescription: "Homes for sale in Niskayuna, NY. Top-ranked Niskayuna schools, established neighborhoods, and a short commute to GE, Schenectady, and Albany.",
    seoIntro: "Niskayuna pairs one of the highest-ranked school districts in the Capital Region with established neighborhoods and a short commute to GE, Schenectady, and Albany.",
  },

  glenmont: {
    townName: "Glenmont",
    slug: "glenmont",
    county: "Albany County",
    township: "town of Bethlehem",
    zip: "12077",
    schoolDistrict: "Bethlehem Central School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Glenmont"),
    weeklyUpdates: [
      { type: "listings", title: "3 new listings this week",         description: "Newer construction and Bethlehem-area family homes.",     date: "May 7, 2026" },
      { type: "sold",     title: "2 homes closed this week",         description: "Median sale price ~$455K with Bethlehem schools.",        date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Glenmont Plaza shops",  description: "Local retail and dining at Glenmont Plaza.",              date: "May 5, 2026" },
      { type: "event",    title: "Bethlehem Town Park summer",       description: "Henry Hudson Park summer programming and boat launch.",   date: "Summer 2026" },
    ],
    events: [
      { title: "Henry Hudson Park", date: "Year-round", description: "Riverfront park with boat launch and trails." },
      { title: "Glenmont Job Fair", date: "Annual",     description: "Bethlehem business community job fair." },
      { title: "Tri-Village events", date: "Year-round", description: "Bethlehem community programming." },
    ],
    essentials: [
      { icon: "townHall", title: "Town of Bethlehem",   description: "Official services for Glenmont via Bethlehem.",      href: "https://www.townofbethlehem.org" },
      { icon: "tax",      title: "Property Taxes",      description: "Search tax bills and property assessments.",         href: "https://egov.basny.com/bethlehem/" },
      { icon: "permit",   title: "Building Permits",    description: "Permits, zoning, and inspections.",                  href: "https://www.townofbethlehem.org/179/Building-Department" },
      { icon: "school",   title: "Bethlehem Schools",   description: "District info, calendar, and enrollment.",            href: "https://www.bethlehemschools.org" },
      { icon: "trash",    title: "Trash & Recycling",   description: "Pickup schedule and recycling guidelines.",           href: "https://www.townofbethlehem.org/492/Recycling-Transfer-Station-Trash" },
      { icon: "utility",  title: "Water & Sewer",       description: "Water, sewer, and town utility services.",            href: "https://www.townofbethlehem.org/170/Water-Sewer" },
    ],
    nearbyTowns: [
      { slug: "delmar",       name: "Delmar" },
      { slug: "slingerlands", name: "Slingerlands" },
      { slug: "albany",       name: "Albany" },
      { slug: "east-greenbush", name: "East Greenbush" },
      { slug: "voorheesville", name: "Voorheesville" },
    ],
    seoTitle: "Living in Glenmont, NY | Bethlehem Schools & Local Guide",
    seoDescription: "Homes for sale in Glenmont, NY. Bethlehem Central schools, riverfront access at Henry Hudson Park, and a quick commute to Albany.",
    seoIntro: "Glenmont offers Bethlehem Central schools, newer construction, and riverfront access at Henry Hudson Park — all within minutes of downtown Albany.",
  },

  slingerlands: {
    townName: "Slingerlands",
    slug: "slingerlands",
    county: "Albany County",
    township: "town of Bethlehem",
    zip: "12159",
    schoolDistrict: "Bethlehem Central School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Slingerlands"),
    weeklyUpdates: [
      { type: "listings", title: "2 new listings this week",        description: "Larger lots and executive homes near Slingerlands.",     date: "May 7, 2026" },
      { type: "sold",     title: "3 homes closed this week",        description: "Median sale price ~$595K, premium Bethlehem.",            date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Vista at Vintage",     description: "Wine and small plates near the Slingerlands Bypass.",     date: "May 5, 2026" },
      { type: "event",    title: "Five Rivers programming",         description: "Five Rivers Environmental Center spring walks.",          date: "May 2026" },
    ],
    events: [
      { title: "Five Rivers Environmental Center", date: "Year-round", description: "Free trails, programs, and nature center." },
      { title: "Bethlehem Public Library events",  date: "Weekly",     description: "Library serves Slingerlands residents." },
      { title: "Albany County Rail Trail",         date: "Year-round", description: "10-mile trail passing through Slingerlands." },
    ],
    essentials: [
      { icon: "townHall", title: "Town of Bethlehem",   description: "Official services for Slingerlands via Bethlehem.",  href: "https://www.townofbethlehem.org" },
      { icon: "tax",      title: "Property Taxes",      description: "Search tax bills and property assessments.",         href: "https://egov.basny.com/bethlehem/" },
      { icon: "permit",   title: "Building Permits",    description: "Permits, zoning, and inspections.",                  href: "https://www.townofbethlehem.org/179/Building-Department" },
      { icon: "school",   title: "Bethlehem Schools",   description: "District info, calendar, and enrollment.",            href: "https://www.bethlehemschools.org" },
      { icon: "trash",    title: "Trash & Recycling",   description: "Pickup schedule and recycling guidelines.",           href: "https://www.townofbethlehem.org/492/Recycling-Transfer-Station-Trash" },
      { icon: "utility",  title: "Water & Sewer",       description: "Water, sewer, and town utility services.",            href: "https://www.townofbethlehem.org/170/Water-Sewer" },
    ],
    nearbyTowns: [
      { slug: "delmar",       name: "Delmar" },
      { slug: "voorheesville", name: "Voorheesville" },
      { slug: "guilderland",  name: "Guilderland" },
      { slug: "glenmont",     name: "Glenmont" },
      { slug: "albany",       name: "Albany" },
    ],
    seoTitle: "Living in Slingerlands, NY | Bethlehem Schools & Local Guide",
    seoDescription: "Homes for sale in Slingerlands, NY. Bethlehem Central schools, larger lots, executive homes, and Five Rivers Environmental Center nearby.",
    seoIntro: "Slingerlands is the most desirable corner of Bethlehem — larger lots, executive homes, top-tier Bethlehem schools, and Five Rivers nature preserve.",
  },

  colonie: {
    townName: "Colonie",
    slug: "colonie",
    county: "Albany County",
    zip: "12205",
    schoolDistrict: "South Colonie Central School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Colonie"),
    weeklyUpdates: [
      { type: "listings", title: "8 new listings this week",       description: "Family ranches and Wolf Road area homes.",        date: "May 7, 2026" },
      { type: "sold",     title: "6 homes closed this week",       description: "Median sale price ~$340K, strong family market.", date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Crossgates Mall",     description: "Capital District's largest shopping destination.", date: "May 5, 2026" },
      { type: "event",    title: "Crossings Park summer",           description: "Free Thursday concerts at the Crossings.",         date: "Summer 2026" },
    ],
    events: [
      { title: "Crossings of Colonie concerts", date: "Summer Thursdays", description: "Free outdoor concerts." },
      { title: "Colonie 4th of July",            date: "July 4, 2026",     description: "Fireworks at the Crossings." },
      { title: "Mohawk River trails",            date: "Year-round",       description: "Hiking and biking along the Mohawk." },
    ],
    essentials: [
      { icon: "townHall", title: "Town of Colonie",      description: "Official town services and departments.",      href: "https://www.townofcolonie.gov" },
      { icon: "tax",      title: "Tax Department",       description: "General tax, school tax, and water bills.",    href: "https://www.townofcolonie.gov/departments/tax/" },
      { icon: "permit",   title: "Building Services",    description: "Building permits, forms, and inspections.",    href: "https://www.townofcolonie.gov/departments/building/" },
      { icon: "school",   title: "South Colonie Schools",description: "District info, calendar, and enrollment.",     href: "https://www.southcolonieschools.org" },
      { icon: "trash",    title: "Town Services",        description: "Yard waste, public works, and services.",      href: "https://www.townofcolonie.gov" },
      { icon: "utility",  title: "Utilities",            description: "Water, tax, and local services.",              href: "https://www.townofcolonie.gov/departments/tax/" },
    ],
    nearbyTowns: [
      { slug: "latham",      name: "Latham" },
      { slug: "albany",      name: "Albany" },
      { slug: "niskayuna",   name: "Niskayuna" },
      { slug: "guilderland", name: "Guilderland" },
      { slug: "watervliet",  name: "Watervliet" },
    ],
    seoTitle: "Living in Colonie, NY | Schools, Homes & Local Guide",
    seoDescription: "Homes for sale in Colonie, NY. Family neighborhoods, top-rated South Colonie schools, Wolf Road shopping, and Capital Region central location.",
    seoIntro: "Colonie is the Capital District's largest suburb — family neighborhoods, South Colonie schools, Wolf Road shopping, and a true central location.",
  },

  cohoes: {
    townName: "Cohoes",
    slug: "cohoes",
    county: "Albany County",
    zip: "12047",
    schoolDistrict: "Cohoes City School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Cohoes"),
    weeklyUpdates: [
      { type: "listings", title: "5 new listings this week",      description: "Affordable two-families and starter homes.",           date: "May 7, 2026" },
      { type: "sold",     title: "4 homes closed this week",      description: "Median sale price ~$215K — strong cash flow market.",  date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Cohoes Music Hall",  description: "Historic theater at the heart of downtown Cohoes.",    date: "May 5, 2026" },
      { type: "event",    title: "Cohoes Falls overlook reopens", description: "Free public viewing of one of the largest US falls.",  date: "Spring 2026" },
    ],
    featuredBusiness: {
      name: "Cohoes Music Hall",
      category: "Restaurant",
      tagline: "Historic 1874 theater & cultural venue.",
      address: "58 Remsen St, Cohoes, NY",
    },
    events: [
      { title: "Cohoes Music Hall season", date: "Year-round",  description: "Concerts, comedy, and theater downtown." },
      { title: "Cohoes Falls overlook",    date: "Year-round",  description: "Free public viewing of the iconic falls." },
      { title: "Riverspark Summerfest",    date: "August 2026", description: "Annual community festival." },
    ],
    essentials: [
      { icon: "townHall", title: "City of Cohoes",       description: "Official city services and departments.",     href: "https://www.ci.cohoes.ny.us" },
      { icon: "tax",      title: "Property Taxes",       description: "Taxes, bills, and city finance.",             href: "https://www.ci.cohoes.ny.us" },
      { icon: "permit",   title: "Building & Codes",     description: "Permits, codes, and inspections.",            href: "https://www.ci.cohoes.ny.us" },
      { icon: "school",   title: "Cohoes Schools",       description: "District info, calendar, and enrollment.",    href: "https://www.cohoes.org" },
      { icon: "trash",    title: "Trash & Recycling",    description: "Public works and sanitation services.",       href: "https://www.ci.cohoes.ny.us" },
      { icon: "utility",  title: "Utilities",            description: "Water, sewer, and city services.",            href: "https://www.ci.cohoes.ny.us" },
    ],
    nearbyTowns: [
      { slug: "watervliet", name: "Watervliet" },
      { slug: "troy",       name: "Troy" },
      { slug: "latham",     name: "Latham" },
      { slug: "colonie",    name: "Colonie" },
      { slug: "albany",     name: "Albany" },
    ],
    seoTitle: "Living in Cohoes, NY | Affordable Homes & Local Guide",
    seoDescription: "Homes for sale in Cohoes, NY. Affordable two-families, starter homes, the historic Cohoes Music Hall, and one of New York's largest waterfalls.",
    seoIntro: "Cohoes pairs affordability with character — the historic Music Hall, Cohoes Falls, and some of the strongest cash-flow potential in the Capital Region.",
  },

  watervliet: {
    townName: "Watervliet",
    slug: "watervliet",
    county: "Albany County",
    zip: "12189",
    schoolDistrict: "Watervliet City School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Watervliet"),
    weeklyUpdates: [
      { type: "listings", title: "4 new listings this week",      description: "Affordable single-families and two-families.",        date: "May 7, 2026" },
      { type: "sold",     title: "3 homes closed this week",      description: "Median sale price ~$205K — investor-friendly.",       date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Watervliet Arsenal", description: "Historic federal arsenal & local employer.",           date: "May 5, 2026" },
      { type: "event",    title: "Hudson Shores Park summer",     description: "Riverfront park summer programming.",                  date: "Summer 2026" },
    ],
    events: [
      { title: "Hudson Shores Park concerts", date: "Summer", description: "Free riverfront concerts." },
      { title: "Watervliet Memorial Day parade", date: "May 26, 2026", description: "Annual community parade." },
      { title: "Riverfront 4th of July", date: "July 4, 2026", description: "Fireworks along the Hudson." },
    ],
    essentials: [
      { icon: "townHall", title: "City of Watervliet",   description: "Official city services and departments.",     href: "https://www.watervliet.com" },
      { icon: "tax",      title: "Taxes & Payments",     description: "Property taxes and city payments.",           href: "https://www.watervliet.com" },
      { icon: "permit",   title: "Building & Codes",     description: "Permits, codes, and inspections.",            href: "https://www.watervliet.com" },
      { icon: "school",   title: "Watervliet Schools",   description: "District info, calendar, and enrollment.",    href: "https://www.watervlietcityschools.org" },
      { icon: "trash",    title: "Trash & Recycling",    description: "Public works and sanitation services.",       href: "https://www.watervliet.com" },
      { icon: "utility",  title: "Utilities",            description: "Water, sewer, and city services.",            href: "https://www.watervliet.com" },
    ],
    nearbyTowns: [
      { slug: "cohoes",     name: "Cohoes" },
      { slug: "troy",       name: "Troy" },
      { slug: "albany",     name: "Albany" },
      { slug: "latham",     name: "Latham" },
      { slug: "colonie",    name: "Colonie" },
    ],
    seoTitle: "Living in Watervliet, NY | Affordable Homes & Local Guide",
    seoDescription: "Homes for sale in Watervliet, NY. Affordable single-families and two-families along the Hudson, with the Watervliet Arsenal as a key local employer.",
    seoIntro: "Watervliet is a small Hudson River city offering affordability, riverfront access at Hudson Shores Park, and proximity to Troy, Cohoes, and Albany.",
  },

  "east-greenbush": {
    townName: "East Greenbush",
    slug: "east-greenbush",
    county: "Rensselaer County",
    zip: "12061",
    schoolDistrict: "East Greenbush Central School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("East Greenbush"),
    weeklyUpdates: [
      { type: "listings", title: "5 new listings this week",          description: "Family colonials and Columbia school district homes.",  date: "May 7, 2026" },
      { type: "sold",     title: "4 homes closed this week",          description: "Median sale price ~$345K, growing demand.",             date: "May 6, 2026" },
      { type: "business", title: "Spotlight: Hannaford Plaza shops",  description: "Local dining and services hub.",                        date: "May 5, 2026" },
      { type: "event",    title: "Columbia HS spring sports",         description: "Highly-rated public school athletics.",                 date: "Spring 2026" },
    ],
    events: [
      { title: "East Greenbush Library events",   date: "Weekly",       description: "Free community programs." },
      { title: "Hampton Manor concerts",          date: "Summer",       description: "Free outdoor concerts at Hampton Manor." },
      { title: "Independence Day fireworks",      date: "July 4, 2026", description: "Town-sponsored fireworks." },
    ],
    essentials: [
      { icon: "townHall", title: "Town of East Greenbush", description: "Official town services and departments.", href: "https://www.eastgreenbush.org" },
      { icon: "tax",      title: "Taxes & Assessment",     description: "Tax and assessment resources.",          href: "https://www.eastgreenbush.org" },
      { icon: "permit",   title: "Building Department",    description: "Permits, zoning, and inspections.",      href: "https://www.eastgreenbush.org" },
      { icon: "school",   title: "East Greenbush Schools", description: "District info, calendar, and enrollment.", href: "https://egcsd.org" },
      { icon: "trash",    title: "Trash & Recycling",      description: "Town services and disposal resources.",  href: "https://www.eastgreenbush.org" },
      { icon: "utility",  title: "Utilities",              description: "Water, sewer, and town services.",       href: "https://www.eastgreenbush.org" },
    ],
    nearbyTowns: [
      { slug: "albany",   name: "Albany" },
      { slug: "troy",     name: "Troy" },
      { slug: "delmar",   name: "Delmar" },
      { slug: "glenmont", name: "Glenmont" },
      { slug: "colonie",  name: "Colonie" },
    ],
    seoTitle: "Living in East Greenbush, NY | Schools, Homes & Local Guide",
    seoDescription: "Homes for sale in East Greenbush, NY. East Greenbush Central School District, Columbia High School, family neighborhoods, and easy Albany commute.",
    seoIntro: "East Greenbush offers the East Greenbush Central School District, family neighborhoods, and a 10-minute commute across the Hudson into downtown Albany.",
  },

  bethlehem: {
    townName: "Bethlehem",
    slug: "bethlehem",
    county: "Albany County",
    township: "town of Bethlehem",
    zip: "12054",
    schoolDistrict: "Bethlehem Central School District",
    updatedDate: "May 7, 2026",
    listingSearchUrl: REMAX("Bethlehem"),
    weeklyUpdates: [
      { type: "listings", title: "New listings across Bethlehem",   description: "Mostly Delmar, Slingerlands, and Glenmont activity.",     date: "May 7, 2026" },
      { type: "sold",     title: "Recent closings townwide",        description: "Median sale prices remain in the high $400Ks.",          date: "May 6, 2026" },
      { type: "business", title: "Local spotlight: Four Corners",   description: "The unofficial morning meeting room of Delmar.",         date: "May 5, 2026" },
      { type: "event",    title: "Bethlehem Library programs",      description: "Weekly community events and story times.",                date: "Ongoing" },
    ],
    events: [
      { title: "Delmar Farmers Market",       date: "Saturdays · May–Oct", description: "Local produce at the Bethlehem Library." },
      { title: "Bethlehem Library events",    date: "Weekly",              description: "Free family programming year-round." },
      { title: "Town of Bethlehem 5K",        date: "June 14, 2026",       description: "Community run starting at Elm Avenue Park." },
    ],
    essentials: baseEssentials(
      "https://www.townofbethlehem.org",
      "https://www.bethlehemschools.org",
      "https://egov.basny.com/bethlehem/",
    ),
    nearbyTowns: [
      { slug: "delmar",        name: "Delmar" },
      { slug: "slingerlands",  name: "Slingerlands" },
      { slug: "glenmont",      name: "Glenmont" },
      { slug: "albany",        name: "Albany" },
    ],
    seoTitle: "Living in Bethlehem, NY | Schools, Homes & Local Guide",
    seoDescription: "Homes for sale in the Town of Bethlehem, NY — Delmar, Slingerlands, and Glenmont. Bethlehem Central schools, market activity, and local life.",
    seoIntro: "Bethlehem is one of the Capital District's most desirable towns — top-rated Bethlehem Central schools, walkable Delmar, and quick access to downtown Albany.",
  },
};

export const makeTownPlaceholder = (
  townName: string,
  slug: string,
  county: string,
  zip = "12000",
  schoolDistrict = `${townName} Area Schools`,
): LivingInTown => ({
  townName,
  slug,
  county,
  zip,
  schoolDistrict,
  updatedDate: "May 7, 2026",
  listingSearchUrl: REMAX(townName),
  weeklyUpdates: [
    { type: "listings", title: `${townName} listings are being monitored`, description: "Live MLS activity and local updates are being prepared for this town guide.", date: "Updated weekly" },
    { type: "sold", title: "Recent sales snapshot coming soon", description: "Pricing, days on market, and buyer activity will be added as the guide expands.", date: "Coming soon" },
    { type: "business", title: "Local business partners coming soon", description: "Featured restaurants, services, lenders, and attorneys will be curated here.", date: "Coming soon" },
    { type: "event", title: "Community updates coming soon", description: "Recurring town events and local activity will be added to this page.", date: "Coming soon" },
  ],
  events: [
    { title: `${townName} community calendar`, date: "Coming soon", description: "Local events and weekly updates are being curated." },
    { title: "Town market refresh", date: "Weekly", description: "Market data placeholders will update as the town guide expands." },
    { title: "Local business spotlight", date: "Coming soon", description: "Partner and community spotlights will appear here." },
  ],
  essentials: baseEssentials("https://www.ny.gov", "https://www.nysed.gov", "https://www.ny.gov"),
  nearbyTowns: [
    { slug: "albany", name: "Albany" },
    { slug: "delmar", name: "Delmar" },
    { slug: "saratoga-springs", name: "Saratoga Springs" },
  ],
  seoTitle: `Living in ${townName}, NY | Homes & Local Guide`,
  seoDescription: `${townName}, NY homes, market snapshot placeholders, local businesses, and community updates from Capital District Nest.`,
  seoIntro: `${townName} is part of the broader Capital District Nest town network, with local real estate intelligence, homes, businesses, and community updates being expanded here.`,
});

[
  makeTownPlaceholder("Saratoga Springs", "saratoga-springs", "Saratoga County", "12866", "Saratoga Springs City School District"),
  makeTownPlaceholder("Clifton Park", "clifton-park", "Saratoga County", "12065", "Shenendehowa Central School District"),
  makeTownPlaceholder("Ballston Spa", "ballston-spa", "Saratoga County", "12020", "Ballston Spa Central School District"),
  makeTownPlaceholder("Halfmoon", "halfmoon", "Saratoga County", "12065", "Shenendehowa Central School District"),
  makeTownPlaceholder("Malta", "malta", "Saratoga County", "12020", "Ballston Spa Central School District"),
  makeTownPlaceholder("Amsterdam", "amsterdam", "Montgomery County", "12010", "Greater Amsterdam School District"),
  makeTownPlaceholder("Catskill", "catskill", "Greene County", "12414", "Catskill Central School District"),
  makeTownPlaceholder("Cobleskill", "cobleskill", "Schoharie County", "12043", "Cobleskill-Richmondville Central School District"),
  makeTownPlaceholder("Queensbury", "queensbury", "Warren County", "12804", "Queensbury Union Free School District"),
  makeTownPlaceholder("Lake George", "lake-george", "Warren County", "12845", "Lake George Central School District"),
  makeTownPlaceholder("Glens Falls", "glens-falls", "Warren County", "12801", "Glens Falls City School District"),
  makeTownPlaceholder("East Greenbush", "east-greenbush", "Rensselaer County", "12061", "East Greenbush Central School District"),
  makeTownPlaceholder("Rotterdam", "rotterdam", "Schenectady County", "12306", "Mohonasen Central School District"),
].forEach((town) => {
  livingInTowns[town.slug] ??= town;
});

export const livingInTownsList = Object.values(livingInTowns);
