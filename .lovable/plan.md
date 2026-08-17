# Global Flow / Navigation / Premium UX — Template v1

Preview sprint plan. No code edits made. SEO baseline (5,250 URLs / 209 Tier A / 5,041 Tier B) preserved throughout.

## 1. Current public flow (audited)

**Desktop header** shows 6 of 10 defined mega-sections: Homes, Analyze, Closing Team, Home Services, Towns, Local Businesses. Four more (Discover, Stories, What's Happening, For Business) exist in code but appear only in the mobile drawer and footer. Right cluster: search icon (GlobalSearchCommand), International, Get Started.

**Homepage renders 13 sections** in this order: PropertyHero → DecisionRail → PropertyIntelligenceChapter → ClosingTeamChapter → HomeServicesRail → TownRail → TalkToScottChapter → SearchHero → ThisWeekCampaign → ExploreCapitalDistrict → FeaturedThisWeek → BusinessCTA → BuyingAndOwningHome.

**Mobile** is a right-slide drawer with a two-pane push (root list → section columns).

**Floating controls:** PropertyToolsDock (right edge) + FloatingLiveAgent, both global in App.tsx.

## 2. Problems

1. **Two heroes.** PropertyHero (h1, RealScout) and SearchHero (h2, omni-search) both claim "the search". SearchHero sits at position 8, below seven property chapters — a first-time non-buyer scrolls past the whole transaction funnel before reaching regional discovery.
2. **Four overlapping discovery modules**: ExploreCapitalDistrict (4 gateways), FeaturedThisWeek (5 cards), ThisWeekCampaign, BuyingAndOwningHome. Three of them point at the same four destinations.
3. **Navigation is transaction-shaped, not intent-shaped.** Closing Team and Home Services occupy top-level desktop slots while Events/Stories and For Business are hidden.
4. **Property Intelligence cards have three competing links each** (external AAP + internal tool + section-level Analyze Any Deal button) — no single primary decision.
5. **Closing Team nav dropdown has 6 links that all resolve to the same `/closing-team` page.**
6. **Albany/region ambiguity.** `RealScoutAlbanySearch` is headlined "Search Albany homes"; `externalProducts.ts` documents `capitalDistrictMapUrl: null` — no verified region-wide external map exists.
7. Homepage is ~13 chapters of scroll with no chapter navigation.

## 3. Proposed navigation tree (with SEO classification)

Legend: **A** canonical indexable · **B** SPA-only/noindex · **C** redirect · **D** missing.

| Top level | Destination | Class | Dropdown (all existing routes) |
|---|---|---|---|
| Discover | `/local` | A | `/businesses` A, `/local` A, `/stories` A, `/restaurants` A, `/wellness` A, `/professional-services` A |
| Homes | `/homes` | A | `/homes/search` A, `/homes/listings` A, `/homes/open-houses` A, `/rentals` A, `/neighborhoods` A, `/first-time-buyers` A, `/financing` A |
| Analyze | `/analyze-any-deal` | A | `/analyze-any-deal` A, `/analyze-any-property` A, `/finances` A, `/analyze/multifamily` A, `/analyze/land` A, `/investor-tools` A, `/reports` A |
| Towns | `/communities` | A | `/living-in/albany` etc. A, `/towns/:slug` A, `/community-updates` A, `/market-reports` A |
| Events & Stories | `/weekly` | A | `/weekly` A, `/stories` A, `/blog` A, `/media` A, `/submit-event` A |
| For Business | `/for-businesses` | A | `/for-businesses` A, `/pricing` A, `/claim-business` A, `/for-businesses/apply` **B**, `/editorial-policy` A, `/partner-auth` B |
| Search | opens GlobalSearchCommand | n/a | — |
| Sign In | `/partner-auth` | B | — |

**Demoted from top level, fully preserved:** `/closing-team` (B), `/home-services` (B) move into Homes → "After you find it" and Discover → "Home & Property". Neither route changes; no link is deleted; both stay in the footer.

**Rule applied:** no proposed prominent destination is class D. Nothing new is added to the sitemap in this sprint.

## 4. Homepage chapter map (current → target)

| Target chapter | Source | Action |
|---|---|---|
| 1. Property hero | PropertyHero | Keep. RealScout stays lazy, unchanged config. |
| 2. Search the Capital District | SearchHero (moved up from #8) | **Move + rebuild** as the 4-mode regional chapter. Absorbs FloatingOmniSearch duplication. |
| 3. Businesses and services | ExploreCapitalDistrict + BusinessCTA merged | **Merge.** Apple-style category chapter using existing `/businesses/:categorySlug` destinations. Owner CTA becomes one quiet footer-of-chapter line to `/for-businesses`. |
| 4. Buy / Sell / Invest / Own | DecisionRail | Keep, retitle. Already 4 lanes with correct routes. |
| 5. Property Intelligence | PropertyIntelligenceChapter | Keep, restructure to one action per card (§7). |
| 6. Closing Team | ClosingTeamChapter | Keep; convert to wide art-led role cards (§8). Empty-state collapse behavior preserved. |
| 7. Home Services | HomeServicesRail | Keep as-is (already category-linked to `/local?category=`). |
| 8. Towns, Events & Local Stories | TownRail + ThisWeekCampaign + FeaturedThisWeek | **Consolidate into one three-lane chapter.** FeaturedThisWeek cards move to `/weekly`; ThisWeekCampaign keeps its snap rail on `/weekly`. |
| 9. Talk to Scott | TalkToScottChapter | Keep, last. |
| — | BuyingAndOwningHome | **Relocate to `/homes`** (homeowner content, duplicates chapters 5–7). |

Net: 13 sections → 9. No destination route deleted; every removed card's target keeps at least one link from nav, footer, or an interior page.

## 5. Route / SEO implications

- `/closing-team` and `/home-services`: confirmed **B — SPA-only, zero sitemap entries, no prerendered artifact**. Demoting them changes nothing SEO-wise. If founder later wants them indexable, that is a separate change: add `SEOHead` with self-canonical, add to `PRERENDER_ROUTES` in `vite.config.ts`, rebuild, re-run all five gates. **Not in this sprint.**
- `/for-businesses/apply`: B, intentional conversion route — keep `noindex` posture, keep out of sitemap.
- `/analyze`: C, redirects to `/finances`. Nav must link `/analyze-any-deal`, never `/analyze`.
- `/local?...`: filtered states already emit `noindex, follow` with canonical to `/local`. Search-mode links must use query params, not new paths.
- Homepage `<h1>` stays the PropertyHero three-span; the new search chapter uses `<h2>`.
- Acceptance gate: all five audit scripts must return the identical sitemap checksum and counts after this sprint.

## 6. Regional search chapter — verified behavior per mode

Headline "Search the Capital District". One control, four truthful backends:

| Mode | Backend today | Behavior |
|---|---|---|
| Homes | RealScout `realscout-advanced-search`, `agentEncodedId QWdlbnQtMzE2NTU3` | Scrolls to / focuses the existing hero widget. No new widget instance. |
| Businesses | `resolveSearchIntent` → `/local?search=&town=` (BusinessDirectory, DB-backed) | Submits to `/local` with params. |
| Towns | `CAPITAL_DISTRICT_COUNTIES` town match → `/living-in/:slug`, fallback `/communities` | Typeahead over the static town list. |
| Services | category match → `/local?category=` | Same directory, category param. |

No universal backend is invented; mode selection routes to the existing resolver.

**RealScout scope finding:** the advanced-search widget is agent-scoped (region-capable). The only verified external URL is `albanyMapUrl` (`geo_type=city&geo_id=3601000`) — Albany city only. `capitalDistrictMapUrl` is `null`. Therefore:
- Primary action stays **in-page** ("Search homes across the Capital District" → the agent widget). Do **not** ship "Open the full Capital District search" as an external link until a verified region-wide URL exists.
- Albany map is demoted to a secondary, explicitly labeled "View the City of Albany map".
- Retitle `RealScoutAlbanySearch` usage so the Albany label never sits on the principal search.
- Placeholder: "City, town, neighborhood, or school".

## 7. Property Intelligence — one primary action per card

| Card | Primary (whole card clickable) | Secondary |
|---|---|---|
| Multi-Unit Cash Flow | `/analyze/multifamily` (A) | AAP link on that page |
| Land | `/analyze/land` (A) | AAP link on that page |
| Fix & Flip | `/analyze/rental` (A) | AAP link on that page |
| First Property / House Hack | `/first-time-buyers` (A) | AAP link on that page |
| Featured Analyses | `/reports` (A) | — |

Rationale: internal canonical routes are indexable and keep attribution; external `analyzeAnyPropertyUrl(...)` moves to the destination pages so each homepage card has exactly one link. Section-level "Open Analyze Any Deal" banner is retained as the single external primary for the chapter. All existing `logEngagement` calls preserved.

## 8. Closing Team role cards

Seven wide, art-led cards from `CLOSING_TEAM_CATEGORIES` (financing, attorney, inspection, insurance, title, survey/appraisal, property management). Whole card clickable, one line of explanation, one visible action. **Neutral destinations only:**

| Role | Destination | Class |
|---|---|---|
| Financing | `/financing` | A |
| Real-estate attorneys | `/homes/attorneys` | A |
| Home inspection | `/homes/inspectors` | A |
| Insurance | `/homes/insurance` | A |
| Title / closing support | `/closing-team` | B |
| Survey & appraisal | `/closing-team` | B |
| Property management | `/homes/property-management` | A |

No named provider appears. Existing approved-only `useClosingTeam` query and empty-state collapse stay. Named-provider rail stays hidden until ≥3 founder-approved professionals across ≥3 roles, each with verified facts, license/NMLS, service area, last-reviewed date, and disclosure.

## 9. Design system

Retain: Manrope (already loaded, already the property-chapter face), `#0B0F19` canvas, `#5eead4` on-dark accent, `#0d6e66` primary, card radius 24–28px, `[0.22,1,0.36,1]` easing, existing `.btn-*`/`.h-hero`/`.eyebrow-apple`/`Reveal` utilities.

Adopt from AnalyzeAnyProperty as primitives only: type-weight contrast (extralight/semibold pairing, already in PropertyHero and PropertyIntelligenceChapter), 8pt spacing rhythm, control heights (min 48px), focus-visible ring, mobile sheet pattern, card proportion scale.

Unify: the homepage currently hardcodes `#0B0F19`, `#0E1220`, `#080B12`, `#13161E`, `#94A3B8`, `#64748B` inline. Promote these to tokens (`--surface-canvas`, `--surface-raised`, `--surface-deep`, `--text-muted`, `--text-quiet`) in `index.css` and replace inline hexes chapter by chapter. No cream repaint. AAP keeps its documentary paper mode; CDN keeps the cinematic dark canvas.

## 10. Mobile

One compact drawer, six intents (Discover, Homes, Analyze, Towns, Events & Stories, For Business) + Search + Sign In. All targets ≥44px. `env(safe-area-inset-*)` padding on drawer top/bottom and on both floating controls. `overflow-x: clip` on chapter wrappers; rails scroll internally. PropertyToolsDock shown only on `/homes*`, `/analyze*`, `/listings*`, `/investor*`; FloatingLiveAgent on all others — never both. Talk to Scott appears exactly once per view. Search-mode chips sit in the bottom third for one-hand reach.

## 11. Analytics

Emit via existing `logEngagement` / `trackGAEvent`. No PII, no raw query retention.

- `regional_search_mode_select` `{mode}`
- `regional_search_submit` `{mode, intent_type, query_length_bucket: 1-2|3-5|6-10|11+, result_count}` — raw query never sent
- `homepage_chapter_view` / `homepage_chapter_click` `{chapter_key, position}`
- `property_intelligence_path_click` `{path_key, destination_type}`
- `closing_team_role_click` `{role_key}`
- `business_category_click` `{category_slug}`
- `nav_intent_click` `{intent, surface: desktop|mobile}`
- `sponsored_spotlight_view` / `_click` `{placement_id}` — only fired when inventory exists

## 12. Sponsored spotlight contract (plan only, not built this sprint)

Labeled "Paid placement", rendered in its own module separated from organic results; payment never affects organic rank, verification state, or factual treatment; every placement carries start/end dates and auto-expires; engagement reported to the owner; **no "spot available" cards**; module returns `null` when inventory is empty. Candidate signals (search performance, SEO protection, traffic, completeness, payment) feed a **private founder-review queue only** — Scott explicitly selects every feature, sponsor, and professional.

## 13. Business flow roles

`/businesses` premium category/editorial discovery · `/local` functional searchable directory · `/biz/:slug` canonical business identity · `/for-businesses` owner entry · `/claim-business` verification/management · `/pricing` paid product detail.

Consumer path: Search/Discover → `/local` or `/businesses/:category` → `/biz/:slug`.
Owner path: `/for-businesses` → `/claim-business` (verify) or `/pricing` (upgrade) → `/partner-dashboard`.

Future entity families (chambers, real-estate offices, nonprofits, civic, colleges, hospitals, media) are **taxonomy/graph planning only** — no automatic public page creation.

## 14. Sitelinks / internal-link hierarchy

Google chooses sitelinks; nothing here promises control. What is controllable: make the six preferred destinations (Search Homes, Local Businesses, Towns & Communities, Analyze a Property, Events & Stories, For Business) the most-linked internal targets — present in the primary nav on every page, in the homepage chapter order, and in the first footer column, while thinner targets (Site Index, Discover Albany) move to a secondary footer column. Anchor text stays consistent across nav, homepage, and footer.

## 15. Phased implementation order

1. **Tokens only** — add CSS vars, no visual change. Verify screenshots identical.
2. **Navigation** — new tree, desktop + mobile. No homepage change.
3. **Chapter reorder** — move SearchHero to slot 2, relocate BuyingAndOwningHome to `/homes`.
4. **Regional search chapter** — 4 modes wired to existing resolvers.
5. **Businesses & services chapter** — merge ExploreCapitalDistrict + BusinessCTA.
6. **Property Intelligence** single-action restructure.
7. **Closing Team** art-led role cards.
8. **Towns/Events/Stories** consolidation.
9. **Mobile pass** — targets, safe area, dock scoping.
10. **Analytics events.**
11. **Full rebuild + all five audit gates.**

Each phase is independently revertable; gates run at 11 only, plus a fast `audit-snapshots` spot check after 3 and 8.

## 16. Acceptance checklist for the implementation sprint

Screenshots: homepage full scroll desktop + 390px mobile; each of the 9 chapters; desktop dropdown for all 6 intents; mobile drawer root + one section; search chapter in all 4 modes; Property Intelligence grid; Closing Team cards; empty-state Closing Team.
Checks: homepage `<h1>` unchanged three-span; sitemap count 5,250 and checksum unchanged; all five gates PASS; no horizontal scroll at 320/390/768; every nav link resolves 200 (no `/analyze` in nav); exactly one floating control per route; Lighthouse LCP not regressed by the search chapter.

## 17. Risks, assumptions, founder decisions needed

Risks: chapter reordering touches `Index.tsx` which feeds the prerendered homepage snapshot — rebuild + gates required before publish; RealScout widget behavior with two mount points (mitigated by scroll-to-hero instead of a second instance); token migration can silently shift a shade (mitigated by phase 1 screenshot diff).

Assumptions: `/closing-team` and `/home-services` stay SPA-only; no new routes; no business count is hardcoded until read from the accepted production footprint.

**Founder decisions needed:** (a) approve demoting Closing Team and Home Services from top-level desktop nav; (b) confirm whether a verified Capital District–wide RealScout URL exists — if not, the primary search action stays in-page; (c) approve moving BuyingAndOwningHome to `/homes`; (d) confirm "Thousands of Capital District businesses" copy only after the live count is verified; (e) confirm the Sponsored Spotlight contract before any build.
