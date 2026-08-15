DELETE FROM public.answerability_pilot_cohort;

WITH biz AS (
  SELECT p.url, p.business_id, p.business_slug, p.clicks_90d, p.impressions_90d, p.ctr, p.protection_tier,
         b.category, b.town_slug
  FROM public.seo_protected_urls p
  JOIN public.businesses b ON b.id = p.business_id
  WHERE p.route_family = '/biz/*' AND p.business_id IS NOT NULL
),
top_clicks AS (
  SELECT *, 'top_clicks'::text AS bucket,
         'Top-10 by 90-day clicks in Search Console.'::text AS reason
  FROM biz
  ORDER BY clicks_90d DESC NULLS LAST, impressions_90d DESC
  LIMIT 10
),
weak_ctr AS (
  SELECT *, 'impressions_weak_ctr'::text,
         'High impressions with weak CTR — demand exists, the answer does not land.'::text
  FROM biz
  WHERE impressions_90d >= 25
    AND url NOT IN (SELECT url FROM top_clicks)
  ORDER BY impressions_90d DESC, ctr ASC
  LIMIT 5
),
strategic AS (
  SELECT DISTINCT ON (COALESCE(category,'uncategorised')) *,
         'strategic_category'::text,
         'Strategically useful service/town category, already SEO-protected or an opportunity page.'::text
  FROM biz
  WHERE url NOT IN (SELECT url FROM top_clicks)
    AND url NOT IN (SELECT url FROM weak_ctr)
    AND protection_tier IN ('protected','opportunity','founder_locked')
    AND impressions_90d >= 10
  ORDER BY COALESCE(category,'uncategorised'), impressions_90d DESC
),
strategic5 AS (
  SELECT * FROM strategic ORDER BY impressions_90d DESC LIMIT 5
)
INSERT INTO public.answerability_pilot_cohort
  (business_id, url, business_slug, selection_bucket, selection_reason, clicks_90d, impressions_90d, ctr, protection_tier)
SELECT business_id, url, business_slug, bucket, reason, clicks_90d, impressions_90d, ctr, protection_tier
FROM (
  SELECT * FROM top_clicks
  UNION ALL SELECT * FROM weak_ctr
  UNION ALL SELECT * FROM strategic5
) all_rows;