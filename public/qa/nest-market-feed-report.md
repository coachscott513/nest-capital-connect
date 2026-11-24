# Neutral homepage feed — preview acceptance, Nov 24, 2026

## Delivered
- Existing homepage replaced with a dense white/gray/blue/near-black feed. Old `DirectoryEditorialHome`, four pillars, service map and entry components remain available; neither rejected redesign was restored.
- 60px desktop sticky navigation; horizontally scrollable compact mobile navigation. Actual links: Live feed, `/communities`, `/homes`, `/local`, `/finances`, `/home-services`.
- Separate umbrella/edition identity using existing `useRegion`/`regions`. Capital District, NY connected; Orlando and Kingston, NY explicitly coming soon, with no inherited regional rows.
- Pausable ticker (actual dated headlines when present, honest resource links otherwise), reduced-motion support; financing strip uses resource links, not rate numbers.
- Town/category/text filters, last-checked Eastern timestamp, 60-second polling/window-focus refresh and explicit queued snapshot acceptance. Manual refresh available. Dated organic rows deduplicate by category/source URL/date; no sponsored sorting. News/property newest first, scheduled events afterward by start time.
- Device-local saved rows, persisted dark/larger-text settings, accessible controls/focus. Saved snapshots may age and are labeled accordingly.
- Alphabetical active-business rows, 15 per server page, with actual profile URLs and business website/valid business phone Connect destinations. Existing platform/agent phone guard reused; no default Scott Connect.
- Dedicated full-width directory/contractor search uses unchanged `homeDirectorySearch` `/local` contract; original input IDs retained. Claim/business login/home services remain linked.
- Original `PropertyHero embedded` and RealScout configuration preserved in compact disclosure. All global personal floating/docked CTAs suppressed only on `/`; tools remain on appropriate legacy routes.

## Data and moderation/date rules (read-only)
Live aggregate audit: **5,082 active businesses**, 0 approved `media_stories`, 0 active `town_events`, 366 `listings` but 0 approved public listing URLs, and 3,171 `property_listings`, all `preview` / `market_data_import`, 0 indexable. No records changed; no migrations/permission changes.

New runtime SELECT sources:
- `media_stories`: `approved=true`; requires headline, actual supplied `published_at`, named publisher and http(s) source article link; future publication dates excluded. Publication dates are editor-supplied, not independently verified by this rebuild.
- `town_events`: `is_active=true`; requires actual `starts_at` and organizer CTA URL. Start-time label is explicit, not a news/arrival date; organizer link is Details, not an independent news source.
- `listings`: active status `A`, `public_listing_url_approved=true`, actual `list_date` and valid public URL. Price only from `list_price`; credited listing agent/agency displayed with Source link. No separate agent destination is available, so no duplicate/fabricated Connect link is rendered.
- `businesses`: active, `region=capital-district`, alphabetically ordered, never filtered by paid tier or claim status; no opening/publication timestamp invented. Real category and town fields retained. Town-name metadata is separately paged for selector completeness, not a duplicate search index.
- `towns`: actual active town options plus business-town metadata; **94 actual town options** (95 including All towns), not a hardcoded shortlist.
- `regions`: existing hostname/slug configuration resolved by `useRegion`.

`property_listings` was inspected but not fed: every row is an import preview without a publishable source link. Rentals were inspected for structure, but availability is not a publication date and no public source/contact link exists in their schema. Static sample/featured properties and curated historical articles were not presented as current live updates.

Current factual update stream is empty. The UI says so and exposes the real business directory/resources instead. To populate dated updates, the owner must approve publisher stories with original publication dates/links, active sourced events, and approve actual credited property source URLs. Sale history and price-change history need a verified existing or separately authorized source. No MLS/news/rate subscription or scraping added. Capital District-scoped tables without a region column never query for other editions.

## Preservation evidence
Byte comparison against starting HEAD confirmed unchanged:
- Tracking sections in `index.html`: GTM **GTM-N84MXWZD**, GA4 **G-BLCCLEJ3M0**, Ads **AW-922988725**, original loader count/configuration preserved; only accurate application fallback title/description/social metadata added.
- `GARouteTracker.tsx`, `engagement.ts`, contact config, externalProducts/RealScout config, `PropertyHero.tsx`.
- `vite.config.ts`, sitemap generator, Tier B prerender script, `public/robots.txt`.
- No domain/DNS, Google settings, verification, redirects, database rows or permissions modified. No standalone Google HTML verification assets found in `public`; existing verification/configuration left as found, DNS ownership not reverified.
- `/` still has one H1, accurate updated route title/description, canonical **https://www.capitaldistrictnest.com/** and existing index/follow directive. Existing Organization/WebSite schemas preserved. Removed only the homepage's misleading RealEstateAgent schema; shared schema utilities and real-estate pages untouched.
- Existing route analytics loader remains single; no new pageview effect. New feed actions use existing first-party `logEngagement` with supported source/category/town dimensions. Directory submit keeps `regional_search_submit` with a length bucket and no raw text/null metadata (existing helper sends invalid nullable metadata, so the new surface calls the same existing sink directly). Browser-intercepted submit contained no raw personal/search string. No backend analytics schema/config changes.

## Checks actually run
- Harness preview build/type correctness: latest entries `build OK` (no manual production/sitemap build).
- Vitest: **23 passing tests** — 10 feed source/date/ordering/queue/edition safety tests, 4 directory-contract tests, 9 existing search-intent tests.
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
- `index.html` (metadata only; tracking untouched)
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
- `public/qa/nest-market-feed-report.md` (served copy of this QA report)
Persistent homepage design memory updated to the new explicit authorization; north-star retained.

Preview: https://id-preview--e7c28071-4ef6-4fc7-bc31-76811d0c9dba.lovable.app
Screenshots: `/qa/nest-market-feed-desktop.png`, `/qa/nest-market-feed-mobile.png`.
**Not published.**
