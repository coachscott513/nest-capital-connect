import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const TEAL = "#5eead4";

/**
 * Layered regional discovery map of the Capital District.
 * Three hierarchy levels: counties (polygons) → cities/towns (medium hubs)
 * → neighborhoods/streets (small glowing micro-pins).
 * Art-directed — abstract but recognizable geography on a 1200x900 viewBox.
 */

interface MicroNode {
  name: string;
  x: number;
  y: number;
  href?: string;          // optional deep link; otherwise routes to county
  comingSoon?: boolean;
}

interface TownNode {
  name: string;
  x: number;
  y: number;
  primary?: boolean;      // largest of the city tier
}

interface County {
  slug: string;
  name: string;
  short: string;
  path: string;
  blurb: string;
  towns: TownNode[];
  micros: MicroNode[];
  status?: "active" | "expanding";
}

const COUNTIES: County[] = [
  {
    slug: "warren",
    name: "Warren County",
    short: "Warren",
    path: "M720,40 L1080,60 L1120,210 L980,280 L820,260 L700,180 Z",
    blurb: "Lake George · Queensbury · Glens Falls",
    towns: [
      { name: "Queensbury", x: 900, y: 150, primary: true },
      { name: "Lake George", x: 980, y: 100 },
      { name: "Glens Falls", x: 860, y: 210 },
    ],
    micros: [
      { name: "Lake George Village", x: 990, y: 90 },
      { name: "Glens Falls Downtown", x: 855, y: 220, comingSoon: true },
    ],
    status: "expanding",
  },
  {
    slug: "saratoga",
    name: "Saratoga County",
    short: "Saratoga",
    path: "M420,210 L720,260 L780,460 L520,510 L380,430 L340,290 Z",
    blurb: "Saratoga Springs · Clifton Park · Ballston Spa",
    towns: [
      { name: "Saratoga Springs", x: 560, y: 320, primary: true },
      { name: "Clifton Park", x: 520, y: 470 },
      { name: "Ballston Spa", x: 460, y: 380 },
    ],
    micros: [
      { name: "Broadway Saratoga", x: 575, y: 305 },
      { name: "Beekman Street", x: 540, y: 340 },
      { name: "Clifton Park Center", x: 540, y: 480 },
    ],
    status: "active",
  },
  {
    slug: "fulton",
    name: "Fulton County",
    short: "Fulton",
    path: "M60,220 L300,220 L340,290 L300,420 L100,400 L40,310 Z",
    blurb: "Gloversville · Johnstown",
    towns: [
      { name: "Gloversville", x: 180, y: 290, primary: true },
      { name: "Johnstown", x: 220, y: 350 },
    ],
    micros: [{ name: "Downtown Gloversville", x: 175, y: 280, comingSoon: true }],
    status: "expanding",
  },
  {
    slug: "montgomery",
    name: "Montgomery County",
    short: "Montgomery",
    path: "M40,410 L300,420 L380,500 L320,610 L80,600 L20,510 Z",
    blurb: "Amsterdam · Mohawk Valley",
    towns: [{ name: "Amsterdam", x: 200, y: 510, primary: true }],
    micros: [{ name: "Downtown Amsterdam", x: 205, y: 500, comingSoon: true }],
    status: "expanding",
  },
  {
    slug: "schenectady",
    name: "Schenectady County",
    short: "Schenectady",
    path: "M320,500 L500,480 L580,560 L540,690 L320,680 L260,580 Z",
    blurb: "Schenectady · Niskayuna · Rotterdam · Scotia",
    towns: [
      { name: "Schenectady", x: 410, y: 590, primary: true },
      { name: "Niskayuna", x: 500, y: 560 },
      { name: "Scotia", x: 360, y: 540 },
    ],
    micros: [
      { name: "Jay Street", x: 415, y: 580 },
      { name: "Mohawk Harbor", x: 445, y: 555 },
      { name: "Stockade District", x: 395, y: 605 },
    ],
    status: "active",
  },
  {
    slug: "rensselaer",
    name: "Rensselaer County",
    short: "Rensselaer",
    path: "M780,460 L1080,500 L1100,760 L860,800 L700,700 L700,560 Z",
    blurb: "Troy · East Greenbush · Brunswick",
    towns: [
      { name: "Troy", x: 850, y: 620, primary: true },
      { name: "East Greenbush", x: 820, y: 740 },
    ],
    micros: [
      { name: "Downtown Troy", x: 855, y: 610 },
      { name: "River Street", x: 835, y: 640 },
      { name: "Monument Square", x: 870, y: 625 },
    ],
    status: "active",
  },
  {
    slug: "albany",
    name: "Albany County",
    short: "Albany",
    path: "M340,680 L540,690 L700,700 L700,820 L620,870 L360,860 L260,770 Z",
    blurb: "Albany · Delmar · Colonie · Guilderland · Voorheesville",
    towns: [
      { name: "Albany", x: 540, y: 770, primary: true },
      { name: "Colonie", x: 600, y: 720 },
      { name: "Delmar", x: 480, y: 820 },
      { name: "Guilderland", x: 400, y: 760 },
    ],
    micros: [
      { name: "Lark Street", x: 555, y: 760, href: "/neighborhoods/lark-street" },
      { name: "Center Square", x: 545, y: 780 },
      { name: "Wolf Road", x: 615, y: 710 },
      { name: "Stuyvesant Plaza", x: 460, y: 750 },
      { name: "Four Corners Delmar", x: 490, y: 830 },
    ],
    status: "active",
  },
  {
    slug: "schoharie",
    name: "Schoharie County",
    short: "Schoharie",
    path: "M80,610 L320,620 L260,780 L120,790 L40,720 Z",
    blurb: "Cobleskill · Schoharie",
    towns: [{ name: "Cobleskill", x: 180, y: 700, primary: true }],
    micros: [{ name: "Downtown Cobleskill", x: 180, y: 690, comingSoon: true }],
    status: "expanding",
  },
];

