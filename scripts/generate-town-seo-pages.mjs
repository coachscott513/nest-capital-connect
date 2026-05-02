// scripts/generate-town-seo-pages.mjs
// Generates static crawlable HTML at public/living-in-{slug}/index.html
// for each town in TOWNS. Run with: node scripts/generate-town-seo-pages.mjs
//
// These files are served by Lovable hosting BEFORE the SPA fallback,
// giving search engines and AI crawlers (GPTBot, ClaudeBot, Google-Extended,
// PerplexityBot, etc.) keyword-rich, fully-rendered HTML — while real
// browsers are bounced into the React app at /app/living-in-{slug}.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

/** @typedef {{
 *   slug: string;
 *   name: string;            // "Delmar"
 *   nameWithState: string;   // "Delmar, NY"
 *   county: string;          // "Albany County"
 *   township?: string;       // "town of Bethlehem"
 *   zip: string;
 *   schoolDistrict: string;
 *   priceRange: string;      // "$350K–$650K"
 *   commuteMinutes: string;  // "10–15"
 *   commuteTo: string;       // "downtown Albany"
 *   intro: string;           // 2-3 sentences, sets the scene
 *   marketBlurb: string;     // 2 sentences about the market
 *   whyMove: string[];       // 5-6 bullets
 *   lifestyle: string;       // 2-3 sentences, what it feels like to live here
 *   thingsToDo: string[];    // 5-7 bullets
 *   schoolsBlurb: string;    // 2 sentences
 *   commuteBlurb: string;    // 2 sentences
 *   whatsHappening: string;  // 2 sentences
 *   nearby: { slug: string; label: string }[]; // internal link graph
 * }} TownSeo
 */

