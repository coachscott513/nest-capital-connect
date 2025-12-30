import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, FileText, BarChart3, MapPin, Shield, TrendingUp } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";

const Intelligence = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Real Estate Intelligence, Explained | Capital District Nest"
        description="We don't show more listings. We show clearer context. Learn what goes into a Capital District Nest Property Intelligence Report and how it helps you make smarter decisions."
        keywords="property intelligence, real estate data, capital district, home buying, market analysis"
        canonical="https://capitaldistrictnest.com/intelligence"
      />

      {/* Navigation Header */}
      <header className="sticky top-0 z-[2000] flex items-center justify-between px-5 md:px-10 h-20 bg-background/90 backdrop-blur-md border-b border-border">
        <Link to="/" className="font-extrabold text-lg md:text-xl tracking-tight uppercase">
          Capital District <span className="text-primary">Nest</span>
        </Link>
        <Link 
          to="/" 
          className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Hero */}
      <section className="px-[5%] py-20 md:py-28 text-center border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
            Real Estate Intelligence,<br />
            <span className="text-primary">Explained</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            We don't show more listings.<br />
            We show clearer context.
          </p>
        </div>
      </section>

      {/* What Goes Into an Intelligence Report */}
      <section className="px-[5%] py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
            What Goes Into an Intelligence Report
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Every property intelligence report combines verified data sources to give you context you can't find on listing sites.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Property Facts */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Property Facts (Verified)</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Lot size, structure details, utilities, zoning — pulled directly from public records, not MLS descriptions.
              </p>
            </div>

            {/* Tax & Assessment History */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Tax & Assessment History</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                County, town, and school taxes broken down. Exemption status. Assessment ratios and potential tax changes.
              </p>
            </div>

            {/* Market Comps */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Market Comps (CMA Logic)</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Comparable sales in the area, adjusted for size, condition, and recency — the same logic brokers use to price homes.
              </p>
            </div>

            {/* Local Pricing Behavior */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Local Pricing Behavior</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Median prices, days on market, and sale-to-list ratios for this neighborhood — not county-wide averages.
              </p>
            </div>

            {/* Time-on-Market Patterns */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Time-on-Market Patterns</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                How long similar homes take to sell. What that tells you about buyer demand and negotiation leverage.
              </p>
            </div>

            {/* Risk & Upside Indicators */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Risk & Upside Indicators</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Flags for zoning issues, utility unknowns, or assessment gaps. Also: redevelopment potential and value-add opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Reports Are Prepared */}
      <section className="px-[5%] py-16 bg-muted/30 border-y border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            How Reports Are Prepared
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            This is a sample Property Intelligence Report.<br />
            Full reports are generated on request to ensure accuracy and relevance.
          </p>
          <p className="text-muted-foreground text-sm mb-8">
            Reports are prepared individually and delivered digitally.
          </p>
          <Link 
            to="/intel/1999-ridge-road-queensbury-ny" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View Sample Report <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[5%] py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to see clearer context?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Request an Intelligence Report for any address you're considering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/dealdesk" 
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
            >
              Request Property Intel <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-full font-bold hover:bg-card transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Explore Towns
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Intelligence;