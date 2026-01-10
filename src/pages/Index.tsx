import { useState, useRef } from "react";
import { ArrowRight, BarChart3, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import GuideLeadModal from "@/components/GuideLeadModal";
import SEOHead from "@/components/SEOHead";
import AppleHero from "@/components/AppleHero";
import AppleTownCards from "@/components/AppleTownCards";
import InstitutionalHeader from "@/components/InstitutionalHeader";
import BusinessSpotlight from "@/components/BusinessSpotlight";
import RentalVault from "@/components/RentalVault";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

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

      {/* Apple-Style Cinematic Hero */}
      <AppleHero onScrollToTowns={scrollToTownSection} />

      {/* Institutional Header - 3-Column Bento */}
      <InstitutionalHeader />

      {/* Town Intelligence Cards */}
      <div ref={townSectionRef} id="town-intelligence" className="scroll-mt-24">
        <AppleTownCards />
      </div>

      {/* Business Spotlight */}
      <BusinessSpotlight />

      {/* Rental Vault */}
      <RentalVault limit={4} />

      {/* ========================================== */}
      {/* SECTION: WHY THIS PLATFORM - Maximum Spacing */}
      {/* ========================================== */}
      <section className="section-massive px-[5%] bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground tracking-tight mb-6">
              Built different. On purpose.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto body-airy font-light">
              No scraped estimates. No AI guesses. Real data, verified locally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Verified data sources",
                description: "Tax records, MLS activity, and market trends — combined for the full picture."
              },
              {
                title: "Local intelligence, not generic feeds",
                description: "Each town analyzed independently with its own market behavior and patterns."
              },
              {
                title: "Signal, not noise",
                description: "Designed to surface what matters — without the clutter of typical real estate sites."
              },
              {
                title: "No ads. No lead selling.",
                description: "Your information stays yours. This is where trust is earned."
              }
            ].map((item) => (
              <div 
                key={item.title}
                className="bento-card p-10 hover-lift"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground body-airy">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: PROPERTY INTELLIGENCE - Bento Card */}
      {/* ========================================== */}
      <section className="px-[5%] section-massive bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="bento-card p-10 md:p-16 lg:p-20 text-center">
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-8">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Property Intelligence</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground tracking-tight mb-8">
              Beyond the listing.<br />
              <span className="text-gradient-premium font-normal">Into the intelligence.</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto body-airy font-light mb-12">
              Our reports combine verified public records, tax data, and real market activity — organized in a way that's easy to understand and act on.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link 
                to="/intel/1999-ridge-road-queensbury-ny"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-semibold hover:scale-105 transition-transform text-lg"
              >
                View Sample Report
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/intelligence"
                className="inline-flex items-center gap-2 glass px-10 py-5 rounded-2xl font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-all text-lg"
              >
                Request a Report
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: INVESTOR - Bento Card */}
      {/* ========================================== */}
      <section className="px-[5%] py-20 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="bento-card p-10 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">For Investors</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                  Cash-Flow, Multi-Unit & Return Analysis
                </h3>
                <p className="text-muted-foreground body-airy text-lg">
                  Advanced tools for serious investors. Cap rates, cash flow projections, and market reports.
                </p>
              </div>
              <Link 
                to="/investor-tools" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-transform flex-shrink-0 text-lg"
              >
                Explore Tools <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: FINAL CTA - Cinematic */}
      {/* ========================================== */}
      <section className="relative px-[5%] section-massive overflow-hidden bg-card">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-foreground tracking-tight mb-8">
            Start with your town.
          </h2>
          <p className="text-2xl text-muted-foreground mb-12 body-airy font-light">
            Go deeper only when you're ready.
          </p>
          <button
            onClick={scrollToTownSection}
            className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-12 py-6 rounded-2xl font-semibold text-xl hover:scale-105 transition-transform"
          >
            Explore Towns
            <ArrowRight className="w-6 h-6" />
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