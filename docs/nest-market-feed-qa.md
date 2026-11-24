# Neutral homepage feed — preview acceptance, Nov 24, 2026

## Delivered
- Existing homepage replaced with a dense white/gray/blue/near-black feed. Old `DirectoryEditorialHome`, four pillars, service map and entry components remain available; neither rejected redesign was restored.
- 60px desktop sticky navigation; horizontally scrollable compact mobile navigation. Actual links: Live feed, `/communities`, `/homes`, `/local`, `/finances`, `/home-services`.
- Separate umbrella/edition identity using existing `useRegion`/`regions`. Capital District, NY connected; Orlando and Kingston, NY explicitly coming soon, with no inherited regional rows.
- Pausable ticker (actual dated headlines when present, honest resource links otherwise), reduced-motion support; financing strip uses the latest approved Finance headline, original date/publisher link and explicit dated-weekly-average/not-real-time qualification, alongside resource links. Resource-only fallback when no Finance row exists.
- Town/category/text filters, last-checked Eastern timestamp, 60-second polling/window-focus refresh and explicit queued snapshot acceptance. Manual refresh available. Dated organic rows deduplicate by category/source URL/date; no sponsored sorting. News/property newest first, scheduled events afterward by start time.
- Device-local saved rows, persisted dark/larger-text settings, accessible controls/focus. Saved snapshots may age and are labeled accordingly.
- Alphabetical active-business rows, 15 per server page, with actual profile URLs and business website/valid business phone Connect destinations. Existing platform/agent phone guard reused; no default Scott Connect.
- Dedicated full-width directory/contractor search uses unchanged `homeDirectorySearch` `/local` contract; original input IDs retained. Claim/business login/home services remain linked.
- Original `PropertyHero embedded` and RealScout configuration preserved in compact disclosure. All global personal floating/docked CTAs suppressed only on `/`; tools remain on appropriate legacy routes.

## Data and moderation/date rules (read-only)
Initial rebuild aggregate audit: **5,082 active businesses**, then 0 approved `media_stories`, 0 active `town_events`, 366 `listings` but 0 approved public listing URLs, and 3,171 `property_listings`, all `preview` / `market_data_import`, 0 indexable. At final review the owner inserted two verified approved stories, read back without edits:
- `db9c287f-8573-45b9-8e2d-b4ea3d7a296e`: Real Estate → Property, Voorheesville, “205 Deerfield Court listed at $250,000”, original November 20, 2026 (`2026-11-20T05:00:00Z`), Berkshire Hathaway HomeServices Blake, https://www.bhhsblakerealtors.com/ny/205-deerfield-court-voorheesville-12186/pid-442327547. Approved summary retains Lindsay Carr and Natalie Pinkham credit and current-status/source-check qualification.
- `6da78a76-2666-404c-be78-7d48e938f661`: Finance, regional, “Freddie Mac weekly averages: 30-year 7.28%; 15-year 6.66%”, original November 19, 2026 (`2026-11-19T17:00:00Z`), Freddie Mac Primary Mortgage Market Survey, https://www.freddiemac.com/pmms. Approved summary explicitly describes national survey averages, not individual lender offers.
No data edits, reinserts, migrations or permissions changes made by this work; neither rate nor price is hardcoded into runtime presentation.

New runtime SELECT sources:
- `media_stories`: `approved=true`; requires headline, actual supplied `published_at`, named publisher and http(s) source article link; future publication dates excluded. Real Estate maps to Property; Finance maps to Finance. Original approved summary is read/displayed as plain text through a compact native details disclosure, keyboard accessible. Publication dates are supplied source dates, not insertion/check times.
- `town_events`: `is_active=true`; requires actual `starts_at` and organizer CTA URL. Start-time label is explicit, not a news/arrival date; organizer link is Details, not an independent news source.
- `listings`: active status `A`, `public_listing_url_approved=true`, actual `list_date` and valid public URL. Price only from `list_price`; credited listing agent/agency displayed with Source link. No separate agent destination is available, so no duplicate/fabricated Connect link is rendered.
- `businesses`: active, `region=capital-district`, alphabetically ordered, never filtered by paid tier or claim status; no opening/publication timestamp invented. Real category and town fields retained. Town-name metadata is separately paged for selector completeness, not a duplicate search index.
- `towns`: actual active town options plus business-town metadata; **94 actual town options** (95 including All towns), not a hardcoded shortlist.
- `regions`: existing hostname/slug configuration resolved by `useRegion`.

`property_listings` was inspected but not fed: every row is an import preview without a publishable source link. Rentals were inspected for structure, but availability is not a publication date and no public source/contact link exists in their schema. Static sample/featured properties and curated historical articles were not presented as current live updates.

The current factual stream includes the two real approved stories above. Empty states describe the selected view/source conditions, never a hardcoded zero-news/no-rate claim. Refresh checks approved database records every 60 seconds while open; it does not automatically fetch external publisher updates or MLS. Future records still require source dates/links and approval. No MLS/news/rate subscription, scraping or extra integration added. Capital District-scoped tables without a region column never query for other editions.

