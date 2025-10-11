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
    <section 
      className="relative py-20 px-4 text-center bg-cover bg-center bg-no-repeat" 
      role="banner"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">
          Capital District Nest
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-6 drop-shadow-md">
          Search every property in Albany County — the local alternative to Zillow for smart buyers & investors.
        </p>

        {/* RE/MAX IDX Search Embed */}
        <div className="flex justify-center mx-auto mb-6 bg-white/95 p-2 rounded-xl shadow-2xl">
          <iframe 
            src="https://scottalvarez.remax.com/wide.php" 
            allowTransparency={true}
            className="w-full max-w-[960px] h-[300px] border-0 rounded-lg overflow-hidden"
            title="Property Search"
          />
        </div>

        {/* Quick intent buttons */}
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {quickIntents.map((intent, index) => (
            <button
              key={index}
              onClick={() => navigate(intent.href)}
              className="px-4 py-2.5 border-2 border-white/80 rounded-full font-semibold text-sm text-white hover:bg-white hover:text-primary transition-colors cursor-pointer backdrop-blur-sm bg-white/10"
            >
              {intent.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
