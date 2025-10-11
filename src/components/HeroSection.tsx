import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

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
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Capital District Nest
          </h1>
          <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
            Search every property in Albany County — the local alternative to Zillow for smart buyers & investors.
          </p>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-10 px-4" style={{ backgroundColor: '#003DA5' }}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">Search All Properties</h2>
          
          {/* RE/MAX IDX Search Embed */}
          <div className="flex justify-center mx-auto mb-6">
            <iframe 
              style={{ width: '960px', height: '300px' }}
              src="https://scottalvarez.remax.com/wide.php" 
              allowTransparency={true}
              frameBorder="0"
              title="Property Search"
            />
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
