# Architecture rules
- Keep the homepage directory search routed through the existing `/local` query contract; its server-filtered pagination owns business results, avoiding a duplicate or incomplete search index.
- Build the neutral homepage in `MarketFeedHome` with scoped feed styles; retain `DirectoryEditorialHome` and its components for rollback, preserving legacy routes and SEO contracts.
- Retain the original RealScout widget in an embedded homepage disclosure with its existing configuration and anchor; embedding suppresses the old headline to maintain one homepage H1.
- Scope the new feed theme to `.nest-feed` and its mounted body mode with compatible HSL tokens, so legacy pages/reports retain their themes.
- The Nov 24 authorized compact feed replaces the old search-hero/four-pillar homepage mandate; preserve the north-star/design notes and legacy designs rather than deleting them.
- Feed adapters accept edition configuration, exclude unpublished/import-preview inventory, use semantic source dates and queue polling arrivals; directory metadata never becomes a duplicate business search index.
- Static fallback head metadata is Helmet-managed (`data-rh`) without canonical or schema; route metadata replaces it rather than duplicating identity across pages.