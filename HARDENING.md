# Capital District Nest — Production Hardening Notes

Companion to the in-code hardening pass. Captures recommendations
that live outside the React codebase (Cloudflare, edge platform,
GA4 admin) so they don't get lost.

## 1. What changed in code

### Directory fetch caps
- `src/hooks/useDbBusinesses.ts` no longer loops through the
  entire `businesses` table. It accepts `{ townSlug, featuredOnly,
  limit }` and is hard-capped at **500 rows** server-side, default
  **200**. Card-only columns are selected — long descriptions,
  photo arrays, social URLs, hours, and services are excluded
  until a profile is opened.
- Callers were tightened:
  - `DelmarBusinessCarousel` → `{ townSlug: "delmar", limit: 24 }`
  - `LocalGuideSection` → `{ townSlug, limit: 200 }`
  - `home/SupportLocalSection` → `{ featuredOnly: true, limit: 24 }`
- `/local` already paginates via `usePaginatedBusinesses` (24/page,
  `.range(from, to)`, server-side filters, 300ms debounce, 2-char
  minimum on text search, filter changes reset to page 0).
- `useMediaStories` is capped at 60 approved rows server-side.

### Bot-aware analytics
- New helper `src/lib/botDetection.ts` flags WebDriver, common bot
  user-agents (Googlebot **excepted from analytics suppression**,
  but Googlebot also doesn't run our JS so it's a non-issue),
  PhantomJS, headless Chrome, and empty-`languages` sessions.
- `AnalyticsTracker.useAnalytics` and `GARouteTracker.trackGAEvent`
  short-circuit every custom event when `isLikelyBot()` is true.
  `page_view` is intentionally **not** gated — GA4 still counts
  raw traffic, but conversion/engagement events stay clean.
- New explicit GA4 helpers on `trackGAEvent`:
  `businessProfileOpen`, `businessContactOpen`, `callClick`,
  `textClick`, `emailClick`, `websiteClick`, `claimProfileClick`,
  `pricingClick`, `mediaStoryClick`, `videoCoverageClick`,
  `newsletterSignup`, `financialIntroSubmit`, `searchSubmit`
  (rejects searches under 2 chars).

> Rule for future wiring: **never** call these from `useEffect` /
> mount. They must fire from `onClick` / `onSubmit` handlers only.

## 2. Cloudflare configuration (recommended)

Apply at the zone for `capitaldistrictnest.com`:

### Bot management
- **Bot Fight Mode**: ON for free tier, or **Super Bot Fight Mode**
  if available. Set "Definitely Automated" → **Block**, "Likely
  Automated" → **Managed Challenge**.
- **Verified Bots**: **Allow** (this is the default — keeps
  Googlebot, Bingbot, Applebot, social previews, etc. working).

### Rate limiting rules
Create three rules (Security → WAF → Rate limiting rules):

| Name | Match | Threshold | Action |
|---|---|---|---|
| Local directory burst | `(http.request.uri.path contains "/local")` | 60 req / 1 min per IP | Managed Challenge |
| Public API burst | `(http.request.uri.path contains "/rest/v1/" or http.request.uri.path contains "/functions/v1/")` | 120 req / 1 min per IP | Block 10m |
| Search endpoints | `(http.request.uri.path contains "/biz" or http.request.uri.path contains "/towns" or http.request.uri.path contains "/media")` | 90 req / 1 min per IP | Managed Challenge |

Skip the rule for known good bots: add `and not cf.client.bot` to
each expression.

### Caching
- **Cache everything** for `*.js`, `*.css`, `*.woff2`, `*.png`,
  `*.jpg`, `*.webp`, `*.avif`, `*.svg` → Edge TTL 30 days,
  Browser TTL 7 days.
- **Bypass cache** for `/admin/*`, `/auth`, `/partner-dashboard`,
  `/partner-auth`, and any request with an `Authorization` header
  or `sb-*-auth-token` cookie.
- Enable **Tiered Cache** and **Always Online**.

### Headers
- Enable **Brotli**.
- Enable **HSTS** (12 months, includeSubDomains, preload).
- Add Transform Rule: response header `X-Robots-Tag: noindex` on
  `/admin/*`, `/partner-dashboard`, `/auth` (defense in depth on
  top of robots.txt).

