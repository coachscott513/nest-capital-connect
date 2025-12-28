import { TownData } from "@/components/TownPageTemplate";

export const delmarData: TownData = {
  name: "Delmar",
  slug: "delmar",
  schoolDistrict: "Bethlehem Central School District",
  description: "Homes, market activity, and local insights — all built specifically for Delmar, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Delmar&pak=city%3Ag30_drd64p0&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "24", change: "active market" },
    { label: "Median Sale Price", value: "$485,000", change: "+4.2% YoY" },
    { label: "Days on Market", value: "16", change: "-3 days" },
    { label: "Inventory Level", value: "Low", change: "seller's market" },
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
  featuredProperty: {
    image: "/assets/22-lavery-drive-front.jpg",
    address: "22 Lavery Drive, Delmar",
    link: "/listings/22-lavery-drive-delmar-ny",
  },
};

export const troyData: TownData = {
  name: "Troy",
  slug: "troy",
  schoolDistrict: "Troy City School District",
  description: "Homes, market activity, and local insights for Troy, NY.",
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Troy&pak=city%3Ag30_drj4a6u&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "38", change: "very active" },
    { label: "Median Sale Price", value: "$195,000", change: "+6.8% YoY" },
    { label: "Days on Market", value: "24", change: "-4 days" },
    { label: "Inventory Level", value: "Moderate", change: "balanced" },
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
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "18", change: "steady market" },
    { label: "Median Sale Price", value: "$385,000", change: "+3.8% YoY" },
    { label: "Days on Market", value: "22", change: "stable" },
    { label: "Inventory Level", value: "Low", change: "competitive" },
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
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Saratoga+Springs+CSD&pak=scho%3Ag30_5qr8dax&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "52", change: "very active" },
    { label: "Median Sale Price", value: "$525,000", change: "+5.2% YoY" },
    { label: "Days on Market", value: "18", change: "-6 days" },
    { label: "Inventory Level", value: "Low", change: "seller's market" },
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
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Shenendehowa+CSD&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=4&types%5B%5D=12&types%5B%5D=15&types%5B%5D=6&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DClifton+Park&pak=scho%3Ag30_5qr8dj6&sortby=listings.price+ASC&rtype=map",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "45", change: "very active" },
    { label: "Median Sale Price", value: "$425,000", change: "+4.5% YoY" },
    { label: "Days on Market", value: "15", change: "-5 days" },
    { label: "Inventory Level", value: "Low", change: "competitive" },
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
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Schenectady+City+SD&pak=scho%3Ag30_5qr8dhr&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "42", change: "active market" },
    { label: "Median Sale Price", value: "$165,000", change: "+7.5% YoY" },
    { label: "Days on Market", value: "28", change: "steady" },
    { label: "Inventory Level", value: "Moderate", change: "balanced" },
  ],
  recentlySold: [
    { address: "1245 State St", price: "$185,000", beds: 3, baths: 2, date: "Dec 2025" },
    { address: "567 Union St", price: "$155,000", beds: 4, baths: 1.5, date: "Nov 2025" },
    { address: "89 Nott Terrace", price: "$198,000", beds: 3, baths: 2, date: "Nov 2025" },
    { address: "234 Eastern Ave", price: "$142,000", beds: 2, baths: 1, date: "Oct 2025" },
  ],
  localInsights: {
    schoolOverview: "Schenectady City School District offers diverse educational opportunities. Growing STEM programs and partnerships with Union College and local employers.",
    propertyTaxes: "Property taxes typically range from $3,500 to $8,000 annually. Very affordable compared to suburban alternatives.",
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
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "22", change: "active market" },
    { label: "Median Sale Price", value: "$145,000", change: "+8.2% YoY" },
    { label: "Days on Market", value: "35", change: "steady" },
    { label: "Inventory Level", value: "Moderate", change: "balanced" },
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
  remaxSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Queensbury+UFSD&pak=scho%3Ag30_5qr8ddx&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "28", change: "active market" },
    { label: "Median Sale Price", value: "$345,000", change: "+4.8% YoY" },
    { label: "Days on Market", value: "22", change: "-3 days" },
    { label: "Inventory Level", value: "Low", change: "competitive" },
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

// Export all town data for easy access
export const allTownData = {
  delmar: delmarData,
  troy: troyData,
  niskayuna: niskayunaData,
  "saratoga-springs": saratogaData,
  "clifton-park": cliftonParkData,
  schenectady: schenectadyData,
  amsterdam: amsterdamData,
  queensbury: queensburyData,
  voorheesville: voorheesvilleData,
};