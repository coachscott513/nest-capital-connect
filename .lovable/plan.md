# Google Search Console Baseline Audit — capitaldistrictnest.com

Read-only. No code, metadata, sitemap, robots, or index-state changes were made. No sitemap submitted, no indexing requested, no removals.

Data end date: **2026-08-12** (last complete day). Windows used for all future comparisons:
- 7 days: 2026-08-06 → 2026-08-12
- 28 days: 2026-07-16 → 2026-08-12
- Prior 28 days: 2026-06-18 → 2026-07-15
- 90 days: 2026-05-15 → 2026-08-12

## 1. Executive founder assessment

VERIFIED FACT — Clicks are flat-to-slightly-up (220 vs 214 over the last two 28-day windows) while impressions fell ~60% (25,570 vs 64,016). CTR nearly tripled (0.86% vs 0.33%) and average position held around 8–10.

INFERENCE — This is not a visibility collapse in commercial terms. It reads as Google trimming a very large, low-quality impression surface (thousands of long-tail scraped-business impressions in June) while keeping the pages that actually earn clicks. The June spike was a crawl/discovery bulge, not durable demand.

VERIFIED FACT — 98% of clicks (215 of 220) and 93% of impressions come from `/biz/*` scraped business profiles. Every other route family combined produced 5 clicks and 1,776 impressions in 28 days.

## 2. Property and sitemap status

VERIFIED FACT
- Property: `sc-domain:capitaldistrictnest.com`, permission `siteOwner`. Domain property covers www, non-www, http and https.
- Homepage `https://www.capitaldistrictnest.com` — Submitted and indexed; Google canonical = www version; declared canonical = `https://www.capitaldistrictnest.com/`; crawled as MOBILE; last crawl 2026-08-07; robots ALLOWED.
- `https://capitaldistrictnest.com/` (non-www) — "URL is unknown to Google". No duplicate host in the index.
- Sitemap A: `https://www.capitaldistrictnest.com/sitemap.xml` — submitted 2026-06-01, last read 2026-06-01, 0 errors, 0 warnings, **4,725 URLs submitted, 0 reported indexed**.
- Sitemap B (legacy): `https://capitaldistrictnest.com/sitemap.xml` — submitted 2025-10-11, last read 2025-12-03, **1 error, 2 warnings**, 17 URLs.
- A duplicate junk property also exists in the account: `http://capitaldistrictnest.com/sitemap.xml/`.

INFERENCE — The active sitemap has not been re-read in over 10 weeks, so any route added since 2026-06-01 is undiscovered via sitemap. The "0 indexed" figure in the sitemaps API is unreliable and should not be read as zero coverage; inspected sample URLs are indexed.

RECOMMENDATION (not executed) — Retire the legacy non-www sitemap and the malformed property; keep one canonical sitemap.

## 3. Performance by window

| Window | Clicks | Impressions | CTR | Avg position |
|---|---|---|---|---|
| 7d (08-06→08-12) | 48 | 6,762 | 0.71% | ~10.2 |
| 28d (07-16→08-12) | 220 | 25,570 | 0.86% | 10.45 |
| Prior 28d (06-18→07-15) | 214 | 64,016 | 0.33% | ~8.3 |
| 90d (05-15→08-12) | 519 | 125,381 | 0.41% | ~9 |

VERIFIED FACT — Organic search only began materially on 2026-05-28. Before that the site had near-zero impressions, so "decline" language should always be measured from July onward, not from the June bulge.

## 4. Top queries (28d)

VERIFIED FACT — Query mix is category/near-me and named-business, not brand.
- Clicking queries (1 click each unless noted): apartment cleaning services near me (pos 1), house cleaners near me (1), knife sharpening near me (2), sawmill services near me (1), wood planing services near me (1), dumpster rental near me (4), kayak for rent near me (1), laundry near me (5), trucking companies near me (6.5), security classes near me (4), tent rental prices near me (2), used auto parts schenectady ny (1), halal food schenectady ny (34), buy here pay here cars (3), 99 cent atm near me (10), coinflip bitcoin atm near me (14), rc store near me (13), storage solution (1), ge vernova (2), mpc construction (1), terry's wine and liquor (1), schenectady boys and girls club (1.3), 2-3 days (1, unclear).
- Zero-click bulk: dozens of `"(518) xxx-xxxx" business name` phone-verification queries (e.g. "citizens atm" 53 impressions, 0 clicks, pos 36).

Intent classes: local service/category — dominant and the only click driver. Named business — large impression volume, near-zero clicks. Brand ("capital district nest") — no branded query appeared in the top-50 by clicks; branded demand is effectively negligible. Town/community, homes/listings, rentals, market report, events — zero clicks in the window.

## 5. Top pages (28d)

