import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, BarChart3, Key, MapPin, Building2, Calculator, Zap, Phone } from "lucide-react";

const GOLD = "#0D9488";
const NAVY = "#0A0F1E";

const AnalyzeAnyProperty = () => {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <SEOHead
        title="Analyze Any Property | AnalyzeAnyProperty.com"
        description="Whether you're buying your first home, investing in a rental, or comparing rent vs owning — get the numbers you need to decide with confidence."
        canonical="https://www.capitaldistrictnest.com/analyze-any-property"
      />
      <CleanHeader />

      {/* HERO — white, clean */}
      <section className="pt-32 pb-16 px-6 min-h-[400px] flex items-center bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: GOLD }}>
            Analyze Any Property
          </p>
          <h1 className="text-4xl md:text-[56px] font-bold leading-[1.1] mb-6" style={{ color: NAVY }}>
            Analyze any property.<br />Any situation. In minutes.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you're buying your first home, investing in a rental, or comparing rent vs owning — get the numbers you need to decide with confidence.
          </p>
        </div>
      </section>

      {/* STATS BAR — light gray */}
      <section className="py-5 px-6 bg-[#F7F7F5] border-y border-border/40">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
          {[
            { icon: Building2, label: "Active Listings", value: "366" },
            { icon: MapPin, label: "Capital District Towns", value: "44" },
            { icon: Calculator, label: "Loan Types", value: "7" },
            { icon: Zap, label: "Free to Use", value: "Always" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <stat.icon className="w-4 h-4" style={{ color: GOLD }} />
              <span className="text-muted-foreground">{stat.label}:</span>
              <span className="font-bold" style={{ color: NAVY }}>{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* THREE PATH CARDS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 — Buying a Home */}
          <Card className="overflow-hidden bg-white border border-border/60 flex flex-col min-h-[380px] shadow-sm hover:shadow-md transition-shadow">
            <div className="p-10 flex flex-col flex-1">
              <Home className="w-11 h-11 mb-5" style={{ color: GOLD }} />
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: GOLD }}>First-Time Buyer</p>
              <h2 className="text-2xl font-bold mb-4" style={{ color: NAVY }}>What will this home really cost me?</h2>
              <p className="text-base text-muted-foreground mb-10 flex-1 leading-[1.7]">
                Monthly payment, cash to close, affordability check, and first-time buyer programs. No investor jargon.
              </p>
              <Button asChild className="w-full font-semibold h-12 text-base bg-white border-2" style={{ borderColor: NAVY, color: NAVY }}>
                <Link to="/analyze-home">Analyze a Home →</Link>
              </Button>
            </div>
          </Card>

          {/* Card 2 — Investing (featured) */}
          <Card className="overflow-hidden bg-white border border-border/60 border-t-4 flex flex-col min-h-[380px] shadow-sm hover:shadow-md transition-shadow" style={{ borderTopColor: GOLD }}>
            <div className="p-10 flex flex-col flex-1">
              <BarChart3 className="w-11 h-11 mb-5" style={{ color: GOLD }} />
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: GOLD }}>Real Estate Investor</p>
              <h2 className="text-2xl font-bold mb-4" style={{ color: NAVY }}>Does this deal cash flow?</h2>
              <p className="text-base text-muted-foreground mb-10 flex-1 leading-[1.7]">
                Cap rate, cash flow, DSCR, and deal score for any multi-family or investment property. 7 loan types.
              </p>
              <Button asChild className="w-full text-white font-semibold h-12 text-base" style={{ backgroundColor: GOLD }}>
                <Link to="/analyze">Analyze a Deal →</Link>
              </Button>
            </div>
          </Card>

          {/* Card 3 — Renting */}
          <Card className="overflow-hidden bg-white border border-border/60 flex flex-col min-h-[380px] shadow-sm hover:shadow-md transition-shadow">
            <div className="p-10 flex flex-col flex-1">
              <Key className="w-11 h-11 mb-5" style={{ color: GOLD }} />
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: GOLD }}>Currently Renting</p>
              <h2 className="text-2xl font-bold mb-4" style={{ color: NAVY }}>Am I closer to owning than I think?</h2>
              <p className="text-base text-muted-foreground mb-10 flex-1 leading-[1.7]">
                See what your monthly rent buys as a mortgage payment. Compare rent vs own in your Capital District town.
              </p>
              <Button asChild className="w-full font-semibold h-12 text-base text-white" style={{ backgroundColor: NAVY }}>
                <Link to="/rentals">Compare Rent vs Own →</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* GUIDANCE SECTION — light gray */}
      <section className="py-24 px-6 bg-[#F7F7F5]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: NAVY }}>
            Not sure which tool is right for you?
          </h2>
          <div className="text-muted-foreground text-lg leading-relaxed space-y-4 mb-12">
            <p>If you're buying a home to live in — start with <span className="font-semibold" style={{ color: NAVY }}>Analyze a Home</span>.</p>
            <p>If you're buying to rent out or generate income — start with <span className="font-semibold" style={{ color: NAVY }}>Analyze a Deal</span>.</p>
            <p>If you're currently renting and wondering if you could own — start with <span className="font-semibold" style={{ color: NAVY }}>Compare Rent vs Own</span>.</p>
          </div>
          <Button asChild className="h-13 px-10 text-base font-semibold text-white" style={{ backgroundColor: GOLD }}>
            <a href="tel:5186762347" className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Talk to Scott Alvarez → (518) 676-2347
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnalyzeAnyProperty;
