import { useEffect, useState } from "react";

interface Props {
  items: string[];
  intervalMs?: number;
}

const TEAL_DARK = "#5eead4";

/**
 * Tiny floating metadata pulse — rotates ambient local facts inside the hero.
 * Luxury Bloomberg terminal feel.
 */
export default function HeroMetadataPulse({ items, intervalMs = 3800 }: Props) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!items?.length) return;
    const t = setInterval(() => setI((p) => (p + 1) % items.length), intervalMs);
    return () => clearInterval(t);
  }, [items, intervalMs]);

  if (!items?.length) return null;

  return (
    <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inset-0 rounded-full opacity-60 animate-ping" style={{ background: TEAL_DARK }} />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ background: TEAL_DARK, boxShadow: `0 0 12px ${TEAL_DARK}` }}
        />
      </span>
      <span
        className="text-[10px] font-semibold tracking-[0.24em] uppercase shrink-0"
        style={{ color: TEAL_DARK }}
      >
        Right Now
      </span>
      <span className="h-3 w-px bg-white/15 shrink-0" />
      <div className="relative h-5 overflow-hidden min-w-[200px]">
        {items.map((t, idx) => (
          <span
            key={`${t}-${idx}`}
            className="absolute inset-0 text-[13px] text-white/85 font-light tracking-[-0.005em] whitespace-nowrap transition-all duration-700"
            style={{
              opacity: idx === i ? 1 : 0,
              transform: idx === i ? "translateY(0)" : idx === (i - 1 + items.length) % items.length ? "translateY(-100%)" : "translateY(100%)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