Strongest: `/biz/route-1-auto-vo2w-794` 8 clicks / 88 impr / 9.09% / pos 2.44. Then `/biz/schneider-s-wood-milling-services` 3/10/30%/1.3; `/biz/518landscapes`, `/biz/absolute-auto-credit-display-lot` (2/58, CTR 3.4% — weakest high-impression business page), `/biz/bellevue-deli`, `/biz/fritz-s-taproom`, `/biz/rapid-rolloffs` (2/50 at pos 1.7), `/biz/sunshine-auto-used-auto-parts` (2/35).

Non-business pages, complete list of clicks: `/living-in/delmar` 2 clicks / 153 impr / pos 25.3; `/` 1 / 250 / pos 40.1; `/grants` 1 / 36; `/living-in/rotterdam` 1 / 118.

## 6. Route-family performance (28d)

| Family | URLs w/ impressions | Clicks | Impressions | CTR | Avg pos |
|---|---|---|---|---|---|
| `/biz/*` | thousands | 215 | 23,794 | 0.90% | 8.42 |
| All non-`/biz` | 46 | 5 | 1,776 | 0.28% | ~35 |
| `/living-in/*` | 10 | 3 | 667 | 0.45% | ~45 |
| `/` | 1 | 1 | 250 | 0.40% | 40.1 |
| `/rentals` | 1 | 0 | 257 | 0% | 36.2 |
| `/towns/*` | 7 | 0 | 28 | 0% | ~8 |
| `/local` (+2 param URLs) | 3 | 0 | 61 | 0% | ~28 |
| `/businesses` | 1 | 0 | 3 | 0% | 61 |
| investor/analyzer/homes cluster | ~12 | 0 | ~220 | 0% | 7–60 |
| `/communities` | 1 | 0 | 55 | 0% | 30.4 |
| `/claim-business` | 1 | 0 | 6 | 0% | 27.5 |
| `/blog*`, `/stories*`, `/market-reports*` | 0 | 0 | 0 | — | — |

`/local` vs `/businesses`: VERIFIED FACT — `/local` gets 57 impressions at pos 28; `/businesses` gets 3 impressions at pos 61. Neither wins; `/local` is the only one Google shows at all, and both are being outranked by the site's own `/biz/*` pages for directory-style intent. No head-to-head canonical conflict is visible in the data — the real competition is directory hubs vs individual profiles.

## 7. Page indexing / coverage

LIMITATION (VERIFIED FACT) — The Search Console API exposes no page-indexing category counts. Indexed / crawled-not-indexed / discovered-not-indexed / soft-404 / duplicate-canonical totals **cannot be retrieved programmatically**; they exist only in the Search Console UI. Every count in section 8 marked "UI-only" must be read manually from the Pages report to complete the baseline.

What is verifiable: all inspected live routes return `Submitted and indexed`, `robotsTxtState: ALLOWED`, `INDEXING_ALLOWED`, `pageFetchState: SUCCESSFUL`, crawled as MOBILE, Google canonical equal to the declared canonical. A nonexistent `/biz/*` slug is "URL is unknown to Google" — no synthetic page has been indexed from that pattern in the sample.

## 8. URL inspection sample

| URL | Verdict | Coverage | Last crawl | Google canonical = declared | Referring |
|---|---|---|---|---|---|
| `/` | PASS | Submitted and indexed | 2026-08-07 | yes | — |
| `/local` | PASS | Submitted and indexed | 2026-07-13 | yes | /dealdesk, /living-in/mechanicville |
| `/businesses` | PASS | Submitted and indexed | 2026-08-07 | yes | /biz/elite-pest-solutions |
| `/biz/route-1-auto-vo2w-794` | PASS | Submitted and indexed | 2026-08-05 | yes | sitemap.xml |
| `/living-in/delmar` | PASS | Submitted and indexed | 2026-07-30 | yes | /local |
| `/homes` | PASS | Submitted and indexed | 2026-07-30 | yes | /living-in/colonie, /dealdesk |
| `/rentals` | PASS | Submitted and indexed | 2026-06-25 | yes | /living-in/colonie, / |
| `/biz/<nonexistent>` | NEUTRAL | URL unknown to Google | — | — | — |
| `https://capitaldistrictnest.com/` | NEUTRAL | URL unknown to Google | — | — | — |

Mobile usability: `VERDICT_UNSPECIFIED` on every URL (the report is retired; no signal available). Rich results: Breadcrumbs detected and PASS on all indexed samples; `/biz/route-1-auto` shows two breadcrumb items. No LocalBusiness rich result was detected on the business profile — INFERENCE: LocalBusiness structured data is either absent or not eligible.

## 9. Canonical and host findings

VERIFIED FACT — No www/non-www duplication, no http duplication, no Google-selected canonical mismatch in the sample, no missing canonical in the sample. Only host anomaly is account-level: the stale non-www sitemap and the malformed `http://capitaldistrictnest.com/sitemap.xml/` property.

VERIFIED FACT — Query-parameter URLs are indexed and receiving impressions: `/local?biz=us-mortgage`, `/local?category=Salon`, `/neighborhoods?county=montgomery`, `/analyze-home?city=schenectady&budget=184615`. INFERENCE — parameter states are entering the index despite `/local` filtered states being intended as noindex; worth verifying against the live rendered head.

