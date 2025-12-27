import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";

const towns = [
  { name: "Delmar", href: "/towns/delmar", description: "Bethlehem Central Schools" },
  { name: "Niskayuna", href: "/towns/niskayuna", description: "Top-Rated Schools" },
  { name: "Voorheesville", href: "/towns/voorheesville", description: "Rural Character" },
  { name: "Clifton Park", href: "/towns/clifton-park", description: "Growing Suburb" },
  { name: "Amsterdam", href: "/towns/amsterdam", description: "Affordable Opportunity" },
  { name: "Albany", href: "/albany-real-estate", description: "Capital City" },
  { name: "Troy", href: "/troy-real-estate", description: "Collar City" },
  { name: "Schenectady", href: "/schenectady-real-estate", description: "Electric City" },
  { name: "Saratoga", href: "/saratoga-real-estate", description: "Springs & Racing" },
];

const TownEntrySection = () => {
  return (
    <section className="px-[5%] py-16 bg-gradient-to-b from-primary/5 to-background border-b border-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
            <MapPin className="w-4 h-4" />
            TOWN INTELLIGENCE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Start with Your Town
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Explore local real estate data, school districts, and market trends for any Capital District town.
          </p>
        </div>

        {/* Town Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
          {towns.map((town) => (
            <Link
              key={town.name}
              to={town.href}
              className="group relative bg-card border border-border rounded-xl p-4 md:p-5 hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {town.name}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {town.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
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
