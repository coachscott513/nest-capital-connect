
# Outreach Link Tracking & Engagement Engine

Build a first-party redirect + analytics engine into the shared platform so every email, QR code, and outbound link becomes trackable. No bit.ly, no third-party dependency. Every Nest region inherits it automatically.

## What ships in this build

### 1. Redirect engine — `/go/:slug`
- New route `/go/:slug` (and `/go/:campaign/:slug`) resolves a short code to a destination URL.
- Records the click (business, campaign, slug, timestamp, device, referrer, UTM, coarse geo) to the database, then 302-redirects.
- Falls back gracefully if the slug is unknown (redirect to home + log as "unknown").
- Works for any target: business profile, pricing, apply, Roosevelt Room, Cassone, external URLs.

### 2. Data model (shared Supabase, region-scoped)
Four new tables:
- `tracked_links` — the short codes (slug, destination_url, campaign_id, business_id, region_id, label).
- `link_clicks` — every click event (link_id, ts, ua, device, referrer, utm_*, ip_hash, country, recipient_email_hash).
- `outreach_campaigns` — campaign metadata (name, segment, region_id, sent_at, template).
- `outreach_recipients` — one row per business per campaign (status: sent / opened / clicked / applied / paid, first_click_at, last_seen_at, interest_score).

All tables carry `region_id`. RLS: admin-only read/write; edge functions use service role.

### 3. Edge function: `track-click`
Handles the redirect logic server-side so bots and previews can be filtered, IPs are hashed, and the response is a real 302 (better for email clients than a client-side redirect).

### 4. Engagement scoring
A simple, transparent formula updated on each event:
```text
score =
  opened        * 5  +
  any_click     * 15 +
  pricing_view  * 25 +
  apply_start   * 40 +
  apply_submit  * 60 +
  time_on_site_bonus (capped)
```
Stored on `outreach_recipients.interest_score` so sales follow-up is sorted by real intent.

### 5. Admin dashboard — `/admin/outreach`
Admin-only (existing `has_role` check). Three views:
- **Campaigns**: list campaigns, sent / opened / clicked / applied / paid counts, best-performing segment.
- **Businesses**: one row per recipient — funnel stage, interest score, last activity, links clicked.
- **Links**: every `/go/*` slug with click count, unique clicks, top referrers.

Apple-minimal, dark surface, teal accents — matches existing admin styling.

### 6. Helper for generating links
A small utility + admin form so we can mint new `/go/:slug` codes without hand-editing the DB. Copies the full URL for pasting into Gmail / Workspace / MailerLite.

## What is explicitly out of scope for this build
- Sending the emails themselves (keep using Workspace / MailerLite / Instantly for delivery).
- Open tracking pixels (can be added later as a `/pixel/:id.gif` edge function — noted, not built now).
- Per-user consent banners beyond what the site already has.
- Migrating existing outreach retroactively — new links start tracking from ship date.

## Technical notes
- Route lives at `/go/:slug`; the React page immediately calls the edge function which returns a 302. For crawlers we render a minimal HTML fallback with the destination.
- IPs are SHA-256 hashed with a server-side salt before storage (GDPR-friendly, still lets us dedupe).
- Bot filter uses the existing `isLikelyBot()` helper plus UA allowlist server-side.
- All new tables include `GRANT`s in the same migration, RLS enabled, admin-only policies via `has_role(auth.uid(), 'admin')`.
- Uses existing brand tokens (onyx bg, teal accents, gold reserved for investor). No new colors.

## Suggested ship order
1. Migration (tables + policies + grants).
2. `track-click` edge function + `/go/:slug` route.
3. Admin link minter + dashboard (Campaigns → Businesses → Links tabs).
4. Backfill a starter set of slugs: `/go/roosevelt-room`, `/go/cassone`, `/go/pricing`, `/go/apply`, `/go/business`, `/go/founding-partner`.

Approve and I'll ship it in that order.
