export const PLATFORM_PHONE_DIGITS = new Set([
  "5185227265",
  "15185227265",
  "5182079348",
  "15182079348",
]);

export const normalizePhoneDigits = (phone?: string | null) =>
  (phone ?? "").replace(/\D/g, "");

export const isPlatformPhone = (phone?: string | null) => {
  const digits = normalizePhoneDigits(phone);
  return PLATFORM_PHONE_DIGITS.has(digits);
};

export const isValidBusinessPhone = (
  phone?: string | null,
  contactStatus?: string | null,
) => {
  const digits = normalizePhoneDigits(phone);
  if (!digits) return false;
  if (contactStatus === "missing" || contactStatus === "needs_verification") return false;
  if (isPlatformPhone(phone)) return false;
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (national.length !== 10) return false;
  if (/^(\d)\1{9}$/.test(national)) return false;
  if (national.startsWith("555")) return false;
  return true;
};

export const businessTelHref = (phone?: string | null, contactStatus?: string | null) => {
  if (!isValidBusinessPhone(phone, contactStatus)) return null;
  const digits = normalizePhoneDigits(phone);
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return `tel:+1${national}`;
};

export const businessSmsHref = (phone?: string | null, contactStatus?: string | null) => {
  if (!isValidBusinessPhone(phone, contactStatus)) return null;
  const digits = normalizePhoneDigits(phone);
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return `sms:+1${national}`;
};