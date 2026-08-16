# Protected /biz/* edge-case dispositions (private, internal)

Evidence pulled directly from `businesses` and `seo_protected_urls` on 2026-08-16.
No public content was fabricated for any record below.

## A. Enrichment queue — real active records, thin fields, restored via protected override

All four map to a real, `is_active = true`, `quarantine_status = none`,
`record_status = active` row. Each has a real name, locality and category, but
**no address, phone or website on file**, so they fail the shared quality floor
by contact facts only. Slug, canonical and indexability are preserved unchanged;
they are included in the sitemap and Tier B output through
`scripts/seo-protected-overrides.json`.

| Slug | Name | Locality | Category | Missing |
| --- | --- | --- | --- | --- |
| `altamont-heating-air-conditioning--9zhnuke` | Altamont Heating & Air Conditioning | Schenectady, NY | HVAC | address, phone, website, description |
| `bostick-realty-llc-5lvdeeoy` | Bostick REALTY LLC | Schenectady, NY | Marketing | address, phone, website, description |
| `emf-electrical-services-llc-pvpgzfwu` | EMF Electrical Services LLC | Schenectady, NY | Electrician | address, phone, website, description |
| `mocker-bros-farms-widqkwf0` | Mocker Bros. Farms | Bethlehem, NY | Home Service | address, phone, website, description |

Action required (private, human-verified only): source address/phone/website
from the business itself or an authoritative public listing, then remove the
slug from the override list once it passes the floor naturally. Do not generate
descriptions, hours, ratings or imagery.

## B. Resolution hold — `the-perfect-blend-cafe`

- No `businesses` row matches this slug by exact match, alias, normalized name
  or prior slug.
- Nearest real record: **Perfect Blend Cafe & Bakery**, Delmar, canonical slug
  `perfect-blend-cafe-bakery-delmar` (active, non-quarantined).
- Disposition: **held**. Excluded from the sitemap and from Tier B output. No
  synthetic page, no LocalBusiness schema, no invented identity. The route
  resolves through the neutral public SPA shell and `BizPage` returns
  `noindex, follow` after it fails to resolve.
- Reviewable proposal (NOT applied): once the founder confirms the two refer to
  the same business, add a 301 from `/biz/the-perfect-blend-cafe` to
  `/biz/perfect-blend-cafe-bakery-delmar`. Evidence is name similarity and
  locality only, which is not sufficient to merge automatically.
