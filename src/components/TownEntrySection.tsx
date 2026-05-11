import { Link } from "react-router-dom";
import { MapPin, ChevronRight, BarChart3 } from "lucide-react";

const towns = [
  { name: "Delmar", href: "/living-in/delmar", description: "Bethlehem Central Schools" },
  { name: "Clifton Park", href: "/living-in/clifton-park", description: "Shenendehowa Schools" },
  { name: "Niskayuna", href: "/living-in/niskayuna", description: "Top-Rated Schools" },
  { name: "Voorheesville", href: "/living-in/voorheesville", description: "Rural Character" },
  { name: "Troy", href: "/living-in/troy", description: "Collar City" },
  { name: "Albany", href: "/living-in/albany", description: "Capital City" },
  { name: "Schenectady", href: "/living-in/schenectady", description: "Electric City" },
  { name: "Saratoga", href: "/living-in/saratoga-springs", description: "Springs & Racing" },
  { name: "Amsterdam", href: "/living-in/amsterdam", description: "Affordable Opportunity" },
  { name: "Queensbury", href: "/living-in/queensbury", description: "Lake George Area" },
];

const TownEntrySection = () => {
  return (
    <section className="px-[5%] py-16 bg-gradient-to-b from-primary/5 to-background border-b border-border relative z-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
            <BarChart3 className="w-4 h-4" />
            MARKET INTELLIGENCE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Explore Local Market Intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Live data, school insights, and market trends for each Capital District town — updated weekly.
          </p>
        </div>
        {/* Town Grid - add right padding on lg to avoid overlap with fixed Command Center */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 relative z-10 lg:pr-24">
          {towns.map((town) => (
            <Link
              key={town.name}
              to={town.href}
              className="group relative z-30 block cursor-pointer bg-card border border-border rounded-xl p-4 md:p-5 hover:border-primary hover:shadow-lg transition-all text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              style={{ isolation: 'isolate' }}
            >
              <div className="flex flex-col items-center pointer-events-none">
                <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {town.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {town.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link 
            to="/communities" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-sm"
          >
            View All Capital District Towns
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TownEntrySection;
