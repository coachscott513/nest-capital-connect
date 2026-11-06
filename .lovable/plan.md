# Read-only SEO + Analytics Audit — CapitalDistrictNest.com

Strictly read-only. No source, records, migrations, settings, tracking, or publish changes. Temporary output only under /tmp/audit. Every finding labeled LIVE (production www.capitaldistrictnest.com) vs SOURCE (latest unpublished preview), and Confirmed / Suspected / Inaccessible, with file:line or URL evidence.

## 1. Analytics tagging
- Grep repo for G-/GTM- IDs, gtag/dataLayer, Lovable events; locate loaders in index.html, shells (spa-shell.html, private-shell.html), App.tsx.
- Check duplicate loaders, SPA route page_view handling, consent gating, hostname filtering (preview vs prod).
- Inventory custom events: lead/claim forms, search, tel:, outbound website, directions, Coach One Media link, dock clicks. Check whether events fire only after confirmed insert success, and whether PII or raw search text is in payloads.
- Playwright on live homepage + 3 routes: capture collect requests, confirm measurement ID, count hits per navigation.
- Note: GA4 admin settings (filters, retention, conversions) cannot be inferred from code.

## 2. Crawl/indexing (live)
- curl apex vs www, http vs https redirect chains; robots.txt; sitemap index and each child, with URL counts.
- Sample /biz/:slug (normal, underscore slug, nonexistent), /local pagination, town, investment pages: status code, canonical, meta robots, title, H1, JSON-LD types. Soft-404 test on fake slugs.
- Check paid-tier/claimed gating in scripts/biz-eligibility.mjs, prerender-biz.mjs, sitemap generator.

## 3. Business data (aggregate counts only)
- Active/inactive; null/blank phone, website, description, address, category.
- Count of rows with phone matching 4074157723 (any formatting) — count only.
- Duplicate-name/slug counts; no contact dumps.

## 4. Page-quality comparison
- Homepage vs /local vs /biz profile vs town vs investment page: title/description uniqueness, H1, thin content, schema validity, any ratings/reviews/awards without source.
- Trace phone/CTA routing on business profiles to identify where calls default to Scott (src/config/contact.ts and profile components).

## 5. Performance (lab only)
- Lighthouse/Playwright timing on live homepage and a /biz page if runnable; bundle sizes from source build config, largest images, render-blocking fonts/scripts. No Core Web Vitals claims without field data.

## 6. Historic risk verification
- Sitemap 211 vs 5,251 discrepancy, 472 underscore-slug exclusions, paid-tier indexing gating: check current repo logic and live sitemap; report still present / resolved / unverifiable.

## 7. Traffic quality + protections
- Pull Lovable native analytics Oct 9–Nov 6 (daily) and visitor event tables (page_views by country, user_agent, referrer, is_bot, around Nov 3 spike and Oct 26 cutover).
- Check honeypots, rate limits (edge functions, engagement_rate_limits, ask_nest_rate_limits), and whether /investment-analyzer and /homes/claim-listing are targeted by automation. Hypothesis only, no blocking.

## Deliverable
Concise report in chat: actual measurement ID(s), confirmed sitemap counts, production URL examples with status, errors, tracking gaps, data-quality counts, and a prioritized fix list (P1/P2/P3) for later approval. Records (5,082) and design untouched.
