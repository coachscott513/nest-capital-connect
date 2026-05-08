import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Phone, Calendar, Sparkles } from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import HeroBand from "@/components/HeroBand";
import BusinessCategoriesGrid from "@/components/town/BusinessCategoriesGrid";
import WeeklyFeed, { WeeklyNewsletterCTA } from "@/components/WeeklyFeed";
import LocalBusinessesDirectory from "@/components/town/LocalBusinessesDirectory";
import TrustedLocalPartners from "@/components/town/TrustedLocalPartners";
import { TownEssentials } from "@/components/town/TownSections";
import { livingInTowns } from "@/data/livingInTowns";

const REMAX_DELMAR = "https://scottalvarez.remax.com/wide.php?city=Delmar";

const LivingInDelmar = () => {
  const town = livingInTowns.delmar;

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/app/living-in-delmar") {
      window.history.replaceState(
        null,
        "",
        "/living-in-delmar" + window.location.search + window.location.hash,
      );
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>What's Happening in Delmar, NY | Homes, Local & Weekly Updates</title>
        <meta
          name="description"
          content="Real estate, local businesses, and community updates in Delmar, NY — refreshed weekly. Homes for sale, market activity, and the businesses locals actually use."
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/living-in-delmar" />
      </Helmet>

      <MainHeader />

      {/* 1 — HERO */}
      <HeroBand
        mood="forest"
        eyebrow="Updated May 7, 2026"
        headline={<>What's Happening<br />in Delmar.</>}
        sub="Real estate, local businesses, and community updates — refreshed weekly."
        ctaLabel="View Homes in Delmar"
        ctaHref={REMAX_DELMAR}
        ctaExternal
      >
        <div className="flex flex-col gap-5">
          <p className="text-[13px] md:text-sm font-medium tracking-[0.08em] text-white/70">
            Updated weekly · Local insights · Real-time market activity
          </p>
          <div>
            <a
              href="#weekly-newsletter"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/15 transition"
            >
              Get Weekly Updates <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </HeroBand>

      {/* 2 — HOMES */}
      <HeroBand
        mood="cream"
        eyebrow="Homes for Sale"
        headline={<>Homes for sale in Delmar, NY.</>}
        sub="2 new listings this week. Live MLS feed, updated continuously."
        ctaLabel="Get new-listing alerts"
        ctaHref="#weekly-newsletter"
        tightBottom
      >
        <div className="rounded-3xl overflow-hidden bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)]">
          <iframe
            src={REMAX_DELMAR}
            title="Delmar Homes for Sale"
            className="w-full h-[720px] border-0"
            loading="lazy"
          />
        </div>
      </HeroBand>

      {/* 3 — WEEKLY FEED (compact, directly under search) */}
      <WeeklyFeed
        scope="delmar"
        eyebrow="The Weekly Feed"
        title="This week in Delmar."
        sub="Listings, sales, openings, and market shifts — refreshed every Friday."
        limit={4}
        compact
      />

      {/* 4 — TRUSTED LOCAL PARTNERS (curated, Apple-style) */}
      <TrustedLocalPartners townName="Delmar" />

      {/* 5 — DELMAR FAVORITES (locked/unlocked business directory) */}
      <LocalBusinessesDirectory
        townName="Delmar"
        eyebrow="Local Directory"
        headline="Delmar Favorites."
        sub="The restaurants, coffee shops, and home services Delmar actually uses."
      />

      {/* 5 — DELMAR SPOTLIGHT */}
      <section className="bg-[#F9FAFB] py-24 md:py-28 px-6 md:px-10 border-y border-[#1d1d1f]/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow-apple text-[#0d6e66] mb-3">Delmar Spotlight</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
              This month's featured business.
            </h2>
          </div>

          <article className="group relative overflow-hidden rounded-3xl border border-foreground/[0.06] bg-[#f5efe4] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)]">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-[4/3] md:aspect-auto bg-gradient-to-br from-[#0d6e66]/15 via-[#c9a449]/15 to-[#0d6e66]/10 flex items-center justify-center">
                <span className="text-7xl md:text-8xl font-semibold text-[#0d6e66]/40 tracking-tight">
                  {town.featuredBusiness.name.charAt(0)}
                </span>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#c9a449]/15 text-[#9a7d2e] text-xs font-semibold mb-5">
                  <Sparkles className="w-3 h-3" /> Featured This Week · {town.featuredBusiness.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] leading-tight">
                  {town.featuredBusiness.name}
                </h3>
                <p className="mt-4 text-lg text-[#1d1d1f]/65 font-light leading-relaxed">
                  {town.featuredBusiness.tagline}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={`tel:${town.featuredBusiness.phone?.replace(/\D/g, "")}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition"
                  >
                    <Phone className="w-4 h-4" /> {town.featuredBusiness.phone}
                  </a>
                  <span className="inline-flex items-center px-5 py-3 rounded-full bg-white/70 text-[#1d1d1f]/70 text-sm font-medium">
                    {town.featuredBusiness.address}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 6 — BUSINESS CATEGORIES */}
      <BusinessCategoriesGrid townName="Delmar" />

      {/* 7 — EVENTS */}
      <section className="bg-[#f5efe4] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow-apple text-[#0d6e66] mb-3">Happening Locally</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
              This week in Delmar.
            </h2>
            <p className="mt-5 text-lg text-[#1d1d1f]/65 font-light">
              Markets, school events, and community gatherings worth your weekend.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {town.events.slice(0, 3).map((e) => (
              <div
                key={e.title}
                className="rounded-2xl bg-white p-7 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.18)] transition-all"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0d6e66]/8 mb-5">
                  <Calendar className="w-5 h-5 text-[#0d6e66]" strokeWidth={1.75} />
                </span>
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[#1d1d1f]">
                  {e.title}
                </h3>
                <p className="mt-2 text-sm text-[#0d6e66] font-medium">{e.date}</p>
                <p className="mt-3 text-[14px] text-[#1d1d1f]/60 font-light leading-relaxed">
                  {e.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — LOCAL ESSENTIALS */}
      <TownEssentials town={town} />

      {/* 9 — EMAIL */}
      <WeeklyNewsletterCTA />

      {/* 10 — FINAL CTA */}
      <section className="bg-white py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow-apple text-[#0d6e66] mb-4">Ready When You Are</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
            Thinking about moving to Delmar?
          </h2>
          <p className="mt-5 text-lg text-[#1d1d1f]/65 font-light">
            Talk to Scott Alvarez — your local Delmar expert at RE/MAX Solutions.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:+15185227265"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#DC1C2E] text-white font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(220,28,46,0.55)]"
            >
              <Phone className="w-4 h-4" /> Talk to Scott
            </a>
            <a
              href={REMAX_DELMAR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white font-semibold hover:opacity-90 transition"
            >
              View Homes <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LivingInDelmar;
