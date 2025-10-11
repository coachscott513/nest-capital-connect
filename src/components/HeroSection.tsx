import { useNavigate } from "react-router-dom";

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
    <section className="py-16 px-4 text-center bg-muted/30" role="banner">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-[42px] font-bold mb-2 text-foreground">
          Capital District Nest
        </h1>
        <p className="text-lg text-muted-foreground mb-5">
          Search every property in Albany County — the local alternative to Zillow for smart buyers & investors.
        </p>

        {/* RE/MAX IDX Search Embed */}
        <div className="flex justify-center mx-auto mb-5">
          <iframe 
            src="https://scottalvarez.remax.com/wide.php" 
            allowTransparency={true}
            className="w-full max-w-[960px] h-[300px] border-0 rounded-xl overflow-hidden"
            title="Property Search"
          />
        </div>

        {/* Quick intent buttons */}
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {quickIntents.map((intent, index) => (
            <button
              key={index}
              onClick={() => navigate(intent.href)}
              className="px-3.5 py-2.5 border border-border rounded-full font-semibold text-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer bg-background"
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
