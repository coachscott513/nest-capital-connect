import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const TEAL = "#5eead4";

/**
 * Stylized vector map of the Capital District.
 * Art-directed — not a generic embed. County polygons are abstracted but
 * recognizable: Warren (north), Saratoga, Schenectady (west), Rensselaer
 * (east of Hudson), Albany (south). Hudson + Mohawk rivers and I-87/I-90
 * corridors give the composition real geography.
 */

interface County {
  slug: string;
  name: string;
  short: string;
  path: string;          // polygon path on a 1000x800 viewBox
  hub: { x: number; y: number; label: string };
  blurb: string;
  featured: string[];
}

const COUNTIES: County[] = [
  {
    slug: "warren",
    name: "Warren County",
    short: "Warren",
    path: "M540,40 L820,60 L860,180 L760,250 L600,240 L520,160 Z",
    hub: { x: 700, y: 150, label: "Glens Falls" },
    blurb: "Lake George · Queensbury · Glens Falls",
    featured: ["Lake George Village", "Glens Falls Downtown"],
  },
  {
    slug: "saratoga",
    name: "Saratoga County",
    short: "Saratoga",
    path: "M300,180 L600,240 L640,420 L420,470 L280,400 L240,260 Z",
    hub: { x: 470, y: 330, label: "Saratoga Springs" },
    blurb: "Saratoga Springs · Clifton Park · Ballston Spa",
    featured: ["Broadway Saratoga", "Beekman Street", "Clifton Park Center"],
  },
  {
    slug: "schenectady",
    name: "Schenectady County",
    short: "Schenectady",
    path: "M100,360 L300,360 L420,470 L380,600 L160,580 L80,470 Z",
    hub: { x: 240, y: 490, label: "Schenectady" },
    blurb: "Schenectady · Niskayuna · Rotterdam · Scotia",
    featured: ["Jay Street", "Mohawk Harbor", "Stockade District"],
  },
  {
    slug: "rensselaer",
    name: "Rensselaer County",
    short: "Rensselaer",
    path: "M640,420 L920,460 L940,680 L720,720 L580,620 L580,500 Z",
    hub: { x: 720, y: 560, label: "Troy" },
    blurb: "Troy · East Greenbush · Brunswick",
    featured: ["Downtown Troy", "River Street", "Monument Square"],
  },
  {
    slug: "albany",
    name: "Albany County",
    short: "Albany",
    path: "M180,580 L420,470 L580,500 L580,620 L520,760 L260,760 L160,680 Z",
    hub: { x: 420, y: 660, label: "Albany" },
    blurb: "Albany · Delmar · Colonie · Guilderland · Voorheesville",
    featured: ["Lark Street", "Four Corners Delmar", "Wolf Road"],
  },
];

// Hudson River — north→south on east side; Mohawk — east→west joining at Cohoes
const HUDSON_PATH =
  "M820,60 C800,180 720,260 680,420 C660,520 700,620 720,720 L740,790";
const MOHAWK_PATH =
  "M80,470 C200,490 320,500 480,520 C560,530 640,540 700,560";

