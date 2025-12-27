import { TownData } from "@/components/TownPageTemplate";

export const delmarData: TownData = {
  name: "Delmar",
  slug: "delmar",
  schoolDistrict: "Bethlehem Central School District",
  description: "Homes, market activity, and local insights — all built specifically for Delmar, NY.",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "24", change: "active market" },
    { label: "Median Sale Price", value: "$475,000", change: "+4.2% YoY" },
    { label: "Days on Market", value: "18", change: "-3 days" },
    { label: "Inventory Level", value: "Low", change: "seller's market" },
  ],
  recentlySold: [
    { address: "142 Elsmere Ave", price: "$425,000", beds: 3, baths: 2, date: "Dec 2024" },
    { address: "38 Fernbank Ave", price: "$512,000", beds: 4, baths: 2.5, date: "Dec 2024" },
    { address: "19 Greenleaf Dr", price: "$389,000", beds: 3, baths: 1.5, date: "Nov 2024" },
    { address: "85 Roweland Ave", price: "$445,000", beds: 4, baths: 2, date: "Nov 2024" },
    { address: "211 Murray Ave", price: "$525,000", beds: 4, baths: 2.5, date: "Nov 2024" },
  ],
  localInsights: {
    schoolOverview: "Bethlehem Central School District consistently ranks among the top districts in the Capital Region. High test scores, strong extracurriculars, and excellent college placement rates make this a top draw for families.",
    propertyTaxes: "Delmar property taxes typically range from $8,000 to $18,000 annually depending on home value and lot size. The Bethlehem Central school tax makes up the majority of the bill.",
    homeStyles: "Predominantly colonials, ranches, and split-levels from the 1950s-1980s. Lot sizes average 0.25-0.5 acres with established trees and mature landscaping. Newer construction in developments like Haswell Farms.",
    buyerDemand: "Strong demand from families relocating within the Capital Region and NYC transplants seeking top schools. Inventory remains tight, with well-priced homes selling quickly.",
    renovationDemand: "Move-in-ready homes command premium prices. However, there's growing interest in renovations as buyers accept older homes to get into the district. Kitchen and bath updates offer the best ROI.",
  },
  featuredProperty: {
    image: "/src/assets/22-lavery-drive-front.jpg",
    address: "22 Lavery Drive, Delmar",
    link: "/listings/22-lavery-drive-delmar-ny",
  },
};

export const niskayunaData: TownData = {
  name: "Niskayuna",
  slug: "niskayuna",
  schoolDistrict: "Niskayuna Central School District",
  description: "Homes, market activity, and local insights for Niskayuna, NY.",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "18", change: "steady market" },
    { label: "Median Sale Price", value: "$385,000", change: "+3.8% YoY" },
    { label: "Days on Market", value: "22", change: "stable" },
    { label: "Inventory Level", value: "Low", change: "competitive" },
  ],
  recentlySold: [
    { address: "2145 Nott St", price: "$395,000", beds: 4, baths: 2.5, date: "Dec 2024" },
    { address: "1876 Balltown Rd", price: "$342,000", beds: 3, baths: 2, date: "Dec 2024" },
    { address: "456 Van Antwerp Rd", price: "$428,000", beds: 4, baths: 2.5, date: "Nov 2024" },
  ],
  localInsights: {
    schoolOverview: "Niskayuna Central School District is consistently ranked among the best in New York State. Known for strong STEM programs, competitive academics, and excellent college preparation.",
    propertyTaxes: "Property taxes typically range from $9,000 to $16,000 annually. The excellent school district is a primary driver of tax rates but also supports strong home values.",
    homeStyles: "Mix of mid-century colonials, ranches, and newer construction. Many homes feature generous lot sizes with mature landscaping. Popular neighborhoods include Rosendale and Van Antwerp areas.",
    buyerDemand: "High demand from families seeking top-rated schools. GE and local tech employers drive consistent buyer interest. Homes in the best school zones sell quickly.",
    renovationDemand: "Strong preference for updated kitchens and baths. Mid-century homes with original features often need updates, but the strong school district ensures good resale value after renovations.",
  },
};

