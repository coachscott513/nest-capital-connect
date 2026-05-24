# Capital District Nest — "Local Operating System" Redesign Plan

This is a large multi-week scope. Shipping it in one pass would break the live site (SBA demo tomorrow). I'm proposing a **phased build** so each phase is demo-safe on its own.

## Guiding rules (locked across all phases)
- Strict monochrome: black, white, soft grays, glass blur. Teal (#0d6e66) kept ONLY as the brand dot per locked color memory — no new accents.
- Typography: existing `.h-hero` / `.body-apple` / `.eyebrow-apple` system (locked). Larger hero sizes, tighter tracking.
- Motion: existing `<Reveal>`, `lift-hover`, `nav-frost` system. Add subtle parallax + opacity-only hovers.
- No business-logic changes. Frontend/presentation only unless a phase explicitly touches Supabase.

---

## Phase 1 — Homepage hero + Towns (ship first)
**Files:** `src/components/CinematicHero.tsx`, `src/pages/Index.tsx`, new `src/components/home/TownsGridPremium.tsx`

- Rebuild hero: full-bleed monochrome image, soft black overlay, centered cinematic headline "The Capital District, Reimagined.", subhead, and **two side-by-side glass search cards** (Homes / Local Businesses). Stacks on mobile.
- New premium Towns grid below hero: 8 large editorial tiles (Albany, Troy, Saratoga, Delmar, Colonie, Clifton Park, Schenectady, Bethlehem) with monochrome image, glass overlay, town name, micro-stats (placeholder), hover zoom + blur.

## Phase 2 — Local Businesses promoted + Local Pulse
**Files:** `src/components/local/BusinessDirectory.tsx` (reuse), new `src/components/home/LocalPulseFeed.tsx`, `src/pages/Index.tsx`

- Move Businesses section up directly under Towns. Add large Apple-style search bar + chip filters (Restaurants, Coffee, Real Estate, Fitness, Home Services, Legal, Health, Shopping). Editorial cards (not Yelp).
- New "The Local Pulse" feed section: clean monochrome rows (date · category · headline). Town filter chips. Pulls from `town_ledger` table (already exists, publicly readable).

## Phase 3 — Market Intelligence visualization + Dual Nav
**Files:** new `src/components/home/MarketIntelligence.tsx`, `src/components/CleanHeader.tsx`

- Minimal gauges/heat indicators (Buyer / Balanced / Seller) per town. SVG, monochrome.
- Header: add subtle segmented `[ For Residents ] | [ For Businesses ]` pill. Toggles which dropdown set shows. Does not break existing nav links.

## Phase 4 — Business Profile editorial pages
**Files:** new `src/pages/BusinessProfile.tsx`, route added to `src/App.tsx`

- Editorial hero (monochrome image, overlay, name/category/tagline, Website/Call/Directions/Share).
- Sections: About · Services · Local Connection · Gallery · Related. Data wired to `local_voices` table.

## Phase 5 — Claim Business polish + global micro-interactions pass
**Files:** `src/pages/ClaimBusiness.tsx`, `src/index.css`

- Glass form styling, premium button animation. Minimal fields only.
- Global pass: fade-ins on every section via `<Reveal>`, lift hovers, animated underline on links.

---

## What I'd ship TONIGHT (pre-SBA)
**Phase 1 only.** It delivers the visible "wow" — new hero + premium town tiles — without touching backend, profile routes, or the existing demo flows. Phases 2–5 follow after the meeting.

## Open question
**Confirm Phase 1 as tonight's scope?** Or do you want me to push further (Phase 1 + 2) and risk a longer build window? Phase 1 alone is ~30–45 min and is the highest-impact slice for the screen share.
