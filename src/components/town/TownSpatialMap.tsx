import { useState } from "react";
import { GraduationCap, Coffee, TreePine, Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface NestMarker {
  id: string;
  label: string;
  x: number;
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
  { id: "four-corners", label: "The Four Corners", x: 52, y: 35, icon: "lifestyle", nestScore: 9.2, stat: "Historic walkability meets modern dining", detail: "Cultural heart of Delmar — restaurants, shops & community" },
  { id: "bc-high", label: "Bethlehem Central High", x: 35, y: 62, icon: "school", nestScore: 9.8, stat: "Top 1% college readiness in NY", detail: "98% graduation rate · Bethlehem Central School District" },
  { id: "rail-trail", label: "Rail Trail", x: 22, y: 48, icon: "nature", nestScore: 8.8, stat: "9+ miles of recreational access", detail: "Paved trail connecting suburbs to the Capital District" },
];

const TROY_MARKERS: NestMarker[] = [
  { id: "monument-sq", label: "Monument Square", x: 55, y: 38, icon: "lifestyle", nestScore: 8.5, stat: "Downtown revitalization hub", detail: "Farmers market, dining & nightlife corridor" },
  { id: "troy-high", label: "Troy High School", x: 40, y: 58, icon: "school", nestScore: 7.5, stat: "Expanding STEM curriculum", detail: "Troy City School District" },
  { id: "riverfront", label: "Hudson Riverfront", x: 68, y: 45, icon: "nature", nestScore: 8.2, stat: "Direct waterfront access", detail: "3+ miles of scenic river trails" },
];

const SARATOGA_MARKERS: NestMarker[] = [
  { id: "broadway", label: "Broadway District", x: 50, y: 40, icon: "lifestyle", nestScore: 9.5, stat: "Premier upstate dining", detail: "National-caliber restaurant scene" },
  { id: "saratoga-high", label: "Saratoga High", x: 35, y: 60, icon: "school", nestScore: 9.6, stat: "Top 3% in New York State", detail: "Blue Streaks · 96% graduation rate" },
  { id: "spa-park", label: "Spa State Park", x: 60, y: 55, icon: "nature", nestScore: 9.3, stat: "2,379-acre preserve", detail: "SPAC, pools, golf & year-round recreation" },
];

const ALBANY_MARKERS: NestMarker[] = [
  { id: "lark-st", label: "Lark Street", x: 50, y: 35, icon: "lifestyle", nestScore: 8.0, stat: "Arts & culture corridor", detail: "Independent shops, galleries & restaurants" },
  { id: "albany-high", label: "Albany High", x: 32, y: 55, icon: "school", nestScore: 6.8, stat: "Diverse magnet programs", detail: "Albany City School District" },
  { id: "washington-park", label: "Washington Park", x: 55, y: 50, icon: "nature", nestScore: 8.5, stat: "81-acre Olmsted park", detail: "Tulip Festival, lake & historic architecture" },
];

const SCHENECTADY_MARKERS: NestMarker[] = [
  { id: "proctors", label: "Proctors Theatre", x: 50, y: 38, icon: "lifestyle", nestScore: 8.3, stat: "Broadway-caliber entertainment", detail: "Downtown revitalization anchor" },
  { id: "sch-high", label: "Niskayuna High", x: 70, y: 55, icon: "school", nestScore: 9.2, stat: "Top 5% STEM programs", detail: "Niskayuna Central School District" },
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

const ACCENT_COLORS: Record<string, string> = {
  school: "hsl(var(--accent))",
  lifestyle: "hsl(var(--accent))",
  nature: "hsl(var(--accent))",
  destination: "hsl(var(--accent))",
};

// Road network for abstract town topology
const ROAD_PATHS = [
  "M 10,35 Q 30,33 50,35 T 90,37",
  "M 5,55 Q 25,53 50,55 T 95,53",
  "M 35,10 Q 33,30 35,50 T 37,90",
  "M 60,8 Q 58,28 60,50 T 62,92",
  "M 15,20 Q 30,30 45,40",
  "M 70,25 Q 60,40 55,55",
  "M 25,65 Q 40,72 55,70",
  "M 65,60 Q 75,70 85,75",
];

const TownSpatialMap = ({
  townSlug,
  townName,
  markers: propMarkers,
}: TownSpatialMapProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const resolvedMarkers = propMarkers || TOWN_MARKERS[townSlug] || DELMAR_MARKERS;

  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* SVG map — matches homepage topographic style */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Topographic contour rings */}
        <ellipse cx="45" cy="50" rx="42" ry="40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />
        <ellipse cx="45" cy="50" rx="32" ry="30" fill="none" stroke="hsl(var(--border))" strokeWidth="0.25" opacity="0.4" />
        <ellipse cx="45" cy="50" rx="22" ry="20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.2" opacity="0.3" />

        {/* Road network */}
        {ROAD_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={i < 4 ? "0.3" : "0.2"}
            opacity={i < 4 ? "0.4" : "0.25"}
            strokeLinecap="round"
            strokeDasharray={i >= 4 ? "1 1" : undefined}
          />
        ))}
      </svg>

      {/* Nest markers — HTML overlay */}
      {resolvedMarkers.map((m) => {
        const isHovered = hovered === m.id;
        const Icon = ICON_MAP[m.icon];

        return (
          <div
            key={m.id}
            className="absolute cursor-pointer group"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: isHovered ? 20 : 10,
            }}
            onMouseEnter={() => setHovered(m.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setHovered((prev) => (prev === m.id ? null : m.id))}
          >
            {/* Ambient glow */}
            <div
              className="absolute rounded-full transition-all duration-700"
              style={{
                width: 44,
                height: 44,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: isHovered
                  ? "radial-gradient(circle, hsl(var(--accent) / 0.25), transparent 70%)"
                  : "radial-gradient(circle, hsl(var(--accent) / 0.08), transparent 70%)",
              }}
            />

            {/* Dot */}
            <div
              className="relative rounded-full transition-all duration-500"
              style={{
                width: 14,
                height: 14,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: isHovered ? "hsl(var(--accent))" : "hsl(var(--foreground))",
                opacity: isHovered ? 1 : 0.6,
                boxShadow: isHovered ? "0 0 12px hsl(var(--accent) / 0.4)" : "none",
              }}
            />

            {/* Label */}
            <div
              className="absolute whitespace-nowrap transition-all duration-500 pointer-events-none"
              style={{
                left: "50%",
                top: "18px",
                transform: "translateX(-50%)",
              }}
            >
              <span
                className="transition-all duration-500 block text-center"
                style={{
                  fontSize: isHovered ? 14 : 12,
                  fontWeight: isHovered ? 600 : 500,
                  color: isHovered ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  opacity: isHovered ? 1 : 0.7,
                }}
              >
                {m.label}
              </span>

              {/* Hover tooltip */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 bg-background border border-border rounded-xl p-3 shadow-lg min-w-[200px]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-bold text-accent">{m.nestScore}/10</span>
                  </div>
                  <p className="text-[11px] font-medium text-foreground leading-snug">{m.stat}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{m.detail}</p>
                </motion.div>
              )}
            </div>
          </div>
        );
      })}

      {/* Ambient pulse on center marker */}
      {resolvedMarkers[0] && (
        <div
          className="absolute rounded-full animate-pulse pointer-events-none"
          style={{
            left: `${resolvedMarkers[0].x}%`,
            top: `${resolvedMarkers[0].y}%`,
            width: 48,
            height: 48,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, hsl(var(--accent) / 0.06), transparent 70%)",
            animationDuration: "4s",
          }}
        />
      )}
    </div>
  );
};

export default TownSpatialMap;
