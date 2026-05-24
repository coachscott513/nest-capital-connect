import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Phone,
  Calendar,
  Search,
  GraduationCap,
  Coffee,
  Users,
  Sunrise,
  Car,
} from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import WeeklyFeed from "@/components/WeeklyFeed";
import TrustedLocalPartners from "@/components/town/TrustedLocalPartners";
import LocalBusinessesDirectory from "@/components/town/LocalBusinessesDirectory";
import MorningPulse from "@/components/town/MorningPulse";
import TownProjects from "@/components/town/TownProjects";
import LocalHeroes from "@/components/town/LocalHeroes";
import type { LivingInTown } from "@/data/livingInTowns";
import { getTownOverride } from "@/data/townOverrides";

interface Props {
  town: LivingInTown;
}

// Locked brand palette
const TEAL = "#0d6e66";
const TEAL_DARK = "#5eead4";

const SECTION_PAD = "py-24 md:py-32 px-6 md:px-10";

/**
 * MASTER TOWN TEMPLATE
 * Single dark onyx canvas. Apple × Bloomberg × Architectural Digest feel.
 * Powers every /living-in/{slug} page. Town-specific copy / imagery / feel
 * lives in src/data/townOverrides.ts.
 */
const TownPageTemplate = ({ town }: Props) => {
  const o = getTownOverride(town.slug);
  const url = `https://www.capitaldistrictnest.com/living-in/${town.slug}`;
  const listingUrl = town.listingSearchUrl;
  const accent = o.accentGlow ?? "rgba(94,234,212,0.22)";

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

  // ── Default editorial "feel" fallback ───────────────────────────────
  const feel = o.feel ?? {
    morning: `Quiet mornings, neighborhood coffee, the slow rhythm of ${town.townName}.`,
    families: `${town.schoolDistrict}, local parks, and a community built around families.`,
    weekends: `Farmers markets, local dining, and seasonal community events.`,
    commute: `Easy regional access to Albany, the Northway, and beyond.`,
  };

  const neighborhoods = o.neighborhoods ?? [];

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
          className="absolute -top-32 left-1/3 w-[680px] h-[680px] rounded-full blur-[140px] pointer-events-none"
          style={{ backgroundColor: accent }}
        />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none bg-[rgba(13,110,102,0.18)]" />

        <div className={`relative max-w-6xl mx-auto ${SECTION_PAD}`}>
          <div className="max-w-3xl">
            <p
              className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-8"
              style={{ color: TEAL_DARK }}
            >
              Living in {town.townName}
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.035em] leading-[1.02] text-white">
              {o.heroHeadline ?? `Living in ${town.townName}.`}
            </h1>

            <p className="mt-8 text-lg md:text-xl font-light text-white/70 max-w-2xl leading-relaxed">
              {o.heroSub ?? town.seoIntro}
            </p>

            {/* Inline universal search */}
            <form
              action={listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl px-2 py-2 max-w-xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] focus-within:border-white/20 transition"
            >
              <Search className="w-4 h-4 ml-3 text-white/40 shrink-0" />
              <input
                type="text"
                name="q"
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

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/55">
              <a href="#pulse" className="hover:text-white transition">The Pulse</a>
              <span className="text-white/15">·</span>
              <a href="#feel" className="hover:text-white transition">The Feel</a>
              <span className="text-white/15">·</span>
              <a href="#homes" className="hover:text-white transition">Homes</a>
              <span className="text-white/15">·</span>
              <a href="#schools" className="hover:text-white transition">Schools</a>
              <span className="text-white/15">·</span>
              <a href="#businesses" className="hover:text-white transition">Businesses</a>
            </div>
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

      {/* ───────── 2. THE [TOWN] PULSE ───────── */}
      <div id="pulse">
        <MorningPulse townName={town.townName} />
      </div>

      {/* ───────── 3. THE FEEL OF [TOWN] ───────── */}
      <section id="feel" className={`bg-background ${SECTION_PAD}`}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16 md:mb-20">
            <p
              className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
              style={{ color: TEAL_DARK }}
            >
              The Feel of {town.townName}
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
              What it feels like to live here.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/[0.06] rounded-3xl overflow-hidden border border-white/[0.08]">
            {[
              { icon: Sunrise, label: "Mornings", body: feel.morning },
              { icon: Users, label: "Families & Schools", body: feel.families },
              { icon: Coffee, label: "Weekends", body: feel.weekends },
              { icon: Car, label: "Commute", body: feel.commute },
            ].map(({ icon: Icon, label, body }) => (
              <div
                key={label}
                className="bg-card/40 backdrop-blur-sm p-10 md:p-14 hover:bg-card/60 transition"
              >
                <Icon className="w-5 h-5 mb-6" style={{ color: TEAL_DARK }} />
                <p
                  className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
                  style={{ color: TEAL_DARK }}
                >
                  {label}
                </p>
                <p className="text-xl md:text-2xl font-light text-white/85 leading-relaxed tracking-[-0.005em]">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 4. HOMES IN [TOWN] ───────── */}
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

      {/* ───────── 5. SCHOOLS & COMMUNITY ───────── */}
      <section id="schools" className={`bg-background border-t border-white/[0.06] ${SECTION_PAD}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
            <div>
              <p
                className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: TEAL_DARK }}
              >
                Schools & Community
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
                Why families plant roots here.
              </h2>
              <p className="mt-6 text-lg font-light text-white/65 leading-relaxed">
                {town.schoolDistrict} anchors {town.townName} — alongside neighborhood parks, the local library, and a youth-sports culture that brings families together every weekend.
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

      {/* ───────── 6. NEIGHBORHOOD EXPLORER ───────── */}
      {neighborhoods.length > 0 && (
        <section className={`bg-background border-t border-white/[0.06] ${SECTION_PAD}`}>
          <div className="max-w-5xl mx-auto text-center">
            <p
              className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
              style={{ color: TEAL_DARK }}
            >
              Neighborhoods
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
              Explore {town.townName} by neighborhood.
            </h2>
            <p className="mt-5 text-lg font-light text-white/60 max-w-xl mx-auto">
              From the village center to the quieter edges — every pocket of {town.townName} has its own character.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {neighborhoods.map((n) => (
                <span
                  key={n}
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white/80 text-sm font-medium hover:bg-white/[0.08] hover:border-white/20 transition cursor-default"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── 7. TRUSTED LOCAL BUSINESSES ───────── */}
      <div id="businesses">
        <TrustedLocalPartners
          townName={town.townName}
          variant="dark"
          eyebrow={`Featured in ${town.townName}`}
          headline={`Local businesses we love in ${town.townName}.`}
          sub={`Cafés, restaurants, boutiques, services, and the people behind them.`}
        />
      </div>

      {/* ───────── 8. FULL DIRECTORY ───────── */}
      <LocalBusinessesDirectory townName={town.townName} />

      {/* ───────── 9. PROJECTS + HEROES ───────── */}
      <TownProjects townName={town.townName} />
      <LocalHeroes townName={town.townName} />

      {/* ───────── 10. THIS WEEK ───────── */}
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
            Thinking about life in {town.townName}?
          </h2>
          <p className="mt-6 text-lg md:text-xl font-light text-white/65">
            Talk with Scott Alvarez about homes, neighborhoods, and what daily
            life is really like in {town.townName}.
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
