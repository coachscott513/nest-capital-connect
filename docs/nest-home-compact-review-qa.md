# Homepage compact follow-up QA (review of a3c9354)

Local preview, Nov 24 2026, real Lovable Cloud data, no writes.

## First update position (top of first feed row, page y)
| Width | Normal text | Large text | Before |
|---|---|---|---|
| 320 | 987 | 1042 | — |
| 390 | 845 | 961 | 1083 |
| 430 | 832 | — | — |
| 768 | 783 | — | — |
| 1440 | 462 | 526 | 818 |

Changes: edition/date moved into the title row; A–Z town chooser beside the Towns heading; All categories beside the Categories heading; search, Saved, Latest/Browse toggle and context merged into one toolbar; desktop puts towns in a left column beside categories/feed. All 12 primary categories and six named towns stay visible; every town/category target measured ≥44px with no clipped labels; no horizontal overflow at any width/theme/text size. First-screen screenshots inspected at 390 and 1440 (light), 320 dark+large, 1440 dark.

## Category accuracy
Category links now use structured `cat` keys (subcategory patterns; broad category only when subcategory is empty), not free-text search. Full-region counts checked against stored taxonomy: Restaurants 228 (no pet sitter / "bar" substring matches; restaurant supply stores excluded), Coffee 20, Contractors 387, Home services 802, Mortgage lenders 14, Insurance 86, Health & wellness 153 (medical + wellness), Salon & spa 165 (salons + spas), Roofing 53, Plumbing 43. Delmar/Bethlehem Restaurants: 18, pages 1–2 no duplicates. Albany: Contractors 33, Insurance 4, Health & wellness 5, Mortgage 1, Home services 77, Coffee 0 (no Albany coffee rows stored — truthful empty state). Town and category survive search and paging; back/forward restores URL state.

## Search scope
Latest view placeholder is "Search updates"; with a query, a "Search businesses for “q” in Town" link opens the business browse with town and query.

## Latest pagination
Real data: pages 6/6/6/3, 21 unique rows, finite end. Unit regressions: adapter-rejected sources (80% invalid), duplicate-heavy sources (5× republished URLs), bounded chunks for a 5,000-row source. 102 tests pass; preview build OK.

## Limitations
- Free-text business search keeps the legacy synonym expansion (e.g. "pizza" can match a bar or "health department"); only category links are structured.
- "Open the full directory" passes the closest legacy `/local` category, which is a broader substring filter than the homepage category.
- Some imported rows lack town names ("Town not supplied") or have imprecise subcategories; data unchanged.
