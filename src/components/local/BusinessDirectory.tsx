import React, { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Phone,
  Globe,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Sparkles,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  X as XIcon,
  Filter,
  Calendar,
  CalendarPlus,
  MessageSquare,
  Navigation,
  Heart,
  Star,
  Megaphone,
  Building2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  CATEGORY_GROUPS,
  type Business,
  type BusinessCategory,
  type CategoryGroup,
} from "@/data/businesses";
import {
  OFFICIAL_CATEGORIES,
  type OfficialCategory,
} from "@/data/officialCategories";
import { CAPITAL_DISTRICT_COUNTIES } from "@/data/capitalDistrictCounties";
import {
  usePaginatedBusinesses,
  useFeaturedBusinesses,
  type TierFilter,
} from "@/hooks/usePaginatedBusinesses";
import { hasRealBusinessMedia } from "@/lib/businessImages";
import { trackGAEvent } from "@/components/GARouteTracker";

const bizPayload = (b: Business, source: string) => ({
  business_id: (b as any).id,
  business_slug: b.slug,
  business_name: b.name,
  category: b.category,
  town: b.townLabel || b.town,
  tier: b.featured ? "featured" : (b.claimed || b.verified) ? "claimed" : "standard",
  source_location: source,
});

type BizActionType = "call" | "text" | "email" | "website" | "directions" | "claim";
const fireBizAction = (action: BizActionType, b: Business, source: string) => {
  const p = bizPayload(b, source);
  switch (action) {
    case "call":       trackGAEvent.callClick(p); break;
    case "text":       trackGAEvent.textClick(p); break;
    case "email":      trackGAEvent.emailClick(p); break;
    case "website":    trackGAEvent.websiteClick(p); break;
    case "directions": trackGAEvent.directionsClick(p); break;
    case "claim":      trackGAEvent.claimProfileClick(p); break;
  }
};

const TEAL = "#5eead4";
const TEAL_DEEP = "#0d6e66";

interface Props {
  townSlug?: string;
  title?: string;
  embedded?: boolean;
}

const TOWN_LIST = CAPITAL_DISTRICT_COUNTIES.flatMap((county) => county.towns)
  .sort((a, b) => a.name.localeCompare(b.name));

const COUNTY_LIST = CAPITAL_DISTRICT_COUNTIES.map((county) => ({
  name: county.name,
  slug: county.name.toLowerCase().replace(/ county$/, "").replace(/\s+/g, "-"),
}));

const isOfficialCategory = (value: string | null): value is OfficialCategory =>
  Boolean(value && OFFICIAL_CATEGORIES.some((c) => c.toLowerCase() === value.toLowerCase()));

const isMember = (b: Business) => Boolean(b.claimed ?? b.verified);

// Tier filter type now lives in usePaginatedBusinesses.

const normalizeText = (value: string) =>
  value.trim().toLowerCase().replace(/[+,&/]+/g, " ").replace(/\bny\b/g, "").replace(/\s+/g, " ").trim();

