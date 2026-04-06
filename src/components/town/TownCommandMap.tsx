import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Landmark,
  Shield,
  TreePine,
  BookOpen,
  Coffee,
  MapPin,
  Layers,
  X,
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

// Vivid category accent colors — high-vibrancy per category
const CATEGORY_COLORS: Record<string, string> = {
  Civic: "25, 100%, 50%",
  Education: "210, 80%, 55%",
  Safety: "0, 75%, 55%",
  Recreation: "150, 65%, 42%",
  Commerce: "35, 85%, 50%",
  "Community Hub": "180, 60%, 45%",
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
        setMarkers([]);
      }
      setIsLoading(false);
    };
    fetchLandmarks();
  }, [townSlug]);

  // Premium branded placeholder when no markers exist
  if (!isLoading && markers.length === 0) {
    return (
      <section className="relative w-full bg-background border-t border-border overflow-hidden">
        <div className="relative w-full py-24 md:py-32 px-[5%]">
          {/* Architectural background — blurred monochrome */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
              alt=""
              className="w-full h-full object-cover grayscale opacity-[0.07]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Neighborhood Guide
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight mb-6">
              Know {townName}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
              Our {townName} guide is coming soon — vetted local insights for your next move.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Guide Coming Soon
            </div>
          </div>
        </div>
      </section>
    );
  }

  const uniqueCategories = ["All", ...Array.from(new Set(markers.map((m) => m.category)))];
  const filtered = activeFilter === "All" ? markers : markers.filter((m) => m.category === activeFilter);

  return (
    <section className="relative w-full bg-background border-t border-b border-border">
      {/* Section header */}
      <div className="w-full px-[5%] pt-16 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Neighborhood Guide
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight">
              Know {townName}
            </h2>
            <p className="text-sm text-muted-foreground mt-3">Vetted local insights for your next move.</p>
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

        {/* HTML interactive marker pins */}
        {filtered.map((m) => {
          const isActive = activeMarker === m.id;
          const Icon = ICON_MAP[m.icon] || Landmark;
          const accentHsl = CATEGORY_COLORS[m.category] || "var(--foreground)";
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
              onClick={() => setActiveMarker((prev) => (prev === m.id ? null : m.id))}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ease-out"
                style={{
                  backgroundColor: isActive ? `hsl(${accentHsl})` : 'hsl(var(--foreground) / 0.8)',
                  transform: isActive ? 'scale(1.3)' : 'scale(1)',
                  boxShadow: isActive
                    ? `0 0 24px hsl(${accentHsl} / 0.5), 0 4px 12px hsl(${accentHsl} / 0.3)`
                    : '0 2px 12px hsl(var(--foreground) / 0.15)',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.transform = 'scale(1.15)'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <Icon className="w-4 h-4 text-background" />
              </div>
              <div className="absolute left-1/2 top-[40px] -translate-x-1/2 whitespace-nowrap pointer-events-none">
                <span
                  className="text-[9px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded"
                  style={{
                    color: isActive ? `hsl(${accentHsl})` : 'hsl(var(--foreground) / 0.6)',
                    fontWeight: isActive ? 700 : 600,
                    fontSize: isActive ? 10 : 9,
                  }}
                >
                  {m.label}
                </span>
              </div>
            </div>
          );
        })}

        {/* Large Vivid Intelligence Panel — right-anchored slide */}
        <AnimatePresence>
          {activeMarker && (() => {
            const m = filtered.find((f) => f.id === activeMarker);
            if (!m) return null;
            const Icon = ICON_MAP[m.icon] || Landmark;
            const accentHsl = CATEGORY_COLORS[m.category] || "var(--foreground)";
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="absolute top-4 right-4 bottom-4 z-40 w-[340px] max-w-[90%] pointer-events-auto"
              >
                <div
                  className="h-full rounded-3xl overflow-hidden flex flex-col"
                  style={{
                    background: 'hsl(var(--background) / 0.82)',
                    backdropFilter: 'blur(32px) saturate(1.5)',
                    WebkitBackdropFilter: 'blur(32px) saturate(1.5)',
                    border: '1px solid hsl(var(--foreground) / 0.06)',
                    boxShadow: '0 30px 60px hsl(var(--foreground) / 0.12), 0 8px 24px hsl(var(--foreground) / 0.06)',
                  }}
                >
                  {/* Vivid accent header */}
                  <div
                    className="relative h-28 flex items-end p-6"
                    style={{ background: `linear-gradient(135deg, hsl(${accentHsl}), hsl(${accentHsl} / 0.7))` }}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveMarker(null); }}
                      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 transition-colors"
                    >
                      <X className="w-3.5 h-3.5 text-background" />
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-background/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-5 h-5 text-background" />
                      </div>
                      <div>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-background/70 block">{m.category}</span>
                        <h3 className="text-lg font-bold text-background tracking-tight leading-tight">{m.label}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Content body */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    <h4 className="text-base font-bold text-foreground tracking-tight leading-snug mb-3">{m.headline}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{m.detail}</p>

                    {/* Nest Score vivid bar */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Nest Score</span>
                        <span className="text-sm font-bold text-foreground tabular-nums">
                          {m.nestScore}<span className="text-xs font-medium text-muted-foreground">/10</span>
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${m.nestScore * 10}%` }}
                          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: `hsl(${accentHsl})` }}
                        />
                      </div>
                    </div>

                    <div className="w-full h-px bg-foreground/[0.06] mb-4" />

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-foreground/[0.03] p-3">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground block mb-1">Category</span>
                        <span className="text-xs font-bold text-foreground">{m.category}</span>
                      </div>
                      <div className="rounded-xl bg-foreground/[0.03] p-3">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground block mb-1">Rating</span>
                        <span className="text-xs font-bold" style={{ color: `hsl(${accentHsl})` }}>
                          {m.nestScore >= 8 ? 'Premium' : m.nestScore >= 6 ? 'Strong' : 'Emerging'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-3 border-t border-foreground/[0.05]">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">Nest Intel · {townName}</span>
                      <MapPin className="w-3 h-3 text-muted-foreground/30" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* Map legend */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
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
