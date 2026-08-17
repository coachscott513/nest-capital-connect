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
const TEAL = "#5EEAD4";

/**
 * PropertyToolsDock — one persistent utility surface for the buyer journey.
 *
 * Desktop/tablet: a bottom-centered horizontal glass dock, always visible at
 * rest — no collapse, no auto-hide, no click required to discover the tools.
 * Mobile: full-width bottom dock with safe-area support, same visual language.
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
  const labels = ACTIVE_MARKET.labels;

  /* Shared item styling — dark graphite glass, platinum text, teal active. */
  const base =
    "group inline-flex items-center justify-center gap-2 min-h-[44px] px-3 md:px-4 rounded-full text-[12px] md:text-[13px] font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]";
  const idle = "text-white/80 hover:text-white hover:bg-white/10";
  const active = "text-[#0B0F19] bg-[#5EEAD4]";
  const cls = (isActive: boolean) =>
    `${base} ${isActive ? active : idle} flex-1 md:flex-none`;
  const icon = (isActive: boolean) => ({ color: isActive ? "#0B0F19" : TEAL });

  /* Mobile keeps stacked icon+label; desktop is a single horizontal row. */
  const mobileCls = (isActive: boolean) =>
    `group flex-1 flex flex-col items-center justify-center gap-1 min-h-[44px] min-w-[44px] px-2 py-1.5 rounded-xl text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] ${
      isActive ? "text-[#0B0F19] bg-[#5EEAD4]" : "text-white/80 hover:text-white hover:bg-white/10"
    }`;

  const searchHomes = (mobile: boolean) => (
    <Link
      to={ACTIVE_MARKET.searchHomesPath}
      aria-current={onSearch ? "page" : undefined}
      className={mobile ? mobileCls(onSearch) : cls(onSearch)}
      onClick={() => track("search_homes", "buying")}
    >
      <Search className="w-4 h-4 shrink-0" style={icon(onSearch)} />
      <span className="whitespace-nowrap">
        {mobile ? labels.searchHomes : labels.searchHomes}
      </span>
    </Link>
  );

  const dealAction = (mobile: boolean) => {
    const label = mobile ? labels.dealCalculatorShort : labels.dealCalculator;
    const inner = (
      <>
        <Calculator className="w-4 h-4 shrink-0" style={icon(!mobile && onDeal)} />
        <span className="whitespace-nowrap">{label}</span>
      </>
    );
    return deal.kind === "internal" ? (
      <Link
        to={deal.to}
        aria-current={onDeal ? "page" : undefined}
        className={mobile ? mobileCls(onDeal) : cls(onDeal)}
        onClick={() => track("analyze_any_deal", "buying")}
      >
        {inner}
      </Link>
    ) : (
      <a
        href={deal.href}
        target="_blank"
        rel="noopener noreferrer"
        className={mobile ? mobileCls(false) : cls(false)}
        onClick={() => track("analyze_any_deal", "buying")}
      >
        {inner}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  };

  const propertyAction = (mobile: boolean) => {
    const label = mobile ? labels.analyzePropertyShort : labels.analyzeProperty;
    const inner = (
      <>
        <FileSearch className="w-4 h-4 shrink-0" style={icon(!mobile && onProperty)} />
        <span className="whitespace-nowrap">{label}</span>
      </>
    );
    return property.kind === "external" ? (
      <a
        href={property.href}
        target="_blank"
        rel="noopener noreferrer"
        className={mobile ? mobileCls(false) : cls(false)}
        onClick={() => track("analyze_any_property")}
      >
        {inner}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    ) : (
      <Link
        to={property.to}
        aria-current={onProperty ? "page" : undefined}
        className={mobile ? mobileCls(onProperty) : cls(onProperty)}
        onClick={() => track("analyze_any_property")}
      >
        {inner}
      </Link>
    );
  };

  const talkToScott = (mobile: boolean) => (
    <TalkToScottDialog context={{ placement: SOURCE }}>
      <button
        type="button"
        className={mobile ? mobileCls(false) : cls(false)}
        onClick={() => track("talk_to_scott")}
      >
        <Phone className="w-4 h-4 shrink-0" style={icon(false)} />
        <span className="whitespace-nowrap">{labels.talkToHuman}</span>
      </button>
    </TalkToScottDialog>
  );

  const surface = {
    backgroundColor: "rgba(14,18,28,0.86)",
    borderColor: "rgba(255,255,255,0.12)",
    boxShadow: "0 24px 60px -28px rgba(0,0,0,0.75)",
    fontFamily: "'Manrope', system-ui, sans-serif",
  } as const;

  return (
    <>
      {/* ── Desktop / tablet: persistent bottom-centered horizontal dock ── */}
      <nav
        aria-label="Property tools"
        className="hidden md:flex fixed inset-x-0 bottom-[22px] z-[1450] justify-center pointer-events-none"
      >
        <div
          className="pointer-events-auto flex items-center gap-1 px-2 py-2 rounded-full border backdrop-blur-xl max-w-[calc(100vw-2rem)] overflow-hidden"
          style={surface}
        >
          {searchHomes(false)}
          {dealAction(false)}
          {propertyAction(false)}
          {talkToScott(false)}
        </div>
      </nav>

      {/* ── Mobile: full-width bottom dock ── */}
      <nav
        aria-label="Property tools"
        className="md:hidden fixed inset-x-0 bottom-0 z-[1450]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div
          className="flex items-stretch gap-1 w-full px-2 py-2 border-t backdrop-blur-xl"
          style={surface}
        >
          {searchHomes(true)}
          {dealAction(true)}
          {propertyAction(true)}
          {talkToScott(true)}
        </div>
      </nav>
    </>
  );
};

export default PropertyToolsDock;