## 10. Proven organic strengths

- Long-tail "<service> near me" service queries ranking positions 1–6 on individual `/biz/*` pages, converting at 3–30% CTR.
- Auto, cleaning, milling/sharpening, landscaping, roofing, pest, dumpster/rolloff, deli/tavern verticals.
- `/living-in/delmar` and `/living-in/rotterdam` — the only non-business pages earning clicks.

## 11. Organic risks

1. Single-family dependence: remove `/biz/*` and organic traffic is ~5 clicks / 28 days.
2. Phone-number verification queries generate thousands of impressions at 0% CTR — INFERENCE: Google is testing these pages as directory scrape mirrors; sustained zero-CTR at scale is a quality-signal risk during a core update.
3. Sitemap unread since 2026-06-01; new routes are not being fed to Google.
4. Town, homes, rentals, and investor pages sit at positions 25–60 — indexed but not competitive.
5. Parameterized URLs indexing unintentionally.

## 12. Protect during canonical data cleanup

Do not deindex, re-slug, redirect, or merge: the ~40 `/biz/*` pages with clicks in the last 28 days (starting route-1-auto, schneider-s-wood-milling, 518landscapes, absolute-auto-credit, bellevue-deli, fritz-s-taproom, rapid-rolloffs, sunshine-auto, johnny-zhang-premium-realty, mpc-construction, company-is-coming-cleaners, l-h-heimburge, vanguard-roofing, wags-and-whiskers, a3-sharpening, afghan-halal-meat, boys-and-girls-club-schenectady), plus `/living-in/delmar`, `/living-in/rotterdam`, `/grants`, `/`, `/local`.

## 13. Not ready to expand

`/businesses` (pos 61, no demand yet), `/communities`, `/claim-business`, `/towns/*` duplicates of `/living-in/*`, the investor/analyzer cluster, `/blog`, `/stories`, `/market-reports` (zero impressions), and the ~4,000 zero-impression scraped `/biz/*` records.

## 14. Baseline scorecard (freeze these numbers)

| Metric | 2026-08-12 baseline |
|---|---|
| Sitemap URLs submitted | 4,725 (one active sitemap) |
| URLs with impressions (28d) | 46 non-`/biz` + `/biz/*` bulk (not enumerated) |
| URLs with clicks (28d) | ~44 total, 40 of them `/biz/*` |
| Clicks 28d / prior 28d | 220 / 214 |
| Impressions 28d / prior 28d | 25,570 / 64,016 |
| CTR 28d | 0.86% |
| Avg position 28d | 10.45 |
| Branded clicks | ~0 |
| Non-branded clicks | ~220 |
| `/biz/*` clicks / impressions | 215 / 23,794 |
| Town-page clicks / impressions | 3 / 667 |
| Homes+rentals+investor clicks / impressions | 0 / ~535 |
| Mobile usability issues | not exposed by API |
| Structured data | Breadcrumbs PASS; no LocalBusiness detected |
| Indexed count, crawled-not-indexed, discovered-not-indexed, soft 404, duplicate-canonical, noindex-excluded | UI-only — must be read manually |

## 15. Decision support

1. **Losing visibility?** No, not in click terms — clicks are flat and CTR tripled. Impressions dropped 60%; that is impression-surface contraction, not lost traffic.
2. **Most organic value:** `/biz/*`, by a factor of ~43x on clicks.
3. **Business pages contributing?** Yes — they are effectively the entire organic channel.
4. **Towns stronger than business pages?** No. Towns: 3 clicks, positions 25–54. Business pages: 215 clicks, positions 1–9. Towns are potential, not asset.
5. **`/local` or `/businesses`?** Neither. `/local` is marginally ahead (57 impr, pos 28 vs 3 impr, pos 61).
6. **Protect:** section 12.
7. **Most urgent technical issue:** the sitemap has not been re-read since 2026-06-01, so nothing new is being discovered through it — and coverage counts are unverifiable until read from the UI.
8. **Biggest content/data opportunity:** enrich the ~40 already-clicking business profiles with real, verified content and LocalBusiness data — they already rank 1–9 and would convert impressions currently wasted at 0% CTR.
9. **Should not be indexed yet:** parameterized `/local?...` and `/analyze-home?...` states, thin zero-impression `/biz/*` records, `/towns/*` duplicates of `/living-in/*`.
10. **First 30-day target:** hold clicks at 220+/28d while lifting `/biz/*` CTR from 0.90% to 1.5%, and get at least one non-`/biz` route family to 10+ clicks — most plausibly `/living-in/*` from pos ~45 into the 20s.

## 16. Verdict on SEO measurability

**PASS WITH CONDITIONS.** Performance, sitemap status, canonical state, and URL-level indexing are all verifiable and now baselined. The condition: page-indexing coverage counts (section 7) are not exposed by the API and must be captured manually from the Search Console Pages report before the cleanup begins, or post-cleanup coverage changes will be unmeasurable.
