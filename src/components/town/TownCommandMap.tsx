import { useState } from "react";
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
}

const ICON_MAP = {
  government: Landmark,
  school: GraduationCap,
  safety: Shield,
  lifestyle: TreePine,
  hub: BookOpen,
  dining: Coffee,
};

const DELMAR_INTEL: IntelMarker[] = [
  {
    id: "town-hall",
    label: "Bethlehem Town Hall",
    category: "Permits & Zoning",
    icon: "government",
    x: 48,
    y: 42,
    nestScore: 8.5,
    headline: "Permit & Zoning HQ",
    detail: "Next community zoning meeting: Wed, April 22, 7PM. Direct access to Building Department.",
  },
  {
    id: "bc-high",
    label: "Bethlehem Central High",
    category: "Elite Education",
    icon: "school",
    x: 35,
    y: 62,
    nestScore: 9.8,
    headline: "#1 School District in Albany Area",
    detail: "A-Rated by Niche · 98% graduation rate · Top 1% college readiness in NY.",
  },
  {
    id: "fire-district",
    label: "Delmar Fire District",
    category: "Safety",
    icon: "safety",
    x: 62,
    y: 55,
    nestScore: 9.0,
    headline: "Primary Safety Hub for 12054",
    detail: "Station 1 & 2 coverage. Volunteer department with full-time response capabilities.",
  },
  {
    id: "rail-trail",
    label: "Helderberg-Hudson Rail Trail",
    category: "Recreation",
    icon: "lifestyle",
    x: 20,
    y: 48,
    nestScore: 8.8,
    headline: "9.8-Mile Paved Recreational Artery",
    detail: "ADA-accessible. Connects directly to Albany and Voorheesville. Year-round access.",
  },
  {
    id: "library",
    label: "Bethlehem Public Library",
    category: "Community Hub",
    icon: "hub",
    x: 55,
    y: 32,
    nestScore: 8.5,
    headline: "Community Hub with Daily Events",
    detail: "Rated 4.6★ · Local art exhibitions, kids programs & 2026 event calendar.",
  },
  {
    id: "four-corners",
    label: "The Four Corners",
    category: "Dining & Lifestyle",
    icon: "dining",
    x: 50,
    y: 22,
    nestScore: 9.2,
    headline: "Historic Walkability Meets Modern Dining",
    detail: "Delaware Cafe, Four Corners Luncheonette. Cultural heart of Delmar.",
  },
];

const TROY_INTEL: IntelMarker[] = [
  {
    id: "city-hall",
    label: "Troy City Hall",
    category: "Permits & Zoning",
    icon: "government",
    x: 50,
    y: 40,
    nestScore: 8.0,
    headline: "Downtown Revitalization Zone HQ",
    detail: "433 River St. Access the Planning Dept for Historic District Tax Credits — reduces renovation costs by up to 20%.",
  },
  {
    id: "rpi",
    label: "Rensselaer Polytechnic Institute",
    category: "Elite Education",
    icon: "school",
    x: 35,
    y: 28,
    nestScore: 9.5,
    headline: "Global Tech Anchor & Rental Engine",
    detail: "1,100+ faculty, 7,000+ students. High-prestige tenant pool guarantees low vacancy for multi-unit lofts.",
  },
  {
    id: "farmers-market",
    label: "Troy Waterfront Farmers Market",
    category: "Dining & Lifestyle",
    icon: "dining",
    x: 58,
    y: 22,
    nestScore: 9.2,
    headline: "Nationally Ranked Saturday Heartbeat",
    detail: "Year-round market at the Atrium. Leading indicator: $20M+ ongoing waterfront investment.",
  },
  {
    id: "fire-hq",
    label: "Troy Fire Department HQ",
    category: "Safety",
    icon: "safety",
    x: 62,
    y: 55,
    nestScore: 8.5,
    headline: "Central Safety Hub — Historic District",
    detail: "Full-time professional department. Primary coverage for Downtown & South Troy investment corridors.",
  },
  {
    id: "post-office",
    label: "Troy Post Office (4th St)",
    category: "Community Hub",
    icon: "hub",
    x: 42,
    y: 65,
    nestScore: 7.8,
    headline: "Legal & Closing Document Flow",
    detail: "Historic hub for certified mail. Essential for real estate closings and investor correspondence.",
  },
];

