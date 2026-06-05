/**
 * Canonical category resolver — single source of truth.
 *
 * Business rows in the DB carry a free-text imported `category` (often wrong,
 * e.g. "Restaurant" for a law firm because Google Places miscategorized) AND
 * a `subcategory` (sometimes truer, e.g. "Accountant"). Plus a strong signal:
 * the business NAME itself ("Law Group, P.C." is unambiguously legal).
 *
 * Priority (highest wins):
 *   1. Strong NAME signals (Law/PLLC/P.C./CPA/MD/Dental/...).
 *   2. Strong TAG/SUBCATEGORY signals.
 *   3. Imported category text (least trusted).
 *
 * This prevents cards/eyebrows/filters from contradicting each other.
 */

import type { BusinessCategory } from "@/data/businesses";

const wb = (s: string) => new RegExp(`\\b(${s})\\b`, "i");

// Strong, unambiguous patterns matched against the NAME first.
// Order matters within each block (specific before generic).
const NAME_RULES: { test: RegExp; cat: BusinessCategory }[] = [
  // Legal
  { test: /\b(law\s+(group|firm|office|offices)|attorneys?\s+at\s+law|p\.?c\.?|pllc|llp|esq\.?|attorney|lawyer)\b/i, cat: "Attorney" },
  // Accounting
  { test: /\b(cpa|c\.p\.a\.|accounting|accountants?|bookkeep(ing|er)|tax\s+(prep|service|advisor|consult))\b/i, cat: "Accountant" },
  // Dental
  { test: /\b(dental|dentist|dentistry|orthodont|endodont|periodont|oral\s+surgeon|invisalign)\b/i, cat: "Dental" },
  // Healthcare
  { test: /\b(m\.?d\.?|d\.?o\.?|n\.?p\.?|physician|pediatric|pediatrician|cardiolog|dermatolog|orthopedic|urgent\s+care|medical\s+(center|group|clinic)|family\s+medicine|primary\s+care|chiropract|physical\s+therapy|optometr|psychiatr|psycholog)\b/i, cat: "Healthcare" },
  // Insurance
  { test: /\b(insurance|mutual|allstate|geico|state\s+farm|nationwide|farmers\s+insurance)\b/i, cat: "Insurance" },
  // Real Estate / Mortgage
  { test: /\b(mortgage|home\s+loans?|lending)\b/i, cat: "Mortgage Lender" },
  { test: /\b(credit\s+union|bank|federal\s+savings)\b/i, cat: "Bank/Credit Union" },
  { test: /\b(home\s+inspection|home\s+inspector|inspections?,?\s+llc)\b/i, cat: "Home Inspector" },
  // Trades / Home
  { test: /\b(roofing|roofer)\b/i, cat: "Roofer" },
  { test: /\b(plumb(ing|er)?)\b/i, cat: "Plumber" },
  { test: /\b(electric(ian|al)?)\b/i, cat: "Electrician" },
  { test: /\b(hvac|heating\s*&?\s*cooling|heating\s*and\s*cooling|furnace)\b/i, cat: "HVAC" },
  { test: /\b(landscap(e|ing|er)|lawn\s+care|tree\s+service)\b/i, cat: "Landscaper" },
  { test: /\b(handyman|handywoman)\b/i, cat: "Handyman" },
  { test: /\b(cleaning|cleaners?|maid\s+service|janitorial)\b/i, cat: "Cleaner" },
  { test: /\b(contractor|construction|remodel(ing)?|builders?)\b/i, cat: "Contractor" },
  // Lifestyle
  { test: /\b(coffee|espresso|cafe|café|roaster)\b/i, cat: "Coffee" },
  { test: /\b(bakery|bakers|patisserie|donuts?|bagels?)\b/i, cat: "Bakery" },
  { test: /\b(restaurant|tavern|bistro|grill|pizz(a|eria)|deli|diner|eatery|sandwich(es)?|kitchen|steakhouse|sushi|ramen|noodle|pub)\b/i, cat: "Restaurant" },
  { test: /\b(gym|fitness|crossfit|barre|cycling\s+studio)\b/i, cat: "Gym" },
  { test: /\b(salon|barber(shop)?|nails|hair|beauty)\b/i, cat: "Salon" },
  { test: /\b(spa|massage|yoga|pilates|acupunct|wellness)\b/i, cat: "Wellness" },
  { test: /\b(pet|vet(erinary)?|grooming|kennel)\b/i, cat: "Pet" },
  { test: /\b(auto(motive)?|mechanic|tire|car\s+wash|oil\s+change|collision|body\s+shop)\b/i, cat: "Auto" },
  { test: /\b(book(store|shop)|library)\b/i, cat: "Bookstore" },
  { test: /\b(financial\s+advisor|wealth\s+management|financial\s+planning|primerica|edward\s+jones)\b/i, cat: "Financial Advisor" },
  { test: /\b(marketing|advertising|creative\s+agency|branding)\b/i, cat: "Marketing" },
];

