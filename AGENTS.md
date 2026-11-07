# Architecture rules
- Keep the homepage directory search routed through the existing `/local` query contract; its server-filtered pagination owns business results, avoiding a duplicate or incomplete search index.
- Build the directory-first homepage in `DirectoryEditorialHome` with additive editorial styles; preserve legacy page components, shared theme tokens, routes, and SEO contracts.
- Retain the original RealScout widget in an embedded homepage disclosure with its existing configuration and anchor; embedding suppresses the old headline to maintain one homepage H1.
- Scope homepage visual tokens to `.nest-brand` and its mounted body mode; use full-value brand colors directly and compatible HSL aliases for Tailwind v3, so legacy pages and reports keep their original themes.