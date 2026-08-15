INSERT INTO public.seo_protected_urls
  (url, route_family, clicks_28d, clicks_90d, impressions_28d, impressions_90d,
   average_position, protection_tier, protection_reason, source_window)
VALUES
  ('https://www.capitaldistrictnest.com/', '/', 0, 15, 0, 1723, 28.7,
   'founder_locked', 'Founder-locked core route (homepage; 15 clicks in 2026-05-18..2026-08-12)', '2026-05-18..2026-08-12'),
  ('https://www.capitaldistrictnest.com/local', '/local', 0, 0, 0, 0, NULL,
   'founder_locked', 'Founder-locked core route', '2026-05-18..2026-08-12'),
  ('https://www.capitaldistrictnest.com/living-in/delmar', '/living-in/*', 0, 3, 0, 322, 21.5,
   'founder_locked', 'Founder-locked town page (3 clicks in 2026-05-18..2026-08-12)', '2026-05-18..2026-08-12'),
  ('https://www.capitaldistrictnest.com/living-in/rotterdam', '/living-in/*', 0, 0, 0, 0, NULL,
   'founder_locked', 'Founder-locked town page', '2026-05-18..2026-08-12'),
  ('https://www.capitaldistrictnest.com/grants', '/grants', 0, 0, 0, 0, NULL,
   'founder_locked', 'Founder-locked core route', '2026-05-18..2026-08-12')
ON CONFLICT (url) DO NOTHING;