// Patterns matched against subcategory/tags (cleaner Google taxonomy).
const TAXONOMY_MAP: { test: RegExp; cat: BusinessCategory }[] = [
  { test: /law firm|legal services|attorney|lawyer/i, cat: "Attorney" },
  { test: /accountant|bookkeep|tax (prep|consult|service)/i, cat: "Accountant" },
  { test: /dentist|dental|orthodont/i, cat: "Dental" },
  { test: /doctor|physician|medical|clinic|urgent care/i, cat: "Healthcare" },
  { test: /insurance/i, cat: "Insurance" },
  { test: /mortgage|lender/i, cat: "Mortgage Lender" },
  { test: /bank|credit union/i, cat: "Bank/Credit Union" },
  { test: /home inspect/i, cat: "Home Inspector" },
  { test: /roof/i, cat: "Roofer" },
  { test: /plumb/i, cat: "Plumber" },
  { test: /electric/i, cat: "Electrician" },
  { test: /hvac|heating|cooling/i, cat: "HVAC" },
  { test: /landscap|lawn|tree service/i, cat: "Landscaper" },
  { test: /handy/i, cat: "Handyman" },
  { test: /cleaning|janitor/i, cat: "Cleaner" },
  { test: /contractor|construction|remodel/i, cat: "Contractor" },
  { test: /coffee|cafe|café/i, cat: "Coffee" },
  { test: /bakery/i, cat: "Bakery" },
  { test: /restaurant|tavern|grill|pizz|deli|diner|eatery|bar|pub/i, cat: "Restaurant" },
  { test: /gym|fitness|crossfit/i, cat: "Gym" },
  { test: /salon|barber|nail|hair/i, cat: "Salon" },
  { test: /spa|massage|yoga|wellness/i, cat: "Wellness" },
  { test: /pet|vet|groom/i, cat: "Pet" },
  { test: /auto|mechanic|tire|car wash/i, cat: "Auto" },
  { test: /book|library/i, cat: "Bookstore" },
  { test: /financial advisor|wealth/i, cat: "Financial Advisor" },
  { test: /marketing|advertis/i, cat: "Marketing" },
];

const RAW_MAP: { test: RegExp; cat: BusinessCategory }[] = TAXONOMY_MAP;

/**
 * Resolve the canonical display + filter category for a business row.
 * NAME wins over taxonomy wins over imported raw category.
 */
export function canonicalCategory(
  name: string | null | undefined,
  rawCategory: string | null | undefined,
  subcategory: string | null | undefined,
  tags: string[] | null | undefined = [],
): BusinessCategory {
  const nm = (name ?? "").trim();
  for (const rule of NAME_RULES) {
    if (rule.test.test(nm)) return rule.cat;
  }

  const taxonomy = `${subcategory ?? ""} ${(tags ?? []).join(" ")}`.trim();
  if (taxonomy) {
    for (const rule of TAXONOMY_MAP) {
      if (rule.test.test(taxonomy)) return rule.cat;
    }
  }

  const raw = (rawCategory ?? "").trim();
  if (raw) {
    for (const rule of RAW_MAP) {
      if (rule.test.test(raw)) return rule.cat;
    }
  }

  return "Home Service";
}

/** Human-readable label for cards/eyebrows. Always derived from canonical. */
export function categoryLabel(cat: BusinessCategory): string {
  return cat;
}
