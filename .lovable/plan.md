# Phase 3 — 25 Business Previews

Goal: publish 25 real, verified previews so outreach emails can link to a live URL per business. No homepage, navigation, or hub redesigns.

## Selection (final list, locked before authoring)

Each entry must pass: active business, verified website, real public phone, at least one official social profile, enough public info for an original summary, non-duplicative town/category, no fabricated content.

**Food & Drink (5)**
1. The Roosevelt Room — North Greenbush *(existing flagship)*
2. Iron Gate Cafe — Albany
3. Superior Merchandise Co. — Troy
4. Lucas Confectionery — Troy
5. Common Roots (Albany outpost) — Albany

**Home & Property (5)**
6. Cassone — Capital District *(existing)*
7. Family Danz Heating & Cooling — Albany
8. Grasshopper Heating & Cooling — Latham
9. Murray Painting — Capital District
10. One verified plumbing / electrical / roofing company (TBD from public sources)

**Professional Services (5)**
11. Christie Hoyt Mortgage Team
12. D&G Law
13. One verified insurance agency (candidate: Denofio — already in data)
14. One verified accounting firm
15. One verified property-management / real-estate company

**Health & Wellness (5)**
16. Dental practice (TBD)
17. Fitness studio (TBD)
18. Salon / spa (TBD)
19. Veterinary or pet services (TBD)
20. Physical therapy / healthcare (TBD)

**Retail & Lifestyle (5)**
21. Florist (TBD)
22. Boutique (TBD)
23. Photographer (TBD)
24. Automotive (TBD)
25. Nonprofit / community org (TBD)

TBD entries get filled in during research; nothing publishes without verified data.

## Two build tiers

- **Flagship (5):** Roosevelt Room, Cassone, Christie Hoyt, Iron Gate Cafe, one wellness pick. Custom hero, richer editorial summary, `label: "spotlight"` only if the page truly meets the bar — otherwise `preview`.
- **Standard (20):** Locked template, verified public data only. `label: "preview"` with an "Owner Review Pending" sub-note.

## Data model additions

Extend `SpotlightLabel` in `src/data/businessSpotlights.ts`:
```
"spotlight" | "preview" | "owner_review_pending" | "owner_verified" | "coming_soon" | "claim_available"
```
Extend `SPOTLIGHT_LABEL_TEXT` with:
- `owner_review_pending: "Owner Review Pending"`
- `owner_verified: "Owner Verified"`

Each of the 25 records lives in `businessSpotlights.ts` (for hub surfaces) and, where a full profile page is needed, mirrored into `src/data/businesses.ts` so `/business/:slug` works.

Fields authored per record (only verified data — omit anything unsupported):
```
slug, businessName, category, town (exact municipality),
summary (original, factual), profileRoute,
status: "published", label,
website, phone, socials, services,
addedAt (ISO)
```
Hidden by policy for previews: team, awards, ratings, reviews, timelines, project galleries, events, stats, owner quotes.

## Page rendering

- Reuse the existing `/business/:slug` route and template. No new route patterns.
- Flagship five may add a hero image where a legitimately licensable/public image exists (e.g. existing `roosevelt-hero.jpg`). Otherwise dark typographic hero — same rule as homepage.
- Every page must render: name, town, website button, tel button (only if `isValidBusinessPhone`), social links, categories/services, summary, and a persistent "Claim or update this profile" CTA to `/claim-business?slug=...`.
- If a field is missing, the section is hidden — never a placeholder.

## QA before outreach

For each of 25 slugs:
1. Page loads at `/business/<slug>`.
2. Website button opens the official site.
3. Phone button dials the correct verified number (or is hidden).
4. Every social link resolves.
5. Claim CTA lands on `/claim-business` with the slug preserved.
6. No fabricated content on the page.

Playwright pass hits all 25 URLs, screenshots each, and confirms the claim CTA is present.

## Execution order

1. Extend label enum + text map (small edit).
2. Research + author the 20 TBD selections into a locked shortlist (I will surface each with source URLs before writing the record so you can approve/swap).
3. Write the 25 data records in one pass.
4. Ensure `/business/:slug` renders each record; add minimal per-slug page files only for the 5 flagships if the template needs custom sections.
5. Run Playwright QA across all 25.
6. Hand back the 25 URLs for the outreach batch.

## Out of scope this phase

Homepage, navigation, `/businesses` hub layout, `/local`, `/claim-business`, global tokens, new categories, the outreach email tooling itself.

## What I need from you before I start writing records

1. Confirm the label vocabulary above (adding `owner_review_pending` + `owner_verified`).
2. Confirm which 5 you want as flagships — my proposal: Roosevelt Room, Cassone, Iron Gate Cafe, Christie Hoyt Mortgage Team, and one wellness pick once selected.
3. Approve me researching + proposing the ~12 TBD businesses in a single shortlist message (with source links) before any of them are written into the codebase.
