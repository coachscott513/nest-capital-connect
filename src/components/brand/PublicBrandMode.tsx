import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Applies the light Coach-aligned public design system (`.nest-brand`) to the
 * document body on public routes, so pages, portals, dialogs and fixed chrome
 * share the same tokens. Private tools, admin, print/report and investor-deck
 * surfaces keep their legacy theme.
 */
const LEGACY_PREFIXES = [
  "/admin", "/launch-dashboard", "/dashboard", "/partner-dashboard", "/partner-auth",
  "/seo-audit", "/reports", "/intel", "/intelligence", "/cash-flow-report",
  "/market-reports", "/investor", "/investor-tools", "/go/",
];

export const isLegacyThemeRoute = (pathname: string) =>
  LEGACY_PREFIXES.some((p) => pathname === p || pathname.startsWith(p.endsWith("/") ? p : `${p}/`) || pathname === p);

export default function PublicBrandMode() {
  const { pathname } = useLocation();
  useEffect(() => {
    const on = !isLegacyThemeRoute(pathname);
    document.body.classList.toggle("nest-brand", on);
    document.body.classList.toggle("has-nest-brand", on);
  }, [pathname]);
  return null;
}
