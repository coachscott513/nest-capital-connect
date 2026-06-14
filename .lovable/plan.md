# Capital District Nest Homes — Real Estate Hub

This is a big scope, so I'm proposing a 3‑phase build. Phase 1 ships the visible product (hub + town pages + agent cards + submission form) using mocked/curated data. Phases 2–3 add the database, agent monetization, and analytics.

## Phase 1 — Visible product (ship this first)

### Homepage teaser
Add a "New Town Listings" hero card section on `Index.tsx` (dark, premium, single section, does NOT compete with Neighborhood Explorer):
- Eyebrow: NEW TOWN LISTINGS
- Headline: Homes, rentals, and property links by town.
- Sub: Browse new listings, rentals, open houses, and active listing agents across the Capital District.
- CTAs: `Explore Homes` → `/homes` · `Search MLS` → `https://scottalvarez.remax.com/` (new tab) · `Post Listing Link` → `/homes/add-listing`

### /homes — full redesign (replace current `HomesPage.tsx`)
Sections in this order:
1. **Hero** — dark cinematic, eyebrow "CAPITAL DISTRICT NEST HOMES", headline, 3 CTAs (Browse Town Listings / Open Full MLS / Post Listing Link).
2. **Town Listing Board** (`#town-listings`) — 14 town cards (Delmar, Albany, Troy, Schenectady, Saratoga Springs, Clifton Park, Colonie, Niskayuna, Guilderland, Latham, Queensbury, Lake George, Amsterdam, Gloversville). Each shows live counts when available, otherwise "Listings being added". Links to `/homes/listings/[town]`.
3. **New Listings by Town** — town tabs + property cards. CTA `View Original Listing` opens external `listing_url` in new tab (no lead capture).
4. **Active Listing Agents by Town** — agent cards + Apple-style popup (close X, photo, brokerage, phone, email, website, socials, active listings in town). Featured vs basic states. Upgrade CTA → `/claim-business?category=real-estate&tier=featured&town=[slug]`.
5. **Rentals** — curated card + browse / post buttons.
6. **Open Houses** — cards or empty state with Submit Open House CTA.
7. **Multi‑Unit / Investment** — 4 category cards.
8. **Local Real Estate Services** — 8 service category cards linking into `/local?category=...`.
9. **Search MLS** — opens `https://scottalvarez.remax.com/` in new tab.
10. **Post Listing Link CTA** — `/homes/add-listing` + featured agent upsell.
11. **Disclaimer** — exact copy from spec.

### New routes (registered in `App.tsx`)
- `/homes` (rebuilt)
- `/homes/listings` (board view)
- `/homes/listings/:townSlug` (per‑town page — listings + agents + open houses + rentals filtered)
- `/homes/rentals`
- `/homes/open-houses`
- `/homes/add-listing` (submission form)

### Submission form `/homes/add-listing`
Zod‑validated. Fields per spec, authorization checkbox required, status defaults to `pending`. Writes to `property_listings` (Phase 2) or, until the table lands, to the existing `leads` table tagged `source = "homes_listing_submission"` so launch isn't blocked. Triggers `notify-new-lead`.

### Design
Dark cinematic hero (token: onyx `--background`, teal `#5eead4` accent). Cards use `bg-card` + hairline border. Apple typography utilities (`.h-hero`, `.body-apple`, `.eyebrow-apple`) and existing button utilities — no ad‑hoc styles. No blue. Red reserved for CALL buttons only.

### SEO
Helmet per route with the exact title/description templates from spec. Canonicals self‑reference each route.

### Language
Strict: "Property links", "Listed by", "View Original Listing", "Contact listing agent directly". Never "our listings" / "schedule with us" / "verified" unless truly verified.

## Phase 2 — Data layer

Two new tables (via migration, RLS + GRANTs):

**`property_listings`** — fields per spec. RLS:
- Public can SELECT where `status = 'approved'`.
- Authenticated users can INSERT (status forced to `pending` via trigger).
- Admins can UPDATE/DELETE.

**`listing_agents`** — fields per spec. RLS:
- Public SELECT where `is_verified = true`.
- Admins manage.

Helpers in `src/lib/propertyListings.ts`: `getTownListingCounts()`, `getListingsByTown(slug)`, `getAgentsByTown(slug)`, `submitListing(payload)`.

Wire all Phase 1 sections to real data; keep curated fallback when counts are zero.

## Phase 3 — Monetization + analytics

- Featured agent flow integrated with existing `partner_subscriptions`.
- Analytics events per spec via existing `track()` util: `homes_hub_view`, `town_listing_board_click`, `view_original_listing_click`, `agent_card_open`, `agent_social_click`, `agent_upgrade_click`, `post_listing_link_click`, `post_listing_submit`, `mls_search_click`. Payload includes town, listing_type, agent_id, destination_url.

## Technical notes

- Files to add: `src/pages/HomesHub.tsx` (replaces `HomesPage.tsx` usage), `src/pages/homes/TownListingBoard.tsx`, `src/pages/homes/TownListings.tsx`, `src/pages/homes/HomesRentals.tsx`, `src/pages/homes/OpenHouses.tsx`, `src/pages/homes/AddListing.tsx`, `src/components/homes/*` (HomesHero, TownBoard, TownTabs, PropertyCard, AgentCard, AgentPopup, ServicesGrid, DisclaimerBlock).
- Files to edit: `src/App.tsx` (routes), `src/pages/Index.tsx` (New Town Listings teaser), `src/pages/HomesPage.tsx` → either replace export or redirect to new hub.
- Existing `listings` table stays untouched; new `property_listings` is the agent‑submitted link board (different concept from MLS scrape).
- Disclaimer block reused on `/homes` and every town page.

## What I want to confirm before building

1. **Scope of first PR**: I'd ship **Phase 1 only** in this turn (hub + routes + form wired to `leads` table). Phases 2–3 follow. OK?
2. **Town list**: keep all 14 towns on the board, even where we have zero data yet (with "Listings being added")? Or trim to towns with real data?
3. **Homepage teaser placement**: insert directly above or below the Neighborhood Explorer on `Index.tsx`?

Reply with answers (or "go" to accept defaults: Phase 1 only, all 14 towns, teaser **below** Neighborhood Explorer) and I'll build it.
