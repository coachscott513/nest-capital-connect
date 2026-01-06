import { useState, useRef } from "react";
import { MapPin, ArrowRight, FileText, BarChart3, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import GuideLeadModal from "@/components/GuideLeadModal";
import SEOHead from "@/components/SEOHead";
import CleanHero from "@/components/CleanHero";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

const townHubs = [
  { name: "Albany", href: "/towns/albany", description: "Capital City, diverse neighborhoods" },
  { name: "Amsterdam", href: "/towns/amsterdam", description: "Affordable opportunity" },
  { name: "Clifton Park", href: "/towns/clifton-park", description: "Growing suburb, family-friendly" },
  { name: "Delmar", href: "/towns/delmar", description: "Bethlehem Central Schools" },
  { name: "Guilderland", href: "/towns/guilderland", description: "Top schools, Crossgates area" },
  { name: "Mechanicville", href: "/towns/mechanicville", description: "Affordable, Saratoga access" },
  { name: "Niskayuna", href: "/towns/niskayuna", description: "Top-rated schools" },
  { name: "Queensbury", href: "/towns/queensbury", description: "Lake George gateway" },
  { name: "Saratoga Springs", href: "/towns/saratoga-springs", description: "Racing, culture, upscale living" },
  { name: "Schenectady", href: "/towns/schenectady", description: "Revitalizing downtown" },
  { name: "Troy", href: "/towns/troy", description: "Historic charm, RPI proximity" },
  { name: "Voorheesville", href: "/towns/voorheesville", description: "Rural character, top schools" },
];

const Index = () => {
  const [guideModal, setGuideModal] = useState<{ open: boolean; guideType: string; redirectPath: string }>({ open: false, guideType: "", redirectPath: "" });
  
  const townSectionRef = useRef<HTMLDivElement>(null);

  const scrollToTownSection = () => {
    townSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Capital District Nest | Modern Real Estate Intelligence"
        description="Clear data. Local context. Town-by-town real estate intelligence for Albany, Troy, Schenectady, Saratoga, and the Capital District."
        keywords="Capital District real estate, Albany homes, Troy real estate, Schenectady homes, property intelligence, market data"
        canonical="https://capitaldistrictnest.com"
        ogImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        ogType="website"
      />

      {/* Clean Header Navigation */}
      <CleanHeader />

      {/* HERO */}
      <CleanHero onScrollToTowns={scrollToTownSection} />

      {/* ========================================== */}
      {/* SECTION 1: TOWN INTELLIGENCE (CORE PRODUCT) */}
      {/* ========================================== */}
      <section ref={townSectionRef} id="town-intelligence" className="scroll-mt-24 px-[5%] py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Town Intelligence, Not Just Listings
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each town has its own market behavior, pricing patterns, and buyer dynamics.<br />
              We organize real estate intelligence the way people actually think — locally.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {townHubs.map((town) => (
              <Link
                key={town.name}
                to={town.href}
                className="group bg-card border border-border rounded-xl p-5 md:p-6 hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {town.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {town.description}
                </p>
                <div className="mt-3 text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Explore Town Intelligence <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              to="/communities" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              View all Capital District towns <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 2: WHY THIS PLATFORM EXISTS */}
      {/* ========================================== */}
      <section className="bg-muted/30 py-16 px-[5%] border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Why Capital District Nest Exists
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Built from verified data sources</h3>
                <p className="text-muted-foreground text-sm">Not scraped estimates or AI guesses.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Combines tax data, MLS activity, and market trends</h3>
                <p className="text-muted-foreground text-sm">The full picture, not just listing details.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Designed to reduce noise and surface insight</h3>
                <p className="text-muted-foreground text-sm">What matters, without the clutter.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">No ads. No lead selling. No gimmicks.</h3>
                <p className="text-muted-foreground text-sm">This is where trust is earned.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 3: PROPERTY INTELLIGENCE EXPLAINED */}
      {/* ========================================== */}
      <section className="px-[5%] py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Property Intelligence, Explained
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Capital District Nest provides clear, local intelligence for buyers, sellers, and homeowners.<br />
              Our reports combine verified public records, tax data, and real market activity — organized in a way that's easy to understand.
            </p>
          </div>
          
          <div className="text-center">
            <Link 
              to="/intel/1999-ridge-road-queensbury-ny" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              See how a Property Intelligence Report works <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 4: INVESTOR INTELLIGENCE (OPTIONAL) */}
      {/* ========================================== */}
      <section className="px-[5%] py-12 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Investor Intelligence (Optional)</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              For Deeper Cash-Flow, Multi-Unit, and Return Analysis
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Advanced analysis tools for multi-unit and long-term investors. Cash flow, cap rates, and market reports.
            </p>
            <Link 
              to="/investor-tools" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-semibold text-sm transition-colors"
            >
              Explore Investor Intelligence <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 4: PROOF (Understated) */}
      {/* ========================================== */}
      <section className="px-[5%] py-12 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-muted-foreground">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">500+</div>
              <div className="text-sm">Properties Analyzed</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">Local</div>
              <div className="text-sm">Capital District Focus</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Serving the Capital District with precision.
          </p>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 5: FINAL CTA (Soft) */}
      {/* ========================================== */}
      <section className="px-[5%] py-20 text-center bg-muted/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Start with your town.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Go deeper only if you want.
          </p>
          <button
            onClick={scrollToTownSection}
            className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
          >
            <MapPin className="w-4 h-4" />
            Explore Towns
          </button>
        </div>
      </section>

      {/* Guide Lead Modal */}
      <GuideLeadModal
        open={guideModal.open}
        onOpenChange={(open) => setGuideModal({ ...guideModal, open })}
        guideType={guideModal.guideType}
        redirectPath={guideModal.redirectPath}
      />

      {/* Footer with RE/MAX branding */}
      <Footer />
    </div>
  );
};

export default Index;