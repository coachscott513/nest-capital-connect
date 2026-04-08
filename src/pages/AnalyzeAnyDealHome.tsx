import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  Search, ArrowRight, Building2, BarChart3, Calculator,
  FileText, Users, Briefcase, Home, ChevronRight, Phone
} from "lucide-react";
import SEOHead from "@/components/SEOHead";

/* ─── Brand Tokens ─── */
const NAVY = "#0A0F1E";
const CHARCOAL = "#111318";
const GRAPHITE = "#181B22";
const GOLD = "#C9A84C";
const GOLD_DIM = "rgba(201,168,76,0.12)";
const WARM_WHITE = "#FAFAF8";
const OFF_WHITE = "#F5F5F2";

/* ─── Shared Components ─── */

function AnalyzerInputBar({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const navigate = useNavigate();
  const isDark = variant === "dark";

  return (
    <div className="w-full">
      <div
        className="flex flex-col md:flex-row items-stretch gap-2 p-1.5 rounded-2xl transition-all"
        style={{
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
          boxShadow: isDark
            ? "0 0 80px rgba(201,168,76,0.03), 0 4px 32px rgba(0,0,0,0.3)"
            : "0 2px 20px rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl"
          style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.02)" }}
        >
          <Search className={`w-4 h-4 shrink-0 ${isDark ? "text-white/25" : "text-gray-300"}`} />
          <input
            type="text"
            placeholder="Enter any property address..."
            className={`w-full bg-transparent outline-none text-[15px] font-light ${
              isDark
                ? "text-white placeholder:text-white/25"
                : "text-gray-900 placeholder:text-gray-300"
            }`}
            onKeyDown={(e) => { if (e.key === "Enter") navigate("/analyzer"); }}
          />
        </div>
        <button
          onClick={() => navigate("/analyzer")}
          className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-[13px] tracking-wide shrink-0 transition-all hover:brightness-110 hover:shadow-lg"
          style={{ backgroundColor: GOLD, color: NAVY, boxShadow: "0 4px 20px rgba(201,168,76,0.2)" }}
        >
          Analyze This Deal <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <p className={`text-[11px] mt-4 tracking-wide ${isDark ? "text-white/20" : "text-gray-300"}`}>
        Free to use · No account required · Professional PDF reports
      </p>
    </div>
  );
}

function SectionLabel({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p
      className="text-[11px] font-medium tracking-[0.4em] uppercase mb-5"
      style={{ color: gold ? GOLD : "rgba(0,0,0,0.25)" }}
    >
      {children}
    </p>
  );
}

/* ─── Page ─── */

const AnalyzeAnyDealHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <SEOHead
        title="Analyze Any Deal — Institutional-Quality Investment Analysis in Seconds"
        description="Know if a deal works before you make it. Cash flow, cap rate, DSCR, and financing scenarios for any property, any market, any loan type. Free professional PDF reports."
        keywords="analyze any deal, investment property analyzer, cap rate calculator, cash flow calculator, DSCR calculator, real estate investment analysis"
        canonical="https://www.analyzeanydeal.com"
      />

      {/* ── Minimal top bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style={{ background: "rgba(10,15,30,0.85)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/analyze-any-deal" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: GOLD }}>
              <BarChart3 className="w-3.5 h-3.5" style={{ color: NAVY }} />
            </div>
            <span className="text-white font-semibold text-[15px] tracking-tight">Analyze Any Deal</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {["Product", "Loan Types", "Reports"].map((item) => (
              <a key={item} href="#" className="text-white/40 text-[13px] font-medium hover:text-white/70 transition-colors">{item}</a>
            ))}
            <button
              onClick={() => navigate("/analyzer")}
              className="text-[13px] font-semibold px-5 py-2 rounded-full transition-all hover:brightness-110"
              style={{ backgroundColor: GOLD, color: NAVY }}
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          1. HERO — Flagship product reveal
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative pt-40 md:pt-52 pb-32 md:pb-40 px-6 overflow-hidden"
        style={{ background: `linear-gradient(175deg, ${NAVY} 0%, ${CHARCOAL} 50%, ${GRAPHITE} 100%)` }}
      >
        {/* Atmospheric glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 45% at 25% 30%, rgba(201,168,76,0.05) 0%, transparent 70%),
                       radial-gradient(ellipse 40% 35% at 75% 65%, rgba(255,255,255,0.015) 0%, transparent 60%)`,
        }} />
        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.012] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Left — Copy */}
          <div className="lg:col-span-3">
            <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-8 opacity-70" style={{ color: GOLD }}>
              Analyze Any Deal · Any Market · Any Loan Type
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] mb-8">
              <span className="font-extralight">Know if a deal works</span>
              <br />
              <span className="font-semibold">before you make it.</span>
            </h1>
            <p className="text-lg text-white/40 max-w-lg mb-14 leading-relaxed font-light">
              Institutional-quality real estate analysis in seconds — built for investors, agents, and serious buyers.
            </p>

            <div className="max-w-xl">
              <AnalyzerInputBar variant="dark" />
            </div>

            {/* Trust proof */}
            <div className="mt-20">
              <div className="h-px w-full mb-10" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.06), transparent)" }} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  ["7 Loan Types", "FHA, DSCR, 203k, VA & more"],
                  ["60 Seconds", "Address to full analysis"],
                  ["3 Scenarios", "Base, Conservative & Lean"],
                  ["PDF Reports", "Share with lender or partner"],
                ].map(([label, sub]) => (
                  <div key={label}>
                    <p className="text-base font-semibold text-white/85 tracking-tight">{label}</p>
                    <p className="text-[11px] text-white/25 mt-1 tracking-wide">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Product preview */}
          <div className="lg:col-span-2 hidden lg:block">
            <div
              className="rounded-3xl p-8 space-y-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-medium">Sample Analysis</span>
                <span className="text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: GOLD_DIM, color: GOLD }}>
                  Strong Deal
                </span>
              </div>

              {[
                ["Purchase Price", "$385,000"],
                ["Estimated Rent", "$3,200 /mo"],
                ["Cash Flow", "+$412 /mo"],
                ["Cap Rate", "7.8%"],
                ["Cash on Cash", "11.2%"],
                ["5-Year Equity", "$68,400"],
              ].map(([label, value], idx) => (
                <div key={label} className="flex items-center justify-between py-3" style={{ borderBottom: idx < 5 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <span className="text-[13px] text-white/35 font-light">{label}</span>
                  <span className={`text-[15px] font-semibold tracking-tight tabular-nums ${
                    (label === "Cash Flow" || label === "Cap Rate" || label === "Cash on Cash")
                      ? "text-emerald-400"
                      : "text-white/80"
                  }`}>{value}</span>
                </div>
              ))}

              <div className="pt-3">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/20 mb-3">Financing</div>
                <div className="flex gap-2">
                  {["FHA", "Conv.", "DSCR"].map((t, i) => (
                    <span
                      key={t}
                      className="text-[11px] px-3 py-1.5 rounded-full font-medium"
                      style={{
                        backgroundColor: i === 0 ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
                        color: i === 0 ? GOLD : "rgba(255,255,255,0.35)",
                        border: `1px solid ${i === 0 ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. WHAT IT DOES — Bright, spacious feature modules
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6" style={{ background: WARM_WHITE }}>
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Product</SectionLabel>
          <h2 className="text-3xl md:text-5xl tracking-tight mb-4">
            <span className="font-extralight">Everything you need to</span>
            <br />
            <span className="font-semibold">make the right call.</span>
          </h2>
          <p className="text-gray-400 text-base font-light max-w-lg mb-16 leading-relaxed">
            From financing structure to cash flow to long-term upside, Analyze Any Deal gives you a complete investment picture in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Building2, title: "Analyze any property", text: "Single-family, multi-unit, rental, land, or investment property — enter an address and get a complete financial picture." },
              { icon: BarChart3, title: "See the numbers instantly", text: "Cash flow, cap rate, DSCR, break-even rent, and projected returns — calculated live as you adjust inputs." },
              { icon: Calculator, title: "Test financing scenarios", text: "FHA, conventional, DSCR, 203(k), VA, hard money, or cash — each loan type adjusts the math automatically." },
              { icon: FileText, title: "Replace your spreadsheet", text: "Generate a clean, professional report you can download, print, or share with lenders, partners, or clients." },
            ].map((f) => (
              <div
                key={f.title}
                className="group p-9 rounded-2xl bg-white transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-7"
                  style={{ backgroundColor: GOLD_DIM }}
                >
                  <f.icon className="w-[18px] h-[18px]" style={{ color: GOLD }} />
                </div>
                <h3 className="text-base font-semibold tracking-tight mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. HOW IT WORKS — White, editorial pacing
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Process</SectionLabel>
          <h2 className="text-3xl md:text-5xl tracking-tight mb-20">
            <span className="font-extralight">From property to decision</span>
            <br />
            <span className="font-semibold">in four steps.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
            {[
              { num: "01", title: "Enter the property", desc: "Start with the address, price, and basic details from the listing." },
              { num: "02", title: "Choose your financing", desc: "Select a loan type and scenario that fits your investment strategy." },
              { num: "03", title: "Review the analysis", desc: "Understand cash flow, value, debt coverage, and return profile." },
              { num: "04", title: "Download or share", desc: "Export a professional report for your lender, partner, or client." },
            ].map((s, i) => (
              <div key={s.num} className="relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-7 left-[calc(100%+12px)] w-[calc(100%-48px)] h-px" style={{ background: "rgba(0,0,0,0.06)" }} />
                )}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-7 text-[13px] font-semibold tracking-wide"
                  style={{ backgroundColor: NAVY, color: GOLD }}
                >
                  {s.num}
                </div>
                <h3 className="text-base font-semibold tracking-tight mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. LOAN TYPES — Precision dark panel
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-32 px-6"
        style={{ background: `linear-gradient(180deg, ${CHARCOAL} 0%, ${GRAPHITE} 100%)` }}
      >
        <div className="max-w-4xl mx-auto">
          <SectionLabel gold>Financing</SectionLabel>
          <h2 className="text-3xl md:text-5xl tracking-tight mb-4 text-white">
            <span className="font-extralight">Your loan type</span>{" "}
            <span className="font-semibold">changes everything.</span>
          </h2>
          <p className="text-white/30 max-w-lg mb-14 text-base font-light leading-relaxed">
            Analyze Any Deal adjusts the math automatically based on how you finance the property. Every scenario recalculates in real time.
          </p>

          <div className="flex flex-wrap gap-2.5 mb-10">
            {["FHA 3.5% Down", "Conventional", "DSCR", "203(k) Rehab", "VA Loan", "Hard Money", "Cash Purchase"].map((lt) => (
              <button
                key={lt}
                onClick={() => navigate("/analyzer")}
                className="px-5 py-2.5 rounded-full text-[13px] font-medium text-white/60 transition-all duration-200 hover:text-white hover:bg-white/8"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {lt}
              </button>
            ))}
          </div>

          <Link
            to="/loan-types"
            className="inline-flex items-center gap-1.5 text-[12px] text-white/20 hover:text-white/45 transition-colors tracking-wide"
          >
            Not sure which financing path fits? Explore loan types <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. SAMPLE ANALYSIS — Product showcase
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6" style={{ background: OFF_WHITE }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Preview</SectionLabel>
            <h2 className="text-3xl md:text-5xl tracking-tight mb-4">
              <span className="font-extralight">See what a great analysis</span>{" "}
              <span className="font-semibold">looks like.</span>
            </h2>
            <p className="text-gray-400 text-base font-light max-w-md mx-auto leading-relaxed">
              A premium, easy-to-read investment summary — built to help you move faster and make smarter decisions.
            </p>
          </div>

          {/* Report preview card */}
          <div
            className="max-w-2xl mx-auto rounded-3xl bg-white p-10 md:p-14"
            style={{ border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-300 font-medium mb-1">Investment Analysis</p>
                <p className="text-lg font-semibold tracking-tight">142 Delaware Ave, Delmar NY</p>
                <p className="text-[13px] text-gray-400 font-light">3-unit Multi-family · FHA 3.5% Down</p>
              </div>
              <div
                className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold"
                style={{ backgroundColor: "rgba(16,185,129,0.08)", color: "rgb(16,185,129)" }}
              >
                Strong Deal
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-8">
              {[
                ["Purchase Price", "$385,000", false],
                ["Estimated Rent", "$3,200/mo", false],
                ["Monthly Cash Flow", "+$412/mo", true],
                ["Cap Rate", "7.8%", true],
                ["Cash on Cash", "11.2%", true],
                ["5-Year Equity", "$68,400", true],
                ["DSCR", "1.24", true],
                ["Break-even Rent", "$2,380/mo", false],
                ["Down Payment", "$13,475", false],
              ].map(([label, value, highlight]) => (
                <div key={label as string}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-medium mb-1">{label as string}</p>
                  <p className={`text-lg font-semibold tracking-tight tabular-nums ${highlight ? "text-emerald-500" : "text-gray-900"}`}>
                    {value as string}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-gray-300 font-light">
                  3 scenarios included · Base, Conservative, Lean
                </p>
                <button
                  onClick={() => navigate("/reports/sample-property-intelligence")}
                  className="text-[12px] font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  style={{ color: GOLD }}
                >
                  View full sample report <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          6. WHO IT'S FOR — Clean persona blocks
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Audience</SectionLabel>
            <h2 className="text-3xl md:text-5xl tracking-tight mb-4">
              <span className="font-extralight">Built for people who need clarity</span>
              <br />
              <span className="font-semibold">before they commit.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Briefcase, title: "Investors", text: "Evaluate rental potential, returns, financing paths, and downside risk — before you make an offer." },
              { icon: Users, title: "Agents", text: "Help clients understand deals more clearly and move faster with institutional-quality data." },
              { icon: Home, title: "Buyers", text: "Get beyond surface-level listing info and see whether a property actually fits your financial goals." },
            ].map((p) => (
              <div
                key={p.title}
                className="p-9 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                style={{ background: WARM_WHITE, border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-7"
                  style={{ backgroundColor: GOLD_DIM }}
                >
                  <p.icon className="w-[18px] h-[18px]" style={{ color: GOLD }} />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          7. TRUST — Minimal credibility strip
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: OFF_WHITE }}>
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel>Why It Works</SectionLabel>
          <h2 className="text-3xl md:text-4xl tracking-tight mb-14">
            <span className="font-extralight">More than a calculator.</span>{" "}
            <span className="font-semibold">A decision-making tool.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-2xl mx-auto text-left">
            {[
              "Professional-grade deal analysis",
              "Designed for real-world property decisions",
              "Built to simplify complex financing math",
              "Report-ready output for sharing and collaboration",
            ].map((statement) => (
              <div key={statement} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: GOLD }} />
                <p className="text-[15px] text-gray-500 font-light leading-relaxed">{statement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          8. FINAL CTA — Iconic close
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-36 px-6" style={{ background: NAVY }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl tracking-tight mb-5 text-white leading-[1.1]">
            <span className="font-extralight">Stop guessing.</span>
            <br />
            <span className="font-semibold">Start analyzing.</span>
          </h2>
          <p className="text-base mb-16 max-w-md mx-auto text-white/30 font-light leading-relaxed">
            Any property. Any market. Any loan type. In seconds.
          </p>
          <div className="max-w-xl mx-auto">
            <AnalyzerInputBar variant="dark" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          9. FOOTER — Premium minimal
      ═══════════════════════════════════════════════════════════ */}
      <footer className="py-16 px-6" style={{ background: "#0D1117", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: GOLD }}>
                <BarChart3 className="w-3.5 h-3.5" style={{ color: NAVY }} />
              </div>
              <span className="text-white font-semibold text-[15px] tracking-tight">Analyze Any Deal</span>
            </div>
            <p className="text-white/20 text-[13px] font-light max-w-sm">
              Institutional-quality investment analysis for every property, every market, every loan type.
            </p>
          </div>

          <div className="h-px w-full mb-10" style={{ background: "rgba(255,255,255,0.04)" }} />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-8">
              {[
                { label: "Product", href: "/analyzer" },
                { label: "Loan Types", href: "/loan-types" },
                { label: "Reports", href: "/reports/sample-property-intelligence" },
                { label: "Contact", href: "/ask" },
                { label: "Privacy", href: "/privacy-policy" },
              ].map((link) => (
                <Link key={link.label} to={link.href} className="text-white/25 text-[12px] font-medium hover:text-white/50 transition-colors tracking-wide">
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-white/12 text-[11px] font-light tracking-wide">
              Founded by Scott Alvarez · Powered by Capital District Nest
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnalyzeAnyDealHome;
