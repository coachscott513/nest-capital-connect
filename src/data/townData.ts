import { TownData } from "@/components/TownPageTemplate";

export const delmarData: TownData = {
  name: "Delmar",
  slug: "delmar",
  schoolDistrict: "Bethlehem Central School District",
  description: "Homes, market activity, and local insights — all built specifically for Delmar, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Delmar&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DBethlehem&pak=city%3Ag30_drd64p0&sortby=listings.price+ASC&rtype=map&leadid=948",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Delmar&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DBethlehem&pak=city%3Ag30_drd64p0&sortby=listings.price+ASC&rtype=map&leadid=948",
  },
  // MLS Data Source: GlobalMLS InfoSparks - December 2025
  mlsDataSource: "GlobalMLS InfoSparks",
  mlsDataDate: "December 2025",
  weeklyIntel: {
    newListings: 12,
    homesSold: 37,
    medianListPrice: "$430,000",
    avgDaysOnMarket: 8,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Seller's Market",
  },
  marketActivityLastChecked: "Jan 1, 2026",
  marketSnapshot: [
    { label: "Active Listings", value: "20", change: "low inventory" },
    { label: "Median Sale Price", value: "$430,000", change: "Dec 2025" },
    { label: "Days on Market", value: "8", change: "very fast" },
    { label: "Pending Sales", value: "12", change: "under contract" },
  ],
  recentlySold: [
    { address: "142 Elsmere Ave", price: "$435,000", beds: 3, baths: 2, date: "Dec 2025" },
    { address: "38 Fernbank Ave", price: "$525,000", beds: 4, baths: 2.5, date: "Nov 2025" },
    { address: "19 Greenleaf Dr", price: "$398,000", beds: 3, baths: 1.5, date: "Nov 2025" },
    { address: "85 Roweland Ave", price: "$458,000", beds: 4, baths: 2, date: "Oct 2025" },
    { address: "211 Murray Ave", price: "$545,000", beds: 4, baths: 2.5, date: "Oct 2025" },
  ],
  localInsights: {
    schoolOverview: "Bethlehem Central School District consistently ranks among the top districts in the Capital Region. High test scores, strong extracurriculars, and excellent college placement rates make this a top draw for families.",
    propertyTaxes: "Delmar property taxes typically range from $8,000 to $18,000 annually depending on home value and lot size. The Bethlehem Central school tax makes up the majority of the bill.",
    homeStyles: "Predominantly colonials, ranches, and split-levels from the 1950s-1980s. Lot sizes average 0.25-0.5 acres with established trees and mature landscaping. Newer construction in developments like Haswell Farms.",
    buyerDemand: "Strong demand from families relocating within the Capital Region and NYC transplants seeking top schools. Inventory remains tight, with well-priced homes selling quickly.",
    renovationDemand: "Move-in-ready homes command premium prices. However, there's growing interest in renovations as buyers accept older homes to get into the district. Kitchen and bath updates offer the best ROI.",
  },
  livingIn: "Known for walkable streets, strong schools, and quick access to Albany. Locals frequent places like Four Corners, the Rail Trail, and neighborhood parks that keep the town feeling connected and livable.",
  marketSnapshotParagraph: "Delmar is one of the Capital District's most desirable residential communities, anchored by the Bethlehem Central School District and a walkable village center. The market here tends toward stability, with families often staying long-term rather than flipping quickly.",
  lifeInCards: {
    fitness: [
      "Fitness 101 – Local gym near Four Corners",
      "Bethlehem YMCA – Family fitness and programs"
    ],
    cafes: [
      "Perfect Blend – Local coffee spot at Four Corners",
      "I Love NY Pizza – Quick bites and community gathering"
    ],
    restaurants: [
      "Swifty's – Casual American dining",
      "My Place & Co – Local pub and restaurant"
    ],
    parks: [
      "Elm Avenue Park – Pool, fields, and summer programs",
      "Albany County Rail Trail – Walking, biking, and running"
    ],
    commuting: [
      "10–15 minutes to downtown Albany",
      "Easy access to I-87 and Route 9W",
      "15–20 minutes to Albany Airport"
    ]
  },
  whoFitFor: [
    "Families prioritizing top-rated schools",
    "Buyers seeking walkable neighborhoods",
    "Commuters working in downtown Albany",
    "Those who value community and stability"
  ],
  localQuestions: [
    {
      question: "What are homes really selling for here?",
      answer: "Most homes in Delmar sell between $380,000 and $550,000, with the median around $430,000. Prices vary based on proximity to Four Corners, lot size, and condition. Well-priced homes often sell within a week."
    },
    {
      question: "How competitive is this market compared to nearby towns?",
      answer: "Delmar is one of the most competitive markets in the Capital Region due to Bethlehem Central schools. Expect multiple offers on desirable homes and limited negotiating room compared to Albany or Troy."
    },
    {
      question: "Are prices rising or stabilizing?",
      answer: "Prices have been stable over the past year with modest appreciation. The tight inventory keeps values firm, but we're not seeing the rapid increases of 2021-2022."
    },
    {
      question: "What surprises buyers when they move here?",
      answer: "Many buyers are surprised by the strong sense of community — neighbors know each other, kids walk to school, and local events at Four Corners draw crowds. Property taxes are higher than expected, but residents often say the schools justify it."
    },
    {
      question: "How does timing matter in this town?",
      answer: "Spring and early summer see the most listings, but competition is fierce. Fall can offer slightly less competition. Winter inventory is very limited, but motivated sellers may be more negotiable."
    }
  ],
  localSnapshot: {
    landmarks: [
      "Four Corners — the heart of Delmar with shops, restaurants, and the library",
      "Albany County Rail Trail — popular for walking, biking, and running",
      "Elm Avenue Park — community pool, sports fields, and summer programs",
      "Perfect Blend Café — local coffee spot near Four Corners",
      "Delmar Farmers Market — seasonal market with local vendors"
    ],
    schoolDistrictNames: [
      "Bethlehem Central School District"
    ],
    feel: "Suburban with a village core. Walkable streets near Four Corners transition to larger lots in surrounding neighborhoods. Family-oriented with active community programs, youth sports, and a well-used library system."
  },
};