export const voorheesvilleData: TownData = {
  name: "Voorheesville",
  slug: "voorheesville",
  schoolDistrict: "Voorheesville Central School District",
  description: "Homes, market activity, and local insights for Voorheesville, NY.",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "8", change: "limited inventory" },
    { label: "Median Sale Price", value: "$325,000", change: "+5.1% YoY" },
    { label: "Days on Market", value: "28", change: "steady" },
    { label: "Inventory Level", value: "Very Low", change: "high demand" },
  ],
  recentlySold: [
    { address: "45 Maple Ave", price: "$298,000", beds: 3, baths: 1.5, date: "Dec 2024" },
    { address: "112 Altamont Rd", price: "$385,000", beds: 4, baths: 2, date: "Nov 2024" },
  ],
  localInsights: {
    schoolOverview: "Voorheesville Central School District offers a small-town educational experience with strong academics. Low student-to-teacher ratios and engaged community support.",
    propertyTaxes: "Property taxes range from $6,000 to $12,000 annually. More affordable than neighboring Delmar while still offering quality education.",
    homeStyles: "Charming village homes, historic properties, and rural estates. Mix of Victorian-era homes in the village and newer construction on larger lots. Appeals to buyers seeking character and space.",
    buyerDemand: "Growing interest from buyers priced out of Delmar seeking quality schools with lower entry points. Rural feel attracts those seeking more land and privacy.",
    renovationDemand: "Historic village homes often need updates. Buyers appreciate original character but expect modern kitchens and baths. Good opportunity for value-add purchases.",
  },
};

export const cliftonParkData: TownData = {
  name: "Clifton Park",
  slug: "clifton-park",
  schoolDistrict: "Shenendehowa Central School District",
  description: "Homes, market activity, and local insights for Clifton Park, NY.",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "45", change: "very active" },
    { label: "Median Sale Price", value: "$425,000", change: "+4.5% YoY" },
    { label: "Days on Market", value: "15", change: "-5 days" },
    { label: "Inventory Level", value: "Low", change: "competitive" },
  ],
  recentlySold: [
    { address: "28 Huntwood Dr", price: "$485,000", beds: 4, baths: 2.5, date: "Dec 2024" },
    { address: "156 Moe Rd", price: "$395,000", beds: 3, baths: 2, date: "Dec 2024" },
    { address: "892 Route 146", price: "$525,000", beds: 5, baths: 3, date: "Nov 2024" },
    { address: "34 Longwood Dr", price: "$445,000", beds: 4, baths: 2.5, date: "Nov 2024" },
  ],
  localInsights: {
    schoolOverview: "Shenendehowa Central School District is one of the largest and highest-performing districts in the region. Known for athletics, academics, and extensive extracurricular programs.",
    propertyTaxes: "Property taxes typically range from $8,000 to $15,000 annually. Competitive rates considering the quality of schools and municipal services.",
    homeStyles: "Predominantly newer construction from 1980s onward. Large subdivisions with colonials, contemporaries, and townhomes. Exit 8 and Exit 9 areas offer different neighborhood feels.",
    buyerDemand: "Extremely high demand from families and commuters. Excellent highway access to Albany and Saratoga. Tech corridor employers drive consistent buyer interest.",
    renovationDemand: "Less renovation opportunity as housing stock is newer. Buyers prefer move-in ready. Updates to 1980s-90s homes (kitchens, baths, flooring) can add significant value.",
  },
};

export const amsterdamData: TownData = {
  name: "Amsterdam",
  slug: "amsterdam",
  schoolDistrict: "Amsterdam City School District",
  description: "Homes, market activity, and local insights for Amsterdam, NY.",
  marketSnapshot: [
    { label: "Recent Sales (30-90 days)", value: "22", change: "active market" },
    { label: "Median Sale Price", value: "$145,000", change: "+8.2% YoY" },
    { label: "Days on Market", value: "35", change: "steady" },
    { label: "Inventory Level", value: "Moderate", change: "balanced" },
  ],
  recentlySold: [
    { address: "85 Division St", price: "$125,000", beds: 3, baths: 1, date: "Dec 2024" },
    { address: "234 Market St", price: "$168,000", beds: 4, baths: 2, date: "Dec 2024" },
    { address: "67 Church St", price: "$142,000", beds: 3, baths: 1.5, date: "Nov 2024" },
  ],
  localInsights: {
    schoolOverview: "Amsterdam City School District serves a diverse community. Recent investments in facilities and programs. Growing opportunities for student success.",
    propertyTaxes: "Property taxes are among the most affordable in the region, typically $3,000 to $6,000 annually. Excellent value for investors and budget-conscious buyers.",
    homeStyles: "Historic Victorian and Italianate homes, rowhouses, and multi-family properties. Many properties offer significant square footage at affordable prices. Strong architectural character throughout.",
    buyerDemand: "Growing interest from investors seeking cash flow and buyers priced out of Albany County. Revitalization efforts and arts community driving renewed interest.",
    renovationDemand: "Excellent opportunities for renovation projects. Historic homes with good bones available at low entry points. Investors achieving strong returns on thoughtful renovations.",
  },
};

// Export all town data for easy access
export const allTownData = {
  delmar: delmarData,
  niskayuna: niskayunaData,
  voorheesville: voorheesvilleData,
  "clifton-park": cliftonParkData,
  amsterdam: amsterdamData,
};
