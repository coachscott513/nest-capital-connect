import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Globe,
  Navigation as NavIcon,
  Sparkles,
  Instagram,
  Facebook,
  Linkedin,
  Store,
  ArrowRight,
  Tag,
} from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { findTownInDirectory } from "@/data/capitalDistrictCounties";

const TEAL = "#0d6e66";
const TEAL_LIGHT = "#5eead4";

// ── helpers ────────────────────────────────────────────────────────────────
const titleizeSlug = (slug: string) =>
  decodeURIComponent(slug || "")
    .split("-")
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join(" ");

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};
const formatTime = (iso: string) => {
  try {
    return new Date(iso).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};
const formatExpiry = (d?: string | null) => {
  if (!d) return null;
  try {
    return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return null;
  }
};

// ── types ──────────────────────────────────────────────────────────────────
type Special = {
  id: string;
  headline: string;
  description: string | null;
  business_name: string | null;
  business_id: string | null;
  category: string | null;
  cta_label: string | null;
  cta_url: string | null;
  end_date: string | null;
};

type TEvent = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  venue_name: string | null;
  address: string | null;
  starts_at: string;
  ends_at: string | null;
  cta_label: string | null;
  cta_url: string | null;
  business_id: string | null;
};

type Biz = {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  subcategory: string | null;
  description: string | null;
  address: string | null;
  city: string | null;
  phone: string | null;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
  tiktok: string | null;
  x_url: string | null;
  hero_image_url: string | null;
  photos: string[] | null;
  is_featured: boolean | null;
};

// ── tiny UI atoms ──────────────────────────────────────────────────────────
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-[11px] font-semibold tracking-[0.24em] uppercase mb-3"
    style={{ color: TEAL_LIGHT }}
  >
    {children}
  </p>
);

const SectionHeader = ({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) => (
  <div className="max-w-2xl mb-10 md:mb-14">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
      {title}
    </h2>
    {sub && (
      <p className="mt-4 text-base md:text-lg font-light text-white/65 leading-relaxed">
        {sub}
      </p>
    )}
  </div>
);

const EmptyState = ({
  title,
  sub,
  townName,
}: {
  title: string;
  sub: string;
  townName: string;
}) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 md:p-14 text-center">
    <p className="text-lg md:text-xl font-medium text-white mb-2">{title}</p>
    <p className="text-sm text-white/55 mb-6">{sub}</p>
    <Link
      to="/claim-business"
      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition hover:opacity-90"
      style={{ backgroundColor: TEAL }}
    >
      Claim This Profile <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
);

const LoadingIndexBlock = () => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10">
    <p className="text-sm font-medium text-white/80">Loading community partner profile index...</p>
    <p className="mt-2 text-sm text-white/55 leading-relaxed">
      Capital District Nest is preparing the town business, events, specials, and local discovery index.
    </p>
  </div>
);

const SocialChip = ({
  href,
  Icon,
  label,
}: {
  href: string;
  Icon: any;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] text-white/70 hover:text-white hover:border-[#5eead4]/40 hover:bg-white/[0.08] transition"
  >
    <Icon className="w-4 h-4" />
  </a>
);

const TikTokGlyph = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.84a8.16 8.16 0 0 0 4.77 1.52V6.91a4.85 4.85 0 0 1-1.84-.22z" />
  </svg>
);
const XGlyph = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2H21l-6.522 7.45L22 22h-6.81l-4.74-6.21L4.8 22H2l7.03-8.03L2 2h6.91l4.32 5.71L18.244 2zm-2.39 18h1.86L7.27 4H5.35l10.504 16z" />
  </svg>
);

