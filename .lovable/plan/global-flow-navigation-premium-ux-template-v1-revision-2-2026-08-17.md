# Global Flow / Navigation / Premium UX — Template v1 (Revision 2)

Planning only. No source edits, no publish, no deploy. The accepted SEO baseline stays frozen.

---

## A. Approved direction (locked)

1. **Nine homepage chapters, one idea each**: Hero → Regional Search → Businesses & Services → Property Intelligence → Closing Team → Home Services → Towns → This Week → Talk to Scott.
2. **Six navigation intents**: Discover, Homes, Analyze, Towns, Events & Stories, For Business — plus Search and Sign In. Closing Team and Home Services are demoted from top-level desktop nav; their routes, footer links, and in-page links stay.
3. **RealScout**: principal Homes mode stays in-page against the existing agent-scoped widget. The only verified external map is City of Albany (`geo_id=3601000`) and is labeled Albany-only and secondary. No region-wide external map is claimed — `capitalDistrictMapUrl` is verified null.
4. **Businesses copy**: "Thousands of Capital District businesses" until the accepted footprint is published and verified. No public 5,000+ claim.
5. **Sponsored Spotlight contract** (planning only): labeled paid placement, zero organic-rank effect, no automatic selection, hidden when inventory is empty, explicit founder approval per placement.
6. **Phasing**: publish and verify the accepted SEO baseline first; then UX phases in preview, independently reviewable, screenshots, no auto-publish, sitemap and raw-HTML contracts preserved.

---

## B. Property Intelligence — evidence-based destination matrix (UNRESOLVED)

Audit performed against current source. No mapping is locked until founder selects a column.

| AAP decision concept | Proposed earlier | Evidence found | Verdict | Recommended |
|---|---|---|---|---|
| Multi-Unit Cash Flow | `/analyze/multifamily` | Page performs rent roll, NOI, DSCR, cash flow, break-even occupancy | **Valid (A)** | Keep `/analyze/multifamily` |
| Land | `/analyze/land` | Page performs carrying cost, acquisition basis, build/resale scenarios | **Valid (A)** | Keep `/analyze/land` |
| Fix & Flip | `/analyze/rental` | `/analyze/rental` computes cash flow, cap rate, cash-on-cash, DSCR only — **no ARV, rehab, holding, or resale math** | **Invalid** | Real flip math exists at `/homes/analyze` (`fix_flip` mode: ARV, rehab budget, holding months, resale cost, total project cost, flip ROI) and `/analyzer` (203k + hard-money flip). Choose **A** = `/homes/analyze` deep-linked to `fix_flip` (needs a small URL-param read; mode is state-only today) or **B** = AAP gateway with `decision_type=flip` |
| First Property / House Hack | `/first-time-buyers` | Page is program/myth education (FHA, SONYMA, VA, DPA). **No effective-housing-cost or house-hack math.** The only effective-housing-cost worked example is `/case-studies/177-lancaster-albany` | **Insufficient alone** | **B** = AAP gateway with `decision_type=first_property`, with `/first-time-buyers` offered as secondary reading. Option A only if a house-hack effective-cost module is authorized as separate scope |
| Featured Analyses | `/reports` | `/reports` renders "Sample Reports Coming Soon" — a placeholder, not a library | **Invalid** | Point at the verified worked analyses: `/reports/sample-property-intelligence` and `/reports/1999-ridge-road-queensbury-ny`, or authorize building a real curated index at `/reports` (separate content decision) |

**Gateway gap.** `/analyze-any-property` currently calls the destination helper **without** a decision type. Choosing option B for any card requires the gateway to accept and forward `decision_type` plus region attribution through `analyzeAnyPropertyUrl` — a small, contained change, listed here so it is not assumed.

**Secondary defect found (not in scope, flagged).** `/analyze/rental`, `/analyze/land`, and `/analyze/multifamily` each render an "All Analyzers" back-link to `/analyze`, which redirects to `/finances`. Recommend a separate fix.

