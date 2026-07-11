---
name: Spotlight Page States (LOCKED)
description: Rules for publishing business Spotlight pages as template / preview / owner_review / verified / published. Governs badges, imagery honesty, and team-section policy.
type: feature
---

Business Spotlight pages may be published in one of five states. Each state has a required public label and imagery rule. Applies to every business page, including flagship demos (e.g. The Roosevelt Room).

## States and public labels

- `template` → "Spotlight Template" — layout demo using verified public facts only.
- `preview` → "Business Profile Preview" — expanded content, still awaiting owner sign-off.
- `owner_review` → "Owner Review Pending" — sent to owner, awaiting approval.
- `verified` → "Owner Verified" — owner has approved current content.
- `published` → "Published Spotlight" — fully live with owner-supplied media.

## Publish rules (all must be true)

- Public facts are verified from the official website, official social, or the business.
- Social links are official.
- Page state badge is shown near the hero eyebrow when state is not `published`.
- No unverified imagery is presented as depicting the business. No AI-generated staff, chefs, owners, bartenders, dishes, interiors, or exteriors.
- No invented team members — Team section is hidden entirely until real names, titles, bios, and owner-approved photos exist.
- No fabricated reviews, awards, chef names, events, or history.
- Placeholder imagery uses abstract editorial backdrops (gradients, grid, typography) OR is clearly labeled "Editorial template imagery / Business photography pending owner approval". Never labeled as the business.

## Owner CTA

Every non-`published` Spotlight ends with an owner CTA routing to:
`/for-businesses/apply?business=<slug>` and `/contact`.

## Reference implementation
`src/pages/business/RooseveltRoom.tsx` is the canonical `template`-state implementation.
