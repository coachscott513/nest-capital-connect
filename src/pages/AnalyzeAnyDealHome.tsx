import { useNavigate, Link } from "react-router-dom";
import {
  Search, ArrowRight, Building2, BarChart3, Calculator,
  FileText, Users, Briefcase, Home, ChevronRight
} from "lucide-react";
import SEOHead from "@/components/SEOHead";

/* ─── Brand Tokens — No gold. Platinum / Charcoal / Slate ─── */
const NAVY = "#0B0F19";
const CHARCOAL = "#13161E";
const GRAPHITE = "#1A1D26";
const SLATE = "#64748B";
const SLATE_DIM = "rgba(100,116,139,0.08)";
const PLATINUM = "#E2E8F0";

/* ─── Shared Components ─── */

function InputBar({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div
        className="flex flex-col md:flex-row items-stretch gap-1.5 p-2 rounded-2xl"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: variant === "dark"
            ? "0 4px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)"
            : "0 2px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl">
          <Search className="w-4 h-4 shrink-0 text-gray-300" />
          <input
            type="text"
            placeholder="Enter any property address..."
            className="w-full bg-transparent outline-none text-[15px] font-light text-gray-900 placeholder:text-gray-400"
            onKeyDown={(e) => { if (e.key === "Enter") navigate("/analyzer"); }}
          />
        </div>
        <button
          onClick={() => navigate("/analyzer")}
          className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-[13px] tracking-wide shrink-0 transition-all text-white hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          Analyze This Deal <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <p className={`text-[11px] mt-5 tracking-wide ${variant === "dark" ? "text-white/25" : "text-gray-400"}`}>
        Free to use · No account required · Professional PDF reports
      </p>
    </div>
  );
}

