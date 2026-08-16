/**
 * Shared route-context helper.
 *
 * One source of truth for "is this a buyer/property route or a local/business
 * route". Components must not duplicate pathname arrays.
 */

const startsWithAny = (path: string, prefixes: string[]) =>
  prefixes.some((p) => path === p || path.startsWith(p));

/** Local discovery / business / editorial / admin surfaces. Buyer Tools never appears here. */
const BUSINESS_LOCAL_PREFIXES = [
  "/local",
  "/business",
  "/businesses",
  "/biz/",
  "/for-businesses",
  "/pricing",
  "/claim-business",
  "/partner-",
  "/stories",
  "/weekly",
  "/events",
  "/media",
  "/spotlight",
];

const EXCLUDED_SYSTEM_PREFIXES = [
  "/admin",
  "/auth",
  "/login",
  "/dashboard",
  "/reset-password",
  "/privacy",
  "/terms",
  "/launch-dashboard",
  "/vendor",
  "/go/",
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
  "/towns/",
  "/market-report",
  "/rentals",
];

export type RouteGroup = "buyer" | "local" | "other";

export function getRouteGroup(pathname: string): RouteGroup {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (startsWithAny(path, EXCLUDED_SYSTEM_PREFIXES)) return "other";
  if (startsWithAny(path, BUSINESS_LOCAL_PREFIXES)) return "local";
  if (path === "/") return "buyer";
  if (startsWithAny(path, BUYER_PREFIXES)) return "buyer";
  return "other";
}

/** Buyer Tools launcher visibility. */
export const isBuyerToolsRoute = (pathname: string) => getRouteGroup(pathname) === "buyer";

/** Ask Local / Local Concierge visibility. */
export const isLocalDiscoveryRoute = (pathname: string) => getRouteGroup(pathname) === "local";

/** Normalized, PII-free route group label for analytics. */
export const routeGroupLabel = (pathname: string) => getRouteGroup(pathname);
