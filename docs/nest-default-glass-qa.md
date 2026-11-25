# Default glass homepage — Nov 25, 2026

## Scope and files
- `src/components/feed/MarketFeedHome.tsx`: glass class is now the normal homepage default; existing stored dark/larger-text settings remain authoritative.
- `src/components/feed/FeedBrowse.tsx`: replaces only top featured table with photo tiles. Existing Featured selection/exclusion, counts, feed pagination, filtering and callbacks retained.
- `src/components/feed/FeaturedPhotoListings.tsx`: responsive tiles, native in-page modal, explicit Tab loop, Escape/backdrop/close dismissal, focus restoration, original facts/date/source and direct agent links, shared save callback.
- `src/components/feed/featuredPhotos.ts`: safe live photos first, exact UUID-only approved fallbacks and secondary MLS destinations.
- `src/components/feed/feedModel.ts`, `useBrowseInventory.ts`: fetch/adapt nullable `photo_url`; existing eligibility, ordering and refresh cadence unchanged.
- `src/index.css`, `src/components/feed/glassPreview.css`: homepage-scoped semantic glass tokens, light/dark surfaces, reduced motion/transparency and no-blur fallback. Existing shared public palette navigation overrides handled only inside `.nest-feed.feed-glass`.
- `src/assets/listings/jack-drive.webp.asset.json`, `skidmore-drive.webp.asset.json`: CDN pointers to optimized approved imagery. Full image content retained; dialog uses contain, not cover. Tile has the approved crop. Jack Drive retains example-finishes labeling and visible original Global MLS watermark.
- `src/components/feed/featuredPhotos.test.ts`, `browseInventory.test.ts`: exact UUID, live-photo precedence, safe URLs, MLS fallback and selected photo field tests.
- `AGENTS.md`, `roadmap.md`, this QA note: updated architecture and verification.

## Real preview browser verification
Anonymous live-data preview at localhost, widths 1440, 390 and 320:
- Two real flagged listings above Towns/Categories; six ordinary Latest rows. Two equal-width tile columns on phones; no sideways overflow in normal or dark/larger text.
- Both images load from the project asset URLs. Both photo and address normal clicks open same-page modal without navigating. Dialog images are uncropped (`object-fit: contain`).
- 19 Jack Drive: $576,120; Halfmoon; John W Mesko · Coldwell Banker Prime Properties; listed Nov 23, 2026; 3 beds · 2 baths · 1,550 sq ft; Example finishes.
- 20 Skidmore Drive: $389,000; Saratoga Springs; Barbara L Kenison · Coldwell Banker Prime Properties; original Nov 19, 2026 date/facts retained.
- Agent CTA/source/photo hrefs remain exactly the actual approved direct URLs:
  - https://john-mesko.coldwellbankerprime.com/p/19-Jack-Drive-Mechanicville-NY-12118/dmgid_190892828
  - https://barbara-kenison.coldwellbankerprime.com/p/20-Skidmore-Drive-Saratoga-Springs-NY-12866/dmgid_190840344
- Escape, close button and backdrop dismissal verified. Focus restores to the photo/address opener; 14 consecutive Tabs remain contained. Save/unsave updates both tile and dialog; saves survive reload on same device.
- Halfmoon filters to one featured item; Coldwell Banker Homes filter shows both; neither repeats in ordinary results. Businesses/Saved hide the featured section.
- Emulated reduced transparency produces opaque surfaces/no backdrop blur; reduced motion removes dialog animation. Dark variant remains legible. Shared navigation has an existing 300ms color transition; inspected after settling, and disabled within this scope for reduced motion.
- Forced image failures produce neutral address treatment, not fabricated photos; no overflow at 320.
- Screenshots inspected for desktop, phone, dark/larger text, dialog, reduced transparency and missing-image treatment. No screenshots committed. No page errors in the main verification.

## Checks and limitations
- All 118 existing/new tests passed across 12 files using `bunx vitest run`.
- Automatic preview compilation reports `build OK`; no manual production build was run because this environment delegates builds to the harness. Production deployment/prerender output remains unverified until the owner deploys.
- `git diff --check` passed. No schema/record writes, changes to sourcing/IDX/automation, unrelated routes/SEO, or publishing.
- Native modal checked in Chromium; Safari/Firefox are not independently verified. Existing agent destinations were checked as hrefs without navigating to/send forms on those external sites.
- The offline HTML reference is unchanged and is not a data source. Approved fallback assets are CDN-hosted, not embedded binary files in source.