import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, TrendingUp, DollarSign, MapPin, Home, Users, Shield, CheckCircle } from "lucide-react";

const CinematicHero = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/8 rounded-full px-4 py-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Property Intelligence Platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-foreground">
              Analyze Any Property
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Cash flow, cap rate, value trends, equity insight, and local market intelligence — built for buyers, sellers, and investors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/analyze"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
              >
                Analyze a Property
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/intel/1999-ridge-road-queensbury-ny"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-secondary transition-colors"
              >
                See Example Analysis
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Link to="/communities" className="hover:text-primary transition-colors">Explore Towns →</Link>
              <Link to="/insights" className="hover:text-primary transition-colors">Market Insights →</Link>
            </div>
          </div>

          {/* Right: Analyzer preview card */}
          <div className="hidden lg:block">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Property Intelligence Report</p>
                  <p className="text-muted-foreground text-xs">Sample Analysis</p>
                </div>
              </div>
              <div className="space-y-0">
                {[
                  { label: "Purchase Price", value: "$285,000" },
                  { label: "Estimated Rent", value: "$2,450/mo", highlight: true },
                  { label: "Cap Rate", value: "7.2%", highlight: true },
                  { label: "Cash on Cash", value: "12.4%", highlight: true },
                  { label: "Monthly Cash Flow", value: "+$680", highlight: true },
                  { label: "5-Year Equity", value: "+$87,500", highlight: true },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className={`font-semibold text-sm ${item.highlight ? "text-emerald-600" : "text-foreground"}`}>
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
