import { useState } from "react";
import { GraduationCap, Coffee, TreePine, Star, MapPin } from "lucide-react";

interface NestMarker {
  id: string;
  label: string;
  x: number; // percentage position 0-100
  y: number;
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

const DELMAR_MARKERS: NestMarker[] = [
  {
    id: "four-corners",
    label: "The Four Corners",
    x: 52,
    y: 35,
    icon: "lifestyle",
    nestScore: 9.2,
    stat: "Historic walkability meets modern dining",
    detail: "Cultural heart of Delmar — restaurants, shops & community",
  },
  {
    id: "bc-high",
    label: "Bethlehem Central High",
    x: 35,
    y: 62,
    icon: "school",
    nestScore: 9.8,
    stat: "Top 1% college readiness in NY",
    detail: "98% graduation rate · Bethlehem Central School District",
  },
  {
    id: "rail-trail",
    label: "Helderberg-Hudson Rail Trail",
    x: 22,
    y: 48,
    icon: "nature",
    nestScore: 8.8,
    stat: "9+ miles of premium recreational access",
    detail: "Paved trail connecting suburbs to the broader Capital District",
  },
];

const TROY_MARKERS: NestMarker[] = [
  { id: "monument-sq", label: "Monument Square", x: 55, y: 38, icon: "lifestyle", nestScore: 8.5, stat: "Historic downtown revitalization hub", detail: "Farmers market, dining & nightlife corridor" },
  { id: "troy-high", label: "Troy High School", x: 40, y: 58, icon: "school", nestScore: 7.5, stat: "Expanding STEM curriculum", detail: "Troy City School District" },
  { id: "riverfront", label: "Hudson Riverfront Park", x: 68, y: 45, icon: "nature", nestScore: 8.2, stat: "Direct waterfront access", detail: "3+ miles of scenic river trails" },
];

const SARATOGA_MARKERS: NestMarker[] = [
  { id: "broadway", label: "Broadway District", x: 50, y: 40, icon: "lifestyle", nestScore: 9.5, stat: "Premier upstate shopping & dining", detail: "National-caliber restaurant scene" },
  { id: "saratoga-high", label: "Saratoga Springs High", x: 35, y: 60, icon: "school", nestScore: 9.6, stat: "Top 3% in New York State", detail: "Blue Streaks · 96% graduation rate" },
  { id: "spa-park", label: "Spa State Park", x: 60, y: 55, icon: "nature", nestScore: 9.3, stat: "2,379-acre mineral springs preserve", detail: "SPAC, pools, golf & year-round recreation" },
];

const ALBANY_MARKERS: NestMarker[] = [
  { id: "lark-st", label: "Lark Street District", x: 50, y: 35, icon: "lifestyle", nestScore: 8.0, stat: "Capital Region's arts & culture corridor", detail: "Independent shops, galleries & restaurants" },
  { id: "albany-high", label: "Albany High School", x: 32, y: 55, icon: "school", nestScore: 6.8, stat: "Diverse magnet programs available", detail: "Albany City School District" },
  { id: "washington-park", label: "Washington Park", x: 55, y: 50, icon: "nature", nestScore: 8.5, stat: "81-acre Frederick Law Olmsted park", detail: "Tulip Festival, lake & historic architecture" },
];

const SCHENECTADY_MARKERS: NestMarker[] = [
  { id: "proctors", label: "Proctors Theatre", x: 50, y: 38, icon: "lifestyle", nestScore: 8.3, stat: "Broadway-caliber entertainment", detail: "Downtown revitalization anchor" },
  { id: "sch-high", label: "Niskayuna High School", x: 70, y: 55, icon: "school", nestScore: 9.2, stat: "Top 5% STEM programs in NY", detail: "Niskayuna Central School District" },
  { id: "central-park", label: "Central Park", x: 45, y: 52, icon: "nature", nestScore: 7.8, stat: "Urban green space", detail: "Playground, pool & community events" },
];

const TOWN_MARKERS: Record<string, NestMarker[]> = {
  delmar: DELMAR_MARKERS,
  troy: TROY_MARKERS,
  "saratoga-springs": SARATOGA_MARKERS,
  albany: ALBANY_MARKERS,
  schenectady: SCHENECTADY_MARKERS,
};

const ICON_MAP = {
  school: GraduationCap,
  lifestyle: Coffee,
  nature: TreePine,
  destination: Star,
};

const ICON_COLORS: Record<string, string> = {
  school: "text-blue-400",
  lifestyle: "text-amber-400",
  nature: "text-emerald-400",
  destination: "text-purple-400",
};

const PULSE_COLORS: Record<string, string> = {
  school: "rgba(96, 165, 250, 0.4)",
  lifestyle: "rgba(251, 191, 36, 0.4)",
  nature: "rgba(52, 211, 153, 0.4)",
  destination: "rgba(168, 85, 247, 0.4)",
};

// SVG road network segments for the abstract town map
const ROAD_PATHS = [
  // Main horizontal arteries
  "M 10,35 Q 30,33 50,35 T 90,37",
  "M 5,55 Q 25,53 50,55 T 95,53",
  // Main vertical arteries
  "M 35,10 Q 33,30 35,50 T 37,90",
  "M 60,8 Q 58,28 60,50 T 62,92",
  // Diagonal connectors
  "M 15,20 Q 30,30 45,40",
  "M 70,25 Q 60,40 55,55",
  "M 25,65 Q 40,72 55,70",
  "M 65,60 Q 75,70 85,75",
  // Minor roads
  "M 20,42 L 40,42",
  "M 55,45 L 75,43",
  "M 42,25 L 42,45",
  "M 50,60 L 50,80",
];

const TownSpatialMap = ({
  townSlug,
  townName,
  markers: propMarkers,
}: TownSpatialMapProps) => {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const resolvedMarkers = propMarkers || TOWN_MARKERS[townSlug] || DELMAR_MARKERS;
  const activeData = resolvedMarkers.find((m) => m.id === activeMarker);
  const ActiveIcon = activeData ? ICON_MAP[activeData.icon] : null;

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-border/30 bg-[#0d1117]">
      {/* Abstract SVG Town Map */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.1" />
          </pattern>
          <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="road-glow">
            <feGaussianBlur stdDeviation="0.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="100" height="100" fill="url(#grid)" />
        <rect width="100" height="100" fill="url(#center-glow)" />

        {/* Block fills — simulating neighborhoods */}
        <rect x="25" y="28" width="20" height="15" rx="1" fill="rgba(139, 92, 246, 0.04)" />
        <rect x="48" y="42" width="18" height="16" rx="1" fill="rgba(139, 92, 246, 0.03)" />
        <rect x="15" y="50" width="15" height="12" rx="1" fill="rgba(52, 211, 153, 0.03)" />

        {/* Road network */}
        {ROAD_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={i < 4 ? "0.6" : "0.3"}
            strokeLinecap="round"
            filter={i < 4 ? "url(#road-glow)" : undefined}
          />
        ))}

        {/* Marker positions — interactive circles */}
        {resolvedMarkers.map((m) => {
          const isActive = activeMarker === m.id;
          const pulseColor = PULSE_COLORS[m.icon];
          return (
            <g key={m.id}>
              {/* Pulse ring */}
              <circle
                cx={m.x}
                cy={m.y}
                r={isActive ? 5 : 3.5}
                fill="none"
                stroke={pulseColor}
                strokeWidth="0.4"
                opacity={isActive ? 0.8 : 0.4}
              >
                <animate
                  attributeName="r"
                  from={isActive ? "4" : "3"}
                  to={isActive ? "8" : "5"}
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from={isActive ? "0.8" : "0.4"}
                  to="0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Core marker */}
              <circle
                cx={m.x}
                cy={m.y}
                r={isActive ? 2.5 : 2}
                fill={isActive ? "rgba(139, 92, 246, 0.9)" : "rgba(139, 92, 246, 0.6)"}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.3"
                className="cursor-pointer transition-all duration-300"
                style={{ filter: isActive ? "drop-shadow(0 0 4px rgba(139, 92, 246, 0.7))" : "drop-shadow(0 0 2px rgba(139, 92, 246, 0.3))" }}
              />
              {/* Label */}
              <text
                x={m.x}
                y={m.y - 4}
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="2"
                fontWeight="600"
                letterSpacing="0.05"
                className="pointer-events-none select-none"
              >
                {m.label.split(" ").slice(0, 2).join(" ")}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Invisible click targets (HTML overlay for better hit areas) */}
      {resolvedMarkers.map((m) => (
        <button
          key={m.id}
          onClick={() => setActiveMarker((prev) => (prev === m.id ? null : m.id))}
          onMouseEnter={() => setActiveMarker(m.id)}
          className="absolute w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
          aria-label={`View intel for ${m.label}`}
        />
      ))}

      {/* Legend pills */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5">
        {resolvedMarkers.map((m) => {
          const Icon = ICON_MAP[m.icon];
          return (
            <button
              key={m.id}
              onClick={() => setActiveMarker(m.id)}
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

      {/* Town label */}
      <div className="absolute bottom-4 right-4 z-10 text-[10px] text-muted-foreground/40 font-mono uppercase tracking-widest">
        <MapPin className="w-3 h-3 inline mr-1 opacity-40" />
        {townName} · Spatial Intel
      </div>
    </div>
  );
};

export default TownSpatialMap;
