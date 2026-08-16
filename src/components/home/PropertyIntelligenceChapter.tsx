import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { analyzeAnyPropertyUrl, type DecisionType } from "@/config/externalProducts";
import { logEngagement } from "@/lib/engagement";
import { TalkToScottButton } from "@/components/property/TalkToScott";

const PLACEMENT = "homepage-property-intelligence";

type Path = {
  key: DecisionType;
  title: string;
  copy: string;
  /** Existing indexed internal tool preserved alongside the flagship product. */
  internal?: { label: string; to: string };
};

const PATHS: Path[] = [
  {
    key: "multi_unit",
    title: "Multi-Unit Cash Flow",
    copy: "Rent roll, operating assumptions, financing, and what still needs to be verified.",
    internal: { label: "Internal multi-unit tool", to: "/analyze/multifamily" },
  },
  {
    key: "land",
    title: "Land",
    copy: "Access, utilities, buildability questions, and carrying-cost assumptions.",
    internal: { label: "Internal land tool", to: "/analyze/land" },
  },
  {
    key: "flip",
    title: "Fix & Flip",
    copy: "Scope, budget ranges, holding costs, and the exit assumptions behind the number.",
    internal: { label: "Internal rental tool", to: "/analyze/rental" },
  },
  {
    key: "first_property",
    title: "First Property / House Hack",
    copy: "What the monthly payment actually looks like and which unknowns matter most.",
    internal: { label: "First-time buyer hub", to: "/first-time-buyers" },
  },
  {
    key: "featured",
    title: "Featured Analyses",
    copy: "Worked examples showing how the evidence is organized before a decision.",
    internal: { label: "Sample intelligence report", to: "/reports" },
  },
];

const PropertyIntelligenceChapter = () => (
  <section
    id="property-intelligence"
    className="relative w-full overflow-hidden bg-[#080B12] border-t border-white/[0.06] scroll-mt-24"
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
        <p className="text-[10px] font-medium tracking-[0.45em] uppercase text-[#64748B]">
          Property Intelligence
        </p>
        <h2 className="mt-5 text-3xl md:text-5xl tracking-[-0.035em] leading-[1.07] text-white text-balance">
          <span className="font-extralight text-[#E2E8F0]">Found a property?</span>
          <span className="block font-semibold">Pressure-test it before you decide.</span>
        </h2>
        <p className="mt-5 text-[15px] md:text-[17px] text-[#94A3B8] font-light leading-relaxed">
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
          <p className="text-[10px] font-medium tracking-[0.45em] uppercase text-[#64748B]">
            Start here
          </p>
          <p className="mt-3 text-[17px] md:text-xl text-white tracking-[-0.02em]">
            <span className="font-extralight text-[#E2E8F0]">Buying or investing? </span>
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
        {PATHS.map((p) => (
          <div
            key={p.key}
            className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-7 hover:border-[#5eead4]/40 transition-colors"
          >
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{p.title}</h3>
            <p className="mt-3 text-[14.5px] text-white/65 font-light leading-relaxed">{p.copy}</p>

            <a
              href={analyzeAnyPropertyUrl({ placement: PLACEMENT, decisionType: p.key })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                logEngagement("property_analysis_click", {}, {
                  source_location: PLACEMENT,
                  intent_type: p.key,
                  product_type: "analyze_any_property",
                })
              }
              className="mt-6 inline-flex items-center gap-2 min-h-[44px] text-[14px] font-semibold text-white hover:text-[#5eead4] transition-colors"
            >
              Open in AnalyzeAnyProperty
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {p.internal && (
              <Link
                to={p.internal.to}
                onClick={() =>
                  logEngagement("property_analysis_click", {}, {
                    source_location: PLACEMENT,
                    intent_type: p.key,
                    product_type: "internal_tool",
                  })
                }
                className="mt-1 flex items-center gap-2 min-h-[44px] text-[13px] font-medium text-white/50 hover:text-white/80 transition-colors"
              >
                {p.internal.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <TalkToScottButton
          context={{ placement: PLACEMENT }}
          label="Have Scott review the decision"
        />
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
