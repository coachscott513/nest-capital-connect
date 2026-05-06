import { ArrowRight, Search, MapPin, TrendingUp, Sparkles, Building2, Home, Trees } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { localBusinessSchema } from "@/utils/seoSchemas";

/* ============================================================
   CAPITAL DISTRICT NEST — HOMEPAGE
   Apple product page + real estate intelligence platform
   Full-width sections · glass UI used intentionally · no tile grids
   ============================================================ */

const GLASS = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(22px) saturate(180%)",
  WebkitBackdropFilter: "blur(22px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.55)",
  boxShadow:
    "0 30px 80px -25px rgba(15,23,42,0.22), 0 1px 0 rgba(255,255,255,0.9) inset",
} as const;

const GLASS_DARK = {
  background: "rgba(15,23,42,0.92)",
  backdropFilter: "blur(22px) saturate(180%)",
  WebkitBackdropFilter: "blur(22px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow:
    "0 30px 80px -25px rgba(15,23,42,0.45), 0 1px 0 rgba(255,255,255,0.06) inset",
} as const;

/* ============ SECTION 1 — HERO ============ */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #f7f9fc 55%, #eef3f8 100%)",
          }}
        />
        {/* Floating blobs */}
        <div
          className="absolute -top-24 -left-32 w-[640px] h-[640px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(13,148,136,0.18), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-32 right-[-180px] w-[720px] h-[720px] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.14), transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute bottom-[-120px] left-1/3 w-[520px] h-[520px] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.12), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-32 md:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* LEFT — Headline + CTAs */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-[0.18em] uppercase text-neutral-700"
                 style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(15,23,42,0.06)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
              Live · Capital District
            </div>

            <h1 className="text-[44px] sm:text-6xl lg:text-[72px] font-semibold leading-[1.02] tracking-[-0.035em] text-neutral-900">
              Capital District<br />
              real estate<br />
              <span className="text-teal-700">intelligence.</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-lg font-light">
              Search homes, analyze any property, and understand what's happening
              in your market — in real time.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/analyze"
                className="inline-flex items-center gap-2 bg-neutral-900 text-white px-7 py-4 rounded-full font-medium text-[15px] hover:bg-neutral-800 transition-colors"
              >
                Analyze a Property <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/communities"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-medium text-[15px] text-neutral-800 hover:bg-white/60 transition-colors"
                style={{ border: "1px solid rgba(15,23,42,0.12)" }}
              >
                Explore Towns
              </Link>
              <Link
                to="/homes-for-sale"
                className="text-neutral-600 hover:text-neutral-900 font-medium text-[15px] px-2 py-4 transition-colors"
              >
                Search Homes →
              </Link>
            </div>
          </div>

          {/* RIGHT — Floating glass card stack */}
          <div className="lg:col-span-6 relative h-[520px] md:h-[560px]">
            {/* Card 1 — Delmar This Week (top, slight left tilt) */}
            <Link
              to="/living-in-delmar"
              className="absolute top-0 left-0 md:left-4 w-[78%] md:w-[68%] rounded-[28px] p-6 transition-transform hover:-translate-y-1"
              style={{ ...GLASS, transform: "rotate(-2.2deg)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-teal-600/10">
                    <MapPin className="w-4 h-4 text-teal-700" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                    Delmar · This Week
                  </span>
                </div>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-[22px] font-semibold text-neutral-900 leading-snug mb-3">
                3 closed · 2 new listings
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Inventory still tight on Delaware Ave. Median list moved up
                <span className="text-teal-700 font-semibold"> +1.8%</span>.
              </p>
            </Link>

            {/* Card 2 — Market Snapshot (middle right, opposite tilt, overlapping) */}
            <div
              className="absolute top-[170px] right-0 w-[72%] md:w-[60%] rounded-[28px] p-6"
              style={{ ...GLASS, transform: "rotate(1.6deg)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-600/10">
                  <TrendingUp className="w-4 h-4 text-indigo-700" />
                </div>
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                  Market Snapshot
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[34px] font-semibold tracking-tight text-neutral-900">$465K</span>
                <span className="text-sm text-neutral-500">median</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
                <span><strong className="text-neutral-900">12</strong> active</span>
                <span className="text-neutral-300">·</span>
                <span><strong className="text-neutral-900">9</strong> pending</span>
              </div>
              {/* Mini sparkline */}
              <svg viewBox="0 0 200 50" className="w-full h-10">
                <defs>
                  <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(13,148,136)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="rgb(13,148,136)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,38 L25,32 L50,34 L75,24 L100,28 L125,18 L150,22 L175,12 L200,8 L200,50 L0,50 Z"
                  fill="url(#spark)"
                />
                <path
                  d="M0,38 L25,32 L50,34 L75,24 L100,28 L125,18 L150,22 L175,12 L200,8"
                  fill="none"
                  stroke="rgb(13,148,136)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Card 3 — Analyze Property (bottom left, dark, larger tilt) */}
            <Link
              to="/analyze"
              className="absolute bottom-0 left-2 md:left-12 w-[80%] md:w-[68%] rounded-[28px] p-6 transition-transform hover:-translate-y-1 text-white"
              style={{ ...GLASS_DARK, transform: "rotate(-1.2deg)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/60">
                  Analyze Property
                </span>
              </div>
              <div
                className="rounded-2xl px-4 py-3.5 mb-4 text-sm text-white/80 flex items-center gap-2"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <MapPin className="w-4 h-4 text-white/40" />
                <span>137A Elsmere Ave, Delmar NY</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Cash Flow</p>
                  <p className="text-base font-semibold">$412/mo</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Cap Rate</p>
                  <p className="text-base font-semibold">7.8%</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Score</p>
                  <p className="text-base font-semibold text-emerald-400">A−</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 2 — ANALYZE ANY PROPERTY ============ */
function AnalyzeSection() {
  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-teal-700 mb-5">
            Property Intelligence
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900 mb-6">
            Know the deal<br />before you make it.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-light max-w-md mb-10">
            Analyze any property for monthly cost, taxes, cash flow, and long-term
            value — instantly.
          </p>
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-7 py-4 rounded-full font-medium text-[15px] hover:bg-neutral-800 transition-colors"
          >
            Try the Analyzer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right — Analyzer UI preview */}
        <div className="lg:col-span-7">
          <div
            className="rounded-[32px] p-8 md:p-10"
            style={{
              background: "linear-gradient(160deg, #fafbfc 0%, #f0f4f8 100%)",
              border: "1px solid rgba(15,23,42,0.06)",
              boxShadow: "0 40px 100px -30px rgba(15,23,42,0.18)",
            }}
          >
            {/* Address bar */}
            <div
              className="rounded-2xl px-5 py-4 mb-6 flex items-center gap-3 bg-white"
              style={{ border: "1px solid rgba(15,23,42,0.08)" }}
            >
              <Search className="w-4 h-4 text-neutral-400" />
              <span className="text-[15px] text-neutral-700 flex-1">
                Enter any Capital District address
              </span>
              <span className="text-xs text-neutral-400">⏎</span>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "Monthly Cost", value: "$3,142", sub: "PITI + maint." },
                { label: "Cash Flow", value: "+$412", sub: "after expenses", positive: true },
                { label: "Cap Rate", value: "7.8%", sub: "stabilized" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-2xl p-4"
                  style={{ border: "1px solid rgba(15,23,42,0.06)" }}
                >
                  <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-2">
                    {s.label}
                  </p>
                  <p className={`text-xl font-semibold ${s.positive ? "text-emerald-600" : "text-neutral-900"}`}>
                    {s.value}
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-1">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Long row */}
            <div
              className="bg-white rounded-2xl p-5 flex items-center justify-between"
              style={{ border: "1px solid rgba(15,23,42,0.06)" }}
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-1">
                  10-Year Value Forecast
                </p>
                <p className="text-lg font-semibold text-neutral-900">$612K projected</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-neutral-500">Equity gain</p>
                <p className="text-base font-semibold text-teal-700">+$147K</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 3 — EXPLORE TOWNS (3 only) ============ */
const FEATURED_TOWNS = [
  {
    name: "Delmar",
    slug: "delmar",
    insight: "3 closed · 2 new listings this week",
    gradient: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
    href: "/living-in-delmar",
  },
  {
    name: "Albany",
    slug: "albany",
    insight: "Median $295K · 47 active",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
    href: "/towns/albany",
  },
  {
    name: "Saratoga Springs",
    slug: "saratoga-springs",
    insight: "Luxury inventory up · DOM 22",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)",
    href: "/towns/saratoga-springs",
  },
];

function ExploreTowns() {
  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10" style={{ background: "#fafbfc" }}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-teal-700 mb-5">
            Local Coverage
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900 mb-6">
            Explore the Capital District<br />by town.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-light">
            Live updates, market trends, and local insight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {FEATURED_TOWNS.map((t, i) => (
            <Link
              key={t.slug}
              to={t.href}
              className={`group block rounded-[32px] overflow-hidden relative h-[420px] transition-transform duration-500 hover:-translate-y-2 ${
                i === 1 ? "md:translate-y-8" : ""
              }`}
              style={{ boxShadow: "0 30px 70px -25px rgba(15,23,42,0.25)" }}
            >
              <div className="absolute inset-0" style={{ background: t.gradient }} />
              {/* Soft texture */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 60%)",
                }}
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70 mb-3">
                    This Week
                  </p>
                  <h3 className="text-4xl font-semibold tracking-tight">{t.name}</h3>
                </div>
                <div>
                  <p className="text-[15px] text-white/85 leading-relaxed mb-5">{t.insight}</p>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                    style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)" }}
                  >
                    Explore {t.name} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <Link
            to="/communities"
            className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
          >
            Browse all towns →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 4 — HOMES ============ */
function HomesSection() {
  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 lg:order-2">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-teal-700 mb-5">
            Homes
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900 mb-6">
            Search homes across<br />the Capital District.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-light max-w-md mb-10">
            Find listings and track the market — directly from MLS, updated daily.
          </p>
          <Link
            to="/homes-for-sale"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-7 py-4 rounded-full font-medium text-[15px] hover:bg-neutral-800 transition-colors"
          >
            Browse Listings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="lg:col-span-7 lg:order-1">
          <div
            className="rounded-[32px] p-8"
            style={{
              background: "linear-gradient(160deg, #f0f4f8 0%, #fafbfc 100%)",
              border: "1px solid rgba(15,23,42,0.06)",
              boxShadow: "0 40px 100px -30px rgba(15,23,42,0.18)",
            }}
          >
            {/* Search bar */}
            <div className="bg-white rounded-2xl p-2 flex items-center gap-2 mb-6"
                 style={{ border: "1px solid rgba(15,23,42,0.08)" }}>
              <div className="flex items-center gap-2 px-3 flex-1">
                <Search className="w-4 h-4 text-neutral-400" />
                <span className="text-[15px] text-neutral-500">Town, ZIP, or address</span>
              </div>
              <button className="bg-neutral-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl">
                Search
              </button>
            </div>

            {/* Listing preview */}
            <div className="space-y-3">
              {[
                { addr: "47 Kenwood Ave, Delmar", price: "$489,000", beds: "4 bd · 2 ba · 2,140 sf", tag: "New" },
                { addr: "12 Marion Ave, Albany", price: "$315,000", beds: "3 bd · 2 ba · 1,820 sf", tag: "Price ↓" },
                { addr: "88 Phila St, Saratoga", price: "$725,000", beds: "3 bd · 2.5 ba · 2,400 sf" },
              ].map((l) => (
                <div
                  key={l.addr}
                  className="bg-white rounded-2xl p-4 flex items-center justify-between"
                  style={{ border: "1px solid rgba(15,23,42,0.06)" }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl flex-shrink-0"
                         style={{ background: "linear-gradient(135deg, #cbd5e1, #94a3b8)" }} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-900 truncate">{l.addr}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{l.beds}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {l.tag && (
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-teal-700 bg-teal-600/10 px-2 py-1 rounded-full">
                        {l.tag}
                      </span>
                    )}
                    <p className="text-base font-semibold text-neutral-900">{l.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 5 — PROPERTY TYPES ============ */
function PropertyTypes() {
  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10" style={{ background: "#fafbfc" }}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-teal-700 mb-5">
            Strategy
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900 mb-6">
            Find the right property<br />for your strategy.
          </h2>
        </div>

        {/* Featured + 2 supporting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Featured — Multi-unit */}
          <Link
            to="/analyze/multifamily"
            className="lg:col-span-7 group block rounded-[32px] p-10 md:p-12 relative overflow-hidden h-[440px] transition-transform hover:-translate-y-2"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f766e 100%)",
              boxShadow: "0 40px 100px -30px rgba(15,23,42,0.4)",
            }}
          >
            <div
              className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, rgba(20,184,166,0.5), transparent 70%)" }}
            />
            <div className="relative h-full flex flex-col justify-between text-white">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-400" />
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/60">
                  Featured · Multi-Unit
                </span>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                  Cash-flowing<br />multifamily.
                </h3>
                <p className="text-white/70 leading-relaxed max-w-md mb-6">
                  Pre-screened 2–4 unit properties with cap rate, cash flow, and
                  deal score — across the Capital District.
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  Explore Multi-Unit <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>

          {/* Supporting */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6 md:gap-8">
            <Link
              to="/homes-for-sale"
              className="group block rounded-[32px] p-8 relative overflow-hidden h-[208px] transition-transform hover:-translate-y-2 bg-white"
              style={{
                border: "1px solid rgba(15,23,42,0.06)",
                boxShadow: "0 20px 60px -20px rgba(15,23,42,0.15)",
              }}
            >
              <div className="h-full flex flex-col justify-between">
                <Home className="w-6 h-6 text-neutral-700" />
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-2">
                    Single Family
                  </h3>
                  <p className="text-sm text-neutral-600 mb-3">
                    Owner-occupant homes with full intelligence layer.
                  </p>
                  <span className="text-sm font-medium text-teal-700 inline-flex items-center gap-1">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>

            <Link
              to="/analyze/land"
              className="group block rounded-[32px] p-8 relative overflow-hidden h-[208px] transition-transform hover:-translate-y-2"
              style={{
                background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                border: "1px solid rgba(15,23,42,0.04)",
                boxShadow: "0 20px 60px -20px rgba(15,23,42,0.12)",
              }}
            >
              <div className="h-full flex flex-col justify-between">
                <Trees className="w-6 h-6 text-emerald-700" />
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-2">
                    Land
                  </h3>
                  <p className="text-sm text-neutral-700 mb-3">
                    Lots, acreage, and development opportunities.
                  </p>
                  <span className="text-sm font-medium text-emerald-700 inline-flex items-center gap-1">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 6 — EMAIL CAPTURE ============ */
function EmailCapture() {
  const [email, setEmail] = useState("");
  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10 bg-white overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(13,148,136,0.08), transparent 60%), #ffffff",
        }}
      />
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-teal-700 mb-5">
          Weekly Updates
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900 mb-6">
          Get weekly market<br />updates.
        </h2>
        <p className="text-lg text-neutral-600 leading-relaxed font-light mb-10 max-w-xl mx-auto">
          Listings, price changes, and what's happening locally — every Sunday morning.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Future: route to /api/subscribe or supabase function
          }}
          className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 bg-white px-5 py-4 rounded-full text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30"
            style={{ border: "1px solid rgba(15,23,42,0.12)" }}
          />
          <button
            type="submit"
            className="bg-neutral-900 text-white px-7 py-4 rounded-full font-medium text-[15px] hover:bg-neutral-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-neutral-500 mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

/* ============ PAGE ============ */
const Index = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SEOHead
        title="Capital District Nest | Albany NY Real Estate Intelligence"
        description="Search homes, analyze any property, and understand what's happening in your market — in real time. Capital District real estate intelligence platform."
        keywords="Capital District real estate, Albany homes for sale, property analysis Albany NY, Delmar real estate, Saratoga Springs"
        canonical="https://www.capitaldistrictnest.com"
        ogImage="https://www.capitaldistrictnest.com/og-image-capital-district.jpg"
        ogType="website"
        structuredData={localBusinessSchema}
        noBreadcrumb
      />

      <CleanHeader />

      <Hero />
      <AnalyzeSection />
      <ExploreTowns />
      <HomesSection />
      <PropertyTypes />
      <EmailCapture />

      <Footer />
    </div>
  );
};

export default Index;