export const troyData: TownData = {
  name: "Troy",
  slug: "troy",
  schoolDistrict: "Troy City School District",
  description: "Homes, market activity, and local insights for Troy, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Troy&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=city%3Ag30_dree57z2&sortby=listings.price+ASC&rtype=map",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Troy&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=city%3Ag30_dree57z2&sortby=listings.price+ASC&rtype=map",
  },
  // MLS Data Source: GlobalMLS InfoSparks - December 2025
  mlsDataSource: "GlobalMLS InfoSparks",
  mlsDataDate: "December 2025",
  weeklyIntel: {
    newListings: 19,
    homesSold: 19,
    medianListPrice: "$237,000",
    avgDaysOnMarket: 14,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Balanced Market",
  },
  marketActivityLastChecked: "Jan 1, 2026",
  marketSnapshot: [
    { label: "Active Listings", value: "38", change: "available homes" },
    { label: "Median Sale Price", value: "$237,000", change: "Dec 2025" },
    { label: "Days on Market", value: "14", change: "moderate" },
    { label: "Pending Sales", value: "19", change: "under contract" },
  ],
  recentlySold: [
    { address: "156 2nd Street", price: "$225,000", beds: 3, baths: 2, date: "Dec 2025" },
    { address: "78 Pawling Ave", price: "$185,000", beds: 4, baths: 1.5, date: "Nov 2025" },
    { address: "234 Congress St", price: "$245,000", beds: 3, baths: 2, date: "Nov 2025" },
    { address: "45 Spring Ave", price: "$168,000", beds: 2, baths: 1, date: "Oct 2025" },
  ],
  localInsights: {
    schoolOverview: "Troy City School District serves a diverse student population. Strong arts programs and growing STEM initiatives. Proximity to RPI provides unique educational partnerships.",
    propertyTaxes: "Property taxes typically range from $4,000 to $10,000 annually. More affordable than suburban alternatives while still offering urban amenities.",
    homeStyles: "Victorian rowhouses, brick Italianates, and multi-family properties dominate. Historic architecture with significant square footage. Growing renovation activity in downtown and South Troy.",
    buyerDemand: "Strong investor interest for multi-family properties. Growing demand from first-time buyers and RPI affiliates. Downtown revitalization driving increased interest.",
    renovationDemand: "Excellent renovation opportunities. Historic properties with good bones available at accessible prices. Strong rental demand supports investment purchases.",
  },
  livingIn: "A city with grit and character. Downtown Troy offers a walkable core with local restaurants, coffee shops, and the year-round Troy Waterfront Farmers Market. Close to RPI and easy access to the Hudson River waterfront.",
  marketSnapshotParagraph: "Troy offers one of the Capital District's most compelling investment opportunities, with historic housing stock, growing downtown energy, and price points well below suburban markets. The RPI presence and ongoing revitalization efforts continue to drive renewed interest.",
  lifeInCards: {
    fitness: [
      "Troy YMCA – Community fitness center",
      "RPI Athletic Facilities – Campus recreation options"
    ],
    cafes: [
      "Spillin' the Beans – Local coffee shop downtown",
      "Lucas Confectionery – Wine bar and café"
    ],
    restaurants: [
      "Brown's Brewing – Craft beer and pub food",
      "Dinosaur Bar-B-Que – BBQ institution"
    ],
    parks: [
      "Riverfront Park – Hudson River waterfront access",
      "Prospect Park – Views and walking trails"
    ],
    commuting: [
      "10 minutes to Albany",
      "Access to I-787 and Route 7",
      "20 minutes to Albany Airport"
    ]
  },
  whoFitFor: [
    "Investors seeking cash flow properties",
    "First-time buyers on a budget",
    "RPI students and faculty",
    "Those who value urban walkability and character"
  ],
  localQuestions: [
    {
      question: "What are homes really selling for here?",
      answer: "Most homes in Troy sell between $150,000 and $300,000, with the median around $237,000. Multi-family properties and historic homes in good condition command higher prices. Downtown and South Troy offer the most variety."
    },
    {
      question: "How competitive is this market compared to nearby towns?",
      answer: "Troy is less competitive than suburban markets like Delmar or Niskayuna. Buyers have more negotiating room, and properties sit longer. This makes it attractive for first-time buyers and investors."
    },
    {
      question: "Are prices rising or stabilizing?",
      answer: "Prices have seen steady appreciation over the past few years, driven by downtown revitalization and investor interest. The market remains more affordable than most of the Capital Region."
    },
    {
      question: "What surprises buyers when they move here?",
      answer: "Buyers are often surprised by the quality of historic architecture and the vibrant downtown scene. The walkability, farmers market, and proximity to RPI create a unique urban feel uncommon in the Capital Region."
    },
    {
      question: "How does timing matter in this town?",
      answer: "Year-round activity with less seasonal fluctuation than suburban markets. Investment properties move quickly. Academic calendar from RPI can influence rental demand timing."
    }
  ],
  localSnapshot: {
    landmarks: [
      "Troy Waterfront Farmers Market — year-round market on River Street",
      "Brown's Brewing Company — local brewery and gathering spot",
      "Uncle Sam statue — downtown landmark",
      "Hudson River waterfront — parks and walking paths",
      "RPI campus — Rensselaer Polytechnic Institute"
    ],
    schoolDistrictNames: [
      "Troy City School District"
    ],
    feel: "Urban with historic character. Walkable downtown with restaurants, cafes, and local shops. Victorian architecture lines the streets. A city in transition with growing energy from young professionals and artists."
  },
};

export const niskayunaData: TownData = {
  name: "Niskayuna",
  slug: "niskayuna",
  schoolDistrict: "Niskayuna Central School District",
  description: "Homes, market activity, and local insights for Niskayuna, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Niskayuna+Central+School+District&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=school_district%3Ab5QBqXEBDeU4HJVijxZS&sortby=listings.price+ASC&rtype=map",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Niskayuna+Central+School+District&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=school_district%3Ab5QBqXEBDeU4HJVijxZS&sortby=listings.price+ASC&rtype=map",
  },
  // MLS Data Source: GlobalMLS InfoSparks - December 2025
  mlsDataSource: "GlobalMLS InfoSparks",
  mlsDataDate: "December 2025",
  weeklyIntel: {
    newListings: 12,
    homesSold: 23,
    medianListPrice: "$469,900",
    avgDaysOnMarket: 9,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Seller's Market",
  },
  marketActivityLastChecked: "Jan 1, 2026",
  marketSnapshot: [
    { label: "Active Listings", value: "22", change: "low inventory" },
    { label: "Median Sale Price", value: "$469,900", change: "Dec 2025" },
    { label: "Days on Market", value: "9", change: "very fast" },
    { label: "Pending Sales", value: "14", change: "under contract" },
  ],
  recentlySold: [
    { address: "2145 Nott St", price: "$408,000", beds: 4, baths: 2.5, date: "Dec 2025" },
    { address: "1876 Balltown Rd", price: "$355,000", beds: 3, baths: 2, date: "Nov 2025" },
    { address: "456 Van Antwerp Rd", price: "$445,000", beds: 4, baths: 2.5, date: "Nov 2025" },
  ],
  localInsights: {
    schoolOverview: "Niskayuna Central School District is consistently ranked among the best in New York State. Known for strong STEM programs, competitive academics, and excellent college preparation.",
    propertyTaxes: "Property taxes typically range from $9,000 to $16,000 annually. The excellent school district is a primary driver of tax rates but also supports strong home values.",
    homeStyles: "Mix of mid-century colonials, ranches, and newer construction. Many homes feature generous lot sizes with mature landscaping. Popular neighborhoods include Rosendale and Van Antwerp areas.",
    buyerDemand: "High demand from families seeking top-rated schools. GE and local tech employers drive consistent buyer interest. Homes in the best school zones sell quickly.",
    renovationDemand: "Strong preference for updated kitchens and baths. Mid-century homes with original features often need updates, but the strong school district ensures good resale value after renovations.",
  },
  livingIn: "A quiet, family-focused suburb with top-rated schools and tree-lined streets. Residents enjoy easy access to the Mohawk-Hudson Bike-Hike Trail, Niskayuna Co-op, and a 15-minute commute to downtown Schenectady or Albany.",
  marketSnapshotParagraph: "Niskayuna is a school-district-driven market where families compete for limited inventory. The combination of top-rated schools, quiet neighborhoods, and proximity to major employers creates consistent demand and stable values year-round.",
  lifeInCards: {
    fitness: [
      "Niskayuna YMCA – Family fitness and programs",
      "Vent Fitness – Modern gym facilities"
    ],
    cafes: [
      "Villa Italia – Local coffee and pastries",
      "Niskayuna Co-op Café – Community grocery and café"
    ],
    restaurants: [
      "Blue Ribbon Restaurant – Local diner favorite",
      "Moscatiello's – Italian dining"
    ],
    parks: [
      "Mohawk-Hudson Bike-Hike Trail – Recreation and commuting",
      "Blatnik Park – Sports fields and events"
    ],
    commuting: [
      "15 minutes to downtown Schenectady",
      "20–25 minutes to Albany",
      "Easy access to I-890"
    ]
  },
  whoFitFor: [
    "Families prioritizing top-rated schools",
    "GE and tech sector employees",
    "Buyers seeking quiet suburban living",
    "Those who value community and stability"
  ],
  localQuestions: [
    {
      question: "What are homes really selling for here?",
      answer: "Most homes in Niskayuna sell between $350,000 and $550,000, with the median around $470,000. Homes in prime school zones and with updated features command the highest prices."
    },
    {
      question: "How competitive is this market compared to nearby towns?",
      answer: "Niskayuna is one of the most competitive markets in the Capital Region due to the top-rated school district. Expect multiple offers on well-priced homes and limited inventory."
    },
    {
      question: "Are prices rising or stabilizing?",
      answer: "Prices have been stable with modest appreciation. The strong school district provides a floor for values, and inventory remains tight year-round."
    },
    {
      question: "What surprises buyers when they move here?",
      answer: "Buyers are often surprised by how quiet and family-focused the community is. The access to nature via the Bike-Hike Trail and the convenience of the Niskayuna Co-op create a balanced suburban lifestyle."
    },
    {
      question: "How does timing matter in this town?",
      answer: "Spring and summer see the most family moves timed around the school year. Inventory is always limited, so acting quickly on desirable properties is essential."
    }
  ],
  localSnapshot: {
    landmarks: [
      "Niskayuna Co-op — local grocery and community hub",
      "Mohawk-Hudson Bike-Hike Trail — popular for recreation",
      "Blatnik Park — sports fields and community events",
      "Rosendale neighborhood — established family area",
      "Niskayuna Town Hall — community center"
    ],
    schoolDistrictNames: [
      "Niskayuna Central School District"
    ],
    feel: "Quiet suburban with excellent schools. Tree-lined streets with mid-century homes. Family-oriented with strong community programs. Close to Schenectady and Albany while maintaining its own identity."
  },
};

