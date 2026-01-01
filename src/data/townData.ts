import { TownData } from "@/components/TownPageTemplate";

export const delmarData: TownData = {
  name: "Delmar",
  slug: "delmar",
  schoolDistrict: "Bethlehem Central School District",
  description: "Homes, market activity, and local insights — all built specifically for Delmar, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Delmar&pak=city%3Ag30_drd64p0&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Bethlehem+Central+School+District&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=school_district%3AWvn_qHEB_MdPD7bTa6co&sortby=listings.price+ASC&rtype=map&leadid=948",
    justListed: "https://scottalvarez.remax.com/index.php?advanced=1&display=Bethlehem+Central+School+District&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&options%5B%5D=new&keywords=&pak=school_district%3AWvn_qHEB_MdPD7bTa6co&sortby=listings.price+ASC&rtype=map&leadid=948",
  },
  weeklyIntel: {
    newListings: 7,
    homesSold: 7,
    medianListPrice: "$542,450",
    avgDaysOnMarket: 7,
    priceChange: "+14.2%",
    priceDirection: "up",
    marketTrendLabel: "Seller's Market",
  },
  // RPR Market Activity PDF
  marketActivityPdfUrl: "https://www.narrpr.com/reports-v2/delmar-market-activity/pdf",
  marketActivityLastChecked: "Dec 31, 2025",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "24", change: "active market" },
    { label: "Median Sale Price", value: "$515,000", change: "+7.2% YoY" },
    { label: "Days on Market", value: "7", change: "very fast" },
    { label: "Inventory Level", value: "Low (0.97 months)", change: "seller's market" },
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
  weeklyIntel: {
    newListings: 10,
    homesSold: 10,
    medianListPrice: "$302,450",
    avgDaysOnMarket: 12,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Seller's Market",
  },
  // RPR Market Activity PDF
  marketActivityPdfUrl: "https://www.narrpr.com/reports-v2/troy-market-activity/pdf",
  marketActivityLastChecked: "Dec 31, 2025",
  marketSnapshot: [
    { label: "Recent Sales (30 days)", value: "10", change: "active market" },
    { label: "Median Sale Price", value: "$249,500", change: "steady" },
    { label: "Days on Market", value: "12", change: "fast" },
    { label: "Inventory Level", value: "1.71 months", change: "seller's market" },
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
  weeklyIntel: {
    newListings: 14,
    homesSold: 2,
    medianListPrice: "$480,000",
    avgDaysOnMarket: 22,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Low Inventory",
  },
  // RPR Market Activity PDF
  marketActivityPdfUrl: "https://www.narrpr.com/reports-v2/niskayuna-market-activity/pdf",
  marketActivityLastChecked: "Dec 31, 2025",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "2", change: "very low" },
    { label: "Median Sale Price", value: "$480,000", change: "stable" },
    { label: "Days on Market", value: "22", change: "stable" },
    { label: "Inventory Level", value: "Very Low", change: "competitive" },
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
};

export const cliftonParkData: TownData = {
  name: "Clifton Park",
  slug: "clifton-park",
  schoolDistrict: "Shenendehowa Central School District",
  description: "Homes, market activity, and local insights for Clifton Park, NY.",
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
    { label: "Active Listings", value: "39", change: "available homes" },
    { label: "Median Sale Price", value: "$478,500", change: "Dec 2025" },
    { label: "Days on Market", value: "10", change: "fast" },
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
  weeklyIntel: {
    newListings: 10,
    homesSold: 10,
    medianListPrice: "$264,500",
    avgDaysOnMarket: 6,
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Seller's Market",
  },
  // RPR Market Activity PDF
  marketActivityPdfUrl: "https://www.narrpr.com/reports-v2/schenectady-market-activity/pdf",
  marketActivityLastChecked: "Dec 31, 2025",
  marketSnapshot: [
    { label: "Recent Sales (30 days)", value: "10", change: "active market" },
    { label: "Median Sale Price", value: "$251,620", change: "steady" },
    { label: "Days on Market", value: "6", change: "very fast" },
    { label: "Inventory Level", value: "1.24 months", change: "seller's market" },
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
};

export const amsterdamData: TownData = {
  name: "Amsterdam",
  slug: "amsterdam",
  schoolDistrict: "Amsterdam City School District",
  description: "Homes, market activity, and local insights for Amsterdam, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Amsterdam+City+SD&pak=scho%3Ag30_5qr8d4z&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Amsterdam+City+SD&pak=scho%3Ag30_5qr8d4z&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
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
  weeklyIntel: {
    newListings: 0,
    homesSold: 5,
    medianListPrice: "$325,000",
    priceChange: "",
    priceDirection: "stable",
    marketTrendLabel: "Active Market",
  },
  // RPR Market Activity PDF
  marketActivityPdfUrl: "https://www.narrpr.com/reports-v2/c97b7851-e5bf-457c-8cb6-2203c010c8f5/pdf",
  marketActivityLastChecked: "Dec 31, 2025",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "8", change: "limited inventory" },
    { label: "Median Sale Price", value: "$325,000", change: "+5.1% YoY" },
    { label: "Days on Market", value: "28", change: "steady" },
    { label: "Inventory Level", value: "Very Low", change: "high demand" },
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
};

export const albanyData: TownData = {
  name: "Albany",
  slug: "albany",
  schoolDistrict: "Albany City School District",
  description: "Homes, market activity, and local insights for Albany, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&pak=city%3Ag30_drbpt5d2&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&pak=city%3Ag30_drbpt5d2&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
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
};

export const guilderlandData: TownData = {
  name: "Guilderland",
  slug: "guilderland",
  schoolDistrict: "Guilderland Central School District",
  description: "Homes, market activity, and local insights for Guilderland, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Guilderland&pak=city%3Ag30_drc9v1sm&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Guilderland&pak=city%3Ag30_drc9v1sm&statuses%5B%5D=0&statuses%5B%5D=57&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
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
};

export const mechanicvilleData: TownData = {
  name: "Mechanicville",
  slug: "mechanicville",
  schoolDistrict: "Mechanicville City School District",
  description: "Homes, market activity, and local insights for Mechanicville, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Mechanicville&pak=city%3Ag30_drdqsf8b&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
  dataSourceLinks: {
    activeListings: "https://scottalvarez.remax.com/index.php?advanced=1&display=Mechanicville&pak=city%3Ag30_drdqsf8b&statuses%5B%5D=0&statuses%5B%5D=57&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
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