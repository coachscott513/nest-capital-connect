export interface PropertyIntelData {
  // Basic Info
  address: string;
  city: string;
  state: string;
  beds: number;
  baths: number;
  sqft: number;
  acres: number;
  propertyType: string;
  yearBuilt: number;
  
  // Snapshot (Section 1)
  status: string;
  askingPrice: number;
  pricePerSqFt: number;
  schoolDistrict: string;
  municipality: string;
  county: string;
  daysOnMarket?: number;
  
  // Location Intelligence (Section 6)
  commuteAccess?: string;
  nearbyServices?: string[];
  schoolQuality?: string;
  areaContext?: string;
  demandDrivers?: string[];
  areaTrajectory?: string;
  
  // Market Context (Section 4)
  avgDaysOnMarket: number;
  inventoryPressure: 'Low' | 'Balanced' | 'High';
  saleToListRatio: number;
  
  // Pricing Intelligence (Gated)
  medianSold12Mo?: number;
  medianActive?: number;
  pricePosition?: 'Below' | 'At' | 'Above';
  
  // Comparable Sales (Section 4 - Gated)
  comparables?: ComparableSale[];
  
  // Tax & Financial (Section 3 - Gated)
  assessedValue?: number;
  annualTaxes?: number;
  taxHistory?: { year: number; amount: number }[];
  ownershipDuration?: string;
  lastSaleDate?: string;
  lastSalePrice?: number;
  estimatedInsurance?: number;
  estimatedUtilities?: number;
  
  // Upside & Risk (Section 5 - Gated)
  opportunities?: string[];
  considerations?: string[];
  upsideFactors?: string[];
  riskFactors?: string[];
}

export interface ComparableSale {
  address: string;
  salePrice: number;
  saleDate: string;
  distance: string;
  pricePerSqFt: number;
  beds?: number;
  baths?: number;
  sqft?: number;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
}
