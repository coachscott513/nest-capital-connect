---
name: Discover Shelf (LOCKED)
description: /businesses category browsing is Apple TV-style horizontal, one huge card at a time — never a grid, never a filter panel. Each group has an editorial slogan.
type: design
---

The `/businesses` page presents categories as a horizontal `DiscoverShelf`, not a directory grid.

## Rules
- Section eyebrow reads "Discover" (not "Browse Categories" / "By Category").
- Cards scroll horizontally, snap-x, one big card per view (~78vw desktop, ~86vw mobile).
- Each card: full-bleed hero photo, cinematic bottom-left gradient, category label (small eyebrow), huge slogan (`text-4xl` → `text-7xl`), Explore →, category count.
- No grid. No filter chips. No search input inside the shelf.
- Clicking lands on `/businesses/:categorySlug` — the editorial category page, not a raw search grid.
- Every group in `businessCategoryGroups.ts` MUST carry a `slogan` field (Apple-product register: short, sensory, emotional).

## Slogan register
Examples currently in code — match this voice for any new group:
- Food & Drink → "Places worth lingering."
- Home & Property → "The people who keep the Capital District running."
- Health & Wellness → "Live well locally."
- Professional Services → "Trusted advice, close to home."

## Files
- `src/data/businessCategoryGroups.ts` — data + slogans.
- `src/pages/businesses/BusinessesHub.tsx` — `DiscoverShelf` component.
