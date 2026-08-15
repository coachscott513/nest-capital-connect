/**
 * ANSWER PILOT — reversible release flag.
 *
 * OFF. Nothing public renders the pilot template today.
 *
 * When the founder approves activation, set ANSWER_PILOT_ENABLED = true.
 * Rollback is the same one-line change and is instant — no data migration,
 * no slug change, no redirect, no canonical change, no index-state change.
 *
 * Guarantees enforced by `shouldRenderAnswerPilot`:
 *   - only the 20 approved, frozen pilot business_ids are eligible;
 *   - a page in the protected manifest is only eligible when the render is
 *     additive (no slug, canonical, title, meta or index change);
 *   - phone, website and directions actions are never intercepted — they keep
 *     routing directly to the business.
 */

export const ANSWER_PILOT_ENABLED = false as boolean;

/** Frozen pilot cohort. Source of truth: public.answerability_pilot_cohort. */
export const ANSWER_PILOT_SLUGS: readonly string[] = [
  "route-1-auto-vo2w-794",
  "skylight-apartments-w94vomqy",
  "m-g-swift-notary-services-llc-cr1g-krk",
  "cora-muse-boutique-delmar-tffgn0",
  "n-n-construction-ttep8puc",
  "absolute-auto-credit-display-lot-8rcr5r3k",
  "sunshine-auto-used-auto-parts-plb9qwhe",
  "heat-n-salt-catering-swatklgs",
  "schneider-s-wood-milling-services-kxz29dyq",
  "horan-michael-t-g5x0flgg",
  "nana-s-pizzeria-5sszm0k4",
  "schultz-garden-center-ynzzb5mw",
  "passport-photos-by-photoaid-elqughnu",
  "passport-photos-by-photoaid-sa9o9uo0",
  "mayflower-laundromat-wash-and-fold-pick-up-and-delivery-dry--tdldwshg",
  "passport-photos-by-photoaid-bgydw7lo",
  "at-t-kiosk-in-target-jvtrtybg",
  "passport-photos-by-photoaid-2jym8gby",
  "vialynk-charging-station-ubb537s4",
  "passport-photos-by-photoaid-ps5cosfe",
] as const;

export type AnswerPilotGuardInput = {
  slug?: string | null;
  /** True only when the render adds content and changes no SEO surface. */
  additiveOnly?: boolean;
};

export function shouldRenderAnswerPilot({ slug, additiveOnly = true }: AnswerPilotGuardInput): boolean {
  if (!ANSWER_PILOT_ENABLED) return false;
  if (!slug) return false;
  if (!additiveOnly) return false;
  return ANSWER_PILOT_SLUGS.includes(slug);
}
