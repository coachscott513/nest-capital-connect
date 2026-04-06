
ALTER TABLE public.town_market_data
  ADD COLUMN map_center_lat NUMERIC,
  ADD COLUMN map_center_lng NUMERIC,
  ADD COLUMN default_zoom NUMERIC DEFAULT 15;
