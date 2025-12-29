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
  
  // Snapshot (FREE)
  status: string;
  askingPrice: number;
  pricePerSqFt: number;
  schoolDistrict: string;
  municipality: string;
  county: string;
  
  // Location Intelligence (FREE)
  commuteAccess?: string;
  nearbyServices?: string[];
  schoolQuality?: string;
  areaContext?: string;
  
  // Market Pulse (FREE)
  avgDaysOnMarket: number;
  inventoryPressure: 'Low' | 'Balanced' | 'High';
  saleToListRatio: number;
  
  // Pricing Intelligence (GATED)
  medianSold12Mo?: number;
  medianActive?: number;
  pricePosition?: 'Below' | 'At' | 'Above';
  
  // Comparable Sales (GATED)
  comparables?: ComparableSale[];
  
  // Tax & Ownership (GATED)
  assessedValue?: number;
  annualTaxes?: number;
  taxHistory?: { year: number; amount: number }[];
  ownershipDuration?: string;
  lastSaleDate?: string;
  lastSalePrice?: number;
  
  // Risk & Opportunity (GATED)
  opportunities?: string[];
  considerations?: string[];
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
