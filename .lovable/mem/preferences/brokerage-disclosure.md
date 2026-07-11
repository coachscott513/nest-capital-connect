---
name: Brokerage disclosure isolation (LOCKED)
description: Capital District Nest is a neutral platform. Brokerage identity appears only via the RealEstateDisclosure config, never globally.
type: constraint
---

Capital District Nest is a neutral regional discovery, media, directory, advertising, and community-search platform.

**Rules:**
- Global footer, homepage, businesses, stories, communities, events, and business-owner pages must NEVER show a brokerage name (RE/MAX, Coldwell Banker, or any other).
- Real-estate brokerage identity is rendered ONLY via `<RealEstateDisclosure />` (`src/components/RealEstateDisclosure.tsx`), driven by `src/config/realEstateDisclosure.ts`.
- The disclosure component is auto-mounted by `Footer.tsx` on real-estate route prefixes: `/homes`, `/rentals`, `/investment*`, `/analyze*`, `/dealdesk`, and Scott-specific property pages.
- `disclosure_active: false` until the exact broker-approved wording (brokerage name, office, license number) is confirmed. Do not fill these fields speculatively.
- Global contacts: general = `team@capitaldistrictnest.com`; business = `/for-businesses/apply`; profile fix = `/claim-business`; property/report = `/dealdesk`.
- All home-search CTAs route to `/homes/search`, `/homes/search/:townSlug`, `/homes/listings`, or `/investment-analyzer`. No `remax.com` / `scottalvarez.remax.com` links anywhere.

**Why:** Prevents turning the media platform into an agent-branded site and avoids publishing unapproved brokerage wording.
