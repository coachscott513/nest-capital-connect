import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Store } from "lucide-react";

interface TownCardData {
  name: string;
  href: string;
  description: string;
  nestScore: number;
  businessCount: number;
  image: string;
}

const townHubs: TownCardData[] = [
  { 
    name: "Clifton Park", 
    href: "/towns/clifton-park", 
    description: "Growing suburb, family-friendly",
    nestScore: 94,
    businessCount: 12,
    // Clifton Park Common / Nature boardwalk aesthetic
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Saratoga Springs", 
    href: "/towns/saratoga-springs", 
    description: "Racing, culture, upscale living",
    nestScore: 96,
    businessCount: 18,
    // Congress Park / Historic fountain aesthetic
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Delmar", 
    href: "/towns/delmar", 
    description: "Bethlehem Central Schools",
    nestScore: 92,
    businessCount: 8,
    // Classic New England town center / tree-lined street
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Albany", 
    href: "/towns/albany", 
    description: "Capital City, diverse neighborhoods",
    nestScore: 88,
    businessCount: 24,
    // Empire State Plaza / Government architecture
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Niskayuna", 
    href: "/towns/niskayuna", 
    description: "Top-rated schools",
    nestScore: 91,
    businessCount: 6,
    // Suburban neighborhood / classic homes
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Troy", 
    href: "/towns/troy", 
    description: "Historic charm, RPI proximity",
    nestScore: 85,
    businessCount: 15,
    // Historic brownstone / downtown architecture
    image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Schenectady", 
    href: "/towns/schenectady", 
    description: "Revitalizing downtown",
    nestScore: 82,
    businessCount: 11,
    // Downtown revitalization / urban renewal
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Guilderland", 
    href: "/towns/guilderland", 
    description: "Top schools, Crossgates area",
    nestScore: 90,
    businessCount: 9,
    // Upscale suburban development
    image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Queensbury", 
    href: "/towns/queensbury", 
    description: "Lake George gateway",
    nestScore: 87,
    businessCount: 7,
    // Mountain / Lake region aesthetic
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80"
  },
];

const AppleTownCards = () => {
  return (
    <section className="section-massive px-[5%] bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Maximum Breathing Room */}
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Regional Hub</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground tracking-tight mb-6">
            Intelligence by Town
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto body-airy font-light">
            Each market has its own rhythm. We organize real estate intelligence the way people actually search — locally.
          </p>
        </div>

        {/* Bento Grid - 32px Radius Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {townHubs.map((town) => (
            <Link
              key={town.name}
              to={town.href}
              className="group relative h-[420px] rounded-[2rem] overflow-hidden hover-lift"
            >
              {/* Background Image - Cinematic Filter with Heavy Mask */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(${town.image})`,
                  filter: 'brightness(0.5) contrast(1.2) saturate(0.7)'
                }}
              />
              
              {/* Monochromatic Overlay - Heavy dark mask until landmarks imported */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/50" />
              
              {/* Teal Glow Nest Score Badge */}
              <div className="absolute top-5 right-5 nest-badge">
                Nest Score: {town.nestScore}
              </div>
              
              {/* Content - Bottom Aligned */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h3 className="text-2xl font-semibold text-white tracking-tight">
                    {town.name}
                  </h3>
                </div>
                <p className="text-white/70 text-base mb-5 body-airy">{town.description}</p>
                
                {/* Business Pulse */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <Store className="w-4 h-4" />
                    <span>{town.businessCount} Business Spotlights</span>
                  </div>
                  
                  {/* Hover Reveal Arrow */}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-1 text-primary font-semibold text-sm">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-16">
          <Link 
            to="/communities" 
            className="inline-flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors group text-lg"
          >
            View all Capital District towns 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AppleTownCards;
