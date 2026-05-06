import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import AnalystCard from "@/components/AnalystCard";

const International = () => {
  return (
    <div className="min-h-screen bg-[#0e0f12] text-white">
      <SEOHead
        title="International Buyers | Capital District Nest"
        description="International real estate guidance for the Capital District of New York. Financing, taxes, and relocation support for global buyers."
      />
      <CleanHeader />

      <section className="relative w-full">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-32 md:py-48">
          <p className="eyebrow-apple mb-6 text-[#5eead4]">International Buyers</p>
          <h1 className="h-hero">
            International real estate
            <br />
            <span className="text-white/75 font-light">for the Capital District.</span>
          </h1>
          <p className="mt-8 max-w-2xl body-apple-dark">
            Buying from outside the U.S. — or relocating from another country to
            New York's Capital District — comes with its own financing, tax, and
            paperwork realities. We help international buyers navigate it cleanly.
          </p>

          <div className="cta-anchor flex flex-wrap gap-4">
            <AnalystCard>
              <button className="btn-dark-cta cta-arrow">
                Talk to Scott <ArrowRight className="w-4 h-4" />
              </button>
            </AnalystCard>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-10">
            {[
              { t: "Financing", b: "Foreign national loans, larger down payments, and lender intros for non-U.S. buyers." },
              { t: "Taxes & FIRPTA", b: "What withholding, ITIN, and U.S. tax exposure actually look like." },
              { t: "Relocation", b: "Town fit, schools, and timing for families moving to the Capital District." },
            ].map((c) => (
              <div key={c.t} className="flex gap-5">
                <div className="w-px shrink-0 bg-[#5eead4] opacity-80" />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[#5eead4]">
                    {c.t}
                  </h3>
                  <p className="mt-2 text-sm md:text-base leading-relaxed text-white/65">
                    {c.b}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default International;
