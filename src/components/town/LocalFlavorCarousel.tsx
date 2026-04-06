import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, MapPin } from "lucide-react";

interface LocalBusiness {
  id: string;
  name: string;
  category: string;
  image: string;
  distance: string;
  verified: boolean;
}

interface LocalFlavorCarouselProps {
  townName: string;
  townSlug: string;
}

// Town-specific "Nest Verified" local businesses
const TOWN_FLAVOR: Record<string, LocalBusiness[]> = {
  delmar: [
    { id: "1", name: "The Perfect Blend", category: "Coffee & Café", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80", distance: "0.2 mi", verified: true },
    { id: "2", name: "O'Slattery's Irish Pub", category: "Restaurant & Bar", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80", distance: "0.3 mi", verified: true },
    { id: "3", name: "Indian Ladder Farms", category: "Farm & Cidery", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80", distance: "4.2 mi", verified: true },
    { id: "4", name: "Delmar CrossFit", category: "Fitness", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80", distance: "0.5 mi", verified: false },
  ],
  troy: [
    { id: "1", name: "Lucas Confectionery", category: "Wine Bar", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80", distance: "Downtown", verified: true },
    { id: "2", name: "Dinosaur Bar-B-Que", category: "BBQ Restaurant", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80", distance: "0.4 mi", verified: true },
    { id: "3", name: "Troy Waterfront Farmers Market", category: "Market", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=80", distance: "0.2 mi", verified: true },
    { id: "4", name: "Bard & Baker", category: "Board Game Café", image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80", distance: "0.3 mi", verified: true },
  ],
};

const DEFAULT_FLAVOR: LocalBusiness[] = [
  { id: "1", name: "Local Coffee House", category: "Coffee & Café", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80", distance: "Nearby", verified: false },
  { id: "2", name: "Main Street Bistro", category: "Restaurant", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80", distance: "Nearby", verified: false },
  { id: "3", name: "Town Fitness", category: "Gym & Wellness", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80", distance: "Nearby", verified: false },
  { id: "4", name: "Community Park", category: "Recreation", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", distance: "Nearby", verified: false },
];

const LocalFlavorCarousel = ({ townName, townSlug }: LocalFlavorCarouselProps) => {
  const businesses = TOWN_FLAVOR[townSlug] || DEFAULT_FLAVOR;
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4; // show all on desktop, scroll on mobile

  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < businesses.length;

  return (
    <div className="bento-card p-6 hover-lift h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Local Flavor</p>
          <h3 className="text-lg font-bold text-foreground">The {townName} Scene</h3>
        </div>
        {businesses.length > visibleCount && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setStartIndex(Math.max(0, startIndex - 1))}
              disabled={!canPrev}
              className="w-8 h-8 rounded-full glass flex items-center justify-center disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setStartIndex(startIndex + 1)}
              disabled={!canNext}
              className="w-8 h-8 rounded-full glass flex items-center justify-center disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {businesses.slice(startIndex, startIndex + visibleCount).map((biz) => (
          <div key={biz.id} className="group relative rounded-xl overflow-hidden aspect-[4/3]">
            <img
              src={biz.image}
              alt={biz.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Verified badge */}
            {biz.verified && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full">
                Verified
              </div>
            )}

            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-sm font-semibold text-white leading-tight">{biz.name}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-[10px] text-white/70">{biz.category}</p>
                <div className="flex items-center gap-1 text-[10px] text-white/60">
                  <MapPin className="w-3 h-3" />
                  {biz.distance}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalFlavorCarousel;
