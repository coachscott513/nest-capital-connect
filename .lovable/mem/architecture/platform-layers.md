---
name: Platform layer terminology (LOCKED)
description: The four-layer stack — SearchAnythingLocal is the platform, Supabase is the shared backend, Capital District Nest is Region #1, Nest OS is the operating manual. Never conflate them.
type: preference
---
**The stack — do not conflate layers:**

1. **SearchAnythingLocal** — the platform and central admin/control layer.
   Where regions, towns, businesses, spotlights, partners, media, tiers are
   created and managed. Internal / operator-facing.
2. **Shared Supabase project** — the single backend (DB, auth, storage,
   edge functions) that every Nest region reads from. There is ONE regions
   table, ONE businesses table, etc. Every important row carries a
   `region_id` (or is joined to one that does).
3. **Capital District Nest** — Region #1's consumer frontend. Reads its
   region row by hostname via `useRegion()`. Never writes region config
   into its own codebase.
4. **Nest OS** — the operating playbook used by each regional team
   (region launch checklist, spotlight SOP, QR program, etc). Docs, not
   code. Lives in `docs/nest-os/`.

**Rules:**
- Never create a Capital-District-only table, config file, or admin
  surface that duplicates something SearchAnythingLocal should own.
- Region-scoped queries in the CDN frontend must filter by
  `region_id = <capital-district id>` (or by the resolved `useRegion()`
  row), never by hardcoded string.
- New admin/CRUD surfaces for regions/towns/businesses/spotlights/partners
  belong in SearchAnythingLocal, not in the CDN app. If we build one in
  CDN temporarily, mark it as "platform admin — move to SAL" so it isn't
  forgotten.
- The `regions` table is the source of truth for branding, tagline, logo,
  colors, default hero copy, default CTA, `realscout_id`, and
  `partner_pricing` for every region.

**Test before shipping any feature:**
> "Can SearchAnythingLocal launch Region #137 by inserting rows, without
> touching the Capital District Nest codebase?"
> If no → redesign.
