// Hyper-Local SEO Content for 52 Capital District Towns
// Each town has unique 250-400 word professional copy following "Smart Professional" tone

export interface TownSEOContent {
  slug: string;
  name: string;
  county: string;
  h1: string;
  metaDescription: string;
  leadParagraph: string; // Why people choose this town
  marketParagraph: string; // Property value growth and rental potential
  communityParagraph: string; // Schools and local business anchors
  civicKeywords: string[];
  lifestyleKeywords: string[];
  internalLinks: { label: string; path: string }[];
  focusKeywords: string[]; // Primary SEO target keywords
}

// County Intelligence Hub mapping
export const countyHubs: Record<string, { name: string; path: string; towns: string[] }> = {
  albany: {
    name: "Albany County",
    path: "/intelligence/albany-county",
    towns: ["albany", "delmar", "voorheesville", "guilderland", "colonie", "latham", "menands", "ravena", "altamont", "bethlehem", "loudonville"]
  },
  rensselaer: {
    name: "Rensselaer County",
    path: "/intelligence/rensselaer-county",
    towns: ["troy", "rensselaer", "east-greenbush", "north-greenbush", "averill-park", "wynantskill", "brunswick", "schaghticoke"]
  },
  schenectady: {
    name: "Schenectady County",
    path: "/intelligence/schenectady-county",
    towns: ["schenectady", "niskayuna", "glenville", "rotterdam"]
  },
  saratoga: {
    name: "Saratoga County",
    path: "/intelligence/saratoga-county",
    towns: ["saratoga-springs", "clifton-park", "ballston-spa", "malta", "halfmoon", "wilton", "stillwater", "mechanicville", "waterford"]
  },
  warren: {
    name: "Warren County",
    path: "/intelligence/warren-county",
    towns: ["queensbury"]
  },
  montgomery: {
    name: "Montgomery County",
    path: "/intelligence/montgomery-county",
    towns: ["amsterdam"]
  },
  greene: {
    name: "Greene County",
    path: "/intelligence/greene-county",
    towns: ["catskill", "coxsackie", "windham", "hunter", "athens"]
  },
  schoharie: {
    name: "Schoharie County",
    path: "/intelligence/schoharie-county",
    towns: ["schoharie", "cobleskill", "middleburgh", "sharon-springs"]
  }
};

// Get county for a town slug
export const getCountyForTown = (townSlug: string): { name: string; path: string } | null => {
  for (const [, county] of Object.entries(countyHubs)) {
    if (county.towns.includes(townSlug)) {
      return { name: county.name, path: county.path };
    }
  }
  return null;
};

