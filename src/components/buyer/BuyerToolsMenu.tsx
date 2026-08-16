import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Calculator, FileSearch, Phone, Search } from "lucide-react";
import { analyzeAnyDealDestination, analyzeAnyPropertyUrl } from "@/config/externalProducts";
import { TalkToScottDialog } from "@/components/property/TalkToScott";
import { trackBuyerToolSelect } from "@/components/buyer/buyerToolsAnalytics";

const TEAL = "#0D6E66";

/**
 * Shared Buyer Tools content used by both the desktop dock panel and the
 * mobile bottom sheet. Destinations always go through the shared product
 * helpers — never hardcoded product URLs.
 */
const BuyerToolsMenu = ({
  pathname,
  sourceLocation,
  onNavigate,
  includeSearchHomes = false,
  tone = "light",
}: {
  pathname: string;
  sourceLocation: string;
  onNavigate: () => void;
  includeSearchHomes?: boolean;
  tone?: "light" | "dark";
}) => {
  const dark = tone === "dark";
  const dest = analyzeAnyDealDestination({ placement: sourceLocation, intentType: "buying" });
  const aapHref = analyzeAnyPropertyUrl({ placement: sourceLocation });

  const rowClass = dark
    ? "flex items-start gap-3 w-full min-h-[44px] px-4 py-3.5 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.09] transition text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/70"
    : "flex items-start gap-3 w-full min-h-[44px] px-4 py-3.5 rounded-2xl border border-[#DFDCD4] bg-white hover:bg-[#F3F4F2] transition text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E66]/60";
  const titleClass = dark
    ? "block text-[14.5px] font-semibold text-white"
    : "block text-[14.5px] font-semibold text-[#14181F]";
  const subClass = dark
    ? "block mt-0.5 text-[12.5px] font-light leading-snug text-white/60"
    : "block mt-0.5 text-[12.5px] font-light leading-snug text-[#64748B]";

  const Icon = ({ children }: { children: React.ReactNode }) => (

    <span
      className="w-9 h-9 shrink-0 rounded-full inline-flex items-center justify-center"
      style={{ backgroundColor: dark ? "rgba(13,110,102,0.22)" : "rgba(13,110,102,0.10)" }}
    >
      {children}
    </span>
  );

  const iconColor = dark ? "#5EEAD4" : TEAL;

  return (
    <div className="space-y-3">
      {/* 1 — Deal Calculator (Analyze Any Deal) */}
      {dest.kind === "internal" ? (
        <Link
          to={dest.to}
          className={rowClass}
          onClick={() => {
            trackBuyerToolSelect(sourceLocation, pathname, "analyze_any_deal", "buying");
            onNavigate();
          }}
        >
          <Icon><Calculator className="w-4 h-4" style={{ color: iconColor }} /></Icon>
          <span className="flex-1 min-w-0">
            <span className={titleClass}>Deal Calculator</span>
            <span className={subClass}>
              Payment, cash to close, financing, cash flow, and deal math.
            </span>
          </span>
          <ArrowRight className="w-4 h-4 mt-1 shrink-0" style={{ color: iconColor }} />
        </Link>
      ) : (
        <a
          href={dest.href}
          target="_blank"
          rel="noopener noreferrer"
          className={rowClass}
          onClick={() => {
            trackBuyerToolSelect(sourceLocation, pathname, "analyze_any_deal", "buying");
            onNavigate();
          }}
        >
          <Icon><Calculator className="w-4 h-4" style={{ color: iconColor }} /></Icon>
          <span className="flex-1 min-w-0">
            <span className={titleClass}>Deal Calculator</span>
            <span className={subClass}>
              Payment, cash to close, financing, cash flow, and deal math.
            </span>
          </span>
          <ArrowUpRight className="w-4 h-4 mt-1 shrink-0" style={{ color: iconColor }} />
        </a>
      )}

      {/* 2 — Property Intelligence (Analyze Any Property) */}
      <a
        href={aapHref}
        target="_blank"
        rel="noopener noreferrer"
        className={rowClass}
        onClick={() => {
          trackBuyerToolSelect(sourceLocation, pathname, "analyze_any_property");
          onNavigate();
        }}
      >
        <Icon><FileSearch className="w-4 h-4" style={{ color: iconColor }} /></Icon>
        <span className="flex-1 min-w-0">
          <span className={titleClass}>Property Intelligence</span>
          <span className={subClass}>
            Evidence, assumptions, unknowns, scenarios, and what to verify.
          </span>
        </span>
        <ArrowUpRight className="w-4 h-4 mt-1 shrink-0" style={{ color: iconColor }} />
      </a>

      {includeSearchHomes && (
        <Link
          to="/homes/search"
          className={rowClass}
          onClick={() => {
            trackBuyerToolSelect(sourceLocation, pathname, "search_homes", "buying");
            onNavigate();
          }}
        >
          <Icon><Search className="w-4 h-4" style={{ color: iconColor }} /></Icon>
          <span className="flex-1 min-w-0">
            <span className={titleClass}>Search Homes</span>
            <span className={subClass}>Live listings across the Capital District.</span>
          </span>
          <ArrowRight className="w-4 h-4 mt-1 shrink-0" style={{ color: iconColor }} />
        </Link>
      )}

      {/* Quiet human action — not a competing third product */}
      <div className={dark ? "pt-1 border-t border-white/10" : "pt-1 border-t border-[#DFDCD4]"}>
        <TalkToScottDialog context={{ placement: sourceLocation }}>
          <button
            type="button"
            onClick={() => trackBuyerToolSelect(sourceLocation, pathname, "talk_to_scott")}
            className={`inline-flex items-center gap-2 min-h-[44px] w-full px-2 text-[13px] font-semibold rounded-xl transition focus-visible:outline-none focus-visible:ring-2 ${
              dark
                ? "text-white/75 hover:text-white focus-visible:ring-[#5EEAD4]/70"
                : "text-[#14181F]/70 hover:text-[#14181F] focus-visible:ring-[#0D6E66]/60"
            }`}
          >
            <Phone className="w-4 h-4" style={{ color: iconColor }} />
            Talk to Scott
          </button>
        </TalkToScottDialog>
      </div>
    </div>
  );
};

export default BuyerToolsMenu;
