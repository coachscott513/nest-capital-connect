# Focused featured listing QA — November 25, 2026

## Delivery scope

Only actual listing records may carry editorial featured identity. Both feed listing reads now select the existing `public.listings.is_featured` boolean; `listingRow` maps strict `true` to optional snapshot metadata. Missing, null and false values remain ordinary. Active status, approved public URL, original listing date, chronological ordering, town queries, counts and pagination are unchanged. Generic Property stories cannot gain the highlight.

The shared row uses a pale-blue surface, an inset cobalt accent, and `Featured · New` / `Featured · Listed` in the existing badge position. No new line, hero, card, billing or payment language. On desktop the accent is full height; on mobile it occupies the existing inset town-label footprint so it never crosses the unpadded headline/date text. Dark and larger-text styles use semantic tokens. Both headline and Source remain direct public property links.

## Real record verification (read-only)

- Existing active approved record: **19 Jack Drive**, town filter `halfmoon`, supplied source **John W Mesko · Coldwell Banker Prime Properties**.
- Final read: `status = A`, approved URL true, `is_featured = false`. No database/schema changes or production data writes performed.
- Current supplied URL (not hard-coded into application code):
  `https://john-mesko.coldwellbankerprime.com/p/19-Jack-Drive-Mechanicville-NY-12118/dmgid_190892828`
- The URL says Mechanicville; the supplied listing municipality remains Halfmoon. Neither was relabeled.
- Filtered Browse example: `/?town=halfmoon&type=property&view=browse&search=19+Jack`
- Filtered Latest example: `/?town=halfmoon&type=property&search=19+Jack`
- After the owner supplies the flag and deploys, these filters use the same existing URL contracts. There is no featured-only filter or reordered placement.

## Browser verification

Preview origin: `http://localhost:8080`. Compared the same real record with false/true overrides confined to intercepted browser responses. No fake property, fixture route or browser script shipped in the application. An additional browser-only older-date override exercised the Listed identity.

Measured width and height equality for each ordinary/featured pair. Exact heights in CSS pixels:

| Viewport width | Normal text, ordinary = featured | Larger text, ordinary = featured |
| --- | ---: | ---: |
| 1440 | 76.5625 | 89.328125 |
| 390 | 198.875 | 207.171875 |
| 320 | 198.875 | 229.5625 |

All six pairs were repeated in dark mode with identical measurements. Zero horizontal overflow and zero page errors in the twelve combinations. Older Listed comparisons also matched: 1440 normal 76.5625, 390 normal 198.875, 320 larger 229.5625.

Visually inspected row screenshots at 390 light/normal, 320 dark/larger, 1440 dark/larger, plus older Listed, saved-reload and keyboard-focus captures. Badge, date, source, price and link text remained legible without overlaps.

Verified in real filtered Latest and Browse results:
- Unmodified false flag produces no highlighted row.
- Browser-local true flag highlights only that actual listing.
- Headline and Source hrefs agree with the supplied direct URL before/after highlighting.
- Keyboard focus is visible; Enter requests the exact direct property URL. The external destination request was fulfilled locally for navigation verification, not an independent inspection of the third-party property page.
- Saving the flagged row, reloading, opening Saved, and reading it back preserves the flag and direct href.
- Existing saved snapshots without the optional field remain usable and ordinary. Saved rows retain the existing snapshot behavior: later source flag changes do not retroactively rewrite previously saved snapshots; re-save from a current listing to refresh them.

## Tests and preview compilation

`bunx vitest run src/components/feed/` — **76 tests passed across 6 files**.

New coverage checks strict true/missing/null/false flag handling, unchanged provenance and ordering, inactive/unapproved rejection, generic-story exclusion, listing-select inclusion, and featured/legacy saved snapshot hydration. Existing category, town, exact-count paging, six-row pagination and rental regressions passed. Latest preview compilation signal: **build OK**. `git diff --check` passed. No manual build/typecheck run.

## Changed files

- `src/components/feed/feedModel.ts` — optional flag and listing-only identity guard.
- `src/components/feed/useMarketFeed.ts` — include the existing flag in the approved active listing read.
- `src/components/feed/useBrowseInventory.ts` — include the existing flag in server-paged homes/Latest reads.
- `src/components/feed/FeedLine.tsx` — existing badge/row treatment; direct hrefs retained; narrow the existing price check without a non-null assertion.
- `src/components/feed/marketFeed.css` — scoped highlighted row treatment without changing dimensions.
- `src/index.css` — light/dark semantic featured tokens only.
- `src/components/feed/feedModel.test.ts`, `browseInventory.test.ts`, `rentalLinks.test.ts` — focused regressions.
- `AGENTS.md` — adapter/snapshot architectural rule.
- `roadmap.md` — requested task completion.
- `docs/nest-featured-listing-qa.md` — this verification record.

No deployment requested or performed. The owner controls the production flag and subsequent deployment/public verification.