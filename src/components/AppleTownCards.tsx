import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Store } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TownCardData {
  name: string;
  slug: string;
  href: string;
  description: string;
  nestScore: number;
  businessCount: number;
  image: string;
}

// Fallback descriptions for towns
const townDescriptions: Record<string, string> = {
  "clifton-park": "Growing suburb, family-friendly",
  "saratoga-springs": "Racing, culture, upscale living",
  "delmar": "Bethlehem Central Schools",
  "albany": "Capital City, diverse neighborhoods",
  "niskayuna": "Top-rated schools",
  "troy": "Historic charm, RPI proximity",
  "schenectady": "Revitalizing downtown",
  "guilderland": "Top schools, Crossgates area",
  "queensbury": "Lake George gateway",
};

// Fallback image for towns without hero_landmark
const defaultImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";

const AppleTownCards = () => {
  const [townHubs, setTownHubs] = useState<TownCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTownData = async () => {
      // Fetch town market data and local_voices counts
      const [marketRes, voicesRes] = await Promise.all([
        supabase
          .from('town_market_data')
          .select('town_slug, town_name, hero_landmark, nest_score')
          .eq('is_active', true)
          .order('nest_score', { ascending: false })
          .limit(9),
        supabase
          .from('local_voices')
          .select('town_slug')
      ]);

      if (marketRes.data) {
        // Count businesses per town
        const businessCounts: Record<string, number> = {};
        voicesRes.data?.forEach(v => {
          businessCounts[v.town_slug] = (businessCounts[v.town_slug] || 0) + 1;
        });

        const cards: TownCardData[] = marketRes.data.map(town => ({
          name: town.town_name,
          slug: town.town_slug,
          href: `/towns/${town.town_slug}`,
          description: townDescriptions[town.town_slug] || "Capital District community",
          nestScore: town.nest_score || 85,
          businessCount: businessCounts[town.town_slug] || 0,
          image: town.hero_landmark || defaultImage
        }));

        setTownHubs(cards);
      }
      setIsLoading(false);
    };

    fetchTownData();
  }, []);

  if (isLoading) {
    return (
      <section className="section-massive px-[5%] bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Regional Hub</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground tracking-tight mb-6">
              Intelligence by Town
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[420px] rounded-[2rem] bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
