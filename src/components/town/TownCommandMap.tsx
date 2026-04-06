import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Landmark,
  Shield,
  TreePine,
  BookOpen,
  Coffee,
  MapPin,
  Layers,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface IntelMarker {
  id: string;
  label: string;
  category: string;
  icon: "government" | "school" | "safety" | "lifestyle" | "hub" | "dining";
  x: number;
  y: number;
  nestScore: number;
  headline: string;
  detail: string;
}

interface TownCommandMapProps {
  townSlug: string;
  townName: string;
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
}

const ICON_MAP = {
  government: Landmark,
  school: GraduationCap,
  safety: Shield,
  lifestyle: TreePine,
  hub: BookOpen,
  dining: Coffee,
  landmark: Landmark,
  store: Coffee,
  tree: TreePine,
  shield: Shield,
};

// Map DB icon names to component icon keys
const mapDbIcon = (icon: string): "government" | "school" | "safety" | "lifestyle" | "hub" | "dining" => {
  const mapping: Record<string, "government" | "school" | "safety" | "lifestyle" | "hub" | "dining"> = {
    landmark: "government",
    school: "school",
    shield: "safety",
    tree: "lifestyle",
    store: "dining",
    hub: "hub",
    government: "government",
    safety: "safety",
    lifestyle: "lifestyle",
    dining: "dining",
  };
  return mapping[icon] || "government";
};

// Fallback hardcoded data for towns without DB entries
const DELMAR_INTEL: IntelMarker[] = [
  { id: "town-hall", label: "Bethlehem Town Hall", category: "Civic", icon: "government", x: 48, y: 42, nestScore: 8.5, headline: "Permit & Zoning HQ", detail: "Next community zoning meeting: Wed, April 22, 7PM. Direct access to Building Department." },
  { id: "bc-high", label: "Bethlehem Central High", category: "Education", icon: "school", x: 35, y: 62, nestScore: 9.8, headline: "#1 School District in Albany Area", detail: "A-Rated by Niche · 98% graduation rate · Top 1% college readiness in NY." },
  { id: "fire-district", label: "Delmar Fire District", category: "Safety", icon: "safety", x: 62, y: 55, nestScore: 9.0, headline: "Primary Safety Hub for 12054", detail: "Station 1 & 2 coverage. Volunteer department with full-time response capabilities." },
  { id: "rail-trail", label: "Helderberg-Hudson Rail Trail", category: "Recreation", icon: "lifestyle", x: 20, y: 48, nestScore: 8.8, headline: "9.8-Mile Paved Recreational Artery", detail: "ADA-accessible. Connects directly to Albany and Voorheesville. Year-round access." },
  { id: "library", label: "Bethlehem Public Library", category: "Community Hub", icon: "hub", x: 55, y: 32, nestScore: 8.5, headline: "Community Hub with Daily Events", detail: "Rated 4.6★ · Local art exhibitions, kids programs & 2026 event calendar." },
];

const FALLBACK_INTEL: Record<string, IntelMarker[]> = {
  delmar: DELMAR_INTEL,
};

const ROAD_PATHS = [
  "M 5,35 Q 25,32 50,35 T 95,37",
  "M 5,55 Q 25,53 50,55 T 95,53",
  "M 35,5 Q 33,25 35,50 T 37,95",
  "M 60,5 Q 58,25 60,50 T 62,95",
  "M 15,20 Q 30,30 45,40",
  "M 70,25 Q 60,40 55,55",
  "M 25,65 Q 40,72 55,70",
  "M 65,60 Q 75,70 85,75",
  "M 40,15 Q 50,25 55,35",
  "M 30,45 Q 40,50 50,48",
];

