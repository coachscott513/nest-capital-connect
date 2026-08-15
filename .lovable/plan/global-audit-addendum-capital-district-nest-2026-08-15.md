# Global Audit Addendum — Capital District Nest
Read-only. 2026-08-15. No code, database, route, or setting was changed.

Labels used throughout: **[FACT]** verified this session · **[INFER]** reasoned from facts · **[REC]** recommendation · **[ASPIRE]** goal, not yet real.

---

## 1. Evidence discipline — corrections to the first audit

### 1.1 "This is a Google-Places scrape"
**[FACT]** Import lineage, from `businesses.source` + `import_batch_id`:

| source | rows | batches | has external_id | created |
|---|---|---|---|---|
| google_places | 4,472 | 4 | 4,472 | 2026-05-24 → 05-25 |
| apify-google-places | 84 | 1 | 84 | 2026-05-24 |
| csv_import | 384 | 0 (null) | 0 | 2026-05-27 |
| manual | 142 | 1 | 141 | 2026-05-24 → 05-31 |

Batch IDs are literally `gp-schenectady-2026-05-24` (3,343 rows), `gp-albany-2026-05-24` (926), `gp-saratoga-2026-05-25` (200), `google_places_2026_05_24` (141), `2026-05-24-google-places` (84).

**Restated:** **89.6% of the inventory (4,556 rows) is Google-Places-derived — that is a verified fact, not an inference.** The remaining 10.4% (526 rows) is CSV + manual and is not scrape-derived. The earlier blanket phrasing "this is a scrape" was **overbroad** and is corrected here.

**[FACT]** `google_place_id` is null on all 5,082 rows and `source_url` is null on all 5,082 rows — so the import discarded the very identifiers that would let us re-verify or de-duplicate against the source. `google_maps_url` is present on 4,697.

### 1.2 "Target a defensible core of 800–1,200 businesses"
**[REC / suggested pilot range, not a fact.]** The first audit presented this as a target without basis. The honest basis is:
- **[FACT]** 4,697 rows have a Google Maps URL; 3,659 have both a phone and an address; 1,423 have no website at all.
- **[FACT]** 144 duplicate name groups, 235 shared-phone groups, 507 shared-address groups exist and must be resolved before any count is meaningful.
- **[FACT]** Outreach capacity to date: 7 tracked links, 5 clicks, 21 lifetime leads.

**Corrected framing:** the constraint is **outreach and verification throughput, not database size**. A realistic pilot is *"as many businesses as we can verify and contact in 90 days"* — at 25 personalized contacts per week that is **~300 businesses per quarter**, not 800–1,200. Treat 800–1,200 as a 12-month aspiration **[ASPIRE]**, and 250–350 as the 90-day verified core **[REC]**.

### 1.3 "Defensibility roughly zero"
**Overstated. Corrected by separating layers:**

| Layer | Copyable? | Status |
|---|---|---|
| 5,082-row business inventory | **Trivially copyable** (a weekend of Places API) | **[FACT]** zero moat |
| Original design system, Discover shelf, spotlight template | Copyable in weeks, but real craft | **[FACT]** exists, above market |
| Town/market data (53 active town_market_data rows, 25 landmarks, 15 academic institutions, 6 civic directory) | Partly public-source, assembled | **[FACT]** real assembly work |
| Property graph: 3,171 property_listings across 171 towns, 1,237 listing agents, 366 listings, 257 rentals | Licensed/aggregated — costly to replicate | **[FACT]** genuine asset |
| Editorial assets (Roosevelt Room, Cassone spotlights, 20 local_voices founder stories) | **Not copyable** — first-party interviews | **[FACT]** small but real |
| Outreach tracking engine (`tracked_links` → `track-click` → `link_clicks`) | Copyable as code; the *data* is not | **[FACT]** working, 5 clicks of data |
| Search visibility | **[FACT]** 1 business URL in sitemap; Search Console not connected — cannot be quantified |
| Real consumer calls/leads | **[FACT]** 21 leads lifetime; 0 engagement_events; not yet an asset |

**Corrected verdict:** defensibility is **narrow but non-zero**. The moat today lives in the *property + town + editorial* layers, not the business directory. The business directory is the part with zero moat.

### 1.4 "AI answer step is the only thing a competitor can't scrape"
**Wrong, and corrected.** An LLM answer layer is a commodity — same models, same prompts, weeks to clone.

