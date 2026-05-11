import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import WeeklyFeed from "@/components/WeeklyFeed";
import TrustedLocalPartners from "@/components/town/TrustedLocalPartners";

const REMAX_DELMAR = "https://scottalvarez.remax.com/wide.php?city=Delmar";

// Apple-style locked palette
const DARK = "#0e0f12";
const TEAL = "#0d6e66";
const TEAL_DARK = "#5eead4";

const HERO_IMG =
  "https://images.unsplash.com/photo-1605146768851-eda79da39897?auto=format&fit=crop&w=2400&q=80";
const WHY_IMG =
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1800&q=80";

const SECTION_PAD = "py-24 md:py-32 px-6 md:px-10";

const LivingInDelmar = () => {
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

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: "Delmar, NY",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delmar",
      addressRegion: "NY",
      postalCode: "12054",
      addressCountry: "US",
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Living in Delmar, NY | Homes, Schools & Local Guide</title>
        <meta
          name="description"
          content="Homes for sale in Delmar, NY. Bethlehem Central schools, market activity, trusted local partners, and weekly community updates."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/living-in-delmar" />
        <script type="application/ld+json">{JSON.stringify(placeSchema)}</script>
      </Helmet>

      <MainHeader />

      {/* 1 — HERO (DARK) */}
      <section className="relative isolate overflow-hidden bg-[#0e0f12] text-white">
        <img
          src={HERO_IMG}
          alt="Tree-lined neighborhood street in Delmar, NY"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0f12]/60 via-[#0e0f12]/55 to-[#0e0f12]/85" />

        <div className={`relative max-w-6xl mx-auto ${SECTION_PAD}`}>
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center min-h-[60vh]">
            {/* Left */}
            <div>
              <p
                className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-6"
                style={{ color: TEAL_DARK }}
              >
                Delmar, New York
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.02]">
                Living in Delmar.
              </h1>
              <p className="mt-6 text-lg md:text-xl font-light text-white/75 max-w-lg leading-relaxed">
                Quiet streets, strong schools, and one of the Capital District&rsquo;s
                most desirable communities.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href={REMAX_DELMAR}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.6)] hover:opacity-90"
                  style={{ backgroundColor: TEAL }}
                >
                  View Delmar Homes <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#weekly"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 transition"
                >
                  Get Weekly Updates
                </a>
              </div>
            </div>

            {/* Right — 3 callouts */}
            <div className="md:pl-8 md:border-l md:border-white/10">
              <ul className="space-y-8">
                {[
                  { t: "Bethlehem Central Schools", s: "Top-rated K–12 district." },
                  { t: "10 Minutes to Albany", s: "Easy commute to downtown." },
                  { t: "Strong Residential Demand", s: "Homes move fast year-round." },
                ].map((c) => (
                  <li key={c.t}>
                    <p
                      className="text-xs font-semibold tracking-[0.18em] uppercase mb-2"
                      style={{ color: TEAL_DARK }}
                    >
                      {c.t}
                    </p>
                    <p className="text-white/70 font-light">{c.s}</p>
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
              Homes for Sale in Delmar.
            </h2>
            <p className="mt-5 text-lg text-[#1d1d1f]/65 font-light">
              Browse active listings and recent market activity in Delmar.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)] border border-[#1d1d1f]/[0.06]">
            <iframe
              src={REMAX_DELMAR}
              title="Delmar Homes for Sale"
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
              The Delmar market, at a glance.
            </h2>
            <p className="mt-5 text-lg font-light text-white/65">
              Inventory, pricing, and activity across Delmar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { label: "Median Price", value: "$485K", note: "Up 4.2% YoY" },
              { label: "Active Listings", value: "12", note: "As of this week" },
              { label: "Avg. Days on Market", value: "8", note: "Strong demand" },
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
                <p className="mt-3 text-sm text-white/55 font-light">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — WHY DELMAR (LIGHT) */}
      <section className={`bg-white ${SECTION_PAD}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p
                className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: TEAL }}
              >
                Why Delmar
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
                Why people choose Delmar.
              </h2>
              <p className="mt-6 text-lg text-[#1d1d1f]/65 font-light leading-relaxed">
                Delmar combines suburban comfort, strong schools, and easy access to
                Albany — a community where families stay for decades.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Tree-lined neighborhoods",
                  "Bethlehem Central schools",
                  "Local dining at Four Corners",
                  "10-minute Albany commute",
                ].map((b) => (
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
                src={WHY_IMG}
                alt="Suburban Delmar lifestyle"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5 — TRUSTED LOCAL PARTNERS (DARK) */}
      <TrustedLocalPartners
        townName="Delmar"
        variant="dark"
        sub="Recommended lenders, attorneys, and local services connected to the Delmar community."
        partners={undefined /* uses default 4; first 3 are the requested core trio */}
      />

      {/* 6 — THIS WEEK IN DELMAR (LIGHT) */}
      <div id="weekly">
        <WeeklyFeed
          scope="delmar"
          eyebrow="This Week in Delmar"
          title="This week in Delmar."
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
            Thinking about buying in Delmar?
          </h2>
          <p className="mt-6 text-lg md:text-xl font-light text-white/65">
            Talk with Scott Alvarez about homes, neighborhoods, and market
            opportunities in Delmar.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={REMAX_DELMAR}
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

export default LivingInDelmar;
