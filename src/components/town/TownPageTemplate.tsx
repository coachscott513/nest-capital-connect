import { useEffect, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  Search,
  GraduationCap,
  Trophy,
  Calculator,
  ChevronRight,
} from "lucide-react";
import MainHeader from "@/components/MainHeader";
import AnalystCard from "@/components/AnalystCard";
import Footer from "@/components/Footer";
import WeeklyFeed from "@/components/WeeklyFeed";
import TrustedLocalPartners from "@/components/town/TrustedLocalPartners";
import BusinessDirectory from "@/components/local/BusinessDirectory";
import LiveNowTicker from "@/components/town/LiveNowTicker";
import HeroMetadataPulse from "@/components/town/HeroMetadataPulse";
import WhatChangedThisWeek from "@/components/town/WhatChangedThisWeek";
import ThisWeekendIn from "@/components/town/ThisWeekendIn";
import type { LivingInTown } from "@/data/livingInTowns";
import { getTownOverride, townOverrides } from "@/data/townOverrides";
import { findTownInDirectory } from "@/data/capitalDistrictCounties";
import { getSearchRoute } from "@/lib/searchIntent";

// County → regional hub slug used to backfill local partners
// when a small town has fewer than 5 verified businesses.
const COUNTY_HUB_SLUG: Record<string, string> = {
  "Albany County": "albany",
  "Saratoga County": "saratoga-springs",
  "Rensselaer County": "troy",
  "Schenectady County": "schenectady",
  "Schoharie County": "schenectady",
  "Fulton County": "saratoga-springs",
  "Montgomery County": "schenectady",
};

const CAPITAL_DISTRICT_HUB_NAME: Record<string, string> = {
  albany: "Albany",
  "saratoga-springs": "Saratoga Springs",
  troy: "Troy",
  schenectady: "Schenectady",
};

interface Props {
  town: LivingInTown;
}

// Locked brand palette
const TEAL = "#0d6e66";
const TEAL_DARK = "#5eead4";

// Tighter, more cinematic flow between sections
const SECTION_PAD = "py-20 md:py-24 px-6 md:px-10";

/**
 * MASTER TOWN TEMPLATE
 * Single dark onyx canvas. Apple × Bloomberg × Architectural Digest feel.
 * Powers every /living-in/{slug} page. Town-specific copy / imagery / feel
 * lives in src/data/townOverrides.ts.
 */
