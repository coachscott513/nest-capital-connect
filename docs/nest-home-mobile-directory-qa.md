# Homepage mobile directory revision — QA (Nov 24, 2026)
- Default homepage: 6 feed rows total, no directory list; 0px horizontal overflow and 0 cell overlaps at 320/390/430/768/1440 × light/dark × normal/large.
- Feed starts at ~1,083px (390), ~818px (1440); page length 2,713px (390) vs prior long stacked inventories.
- Town links 16px/600 (18px large), 44px tall. Six featured towns + All towns + A–Z dialog (101 towns, searchable).
- Latest: 21 updates over 4 pages, 21 unique, Previous/View more replace the batch.
- Delmar → Restaurants: 39 businesses, 8/page, page 2 no overlap; Mortgage lenders 8; Plumbing 1; Homes keeps Delmar.
- Back/forward restore category URLs; rental page 2 Details opens exact rental and closes; saved rental survives reload.
- Limitation: directory keyword synonyms are the existing /local ones (e.g. "restaurant" also matches "bar", so some unrelated names appear).
