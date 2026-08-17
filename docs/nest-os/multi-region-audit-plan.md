# Nest OS — Read-Only Multi-Region Audit Plan

Status: plan only. This sprint executes no schema change, no data migration,
and no public change. The audit itself is read-only.

## Purpose

Prove what the existing Capital District implementation already supports for a
second region **before** proposing any new architecture. The Supabase plumbing
was intentionally built with multiple regions in mind; the audit's job is to
measure that, not to replace it.

## Classification

Every important asset below is classified into exactly one bucket:

- **A. Global and reusable** — works unchanged for any region.
- **B. Already region-configurable** — parameterized today (config, column,
  env, or data row).
- **C. Hardcoded to Capital District** — must be parameterized.
- **D. Missing but required for Syracuse** — does not exist yet and blocks
  Region #2.
- **E. Future-only** — not required for Region #2.

## Assets to classify

- Tables, views, and functions
- RLS policies
- Edge functions
- Routes and components
- Domain and canonical values
- Sitemap and prerender rules (Tier A curated list, Tier B generation,
  eligibility rules, shell selection)
- Contact values and professional/licensing disclosures
- Analytics and Search Console properties/settings
- Search provider configuration and RealScout destinations
- Region / town / category relations
- Business claim, correction, and subscription records
- Engagement and attribution fields

Output format: one row per asset — asset, location, bucket, evidence, and (for
C and D only) the smallest change that would make it region-safe.

## Method

1. Read-only inventory from the repository and the database catalog.
2. Trace one representative flow end to end per surface (public page, business
   page, claim, engagement event, sitemap emission).
3. Record evidence for each classification; unverified assets stay unclassified
   rather than being assumed global.
4. Produce the C/D remediation list. Do not implement in the audit pass.

## Syracuse success gate

- Launchable preview **without a schema fork**.
- **No Syracuse-specific component fork.**
- Capital District behavior and output remain unaffected.
- No cross-region public or private data leakage (RLS proven per region).
- A shared correction improves every regional instance at once.
- Founder hours and manual steps are recorded for the launch.
- Only steps proven repeated and risky are automated afterwards.
