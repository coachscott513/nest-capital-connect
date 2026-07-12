/**
 * Central contact configuration for Capital District Nest.
 *
 * ALL public phone numbers, emails, mailto/tel links, and CTAs on the platform
 * must come from this file. Never hardcode a phone number or email elsewhere.
 *
 * Public identity of the platform is Capital District Nest — an independent
 * regional media and local discovery platform. Scott Alvarez's personal
 * contact info is used ONLY on real estate surfaces where license disclosure
 * is legally required (Homes, property pages, brokerage disclosures).
 */

// ─── Platform identity ────────────────────────────────────────────────────────
export const PLATFORM_NAME = "Capital District Nest";
export const PLATFORM_TAGLINE = "The Digital Front Door to the Capital District";
export const WEBSITE = "https://www.capitaldistrictnest.com";

// ─── Public phone (Follow Up Boss business line) ─────────────────────────────
export const PHONE_DISPLAY = "(518) 981-2248";
export const PHONE_RAW = "+15189812248";
export const PHONE_TEL = `tel:${PHONE_RAW}`;
export const PHONE_SMS = `sms:${PHONE_RAW}`;

// ─── Public emails ────────────────────────────────────────────────────────────
export const GENERAL_EMAIL = "team@capitaldistrictnest.com";
export const MEDIA_EMAIL = "media@capitaldistrictnest.com";
export const BUSINESS_EMAIL = "business@capitaldistrictnest.com";
export const SUPPORT_EMAIL = "support@capitaldistrictnest.com";
// Reserved for future editorial staff signatures.
export const EDITOR_EMAIL = "editor@capitaldistrictnest.com";

export const GENERAL_EMAIL_HREF = `mailto:${GENERAL_EMAIL}`;
export const MEDIA_EMAIL_HREF = `mailto:${MEDIA_EMAIL}`;
export const BUSINESS_EMAIL_HREF = `mailto:${BUSINESS_EMAIL}`;
export const SUPPORT_EMAIL_HREF = `mailto:${SUPPORT_EMAIL}`;

// ─── Editorial identity strings ───────────────────────────────────────────────
export const EDITORIAL_TEAM = "Capital District Nest Editorial Team";
export const EDITORIAL_TEAM_SHORT = "Capital District Nest Editorial";
export const BUSINESS_TEAM = "Capital District Nest Business Team";
export const MEDIA_TEAM = "Capital District Nest Media";

// ─── Real estate exception (Scott Alvarez only) ───────────────────────────────
// Use ONLY on: /homes, /homes/search, property listing pages, property inquiry
// forms, brokerage disclosures, and other legally required license disclosure
// contexts. Do NOT reference from editorial, business, or platform surfaces.
export const SCOTT_NAME = "Scott Alvarez";
export const SCOTT_PHONE_DISPLAY = "(518) 522-7265";
export const SCOTT_PHONE_TEL = "tel:+15185227265";
export const SCOTT_EMAIL = "scott@capitaldistrictnest.com";

// ─── Backward-compat aliases (deprecated — do not use in new code) ────────────
/** @deprecated Use GENERAL_EMAIL instead. */
export const TEAM_EMAIL = GENERAL_EMAIL;
/** @deprecated Use GENERAL_EMAIL_HREF instead. */
export const TEAM_EMAIL_HREF = GENERAL_EMAIL_HREF;
/** @deprecated Use PHONE_DISPLAY instead. */
export const TEAM_PHONE_DISPLAY: string | null = PHONE_DISPLAY;
/** @deprecated Use PHONE_TEL instead. */
export const TEAM_PHONE_TEL: string | null = PHONE_TEL;

export const APPLY_URL = "/for-businesses/apply";

// Standard submission-error toast body.
export const SUBMIT_ERROR_MESSAGE = `We couldn't submit this right now. Please email ${GENERAL_EMAIL} or call ${PHONE_DISPLAY} and we'll help get it handled.`;

// Standard email signature block (plain text) for outbound editorial/business email.
export const EMAIL_SIGNATURE = [
  EDITORIAL_TEAM,
  PLATFORM_TAGLINE,
  `📞 ${PHONE_DISPLAY}`,
  `📧 ${MEDIA_EMAIL}`,
  `🌐 CapitalDistrictNest.com`,
].join("\n");
