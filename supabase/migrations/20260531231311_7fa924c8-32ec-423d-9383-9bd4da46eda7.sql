-- Replace blanket public SELECT policy with role-scoped policies and revoke
-- column access to agent contact fields for anonymous users.

DROP POLICY IF EXISTS "Anyone can view town market data" ON public.town_market_data;

CREATE POLICY "Anon can view town market data"
  ON public.town_market_data
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can view town market data"
  ON public.town_market_data
  FOR SELECT
  TO authenticated
  USING (true);

-- Hide agent contact info from anonymous (column-level grants).
REVOKE SELECT ON public.town_market_data FROM anon;
GRANT SELECT (
  id, town_slug, town_name, scraped_at, active_listings,
  median_price, avg_price, min_price, max_price, avg_sqft,
  avg_beds, avg_baths, avg_days_on_market,
  listings_under_300k, listings_300k_500k, listings_500k_750k, listings_over_750k,
  single_family_count, multi_family_count, condo_count, land_count,
  listings_data, source_url, created_at, updated_at,
  market_activity_pdf_url, market_activity_last_checked,
  hero_landmark, nest_score, target_yield,
  anchor_agent_id, anchor_agent_name, anchor_agent_photo,
  region_category, is_active
) ON public.town_market_data TO anon;

GRANT SELECT ON public.town_market_data TO authenticated;
GRANT ALL ON public.town_market_data TO service_role;