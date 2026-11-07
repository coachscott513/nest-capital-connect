# Restored four-pillar homepage — Nov 7, 2026

Structural baseline: `53ea47fe51d8c9ef91d3232e347de8c454b891f4`. Rejected replacement: `eb58dd413134cfda3ae71763866c5ceaeb49b43e`.

Runtime files changed: `src/components/home/DirectoryEditorialHome.tsx` and `src/index.css` only. Restored baseline section map/content/destinations, removed cards/tab state/showcase styles, kept functioning current frosted chrome/dock. Eased localized scrims and restored modest image lift; blue second-line emphasis with immediately visible, reduced-motion-safe entry treatment. Existing Troy, storefront, workspace, triplex and business-services photos retained without repeats or listing claims.

## Verified
- Exactly four `section.nest-editorial-feature` elements in sequence: `discover-businesses`, `grow-business`, `buy-sell-invest`, `business-services`. Each has its original h2/copy/primary CTA, and no journey cards/tablist/showcase remains. One search hero and one H1.
- Chromium 1440/390/320: each image loaded; each primary action >=44px, no horizontal page overflow, all four contents visible and no page errors. All four primary destinations asserted; secondary links restored directly from baseline.
- Real filtered coffee + Schenectady + Coffee submit at all three sizes reaches `/local?search=coffee&town=schenectady`, with actual Ambition Coffee results.
- RealScout disclosure opens/closes; existing widget container present. Coach outbound URL remains exactly `https://coachonemedia.com`.
- Reduced-motion at 390: entry animation `none`, all four heroes present.
- Existing tests: `bunx vitest run src/lib/homeDirectorySearch.test.ts src/lib/searchIntent.test.ts` — 13 passed. Existing Vite deprecation warnings appeared; tests passed.
- Harness compilation: latest build log `build OK`. No manually run full production/sitemap build or separate typecheck; no claims of those checks.
- Genuine desktop/mobile contact sheets composed of individual browser hero captures, each labeled; all four visually inspected. Actual mobile full-page Chromium capture is 390 × 5566, not a contact sheet. Fixed dock remains at the browser viewport's captured position in that full-page image.

## Preserved / not exercised
No lead submissions, record/database writes, routes, SEO, tracking, contact, calculator or integration changes. No bulk inner-page restyling or restore of the older rejected global redesign. Third-party RealScout results and lead delivery were not exercised. Header/dock functionality unchanged; no new modal/dock controls.

Preview screenshots:
- `/qa/nest-four-pillars-desktop.png`
- `/qa/nest-four-pillars-mobile.png`
- `/qa/nest-restored-home-mobile.png`

Preview only. Nothing published.