## 3. Suspicious-traffic logging

Cloudflare's free **Security Events** log already captures path, UA,
referrer, IP, and request rate. Use that as the primary signal —
no client-side logging needed (and adding it would just give
scrapers another endpoint to hit).

If deeper analysis is required, enable **Logpush** to an R2 bucket
with fields: `EdgeStartTimestamp`, `ClientRequestPath`,
`ClientRequestUserAgent`, `ClientRequestReferer`, `ClientIP`
(hashed), `EdgeResponseStatus`, `ClientCountry`, `BotScore`. No
PII required.

## 4. GA4 admin tasks

- In GA4 → Admin → Data Settings → Data Filters: enable the
  built-in **"Exclude all hits from known bots and spiders"**
  filter (it's on by default but worth confirming).
- Mark these as **Key Events** (conversions):
  `generate_lead`, `business_profile_open`, `business_contact_open`,
  `call_click`, `email_click`, `claim_profile_click`,
  `pricing_click`, `newsletter_signup`, `financial_intro_submit`,
  `media_story_click`, `video_coverage_click`, `schedule_consultation`.
- Leave `page_view` un-marked.

## 5. SEO safety check (unchanged, verified)

- `public/sitemap.xml` accessible, `public/robots.txt` open to
  Googlebot/Bingbot/Applebot and the AI crawlers we want.
- Town/business/media/finance pages render static, crawlable HTML
  on first paint — no auth or JS interaction required for the
  content tree.
- Pagination uses real anchors / standard URL params so crawlers
  can still discover deep pages from `/local`.

## 6. Open follow-ups (not in this pass)

- Add explicit `trackGAEvent.businessProfileOpen(...)` calls inside
  `BusinessDirectory` profile modal `onOpen` and `MediaSourceModal`
  story click handlers. The helpers exist; wiring is a small,
  separate UX pass.
- Consider moving the public Supabase `anon` key behind a
  Cloudflare Worker that enforces per-IP request budgets and
  strips heavy columns — useful if scrapers escalate.

## 7. Anti-scraping pass (2026-05-28)

- **Pagination** — every public list path is server-capped: `/local`
  uses `usePaginatedBusinesses` (24/page), `useDbBusinesses` is hard
  capped at 500 with default 200, `useMediaStories` at 60. There is
  no client path that pulls the full 5,000+ businesses table.
- **Field hygiene** — list fetches only request card columns
  (id/name/slug/town/category/phone/website/hero/rating). Heavy or
  sensitive fields (`long_description`, `photos[]`, claim metadata,
  scrape source, internal flags, owner email) are not selected
  until a detail modal is opened, and `claimed_by_user_id`,
  `import_batch_id`, `external_id`, `source_url`, `last_synced_at`,
  `subscription_status`, `stripe_*` are never selected in any
  client query.
- **Bot analytics gate** — `isLikelyBot()` continues to suppress
  every custom GA4 event for WebDriver / headless / known-bot UAs.
  `page_view` stays unfiltered so raw indexing traffic is visible.
- **Honeypot** — `src/components/Honeypot.tsx` provides a reusable
  hidden field. Wired into `MasterGatekeeperModal` (highest-traffic
  lead entry). New lead/contact forms should use it via
  `useHoneypot()` + `<Honeypot bind={hp} />` and bail when
  `hp.isBot()` is true.
- **robots.txt** — extended `Disallow` block to cover `/admin`,
  `/dashboard`, `/supabase`, `/functions/`, `/rest/`. Public
  surfaces (`/`, `/local`, `/towns`, `/biz`, `/sitemap.xml`) remain
  fully open to Googlebot, Bingbot, Applebot, and the allow-listed
  AI crawlers.
- **Rate limiting** — intentionally NOT implemented in app code.
  Lovable Cloud's backend doesn't have first-class rate-limiting
  primitives yet, and bolting on ad-hoc limits in edge functions
  would be brittle. The correct place for this is Cloudflare's
  rate-limiting rules (see §2 above) — apply those at the zone.
- **Suspicious traffic logging** — handled at the edge by
  Cloudflare Security Events (§3). No client-side logging endpoint
  added: it would just be another scrapable surface.