// Major corridor lines (I-87 north/south, I-90 east/west) — faint
const I87 = "M600,40 C580,200 520,360 520,560 L500,790";
const I90 = "M60,640 C260,620 480,620 700,640 L960,650";

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
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered ? COUNTIES.find((c) => c.slug === hovered) : null;

  return (
    <div
      className={`relative rounded-3xl border border-white/[0.08] bg-[#070A12] overflow-hidden aspect-[5/4] ${className}`}
    >
      {/* Ambient teal glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 50% at 45% 60%, rgba(94,234,212,0.10), transparent 70%), radial-gradient(40% 50% at 80% 20%, rgba(13,110,102,0.18), transparent 75%)",
        }}
        aria-hidden
      />
      {/* Faint topographic dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Stylized map of the Capital District counties"
      >
        <defs>
          <linearGradient id="countyFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(94,234,212,0.07)" />
            <stop offset="100%" stopColor="rgba(94,234,212,0.02)" />
          </linearGradient>
          <linearGradient id="countyFillActive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(94,234,212,0.22)" />
            <stop offset="100%" stopColor="rgba(94,234,212,0.06)" />
          </linearGradient>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(94,234,212,0.85)" />
            <stop offset="50%" stopColor="rgba(94,234,212,0.25)" />
            <stop offset="100%" stopColor="rgba(94,234,212,0)" />
          </radialGradient>
        </defs>

        {/* Highway corridors — barely visible */}
        <path d={I87} stroke="rgba(255,255,255,0.10)" strokeWidth="1.2" fill="none" strokeDasharray="3 5" />
        <path d={I90} stroke="rgba(255,255,255,0.10)" strokeWidth="1.2" fill="none" strokeDasharray="3 5" />

        {/* Rivers — Hudson & Mohawk */}
        <path d={HUDSON_PATH} stroke="rgba(94,234,212,0.45)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d={MOHAWK_PATH} stroke="rgba(94,234,212,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* County polygons */}
        {COUNTIES.map((c) => {
          const isActive = hovered === c.slug;
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
                onMouseEnter={() => setHovered(c.slug)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer", transition: "all 250ms ease" }}
              >
                <path
                  d={c.path}
                  fill={isActive ? "url(#countyFillActive)" : "url(#countyFill)"}
                  stroke={isActive ? "rgba(94,234,212,0.7)" : "rgba(255,255,255,0.18)"}
                  strokeWidth={isActive ? 1.5 : 1}
                  style={{ transition: "all 250ms ease" }}
                />
              </g>
            </Link>
          );
        })}

        {/* Hubs */}
        {COUNTIES.map((c) => {
          const isActive = hovered === c.slug;
          return (
            <g key={`hub-${c.slug}`} pointerEvents="none">
              <circle cx={c.hub.x} cy={c.hub.y} r={isActive ? 38 : 26} fill="url(#hubGlow)" />
              <circle cx={c.hub.x} cy={c.hub.y} r={isActive ? 6 : 4.5} fill={TEAL} />
              <text
                x={c.hub.x}
                y={c.hub.y - (isActive ? 16 : 12)}
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill={isActive ? "#fff" : "rgba(255,255,255,0.78)"}
                style={{ letterSpacing: "0.04em" }}
              >
                {c.hub.label}
              </text>
            </g>
          );
        })}

        {/* County labels (uppercase, sparse) */}
        {COUNTIES.map((c) => {
          // approximate label position — slightly offset from hub
          const lx = c.hub.x;
          const ly = c.hub.y + 24;
          return (
            <text
              key={`label-${c.slug}`}
              x={lx}
              y={ly}
              textAnchor="middle"
              fontSize="9.5"
              fill="rgba(255,255,255,0.45)"
              style={{ letterSpacing: "0.32em", textTransform: "uppercase" }}
              pointerEvents="none"
            >
              {c.short.toUpperCase()}
            </text>
          );
        })}

        {/* River labels */}
        <text x="760" y="430" fontSize="9" fill="rgba(94,234,212,0.55)"
          style={{ letterSpacing: "0.3em" }}>HUDSON</text>
        <text x="200" y="465" fontSize="9" fill="rgba(94,234,212,0.5)"
          style={{ letterSpacing: "0.3em" }}>MOHAWK</text>
      </svg>

      {/* Compass / legend */}
      <div className="absolute top-5 left-5 text-[10px] tracking-[0.32em] uppercase text-white/45">
        N ↑ &nbsp;Capital District
      </div>
      <div className="absolute top-5 right-5 flex items-center gap-2 text-[10px] tracking-[0.32em] uppercase text-white/45">
        <span className="inline-block w-2 h-2 rounded-full" style={{ background: TEAL, boxShadow: "0 0 8px rgba(94,234,212,0.8)" }} />
        Hub
      </div>

      {/* Hover detail card */}
      {active && (
        <div className="absolute bottom-5 left-5 right-5 md:right-auto md:max-w-sm rounded-2xl border border-white/[0.10] bg-[#0B0F19]/95 backdrop-blur p-5 shadow-2xl">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase" style={{ color: TEAL }}>
            {active.name}
          </p>
          <p className="mt-2 text-sm text-white/80 font-light">{active.blurb}</p>
          <p className="mt-3 text-xs text-white/55">
            Featured: <span className="text-white/80">{active.featured.join(", ")}</span>
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
