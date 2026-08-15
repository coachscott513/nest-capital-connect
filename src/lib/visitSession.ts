/**
 * Anonymous visit session + landing-context capture.
 *
 * Purpose: let a later action (an Ask Nest submission) be tied back to the
 * SERVER-DERIVED source of the visit's first page view, without ever storing
 * prompts, external query strings, full referrer URLs, or personal content.
 *
 * Rules:
 *   - the session id is a random UUID held in sessionStorage. It is not an
 *     identity, is not shared across tabs, and disappears when the tab closes.
 *   - the only landing hint we keep is a bare host from `utm_source`, and the
 *     server accepts it ONLY to mark the weaker `ai_assistant_utm` value.
 *   - trusted attribution is always decided server-side from the Referer.
 */

const SESSION_KEY = "cdn_visit_session";
const UTM_KEY = "cdn_landing_utm_host";

const uuid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function getVisitSessionId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = uuid();
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

/** Bare host from the landing `utm_source`, captured once per session. */
export function getLandingUtmHost(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.sessionStorage.getItem(UTM_KEY);
    if (stored !== null) return stored || null;

    const raw = new URLSearchParams(window.location.search).get("utm_source") || "";
    const host = raw
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0]
      .split("?")[0];
    const clean = /^[a-z0-9.\-]{1,80}$/.test(host) ? host : "";
    window.sessionStorage.setItem(UTM_KEY, clean);
    return clean || null;
  } catch {
    return null;
  }
}
