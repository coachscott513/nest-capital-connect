import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Store, TrendingUp, Megaphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/* =============================================================
   CAPITAL DISTRICT PULSE — Live Local Pulse
   ONLY 100% verifiable platform data is streamed here:
     1) Directory Status — real verified businesses from `businesses`
        Format: "✨ LOCAL INDEX: {Name} is mapped and verified in our
                 {Category} directory. View Profile."
     2) Real Estate Intelligence — static, accurate CTAs into DealDesk
        and intelligence hubs (no fake metrics, no fake prices).
     3) Broadcast Open — explicit CTA inviting business owners to claim
        Featured placement; explains empty states naturally.
   No fake specials, no fake events, no unverified pricing. Ever.
   ============================================================= */

type PulseCategory = "Directory" | "Market" | "Broadcast";

interface PulseItem {
  category: PulseCategory;
  title: string;
  url: string;
}

const TEAL = "#5eead4";

const toneFor = (c: PulseCategory) => {
  switch (c) {
    case "Directory": return { color: TEAL,      Icon: Store,      emoji: "✨", label: "Local Index" };
    case "Market":    return { color: "#fbbf24", Icon: TrendingUp, emoji: "📊", label: "Market Pulse" };
    case "Broadcast": return { color: "#f97316", Icon: Megaphone,  emoji: "🔥", label: "Broadcast Open" };
  }
};

function CategoryPill({ category }: { category: PulseCategory }) {
  const { color, emoji, label } = toneFor(category);
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-[3px] rounded-full text-[10px] font-semibold tracking-[0.12em] uppercase border"
      style={{ color, borderColor: `${color}40`, background: `${color}14` }}
    >
      <span aria-hidden>{emoji}</span>
      {label}
    </span>
  );
}

function PulseRow({ item }: { item: PulseItem }) {
  return (
    <Link to={item.url} className="group inline-flex items-center gap-3 px-5 py-1 whitespace-nowrap">
      <CategoryPill category={item.category} />
      <span className="text-[13px] text-white/80 group-hover:text-white transition-colors font-light tracking-[-0.005em]">
        {item.title}
      </span>
      <span className="w-1 h-1 rounded-full bg-white/15 ml-2" aria-hidden />
    </Link>
  );
}

// Real Estate Intelligence — verifiable platform CTAs only.
const MARKET_ITEMS: PulseItem[] = [
  {
    category: "Market",
    title: "MARKET PULSE: Request a custom investment cash-flow analysis for Albany County via the DealDesk.",
    url: "/dealdesk",
  },
  {
    category: "Market",
    title: "MARKET PULSE: Live single-family, multi-unit & land inventory across the Capital District — Browse Homes.",
    url: "/homes-for-sale",
  },
  {
    category: "Market",
    title: "MARKET PULSE: Town-by-town real estate intelligence for Albany, Troy, Saratoga, Schenectady & Delmar.",
    url: "/intelligence",
  },
];

// Broadcast Open — explains empty states; invites real owners.
const BROADCAST_ITEMS: PulseItem[] = [
  {
    category: "Broadcast",
    title: "BROADCAST OPEN: Are you a local business owner in Troy, Albany, or Delmar? Upgrade to Featured to stream your real-time summer specials here.",
    url: "/claim-business",
  },
  {
    category: "Broadcast",
    title: "BROADCAST OPEN: Verified Capital District merchants can claim a free profile and unlock the live pulse stream.",
    url: "/claim-business",
  },
];

export default function LiveLocalPulse() {
  const [paused, setPaused] = useState(false);
  const [directoryItems, setDirectoryItems] = useState<PulseItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("businesses")
        .select("name,slug,category,town_slug,is_featured,plan_tier")
        .eq("is_active", true)
        .not("slug", "is", null)
        .not("category", "is", null)
        .order("is_featured", { ascending: false })
        .order("plan_tier", { ascending: false })
        .limit(30);

      if (cancelled || !data) return;

      const mapped: PulseItem[] = data.map((b: any) => ({
        category: "Directory" as const,
        title: `LOCAL INDEX: ${b.name} is mapped and verified in our ${b.category} directory. View Profile.`,
        url: b.slug ? `/biz/${b.slug}` : "/local",
      }));

      setDirectoryItems(mapped);
    })();
    return () => { cancelled = true; };
  }, []);

  // Interleave: Directory → Market → Directory → Broadcast → ...
  const visible = useMemo(() => {
    const out: PulseItem[] = [];
    const dir = directoryItems;
    const maxLen = Math.max(dir.length, MARKET_ITEMS.length + BROADCAST_ITEMS.length);
    let mi = 0, bi = 0;
    for (let i = 0; i < maxLen; i++) {
      if (dir[i]) out.push(dir[i]);
      if (i % 2 === 0 && MARKET_ITEMS[mi % MARKET_ITEMS.length]) {
        out.push(MARKET_ITEMS[mi % MARKET_ITEMS.length]); mi++;
      }
      if (i % 3 === 2 && BROADCAST_ITEMS[bi % BROADCAST_ITEMS.length]) {
        out.push(BROADCAST_ITEMS[bi % BROADCAST_ITEMS.length]); bi++;
      }
    }
    // Empty-state fallback: only verifiable CTAs, never fake specials.
    if (out.length === 0) return [...MARKET_ITEMS, ...BROADCAST_ITEMS];
    return out.slice(0, 24);
  }, [directoryItems]);

  const loop = [...visible, ...visible];

  return (
    <section
      aria-label="Capital District Pulse"
      className="relative w-full overflow-visible bg-[#0B0F19] border-b border-[#2D3748] select-none"
    >
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
          <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.28em] uppercase text-white/70 whitespace-nowrap">
            Capital District Pulse
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
              animation: "pulseDrift 240s linear infinite",
              animationPlayState: paused ? "paused" : "running",
              width: "max-content",
            }}
          >
            {loop.map((item, i) => (
              <PulseRow key={`${item.title}-${i}`} item={item} />
            ))}
          </div>
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
