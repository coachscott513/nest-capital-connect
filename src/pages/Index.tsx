import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import BrandHero from "@/components/BrandHero";
import PropertyTypeBand from "@/components/PropertyTypeBand";
import CinematicHero from "@/components/CinematicHero";
import FinancingBand from "@/components/FinancingBand";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Capital District Nest | Albany NY Real Estate Investment Intelligence"
        description="Albany's hyperlocal real estate platform. Search homes, analyze any property, and track market trends across the Capital District. Updated daily."
        keywords="Capital District real estate, Albany homes for sale, property analysis Albany NY, real estate investment, Troy real estate, Schenectady homes, Saratoga Springs"
        canonical="https://www.capitaldistrictnest.com"
        ogImage="https://www.capitaldistrictnest.com/og-image-capital-district.jpg"
        ogType="website"
      />

      <CleanHeader />

      {/* BRAND HERO — identity first */}
      <BrandHero />

      {/* PROPERTY TYPE BAND — choose your lane */}
      <PropertyTypeBand />

      {/* FINANCING BAND — understand your options */}
      <FinancingBand />

      {/* ANALYZER HERO — product third */}
      <CinematicHero />

      {/* ANALYZER FEATURE SECTION */}
      <section className="py-28 md:py-36 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-6">Property Intelligence</p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.08] mb-8">
            Everything you need to<br className="hidden md:block" /> understand a property
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
            Compare value, rent potential, investment returns, and local context — all in one analysis.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mb-20">
          {[
            { title: "Cash Flow & Returns", desc: "Analyze cash flow, cap rate, rent potential, and investment scenarios." },
            { title: "Value & Equity", desc: "Understand value trends, pricing position, and potential equity." },
            { title: "Local Intelligence", desc: "Connect property decisions to neighborhood and market context." },
          ].map((item) => (
            <div key={item.title} className="text-center md:text-left">
              <h3 className="font-semibold text-lg text-foreground mb-3 tracking-tight">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6">
          <Link to="/analyze" className="inline-flex items-center gap-2.5 bg-foreground text-background px-8 py-4 rounded-full font-semibold hover:bg-foreground/85 transition-colors">
            Analyze a Property <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/dealdesk" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
            Request a Review →
          </Link>
        </div>
      </section>

      {/* TOWNS & MARKETS */}
      <section className="py-28 md:py-36 px-6 bg-secondary/40">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-6">Local Coverage</p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.08] mb-8">
            Explore the Capital District<br className="hidden md:block" /> town by town
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-light">
            Each town analyzed independently with its own market behavior and patterns.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: "Albany", slug: "albany" },
            { name: "Troy", slug: "troy" },
            { name: "Schenectady", slug: "schenectady" },
            { name: "Saratoga Springs", slug: "saratoga-springs" },
            { name: "Clifton Park", slug: "clifton-park" },
            { name: "Delmar", slug: "delmar" },
            { name: "Guilderland", slug: "guilderland" },
            { name: "Queensbury", slug: "queensbury" },
          ].map((town) => (
            <Link
              key={town.slug}
              to={`/towns/${town.slug}`}
              className="group py-5 px-6 rounded-2xl hover:bg-card transition-all duration-300"
            >
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors tracking-tight">{town.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">View insights →</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-14">
          <Link to="/communities" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
            Browse all towns →
          </Link>
        </div>
      </section>

      {/* FIRST-TIME BUYERS */}
      <section className="py-28 md:py-36 px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-6">For Buyers</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-5 leading-tight">
            First-Time Buyer Guidance,<br className="hidden md:block" /> Without the Noise
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10 max-w-xl">
            Low-down-payment options, grants, local insights, and practical guidance for your first purchase.
          </p>
          <Link
            to="/first-time-homebuyers"
            className="inline-flex items-center gap-2.5 bg-foreground text-background px-8 py-4 rounded-full font-semibold hover:bg-foreground/85 transition-colors"
          >
            Explore Programs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SELLERS */}
      <section className="py-28 md:py-36 px-6 bg-secondary/40">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-6">For Sellers</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-5 leading-tight">
            A Smarter Way to Think About Selling
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Use data, pricing insight, and local strategy to understand your next move.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dealdesk"
              className="inline-flex items-center gap-2.5 bg-foreground text-background px-8 py-4 rounded-full font-semibold hover:bg-foreground/85 transition-colors"
            >
              Get a Property Review <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/sell-investment-property"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Explore seller options →
            </Link>
          </div>
        </div>
      </section>

      {/* INVESTORS */}
      <section className="py-28 md:py-36 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-6">For Investors</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-5 leading-tight">
                Investment Property Intelligence
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10">
                Multi-unit, rehab, rental, off-market analysis, and value-add thinking — backed by local data.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  to="/analyze"
                  className="inline-flex items-center gap-2.5 bg-foreground text-background px-8 py-4 rounded-full font-semibold hover:bg-foreground/85 transition-colors"
                >
                  Analyze a Property <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/investor-tools"
                  className="text-muted-foreground hover:text-foreground font-medium py-4 transition-colors"
                >
                  View investor tools →
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="space-y-8">
                {[
                  { label: "Towns Covered", value: "52+" },
                  { label: "Data Sources", value: "MLS + Tax + Market" },
                  { label: "Analysis Types", value: "7 Property Categories" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-baseline justify-between border-b border-border pb-6">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <span className="text-lg font-semibold text-foreground">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREDIBILITY */}
      <section className="py-28 md:py-36 px-6 bg-secondary/40">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-8 leading-tight">
            Built different. On purpose.
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl mx-auto mb-16">
            No scraped estimates. No AI guesses. Real data, verified locally.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16 text-left max-w-2xl mx-auto">
            {[
              { title: "Verified data sources", desc: "Tax records, MLS activity, and market trends — combined for the full picture." },
              { title: "Local intelligence", desc: "Each town analyzed independently with its own market behavior." },
              { title: "Signal, not noise", desc: "Designed to surface what matters — without the clutter." },
              { title: "No ads. No lead selling.", desc: "Your information stays yours. Trust is earned." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold text-foreground mb-2 tracking-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 md:py-40 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-8 leading-[1.05]">
            Real estate,<br />but clearer.
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-12">
            Talk with Scott or analyze a property now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/analyze"
              className="inline-flex items-center justify-center gap-2.5 bg-foreground text-background px-10 py-5 rounded-full font-semibold text-lg hover:bg-foreground/85 transition-colors"
            >
              Analyze a Property <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+15186762347"
              className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground px-4 py-5 font-medium text-lg transition-colors"
            >
              <Phone className="w-5 h-5" /> Talk With Scott
            </a>
          </div>
        </div>
      </section>

      {/* Powered by line */}
      <div className="pb-6 text-center">
        <p className="text-xs text-muted-foreground/50 tracking-wide">
          Powered by Capital District Nest Property Intelligence
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
