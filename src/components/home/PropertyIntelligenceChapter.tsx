import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { analyzeAnyPropertyUrl, type DecisionType } from "@/config/externalProducts";
import { logEngagement } from "@/lib/engagement";
import { propertyIntelligencePathClick } from "@/lib/homeAnalytics";
import { TalkToScottButton } from "@/components/property/TalkToScott";

const PLACEMENT = "homepage-property-intelligence";

/**
 * Destination contract (founder-approved, evidence-audited).
 *
 * Each card has exactly one primary action, pointing only at a page that
 * genuinely performs that decision's analysis:
 *  - multi_unit  -> /analyze/multifamily   (rent roll, NOI, DSCR, break-even)
 *  - land        -> /analyze/land          (carrying cost, basis, resale)
 *  - flip        -> /homes/analyze?property_type=fix_flip
 *                   (ARV, rehab, holding, resale cost, flip ROI). The deeper
 *                   AnalyzeAnyProperty hand-off lives on that page.
 *  - first_property -> AnalyzeAnyProperty gateway (decision_type=first_property).
 *                   No internal page performs effective-housing-cost math, so
 *                   /first-time-buyers is offered as secondary reading only.
 *  - featured    -> real worked analyses. /reports is a placeholder and is
 *                   deliberately NOT used.
 */
type Path = {
  key: DecisionType;
  title: string;
  copy: string;
  action: string;
  /** Internal route, or an external AAP destination. Never both as primary. */
  to?: string;
  href?: string;
  secondary?: { label: string; to: string };
};

const PATHS: Path[] = [
  {
    key: "multi_unit",
    title: "Multi-Unit Cash Flow",
    copy: "Rent roll, operating assumptions, financing, and what still needs to be verified.",
    to: "/analyze/multifamily",
    action: "Run multi-unit numbers",
  },
  {
    key: "land",
    title: "Land",
    copy: "Access, utilities, buildability questions, and carrying-cost assumptions.",
    to: "/analyze/land",
    action: "Run land numbers",
  },
  {
    key: "flip",
    title: "Fix & Flip",
    copy: "ARV, repair budget, holding costs, and the exit assumptions behind the spread.",
    to: "/homes/analyze?property_type=fix_flip",
    action: "Run flip numbers",
  },
  {
    key: "first_property",
    title: "First Property / House Hack",
    copy: "Effective monthly housing cost after tenant income, FHA multi-unit rules, and reserves.",
    href: analyzeAnyPropertyUrl({
      placement: PLACEMENT,
      decisionType: "first_property",
    }),
    action: "Run house-hack numbers",
    secondary: { label: "How first-time buying works", to: "/first-time-buyers" },
  },
  {
    key: "featured",
    title: "Featured Analyses",
    copy: "Real worked analyses showing how the evidence is organized before a decision.",
    to: "/reports/sample-property-intelligence",
    action: "See a worked analysis",
    secondary: {
      label: "1999 Ridge Road, Queensbury",
      to: "/reports/1999-ridge-road-queensbury-ny",
    },
  },
];



