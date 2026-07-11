# Nest OS — Region Launch Playbook

> Every Nest region uses the same codebase. Launching Region #N should be:
> **insert a row → import towns → import businesses → import stories.**
> No file copying. No route rewrites. No rebuilt pages.

This playbook documents the *actual working pattern* proven on Region #1
(Capital District Nest). Update this doc whenever the pattern changes — it
should always reflect reality, not theory.

---

## 1. The `regions` table (source of truth)

Every branding, tagline, hero, and default-CTA value for a region lives in
one row of `public.regions`.

Key columns:

| column                  | purpose                                                       |
| ----------------------- | ------------------------------------------------------------- |
| `slug`                  | Stable identifier (e.g. `capital-district`). URL/lookup key.  |
| `name`                  | Consumer brand name (e.g. `Capital District Nest`).           |
| `domain`                | Production hostname (`www.capitaldistrictnest.com`).          |
| `logo_url`              | Public URL of the region logo (nullable).                     |
| `hero_image_url`        | Optional hero background.                                     |
| `primary_color`         | Region primary (hex).                                         |
| `secondary_color`       | Region accent (hex).                                          |
| `font_family`           | Default font family.                                          |
| `tagline`               | One-line region tagline.                                      |
| `default_hero_title`    | Homepage hero H1.                                             |
| `default_hero_subtitle` | Homepage hero sub-copy.                                       |
| `default_cta_label`     | Homepage primary CTA label.                                   |
| `default_cta_href`      | Homepage primary CTA target.                                  |
| `realscout_id`          | RealScout / IDX id for home search.                           |
| `partner_pricing`       | JSON of per-region Featured Partner pricing.                  |
| `launch_status`         | `draft` · `pilot` · `live` · `paused` · `archived`.           |
| `sort_order`            | Display order in any region picker.                           |

RLS: public read for `launch_status IN ('pilot','live')`. Writes are
admin-only via the `has_role(auth.uid(), 'admin')` policy.

---

## 2. `useRegion()` resolution order

`src/hooks/useRegion.ts` is the *single entry point* for region data. Every
surface (Footer, Header, Hero, Hub, Town template, Partner pricing block,
RealScout embed) reads from here — never hardcodes.

Resolution order on mount:

1. **Domain match** — `regions.domain = window.location.hostname`.
   Production multi-region routing (each region gets its own hostname).
2. **Slug fallback** — `regions.slug = 'capital-district'`.
   Used on `localhost`, Lovable preview, or any host that has no matching
   region row yet.
3. **In-memory `DEFAULT_REGION`** — hardcoded fallback so the UI never
   renders blank if Supabase fails or the row is missing. Values mirror the
   seeded `capital-district` row so first paint is stable.

Consumers get `{ region, loading }`. Use `region` directly — the default
values are always safe to render, so no loading gate is needed for simple
text swaps.

---

## 3. The migration pattern (proved on the Footer)

The Footer is the first end-to-end proof. Pattern to reuse on every
subsequent surface:

```tsx
import { useRegion } from '@/hooks/useRegion';

const MyComponent = () => {
  const { region } = useRegion();
  return (
    <>
      {region.logo_url && <img src={region.logo_url} alt={`${region.name} logo`} />}
      <h1>{region.name}</h1>
      <p>{region.tagline ?? 'Sensible static fallback copy.'}</p>
    </>
  );
};
```

Rules:

- **Never** hardcode the region name, tagline, logo, domain, hero copy, or
  default CTA. Read from `useRegion()`.
- **Always** provide a static string fallback with `??` for optional
  fields — keeps first paint stable even if a region row is incomplete.
- **Do not** gate the whole component on `loading`. The default region
  covers the initial render.
- **Colors are LOCKED tokens** for Region #1 — they flow through the row
  but Region #1's `primary_color` / `secondary_color` must match the
  locked brand tokens documented in project memory. New regions may
  diverge; components should read colors through the design system, not
  inline styles.

---

## 4. Progressive migration order

Migrate surfaces one at a time. Verify Region #1 still renders correctly
after each step before moving on.

1. ✅ **Footer** — brand name, tagline, logo, copyright. *(Done — Region #1.)*
2. Navigation branding (header logo + wordmark).
3. Homepage hero (title, subtitle, primary CTA).
4. Business hub (region name in intro copy + meta).
5. Town templates (region name in breadcrumbs + SEO title).
6. Partner pricing (read from `partner_pricing` JSON).
7. RealScout / IDX embed (read `realscout_id`).

---

## 5. Launching Region #N

Once every surface above reads from `useRegion()`, launching a new region
is a data operation, not a code change:

1. **Insert a row** into `public.regions` with the new region's slug,
   name, domain, colors, tagline, and default hero/CTA copy. Start in
   `launch_status = 'draft'`.
2. **Point the domain** at the same Lovable deployment. The hostname
   match in `useRegion()` will route the entire site to the new row.
3. **Import towns** into `public.towns` scoped to the new region.
4. **Import businesses** into `public.businesses` scoped to the new
   region.
5. **Import stories / media** into `public.media_stories` scoped to the
   new region.
6. Flip `launch_status` to `pilot`, verify end-to-end on the live
   hostname, then flip to `live`.

If any step above requires editing a `.tsx` file, that is a bug in the
platform — file a task to move the hardcoded value into the `regions`
row (or into a related per-region table) and update this playbook.

---

## 6. Test — "Can this launch Region #137 without Scott?"

Before merging any new feature, apply the prime directive:

> **This feature must be reusable across every Nest region and
> configurable through data, not code.**

If the answer to *"Can this launch Region #137 without Scott?"* is no,
redesign it before shipping.
