This is a 10-section system-wide overhaul. Before I write thousands of lines, I want to confirm scope and sequencing so we don't waste a build cycle. Here's the proposed execution plan.

## Phase 1 — Town Template Restructure (`TownPageTemplate.tsx`)

Apply to all `/living-in/:slug` routes (Delmar, Saratoga, Troy, Albany, Clifton Park, Schenectady, and any others).

1. **Hero copy** — Replace "Tree-lined streets…" / "What it feels like…" with `Discover {Town}.` + one-line subhead.
2. **Discover Bento Grid** — 4–6 asymmetric modules per town: Morning Routine, Neighborhoods, Community, Schools, Local Businesses, Market Snapshot. Pulls from existing `townOverrides` data (dining, culture, ribbon stats) — no new DB.
3. **"This Week in {Town}"** — Replace "What it feels like to live here." Reuses `weeklyFeed.ts` filtered by town tag; modules: farmers markets, town events, school events, library, business openings, market movement.
4. **"Why People Move to {Town}"** — Keep concept, convert paragraph → 6–8 scannable bullet rows.
5. **"Local Sports & Community"** — Delete fake scores. Replace with YMCA/youth programs/rec/gyms/school athletics + "Submit Your Team or Program" CTA → opens lead modal.
6. **"Local Buyer Resources"** (renamed from Make the Numbers Work) — 3 columns: Buying a Home / Property & Ownership / Investing. Each is a link list to existing routes (`/first-time-buyer-guide`, `/grants`, `/financing`, `/investment-analyzer`, etc.).
7. **CTA wiring** — Every primary CTA (Connect with Specialist, Talk to Scott, Ask About This Town, Explore Homes) opens the global Live Agent (`AnalystCard` modal).

## Phase 2 — Town Imagery System

Create `src/data/townVisuals.ts` as the single source of truth: `{ slug: { hero, why, bento: {...} } }`. Backfill `townOverrides` to read from it. Reuse existing local photos in `public/assets/towns/`; generate any missing town heroes (Clifton Park, Cohoes, Watervliet, Guilderland, Colonie, Niskayuna, Rotterdam, Glenville, East Greenbush, Ballston Spa, etc.) as needed in batches via `imagegen`. Add a build-time fallback so any unmapped town renders a neutral regional photo (never NYC/Toronto).

## Phase 3 — `/communities` Master Index Rebuild

Full Apple dark-mode regional directory grouped by county. Add the missing counties:

- **Existing**: Albany, Saratoga, Rensselaer, Schenectady (expand town lists to match the master list)
- **New**: Schoharie, Fulton, Montgomery

Each county = card section with town rows: `name · median price · → arrow` linking to `/living-in/{slug}`. Towns without a dedicated page link to a lightweight `LivingInTown` route that renders `TownPageTemplate` with sensible defaults (no 404s). 4-col desktop / 2-col tablet / 1-col mobile accordion.

## Phase 4 — Hero Search Ticker Fix

Find ticker component, apply `w-full overflow-visible flex-nowrap whitespace-nowrap`, mobile `text-sm md:text-base`. Verify no clipping on 888px viewport.

## Phase 5 — Global CTA Audit

Sweep `TownPageTemplate` + homepage for dead-end buttons; route all major CTAs to `<AnalystCard>` trigger or `/dealdesk`.

## Technical Notes

- No new DB tables. All content rides on `townOverrides.ts`, `weeklyFeed.ts`, `townVisuals.ts`.
- Brand-locked colors preserved (teal #0d6e66, charcoal #0e0f12, dark canvas #0B0F19, gold investor-only, red call-button-only).
- Apple typography utilities already in `index.css` (`.h-hero`, `.body-apple`, `.eyebrow-apple`, `.btn-primary-apple`, `.btn-dark-cta`) — reuse, do not invent.
- `<Reveal>` and `<RouteFade>` already global — apply for section entrances.
- No `react-leaflet`. No fake live data.

## Sequencing Question

This is roughly **6–10 build cycles** of work. I'd like to confirm priority before starting. My recommendation:

1. **Phase 1 first** (template restructure) — biggest visual/positioning lift, applies to all 6 live town pages at once.
2. Then Phase 3 (/communities expansion).
3. Then Phase 2 imagery (so the new bento has correct visuals).
4. Phases 4 & 5 in the same final pass.

If you approve, I'll start Phase 1 immediately in the next message and ship it as a single cohesive PR before moving to Phase 3.
