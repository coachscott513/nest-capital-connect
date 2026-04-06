/// <reference types="@types/google.maps" />
import { useState, useEffect, useRef, useCallback } from "react";
import { GraduationCap, Coffee, TreePine, Star } from "lucide-react";

interface NestMarker {
  id: string;
  label: string;
  lat: number;
  lng: number;
  icon: "school" | "lifestyle" | "nature" | "destination";
  nestScore: number;
  stat: string;
  detail: string;
}

interface TownSpatialMapProps {
  townSlug: string;
  townName: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  markers?: NestMarker[];
}

// Default Delmar markers — other towns override via props
const DELMAR_MARKERS: NestMarker[] = [
  {
    id: "four-corners",
    label: "The Four Corners",
    lat: 42.6219,
    lng: -73.8328,
    icon: "lifestyle",
    nestScore: 9.2,
    stat: "Historic walkability meets modern dining",
    detail: "Cultural heart of Delmar — restaurants, shops & community",
  },
  {
    id: "bc-high",
    label: "Bethlehem Central High",
    lat: 42.6087,
    lng: -73.8385,
    icon: "school",
    nestScore: 9.8,
    stat: "Top 1% college readiness in NY",
    detail: "98% graduation rate · Bethlehem Central School District",
  },
  {
    id: "rail-trail",
    label: "Helderberg-Hudson Rail Trail",
    lat: 42.6140,
    lng: -73.8480,
    icon: "nature",
    nestScore: 8.8,
    stat: "9+ miles of premium recreational access",
    detail: "Paved trail connecting suburbs to the broader Capital District",
  },
];

const TOWN_MARKERS: Record<string, NestMarker[]> = {
  delmar: DELMAR_MARKERS,
  troy: [
    { id: "monument-sq", label: "Monument Square", lat: 42.7284, lng: -73.6918, icon: "lifestyle", nestScore: 8.5, stat: "Historic downtown revitalization hub", detail: "Farmers market, dining & nightlife corridor" },
    { id: "troy-high", label: "Troy High School", lat: 42.7350, lng: -73.6810, icon: "school", nestScore: 7.5, stat: "Expanding STEM curriculum", detail: "Troy City School District" },
    { id: "riverfront", label: "Hudson Riverfront Park", lat: 42.7310, lng: -73.6880, icon: "nature", nestScore: 8.2, stat: "Direct waterfront access", detail: "3+ miles of scenic river trails" },
  ],
  "saratoga-springs": [
    { id: "broadway", label: "Broadway District", lat: 42.7663, lng: -73.7857, icon: "lifestyle", nestScore: 9.5, stat: "Premier upstate shopping & dining", detail: "National-caliber restaurant scene" },
    { id: "saratoga-high", label: "Saratoga Springs High", lat: 42.7750, lng: -73.7920, icon: "school", nestScore: 9.6, stat: "Top 3% in New York State", detail: "Blue Streaks · 96% graduation rate" },
    { id: "spa-park", label: "Saratoga Spa State Park", lat: 42.7520, lng: -73.7810, icon: "nature", nestScore: 9.3, stat: "2,379-acre mineral springs preserve", detail: "SPAC, pools, golf & year-round recreation" },
  ],
  albany: [
    { id: "lark-st", label: "Lark Street District", lat: 42.6570, lng: -73.7630, icon: "lifestyle", nestScore: 8.0, stat: "Capital Region's arts & culture corridor", detail: "Independent shops, galleries & restaurants" },
    { id: "albany-high", label: "Albany High School", lat: 42.6640, lng: -73.7860, icon: "school", nestScore: 6.8, stat: "Diverse magnet programs available", detail: "Albany City School District" },
    { id: "washington-park", label: "Washington Park", lat: 42.6555, lng: -73.7700, icon: "nature", nestScore: 8.5, stat: "81-acre Frederick Law Olmsted park", detail: "Tulip Festival, lake & historic architecture" },
  ],
  schenectady: [
    { id: "proctors", label: "Proctors Theatre District", lat: 42.8142, lng: -73.9396, icon: "lifestyle", nestScore: 8.3, stat: "Broadway-caliber entertainment venue", detail: "Downtown revitalization anchor" },
    { id: "sch-high", label: "Niskayuna High School", lat: 42.7920, lng: -73.8570, icon: "school", nestScore: 9.2, stat: "Top 5% STEM programs in NY", detail: "Niskayuna Central School District" },
    { id: "central-park", label: "Central Park", lat: 42.8100, lng: -73.9350, icon: "nature", nestScore: 7.8, stat: "Urban green space in the Electric City", detail: "Playground, pool & community events" },
  ],
};

const TOWN_CENTERS: Record<string, { lat: number; lng: number }> = {
  delmar: { lat: 42.6185, lng: -73.8370 },
  troy: { lat: 42.7284, lng: -73.6918 },
  "saratoga-springs": { lat: 42.7663, lng: -73.7857 },
  albany: { lat: 42.6526, lng: -73.7562 },
  schenectady: { lat: 42.8142, lng: -73.9396 },
};

