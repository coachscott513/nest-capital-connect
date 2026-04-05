import { useState } from "react";
import { ArrowRight, BarChart3, CheckCircle, MapPin, Home, Users, TrendingUp, DollarSign, Shield, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import CinematicHero from "@/components/CinematicHero";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Capital District Nest | Modern Real Estate Intelligence"
        description="Clear data. Local context. Town-by-town real estate intelligence for Albany, Troy, Schenectady, Saratoga, and the Capital District."
        keywords="Capital District real estate, Albany homes, Troy real estate, Schenectady homes, property intelligence, market data"
        canonical="https://capitaldistrictnest.com"
        ogImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        ogType="website"
      />

      <CleanHeader />

      {/* HERO */}
      <CinematicHero />

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Built for the Capital District</span>
            <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" /> Property intelligence for buyers, sellers & investors</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Local market insight with premium presentation</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Direct guidance from a real local expert</span>
          </div>
        </div>
      </section>

      {/* ANALYZER FEATURE SECTION */}
      <section className="py-20 md:py-28 px-6 bg-background">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Signature Product</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-6">
            Everything you need to understand a property in one place
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare value, rent potential, investment returns, and local context — all in one analysis.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: DollarSign, title: "Cash Flow & Returns", desc: "Analyze cash flow, cap rate, rent potential, and investment scenarios." },
            { icon: TrendingUp, title: "Value & Equity", desc: "Understand value trends, pricing position, and potential equity." },
            { icon: MapPin, title: "Local Intelligence", desc: "Connect property decisions to neighborhood and market context." },
          ].map((item) => (
            <div key={item.title} className="bento-card p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-xl text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link to="/analyze" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors">
            Analyze a Property <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/dealdesk" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-xl font-semibold hover:bg-secondary transition-colors">
            Request a Custom Review
          </Link>
        </div>
      </section>

      {/* TOWNS & MARKETS */}
      <section className="py-20 md:py-28 px-6 bg-card">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Local Coverage</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-6">
            Explore the Capital District town by town
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each town analyzed independently with its own market behavior and patterns.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              className="bento-card p-6 hover:border-primary/30 transition-all group"
            >
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{town.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">View Insights →</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/communities" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            Browse All Towns <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FIRST-TIME BUYERS */}
      <section className="py-20 md:py-28 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="bento-card p-10 md:p-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Home className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">For Buyers</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  First-Time Buyer Guidance, Without the Noise
                </h3>
                <p className="text-muted-foreground text-lg">
                  Low-down-payment options, grants, local insights, and practical guidance.
                </p>
              </div>
              <Link
                to="/first-time-homebuyers"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex-shrink-0"
              >
                Explore Programs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SELLERS */}
      <section className="py-20 md:py-28 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="bento-card p-10 md:p-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">For Sellers</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  A Smarter Way to Think About Selling
                </h3>
                <p className="text-muted-foreground text-lg">
                  Use data, pricing insight, and local strategy to understand your next move.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <Link
                  to="/dealdesk"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  Get a Property Review <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/sell-investment-property"
                  className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-xl font-semibold hover:bg-secondary transition-colors"
                >
                  Explore Seller Options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTORS */}
      <section className="py-20 md:py-28 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="bento-card p-10 md:p-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">For Investors</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Investment Property Intelligence for the Capital District
                </h3>
                <p className="text-muted-foreground text-lg">
                  Multi-unit, rehab, rental, off-market analysis, and value-add thinking.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <Link
                  to="/analyze"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  Analyze a Property <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/investor-tools"
                  className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-xl font-semibold hover:bg-secondary transition-colors"
                >
                  View Investor Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / CREDIBILITY */}
      <section className="py-20 md:py-28 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Local Expertise</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-6">
              Built different. On purpose.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No scraped estimates. No AI guesses. Real data, verified locally.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Verified data sources", desc: "Tax records, MLS activity, and market trends — combined for the full picture." },
              { title: "Local intelligence, not generic feeds", desc: "Each town analyzed independently with its own market behavior and patterns." },
              { title: "Signal, not noise", desc: "Designed to surface what matters — without the clutter of typical real estate sites." },
              { title: "No ads. No lead selling.", desc: "Your information stays yours. This is where trust is earned." },
            ].map((item) => (
              <div key={item.title} className="bento-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-32 px-6 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
            Real estate, but clearer.
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Talk with Scott or analyze a property now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/analyze"
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-10 py-5 rounded-xl font-semibold text-lg hover:bg-foreground/90 transition-colors"
            >
              Analyze a Property <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+15186762347"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-10 py-5 rounded-xl font-semibold text-lg hover:bg-secondary transition-colors"
            >
              <Phone className="w-5 h-5" /> Talk With Scott
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