export const saratogaData: TownData = {
  name: "Saratoga Springs",
  slug: "saratoga-springs",
  schoolDistrict: "Saratoga Springs City School District",
  description: "Homes, market activity, and local insights for Saratoga Springs, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Saratoga+Springs+City+School+District&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=school_district%3AWh4CqXEBvDrqX0JUFazL&sortby=listings.price+ASC&rtype=map",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Saratoga+Springs+City+School+District&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=school_district%3AWh4CqXEBvDrqX0JUFazL&sortby=listings.price+ASC&rtype=map",
  },
  // MLS Data Source: GlobalMLS InfoSparks - December 2025
  mlsDataSource: "GlobalMLS InfoSparks",
  mlsDataDate: "December 2025",
  weeklyIntel: {
    newListings: 0,
    homesSold: 1,
    medianListPrice: "$625,000",
    avgDaysOnMarket: 79,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Limited Inventory",
  },
  marketActivityLastChecked: "Jan 1, 2026",
  marketSnapshot: [
    { label: "Active Listings", value: "5", change: "very low inventory" },
    { label: "Median Sale Price", value: "$625,000", change: "Dec 2025" },
    { label: "Days on Market", value: "79", change: "slower" },
    { label: "Pending Sales", value: "2", change: "under contract" },
  ],
  recentlySold: [
    { address: "45 Circular St", price: "$685,000", beds: 4, baths: 3, date: "Dec 2025" },
    { address: "234 Nelson Ave", price: "$495,000", beds: 3, baths: 2.5, date: "Nov 2025" },
    { address: "89 Union Ave", price: "$545,000", beds: 4, baths: 2, date: "Nov 2025" },
    { address: "156 Lake Ave", price: "$425,000", beds: 3, baths: 2, date: "Oct 2025" },
  ],
  localInsights: {
    schoolOverview: "Saratoga Springs City School District is one of the most sought-after in the region. Excellent academics, strong arts and athletics programs, and high graduation rates.",
    propertyTaxes: "Property taxes typically range from $10,000 to $25,000 annually. Premium location and excellent schools justify higher tax rates.",
    homeStyles: "Historic Victorians downtown, colonials in established neighborhoods, and newer construction in developments. Wide variety of architectural styles and price points.",
    buyerDemand: "Extremely high demand from families, retirees, and second-home buyers. Racing season brings additional interest. Consistently strong appreciation.",
    renovationDemand: "Historic homes often need updates but command premium prices when renovated. Strong preference for move-in ready, but renovation opportunities exist in older neighborhoods.",
  },
  livingIn: "A destination town with year-round appeal. Broadway's shops and restaurants, Saratoga Spa State Park, and the famous racetrack draw visitors and residents alike. Walkable downtown, mineral springs, and a vibrant arts scene define daily life.",
  marketSnapshotParagraph: "Saratoga Springs commands premium prices as one of the Capital District's most desirable destinations. The combination of walkable downtown, excellent schools, and year-round tourism creates a unique market where lifestyle buyers compete with long-term residents.",
  lifeInCards: {
    fitness: [
      "Saratoga Regional YMCA – Full-service fitness",
      "Saratoga Spa State Park – Trails and pools"
    ],
    cafes: [
      "Uncommon Grounds – Local coffee institution",
      "Saratoga Coffee Traders – Downtown café"
    ],
    restaurants: [
      "Hattie's – Southern comfort food",
      "Druthers Brewing – Craft beer and food"
    ],
    parks: [
      "Saratoga Spa State Park – Springs, trails, and SPAC",
      "Congress Park – Downtown green space"
    ],
    commuting: [
      "30–40 minutes to Albany",
      "20 minutes to Clifton Park",
      "Access to I-87 Northway"
    ]
  },
  whoFitFor: [
    "Lifestyle buyers seeking walkable downtown living",
    "Families prioritizing excellent schools",
    "Second-home buyers and investors",
    "Those who value arts, dining, and outdoor recreation"
  ],
  localQuestions: [
    {
      question: "What are homes really selling for here?",
      answer: "Most homes in Saratoga Springs sell between $450,000 and $800,000, with the median around $625,000. Historic downtown properties and homes near the track command premium prices."
    },
    {
      question: "How competitive is this market compared to nearby towns?",
      answer: "Saratoga is highly desirable with limited inventory, making it competitive. However, higher price points mean fewer bidding wars compared to more affordable markets."
    },
    {
      question: "Are prices rising or stabilizing?",
      answer: "Prices have been stable at premium levels. The destination appeal and strong schools maintain values, though the pace of appreciation has moderated."
    },
    {
      question: "What surprises buyers when they move here?",
      answer: "Buyers are surprised by how active the community is year-round — not just during racing season. The arts scene, downtown walkability, and Saratoga Spa State Park create a lifestyle beyond the summer crowds."
    },
    {
      question: "How does timing matter in this town?",
      answer: "Spring and early summer before racing season see the most inventory. Racing season (July-August) brings visibility but also tourist competition. Fall can offer less pressure."
    }
  ],
  localSnapshot: {
    landmarks: [
      "Broadway — main street with shops, restaurants, and galleries",
      "Saratoga Race Course — historic horse racing track",
      "Saratoga Spa State Park — mineral springs and performing arts center",
      "Congress Park — downtown park with carousel and mineral springs",
      "Caroline Street — nightlife and dining district"
    ],
    schoolDistrictNames: [
      "Saratoga Springs City School District"
    ],
    feel: "Destination town with year-round appeal. Walkable Victorian downtown meets resort town amenities. Arts, dining, and outdoor recreation blend seamlessly. A place where people visit and decide to stay."
  },
};

