# Project Memory

## Core
- Public identity (LOCKED): Capital District Nest is an independent regional media platform. Scott Alvarez appears ONLY on real-estate surfaces (Homes, property pages, RealEstateDisclosure). Editorial bylines/business/marketing = "Capital District Nest Editorial Team". See `mem://preferences/platform-vs-founder-identity`.
- Global contacts (LOCKED): ALL public phone/email from `src/config/contact.ts`. Business phone = (518) 981-2248 (Follow Up Boss). Emails: hello@ (general), media@ (editorial), business@ (partnerships), support@. NEVER hardcode a phone or email. Scott's line (518) 522-7265 = real estate only, via `SCOTT_*` constants.
- Brokerage identity (LOCKED): NEVER globally. Rendered only via `<RealEstateDisclosure />` on real-estate routes. Config in `src/config/realEstateDisclosure.ts`, `disclosure_active: false` until broker approves wording. NO RE/MAX or Coldwell Banker in footer/homepage/businesses/stories.
- Brand colors (LOCKED): Teal #0d6e66 primary, Charcoal #0e0f12 dark bg, Gold #c9a449 investor-only, Red #DC1C2E CALL BUTTON ONLY. NO blue anywhere. Cream #f5efe4 is DEPRECATED as a default — only allowed inside print/report surfaces.
- GLOBAL DARK CANVAS (LOCKED): `--background` token is dark onyx #0B0F19 site-wide. Card surface #1E2230, hairline border #2D3748, muted text white/65, on-dark eyebrow teal #5eead4. Light sections only by explicit opt-in.
- Platform stack (LOCKED): SearchAnythingLocal = platform/admin · Shared Supabase = backend · Capital District Nest = Region #1 frontend · Nest OS = playbook. Never conflate. Region config lives in shared `regions` table, read via `useRegion()`.
- Search: Route all home-search CTAs to `/homes/search`, `/homes/search/:townSlug`, `/homes/listings`, or `/investment-analyzer`. NO remax.com / scottalvarez.remax.com / BoldTrail links.
- Maps: Use plain Leaflet API. NEVER use react-leaflet due to React 18 version mismatch.
- Lead Capture: Unified 'leads' table. Name, Email, Phone are ALWAYS mandatory.
- DB: Use `listings` and `rentals` tables. `properties` is legacy; ignore it.
- Security: `analyzer_leads` and `leads` SELECT restricted to service_role. Max 3 req/min on Edge Functions.
- Voice: "Human-First" answer engine. Use "Run the Numbers", not "Analyze Yields".
- HeroBand surfaces collapse to TWO only: DARK (#0e0f12 + teal #5eead4) or LIGHT (white + teal #0d6e66). No new color moods.
- Floating contact: ONE global component only — `<FloatingLiveAgent />` mounted in App.tsx.
- Header right cluster: International link + Get Started (opens AnalystCard modal). NO languages dropdown.
- Hero (homepage): "Capital District Nest" + "The weekly pulse of real estate, local businesses, and life in the Capital District." CTAs: "What's Happening This Week" + "Explore Towns".
- Weekly feed: hand-curated, edit `src/data/weeklyFeed.ts` weekly. Cards only, NEVER a ticker.
- Brand hierarchy: Consumer-facing = "Capital District Nest". "SearchAnythingLocal" is platform/investor-only — footer/investor/admin only. NEVER on hero, homepage, town pages, /local, /claim-business.
- Location accuracy (LOCKED): Every business/entity page uses EXACT municipality + neighborhood + county + state. Never borrow the nearest famous city.
- No fabricated content (LOCKED): Never publish fictional people, invented ratings/awards, reused headshots, or AI-generated histories. Beautiful > Complete.

## Memories
- [Platform layer terminology (LOCKED)](mem://architecture/platform-layers) — SAL = platform/admin, Supabase = shared backend, Capital District Nest = Region #1 frontend, Nest OS = playbook. Never conflate.
- [Nest Platform — multi-region](mem://architecture/nest-platform-multi-region) — Prime directive: every feature must launch Region #137 from data, not code. Regions table + useRegion() are the pattern.
- [Brand Color System (LOCKED)](mem://style/brand-color-system-locked) — Exact hex tokens and strict usage rules.
- [Apple Button + Typography System (LOCKED)](mem://style/apple-button-typography-system) — Use `.btn-primary-apple` / `.btn-dark-cta` / `.btn-secondary-apple` and `.h-hero`/`.body-apple`/`.eyebrow-apple`.
- [Apple Interaction Layer (LOCKED)](mem://style/apple-interaction-layer) — Use `<Reveal>`, `<RouteFade>`, `.nav-frost`/`.nav-transparent`, `.dropdown-panel`, `.lift-hover`.
- [National Analyzer Ecosystem](mem://architecture/national-analyzer-ecosystem) — Dual-brand SaaS strategy.
- [Design System & Brand Palette](mem://style/design-system-and-brand-palette) — Tiered color system, map styling.
- [Investment Analyzer Formulas](mem://features/investment-analyzer-financing-types) — Financial formulas for 7 loan types.
- [React Leaflet Compatibility](mem://constraints/react-leaflet-compatibility) — Must use plain Leaflet API.
- [Lead Capture Standardization](mem://features/lead-capture-standardization) — All forms route to unified 'leads' table.
- [Security Hardening & RLS](mem://architecture/supabase-security-policies) — RLS, check constraints, rate limiting.
- [SEO & Schema Architecture](mem://architecture/seo-technical-framework) — Sitemap, canonical routing, JSON-LD.
- [Database Schema Context](mem://database/schema) — Primary operational vs legacy tables.
- [Brand Voice & AEO Strategy](mem://brand/human-first-voice-and-aeo-strategy) — Human-first terminology and AEO focus.
- [Regional Investment Metrics](mem://market/investment-performance-metrics-capital-district) — Official achievable returns.
- [IDX Search Strategy](mem://integration/idx-search-strategy) — Direct RE/MAX IDX links only.
- [Weekly Feed System](mem://features/weekly-feed-system) — Hand-curated cards. Edit `src/data/weeklyFeed.ts`.
- [Brand Hierarchy CDN vs SAL](mem://brand/brand-hierarchy-cdn-vs-sal) — CDN consumer / SAL platform.
- [Category Taxonomy: Healthcare & Dental](mem://features/category-taxonomy-healthcare-dental) — First-class verticals.
- [Location Accuracy Policy](mem://editorial/location-accuracy-policy) — Exact municipality/neighborhood rules.
- [No Fabricated Content](mem://editorial/no-fabricated-content) — Verified sources only; coming-soon patterns.
- [Brokerage Disclosure Isolation](mem://preferences/brokerage-disclosure) — Neutral platform globally; brokerage identity only via `<RealEstateDisclosure />` config.
- [Spotlight Page States (LOCKED)](mem://editorial/spotlight-page-states) — Business pages publish as template/preview/owner_review/verified/published. Badge, no fake imagery, no invented team. Roosevelt Room = canonical template.
- [Platform vs Founder Identity (LOCKED)](mem://preferences/platform-vs-founder-identity) — Capital District Nest is the public identity. Scott Alvarez only on real-estate surfaces. Centralized `src/config/contact.ts`.
