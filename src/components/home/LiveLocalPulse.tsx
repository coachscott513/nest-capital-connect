import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Store, Home, Megaphone, TrendingUp, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/* =============================================================
   CAPITAL DISTRICT PULSE — Live Local Pulse
   Bloomberg × Apple ambient strip beneath the hero search.
   Pulls fresh, dated content from the database (no mock data):
     P1  Events in the next 7 days (town_events)
     P2  Recently added / featured businesses (businesses)
     P3  Recent listings (listings)
     P4  Active business specials (business_specials)
     P5  Curated town highlights (town_ledger is_featured)
   Falls back to a single evergreen message if no fresh items.
   ============================================================= */

type PulseCategory = "Event" | "Business" | "Homes" | "Special" | "Town";

interface PulseItem {
  category: PulseCategory;
  title: string;
  location?: string;
  url: string;
  priority: number;
  date: number; // ms — for sorting
}

const TEAL = "#5eead4";

const toneFor = (c: PulseCategory) => {
  switch (c) {
    case "Special": return { color: "#f97316", Icon: Megaphone, emoji: "🔥", label: "Pulse" };
    case "Business": return { color: "#a78bfa", Icon: Store, emoji: "🌟", label: "Member" };
    case "Event": return { color: "#5eead4", Icon: Calendar, emoji: "📅", label: "Upcoming" };
    case "Homes": return { color: "#fbbf24", Icon: Home, emoji: "🏠", label: "Homes" };
    case "Town": return { color: "#60a5fa", Icon: MapPin, emoji: "📍", label: "Town" };
    default: return { color: TEAL, Icon: TrendingUp, emoji: "📈", label: "Platform" };
  }
};


const townLabel = (slug?: string | null) =>
  slug
    ? slug
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ")
    : undefined;

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
      {item.location && (
        <span className="text-[11px] text-white/35 font-light">· {item.location}</span>
      )}
      <span className="w-1 h-1 rounded-full bg-white/15 ml-2" aria-hidden />
    </Link>
  );
}

export default function LiveLocalPulse() {
  const [paused, setPaused] = useState(false);
  const [items, setItems] = useState<PulseItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const now = Date.now();
    const in7d = new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString();
    const last30dIso = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();

    (async () => {
      const [eventsRes, bizRes, listingsRes, specialsRes, ledgerRes] = await Promise.all([
        supabase
          .from("town_events")
          .select("title,town_slug,town_name,starts_at,cta_url")
          .eq("is_active", true)
          .gte("starts_at", new Date(now).toISOString())
          .lte("starts_at", in7d)
          .order("starts_at", { ascending: true })
          .limit(8),
        supabase
          .from("businesses")
          .select("name,town_slug,town_name,slug,created_at,is_featured,plan_tier")
          .eq("is_active", true)
          .in("plan_tier", ["featured", "spotlight", "premium_partner"])
          .order("created_at", { ascending: false })
          .limit(8),
        supabase
          .from("listings")
          .select("street_name,street_number,city,list_price,created_at")
          .eq("status", "A")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("business_specials")
          .select("headline,business_name,town_slug,town_name,cta_url,start_date,end_date")
          .eq("is_active", true)
          .lte("start_date", new Date(now).toISOString().slice(0, 10))
          .or(`end_date.is.null,end_date.gte.${new Date(now).toISOString().slice(0, 10)}`)
          .order("display_order", { ascending: true })
          .limit(8),
        supabase
          .from("town_ledger")
          .select("title,town_slug,category,source_url,published_at")
          .eq("is_featured", true)
          .order("published_at", { ascending: false })
          .limit(6),
      ]);


      if (cancelled) return;

      const collected: PulseItem[] = [];

      (eventsRes.data ?? []).forEach((e: any) => {
        collected.push({
          category: "Event",
          title: e.title,
          location: e.town_name ?? townLabel(e.town_slug),
          url: e.cta_url || (e.town_slug ? `/towns/${e.town_slug}` : "/local"),
          priority: 1,
          date: e.starts_at ? new Date(e.starts_at).getTime() : now,
        });
      });

      (bizRes.data ?? []).forEach((b: any) => {
        const label = b.is_featured ? `Featured: ${b.name}` : `New on Nest: ${b.name}`;
        collected.push({
          category: "Business",
          title: label,
          location: b.town_name ?? townLabel(b.town_slug),
          url: b.town_slug ? `/towns/${b.town_slug}` : "/local",
          priority: 2,
          date: b.created_at ? new Date(b.created_at).getTime() : now,
        });
      });

      (listingsRes.data ?? []).forEach((l: any) => {
        const addr = [l.street_number, l.street_name].filter(Boolean).join(" ").trim();
        const price = l.list_price ? `$${Math.round(Number(l.list_price)).toLocaleString()}` : null;
        const title = [
          "New listing",
          addr || null,
          l.city ? `in ${l.city}` : null,
          price ? `· ${price}` : null,
        ]
          .filter(Boolean)
          .join(" ");
        collected.push({
          category: "Homes",
          title,
          location: l.city,
          url: "/homes-for-sale",
          priority: 3,
          date: l.created_at ? new Date(l.created_at).getTime() : now,
        });
      });

      (specialsRes.data ?? []).forEach((s: any) => {
        collected.push({
          category: "Special",
          title: s.headline,
          location: s.town_name ?? townLabel(s.town_slug),
          url: s.cta_url || (s.town_slug ? `/towns/${s.town_slug}` : "/local"),
          priority: 4,
          date: s.start_date ? new Date(s.start_date).getTime() : now,
        });
      });

      (ledgerRes.data ?? []).forEach((t: any) => {
        collected.push({
          category: "Town",
          title: t.title,
          location: townLabel(t.town_slug),
          url: t.source_url || (t.town_slug ? `/towns/${t.town_slug}` : "/"),
          priority: 5,
          date: t.published_at ? new Date(t.published_at).getTime() : now,
        });
      });

      collected.sort((a, b) => a.priority - b.priority || b.date - a.date);

      setItems(collected.slice(0, 18));
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Evergreen fallback (single calm message — never fake "live" data)
  const evergreen: PulseItem = useMemo(
    () => ({
      category: "Town",
      title: "Explore homes, businesses, events, and local updates across the Capital District.",
      url: "/local",
      priority: 99,
      date: 0,
    }),
    []
  );

  // While loading, render nothing (avoid layout flash with fake data)
  if (items === null) return null;

  const visible = items.length > 0 ? items : [evergreen];
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
