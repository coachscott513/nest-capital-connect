import { useState } from "react";
import { Circle } from "lucide-react";

export interface LiveNowItem {
  label: string;
  text: string;
  tone?: "event" | "market" | "business" | "sports" | "civic";
}

interface Props {
  townName: string;
  items: LiveNowItem[];
}

const TEAL = "#5eead4";

const toneColor = (t?: LiveNowItem["tone"]) => {
  switch (t) {
    case "market": return "#fbbf24";
    case "sports": return "#f97316";
    case "business": return "#a78bfa";
    case "civic": return "#60a5fa";
    default: return TEAL;
  }
};

/**
 * Bloomberg × Apple — slow horizontal drift, hover pauses.
 * Sits directly under the hero ribbon. Town-themed.
 */
export default function LiveNowTicker({ townName, items }: Props) {
  const [paused, setPaused] = useState(false);
  if (!items?.length) return null;
  const loop = [...items, ...items];

  return (
    <section
      aria-label={`Live now in ${townName}`}
      className="relative w-full overflow-visible bg-[#0B0F19] border-y border-white/[0.06] select-none"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, rgba(94,234,212,0.05), transparent 70%)",
        }}
      />
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 py-3 flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-[#5eead4] opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5eead4] shadow-[0_0_10px_rgba(94,234,212,0.7)]" />
          </span>
          <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.28em] uppercase text-white/70 whitespace-nowrap">
            Live in {townName}
          </span>
        </div>

        <span className="hidden md:block h-4 w-px bg-white/10 shrink-0" />

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
              animation: "liveNowDrift 80s linear infinite",
              animationPlayState: paused ? "paused" : "running",
              width: "max-content",
            }}
          >
            {loop.map((item, i) => (
              <span
                key={`${item.text}-${i}`}
                className="inline-flex items-center gap-3 px-5 py-1 whitespace-nowrap"
              >
                <span
                  className="inline-flex items-center gap-1 px-2 py-[3px] rounded-full text-[10px] font-semibold tracking-[0.12em] uppercase border"
                  style={{
                    color: toneColor(item.tone),
                    borderColor: `${toneColor(item.tone)}40`,
                    background: `${toneColor(item.tone)}14`,
                  }}
                >
                  <Circle className="w-1.5 h-1.5 fill-current" strokeWidth={0} />
                  {item.label}
                </span>
                <span className="text-[13px] text-white/80 font-light tracking-[-0.005em]">
                  {item.text}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/15 ml-2" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes liveNowDrift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