**Preview-state correction required.** The current preview build already wires Fix & Flip → `/analyze/rental`, First Property → `/first-time-buyers`, and Featured Analyses → `/reports`. These are provisional and must be re-pointed per the founder's selections above before any visual review sign-off.

---

## C. Closing Team role destinations (UNRESOLVED — dead-end risk confirmed)

| Role | Evidence | Verdict |
|---|---|---|
| Financing | `/financing` is a real consumer page and is in the accepted Tier A list | **Valid** |
| Attorneys, Inspection, Insurance, Property Management | `/homes/attorneys`, `/homes/inspectors`, `/homes/insurance`, `/homes/property-management` **all render the same partner-recruitment page** ("Get featured where local searches begin") with `canonical=/homes/partners`. They are a B2B pitch, not consumer role directories | **Invalid — dead end** |
| Title / closing support, Survey & appraisal | Only `/closing-team` exists | Valid **only if** `/closing-team` gains a per-role educational state |

Recommended resolution (founder to confirm per row):
- Attorneys → `/businesses/legal-services`; Insurance → `/businesses/insurance`; Property Management → `/businesses/property-management` (all are real canonical category routes).
- Inspection, Title, Survey & appraisal → `/closing-team` with a deep-linked role state that explains the role, what it costs, when it happens, and offers a neutral directory path — never an empty provider list.
- Named providers stay a separate founder-approved layer, gated at ≥3 approved providers across ≥3 distinct roles.
- The current preview wiring to `/homes/*` must be replaced before review.

---

## D. Later SEO decisions (explicitly deferred)

1. `/closing-team` and `/home-services` remain SPA-only, `noindex`, absent from the sitemap. The UX sprint preserves that contract exactly.
2. **After visual approval**, a separate founder decision covers whether either route has earned a dedicated `SEOHead` + Tier A snapshot + sitemap entry. Nothing is added to the indexable footprint inside the UX sprint.
3. Any new role-state URLs (e.g. `/closing-team#inspection` or a param) must stay non-indexable variants of the existing route in phase 1.
4. `/reports` content decisions (Featured Analyses) are content + SEO scope, not UX scope.

---

## E. AAP design primitives (UNRESOLVED — audit first)

The CDN Manrope stack is **not** assumed to be the shared ecosystem type system. Before implementation, produce a comparison of the verified AAP design-system documentation against CDN and return an exact mapping table for: type scale and weights, control heights and radii, spacing rhythm, focus states, and disclosure/label patterns. CDN retains the premium dark regional canvas; AAP retains paper/survey report mode. Only tokens proven shared get promoted.

---

## F. Implementation sequence (gated)

| Gate | Contents | Blocks on |
|---|---|---|
| 0 | Publish + verify the accepted SEO baseline | Founder authorization |
| 1 | Return destination matrix decisions (Section B), role decisions (Section C), AAP primitives mapping (Section E) | Founder selections |
| 2 | Navigation restructure to six intents (desktop + mobile), routes and footer links untouched | Gate 1 |
| 3 | Chapter wiring corrections + Regional Search modes + Businesses chapter copy | Gate 2 |
| 4 | Closing Team role states and neutral directory paths | Gate 3 |
| 5 | Sponsored Spotlight contract scaffolding (hidden with empty inventory) | Gate 4 |
| 6 | Post-visual SEO decision on `/closing-team` and `/home-services` | Separate approval |

Every gate: preview only, screenshots, sitemap checksum and raw-HTML head contracts re-verified, no auto-publish.

---

## Open questions for the founder

1. Fix & Flip: internal `/homes/analyze?mode=fix_flip` or external AAP `decision_type=flip`?
2. First Property / House Hack: AAP gateway now, or authorize a house-hack effective-cost module?
3. Featured Analyses: link the two existing worked reports, or authorize a curated `/reports` index?
4. Closing Team: approve the `/businesses/*` category destinations for attorneys, insurance, and property management?
