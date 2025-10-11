import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    // Google site search
    const url = `https://www.google.com/search?q=${encodeURIComponent(`site:capitaldistrictnest.com ${q}`)}`;
    window.location.href = url;
  };

  const quickIntents = [
    { text: "Investment", href: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=3&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=grid&leadid=948", external: true },
    { text: "Multi-Unit", href: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=3&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=grid&leadid=948", external: true },
    { text: "Land", href: "/albany-land" },
    { text: "First-Time Buyer", href: "/first-time-buyers" },
    { text: "Sell Investment", href: "/#contact" },
    { text: "Weekly Cash-Flow Report", href: "/markets" }
  ];

  return (
    <section className="py-14 px-4 text-center bg-background" role="banner">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Capital District Nest
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-5">
          The local alternative to Zillow for smart buyers & investors in Albany County.
        </p>

        {/* Universal Search */}
        <form onSubmit={handleSearch} className="flex gap-2 justify-center mx-auto mb-3.5 max-w-3xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search address, neighborhood, or topic (e.g., 'Albany duplex', 'first-time grants')"
            aria-label="Search"
            className="flex-1 px-4 py-3.5 text-base border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" className="px-4 py-3.5 rounded-xl font-semibold">
            Search
          </Button>
        </form>

        {/* Quick intent buttons */}
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {quickIntents.map((intent, index) => (
            intent.external ? (
              <a
                key={index}
                href={intent.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 border border-border rounded-full no-underline font-semibold text-sm hover:bg-accent transition-colors"
              >
                {intent.text}
              </a>
            ) : (
              <button
                key={index}
                onClick={() => navigate(intent.href)}
                className="px-3.5 py-2.5 border border-border rounded-full font-semibold text-sm hover:bg-accent transition-colors cursor-pointer bg-background"
              >
                {intent.text}
              </button>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