const TownCommandMap = ({ townSlug, townName, centerLat, centerLng, zoom }: TownCommandMapProps) => {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [markers, setMarkers] = useState<IntelMarker[]>(FALLBACK_INTEL[townSlug] || DELMAR_INTEL);

  // Default coordinates per town for fallback
  const DEFAULT_COORDS: Record<string, { lat: number; lng: number }> = {
    delmar: { lat: 42.6193, lng: -73.8329 },
    troy: { lat: 42.7284, lng: -73.6918 },
    "saratoga-springs": { lat: 43.0831, lng: -73.7846 },
    latham: { lat: 42.7470, lng: -73.7550 },
    schenectady: { lat: 42.8142, lng: -73.9396 },
    amsterdam: { lat: 42.9387, lng: -74.1882 },
  };

  const mapLat = centerLat ?? DEFAULT_COORDS[townSlug]?.lat ?? 42.6526;
  const mapLng = centerLng ?? DEFAULT_COORDS[townSlug]?.lng ?? -73.7562;
  const mapZoom = zoom ?? 15;

  // Fetch landmarks from database, fall back to hardcoded
  useEffect(() => {
    const fetchLandmarks = async () => {
      const { data, error } = await supabase
        .from('town_landmarks')
        .select('*')
        .eq('town_slug', townSlug)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (data && data.length > 0) {
        setMarkers(data.map((l) => ({
          id: l.id,
          label: l.label,
          category: l.category,
          icon: mapDbIcon(l.icon),
          x: Number(l.x),
          y: Number(l.y),
          nestScore: l.nest_score,
          headline: l.headline || l.label,
          detail: l.detail || '',
        })));
      } else {
        setMarkers(FALLBACK_INTEL[townSlug] || DELMAR_INTEL);
      }
    };
    fetchLandmarks();
  }, [townSlug]);

  const uniqueCategories = ["All", ...Array.from(new Set(markers.map((m) => m.category)))];
  const filtered = activeFilter === "All" ? markers : markers.filter((m) => m.category === activeFilter);
  const activeData = markers.find((m) => m.id === activeMarker);
  const ActiveIcon = activeData ? ICON_MAP[activeData.icon] : null;

  // Google Maps embed URL with monochrome styling
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${mapLat},${mapLng}&zoom=${mapZoom}&maptype=roadmap`;

  return (
    <section className="relative w-full bg-background border-t border-b border-border">
      {/* Section header */}
      <div className="w-full px-[5%] pt-12 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-2">
              Spatial Intelligence
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              {townName}: Spatial Intelligence & Market Context
            </h2>
          </div>
          {/* Category toggles */}
          <div className="flex flex-wrap gap-2">
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeFilter === cat
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hyper-local Google Map with marker overlay */}
      <div className="relative w-full h-[70vh] min-h-[500px]">
        {/* Google Maps Embed — monochrome, hyper-local */}
        <iframe
          className="absolute inset-0 w-full h-full grayscale contrast-[1.1] brightness-[1.05]"
          src={mapUrl}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${townName} Spatial Intelligence Map`}
        />

        {/* Dark overlay for premium feel */}
        <div className="absolute inset-0 bg-background/20 pointer-events-none" />

        {/* HTML marker overlays */}
        {filtered.map((m) => {
          const isActive = activeMarker === m.id;
          const Icon = ICON_MAP[m.icon];
          return (
            <div
              key={m.id}
              className="absolute cursor-pointer group z-10"
              style={{
                left: `${m.x}%`,
                top: `${m.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isActive ? 30 : 10,
              }}
              onMouseEnter={() => setActiveMarker(m.id)}
              onMouseLeave={() => setActiveMarker(null)}
              onClick={() => setActiveMarker((prev) => (prev === m.id ? null : m.id))}
            >
              {/* Glowing pin */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive 
                  ? "bg-accent shadow-[0_0_20px_hsl(var(--accent)/0.6)] scale-125" 
                  : "bg-foreground/90 shadow-[0_0_12px_hsl(var(--foreground)/0.3)] hover:scale-110"
              }`}>
                <Icon className={`w-4 h-4 ${isActive ? "text-accent-foreground" : "text-background"}`} />
              </div>

              {/* Label */}
              <div
                className="absolute whitespace-nowrap pointer-events-none transition-all duration-300"
                style={{ left: "50%", top: "44px", transform: "translateX(-50%)" }}
              >
                <span
                  className="text-center block px-2 py-0.5 rounded-md transition-all duration-300"
                  style={{
                    fontSize: isActive ? 12 : 10,
                    fontWeight: isActive ? 700 : 600,
                    color: "hsl(var(--foreground))",
                    backgroundColor: isActive ? "hsl(var(--background))" : "hsl(var(--background) / 0.8)",
                    boxShadow: "0 2px 8px hsl(var(--foreground) / 0.1)",
                  }}
                >
                  {m.label}
                </span>

                {/* Hover intel card */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 bg-background border border-border rounded-xl p-4 shadow-lg min-w-[260px] text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {m.category}
                      </span>
                      <span className="ml-auto text-xs font-bold text-accent">
                        {m.nestScore}/10
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground leading-snug mb-1">{m.headline}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{m.detail}</p>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}

        {/* Map legend */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <Layers className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
            {townName} · Nest Intel
          </span>
        </div>
      </div>
    </section>
  );
};

export default TownCommandMap;
