import { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

/* =============================================================
   LIVE LOCAL PULSE
   Subtle ambient strip beneath the hero search. Bloomberg × Apple.
   - dark glass, teal accents
   - very slow horizontal drift
   - hover pauses
   - category pills filter
   - paired with a compact LIVE SCORES module on desktop
   ============================================================= */

type PulseCategory =
  | "Events"
  | "Businesses"
  | "Homes"
  | "Investing"
  | "Lifestyle"
  | "Development"
  | "Sports";

interface PulseItem {
  category: PulseCategory;
  title: string;
  location?: string;
  date?: string;
  url: string;
  featured?: boolean;
  type?: "headline" | "score" | "event";
}

const PULSE_ITEMS: PulseItem[] = [
  { category: "Events",      title: "Jazz Festival returns to SPAC this weekend",        location: "Saratoga",       url: "/#weekly-feed", type: "event" },
  { category: "Businesses",  title: "New café opening on Lark Street",                    location: "Albany",         url: "/local?town=albany", type: "headline" },
  { category: "Sports",      title: "Siena tips off MAAC opener Friday at MVP Arena",     location: "Albany",         url: "/#weekly-feed", type: "event" },
  { category: "Investing",   title: "Albany multifamily inventory tightening",            location: "Capital Region", url: "/analyze?q=albany+multifamily", type: "headline" },
  { category: "Homes",       title: "14 new Delmar listings this week",                   location: "Delmar",         url: "/living-in/delmar", type: "headline" },
  { category: "Sports",      title: "UAlbany lacrosse cracks national top 20",            location: "Albany",         url: "/#weekly-feed", type: "headline" },
  { category: "Events",      title: "Live music tonight in downtown Troy",                location: "Troy",           url: "/#weekly-feed", type: "event" },
  { category: "Sports",      title: "RPI hockey hosts Union Friday — Mayor's Cup energy", location: "Troy",           url: "/#weekly-feed", type: "event" },
  { category: "Homes",       title: "Delmar home values up 6% year-over-year",            location: "Delmar",         url: "/intelligence", type: "headline" },
  { category: "Sports",      title: "Skidmore advances to Liberty League final",          location: "Saratoga",       url: "/#weekly-feed", type: "score" },
  { category: "Development", title: "New mixed-use proposal near Mohawk Harbor",          location: "Schenectady",    url: "/intelligence", type: "headline" },
  { category: "Lifestyle",   title: "Clifton Park restaurant week announced",             location: "Clifton Park",   url: "/local?town=clifton-park", type: "event" },
  { category: "Sports",      title: "Section II playoff scores updated nightly",          location: "Capital Region", url: "/#weekly-feed", type: "score" },
  { category: "Homes",       title: "Open houses this weekend across the Capital Region", location: "Region",         url: "/homes-for-sale", type: "event" },
  { category: "Businesses",  title: "Saratoga boutique expands to second location",       location: "Saratoga",       url: "/local?town=saratoga-springs", type: "headline" },
  { category: "Sports",      title: "Albany Patroons return home Saturday night",         location: "Albany",         url: "/#weekly-feed", type: "event" },
  { category: "Investing",   title: "Schenectady duplex cash-flow yields trending up",    location: "Schenectady",    url: "/analyze?q=schenectady+duplex", type: "headline" },
  { category: "Events",      title: "Farmers market season opens in Delmar",              location: "Delmar",         url: "/#weekly-feed", type: "event" },
];

const CATEGORIES: ("All" | PulseCategory)[] = ["All", "Events", "Businesses", "Homes", "Investing", "Sports"];

/* Local "live scores" — hand-curated, structured for future API swap-in */
interface ScoreItem {
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "FINAL" | "LIVE" | "UPCOMING";
  note?: string;
}

const LIVE_SCORES: ScoreItem[] = [
  { league: "MAAC",          homeTeam: "Siena",    awayTeam: "Marist",  homeScore: 74, awayScore: 68, status: "FINAL" },
  { league: "ECAC Hockey",   homeTeam: "Union",    awayTeam: "RPI",     homeScore: 3,  awayScore: 2,  status: "FINAL", note: "OT" },
  { league: "Liberty League", homeTeam: "Skidmore", awayTeam: "RIT",    homeScore: 81, awayScore: 70, status: "FINAL" },
  { league: "America East",  homeTeam: "UAlbany",  awayTeam: "Vermont", homeScore: null, awayScore: null, status: "UPCOMING", note: "Sat 7:00" },
];

function CategoryPill({ label }: { label: PulseCategory }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-[3px] rounded-full bg-[#5eead4]/10 border border-[#5eead4]/25 text-[#5eead4] text-[10px] font-semibold tracking-[0.12em] uppercase">
      {label === "Sports" && <Trophy className="w-2.5 h-2.5" strokeWidth={2.25} />}
      {label}
    </span>
  );
}

function PulseRow({ item }: { item: PulseItem }) {
  return (
    <Link to={item.url} className="group inline-flex items-center gap-3 px-5 py-1 whitespace-nowrap">
      <CategoryPill label={item.category} />
      <span className="text-[13px] text-white/80 group-hover:text-white transition-colors font-light tracking-[-0.005em]">
        {item.title}
      </span>
      {item.location && (
        <span className="text-[11px] text-white/35 font-light">· {item.location}</span>
      )}
      <span className="w-1 h-1 rounded-full bg-white/15 ml-2" aria-hidden />
    </Link>
  );
}

function LiveScoresModule() {
  return (
    <aside
      aria-label="Live local scores"
      className="hidden xl:flex shrink-0 items-center gap-4 pl-5 ml-2 border-l border-white/10"
    >
      <div className="flex items-center gap-1.5 shrink-0">
        <Trophy className="w-3 h-3 text-[#5eead4]" strokeWidth={2.25} />
        <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-white/70">
          Live Scores
        </span>
      </div>
      <div className="flex items-center gap-4">
        {LIVE_SCORES.slice(0, 3).map((s, i) => {
          const isFinal = s.status === "FINAL";
          const homeWin = isFinal && s.homeScore != null && s.awayScore != null && s.homeScore > s.awayScore;
          return (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-[10px] tracking-[0.18em] uppercase text-white/35 font-medium">
                {isFinal ? (s.note ? `F/${s.note}` : "Final") : s.note ?? s.status}
              </span>
              <span className={`text-[12px] font-medium ${homeWin ? "text-white" : "text-white/70"}`}>
                {s.homeTeam} {s.homeScore ?? "—"}
              </span>
              <span className="text-white/25 text-[10px]">·</span>
              <span className={`text-[12px] font-medium ${!homeWin && isFinal ? "text-white" : "text-white/70"}`}>
                {s.awayTeam} {s.awayScore ?? "—"}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default function LiveLocalPulse() {
  const [filter, setFilter] = useState<"All" | PulseCategory>("All");
  const [paused, setPaused] = useState(false);

  const filtered = filter === "All" ? PULSE_ITEMS : PULSE_ITEMS.filter((i) => i.category === filter);
  const loop = [...filtered, ...filtered];

  return (
    <section aria-label="Live Local Pulse" className="relative w-full overflow-visible bg-[#0B0F19] border-b border-[#2D3748] select-none">
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, rgba(94,234,212,0.06), transparent 70%)",
        }}
      />

      <div className="relative w-full mx-auto px-4 md:px-8 py-3 md:py-3.5 flex flex-nowrap items-center gap-3 md:gap-6 overflow-visible">

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
            className="flex flex-nowrap items-center whitespace-nowrap"
            style={{
              animation: "pulseDrift 90s linear infinite",
              animationPlayState: paused ? "paused" : "running",
              width: "max-content",
            }}
          >
            {loop.map((item, i) => (
              <PulseRow key={`${item.title}-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* RIGHT: live scores micro module (xl+) */}
        <LiveScoresModule />

        {/* RIGHT: category filters (desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0">
          {CATEGORIES.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={[
                  "px-3 py-1 rounded-full text-[11px] font-medium tracking-wide transition-all border inline-flex items-center gap-1",
                  active
                    ? "bg-[#5eead4]/15 text-[#5eead4] border-[#5eead4]/40"
                    : "bg-white/[0.03] text-white/55 border-white/10 hover:text-white/85 hover:border-white/20",
                ].join(" ")}
              >
                {c === "Sports" && <Trophy className="w-3 h-3" strokeWidth={2.25} />}
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
