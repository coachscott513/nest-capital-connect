# Rental navigation follow-up — November 24, 2026

Base: `8f18aaa7e17a1ae21c655b1f115c42250d88777d` (retains the Apple-style header and homepage sidebar/browse work). No deployment.

## Rules and surfaces checked
Rental Details must open the selected active rental, retain masked addresses and existing form restrictions, and allow an easy return to the exact browse results. Saved rentals must survive reload without accepting unsafe links. Town links must carry the same view/type/search for ordinary and modified clicks.

- Read `useBrowseInventory`, `FeedBrowse`, and `FeedLine`: both rental headline and Details now open a homepage URL overlay preserving town, search, view, type and source pages. Save stores the narrow specific `/rentals?rental=<UUID>&town=<slug>` share link instead of the temporary homepage overlay URL.
- Read `MarketFeedHome` hydration: safe specific rental links survive reload; old generic `/rentals` snapshots upgrade only from a valid rental row UUID. Unsafe/protocol-relative/backslash URLs and invalid/extra/duplicate rental-link query parameters are rejected. Existing business and HTTP source links remain accepted.
- Read `RentalsHub` and `RentalDetailModal`: the standalone share URL mounts the same active-only detail loader without relying on the hub's 60-item teaser limit. Existing hub View Rental controls already select a specific active-fetched record; their behavior is retained. Both paths reuse the modal, original masked address, remarks/facts/agent fields and unchanged lead form. The existing schema has no rental agency field: no brokerage is invented. The modal now has a bounded scrolling height and an accessible title/description so its content is usable on narrow screens.
- Read `TownNavigation` and `browseState`: href uses the same state-update helper as normal selection; modifiers are not intercepted. All towns also preserves context and clears only town/pagination.
- Read `RentalVault`: its Apply control selects a specific active-fetched record, with a separate retained application flow; generic links are labeled Browse/View All, not specific Details. No change needed for the reported rule. Its legacy full-address display is outside this focused navigation task and was not changed.
- Read `CityRentalPage`, `HomesRentals`, and `RentalsSearchHub`: these are area/search/submitted-link destinations, not saveable feed rental detail rows. Their separate lead gates, search and permissions remain untouched. Existing search/budget query behavior on the legacy hub is outside this task.
- Searched rental references in `supabase/functions`: SEO wildcard handling and rental lead notifications are separate from browsing/saved links; no background ingestion, email, database function or permission changes were required or made. No settled records were changed.

## Actual browser results
- Signed-out read-only preview, real Albany rentals page two, network offset **20**, every rental read constrained to `is_active=eq.true`.
- Selected `4ed0e703-febb-4078-9947-fc1df56c24c9`: masked **A Pine Lane**, **$1,800/month**, **2 beds / 1 bath / 867 sqft**, **Stephanie Kilmartin**, original remarks/photo. No date or availability invented.
- Save → reload → Saved → reopen exact rental → Escape → exact `?town=albany&type=rentals&view=browse&page_rentals=1` results → unsave → reload: passed.
- Standalone `/rentals?rental=<same UUID>&town=albany` opened the same actual rental: passed.
- Real Ctrl-click on Troy opened a new tab at `/?town=troy&type=rentals&view=browse&search=Lane`, retaining search/view/type and resetting only page: passed.
- Malformed, empty and nonexistent UUID links show Rental unavailable. Isolated read-only no-active-match response fixture also shows unavailable; no inactive production rows queried or fixtures inserted.
- **1440×1000 / 390×844 / 320×844 × light/dark × normal/large**: all 12 combinations had no horizontal overflow, bounded scrollable details, reachable controls, and exact result URL restoration. Desktop, mobile light and 320 dark/large screenshots visually inspected after transitions settled.
- No page errors or database mutations observed. No forms submitted, emails sent, accounts created, packages added or deployment actions performed.

## Checks and screenshots
- **57 tests passed** across rental-link safety/hydration, exact active rental fetch, browse inventory/state, feed model and header URL contracts.
- Normal preview compilation: **build OK**. `git diff --check` passed.
- Screenshot directory: `/tmp/browser/rental-qa/`; final inspected examples: `final-desktop-details.png`, `final-390-light-normal.png`, `final-320-dark-large.png`. Browser evidence: `final-result.txt`.
- Historical `nest-home-browse-qa.md` deliberately retained; its old generic rental-link limitation is superseded by this follow-up.

## Preserved / limitations
Apple navigation, towns/sidebar, ticker, shared palette, source dates, directory/SEO/tracking/security and authentication requirements remain intact. Rentals still lack public external source links and supplied availability/publication dates; the existing modal's remarks truncation, fields and form behavior remain unchanged. Private report password provisioning remains the pre-existing owner task, unrelated to this request.