const PropertyIntelligenceChapter = () => (
  <section
    id="property-intelligence"
    className="relative w-full overflow-hidden bg-surface-deep border-t border-white/[0.06] scroll-mt-24"
  >
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(50% 40% at 80% 10%, rgba(94,234,212,0.09), transparent 70%), radial-gradient(45% 45% at 5% 90%, rgba(13,110,102,0.14), transparent 75%)",
      }}
    />

    <div
      className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-28"
      style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
    >
      <div className="max-w-3xl">
        <p className="text-[10px] font-medium tracking-[0.45em] uppercase text-text-quiet">
          Property Intelligence
        </p>
        <h2 className="mt-5 text-3xl md:text-5xl tracking-[-0.035em] leading-[1.07] text-white text-balance">
          <span className="font-extralight text-text-bright">Found a property?</span>
          <span className="block font-semibold">Pressure-test it before you decide.</span>
        </h2>
        <p className="mt-5 text-[15px] md:text-[17px] text-text-soft font-light leading-relaxed">
          Look beyond the listing. Compare the numbers, surface the assumptions,
          identify what is still unknown, and decide what should be verified next.
        </p>
        <p className="mt-6 text-[15px] font-medium text-[#5eead4]">
          Technology organizes the evidence. Scott reviews the decision.
        </p>
      </div>

      {/* Flagship route — deal math lives in Analyze Any Deal */}
      <div
        className="mt-10 rounded-2xl border border-white/[0.08] p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
        style={{ background: "linear-gradient(180deg, #13161E 0%, #1A1D26 100%)" }}
      >
        <div>
          <p className="text-[10px] font-medium tracking-[0.45em] uppercase text-text-quiet">
            Start here
          </p>
          <p className="mt-3 text-[17px] md:text-xl text-white tracking-[-0.02em]">
            <span className="font-extralight text-text-bright">Buying or investing? </span>
            <span className="font-semibold">Start with Analyze Any Deal.</span>
          </p>
        </div>
        <Link
          to="/analyze-any-deal"
          onClick={() =>
            logEngagement("property_analysis_click", {}, {
              source_location: PLACEMENT,
              intent_type: "buying",
              product_type: "analyze_any_deal",
            })
          }
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full text-white text-[13px] font-semibold tracking-wide hover:opacity-90 transition shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60"
          style={{ backgroundColor: "#0d6e66" }}
        >
          Open Analyze Any Deal <ArrowRight className="w-4 h-4" />
        </Link>
      </div>


      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PATHS.map((p) => {
          const external = Boolean(p.href);
          const track = () => {
            propertyIntelligencePathClick(p.key, external ? "external" : "internal");
            logEngagement("property_analysis_click", {}, {
              source_location: PLACEMENT,
              intent_type: p.key,
              product_type: external ? "analyze_any_property" : "internal_tool",
            });
          };
          const cardClass =
            "group relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 hover:border-[#5eead4]/40 hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60";
          const body = (
            <>
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{p.title}</h3>
              <p className="mt-3 text-[14.5px] text-white/65 font-light leading-relaxed">{p.copy}</p>
              <span className="mt-auto pt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
                {p.action}
                {external ? (
                  <ArrowUpRight className="w-4 h-4" aria-hidden />
                ) : (
                  <ArrowRight className="w-4 h-4" aria-hidden />
                )}
              </span>
            </>
          );

          return (
            <div key={p.key} className="flex flex-col">
              {external ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={track}
                  className={`${cardClass} flex-1`}
                >
                  {body}
                </a>
              ) : (
                <Link to={p.to!} onClick={track} className={`${cardClass} flex-1`}>
                  {body}
                </Link>
              )}

              {p.secondary && (
                <Link
                  to={p.secondary.to}
                  className="mt-2.5 inline-flex items-center gap-1.5 px-2 min-h-[40px] text-[13px] font-medium text-white/50 hover:text-white/80 transition-colors"
                >
                  {p.secondary.label}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                </Link>
              )}
            </div>
          );
        })}
      </div>


      <div className="mt-10 flex flex-wrap items-center gap-3">
        <TalkToScottButton
          context={{ placement: PLACEMENT }}
          label="Have Scott review the decision"
        />
        <a
          href={analyzeAnyPropertyUrl({ placement: PLACEMENT })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            propertyIntelligencePathClick("chapter", "external");
            logEngagement("property_analysis_click", {}, {
              source_location: PLACEMENT,
              intent_type: "property_intelligence",
              product_type: "analyze_any_property",
            });
          }}
          className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-full border border-white/15 bg-white/[0.04] text-white text-[13px] font-semibold hover:bg-white/[0.09] transition"
        >
          Open AnalyzeAnyProperty
          <ArrowUpRight className="w-4 h-4" aria-hidden />
        </a>
      </div>


      <p className="mt-8 text-[12px] leading-relaxed text-white/40 max-w-3xl">
        Analysis tools organize assumptions and public information. Outputs are
        estimates, not verified facts, and are not an appraisal, a comparative
        market analysis, or financial, legal, or tax advice.
      </p>
    </div>
  </section>
);

export default PropertyIntelligenceChapter;
