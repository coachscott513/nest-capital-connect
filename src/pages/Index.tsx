import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { localBusinessSchema } from "@/utils/seoSchemas";
import { delmarBusinesses } from "@/data/businesses";

import heroCapital from "@/assets/hero-capital-district.jpg";
import imgDelmar from "@/assets/town-delmar.jpg";
import imgAlbany from "@/assets/town-albany.jpg";
import imgSaratoga from "@/assets/town-saratoga.jpg";
import imgTroy from "@/assets/town-troy.jpg";
import imgSchenectady from "@/assets/town-schenectady.jpg";
import imgCliftonPark from "@/assets/town-clifton-park.jpg";

/* ============================================================
   CAPITAL DISTRICT NEST — HOMEPAGE (Apple-style reboot)
   Full-width hero bands · huge type · 2 CTA links · large visuals
   No dashboards. No glass card stacks. No tile grids.
   ============================================================ */

/* ---------- Reusable primitives ---------- */

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
    {children}
  </p>
);

const Headline = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.035em] leading-[1.02] text-foreground ${className}`}>
    {children}
  </h2>
);

const Subhead = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-xl md:text-2xl text-muted-foreground font-light leading-relaxed ${className}`}>
    {children}
  </p>
);

const CTALinks = ({
  primary,
  secondary,
  light = false,
}: {
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
  light?: boolean;
}) => (
  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-lg font-medium">
    <Link
      to={primary.to}
      className={`inline-flex items-center gap-1.5 ${light ? "text-white" : "text-primary"} hover:underline underline-offset-4`}
    >
      {primary.label} <ArrowRight className="w-4 h-4" />
    </Link>
    <Link
      to={secondary.to}
      className={`inline-flex items-center gap-1.5 ${light ? "text-white/85" : "text-foreground"} hover:underline underline-offset-4`}
    >
      {secondary.label} <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
);

/* ============ SECTION 1 — MAIN HERO ============ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative w-full h-[92vh] min-h-[640px] max-h-[900px]">
        <img
          src={heroCapital}
          alt="Capital District at sunrise"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Soft white wash so type stays Apple-clean */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/55 to-white/90" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-5xl">
            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-semibold tracking-[-0.04em] leading-[0.95] text-foreground">
              Capital District Nest
            </h1>
            <p className="mt-8 text-xl md:text-2xl lg:text-3xl text-foreground/70 font-light max-w-3xl mx-auto leading-snug">
              Explore homes, towns, and market intelligence across New York's Capital District.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-medium">
              <a
                href="#towns"
                className="inline-flex items-center gap-1.5 text-primary hover:underline underline-offset-4"
              >
                Explore Towns <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/homes-for-sale"
                className="inline-flex items-center gap-1.5 text-primary hover:underline underline-offset-4"
              >
                Search Homes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 2 — TOWNS ============ */
const TOWNS = [
  { name: "Delmar", img: imgDelmar, to: "/living-in-delmar", tag: "Bethlehem · Top Schools" },
  { name: "Albany", img: imgAlbany, to: "/albany-real-estate", tag: "Capital City" },
  { name: "Saratoga Springs", img: imgSaratoga, to: "/saratoga-real-estate", tag: "Lifestyle · Resort Town" },
  { name: "Troy", img: imgTroy, to: "/troy-real-estate", tag: "Riverfront · Historic" },
  { name: "Schenectady", img: imgSchenectady, to: "/schenectady-real-estate", tag: "Stockade · Value" },
  { name: "Clifton Park", img: imgCliftonPark, to: "/clifton-park-intelligence", tag: "Family · Suburbs" },
];