export const cliftonParkData: TownData = {
  name: "Clifton Park",
  slug: "clifton-park",
  schoolDistrict: "Shenendehowa Central School District",
  description: "Clear, local housing intelligence for Clifton Park and the surrounding Capital District. Updated regularly using MLS market data and local analysis.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Shenendehowa+Central+School+District&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DClifton+Park&pak=school_district%3ATScAqXEBP2ySQEDmIXO6&sortby=listings.price+ASC&rtype=map",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Shenendehowa+Central+School+District&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DClifton+Park&pak=school_district%3ATScAqXEBP2ySQEDmIXO6&sortby=listings.price+ASC&rtype=map",
    justListed: "https://scottalvarez.remax.com/index.php?advanced=1&display=Shenendehowa+Central+School+District&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&options%5B%5D=new&keywords=City%3DClifton+Park&pak=school_district%3ATScAqXEBP2ySQEDmIXO6&sortby=listings.price+ASC&rtype=map",
  },
  // MLS Data Source: GlobalMLS InfoSparks - December 2025
  mlsDataSource: "GlobalMLS InfoSparks",
  mlsDataDate: "December 2025",
  weeklyIntel: {
    newListings: 26,
    homesSold: 38,
    medianListPrice: "$478,500",
    avgDaysOnMarket: 10,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Seller's Market",
  },
  marketActivityLastChecked: "Jan 1, 2026",
  marketSnapshot: [
    { label: "New Listings", value: "26", change: "last 7 days" },
    { label: "Homes for Sale", value: "39", change: "available" },
    { label: "Homes Sold", value: "38", change: "last 30 days" },
    { label: "Median Sale Price", value: "$478,500", change: "Dec 2025" },
    { label: "Median Days on Market", value: "10", change: "fast" },
    { label: "Pending Sales", value: "21", change: "under contract" },
  ],
  recentlySold: [
    { address: "28 Huntwood Dr", price: "$498,000", beds: 4, baths: 2.5, date: "Dec 2025" },
    { address: "156 Moe Rd", price: "$410,000", beds: 3, baths: 2, date: "Nov 2025" },
    { address: "892 Route 146", price: "$545,000", beds: 5, baths: 3, date: "Nov 2025" },
    { address: "34 Longwood Dr", price: "$465,000", beds: 4, baths: 2.5, date: "Oct 2025" },
  ],
  localInsights: {
    schoolOverview: "Shenendehowa Central School District is one of the largest and highest-performing districts in the region. Known for athletics, academics, and extensive extracurricular programs.",
    propertyTaxes: "Property taxes typically range from $8,000 to $15,000 annually. Competitive rates considering the quality of schools and municipal services.",
    homeStyles: "Predominantly newer construction from 1980s onward. Large subdivisions with colonials, contemporaries, and townhomes. Exit 8 and Exit 9 areas offer different neighborhood feels.",
    buyerDemand: "Extremely high demand from families and commuters. Excellent highway access to Albany and Saratoga. Tech corridor employers drive consistent buyer interest.",
    renovationDemand: "Less renovation opportunity as housing stock is newer. Buyers prefer move-in ready. Updates to 1980s-90s homes (kitchens, baths, flooring) can add significant value.",
  },
  // NEW: Market Snapshot paragraph
  marketSnapshotParagraph: "Clifton Park is one of the Capital District's most consistently active residential markets, known for newer housing stock, strong school districts, and steady long-term demand. Buyers and sellers here tend to be long-term residents rather than short-term speculators, which contributes to market stability even during broader market shifts.",
  // NEW: Life in Clifton Park - Local Life Cards
  lifeInCards: {
    fitness: [
      "ABC Sports & Fitness – Full-service fitness club with pools and courts",
      "Vent Fitness – Popular local gym with multiple locations nearby"
    ],
    cafes: [
      "Stacks Espresso Bar – Local favorite for coffee and remote work",
      "Uncommon Grounds – Casual café and bakery option"
    ],
    restaurants: [
      "Ferrari's Ristorante – Established Italian dining spot",
      "Carson's Woodside Tavern – Casual dining and gathering place"
    ],
    parks: [
      "Clifton Common – Trails, fields, and seasonal events",
      "Vischer Ferry Nature Preserve – Walking paths and river access"
    ],
    commuting: [
      "Easy access to I-87 and Route 146",
      "Approx. 20–25 minutes to Albany",
      "Approx. 20 minutes to Saratoga Springs"
    ]
  },
  // NEW: Who Clifton Park Is Often a Fit For
  whoFitFor: [
    "Families prioritizing school districts",
    "Buyers seeking newer or well-maintained homes",
    "Commuters working in Albany or Saratoga",
    "Long-term rental investors focused on stability"
  ],
  livingIn: "Clifton Park offers a suburban lifestyle with strong schools, everyday conveniences, and easy access to Albany, Saratoga, and major highways.",
  localQuestions: [
    {
      question: "Is Clifton Park competitive right now?",
      answer: "Inventory levels and days on market suggest a market that favors prepared buyers."
    },
    {
      question: "How quickly do homes sell?",
      answer: "Homes typically move faster than many surrounding towns when priced accurately."
    },
    {
      question: "Are rentals hard to find?",
      answer: "Rental demand remains steady due to limited supply and strong tenant profiles."
    },
    {
      question: "How does Clifton Park compare to nearby towns?",
      answer: "Clifton Park tends to trade slightly higher than neighboring areas due to school districts and housing age."
    }
  ],
  localSnapshot: {
    landmarks: [
      "Clifton Common – Trails, fields, and seasonal events",
      "Southern Saratoga YMCA – Community fitness and programs",
      "Clifton Park Center – Shopping and dining hub",
      "Vischer Ferry Nature Preserve – Walking paths and river access"
    ],
    schoolDistrictNames: [
      "Shenendehowa Central School District"
    ],
    feel: "Suburban with excellent schools and highway access. Families enjoy the YMCA, local parks, and quick drives to both Saratoga and Albany. A stable, family-focused community with consistent demand."
  },
};

export const schenectadyData: TownData = {
  name: "Schenectady",
  slug: "schenectady",
  schoolDistrict: "Schenectady City School District",
  description: "Homes, market activity, and local insights for Schenectady, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Schenectady+City+School+District&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=school_district%3A3YcAqXEBrfxrYfk40-yv&sortby=listings.price+ASC&rtype=map",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Schenectady+City+School+District&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=school_district%3A3YcAqXEBrfxrYfk40-yv&sortby=listings.price+ASC&rtype=map",
  },
  // MLS Data Source: GlobalMLS InfoSparks - December 2025
  mlsDataSource: "GlobalMLS InfoSparks",
  mlsDataDate: "December 2025",
  weeklyIntel: {
    newListings: 22,
    homesSold: 51,
    medianListPrice: "$230,000",
    avgDaysOnMarket: 13,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Seller's Market",
  },
  marketActivityLastChecked: "Jan 1, 2026",
  marketSnapshot: [
    { label: "Active Listings", value: "50", change: "available homes" },
    { label: "Median Sale Price", value: "$230,000", change: "Dec 2025" },
    { label: "Days on Market", value: "13", change: "fast" },
    { label: "Pending Sales", value: "21", change: "under contract" },
  ],
  recentlySold: [
    { address: "1245 State St", price: "$185,000", beds: 3, baths: 2, date: "Dec 2025" },
    { address: "567 Union St", price: "$155,000", beds: 4, baths: 1.5, date: "Nov 2025" },
    { address: "89 Nott Terrace", price: "$198,000", beds: 3, baths: 2, date: "Nov 2025" },
    { address: "234 Eastern Ave", price: "$142,000", beds: 2, baths: 1, date: "Oct 2025" },
  ],
  localInsights: {
    schoolOverview: "Schenectady City School District offers diverse educational opportunities. Growing STEM programs and partnerships with Union College and local employers.",
    propertyTaxes: "Property taxes are among the most affordable in the region, typically $3,500 to $8,000 annually. Very affordable compared to suburban alternatives.",
    homeStyles: "Historic Victorians, rowhouses, and multi-family properties. Stockade District offers unique colonial architecture. Strong architectural character throughout the city.",
    buyerDemand: "Growing investor interest for cash flow properties. First-time buyers attracted to affordability. Downtown revitalization spurring renewed interest.",
    renovationDemand: "Excellent opportunities for renovation projects. Historic properties with significant potential. Strong rental market supports investment purchases.",
  },
  livingIn: "An affordable city with deep history and a growing arts scene. The Stockade District is one of America's oldest neighborhoods. Proctors Theatre, Union College, and local breweries anchor the downtown. Easy access to I-890 and Route 7.",
  marketSnapshotParagraph: "Schenectady offers one of the Capital District's most affordable entry points, with historic architecture and growing revitalization energy. Investors and first-time buyers find value here that's increasingly hard to find in surrounding suburban markets.",
  lifeInCards: {
    fitness: [
      "YMCA of Schenectady – Community fitness",
      "Union College Athletic Center – Recreation options"
    ],
    cafes: [
      "Ambition Coffee & Eatery – Downtown café",
      "Arthur's Market – Coffee and community"
    ],
    restaurants: [
      "Aperitivo Bistro – Italian dining",
      "Mad Jack Brewing – Craft beer and food"
    ],
    parks: [
      "Central Park – City green space",
      "Stockade District – Historic walking"
    ],
    commuting: [
      "15 minutes to Albany",
      "15 minutes to Niskayuna",
      "Access to I-890 and Route 7"
    ]
  },
  whoFitFor: [
    "Investors seeking affordable multi-family",
    "First-time buyers on a budget",
    "Those who value historic architecture",
    "Urban buyers priced out of Albany"
  ],
  localQuestions: [
    {
      question: "What are homes really selling for here?",
      answer: "Most homes in Schenectady sell between $120,000 and $280,000, with the median around $230,000. Multi-family properties in established neighborhoods command higher prices."
    },
    {
      question: "How competitive is this market compared to nearby towns?",
      answer: "Schenectady is more accessible than suburban markets like Niskayuna. Buyers have more negotiating room, making it attractive for first-time buyers and investors."
    },
    {
      question: "Are prices rising or stabilizing?",
      answer: "Prices have seen steady appreciation driven by revitalization and investor interest. The market remains more affordable than most of the Capital Region."
    },
    {
      question: "What surprises buyers when they move here?",
      answer: "Buyers are often surprised by the quality of historic architecture and the growing downtown scene. The Stockade District and Proctors create cultural anchors uncommon for the price point."
    }
  ],
  localSnapshot: {
    landmarks: [
      "Proctors Theatre – Historic performing arts venue",
      "Stockade District – America's oldest neighborhood",
      "Union College – Historic campus and community anchor",
      "Central Park – City green space"
    ],
    schoolDistrictNames: [
      "Schenectady City School District"
    ],
    feel: "Urban with historic character. Growing arts and dining scene. Affordable entry point with renovation opportunities. A city in transition with increasing energy."
  },
};

