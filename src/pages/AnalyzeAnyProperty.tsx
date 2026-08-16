import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowUpRight, Calculator, FileSearch, Phone } from "lucide-react";
import {
  analyzeAnyDealDestination,
  analyzeAnyPropertyUrl,
} from "@/config/externalProducts";
import { logEngagement } from "@/lib/engagement";

const PLACEMENT = "analyze-any-property-bridge";

/* Analyze Any Property paper/survey language. */
const PAPER = "#FBFAF7";
const INK = "#14181F";
const SURVEY = "#1F4A5F";
const HAIRLINE = "#DFDCD4";
const SLATE = "#64748B";
const TEAL = "#0D6E66";

/**
 * Honest product bridge between the two distinct products:
 *   • Analyze Any Deal        — the shared calculation engine (run the numbers)
 *   • Analyze Any Property    — the property-evidence product (review the evidence)
 * No calculation engine is duplicated here, and no counts are asserted.
 */
const AnalyzeAnyProperty = () => {
  const dealDest = analyzeAnyDealDestination({ placement: PLACEMENT, intentType: "buying" });
  const aapHref = analyzeAnyPropertyUrl({ placement: PLACEMENT });

  const trackDeal = () =>
    logEngagement("property_analysis_click", {}, {
      source_location: PLACEMENT,
      intent_type: "buying",
      product_type: "analyze_any_deal",
    });

  const trackAap = () =>
    logEngagement("property_analysis_click", {}, {
      source_location: PLACEMENT,
      product_type: "analyze_any_property",
    });

  const primaryBtn =
    "inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full text-white text-[13px] font-semibold tracking-wide hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E66]/60";

  return (
    <div className="min-h-screen" style={{ background: PAPER, fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <SEOHead
        title="Run the Numbers or Review the Evidence | Capital District Nest"
        description="Two ways to test a property decision: the Deal Calculator for payment, cash to close and cash flow, and Property Intelligence for evidence, assumptions and what must be verified."
        canonical="https://www.capitaldistrictnest.com/analyze-any-property"
      />
      <CleanHeader />

      {/* HERO */}
      <section className="pt-32 pb-14 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] font-medium tracking-[0.45em] uppercase" style={{ color: SURVEY }}>
            Property decisions
          </p>
          <h1
            className="mt-6 text-4xl md:text-[56px] tracking-[-0.035em] leading-[1.06]"
            style={{ color: INK }}
          >
            <span className="block font-extralight" style={{ color: "rgba(20,24,31,0.62)" }}>
              Run the numbers.
            </span>
            <span className="block font-semibold">Review the evidence.</span>
          </h1>
          <p className="mt-7 text-[16px] md:text-[18px] font-light leading-[1.7]" style={{ color: SLATE }}>
            Two different questions sit behind every property decision. One is
            financial structure. The other is what is actually known about the
            property. Capital District Nest connects you to both.
          </p>
          <p className="mt-6 text-[15px] font-medium" style={{ color: SURVEY }}>
            The calculator tests the financial structure. Property Intelligence
            tests the evidence behind the decision.
          </p>
        </div>
      </section>

      {/* TWO CHOICES — document rhythm */}
      <section className="px-6 pb-8">
        <div className="max-w-3xl mx-auto border-t" style={{ borderTopColor: HAIRLINE }}>
          {/* 1 — Run the numbers */}
          <article className="py-12 border-b" style={{ borderBottomColor: HAIRLINE }}>
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-full inline-flex items-center justify-center"
                style={{ backgroundColor: "rgba(13,110,102,0.10)" }}
              >
                <Calculator className="w-4 h-4" style={{ color: TEAL }} />
              </span>
              <p className="text-[10px] font-medium tracking-[0.4em] uppercase" style={{ color: TEAL }}>
                Analyze Any Deal
              </p>
            </div>
            <h2 className="mt-5 text-2xl md:text-[34px] font-semibold tracking-[-0.03em]" style={{ color: INK }}>
              Run the numbers
            </h2>
            <p className="mt-4 text-[15.5px] font-light leading-[1.75] max-w-2xl" style={{ color: SLATE }}>
              Projected monthly payment, cash to close, financing structure,
              monthly ownership cost, cash flow, and the returns a deal depends
              on — for a home you plan to live in or an income property.
            </p>
            <div className="mt-7">
              {dealDest.kind === "internal" ? (
                <Link to={dealDest.to} onClick={trackDeal} className={primaryBtn} style={{ backgroundColor: TEAL }}>
                  Open the Deal Calculator <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <a
                  href={dealDest.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackDeal}
                  className={primaryBtn}
                  style={{ backgroundColor: TEAL }}
                >
                  Open the Deal Calculator <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </article>

          {/* 2 — Review the property evidence */}
          <article className="py-12 border-b" style={{ borderBottomColor: HAIRLINE }}>
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-full inline-flex items-center justify-center"
                style={{ backgroundColor: "rgba(31,74,95,0.10)" }}
              >
                <FileSearch className="w-4 h-4" style={{ color: SURVEY }} />
              </span>
              <p className="text-[10px] font-medium tracking-[0.4em] uppercase" style={{ color: SURVEY }}>
                Analyze Any Property
              </p>
            </div>
            <h2 className="mt-5 text-2xl md:text-[34px] font-semibold tracking-[-0.03em]" style={{ color: INK }}>
              Review the property evidence
            </h2>
            <p className="mt-4 text-[15.5px] font-light leading-[1.75] max-w-2xl" style={{ color: SLATE }}>
              Public records, stated assumptions, open unknowns, alternative
              scenarios, due-diligence questions, and what still has to be
              verified before the decision is made.
            </p>
            <div className="mt-7">
              <a
                href={aapHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackAap}
                className={primaryBtn}
                style={{ backgroundColor: SURVEY }}
              >
                Open Property Intelligence <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* HUMAN CLOSE */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto pt-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em]" style={{ color: INK }}>
            Not sure which one you need?
          </h2>
          <p className="mt-4 text-[15.5px] font-light leading-[1.75]" style={{ color: SLATE }}>
            If the question is whether the money works, start with the Deal
            Calculator. If the question is what is actually true about the
            property, start with Property Intelligence. Most decisions eventually
            use both.
          </p>
          <a
            href="tel:5185227265"
            className="mt-8 inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full border bg-white text-[13px] font-semibold transition hover:bg-[#F3F4F2]"
            style={{ borderColor: HAIRLINE, color: INK }}
          >
            <Phone className="w-4 h-4" style={{ color: TEAL }} />
            Talk to Scott Alvarez — (518) 522-7265
          </a>
          <p className="mt-8 text-[12px] leading-relaxed max-w-2xl" style={{ color: SLATE }}>
            Analysis tools organize assumptions and public information. Outputs
            are estimates, not verified facts, and are not an appraisal, a
            comparative market analysis, or financial, legal, or tax advice.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnalyzeAnyProperty;
