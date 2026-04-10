import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, BarChart3, Key } from "lucide-react";

const AnalyzeAnyProperty = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Analyze Any Property | AnalyzeAnyProperty.com"
        description="Whether you're buying your first home, investing in a rental, or comparing rent vs owning — get the numbers you need to decide with confidence."
        canonical="https://www.capitaldistrictnest.com/analyze-any-property"
      />
      <CleanHeader />

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 bg-[hsl(var(--primary))]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Analyze any property. Any situation. In minutes.
          </h1>
          <p className="text-lg text-white/70">
            Whether you're buying your first home, investing in a rental, or comparing rent vs owning — get the numbers you need to decide with confidence.
          </p>
        </div>
      </section>

      {/* THREE PATH CARDS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 — Buying a Home */}
          <Card className="overflow-hidden bg-white border-t-4 border-t-[hsl(var(--accent))] flex flex-col">
            <div className="p-8 flex flex-col flex-1">
              <Home className="w-10 h-10 text-[hsl(var(--accent))] mb-4" />
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--accent))] mb-2">First-Time Buyer</p>
              <h2 className="text-xl font-bold text-[hsl(var(--primary))] mb-3">What will this home really cost me?</h2>
              <p className="text-sm text-muted-foreground mb-8 flex-1">
                Monthly payment, cash to close, affordability check, and first-time buyer programs. No investor jargon.
              </p>
              <Button asChild className="w-full bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-white font-semibold">
                <Link to="/analyze-home">Analyze a Home →</Link>
              </Button>
            </div>
          </Card>

          {/* Card 2 — Investing */}
          <Card className="overflow-hidden bg-[hsl(var(--primary))] border-2 border-[hsl(var(--accent))]/30 flex flex-col">
            <div className="p-8 flex flex-col flex-1">
              <BarChart3 className="w-10 h-10 text-[hsl(var(--accent))] mb-4" />
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--accent))] mb-2">Real Estate Investor</p>
              <h2 className="text-xl font-bold text-white mb-3">Does this deal cash flow?</h2>
              <p className="text-sm text-white/60 mb-8 flex-1">
                Cap rate, cash flow, DSCR, and deal score for any multi-family or investment property. 7 loan types.
              </p>
              <Button asChild className="w-full bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-white font-semibold">
                <Link to="/analyze">Analyze a Deal →</Link>
              </Button>
            </div>
          </Card>

          {/* Card 3 — Renting */}
          <Card className="overflow-hidden bg-secondary border-t-4 border-t-[hsl(var(--primary))] flex flex-col">
            <div className="p-8 flex flex-col flex-1">
              <Key className="w-10 h-10 text-[hsl(var(--primary))] mb-4" />
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--primary))] mb-2">Currently Renting</p>
              <h2 className="text-xl font-bold text-[hsl(var(--primary))] mb-3">Am I closer to owning than I think?</h2>
              <p className="text-sm text-muted-foreground mb-8 flex-1">
                See what your monthly rent buys as a mortgage payment. Compare rent vs own in your Capital District town.
              </p>
              <Button asChild variant="outline" className="w-full border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10 font-semibold">
                <Link to="/rentals">Compare Rent vs Own →</Link>
              </Button>
            </div>
          </Card>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-12">
          Powered by Capital District Nest · Built by Scott Alvarez · RE/MAX Solutions · Albany, NY
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default AnalyzeAnyProperty;