const slugText = (value: string) =>
  normalizeText(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const BusinessDirectory = ({ townSlug, title, embedded }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState(() => searchParams.get("search") ?? searchParams.get("q") ?? searchParams.get("category") ?? "");
  const [town, setTown] = useState(() => townSlug ?? searchParams.get("town") ?? "");
  const [category, setCategory] = useState<string>(() => isOfficialCategory(searchParams.get("category")) ? searchParams.get("category")! : "");
  const [tier, setTier] = useState<TierFilter>("all");
  const [hasWebsite, setHasWebsite] = useState(false);
  const [hasPhone, setHasPhone] = useState(false);
  const [openBiz, setOpenBiz] = useState<Business | null>(null);

  // Debounce the typed search so we don't hit the DB on every keystroke.
  const [debouncedQ, setDebouncedQ] = useState(q);
  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedQ(q), 300);
    return () => window.clearTimeout(id);
  }, [q]);

  // Sync URL params (instant — based on the typed value, not the debounced one).
  useEffect(() => {
    const next = new URLSearchParams();
    if (q.trim()) next.set("search", q.trim());
    if (!townSlug && town) next.set("town", town);
    if (category) next.set("category", category);
    setSearchParams(next, { replace: true });
  }, [q, town, category, townSlug, setSearchParams]);

  // Paginated, server-filtered data layer.
  const effectiveTown = townSlug || town || undefined;
  const { rows: results, loading, loadingMore, hasMore, loadMore, total } =
    usePaginatedBusinesses({
      townSlug: effectiveTown,
      search: debouncedQ.trim() || undefined,
      category: category || undefined,
      tier,
      hasPhone,
      hasWebsite,
      pageSize: 24,
    });

  // Featured strip is its own tiny fetch (max 6 rows) — independent of pagination.
  const featuredAll = useFeaturedBusinesses(6);
  const featured = useMemo(
    () => featuredAll.filter((b) => !townSlug || b.town === townSlug || b.town === "capital-district"),
    [featuredAll, townSlug],
  );

  // Optional client-side grouping for visual sectioning on the loaded page.
  const grouped = useMemo(() => {
    const map = new Map<CategoryGroup, Business[]>();
    for (const b of results) {
      const group = (Object.entries(CATEGORY_GROUPS) as [
        CategoryGroup, BusinessCategory[],
      ][]).find(([, cats]) => cats.includes(b.category))?.[0];
      if (!group) continue;
      if (!map.has(group)) map.set(group, []);
      map.get(group)!.push(b);
    }
    return map;
  }, [results]);

  // Infinite-scroll sentinel: load more when the bottom marker enters view.
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || loading) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadMore();
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loading, loadMore, results.length]);


  return (
    <div className="bg-[#0B0F19] text-white">
      {/* HERO */}
      {!embedded && (
        <section className="pt-28 md:pt-36 pb-14 px-6 md:px-10 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.35] pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, rgba(94,234,212,0.18) 0%, rgba(11,15,25,0) 70%)",
            }}
          />
          <div className="max-w-4xl mx-auto text-center relative">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-5 text-[#5eead4]">
              Local Businesses
            </p>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02]">
              {title ?? "The Capital District, curated."}
            </h1>
            <p className="mt-6 text-lg text-white/65 font-light max-w-2xl mx-auto">
              Cinematic profiles of the cafés, lenders, attorneys, makers, and home services
              quietly powering our towns. Curated by town, not crowdsourced.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/pricing"
                onClick={() => trackGAEvent.pricingClick({ source_location: "directory_hero" })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
              >
                <Sparkles className="w-4 h-4" /> Local Business Solutions
              </a>
              <a
                href="/pricing"
                onClick={() => trackGAEvent.pricingClick({ source_location: "directory_hero_promote" })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] hover:border-[#5eead4]/40 transition"
              >
                <Megaphone className="w-4 h-4 text-[#5eead4]" /> Promote a Special
              </a>
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PARTNERS */}
      {!embedded && featured.length > 0 && (
        <section className="py-16 md:py-20 px-6 md:px-10 border-y border-white/[0.06] bg-[#10141F]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3 text-[#5eead4]">
                  Featured Partners
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                  Trusted across the Capital District.
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {featured.map((b) => (
                <FeaturedTile key={b.slug} b={b} onOpen={() => { trackGAEvent.businessProfileOpen(bizPayload(b, "directory_featured")); setOpenBiz(b); }} />
              ))}
            </div>
          </div>

        </section>
      )}

      {/* SEARCH BAR */}
      <section className={embedded ? "px-0" : "pt-16 px-6 md:px-10"}>
        <div className="max-w-6xl mx-auto">
          <form onSubmit={(e) => { e.preventDefault(); trackGAEvent.searchSubmit({ query: q, town: effectiveTown, category, source_location: townSlug ? "town_directory" : "local_directory" }); }} className="search-module rounded-2xl p-3 md:p-2.5 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] gap-2.5 md:gap-2">

            <label className="search-input-surface flex items-center gap-2.5 px-4 py-3.5 rounded-xl">
              <Search className="w-4 h-4 text-[#5eead4] shrink-0" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value.slice(0, 120))}
                placeholder="Search by name, service, keyword…"
                className="w-full bg-transparent text-[15px] text-white placeholder:text-white/55 focus:outline-none"
              />
            </label>
            {!townSlug && (
              <label className="search-input-surface flex flex-col gap-0.5 px-4 py-2.5 rounded-xl">
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#5eead4]">Town</span>
                <select
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-white focus:outline-none cursor-pointer [&>option]:text-black"
                >
                  <option value="">All towns</option>
                  {TOWN_LIST.map((t) => (
                    <option key={t.slug} value={t.slug}>{t.name}</option>
                  ))}
                </select>
              </label>
            )}
            <label className="search-input-surface flex flex-col gap-0.5 px-4 py-2.5 rounded-xl">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#5eead4]">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-[14px] text-white focus:outline-none cursor-pointer [&>option]:text-black"
              >
                <option value="">All categories</option>
                {OFFICIAL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
            >
              <Search className="w-4 h-4" /> Search
            </button>
          </form>

          {/* Filter chips */}
          <div className="mt-6 md:mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] font-semibold text-white/70">
              <Filter className="w-3.5 h-3.5" /> Filters
            </span>
            {(["all", "featured", "claimed", "standard"] as TierFilter[]).map((t) => (
              <FilterChip key={t} active={tier === t} onClick={() => setTier(t)}>
                {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
              </FilterChip>
            ))}
            <FilterChip active={hasWebsite} onClick={() => setHasWebsite((v) => !v)}>Has website</FilterChip>
            <FilterChip active={hasPhone} onClick={() => setHasPhone((v) => !v)}>Has phone</FilterChip>
            {(q || town || category || tier !== "all" || hasWebsite || hasPhone) && (
              <button
                type="button"
                onClick={() => {
                  setQ(""); if (!townSlug) setTown(""); setCategory("");
                  setTier("all"); setHasWebsite(false); setHasPhone(false);
                }}
                className="ml-1 text-xs text-[#5eead4] hover:underline font-semibold"
              >
                Clear all
              </button>
            )}
            <span className="ml-auto text-xs text-white/75">
              {loading
                ? "Loading live directory…"
                : total != null
                  ? `${results.length} of ${total.toLocaleString()} live businesses`
                  : `${results.length} live businesses`}
            </span>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className={embedded ? "py-10" : "py-20 px-6 md:px-10"}>
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 9 }).map((_, i) => (
                <BusinessCardSkeleton key={i} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/15 rounded-2xl bg-white/[0.02]">
              <p className="text-lg font-semibold text-white">No businesses found yet.</p>
              <p className="mt-2 text-sm text-white/60">
                Try another search, or help us grow the directory.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/claim-business" onClick={() => trackGAEvent.claimProfileClick({ source_location: "directory_empty_suggest" })} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition">
                  Suggest a business
                </a>
                <a href="/claim-business" onClick={() => trackGAEvent.claimProfileClick({ source_location: "directory_empty_login" })} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-sm font-semibold text-white hover:border-[#5eead4]/50 transition">
                  Owner Login
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.map((b, i) => (
                  <React.Fragment key={b.slug}>
                    <BusinessCard b={b} onOpen={() => { trackGAEvent.businessProfileOpen(bizPayload(b, "local_directory")); setOpenBiz(b); }} />
                    {i === 5 && <ClaimCtaCard />}
                    {i === 11 && <PromoteCtaCard />}
                  </React.Fragment>
                ))}

                {loadingMore && Array.from({ length: 6 }).map((_, i) => (
                  <BusinessCardSkeleton key={`more-${i}`} />
                ))}
              </div>

              {/* Infinite-scroll sentinel + manual Load More */}
              {hasMore && (
                <div ref={sentinelRef} className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-[#5eead4] transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? "Loading…" : "Load more businesses"}
                  </button>
                </div>
              )}
              {!hasMore && results.length > 0 && (
                <p className="mt-12 text-center text-xs uppercase tracking-[0.22em] text-white/40">
                  End of results · {total?.toLocaleString() ?? results.length} businesses
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* CLAIM CTA STRIP */}
      {!embedded && (
        <section className="py-24 md:py-28 px-6 md:px-10 border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-6 h-6 mx-auto mb-5 text-[#5eead4]" />
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05]">
              Own a Capital District business?
            </h2>
            <p className="mt-5 text-lg font-light text-white/65">
              Claim your free profile, then unlock events, specials, and premium placement
              across the digital front door of the region.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/pricing" onClick={() => trackGAEvent.pricingClick({ source_location: "directory_claim_strip" })} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition">
                Local Business Solutions
              </a>
              <a href="/pricing" onClick={() => trackGAEvent.pricingClick({ source_location: "directory_claim_strip_featured" })} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-[#5eead4]/40 transition">
                Become a Featured Partner
              </a>
            </div>
          </div>
        </section>
      )}

      <BusinessDetailModal biz={openBiz} onClose={() => setOpenBiz(null)} all={results} />
    </div>
  );
};

/* ─────────────────────────  CARDS  ───────────────────────── */

const BusinessCardSkeleton = () => (
  <div className="rounded-[22px] bg-[#1E2230] border border-white/[0.06] overflow-hidden animate-pulse min-h-[280px]">
    <div className="h-32 w-full bg-white/[0.04]" />
    <div className="p-6 space-y-3">
      <div className="h-3 w-20 bg-white/10 rounded" />
      <div className="h-4 w-3/4 bg-white/10 rounded" />
      <div className="h-3 w-1/2 bg-white/[0.07] rounded" />
      <div className="h-16 w-full bg-white/[0.04] rounded-xl mt-4" />
    </div>
  </div>
);


const FilterChip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition border ${
      active
        ? "bg-[#5eead4] text-[#0B0F19] border-[#5eead4]"
        : "bg-white/[0.04] text-white/80 border-white/15 hover:border-[#5eead4]/40 hover:text-[#5eead4]"
    }`}
  >
    {children}
  </button>
);

const useMonogram = (name: string) =>
  name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

const maskPhone = (p?: string) => {
  if (!p) return "(•••) ••• ••••";
  const digits = p.replace(/\D/g, "");
  const area = digits.slice(0, 3) || "•••";
  return `(${area}) ••• ••••`;
};
const maskWebsite = (w?: string) => {
  if (!w) return "website••••.com";
  try {
    const host = new URL(w).hostname.replace(/^www\./, "");
    const [name, ...rest] = host.split(".");
    const head = name.slice(0, Math.min(6, Math.max(3, name.length - 3)));
    return `${head}••••.${rest.join(".") || "com"}`;
  } catch {
    return "website••••.com";
  }
};

const ContactPreview = ({ b, claimed }: { b: Business; claimed: boolean }) => (
  <div className="mt-4 group/contact relative">
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md px-3 py-2.5 flex flex-col gap-1.5 transition group-hover/contact:border-[#5eead4]/25">
      {b.phone && (
        <span className="inline-flex items-center gap-2 text-[11px] text-white/75">
          <Phone className="w-3 h-3 text-[#5eead4]/80 shrink-0" />
          {b.phone}
        </span>
      )}
      {b.website && (
        <span className="inline-flex items-center gap-2 text-[11px] text-white/75 truncate">
          <Globe className="w-3 h-3 text-[#5eead4]/80 shrink-0" />
          <span className="truncate">{b.website.replace(/^https?:\/\/(www\.)?/, "")}</span>
        </span>
      )}
      {(b.townLabel || b.address) && (
        <span className="inline-flex items-center gap-2 text-[11px] text-white/55">
          <MapPin className="w-3 h-3 text-[#5eead4]/80 shrink-0" />
          {b.townLabel ?? "Capital District"}
        </span>
      )}
    </div>
  </div>
);

const GhostPill = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span
    title="Business owners can personalize this profile."
    aria-label={`${label} — claim to activate`}
    className="snap-start shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] text-white/35 backdrop-blur-md cursor-default select-none"
    style={{ filter: "blur(0.4px)" }}
  >
    <span className="opacity-70">{icon}</span>
    <span className="tracking-wide">{label}</span>
  </span>
);

const FeaturedTile = ({ b, onOpen }: { b: Business; onOpen: () => void }) => {
  const hasMedia = hasRealBusinessMedia(b);
  return (
  <button
    onClick={onOpen}
    className="group relative text-left rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] hover:border-[#5eead4]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(94,234,212,0.25)]"
  >
    <div className="h-40 w-full overflow-hidden relative">
      {hasMedia && b.image ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[700ms] group-hover:scale-110"
            style={{ backgroundImage: `url(${b.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 0% 0%, rgba(94,234,212,0.16) 0%, transparent 55%), linear-gradient(180deg, #10141F 0%, #0B0F19 100%)",
          }}
        >
          <div className="h-full w-full flex items-end p-5">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
                {b.category}
              </p>
              <p className="mt-1.5 text-xl font-semibold tracking-[-0.015em] text-white leading-tight">
                {b.name}
              </p>
            </div>
          </div>
        </div>
      )}
      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5eead4]/15 backdrop-blur text-[#5eead4] text-[10px] font-semibold uppercase tracking-wider border border-[#5eead4]/30">
        <Sparkles className="w-3 h-3" /> Featured
      </span>
    </div>
    <div className="p-6">
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/50 font-semibold">{b.category}</p>
      <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-white">{b.name}</h3>
      <p className="mt-3 text-sm text-white/65 font-light leading-relaxed line-clamp-2">{b.tagline}</p>

      {/* Premium visible contact row — horizontally scrollable on mobile, snap pills */}
      <div className="mt-5 -mx-1 px-1 flex gap-1.5 overflow-x-auto snap-x snap-mandatory scrollbar-none flex-nowrap md:flex-wrap">
        {b.phone ? (
          <a
            href={`tel:${b.phone.replace(/[^\d+]/g, "")}`}
            onClick={(e) => { e.stopPropagation(); fireBizAction("call", b, "directory_featured_tile"); }}
            className="snap-start shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5eead4]/10 border border-[#5eead4]/25 text-[11px] text-[#5eead4] hover:bg-[#5eead4]/20 transition"
          >
            <Phone className="w-3 h-3" /> Call
          </a>
        ) : (
          <GhostPill icon={<Phone className="w-3 h-3" />} label="Call" />
        )}
        {b.website ? (
          <a
            href={b.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); fireBizAction("website", b, "directory_featured_tile"); }}
            className="snap-start shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/15 text-[11px] text-white/80 hover:border-[#5eead4]/40 hover:text-[#5eead4] transition"
          >
            <Globe className="w-3 h-3" /> Website
          </a>
        ) : (
          <GhostPill icon={<Globe className="w-3 h-3" />} label="Website" />
        )}
        {b.address ? (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); fireBizAction("directions", b, "directory_featured_tile"); }}
            className="snap-start shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/15 text-[11px] text-white/80 hover:border-[#5eead4]/40 hover:text-[#5eead4] transition"
          >
            <Navigation className="w-3 h-3" /> Directions
          </a>
        ) : (
          <GhostPill icon={<Navigation className="w-3 h-3" />} label="Directions" />
        )}
        {b.socials?.facebook ? (
          <a
            href={b.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="snap-start shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/15 text-[11px] text-white/80 hover:border-[#5eead4]/40 hover:text-[#5eead4] transition"
          >
            <Facebook className="w-3 h-3" /> Facebook
          </a>
        ) : (
          <GhostPill icon={<Facebook className="w-3 h-3" />} label="Facebook" />
        )}
        {b.socials?.instagram ? (
          <a
            href={b.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="snap-start shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/15 text-[11px] text-white/80 hover:border-[#5eead4]/40 hover:text-[#5eead4] transition"
          >
            <Instagram className="w-3 h-3" /> Instagram
          </a>
        ) : (
          <GhostPill icon={<Instagram className="w-3 h-3" />} label="Instagram" />
        )}
      </div>


      <span className="mt-5 inline-flex items-center gap-1 text-sm text-[#5eead4]">
        View profile <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </div>
  </button>
  );
};

