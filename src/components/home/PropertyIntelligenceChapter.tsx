import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { analyzeAnyPropertyUrl, type DecisionType } from "@/config/externalProducts";
import { logEngagement } from "@/lib/engagement";
import { TalkToScottButton } from "@/components/property/TalkToScott";

const PLACEMENT = "homepage-property-intelligence";

/* Analyze Any Property documentary/survey language — deliberately distinct
   from the Analyze Any Deal fintech surface. */
const PAPER = "#FBFAF7";
const INK = "#14181F";
const SURVEY = "#1F4A5F";
const HAIRLINE = "#DFDCD4";
const SLATE = "#64748B";
const TEAL = "#0D6E66";

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
    className="relative w-full scroll-mt-24 border-t"
    style={{ background: PAPER, borderTopColor: HAIRLINE }}
  >
    <div
      className="relative max-w-5xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-28"
      style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
    >
      <div className="max-w-3xl">
        <p className="text-[10px] font-medium tracking-[0.45em] uppercase" style={{ color: SURVEY }}>
          Property Intelligence
        </p>
        <h2
          className="mt-5 text-3xl md:text-5xl tracking-[-0.035em] leading-[1.07] text-balance"
          style={{ color: INK }}
        >
          <span className="font-extralight" style={{ color: "rgba(20,24,31,0.6)" }}>
            Found a property?
          </span>
          <span className="block font-semibold">Pressure-test it before you decide.</span>
        </h2>
        <p className="mt-5 text-[15px] md:text-[17px] font-light leading-relaxed" style={{ color: SLATE }}>
          Look beyond the listing. Compare the numbers, surface the assumptions,
          identify what is still unknown, and decide what should be verified next.
        </p>
        <p className="mt-6 text-[15px] font-medium" style={{ color: SURVEY }}>
          Technology organizes the evidence. Scott reviews the decision.
        </p>
      </div>

      {/* Flagship route — deal math lives in Analyze Any Deal */}
      <div
        className="mt-10 rounded-2xl border p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5 bg-white"
        style={{ borderColor: HAIRLINE }}
      >
        <div>
          <p className="text-[10px] font-medium tracking-[0.45em] uppercase" style={{ color: TEAL }}>
            Start here
          </p>
          <p className="mt-3 text-[17px] md:text-xl tracking-[-0.02em]" style={{ color: INK }}>
            <span className="font-extralight" style={{ color: "rgba(20,24,31,0.65)" }}>
              Buying or investing?{" "}
            </span>
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
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full text-white text-[13px] font-semibold tracking-wide hover:opacity-90 transition shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E66]/60"
          style={{ backgroundColor: TEAL }}
        >
          Open Analyze Any Deal <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Document rhythm — ruled rows rather than floating dark cards */}
      <ul className="mt-12 md:mt-16 border-t" style={{ borderTopColor: HAIRLINE }}>
        {PATHS.map((p) => (
          <li
            key={p.key}
            className="border-b py-7 flex flex-col md:flex-row md:items-start md:gap-10"
            style={{ borderBottomColor: HAIRLINE }}
          >
            <div className="md:w-1/3">
              <h3 className="text-xl font-semibold tracking-[-0.02em]" style={{ color: INK }}>
                {p.title}
              </h3>
            </div>
            <div className="md:flex-1 mt-2 md:mt-0">
              <p className="text-[14.5px] font-light leading-relaxed" style={{ color: SLATE }}>
                {p.copy}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-8">
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
                  className="inline-flex items-center gap-2 min-h-[44px] text-[14px] font-semibold transition-colors hover:opacity-80"
                  style={{ color: SURVEY }}
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
                    className="inline-flex items-center gap-2 min-h-[44px] text-[13px] font-medium transition-colors hover:opacity-80"
                    style={{ color: SLATE }}
                  >
                    {p.internal.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <TalkToScottButton
          context={{ placement: PLACEMENT }}
          label="Have Scott review the decision"
        />
      </div>

      <p className="mt-8 text-[12px] leading-relaxed max-w-3xl" style={{ color: SLATE }}>
        Analysis tools organize assumptions and public information. Outputs are
        estimates, not verified facts, and are not an appraisal, a comparative
        market analysis, or financial, legal, or tax advice.
      </p>
    </div>
  </section>
);

export default PropertyIntelligenceChapter;