// Rivers
const HUDSON_PATH =
  "M1020,60 C1000,200 880,320 800,460 C760,560 800,680 820,800 L840,880";
const MOHAWK_PATH =
  "M40,510 C200,520 360,540 540,560 C660,575 760,580 800,600";

// Highway corridors — faint dashed
const I87 = "M780,40 C740,220 660,400 620,620 L600,880";
const I90 = "M20,720 C260,700 520,710 780,720 L1180,720";
const I88 = "M40,640 C160,680 260,720 320,700";

function track(event: string, payload: Record<string, unknown> = {}) {
  try {
    const w = window as unknown as { gtag?: (a: string, b: string, c: Record<string, unknown>) => void };
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", event, { ...payload, page_path: window.location.pathname });
    }
  } catch { /* noop */ }
}

interface Props {
  className?: string;
  source?: string;
}

const RegionalDiscoveryMap = ({ className = "", source = "homepage_explorer_map" }: Props) => {
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);
  const [hoveredMicro, setHoveredMicro] = useState<{ name: string; x: number; y: number; comingSoon?: boolean } | null>(null);
  const active = hoveredCounty ? COUNTIES.find((c) => c.slug === hoveredCounty) : null;

  return (
    <div
      className={`relative rounded-3xl border border-white/[0.08] bg-[#070A12] overflow-hidden aspect-[4/3] ${className}`}
    >
      {/* Ambient teal glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 50% at 50% 65%, rgba(94,234,212,0.10), transparent 70%), radial-gradient(40% 50% at 78% 20%, rgba(13,110,102,0.18), transparent 75%)",
        }}
        aria-hidden
      />
      {/* Faint topographic dot grid */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Stylized layered map of the Capital District region"
      >
        <defs>
          <linearGradient id="countyFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(94,234,212,0.06)" />
            <stop offset="100%" stopColor="rgba(94,234,212,0.015)" />
          </linearGradient>
          <linearGradient id="countyFillActive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(94,234,212,0.22)" />
            <stop offset="100%" stopColor="rgba(94,234,212,0.06)" />
          </linearGradient>
          <linearGradient id="countyFillExpand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
          </linearGradient>
          <radialGradient id="hubGlowLg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(94,234,212,0.85)" />
            <stop offset="55%" stopColor="rgba(94,234,212,0.22)" />
            <stop offset="100%" stopColor="rgba(94,234,212,0)" />
          </radialGradient>
          <radialGradient id="hubGlowSm" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(94,234,212,0.7)" />
            <stop offset="60%" stopColor="rgba(94,234,212,0.15)" />
            <stop offset="100%" stopColor="rgba(94,234,212,0)" />
          </radialGradient>
        </defs>

        {/* Highway corridors — barely visible */}
        <path d={I87} stroke="rgba(255,255,255,0.09)" strokeWidth="1.2" fill="none" strokeDasharray="3 5" />
        <path d={I90} stroke="rgba(255,255,255,0.09)" strokeWidth="1.2" fill="none" strokeDasharray="3 5" />
        <path d={I88} stroke="rgba(255,255,255,0.07)" strokeWidth="1" fill="none" strokeDasharray="3 5" />

        {/* Rivers */}
        <path d={HUDSON_PATH} stroke="rgba(94,234,212,0.42)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d={MOHAWK_PATH} stroke="rgba(94,234,212,0.32)" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* County polygons */}
        {COUNTIES.map((c) => {
          const isActive = hoveredCounty === c.slug;
          const isExpanding = c.status === "expanding";
          const fill = isActive
            ? "url(#countyFillActive)"
            : isExpanding
            ? "url(#countyFillExpand)"
            : "url(#countyFill)";
          return (
            <Link
              key={c.slug}
              to={`/neighborhoods?county=${c.slug}`}
              onClick={() =>
                track("homepage_neighborhood_map_click", {
                  county: c.slug, source_page: source,
                  destination_url: `/neighborhoods?county=${c.slug}`,
                })
              }
            >
              <g
                onMouseEnter={() => setHoveredCounty(c.slug)}
                onMouseLeave={() => setHoveredCounty(null)}
                style={{ cursor: "pointer", transition: "all 250ms ease" }}
              >
                <path
                  d={c.path}
                  fill={fill}
                  stroke={isActive ? "rgba(94,234,212,0.7)" : "rgba(255,255,255,0.16)"}
                  strokeWidth={isActive ? 1.5 : 1}
                  strokeDasharray={isExpanding && !isActive ? "4 4" : undefined}
                  style={{ transition: "all 250ms ease" }}
                />
              </g>
            </Link>
          );
        })}

        {/* County labels — sparse, uppercase, top of polygon */}
        {COUNTIES.map((c) => {
          // place near the primary town, offset up
          const primary = c.towns.find((t) => t.primary) || c.towns[0];
          return (
            <text
              key={`clabel-${c.slug}`}
              x={primary.x}
              y={primary.y - 38}
              textAnchor="middle"
              fontSize="9.5"
              fill="rgba(255,255,255,0.38)"
              style={{ letterSpacing: "0.32em" }}
              pointerEvents="none"
            >
              {c.short.toUpperCase()}
            </text>
          );
        })}

        {/* City / town hubs (medium tier) */}
        {COUNTIES.flatMap((c) =>
          c.towns.map((t) => {
            const isActive = hoveredCounty === c.slug;
            const r = t.primary ? (isActive ? 8 : 6) : isActive ? 5.5 : 4;
            const glowR = t.primary ? (isActive ? 34 : 24) : 18;
            return (
              <g key={`town-${c.slug}-${t.name}`} pointerEvents="none">
                <circle cx={t.x} cy={t.y} r={glowR} fill="url(#hubGlowLg)" opacity={t.primary ? 1 : 0.5} />
                <circle cx={t.x} cy={t.y} r={r} fill={TEAL} />
                <text
                  x={t.x}
                  y={t.y - (t.primary ? 16 : 12)}
                  textAnchor="middle"
                  fontSize={t.primary ? 12.5 : 10.5}
                  fontWeight={t.primary ? 600 : 500}
                  fill={t.primary ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.72)"}
                  style={{ letterSpacing: "0.04em" }}
                >
                  {t.name}
                </text>
              </g>
            );
          })
        )}

        {/* Neighborhood / street micro nodes — smallest tier */}
        {COUNTIES.flatMap((c) =>
          c.micros.map((m) => {
            const isHover = hoveredMicro?.name === m.name;
            const href = m.href || `/neighborhoods?county=${c.slug}`;
            return (
              <Link
                key={`micro-${c.slug}-${m.name}`}
                to={href}
                onClick={() =>
                  track("homepage_micro_node_click", {
                    micro: m.name, county: c.slug, source_page: source,
                    destination_url: href,
                  })
                }
              >
                <g
                  onMouseEnter={() => setHoveredMicro({ name: m.name, x: m.x, y: m.y, comingSoon: m.comingSoon })}
                  onMouseLeave={() => setHoveredMicro(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* generous hit target */}
                  <circle cx={m.x} cy={m.y} r={12} fill="transparent" />
                  <circle cx={m.x} cy={m.y} r={isHover ? 12 : 8} fill="url(#hubGlowSm)" opacity={m.comingSoon ? 0.45 : 0.9} />
                  <circle
                    cx={m.x}
                    cy={m.y}
                    r={isHover ? 3 : 2.2}
                    fill={m.comingSoon ? "rgba(255,255,255,0.55)" : TEAL}
                    stroke={m.comingSoon ? "rgba(255,255,255,0.4)" : "none"}
                    strokeWidth={m.comingSoon ? 0.6 : 0}
                    strokeDasharray={m.comingSoon ? "1 1.5" : undefined}
                  />
                </g>
              </Link>
            );
          })
        )}

        {/* River labels */}
        <text x="900" y="470" fontSize="9" fill="rgba(94,234,212,0.55)" style={{ letterSpacing: "0.3em" }}>HUDSON</text>
        <text x="280" y="555" fontSize="9" fill="rgba(94,234,212,0.5)" style={{ letterSpacing: "0.3em" }}>MOHAWK</text>
      </svg>

      {/* Compass / legend */}
      <div className="absolute top-5 left-5 text-[10px] tracking-[0.32em] uppercase text-white/45">
        N ↑ &nbsp;Capital District
      </div>
      <div className="absolute top-5 right-5 hidden sm:flex items-center gap-4 text-[10px] tracking-[0.28em] uppercase text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: TEAL, boxShadow: "0 0 8px rgba(94,234,212,0.8)" }} />
          City
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: TEAL, boxShadow: "0 0 6px rgba(94,234,212,0.7)" }} />
          Neighborhood
        </span>
        <span className="flex items-center gap-1.5 text-white/35">
          <span className="inline-block w-1.5 h-1.5 rounded-full border border-white/40" />
          Coming Soon
        </span>
      </div>

      {/* Micro hover pill */}
      {hoveredMicro && !active && (
        <div
          className="absolute pointer-events-none rounded-full border border-white/15 bg-[#0B0F19]/95 backdrop-blur px-3 py-1.5 text-[11px] text-white/85 shadow-xl whitespace-nowrap"
          style={{
            left: `${(hoveredMicro.x / 1200) * 100}%`,
            top: `${(hoveredMicro.y / 900) * 100}%`,
            transform: "translate(-50%, -150%)",
          }}
        >
          {hoveredMicro.name}
          {hoveredMicro.comingSoon && (
            <span className="ml-2 text-[9px] tracking-[0.2em] uppercase text-white/45">Coming soon</span>
          )}
        </div>
      )}

      {/* County hover detail card */}
      {active && (
        <div className="absolute bottom-5 left-5 right-5 md:right-auto md:max-w-sm rounded-2xl border border-white/[0.10] bg-[#0B0F19]/95 backdrop-blur p-5 shadow-2xl">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase" style={{ color: TEAL }}>
              {active.name}
            </p>
            {active.status === "expanding" && (
              <span className="text-[9px] tracking-[0.22em] uppercase text-white/45 border border-white/15 rounded-full px-2 py-0.5">
                Expanding
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-white/80 font-light">{active.blurb}</p>
          <p className="mt-3 text-xs text-white/55">
            Featured:{" "}
            <span className="text-white/80">
              {active.micros.slice(0, 3).map((m) => m.name).join(" · ")}
            </span>
          </p>
          <Link
            to={`/neighborhoods?county=${active.slug}`}
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold"
            style={{ color: TEAL }}
          >
            Explore {active.short} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default RegionalDiscoveryMap;
