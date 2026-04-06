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

const ICON_MAP: Record<string, typeof Landmark> = {
  government: Landmark,
  school: GraduationCap,
  safety: Shield,
  lifestyle: TreePine,
  hub: BookOpen,
  dining: Coffee,
};

const mapDbIcon = (icon: string): "government" | "school" | "safety" | "lifestyle" | "hub" | "dining" => {
  const mapping: Record<string, "government" | "school" | "safety" | "lifestyle" | "hub" | "dining"> = {
    landmark: "government", school: "school", shield: "safety", tree: "lifestyle",
    store: "dining", hub: "hub", government: "government", safety: "safety",
    lifestyle: "lifestyle", dining: "dining",
  };
  return mapping[icon] || "government";
};

// Category accent colors for markers
const CATEGORY_COLORS: Record<string, string> = {
  Civic: "hsl(var(--accent))",
  Education: "hsl(210, 80%, 55%)",
  Safety: "hsl(0, 70%, 55%)",
  Recreation: "hsl(140, 60%, 45%)",
  Commerce: "hsl(35, 80%, 50%)",
  "Community Hub": "hsl(var(--primary))",
};

// Generate procedural road network based on town slug (deterministic per town)
const generateRoads = (slug: string): string[] => {
  let seed = 0;
  for (let i = 0; i < slug.length; i++) seed += slug.charCodeAt(i);
  const rand = (i: number) => ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;

  const roads: string[] = [];
  // Main arteries (always present)
  const mainY1 = 30 + rand(0) * 15;
  const mainY2 = 55 + rand(1) * 15;
  roads.push(`M 0,${mainY1.toFixed(0)} Q 25,${(mainY1 - 3 + rand(2) * 6).toFixed(0)} 50,${mainY1.toFixed(0)} T 100,${(mainY1 + rand(3) * 4).toFixed(0)}`);
  roads.push(`M 0,${mainY2.toFixed(0)} Q 30,${(mainY2 + 2 - rand(4) * 4).toFixed(0)} 55,${mainY2.toFixed(0)} T 100,${(mainY2 - rand(5) * 3).toFixed(0)}`);

  // Vertical arteries
  const mainX1 = 30 + rand(6) * 15;
  const mainX2 = 58 + rand(7) * 15;
  roads.push(`M ${mainX1.toFixed(0)},0 Q ${(mainX1 + rand(8) * 4).toFixed(0)},30 ${mainX1.toFixed(0)},50 T ${(mainX1 - rand(9) * 3).toFixed(0)},100`);
  roads.push(`M ${mainX2.toFixed(0)},0 Q ${(mainX2 - rand(10) * 3).toFixed(0)},25 ${mainX2.toFixed(0)},55 T ${(mainX2 + rand(11) * 4).toFixed(0)},100`);

  // Secondary roads
  for (let i = 0; i < 6; i++) {
    const sx = rand(12 + i * 3) * 80 + 10;
    const sy = rand(13 + i * 3) * 70 + 10;
    const ex = rand(14 + i * 3) * 60 + 20;
    const ey = rand(15 + i * 3) * 60 + 20;
    roads.push(`M ${sx.toFixed(0)},${sy.toFixed(0)} Q ${((sx + ex) / 2 + rand(16 + i) * 10 - 5).toFixed(0)},${((sy + ey) / 2 + rand(17 + i) * 10 - 5).toFixed(0)} ${ex.toFixed(0)},${ey.toFixed(0)}`);
  }

  return roads;
};