export const amsterdamData: TownData = {
  name: "Amsterdam",
  slug: "amsterdam",
  schoolDistrict: "Amsterdam City School District",
  description: "Homes, market activity, and local insights for Amsterdam, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Amsterdam+City+SD&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DAmsterdam&pak=scho%3Ag30_5qr8d4z&sortby=listings.price+ASC&rtype=map&leadid=948",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Amsterdam+City+SD&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DAmsterdam&pak=scho%3Ag30_5qr8d4z&sortby=listings.price+ASC&rtype=map&leadid=948",
  },
  // MLS Data Source: GlobalMLS InfoSparks - December 2025
  mlsDataSource: "GlobalMLS InfoSparks",
  mlsDataDate: "December 2025",
  weeklyIntel: {
    newListings: 7,
    homesSold: 13,
    medianListPrice: "$260,000",
    avgDaysOnMarket: 12,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Seller's Market",
  },
  marketActivityLastChecked: "Jan 1, 2026",
  marketSnapshot: [
    { label: "Active Listings", value: "22", change: "available homes" },
    { label: "Median Sale Price", value: "$260,000", change: "Dec 2025" },
    { label: "Days on Market", value: "12", change: "fast" },
    { label: "Pending Sales", value: "10", change: "under contract" },
  ],
  recentlySold: [
    { address: "85 Division St", price: "$135,000", beds: 3, baths: 1, date: "Dec 2025" },
    { address: "234 Market St", price: "$178,000", beds: 4, baths: 2, date: "Nov 2025" },
    { address: "67 Church St", price: "$155,000", beds: 3, baths: 1.5, date: "Nov 2025" },
  ],
  localInsights: {
    schoolOverview: "Amsterdam City School District serves a diverse community. Recent investments in facilities and programs. Growing opportunities for student success.",
    propertyTaxes: "Property taxes are among the most affordable in the region, typically $3,000 to $6,000 annually. Excellent value for investors and budget-conscious buyers.",
    homeStyles: "Historic Victorian and Italianate homes, rowhouses, and multi-family properties. Many properties offer significant square footage at affordable prices. Strong architectural character throughout.",
    buyerDemand: "Growing interest from investors seeking cash flow and buyers priced out of Albany County. Revitalization efforts and arts community driving renewed interest.",
    renovationDemand: "Excellent opportunities for renovation projects. Historic homes with good bones available at low entry points. Investors achieving strong returns on thoughtful renovations.",
  },
  livingIn: "A Mohawk Valley city with affordable homes and strong community ties. Main Street offers local shops and eateries. The Mohawk River and Erie Canal provide outdoor recreation. A 35-minute drive to Albany or Saratoga.",
  marketSnapshotParagraph: "Amsterdam offers the Capital District's most affordable housing options, with historic architecture and growing investor interest. Buyers priced out of Albany County are discovering value here, driving renewed attention to the market.",
  lifeInCards: {
    fitness: [
      "Amsterdam YMCA – Community fitness center",
      "Local gyms – Various options downtown"
    ],
    cafes: [
      "Raindancer – Local coffee and café",
      "Main Street Coffee – Downtown option"
    ],
    restaurants: [
      "Henry & Mary's – Local dining",
      "Amsterdam Ale House – Pub and gathering place"
    ],
    parks: [
      "Mohawk River access – Recreation and trails",
      "Erie Canal path – Walking and biking"
    ],
    commuting: [
      "35 minutes to Albany",
      "35 minutes to Saratoga",
      "Access to Route 30 and I-90"
    ]
  },
  whoFitFor: [
    "Investors seeking maximum cash flow",
    "First-time buyers on a tight budget",
    "Remote workers seeking affordability",
    "Those who value small-town community"
  ],
  localQuestions: [
    {
      question: "What are homes really selling for here?",
      answer: "Most homes in Amsterdam sell between $100,000 and $200,000, with the median around $155,000. Historic properties and multi-families offer the most value."
    },
    {
      question: "How competitive is this market?",
      answer: "Amsterdam is less competitive than Albany County markets. Buyers have more negotiating room and can find deals not available closer to Albany."
    },
    {
      question: "Are prices rising?",
      answer: "Prices have appreciated as buyers discover value here. Still among the most affordable markets in the region."
    },
    {
      question: "What surprises buyers?",
      answer: "Buyers are surprised by the historic architecture and community feel. The Erie Canal and Mohawk River provide unexpected outdoor recreation."
    }
  ],
  localSnapshot: {
    landmarks: [
      "Erie Canal – Historic waterway and recreation",
      "Mohawk River – Outdoor recreation",
      "Main Street – Local shops and dining",
      "Historic downtown – Architecture and character"
    ],
    schoolDistrictNames: [
      "Amsterdam City School District"
    ],
    feel: "Small city with strong community ties. Affordable homes with historic character. Growing interest from investors and budget-conscious buyers."
  },
};

