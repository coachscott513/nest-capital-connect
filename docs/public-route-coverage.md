# Public route / template coverage — light Coach-aligned system

Light mode: `PublicBrandMode` adds `nest-brand` to `<body>` on every route except legacy prefixes (see `src/components/brand/PublicBrandMode.tsx`).
Hero: `SplitHero` or the `.nest-split` markup (text left, media right; mobile text first).

| Route | Template / file | Light | Split hero | Notes |
|---|---|---|---|---|
| `/` | `components/home/DirectoryEditorialHome.tsx` | yes | photo search hero + 4 split sections + category explorer | rotator pausable, reduced-motion static |
| `/local` (+ filtered) | `components/local/LocalHero.tsx`, `BusinessDirectory.tsx` | yes | yes (unfiltered) | filtered view keeps compact header |
| `/businesses/:category` | `pages/businesses/BusinessCategoryPage.tsx` | yes | yes | neutral discovery image |
| `/biz/:slug` (free/featured/premium) | `pages/biz/BizPage.tsx` | yes | yes | business photo/video or monogram card only |
| `/business` | `pages/BusinessLanding.tsx` | yes | yes | |
| `/for-businesses` | `pages/business/ForBusinesses.tsx` | yes | existing split (text left, mock right) | |
| `/for-businesses/apply` | `pages/business/Apply.tsx` | yes (tokens) | no | wizard kept for usability |
| `/claim-business` | `pages/ClaimBusiness.tsx` | yes | yes (form + success state) | |
| `/pricing` | `pages/Pricing.tsx` | yes | yes | |
| `/professional-services`, `/home-services`, `/restaurants`, `/wellness` | `components/HubRoom.tsx` | yes | yes | route-specific photos |
| `/communities`, `/communities/:city` | `pages/Communities.tsx` | yes | yes | photo tiles use `.nest-on-photo` |
| `/towns/:slug` | `pages/TownPulse.tsx` | yes | yes | exact-town photo map, else neutral card |
| `/living-in/:town` | `components/town/TownPageTemplate.tsx` | yes | yes | |
| `/living-in/:town/:hood` | `pages/MicroNeighborhood.tsx` | tokens | no | not fully re-heroed |
| `/homes` | `pages/homes/HomesHub.tsx` + homes components | yes | yes | RealScout untouched |
| `/investment-properties` | `pages/InvestmentProperties.tsx` | yes | yes | |
| `/sell-investment-property` | `pages/SellInvestmentProperty.tsx` | yes | yes | |
| `/finances` | `pages/FinancialConsole.tsx` | yes | yes | no finance guide routes exist |
| `/weekly` | `pages/WeeklyPulse.tsx` | yes | yes | event cards keep photo scrim |
| `/blog`, `/blog/:slug` | `pages/Blog.tsx`, `BlogPost.tsx`, `BlogArticle.tsx` | yes (tokens) | no | blue masthead kept |
| `/contact` | `pages/ContactPage.tsx` | yes | yes | |
| Header, footer, mobile menu, dock, concierge pill, mobile CTA | shared chrome | yes | — | dock stays graphite capsule |

## Not yet migrated (inherit light tokens only; may contain hardcoded dark styles)
`/analyze/*` calculators, `/analyze-any-property`, `/closing-team`, `/neighborhoods*`, `/submit-event`, other long-tail landing pages. Check with screenshots before claiming coverage.

## Intentional legacy theme
`/admin*`, `/launch-dashboard`, `/dashboard`, `/partner-*`, `/seo-audit`, `/reports*`, `/intel*`, `/intelligence`, `/cash-flow-report`, `/market-reports*`, `/investor*`, `/go/`.