export const townSEOContent: Record<string, TownSEOContent> = {
  // ========== ALBANY COUNTY ==========
  albany: {
    slug: "albany",
    name: "Albany",
    county: "Albany County",
    h1: "Albany Insights, Property Data & Local Guide",
    metaDescription: "Explore Albany through our professional lens. Get expert property data, school rankings, investment yields, and claim your local business story.",
    leadParagraph: "As New York's capital city, Albany offers a unique blend of government stability, healthcare anchors, and urban revitalization. The city draws young professionals to its walkable downtown, families to historic neighborhoods like Pine Hills, and investors to its strong rental demand. Albany's position as the region's employment hub ensures consistent market activity year-round.",
    marketParagraph: "Albany's diverse housing stock ranges from Victorian rowhouses to modern condos. Median prices hover around $220,000, offering exceptional value compared to coastal metros. Multi-family properties generate strong cash flow with 7-10% yields, supported by steady demand from state workers, students, and medical professionals. The downtown core continues to see appreciation as revitalization projects attract new residents.",
    communityParagraph: "Albany City Schools serve the district, with magnet and specialty programs available. Major employers include New York State, Albany Medical Center, and the University at Albany. Local anchors like Lark Street boutiques, the Times Union Center, and Washington Park create a vibrant community atmosphere that supports property values.",
    civicKeywords: ["Albany tax assessor", "Albany building permits", "Albany city hall", "Albany zoning board", "Albany school calendar"],
    lifestyleKeywords: ["Lark Street restaurants", "Washington Park events", "Albany nightlife", "downtown Albany living", "Albany farmers market"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Albany investment properties", path: "/albany-investment-properties" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Albany NY homes for sale", "Albany NY real estate", "living in Albany NY", "Albany property taxes", "Albany rental properties"]
  },

  delmar: {
    slug: "delmar",
    name: "Delmar",
    county: "Albany County",
    h1: "Delmar Insights, Property Data & Local Guide",
    metaDescription: "Explore Delmar through our professional lens. Get expert property data, Bethlehem Central school insights, and claim your local business story.",
    leadParagraph: "Delmar represents the Capital District's gold standard for family living. Centered around the walkable Four Corners village, this hamlet consistently ranks among New York's most desirable suburbs. Families relocate here specifically for Bethlehem Central Schools, while professionals appreciate the 15-minute commute to downtown Albany. Tree-lined streets and active community programs create a neighborhood feel that's increasingly rare.",
    marketParagraph: "Delmar's median home price of $430,000 reflects its premium positioning. Properties here appreciate steadily, with limited inventory driving competition. Homes near Four Corners and within walking distance of schools command the highest prices. While not typically an investor market, the stability and school district premium make Delmar properties excellent long-term holds.",
    communityParagraph: "Bethlehem Central School District consistently ranks in the top 5% statewide. Local businesses at Four Corners—including Perfect Blend Café and the Delmar Farmers Market—anchor community life. The Albany County Rail Trail provides recreation, while Elm Avenue Park hosts year-round family programming.",
    civicKeywords: ["Bethlehem town hall", "Delmar property taxes", "Bethlehem building permits", "Delmar zoning", "Bethlehem school board"],
    lifestyleKeywords: ["Four Corners Delmar", "Delmar Rail Trail", "Bethlehem YMCA", "Delmar restaurants", "Elm Avenue Park"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Delmar homes for sale", path: "/homes/delmar" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Delmar NY homes for sale", "living in Delmar NY", "Bethlehem Central schools", "Delmar real estate", "Four Corners Delmar"]
  },

  troy: {
    slug: "troy",
    name: "Troy",
    county: "Rensselaer County",
    h1: "Troy Insights, Property Data & Local Guide",
    metaDescription: "Explore Troy through our professional lens. Get expert property data, investment yields, and discover why investors love Troy's historic architecture.",
    leadParagraph: "Troy is the Capital District's investment hotspot, combining historic Victorian architecture with accessible price points and strong rental demand. Rensselaer Polytechnic Institute drives consistent tenant demand, while downtown's restaurant and arts scene attracts young professionals. For investors seeking cash flow, Troy offers some of the region's best opportunities in multi-family properties.",
    marketParagraph: "With median prices around $237,000, Troy offers exceptional entry points for investors. Multi-family brownstones generate 8-12% cash-on-cash returns, particularly in South Troy and the downtown core. The city's ongoing revitalization—including new restaurants, the Troy Waterfront Farmers Market, and arts venues—continues to drive appreciation while maintaining investor-friendly price points.",
    communityParagraph: "Troy City Schools serve the district, with RPI providing unique educational partnerships. The Troy Waterfront Farmers Market, Brown's Brewing Company, and a thriving arts scene anchor community life. Historic architecture and walkable streets create character that's drawing a new generation of residents and investors.",
    civicKeywords: ["Troy tax assessor", "Troy building permits", "Troy city hall", "Troy zoning board", "Troy school calendar"],
    lifestyleKeywords: ["Troy Farmers Market", "downtown Troy restaurants", "RPI campus", "Troy nightlife", "River Street Troy"],
    internalLinks: [
      { label: "See all Rensselaer County Spotlights", path: "/intelligence/rensselaer-county" },
      { label: "Troy investment properties", path: "/troy-multi-unit" },
      { label: "Multi-unit investment guide", path: "/investment-properties" }
    ],
    focusKeywords: ["Troy NY homes for sale", "Troy NY investment properties", "living in Troy NY", "Troy multi-family", "Troy rental properties"]
  },

  schenectady: {
    slug: "schenectady",
    name: "Schenectady",
    county: "Schenectady County",
    h1: "Schenectady Insights, Property Data & Local Guide",
    metaDescription: "Explore Schenectady through our professional lens. Get expert property data, investment opportunities, and discover the Electric City's potential.",
    leadParagraph: "The Electric City is experiencing a renaissance. Schenectady's downtown Proctors district has transformed into a cultural hub, while established neighborhoods like the GE Plot and Stockade Historic District attract families and history enthusiasts. For investors, Schenectady offers strong cash flow potential with lower entry points than surrounding suburbs.",
    marketParagraph: "Schenectady's median price of $195,000 makes it accessible for first-time buyers and investors alike. Multi-family properties in Union Street and the Stockade area generate 8-11% returns. The city's revitalization around Proctors Theatre and new restaurant openings continues to drive renewed interest, with appreciation accelerating in walkable neighborhoods.",
    communityParagraph: "Schenectady City Schools serve the district, with competitive magnet programs available. Proctors Theatre, the Schenectady County Public Library, and a growing restaurant scene anchor downtown. Union College provides educational partnerships and steady rental demand for nearby properties.",
    civicKeywords: ["Schenectady tax assessor", "Schenectady building permits", "Schenectady city hall", "Schenectady zoning", "Schenectady school calendar"],
    lifestyleKeywords: ["Proctors Theatre", "downtown Schenectady restaurants", "Stockade Historic District", "Electric City", "Union College area"],
    internalLinks: [
      { label: "See all Schenectady County Spotlights", path: "/intelligence/schenectady-county" },
      { label: "Schenectady investment properties", path: "/schenectady-multi-unit" },
      { label: "Investment analysis tools", path: "/dealdesk" }
    ],
    focusKeywords: ["Schenectady NY homes for sale", "living in Schenectady NY", "Schenectady investment properties", "Electric City real estate", "Schenectady rental properties"]
  },

  "saratoga-springs": {
    slug: "saratoga-springs",
    name: "Saratoga Springs",
    county: "Saratoga County",
    h1: "Saratoga Springs Insights, Property Data & Local Guide",
    metaDescription: "Explore Saratoga Springs through our professional lens. Get expert property data, tourism insights, and discover upstate New York's premier destination.",
    leadParagraph: "Saratoga Springs is the Capital District's crown jewel—a destination that combines world-class horse racing, mineral springs, and a vibrant downtown. The city attracts tourists, second-home buyers, and families seeking excellent schools. Broadway's boutiques and restaurants create a year-round energy that supports both premium real estate values and short-term rental opportunities.",
    marketParagraph: "Saratoga's median price of $485,000 reflects its premium market position. Properties near Broadway and the racetrack command the highest prices, while surrounding neighborhoods offer more accessible entry points. Short-term rental potential during racing season creates unique income opportunities, though regulations have tightened. Long-term appreciation remains strong.",
    communityParagraph: "Saratoga Springs Central School District is highly rated, drawing families from across the region. The Saratoga Performing Arts Center (SPAC), historic Congress Park, and a nationally recognized downtown shopping district anchor community life. The city's tourism infrastructure supports a robust local business ecosystem.",
    civicKeywords: ["Saratoga Springs tax assessor", "Saratoga building permits", "Saratoga city hall", "Saratoga zoning board", "Saratoga school calendar"],
    lifestyleKeywords: ["Saratoga Race Course", "Broadway Saratoga", "SPAC concerts", "Saratoga mineral springs", "downtown Saratoga restaurants"],
    internalLinks: [
      { label: "See all Saratoga County Spotlights", path: "/intelligence/saratoga-county" },
      { label: "Saratoga homes for sale", path: "/homes/saratoga-springs" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Saratoga Springs NY homes for sale", "living in Saratoga Springs", "Saratoga real estate", "Saratoga Springs property taxes", "Saratoga vacation rentals"]
  },

  "clifton-park": {
    slug: "clifton-park",
    name: "Clifton Park",
    county: "Saratoga County",
    h1: "Clifton Park Insights, Property Data & Local Guide",
    metaDescription: "Explore Clifton Park through our professional lens. Get expert property data, Shenendehowa school insights, and local business stories.",
    leadParagraph: "Clifton Park is the Capital District's family growth engine. Anchored by the nationally-ranked Shenendehowa Central School District, this Saratoga County town has grown into one of the region's largest and most sought-after suburbs. The Exit 9 corridor provides retail and dining options, while residential neighborhoods offer a range of housing from starter homes to executive properties.",
    marketParagraph: "Clifton Park's median price of $410,000 positions it as a premium family market. The Shenendehowa school premium drives consistent demand, particularly for homes in the most desirable attendance zones. Newer construction in developments like Country Knolls and Vischer Ferry commands higher prices. Inventory remains tight, with well-priced homes selling quickly.",
    communityParagraph: "Shenendehowa Central School District is consistently ranked among New York's best, driving much of Clifton Park's demand. The Clifton Park Center Mall, Vischer Ferry Nature Preserve, and a growing restaurant scene serve residents. Strong youth sports programs and community events reinforce the family-focused character.",
    civicKeywords: ["Clifton Park town hall", "Clifton Park property taxes", "Clifton Park building permits", "Clifton Park zoning", "Shenendehowa school calendar"],
    lifestyleKeywords: ["Vischer Ferry Preserve", "Exit 9 Clifton Park", "Clifton Park restaurants", "Shenendehowa sports", "Clifton Park Commons"],
    internalLinks: [
      { label: "See all Saratoga County Spotlights", path: "/intelligence/saratoga-county" },
      { label: "Clifton Park homes for sale", path: "/homes/clifton-park" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Clifton Park NY homes for sale", "living in Clifton Park NY", "Shenendehowa schools", "Clifton Park real estate", "Clifton Park property taxes"]
  },

  niskayuna: {
    slug: "niskayuna",
    name: "Niskayuna",
    county: "Schenectady County",
    h1: "Niskayuna Insights, Property Data & Local Guide",
    metaDescription: "Explore Niskayuna through our professional lens. Get expert property data, top-rated school insights, and claim your local business story.",
    leadParagraph: "Niskayuna represents suburban excellence in Schenectady County. Home to one of New York State's highest-ranked school districts, this community draws families who prioritize education above all else. Tree-lined streets, generous lot sizes, and quick access to I-890 create an ideal balance of suburban tranquility and connectivity.",
    marketParagraph: "Niskayuna's median price of $470,000 reflects the school district premium. Competition for homes in the best attendance zones is fierce, with well-priced properties receiving multiple offers. The GE and tech sector employee base provides steady demand. While not an investor market, Niskayuna properties offer excellent long-term appreciation and stability.",
    communityParagraph: "Niskayuna Central School District is the community's anchor, consistently ranking in the top 5% statewide for academics. The Niskayuna Co-op, Mohawk-Hudson Bike-Hike Trail, and community sports programs serve residents. The town's proximity to GE Global Research creates a highly-educated resident base.",
    civicKeywords: ["Niskayuna town hall", "Niskayuna property taxes", "Niskayuna building permits", "Niskayuna zoning board", "Niskayuna school board"],
    lifestyleKeywords: ["Niskayuna Co-op", "Mohawk-Hudson Trail Niskayuna", "Niskayuna schools", "Balltown Road", "Niskayuna community"],
    internalLinks: [
      { label: "See all Schenectady County Spotlights", path: "/intelligence/schenectady-county" },
      { label: "Niskayuna homes for sale", path: "/homes/niskayuna" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Niskayuna NY homes for sale", "living in Niskayuna NY", "Niskayuna Central schools", "Niskayuna real estate", "Niskayuna property taxes"]
  },

  guilderland: {
    slug: "guilderland",
    name: "Guilderland",
    county: "Albany County",
    h1: "Guilderland Insights, Property Data & Local Guide",
    metaDescription: "Explore Guilderland through our professional lens. Get expert property data, school rankings, and discover this Albany suburb's appeal.",
    leadParagraph: "Guilderland offers the complete suburban package—excellent schools, convenient shopping, and easy access to Albany. The Crossgates Mall corridor provides retail options, while residential neighborhoods from Guilderland Center to Altamont offer everything from starter homes to estate properties. Families appreciate the balance of convenience and community.",
    marketParagraph: "Guilderland's median price of $375,000 positions it as a strong mid-tier market. The town's diversity of housing stock—from townhomes to large colonials—creates entry points for various buyers. Inventory moves steadily, with school district boundaries influencing pricing. Long-term appreciation has been consistent.",
    communityParagraph: "Guilderland Central School District serves most of the town, with strong academics and athletics. Crossgates Mall and Western Avenue provide shopping and dining, while Tawasentha Park offers recreation. The YMCA and active youth programs reinforce the family-friendly character.",
    civicKeywords: ["Guilderland town hall", "Guilderland property taxes", "Guilderland building permits", "Guilderland zoning", "Guilderland school calendar"],
    lifestyleKeywords: ["Crossgates Mall", "Guilderland restaurants", "Tawasentha Park", "Western Avenue shopping", "Guilderland YMCA"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Guilderland homes for sale", path: "/homes/guilderland" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Guilderland NY homes for sale", "living in Guilderland NY", "Guilderland Central schools", "Guilderland real estate", "Crossgates Mall area"]
  },

  colonie: {
    slug: "colonie",
    name: "Colonie",
    county: "Albany County",
    h1: "Colonie Insights, Property Data & Local Guide",
    metaDescription: "Explore Colonie through our professional lens. Get expert property data, market trends, and discover Albany's largest suburb.",
    leadParagraph: "Colonie is Albany County's population center and the region's commercial hub. From the Colonie Center and Northway Mall to residential neighborhoods in West Albany and Newton Plaza, this town offers exceptional convenience. The diverse housing stock serves everyone from first-time buyers to growing families seeking more space.",
    marketParagraph: "Colonie's median price of $285,000 makes it one of the region's most accessible suburban markets. The town's size means significant neighborhood variation—from affordable West Albany to premium addresses near Loudonville. Strong rental demand near commercial corridors creates investment opportunities. Steady appreciation reflects reliable demand.",
    communityParagraph: "South Colonie Central School District serves the primary area, with strong athletics and academics. Colonie Center, Wolf Road restaurants, and the Crossings of Colonie park system serve residents. The town's commercial base provides employment and retail convenience.",
    civicKeywords: ["Colonie town hall", "Colonie property taxes", "Colonie building permits", "Colonie zoning board", "South Colonie schools"],
    lifestyleKeywords: ["Wolf Road restaurants", "Colonie Center mall", "Crossings of Colonie", "Northway Mall area", "Colonie community"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Colonie homes for sale", path: "/homes/colonie" },
      { label: "Investment properties", path: "/investment-properties" }
    ],
    focusKeywords: ["Colonie NY homes for sale", "living in Colonie NY", "South Colonie schools", "Colonie real estate", "Wolf Road area"]
  },

  voorheesville: {
    slug: "voorheesville",
    name: "Voorheesville",
    county: "Albany County",
    h1: "Voorheesville Insights, Property Data & Local Guide",
    metaDescription: "Explore Voorheesville through our professional lens. Get expert property data, school insights, and discover this village's small-town charm.",
    leadParagraph: "Voorheesville offers small-town living just 15 minutes from Albany. This village combines rural character with suburban convenience, anchored by the well-regarded Voorheesville Central School District. Residents enjoy the Helderberg Escarpment's natural beauty, Indian Ladder Farms, and a tight-knit community atmosphere that's increasingly rare in the Capital District.",
    marketParagraph: "Voorheesville's median price of $340,000 reflects its school district premium and rural appeal. Properties with acreage and Helderberg views command higher prices. The limited inventory creates competition for well-priced homes. Long-term appreciation has been steady, driven by families seeking quality schools without full suburban density.",
    communityParagraph: "Voorheesville Central School District anchors the community with small class sizes and strong academics. Indian Ladder Farms, Thacher Park, and the Helderberg Workshop provide recreation and family programming. Local businesses in the village center maintain small-town character.",
    civicKeywords: ["Voorheesville village hall", "New Scotland town hall", "Voorheesville property taxes", "New Scotland zoning", "Voorheesville school board"],
    lifestyleKeywords: ["Indian Ladder Farms", "Thacher State Park", "Helderberg Escarpment", "Voorheesville village", "New Scotland community"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Voorheesville homes for sale", path: "/homes/voorheesville" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Voorheesville NY homes for sale", "living in Voorheesville NY", "Voorheesville Central schools", "New Scotland real estate", "Helderberg area homes"]
  },

  // ========== GREENE COUNTY - Catskill Mountains Gateway ==========
  catskill: {
    slug: "catskill",
    name: "Catskill",
    county: "Greene County",
    h1: "Catskill Insights, Property Data & Local Guide",
    metaDescription: "Explore Catskill through our professional lens. Get expert property data, Airbnb potential analysis, and discover Hudson Valley's creative hub.",
    leadParagraph: "Catskill is Greene County's cultural anchor and the gateway to the Catskill Mountains. This Hudson Valley village has transformed into a creative hub, attracting Brooklyn transplants, artists, and entrepreneurs. The walkable downtown features galleries, farm-to-table restaurants, and a thriving arts scene. For investors, Catskill offers both long-term rental demand and short-term vacation rental potential.",
    marketParagraph: "Catskill's median price of $280,000 offers exceptional value compared to Hudson Valley destinations further south. Investors see 7-10% yields on long-term rentals, with short-term vacation properties generating premium income during peak seasons. Historic properties downtown appreciate as the creative economy grows. The NYC weekend crowd supports local businesses year-round.",
    communityParagraph: "Catskill Central School District serves the area. The Bridge Street Theatre, Catskill Mountain Foundation, and growing restaurant scene anchor cultural life. Proximity to Thomas Cole's historic studios and Hunter Mountain creates tourism infrastructure that supports property values.",
    civicKeywords: ["Catskill village hall", "Greene County tax office", "Catskill building permits", "Catskill zoning", "Catskill school calendar"],
    lifestyleKeywords: ["Catskill restaurants", "Hudson Valley arts", "Catskill Mountain House", "Thomas Cole historic site", "Catskill farmers market"],
    internalLinks: [
      { label: "See all Greene County Spotlights", path: "/intelligence/greene-county" },
      { label: "Catskill investment properties", path: "/homes/catskill" },
      { label: "Outdoor luxury properties", path: "/investment-properties" }
    ],
    focusKeywords: ["Catskill NY homes for sale", "living in Catskill NY", "Catskill Airbnb investment", "Hudson Valley real estate", "Catskill Mountains homes"]
  },

  windham: {
    slug: "windham",
    name: "Windham",
    county: "Greene County",
    h1: "Windham Insights, Property Data & Local Guide",
    metaDescription: "Explore Windham through our professional lens. Get expert property data, ski resort insights, and discover high-yield vacation rental potential.",
    leadParagraph: "Windham is the Catskills' premier ski destination, drawing NYC weekenders year-round. Windham Mountain Resort drives consistent tourism, while the village's restaurants, shops, and outdoor recreation create four-season appeal. For investors, Windham offers some of the region's strongest short-term rental yields, with ski-in properties commanding premium rates.",
    marketParagraph: "Windham's median price of $375,000 reflects its destination market positioning. Ski-access properties and slopeside condos generate 12-18% short-term rental yields during peak season. Year-round tourism—skiing, hiking, mountain biking, and fall foliage—supports consistent occupancy. The NYC accessibility (2.5 hours) creates reliable buyer and renter demand.",
    communityParagraph: "Windham-Ashland-Jewett Central School District serves the area. Windham Mountain Resort, the Windham Path trail system, and a walkable village center anchor community life. The resort's investment in year-round programming continues to expand the tourism season.",
    civicKeywords: ["Windham town hall", "Greene County tax office", "Windham building permits", "Windham zoning", "Windham school calendar"],
    lifestyleKeywords: ["Windham Mountain skiing", "Windham restaurants", "Catskills hiking", "Windham golf", "mountain biking Windham"],
    internalLinks: [
      { label: "See all Greene County Spotlights", path: "/intelligence/greene-county" },
      { label: "Windham vacation properties", path: "/homes/windham" },
      { label: "High-yield investment guide", path: "/investment-properties" }
    ],
    focusKeywords: ["Windham NY homes for sale", "Windham ski properties", "Catskills vacation homes", "Windham Airbnb investment", "Windham Mountain real estate"]
  },

  hunter: {
    slug: "hunter",
    name: "Hunter",
    county: "Greene County",
    h1: "Hunter Insights, Property Data & Local Guide",
    metaDescription: "Explore Hunter through our professional lens. Get expert property data, Hunter Mountain insights, and discover Catskills investment potential.",
    leadParagraph: "Hunter is the heart of Catskills recreation, anchored by Hunter Mountain Resort. This mountain village draws skiers, hikers, and festival-goers throughout the year. The Kaaterskill Falls, Mountain Top Arboretum, and scenic drives attract nature enthusiasts. For investors, Hunter offers strong vacation rental potential with year-round tourism demand.",
    marketParagraph: "Hunter's median price of $320,000 provides accessible entry into the Catskills market. Properties near Hunter Mountain generate strong short-term rental income, particularly during ski season and summer festivals. The ongoing investment in year-round mountain activities continues to expand the rental calendar and support appreciation.",
    communityParagraph: "Hunter-Tannersville Central School District serves the area. Hunter Mountain's festivals, Kaaterskill Falls, and the Mountain Top Historical Society anchor community life. The village's small-town character and dramatic mountain setting create a unique living environment.",
    civicKeywords: ["Hunter town hall", "Greene County tax office", "Hunter building permits", "Hunter zoning", "Hunter school calendar"],
    lifestyleKeywords: ["Hunter Mountain skiing", "Kaaterskill Falls", "Catskills festivals", "Hunter restaurants", "mountain recreation"],
    internalLinks: [
      { label: "See all Greene County Spotlights", path: "/intelligence/greene-county" },
      { label: "Hunter vacation properties", path: "/homes/hunter" },
      { label: "Outdoor luxury properties", path: "/investment-properties" }
    ],
    focusKeywords: ["Hunter NY homes for sale", "Hunter Mountain properties", "Catskills vacation homes", "Hunter Airbnb investment", "Kaaterskill Falls area homes"]
  },

  coxsackie: {
    slug: "coxsackie",
    name: "Coxsackie",
    county: "Greene County",
    h1: "Coxsackie Insights, Property Data & Local Guide",
    metaDescription: "Explore Coxsackie through our professional lens. Get expert property data, riverfront insights, and discover this historic Hudson River village.",
    leadParagraph: "Coxsackie is Greene County's riverfront gem, combining Hudson River access with small-town authenticity. The historic downtown features antique shops, restaurants, and a growing creative community. NYC transplants appreciate the Amtrak accessibility, while families value the strong schools and affordable housing. The waterfront revitalization continues to attract new residents and investors.",
    marketParagraph: "Coxsackie's median price of $265,000 offers excellent value for Hudson River access. Waterfront and water-view properties command premium prices, while village homes provide affordable entry points. Long-term rental demand is steady, with growing interest from remote workers seeking Hudson Valley living at accessible prices.",
    communityParagraph: "Coxsackie-Athens Central School District serves the area with solid academics. The Coxsackie Antique Center, waterfront parks, and a growing restaurant scene anchor community life. The village's historic architecture and river setting create character that's drawing new residents.",
    civicKeywords: ["Coxsackie village hall", "Greene County tax office", "Coxsackie building permits", "Coxsackie zoning", "Coxsackie-Athens school calendar"],
    lifestyleKeywords: ["Hudson River waterfront", "Coxsackie antiques", "Coxsackie restaurants", "Riverside Park", "historic Coxsackie"],
    internalLinks: [
      { label: "See all Greene County Spotlights", path: "/intelligence/greene-county" },
      { label: "Coxsackie waterfront homes", path: "/homes/coxsackie" },
      { label: "Hudson Valley investment", path: "/investment-properties" }
    ],
    focusKeywords: ["Coxsackie NY homes for sale", "living in Coxsackie NY", "Hudson River homes", "Coxsackie real estate", "Greene County waterfront"]
  },

  athens: {
    slug: "athens",
    name: "Athens",
    county: "Greene County",
    h1: "Athens Insights, Property Data & Local Guide",
    metaDescription: "Explore Athens through our professional lens. Get expert property data, Hudson River insights, and discover this historic rivertown's appeal.",
    leadParagraph: "Athens is Greene County's hidden waterfront treasure. This small rivertown offers stunning Hudson River views, historic architecture, and a peaceful alternative to busier Hudson Valley destinations. The Athens Lighthouse and riverfront park create iconic scenery, while the village's quiet character appeals to those seeking authentic small-town living.",
    marketParagraph: "Athens' median price of $245,000 offers exceptional Hudson River value. Waterfront properties with dock access command premium prices, while village homes remain affordable. The limited inventory and growing interest from NYC buyers creates upward pressure on prices. Long-term appreciation potential is strong as the Hudson Valley market continues to expand north.",
    communityParagraph: "Coxsackie-Athens Central School District serves the village. The Athens Lighthouse, Stewart House, and riverfront parks anchor community life. The village's small size creates a tight-knit atmosphere where neighbors know each other.",
    civicKeywords: ["Athens village hall", "Greene County tax office", "Athens building permits", "Athens zoning", "Coxsackie-Athens schools"],
    lifestyleKeywords: ["Athens Lighthouse", "Hudson River views", "Stewart House Athens", "riverfront living", "historic Athens NY"],
    internalLinks: [
      { label: "See all Greene County Spotlights", path: "/intelligence/greene-county" },
      { label: "Athens waterfront homes", path: "/homes/athens" },
      { label: "Hudson Valley investment", path: "/investment-properties" }
    ],
    focusKeywords: ["Athens NY homes for sale", "living in Athens NY", "Hudson River homes", "Athens real estate", "Greene County waterfront"]
  },

  // ========== SCHOHARIE COUNTY - Rural Investment Corridor ==========
  cobleskill: {
    slug: "cobleskill",
    name: "Cobleskill",
    county: "Schoharie County",
    h1: "Cobleskill Insights, Property Data & Local Guide",
    metaDescription: "Explore Cobleskill through our professional lens. Get expert property data, SUNY insights, and discover this college town's investment potential.",
    leadParagraph: "Cobleskill is Schoharie County's anchor, home to SUNY Cobleskill and the region's commercial center. The college creates consistent rental demand, while the village's agricultural roots maintain authentic rural character. For investors, Cobleskill offers stable cash flow from student housing and accessible entry points for building a rental portfolio.",
    marketParagraph: "Cobleskill's median price of $175,000 is among the most accessible in the Capital District region. SUNY Cobleskill drives rental demand, with multi-family properties generating 9-12% returns. The agricultural economy provides stability, while growing interest from remote workers seeking rural affordability creates new buyer demand.",
    communityParagraph: "Cobleskill-Richmondville Central School District serves the area. SUNY Cobleskill's agricultural programs, the Cobleskill Fairgrounds, and local shops on Main Street anchor community life. The college brings cultural programming and maintains a young, active population.",
    civicKeywords: ["Cobleskill village hall", "Schoharie County tax office", "Cobleskill building permits", "Cobleskill zoning", "SUNY Cobleskill campus"],
    lifestyleKeywords: ["SUNY Cobleskill", "Cobleskill Fair", "Schoharie Valley", "rural Cobleskill", "college town living"],
    internalLinks: [
      { label: "See all Schoharie County Spotlights", path: "/intelligence/schoharie-county" },
      { label: "Cobleskill investment properties", path: "/homes/cobleskill" },
      { label: "Student housing investment", path: "/investment-properties" }
    ],
    focusKeywords: ["Cobleskill NY homes for sale", "living in Cobleskill NY", "SUNY Cobleskill housing", "Cobleskill real estate", "Schoharie County investment"]
  },

  schoharie: {
    slug: "schoharie",
    name: "Schoharie",
    county: "Schoharie County",
    h1: "Schoharie Insights, Property Data & Local Guide",
    metaDescription: "Explore Schoharie through our professional lens. Get expert property data, historic village insights, and discover rural investment potential.",
    leadParagraph: "Schoharie is the county seat and a village steeped in Revolutionary War history. The Old Stone Fort Museum, historic Main Street, and Schoharie Creek create a picturesque setting. For buyers seeking authentic rural living with historic character, Schoharie offers a slower pace just 45 minutes from Albany.",
    marketParagraph: "Schoharie's median price of $185,000 provides exceptional affordability. Historic homes with character features are available at prices that would be impossible in suburban markets. Long-term rental demand is steady, with growing interest from remote workers and retirees seeking peaceful settings. Agricultural land and larger properties offer additional opportunities.",
    communityParagraph: "Schoharie Central School District serves the village with small class sizes. The Old Stone Fort Museum, Schoharie Creek, and historic village center anchor community life. The county courthouse and government offices provide local employment.",
    civicKeywords: ["Schoharie village hall", "Schoharie County courthouse", "Schoharie tax office", "Schoharie building permits", "Schoharie school board"],
    lifestyleKeywords: ["Old Stone Fort Museum", "Schoharie Creek", "historic Schoharie", "rural Schoharie Valley", "Schoharie community"],
    internalLinks: [
      { label: "See all Schoharie County Spotlights", path: "/intelligence/schoharie-county" },
      { label: "Schoharie historic homes", path: "/homes/schoharie" },
      { label: "Rural investment guide", path: "/investment-properties" }
    ],
    focusKeywords: ["Schoharie NY homes for sale", "living in Schoharie NY", "Schoharie Valley real estate", "historic Schoharie homes", "Schoharie County properties"]
  },

  "sharon-springs": {
    slug: "sharon-springs",
    name: "Sharon Springs",
    county: "Schoharie County",
    h1: "Sharon Springs Insights, Property Data & Local Guide",
    metaDescription: "Explore Sharon Springs through our professional lens. Get expert property data, resort revival insights, and discover this hidden gem's potential.",
    leadParagraph: "Sharon Springs is experiencing a renaissance. This historic spa village, once a grand resort destination, is being rediscovered by artists, entrepreneurs, and remote workers. The village's Victorian architecture, natural mineral springs, and peaceful setting create unique character. For investors and buyers seeking something special, Sharon Springs offers untapped potential.",
    marketParagraph: "Sharon Springs' median price of $150,000 makes it one of the region's most affordable entry points. Historic Victorian properties with significant potential are available at remarkable prices. The village's revival—driven by new restaurants, shops, and the American Hotel restoration—is beginning to drive appreciation. Early investors have seen strong returns.",
    communityParagraph: "Sharon Springs Central School District serves the village with intimate class sizes. The Beekman 1802 Farm, American Hotel, and village shops anchor the growing creative economy. The annual Harvest Festival and cultural events draw visitors year-round.",
    civicKeywords: ["Sharon Springs village hall", "Schoharie County tax office", "Sharon Springs building permits", "Sharon Springs zoning", "Sharon Springs school board"],
    lifestyleKeywords: ["Beekman 1802 Farm", "American Hotel Sharon Springs", "mineral springs spa", "Victorian Sharon Springs", "Sharon Springs revival"],
    internalLinks: [
      { label: "See all Schoharie County Spotlights", path: "/intelligence/schoharie-county" },
      { label: "Sharon Springs properties", path: "/homes/sharon-springs" },
      { label: "Historic investment guide", path: "/investment-properties" }
    ],
    focusKeywords: ["Sharon Springs NY homes for sale", "living in Sharon Springs NY", "Sharon Springs real estate", "historic Sharon Springs", "Beekman 1802 area"]
  },

  middleburgh: {
    slug: "middleburgh",
    name: "Middleburgh",
    county: "Schoharie County",
    h1: "Middleburgh Insights, Property Data & Local Guide",
    metaDescription: "Explore Middleburgh through our professional lens. Get expert property data, agricultural insights, and discover rural Schoharie Valley living.",
    leadParagraph: "Middleburgh is the agricultural heart of Schoharie Valley. This village offers authentic rural living surrounded by working farms and scenic beauty. The community's resilience after flooding has strengthened local bonds, while affordable housing attracts families seeking value and space. For those escaping suburban density, Middleburgh provides genuine country living.",
    marketParagraph: "Middleburgh's median price of $165,000 offers remarkable affordability. Properties with acreage are available at prices impossible to find closer to Albany. The agricultural economy provides stability, while growing interest from remote workers creates new demand. Historic homes and farmhouses offer character unavailable in newer developments.",
    communityParagraph: "Middleburgh Central School District serves the village with personalized attention. Local farms, the Schoharie Creek, and village shops anchor community life. The community's recovery from past flooding demonstrates the resilience and mutual support that characterizes rural living.",
    civicKeywords: ["Middleburgh village hall", "Schoharie County tax office", "Middleburgh building permits", "Middleburgh zoning", "Middleburgh school board"],
    lifestyleKeywords: ["Schoharie Valley farms", "rural Middleburgh", "Middleburgh community", "agricultural Schoharie", "country living"],
    internalLinks: [
      { label: "See all Schoharie County Spotlights", path: "/intelligence/schoharie-county" },
      { label: "Middleburgh properties", path: "/homes/middleburgh" },
      { label: "Rural investment guide", path: "/investment-properties" }
    ],
    focusKeywords: ["Middleburgh NY homes for sale", "living in Middleburgh NY", "Schoharie Valley real estate", "Middleburgh farms", "rural Schoharie County"]
  },

  // ========== ADDITIONAL TOWNS ==========
  cohoes: {
    slug: "cohoes",
    name: "Cohoes",
    county: "Albany County",
    h1: "Cohoes Insights, Property Data & Local Guide",
    metaDescription: "Explore Cohoes through our professional lens. Get expert property data, waterfall city insights, and discover this mill town's revival.",
    leadParagraph: "Cohoes, the 'Spindle City,' is experiencing a renaissance. The dramatic Cohoes Falls, historic mill architecture, and walkable downtown create unique character. This compact city offers urban living at accessible prices, drawing artists, young professionals, and investors seeking cash flow properties with upside potential.",
    marketParagraph: "Cohoes' median price of $195,000 offers exceptional value for an urban environment. Multi-family properties generate 8-10% returns, supported by steady rental demand. The ongoing downtown revitalization and growing restaurant scene continue to drive appreciation. The walkable core and waterfall views create lifestyle appeal unavailable at these prices elsewhere.",
    communityParagraph: "Cohoes City Schools serve the district. Cohoes Falls, the historic Harmony Mills, and downtown restaurants anchor community life. The Music Hall and arts venues provide cultural programming. The city's compact size creates a tight-knit community atmosphere.",
    civicKeywords: ["Cohoes city hall", "Cohoes tax assessor", "Cohoes building permits", "Cohoes zoning", "Cohoes school calendar"],
    lifestyleKeywords: ["Cohoes Falls", "Harmony Mills", "downtown Cohoes", "Cohoes restaurants", "Spindle City"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Cohoes investment properties", path: "/homes/cohoes" },
      { label: "Multi-unit investment guide", path: "/investment-properties" }
    ],
    focusKeywords: ["Cohoes NY homes for sale", "living in Cohoes NY", "Cohoes investment properties", "Cohoes Falls area", "Harmony Mills Cohoes"]
  },

  loudonville: {
    slug: "loudonville",
    name: "Loudonville",
    county: "Albany County",
    h1: "Loudonville Insights, Property Data & Local Guide",
    metaDescription: "Explore Loudonville through our professional lens. Get expert property data, premium market insights, and discover Albany's executive suburb.",
    leadParagraph: "Loudonville is Albany County's executive address. This affluent hamlet combines historic estates with newer luxury construction, all within minutes of downtown Albany. Siena College provides educational presence, while tree-lined streets and generous lots create a prestigious suburban environment that attracts professionals and executives.",
    marketParagraph: "Loudonville's median price of $525,000 reflects its premium positioning. Properties range from updated colonials to waterfront estates, with the most desirable addresses near Loudon Road and the Shaker Road corridor. Inventory is limited and competition is consistent. Long-term appreciation has been strong and steady.",
    communityParagraph: "North Colonie Central School District serves Loudonville with excellent academics and athletics. Siena College, The Desmond Hotel, and upscale dining anchor the area. The hamlet's proximity to Albany while maintaining suburban character creates lasting appeal.",
    civicKeywords: ["Colonie town hall", "Loudonville property taxes", "North Colonie building permits", "Loudonville zoning", "North Colonie schools"],
    lifestyleKeywords: ["Siena College area", "Loudon Road corridor", "Loudonville restaurants", "executive Loudonville", "Shaker Road area"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Loudonville luxury homes", path: "/homes/loudonville" },
      { label: "Premium market guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Loudonville NY homes for sale", "living in Loudonville NY", "Loudonville real estate", "North Colonie schools", "executive homes Albany"]
  },

  watervliet: {
    slug: "watervliet",
    name: "Watervliet",
    county: "Albany County",
    h1: "Watervliet Insights, Property Data & Local Guide",
    metaDescription: "Explore Watervliet through our professional lens. Get expert property data, Arsenal city insights, and discover investment opportunities.",
    leadParagraph: "Watervliet, home to the historic Watervliet Arsenal, offers urban convenience at accessible prices. This compact city provides quick access to Albany while maintaining its own identity. The housing stock of two-family homes and smaller properties creates investor opportunities, while first-time buyers find entry points that are increasingly rare in the Capital District.",
    marketParagraph: "Watervliet's median price of $175,000 makes it one of the region's most accessible markets. Two-family properties generate 8-11% returns, supported by steady rental demand from Arsenal employees and Albany commuters. The city's compact size and urban walkability appeal to buyers priced out of neighboring communities.",
    communityParagraph: "Watervliet City Schools serve the district. The Watervliet Arsenal, downtown shops, and community parks anchor local life. The city's diverse, working-class character creates authentic urban community that's increasingly valued.",
    civicKeywords: ["Watervliet city hall", "Watervliet tax assessor", "Watervliet building permits", "Watervliet zoning", "Watervliet school calendar"],
    lifestyleKeywords: ["Watervliet Arsenal", "downtown Watervliet", "Watervliet community", "urban Watervliet", "Arsenal city"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Watervliet investment properties", path: "/homes/watervliet" },
      { label: "Multi-unit investment guide", path: "/investment-properties" }
    ],
    focusKeywords: ["Watervliet NY homes for sale", "living in Watervliet NY", "Watervliet investment properties", "Watervliet Arsenal area", "Watervliet multi-family"]
  },

  rensselaer: {
    slug: "rensselaer",
    name: "Rensselaer",
    county: "Rensselaer County",
    h1: "Rensselaer Insights, Property Data & Local Guide",
    metaDescription: "Explore Rensselaer through our professional lens. Get expert property data, Amtrak station insights, and discover riverfront investment potential.",
    leadParagraph: "Rensselaer is the Capital District's transportation hub, home to the Albany-Rensselaer Amtrak station. This small city offers Hudson River access, Albany skyline views, and urban convenience at accessible prices. The train station creates unique rental demand from commuters, while investors find cash flow opportunities in the diverse housing stock.",
    marketParagraph: "Rensselaer's median price of $185,000 offers strong value for riverfront access. Properties near the Amtrak station command premium rents from commuters. Multi-family properties generate 8-10% returns. The city's strategic location and transportation access continue to drive interest from investors and commuter buyers.",
    communityParagraph: "Rensselaer City Schools serve the district. The Amtrak station, Riverfront Park, and local restaurants anchor community life. The city's compact size and urban character create a walkable environment with authentic neighborhoods.",
    civicKeywords: ["Rensselaer city hall", "Rensselaer tax assessor", "Rensselaer building permits", "Rensselaer zoning", "Rensselaer school calendar"],
    lifestyleKeywords: ["Albany-Rensselaer Amtrak", "Rensselaer riverfront", "downtown Rensselaer", "Hudson River access", "train commuter living"],
    internalLinks: [
      { label: "See all Rensselaer County Spotlights", path: "/intelligence/rensselaer-county" },
      { label: "Rensselaer investment properties", path: "/homes/rensselaer" },
      { label: "Commuter housing guide", path: "/investment-properties" }
    ],
    focusKeywords: ["Rensselaer NY homes for sale", "living in Rensselaer NY", "Amtrak station housing", "Rensselaer riverfront", "Rensselaer investment properties"]
  },

  "east-greenbush": {
    slug: "east-greenbush",
    name: "East Greenbush",
    county: "Rensselaer County",
    h1: "East Greenbush Insights, Property Data & Local Guide",
    metaDescription: "Explore East Greenbush through our professional lens. Get expert property data, school insights, and discover this commuter suburb's appeal.",
    leadParagraph: "East Greenbush offers the complete suburban package in Rensselaer County. Strong schools, convenient shopping along Route 9 & 20, and quick Albany access make it a top choice for families. The diverse housing stock—from townhomes to custom colonials—provides options for various budgets. Recent commercial development has enhanced convenience.",
    marketParagraph: "East Greenbush's median price of $335,000 positions it as a strong value alternative to more expensive Albany County suburbs. The well-regarded East Greenbush Central School District drives family demand. Inventory moves steadily, with well-maintained homes selling quickly. Long-term appreciation has been consistent.",
    communityParagraph: "East Greenbush Central School District anchors the community with strong academics. Route 9 & 20 commercial corridor provides shopping and dining. Hampton Manor and other established neighborhoods maintain desirable character and community connection.",
    civicKeywords: ["East Greenbush town hall", "East Greenbush property taxes", "East Greenbush building permits", "East Greenbush zoning", "East Greenbush school board"],
    lifestyleKeywords: ["Hampton Manor", "Route 9 & 20 shopping", "East Greenbush schools", "East Greenbush community", "suburban East Greenbush"],
    internalLinks: [
      { label: "See all Rensselaer County Spotlights", path: "/intelligence/rensselaer-county" },
      { label: "East Greenbush homes for sale", path: "/homes/east-greenbush" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["East Greenbush NY homes for sale", "living in East Greenbush NY", "East Greenbush Central schools", "East Greenbush real estate", "Rensselaer County suburbs"]
  },

  queensbury: {
    slug: "queensbury",
    name: "Queensbury",
    county: "Warren County",
    h1: "Queensbury Insights, Property Data & Local Guide",
    metaDescription: "Explore Queensbury through our professional lens. Get expert property data, Lake George insights, and discover Adirondack gateway living.",
    leadParagraph: "Queensbury is the gateway to Lake George and the Adirondacks. This Warren County town combines suburban convenience with outdoor recreation access. The Aviation Mall area provides commercial amenities, while residential neighborhoods offer views and proximity to the region's premier vacation destination. Lake proximity creates unique seasonal and year-round opportunities.",
    marketParagraph: "Queensbury's median price of $385,000 reflects its destination-adjacent positioning. Properties with lake access or views command significant premiums. The seasonal rental market provides income opportunities during peak tourism months. Year-round residents enjoy strong schools and outdoor lifestyle, while investors target vacation rental potential.",
    communityParagraph: "Queensbury Union Free School District serves the town with solid academics. The Aviation Mall, Lake George Beach, and Adirondack recreation access anchor community life. The Great Escape provides seasonal entertainment and employment.",
    civicKeywords: ["Queensbury town hall", "Warren County tax office", "Queensbury building permits", "Queensbury zoning", "Queensbury school calendar"],
    lifestyleKeywords: ["Lake George access", "Adirondack recreation", "Aviation Mall", "Great Escape", "outdoor Queensbury"],
    internalLinks: [
      { label: "See all Warren County Spotlights", path: "/intelligence/warren-county" },
      { label: "Queensbury lake properties", path: "/homes/queensbury" },
      { label: "Vacation rental investment", path: "/investment-properties" }
    ],
    focusKeywords: ["Queensbury NY homes for sale", "living in Queensbury NY", "Lake George area homes", "Queensbury real estate", "Adirondack gateway properties"]
  },

  amsterdam: {
    slug: "amsterdam",
    name: "Amsterdam",
    county: "Montgomery County",
    h1: "Amsterdam Insights, Property Data & Local Guide",
    metaDescription: "Explore Amsterdam through our professional lens. Get expert property data, Mohawk River insights, and discover investment opportunities.",
    leadParagraph: "Amsterdam is Montgomery County's population center, positioned along the historic Mohawk River and Erie Canal corridor. This former manufacturing city offers exceptional value and investor opportunities. The housing stock of two and three-family properties creates cash flow potential, while the growing arts scene and downtown revitalization hint at future appreciation.",
    marketParagraph: "Amsterdam's median price of $125,000 is among the most accessible in the Greater Capital Region. Multi-family properties generate 10-14% returns, with some of the region's strongest cash flow potential. The city's affordability attracts first-time buyers and investors alike. Downtown revitalization efforts continue to drive renewed interest.",
    communityParagraph: "Amsterdam City Schools serve the district. The Mohawk River waterfront, downtown shops, and emerging arts venues anchor community life. The city's diverse, working-class character maintains authentic urban community.",
    civicKeywords: ["Amsterdam city hall", "Montgomery County tax office", "Amsterdam building permits", "Amsterdam zoning", "Amsterdam school calendar"],
    lifestyleKeywords: ["Mohawk River waterfront", "downtown Amsterdam", "Erie Canal heritage", "Amsterdam arts", "Amsterdam community"],
    internalLinks: [
      { label: "See all Montgomery County Spotlights", path: "/intelligence/montgomery-county" },
      { label: "Amsterdam investment properties", path: "/homes/amsterdam" },
      { label: "High-yield investment guide", path: "/investment-properties" }
    ],
    focusKeywords: ["Amsterdam NY homes for sale", "living in Amsterdam NY", "Amsterdam investment properties", "Mohawk Valley real estate", "Amsterdam multi-family"]
  },

  mechanicville: {
    slug: "mechanicville",
    name: "Mechanicville",
    county: "Saratoga County",
    h1: "Mechanicville Insights, Property Data & Local Guide",
    metaDescription: "Explore Mechanicville through our professional lens. Get expert property data, river city insights, and discover accessible Saratoga County living.",
    leadParagraph: "Mechanicville is Saratoga County's most accessible entry point. This small city on the Hudson River offers urban character, walkable streets, and prices well below surrounding suburbs. The historic downtown maintains authentic character, while the housing stock of Victorians and two-families creates both owner-occupant and investor opportunities.",
    marketParagraph: "Mechanicville's median price of $215,000 provides exceptional Saratoga County value. Multi-family properties generate 8-10% returns, supported by steady rental demand. The city's compact size and urban character appeal to buyers priced out of Clifton Park and Saratoga Springs. Growing interest from remote workers expands the buyer pool.",
    communityParagraph: "Mechanicville City Schools serve the district. Downtown shops, the Hudson River waterfront, and community events anchor local life. The city's small-town feel within a Saratoga County address creates unique appeal.",
    civicKeywords: ["Mechanicville city hall", "Mechanicville tax assessor", "Mechanicville building permits", "Mechanicville zoning", "Mechanicville school calendar"],
    lifestyleKeywords: ["downtown Mechanicville", "Hudson River Mechanicville", "Mechanicville community", "Mechanicville walkability", "small city living"],
    internalLinks: [
      { label: "See all Saratoga County Spotlights", path: "/intelligence/saratoga-county" },
      { label: "Mechanicville investment properties", path: "/homes/mechanicville" },
      { label: "Affordable Saratoga County", path: "/investment-properties" }
    ],
    focusKeywords: ["Mechanicville NY homes for sale", "living in Mechanicville NY", "Mechanicville real estate", "affordable Saratoga County", "Mechanicville investment"]
  },

  "ballston-spa": {
    slug: "ballston-spa",
    name: "Ballston Spa",
    county: "Saratoga County",
    h1: "Ballston Spa Insights, Property Data & Local Guide",
    metaDescription: "Explore Ballston Spa through our professional lens. Get expert property data, village charm insights, and discover this historic spa town.",
    leadParagraph: "Ballston Spa is Saratoga County's historic village gem. The walkable downtown features local shops, restaurants, and mineral spring heritage. Families appreciate the Ballston Spa Central School District, while buyers seeking character value the Victorian architecture and small-town atmosphere. The village's identity as a spa destination creates unique charm.",
    marketParagraph: "Ballston Spa's median price of $345,000 positions it as an accessible alternative to Saratoga Springs. Victorian homes near the village center command premium prices, while surrounding neighborhoods offer more accessible entry points. The strong school district and village character drive consistent demand from families.",
    communityParagraph: "Ballston Spa Central School District serves the village with strong academics. The village's historic downtown, mineral springs heritage, and community events anchor local life. The walkable scale creates a neighborly atmosphere increasingly rare in suburban Saratoga County.",
    civicKeywords: ["Ballston Spa village hall", "Ballston town hall", "Ballston Spa property taxes", "Ballston Spa zoning", "Ballston Spa school board"],
    lifestyleKeywords: ["downtown Ballston Spa", "Ballston Spa restaurants", "mineral springs heritage", "Victorian Ballston Spa", "village living"],
    internalLinks: [
      { label: "See all Saratoga County Spotlights", path: "/intelligence/saratoga-county" },
      { label: "Ballston Spa homes for sale", path: "/homes/ballston-spa" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Ballston Spa NY homes for sale", "living in Ballston Spa NY", "Ballston Spa Central schools", "Ballston Spa real estate", "Saratoga County villages"]
  },

  malta: {
    slug: "malta",
    name: "Malta",
    county: "Saratoga County",
    h1: "Malta Insights, Property Data & Local Guide",
    metaDescription: "Explore Malta through our professional lens. Get expert property data, GlobalFoundries insights, and discover Saratoga County's growth hub.",
    leadParagraph: "Malta has transformed from a quiet town to Saratoga County's technology and growth hub. GlobalFoundries' semiconductor fabrication plant has attracted engineers and professionals, while Luther Forest Technology Campus continues to develop. New construction neighborhoods serve growing families, while the town maintains rural character in surrounding areas.",
    marketParagraph: "Malta's median price of $425,000 reflects the tech industry premium. New construction in developments near GlobalFoundries moves quickly, driven by employee relocations. The Shenendehowa school district (shared with Clifton Park) adds to demand. Strong appreciation has rewarded early buyers, with continued growth expected as the tech campus expands.",
    communityParagraph: "Shenendehowa Central School District serves Malta with top-tier academics. Luther Forest Technology Campus, the Round Lake village center, and growing commercial development anchor community life. The town balances new growth with preservation of rural character.",
    civicKeywords: ["Malta town hall", "Malta property taxes", "Malta building permits", "Malta zoning board", "Shenendehowa schools"],
    lifestyleKeywords: ["GlobalFoundries Malta", "Luther Forest", "Round Lake village", "Malta tech campus", "new construction Malta"],
    internalLinks: [
      { label: "See all Saratoga County Spotlights", path: "/intelligence/saratoga-county" },
      { label: "Malta new construction", path: "/homes/malta" },
      { label: "Tech sector housing", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Malta NY homes for sale", "living in Malta NY", "GlobalFoundries housing", "Malta real estate", "Luther Forest homes"]
  },

  glenville: {
    slug: "glenville",
    name: "Glenville",
    county: "Schenectady County",
    h1: "Glenville Insights, Property Data & Local Guide",
    metaDescription: "Explore Glenville through our professional lens. Get expert property data, school insights, and discover this growing Schenectady County town.",
    leadParagraph: "Glenville offers growing Schenectady County living with Scotia-Glenville schools. The town balances residential neighborhoods with commercial convenience along Route 50. Families appreciate the school district's strong reputation, while the mix of established neighborhoods and newer developments provides housing options for various budgets.",
    marketParagraph: "Glenville's median price of $310,000 positions it as an accessible alternative to pricier Niskayuna. The Scotia-Glenville school district premium drives family demand. Properties range from 1950s-60s ranches to newer colonials, with steady appreciation across the market. The town's balance of value and quality creates consistent buyer interest.",
    communityParagraph: "Scotia-Glenville Central School District serves the town with solid academics. Collins Park, Route 50 commercial corridor, and community sports programs anchor local life. The town's mix of residential character and convenience appeals to families seeking value.",
    civicKeywords: ["Glenville town hall", "Glenville property taxes", "Glenville building permits", "Glenville zoning", "Scotia-Glenville schools"],
    lifestyleKeywords: ["Collins Park Glenville", "Route 50 corridor", "Glenville community", "Scotia-Glenville area", "suburban Glenville"],
    internalLinks: [
      { label: "See all Schenectady County Spotlights", path: "/intelligence/schenectady-county" },
      { label: "Glenville homes for sale", path: "/homes/glenville" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Glenville NY homes for sale", "living in Glenville NY", "Scotia-Glenville schools", "Glenville real estate", "Schenectady County suburbs"]
  },

  rotterdam: {
    slug: "rotterdam",
    name: "Rotterdam",
    county: "Schenectady County",
    h1: "Rotterdam Insights, Property Data & Local Guide",
    metaDescription: "Explore Rotterdam through our professional lens. Get expert property data, market trends, and discover this accessible Schenectady County town.",
    leadParagraph: "Rotterdam is Schenectady County's largest town, offering suburban convenience at accessible prices. The Route 7 corridor provides extensive shopping and dining, while established residential neighborhoods serve families and first-time buyers. The town's size creates diverse housing options, from modest ranches to larger colonials.",
    marketParagraph: "Rotterdam's median price of $265,000 makes it one of the region's most accessible suburban markets. The Mohonasen Central School District serves the area with solid academics. Inventory moves steadily across all price points. First-time buyers find entry points that are increasingly rare, while investors identify rental opportunities in the housing stock.",
    communityParagraph: "Mohonasen Central School District serves Rotterdam. The Route 7 commercial corridor, Mekeel Christian Academy, and community parks anchor local life. The town's commercial base provides employment and retail convenience.",
    civicKeywords: ["Rotterdam town hall", "Rotterdam property taxes", "Rotterdam building permits", "Rotterdam zoning", "Mohonasen schools"],
    lifestyleKeywords: ["Route 7 Rotterdam", "Rotterdam shopping", "Mohonasen area", "suburban Rotterdam", "Rotterdam community"],
    internalLinks: [
      { label: "See all Schenectady County Spotlights", path: "/intelligence/schenectady-county" },
      { label: "Rotterdam homes for sale", path: "/homes/rotterdam" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Rotterdam NY homes for sale", "living in Rotterdam NY", "Mohonasen schools", "Rotterdam real estate", "affordable Schenectady County"]
  },

  halfmoon: {
    slug: "halfmoon",
    name: "Halfmoon",
    county: "Saratoga County",
    h1: "Halfmoon Insights, Property Data & Local Guide",
    metaDescription: "Explore Halfmoon through our professional lens. Get expert property data, Shenendehowa insights, and discover this growing Saratoga suburb.",
    leadParagraph: "Halfmoon offers growing Saratoga County living with Shenendehowa schools. The town's position near the Northway makes it ideal for commuters, while residential neighborhoods range from established to new construction. Families value the school district and community programs, while convenient access to Clifton Park amenities adds appeal.",
    marketParagraph: "Halfmoon's median price of $385,000 positions it as a strong Shenendehowa alternative to Clifton Park. New construction competes with established neighborhoods, providing options for various preferences. The shared school district with Clifton Park ensures consistent demand from families prioritizing education.",
    communityParagraph: "Shenendehowa Central School District serves Halfmoon with excellent academics. The Northway corridor, community parks, and proximity to Clifton Park amenities anchor local life. The town's growth has brought new commercial development while maintaining residential character.",
    civicKeywords: ["Halfmoon town hall", "Halfmoon property taxes", "Halfmoon building permits", "Halfmoon zoning", "Shenendehowa schools"],
    lifestyleKeywords: ["Shenendehowa schools", "Northway access", "Halfmoon community", "new construction Halfmoon", "suburban Halfmoon"],
    internalLinks: [
      { label: "See all Saratoga County Spotlights", path: "/intelligence/saratoga-county" },
      { label: "Halfmoon homes for sale", path: "/homes/halfmoon" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Halfmoon NY homes for sale", "living in Halfmoon NY", "Shenendehowa schools", "Halfmoon real estate", "Saratoga County suburbs"]
  },

  wilton: {
    slug: "wilton",
    name: "Wilton",
    county: "Saratoga County",
    h1: "Wilton Insights, Property Data & Local Guide",
    metaDescription: "Explore Wilton through our professional lens. Get expert property data, Saratoga Springs school insights, and discover this growing town.",
    leadParagraph: "Wilton offers Saratoga Springs schools without Saratoga Springs prices. This growing town north of the city combines suburban convenience with rural character. The Route 50 corridor provides commercial amenities, while residential areas range from established neighborhoods to newer developments with acreage.",
    marketParagraph: "Wilton's median price of $445,000 provides value relative to Saratoga Springs proper. Properties in the Saratoga Springs Central School District command the school premium, while the town's diversity of housing stock creates options for various budgets. Growing commercial development has enhanced convenience.",
    communityParagraph: "Saratoga Springs Central School District serves most of Wilton. The Route 50 commercial corridor, Gavin Park, and community programs anchor local life. The town's balance of growth and preservation appeals to families seeking Saratoga schools with more space.",
    civicKeywords: ["Wilton town hall", "Wilton property taxes", "Wilton building permits", "Wilton zoning", "Saratoga Springs schools"],
    lifestyleKeywords: ["Gavin Park Wilton", "Route 50 Wilton", "Saratoga schools", "suburban Wilton", "Wilton community"],
    internalLinks: [
      { label: "See all Saratoga County Spotlights", path: "/intelligence/saratoga-county" },
      { label: "Wilton homes for sale", path: "/homes/wilton" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Wilton NY homes for sale", "living in Wilton NY", "Saratoga Springs schools Wilton", "Wilton real estate", "north Saratoga County"]
  },

  stillwater: {
    slug: "stillwater",
    name: "Stillwater",
    county: "Saratoga County",
    h1: "Stillwater Insights, Property Data & Local Guide",
    metaDescription: "Explore Stillwater through our professional lens. Get expert property data, Revolutionary War history, and discover this rural Saratoga town.",
    leadParagraph: "Stillwater is where American independence was secured at the Battles of Saratoga. This rural Saratoga County town combines Revolutionary War history with peaceful living. The Saratoga National Historical Park draws visitors, while residents enjoy the small-town atmosphere, strong schools, and access to Hudson River and lake recreation.",
    marketParagraph: "Stillwater's median price of $315,000 offers rural value in Saratoga County. Properties with acreage and water access command premium prices. The Stillwater Central School District's strong reputation drives family demand. The town's historic significance and natural beauty create unique appeal for buyers seeking something beyond typical suburbia.",
    communityParagraph: "Stillwater Central School District serves the town with personalized attention. The Saratoga National Historical Park, Stillwater Blockhouse, and Hudson River access anchor community life. The town's small size creates close-knit community bonds.",
    civicKeywords: ["Stillwater town hall", "Stillwater property taxes", "Stillwater building permits", "Stillwater zoning", "Stillwater school board"],
    lifestyleKeywords: ["Saratoga Battlefield", "Stillwater Blockhouse", "Hudson River access", "rural Stillwater", "historic Stillwater"],
    internalLinks: [
      { label: "See all Saratoga County Spotlights", path: "/intelligence/saratoga-county" },
      { label: "Stillwater properties", path: "/homes/stillwater" },
      { label: "Rural Saratoga County", path: "/investment-properties" }
    ],
    focusKeywords: ["Stillwater NY homes for sale", "living in Stillwater NY", "Saratoga Battlefield area", "Stillwater real estate", "rural Saratoga County"]
  },

  waterford: {
    slug: "waterford",
    name: "Waterford",
    county: "Saratoga County",
    h1: "Waterford Insights, Property Data & Local Guide",
    metaDescription: "Explore Waterford through our professional lens. Get expert property data, canal heritage insights, and discover this historic river village.",
    leadParagraph: "Waterford is New York's oldest incorporated village, situated at the confluence of the Hudson and Mohawk Rivers. The Flight of Locks on the Erie Canal provides historic significance and tourist interest. The walkable village center, canal heritage, and waterfront access create unique character at accessible prices.",
    marketParagraph: "Waterford's median price of $245,000 offers excellent value for waterfront proximity. Historic homes near the village center and canal provide character unavailable in newer developments. The Waterford-Halfmoon school district serves families well. Growing interest in canal heritage tourism and waterfront living continues to drive buyer interest.",
    communityParagraph: "Waterford-Halfmoon Union Free School District serves the village. The Flight of Locks, Peebles Island State Park, and the historic village center anchor community life. The Tugboat Roundup and canal festivals draw visitors year-round.",
    civicKeywords: ["Waterford village hall", "Waterford property taxes", "Waterford building permits", "Waterford zoning", "Waterford-Halfmoon schools"],
    lifestyleKeywords: ["Erie Canal locks", "Peebles Island", "Waterford Tugboat Roundup", "historic Waterford", "canal village living"],
    internalLinks: [
      { label: "See all Saratoga County Spotlights", path: "/intelligence/saratoga-county" },
      { label: "Waterford historic homes", path: "/homes/waterford" },
      { label: "Waterfront properties", path: "/investment-properties" }
    ],
    focusKeywords: ["Waterford NY homes for sale", "living in Waterford NY", "Erie Canal homes", "Waterford real estate", "historic Waterford village"]
  },

  "green-island": {
    slug: "green-island",
    name: "Green Island",
    county: "Albany County",
    h1: "Green Island Insights, Property Data & Local Guide",
    metaDescription: "Explore Green Island through our professional lens. Get expert property data and discover this unique island municipality.",
    leadParagraph: "Green Island is New York's smallest town by area—and entirely an island in the Hudson River. This unique municipality offers urban convenience, industrial heritage, and a tight-knit community. The compact size creates walkability, while the affordable housing stock attracts first-time buyers and investors seeking entry points.",
    marketParagraph: "Green Island's median price of $165,000 makes it one of the Capital District's most accessible markets. The small housing stock means limited inventory, but properties that list often attract investor interest for the cash flow potential. The island's unique character and affordability create appeal for buyers seeking something different.",
    communityParagraph: "Green Island Union Free School District serves the community with small class sizes. The island's parks, marina access, and tight-knit neighborhoods anchor local life. The compact size means neighbors know each other and community events draw high participation.",
    civicKeywords: ["Green Island town hall", "Green Island property taxes", "Green Island building permits", "Green Island zoning", "Green Island schools"],
    lifestyleKeywords: ["Hudson River island", "Green Island community", "waterfront Green Island", "industrial heritage", "walkable Green Island"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Green Island properties", path: "/homes/green-island" },
      { label: "Affordable Capital District", path: "/investment-properties" }
    ],
    focusKeywords: ["Green Island NY homes for sale", "living in Green Island NY", "Green Island real estate", "Hudson River island homes", "affordable Albany area"]
  },

  latham: {
    slug: "latham",
    name: "Latham",
    county: "Albany County",
    h1: "Latham Insights, Property Data & Local Guide",
    metaDescription: "Explore Latham through our professional lens. Get expert property data, market insights, and discover this established Albany suburb.",
    leadParagraph: "Latham is an established hamlet in the Town of Colonie, positioned between Albany and the Northway. The area combines commercial convenience with residential neighborhoods that range from 1950s ranches to newer developments. Proximity to the airport, shopping centers, and major employers makes Latham ideal for commuters.",
    marketParagraph: "Latham's median price of $295,000 offers strong value for North Colonie schools. The established housing stock provides options for first-time buyers and families alike. Properties near the Latham Circle and Northway access move quickly. Commercial convenience and school quality drive consistent demand.",
    communityParagraph: "North Colonie Central School District serves Latham with excellent academics. Latham Circle Mall, Latham Farms, and Route 9 commercial corridor provide shopping and dining. The mix of residential character and commercial convenience serves diverse lifestyles.",
    civicKeywords: ["Colonie town hall", "Latham property taxes", "North Colonie building permits", "Latham zoning", "North Colonie schools"],
    lifestyleKeywords: ["Latham Circle", "Latham Farms", "Route 9 Latham", "North Colonie area", "suburban Latham"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Latham homes for sale", path: "/homes/latham" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Latham NY homes for sale", "living in Latham NY", "North Colonie schools", "Latham real estate", "Latham Circle area"]
  },

  menands: {
    slug: "menands",
    name: "Menands",
    county: "Albany County",
    h1: "Menands Insights, Property Data & Local Guide",
    metaDescription: "Explore Menands through our professional lens. Get expert property data and discover this compact Albany-adjacent village.",
    leadParagraph: "Menands is a compact village immediately north of Albany, offering urban proximity with village character. The residential neighborhoods provide a mix of housing styles at accessible prices. The village's small size creates community connection, while proximity to Albany employment centers and shopping makes it convenient for commuters.",
    marketParagraph: "Menands' median price of $225,000 offers strong value for the location. Properties range from modest homes to larger colonials, with options for various budgets. The village's compact size means limited inventory, but buyer interest remains steady given the Albany proximity and community character.",
    communityParagraph: "Menands Union Free School District serves the village with small class sizes and personalized attention. The village green, local parks, and community events anchor local life. The compact size creates neighborly atmosphere.",
    civicKeywords: ["Menands village hall", "Menands property taxes", "Menands building permits", "Menands zoning", "Menands schools"],
    lifestyleKeywords: ["Menands village", "Albany proximity", "Menands community", "village living Menands", "compact Menands"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Menands homes for sale", path: "/homes/menands" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Menands NY homes for sale", "living in Menands NY", "Menands village real estate", "near Albany homes", "Menands community"]
  },

  ravena: {
    slug: "ravena",
    name: "Ravena",
    county: "Albany County",
    h1: "Ravena Insights, Property Data & Local Guide",
    metaDescription: "Explore Ravena through our professional lens. Get expert property data and discover this southern Albany County village.",
    leadParagraph: "Ravena is a village in southern Albany County offering small-town living with Albany access. The compact downtown, established neighborhoods, and RCS school district create community character. Buyers find more affordable entry points than in northern Albany County while maintaining reasonable commute times.",
    marketParagraph: "Ravena's median price of $195,000 offers excellent affordability in Albany County. Properties range from village homes to larger lots in surrounding areas. The RCS school district serves families well, while the affordable housing stock attracts first-time buyers and investors. Value-conscious buyers find opportunities here.",
    communityParagraph: "Ravena-Coeymans-Selkirk Central School District serves the area. Downtown shops, community parks, and local events anchor village life. The compact size maintains small-town atmosphere while still providing necessary amenities.",
    civicKeywords: ["Ravena village hall", "Coeymans town hall", "Ravena property taxes", "Ravena zoning", "RCS school district"],
    lifestyleKeywords: ["downtown Ravena", "RCS schools", "Ravena community", "village living", "southern Albany County"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Ravena homes for sale", path: "/homes/ravena" },
      { label: "Affordable Albany County", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Ravena NY homes for sale", "living in Ravena NY", "RCS school district", "Ravena real estate", "affordable Albany County"]
  },

  altamont: {
    slug: "altamont",
    name: "Altamont",
    county: "Albany County",
    h1: "Altamont Insights, Property Data & Local Guide",
    metaDescription: "Explore Altamont through our professional lens. Get expert property data, fair village insights, and discover Helderberg living.",
    leadParagraph: "Altamont is a charming village in the Helderbergs, famous for the Altamont Fair. The walkable downtown, Victorian architecture, and small-town atmosphere attract buyers seeking authentic village character. The Guilderland Central School District provides educational quality, while the Helderberg setting offers natural beauty.",
    marketParagraph: "Altamont's median price of $285,000 provides access to Guilderland schools with village character. Victorian homes near the village center command premium prices, while surrounding areas offer larger lots and newer construction. The limited inventory in the village proper creates competition for well-maintained properties.",
    communityParagraph: "Guilderland Central School District serves Altamont. The Altamont Fair, downtown shops, and Helderberg scenery anchor community life. The village's small size and historic character create close-knit community bonds that residents value.",
    civicKeywords: ["Altamont village hall", "Guilderland town hall", "Altamont property taxes", "Altamont zoning", "Guilderland schools"],
    lifestyleKeywords: ["Altamont Fair", "downtown Altamont", "Helderberg living", "Victorian Altamont", "village Altamont"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Altamont homes for sale", path: "/homes/altamont" },
      { label: "Helderberg area properties", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Altamont NY homes for sale", "living in Altamont NY", "Altamont Fair village", "Altamont real estate", "Helderberg area homes"]
  },

  wynantskill: {
    slug: "wynantskill",
    name: "Wynantskill",
    county: "Rensselaer County",
    h1: "Wynantskill Insights, Property Data & Local Guide",
    metaDescription: "Explore Wynantskill through our professional lens. Get expert property data and discover this established Rensselaer County hamlet.",
    leadParagraph: "Wynantskill is an established hamlet in the Town of North Greenbush, offering suburban living in Rensselaer County. The residential neighborhoods provide housing options for families and first-time buyers, while proximity to Troy and Albany creates commuter convenience. The area's schools and community character attract steady buyer interest.",
    marketParagraph: "Wynantskill's median price of $265,000 provides value in Rensselaer County. The established housing stock of 1950s-70s homes offers options for buyers seeking affordability without sacrificing school quality. Properties with updates move quickly, while renovation opportunities exist for value-add buyers.",
    communityParagraph: "North Greenbush Central (Wynantskill Union Free) School District serves the hamlet. Local parks, community events, and the established neighborhood character anchor local life. The hamlet's position between Troy and Albany provides employment and entertainment access.",
    civicKeywords: ["North Greenbush town hall", "Wynantskill property taxes", "North Greenbush building permits", "Wynantskill zoning", "Wynantskill schools"],
    lifestyleKeywords: ["Wynantskill community", "suburban Wynantskill", "North Greenbush area", "Rensselaer County suburbs", "established neighborhoods"],
    internalLinks: [
      { label: "See all Rensselaer County Spotlights", path: "/intelligence/rensselaer-county" },
      { label: "Wynantskill homes for sale", path: "/homes/wynantskill" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Wynantskill NY homes for sale", "living in Wynantskill NY", "Wynantskill schools", "Wynantskill real estate", "North Greenbush area"]
  },

  "north-greenbush": {
    slug: "north-greenbush",
    name: "North Greenbush",
    county: "Rensselaer County",
    h1: "North Greenbush Insights, Property Data & Local Guide",
    metaDescription: "Explore North Greenbush through our professional lens. Get expert property data and discover this growing Rensselaer County town.",
    leadParagraph: "North Greenbush is a growing Rensselaer County town with diverse residential neighborhoods. From established areas like Wynantskill to newer developments, the town offers options for various buyers. Proximity to Troy and Albany provides employment access, while the mix of rural and suburban character serves different lifestyle preferences.",
    marketParagraph: "North Greenbush's median price of $285,000 provides value compared to Albany County alternatives. The town's diversity of housing stock—from modest ranches to newer colonials—creates entry points for first-time buyers and trading-up families alike. Commercial development has enhanced convenience.",
    communityParagraph: "North Greenbush Central and Averill Park Central School Districts serve different areas of the town. The Route 4 corridor, community parks, and local businesses anchor town life. The mix of residential character and rural areas provides lifestyle options.",
    civicKeywords: ["North Greenbush town hall", "North Greenbush property taxes", "North Greenbush building permits", "North Greenbush zoning", "North Greenbush schools"],
    lifestyleKeywords: ["Route 4 corridor", "North Greenbush community", "suburban Rensselaer County", "growing North Greenbush", "town living"],
    internalLinks: [
      { label: "See all Rensselaer County Spotlights", path: "/intelligence/rensselaer-county" },
      { label: "North Greenbush homes for sale", path: "/homes/north-greenbush" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["North Greenbush NY homes for sale", "living in North Greenbush NY", "North Greenbush real estate", "Rensselaer County suburbs", "Route 4 area homes"]
  },

  brunswick: {
    slug: "brunswick",
    name: "Brunswick",
    county: "Rensselaer County",
    h1: "Brunswick Insights, Property Data & Local Guide",
    metaDescription: "Explore Brunswick through our professional lens. Get expert property data and discover this rural Rensselaer County town.",
    leadParagraph: "Brunswick offers rural Rensselaer County living east of Troy. The town combines agricultural character with residential neighborhoods, providing options for buyers seeking space and privacy. The Brunswick Central School District serves families well, while the town's position provides access to Troy employment and amenities.",
    marketParagraph: "Brunswick's median price of $295,000 provides value for properties with acreage. The housing stock ranges from modest homes to larger properties with land. Buyers seeking rural character with school quality find opportunities here. The town's balance of affordability and space creates steady demand.",
    communityParagraph: "Brunswick Central School District serves the town with strong community involvement. Local farms, the Tamarac Preserve, and community events anchor town life. The rural character and close-knit community appeal to families seeking space and connection.",
    civicKeywords: ["Brunswick town hall", "Brunswick property taxes", "Brunswick building permits", "Brunswick zoning", "Brunswick Central schools"],
    lifestyleKeywords: ["Tamarac Preserve", "rural Brunswick", "Brunswick farms", "Rensselaer County country", "Brunswick community"],
    internalLinks: [
      { label: "See all Rensselaer County Spotlights", path: "/intelligence/rensselaer-county" },
      { label: "Brunswick properties", path: "/homes/brunswick" },
      { label: "Rural properties guide", path: "/investment-properties" }
    ],
    focusKeywords: ["Brunswick NY homes for sale", "living in Brunswick NY", "Brunswick Central schools", "Brunswick real estate", "rural Rensselaer County"]
  },

  schaghticoke: {
    slug: "schaghticoke",
    name: "Schaghticoke",
    county: "Rensselaer County",
    h1: "Schaghticoke Insights, Property Data & Local Guide",
    metaDescription: "Explore Schaghticoke through our professional lens. Get expert property data and discover this rural northern Rensselaer County town.",
    leadParagraph: "Schaghticoke is rural northern Rensselaer County, famous for the Schaghticoke Fair. The town offers agricultural character, river access, and properties with acreage at accessible prices. Buyers seeking rural living with community traditions find appeal here, while the Hoosic Valley school district serves families.",
    marketParagraph: "Schaghticoke's median price of $235,000 offers excellent value for properties with land. The housing stock includes historic farmhouses, newer homes, and properties with agricultural potential. The Schaghticoke Fair tradition reflects the community's rural character and draws visitors annually.",
    communityParagraph: "Hoosic Valley Central School District serves Schaghticoke. The Schaghticoke Fair, Hoosic River, and agricultural heritage anchor community life. The town's traditions and rural character create bonds that residents value.",
    civicKeywords: ["Schaghticoke town hall", "Schaghticoke property taxes", "Schaghticoke building permits", "Schaghticoke zoning", "Hoosic Valley schools"],
    lifestyleKeywords: ["Schaghticoke Fair", "Hoosic River", "rural Schaghticoke", "agricultural Rensselaer", "fair village"],
    internalLinks: [
      { label: "See all Rensselaer County Spotlights", path: "/intelligence/rensselaer-county" },
      { label: "Schaghticoke properties", path: "/homes/schaghticoke" },
      { label: "Rural properties guide", path: "/investment-properties" }
    ],
    focusKeywords: ["Schaghticoke NY homes for sale", "living in Schaghticoke NY", "Schaghticoke Fair area", "Schaghticoke real estate", "rural Rensselaer County"]
  },

  "averill-park": {
    slug: "averill-park",
    name: "Averill Park",
    county: "Rensselaer County",
    h1: "Averill Park Insights, Property Data & Local Guide",
    metaDescription: "Explore Averill Park through our professional lens. Get expert property data, lake access insights, and discover this scenic Rensselaer hamlet.",
    leadParagraph: "Averill Park is a scenic hamlet in the Town of Sand Lake, featuring the beautiful Crystal Lake and Burden Lake. The area combines lake living with rural character, attracting buyers seeking water access and natural beauty. The Averill Park Central School District's strong reputation draws families from throughout the region.",
    marketParagraph: "Averill Park's median price of $320,000 reflects the lake and school premiums. Waterfront properties on Crystal Lake and Burden Lake command significant premiums, while homes in the school district without water access offer more accessible entry points. The combination of natural beauty and school quality creates consistent demand.",
    communityParagraph: "Averill Park Central School District serves the area with excellent academics and community involvement. Crystal Lake, Burden Lake, and the Glass Lake recreational areas anchor outdoor life. The community's lake culture and school pride create strong bonds.",
    civicKeywords: ["Sand Lake town hall", "Averill Park property taxes", "Sand Lake building permits", "Averill Park zoning", "Averill Park Central schools"],
    lifestyleKeywords: ["Crystal Lake", "Burden Lake", "lake living Averill Park", "Averill Park schools", "Sand Lake area"],
    internalLinks: [
      { label: "See all Rensselaer County Spotlights", path: "/intelligence/rensselaer-county" },
      { label: "Averill Park lake properties", path: "/homes/averill-park" },
      { label: "Waterfront properties guide", path: "/investment-properties" }
    ],
    focusKeywords: ["Averill Park NY homes for sale", "living in Averill Park NY", "Crystal Lake homes", "Averill Park Central schools", "Rensselaer County lakefront"]
  },

  bethlehem: {
    slug: "bethlehem",
    name: "Bethlehem",
    county: "Albany County",
    h1: "Bethlehem Insights, Property Data & Local Guide",
    metaDescription: "Explore Bethlehem through our professional lens. Get expert property data, Bethlehem Central insights, and discover this premier Albany suburb.",
    leadParagraph: "Bethlehem is Albany County's premier family suburb, anchored by the highly-rated Bethlehem Central School District. The town encompasses diverse areas from the walkable Delmar village center to rural Selkirk, providing housing options for various budgets. Families relocate here specifically for schools, while the community programs and parks system enhance quality of life.",
    marketParagraph: "Bethlehem's median price of $415,000 reflects the school district premium. Properties in Delmar command the highest prices, while areas like Glenmont and Selkirk offer more accessible entry points. The consistent school demand ensures stable values and appreciation across the town.",
    communityParagraph: "Bethlehem Central School District consistently ranks among New York's best. The town's extensive parks system, library, and community programs serve all ages. Local businesses at Four Corners and Glenmont provide convenience, while the Albany County Rail Trail offers recreation.",
    civicKeywords: ["Bethlehem town hall", "Bethlehem property taxes", "Bethlehem building permits", "Bethlehem zoning board", "Bethlehem Central schools"],
    lifestyleKeywords: ["Bethlehem Central schools", "Albany County Rail Trail", "Elm Avenue Park", "Bethlehem community", "Delmar Glenmont Selkirk"],
    internalLinks: [
      { label: "See all Albany County Spotlights", path: "/intelligence/albany-county" },
      { label: "Bethlehem homes for sale", path: "/homes/bethlehem" },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ],
    focusKeywords: ["Bethlehem NY homes for sale", "living in Bethlehem NY", "Bethlehem Central schools", "Bethlehem real estate", "Delmar Glenmont Selkirk homes"]
  }
};

// Get SEO content for a town, with fallback generation
export const getTownSEOContent = (townSlug: string, townName: string): TownSEOContent => {
  if (townSEOContent[townSlug]) {
    return townSEOContent[townSlug];
  }
  
  // Generate default content for towns not yet in the database
  const county = getCountyForTown(townSlug);
  return {
    slug: townSlug,
    name: townName,
    county: county?.name || "Capital District",
    h1: `${townName} Insights, Property Data & Local Guide`,
    metaDescription: `Explore ${townName} through our professional lens. Get expert property data, school rankings, and claim your local business story.`,
    leadParagraph: `${townName} offers unique opportunities in the Capital District real estate market. This community combines local character with regional accessibility, making it an attractive option for buyers and investors seeking value and lifestyle balance.`,
    marketParagraph: `The ${townName} market provides entry points for various buyer types. Property values reflect local amenities and school quality, with steady demand from families and investors alike. The housing stock offers options from starter homes to move-up properties.`,
    communityParagraph: `Local schools serve ${townName} residents with educational programs for all ages. Community amenities, local businesses, and neighborhood character create the foundation for daily life in this Capital District community.`,
    civicKeywords: [`${townName} town hall`, `${townName} property taxes`, `${townName} building permits`, `${townName} zoning`],
    lifestyleKeywords: [`living in ${townName}`, `${townName} community`, `${townName} schools`, `${townName} restaurants`],
    internalLinks: county ? [
      { label: `See all ${county.name} Spotlights`, path: county.path },
      { label: "First-time buyer guide", path: "/first-time-buyers" }
    ] : [],
    focusKeywords: [`${townName} NY homes for sale`, `living in ${townName} NY`, `${townName} real estate`]
  };
};
