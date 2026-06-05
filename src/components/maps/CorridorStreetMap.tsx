import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus, Sparkles } from "lucide-react";

const TEAL = "#5eead4";

export type CorridorCategory =
  | "all"
  | "dining"
  | "taverns"
  | "coffee"
  | "retail"
  | "wellness"
  | "services"
  | "events";

export interface CorridorPin {
  id: string;
  name: string;
  category: Exclude<CorridorCategory, "all">;
  /** position along corridor 0–100 */
  t: number;
  /** which side of the street: "n" north / "s" south */
  side: "n" | "s";
  status?: "featured" | "claimed" | "available";
  blurb?: string;
}

export interface CrossStreet {
  /** position along corridor 0–100 */
  t: number;
  name: string;
}

interface Props {
  corridorName: string;            // e.g. "Lark Street"
  cityName: string;                // e.g. "Albany"
  crossStreets: CrossStreet[];     // intersections
  pins: CorridorPin[];             // business locations
  claimHref: string;
  exploreHref: string;
  className?: string;
}

const CATEGORY_FILTERS: { key: CorridorCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "dining", label: "Dining" },
  { key: "taverns", label: "Taverns" },
  { key: "coffee", label: "Coffee" },
  { key: "retail", label: "Retail" },
  { key: "wellness", label: "Wellness" },
  { key: "services", label: "Services" },
  { key: "events", label: "Events" },
];

const CATEGORY_DOT: Record<Exclude<CorridorCategory, "all">, string> = {
  dining: "#ff8a65",
  taverns: "#c084fc",
  coffee: "#facc15",
  retail: "#60a5fa",
  wellness: "#5eead4",
  services: "#a3a3a3",
  events: "#f472b6",
};

function track(event: string, payload: Record<string, unknown> = {}) {
  try {
    const w = window as unknown as { gtag?: (a: string, b: string, c: Record<string, unknown>) => void };
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", event, { ...payload, page_path: window.location.pathname });
    }
  } catch { /* noop */ }
}

/**
 * Stylized horizontal corridor map. Renders a clean street line with
 * intersection cross-streets, abstracted building parcels on both sides,
 * and glowing storefront pins per business.
 *
 * viewBox: 1000 wide x 480 tall. corridor centerline at y=240.
 */