/** @type {TownSeo[]} */
const TOWNS = [
  {
    slug: "delmar",
    name: "Delmar",
    nameWithState: "Delmar, NY",
    county: "Albany County",
    township: "town of Bethlehem",
    zip: "12054",
    schoolDistrict: "Bethlehem Central School District",
    priceRange: "$350K–$650K",
    commuteMinutes: "10–15",
    commuteTo: "downtown Albany",
    intro:
      "Delmar, NY is one of the most sought-after suburbs in the Capital District, located in the town of Bethlehem in Albany County, just minutes from downtown Albany. Known for its top-rated Bethlehem Central schools, quiet tree-lined neighborhoods, and stable property values, Delmar continues to attract buyers looking for both comfort and long-term stability.",
    marketBlurb:
      "The Delmar NY real estate market offers a mix of mid-century single-family homes, updated colonials, and established neighborhoods like Delmar Heights, Elsmere, and Haswell Farms. Inventory tends to move quickly because of strong demand and limited annual turnover.",
    whyMove: [
      "Top-rated Bethlehem Central schools — consistently among the best in the Capital Region",
      "Strong, stable property values with low foreclosure rates",
      "Quiet residential feel with mature trees and sidewalks",
      "10–15 minute commute to downtown Albany, the Capitol, and Albany Med",
      "Walkable Delaware Avenue and Four Corners business district",
      "Outdoor access via Elm Avenue Park and the Albany County Rail Trail",
    ],
    lifestyle:
      "Living in Delmar offers a noticeably slower pace than downtown Albany while keeping everything within reach. Residents enjoy tree-lined streets, parks, an active community calendar, and a real sense of neighborhood. Crime rates are among the lowest in the Capital Region.",
    thingsToDo: [
      "Coffee, brunch, and dinner along Delaware Avenue and Four Corners",
      "Walking and cycling on the Albany County Helderberg-Hudson Rail Trail",
      "Elm Avenue Park — pool, tennis, fields, seasonal programming",
      "Bethlehem Public Library events and community programming",
      "Delmar Farmers Market (seasonal)",
      "Quick access to Thacher State Park and the Helderbergs",
    ],
    schoolsBlurb:
      "Delmar is part of the Bethlehem Central School District, one of the top-performing public school districts in the Capital Region, with Bethlehem Central High School and several well-regarded elementary schools. School quality is the single biggest reason families search for homes for sale in Delmar NY.",
    commuteBlurb:
      "Delmar sits about 10–15 minutes from downtown Albany via Delaware Avenue (Route 443) or the Slingerlands Bypass, putting the State Capitol, Empire State Plaza, and Albany Medical Center inside an easy daily commute. I-87 and I-90 are both reachable within 15 minutes.",
    whatsHappening:
      "Delmar's Four Corners and Delaware Avenue corridor continue to add new local businesses, restaurants, and community events. For current market activity — new listings, recent sales, and price trends — see the Delmar Market Insights page, updated regularly with local data.",
    nearby: [
      { slug: "albany", label: "Living in Albany NY" },
      { slug: "guilderland", label: "Living in Guilderland NY" },
      { slug: "voorheesville", label: "Living in Voorheesville NY" },
      { slug: "niskayuna", label: "Living in Niskayuna NY" },
      { slug: "clifton-park", label: "Living in Clifton Park NY" },
    ],
  },
  {
    slug: "albany",
    name: "Albany",
    nameWithState: "Albany, NY",
    county: "Albany County",
    zip: "12207",
    schoolDistrict: "Albany City School District",
    priceRange: "$200K–$500K",
    commuteMinutes: "5–10",
    commuteTo: "the State Capitol and Empire State Plaza",
    intro:
      "Albany, NY is the capital of New York State and the urban core of the Capital District. From the historic brownstones of Center Square and Hudson/Park to the family neighborhoods of Pine Hills and Buckingham Pond, Albany offers walkable streets, four-season living, and direct access to government, healthcare, and university jobs.",
    marketBlurb:
      "The Albany NY real estate market is one of the most diverse in upstate New York, ranging from sub-$200K rowhouses to historic single-family homes above $500K. Investor demand is strong in Pine Hills and the South End, while owner-occupants compete hardest for Buckingham Pond, Helderberg, and Center Square.",
    whyMove: [
      "State capital with stable government, healthcare, and university employment",
      "Walkable historic neighborhoods with restaurants, parks, and culture",
      "Lower cost of living than New York City, Boston, or Westchester",
      "Strong rental demand makes Albany a top market for house hacking",
      "Direct Amtrak service to NYC and easy I-87/I-90 access",
      "Anchored by SUNY Albany, Albany Med, and the Capitol complex",
    ],
    lifestyle:
      "Living in Albany means coffee on Lark Street, runs through Washington Park, weekend trips to the Adirondacks, and a real sense of neighborhood you do not get in larger cities. Each pocket — Center Square, Pine Hills, Helderberg, Buckingham Pond — has its own character.",
    thingsToDo: [
      "Washington Park, Tulip Festival, and summer concerts",
      "Lark Street and Central Avenue dining and nightlife",
      "Empire State Plaza, NYS Museum, and The Egg",
      "Albany Riverfront Park and the Mohawk-Hudson Bike Trail",
      "Palace Theatre and MVP Arena events",
      "Easy day trips to Saratoga, the Berkshires, and the Adirondacks",
    ],
    schoolsBlurb:
      "Albany is served by the Albany City School District, with several charter and private school options as well. Many families also weigh suburban districts like Bethlehem (Delmar), Guilderland, and Niskayuna for school-driven moves.",
    commuteBlurb:
      "Most Albany neighborhoods are within 5–10 minutes of the State Capitol, Empire State Plaza, and Albany Medical Center. CDTA bus service, the Albany-Rensselaer Amtrak station, and I-87/I-90 access make Albany the regional commuting hub.",
    whatsHappening:
      "Downtown Albany continues to add residential conversions and new restaurants, while neighborhoods like Pine Hills and the Warehouse District attract investment from NYC and Boston buyers. See the Albany market intelligence page for current trends.",
    nearby: [
      { slug: "delmar", label: "Living in Delmar NY" },
      { slug: "troy", label: "Living in Troy NY" },
      { slug: "guilderland", label: "Living in Guilderland NY" },
      { slug: "niskayuna", label: "Living in Niskayuna NY" },
      { slug: "schenectady", label: "Living in Schenectady NY" },
    ],
  },
  {
    slug: "troy",
    name: "Troy",
    nameWithState: "Troy, NY",
    county: "Rensselaer County",
    zip: "12180",
    schoolDistrict: "Troy City School District",
    priceRange: "$150K–$450K",
    commuteMinutes: "10–15",
    commuteTo: "downtown Albany",
    intro:
      "Troy, NY sits on the east bank of the Hudson River in Rensselaer County and is one of the best-preserved 19th-century cities in America. With brick rowhouses, a thriving downtown food scene, RPI, and strong cash-flow rental fundamentals, Troy has become a magnet for both owner-occupants and investors.",
    marketBlurb:
      "The Troy NY real estate market spans sub-$200K multi-units in North Central and South Troy to renovated brownstones above $400K in the Pottery District and Washington Park. It is one of the strongest cash-flow markets in the Capital District.",
    whyMove: [
      "Walkable historic downtown with award-winning restaurants",
      "Strong multi-unit inventory makes Troy a top house-hacking market",
      "Anchored by Rensselaer Polytechnic Institute and Russell Sage College",
      "Hudson River waterfront, parks, and seasonal Troy Waterfront Farmers Market",
      "Lower entry prices than Albany or Saratoga",
      "Quick access to I-787 and the Northway",
    ],
    lifestyle:
      "Living in Troy means brunch at Sweet Sue's, the farmers market on Saturday, RPI hockey in winter, and rowhouse neighborhoods that feel more Brooklyn than upstate. Pockets vary block by block — local knowledge matters.",
    thingsToDo: [
      "Troy Waterfront Farmers Market (year-round)",
      "Downtown dining: Lucas Confectionery, Donna's, Peck's Arcade, Slidin' Dirty",
      "Riverfront Park concerts and events",
      "Emma Willard School and Russell Sage walking tours",
      "Hudson River kayaking and Prospect Park hiking",
      "Day trips to Williamstown, MA and the Berkshires",
    ],
    schoolsBlurb:
      "Troy is served by the Troy City School District, with several charter and private options including Emma Willard. Many families considering Troy also weigh nearby districts like North Greenbush and East Greenbush.",
    commuteBlurb:
      "Downtown Troy is about 10–15 minutes from Albany via the Menands Bridge or I-787. Albany Med, the Capitol, and the Albany-Rensselaer Amtrak station are all inside a 20-minute drive.",
    whatsHappening:
      "Troy continues to add restaurants and residential conversions in the Monument Square and Pottery District corridors, with strong investor activity in multi-units. See the Troy market intelligence page for current activity.",
    nearby: [
      { slug: "albany", label: "Living in Albany NY" },
      { slug: "schenectady", label: "Living in Schenectady NY" },
      { slug: "delmar", label: "Living in Delmar NY" },
      { slug: "saratoga-springs", label: "Living in Saratoga Springs NY" },
      { slug: "niskayuna", label: "Living in Niskayuna NY" },
    ],
  },
  {
    slug: "schenectady",
    name: "Schenectady",
    nameWithState: "Schenectady, NY",
    county: "Schenectady County",
    zip: "12305",
    schoolDistrict: "Schenectady City School District",
    priceRange: "$150K–$400K",
    commuteMinutes: "20–25",
    commuteTo: "downtown Albany",
    intro:
      "Schenectady, NY is a historic Mohawk River city anchored by GE, Union College, and the revitalized Mohawk Harbor district. The Stockade neighborhood is one of the oldest continuously occupied residential districts in the country, while Upper Union Street and GE Realty Plot offer some of the best architecture in the region.",
    marketBlurb:
      "The Schenectady NY real estate market offers strong value compared to Albany or Saratoga, with everything from sub-$200K starter homes to grand Victorians in GE Realty Plot. Cash-flow investors find some of the best multi-unit yields in the Capital District here.",
    whyMove: [
      "Historic Stockade and GE Realty Plot architecture",
      "Anchored by GE, Union College, MVP Health Care, and Ellis Medicine",
      "Mohawk Harbor: waterfront dining, casino, and events",
      "Strong cash-flow opportunities on multi-unit properties",
      "Easy I-890, I-87, and Amtrak access",
      "Lower entry prices than most Capital District suburbs",
    ],
    lifestyle:
      "Living in Schenectady means walking the Stockade, Proctors Theatre on weekends, riverfront sunsets at Mohawk Harbor, and the kind of architecture that turns a normal walk into a tour. Neighborhoods vary widely — Upper Union and the Plot feel suburban, while downtown is fully urban.",
    thingsToDo: [
      "Proctors Theatre — Broadway tours and concerts",
      "Mohawk Harbor: dining, walking paths, and Rivers Casino",
      "Stockade walking tours and Riverside Park",
      "Central Park and the Schenectady Rose Garden",
      "Union College campus and athletics",
      "miSci and the Schenectady County Historical Society",
    ],
    schoolsBlurb:
      "Schenectady is served by the Schenectady City School District. Many families also evaluate the neighboring Niskayuna Central School District, which is one of the highest-performing districts in the region.",
    commuteBlurb:
      "Downtown Schenectady is about 20–25 minutes from Albany via I-890 and I-87, with Amtrak service from the Schenectady station. GE, Union, and Ellis Medicine are all within the city.",
    whatsHappening:
      "Schenectady continues to invest in Mohawk Harbor, downtown housing, and the Erie Boulevard corridor. The Niskayuna and Upper Union markets remain among the strongest in Schenectady County.",
    nearby: [
      { slug: "niskayuna", label: "Living in Niskayuna NY" },
      { slug: "albany", label: "Living in Albany NY" },
      { slug: "troy", label: "Living in Troy NY" },
      { slug: "clifton-park", label: "Living in Clifton Park NY" },
      { slug: "amsterdam", label: "Living in Amsterdam NY" },
    ],
  },
  {
    slug: "saratoga-springs",
    name: "Saratoga Springs",
    nameWithState: "Saratoga Springs, NY",
    county: "Saratoga County",
    zip: "12866",
    schoolDistrict: "Saratoga Springs City School District",
    priceRange: "$450K–$1.2M+",
    commuteMinutes: "30–40",
    commuteTo: "downtown Albany",
    intro:
      "Saratoga Springs, NY is the Capital District's premier resort city — Victorian architecture, the Saratoga Race Course, SPAC, and a downtown Broadway corridor that ranks among the best small-city main streets in America. It is the highest-priced market in the region and one of the most demand-resistant.",
    marketBlurb:
      "The Saratoga Springs NY real estate market consistently leads the Capital District in price and price growth, with everything from $450K downtown condos to multi-million-dollar homes in Geyser Crest, the East Side, and around Saratoga Lake.",
    whyMove: [
      "Top-rated Saratoga Springs City School District",
      "Walkable Broadway corridor with year-round dining and shopping",
      "Saratoga Race Course, Saratoga Performing Arts Center, and the Spa State Park",
      "Strong second-home and short-term rental demand",
      "Anchored by Saratoga Hospital, Skidmore College, and the Global Foundries corridor",
      "Quick access to the Adirondacks, Lake George, and Vermont",
    ],
    lifestyle:
      "Living in Saratoga means morning runs in the Spa State Park, Tuesday concerts at SPAC, racing season in August, and a downtown that genuinely feels alive twelve months a year. The lifestyle premium shows up in pricing.",
    thingsToDo: [
      "Saratoga Race Course (July–September)",
      "SPAC: Philadelphia Orchestra, NYC Ballet, summer concerts",
      "Saratoga Spa State Park: trails, pools, and mineral springs",
      "Broadway dining, shopping, and First Night",
      "Saratoga Lake boating and waterfront restaurants",
      "Day trips to Lake George and the Adirondacks",
    ],
    schoolsBlurb:
      "Saratoga Springs is served by the Saratoga Springs City School District, one of the top-performing districts in the Capital Region. School quality plus lifestyle is the primary driver of long-term price appreciation.",
    commuteBlurb:
      "Saratoga Springs is about 30–40 minutes from downtown Albany via I-87 (the Northway). Many residents commute into Malta, Clifton Park, and Albany; others work locally in healthcare, hospitality, and the Global Foundries corridor.",
    whatsHappening:
      "Saratoga continues to add boutique hotels, restaurants, and luxury condo projects downtown. Demand from NYC, Boston, and remote workers keeps the market tight year-round.",
    nearby: [
      { slug: "clifton-park", label: "Living in Clifton Park NY" },
      { slug: "queensbury", label: "Living in Queensbury NY" },
      { slug: "albany", label: "Living in Albany NY" },
      { slug: "niskayuna", label: "Living in Niskayuna NY" },
      { slug: "delmar", label: "Living in Delmar NY" },
    ],
  },
  {
    slug: "clifton-park",
    name: "Clifton Park",
    nameWithState: "Clifton Park, NY",
    county: "Saratoga County",
    zip: "12065",
    schoolDistrict: "Shenendehowa Central School District",
    priceRange: "$400K–$750K",
    commuteMinutes: "20–25",
    commuteTo: "downtown Albany",
    intro:
      "Clifton Park, NY is one of the largest and fastest-growing suburbs in the Capital District, halfway between Albany and Saratoga along I-87. It is anchored by the highly-rated Shenendehowa Central School District and offers newer construction, family-friendly amenities, and easy commutes in every direction.",
    marketBlurb:
      "The Clifton Park NY real estate market is dominated by single-family homes in planned neighborhoods, with strong demand from families targeting Shenendehowa schools. Newer construction and townhomes are widely available.",
    whyMove: [
      "Highly-rated Shenendehowa Central School District",
      "Halfway between Albany and Saratoga — best of both",
      "Newer construction and family-friendly subdivisions",
      "Direct I-87 access for commuters",
      "Strong retail base along Route 146 and Clifton Country Road",
      "Town parks, trails, and youth athletic programs",
    ],
    lifestyle:
      "Living in Clifton Park is suburban in the best sense — quiet neighborhoods, big yards, strong schools, and weekends spent at sports fields, the Clifton Park Center, or driving 20 minutes to Saratoga. It is a top choice for relocating families.",
    thingsToDo: [
      "Clifton Common: ice rink, fields, and town events",
      "Shopping along Route 146 and Clifton Country Road",
      "Mohawk-Hudson Bike Trail access",
      "Quick trips to Saratoga for racing and SPAC",
      "Clifton Park Halfmoon Public Library programming",
      "Boating on the Mohawk River",
    ],
    schoolsBlurb:
      "Clifton Park is served primarily by the Shenendehowa Central School District, one of the largest and highest-performing districts in the region. Some areas fall in the Burnt Hills-Ballston Lake or Niskayuna districts.",
    commuteBlurb:
      "Clifton Park is about 20–25 minutes from downtown Albany via I-87 (the Northway), and roughly the same distance to Saratoga Springs going north. The Global Foundries corridor in Malta is a 10-minute drive.",
    whatsHappening:
      "Clifton Park continues to see new residential and commercial development along Route 146, with steady demand from relocating families targeting Shenendehowa schools.",
    nearby: [
      { slug: "saratoga-springs", label: "Living in Saratoga Springs NY" },
      { slug: "niskayuna", label: "Living in Niskayuna NY" },
      { slug: "albany", label: "Living in Albany NY" },
      { slug: "schenectady", label: "Living in Schenectady NY" },
      { slug: "delmar", label: "Living in Delmar NY" },
    ],
  },
  {
    slug: "niskayuna",
    name: "Niskayuna",
    nameWithState: "Niskayuna, NY",
    county: "Schenectady County",
    zip: "12309",
    schoolDistrict: "Niskayuna Central School District",
    priceRange: "$350K–$700K",
    commuteMinutes: "20–25",
    commuteTo: "downtown Albany",
    intro:
      "Niskayuna, NY is a quiet, leafy suburb in Schenectady County known for one of the highest-performing school districts in upstate New York. With mid-century neighborhoods, large lots, and proximity to GE Global Research, it is a long-time favorite of engineering and healthcare professionals.",
    marketBlurb:
      "The Niskayuna NY real estate market is school-driven, with steady demand from families targeting the Niskayuna Central School District. Most homes are mid-century single-family on larger lots; well-priced inventory moves quickly.",
    whyMove: [
      "Top-performing Niskayuna Central School District",
      "Larger lots and mature trees compared to most Capital District suburbs",
      "Proximity to GE Global Research and the Schenectady employment base",
      "Quiet, low-traffic neighborhoods",
      "Mohawk River access and town parks",
      "Quick commute to Schenectady, Albany, and Clifton Park",
    ],
    lifestyle:
      "Living in Niskayuna is calm, residential, and family-focused. Weekends revolve around school events, the Mohawk River, and quick drives to Schenectady's Stockade or Saratoga.",
    thingsToDo: [
      "Mohawk-Hudson Bike Trail access",
      "Lions Park and Blatnick Park",
      "Niskayuna Co-op Market",
      "Quick access to Proctors Theatre and Mohawk Harbor",
      "Boating and kayaking on the Mohawk River",
      "Schenectady Country Club",
    ],
    schoolsBlurb:
      "Niskayuna is served by the Niskayuna Central School District, consistently one of the top-performing districts in upstate New York. School quality is the dominant driver of long-term value here.",
    commuteBlurb:
      "Niskayuna is about 20–25 minutes from downtown Albany via I-890 and I-87, and just 5–10 minutes from downtown Schenectady. GE Global Research is inside the town.",
    whatsHappening:
      "Niskayuna remains one of the most stable markets in the region. Limited new construction means existing inventory in the school district holds value especially well.",
    nearby: [
      { slug: "schenectady", label: "Living in Schenectady NY" },
      { slug: "clifton-park", label: "Living in Clifton Park NY" },
      { slug: "albany", label: "Living in Albany NY" },
      { slug: "delmar", label: "Living in Delmar NY" },
      { slug: "saratoga-springs", label: "Living in Saratoga Springs NY" },
    ],
  },
  {
    slug: "guilderland",
    name: "Guilderland",
    nameWithState: "Guilderland, NY",
    county: "Albany County",
    zip: "12084",
    schoolDistrict: "Guilderland Central School District",
    priceRange: "$300K–$600K",
    commuteMinutes: "15–20",
    commuteTo: "downtown Albany",
    intro:
      "Guilderland, NY is a large suburban town just west of Albany, anchored by Crossgates Mall, SUNY Albany's uptown campus, and the highly-rated Guilderland Central School District. It offers a mix of established neighborhoods, newer construction, and strong commercial amenities.",
    marketBlurb:
      "The Guilderland NY real estate market spans starter homes and townhomes near Crossgates to larger single-family homes in Westmere, McKownville, and Altamont. Strong school demand keeps the market competitive year-round.",
    whyMove: [
      "Highly-rated Guilderland Central School District",
      "Anchored by Crossgates Mall and the SUNY Albany uptown campus",
      "Mix of established neighborhoods and newer construction",
      "Easy access to I-87, I-90, and the Thruway",
      "Town parks, trails, and the historic village of Altamont nearby",
      "Strong commercial base along Western Avenue",
    ],
    lifestyle:
      "Living in Guilderland is convenient suburban living with strong schools and easy access to everything Albany offers. Weekends include trips to Altamont, the Helderbergs, and the Indian Ladder Farms area.",
    thingsToDo: [
      "Crossgates Mall and the Western Avenue corridor",
      "Tawasentha Park trails and winter sports",
      "Indian Ladder Farms (Altamont)",
      "Thacher State Park and the Helderberg escarpment",
      "Altamont Fair (August)",
      "Guilderland Public Library programming",
    ],
    schoolsBlurb:
      "Guilderland is served by the Guilderland Central School District, consistently one of the strongest districts in Albany County. Some areas of the town fall in Voorheesville or other neighboring districts.",
    commuteBlurb:
      "Most of Guilderland is 15–20 minutes from downtown Albany via Western Avenue (Route 20) or I-90. SUNY Albany uptown is inside the town, and Albany Med is a 15-minute drive.",
    whatsHappening:
      "Guilderland continues to add residential and commercial development along Western Avenue, with steady demand from families targeting Guilderland schools.",
    nearby: [
      { slug: "albany", label: "Living in Albany NY" },
      { slug: "voorheesville", label: "Living in Voorheesville NY" },
      { slug: "delmar", label: "Living in Delmar NY" },
      { slug: "niskayuna", label: "Living in Niskayuna NY" },
      { slug: "schenectady", label: "Living in Schenectady NY" },
    ],
  },
  {
    slug: "voorheesville",
    name: "Voorheesville",
    nameWithState: "Voorheesville, NY",
    county: "Albany County",
    zip: "12186",
    schoolDistrict: "Voorheesville Central School District",
    priceRange: "$300K–$550K",
    commuteMinutes: "20–25",
    commuteTo: "downtown Albany",
    intro:
      "Voorheesville, NY is a small village in the town of New Scotland, Albany County, set against the Helderberg escarpment. It is known for its top-rated Voorheesville Central School District, rural-suburban feel, and quick access to both Albany and the outdoor recreation of the Helderbergs.",
    marketBlurb:
      "The Voorheesville NY real estate market is small but consistently in demand thanks to school quality and the village's quiet, scenic character. Inventory is limited; well-priced homes typically sell quickly.",
    whyMove: [
      "Top-rated Voorheesville Central School District",
      "Rural-suburban feel with the Helderbergs as backdrop",
      "Walkable village core",
      "Albany County Rail Trail trailhead",
      "Quick access to Thacher State Park and Indian Ladder Farms",
      "20–25 minutes to downtown Albany",
    ],
    lifestyle:
      "Living in Voorheesville means a quieter pace, real seasons, hiking on the escarpment, and a tight school community. It is a strong choice for families who want a small-town feel without giving up Capital District commute access.",
    thingsToDo: [
      "Albany County Helderberg-Hudson Rail Trail",
      "Thacher State Park hiking and overlooks",
      "Indian Ladder Farms cidery and orchard",
      "Voorheesville Public Library events",
      "Local restaurants and the village center",
      "Quick access to skiing at Maple Ski Ridge and Belleayre",
    ],
    schoolsBlurb:
      "Voorheesville is served by the Voorheesville Central School District, a small, top-performing K–12 district. School quality drives most relocation decisions into the village.",
    commuteBlurb:
      "Voorheesville is about 20–25 minutes from downtown Albany via Route 85 or the Slingerlands Bypass. SUNY Albany and Crossgates are 15 minutes; Delmar is 10 minutes east.",
    whatsHappening:
      "Voorheesville remains a small, stable market. The Albany County Rail Trail and continued investment in village amenities keep demand steady.",
    nearby: [
      { slug: "delmar", label: "Living in Delmar NY" },
      { slug: "guilderland", label: "Living in Guilderland NY" },
      { slug: "albany", label: "Living in Albany NY" },
      { slug: "niskayuna", label: "Living in Niskayuna NY" },
      { slug: "clifton-park", label: "Living in Clifton Park NY" },
    ],
  },
  {
    slug: "queensbury",
    name: "Queensbury",
    nameWithState: "Queensbury, NY",
    county: "Warren County",
    zip: "12804",
    schoolDistrict: "Queensbury Union Free School District",
    priceRange: "$300K–$650K",
    commuteMinutes: "10",
    commuteTo: "Glens Falls",
    intro:
      "Queensbury, NY is the gateway to the Adirondacks and Lake George, located in Warren County just north of Glens Falls. It offers strong schools, a growing commercial base, and direct access to year-round outdoor recreation in the Adirondack Park.",
    marketBlurb:
      "The Queensbury NY real estate market spans newer single-family construction, established neighborhoods, and lake-area properties near Lake George. It draws buyers from Saratoga and Albany seeking more land and lake access.",
    whyMove: [
      "Highly-rated Queensbury Union Free School District",
      "Direct access to Lake George and the Adirondacks",
      "Strong commercial base along Route 9 and Aviation Road",
      "Newer construction and larger lots than most Capital District suburbs",
      "Proximity to Glens Falls Hospital and downtown Glens Falls",
      "Quick I-87 (Northway) access north and south",
    ],
    lifestyle:
      "Living in Queensbury means lakes in summer, skiing at Gore and West Mountain in winter, and a real Adirondack rhythm. Glens Falls's restored downtown is 10 minutes away; Saratoga is 30.",
    thingsToDo: [
      "Lake George swimming, boating, and waterfront dining",
      "West Mountain skiing and snowboarding",
      "The Great Escape and Six Flags",
      "Glens Falls dining and the Adirondack Theatre Festival",
      "Hiking in the southern Adirondacks",
      "Saratoga day trips for racing and SPAC",
    ],
    schoolsBlurb:
      "Queensbury is served by the Queensbury Union Free School District, one of the top-performing districts in Warren County. Some areas of the town fall in the Glens Falls or Lake George districts.",
    commuteBlurb:
      "Queensbury surrounds Glens Falls, putting the hospital and downtown within a 10-minute drive. Saratoga Springs is about 25–30 minutes south via I-87; Albany is about 50 minutes.",
    whatsHappening:
      "Queensbury continues to add commercial and residential development along the Route 9 corridor, with steady demand from buyers relocating from Saratoga and downstate seeking lake access and lower density.",
    nearby: [
      { slug: "saratoga-springs", label: "Living in Saratoga Springs NY" },
      { slug: "clifton-park", label: "Living in Clifton Park NY" },
      { slug: "albany", label: "Living in Albany NY" },
      { slug: "niskayuna", label: "Living in Niskayuna NY" },
      { slug: "delmar", label: "Living in Delmar NY" },
    ],
  },
  {
    slug: "amsterdam",
    name: "Amsterdam",
    nameWithState: "Amsterdam, NY",
    county: "Montgomery County",
    zip: "12010",
    schoolDistrict: "Greater Amsterdam School District",
    priceRange: "$120K–$300K",
    commuteMinutes: "30–35",
    commuteTo: "downtown Albany",
    intro:
      "Amsterdam, NY is a Mohawk Valley city in Montgomery County, about 35 minutes west of Albany along the Thruway. It is one of the most affordable markets in the broader Capital District and is increasingly attractive to cash-flow investors and first-time buyers priced out of Albany or Schenectady.",
    marketBlurb:
      "The Amsterdam NY real estate market offers some of the lowest entry prices in the region, with strong cash-flow potential on multi-units and entry-level single-family homes. Investor demand has been steady from the Capital District and downstate.",
    whyMove: [
      "Most affordable entry point in the broader Capital District",
      "Strong cash-flow potential on multi-unit properties",
      "Direct Thruway and Amtrak access",
      "Mohawk River waterfront and Riverlink Park",
      "Lower property taxes than many Capital District towns",
      "Growing investor and first-time buyer activity",
    ],
    lifestyle:
      "Living in Amsterdam is small-city Mohawk Valley living with lower costs, river access, and easy weekend trips into the Adirondacks or Saratoga. It is a practical choice for buyers prioritizing affordability and cash flow.",
    thingsToDo: [
      "Riverlink Park and the Mohawk Valley Gateway Overlook",
      "Erie Canal trail access",
      "Local dining along Market Street",
      "Day trips to Saratoga, the Adirondacks, and Cooperstown",
      "Sassafras Stables and area farms",
      "Fonda Speedway",
    ],
    schoolsBlurb:
      "Amsterdam is served by the Greater Amsterdam School District. Surrounding districts in Montgomery and Fulton counties offer additional options for families.",
    commuteBlurb:
      "Amsterdam is about 30–35 minutes from downtown Albany via I-90 (the Thruway) and roughly 25 minutes from Schenectady. Amtrak service is available from the Amsterdam station.",
    whatsHappening:
      "Amsterdam continues to invest in the downtown and waterfront, with growing demand from cash-flow investors seeking better yields than Albany or Schenectady.",
    nearby: [
      { slug: "schenectady", label: "Living in Schenectady NY" },
      { slug: "niskayuna", label: "Living in Niskayuna NY" },
      { slug: "clifton-park", label: "Living in Clifton Park NY" },
      { slug: "albany", label: "Living in Albany NY" },
      { slug: "saratoga-springs", label: "Living in Saratoga Springs NY" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────

const BOT_REGEX_SOURCE =
  "bot|crawler|spider|crawling|GPTBot|ChatGPT|ClaudeBot|Claude-Web|anthropic|Google-Extended|PerplexityBot|CCBot|Applebot|FacebookBot|Bytespider|Meta-ExternalAgent";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** @param {TownSeo} t */
function renderTownPage(t) {
  const title = `Living in ${t.nameWithState} | Homes, Schools & Lifestyle Guide | Capital District Nest`;
  const description = `Living in ${t.nameWithState}: ${t.schoolDistrict}, neighborhoods, homes for sale, things to do, and a ${t.commuteMinutes}-minute commute to ${t.commuteTo}. Local guide from Capital District Nest.`;
  const keywords = [
    `living in ${t.name} NY`,
    `homes for sale in ${t.name} NY`,
    `${t.name} NY real estate`,
    `${t.schoolDistrict}`,
    `moving to ${t.name} NY`,
    `${t.name} ${t.county}`,
    `things to do in ${t.name} NY`,
  ].join(", ");
  const url = `https://www.capitaldistrictnest.com/living-in-${t.slug}`;

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: t.nameWithState,
    description: t.intro,
    address: {
      "@type": "PostalAddress",
      addressLocality: t.name,
      addressRegion: "NY",
      postalCode: t.zip,
      addressCountry: "US",
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: t.township
        ? `${t.township}, ${t.county}, New York`
        : `${t.county}, New York`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is it like living in ${t.nameWithState}?`,
        acceptedAnswer: { "@type": "Answer", text: t.lifestyle },
      },
      {
        "@type": "Question",
        name: `Are homes for sale in ${t.name} NY a good investment?`,
        acceptedAnswer: { "@type": "Answer", text: t.marketBlurb },
      },
      {
        "@type": "Question",
        name: `What schools serve ${t.nameWithState}?`,
        acceptedAnswer: { "@type": "Answer", text: t.schoolsBlurb },
      },
      {
        "@type": "Question",
        name: `How long is the commute from ${t.name} to ${t.commuteTo}?`,
        acceptedAnswer: { "@type": "Answer", text: t.commuteBlurb },
      },
    ],
  };

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${url}" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="Living in ${escapeHtml(t.nameWithState)} | Capital District Nest" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="Capital District Nest" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Living in ${escapeHtml(t.nameWithState)} | Capital District Nest" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />

    <script type="application/ld+json">${JSON.stringify(placeSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>

    <script>
      (function () {
        var ua = navigator.userAgent || "";
        var isBot = /${BOT_REGEX_SOURCE}/i.test(ua);
        if (!isBot) {
          window.location.replace("/app/living-in-${t.slug}");
        }
      })();
    </script>

    <style>
      :root { color-scheme: light; }
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; background: #fafafa; margin: 0; padding: 0; }
      .container { max-width: 760px; margin: 0 auto; padding: 48px 24px; }
      h1 { font-size: 2.5rem; line-height: 1.15; margin: 0 0 16px; letter-spacing: -0.02em; }
      h2 { font-size: 1.6rem; margin: 40px 0 12px; letter-spacing: -0.01em; }
      p { margin: 0 0 16px; font-size: 1.05rem; }
      ul { margin: 0 0 16px 1.2em; padding: 0; }
      li { margin-bottom: 6px; }
      a { color: #0d6e6e; }
      .lede { font-size: 1.2rem; color: #444; }
      .cta { display: inline-block; margin: 8px 8px 8px 0; padding: 12px 22px; background: #0d6e6e; color: #fff !important; text-decoration: none; border-radius: 8px; font-weight: 600; }
      .cta.secondary { background: transparent; color: #0d6e6e !important; border: 1.5px solid #0d6e6e; }
      .meta { color: #666; font-size: 0.9rem; margin-top: 48px; padding-top: 24px; border-top: 1px solid #ddd; }
      nav.related a { display: inline-block; margin: 4px 8px 4px 0; }
    </style>
  </head>
  <body>
    <main class="container">
      <header>
        <p style="color:#0d6e6e;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;font-size:0.8rem;margin:0 0 8px;">Capital District Nest · Local Guide</p>
        <h1>Living in ${escapeHtml(t.nameWithState)}</h1>
        <p class="lede">Homes for sale, lifestyle, schools, and everything you need to know about ${escapeHtml(t.name)} — part of the Capital District, NY.</p>
        <p>
          <a class="cta" href="/towns/${t.slug}">View Homes in ${escapeHtml(t.name)}</a>
          <a class="cta secondary" href="tel:+15186762347">Talk to a Local Expert · (518) 676-2347</a>
        </p>
      </header>

      <section><p>${escapeHtml(t.intro)}</p>
        <p>If you're searching for <strong>homes for sale in ${escapeHtml(t.name)} NY</strong>, considering <strong>moving to ${escapeHtml(t.name)}</strong>, or simply researching what it's like <strong>living in ${escapeHtml(t.name)} NY</strong>, this guide covers the schools, lifestyle, commute, market dynamics, and what makes ${escapeHtml(t.name)} stand out in the Capital Region.</p>
      </section>

      <section>
        <h2>Homes for Sale in ${escapeHtml(t.nameWithState)}</h2>
        <p>${escapeHtml(t.marketBlurb)}</p>
        <p>Most single-family homes in ${escapeHtml(t.name)} trade in the ${escapeHtml(t.priceRange)} range. Browse <a href="/towns/${t.slug}">live ${escapeHtml(t.name)} listings and market intelligence</a> or get a free <a href="/intelligence">property intelligence report</a> on any specific address.</p>
      </section>

      <section>
        <h2>Why People Are Moving to ${escapeHtml(t.nameWithState)}</h2>
        <ul>${t.whyMove.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
      </section>

      <section>
        <h2>What It's Like Living in ${escapeHtml(t.nameWithState)}</h2>
        <p>${escapeHtml(t.lifestyle)}</p>
      </section>

      <section>
        <h2>Things to Do in ${escapeHtml(t.nameWithState)}</h2>
        <ul>${t.thingsToDo.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
      </section>

      <section>
        <h2>Schools in ${escapeHtml(t.nameWithState)}</h2>
        <p>${escapeHtml(t.schoolsBlurb)}</p>
      </section>

      <section>
        <h2>Commute from ${escapeHtml(t.name)} to ${escapeHtml(t.commuteTo)}</h2>
        <p>${escapeHtml(t.commuteBlurb)}</p>
      </section>

      <section>
        <h2>What's Happening in ${escapeHtml(t.nameWithState)}</h2>
        <p>${escapeHtml(t.whatsHappening)}</p>
      </section>

      <section>
        <h2>Buying or Selling in ${escapeHtml(t.name)}?</h2>
        <p>If you're considering buying or selling in ${escapeHtml(t.name)}, working with a local expert who knows the street-by-street differences makes a real difference. Capital District Nest provides free property intelligence reports and local market guidance for buyers, sellers, and investors throughout the Capital Region.</p>
        <p>
          <a class="cta" href="tel:+15186762347">Talk to Scott Alvarez · (518) 676-2347</a>
          <a class="cta secondary" href="/towns/${t.slug}">Browse ${escapeHtml(t.name)} Listings</a>
        </p>
      </section>

      <nav class="related" aria-label="Related guides">
        <h2>Explore Nearby Capital District Towns</h2>
        ${t.nearby.map((n) => `<a href="/living-in-${n.slug}">${escapeHtml(n.label)}</a> · `).join("")}
        <a href="/communities">Browse all Capital District towns</a>
      </nav>

      <p class="meta">Capital District Nest · Local real estate intelligence for Albany, Troy, Schenectady, Saratoga Springs, and the surrounding Capital Region. Contact: (518) 676-2347.</p>

      <noscript>
        <p style="margin-top:24px;color:#666;">For the interactive ${escapeHtml(t.name)} guide with maps and live listings, please enable JavaScript or call (518) 676-2347.</p>
      </noscript>
    </main>
  </body>
</html>
`;
}

let count = 0;
for (const town of TOWNS) {
  const dir = join(PUBLIC_DIR, `living-in-${town.slug}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), renderTownPage(town), "utf8");
  count++;
  console.log(`✓ public/living-in-${town.slug}/index.html`);
}
console.log(`\nGenerated ${count} town SEO pages.`);
