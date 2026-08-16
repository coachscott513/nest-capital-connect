import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calculator, FileSearch, Phone, Search, SlidersHorizontal, X } from "lucide-react";
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
 * Desktop/tablet: a quiet right-edge vertical tab, collapsed by default. On
 * interaction it opens a compact accessible panel with the four buyer actions.
 * Mobile: the existing fixed bottom dock with safe-area support.
 *
 * Route scope is owned by `routeExperience.ts` — no pathname checks here.
 * Destinations always come from the regional product configuration.
 */
const PropertyToolsDock = () => {
  const { pathname } = useLocation();
  const show = isBuyerToolsRoute(pathname);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Reserve space so the mobile dock never covers content or consent controls.
  useEffect(() => {
    if (!show) return;
    document.body.classList.add("has-property-dock");
    return () => document.body.classList.remove("has-property-dock");
  }, [show]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

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

  /* ---------------- mobile (unchanged bottom dock) ---------------- */
  const mBase =
    "group flex-1 flex flex-col items-center justify-center gap-1 min-h-[44px] min-w-[44px] px-2 py-2 rounded-xl text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E66] focus-visible:ring-offset-2 focus-visible:ring-offset-white";
  const mIdle = "text-[#14181F]/75 hover:text-[#14181F] hover:bg-[#F3F4F2]";
  const mActive = "text-white bg-[#0D6E66]";
  const mCls = (isActive: boolean) => `${mBase} ${isActive ? mActive : mIdle}`;
  const icon = (isActive: boolean) => ({ color: isActive ? "#FFFFFF" : TEAL });

  /* ---------------- desktop panel rows ---------------- */
  const rowCls =
    "flex items-center gap-3 min-h-[48px] px-3 rounded-xl text-[14px] font-semibold text-[#14181F] hover:bg-[#F3F4F2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E66]";

  const searchHomes = (mobile: boolean) => (
    <Link
      to={ACTIVE_MARKET.searchHomesPath}
      aria-current={onSearch ? "page" : undefined}
      className={mobile ? mCls(onSearch) : rowCls}
      onClick={() => {
        track("search_homes", "buying");
        setOpen(false);
      }}
    >
      <Search className="w-4 h-4 shrink-0" style={icon(mobile && onSearch)} />
      <span className="whitespace-nowrap">{labels.searchHomes}</span>
    </Link>
  );

  const dealAction = (mobile: boolean) =>
    deal.kind === "internal" ? (
      <Link
        to={deal.to}
        aria-current={onDeal ? "page" : undefined}
        className={mobile ? mCls(onDeal) : rowCls}
        onClick={() => {
          track("analyze_any_deal", "buying");
          setOpen(false);
        }}
      >
        <Calculator className="w-4 h-4 shrink-0" style={icon(mobile && onDeal)} />
        <span className="whitespace-nowrap">
          {mobile ? labels.dealCalculatorShort : labels.dealCalculator}
        </span>
      </Link>
    ) : (
      <a
        href={deal.href}
        target="_blank"
        rel="noopener noreferrer"
        className={mobile ? mCls(false) : rowCls}
        onClick={() => {
          track("analyze_any_deal", "buying");
          setOpen(false);
        }}
      >
        <Calculator className="w-4 h-4 shrink-0" style={icon(false)} />
        <span className="whitespace-nowrap">
          {mobile ? labels.dealCalculatorShort : labels.dealCalculator}
        </span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );

  const propertyAction = (mobile: boolean) =>
    property.kind === "external" ? (
      <a
        href={property.href}
        target="_blank"
        rel="noopener noreferrer"
        className={mobile ? mCls(false) : rowCls}
        onClick={() => {
          track("analyze_any_property");
          setOpen(false);
        }}
      >
        <FileSearch className="w-4 h-4 shrink-0" style={icon(false)} />
        <span className="whitespace-nowrap">
          {mobile ? labels.analyzePropertyShort : labels.analyzeProperty}
        </span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    ) : (
      <Link
        to={property.to}
        aria-current={onProperty ? "page" : undefined}
        className={mobile ? mCls(onProperty) : rowCls}
        onClick={() => {
          track("analyze_any_property");
          setOpen(false);
        }}
      >
        <FileSearch className="w-4 h-4 shrink-0" style={icon(mobile && onProperty)} />
        <span className="whitespace-nowrap">
          {mobile ? labels.analyzePropertyShort : labels.analyzeProperty}
        </span>
      </Link>
    );

  const talkToScott = (mobile: boolean) => (
    <TalkToScottDialog context={{ placement: SOURCE }}>
      <button
        type="button"
        className={mobile ? mCls(false) : `${rowCls} w-full text-left`}
        onClick={() => track("talk_to_scott")}
      >
        <Phone className="w-4 h-4 shrink-0" style={icon(false)} />
        <span className="whitespace-nowrap">{labels.talkToHuman}</span>
      </button>
    </TalkToScottDialog>
  );

  return (
    <>
      {/* ── Desktop / tablet: quiet right-edge tab ── */}
      <div className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-[1450]">
        <div className="relative flex items-center justify-end">
          {open && (
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="false"
              aria-label="Property tools"
              className="mr-3 w-[320px] rounded-2xl border p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-2 duration-200"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#DFDCD4",
                boxShadow: "0 28px 70px -30px rgba(11,15,25,0.5)",
                fontFamily: "'Manrope', system-ui, sans-serif",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p
                    className="text-[10px] font-semibold tracking-[0.3em] uppercase"
                    style={{ color: TEAL }}
                  >
                    Property tools
                  </p>
                  <p className="mt-1 text-[13px] font-light leading-snug text-[#64748B]">
                    Search, run the numbers, or talk to a human.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  aria-label="Close property tools"
                  className="w-9 h-9 rounded-full border inline-flex items-center justify-center transition hover:bg-[#F3F4F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E66]"
                  style={{ borderColor: "#DFDCD4", color: "#14181F" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {searchHomes(false)}
                {dealAction(false)}
                {propertyAction(false)}
                {talkToScott(false)}
              </div>
            </div>
          )}

          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-label="Property tools"
            onClick={() => {
              const next = !open;
              setOpen(next);
              if (next)
                logEngagement("property_tools_open", {}, {
                  ...productAnalyticsContext(SOURCE),
                  route_group: routeGroupLabel(pathname),
                  pathname: analyticsPathname(pathname),
                });
            }}
            className="inline-flex items-center gap-2 py-3 pl-3 pr-2.5 rounded-l-2xl border border-r-0 text-[12px] font-semibold tracking-wide transition hover:bg-[#0D6E66] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E66]"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#DFDCD4",
              color: "#14181F",
              writingMode: "vertical-rl",
              boxShadow: "0 18px 44px -26px rgba(11,15,25,0.5)",
              fontFamily: "'Manrope', system-ui, sans-serif",
            }}
          >
            <SlidersHorizontal className="w-4 h-4 rotate-90" />
            Property tools
          </button>
        </div>
      </div>

      {/* ── Mobile: route-aware bottom dock ── */}
      <nav
        aria-label="Property tools"
        className="md:hidden fixed inset-x-0 bottom-0 z-[1450]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div
          className="flex items-stretch gap-1 w-full px-2 py-2 border-t bg-white/95 backdrop-blur-xl"
          style={{
            borderColor: "#DFDCD4",
            boxShadow: "0 24px 60px -30px rgba(11,15,25,0.45)",
            fontFamily: "'Manrope', system-ui, sans-serif",
          }}
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