**[REC]** The defensible layer is the **evidence graph underneath the answer**:
1. **Canonical identity** — one stable ID per organization, surviving renames/moves/duplicates.
2. **Owner-confirmed corrections** — facts a human with authority asserted, with a timestamp.
3. **Verified services + service areas** — "does this plumber actually serve Voorheesville?" is not on Google.
4. **Proprietary intent/action data** — what residents searched, tapped, called, and abandoned here.
5. **Time-indexed history** — what was true in March vs August; closures, price and hours drift.
6. **Original media** — photos and video we shot or were licensed directly.
7. **Provenance** — every field traceable to a source with a date.

An AI layer on top of *that* is defensible. An AI layer on top of a scrape is a chatbot.

### 1.5 "Make plan_tier drive ranking"
**Retracted.** That recommendation would sell organic relevance and is incompatible with being the region's trusted index.

**[REC] Neutrality contract — payment MAY buy:** richer presentation (photos, video, long story, menus), completeness fields, owner tools (edit, offers, events), analytics, priority human support, and **clearly labeled sponsored placements** that are visually distinct and excluded from organic ordering.

**Payment MUST NOT buy:** organic rank in `/local` or Ask Local results, a "Verified" badge, suppression of a competitor, removal of a correction, or inclusion in structured data as though owner-confirmed when it is not. Verification is earned by evidence; visibility is earned by relevance and completeness.

---

## 2. Relationship graph — current source of truth

**[FACT]** Every row count below was queried this session.

