---
name: Nest Platform — multi-region architecture principle
description: Capital District Nest is Region #1 of The Nest Platform. Every feature must be data-driven and reusable across regions, never hardcoded.
type: preference
---
**Internal product name:** The Nest Platform. Capital District Nest is Region #1, not the product.

**Prime directive for every new feature / prompt:**
> "This feature must be reusable across every Nest region and configurable through data, not code."

If a feature can't launch Region #137 without Scott, redesign it.

**Every entity is a row, not a page:**
Region, Town, Neighborhood, Business, Story, Category, Partner, Home Search config, Event, School, Park, Media item, Collection — all live in Supabase. No hardcoded region/town/business content in TSX going forward.

**Launching a new region should be:**
1. Insert region row
2. Import towns
3. Import businesses
4. Import stories
Done — no file copying, route rewrites, or rebuilt pages.

**Missing foundational table — build when user asks:**
`regions` (id, name, slug, domain, logo, hero_image, primary_color, secondary_color, font, tagline, default_hero, default_cta, realscout_id, partner_pricing, launch_status). Every branding/nav/search element should read from this row.

**Nest OS** = the operating manual (SOPs, emails, questionnaires, workflows) covering: Branding, Region Launch, Business Spotlight, Town Pages, Real Estate, QR Program, Featured Partners, Stories, Social Media, AI Services.

**Two success tracks — do NOT collapse into one:**
- Product metrics: region launches from config, business publish <1hr, town page from template, branding adapts via data.
- Business metrics: Spotlight count, Featured Partners, traffic, inquiries, revenue.

Region #2 launch is NOT gated on a rigid business-metric threshold — platform-learning value counts too.

**Four products:** (1) The Nest Platform software · (2) Regional brands (Capital District Nest, Hudson Valley Nest, …) · (3) Nest OS operating manual · (4) Local operators (agent, broker, media person, ambassador).