function Towns() {
  return (
    <section id="towns" className="bg-background py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <SectionEyebrow>Towns</SectionEyebrow>
          <Headline>Explore the Capital District by town.</Headline>
          <Subhead className="mt-6">Start with the places people search most.</Subhead>
        </div>

        {/* Large image panels — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TOWNS.map((t) => (
            <Link
              key={t.name}
              to={t.to}
              className="group relative block overflow-hidden rounded-3xl aspect-[4/5] bg-muted"
            >
              <img
                src={t.img}
                alt={`${t.name}, NY`}
                loading="lazy"
                width={1600}
                height={2000}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 p-7 md:p-9 flex flex-col justify-end text-white">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/80 mb-2">
                  {t.tag}
                </p>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">{t.name}</h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white/90">
                  Explore {t.name} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 3 — ANALYZE ============ */
function Analyze() {
  return (
    <section className="bg-[hsl(var(--muted))] py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
        <SectionEyebrow>Property Intelligence</SectionEyebrow>
        <Headline>Analyze any property.</Headline>
        <Subhead className="mt-6 max-w-2xl mx-auto">
          Understand monthly cost, cash flow, taxes, and long-term value before you make a move.
        </Subhead>
        <CTALinks
          primary={{ label: "Analyze a Property", to: "/investment-analyzer" }}
          secondary={{ label: "Learn More", to: "/intelligence" }}
        />

        {/* Clean product mockup — single device-style card, not a working form */}
        <div className="mt-20 md:mt-24 mx-auto max-w-4xl">
          <div className="rounded-[28px] bg-background shadow-[0_40px_120px_-30px_rgba(15,23,42,0.25)] border border-border overflow-hidden text-left">
            <div className="px-6 md:px-10 py-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">capitaldistrictnest.com / analyze</p>
              <span className="w-12" />
            </div>
            <div className="p-8 md:p-12">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">Property Report</p>
              <p className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                137A Elsmere Ave · Delmar, NY
              </p>
              <p className="text-muted-foreground mt-1">2-Family · Listed at $389,000</p>

              <div className="mt-10 grid grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
                {[
                  { l: "Monthly Cash Flow", v: "+$612" },
                  { l: "Cap Rate", v: "7.2%" },
                  { l: "5-Year Value", v: "$486K" },
                ].map((s) => (
                  <div key={s.l} className="bg-background px-5 py-7 text-center">
                    <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">{s.l}</p>
                    <p className="text-2xl md:text-3xl font-semibold text-foreground mt-2 tracking-tight">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 4 — HOMES ============ */
function Homes() {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
        <SectionEyebrow>Listings</SectionEyebrow>
        <Headline>Search homes across the Capital District.</Headline>
        <Subhead className="mt-6 max-w-2xl mx-auto">
          Browse listings by town, property type, and market.
        </Subhead>
        <div className="mt-10">
          <Link
            to="/homes-for-sale"
            className="inline-flex items-center gap-1.5 text-lg font-medium text-primary hover:underline underline-offset-4"
          >
            Search Homes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 5 — MARKET INTELLIGENCE ============ */
function Intelligence() {
  return (
    <section className="relative bg-foreground text-background py-28 md:py-40 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center relative z-10">
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-background/50 mb-4">
          Market Intelligence
        </p>
        <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.035em] leading-[1.02]">
          Know what's changing locally.
        </h2>
        <p className="mt-6 text-xl md:text-2xl text-background/70 font-light leading-relaxed max-w-2xl mx-auto">
          Weekly town updates, new listings, price movement, and local insight.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-medium">
          <Link
            to="/living-in-delmar"
            className="inline-flex items-center gap-1.5 text-background hover:underline underline-offset-4"
          >
            View Delmar This Week <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/intelligence"
            className="inline-flex items-center gap-1.5 text-background/70 hover:underline underline-offset-4"
          >
            All Towns <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 6 — BUSINESSES ============ */
function Businesses() {
  const featured = delmarBusinesses.slice(0, 3);
  return (
    <section className="bg-background py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionEyebrow>Local Businesses</SectionEyebrow>
          <Headline>Discover local businesses.</Headline>
          <Subhead className="mt-6">
            Restaurants, coffee shops, home services, and local professionals featured by town.
          </Subhead>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((b) => (
            <Link
              key={b.slug}
              to={`/business/${b.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-muted mb-5">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--accent))]/15 via-[hsl(var(--primary))]/10 to-[hsl(var(--muted))]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-semibold tracking-tight text-foreground/20">
                    {b.name.split(" ").map(w => w[0]).slice(0,2).join("")}
                  </span>
                </div>
              </div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-1.5">
                {b.category} · Delmar
              </p>
              <h3 className="text-2xl font-semibold text-foreground tracking-tight">{b.name}</h3>
              <p className="text-muted-foreground mt-1.5 leading-relaxed">{b.tagline}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                View Details <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/living-in-delmar#businesses"
            className="inline-flex items-center gap-1.5 text-lg font-medium text-primary hover:underline underline-offset-4"
          >
            Explore Delmar Businesses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 7 — EMAIL SIGNUP ============ */
function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  return (
    <section className="bg-[hsl(var(--muted))] py-28 md:py-36">
      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <SectionEyebrow>Weekly Updates</SectionEyebrow>
        <Headline>Get weekly Capital District updates.</Headline>
        <Subhead className="mt-6">
          Town updates, listings, market changes, and local highlights.
        </Subhead>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setStatus("ok");
          }}
          className="mt-12 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 h-14 px-5 rounded-full bg-background border border-border text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="submit"
            className="h-14 px-8 rounded-full bg-foreground text-background font-semibold text-base hover:bg-foreground/85 transition-colors"
          >
            Subscribe
          </button>
        </form>
        {status === "ok" && (
          <p className="mt-4 text-sm text-muted-foreground">Thanks — you'll hear from us this week.</p>
        )}
      </div>
    </section>
  );
}

/* ============ PAGE ============ */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Capital District Nest — Homes, Towns & Market Intelligence in Upstate NY"
        description="Explore homes, towns, and market intelligence across New York's Capital District. Delmar, Albany, Saratoga, Troy, Schenectady, Clifton Park."
        canonical="https://www.capitaldistrictnest.com/"
        structuredData={localBusinessSchema}
      />
      <CleanHeader />
      <main>
        <Hero />
        <Towns />
        <Analyze />
        <Homes />
        <Intelligence />
        <Businesses />
        <EmailSignup />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
