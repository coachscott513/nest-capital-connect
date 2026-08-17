# Business Enrichment Priority Queue (Design Only)

Status: internal design artifact. Nothing in this document is implemented or
public in this sprint. No page content, ranking, or indexing behavior changes
because of it.

## Position on thin pages

Roughly 3,621 emitted business pages carry under 500 characters of
pre-hydration text. That thinness is factual, not defective:

- We do **not** generate filler descriptions, invented history, invented
  service lists, or synthesized "about" prose.
- We do **not** bulk-`noindex` truthful thin pages. A short page containing
  only verified facts is preferable to a longer page containing invented ones.
- Enrichment happens by acquiring real facts, never by writing around missing
  ones.

## Prioritization model

Ordered signals used to rank which records get human/owner enrichment effort
first. Each is evidence-based; none is a paid lever.

1. **Search Console clicks and impressions** where available for the page URL.
2. **Average search position** — pages ranking 5–25 gain most from real facts.
3. **SEO-protected state** — records already earning external references.
4. **Commercial/category relevance** to the region's decision surfaces
   (home services, closing team categories, food & drink, health).
5. **Missing hard facts**, weighted by fact type: phone, website, address,
   hours, social links, service area. More missing high-value facts, and
   more evidence of demand, means higher queue position.
6. **Existing engagement events and contact actions** already recorded for
   the entity (views, outbound taps, directions, calls).
7. **Owner claim or correction activity** — an owner who has claimed or
   submitted a correction is the cheapest and most authoritative source.
8. **Graph depth** — town, category, and related-entity relationships that
   make the record load-bearing for internal discovery.
9. **AI-assistant or search-engine referral evidence**, where the referral
   source can be safely and confidently classified.

## Invariants

- **Paying never changes organic rank.** Sponsorship affects clearly labeled
  placement modules only, never the neutral ordering of results.
- **No generated facts.** Every field must trace to the owner or an
  authoritative source.
- **Provenance labeling is mandatory.** Owner-supplied and authoritative-source
  facts must retain their source and timestamp so they can be re-verified or
  withdrawn.
- **Absence is displayed as absence.** Missing facts are omitted or marked
  pending, never approximated.
- This is a queue design. Implementation, UI, and any public behavior change
  require separate founder approval.
