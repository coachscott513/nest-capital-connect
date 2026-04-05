import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CinematicHero = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 pt-24 pb-20 md:pt-36 md:pb-32 lg:pt-44 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Copy — typographic, spacious */}
          <div className="space-y-10">
            <h1 className="headline-hero">
              Analyze Any Property
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md font-light">
              Cash flow, cap rate, value trends, and local market intelligence — built for buyers, sellers, and investors.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <Link
                to="/analyze"
                className="inline-flex items-center justify-center gap-2.5 bg-foreground text-background px-8 py-4 rounded-full font-semibold text-base hover:bg-foreground/85 transition-colors"
              >
                Analyze a Property
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/intel/1999-ridge-road-queensbury-ny"
                className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground px-2 py-4 font-medium text-base transition-colors"
              >
                See Example Analysis →
              </Link>
            </div>
          </div>

          {/* Right: Premium analysis preview — minimal, not spreadsheet-like */}
          <div className="hidden lg:block">
            <div className="bg-card rounded-3xl p-10 shadow-[0_8px_40px_-12px_hsla(220,10%,30%,0.1)]">
              <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-8">Sample Analysis</p>
              <div className="space-y-6">
                {[
                  { label: "Purchase Price", value: "$285,000" },
                  { label: "Monthly Cash Flow", value: "+$680", highlight: true },
                  { label: "Cap Rate", value: "7.2%", highlight: true },
                  { label: "Cash on Cash", value: "12.4%", highlight: true },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-baseline">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className={`text-2xl font-semibold tracking-tight ${item.highlight ? "text-accent" : "text-foreground"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