export const queensburyData: TownData = {
  name: "Queensbury",
  slug: "queensbury",
  schoolDistrict: "Queensbury Union Free School District",
  description: "Homes, market activity, and local insights for Queensbury, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Queensbury+Union+Free+School+District&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=school_district%3AuAsBqXEBNCODdP_3qCa7&sortby=listings.price+ASC&rtype=map",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Queensbury+Union+Free+School+District&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=school_district%3AuAsBqXEBNCODdP_3qCa7&sortby=listings.price+ASC&rtype=map",
  },
  // MLS Data Source: GlobalMLS InfoSparks - November 2025
  mlsDataSource: "GlobalMLS InfoSparks",
  mlsDataDate: "November 2025",
  weeklyIntel: {
    newListings: 23,
    homesSold: 33,
    medianListPrice: "$455,000",
    avgDaysOnMarket: 6,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Seller's Market",
  },
  marketActivityLastChecked: "Dec 31, 2025",
  marketSnapshot: [
    { label: "Active Listings", value: "45", change: "available homes" },
    { label: "Median Sale Price", value: "$455,000", change: "Nov 2025" },
    { label: "Days on Market", value: "6", change: "very fast" },
    { label: "Closed Sales", value: "33", change: "Nov 2025" },
  ],
  recentlySold: [
    { address: "156 Aviation Rd", price: "$385,000", beds: 4, baths: 2.5, date: "Dec 2025" },
    { address: "45 Bay Rd", price: "$298,000", beds: 3, baths: 2, date: "Nov 2025" },
    { address: "234 Ridge Rd", price: "$425,000", beds: 4, baths: 3, date: "Nov 2025" },
    { address: "89 Quaker Rd", price: "$315,000", beds: 3, baths: 2, date: "Oct 2025" },
  ],
  localInsights: {
    schoolOverview: "Queensbury Union Free School District is highly regarded in the Warren County area. Strong academics, athletics, and community involvement.",
    propertyTaxes: "Property taxes typically range from $6,000 to $12,000 annually. Good value considering quality schools and proximity to Lake George.",
    homeStyles: "Mix of colonials, ranches, and custom homes. Many properties feature wooded lots and mountain views. Variety of newer subdivisions and established neighborhoods.",
    buyerDemand: "Strong demand from families seeking quality schools and outdoor lifestyle. Lake George proximity attracts second-home buyers. Growing interest from remote workers.",
    renovationDemand: "Moderate renovation opportunities. Buyers prefer move-in ready but appreciate updated kitchens and baths. Lakefront and view properties command premium after updates.",
  },
  livingIn: "Gateway to the Adirondacks with Lake George just minutes away. Aviation Mall, outlet shopping, and local restaurants serve daily needs. Hiking, skiing, and lake recreation are part of the lifestyle. Excellent schools and a safe, family-friendly feel.",
  marketSnapshotParagraph: "Queensbury serves as the gateway to the Adirondacks, offering a unique combination of suburban convenience and outdoor lifestyle. The Lake George proximity, quality schools, and growing remote work population drive consistent demand.",
  lifeInCards: {
    fitness: [
      "Glens Falls YMCA – Full-service fitness",
      "Planet Fitness – Budget-friendly option"
    ],
    cafes: [
      "Rock Hill Bakehouse – Local favorite",
      "Mean Beans – Coffee and community"
    ],
    restaurants: [
      "Silo – Upscale casual dining",
      "The Queensbury Hotel Restaurant – Historic dining"
    ],
    parks: [
      "Lake George – Beach and recreation",
      "Crandall Park – Trails and green space"
    ],
    commuting: [
      "45–50 minutes to Albany",
      "5 minutes to Lake George Village",
      "Access to I-87 Northway"
    ]
  },
  whoFitFor: [
    "Families seeking outdoor lifestyle",
    "Remote workers valuing quality of life",
    "Second-home buyers near Lake George",
    "Retirees seeking Adirondack access"
  ],
  localQuestions: [
    {
      question: "What are homes really selling for here?",
      answer: "Most homes in Queensbury sell between $300,000 and $550,000, with the median around $455,000. Lake-proximity and view properties command significant premiums."
    },
    {
      question: "How competitive is this market?",
      answer: "Queensbury is competitive, especially for properties near Lake George. Homes move quickly with an average of 6 days on market."
    },
    {
      question: "What draws buyers here?",
      answer: "The combination of excellent schools, Adirondack access, and outdoor lifestyle attracts families and remote workers seeking quality of life."
    },
    {
      question: "How does location within Queensbury matter?",
      answer: "Proximity to Lake George, school zones, and highway access all affect pricing. Ridge Road and Bay Road corridors offer different feels and price points."
    }
  ],
  localSnapshot: {
    landmarks: [
      "Lake George – Adirondack recreation destination",
      "Aviation Mall – Shopping and retail",
      "Great Escape – Family amusement",
      "Glen Lake – Local swimming and recreation"
    ],
    schoolDistrictNames: [
      "Queensbury Union Free School District"
    ],
    feel: "Suburban gateway to the Adirondacks. Family-friendly with outdoor focus. Strong schools and safe neighborhoods. Growing remote work community."
  },
};

export const voorheesvilleData: TownData = {
  name: "Voorheesville",
  slug: "voorheesville",
  schoolDistrict: "Voorheesville Central School District",
  description: "Homes, market activity, and local insights for Voorheesville, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Voorheesville&pak=city%3Ag30_dre6tsd2&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Voorheesville&pak=city%3Ag30_dre6tsd2&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
  },
  // MLS Data Source: GlobalMLS InfoSparks - December 2025
  mlsDataSource: "GlobalMLS InfoSparks",
  mlsDataDate: "December 2025",
  weeklyIntel: {
    newListings: 1,
    homesSold: 4,
    medianListPrice: "$352,500",
    avgDaysOnMarket: 4,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Seller's Market",
  },
  marketActivityLastChecked: "Jan 1, 2026",
  marketSnapshot: [
    { label: "Active Listings", value: "3", change: "very low inventory" },
    { label: "Median Sale Price", value: "$352,500", change: "Dec 2025" },
    { label: "Days on Market", value: "4", change: "extremely fast" },
    { label: "Pending Sales", value: "0", change: "none pending" },
  ],
  recentlySold: [
    { address: "45 Maple Ave", price: "$315,000", beds: 3, baths: 1.5, date: "Dec 2025" },
    { address: "112 Altamont Rd", price: "$398,000", beds: 4, baths: 2, date: "Nov 2025" },
  ],
  localInsights: {
    schoolOverview: "Voorheesville Central School District offers a small-town educational experience with strong academics. Low student-to-teacher ratios and engaged community support.",
    propertyTaxes: "Property taxes range from $6,000 to $12,000 annually. More affordable than neighboring Delmar while still offering quality education.",
    homeStyles: "Charming village homes, historic properties, and rural estates. Mix of Victorian-era homes in the village and newer construction on larger lots. Appeals to buyers seeking character and space.",
    buyerDemand: "Growing interest from buyers priced out of Delmar seeking quality schools with lower entry points. Rural feel attracts those seeking more land and privacy.",
    renovationDemand: "Historic village homes often need updates. Buyers appreciate original character but expect modern kitchens and baths. Good opportunity for value-add purchases.",
  },
  livingIn: "A small village with a tight-knit community feel. Main Street anchors the downtown with a few local shops. Thacher State Park is nearby for hiking and views. Families value the small school district and quiet, rural atmosphere.",
  marketSnapshotParagraph: "Voorheesville is a micro-market with extremely limited inventory. The small, well-regarded school district and village character attract families seeking an alternative to larger suburban markets. When homes do list, they move quickly.",
  lifeInCards: {
    fitness: [
      "Helderberg Fitness – Local gym option",
      "Thacher State Park – Outdoor fitness and trails"
    ],
    cafes: [
      "Smith's Tavern – Local gathering spot",
      "Indian Ladder Farms – Café and farm store"
    ],
    restaurants: [
      "Smith's Tavern – Village pub and dining",
      "Indian Ladder Farms Cidery – Farm dining experience"
    ],
    parks: [
      "Thacher State Park – Escarpment views and hiking",
      "John Boyd Thacher State Park trails – Extensive trail system"
    ],
    commuting: [
      "20 minutes to Albany",
      "15 minutes to Delmar",
      "Access to Route 85 and 85A"
    ]
  },
  whoFitFor: [
    "Families seeking small-town schools",
    "Buyers priced out of Delmar",
    "Those who value rural character",
    "Outdoor enthusiasts near Helderbergs"
  ],
  localQuestions: [
    {
      question: "What are homes really selling for here?",
      answer: "Most homes in Voorheesville sell between $280,000 and $420,000, with the median around $352,500. The limited inventory means accurate pricing is essential."
    },
    {
      question: "How competitive is this market?",
      answer: "Extremely competitive due to tiny inventory. Homes sell in an average of 4 days. Buyers must be prepared to act immediately."
    },
    {
      question: "How does Voorheesville compare to Delmar?",
      answer: "Voorheesville offers similar school quality at lower price points, with a more rural feel. Trade-off is less walkability and fewer amenities."
    },
    {
      question: "What's the community like?",
      answer: "Tight-knit village atmosphere where neighbors know each other. Small school district creates strong community connections."
    }
  ],
  localSnapshot: {
    landmarks: [
      "Thacher State Park – Helderberg escarpment views",
      "Indian Ladder Farms – Farm, cidery, and events",
      "Village center – Small-town Main Street",
      "Helderberg Escarpment – Dramatic natural feature"
    ],
    schoolDistrictNames: [
      "Voorheesville Central School District"
    ],
    feel: "Small village with rural character. Tight-knit community with excellent schools. Gateway to Helderberg hiking. Quiet alternative to larger suburban markets."
  },
};

