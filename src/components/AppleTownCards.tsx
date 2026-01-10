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
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Saratoga Springs", 
    href: "/towns/saratoga-springs", 
    description: "Racing, culture, upscale living",
    nestScore: 96,
    businessCount: 18,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Delmar", 
    href: "/towns/delmar", 
    description: "Bethlehem Central Schools",
    nestScore: 92,
    businessCount: 8,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Albany", 
    href: "/towns/albany", 
    description: "Capital City, diverse neighborhoods",
    nestScore: 88,
    businessCount: 24,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Niskayuna", 
    href: "/towns/niskayuna", 
    description: "Top-rated schools",
    nestScore: 91,
    businessCount: 6,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Troy", 
    href: "/towns/troy", 
    description: "Historic charm, RPI proximity",
    nestScore: 85,
    businessCount: 15,
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Schenectady", 
    href: "/towns/schenectady", 
    description: "Revitalizing downtown",
    nestScore: 82,
    businessCount: 11,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Guilderland", 
    href: "/towns/guilderland", 
    description: "Top schools, Crossgates area",
    nestScore: 90,
    businessCount: 9,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Queensbury", 
    href: "/towns/queensbury", 
    description: "Lake George gateway",
    nestScore: 87,
    businessCount: 7,
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80"
  },
];

const AppleTownCards = () => {
  return (
    <section className="py-20 md:py-28 px-[5%] bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Regional Hub</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
            Intelligence by Town
          </h2>
          <p className="text-lg text-[#6E6E73] max-w-2xl mx-auto">
            Each market has its own rhythm. We organize real estate intelligence
            the way people actually search — locally.
          </p>
        </div>

        {/* 3-Column Town Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {townHubs.map((town) => (
            <Link
              key={town.name}
              to={town.href}
              className="group relative h-[380px] rounded-3xl overflow-hidden hover-lift"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105 group-hover:blur-[2px]"
                style={{ backgroundImage: `url(${town.image})` }}
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 town-card-overlay" />
              
              {/* Nest Score Badge - Top Right */}
              <div className="absolute top-4 right-4 nest-badge">
                Nest Score: {town.nestScore}
              </div>
              
              {/* Content - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-white/80" />
                  <h3 className="text-2xl font-bold text-white">
                    {town.name}
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-4">{town.description}</p>
                
                {/* Business Pulse Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Store className="w-4 h-4" />
                    <span>{town.businessCount} Business Spotlights</span>
                  </div>
                  
                  {/* View Button - Appears on hover */}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-white font-semibold text-sm">
                    View Town <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link 
            to="/communities" 
            className="inline-flex items-center gap-2 text-[#1D1D1F] font-semibold hover:text-primary transition-colors group"
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
