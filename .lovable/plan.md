
# Category-First Business Discovery System

Turn Capital District Nest into a browsable editorial platform: 6 consumer-facing category groups → 54 category pages → up to 3 Spotlights per category → full directory + town cross-filter. Keep The Roosevelt Room as the locked premium template.

## 1. Data model

**New file: `src/data/businessCategoryGroups.ts`**
- 6 groups: Food & Drink, Home & Property, Professional Services, Health & Wellness, Automotive & Transportation, Shopping / Creative / Community.
- Each group has: `id`, `label`, `blurb`, `icon`, `categories: OfficialCategory[]`.
- Source categories from existing `src/data/officialCategories.ts` (no schema change).

**New file: `src/data/businessSpotlights.ts`**
- Manually curated list: `{ slug, businessName, category, town, summary, heroImage, hasVideo, profileRoute }`.
- Seed with The Roosevelt Room under `Restaurant`. Structure supports up to 3 per category; empty categories just show directory.

**New file: `src/lib/categorySlug.ts`**
- `categoryToSlug(OfficialCategory)` / `slugToCategory(string)` — reuse mappings from `src/lib/categoryDeepLink.ts` where possible.

## 2. Routes (add to `src/App.tsx`)

- `/businesses` → new `BusinessesHub` page (discovery hub).
- `/businesses/:categorySlug` → new `BusinessCategoryPage` (dynamic, one component handles all 54).
- `/stories` → new `StoriesHub` page (editorial index).
- `/business-spotlight-intake` → new `SpotlightIntake` form page.
- Keep `/business/the-roosevelt-room` as-is (canonical premium page).

## 3. New pages

**`src/pages/businesses/BusinessesHub.tsx`**
- Hero: eyebrow "LOCAL BUSINESS DISCOVERY", H1 "Explore local businesses by category.", subhead, CTAs (Browse Categories / Search Businesses → `/local`).
- 6 group sections, each with a headline + tile grid of that group's categories. Each tile links to `/businesses/:categorySlug` with icon + label + count (count pulled via lightweight Supabase count query or from `useDbBusinesses`).
- Footer CTA: "Own a business?" → `/claim-business` and `/business-spotlight-intake`.

**`src/pages/businesses/BusinessCategoryPage.tsx`**
- Reads `:categorySlug`, resolves to `OfficialCategory`. 404 fallback if unknown.
- Sections:
  1. Category hero (dynamic copy: "Capital District [Category]" etc.).
  2. **Capital District Nest Spotlights** — up to 3 cards from `businessSpotlights.ts` filtered by category. Header copy: "Three local businesses we're currently highlighting…". Cards link to `/business/:slug`. Explicitly no ranking language.
  3. **Explore more local [category] businesses** — reuse `BusinessDirectory` or a trimmed variant filtered by category (uses existing `useDbBusinesses` / `usePaginatedBusinesses`). Grid + list toggle; filters for town, claimed, featured.
  4. **Browse [category] by town** — town tile grid; each tile routes to `/businesses/:categorySlug?town=<slug>` (page reads `town` search param and applies).
  5. **Related categories** — 3–5 tiles from same group.
  6. Owner CTA (Claim / Request Spotlight).

**`src/pages/StoriesHub.tsx`**
- Public editorial hub with sections: Business Spotlights, Food & Drink, People, Homes, Town Life, Weekend, New & Notable, Community.
- Business Spotlight cards link to canonical `/business/:slug` (no duplicate content).
- v1 pulls from `businessSpotlights.ts` + existing `useMediaStories`. Non-business sections can start empty with placeholder cards.

**`src/pages/business/SpotlightIntake.tsx`**
- Form fields per spec. On submit, insert into a new lightweight table OR reuse existing `partner_inquiries` with a `type=spotlight_intake` marker (prefer reuse — no migration this pass).
- Required approval checkbox: "I confirm that I own or have permission to provide the submitted photos, videos, logos, and business information for use by Capital District Nest."
- Confirmation screen with the exact copy from the spec.

## 4. Navigation

Update `src/components/CleanHeader.tsx`:
- Ensure top-level items: Discover, Homes, **Businesses** (→ `/businesses`), Communities, Neighborhoods, Events, **Stories** (→ `/stories`), Local Resources, **For Businesses**.
- Preserve existing routes; only relabel where safe.

Update `LocalGuideSection.tsx` category tiles to link into `/businesses/:categorySlug` instead of static labels (small, additive).

## 5. Spotlight seed content (Phase 1)

Seed `businessSpotlights.ts` with placeholders for the 5 proof cases requested:
- Restaurant: The Roosevelt Room (real, live).
- Coffee, Contractor, Professional Service, Wellness: placeholder entries with `status: 'coming_soon'` so cards render an "In production" state and link to intake form. No fake business names — use "Spotlight coming soon" cards with a Nominate CTA.

## 6. Locked premium template

Extract a small `PremiumBusinessTemplate` note in `src/pages/business/RooseveltRoom.tsx` header comment listing required sections (hero, actions, editorial intro, Known For, First-Timers, Team, Gallery, Reel, Instagram/Facebook cards, Seasonal, Plan Your Visit, Related, Claim CTA). Do not refactor the page — the comment locks the pattern for future duplicates. Full componentization is a later pass.

## 7. Out of scope this pass

- QR asset generator (data model supports it via `profileRoute`; generation later).
- Spotlight lifecycle states table (`invited`, `questionnaire_sent`, …). Recorded in intake row for now; formal state machine later.
- Building the other 4 real Spotlight pages — those come after real business questionnaires.
- Admin CMS for Spotlights (still manual via `businessSpotlights.ts`).

## Technical details

- Category slugs: kebab-case of `OfficialCategory`, resolver reuses `src/lib/categoryDeepLink.ts` maps.
- Business fetching: existing `useDbBusinesses({ category, townSlug, limit })` — extend if needed to accept category filter (currently supports it via `subcategory`/free-text; verify and add explicit `category` param if missing).
- Design tokens: dark navy `#0B0F19`, teal `#5eead4`, glass cards — matches locked global dark canvas. No new colors.
- SEO: each category page emits `Helmet` with dynamic title/description, canonical `/businesses/:slug`, filtered `?town=` variants `noindex,follow` (mirrors `LocalPage.tsx` pattern).
- No DB migration required for v1.

```text
/businesses
   ├── hero + 6 group tiles
   ├── /businesses/restaurants
   │      ├── hero
   │      ├── 3 Spotlights (Roosevelt Room + 2 coming soon)
   │      ├── directory (filtered)
   │      ├── by-town tiles
   │      └── related categories
   ├── /businesses/coffee    …
   └── /businesses/hvac      …
/stories  → surfaces /business/:slug (canonical)
/business-spotlight-intake  → owner questionnaire
```
