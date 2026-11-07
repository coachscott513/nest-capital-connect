# Additive hero motion and service map QA — Nov 7, 2026

Baseline: `8d0207f393dec61ed6222b8ed46391b94ecf42d9`. One search hero + four separate photographic pillars preserved. No card/tab replacement, new top-level section or integration.

Runtime files: `DirectoryEditorialHome.tsx`, `useHomepageEntry.ts`, `NestServiceMap.tsx` under `src/components/home/`, and `src/index.css`. Architecture/style notes and roadmap updated.

## Checks actually run
- Chromium 1440/390/320: four exact pillar section IDs, one H1, no journey cards/tablist/showcase; images loaded, original primary destinations and actions >=44px, no horizontal overflow or page errors.
- Four service map link URLs asserted: `/claim-business`, `https://coachonemedia.com`, `/professional-services`, `/investment-properties`. All nodes >=44px. Keyboard Tab focuses Coach node and highlights corresponding blue path. External link has safe new-tab attributes and explicitly names Coach One Media.
- At 100ms after entry, sampled label opacity ~0.56 and later stages ~0.30; computed delays 0/90/180/270/360/450ms. Mid-entry screenshot captured. After completion all text opacity 1; rescroll does not restart entry. Search form/input/filters never receive entry animation.
- Map paths draw once with 1.4s duration and 180ms staggering. Final captures waited 2.3s so every path/node is rendered. Responsive diagram uses branches beside link rows, below original message on phones. Desktop map occupies free photo area alongside prominent original CTA.
- Observer unavailable and new homepage observer constructor failure tested: all four heroes/text visible and paths dash offset zero. Reduced-motion: all text visible and no entry animation.
- Captured default DOM rendered in a JavaScript-disabled browser retains four heroes. Direct JavaScript-disabled Vite SPA route was NOT established as functional; React mounting still requires JavaScript. CSS default is visible, not hidden pending observer.
- Real coffee + Schenectady + Coffee search at all three widths yields `/local?search=coffee&town=schenectady` and actual Ambition Coffee results. RealScout disclosure opens/closes with existing widget container.
- `bunx vitest run src/lib/homeDirectorySearch.test.ts src/lib/searchIntent.test.ts`: 13 passed. Existing Vite deprecation warnings only.
- Latest preview harness compilation: `build OK` after scoped stylesheet repair. Full production/sitemap build and separate typecheck not manually run.

## Captures visually inspected
- `/qa/nest-dynamic-pillars-desktop.png`: labeled browser contact sheet of all four heroes.
- `/qa/nest-dynamic-pillars-mobile.png`: labeled browser contact sheet of all four heroes.
- `/qa/nest-service-map-mobile.png`: closeup showing all four nodes.
- `/qa/nest-staged-entry-mobile.png`: actual mid-reveal capture.

No leads submitted, records mutated, backend/API changes, publishing or deployment. RealScout results, external completion and lead delivery remain untested. Existing navigation, dock, contacts, SEO, analytics, inner pages and calculator logic untouched.