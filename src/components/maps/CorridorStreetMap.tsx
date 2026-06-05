import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Plus, Sparkles, X, Phone, Globe, Navigation, Mail,
  Instagram, Facebook, CalendarDays, Clock, MapPin,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  /** monetization tier — controls visual prominence */
  tier?: "free" | "featured" | "premier" | "spotlight";
  blurb?: string;
  /** rich profile fields (optional) */
  image?: string;
  address?: string;
  phone?: string;
  website?: string;
  hours?: string;
  openNow?: boolean;
  instagram?: string;
  facebook?: string;
  email?: string;
  specials?: string;
  partnerLabel?: string; // e.g. "Lark Street Partner"
}

export interface CrossStreet {
  /** position along corridor 0–100 */
  t: number;
  name: string;
}

interface Props {
  corridorName: string;            // e.g. "Lark Street"
  cityName: string;                // e.g. "Albany"
  townSlug?: string;               // e.g. "albany" — for analytics
  neighborhoodSlug?: string;       // e.g. "lark-street" — for analytics
  crossStreets: CrossStreet[];     // intersections
  pins: CorridorPin[];             // business locations
  claimHref: string;
  exploreHref: string;
  claimFeaturedHref?: string;
  submitEventHref?: string;
  className?: string;
}


const CATEGORY_NOUN: Record<Exclude<CorridorCategory, "all">, string> = {
  dining: "dining",
  taverns: "tavern or bar",
  coffee: "coffee shop or café",
  retail: "retail",
  wellness: "wellness",
  services: "service",
  events: "event",
};


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
  townSlug,
  neighborhoodSlug,
  crossStreets,
  pins,
  claimHref,
  exploreHref,
  claimFeaturedHref,
  submitEventHref,
  className = "",
}: Props) => {

  const [filter, setFilter] = useState<CorridorCategory>("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const visible = useMemo(
    () => (filter === "all" ? pins : pins.filter((p) => p.category === filter)),
    [filter, pins]
  );

  const hov = hovered ? pins.find((p) => p.id === hovered) : null;
  const selected = selectedId ? pins.find((p) => p.id === selectedId) : null;


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

      {/* Owner CTA bar — above filters */}
      <div className="relative px-6 md:px-8 pt-5">
        <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] backdrop-blur px-5 py-4 md:px-6 md:py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase" style={{ color: TEAL }}>
              For Business Owners
            </p>
            <p className="mt-1.5 text-sm md:text-base font-semibold text-white">
              Own a business or event on {corridorName}?
            </p>
            <p className="mt-1 text-xs md:text-sm text-white/65 font-light">
              Claim your spot, add photos, submit events, or request featured placement inside the {corridorName} Neighborhood Explorer.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              to={claimHref}
              onClick={() => track("neighborhood_claim_spot_click", { neighborhood: neighborhoodSlug, town: townSlug, source_location: "corridor_top_cta" })}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#5eead4] text-[#0B0F19] px-4 py-2 text-xs font-semibold hover:brightness-105 transition shadow-[0_8px_24px_-12px_rgba(94,234,212,0.7)]"
            >
              <Plus className="w-3.5 h-3.5" /> Claim Your Spot
            </Link>
            {submitEventHref && (
              <Link
                to={submitEventHref}
                onClick={() => track("neighborhood_add_event_click", { neighborhood: neighborhoodSlug, town: townSlug, source_location: "corridor_top_cta" })}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 text-white px-4 py-2 text-xs font-semibold hover:bg-white/10 transition"
              >
                Add an Event
              </Link>
            )}
            {claimFeaturedHref && (
              <Link
                to={claimFeaturedHref}
                onClick={() => track("neighborhood_featured_request_click", { neighborhood: neighborhoodSlug, town: townSlug, source_location: "corridor_top_cta" })}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 text-white/85 px-4 py-2 text-xs font-semibold hover:bg-white/10 hover:text-white transition"
              >
                <Sparkles className="w-3.5 h-3.5" /> Request Featured Placement
              </Link>
            )}
          </div>
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

      {/* Category-aware contextual CTA */}
      {filter !== "all" && (
        <div className="px-6 md:px-8 pt-4">
          <div className="rounded-xl border border-[#5eead4]/25 bg-[#5eead4]/[0.05] px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <p className="text-xs md:text-sm text-white/85 font-light">
              {filter === "events" ? (
                <>Hosting something on {corridorName}? <span className="text-white font-medium">Submit your event</span> to Capital District Nest.</>
              ) : (
                <>Own a <span className="text-white font-medium">{CATEGORY_NOUN[filter]}</span> business on {corridorName}? Claim your spot in the Neighborhood Explorer.</>
              )}
            </p>
            <Link
              to={filter === "events" && submitEventHref ? submitEventHref : claimHref}
              onClick={() =>
                filter === "events"
                  ? track("neighborhood_add_event_click", { neighborhood: neighborhoodSlug, town: townSlug, source_location: "corridor_category_cta", category: filter })
                  : track("neighborhood_category_claim_click", { neighborhood: neighborhoodSlug, town: townSlug, source_location: "corridor_category_cta", category: filter })
              }
              className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#0B0F19] px-4 py-2 text-xs font-semibold hover:bg-[#5eead4] transition shrink-0"
            >
              {filter === "events" ? "Add Your Event" : "Claim Your Spot"} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}


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
            const isSel = selectedId === p.id;
            const isFeatured = p.status === "featured";
            const isAvail = p.status === "available";
            const tier = p.tier || (isFeatured ? "featured" : isAvail ? "free" : "free");
            const isSpotlight = tier === "spotlight";
            const isPremier = tier === "premier";
            const dotColor = isAvail
              ? "rgba(255,255,255,0.25)"
              : isFeatured || isSpotlight || isPremier
              ? TEAL
              : CATEGORY_DOT[p.category];
            const r = isSpotlight ? 8 : isFeatured || isPremier ? 7 : 5;
            // Persistent label: featured / premier / spotlight always show name (desktop only)
            const showPersistentLabel = !isMobile && !isAvail && (isFeatured || isSpotlight || isPremier);
            // Above pin if north side, below if south
            const labelY = p.side === "n" ? y - (isFeatured || isSpotlight ? 16 : 13) : y + (isFeatured || isSpotlight ? 22 : 18);
            return (
              <g
                key={p.id}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  setSelectedId(p.id);
                  track("corridor_pin_click", {
                    pin_id: p.id, pin_name: p.name, category: p.category,
                    status: p.status, tier, neighborhood: neighborhoodSlug, town: townSlug,
                  });
                }}
              >
                {/* connector tick from street to parcel */}
                <line
                  x1={x} y1={p.side === "n" ? 216 : 264}
                  x2={x} y2={y}
                  stroke={isAvail ? "rgba(255,255,255,0.18)" : "rgba(94,234,212,0.35)"}
                  strokeWidth="0.8"
                  strokeDasharray={isAvail ? "2 3" : undefined}
                />
                {(isFeatured || isSpotlight) && (
                  <circle cx={x} cy={y} r={isSpotlight ? 28 : 22} fill="url(#pinGlow)" />
                )}
                {/* generous click target */}
                <circle cx={x} cy={y} r={14} fill="transparent" />
                <circle
                  cx={x} cy={y} r={r + (isHov || isSel ? 2 : 0)}
                  fill={dotColor}
                  stroke={isAvail ? "rgba(255,255,255,0.4)" : "rgba(11,15,25,0.9)"}
                  strokeWidth={isAvail ? 1 : 1.5}
                  style={{ transition: "all 180ms ease",
                    filter: isFeatured || isSpotlight ? "drop-shadow(0 0 6px rgba(94,234,212,0.9))" : undefined }}
                />
                {/* Persistent label for premium tiers */}
                {showPersistentLabel && (
                  <text
                    x={x}
                    y={labelY}
                    textAnchor="middle"
                    fontSize={isSpotlight ? 11 : 10}
                    fontWeight={600}
                    fill="rgba(255,255,255,0.95)"
                    style={{
                      paintOrder: "stroke",
                      stroke: "rgba(7,10,18,0.9)",
                      strokeWidth: 3,
                      strokeLinejoin: "round",
                      letterSpacing: "0.02em",
                      pointerEvents: "none",
                    }}
                  >
                    {p.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover label pill (for non-featured pins, shows on hover only) */}
        {hov && !selected && !(hov.status === "featured" || hov.tier === "spotlight" || hov.tier === "premier") && (
          <div
            className="absolute pointer-events-none rounded-full border border-white/15 bg-[#0B0F19]/95 backdrop-blur px-3 py-1.5 text-[11px] font-medium text-white/90 shadow-xl whitespace-nowrap animate-fade-in"
            style={{
              left: `${(60 + (hov.t / 100) * 880) / 1000 * 100}%`,
              top: hov.side === "n" ? "32%" : "70%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {hov.status === "available" ? "Available · Claim This Spot" : hov.name}
          </div>
        )}

        {/* Premium business preview card — click-driven */}
        {selected && (
          <BusinessPreviewCard
            pin={selected}
            corridorName={corridorName}
            claimHref={claimHref}
            neighborhoodSlug={neighborhoodSlug}
            townSlug={townSlug}
            onClose={() => setSelectedId(null)}
          />
        )}


        {/* Floating map action pill */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          <Link
            to={claimHref}
            onClick={() => track("neighborhood_claim_spot_click", { neighborhood: neighborhoodSlug, town: townSlug, source_location: "corridor_floating_pill" })}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0B0F19]/85 backdrop-blur border border-[#5eead4]/40 text-white px-3.5 py-2 text-[11px] font-semibold hover:bg-[#5eead4] hover:text-[#0B0F19] transition shadow-lg"
          >
            <Plus className="w-3.5 h-3.5" /> Add Your Business
          </Link>
          {submitEventHref && (
            <Link
              to={submitEventHref}
              onClick={() => track("neighborhood_add_event_click", { neighborhood: neighborhoodSlug, town: townSlug, source_location: "corridor_floating_pill" })}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0B0F19]/75 backdrop-blur border border-white/20 text-white/85 px-3.5 py-1.5 text-[11px] font-medium hover:bg-white/10 transition"
            >
              Submit Event
            </Link>
          )}
        </div>
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