// ── page ───────────────────────────────────────────────────────────────────
const TownPulse = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const townSlug = slug.toLowerCase();
  const navigate = useNavigate();

  const dir = findTownInDirectory(townSlug);
  const townName = dir?.name ?? titleizeSlug(townSlug);

  const [search, setSearch] = useState("");
  const [specials, setSpecials] = useState<Special[]>([]);
  const [events, setEvents] = useState<TEvent[]>([]);
  const [businesses, setBusinesses] = useState<Biz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [townSlug]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const today = new Date().toISOString().slice(0, 10);
      const in7Days = new Date(Date.now() + 7 * 86400000).toISOString();
      const now = new Date().toISOString();

      const [sp, ev, bz] = await Promise.all([
        supabase
          .from("business_specials")
          .select(
            "id,headline,description,business_name,business_id,category,cta_label,cta_url,end_date",
          )
          .eq("town_slug", townSlug)
          .eq("is_active", true)
          .lte("start_date", today)
          .or(`end_date.gte.${today},end_date.is.null`)
          .order("is_featured", { ascending: false })
          .order("display_order", { ascending: true })
          .limit(12),
        supabase
          .from("town_events")
          .select(
            "id,title,description,category,venue_name,address,starts_at,ends_at,cta_label,cta_url,business_id",
          )
          .eq("town_slug", townSlug)
          .eq("is_active", true)
          .gte("starts_at", now)
          .lte("starts_at", in7Days)
          .order("starts_at", { ascending: true })
          .limit(12),
        supabase
          .from("businesses")
          .select(
            "id,slug,name,category,subcategory,description,address,city,phone,website,instagram,facebook,linkedin,tiktok,x_url,hero_image_url,photos,is_featured",
          )
          .eq("town_slug", townSlug)
          .eq("is_active", true)
          .order("is_featured", { ascending: false })
          .order("name", { ascending: true })
          .limit(48),
      ]);

      if (cancelled) return;
      setSpecials((sp.data as Special[]) ?? []);
      setEvents((ev.data as TEvent[]) ?? []);
      setBusinesses((bz.data as Biz[]) ?? []);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [townSlug]);

  // search filter (scoped to this town's businesses)
  const filteredBiz = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return businesses;
    return businesses.filter((b) =>
      `${b.name} ${b.category ?? ""} ${b.subcategory ?? ""} ${b.description ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [search, businesses]);

  const socialBusinesses = useMemo(
    () =>
      businesses.filter(
        (b) => b.instagram || b.facebook || b.tiktok || b.linkedin || b.x_url,
      ),
    [businesses],
  );

  // Featured partners = ONLY paid/curated placements (is_featured flag).
  // Never backfill from the standard free directory.
  const featuredPartners = useMemo(
    () => businesses.filter((b) => b.is_featured === true),
    [businesses],
  );

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    document.getElementById("businesses")?.scrollIntoView({ behavior: "smooth" });
  };

  const url = `https://www.capitaldistrictnest.com/towns/${townSlug}`;
  const seoTitle = `${townName}, NY — Local Pulse · Capital District Nest`;
  const seoDesc = `Search businesses, restaurants, events, services, and local updates in ${townName}, NY.`;

  return (
    <MainLayout>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={url} />
      </Helmet>

      {/* ── 1. HERO ───────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute -top-40 left-1/4 w-[640px] h-[640px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: "rgba(94,234,212,0.18)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[480px] h-[480px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: "rgba(13,110,102,0.16)" }}
        />
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-16 md:pb-24">
          <Eyebrow>Local Pulse</Eyebrow>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.035em] leading-[1.02] text-white uppercase">
            {townName}, New York
          </h1>
          <p className="mt-6 text-lg md:text-xl font-light text-white/70 max-w-2xl leading-relaxed">
            Search businesses, restaurants, events, services, and local updates in {townName}.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-10 flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl px-2 py-2 max-w-2xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] focus-within:border-white/25 transition"
          >
            <Search className="w-4 h-4 ml-3 text-white/40 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value.slice(0, 120))}
              placeholder={`Search restaurants, roofing, salons, events, or local services in ${townName}…`}
              className="flex-1 bg-transparent text-[15px] text-white placeholder:text-white/40 px-2 py-2.5 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition shrink-0"
              style={{ backgroundColor: TEAL }}
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Specials", "Events", "Businesses", "Social"].map((label, i) => (
              <a
                key={label}
                href={["#specials", "#events", "#businesses", "#social"][i]}
                className="inline-flex items-center px-4 py-2 rounded-full text-[13px] font-medium text-white/75 bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:text-white hover:border-[#5eead4]/40 transition"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. SPECIALS & PROMOS ─────────────────────────────── */}
      <section
        id="specials"
        className="relative bg-background border-t border-white/[0.06] py-20 md:py-24 px-6 md:px-10"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Local Specials & Promos"
            title={`What's on offer in ${townName}.`}
            sub="Active deals from local businesses — updated regularly."
          />
          {specials.length === 0 ? (
            <EmptyState
              title={`No featured specials are live in ${townName} yet.`}
              sub="Own a local business? Claim your free profile to post specials."
              townName={townName}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {specials.map((s) => {
                const expiry = formatExpiry(s.end_date);
                return (
                  <article
                    key={s.id}
                    className="group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 hover:border-[#5eead4]/40 hover:shadow-[0_0_36px_-8px_rgba(94,234,212,0.35)] transition"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.14em] uppercase"
                        style={{
                          color: TEAL_LIGHT,
                          background: "rgba(94,234,212,0.08)",
                          border: "1px solid rgba(94,234,212,0.25)",
                        }}
                      >
                        <Tag className="w-3 h-3" /> Special
                      </span>
                      {s.category && (
                        <span className="text-[11px] text-white/50 uppercase tracking-[0.14em]">
                          {s.category}
                        </span>
                      )}
                    </div>
                    {s.business_name && (
                      <p className="text-sm font-medium text-white/55 mb-1">
                        {s.business_name}
                      </p>
                    )}
                    <h3 className="text-2xl font-semibold text-white tracking-[-0.01em] leading-snug">
                      {s.headline}
                    </h3>
                    {s.description && (
                      <p className="mt-3 text-sm text-white/65 leading-relaxed">
                        {s.description}
                      </p>
                    )}
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs text-white/45">
                        {expiry ? `Ends ${expiry}` : "Ongoing"}
                      </span>
                      {s.cta_url && (
                        <a
                          href={s.cta_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-semibold transition hover:opacity-90"
                          style={{ backgroundColor: TEAL }}
                        >
                          {s.cta_label || "View Special"} <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. HAPPENING IN [TOWN] ───────────────────────────── */}
      <section
        id="events"
        className="relative bg-background border-t border-white/[0.06] py-20 md:py-24 px-6 md:px-10"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Upcoming"
            title={`Happening in ${townName}.`}
            sub="The next 7 days, hand-curated from local hosts and businesses."
          />
          {events.length === 0 ? (
            <EmptyState
              title="No upcoming events are listed yet."
              sub="Local businesses can claim their free profile to submit events."
              townName={townName}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((e) => (
                <article
                  key={e.id}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 hover:border-[#5eead4]/40 transition"
                >
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/55 mb-4">
                    <Calendar className="w-3.5 h-3.5" style={{ color: TEAL_LIGHT }} />
                    {formatDate(e.starts_at)}
                    <Clock className="w-3.5 h-3.5 ml-2" style={{ color: TEAL_LIGHT }} />
                    {formatTime(e.starts_at)}
                  </div>
                  <h3 className="text-xl font-semibold text-white leading-snug tracking-[-0.01em]">
                    {e.title}
                  </h3>
                  {(e.venue_name || e.address) && (
                    <p className="mt-2 text-sm text-white/60 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>
                        {e.venue_name}
                        {e.venue_name && e.address ? " · " : ""}
                        {e.address}
                      </span>
                    </p>
                  )}
                  {e.description && (
                    <p className="mt-3 text-sm text-white/60 leading-relaxed line-clamp-3">
                      {e.description}
                    </p>
                  )}
                  <div className="mt-5 flex items-center gap-2">
                    {e.cta_url && (
                      <a
                        href={e.cta_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-semibold transition hover:opacity-90"
                        style={{ backgroundColor: TEAL }}
                      >
                        {e.cta_label || "View Event"}
                      </a>
                    )}
                    {e.business_id && (
                      <button
                        onClick={() =>
                          document
                            .getElementById(`biz-${e.business_id}`)
                            ?.scrollIntoView({ behavior: "smooth", block: "center" })
                        }
                        className="inline-flex items-center px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-white/80 text-sm font-medium hover:text-white hover:border-white/30 transition"
                      >
                        View Host
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 3b. FEATURED LOCAL PARTNERS ──────────────────────── */}
      <section
        id="featured-partners"
        className="relative bg-background border-t border-white/[0.06] py-20 md:py-24 px-6 md:px-10"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Featured Local Partners"
            title={`Premium partners in ${townName}.`}
            sub="Curated Featured Merchants investing in their local presence."
          />
          {featuredPartners.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 md:p-14 text-center">
              <p className="text-[10px] font-semibold tracking-[0.24em] uppercase mb-3" style={{ color: TEAL_LIGHT }}>
                Available Spotlight Placements
              </p>
              <p className="text-2xl md:text-3xl font-semibold tracking-[-0.015em] text-white mb-3">
                Featured partner placements are opening in {townName}.
              </p>
              <p className="text-sm md:text-base text-white/60 mb-7 max-w-lg mx-auto font-light leading-relaxed">
                Claim your profile and request one of the first local spotlight positions
                during our pilot.
              </p>
              <Link
                to="/claim-business"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Request a Featured Placement <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredPartners.slice(0, 6).map((b) => {
                const dirUrl = b.address
                  ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${b.address}, ${b.city ?? townName}, NY`)}`
                  : null;
                const heroImg = b.hero_image_url || (b.photos && b.photos[0]) || null;
                return (
                  <article
                    key={b.id}
                    className="group relative rounded-3xl overflow-hidden border bg-white/[0.03] backdrop-blur-xl transition hover:-translate-y-0.5"
                    style={{
                      borderColor: "rgba(201,164,73,0.35)",
                      boxShadow: "0 20px 60px -30px rgba(201,164,73,0.35)",
                    }}
                  >
                    {heroImg && (
                      <div className="relative w-full h-40 overflow-hidden">
                        <img src={heroImg} alt={b.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.16em] uppercase mb-3"
                        style={{ color: "#c9a449", background: "rgba(201,164,73,0.10)", border: "1px solid rgba(201,164,73,0.35)" }}
                      >
                        <Sparkles className="w-3 h-3" /> Featured Partner
                      </span>
                      <h3 className="text-lg font-semibold text-white tracking-[-0.01em]">{b.name}</h3>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/45">
                        {b.subcategory || b.category}
                      </p>
                      {b.description && (
                        <p className="mt-3 text-sm text-white/65 leading-relaxed line-clamp-2">{b.description}</p>
                      )}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {b.website && (
                          <a href={b.website.startsWith("http") ? b.website : `https://${b.website}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-white text-xs font-semibold transition hover:opacity-90" style={{ backgroundColor: TEAL }}>
                            <Globe className="w-3.5 h-3.5" /> Website
                          </a>
                        )}
                        {b.phone && (
                          <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-xs font-semibold hover:border-white/30 transition">
                            <Phone className="w-3.5 h-3.5" /> Call
                          </a>
                        )}
                        {dirUrl && (
                          <a href={dirUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-xs font-semibold hover:border-white/30 transition">
                            <NavIcon className="w-3.5 h-3.5" /> Directions
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. EXPLORE LOCAL BUSINESSES ──────────────────────── */}
      <section
        id="businesses"
        className="relative bg-background border-t border-white/[0.06] py-20 md:py-24 px-6 md:px-10"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Directory"
            title={`Explore local businesses in ${townName}.`}
            sub={
              loading
                ? "Loading…"
                : `${businesses.length} verified business${businesses.length === 1 ? "" : "es"} — filtered to ${townName}.`
            }
          />

          {filteredBiz.length === 0 ? (
            <EmptyState
              title={
                search
                  ? `No matches for "${search}" in ${townName}.`
                  : `No businesses listed in ${townName} yet.`
              }
              sub="Be the first — claim your free profile to appear here."
              townName={townName}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBiz.slice(0, 24).map((b) => {
                const img =
                  b.hero_image_url ||
                  (Array.isArray(b.photos) ? b.photos[0] : undefined);
                const dirUrl = b.address
                  ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      `${b.address}, ${b.city ?? townName}, NY`,
                    )}`
                  : null;
                return (
                  <article
                    id={`biz-${b.id}`}
                    key={b.id}
                    className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-[#5eead4]/40 transition"
                  >
                    {img && (
                      <div className="aspect-[16/10] overflow-hidden bg-white/5">
                        <img
                          src={img}
                          alt={b.name}
                          loading="lazy"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Store className="w-3.5 h-3.5" style={{ color: TEAL_LIGHT }} />
                        <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                          {b.subcategory || b.category || "Local"}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white tracking-[-0.01em]">
                        {b.name}
                      </h3>
                      {(b.address || b.city) && (
                        <p className="mt-1 text-xs text-white/50">
                          {b.address || b.city}
                        </p>
                      )}
                      {b.description && (
                        <p className="mt-3 text-sm text-white/65 leading-relaxed line-clamp-2">
                          {b.description}
                        </p>
                      )}

                      <div className="mt-5 flex flex-wrap gap-2">
                        {b.website && (
                          <a
                            href={b.website.startsWith("http") ? b.website : `https://${b.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-white text-xs font-semibold transition hover:opacity-90"
                            style={{ backgroundColor: TEAL }}
                          >
                            <Globe className="w-3.5 h-3.5" /> Website
                          </a>
                        )}
                        {b.phone && (
                          <a
                            href={`tel:${b.phone}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-xs font-semibold hover:border-white/30 hover:bg-white/[0.08] transition"
                          >
                            <Phone className="w-3.5 h-3.5" /> Call
                          </a>
                        )}
                        {dirUrl && (
                          <a
                            href={dirUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-xs font-semibold hover:border-white/30 hover:bg-white/[0.08] transition"
                          >
                            <NavIcon className="w-3.5 h-3.5" /> Directions
                          </a>
                        )}
                      </div>

                      {(b.instagram || b.facebook || b.linkedin || b.tiktok || b.x_url) && (
                        <div className="mt-4 flex items-center gap-2 pt-4 border-t border-white/10">
                          {b.instagram && (
                            <SocialChip href={b.instagram} Icon={Instagram} label="Instagram" />
                          )}
                          {b.facebook && (
                            <SocialChip href={b.facebook} Icon={Facebook} label="Facebook" />
                          )}
                          {b.linkedin && (
                            <SocialChip href={b.linkedin} Icon={Linkedin} label="LinkedIn" />
                          )}
                          {b.tiktok && (
                            <SocialChip
                              href={b.tiktok}
                              Icon={(p: any) => <TikTokGlyph className="w-4 h-4" {...p} />}
                              label="TikTok"
                            />
                          )}
                          {b.x_url && (
                            <SocialChip
                              href={b.x_url}
                              Icon={(p: any) => <XGlyph className="w-3.5 h-3.5" {...p} />}
                              label="X"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── 5. SOCIAL PULSE ──────────────────────────────────── */}
      {socialBusinesses.length > 0 && (
        <section
          id="social"
          className="relative bg-background border-t border-white/[0.06] py-20 md:py-24 px-6 md:px-10"
        >
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="Social Pulse"
              title={`Local voices on social.`}
              sub={`Active ${townName} businesses you can follow right now.`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialBusinesses.slice(0, 12).map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 hover:border-[#5eead4]/40 transition"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{b.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/45 truncate">
                      {b.subcategory || b.category || "Local"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {b.instagram && (
                      <SocialChip href={b.instagram} Icon={Instagram} label="Instagram" />
                    )}
                    {b.facebook && (
                      <SocialChip href={b.facebook} Icon={Facebook} label="Facebook" />
                    )}
                    {b.tiktok && (
                      <SocialChip
                        href={b.tiktok}
                        Icon={(p: any) => <TikTokGlyph className="w-4 h-4" {...p} />}
                        label="TikTok"
                      />
                    )}
                    {b.linkedin && (
                      <SocialChip href={b.linkedin} Icon={Linkedin} label="LinkedIn" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. BUSINESS OWNER CTA ────────────────────────────── */}
      <section className="relative bg-background border-t border-white/[0.06] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-6" style={{ color: TEAL_LIGHT }} />
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] text-white">
            Own a business in {townName}?
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/65 max-w-2xl mx-auto leading-relaxed">
            Claim your free profile, update your business information, and request
            placement in local specials, events, and featured town sections.
          </p>
          <Link
            to="/claim-business"
            className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-base font-semibold transition hover:opacity-90"
            style={{ backgroundColor: TEAL }}
          >
            For Local Businesses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default TownPulse;
