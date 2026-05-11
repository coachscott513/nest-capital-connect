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
 * Drives every /living-in-{slug} page with the same Apple-style 7-section structure.
 * Town-specific imagery / callouts / stats live in src/data/townOverrides.ts.
 */
const TownPageTemplate = ({ town }: Props) => {
  const o = getTownOverride(town.slug);
  const url = `https://www.capitaldistrictnest.com/living-in-${town.slug}`;
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

      {/* 2 — HOMES FOR SALE (LIGHT) */}
      <section className={`bg-white ${SECTION_PAD}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-2xl">
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

          <div className="rounded-3xl overflow-hidden bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)] border border-[#1d1d1f]/[0.06]">
            <iframe
              src={town.listingEmbedUrl ?? listingUrl}
              title={`${town.townName} Homes for Sale`}
              className="w-full h-[720px] border-0"
              loading="lazy"
            />
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

      {/* 5 — TRUSTED LOCAL PARTNERS (DARK) */}
      <TrustedLocalPartners
        townName={town.townName}
        variant="dark"
        sub={`Recommended lenders, attorneys, and local services connected to the ${town.townName} community.`}
      />

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
