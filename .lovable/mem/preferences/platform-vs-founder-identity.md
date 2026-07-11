---
name: Platform vs Founder Identity
description: Capital District Nest is the public identity. Scott Alvarez appears ONLY on real estate surfaces where license disclosure is legally required.
type: preference
---
Capital District Nest is presented as an independent regional media and local
discovery platform. The public identity is the platform itself — never Scott
Alvarez as founder.

**Where Scott Alvarez may appear (real estate exception):**
- /homes, /homes/search, /homes/* subroutes
- Property listing pages, property inquiry forms
- Real estate brokerage / license disclosures (RealEstateDisclosure component)
- PropertyFooterAttribution
- ScottAlvarez.com external links
- Investor / analyzer real estate tooling where a licensed agent is contracted

**Everywhere else — use platform identity:**
- Editorial bylines → "Capital District Nest Editorial Team"
- Business outreach / spotlights → "Featured by Capital District Nest Editorial"
- Footer → "Capital District Nest" + tagline, no founder branding
- Blog authors → "Capital District Nest Editorial Team"
- Contact defaults → platform emails/phone, not Scott's personal number

**Centralized contact config: `src/config/contact.ts`**
- `PHONE_DISPLAY = "(518) 981-2248"` · `PHONE_TEL = "tel:+15189812248"` (Follow Up Boss business line)
- `GENERAL_EMAIL = "hello@..."` · `MEDIA_EMAIL = "media@..."` · `BUSINESS_EMAIL = "business@..."` · `SUPPORT_EMAIL = "support@..."`
- `EDITORIAL_TEAM = "Capital District Nest Editorial Team"`
- `SCOTT_*` constants exist for real-estate-only usage.

**Rule:** never hardcode a phone number or email anywhere in the codebase.
Import from `@/config/contact`.

**How to apply:** When adding contact info to a new page/component, first
decide: is this a real estate surface? If not, use platform constants and
platform identity. If yes, `RealEstateDisclosure` + `SCOTT_*` constants.
