import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";
import PropertySearchDialog from "@/components/PropertySearchDialog";
import { Button } from "@/components/ui/button";
const HeroSection = () => {
  const navigate = useNavigate();

  const quickIntents = [
    { text: "Investment", href: "/albany-investment-properties" },
    { text: "Multi-Unit", href: "/albany-multi-unit" },
    { text: "Land", href: "/albany-land" },
    { text: "First-Time Buyers", href: "/first-time-buyer-programs-albany" },
    { text: "Sell Investment", href: "/sell-investment-property" },
    { text: "Cash-Flow Report", href: "/cash-flow-report" }
  ];

  return (
    <>
      {/* Hero Image Section */}
      <section 
        className="relative py-24 px-4 text-center bg-cover bg-center bg-no-repeat" 
        role="banner"
        style={{ backgroundImage: `url(${heroBackground})` }}
        aria-label="Capital District Nest - Albany Real Estate Search"
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Stop Guessing. Start Cash Flowing.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
            Albany, Troy, Schenectady & Saratoga Springs Real Estate — Your Local Alternative to Zillow
          </p>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-10 px-4" style={{ backgroundColor: '#003DA5' }}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">Search All Properties</h2>
          
          {/* Mobile: CTA Buttons */}
          <div className="md:hidden w-full max-w-[960px] mx-auto mb-6 flex flex-col gap-3">
            <Button size="lg" className="w-full" onClick={() => navigate('/albany-investment-properties')}>
              Get the Top 10 Investment List
            </Button>
            <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10" onClick={() => navigate('/cash-flow-report')}>
              View Sample Deal
            </Button>
          </div>

          {/* Desktop: CTA Buttons */}
          <div className="hidden md:flex w-full max-w-[960px] mx-auto mb-6 gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/albany-investment-properties')}>
              Get the Top 10 Investment List
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate('/cash-flow-report')}>
              View Sample Deal
            </Button>
          </div>

          {/* Quick intent buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {quickIntents.map((intent, index) => (
              <button
                key={index}
                onClick={() => navigate(intent.href)}
                className="px-4 py-2.5 border border-border rounded-full font-semibold text-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer bg-background"
              >
                {intent.text}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
