# Global Branding, Search Routing & Disclosure Cleanup

Capital District Nest becomes a neutral regional discovery/media/directory platform. Brokerage identity is confined to real-estate surfaces only, behind a single configurable disclosure block. No brokerage name (RE/MAX or Coldwell Banker) is baked in globally.

---

## 1. Global Footer (neutral)

Rewrite `src/components/Footer.tsx`:

- Remove the RE/MAX legal line and any brokerage identity from the bottom strip.
- Remove the duplicated "Homes" column (there are currently two).
- Legal strip becomes exactly:

  > © {year} Capital District Nest.
  > A local discovery, media, directory, advertising, and community search platform.
  >
  > Real estate tools and property searches may connect users with licensed real estate professionals and third-party listing providers. Equal Housing Opportunity.

- Contact column: keep `team@capitaldistrictnest.com`. Remove the global `(518) 522-7265` phone from the footer (it is Scott's real-estate line — it lives on real-estate pages instead, via the disclosure block).
- Footer stays identical across homepage, businesses, stories, communities, events, resources, business-owner pages.

## 2. Configurable Real-Estate Disclosure Block

New file `src/config/realEstateDisclosure.ts`:

```ts
export const realEstateDisclosure = {
  disclosure_active: false, // flip to true once broker approves wording
  agent_name: "Scott Alvarez",
  license_title: "Licensed Real Estate Salesperson",
  brokerage_name: "",          // fill after broker confirmation
  brokerage_office: "",
  brokerage_phone: "(518) 522-7265",
  license_number: "",
  equal_housing_text: "Equal Housing Opportunity",
};
```

New component `src/components/RealEstateDisclosure.tsx`:

- Reads the config. Renders nothing when `disclosure_active` is false OR `brokerage_name` is empty — instead renders a minimal safe fallback:

  > Real estate services provided by a licensed New York real estate salesperson. Brokerage details available on request. Equal Housing Opportunity.

- When active, renders the full agent / brokerage / license / EHO block.

Mount `<RealEstateDisclosure />` only on real-estate surfaces:

- `/homes`, `/homes/*`, `/homes-for-sale*`, `/rentals*`
- `/investment-*`, `/investment-analyzer`, `/dealdesk`, `/analyze*`
- Scott-specific pages: `/137a-elsmere-ave`, `/lavery-drive-delmar`, `/ridge-road-queensbury`, `/lancaster-street-case-study`, property-listing routes
- `PropertyFooterAttribution` and `PropertyListingTemplate` swap their hardcoded RE/MAX line for `<RealEstateDisclosure />`.

Non-real-estate pages (home, businesses, stories, communities, events, for-businesses) never render this block.

## 3. Search Routing (canonical CDN routes)

Add these routes/redirects in `src/App.tsx` so the target URLs the user specified always resolve:

- `/homes/search` → `HomesForSale` (existing)
- `/homes/search/:townSlug` → `TownListings` (existing component, dynamic)
- `/homes/listings` → `TownListings` hub / property board
- `/investment-analyzer` already exists

Codebase-wide rewrite of all home-search CTAs:

- Any `href` pointing to `remax.com`, `scottalvarez.remax.com`, `www.remax.com/*`, `troyData.remaxSearchUrl`, `albanyData.remaxSearchUrl`, etc. → replaced with the matching internal route (`/homes/search`, `/homes/search/<town>`, `/homes/listings`, or `/investment-analyzer`).
- CTA labels "Open Full MLS Search", "Full MLS Search", "View Live … Listings (RE/MAX)", "Search on RE/MAX" → renamed to "Search Homes", "Search <Town> Homes", or "View Property Board".
- Iframes that embed `remax.com` (e.g. `TroyHomesForSalePage`, `SchenectadyHomesForSalePage`, `SaratogaHomesForSalePage`, `CliftonParkHomesForSale`, `QueensburyHomesForSale`, `NiskayunaHomesForSale`, `VoorheesvilleHomesForSale`, `AmsterdamHomesForSale`, `DelmarHomesForSale`) → replaced with a link-out card that routes to `/homes/search/<town>`; the RE/MAX iframe URL is removed.
- `src/data/townData.ts`, `src/data/homesTowns.ts`, `src/data/livingInTowns.ts`, `src/data/townPropertyBoard.ts`, `src/data/rentalData.ts` — strip `remaxSearchUrl` / RE/MAX fields, add `searchPath: "/homes/search/<slug>"`.
- `RealScoutAlbanySearch` and other RealScout embeds are preserved as-is (they're the CDN search flow).

## 4. Contact & Report Link Audit

Purpose-based destinations:

| Purpose | Destination |
| --- | --- |
| General platform / editorial | `team@capitaldistrictnest.com` |
| Business application | `/for-businesses/apply` |
| Business profile correction / claim | `/claim-business` |
| Property analysis / report request | `/dealdesk` (existing form → `leads` table) |
| Real-estate phone | rendered only via `<RealEstateDisclosure />` on real-estate pages |

Sweep:

- Replace every `mailto:scott@…` outside real-estate pages with `mailto:team@capitaldistrictnest.com`.
- Replace every `tel:+15185227265` outside real-estate pages and outside `<RealEstateDisclosure />` with nothing (button removed) or with a link to `/contact`.
- Business inquiry forms currently posting into the leads table with `type: "contact"` keep working — only the surface labels + destinations change.
- `ContactPage.tsx`: split visible contact info into "General" (team@) and "Real estate" (Scott + disclosure block).

## 5. Deal Desk / Investment Tools audit

For `/dealdesk`, `/investment-properties`, `/investment-analyzer`, every "Analyze a Property", "Request Report", "View Sample Report" CTA:

- Verify the route exists in `App.tsx` (add redirects for any that don't).
- Verify the form posts to Supabase (`leads` / `analyzer_leads` / `intel_report_leads`) and the confirmation edge function (`send-dealdesk-emails`, `send-market-report`) still fires — no code change unless a destination is broken.
- Any CTA still pointing at a RE/MAX URL is rerouted to `/investment-analyzer` or `/dealdesk`.
- "View Sample Report" continues to link to `/assets/sample-investment-report.pdf` (present in `public/assets/`).

## 6. Acceptance checks

Run after edits:

- `rg -i "remax|re/max"` in `src/` returns **zero** matches outside the disclosure config file.
- `rg "Each RE/MAX"` returns zero.
- `rg "scottalvarez\\.remax"` returns zero.
- Global footer text matches spec verbatim, no brokerage name.
- `<RealEstateDisclosure />` renders only on real-estate routes; disabled state shows the safe neutral fallback.
- Every home-search CTA resolves to `/homes/search`, `/homes/search/:town`, `/homes/listings`, or `/investment-analyzer`.
- Homepage, `/for-businesses`, `/local`, `/communities`, `/weekly` show the neutral footer only — no brokerage line.
- `tsgo` typecheck passes; preview loads `/`, `/homes/search`, `/for-businesses`, `/dealdesk`, one town intelligence page without console errors.

## Technical notes

- Scope: ~80 files touched, mostly mechanical link/label replacements plus one new component + one config file.
- No DB schema changes. No new edge functions. No changes to `client.ts`, `types.ts`, `.env`, `supabase/config.toml`.
- Memory rule "Global Contact: Scott Alvarez · RE/MAX Solutions" in `mem://index.md` is stale after this change; I'll update it to reflect the new split (general `team@`, real-estate contact via disclosure block) once the plan is approved.
- Coldwell Banker wording is **not** inserted anywhere. The disclosure config ships with `disclosure_active: false` and empty brokerage fields until you confirm the exact broker-approved language.