const TownPageTemplate = ({ town }: Props) => {
  const navigate = useNavigate();
  const o = getTownOverride(town.slug);
  const url = `https://www.capitaldistrictnest.com/living-in/${town.slug}`;
  const listingUrl = town.listingSearchUrl;
  const accent = o.accentGlow ?? "rgba(94,234,212,0.22)";
  const [townSearch, setTownSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [town.slug]);

  const handleTownSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = townSearch.trim();
    if (!query) return;
    navigate(getSearchRoute(`${query} ${town.townName}`));
  };

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${town.townName}, NY`,
    description: town.seoIntro,
    address: {
      "@type": "PostalAddress",
      addressLocality: town.townName,
      addressRegion: "NY",
      postalCode: town.zip,
      addressCountry: "US",
    },
  };

  // ── Neighborhoods fallback ──────────────────────────────────────────
  const neighborhoods = o.neighborhoods ?? [];

  // ── Local business backfill (small-town hub fallback) ───────────────
  const localPartners = o.partners ?? [];
  const dir = findTownInDirectory(town.slug);
  const hubSlug = dir ? COUNTY_HUB_SLUG[dir.county] : undefined;
  const hubName =
    hubSlug && dir
      ? CAPITAL_DISTRICT_HUB_NAME[hubSlug] ?? hubSlug
      : undefined;
  const hubPartners =
    hubSlug && hubSlug !== town.slug ? townOverrides[hubSlug]?.partners ?? [] : [];
  const needsRegionalBackfill = localPartners.length < 5;
  const partnersForDisplay = needsRegionalBackfill
    ? [...localPartners, ...hubPartners].slice(0, 6)
    : localPartners;
  const partnersHeadline = needsRegionalBackfill
    ? `Local Favorites in & around ${town.townName}.`
    : `Local businesses we love in ${town.townName}.`;
  const partnersSub = needsRegionalBackfill && hubName
    ? `Hand-picked cafés, restaurants, boutiques, and services across ${town.townName} and nearby ${hubName}.`
    : `Cafés, restaurants, boutiques, services, and the people behind them.`;




  return (
    <div className="min-h-screen bg-background text-foreground">
      {(() => {
        const seoTitle = `Living in ${town.townName}, NY | Capital District Nest`;
        const seoDescription = `Explore local businesses, restaurants, services, events, homes, and community updates in ${town.townName}, NY on Capital District Nest.`;
        return (
          <Helmet>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <link rel="canonical" href={url} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <script type="application/ld+json">{JSON.stringify(placeSchema)}</script>
          </Helmet>
        );
      })()}

      <MainHeader />

      {/* ───────── 1. CINEMATIC HERO ───────── */}
      <section className="relative isolate overflow-hidden bg-background text-foreground">
        {/* Background image */}
        <img
          src={o.heroImage}
          alt={`${town.townName}, NY`}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          loading="eager"
        />
        {/* Onyx wash + signature glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background" />
        <div
          className="absolute -top-32 left-1/3 w-[680px] h-[680px] rounded-full blur-[140px] pointer-events-none animate-[townGlowDrift_18s_ease-in-out_infinite]"
          style={{ backgroundColor: accent }}
        />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none bg-[rgba(13,110,102,0.18)] animate-[townGlowDriftAlt_22s_ease-in-out_infinite]" />
        <style>{`
          @keyframes townGlowDrift {
            0%,100% { transform: translate(0,0) scale(1); opacity: 0.85; }
            50%     { transform: translate(40px,30px) scale(1.08); opacity: 1; }
          }
          @keyframes townGlowDriftAlt {
            0%,100% { transform: translate(0,0) scale(1); opacity: 0.7; }
            50%     { transform: translate(-50px,-20px) scale(1.12); opacity: 0.95; }
          }
        `}</style>

        <div className={`relative max-w-6xl mx-auto ${SECTION_PAD}`}>
          <div className="max-w-3xl">
            <p
              className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-8"
              style={{ color: TEAL_DARK }}
            >
              Discover {town.townName}
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.035em] leading-[1.02] text-white">
              {o.heroHeadline ?? `Discover ${town.townName}.`}
            </h1>

            <p className="mt-8 text-lg md:text-xl font-light text-white/70 max-w-2xl leading-relaxed">
              {o.heroSub ?? `Explore neighborhoods, local businesses, events, schools, and the rhythm of daily life in ${town.townName}.`}
            </p>

            {/* Inline universal search */}
            <form
              onSubmit={handleTownSearch}
              className="mt-10 flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl px-2 py-2 max-w-xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] focus-within:border-white/20 transition"
            >
              <Search className="w-4 h-4 ml-3 text-white/40 shrink-0" />
              <input
                type="text"
                name="q"
                value={townSearch}
                onChange={(event) => setTownSearch(event.target.value.slice(0, 120))}
                placeholder={`Search ${town.townName} homes, cafés, parks, schools…`}
                className="flex-1 bg-transparent text-[15px] text-white placeholder:text-white/40 px-2 py-2.5 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition shrink-0"
                style={{ backgroundColor: TEAL }}
              >
                Search
              </button>
            </form>

            {/* Premium action chips — glass pills, teal hover glow */}
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { label: `Discover ${town.townName}`, href: "#discover" },
                { label: "Local Businesses", href: "#businesses" },
                { label: "This Week", href: "#changed" },
                { label: "Homes", href: "#homes" },
                { label: "Sports", href: "#sports" },
                { label: "Events", href: "#weekend" },
              ].map((chip) => (
                <a
                  key={chip.label}
                  href={chip.href}
                  className="group inline-flex items-center px-4 py-2 rounded-full text-[13px] font-medium text-white/75 bg-white/[0.04] border border-white/10 backdrop-blur-xl transition-all duration-300 hover:text-white hover:bg-white/[0.07] hover:border-[#5eead4]/40 hover:shadow-[0_0_24px_-4px_rgba(94,234,212,0.35)]"
                >
                  {chip.label}
                </a>
              ))}
            </div>

            {/* Subtle live status line */}
            <div className="mt-5 flex items-center gap-2.5 text-[12px] text-white/40 font-light tracking-[-0.005em]">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inset-0 rounded-full opacity-60 animate-ping"
                  style={{ background: TEAL_DARK }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ background: TEAL_DARK, boxShadow: `0 0 8px ${TEAL_DARK}` }}
                />
              </span>
              <span>Updated today with local events, businesses, listings, and community activity.</span>
            </div>

            {o.heroPulses && o.heroPulses.length > 0 && (
              <HeroMetadataPulse items={o.heroPulses} />
            )}

          </div>

          {/* Callout rail */}
          <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {o.callouts.map((c) => (
              <div key={c.title} className="bg-background/60 backdrop-blur-xl p-8">
                <p
                  className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-3"
                  style={{ color: TEAL_DARK }}
                >
                  {c.title}
                </p>
                <p className="text-white/70 font-light leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 1b. MICRO-INTELLIGENCE RIBBON ───────── */}
      {o.ribbon && o.ribbon.length > 0 && (
        <section className="relative bg-background border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-6 md:px-10 -mt-10 md:-mt-14 relative z-20">
            <div className="rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {o.ribbon.map((r) => (
                  <div key={r.label} className="px-5 py-5 md:py-6">
                    <p
                      className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-2"
                      style={{ color: TEAL_DARK }}
                    >
                      {r.label}
                    </p>
                    <p className="text-lg md:text-xl font-semibold text-white tracking-[-0.01em]">
                      {r.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ───────── 1c. LIVE NOW TICKER (Bloomberg × Apple) ───────── */}
      {o.liveNow && o.liveNow.length > 0 && (
        <div className="mt-12 md:mt-16">
          <LiveNowTicker townName={town.townName} items={o.liveNow} />
        </div>
      )}

      {/* ───────── 2. THIS WEEK IN [TOWN] (habit-forming pulse) ───────── */}
      <div id="pulse">
        <WeeklyFeed
          scope={town.slug}
          eyebrow={`This Week in ${town.townName}`}
          title={`This week in ${town.townName}.`}
          sub="Listings, local activity, businesses, and community updates."
          limit={4}
          compact
        />
      </div>

      {/* ───────── 2b. THIS WEEKEND IN [TOWN] ───────── */}
      {o.thisWeekend && o.thisWeekend.length > 0 && (
        <div id="weekend">
          <ThisWeekendIn townName={town.townName} items={o.thisWeekend} />
        </div>
      )}

      {/* ───────── 2c. WHAT CHANGED THIS WEEK ───────── */}
      {o.changedThisWeek && o.changedThisWeek.length > 0 && (
        <div id="changed">
          <WhatChangedThisWeek
            townName={town.townName}
            items={o.changedThisWeek}
            updatedLabel="Updated 2 hours ago"
          />
        </div>
      )}

      {/* ───────── 3. DISCOVER [TOWN] (modular bento) ───────── */}
      {o.discoverCards && o.discoverCards.length > 0 && (
        <section id="discover" className={`bg-background border-t border-white/[0.06] ${SECTION_PAD}`}>
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-12 md:mb-16">
              <p
                className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: TEAL_DARK }}
              >
                Discover {town.townName}
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
                Discover {town.townName}.
              </h2>
              <p className="mt-5 text-lg font-light text-white/65">
                Explore the places, businesses, neighborhoods, events, and local rhythm that make {town.townName} one of the Capital Region's most desirable communities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {o.discoverCards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-card/40 hover:border-white/20 hover:shadow-[0_0_36px_-8px_rgba(94,234,212,0.35)] transition"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none" />
                  </div>
                  <div className="p-6">
                    <p
                      className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-2"
                      style={{ color: TEAL_DARK }}
                    >
                      {card.eyebrow}
                    </p>
                    <h3 className="text-xl font-semibold text-white tracking-[-0.01em]">{card.title}</h3>
                    <p className="mt-2 text-sm font-light text-white/65 leading-relaxed">{card.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/85 group-hover:text-white">
                      {card.cta} <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ───────── 4. LOCAL BUSINESSES WE LOVE (curated, no directory dump) ───────── */}
      <div id="businesses">
        <TrustedLocalPartners
          townName={town.townName}
          variant="dark"
          eyebrow={needsRegionalBackfill ? `In & around ${town.townName}` : `Featured in ${town.townName}`}
          headline={partnersHeadline}
          sub={partnersSub}
          partners={partnersForDisplay as any}
          showClaimCard
        />
        <BusinessDirectory townSlug={town.slug} title={`${town.townName} local businesses`} embedded />
      </div>

      {/* ───────── 5. SCHOOLS & COMMUNITY ───────── */}
      <section id="schools" className={`bg-background border-t border-white/[0.06] ${SECTION_PAD}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
            <div>
              <p
                className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: TEAL_DARK }}
              >
                Why People Move Here
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
                Why people move to {town.townName}.
              </h2>
              <p className="mt-6 text-lg font-light text-white/65 leading-relaxed">
                The reasons families, professionals, and long-term buyers keep choosing {town.townName}.
              </p>

              <ul className="mt-8 space-y-4">
                {o.whyBullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-white/80">
                    <GraduationCap
                      className="w-4 h-4 mt-1 shrink-0"
                      style={{ color: TEAL_DARK }}
                    />
                    <span className="font-light">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl overflow-hidden aspect-[5/6] border border-white/[0.08] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
              <img
                src={o.whyImage}
                alt={`${town.townName} lifestyle`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 6. HOMES IN [TOWN] ───────── */}
      <section id="homes" className={`bg-background border-t border-white/[0.06] ${SECTION_PAD}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end mb-14">
            <div className="max-w-2xl">
              <p
                className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: TEAL_DARK }}
              >
                Homes in {town.townName}
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
                A market with consistent long-term demand.
              </h2>
              <p className="mt-5 text-lg font-light text-white/65">
                {o.whyCopy}
              </p>
            </div>
            <a
              href={listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition hover:opacity-90 shadow-[0_10px_30px_-10px_rgba(13,110,102,0.6)] shrink-0"
              style={{ backgroundColor: TEAL }}
            >
              View Homes <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Editorial filter pills (curated, not portal) */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {[
              { label: "New This Week", href: listingUrl },
              { label: `Near ${neighborhoods[0] ?? "Town Center"}`, href: listingUrl },
              { label: "Under $600K", href: listingUrl },
              { label: "Larger Lots", href: listingUrl },
              { label: "Investment Potential", href: "/analyze" },
              { label: "Rentals", href: "/rentals" },
            ].map((p, i) => (
              <a
                key={p.label}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border transition ${
                  i === 0
                    ? "bg-white text-black border-white"
                    : "bg-white/[0.04] text-white/75 border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20"
                }`}
              >
                {p.label}
              </a>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] rounded-3xl overflow-hidden border border-white/[0.08]">
            {[
              { label: "Median Price", value: o.stats.medianPrice, note: o.stats.medianNote },
              { label: "Active Listings", value: o.stats.activeListings, note: o.stats.activeNote },
              { label: "Avg. Days on Market", value: o.stats.avgDom, note: o.stats.domNote },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-card/40 backdrop-blur-sm p-9 md:p-10 hover:bg-card/60 transition"
              >
                <p
                  className="text-[11px] font-semibold tracking-[0.22em] uppercase"
                  style={{ color: TEAL_DARK }}
                >
                  {s.label}
                </p>
                <p className="mt-6 text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-white">
                  {s.value}
                </p>
                {s.note && (
                  <p className="mt-3 text-sm text-white/55 font-light">{s.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ───────── 10b. LOCAL SPORTS PULSE ───────── */}
      {o.sports && o.sports.length > 0 && (
        <section className={`bg-background border-t border-white/[0.06] ${SECTION_PAD}`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p
                  className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
                  style={{ color: TEAL_DARK }}
                >
                  Local Sports & Community
                </p>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
                  Sports & activity around {town.townName}.
                </h2>
                <p className="mt-5 text-lg font-light text-white/65">
                  Youth programs, recreation, local athletics, gyms, and community activity across the region.
                </p>
              </div>
              <Trophy className="hidden md:block w-6 h-6 shrink-0" style={{ color: TEAL_DARK }} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {o.sports.map((s) => (
                <div
                  key={s.team}
                  className="group rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm p-5 hover:bg-white/[0.06] hover:border-white/15 transition"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-1.5" style={{ color: TEAL_DARK }}>
                      {s.league}
                    </p>
                    <p className="text-base font-semibold text-white">{s.team}</p>
                    {s.detail && (
                      <p className="mt-1.5 text-sm text-white/60 font-light leading-relaxed">{s.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Community submission CTA row */}
            <div className="mt-10 flex flex-wrap items-center gap-2.5">
              {[
                { label: "Submit Your Team or Program", href: "/contact?topic=team" },
                { label: "Submit a Local Event", href: "/contact?topic=event" },
                { label: "Community Calendar", href: "#pulse" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/80 bg-white/[0.04] border border-white/10 hover:text-white hover:bg-white/[0.07] hover:border-white/20 hover:shadow-[0_0_24px_-4px_rgba(94,234,212,0.35)] transition"
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── 10c. LOCAL FINANCING + BUYER HELP ───────── */}
      {o.financeLinks && o.financeLinks.length > 0 && (
        <section className={`bg-background border-t border-white/[0.06] ${SECTION_PAD}`}>
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p
                className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: TEAL_DARK }}
              >
                Local Buyer Resources
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
                Local buyer resources for {town.townName}.
              </h2>
              <p className="mt-5 text-lg font-light text-white/65">
                Explore local grants, affordability tools, taxes, financing, insurance, and homeownership resources.
              </p>
            </div>

            {(() => {
              const grouped = o.financeLinks.reduce<Record<string, typeof o.financeLinks>>((acc, f) => {
                const key = f.category ?? "Resources";
                (acc[key] ||= []).push(f);
                return acc;
              }, {});
              const categories = Object.keys(grouped);
              const hasCategories = categories.some((c) => c !== "Resources");

              if (!hasCategories) {
                return (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {o.financeLinks.map((f) => (
                      <a
                        key={f.title}
                        href={f.href}
                        target={f.href.startsWith("http") ? "_blank" : undefined}
                        rel={f.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm p-6 hover:bg-white/[0.06] hover:border-white/15 transition flex items-start gap-4"
                      >
                        <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.04]">
                          <Calculator className="w-4 h-4" style={{ color: TEAL_DARK }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-base font-semibold text-white">{f.title}</p>
                            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition" />
                          </div>
                          <p className="mt-1.5 text-sm text-white/60 font-light leading-relaxed">{f.body}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                );
              }

              return (
                <div className="space-y-12">
                  {categories.map((cat) => (
                    <div key={cat}>
                      <p
                        className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5"
                        style={{ color: TEAL_DARK }}
                      >
                        {cat}
                      </p>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {grouped[cat].map((f) => (
                          <a
                            key={f.title}
                            href={f.href}
                            target={f.href.startsWith("http") ? "_blank" : undefined}
                            rel={f.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="group rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm p-5 hover:bg-white/[0.06] hover:border-white/15 transition flex items-start gap-4"
                          >
                            <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.04]">
                              <Calculator className="w-4 h-4" style={{ color: TEAL_DARK }} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-semibold text-white">{f.title}</p>
                                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition" />
                              </div>
                              <p className="mt-1.5 text-xs text-white/60 font-light leading-relaxed">{f.body}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* ───────── 11. FINAL CTA ───────── */}
      <section className={`relative isolate overflow-hidden bg-background ${SECTION_PAD}`}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full blur-[160px] pointer-events-none"
          style={{ backgroundColor: accent }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p
            className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5"
            style={{ color: TEAL_DARK }}
          >
            Ready When You Are
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
            Making a move to {town.townName}?
          </h2>
          <p className="mt-6 text-lg md:text-xl font-light text-white/65">
            Ready to explore {town.townName} with a real local guide? Homes, neighborhoods, schools, businesses, and local insight — instantly.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <AnalystCard
              title={`Explore ${town.townName} with a Local Specialist`}
              description="Homes · Neighborhoods · Schools · Local Insight"
            >
              <button
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.6)] hover:shadow-[0_18px_44px_-10px_rgba(94,234,212,0.55)]"
                style={{ backgroundColor: TEAL }}
              >
                <ArrowRight className="w-4 h-4" /> Connect with a {town.townName} Specialist
              </button>
            </AnalystCard>
            <AnalystCard
              title="Talk to Scott"
              description="Private concierge access · Call · Text · Email · Schedule"
            >
              <button
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-white/[0.04] border border-white/15 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_18px_44px_-10px_rgba(94,234,212,0.45)] transition"
              >
                <Phone className="w-4 h-4" style={{ color: TEAL_DARK }} /> Talk to Scott
              </button>
            </AnalystCard>
          </div>

          {/* Live status indicator */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/55 font-light">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-green-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
            </span>
            Live local support available · usually responds within minutes
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TownPageTemplate;