const ICON_MAP = {
  school: GraduationCap,
  lifestyle: Coffee,
  nature: TreePine,
  destination: Star,
};

const ICON_COLORS = {
  school: "text-blue-400",
  lifestyle: "text-amber-400",
  nature: "text-emerald-400",
  destination: "text-purple-400",
};

const TownSpatialMap = ({
  townSlug,
  townName,
  lat,
  lng,
  zoom = 14,
  markers: propMarkers,
}: TownSpatialMapProps) => {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const resolvedMarkers = propMarkers || TOWN_MARKERS[townSlug] || DELMAR_MARKERS;
  const center = TOWN_CENTERS[townSlug] || { lat: lat || 42.6185, lng: lng || -73.837 };

  const initMap = useCallback(async () => {
    if (!containerRef.current || !(window as any).google) return;

    const { Map } = await (window as any).google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await (window as any).google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const map = new Map(containerRef.current, {
      center,
      zoom,
      mapId: "nest-spatial-map",
      disableDefaultUI: true,
      gestureHandling: "cooperative",
      styles: [
        { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#8892a4" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d1b2a" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2a4a" }] },
        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1a1a2e" }] },
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        { featureType: "transit", stylers: [{ visibility: "off" }] },
        { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#2a2a4a" }] },
      ],
    });

    mapRef.current = map;

    // Add custom markers
    resolvedMarkers.forEach((m) => {
      const markerEl = document.createElement("div");
      markerEl.className = "nest-map-marker";
      markerEl.innerHTML = `
        <div style="
          width: 36px; height: 36px;
          background: rgba(139, 92, 246, 0.9);
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${m.icon === "school" ? '<path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-4 0v4"/>' : m.icon === "nature" ? '<path d="M17 14h2a2 2 0 0 1 2 2v6H3v-6a2 2 0 0 1 2-2h2"/><path d="M12 2 7 7h10Z"/><path d="m12 7-5 5h10Z"/><path d="m12 12-5 5h10Z"/>' : m.icon === "lifestyle" ? '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>' : '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'}
          </svg>
        </div>
      `;

      markerEl.addEventListener("mouseenter", () => {
        markerEl.querySelector("div")!.style.transform = "scale(1.3)";
        markerEl.querySelector("div")!.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.7)";
        setActiveMarker(m.id);
      });
      markerEl.addEventListener("mouseleave", () => {
        markerEl.querySelector("div")!.style.transform = "scale(1)";
        markerEl.querySelector("div")!.style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.4)";
      });
      markerEl.addEventListener("click", () => {
        setActiveMarker((prev) => (prev === m.id ? null : m.id));
      });

      const advMarker = new AdvancedMarkerElement({
        position: { lat: m.lat, lng: m.lng },
        map,
        content: markerEl,
        title: m.label,
      });

      markersRef.current.push(advMarker);
    });

    setMapReady(true);
  }, [townSlug]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    // Check if already loaded
    if (window.google?.maps) {
      initMap();
      return;
    }

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => initMap());
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      markersRef.current = [];
    };
  }, [initMap]);

  const activeData = resolvedMarkers.find((m) => m.id === activeMarker);
  const ActiveIcon = activeData ? ICON_MAP[activeData.icon] : null;

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-border/30">
      {/* Map container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: "saturate(0.7) contrast(1.05)" }}
      />

      {/* Scroll-to-zoom unlock overlay */}
      {!scrollEnabled && mapReady && (
        <button
          onClick={() => {
            setScrollEnabled(true);
            mapRef.current?.setOptions({ gestureHandling: "greedy" });
          }}
          className="absolute top-3 right-3 z-20 glass rounded-full px-3 py-1.5 text-xs font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          🔓 Enable scroll zoom
        </button>
      )}

      {/* Glassmorphism popup */}
      {activeData && ActiveIcon && (
        <div className="absolute bottom-4 left-4 right-4 z-20 glass-strong rounded-2xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <ActiveIcon className={`w-5 h-5 ${ICON_COLORS[activeData.icon]}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground text-sm">{activeData.label}</h4>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {activeData.nestScore}/10
                </span>
              </div>
              <p className="text-sm font-medium text-foreground/90 mb-0.5">{activeData.stat}</p>
              <p className="text-xs text-muted-foreground">{activeData.detail}</p>
            </div>
          </div>
        </div>
      )}

      {/* Legend pills */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5">
        {resolvedMarkers.map((m) => {
          const Icon = ICON_MAP[m.icon];
          return (
            <button
              key={m.id}
              onClick={() => {
                setActiveMarker(m.id);
                mapRef.current?.panTo({ lat: m.lat, lng: m.lng });
              }}
              className={`glass rounded-full px-2.5 py-1 text-[10px] font-semibold flex items-center gap-1 transition-all ${
                activeMarker === m.id
                  ? "bg-primary/30 text-primary border border-primary/40"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <Icon className="w-3 h-3" />
              {m.label.split(" ").slice(0, 2).join(" ")}
            </button>
          );
        })}
      </div>

      {/* Loading state */}
      {!mapReady && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-30">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-muted-foreground">Loading {townName} intelligence map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TownSpatialMap;