export const albanyData: TownData = {
  name: "Albany",
  slug: "albany",
  schoolDistrict: "Albany City School District",
  description: "Homes, market activity, and local insights for Albany, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DAlbany&pak=city%3Ag30_drbpt5d2&sortby=listings.price+ASC&rtype=map&leadid=948",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DAlbany&pak=city%3Ag30_drbpt5d2&sortby=listings.price+ASC&rtype=map&leadid=948",
  },
  // MLS Data Source: GlobalMLS InfoSparks - December 2025
  mlsDataSource: "GlobalMLS InfoSparks",
  mlsDataDate: "December 2025",
  weeklyIntel: {
    newListings: 30,
    homesSold: 62,
    medianListPrice: "$290,000",
    avgDaysOnMarket: 12,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Seller's Market",
  },
  marketActivityLastChecked: "Jan 1, 2026",
  marketSnapshot: [
    { label: "Active Listings", value: "61", change: "available homes" },
    { label: "Median Sale Price", value: "$290,000", change: "Dec 2025" },
    { label: "Days on Market", value: "12", change: "fast" },
    { label: "Pending Sales", value: "37", change: "under contract" },
  ],
  recentlySold: [
    { address: "156 State St", price: "$325,000", beds: 3, baths: 2, date: "Dec 2025" },
    { address: "78 Madison Ave", price: "$285,000", beds: 4, baths: 1.5, date: "Nov 2025" },
    { address: "234 Lark St", price: "$345,000", beds: 3, baths: 2, date: "Nov 2025" },
    { address: "45 Washington Ave", price: "$268,000", beds: 2, baths: 1, date: "Oct 2025" },
  ],
  localInsights: {
    schoolOverview: "Albany City School District serves a diverse student population. Growing STEM programs and partnerships with local colleges. Magnet school options available.",
    propertyTaxes: "Property taxes typically range from $5,000 to $12,000 annually. More affordable than suburban alternatives while offering urban amenities.",
    homeStyles: "Historic rowhouses, Victorians, and multi-family properties. Pine Hills and Center Square offer walkable neighborhoods. Growing renovation activity throughout.",
    buyerDemand: "Strong demand from investors and first-time buyers. State employee relocations drive consistent interest. Downtown revitalization spurring renewed investment.",
    renovationDemand: "Excellent renovation opportunities. Historic properties with good bones at accessible prices. Strong rental demand supports investment purchases.",
  },
  livingIn: "New York's capital city with walkable neighborhoods, diverse dining, and cultural amenities. Lark Street, Washington Park, and the Empire State Plaza anchor urban life. Major employers, hospitals, and universities are all within reach.",
  marketSnapshotParagraph: "Albany offers the Capital District's most diverse housing market, from historic rowhouses to multi-family investments. State employment, hospital systems, and universities drive consistent demand across a wide range of price points and neighborhoods.",
  lifeInCards: {
    fitness: [
      "Albany JCC – Full-service fitness center",
      "Best Fitness – Multiple locations"
    ],
    cafes: [
      "Stacks Espresso – Popular coffee spot",
      "Daily Grind – Lark Street café"
    ],
    restaurants: [
      "New World Bistro – Farm-to-table dining",
      "Café Capriccio – Italian institution"
    ],
    parks: [
      "Washington Park – City's signature green space",
      "Corning Preserve – Riverfront trails"
    ],
    commuting: [
      "Central location for Capital District",
      "Access to I-787, I-87, and I-90",
      "10 minutes to Albany Airport"
    ]
  },
  whoFitFor: [
    "Investors seeking rental income",
    "First-time buyers seeking affordability",
    "State employees and hospital workers",
    "Urban buyers valuing walkability"
  ],
  localQuestions: [
    {
      question: "What are homes really selling for here?",
      answer: "Most homes in Albany sell between $180,000 and $380,000, with the median around $290,000. Prices vary significantly by neighborhood."
    },
    {
      question: "How competitive is this market?",
      answer: "Albany is less competitive than suburban markets, offering more negotiating room. Well-priced properties in desirable neighborhoods still move quickly."
    },
    {
      question: "Which neighborhoods should I know about?",
      answer: "Pine Hills, Center Square, and Delaware Avenue are popular for walkability. Pine Bush and New Scotland offer quieter suburban feel while remaining in city limits."
    },
    {
      question: "What surprises buyers?",
      answer: "Buyers are surprised by neighborhood diversity and the quality of historic housing stock. The urban amenities rival much larger cities."
    }
  ],
  localSnapshot: {
    landmarks: [
      "Empire State Plaza – Government center and cultural venues",
      "Washington Park – Historic green space and events",
      "Lark Street – Arts, dining, and nightlife",
      "State Capitol – Historic landmark"
    ],
    schoolDistrictNames: [
      "Albany City School District"
    ],
    feel: "Urban capital city with diverse neighborhoods. Historic architecture and walkable districts. Strong employment base and cultural amenities."
  },
};

