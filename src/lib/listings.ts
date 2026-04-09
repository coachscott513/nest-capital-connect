import { supabase } from "@/integrations/supabase/client";

export interface Listing {
  id: string;
  mls_number: string | null;
  city: string;
  county: string | null;
  zipcode: string | null;
  full_address: string | null;
  masked_address: string | null;
  street_name: string | null;
  list_price: number | null;
  property_type: string | null;
  property_type_code: string | null;
  status: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  sqft: number | null;
  units: number | null;
  year_built: number | null;
  annual_taxes: number | null;
  days_on_market: number | null;
  list_date: string | null;
  listing_agent: string | null;
  agency: string | null;
  photo_url: string | null;
  remarks: string | null;
  is_investment: boolean | null;
  cap_rate: number | null;
  cash_flow_monthly: number | null;
  gross_rent_monthly: number | null;
  noi_annual: number | null;
  dscr: number | null;
  deal_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface TownStats {
  totalListings: number;
  medianPrice: number | null;
  avgDaysOnMarket: number | null;
  investmentCount: number;
}

/**
 * Get investment listings for a specific city, ordered by deal_score
 */
export async function getInvestmentListings(city: string, limit = 6): Promise<Listing[]> {
  const { data, error } = await (supabase as any)
    .from("listings")
    .select("*")
    .ilike("city", city)
    .eq("is_investment", true)
    .eq("status", "A")
    .order("deal_score", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching investment listings:", error);
    return [];
  }
  return (data || []) as Listing[];
}

/**
 * Get aggregate stats for a city
 */
export async function getTownStats(city: string): Promise<TownStats> {
  const { data, error } = await (supabase as any)
    .from("listings")
    .select("list_price, days_on_market, is_investment")
    .ilike("city", city)
    .eq("status", "A");

  if (error || !data || data.length === 0) {
    return { totalListings: 0, medianPrice: null, avgDaysOnMarket: null, investmentCount: 0 };
  }

  const prices = data
    .map((r: any) => r.list_price)
    .filter((p: any) => p != null)
    .sort((a: number, b: number) => a - b);

  const medianPrice = prices.length > 0
    ? prices[Math.floor(prices.length / 2)]
    : null;

  const doms = data.map((r: any) => r.days_on_market).filter((d: any) => d != null);
  const avgDaysOnMarket = doms.length > 0
    ? Math.round(doms.reduce((a: number, b: number) => a + b, 0) / doms.length)
    : null;

  const investmentCount = data.filter((r: any) => r.is_investment === true).length;

  return { totalListings: data.length, medianPrice, avgDaysOnMarket, investmentCount };
}

/**
 * Get top deals across all cities
 */
export async function getTopDeals(limit = 9): Promise<Listing[]> {
  const { data, error } = await (supabase as any)
    .from("listings")
    .select("*")
    .eq("is_investment", true)
    .eq("status", "A")
    .gte("deal_score", 6)
    .order("deal_score", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching top deals:", error);
    return [];
  }
  return (data || []) as Listing[];
}

/**
 * Get full address details for a single listing (after lead capture)
 */
export async function getFullAddress(mlsNumber: string): Promise<{
  full_address: string | null;
  listing_agent: string | null;
  agency: string | null;
} | null> {
  const { data, error } = await (supabase as any)
    .from("listings")
    .select("full_address, listing_agent, agency")
    .eq("mls_number", mlsNumber)
    .maybeSingle();

  if (error || !data) return null;
  return data;
}