const CorridorStreetMap = ({
  corridorName,
  cityName,
  crossStreets,
  pins,
  claimHref,
  exploreHref,
  className = "",
}: Props) => {
  const [filter, setFilter] = useState<CorridorCategory>("all");
  const [hovered, setHovered] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? pins : pins.filter((p) => p.category === filter)),
    [filter, pins]
  );

  const hov = hovered ? pins.find((p) => p.id === hovered) : null;

  // Build deterministic abstract building parcels along corridor
  const parcels = useMemo(() => {
    const out: { x: number; y: number; w: number; h: number; side: "n" | "s" }[] = [];
    const NORTH_Y = 130;
    const SOUTH_Y = 280;
    const widths = [62, 48, 80, 54, 70, 44, 58, 76, 50, 64, 72, 46, 60, 84, 52, 68];
    let nx = 70;
    let i = 0;
    while (nx < 940) {
      const w = widths[i % widths.length];
      const h = 70 + ((i * 13) % 30);
      out.push({ x: nx, y: NORTH_Y - (h - 70), w, h, side: "n" });
      nx += w + 6;
      i++;
    }
    let sx = 60;
    let j = 0;
    while (sx < 940) {
      const w = widths[(j + 3) % widths.length];
      const h = 70 + ((j * 11) % 28);
      out.push({ x: sx, y: SOUTH_Y, w, h, side: "s" });
      sx += w + 6;
      j++;
    }
    return out;
  }, []);

  return (
    <div className={`relative rounded-3xl border border-white/[0.08] bg-[#070A12] overflow-hidden ${className}`}>
      {/* Header strip */}
      <div className="relative px-6 md:px-8 pt-6 md:pt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.32em] uppercase" style={{ color: TEAL }}>
            Street Guide
          </p>
          <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-[-0.02em] text-white">
            {corridorName} · {cityName}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-[10px] tracking-[0.32em] uppercase text-white/45">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: TEAL, boxShadow: "0 0 8px rgba(94,234,212,0.8)" }} />
          Featured &nbsp;·&nbsp;
          <span className="inline-block w-2 h-2 rounded-full bg-white/40" />
          Claimed &nbsp;·&nbsp;
          <span className="inline-block w-2 h-2 rounded-full border border-white/30" />
          Available
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 md:px-8 pt-5 flex flex-wrap gap-2">
        {CATEGORY_FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => {
                setFilter(f.key);
                track("corridor_filter_click", { corridor: corridorName, category: f.key });
              }}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition border ${
                active
                  ? "bg-[#5eead4] text-[#0B0F19] border-transparent"
                  : "bg-white/[0.04] text-white/70 border-white/15 hover:bg-white/10 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Ambient grid */}
      <div className="relative mt-6 mx-6 md:mx-8 mb-8 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(45% 70% at 50% 50%, rgba(94,234,212,0.10), transparent 70%)",
          }}
          aria-hidden
        />

        <svg
          viewBox="0 0 1000 480"
          preserveAspectRatio="xMidYMid meet"
          className="relative w-full h-auto"
          role="img"
          aria-label={`Stylized corridor map of ${corridorName} in ${cityName}`}
        >
          <defs>
            <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(94,234,212,0.85)" />
              <stop offset="60%" stopColor="rgba(94,234,212,0.18)" />
              <stop offset="100%" stopColor="rgba(94,234,212,0)" />
            </radialGradient>
          </defs>

          {/* Cross streets (vertical) */}
          {crossStreets.map((cs) => {
            const x = 60 + (cs.t / 100) * 880;
            return (
              <g key={cs.name}>
                <line
                  x1={x} y1={40} x2={x} y2={440}
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="14"
                  strokeLinecap="butt"
                />
                <line
                  x1={x} y1={40} x2={x} y2={440}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <text
                  x={x} y={28}
                  textAnchor="middle"
                  fontSize="10"
                  fill="rgba(255,255,255,0.55)"
                  style={{ letterSpacing: "0.22em", textTransform: "uppercase" }}
                >
                  {cs.name}
                </text>
                <text
                  x={x} y={465}
                  textAnchor="middle"
                  fontSize="10"
                  fill="rgba(255,255,255,0.35)"
                  style={{ letterSpacing: "0.22em", textTransform: "uppercase" }}
                >
                  {cs.name}
                </text>
              </g>
            );
          })}

          {/* Building parcels */}
          {parcels.map((p, i) => (
            <rect
              key={i}
              x={p.x}
              y={p.y}
              width={p.w}
              height={p.h}
              rx={3}
              fill="rgba(255,255,255,0.035)"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="0.7"
            />
          ))}

          {/* Corridor street (horizontal) */}
          <rect x={40} y={216} width={920} height={48} fill="rgba(255,255,255,0.06)" rx={2} />
          <line x1={40} y1={240} x2={960} y2={240} stroke="rgba(94,234,212,0.45)" strokeWidth="1.2" strokeDasharray="8 10" />
          <line x1={40} y1={216} x2={960} y2={216} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1={40} y1={264} x2={960} y2={264} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

          {/* Corridor label */}
          <text x={50} y={210} fontSize="10" fill="rgba(255,255,255,0.55)"
            style={{ letterSpacing: "0.3em", textTransform: "uppercase" }}>
            {corridorName}
          </text>

          {/* Pins */}
          {visible.map((p) => {
            const x = 60 + (p.t / 100) * 880;
            const y = p.side === "n" ? 200 : 280;
            const isHov = hovered === p.id;
            const isFeatured = p.status === "featured";
            const isAvail = p.status === "available";
            const dotColor = isAvail ? "rgba(255,255,255,0.25)" : isFeatured ? TEAL : CATEGORY_DOT[p.category];
            const r = isFeatured ? 7 : 5;
            return (
              <g
                key={p.id}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* connector tick from street to parcel */}
                <line
                  x1={x} y1={p.side === "n" ? 216 : 264}
                  x2={x} y2={y}
                  stroke={isAvail ? "rgba(255,255,255,0.18)" : "rgba(94,234,212,0.35)"}
                  strokeWidth="0.8"
                  strokeDasharray={isAvail ? "2 3" : undefined}
                />
                {isFeatured && (
                  <circle cx={x} cy={y} r={22} fill="url(#pinGlow)" />
                )}
                <circle
                  cx={x} cy={y} r={r + (isHov ? 2 : 0)}
                  fill={dotColor}
                  stroke={isAvail ? "rgba(255,255,255,0.4)" : "rgba(11,15,25,0.9)"}
                  strokeWidth={isAvail ? 1 : 1.5}
                  style={{ transition: "all 180ms ease",
                    filter: isFeatured ? "drop-shadow(0 0 6px rgba(94,234,212,0.9))" : undefined }}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover business card */}
        {hov && (
          <div className="pointer-events-none absolute left-4 right-4 md:left-6 md:right-auto md:max-w-xs bottom-4 rounded-2xl border border-white/[0.10] bg-[#0B0F19]/95 backdrop-blur p-4 shadow-2xl">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase" style={{ color: TEAL }}>
              {hov.category}
              {hov.status === "featured" && " · Featured"}
              {hov.status === "available" && " · Available"}
            </p>
            <p className="mt-1.5 text-sm font-semibold text-white">{hov.name}</p>
            {hov.blurb && <p className="mt-1.5 text-xs text-white/65 font-light">{hov.blurb}</p>}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="px-6 md:px-8 pb-7 -mt-2 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-white/55 font-light">
          Muted pins are available storefronts — claim yours to glow in teal.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            to={claimHref}
            onClick={() => track("corridor_claim_click", { corridor: corridorName })}
            className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#0B0F19] px-4 py-2 text-xs font-semibold hover:bg-[#5eead4] transition"
          >
            <Plus className="w-3.5 h-3.5" /> Claim This Spot
          </Link>
          <Link
            to={exploreHref}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 text-white px-4 py-2 text-xs font-semibold hover:bg-white/10 transition"
          >
            Open Directory <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CorridorStreetMap;
