import { Link } from "react-router-dom";
import { ArrowRight, MapPin, TrendingUp, Home, Building2 } from "lucide-react";

interface TownCardData {
  name: string;
  href: string;
  description: string;
  stats?: {
    avgPrice?: string;
    listings?: string;
    daysOnMarket?: string;
  };
  image?: string;
  featured?: boolean;
}

const townHubs: TownCardData[] = [
  { 
    name: "Clifton Park", 
    href: "/towns/clifton-park", 
    description: "Growing suburb, family-friendly",
    stats: { avgPrice: "$425K", listings: "85+", daysOnMarket: "18" },
    featured: true
  },
  { 
    name: "Saratoga Springs", 
    href: "/towns/saratoga-springs", 
    description: "Racing, culture, upscale living",
    stats: { avgPrice: "$550K", listings: "120+", daysOnMarket: "22" },
    featured: true
  },
  { 
    name: "Delmar", 
    href: "/towns/delmar", 
    description: "Bethlehem Central Schools",
    stats: { avgPrice: "$385K", listings: "45+", daysOnMarket: "16" }
  },
  { 
    name: "Albany", 
    href: "/towns/albany", 
    description: "Capital City, diverse neighborhoods",
    stats: { avgPrice: "$225K", listings: "150+", daysOnMarket: "25" }
  },
  { 
    name: "Niskayuna", 
    href: "/towns/niskayuna", 
    description: "Top-rated schools",
    stats: { avgPrice: "$350K", listings: "55+", daysOnMarket: "20" }
  },
  { 
    name: "Troy", 
    href: "/towns/troy", 
    description: "Historic charm, RPI proximity",
    stats: { avgPrice: "$195K", listings: "90+", daysOnMarket: "28" }
  },
  { 
    name: "Schenectady", 
    href: "/towns/schenectady", 
    description: "Revitalizing downtown",
    stats: { avgPrice: "$185K", listings: "100+", daysOnMarket: "24" }
  },
  { 
    name: "Guilderland", 
    href: "/towns/guilderland", 
    description: "Top schools, Crossgates area",
    stats: { avgPrice: "$380K", listings: "60+", daysOnMarket: "19" }
  },
  { 
    name: "Queensbury", 
    href: "/towns/queensbury", 
    description: "Lake George gateway",
    stats: { avgPrice: "$320K", listings: "70+", daysOnMarket: "21" }
  },
  { 
    name: "Mechanicville", 
    href: "/towns/mechanicville", 
    description: "Affordable, Saratoga access",
    stats: { avgPrice: "$175K", listings: "25+", daysOnMarket: "30" }
  },
  { 
    name: "Voorheesville", 
    href: "/towns/voorheesville", 
    description: "Rural character, top schools",
    stats: { avgPrice: "$340K", listings: "20+", daysOnMarket: "23" }
  },
  { 
    name: "Amsterdam", 
    href: "/towns/amsterdam", 
    description: "Affordable opportunity",
    stats: { avgPrice: "$145K", listings: "40+", daysOnMarket: "35" }
  },
];

const AppleTownCards = () => {
  return (
    <section className="px-[5%] py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Intelligence by Town
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each market has its own rhythm. We organize real estate intelligence<br className="hidden md:block" />
            the way people actually search — locally.
          </p>
        </div>

        {/* Featured Towns (Large Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {townHubs.filter(t => t.featured).map((town) => (
            <Link
              key={town.name}
              to={town.href}
              className="group relative glass-card rounded-3xl p-8 md:p-10 hover-lift overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {town.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{town.description}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                {town.stats && (
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/30">
                    <div>
                      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                        <Home className="w-3.5 h-3.5" />
                        <span className="text-xs">Avg Price</span>
                      </div>
                      <div className="text-lg font-semibold text-foreground">{town.stats.avgPrice}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="text-xs">Active</span>
                      </div>
                      <div className="text-lg font-semibold text-foreground">{town.stats.listings}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span className="text-xs">Days</span>
                      </div>
                      <div className="text-lg font-semibold text-foreground">{town.stats.daysOnMarket}</div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View Town Intelligence <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Regular Towns (Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {townHubs.filter(t => !t.featured).map((town) => (
            <Link
              key={town.name}
              to={town.href}
              className="group glass-card rounded-2xl p-5 hover-lift"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                  {town.name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
                {town.description}
              </p>
              {town.stats && (
                <div className="text-sm font-semibold text-foreground/80">
                  {town.stats.avgPrice}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link 
            to="/communities" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors group"
          >
            View all Capital District towns 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AppleTownCards;
