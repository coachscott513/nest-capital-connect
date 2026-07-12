## Phase 2 — Local Businesses Hub (/businesses only)

Scope is strictly limited to `src/pages/businesses/BusinessesHub.tsx` plus the small data files that feed it. Homepage, navigation, footer, header, and every other page stay frozen.

### What /businesses becomes

The visible home for the 25 founding business previews, organized so a visitor and a business owner both understand in five seconds what this platform is.

Section order, top to bottom:

1. **Editorial hero** — restrained typographic hero on onyx canvas. One eyebrow ("Local Businesses"), one headline ("The businesses that make the Capital District worth living in."), one subhead, two buttons: `Browse by Category` (anchor) + `Search Businesses` (`/local`). No differentiator strip — moves down.

2. **Currently Featured** — same label and treatment as the homepage rail. Up to 6 tiles pulled from `BUSINESS_SPOTLIGHTS` where `status === "published"`, plus any preview-ready entries flagged as `featured: true`. Each tile carries a status chip using the shared label vocabulary (see below).

3. **Browse by Category** — the existing six editorial photo tiles (Food & Drink, Home & Property, Professional Services, Health & Wellness, Automotive, Shopping/Creative/Community). No visual change; only tightened copy.

4. **Browse by Town** — existing 12-town grid, unchanged visually. Move above Recently Added so location-first visitors land quickly.

5. **Recently Added** — new section. Chronological rail of the newest previews (up to 8), sorted by a new `addedAt` field on the spotlight record. Each card shows status chip + town + category. Falls back to Currently Featured order if `addedAt` is missing.

6. **Spotlight Templates & Profile Previews** — new dedicated strip. Two example cards side by side, honest about what they are:
   - Spotlight Template — Roosevelt Room ("This is what a full editorial Spotlight looks like.")
   - Profile Preview — Cassone ("This is what an in-progress business preview looks like.")
   Each links to the actual page. This is the transparency section owners will read before deciding to claim.

7. **Browse All Businesses** — single wide card linking to `/local` with the full searchable directory. Short copy, one CTA.

8. **Owner CTA — Claim or Complete Your Profile** — replaces the current "Tell Your Story" block. Two buttons only:
   - Primary: `Claim Your Business` → `/claim-business`
   - Secondary: `Request a Spotlight` → `/business-spotlight-intake`
   Copy explicitly names the two paths ("Own one of the 25 featured businesses? Claim it. Not featured yet? Request a Spotlight.").

9. **Differentiator strip** — moved to bottom as a quiet trust bar (Original Stories, Owner Profiles, Local Photography, etc.). One row, muted.

### Status label vocabulary (single source of truth)

All chips on this page use exactly these four labels — no synonyms:

- `Spotlight` — full editorial feature (Roosevelt Room)
- `Profile Preview` — preview page drafted from public info (Cassone, most of the 25)
- `Coming Soon` — placeholder, no page yet
- `Claim Available` — profile exists but owner hasn't claimed

Chip styling: shared component, teal border for `Spotlight`, white/20 border for `Profile Preview`, white/10 for `Coming Soon`, gold `#c9a449` border for `Claim Available` (investor/owner-only accent per locked palette).

### Data changes

`src/data/businessSpotlights.ts`:
- Extend `BusinessSpotlight` with `addedAt?: string` (ISO date) and `label: "spotlight" | "preview" | "coming_soon" | "claim_available"`.
- Backfill existing entries (Roosevelt Room = `spotlight`, the four "coming soon" entries = `coming_soon`).
- Do NOT add the 25 previews in this phase — that is the next work item after /businesses ships.

### What is explicitly NOT touched

- `CleanHeader.tsx`, `Footer.tsx`, `Index.tsx`
- `BusinessCategoryPage.tsx` (category subpages)
- Any route registration in `App.tsx`
- `/local`, `/claim-business`, `/business-spotlight-intake`, `/business/*` pages
- Any global CSS token

### Verification

Playwright QA against the live preview at `/businesses`:
- Hero renders, both CTAs work, anchor scrolls to Categories.
- Currently Featured shows Roosevelt Room with `Spotlight` chip.
- Templates & Previews strip shows both Roosevelt Room and Cassone with correct chips and links resolve 200.
- Owner CTA buttons resolve to `/claim-business` and `/business-spotlight-intake`.
- Mobile 402px width: all sections stack cleanly, chips remain legible.

Screenshots saved for desktop + mobile before reporting done.

### After this ships

Freeze `/businesses`. Next work item is authoring the 25 preview pages and their `businessSpotlights.ts` entries — separate turn, separate scope.