## Preservation evidence
Byte comparison against starting HEAD confirmed unchanged:
- Entire `index.html` restored byte-for-byte to `c20ab13b0e6dba6bdceca76a95c8367c2e384265`, including intentional neutral shell/fallback and GTM **GTM-N84MXWZD**, GA4 **G-BLCCLEJ3M0**, Ads **AW-922988725** loader bytes. SHA256: `3c06bcc23a823fe8415e72e859124d360ff8dc7d045269777ae509081fb84ed4`. New homepage title/description remain only in Index/SEOHead. Architecture guidance corrected accordingly.
- `GARouteTracker.tsx`, `engagement.ts`, contact config, externalProducts/RealScout config, `PropertyHero.tsx`.
- `vite.config.ts`, sitemap generator, Tier B prerender script, `public/robots.txt`.
- No domain/DNS, Google settings, verification, redirects, database rows or permissions modified. No standalone Google HTML verification assets found in `public`; existing verification/configuration left as found, DNS ownership not reverified.
- `/` still has one H1, accurate updated route title/description, canonical **https://www.capitaldistrictnest.com/** and existing index/follow directive. Existing Organization/WebSite schemas preserved. Removed only the homepage's misleading RealEstateAgent schema; shared schema utilities and real-estate pages untouched.
- Existing route analytics loader remains single; no new pageview effect. New feed actions use existing first-party `logEngagement` with supported source/category/town dimensions. Directory submit keeps `regional_search_submit` with a length bucket and no raw text/null metadata (existing helper sends invalid nullable metadata, so the new surface calls the same existing sink directly). Browser-intercepted submit contained no raw personal/search string. No backend analytics schema/config changes.

## Checks actually run
- Harness preview build/type correctness: latest entries `build OK` (no manual production/sitemap build).
- Final Vitest: **26 passing tests** — 13 feed source/date/summary/finance-selection/ordering/queue/edition safety tests, 4 directory-contract tests, 9 existing search-intent tests.
- Final real-data browser checks at **1440×1000, 390×844, 320×844**: exactly two real update rows with November 20/19 dates and exact publisher links; Property + Voorheesville finds Deerfield; Finance finds Freddie Mac; both summaries expand and original agents/national-survey qualifications are readable (keyboard Enter tested). Finance desk original November 19 date/headline/source verified. Saved story persists across reload. Local news empty view contains no obsolete zero-source claim. Dark/larger text no horizontal overflow. No page errors or media-story writes. Final screenshots under `/tmp/browser/feed-final`, visually inspected, including expanded mobile summaries.
- Browser-only empty response interception confirmed all four Finance resource links remain with no finance headline, and database-only refresh wording stays accurate; real records untouched. Final harness build `2026-11-24T13:44:41Z`: `build OK`. `git diff --check` passed; removed public report confirmed absent. Delmar, Ambition and `/local?search=coffee&town=schenectady` rechecked with correct existing H1/canonical and single description.
- Real anonymous browser data at **1440, 390, 320px**: 15 business rows, one H1, no page overflow or page errors; dark/larger text also no overflow. Screenshots visually inspected.
- Actual Schenectady/Delmar selection filtered every displayed directory row correctly; saved business showed in saved list and persisted after reload; sales filter honest empty state; Orlando showed zero rows.
- Actual directory query+town+category submission navigated to `/local?search=coffee&town=schenectady`, and real directory H1/results loaded. Contractor category navigation also exercised.
- Genuine business Details click loaded its matching +MEDRITE profile; Connect resolved to its real website, not Scott. Ambition profile, `/towns/delmar`, `/local`, `/homes`, `/home-services`, `/finances`, `/claim-business` all loaded existing H1 and canonicals. Business login redirected to original `/partner-auth`.
- All six navigation destinations inspected; Geist font loaded. Reduced-motion ticker animation computed `none`; RealScout disclosure opens original widget slot. No forms submitted.
- Browser-only intercepted fixtures (temporary script under `/tmp`, never production data) validated queue: new snapshot did not move initial row, explicit new-updates click revealed second row, town/category/query filters and source link matched. Manual refetch path exercised; timer interval is set to 60 seconds but a wall-clock unattended interval was not awaited.

## Limits
No full production prerender/sitemap rebuild or published-domain test; preview only. RealScout external search completion, business external site/phone response, authenticated partner workflows, live Google ingestion/consent and publisher date correctness not independently verified. No lead submissions or fake arrivals. Source coverage is sparse as documented, not an implementation failure disguised as live data. No new packages needed; workspace-managed dependency-version churn regenerates automatically after restore and is excluded from the authored commit.

## Exact authored files
Runtime:
- `index.html` (exact original neutral-shell restoration)
- `src/pages/Index.tsx`
- `src/App.tsx` (homepage-only global CTA gate)
- `src/index.css` (only additive `.nest-feed` semantic tokens/body mode)
- `src/components/feed/MarketFeedHome.tsx`
- `src/components/feed/useMarketFeed.ts`
- `src/components/feed/feedModel.ts`
- `src/components/feed/marketFeed.css`
Tests/docs:
- `src/components/feed/feedModel.test.ts`
- `AGENTS.md`, `roadmap.md`, `docs/nest-home-style-reference.md`, this QA note
- `public/qa/nest-market-feed-desktop.png`, `public/qa/nest-market-feed-mobile.png`
- `public/qa/nest-market-feed-report.md` removed at final review; internal QA prose stays only in this docs file, not public deployment. Existing screenshot assets left untouched; final review captures remain temporary.
Persistent homepage design memory updated to the new explicit authorization; north-star retained.

Preview: https://id-preview--e7c28071-4ef6-4fc7-bc31-76811d0c9dba.lovable.app
Screenshots: `/qa/nest-market-feed-desktop.png`, `/qa/nest-market-feed-mobile.png`.
**Not published.**