const BusinessCard = ({ b, onOpen }: { b: Business; onOpen: () => void }) => {
  const claimed = isMember(b);
  const elevated = Boolean(b.featured || claimed);
  const accent = b.featured ? "#c9a449" : "#5eead4";
  const hasMedia = hasRealBusinessMedia(b);
  const showImageHeader = elevated && hasMedia;

  // Slideable gallery overlay for elevated cards that actually have media.
  const galleryImages = (b.gallery && b.gallery.length > 0)
    ? b.gallery
    : (b.image ? [b.image] : []);
  const [galleryIdx, setGalleryIdx] = useState(0);
  useEffect(() => {
    if (!showImageHeader || galleryImages.length < 2) return;
    const id = setInterval(
      () => setGalleryIdx((i) => (i + 1) % galleryImages.length),
      5200,
    );
    return () => clearInterval(id);
  }, [showImageHeader, galleryImages.length]);

  return (
    <button
      onClick={onOpen}
      className={`group relative text-left rounded-[22px] bg-[#1E2230] border overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col ${
        b.featured
          ? "border-[#c9a449]/35 hover:border-[#c9a449]/70 hover:shadow-[0_28px_64px_-20px_rgba(201,164,73,0.30)]"
          : claimed
          ? "border-[#5eead4]/25 hover:border-[#5eead4]/55 hover:shadow-[0_24px_56px_-22px_rgba(94,234,212,0.22)]"
          : "border-white/[0.07] hover:border-[#5eead4]/30 hover:shadow-[0_24px_56px_-22px_rgba(94,234,212,0.18)]"
      }`}
    >
      {/* Razor-thin animated accent border for elevated profiles */}
      {elevated && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[22px] opacity-80"
          style={{
            padding: 1,
            background: `linear-gradient(135deg, ${accent}66, transparent 35%, transparent 65%, ${accent}66)`,
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      {showImageHeader ? (
        /* Cinematic image header — only when business has uploaded media */
        <div className="relative h-32 w-full overflow-hidden">
          {galleryImages.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1100ms]"
              style={{
                backgroundImage: `url(${src})`,
                opacity: i === galleryIdx ? 1 : 0,
                transform: i === galleryIdx ? "scale(1.06)" : "scale(1)",
                transition:
                  "opacity 1100ms ease-out, transform 6500ms ease-out",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2230] via-[#1E2230]/30 to-transparent" />

          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-[10px] font-semibold text-white">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full animate-ping opacity-60 bg-[#22c55e]" />
              <span className="relative rounded-full w-1.5 h-1.5 bg-[#22c55e]" />
            </span>
            Open Now
          </span>

          <div className="absolute top-3 right-3">
            {b.featured ? (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{
                  background: "#c9a449",
                  color: "#0B0F19",
                  boxShadow: "0 4px 14px -2px rgba(201,164,73,0.55)",
                }}
              >
                <Sparkles className="w-3 h-3" /> Featured
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#5eead4] text-[#0B0F19] text-[10px] font-bold uppercase tracking-[0.14em] shadow-[0_4px_14px_-2px_rgba(94,234,212,0.5)]">
                <Star className="w-3 h-3" /> Member
              </span>
            )}
          </div>
        </div>
      ) : (
        /* Text-first editorial header — for free/unclaimed AND elevated-without-media.
           No fake stock photo, no clipped acronym badge. Typography carries the card. */
        <div className="relative px-6 pt-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
              {b.category}
            </span>
            {b.featured ? (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{
                  background: "#c9a449",
                  color: "#0B0F19",
                  boxShadow: "0 4px 14px -2px rgba(201,164,73,0.55)",
                }}
              >
                <Sparkles className="w-3 h-3" /> Featured
              </span>
            ) : claimed ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#5eead4]/15 border border-[#5eead4]/30 text-[#5eead4] text-[10px] font-semibold uppercase tracking-[0.14em]">
                <Star className="w-3 h-3" /> Member
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-white/55 text-[10px] font-medium uppercase tracking-[0.14em]">
                Unclaimed
              </span>
            )}
          </div>
        </div>
      )}

      <div className={`px-6 ${showImageHeader ? "pt-5" : "pt-3"} pb-6 flex flex-col flex-1`}>
        {showImageHeader && (
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#5eead4]">
            {b.category}
            {b.townLabel && <span className="text-white/35"> · {b.townLabel}</span>}
          </p>
        )}
        <h3 className={`${showImageHeader ? "mt-1.5" : "mt-2"} text-lg font-semibold tracking-tight text-white leading-snug`}>
          {b.name}
        </h3>
        {!showImageHeader && b.townLabel && (
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/45 font-medium">
            {b.townLabel}
          </p>
        )}
        {b.tagline && (
          <p className="mt-2.5 text-sm text-white/65 font-light leading-relaxed line-clamp-3">
            {b.tagline}
          </p>
        )}

        {b.signals && b.signals.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {b.signals.slice(0, 2).map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-[#5eead4]/10 text-[#5eead4] border border-[#5eead4]/20">
                {s}
              </span>
            ))}
          </div>
        )}

        {claimed ? (
          <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#5eead4]">
            View profile
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        ) : (
          <div className="mt-auto pt-5 flex items-center gap-2">
            <span className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-[#0B0F19] text-[13px] font-semibold transition group-hover:bg-[#5eead4]">
              View Profile <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
            <a
              href={`/claim-business?slug=${b.slug}${b.town ? `&town=${b.town}` : ""}`}
              onClick={(e) => { e.stopPropagation(); fireBizAction("claim", b, "directory_card"); }}
              className="shrink-0 inline-flex items-center justify-center px-3 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white/85 text-[11px] font-semibold tracking-[0.1em] uppercase hover:border-[#5eead4]/55 hover:text-[#5eead4] hover:bg-white/[0.08] transition"
              aria-label="Claim this profile"
            >
              Claim
            </a>
          </div>
        )}
      </div>
    </button>
  );
};

const ClaimCtaCard = () => (
  <a
    href="/pricing"
    onClick={() => trackGAEvent.pricingClick({ source_location: "directory_inline_claim_card" })}
    className="group relative rounded-[22px] overflow-hidden p-7 flex flex-col justify-between border border-[#5eead4]/25 bg-gradient-to-br from-[#0d6e66]/15 via-[#1E2230] to-[#1E2230] hover:border-[#5eead4]/60 hover:shadow-[0_30px_70px_-20px_rgba(94,234,212,0.35)] transition-all duration-300 hover:-translate-y-1 min-h-[280px]"
  >
    <div
      className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
      style={{ background: "radial-gradient(circle, rgba(94,234,212,0.35) 0%, transparent 70%)" }}
    />
    <div className="relative">
      <div className="w-12 h-12 rounded-2xl border border-[#5eead4]/40 bg-[#5eead4]/10 flex items-center justify-center">
        <Building2 className="w-5 h-5 text-[#5eead4]" />
      </div>
      <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-[#5eead4] font-semibold">Business Owners</p>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white leading-tight">
        Own this business?
      </h3>
      <p className="mt-3 text-sm text-white/65 font-light leading-relaxed">
        Claim your free profile, then add events, specials, and social links — and unlock
        premium placement across town pages.
      </p>
    </div>
    <div className="relative mt-6 flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold">
        For Businesses <ArrowUpRight className="w-3.5 h-3.5" />
      </span>
      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-white text-xs font-semibold">
        Learn more
      </span>
    </div>
  </a>
);

const PromoteCtaCard = () => (
  <a
    href="/pricing"
    onClick={() => trackGAEvent.pricingClick({ source_location: "directory_inline_promote_card" })}
    className="group relative rounded-[22px] overflow-hidden p-7 flex flex-col justify-between border border-white/[0.08] bg-[#1E2230] hover:border-[#5eead4]/50 hover:shadow-[0_30px_70px_-20px_rgba(94,234,212,0.25)] transition-all duration-300 hover:-translate-y-1 min-h-[280px]"
  >
    <div className="relative">
      <div className="w-12 h-12 rounded-2xl border border-white/15 bg-white/[0.04] flex items-center justify-center">
        <Megaphone className="w-5 h-5 text-[#5eead4]" />
      </div>
      <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-[#5eead4] font-semibold">Promote</p>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white leading-tight">
        Promote a special or event
      </h3>
      <p className="mt-3 text-sm text-white/65 font-light leading-relaxed">
        Happy hours, grand openings, networking events, live music, seasonal promotions —
        surfaced across the weekly feed.
      </p>
    </div>
    <div className="relative mt-6">
      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#5eead4]/40 bg-[#5eead4]/10 text-[#5eead4] text-xs font-semibold">
        Add Promotion <ArrowUpRight className="w-3.5 h-3.5" />
      </span>
    </div>
  </a>
);

/* ─────────────────────────  MODAL  ───────────────────────── */

export const BusinessDetailModal = ({
  biz,
  onClose,
  all,
}: {
  biz: Business | null;
  onClose: () => void;
  all: Business[];
}) => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => { setLightbox(null); }, [biz?.slug]);

  if (!biz) {
    return (
      <Dialog open={false} onOpenChange={(o) => !o && onClose()}>
        <DialogContent />
      </Dialog>
    );
  }

  const claimed = isMember(biz);
  const telHref = biz.phone ? `tel:${biz.phone.replace(/[^\d+]/g, "")}` : undefined;
  const smsHref = biz.phone ? `sms:${biz.phone.replace(/[^\d+]/g, "")}` : undefined;
  const dirHref = biz.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.address)}`
    : undefined;

  const nearbyAuto =
    biz.nearby ??
    all
      .filter((x) => x.slug !== biz.slug && x.town === biz.town && x.town !== "capital-district")
      .slice(0, 4)
      .map((x) => ({ label: x.name, kind: "business" as const }));

  return (
    <Dialog open={!!biz} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-[#0B0F19] border border-white/10 text-white max-h-[92vh] overflow-y-auto">
        <DialogTitle className="sr-only">{biz.name}</DialogTitle>
        <DialogDescription className="sr-only">{biz.tagline}</DialogDescription>

        {/* SECTION A — HERO
            Cinematic media banner ONLY when business has uploaded real media.
            Otherwise we render a premium dark-onyx editorial header so free /
            unclaimed listings still feel intentional — never fake stock photos. */}
        {hasRealBusinessMedia(biz) ? (
          <div className="relative h-[280px] md:h-[380px] w-full overflow-hidden">
            {biz.heroVideo ? (
              <video
                src={biz.heroVideo}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${biz.image ?? biz.gallery?.[0]})` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/55 to-[#0B0F19]/10" />

            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
                  {biz.category}{biz.townLabel && ` · ${biz.townLabel}`}
                </span>
                {biz.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#5eead4] text-[#0B0F19] text-[10px] font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
                {!biz.featured && claimed && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur text-white text-[10px] font-semibold uppercase tracking-wider border border-white/20">
                    Member
                  </span>
                )}
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05]">
                {biz.name}
              </h2>
              {biz.atmosphere && (
                <p className="mt-3 text-white/70 font-light max-w-2xl text-sm md:text-base">
                  {biz.atmosphere}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div
            className="relative px-7 md:px-10 pt-10 md:pt-14 pb-8 md:pb-10 overflow-hidden"
            style={{
              background:
                "radial-gradient(120% 80% at 0% 0%, rgba(94,234,212,0.10) 0%, transparent 55%), linear-gradient(180deg, #0B0F19 0%, #0B0F19 100%)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-px left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(94,234,212,0.35), transparent)" }}
            />
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
                {biz.category}{biz.townLabel && ` · ${biz.townLabel}`}
              </span>
              {biz.featured ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#c9a449] text-[#0B0F19] text-[10px] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              ) : claimed ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#5eead4]/15 text-[#5eead4] border border-[#5eead4]/30 text-[10px] font-semibold uppercase tracking-wider">
                  Member
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.04] text-white/55 border border-white/10 text-[10px] font-semibold uppercase tracking-wider">
                  Unclaimed
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
              {biz.name}
            </h2>
            {biz.tagline && (
              <p className="mt-4 text-white/70 font-light max-w-2xl text-base md:text-lg leading-relaxed">
                {biz.tagline}
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white/55">
              {biz.address && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#5eead4]" /> {biz.address}
                </span>
              )}
              {biz.phone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#5eead4]" /> {biz.phone}
                </span>
              )}
              {biz.website && (
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#5eead4]" /> Website
                </span>
              )}
            </div>
          </div>
        )}

        <div className="p-7 md:p-10 space-y-10">
          {/* Primary actions — Action Hub opens a popover with every available
              channel (call/text/email/website/order/directions). */}
          <div className="flex flex-wrap gap-2">
            <BusinessActionHub biz={biz} claimed={claimed} />
            {biz.website && (
              <a
                href={biz.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => fireBizAction("website", biz, "business_modal")}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
              >
                <Globe className="w-4 h-4" /> Website
              </a>
            )}
            {dirHref && (
              <a
                href={dirHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => fireBizAction("directions", biz, "business_modal")}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] hover:border-[#5eead4]/40 transition"
              >
                <Navigation className="w-4 h-4" /> Directions
              </a>
            )}
            {!claimed && (
              <a
                href={`/claim-business?slug=${biz.slug}`}
                onClick={() => fireBizAction("claim", biz, "business_modal")}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#5eead4]/40 bg-[#5eead4]/10 text-[#5eead4] text-sm font-semibold hover:bg-[#5eead4]/20 transition"
              >
                <Sparkles className="w-4 h-4" /> Claim This Profile
              </a>
            )}
          </div>




          {/* SECTION B — STORY */}
          <Section eyebrow="The story" title="Why locals come here">
            <p className="text-white/75 font-light leading-relaxed text-[15px] md:text-base">
              {biz.about ?? biz.tagline}
            </p>
            {biz.knownFor && biz.knownFor.length > 0 && (
              <div className="mt-6">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#5eead4] font-semibold mb-3">
                  Known for
                </p>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {biz.knownFor.map((k) => (
                    <li key={k} className="flex items-start gap-2.5 text-sm text-white/80">
                      <Heart className="w-3.5 h-3.5 text-[#5eead4] mt-1 shrink-0" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {biz.signals && biz.signals.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {biz.signals.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-[#5eead4]/10 text-[#5eead4] border border-[#5eead4]/25">
                    {s}
                  </span>
                ))}
              </div>
            )}
            {biz.services && biz.services.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {biz.services.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] text-white/75 border border-white/[0.08]">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </Section>

          {/* SECTION C — SPECIALS / EVENTS */}
          {biz.specials && biz.specials.length > 0 && (
            <Section eyebrow="What's on" title="Specials & events">
              <div className="grid sm:grid-cols-2 gap-3">
                {biz.specials.map((s) => (
                  <div key={s.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 hover:border-[#5eead4]/30 transition">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {s.tag && (
                          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-[#5eead4] font-semibold mb-1.5">
                            <Star className="w-3 h-3" /> {s.tag}
                          </span>
                        )}
                        <h4 className="text-base font-semibold text-white">{s.title}</h4>
                      </div>
                      {s.when && (
                        <span className="inline-flex items-center gap-1 text-xs text-white/55 shrink-0">
                          <Calendar className="w-3 h-3" /> {s.when}
                        </span>
                      )}
                    </div>
                    {s.cta && (
                      <a href={s.cta.href} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#5eead4] hover:underline">
                        {s.cta.label} <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* SECTION D — GALLERY */}
          {biz.gallery && biz.gallery.length > 0 && (
            <Section eyebrow="Inside" title="Gallery">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {biz.gallery.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setLightbox(src)}
                    className={`group relative overflow-hidden rounded-2xl ${
                      i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-[4/3]" : "aspect-square"
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#0B0F19]/0 group-hover:bg-[#0B0F19]/30 transition-colors" />
                  </button>
                ))}
              </div>
            </Section>
          )}

          {/* Contact info grid */}
          {claimed && (
            <Section eyebrow="Visit" title="Contact & hours">
              <div className="grid sm:grid-cols-2 gap-3">
                {biz.phone && <Info icon={<Phone className="w-4 h-4" />} label="Phone" value={biz.phone} />}
                {biz.email && <Info icon={<Mail className="w-4 h-4" />} label="Email" value={biz.email} />}
                {biz.website && (
                  <a
                    href={biz.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-[#5eead4]/40 hover:bg-white/[0.06] transition"
                  >
                    <Globe className="w-4 h-4 text-white/45 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/50 font-semibold">Website</p>
                      <p className="text-sm font-medium text-white">Visit site</p>
                    </div>
                  </a>
                )}
                {biz.address && <Info icon={<MapPin className="w-4 h-4" />} label="Address" value={biz.address} />}
                {biz.hours && <Info icon={<Clock className="w-4 h-4" />} label="Hours" value={biz.hours} />}
              </div>

              {biz.socials && (
                <div className="mt-6 flex items-center gap-2 flex-wrap">
                  {biz.socials.facebook && <SocialBtn href={biz.socials.facebook} Icon={Facebook} />}
                  {biz.socials.instagram && <SocialBtn href={biz.socials.instagram} Icon={Instagram} />}
                  {biz.socials.linkedin && <SocialBtn href={biz.socials.linkedin} Icon={Linkedin} />}
                  {biz.socials.twitter && <SocialBtn href={biz.socials.twitter} Icon={XIcon} />}
                  {biz.socials.tiktok && <SocialBtn href={biz.socials.tiktok} Icon={TikTokIcon} />}
                  {biz.socials.youtube && <SocialBtn href={biz.socials.youtube} Icon={Youtube} />}
                </div>
              )}

            </Section>
          )}

          {/* SECTION D2 — SOCIAL MEDIA & UPDATES (always visible) */}
          <SocialFootprint biz={biz} claimed={claimed} />

          {/* SECTION E — NEARBY / SIMILAR */}
          {nearbyAuto.length > 0 && (
            <Section
              eyebrow="Discover"
              title={biz.town && biz.town !== "capital-district" ? "Similar Local Businesses" : "Nearby Businesses"}
            >
              <div className="grid sm:grid-cols-2 gap-2.5">
                {nearbyAuto.map((n) => (
                  <a
                    key={n.label}
                    href={n.href ?? "#"}
                    className="flex items-center justify-between gap-3 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-[#5eead4]/30 hover:bg-white/[0.06] transition"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#5eead4] font-semibold">
                        {n.kind ?? "Nearby"}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">{n.label}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40" />
                  </a>
                ))}
              </div>
            </Section>
          )}

          {/* Standard CTA */}
          {!claimed && (
            <div className="rounded-2xl border border-dashed border-[#5eead4]/30 bg-[#5eead4]/[0.04] p-7">
              <p className="text-sm font-semibold text-white">Is this your business?</p>
              <p className="mt-1.5 text-sm text-white/65 font-light">
                Claim this profile to control photos, hours, contact info, social links,
                events, and specials. Free during the pilot — concierge onboarding included.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={`/claim-business?slug=${biz.slug}`} onClick={() => fireBizAction("claim", biz, "business_modal_claim_strip")} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#5eead4] text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition">
                  <Sparkles className="w-4 h-4" /> Claim This Profile
                </a>
                <a href={`/claim-business?slug=${biz.slug}&intent=login`} onClick={() => fireBizAction("claim", biz, "business_modal_owner_login")} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-white/20 text-sm font-semibold text-white hover:border-[#5eead4]/40 transition">
                  Owner Login
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[80] bg-[#0B0F19]/95 flex items-center justify-center p-6 animate-in fade-in"
          >
            <img src={lightbox} alt="" className="max-w-full max-h-full rounded-2xl shadow-2xl" />
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Section = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <p className="text-[10px] uppercase tracking-[0.22em] text-[#5eead4] font-semibold mb-2">
      {eyebrow}
    </p>
    <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.015em] text-white mb-5">
      {title}
    </h3>
    {children}
  </section>
);

const Info = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-2.5 p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
    <span className="mt-0.5 text-[#5eead4]">{icon}</span>
    <div>
      <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white/55">{label}</p>
      <p className="text-sm text-white">{value}</p>
    </div>
  </div>
);

const SocialBtn = ({ href, Icon }: { href: string; Icon: React.ComponentType<{ className?: string }> }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/15 text-white hover:border-[#5eead4]/50 hover:text-[#5eead4] transition"
  >
    <Icon className="w-4 h-4" />
  </a>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.01a8.16 8.16 0 0 0 4.77 1.52V7.1a4.85 4.85 0 0 1-1.84-.41z" />
  </svg>
);

/* ─────────────────────────  ACTION HUB  ───────────────────────── */

const BusinessActionHub = ({ biz, claimed = false }: { biz: Business; claimed?: boolean }) => {
  const tel = biz.phone ? `tel:${biz.phone.replace(/[^\d+]/g, "")}` : undefined;
  const sms = biz.phone ? `sms:${biz.phone.replace(/[^\d+]/g, "")}` : undefined;
  const mail = biz.email ? `mailto:${biz.email}` : undefined;
  const dir = biz.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.address)}`
    : undefined;
  const order = (biz as any).orderUrl || (biz as any).menuUrl || biz.bookingUrl;
  const orderLabel = (biz as any).orderUrl
    ? "Order Online"
    : (biz as any).menuUrl
    ? "View Menu"
    : biz.bookingUrl
    ? "Book Now"
    : "Order / Book";

  const rows: { href: string; icon: React.ReactNode; label: string; sub?: string; accent?: boolean; action: BizActionType }[] = [];
  if (tel) rows.push({ href: tel, icon: <Phone className="w-4 h-4" />, label: "Call Business", sub: biz.phone, action: "call" });
  if (sms) rows.push({ href: sms, icon: <MessageSquare className="w-4 h-4" />, label: "Text Message", sub: "Send a text", action: "text" });
  if (mail) rows.push({ href: mail, icon: <Mail className="w-4 h-4" />, label: "Email Direct", sub: biz.email, action: "email" });
  if (biz.website) rows.push({ href: biz.website, icon: <Globe className="w-4 h-4" />, label: "Visit Website", action: "website" });
  if (order) rows.push({ href: order, icon: <CalendarPlus className="w-4 h-4" />, label: orderLabel, action: "website" });
  if (dir) rows.push({ href: dir, icon: <Navigation className="w-4 h-4" />, label: "Get Directions", sub: biz.address, action: "directions" });
  if (!claimed) {
    rows.push({
      href: `/claim-business?slug=${biz.slug}`,
      icon: <Sparkles className="w-4 h-4" />,
      label: "Owner: Request Profile Edits",
      sub: "Claim & customize this listing",
      accent: true,
      action: "claim",
    });
  }

  if (rows.length === 0) {
    return (
      <a
        href={`/claim-business?slug=${biz.slug}`}
        onClick={() => fireBizAction("claim", biz, "business_action_hub_empty")}
        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#5eead4] text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition"
      >
        <Sparkles className="w-4 h-4" /> Claim This Profile
      </a>
    );
  }


  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          onClick={() => trackGAEvent.businessContactOpen(bizPayload(biz, "business_action_hub"))}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#5eead4] text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition"
        >
          <Phone className="w-4 h-4" /> Contact
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={10}
        className="w-[280px] p-2 rounded-3xl border border-white/10 bg-[#0B0F19]/95 backdrop-blur-xl text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
      >
        <p className="px-3 pt-2 pb-1.5 text-[10px] uppercase tracking-[0.22em] font-semibold text-[#5eead4]">
          Action Hub
        </p>
        <div className="flex flex-col">
          {rows.map((r) => {
            const external = r.href.startsWith("http");
            return (
              <a
                key={r.label}
                href={r.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                onClick={() => fireBizAction(r.action, biz, "business_action_hub")}
                className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-white/[0.06] transition"
              >
                <span className="w-9 h-9 rounded-full bg-[#5eead4]/15 text-[#5eead4] flex items-center justify-center shrink-0">
                  {r.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-white">{r.label}</span>
                  {r.sub && (
                    <span className="block text-xs text-white/55 truncate">{r.sub}</span>
                  )}
                </span>
              </a>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

/* ─────────────────────────  SOCIAL FOOTPRINT  ───────────────────────── */

const SocialFootprint = ({ biz, claimed }: { biz: Business; claimed: boolean }) => {
  const s = biz.socials ?? {};
  const items: { href?: string; Icon: React.ComponentType<{ className?: string }>; label: string }[] = [
    { href: s.facebook, Icon: Facebook, label: "Facebook" },
    { href: s.instagram, Icon: Instagram, label: "Instagram" },
    { href: s.tiktok, Icon: TikTokIcon, label: "TikTok" },
    { href: s.linkedin, Icon: Linkedin, label: "LinkedIn" },
    { href: s.youtube, Icon: Youtube, label: "YouTube" },
    { href: s.twitter, Icon: XIcon, label: "X" },
  ];
  const hasAny = items.some((i) => !!i.href);

  return (
    <Section eyebrow="Connect" title="Digital Channels">
      {hasAny ? (
        <div className="flex items-center gap-2.5 flex-wrap">
          {items.map(({ href, Icon, label }) =>
            href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white hover:border-[#5eead4]/60 hover:text-[#5eead4] hover:bg-white/[0.08] transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ) : (
              <span
                key={label}
                aria-label={`${label} not added`}
                className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/[0.06] text-white/25 cursor-not-allowed"
              >
                <Icon className="w-4 h-4" />
              </span>
            ),
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#5eead4]/30 bg-[#5eead4]/[0.04] p-6">
          <div className="flex items-center gap-2.5 mb-4 opacity-60">
            {items.map(({ Icon, label }) => (
              <span
                key={label}
                className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/10 text-white/35"
              >
                <Icon className="w-4 h-4" />
              </span>
            ))}
          </div>
          <p className="text-sm text-white/75 font-light leading-relaxed">
            {claimed
              ? "Add your Instagram, Facebook, TikTok, photos, specials, and updates to this profile."
              : "Claim this profile to add Instagram, Facebook, TikTok, photos, specials, and updates."}
          </p>
          <a
            href={`/claim-business?slug=${biz.slug}${claimed ? "&intent=login" : ""}`}
            className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#5eead4] text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition"
          >
            <Sparkles className="w-4 h-4" /> {claimed ? "Manage Profile" : "Claim This Profile"}
          </a>
        </div>
      )}
    </Section>
  );
};

export default BusinessDirectory;


