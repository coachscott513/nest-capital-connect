CREATE OR REPLACE VIEW public.v_seo_protected_biz_slugs
WITH (security_invoker = off) AS
SELECT
  lower(coalesce(business_slug, replace(url, 'https://www.capitaldistrictnest.com/biz/', ''))) AS slug,
  coalesce(allow_noindex, false) AS allow_noindex
FROM public.seo_protected_urls
WHERE route_family = '/biz/*';

GRANT SELECT ON public.v_seo_protected_biz_slugs TO anon, authenticated;
GRANT ALL ON public.v_seo_protected_biz_slugs TO service_role;