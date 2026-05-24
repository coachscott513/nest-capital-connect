import { useState } from "react";
import { Link } from "react-router-dom";

/* =============================================================
   LIVE LOCAL PULSE
   Subtle ambient strip beneath the hero search. Bloomberg × Apple.
   - dark glass, teal accents
   - very slow horizontal drift
   - hover pauses
   - category pills filter
   - mobile: auto-rotating single card
   ============================================================= */

type PulseCategory = "Events" | "Businesses" | "Homes" | "Investing" | "Lifestyle" | "Development";

interface PulseItem {
  category: PulseCategory;
  text: string;
  to: string;
  town?: string;
}

const PULSE_ITEMS: PulseItem[] = [
  { category: "Events",       text: "Jazz Festival returns to SPAC this weekend",        to: "/#weekly-feed",                   town: "Saratoga" },
  { category: "Businesses",   text: "New café opening on Lark Street",                    to: "/local?town=albany",              town: "Albany" },
  { category: "Investing",    text: "Albany multifamily inventory tightening",            to: "/analyze?q=albany+multifamily",   town: "Capital Region" },
  { category: "Homes",        text: "14 new Delmar listings this week",                   to: "/living-in/delmar",               town: "Delmar" },
  { category: "Events",       text: "Live music tonight in downtown Troy",                to: "/#weekly-feed",                   town: "Troy" },
  { category: "Homes",        text: "Delmar home values up 6% year-over-year",            to: "/intelligence",                   town: "Delmar" },
  { category: "Development",  text: "New mixed-use proposal near Mohawk Harbor",          to: "/intelligence",                   town: "Schenectady" },
  { category: "Lifestyle",    text: "Clifton Park restaurant week announced",             to: "/local?town=clifton-park",        town: "Clifton Park" },
  { category: "Homes",        text: "Open houses this weekend across the Capital Region", to: "/homes-for-sale",                 town: "Region" },
  { category: "Businesses",   text: "Saratoga boutique expands to second location",       to: "/local?town=saratoga-springs",    town: "Saratoga" },
  { category: "Investing",    text: "Schenectady duplex cash-flow yields trending up",    to: "/analyze?q=schenectady+duplex",   town: "Schenectady" },
  { category: "Events",       text: "Farmers market season opens in Delmar",              to: "/#weekly-feed",                   town: "Delmar" },
];

const CATEGORIES: ("All" | PulseCategory)[] = ["All", "Events", "Businesses", "Homes", "Investing"];

function CategoryPill({ label }: { label: PulseCategory }) {
  return (
    <span className="inline-flex items-center px-2 py-[3px] rounded-full bg-[#5eead4]/10 border border-[#5eead4]/25 text-[#5eead4] text-[10px] font-semibold tracking-[0.12em] uppercase">
      {label}
    </span>
  );
}

function PulseRow({ item }: { item: PulseItem }) {
  return (
    <Link
      to={item.to}
      className="group inline-flex items-center gap-3 px-5 py-1 whitespace-nowrap"
    >
      <CategoryPill label={item.category} />
      <span className="text-[13px] text-white/80 group-hover:text-white transition-colors font-light tracking-[-0.005em]">
        {item.text}
      </span>
      {item.town && (
        <span className="text-[11px] text-white/35 font-light">· {item.town}</span>
      )}
      <span className="w-1 h-1 rounded-full bg-white/15 ml-2" aria-hidden />
    </Link>
  );
}

export default function LiveLocalPulse() {
  const [filter, setFilter] = useState<"All" | PulseCategory>("All");
  const [paused, setPaused] = useState(false);

  const filtered = filter === "All" ? PULSE_ITEMS : PULSE_ITEMS.filter((i) => i.category === filter);
  // duplicate for seamless loop
  const loop = [...filtered, ...filtered];

  return (
    <section
      aria-label="Live Local Pulse"
      className="relative w-full bg-[#0B0F19] border-b border-[#2D3748]"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, rgba(94,234,212,0.06), transparent 70%)",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 py-3 md:py-3.5 flex items-center gap-4 md:gap-6">
        {/* LEFT: live indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-[#5eead4] opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5eead4] shadow-[0_0_10px_rgba(94,234,212,0.7)]" />
          </span>
          <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.28em] uppercase text-white/70">
            Live Local Pulse
          </span>
        </div>

        <span className="hidden md:block h-4 w-px bg-white/10 shrink-0" />

        {/* CENTER: drift marquee */}
        <div
          className="relative flex-1 min-w-0 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, #000 48px, #000 calc(100% - 48px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, #000 48px, #000 calc(100% - 48px), transparent 100%)",
          }}
        >
          <div
            className="flex items-center"
            style={{
              animation: "pulseDrift 80s linear infinite",
              animationPlayState: paused ? "paused" : "running",
              width: "max-content",
            }}
          >
            {loop.map((item, i) => (
              <PulseRow key={`${item.text}-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* RIGHT: category filters (desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0">
          {CATEGORIES.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={[
                  "px-3 py-1 rounded-full text-[11px] font-medium tracking-wide transition-all border",
                  active
                    ? "bg-[#5eead4]/15 text-[#5eead4] border-[#5eead4]/40"
                    : "bg-white/[0.03] text-white/55 border-white/10 hover:text-white/85 hover:border-white/20",
                ].join(" ")}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes pulseDrift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
