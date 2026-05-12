import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import WeeklyFeed from "@/components/WeeklyFeed";
import TrustedLocalPartners from "@/components/town/TrustedLocalPartners";
import type { LivingInTown } from "@/data/livingInTowns";
import { getTownOverride } from "@/data/townOverrides";

interface Props {
  town: LivingInTown;
}

// Apple-style locked palette
const TEAL = "#0d6e66";
const TEAL_DARK = "#5eead4";

const SECTION_PAD = "py-24 md:py-32 px-6 md:px-10";

/**
 * Master town-page template.
 * Drives every /living-in/{slug} page with the same Apple-style 7-section structure.
 * Town-specific imagery / callouts / stats live in src/data/townOverrides.ts.
 */
const TownPageTemplate = ({ town }: Props) => {
  const o = getTownOverride(town.slug);
  const url = `https://www.capitaldistrictnest.com/living-in/${town.slug}`;
  const listingUrl = town.listingSearchUrl;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [town.slug]);

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{town.seoTitle}</title>
        <meta name="description" content={town.seoDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={town.seoTitle} />
        <meta property="og:description" content={town.seoDescription} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(placeSchema)}</script>
      </Helmet>

      <MainHeader />

      {/* 1 — HERO (DARK) */}
      <section className="relative isolate overflow-hidden bg-[#0e0f12] text-white">
        <img
          src={o.heroImage}
          alt={`${town.townName}, NY`}
          className="absolute inset-0 w-full h-full object-cover opacity-55"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0f12]/60 via-[#0e0f12]/55 to-[#0e0f12]/85" />

        <div className={`relative max-w-6xl mx-auto ${SECTION_PAD}`}>
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center min-h-[60vh]">
            <div>
              <p
                className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-6"
                style={{ color: TEAL_DARK }}
              >
                {town.townName}, New York
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.02]">
                Living in {town.townName}.
              </h1>
              <p className="mt-6 text-lg md:text-xl font-light text-white/75 max-w-lg leading-relaxed">
                {town.seoIntro}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href={listingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.6)] hover:opacity-90"
                  style={{ backgroundColor: TEAL }}
                >
                  View Homes <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#weekly"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 transition"
                >
                  Get Weekly Updates
                </a>
              </div>
            </div>

            <div className="md:pl-8 md:border-l md:border-white/10">
              <ul className="space-y-8">
                {o.callouts.map((c) => (
                  <li key={c.title}>
                    <p
                      className="text-xs font-semibold tracking-[0.18em] uppercase mb-2"
                      style={{ color: TEAL_DARK }}
                    >
                      {c.title}
                    </p>
                    <p className="text-white/70 font-light">{c.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — HOMES FOR SALE (LIGHT) — compact search preview, matches /homes */}
      <section className={`bg-white ${SECTION_PAD}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
            <p
              className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
              style={{ color: TEAL }}
            >
              Homes for Sale
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
              Homes for Sale in {town.townName}.
            </h2>
            <p className="mt-5 text-lg text-[#1d1d1f]/65 font-light">
              Browse active listings and recent market activity in {town.townName}.
            </p>
          </div>

          <form
            action={listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-white border border-[#1d1d1f]/[0.08] shadow-[0_18px_48px_-24px_rgba(0,0,0,0.18)] p-2.5 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_auto] gap-2"
          >
            <div className="flex flex-col gap-1 px-4 py-3 rounded-xl bg-[#1d1d1f]/[0.03]">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: TEAL }}>Town</span>
              <span className="text-[15px] text-[#1d1d1f] font-medium">{town.townName}</span>
            </div>
            <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition border-t md:border-t-0 md:border-l border-[#1d1d1f]/[0.06]">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: TEAL }}>Price</span>
              <select name="price" className="w-full bg-transparent text-[15px] text-[#1d1d1f] focus:outline-none cursor-pointer">
                <option value="">Any price</option>
                <option>Under $300K</option>
                <option>$300K – $500K</option>
                <option>$500K – $750K</option>
                <option>$750K – $1M</option>
                <option>$1M+</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition border-t md:border-t-0 md:border-l border-[#1d1d1f]/[0.06]">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: TEAL }}>Type</span>
              <select name="type" className="w-full bg-transparent text-[15px] text-[#1d1d1f] focus:outline-none cursor-pointer">
                <option value="">All types</option>
                <option>Single-Family</option>
                <option>Multifamily</option>
                <option>Condo / Townhome</option>
                <option>Land</option>
              </select>
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.55)]"
              style={{ backgroundColor: TEAL }}
            >
              Search Homes <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <a
              href={listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#1d1d1f]/10 text-sm text-[#1d1d1f] hover:border-[#0d6e66]/35 hover:text-[#0d6e66] transition"
            >
              View all {town.townName} homes
            </a>
            <a
              href="#weekly"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#1d1d1f]/10 text-sm text-[#1d1d1f] hover:border-[#0d6e66]/35 hover:text-[#0d6e66] transition"
            >
              Get listing alerts
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#1d1d1f]/10 text-sm text-[#1d1d1f] hover:border-[#0d6e66]/35 hover:text-[#0d6e66] transition"
            >
              Talk to Scott
            </a>
          </div>
          <p className="mt-4 text-center text-xs text-[#1d1d1f]/50">Live MLS via RE/MAX</p>
        </div>
      </section>

      {/* 3 — TRUSTED LOCAL BUSINESSES (DARK) — high priority on town pages */}
      <TrustedLocalPartners
        townName={town.townName}
        variant="dark"
        eyebrow={`Trusted Local Businesses in ${town.townName}`}
        headline={`Trusted local businesses in ${town.townName}.`}
        sub={`Restaurants, lenders, attorneys, contractors, and local services connected to the ${town.townName} community.`}
      />

      {/* 3.5 — BUSINESS SEARCH (LIGHT) — town-scoped */}
      <section className="bg-[#faf8f3] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3" style={{ color: TEAL }}>
              Search Local Businesses
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.1]">
              Search businesses in {town.townName}.
            </h2>
          </div>

          <form
            action="/local"
            method="get"
            className="rounded-2xl bg-white border border-[#1d1d1f]/[0.08] shadow-[0_18px_48px_-24px_rgba(0,0,0,0.18)] p-2.5 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_auto] gap-2"
          >
            <input type="hidden" name="town" value={town.slug} />
            <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: TEAL }}>Keyword</span>
              <input
                name="q"
                type="text"
                placeholder={`e.g. coffee, lender, attorney`}
                className="w-full bg-transparent text-[15px] text-[#1d1d1f] placeholder:text-[#1d1d1f]/45 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition border-t md:border-t-0 md:border-l border-[#1d1d1f]/[0.06]">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: TEAL }}>Category</span>
              <select name="category" className="w-full bg-transparent text-[15px] text-[#1d1d1f] focus:outline-none cursor-pointer">
                <option value="">All categories</option>
                <option>Restaurant</option>
                <option>Coffee</option>
                <option>Bakery</option>
                <option>Mortgage</option>
                <option>Real Estate Attorney</option>
                <option>Roofer</option>
                <option>HVAC</option>
                <option>Local Services</option>
              </select>
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.55)]"
              style={{ backgroundColor: TEAL }}
            >
              Search <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href={`/local?town=${town.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition"
              style={{ color: TEAL }}
            >
              View all businesses in {town.townName} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 3 — MARKET SNAPSHOT (DARK) */}
      <section className={`bg-[#0e0f12] text-white ${SECTION_PAD}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 md:mb-16 max-w-2xl">
            <p
              className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
              style={{ color: TEAL_DARK }}
            >
              Market Snapshot
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05]">
              The {town.townName} market, at a glance.
            </h2>
            <p className="mt-5 text-lg font-light text-white/65">
              Inventory, pricing, and activity across {town.townName}.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { label: "Median Price", value: o.stats.medianPrice, note: o.stats.medianNote },
              { label: "Active Listings", value: o.stats.activeListings, note: o.stats.activeNote },
              { label: "Avg. Days on Market", value: o.stats.avgDom, note: o.stats.domNote },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-3xl bg-white/[0.04] border border-white/10 p-9 md:p-10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] hover:bg-white/[0.06] transition"
              >
                <p
                  className="text-[11px] font-semibold tracking-[0.22em] uppercase"
                  style={{ color: TEAL_DARK }}
                >
                  {s.label}
                </p>
                <p className="mt-6 text-5xl md:text-6xl font-semibold tracking-[-0.03em]">
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

      {/* 4 — WHY (LIGHT) */}
      <section className={`bg-white ${SECTION_PAD}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p
                className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: TEAL }}
              >
                Why {town.townName}
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
                {o.whyHeadline ?? `Why people choose ${town.townName}.`}
              </h2>
              <p className="mt-6 text-lg text-[#1d1d1f]/65 font-light leading-relaxed">
                {o.whyCopy}
              </p>

              <ul className="mt-8 space-y-3">
                {o.whyBullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[#1d1d1f]/80">
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: TEAL }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[5/6] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]">
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

      {/* (Trusted Local Businesses moved up — section 3) */}

      {/* 6 — THIS WEEK (LIGHT) */}
      <div id="weekly">
        <WeeklyFeed
          scope={town.slug}
          eyebrow={`This Week in ${town.townName}`}
          title={`This week in ${town.townName}.`}
          sub="Listings, local activity, businesses, and community updates."
          limit={4}
          compact
        />
      </div>

      {/* 7 — FINAL CTA (DARK) */}
      <section className={`bg-[#0e0f12] text-white ${SECTION_PAD}`}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5"
            style={{ color: TEAL_DARK }}
          >
            Ready When You Are
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.05]">
            Thinking about buying in {town.townName}?
          </h2>
          <p className="mt-6 text-lg md:text-xl font-light text-white/65">
            Talk with Scott Alvarez about homes, neighborhoods, and market
            opportunities in {town.townName}.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.6)]"
              style={{ backgroundColor: TEAL }}
            >
              <Calendar className="w-4 h-4" /> Schedule a Showing
            </a>
            <a
              href="tel:+15185227265"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(220,28,46,0.55)]"
              style={{ backgroundColor: "#DC1C2E" }}
            >
              <Phone className="w-4 h-4" /> Talk to Scott
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TownPageTemplate;
