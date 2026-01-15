import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin, TrendingUp, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface TownData {
  name: string;
  slug: string;
  href: string;
  description: string;
  appreciation: string;
  image: string;
  medianPrice?: number;
}

// Static fallback towns
const staticTowns: TownData[] = [
  {
    name: "Clifton Park",
    slug: "clifton-park",
    href: "/clifton-park-intelligence",
    description: "Growing suburb, top-rated schools",
    appreciation: "+4.2%",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "Saratoga Springs",
    slug: "saratoga-springs",
    href: "/saratoga-homes-for-sale",
    description: "Racing culture, upscale living",
    appreciation: "+5.8%",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "Delmar",
    slug: "delmar",
    href: "/towns/delmar",
    description: "Bethlehem Central Schools",
    appreciation: "+3.1%",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "Albany",
    slug: "albany",
    href: "/towns/albany",
    description: "Capital City, diverse neighborhoods",
    appreciation: "+2.4%",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "Niskayuna",
    slug: "niskayuna",
    href: "/niskayuna-homes-for-sale",
    description: "Top-rated schools, family-focused",
    appreciation: "+4.7%",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "Troy",
    slug: "troy",
    href: "/troy-homes-for-sale",
    description: "Historic charm, RPI proximity",
    appreciation: "+3.9%",
    image: "https://images.unsplash.com/photo-1524333865981-372076044719?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "Schenectady",
    slug: "schenectady",
    href: "/schenectady-homes-for-sale",
    description: "Revitalizing downtown core",
    appreciation: "+2.8%",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "Guilderland",
    slug: "guilderland",
    href: "/towns/guilderland",
    description: "Top schools, Crossgates area",
    appreciation: "+3.6%",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "Queensbury",
    slug: "queensbury",
    href: "/queensbury-homes-for-sale",
    description: "Lake George gateway",
    appreciation: "+4.1%",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80"
  }
];

const TownTheater = () => {
  const [towns, setTowns] = useState<TownData[]>(staticTowns);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [indexOpen, setIndexOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch town market data from Supabase
  useEffect(() => {
    const fetchTownData = async () => {
      const { data } = await supabase
        .from("town_market_data")
        .select("town_name, town_slug, median_price, avg_days_on_market")
        .eq("is_active", true);

      if (data && data.length > 0) {
        // Merge Supabase data with static towns
        const enrichedTowns = staticTowns.map(town => {
          const dbTown = data.find(d => d.town_slug === town.slug);
          return dbTown ? { ...town, medianPrice: dbTown.median_price || undefined } : town;
        });
        setTowns(enrichedTowns);
      }
    };
    fetchTownData();
  }, []);

  const currentTown = towns[currentIndex];

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? towns.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === towns.length - 1 ? 0 : prev + 1));
  };

  // Touch/swipe handling for mobile
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  // Filter towns for index overlay
  const filteredTowns = towns.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-[5%] bg-card overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Town Intelligence</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
          Explore by Market
        </h2>
      </div>

      {/* Town Theater Card - Full Width Cinematic */}
      <div 
        ref={carouselRef}
        className="relative max-w-5xl mx-auto"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Card */}
        <Link 
          to={currentTown.href}
          className="block relative h-[420px] md:h-[500px] rounded-3xl overflow-hidden group"
          style={{ borderRadius: '24px' }}
        >
          {/* Background Image with 40px blur depth effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ 
              backgroundImage: `url(${currentTown.image})`,
              filter: 'brightness(0.5) contrast(1.15)'
            }}
          />
          
          {/* Liquid Glass Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
              backdropFilter: 'blur(2px)',
            }}
          />
          
          {/* Power Stat Badge - Top Right */}
          <div 
            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(0, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
            }}
          >
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {currentTown.appreciation} YTD
            </span>
          </div>

          {/* Content - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                {currentTown.name}
              </h3>
            </div>
            <p className="text-white/70 text-lg mb-4">{currentTown.description}</p>
            
            {currentTown.medianPrice && (
              <p className="text-white/50 text-sm">
                Median: ${currentTown.medianPrice.toLocaleString()}
              </p>
            )}
          </div>
        </Link>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {towns.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? "w-8 bg-primary" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Town Index Button */}
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setIndexOpen(true)}
            className="glass border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <Search className="w-4 h-4 mr-2" />
            Town Index
          </Button>
        </div>
      </div>

      {/* Town Index Overlay */}
      {indexOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div 
            className="w-full max-w-md rounded-3xl p-6"
            style={{
              background: 'rgba(30, 30, 35, 0.95)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">All Towns</h3>
              <button 
                onClick={() => setIndexOpen(false)}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search towns..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-muted-foreground/60"
              />
            </div>

            {/* Town List - Alphabetical */}
            <div className="max-h-[50vh] overflow-y-auto space-y-2">
              {filteredTowns
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((town, idx) => (
                  <Link
                    key={town.slug}
                    to={town.href}
                    onClick={() => {
                      setCurrentIndex(towns.findIndex(t => t.slug === town.slug));
                      setIndexOpen(false);
                    }}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">{town.name}</span>
                    </div>
                    <span className="text-sm text-primary font-semibold">{town.appreciation}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TownTheater;
