import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calculator, FileSearch, Phone, Search } from "lucide-react";
import { isBuyerToolsRoute } from "@/lib/routeExperience";
import { analyticsPathname, routeGroupLabel } from "@/lib/routeExperience";
import { logEngagement } from "@/lib/engagement";
import { TalkToScottDialog } from "@/components/property/TalkToScott";
import {
  ACTIVE_MARKET,
  dealCalculatorDestination,
  analyzePropertyDestination,
  productAnalyticsContext,
  type SharedProduct,
} from "@/config/regionalProducts";

const SOURCE = "property_tools_dock";
const TEAL = "#0D6E66";

/**
 * PropertyToolsDock — one persistent utility surface for the buyer journey.
 *
 * Desktop/tablet: compact centered sticky utility bar (layout-safe: the site
 * header is already sticky and scroll-aware, so the dock anchors to the bottom
 * edge instead of fighting it).
 * Mobile: fixed bottom dock with safe-area support.
 *
 * Route scope is owned by `routeExperience.ts` — no pathname checks here.
 * Destinations always come from the regional product configuration.
 */
const PropertyToolsDock = () => {
  const { pathname } = useLocation();
  const show = isBuyerToolsRoute(pathname);

  // Reserve space so the dock never covers content or consent controls.
  useEffect(() => {
    if (!show) return;
    document.body.classList.add("has-property-dock");
    return () => document.body.classList.remove("has-property-dock");
  }, [show]);

  if (!show) return null;

  const track = (product: SharedProduct, intent?: string) =>
    logEngagement("property_tools_dock_click", {}, {
      ...productAnalyticsContext(SOURCE),
      product_type: product,
      route_group: routeGroupLabel(pathname),
      pathname: analyticsPathname(pathname),
      ...(intent ? { intent } : {}),
    });

  const path = pathname.split("?")[0].replace(/\/+$/, "") || "/";
  const onSearch = path.startsWith("/homes");
  const onDeal = path.startsWith("/analyze-any-deal");
  const onProperty = path === "/analyze-any-property";

  const deal = dealCalculatorDestination(SOURCE, "buying");
  const property = analyzePropertyDestination(SOURCE);

  const base =
    "group flex-1 md:flex-none flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 min-h-[44px] min-w-[44px] px-2 md:px-4 py-2 rounded-xl md:rounded-full text-[11px] md:text-[13px] font-semibold transition-colors motion-safe:transition-transform motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E66] focus-visible:ring-offset-2 focus-visible:ring-offset-white";
  const idle = "text-[#14181F]/75 hover:text-[#14181F] hover:bg-[#F3F4F2]";
  const active = "text-white bg-[#0D6E66] hover:bg-[#0D6E66]";

  const cls = (isActive: boolean) => `${base} ${isActive ? active : idle}`;
  const icon = (isActive: boolean) => ({ color: isActive ? "#FFFFFF" : TEAL });

  const labels = ACTIVE_MARKET.labels;

  return (
    <nav
      aria-label="Property tools"
      className="fixed inset-x-0 bottom-0 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:bottom-6 z-[1450] md:w-auto"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div
        className="flex items-stretch gap-1 md:gap-1.5 w-full md:w-auto px-2 md:px-2 py-2 border-t md:border md:rounded-full bg-white/95 md:bg-white/90 backdrop-blur-xl"
        style={{
          borderColor: "#DFDCD4",
          boxShadow: "0 24px 60px -30px rgba(11,15,25,0.45)",
          fontFamily: "'Manrope', system-ui, sans-serif",
        }}
      >
        <Link
          to={ACTIVE_MARKET.searchHomesPath}
          aria-current={onSearch ? "page" : undefined}
          className={cls(onSearch)}
          onClick={() => track("search_homes", "buying")}
        >
          <Search className="w-4 h-4 shrink-0" style={icon(onSearch)} />
          <span className="whitespace-nowrap">{labels.searchHomes}</span>
        </Link>

        {deal.kind === "internal" ? (
          <Link
            to={deal.to}
            aria-current={onDeal ? "page" : undefined}
            className={cls(onDeal)}
            onClick={() => track("analyze_any_deal", "buying")}
          >
            <Calculator className="w-4 h-4 shrink-0" style={icon(onDeal)} />
            <span className="whitespace-nowrap">
              <span className="lg:hidden">{labels.dealCalculatorShort}</span>
              <span className="hidden lg:inline">{labels.dealCalculator}</span>
            </span>
          </Link>
        ) : (
          <a
            href={deal.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cls(false)}
            onClick={() => track("analyze_any_deal", "buying")}
          >
            <Calculator className="w-4 h-4 shrink-0" style={icon(false)} />
            <span className="whitespace-nowrap">
              <span className="lg:hidden">{labels.dealCalculatorShort}</span>
              <span className="hidden lg:inline">{labels.dealCalculator}</span>
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}

        {property.kind === "external" ? (
          <a
            href={property.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cls(false)}
            onClick={() => track("analyze_any_property")}
          >
            <FileSearch className="w-4 h-4 shrink-0" style={icon(false)} />
            <span className="whitespace-nowrap">
              <span className="lg:hidden">{labels.analyzePropertyShort}</span>
              <span className="hidden lg:inline">{labels.analyzeProperty}</span>
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          <Link
            to={property.to}
            aria-current={onProperty ? "page" : undefined}
            className={cls(onProperty)}
            onClick={() => track("analyze_any_property")}
          >
            <FileSearch className="w-4 h-4 shrink-0" style={icon(onProperty)} />
            <span className="whitespace-nowrap">{labels.analyzeProperty}</span>
          </Link>
        )}

        <TalkToScottDialog context={{ placement: SOURCE }}>
          <button type="button" className={cls(false)} onClick={() => track("talk_to_scott")}>
            <Phone className="w-4 h-4 shrink-0" style={icon(false)} />
            <span className="whitespace-nowrap">{labels.talkToHuman}</span>
          </button>
        </TalkToScottDialog>
      </div>
    </nav>
  );
};

export default PropertyToolsDock;
