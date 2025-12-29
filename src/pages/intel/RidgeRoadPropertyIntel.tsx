import PropertyIntelReport from "@/components/PropertyIntelReport";
import { PropertyIntelData } from "@/components/property-intel/types";

const REPORT_SLUG = "1999-ridge-road-queensbury-ny-intel";

const propertyData: PropertyIntelData = {
  // Basic Info
  address: "1999 Ridge Road",
  city: "Queensbury",
  state: "New York",
  beds: 4,
  baths: 2,
  sqft: 2180,
  acres: 4.0,
  propertyType: "Single-Family",
  yearBuilt: 1986,
  
  // Snapshot (FREE)
  status: "Active",
  askingPrice: 179900,
  pricePerSqFt: 83,
  schoolDistrict: "Queensbury Union Free",
  municipality: "Queensbury",
  county: "Warren County",
  
  // Location Intelligence (FREE)
  commuteAccess: "Easy access to I-87, 10 min to Glens Falls",
  nearbyServices: ["Groceries within 5 mi", "Healthcare nearby", "Lake George 15 min"],
  schoolQuality: "Above-average rated district",
  areaContext: "Rural residential with privacy and space",
  
  // Market Pulse (FREE)
  avgDaysOnMarket: 34,
  inventoryPressure: "Low",
  saleToListRatio: 0.97,
  
  // Pricing Intelligence (GATED)
  medianSold12Mo: 245000,
  medianActive: 289000,
  pricePosition: "Below",
  
  // Comparable Sales (GATED)
  comparables: [
    {
      address: "2145 Ridge Rd, Queensbury",
      salePrice: 210000,
      saleDate: "Oct 2024",
      distance: "0.8 mi",
      pricePerSqFt: 92,
      beds: 3,
      baths: 2,
      sqft: 2280,
    },
    {
      address: "88 Farr Lane, Queensbury",
      salePrice: 235000,
      saleDate: "Sep 2024",
      distance: "1.2 mi",
      pricePerSqFt: 98,
      beds: 4,
      baths: 2,
      sqft: 2400,
    },
    {
      address: "412 Aviation Rd, Queensbury",
      salePrice: 198000,
      saleDate: "Aug 2024",
      distance: "2.1 mi",
      pricePerSqFt: 85,
      beds: 3,
      baths: 2,
      sqft: 2330,
    },
    {
      address: "55 Peggy Ann Rd, Queensbury",
      salePrice: 275000,
      saleDate: "Jul 2024",
      distance: "1.8 mi",
      pricePerSqFt: 105,
      beds: 4,
      baths: 3,
      sqft: 2620,
    },
  ],
  
  // Tax & Ownership (GATED)
  assessedValue: 179900,
  annualTaxes: 5850,
  taxHistory: [
    { year: 2024, amount: 5850 },
    { year: 2023, amount: 5620 },
    { year: 2022, amount: 5410 },
    { year: 2021, amount: 5200 },
  ],
  ownershipDuration: "8+ years",
  lastSaleDate: "2016",
  lastSalePrice: 142000,
  
  // Risk & Opportunity (GATED)
  opportunities: [
    "Lot size advantage (4 acres vs 1.2 acre median)",
    "Below median price per square foot",
    "Stable tax trajectory",
    "Long-term ownership suggests maintained property",
    "Strong school district for resale",
  ],
  considerations: [
    "Age of construction (38 years)",
    "Private well and septic require inspection",
    "Rural location may limit buyer pool",
    "Lower inventory velocity in winter months",
  ],
};

const RidgeRoadPropertyIntel = () => {
  return (
    <PropertyIntelReport
      data={propertyData}
      reportSlug={REPORT_SLUG}
      metaTitle="1999 Ridge Road, Queensbury NY — Property Intelligence"
      metaDescription="Independent property intelligence report for 1999 Ridge Road, Queensbury NY. Market analysis, comparable sales, tax data, and risk assessment. 4 beds, 2 baths, 4 acres."
      canonicalUrl="https://www.capitaldistrictnest.com/intel/1999-ridge-road-queensbury-ny"
    />
  );
};

export default RidgeRoadPropertyIntel;
