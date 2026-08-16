/**
 * Shared route-experience helper.
 *
 * Single source of truth for which global floating experience a route gets:
 *   • "buyer" → Buyer Tools (desktop dock + mobile sheet)
 *   • "local" → Local Concierge / Ask Local
 *   • "excluded" → no floating experience (admin, auth, dashboards, legal)
 *   • "other" → neutral: keeps the legacy local experience on mobile only
 *
 * Components must never duplicate pathname arrays.
 */

export type RouteExperience = "buyer" | "local" | "excluded" | "other";

const startsWithAny = (path: string, prefixes: string[]) =>
  prefixes.some((p) => path === p || path.startsWith(p));

/** Admin / auth / dashboard / legal surfaces. No floating experience at all. */
const EXCLUDED_PREFIXES = [
  "/admin",
  "/auth",
  "/login",
  "/dashboard",
  "/launch-dashboard",
  "/reset-password",
  "/privacy",
  "/privacy-policy",
  "/terms",
  "/legal",
  "/vendor",
  "/partner-dashboard",
  "/go/",
];

/** Local discovery / business / editorial surfaces. */
const LOCAL_PREFIXES = [
  "/local",
  "/business",
  "/businesses",
  "/biz/",
  "/for-businesses",
  "/pricing",
  "/claim-business",
  "/get-listed",
  "/partner-",
  "/stories",
  "/weekly",
  "/this-week",
  "/events",
  "/submit-event",
  "/media",
  "/spotlight",
];

/** Buyer / property journey surfaces. */
const BUYER_PREFIXES = [
  "/homes",
  "/analyze",
  "/analyzer",
  "/investment-analyzer",
  "/investment",
  "/investor-tools",
  "/buyer-roadmap",
  "/buyer-journey",
  "/first-time",
  "/financing",
  "/land-buyers",
  "/search/single-family",
  "/search/investors",
  "/search/land",
  "/communities",
  "/living-in/",
  "/closing-team",
  "/home-services",
  "/listings/",
  "/reports",
  "/intel/",
  "/towns/",
  "/market-report",
  "/rentals",
];

/** Normalize: strip query, hash, and trailing slashes. */
const normalize = (pathname: string) => {
  const path = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "");
  return path || "/";
};

export function getRouteExperience(pathname: string): RouteExperience {
  const path = normalize(pathname);
  if (startsWithAny(path, EXCLUDED_PREFIXES)) return "excluded";
  // Local prefixes are checked first: `/business*` must never fall through to
  // a buyer prefix match.
  if (startsWithAny(path, LOCAL_PREFIXES)) return "local";
  if (path === "/") return "buyer";
  if (startsWithAny(path, BUYER_PREFIXES)) return "buyer";
  return "other";
}

/** Buyer Tools launcher visibility (desktop dock + mobile buyer sheet). */
export const isBuyerToolsRoute = (pathname: string) =>
  getRouteExperience(pathname) === "buyer";

/** Local Concierge / Ask Local visibility. */
export const isLocalDiscoveryRoute = (pathname: string) =>
  getRouteExperience(pathname) === "local";

/** Admin / auth / legal surfaces where no floating control may render. */
export const isExcludedRoute = (pathname: string) =>
  getRouteExperience(pathname) === "excluded";

/** Normalized, PII-free route group label for analytics. */
export const routeGroupLabel = (pathname: string) => getRouteExperience(pathname);

/** PII-free pathname for analytics (query and hash removed). */
export const analyticsPathname = (pathname: string) => normalize(pathname);
