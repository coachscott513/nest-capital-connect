# Homepage browse navigation — November 24, 2026

Base: `31a662116ab30489e63158c3dcf526908cd958ad`. Preview only; no deployment or database mutations.

## Implemented
- Desktop scrollable/searchable town sidebar and mobile modal town selector with focus trapping, Escape/close, selection dismissal and trigger focus restoration.
- URL-backed town/view/type/search and independent source pages; context changes preserve town/search and reset pages. Latest excludes undated directory/rental records; Businesses/Rentals select Browse all directly.
- One main search, category controls plus quiet additional news/finance/sales/price-change selector. Existing lower contractor search, RealScout, ticker, finance dates, saved snapshots, source/agent credit and town badges retained.
- Shared existing business server query builder, synonym search, equivalent towns, exact counts and alphabetic 15-row pages. `/local` retains its existing query contracts and sort behavior.
- Active approved-link dated homes use exact-count server pages of 20. No import-preview inventory. Browse Homes excludes generic property stories. News/events/rentals have their own server pages and totals, not a first-100 cap.

## Actual records and browser checks
- Default Latest: 20 approved active homes, one approved Finance story, zero upcoming linked events; no business-profile section.
- Delmar/Bethlehem Businesses: 406 records (247 Delmar + 159 Bethlehem); pages 1–15 and 16–30 returned different records. Shared `coffee` search returned six actual records. Homes retained town and showed 7 Marion Road, $399,900.
- Scotia/Glenville Businesses: 417 records; switching Homes retained selection and showed 329 Butterfield Avenue, $80,000.
- Albany Homes: 806 Madison Avenue $399,900 and 98 Kent Street $340,000 with original November 23 dates and agent/brokerage credits.
- Rentals source inspection found 257 active public rental records, all lacking `available_date`. Browse uses those records, preserves existing masked street-number display and sourced agent/facts, labels missing availability honestly, and links to the existing `/rentals` directory. Albany has 53: pages 1–20 and 21–40 checked. All-towns page six returned 101–120 of 257; actual network requests used offset 100. No sale listings were relabeled rentals.
- Delmar rental browse is honestly empty; Rental search points to `/rentals`. Latest Rentals explains the absence of verified publication dates and offers Browse active rentals.
- Category/view changes preserve town and search; actual back/forward restored Businesses/Homes. Saved Kent row persisted and was removable. Contractor search navigated to `/local?search=plumber&town=delmar`, with no lead submission.
- Ticker pause/play works; reduced-motion computes `animation-name: none`. Original RealScout disclosure remains present.
- 1440×1000, 390×844, 320×844 × light/dark × normal/large: all 12 combinations had no horizontal overflow or page errors. Mobile town selection closed the dialog; Escape restored focus to Towns. Captures inspected in `/tmp/browser/feed-browse/`, including desktop-latest, desktop-businesses, responsive theme captures, drawer captures and 320-dark-large-rentals.
- 43 targeted tests passed: original 30 model tests, four directory URL tests, four state tests, five server inventory tests including range 100–119, synonym/alias reuse, active rentals and upcoming-event behavior. Preview compilation passed.

## Limits / preservation
- Rentals have no supplied individual public source links or publication dates; Details deliberately opens the existing rental directory, not an invented property page. Availability is not publication.
- No verified sale/price-change history or upcoming linked events is currently connected; these views are honestly empty. Tests use isolated query fixtures for unavailable event data and >100 homes, not production records.
- All means published site inventory, not complete MLS coverage. Mixed views merge the displayed source pages, with separately labeled exact source totals and pagination; chronological ordering applies to those displayed pages, not an invented unified backend index.
- No packages, integrations, auth/email changes, forms/lead submissions, production test accounts or database writes. Neutral index shell, Google tracking, security functions, shared public palette and non-homepage layout files remain unchanged.