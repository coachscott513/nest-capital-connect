import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type PreviewListing = {
  id: string;
  mls_number: string;
  address: string;
  address_slug: string | null;
  price: number | null;
  property_category: string | null;
  property_subtype: string | null;
  town_slug: string | null;
  city: string | null;
  county: string | null;
  acres: number | null;
  year_built: number | null;
  days_on_market: number | null;
  agent_name: string | null;
  agent_slug: string | null;
  agent_website: string | null;
  public_listing_url: string | null;
  claim_status: string;
  is_featured: boolean;
};

export type PreviewListingsState = {
  loading: boolean;
  error: string | null;
  all: PreviewListing[];
  byCategory: Record<string, PreviewListing[]>;
  agentCount: number;
};

export function usePreviewListings(townSlug?: string): PreviewListingsState {
  const [state, setState] = useState<PreviewListingsState>({
    loading: true, error: null, all: [], byCategory: {}, agentCount: 0,
  });

  useEffect(() => {
    let cancelled = false;
    setState((current) => ({ ...current, loading: true, error: null }));
    (async () => {
      const query = supabase
        .from("property_listings")
        .select("id,mls_number,address,address_slug,price,property_category,property_subtype,town_slug,city,county,acres,year_built,days_on_market,agent_name,agent_slug,agent_phone,agent_email,agent_website,public_listing_url,claim_status,is_featured")
        .neq("status", "archived");

      const { data, error } = await (townSlug ? query.eq("town_slug", townSlug) : query)
        .order("days_on_market", { ascending: true })
        .limit(500);
      if (cancelled) return;
      if (error) {
        setState({ loading: false, error: error.message, all: [], byCategory: {}, agentCount: 0 });
        return;
      }
      const all = (data ?? []) as PreviewListing[];
      const byCategory: Record<string, PreviewListing[]> = {};
      const agents = new Set<string>();
      for (const r of all) {
        const key = r.property_category ?? "other";
        (byCategory[key] ||= []).push(r);
        if (r.agent_slug) agents.add(r.agent_slug);
      }
      setState({ loading: false, error: null, all, byCategory, agentCount: agents.size });
    })();
    return () => { cancelled = true; };
  }, [townSlug]);

  return state;
}