const SARATOGA_INTEL: IntelMarker[] = [
  { id: "city-center", label: "City Center", category: "Government", icon: "government", x: 48, y: 38, nestScore: 8.0, headline: "Municipal Hub", detail: "Convention center & city services." },
  { id: "saratoga-high", label: "Saratoga Springs High", category: "Education", icon: "school", x: 35, y: 60, nestScore: 9.6, headline: "Top 3% in New York State", detail: "96% graduation rate. Blue Streaks athletics." },
  { id: "broadway", label: "Broadway District", category: "Dining & Lifestyle", icon: "dining", x: 52, y: 28, nestScore: 9.5, headline: "Premier Upstate Shopping & Dining", detail: "National-caliber restaurant scene." },
  { id: "spa-park", label: "Spa State Park", category: "Recreation", icon: "lifestyle", x: 60, y: 55, nestScore: 9.3, headline: "2,379-Acre Mineral Springs Preserve", detail: "SPAC, pools, golf & year-round recreation." },
];

const TOWN_INTEL: Record<string, IntelMarker[]> = {
  delmar: DELMAR_INTEL,
  troy: TROY_INTEL,
  "saratoga-springs": SARATOGA_INTEL,
};

const CATEGORIES = ["All", "Permits & Zoning", "Elite Education", "Safety", "Recreation", "Community Hub", "Dining & Lifestyle", "Government", "Education"];

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

const TownCommandMap = ({ townSlug, townName }: TownCommandMapProps) => {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const markers = TOWN_INTEL[townSlug] || DELMAR_INTEL;
  const uniqueCategories = ["All", ...Array.from(new Set(markers.map((m) => m.category)))];

  const filtered = activeFilter === "All" ? markers : markers.filter((m) => m.category === activeFilter);
  const activeData = markers.find((m) => m.id === activeMarker);
  const ActiveIcon = activeData ? ICON_MAP[activeData.icon] : null;

  return (
    <section className="relative w-full bg-background border-t border-b border-border">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-12 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-2">
              Spatial Intelligence
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              {townName} Command Center
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

      {/* Full-width map */}
      <div className="relative w-full h-[70vh] min-h-[500px] max-h-[700px]">
        {/* SVG topographic map */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="cmd-grid" width="2.5" height="2.5" patternUnits="userSpaceOnUse">
              <path d="M 2.5 0 L 0 0 0 2.5" fill="none" stroke="hsl(var(--border))" strokeWidth="0.05" opacity="0.4" />
            </pattern>
          </defs>

          <rect width="100" height="100" fill="url(#cmd-grid)" />

          {/* Contour rings */}
          <ellipse cx="48" cy="45" rx="40" ry="38" fill="none" stroke="hsl(var(--border))" strokeWidth="0.2" opacity="0.4" />
          <ellipse cx="48" cy="45" rx="30" ry="28" fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" opacity="0.3" />
          <ellipse cx="48" cy="45" rx="18" ry="16" fill="none" stroke="hsl(var(--border))" strokeWidth="0.12" opacity="0.2" />

          {/* Roads */}
          {ROAD_PATHS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth={i < 4 ? "0.25" : "0.15"}
              opacity={i < 4 ? "0.5" : "0.3"}
              strokeLinecap="round"
              strokeDasharray={i >= 4 ? "0.8 0.8" : undefined}
            />
          ))}

          {/* Marker positions in SVG */}
          {filtered.map((m) => {
            const isActive = activeMarker === m.id;
            return (
              <g key={m.id}>
                {/* Pulse */}
                <circle cx={m.x} cy={m.y} r="3" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.3" opacity="0.3">
                  <animate attributeName="r" from="2" to="6" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
                </circle>
                {/* Core dot */}
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={isActive ? "2" : "1.5"}
                  fill={isActive ? "hsl(var(--accent))" : "hsl(var(--foreground))"}
                  opacity={isActive ? 1 : 0.6}
                  className="transition-all duration-300"
                  style={{ filter: isActive ? "drop-shadow(0 0 3px hsl(var(--accent) / 0.5))" : "none" }}
                />
              </g>
            );
          })}
        </svg>

        {/* HTML click targets + labels */}
        {filtered.map((m) => {
          const isActive = activeMarker === m.id;
          const Icon = ICON_MAP[m.icon];
          return (
            <div
              key={m.id}
              className="absolute cursor-pointer group"
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
              {/* Hit area */}
              <div className="w-10 h-10 rounded-full" />

              {/* Label */}
              <div
                className="absolute whitespace-nowrap pointer-events-none transition-all duration-300"
                style={{ left: "50%", top: "22px", transform: "translateX(-50%)" }}
              >
                <span
                  className="text-center block transition-all duration-300"
                  style={{
                    fontSize: isActive ? 13 : 11,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {m.label}
                </span>

                {/* Hover card */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 bg-background border border-border rounded-xl p-4 shadow-lg min-w-[240px] text-left"
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
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5">
          <Layers className="w-3 h-3 text-muted-foreground/40" />
          <span className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-widest">
            {townName} · Nest Intel
          </span>
        </div>
      </div>
    </section>
  );
};

export default TownCommandMap;