| Relationship family | Table / function | Rows | Source of truth | Nature | Provenance | Public use today | User value | Staleness risk |
|---|---|---|---|---|---|---|---|---|
| Business → town | `businesses.town_slug` (text) | 5,082 | none authoritative | inferred | Places import | `/local`, `/biz` | high if correct | **Critical** — 793 city/town mismatches, 2,436 (48%) all mapped to `schenectady` |
| Business → category | `businesses.category` (text) | 5,082 (90 distinct) | none | inferred | Places import | directory filters | high | **Critical** — misassignments verified (Lowe's→Restaurant, Verdant Landscapes→Attorney) |
| Business → subcategory | `businesses.subcategory` | 5,022 | none | inferred | import | minimal | low | High |
| Business → category_group | `businesses.category_group` | 86 of 5,082 | code (`businessCategoryGroups.ts`) | presentation-only | hand-authored | Discover shelf | medium | Medium |
| Business → tags | `businesses.tags[]` | avg **2.13** per row | none | inferred | import | weak filtering | low | High |
| Business → services | `businesses.services` (jsonb) | **1 row populated**, avg 0.0018 | none | manual | hand | none | would be high | n/a — effectively empty |
| Business → service area | **does not exist** | 0 | — | — | — | — | **highest unmet value** | n/a |
| Business → owner/user | `businesses.claimed_by_user_id` | **0** | Supabase auth | canonical when set | — | none | high | n/a |
| Business → claim | no business-claim table (`listing_claims` is property-only) | 0 | — | — | — | — | high | n/a |
| Business → offer | `business_specials` | 6 rows / 5 businesses / **0 currently active** | manual | manual | admin | none live | high | **Critical** — all expired |
| Business → event | `town_events` | **0** | manual | manual | — | none | high | n/a |
| Business → media | `businesses.photos/hero/logo/video` | **1 photo, 1 hero, 0 logos, 0 videos** | manual | manual | uploaded | 2 spotlight pages | very high | n/a |
| Business → editorial | `businesses.editorial_note` | 1 | editorial | manual | staff | spotlights | high | Low |
| Business → founder story | `local_voices` | 20 — **0 join to any business by name** | manual | manual | interviews | partner pages | very high | High (orphaned) |
| Business → partner/owner login | `business_partners` → `local_voices` | 0 | auth | canonical | — | dashboard | high | n/a |
| Business → outreach | `tracked_links` 7, `link_clicks` 5, `outreach_recipients` 0 | 12 | first-party | canonical | server-logged | `/go/:slug` | high | Low |
| Business → engagement | `engagement_events` | **0 (no writer in code)** | first-party | canonical when used | — | none | very high | n/a |
| Town registry | `towns` | 70 (**48 have zero businesses**) | manual | canonical-ish | staff | nav, admin | medium | Medium |
| Town market data | `town_market_data` | 53 (53 active) | scrape/manual | inferred | scrape | town pages | high | High — no freshness contract |
| Town extras | `town_landmarks` 25, `academic_institutions` 15, `town_civic_directory` 6, `town_ledger` 5 | 51 | manual | manual | staff | town pages | medium | Medium |
| Property → town | `property_listings` 3,171 across **171 towns** | 3,171 | feed | canonical for listings | import | `/homes` | high | High (0 indexable, 0 public URLs) |
| Property → agent/brokerage | `listing_agents` 1,237 / `listing_brokerages` **0** | 1,237 | feed | inferred | import | agent pages | medium | High |
| Property legacy | `listings` 366, `rentals` 257, `properties` (legacy, ignore) | — | feed | mixed | import | homes/rentals | medium | High |
| Claims (property) | `listing_claims` | 0 | form | manual | self-reported | admin | high | n/a |
| Applications | `business_applications` | 0 | form | manual | self-reported | admin | high | n/a |
| Leads | `leads` 21, `analyzer_leads`, `investment_leads`, `market_report_leads`, `intel_report_leads`, `deal_desk_requests` (6 separate tables) | 21+ | forms | manual | self-reported | none public | medium | Medium — fragmented |
| Stories/media | `media_stories` | **0** | editorial | manual | staff | `/stories` empty | high | n/a |
| Partners/sponsorship | `partners` 0, `partner_placements` 0, `partner_inquiries`, `subscription_plans` 2 | 2 | manual | presentation-only | — | pricing copy | — | n/a |
| Region | `regions` | 1 | canonical | canonical | staff | branding | platform | Low |
| Roles | `user_roles` | 1 admin | canonical | canonical | manual SQL | admin gate | — | Low |

### Calculated metrics
**[FACT]** Supported by data:
- Categories per business: **1.0** (single text column; 5,022 also carry a subcategory → 1.99 if counted)
- Services per business: **0.0018** (1 business of 5,082)
- Towns / service areas per business: **1.0** (single `town_slug`; no service-area concept exists)
- % with business + town + category: **100%** (all three columns non-null — but see accuracy caveat: 48% of towns are suspect)
- % with business + service + service area: **0%**
- % with a current event or offer: **0%** (6 specials exist, none active; 0 events)
- % with two independent sources: **0%** (`source_url` null on every row; only one source field per record)
- Businesses with any image: **1 of 5,082 (0.02%)**
- Businesses with an owner account: **0**

**[FACT] Not supported — will not estimate:**
- Destinations improved per verified update — no versioning or propagation layer exists.
- Organic search visibility / impressions — Search Console is not connected to this project.
- Consumer call/tap volume — `engagement_events` has no writer; GA4 data was not accessible from here.
- Duplicate rate after entity resolution — no canonical ID exists to resolve against.

---

## 3. Recommended canonical local graph (design only, not implemented)

**[REC]** Fifteen entities. Every fact-bearing row carries `source_id`, `confidence`, `asserted_at`, `asserted_by`.

| Entity | Purpose | Canonical key | Key fields | Cardinality | Provenance rule | Public behavior | History |
|---|---|---|---|---|---|---|---|
| `organizations` | The legal/brand entity | `org_id` uuid + `canonical_slug` | legal_name, display_name, status(active/closed/merged), merged_into_org_id | 1 → N locations | must cite ≥1 source | name/status public | full version log |
| `locations` | A physical branch | `location_id` | org_id, address parts, town_id, lat/lng, phone, hours, geocode_confidence | N → 1 org | address requires source | public if eligible | versioned |
| `aliases` | Former/DBA/misspelled names | `alias_id` | org_id, alias, type(former/dba/typo), valid_from/to | N → 1 org | source or owner | search-only, not displayed | append-only |
| `categories` | Controlled taxonomy | `category_id` + slug | parent_id, label, synonyms[] | tree | editorial-owned | public facets | versioned |
| `org_categories` | Business ↔ category | (org_id, category_id) | is_primary, confidence, source_id | N ↔ N | inferred allowed, labeled | primary shown | log |
| `services` | What is actually offered | `service_id` + slug | category_id, label, synonyms[] | tree | editorial-owned | drives Ask Local | versioned |
| `org_services` | Business ↔ service | (org_id, service_id) | owner_confirmed bool, source_id | N ↔ N | **inferred never shown as confirmed** | badge differs | log |
| `service_areas` | Where they will travel | (org_id, town_id) | radius_mi, owner_confirmed, exclusions | N ↔ N | owner or evidence | powers "serves Voorheesville" | log |
| `towns` / `counties` / `neighborhoods` | Geography | `town_id` slug | county_id, name, aliases, centroid, is_active | hierarchy | canonical, staff-owned | public | slow-changing |
| `events` | Time-bound happenings | `event_id` | org_id?, town_id, starts/ends, source_id | N → 1 org/town | source required | public while future | archived not deleted |
| `offers` | Specials/promotions | `offer_id` | org_id, start/end, terms | N → 1 org | owner-only | auto-expires | archived |
| `editorial_updates` | Stories, notes, civic updates | `update_id` | subject_ref, body, author, published_at | N → any | staff byline | public | versioned |
| `sources` | Evidence ledger | `source_id` | type(owner/official/press/import/staff/scrape), url, captured_at, captured_by | referenced everywhere | **mandatory** | internal, surfaced as "last verified" | immutable |
| `claims` / `corrections` | Proposed changes | `claim_id` | org_id, claimant_user, method, status, proposed jsonb, decided_by/at | N → 1 org | verification method recorded | private | full audit |
| `assets` | Images/video + rights | `asset_id` | owner_ref, url, credit, license, rights_expires_at, shot_by | N → any | **license required to publish** | public only if rights valid | retained |
| `user_follows` | Resident subscriptions | (user_id, subject_ref) | channel, created_at | N ↔ N | first-party | private | log |
| `user_actions` | Calls, taps, directions, searches | `action_id` | subject_ref, action_type, session_hash, town_id, ts | append-only | first-party, bot-filtered | aggregate only | immutable |
| `sponsorships` | Paid, labeled placement | `sponsorship_id` | org_id, surface, town_id, starts/ends, label_text | N → 1 org | contract | **always visibly labeled** | log |

### Safe migration path (no destructive rewrite)
**[REC]** Six additive steps; `businesses` is never dropped and stays the read path until parity:
1. Add new tables alongside; **do not touch `businesses`**.
2. Backfill `organizations` + `locations` 1:1 from `businesses`, keeping `businesses.id` as `legacy_business_id`. Every backfilled row gets a `sources` entry of type `import` with the real `import_batch_id` and `created_at`.
3. Run entity resolution into `aliases`/`merged_into_org_id` — **merge, never delete**. The 144 name groups and 507 address groups become merge candidates in an admin review queue.
4. Map the 90 free-text categories into `categories` via a mapping table; keep the original string on the legacy row for rollback.
5. Create a `businesses_compat` view exposing the old column shape from the new tables. Point one route at it, verify, then move the rest.
6. Freeze writes to `businesses`, keep it read-only for 90 days as a rollback artifact.

Zero rows are deleted at any point. Quarantine = `eligibility_state = registry_only` + `status = suppressed`, never `DELETE`.

---

## 4. Four-state public eligibility contract [REC]

| | **A. registry_only** | **B. verified_basic** | **C. claimed_enriched** | **D. editorial_featured** |
|---|---|---|---|---|
| On-site search | Findable by exact name only; excluded from category/service browse | Full on-site search + facets | Full search, boosted by completeness | Full search + editorial placements |
| Public route | `/biz/:slug` renders a minimal stub | Full profile | Full profile + owner sections | Full spotlight template |
| Index / noindex | **noindex, follow** | **index** | index | index |
| Sitemap | Excluded | Included, priority ≤0.5 | 0.65 | 0.75 |
| Structured data | None | `LocalBusiness` (name, address, phone, url only) | + services, hours, offers, images | + Article/Event/FAQ |
| Identity minimum | Name + town | Name + full street address + phone **or** website, geocoded, ≤1 candidate duplicate | + owner account linked | + verified |
| Category/service minimum | 1 category (may be inferred) | 1 primary category, correctness reviewed | ≥1 confirmed service + ≥1 service area | + full taxonomy |
| Unique content | None required — and none published | ≥1 non-templated sentence sourced or staff-written | ≥60 words owner-supplied + ≥1 licensed image | Original interview + original media |
| Freshness | n/a | verified ≤365 days | ≤180 days or owner touch | ≤90 days |
| Closed / suppressed | stays registry_only | demote to registry_only, page shows "reported closed", noindex within 24h | same + owner notified | unpublish spotlight, keep archive noindexed |
| Promotion | → B when identity + review pass | → C on verified claim | → D by editorial decision only (never purchasable) | — |
| Demotion | — | → A if verification lapses >365d or duplicate confirmed | → B if owner account revoked | → C if content goes stale >180d |

**[FACT]** Today **5,081 of 5,082 rows are state A** and the current sitemap generator already behaves consistently with this contract (1 business URL). The contract formalizes what the code accidentally already does correctly.

---

## 5. Ask Local target contract [ASPIRE / REC]

Not a chatbot. A **graph retrieval** experience where the model only phrases what the graph proves.

1. **Query interpretation** — parse into `{intent, service|category, geography, constraints(time/price/urgency), entity?}`. Deterministic parse first; LLM only for ambiguous residue.
2. **Canonical matching** — resolve to `service_id` + `town_id` (with alias and neighborhood expansion), never free-text `ilike`.
3. **Evidence requirement** — a result may only be returned if it is state B+ **and** every asserted fact links to a `source_id`. No source, no claim.
4. **Explanations** — each result shows *why*: "Confirmed by owner · Serves Delmar · Roof repair · Verified 12 Jun 2026."
5. **Zero results** — never invent. Log the query to `unmet_demand` with town + service, show the closest honest alternative ("no confirmed roofers in Voorheesville; 3 serve New Scotland"), and offer "notify me" + "suggest a business."
6. **Sponsored separation** — sponsored items render in a distinct, labeled slot, never interleaved, never affecting organic order, and are excluded from "why this matched."
7. **Owner-confirmed vs inferred** — two visual states. Inferred facts say "unconfirmed — last seen in public listings, Jun 2026."
8. **Forbidden fabrication** — no invented hours, prices, ratings, reviews, awards, or service areas; no synthesized "best of"; no summarizing a business we have no first-party content for.
9. **Analytics** — `ask_query`, `ask_zero_result`, `ask_result_click`, `ask_call_click`, `ask_no_confirmed_provider`, `ask_sponsored_click` — all first-party into `user_actions`, bot-filtered.
10. **Fallbacks** — model unavailable → deterministic graph results; graph thin → honest "we don't know yet" + capture.

### The seven representative queries, after the graph exists
| Query | Path |
|---|---|
| "plumber in Delmar" | service=plumbing → service_areas contains Delmar → confirmed-first, each with verified date |
| "who fixes roofs in Voorheesville" | service=roof repair; no confirmed provider in town → widen to New Scotland/Bethlehem, label the widening, log unmet demand |
| "is the Roosevelt Room open tonight" | entity resolve → hours from owner-confirmed source; if unconfirmed, say so and link the official source rather than guess |
| "best restaurants in Troy" | superlative refused; return "highest-completeness confirmed restaurants in Troy" + editorial picks clearly labeled as editorial |
| "homes for sale in Niskayuna under 400k" | route to property graph (`property_listings`), not the business graph |
| "what's happening this weekend" | `events` where town in region and starts_at in window; if empty, say empty — never pad |
| "I need a contractor for a kitchen remodel next month" | Home & Property vertical: service=kitchen remodel, stage=planning, urgency=30-day → confirmed providers with matching service area, plus journey content |

---

## 6. First vertical — Home & Property [REC]

Graph slice: `organization → service → town served → property type → project stage → urgency → homeowner journey stage`.

- **Minimum service taxonomy (~30, not 90):** roofing, siding, windows/doors, gutters, masonry/concrete, foundation, framing/carpentry, kitchen remodel, bath remodel, basement finishing, painting (int/ext), flooring, drywall, electrical, plumbing, HVAC install, HVAC service, water heater, well/septic, insulation, chimney, pest, landscaping/design, lawn care, tree service, snow removal, cleaning, junk removal, moving, handyman, home inspection, radon/mold testing.
- **Property types:** single family, condo/townhouse, 2–4 unit, 5+ multifamily, mobile/manufactured, land, small commercial/mixed-use.
- **Project stages:** exploring · planning/budgeting · getting quotes · scheduled · in progress · emergency · maintenance.
- **Urgency:** emergency (<24h) · this week · this month · this season · planning next year.
- **Journey stages:** pre-purchase (inspection, insurance, mortgage) · closing (title, attorney, movers) · first 90 days (locks, cleaning, paint, repairs) · ownership (maintenance, seasonal) · improvement (remodel, additions) · pre-sale (staging, repairs) · investor/landlord (turnover, PM).
- **Relationship tables:** `org_services`, `service_areas`, `org_property_types`, `org_urgency_capability` (emergency yes/no, typical lead time), `org_credentials` (license #, insurance, expiry, source).
- **Owner confirmation workflow:** pre-fill inferred services → owner ticks/untick, sets towns + radius, marks emergency availability and lead time → each tick writes `owner_confirmed=true` with `asserted_at` → 180-day re-confirmation prompt.
- **Evidence:** license numbers verified against the NYS public license lookup and stored as a `sources` row; insurance and credentials expire and auto-demote the badge.
- **Consumer surfaces:** `/home-services/:service`, `/home-services/:service/:town`, `/home-services/emergency/:town`, journey hubs (`/buying`, `/first-90-days`, `/maintenance`), and the existing homeowner shelf on the homepage.
- **Fair-housing guardrails:** this vertical touches housing. No "good/bad neighborhood" language, no school-quality-as-proxy steering, no demographic descriptors in copy or AI output, no filtering or ordering by protected-class-correlated attributes. Ask Local must refuse "where should someone like me live" and answer with factual attributes only.
- **Metrics:** confirmed services per active org, % of top-30 services with ≥3 confirmed providers per priority town, coverage gaps by town, call/tap actions per confirmed provider, zero-result rate for home services, owner re-confirmation rate.
- **Reusable today [FACT]:** `BuyingAndOwningHome.tsx` shelf, `/homes/partners` alias routes (mortgage/insurance/attorneys/contractors/inspectors/property-management), Discover shelf pattern, `BizPage` template, tracked-link engine, `usePaginatedBusinesses` synonym map (as a seed for the service taxonomy).
- **Presentation-only today [FACT]:** the homeowner shelf and partner category pages have no underlying service/service-area data — they are navigation, not a graph. `businesses.services` is populated on exactly 1 row.

---

## 7. Claim + owner flywheel [REC]

**Lifecycle:** find record → claim → verify authority → staff review → owner edits → versioned correction → publish → propagate → track actions → owner dashboard → renewal.

- **Verification methods**, in preference order: (1) email at the business's own domain; (2) phone/SMS OTP to the listed public number; (3) postcard code to the listed address; (4) official document (license, utility bill, incorporation) reviewed by staff; (5) staff in-person/known-relationship attestation, recorded as such. Each writes a `sources` row naming the method — the method is part of the permanent record.
- **Branch management:** claim is at `organizations` level; grants apply per `location` with an org-level admin role. Multi-location owners manage branches from one account.
- **Conflict resolution:** competing claims freeze publication of contested fields, escalate to staff, prefer domain-email over phone over document; losing claimants are told plainly, and the contested state is logged.
- **Moderation:** every owner edit creates a pending `correction` row. Auto-approve low-risk fields (hours, description, photos with rights, services within taxonomy); staff-review high-risk fields (legal name, address, categories, credentials, closure). Nothing bypasses the audit log.
- **Audit history:** append-only `corrections` + `sources`; every published field can answer "who said this, when, and on what evidence."
- **Stale prompts:** 90/180/365-day nudges by state; lapse triggers demotion per §4, not deletion.
- **Revocation/closure:** owner may close (state → suppressed, page shows closed, noindex within 24h) or transfer on sale. Fraudulent claims are revoked and the org returns to its prior verified state — never to zero.
- **Free owner capabilities:** claim, verify, correct core facts, confirm services + service areas, hours, add photos with rights, respond to corrections, see basic view/call counts.
- **Paid capabilities:** video and richer media, long-form story, offers and events, multi-town service-area presentation, full analytics, priority support, labeled sponsorship.
- **What payment cannot change [locked]:** organic rank, the verified badge, another business's record, suppression of a legitimate correction, presentation of inferred facts as owner-confirmed, or removal of a closure report.

---

## 8. 30 / 60 / 90-day roadmap [REC]

### Days 0–30 — Source of truth & safety
- **Objectives:** stop publishing what we cannot defend; make the current state measurable.
- **Tasks:** connect Google Search Console (day 1); add `eligibility_state` + `sources` + `corrections` tables (additive only); quarantine POI junk (USPS, ecoATM, CVS Photo, UPS Access Point, MoneyGram — flag, never delete); build a duplicate-review queue for the 144 name / 235 phone / 507 address groups; fix the 2,436 `schenectady` mis-slugs and 793 city/town mismatches from address data; collapse 90 categories into the ~30-node taxonomy behind a mapping table; remove the synthetic placeholder flash on `/biz/:slug`; wire `engagement_events` + the 5 dead GA events.
- **Dependencies:** none — this phase deliberately depends on nothing.
- **Must not change:** the sitemap eligibility gate (it is already correct), route structure, brand/design, the two flagship spotlight pages.
- **Done when:** every row has an `eligibility_state`; zero POI-junk rows in any public surface; town assignment accuracy ≥95% on a 100-row manual sample; Search Console verified and sitemap submitted; first-party action events flowing.
- **Newly measurable:** impressions/coverage, real page views, call/tap actions, town-level engagement.
- **Gate:** do not proceed until the junk is quarantined and Search Console reports coverage.

### Days 31–60 — Canonical identity + claim loop
- **Objectives:** one ID per business; owners can fix their own record.
- **Tasks:** create `organizations`/`locations`/`aliases`; backfill 1:1 with `legacy_business_id`; resolve the merge queue; ship the four-state contract in code (search, routes, robots, sitemap, structured data); build claim → verify (domain email + phone OTP) → staff review → versioned correction → publish; owner edit of core fields; admin approval UI replacing manual SQL; `LocalBusiness` + `BreadcrumbList` JSON-LD on state-B+ pages only.
- **Dependencies:** phase 1 complete.
- **Must not change:** no deletions; `businesses` stays readable; no paid features yet.
- **Done when:** 250+ orgs in state B, 25+ verified claims completed end-to-end, median claim-to-publish < 48h, zero state-A pages indexable.
- **Newly measurable:** claim conversion, verification method mix, correction volume, time-to-publish.
- **Gate:** ≥25 completed claims and ≥10 owners returning to edit a second time. If owners don't come back, fix value before scaling.

### Days 61–90 — Home & Property vertical + demand data
- **Objectives:** prove the graph produces better answers than a directory.
- **Tasks:** ship `services`/`org_services`/`service_areas`/`org_property_types`; owner confirmation UI; seed the top 30 services across 8 priority towns; `/home-services/:service/:town` pages (state B+ only); deterministic graph retrieval for Ask Local with "why this matched" and zero-result capture (LLM phrasing layer optional and last); owner dashboard with real action counts.
- **Dependencies:** phases 1–2.
- **Must not change:** neutrality contract; no ranking by tier; no fabrication in Ask Local.
- **Done when:** ≥3 confirmed providers for the top 10 services in each of 8 towns; zero-result rate for home-service queries < 30%; ≥100 measured consumer actions (calls/directions/website) attributable to confirmed providers; owners can see those numbers.
- **Newly measurable:** unmet demand by town × service, actions per provider, confirmation coverage.
- **Gate — the monetization gate:** only when a cohort of owners can see real, attributable consumer actions should Stripe and paid tiers be built. Payment follows proven value, never precedes it.

---

## 9. Do not build yet [REC]

| Deferred | Why |
|---|---|
| Regional expansion beyond the Capital District | Region #1 has 1 verified business. Expansion multiplies an unproven model. |
| More raw business imports | 5,082 rows produced 1 indexable page. More rows make the ratio worse, not better. |
| Generalized AI chatbot | Copyable, and without an evidence graph it will fabricate. Ship retrieval first, phrasing last. |
| Reviews / star ratings | Requires volume, moderation, and legal exposure; competes with Google where we cannot win. Verified facts are the differentiator. |
| Native app | No retention loop exists yet. `user_follows` and events must work on web first. |
| Recommendation ML | Nothing to train on — 0 engagement events. |
| Broad RSS/news ingestion | `media_stories` is empty; automated ingestion at scale conflicts with the no-fabrication and provenance rules. |
| Full Stripe tier automation | Selling presentation before owners can see consumer actions creates churn and reputational damage. Manual invoicing for the first cohort is fine. |
| Multi-region admin in SAL | Real, but blocked behind proving Region #1. |
| Events at scale | Ship the schema in the vertical; don't run an events operation until there is an audience. |

---

## 10. Founder decisions required [REC = my default]

| # | Decision | Recommended default |
|---|---|---|
| 1 | Canonical discovery route: `/local` vs `/businesses` | **`/local` is canonical** (DB-backed, in sitemap at 0.95). `/businesses` becomes the editorial Discover surface and canonicalizes to `/local` for directory intent. |
| 2 | Quality-first core vs keeping all 5,082 publicly searchable | **Quality-first.** All 5,082 stay in the database; only state B+ is publicly searchable and indexable. Nothing is deleted. |
| 3 | Separate `organizations` from `locations` | **Yes.** Multi-branch and franchise data is already broken (16 USPS, 13 Stewart's rows) and cannot be fixed without it. |
| 4 | Initial taxonomy | **~30 services across 8 groups**, mapped from the current 90 strings; healthcare and dental stay first-class per existing policy. |
| 5 | Owner verification method | **Domain email primary, phone OTP secondary, document tertiary.** Method recorded on the record. |
| 6 | Public eligibility thresholds | **Adopt §4 as written.** The riskiest knob is state B's "≥1 unique sentence" — do not lower it. |
| 7 | Paid placement neutrality | **Adopt §1.5 as a locked policy** and publish it on the pricing page. It is a marketing asset, not a constraint. |
| 8 | Home & Property as first vertical | **Yes** — highest intent, highest willingness to pay, and it reuses existing homeowner surfaces. |
| 9 | Connect Search Console before any new sprint | **Yes, day 1, non-negotiable.** Every SEO claim is currently unfalsifiable. |
| 10 | *(added)* Own the neutrality/no-fabrication policy publicly | **Yes** — it is the differentiator versus every scraped directory in the region. |

---

## 11. Final completion

### Top 10 strengths [FACT]
1. Sitemap eligibility gate already refuses thin content — accidentally best-practice.
2. Real property graph: 3,171 listings across 171 towns, 1,237 agents.
3. Working first-party attribution: `/go/:slug` → `track-click` → `link_clicks`.
4. Distinctive, coherent design system with locked brand rules.
5. Two genuine flagship spotlights (Roosevelt Room, Cassone) with owner-supplied imagery.
6. 20 original founder interviews in `local_voices` — non-copyable content.
7. RLS enabled on all 42 public tables; only 3 linter warnings.
8. Real auth + partner dashboard scaffolding already shipped.
9. Multi-region platform separation (SAL / Supabase / CDN / Nest OS) is coherently documented.
10. Town content layer: 53 market-data towns, 25 landmarks, 15 institutions, civic directory.

### Top 10 risks
1. **[FACT]** 5,081 of 5,082 businesses have no description, image, hours, or verification.
2. **[FACT]** 48% of businesses are mapped to a single town slug — the geography layer is not trustworthy.
3. **[FACT]** Verified category errors (Lowe's→Restaurant) make the taxonomy unusable for retrieval.
4. **[FACT]** 0% of records have two independent sources; `google_place_id` and `source_url` are null everywhere — nothing can be re-verified.
5. **[FACT]** No business-claim table and 0 owner accounts — the index cannot self-heal.
6. **[FACT]** 0 engagement events, Search Console unconnected — no evidence loop for owners or investors.
7. **[FACT]** Content surfaces are empty: 0 stories, 0 events, 0 active offers.
8. **[FACT]** 15 tables accept unauthenticated inserts with `WITH CHECK (true)` — spam exposure.
9. **[INFER]** Publishing POI junk (ecoATM, CVS Photo, UPS Access Point) as "local businesses" damages owner trust on first contact — the exact audience being emailed.
10. **[INFER]** Feature surface has outgrown verified data by roughly two orders of magnitude; every new page dilutes crawl budget and attention.

### Top 10 next actions
1. Connect Google Search Console.
2. Quarantine POI junk (flag, don't delete).
3. Fix the 2,436 mis-slugged town assignments from address data.
4. Stand up the duplicate-merge review queue.
5. Collapse 90 categories to ~30 behind a mapping table.
6. Add `eligibility_state` + `sources` + `corrections`.
7. Wire `engagement_events` and the 5 dead GA events.
8. Remove the synthetic placeholder flash on `/biz/:slug`.
9. Ship claim → verify → correction → publish.
10. Seed Home & Property services + service areas for 8 towns.

### Interpretations
- **Investor:** a well-built regional platform with a credible property/editorial asset base and a distribution thesis, currently pre-traction. The scraped directory is not the asset; the claim loop, verified service graph, and first-party demand data would be. Traction should be measured in **verified businesses and attributable consumer actions**, not row counts. Both are near zero today, which makes the next 90 days the entire story.
- **Consumer:** the site looks like a premium local publication but can currently answer very few real questions with confidence — no events, no stories, no offers, one photographed business. It routes intent well; it does not yet resolve it.
- **Business owner:** if contacted today, an owner sees a page with their name and possibly a wrong category, no photo, no description, no way to log in and fix it, and no numbers proving anyone visited. That is a hard sell. After the 60-day claim loop and 90-day action data, the same conversation becomes "here is your page, fix it yourself in two minutes, and here are the calls it generated."

### Final classification
**Directory (early), with the assembled components of an emerging local intelligence graph.**

Not yet an emerging graph: **[FACT]** there are no service, service-area, evidence, claim, versioning, or action tables; average services per business is 0.0018, service areas per business is 0, records with two sources is 0%, and businesses with an owner is 0. Those are the defining structures of a graph, and none exist.

Not merely a directory either: the property layer, town layer, editorial assets, tracking engine, tier schema, and eligibility gate are real and correctly built.

**It becomes an emerging local intelligence graph the moment canonical identity + owner corrections + verified services/service areas exist with provenance — the 60-day gate above.** It becomes an operating platform when owners maintain their own records and consumers take measurable actions at volume — beyond the 90-day horizon.
