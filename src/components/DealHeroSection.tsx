import { ArrowRight, CheckCircle, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import SamplePropertyCard from "@/components/SamplePropertyCard";
import MarketStatsBar from "@/components/MarketStatsBar";

const DealHeroSection = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full bg-amber/5 blur-[200px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[180px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT — Headlines & CTAs */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald" />
                </span>
                <span className="text-xs font-semibold text-emerald uppercase tracking-widest">Live MLS Data</span>
                <span className="text-xs text-muted-foreground ml-2">101 Active Deals</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-foreground">
                Find Cash-Flowing
                <br />
                <span className="bg-gradient-to-r from-amber to-amber-muted bg-clip-text text-transparent">
                  Multifamily Deals
                </span>
                <br />
                in Seconds
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Pre-screened investment properties with real-time cap rates, cash flow projections, and deal scores. No guesswork.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/homes-for-sale"
                  className="inline-flex items-center justify-center gap-2 bg-amber text-amber-foreground px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all"
                >
                  Browse 101 Deals
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/investment-analyzer"
                  className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-muted transition-all"
                >
                  <BarChart3 className="w-5 h-5" />
                  Try the Analyzer
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {["Updated Daily", "Direct MLS Feed", "7 Loan Types"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — Property Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <SamplePropertyCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarketStatsBar />
    </>
  );
};

export default DealHeroSection;
