-- Lock down PII columns from anonymous (public) Data API access.
-- Authenticated users (admins/claimed flows) retain full access via existing grants.

-- listing_agents: hide phone, email, and social handles from anon
REVOKE SELECT ON public.listing_agents FROM anon;
GRANT SELECT (id, slug, name, brokerage_name, brokerage_slug, website, photo_url, claim_status, is_featured, active_count, towns, created_at, updated_at) ON public.listing_agents TO anon;

-- property_listings: hide agent_email, agent_phone from anon
REVOKE SELECT ON public.property_listings FROM anon;
GRANT SELECT (id, mls_number, status, claim_status, source_type, is_featured, is_indexable, needs_agent_public_url, public_listing_url, address, address_slug, city, town_slug, county, school_district, price, property_category, property_subtype, beds, baths, sqft, acres, year_built, days_on_market, listing_contract_date, agent_name, agent_slug, agent_website, brokerage_name, brokerage_slug, raw, created_at, updated_at) ON public.property_listings TO anon;

-- town_market_data: hide anchor_agent_phone, anchor_agent_email from anon
REVOKE SELECT ON public.town_market_data FROM anon;
GRANT SELECT (id, town_slug, town_name, scraped_at, active_listings, median_price, avg_price, min_price, max_price, avg_sqft, avg_beds, avg_baths, avg_days_on_market, listings_under_300k, listings_300k_500k, listings_500k_750k, listings_over_750k, single_family_count, multi_family_count, condo_count, land_count, listings_data, source_url, created_at, updated_at, market_activity_pdf_url, market_activity_last_checked, hero_landmark, nest_score, target_yield, anchor_agent_id, anchor_agent_name, anchor_agent_photo, region_category, is_active, agent_search_url, map_center_lat, map_center_lng, default_zoom) ON public.town_market_data TO anon;

-- Ensure authenticated keeps full access (admin tools, claimed-profile flows)
GRANT SELECT ON public.listing_agents TO authenticated;
GRANT SELECT ON public.property_listings TO authenticated;
GRANT SELECT ON public.town_market_data TO authenticated;