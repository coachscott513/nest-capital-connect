# Homepage QA — Nov 7, 2026

Scope: homepage component and scoped stylesheet only, plus design/architecture notes and genuine QA captures. No inner-route, record, contact, form, SEO, analytics, RealScout configuration or integration changes. The rejected global white/split redesign was not restored.

## Confirmed
- Compared against a fresh read-only Coach One Media screenshot: light frosted chrome, Geist, photographic stage, ice/white photo cards, electric-blue features and CTAs.
- Chromium at 1440/390/320: one H1, Geist 300 downloaded and used, no horizontal overflow or page errors.
- Four manual tabs change photograph/copy/blue statement and CTA to `/local`, `/business`, `/investment-properties`, `/professional-services`; arrow keys wrap selection. All four original anchor IDs remain.
- Search with coffee + Schenectady + Coffee uses the existing contract, yielding `/local?search=coffee&town=schenectady`; actual results include Ambition Coffee & Eatery. Homepage body styling clears on leaving the route.
- Mobile menu opens, Discover drill-down exposes existing category links, and menu closes. One visible dock retains existing internal/external destinations and attribution; bottom clearance remains unchanged.
- RealScout disclosure opens/closes and retains its widget container. Coach outbound link retains HTTPS, new tab and safe relationship attributes.
- Reduced-motion mode: showcase animation is `none`, photo transition duration `0s`.
- Existing unit tests: `bunx vitest run src/lib/homeDirectorySearch.test.ts src/lib/searchIntent.test.ts` — 13 passed.
- Harness preview build log reports `build OK` after changes.

## Not claimed
Full sitemap production build and separate manual typecheck were not run; the preview harness compiles changes automatically. RealScout third-party live search results, external destination completion, actual leads/conversions, hosted analytics and all inner pages were not exercised. No lead forms were submitted. No database writes or publication occurred.

Screenshots: `/qa/nest-coach-mobile.png`, `/qa/nest-coach-desktop.png`, `/qa/nest-coach-features-mobile.png`.