/**
 * Central contact configuration for Capital District Nest.
 *
 * All public phone numbers, emails, and CTAs must come from this file.
 * Do not hardcode a phone number or email anywhere else in the codebase.
 *
 * Verified numbers:
 *  - Scott Alvarez (real estate only): (518) 522-7265
 *
 * There is currently no verified general platform phone number. Until one
 * is provided, `TEAM_PHONE` stays null and all CTAs fall back to email.
 */

export const TEAM_EMAIL = "team@capitaldistrictnest.com";
export const TEAM_EMAIL_HREF = `mailto:${TEAM_EMAIL}`;

// Real estate direct line (Scott Alvarez only — do NOT use as general team line).
export const SCOTT_PHONE_DISPLAY = "(518) 522-7265";
export const SCOTT_PHONE_TEL = "tel:+15185227265";
export const SCOTT_EMAIL = "scott@capitaldistrictnest.com";

// No verified general team phone yet. Leave null — code paths must handle this.
export const TEAM_PHONE_DISPLAY: string | null = null;
export const TEAM_PHONE_TEL: string | null = null;

export const APPLY_URL = "/for-businesses/apply";

// Standard submission-error toast body. No phone number — email only.
export const SUBMIT_ERROR_MESSAGE = `We couldn't submit this right now. Please email ${TEAM_EMAIL} and we'll help get it handled.`;