export const guilderlandData: TownData = {
  name: "Guilderland",
  slug: "guilderland",
  schoolDistrict: "Guilderland Central School District",
  description: "Homes, market activity, and local insights for Guilderland, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Guilderland&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DGuilderland&pak=city%3Ag30_drc9v1sm&sortby=listings.price+ASC&rtype=map&leadid=948",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Guilderland&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DGuilderland&pak=city%3Ag30_drc9v1sm&sortby=listings.price+ASC&rtype=map&leadid=948",
  },
  // MLS Data Source: GlobalMLS InfoSparks - December 2025
  mlsDataSource: "GlobalMLS InfoSparks",
  mlsDataDate: "December 2025",
  weeklyIntel: {
    newListings: 5,
    homesSold: 23,
    medianListPrice: "$360,000",
    avgDaysOnMarket: 18,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Seller's Market",
  },
  marketActivityLastChecked: "Jan 1, 2026",
  marketSnapshot: [
    { label: "Active Listings", value: "17", change: "available homes" },
    { label: "Median Sale Price", value: "$360,000", change: "Dec 2025" },
    { label: "Days on Market", value: "18", change: "moderate" },
    { label: "Pending Sales", value: "11", change: "under contract" },
  ],
  recentlySold: [],
  localInsights: {
    schoolOverview: "Guilderland Central School District is highly regarded with strong academics, athletics, and arts programs. Consistently ranked among the top districts in the Capital Region.",
    propertyTaxes: "Property taxes typically range from $7,000 to $14,000 annually depending on home value. The strong school district justifies competitive tax rates.",
    homeStyles: "Mix of colonials, ranches, and newer construction. Established neighborhoods like Westmere and newer developments near Crossgates. Generous lot sizes with mature landscaping.",
    buyerDemand: "Strong family demand driven by excellent schools. Convenient highway access to Albany. Retail and commercial growth around Crossgates Mall area.",
    renovationDemand: "Moderate renovation activity. Move-in ready homes preferred, but older properties in prime locations offer good value for updates.",
  },
  livingIn: "A suburban town with strong schools and convenient retail. Crossgates Mall and surrounding shopping serve daily needs. Guilderland Center offers a quieter village feel. Easy access to I-90 and Route 20 for commutes.",
  marketSnapshotParagraph: "Guilderland balances suburban convenience with excellent schools, making it a consistent draw for families. The town offers multiple distinct neighborhoods, from busy commercial corridors near Crossgates to quiet residential areas in Guilderland Center.",
  lifeInCards: {
    fitness: [
      "Best Fitness Crossgates – Modern gym facility",
      "Guilderland YMCA – Community fitness"
    ],
    cafes: [
      "Starbucks – Multiple locations near Crossgates",
      "Uncommon Grounds – Local café option"
    ],
    restaurants: [
      "Delmonico's Italian Steakhouse – Upscale dining",
      "Ralph's Tavern – Local gathering place"
    ],
    parks: [
      "Tawasentha Park – Trails and recreation",
      "Pine Bush Preserve – Unique ecosystem and hiking"
    ],
    commuting: [
      "15 minutes to downtown Albany",
      "Easy access to I-90 and Route 20",
      "20 minutes to Albany Airport"
    ]
  },
  whoFitFor: [
    "Families prioritizing strong schools",
    "Buyers seeking retail convenience",
    "Commuters to Albany or Schenectady",
    "Those who want suburban feel with amenities"
  ],
  localQuestions: [
    {
      question: "What are homes really selling for here?",
      answer: "Most homes in Guilderland sell between $280,000 and $450,000, with the median around $360,000. Location within the town affects pricing significantly."
    },
    {
      question: "How competitive is this market?",
      answer: "Guilderland is competitive due to school district demand. Properties typically sell within 18 days, slightly slower than neighboring Bethlehem."
    },
    {
      question: "How does Guilderland compare to Delmar?",
      answer: "Guilderland offers similar school quality at slightly lower price points. More retail convenience near Crossgates, less walkable village character."
    },
    {
      question: "What should I know about neighborhoods?",
      answer: "Guilderland Center offers village charm. Westmere provides suburban convenience. McKownville sits closer to Albany. Each area has distinct character."
    }
  ],
  localSnapshot: {
    landmarks: [
      "Crossgates Mall – Regional shopping destination",
      "Pine Bush Preserve – Unique inland pine barrens",
      "Tawasentha Park – Community recreation",
      "Guilderland Center – Village core"
    ],
    schoolDistrictNames: [
      "Guilderland Central School District"
    ],
    feel: "Suburban with excellent schools and retail convenience. Multiple distinct neighborhoods. Balance of quiet residential and commercial corridors."
  },
};

export const mechanicvilleData: TownData = {
  name: "Mechanicville",
  slug: "mechanicville",
  schoolDistrict: "Mechanicville City School District",
  description: "Homes, market activity, and local insights for Mechanicville, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Mechanicville&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DMechanicville&pak=city%3Ag30_drdqsf8b&sortby=listings.price+ASC&rtype=map&leadid=948",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Mechanicville&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DMechanicville&pak=city%3Ag30_drdqsf8b&sortby=listings.price+ASC&rtype=map&leadid=948",
  },
  // MLS Data Source: GlobalMLS InfoSparks - December 2025
  mlsDataSource: "GlobalMLS InfoSparks",
  mlsDataDate: "December 2025",
  weeklyIntel: {
    newListings: 3,
    homesSold: 5,
    medianListPrice: "$288,750",
    avgDaysOnMarket: 26,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Balanced Market",
  },
  marketActivityLastChecked: "Jan 1, 2026",
  marketSnapshot: [
    { label: "Active Listings", value: "8", change: "available homes" },
    { label: "Median Sale Price", value: "$288,750", change: "Dec 2025" },
    { label: "Days on Market", value: "26", change: "moderate" },
    { label: "Pending Sales", value: "1", change: "under contract" },
  ],
  recentlySold: [],
  localInsights: {
    schoolOverview: "Mechanicville City School District is a small, community-focused district. Strong sense of community with personalized attention for students.",
    propertyTaxes: "Property taxes are among the most affordable in the region, typically ranging from $3,000 to $7,000 annually. Excellent value for budget-conscious buyers.",
    homeStyles: "Classic upstate New York architecture with many historic homes. Multi-family properties and single-family homes on compact lots. Walkable downtown area.",
    buyerDemand: "Growing interest from first-time buyers and investors seeking affordability. Proximity to Saratoga Springs and easy commute to Albany make it attractive.",
    renovationDemand: "Strong renovation opportunity. Historic homes with good bones available at accessible prices. Growing investor interest in the area.",
  },
  livingIn: "A compact city with an affordable cost of living and strong community pride. Downtown offers local shops and a walkable Main Street. Close to Saratoga and the Northway for commutes. Known for its tight-knit neighborhoods.",
  marketSnapshotParagraph: "Mechanicville is one of the Capital District's most affordable options, offering a compact walkable city with proximity to both Saratoga Springs and the Northway. Growing interest from first-time buyers and investors is driving gradual appreciation.",
  lifeInCards: {
    fitness: [
      "Local gyms – Community fitness options",
      "Hudson River trails – Outdoor recreation"
    ],
    cafes: [
      "Main Street cafés – Local coffee options",
      "Downtown bakeries – Community gathering"
    ],
    restaurants: [
      "Main Street restaurants – Local dining",
      "Neighborhood pubs – Casual gathering"
    ],
    parks: [
      "Hudson River access – Recreation",
      "City parks – Community green space"
    ],
    commuting: [
      "15 minutes to Saratoga Springs",
      "25 minutes to Albany",
      "Direct Northway access"
    ]
  },
  whoFitFor: [
    "First-time buyers seeking affordability",
    "Investors looking for cash flow",
    "Saratoga commuters on a budget",
    "Those who value small-city community"
  ],
  localQuestions: [
    {
      question: "What are homes really selling for here?",
      answer: "Most homes in Mechanicville sell between $180,000 and $350,000, with the median around $289,000. Multi-family properties offer strong investment potential."
    },
    {
      question: "How competitive is this market?",
      answer: "Mechanicville is less competitive than surrounding markets, with homes averaging 26 days on market. Buyers have more negotiating room."
    },
    {
      question: "Why choose Mechanicville over nearby towns?",
      answer: "Mechanicville offers significantly lower entry points with easy Saratoga and Northway access. Trade-off is smaller city amenities versus suburban options."
    },
    {
      question: "What's the community like?",
      answer: "Tight-knit city with strong community pride. Walkable downtown and neighborhood feel. Growing interest from younger buyers."
    }
  ],
  localSnapshot: {
    landmarks: [
      "Main Street – Downtown walkable core",
      "Hudson River – Waterfront access",
      "City Hall – Community anchor",
      "Local parks – Neighborhood green space"
    ],
    schoolDistrictNames: [
      "Mechanicville City School District"
    ],
    feel: "Compact city with affordable homes. Strong community pride and walkable downtown. Gateway to Saratoga at budget-friendly prices."
  },
};

// Export all town data for easy access
export const allTownData = {
  albany: albanyData,
  amsterdam: amsterdamData,
  "clifton-park": cliftonParkData,
  delmar: delmarData,
  guilderland: guilderlandData,
  mechanicville: mechanicvilleData,
  niskayuna: niskayunaData,
  queensbury: queensburyData,
  "saratoga-springs": saratogaData,
  schenectady: schenectadyData,
  troy: troyData,
  voorheesville: voorheesvilleData,
};