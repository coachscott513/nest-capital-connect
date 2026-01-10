import { useState, useRef } from "react";
import { ArrowRight, BarChart3, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import GuideLeadModal from "@/components/GuideLeadModal";
import SEOHead from "@/components/SEOHead";
import AppleHero from "@/components/AppleHero";
import AppleTownCards from "@/components/AppleTownCards";
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

      {/* Town Intelligence Cards */}
      <div ref={townSectionRef} id="town-intelligence" className="scroll-mt-24">
        <AppleTownCards />
      </div>

      {/* ========================================== */}
      {/* SECTION 2: WHY THIS PLATFORM EXISTS - Apple Style */}
      {/* ========================================== */}
      <section className="relative py-24 px-[5%] overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/90">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Built different. On purpose.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No scraped estimates. No AI guesses. Real data, verified locally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            ].map((item, index) => (
              <div 
                key={item.title}
                className="glass-card rounded-2xl p-6 md:p-8 hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 3: PROPERTY INTELLIGENCE - Apple Card Style */}
      {/* ========================================== */}
      <section className="px-[5%] py-24">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 lg:p-16 text-center glow-subtle">
            <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-2 mb-6">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Property Intelligence</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Beyond the listing.<br />
              <span className="text-gradient-premium">Into the intelligence.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              Our reports combine verified public records, tax data, and real market activity —<br className="hidden md:block" />
              organized in a way that's easy to understand and act on.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/intel/1999-ridge-road-queensbury-ny"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                View Sample Report
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/dealdesk"
                className="inline-flex items-center gap-2 glass-strong px-8 py-4 rounded-xl font-semibold text-foreground hover:bg-white/10 transition-colors"
              >
                Request a Report
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 4: INVESTOR SECTION - Apple Style */}
      {/* ========================================== */}
      <section className="px-[5%] py-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-10 hover-lift">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">For Investors</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Cash-Flow, Multi-Unit & Return Analysis
                </h3>
                <p className="text-muted-foreground">
                  Advanced tools for serious investors. Cap rates, cash flow projections, and market reports.
                </p>
              </div>
              <Link 
                to="/investor-tools" 
                className="inline-flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary px-6 py-3 rounded-xl font-semibold transition-colors flex-shrink-0"
              >
                Explore Tools <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 5: FINAL CTA - Cinematic */}
      {/* ========================================== */}
      <section className="relative px-[5%] py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px]" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Start with your town.
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Go deeper only when you're ready.
          </p>
          <button
            onClick={scrollToTownSection}
            className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform glow-subtle"
          >
            Explore Towns
            <ArrowRight className="w-5 h-5" />
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