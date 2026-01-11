import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Store } from "lucide-react";

interface TownCardData {
  name: string;
  slug: string;
  href: string;
  description: string;
  nestScore: number;
  businessCount: number;
  image: string;
}

// Curated featured towns with proper images
const townHubs: TownCardData[] = [
  {
    name: "Clifton Park",
    slug: "clifton-park",
    href: "/clifton-park-intelligence",
    description: "Growing suburb, family-friendly",
    nestScore: 92,
    businessCount: 12,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Saratoga Springs",
    slug: "saratoga-springs",
    href: "/saratoga-homes-for-sale",
    description: "Racing, culture, upscale living",
    nestScore: 94,
    businessCount: 8,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Delmar",
    slug: "delmar",
    href: "/delmar-homes-for-sale",
    description: "Bethlehem Central Schools",
    nestScore: 91,
    businessCount: 6,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Albany",
    slug: "albany",
    href: "/albany-homes-for-sale",
    description: "Capital City, diverse neighborhoods",
    nestScore: 88,
    businessCount: 15,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Niskayuna",
    slug: "niskayuna",
    href: "/niskayuna-homes-for-sale",
    description: "Top-rated schools",
    nestScore: 93,
    businessCount: 4,
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Troy",
    slug: "troy",
    href: "/troy-homes-for-sale",
    description: "Historic charm, RPI proximity",
    nestScore: 87,
    businessCount: 10,
    image: "https://images.unsplash.com/photo-1524333865981-372076044719?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Schenectady",
    slug: "schenectady",
    href: "/schenectady-homes-for-sale",
    description: "Revitalizing downtown",
    nestScore: 85,
    businessCount: 9,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Guilderland",
    slug: "guilderland",
    href: "/towns/guilderland",
    description: "Top schools, Crossgates area",
    nestScore: 90,
    businessCount: 5,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Queensbury",
    slug: "queensbury",
    href: "/queensbury-homes-for-sale",
    description: "Lake George gateway",
    nestScore: 89,
    businessCount: 7,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
  }
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
              key={town.slug}
              to={town.href}
              className="group relative h-[420px] rounded-[2rem] overflow-hidden hover-lift"
            >
              {/* Background Image - Cinematic Filter */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(${town.image})`,
                  filter: 'brightness(0.5) contrast(1.2) saturate(0.7)'
                }}
              />
              
              {/* Monochromatic Overlay */}
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