const TownCommandMap = ({ townSlug, townName, centerLat, centerLng, zoom }: TownCommandMapProps) => {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [markers, setMarkers] = useState<IntelMarker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate unique road network for this town
  const roads = generateRoads(townSlug);

  // Fetch landmarks from database — no fallback to another town's data
  useEffect(() => {
    setIsLoading(true);
    setActiveMarker(null);
    setActiveFilter("All");

    const fetchLandmarks = async () => {
      const { data } = await supabase
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
        // Empty state — no cross-town contamination
        setMarkers([]);
      }
      setIsLoading(false);
    };
    fetchLandmarks();
  }, [townSlug]);

  const uniqueCategories = ["All", ...Array.from(new Set(markers.map((m) => m.category)))];
  const filtered = activeFilter === "All" ? markers : markers.filter((m) => m.category === activeFilter);

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
          {markers.length > 0 && (
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
          )}
        </div>
      </div>

      {/* Embedded map — no external redirects */}
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden select-none">
        {/* SVG topographic base — unique per town */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`grid-${townSlug}`} width="2" height="2" patternUnits="userSpaceOnUse">
              <path d="M 2 0 L 0 0 0 2" fill="none" stroke="hsl(var(--border))" strokeWidth="0.04" opacity="0.5" />
            </pattern>
            <radialGradient id={`glow-${townSlug}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.06" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background grid */}
          <rect width="100" height="100" fill="url(#grid-${townSlug})" />

          {/* Ambient center glow */}
          <ellipse cx="50" cy="50" rx="35" ry="35" fill={`url(#glow-${townSlug})`} />

          {/* Contour rings — unique per town based on marker positions */}
          {markers.length > 0 && (() => {
            const cx = markers.reduce((s, m) => s + m.x, 0) / markers.length;
            const cy = markers.reduce((s, m) => s + m.y, 0) / markers.length;
            return (
              <>
                <ellipse cx={cx} cy={cy} rx="40" ry="38" fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" opacity="0.3" />
                <ellipse cx={cx} cy={cy} rx="28" ry="26" fill="none" stroke="hsl(var(--border))" strokeWidth="0.12" opacity="0.25" />
                <ellipse cx={cx} cy={cy} rx="16" ry="14" fill="none" stroke="hsl(var(--border))" strokeWidth="0.1" opacity="0.2" />
              </>
            );
          })()}

          {/* Road network — procedurally generated per town */}
          {roads.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth={i < 4 ? "0.22" : "0.12"}
              opacity={i < 4 ? "0.5" : "0.25"}
              strokeLinecap="round"
              strokeDasharray={i >= 4 ? "0.6 0.6" : undefined}
            />
          ))}

          {/* Marker SVG elements — pulsing dots */}
          {filtered.map((m) => {
            const isActive = activeMarker === m.id;
            const color = CATEGORY_COLORS[m.category] || "hsl(var(--accent))";
            return (
              <g key={m.id}>
                {/* Pulse ring */}
                <circle cx={m.x} cy={m.y} r="2" fill="none" stroke={color} strokeWidth="0.25" opacity="0.4">
                  <animate attributeName="r" from="1.5" to="5" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="3s" repeatCount="indefinite" />
                </circle>
                {/* Core marker */}
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={isActive ? "2.2" : "1.6"}
                  fill={isActive ? color : "hsl(var(--foreground))"}
                  opacity={isActive ? 1 : 0.7}
                  style={{ filter: isActive ? `drop-shadow(0 0 4px ${color})` : "none", transition: "all 0.3s ease" }}
                />
              </g>
            );
          })}
        </svg>

        {/* HTML interactive marker overlays */}
        {filtered.map((m) => {
          const isActive = activeMarker === m.id;
          const Icon = ICON_MAP[m.icon] || Landmark;
          return (
            <div
              key={m.id}
              className="absolute cursor-pointer z-10"
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
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "bg-accent shadow-[0_0_24px_hsl(var(--accent)/0.5)] scale-[1.3]"
                  : "bg-foreground/90 shadow-[0_0_10px_hsl(var(--foreground)/0.2)] hover:scale-110"
              }`}>
                <Icon className={`w-4 h-4 ${isActive ? "text-accent-foreground" : "text-background"}`} />
              </div>

              {/* Label + intel card */}
              <div
                className="absolute whitespace-nowrap pointer-events-none"
                style={{ left: "50%", top: "42px", transform: "translateX(-50%)" }}
              >
                <span
                  className="text-center block px-2 py-0.5 rounded-md"
                  style={{
                    fontSize: isActive ? 12 : 10,
                    fontWeight: isActive ? 700 : 600,
                    color: "hsl(var(--foreground))",
                    backgroundColor: isActive ? "hsl(var(--background))" : "hsl(var(--background) / 0.85)",
                    boxShadow: "0 2px 8px hsl(var(--foreground) / 0.08)",
                  }}
                >
                  {m.label}
                </span>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 bg-background border border-border rounded-xl p-4 shadow-xl min-w-[260px] text-left pointer-events-auto"
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

        {/* Empty state for towns without landmarks */}
        {!isLoading && markers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-background/90 backdrop-blur-sm border border-border rounded-2xl px-8 py-6 text-center max-w-sm">
              <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-semibold text-foreground mb-1">Intel Markers Coming Soon</p>
              <p className="text-xs text-muted-foreground">Our team is mapping {townName}'s key infrastructure and lifestyle anchors.</p>
            </div>
          </div>
        )}

        {/* Map legend */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
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
