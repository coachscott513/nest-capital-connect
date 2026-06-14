
# Property Link Preview System — Phased Plan

This is a large, multi-week build. I want to confirm scope and sequence before writing code, because doing it all in one pass would produce a brittle import and a half-finished claim workflow.

## What you uploaded
A FlexMLS PDF export with ~3,703 active records across Residential, Residential Lease, Land, and MultiFamily. Each row carries listing + listing-member contact info. PDFs are not a clean import source — I'll need to parse it server-side (text extraction + row reconstruction) and normalize fields before loading.

## Phase 1 — Data layer (this turn, if you approve)

**Migration: new `property_listings` table** (separate from legacy `properties` and current `listings` so we don't disturb Delmar/Albany curated boards).

Columns:
- `mls_number` (unique), `status` (`preview`/`approved`/`claimed`/`archived`)
- `source_type` (`market_data_import`), `claim_status` (`unclaimed`/`pending`/`claimed`)
- `is_featured`, `is_indexable` (default false), `needs_agent_public_url` (default true)
- `public_listing_url` (nullable)
- address, address_slug, city, town_slug, county, price
- property_category (`residential`/`rental`/`multi_family`/`land`/`commercial`), property_subtype (raw MLS code)
- beds, baths, sqft, acres, year_built, days_on_market, listing_contract_date
- agent_name, agent_slug, agent_phone, agent_email, agent_website
- brokerage_name, brokerage_slug, office_phone, office_email
- timestamps, RLS: public SELECT only where `status != 'archived'`; writes service_role only.

Plus supporting tables:
- `listing_agents` (denormalized: slug, name, brokerage, claim_status, photo_url, social links, contact prefs)
- `listing_brokerages` (slug, name, office info, claim_status)
- `listing_claims` (mls_number, claimant_email, requested_public_url, status, submitted_at)

## Phase 2 — Import pipeline

A one-shot Node script (`scripts/import-flexmls-pdf.ts`) that:
1. Extracts text from the PDF with `pdfjs-dist`.
2. Reconstructs rows (FlexMLS export is column-stable).
3. Normalizes town names → `town_slug`, MLS subtypes → `property_category`.
4. Upserts into `property_listings`, `listing_agents`, `listing_brokerages` via service role.
5. Prints a per-town / per-category count report.

I'll run it once, you review the counts, then we proceed.

## Phase 3 — Public routes (after import lands cleanly)

- `/homes/listings/[townSlug]` — hero, stats, tabs (All / Residential / Rentals / Multi-Family / Land / Agents / Brokerages), scannable row list. Default DB-backed; falls back to curated `townPropertyBoard.ts` for Delmar/Albany flagships.
- `/homes/listings/[townSlug]/[addressSlug]` — preview page, `noindex` unless `status='approved'` AND `public_listing_url` set.
- `/homes/agents/[agentSlug]` — `noindex` unless claimed/enhanced.
- `/homes/brokerages/[brokerageSlug]` — index when content threshold met.
- `/homes/claim-listing?mls=...` — claim form → `listing_claims` + email to Scott.

All copy uses the neutral language you specified:
- "Property link previews" / "Listing source pending" / "Agent public link pending" / "Claim this listing link"
- Standard disclaimer block on every Homes/town page.
- No "Live MLS feed", no "MLS-sourced", no Scott/RE/MAX branding.

## Phase 4 — SEO

- Town boards: indexable, dynamic meta `"[Town] Property Links & Listing Agents | Capital District Nest"`.
- Preview address pages + unclaimed agent pages: `<meta name="robots" content="noindex,follow">` via Helmet.
- Sitemap generator extended to include town boards + claimed agent/brokerage pages only.

## Phase 5 (future, not this build)

Outreach email templates, featured-card monetization, partner packages. Out of scope until Phases 1–4 ship.

---

## What I need from you to start

**Approve Phase 1 + Phase 2 now (schema + import script)?**

I will:
1. Create the `property_listings` / `listing_agents` / `listing_brokerages` / `listing_claims` migration (you'll approve it in the migration dialog).
2. Write and run the PDF import script.
3. Report back the counts (e.g., "Albany: 412 residential, 87 multi-family, 14 land · 211 unique agents · 38 brokerages").

Then in a follow-up turn we build the public routes (Phase 3) and SEO rules (Phase 4).

If you'd rather I compress this into one mega-turn, say so — but I recommend the split so you can sanity-check the imported data before it powers public pages.