function Label({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className="text-[11px] font-medium tracking-[0.45em] uppercase mb-5" style={{ color: dark ? SLATE : "rgba(0,0,0,0.22)" }}>
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

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style={{ background: "rgba(11,15,25,0.88)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/analyze-any-deal" className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md flex items-center justify-center bg-white/10">
              <BarChart3 className="w-3 h-3 text-white/70" />
            </div>
            <span className="text-white/90 font-semibold text-[14px] tracking-tight">Analyze Any Deal</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {["Product", "Loan Types", "Reports"].map((item) => (
              <a key={item} href="#" className="text-white/30 text-[13px] font-medium hover:text-white/60 transition-colors">{item}</a>
            ))}
            <button onClick={() => navigate("/analyzer")}
              className="text-[13px] font-semibold px-5 py-2 rounded-full bg-white/10 text-white/80 hover:bg-white/15 transition-all">
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════
          1. HERO — Cinematic product reveal
      ═══════════════════════════════════════════════ */}
      <section
        className="relative pt-48 md:pt-56 pb-36 md:pb-44 px-6 overflow-hidden"
        style={{ background: `linear-gradient(178deg, ${NAVY} 0%, ${CHARCOAL} 55%, ${GRAPHITE} 100%)` }}
      >
        {/* Controlled radial bloom */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 30%, rgba(255,255,255,0.02) 0%, transparent 70%)",
        }} />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-20 items-center">
          <div className="lg:col-span-3">
            <p className="text-[11px] font-medium tracking-[0.45em] uppercase mb-10" style={{ color: SLATE }}>
              Analyze Any Deal · Any Market · Any Loan Type
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.06] mb-10">
              <span className="font-extralight">Know if a deal works</span>
              <br />
              <span className="font-semibold">before you make it.</span>
            </h1>
            <p className="text-[17px] text-white/30 max-w-md mb-20 leading-relaxed font-light">
              Institutional-quality real estate analysis in seconds — built for investors, agents, and serious buyers.
            </p>

            <div className="max-w-xl">
              <InputBar variant="dark" />
            </div>

            {/* Trust proof */}
            <div className="mt-28">
              <div className="h-px w-1/2 mb-12" style={{ background: "rgba(255,255,255,0.05)" }} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {[
                  ["7 Loan Types", "FHA, DSCR, 203k, VA & more"],
                  ["60 Seconds", "Address to full analysis"],
                  ["3 Scenarios", "Base, Conservative & Lean"],
                  ["PDF Reports", "Share with lender or partner"],
                ].map(([label, sub]) => (
                  <div key={label}>
                    <p className="text-[14px] font-medium text-white/60 tracking-tight">{label}</p>
                    <p className="text-[11px] text-white/18 mt-1.5 tracking-wide">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product preview panel */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="rounded-3xl p-9" style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
            }}>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-medium">Sample Analysis</span>
                <span className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-emerald-500/8 text-emerald-400 ring-1 ring-emerald-500/15">
                  Strong Deal
                </span>
              </div>

              {[
                ["Purchase Price", "$385,000", false],
                ["Estimated Rent", "$3,200 /mo", false],
                ["Cash Flow", "+$412 /mo", true],
                ["Cap Rate", "7.8%", true],
                ["Cash on Cash", "11.2%", true],
                ["5-Year Equity", "$68,400", true],
              ].map(([label, value, highlight], idx) => (
                <div key={label as string} className="flex items-center justify-between py-3.5" style={{ borderBottom: idx < 5 ? "1px solid rgba(255,255,255,0.035)" : "none" }}>
                  <span className="text-[13px] text-white/25 font-light">{label as string}</span>
                  <span className={`text-[15px] font-semibold tracking-tight tabular-nums ${highlight ? "text-emerald-400" : "text-white/70"}`}>{value as string}</span>
                </div>
              ))}

              <div className="pt-5 mt-2">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/15 mb-3">Financing</div>
                <div className="flex gap-2">
                  {["FHA", "Conv.", "DSCR"].map((t, i) => (
                    <span key={t} className="text-[11px] px-3 py-1.5 rounded-full font-medium"
                      style={{
                        backgroundColor: i === 0 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                        color: i === 0 ? "rgba(255,255,255,0.60)" : "rgba(255,255,255,0.25)",
                        border: `1px solid rgba(255,255,255,${i === 0 ? "0.10" : "0.05"})`,
                      }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          2. FEATURES — Warm white, spacious modules
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-6" style={{ background: "#FAFAFB" }}>
        <div className="max-w-6xl mx-auto">
          <Label>Product</Label>
          <h2 className="text-3xl md:text-5xl tracking-tight mb-5">
            <span className="font-extralight">Everything you need to</span><br />
            <span className="font-semibold">make the right call.</span>
          </h2>
          <p className="text-gray-400 text-base font-light max-w-lg mb-20 leading-relaxed">
            From financing structure to cash flow to long-term upside — a complete investment picture in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: Building2, title: "Analyze any property", text: "Single-family, multi-unit, rental, land, or investment property — enter an address and get a complete financial picture." },
              { icon: BarChart3, title: "See the numbers instantly", text: "Cash flow, cap rate, DSCR, break-even rent, and projected returns — calculated live as you adjust inputs." },
              { icon: Calculator, title: "Test financing scenarios", text: "FHA, conventional, DSCR, 203(k), VA, hard money, or cash — each loan type adjusts the math automatically." },
              { icon: FileText, title: "Replace your spreadsheet", text: "Generate a clean, professional report you can download, print, or share with lenders, partners, or clients." },
            ].map((f) => (
              <div key={f.title} className="group p-10 rounded-3xl bg-white transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)]" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-8" style={{ backgroundColor: SLATE_DIM }}>
                  <f.icon className="w-[18px] h-[18px]" style={{ color: SLATE }} />
                </div>
                <h3 className="text-[15px] font-semibold tracking-tight mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed text-[14px] font-light max-w-sm">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. HOW IT WORKS — White editorial
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Label>Process</Label>
          <h2 className="text-3xl md:text-5xl tracking-tight mb-24">
            <span className="font-extralight">From property to decision</span><br />
            <span className="font-semibold">in four steps.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            {[
              { num: "01", title: "Enter the property", desc: "Start with the address, price, and basic details from the listing." },
              { num: "02", title: "Choose your financing", desc: "Select a loan type and scenario that fits your investment strategy." },
              { num: "03", title: "Review the analysis", desc: "Understand cash flow, value, debt coverage, and return profile." },
              { num: "04", title: "Download or share", desc: "Export a professional report for your lender, partner, or client." },
            ].map((s, i) => (
              <div key={s.num} className="relative">
                {i < 3 && <div className="hidden md:block absolute top-7 left-[calc(100%+16px)] w-[calc(100%-56px)] h-px" style={{ background: "rgba(0,0,0,0.04)" }} />}
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-8 text-[13px] font-semibold tracking-wide" style={{ backgroundColor: NAVY, color: PLATINUM }}>
                  {s.num}
                </div>
                <h3 className="text-[15px] font-semibold tracking-tight mb-3">{s.title}</h3>
                <p className="text-gray-400 text-[14px] leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. LOAN TYPES — Flat precision panel (graphite, not hero gradient)
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-6" style={{ background: GRAPHITE }}>
        <div className="max-w-4xl mx-auto">
          <Label dark>Financing</Label>
          <h2 className="text-3xl md:text-5xl tracking-tight mb-5 text-white">
            <span className="font-extralight">Your loan type</span> <span className="font-semibold">changes everything.</span>
          </h2>
          <p className="text-white/22 max-w-lg mb-16 text-base font-light leading-relaxed">
            Analyze Any Deal adjusts the math automatically based on how you finance the property. Every scenario recalculates in real time.
          </p>

          <div className="flex flex-wrap gap-2.5 mb-12">
            {["FHA 3.5% Down", "Conventional", "DSCR", "203(k) Rehab", "VA Loan", "Hard Money", "Cash Purchase"].map((lt) => (
              <button key={lt} onClick={() => navigate("/analyzer")}
                className="px-5 py-2.5 rounded-full text-[13px] font-medium text-white/40 transition-all duration-200 hover:text-white/70 hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                {lt}
              </button>
            ))}
          </div>

          <Link to="/loan-types" className="inline-flex items-center gap-1.5 text-[12px] text-white/15 hover:text-white/35 transition-colors tracking-wide">
            Not sure which financing path fits? Explore our guide <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. SAMPLE ANALYSIS — Product showcase
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-6" style={{ background: "#F7F7F6" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <Label>Preview</Label>
            <h2 className="text-3xl md:text-5xl tracking-tight mb-5">
              <span className="font-extralight">See what a great analysis</span> <span className="font-semibold">looks like.</span>
            </h2>
            <p className="text-gray-400 text-base font-light max-w-md mx-auto leading-relaxed">
              A premium, easy-to-read investment summary — built to help you move faster and make smarter decisions.
            </p>
          </div>

          <div className="max-w-2xl mx-auto rounded-3xl bg-white p-12 md:p-16" style={{ border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 16px 48px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-300 font-medium mb-1.5">Investment Analysis</p>
                <p className="text-lg font-semibold tracking-tight">142 Delaware Ave, Delmar NY</p>
                <p className="text-[13px] text-gray-400 font-light mt-0.5">3-unit Multi-family · FHA 3.5% Down</p>
              </div>
              <div className="px-3.5 py-1.5 rounded-full text-[11px] font-medium bg-emerald-500/8 text-emerald-500 ring-1 ring-emerald-500/15">
                Strong Deal
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-10">
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
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-medium mb-1.5">{label as string}</p>
                  <p className={`text-lg font-semibold tracking-tight tabular-nums ${highlight ? "text-emerald-500" : "text-gray-900"}`}>{value as string}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-gray-300 font-light">3 scenarios included · Base, Conservative, Lean</p>
                <button onClick={() => navigate("/reports/sample-property-intelligence")}
                  className="text-[12px] font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all" style={{ color: SLATE }}>
                  View full sample report <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          6. WHO IT'S FOR — Persona blocks
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <Label>Audience</Label>
            <h2 className="text-3xl md:text-5xl tracking-tight mb-4">
              <span className="font-extralight">Built for people who need clarity</span><br />
              <span className="font-semibold">before they commit.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Briefcase, title: "Investors", text: "Evaluate rental potential, returns, financing paths, and downside risk — before you make an offer." },
              { icon: Users, title: "Agents", text: "Help clients understand deals more clearly and move faster with institutional-quality data." },
              { icon: Home, title: "Buyers", text: "Get beyond surface-level listing info and see whether a property actually fits your financial goals." },
            ].map((p) => (
              <div key={p.title} className="p-10 rounded-3xl transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)]" style={{ background: "#FAFAFB", border: "1px solid rgba(0,0,0,0.04)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-8" style={{ backgroundColor: SLATE_DIM }}>
                  <p.icon className="w-[18px] h-[18px]" style={{ color: SLATE }} />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-3">{p.title}</h3>
                <p className="text-gray-400 text-[14px] leading-relaxed font-light">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          7. TRUST — Minimal credibility
      ═══════════════════════════════════════════════ */}
      <section className="py-32 px-6" style={{ background: "#F7F7F6" }}>
        <div className="max-w-4xl mx-auto text-center">
          <Label>Why It Works</Label>
          <h2 className="text-3xl md:text-4xl tracking-tight mb-16">
            <span className="font-extralight">More than a calculator.</span> <span className="font-semibold">A decision-making tool.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-2xl mx-auto text-left">
            {[
              "Professional-grade deal analysis",
              "Designed for real-world property decisions",
              "Built to simplify complex financing math",
              "Report-ready output for sharing and collaboration",
            ].map((s) => (
              <div key={s} className="flex items-start gap-3.5">
                <div className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ backgroundColor: SLATE }} />
                <p className="text-[15px] text-gray-500 font-light leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          8. FINAL CTA — Iconic, minimal close
      ═══════════════════════════════════════════════ */}
      <section className="py-40 px-6" style={{ background: NAVY }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl tracking-tight mb-6 text-white leading-[1.08]">
            <span className="font-extralight">Stop guessing.</span><br />
            <span className="font-semibold">Start analyzing.</span>
          </h2>
          <p className="text-[15px] mb-20 max-w-sm mx-auto text-white/22 font-light leading-relaxed">
            Any property. Any market. Any loan type. In seconds.
          </p>
          <div className="max-w-md mx-auto">
            <InputBar variant="dark" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          9. FOOTER — Stripped, elegant
      ═══════════════════════════════════════════════ */}
      <footer className="py-16 px-6" style={{ background: "#0D1117", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-14">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md flex items-center justify-center bg-white/8">
                <BarChart3 className="w-3 h-3 text-white/50" />
              </div>
              <span className="text-white/70 font-semibold text-[14px] tracking-tight">Analyze Any Deal</span>
            </div>
            <p className="text-white/15 text-[13px] font-light max-w-sm">
              Institutional-quality investment analysis for every property, every market, every loan type.
            </p>
          </div>

          <div className="h-px w-full mb-10" style={{ background: "rgba(255,255,255,0.03)" }} />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-8">
              {[
                { label: "Product", href: "/analyzer" },
                { label: "Loan Types", href: "/loan-types" },
                { label: "Reports", href: "/reports/sample-property-intelligence" },
                { label: "Help", href: "/ask" },
                { label: "Privacy", href: "/privacy-policy" },
              ].map((link) => (
                <Link key={link.label} to={link.href} className="text-white/20 text-[12px] font-medium hover:text-white/40 transition-colors tracking-wide">
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-white/8 text-[11px] font-light tracking-wide">
              Founded by Scott Alvarez · Powered by Capital District Nest
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnalyzeAnyDealHome;
