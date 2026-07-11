/**
 * Real estate brokerage disclosure config.
 *
 * Capital District Nest is a neutral regional discovery / media / directory /
 * advertising / community-search platform. Brokerage identity appears ONLY on
 * real-estate surfaces (search, listings, analyzer, deal desk, property pages).
 *
 * Flip `disclosure_active` to `true` and fill in `brokerage_name` /
 * `brokerage_office` / `license_number` ONLY once the exact broker-approved
 * wording is confirmed. Until then, the disclosure component renders a
 * neutral safe fallback.
 */
export const realEstateDisclosure = {
  disclosure_active: false,
  agent_name: "Scott Alvarez",
  license_title: "Licensed Real Estate Salesperson",
  brokerage_name: "",
  brokerage_office: "",
  brokerage_phone: "(518) 522-7265",
  brokerage_email: "scott@capitaldistrictnest.com",
  license_number: "",
  equal_housing_text: "Equal Housing Opportunity",
} as const;

export type RealEstateDisclosure = typeof realEstateDisclosure;
