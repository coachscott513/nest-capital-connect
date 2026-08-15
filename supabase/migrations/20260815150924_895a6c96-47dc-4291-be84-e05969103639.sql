UPDATE public.businesses b
SET seo_cohort = s.tier
FROM (
  SELECT business_id,
         CASE WHEN bool_or(protection_tier IN ('protected','founder_locked')) THEN 'seo_protected'
              ELSE 'seo_opportunity' END AS tier
  FROM public.seo_protected_urls
  WHERE business_id IS NOT NULL
  GROUP BY business_id
) s
WHERE b.id = s.business_id
  AND b.seo_cohort IS DISTINCT FROM s.tier;