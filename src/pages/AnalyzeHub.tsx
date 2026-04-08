import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Search, TrendingUp, Clock, Globe, FileText, ChevronRight,
  BarChart3, Shield, Zap, Building2, DollarSign, Phone, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

const NAVY = "#0A0F1E";
const GOLD = "#C9A84C";
const LIGHT_BG = "#F5F5F5";

const sampleDeals = [
  {
    address: "Delaware Ave, Delmar NY 12054",
    masked: "XXX",
    type: "3-unit · Multi-family",
    score: 8.4,
    capRate: 7.2,
    cashFlow: 318,
    grossRent: "$3,400",
    dscr: 1.18,
    price: "$415,000",
  },
  {
    address: "Kenwood Ave, Troy NY 12180",
    masked: "XXX",
    type: "2-unit · Multi-family",
    score: 6.1,
    capRate: 5.8,
    cashFlow: -84,
    grossRent: "$2,600",
    dscr: 0.97,
    price: "$349,000",
  },
  {
    address: "3rd Street, Troy NY 12180",
    masked: "XXX",
    type: "4-unit · Multi-family",
    score: 9.1,
    capRate: 8.4,
    cashFlow: 621,
    grossRent: "$4,800",
    dscr: 1.31,
    price: "$389,000",
  },
];

const loanTypes = [
  "FHA 3.5% Down",
  "Conventional",
  "DSCR",
  "203(k) Rehab",
  "VA Loan",
  "Hard Money",
  "Cash Purchase",
];

const features = [
  {
    icon: TrendingUp,
    title: "Find deals before anyone else",
    text: "Live MLS-powered deal feed scored and ranked by cap rate, cash flow, and DSCR. The best opportunities surface first. Street addresses unlocked for registered users — free.",
  },
  {
    icon: Clock,
    title: "Know if a deal works in 60 seconds",
    text: "Enter an address, choose your loan type, see every number that matters. Cap rate, NOI, cash-on-cash return, break-even rent, DSCR — all calculated live as you type.",
  },
  {
    icon: Globe,
    title: "Institutional-quality analysis, any market",
    text: "The same rigor a commercial underwriter applies to a $10M deal — applied to your duplex in 60 seconds. Three scenarios: Base, Conservative, and Lean.",
  },
  {
    icon: FileText,
    title: "Replace your spreadsheet forever",
    text: "Generate a professional PDF investment summary you can download, print, or send to your lender, partner, or client. The kind of report that gets deals funded.",
  },
];

const steps = [
  { num: "01", title: "Enter the property", desc: "Address, price, unit count. Start with what you know from the listing." },
  { num: "02", title: "Choose your financing", desc: "Pick from 7 loan types. Each one adjusts inputs automatically." },
  { num: "03", title: "Review the analysis", desc: "Cap rate, cash flow, DSCR, break-even, three scenarios. Green means it works." },
  { num: "04", title: "Download the report", desc: "Professional PDF ready to share with your lender, partner, or client." },
];

const trustStats = [
  { label: "7 Loan Types", sub: "FHA, DSCR, 203k, VA & more" },
  { label: "60 Seconds", sub: "From address to full analysis" },
  { label: "3 Scenarios", sub: "Base, Conservative & Lean" },
  { label: "PDF Reports", sub: "Share with your lender or partner" },
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 7 ? "#22c55e" : score >= 5 ? "#f59e0b" : "#ef4444";
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
      style={{ background: `${color}20`, color }}
    >
      Deal Score {score}
    </span>
  );
}

function MetricPill({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  const color = positive ? "#22c55e" : "#f59e0b";
  return (
    <span className="text-xs">
      <span className="text-white/50">{label}</span>{" "}
      <span style={{ color }} className="font-semibold">{value}</span>
    </span>
  );
}

function AnalyzerInputBar({ id }: { id?: string }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const handleAnalyze = () => {
    if (address.trim()) {
      navigate("/analyzer");
    } else {
      navigate("/analyzer");
    }
  };

  return (
    <div id={id} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-stretch gap-3 p-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10">
          <Search className="w-5 h-5 text-white/40 shrink-0" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            placeholder="Enter any property address to analyze..."
            className="w-full bg-transparent text-white placeholder:text-white/40 outline-none text-base"
          />
        </div>
        <button
          onClick={handleAnalyze}
          className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all hover:brightness-110 shrink-0"
          style={{ background: GOLD, color: NAVY }}
        >
          Analyze This Deal
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <p className="text-center text-white/30 text-xs mt-3">
        Free to use · No account required · Professional PDF reports
      </p>
    </div>
  );
}

const AnalyzeHub = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Analyze Any Deal | Free Investment Property Calculator | AnalyzeAnyDeal"
        description="Institutional-quality investment analysis in 60 seconds. Cap rate, cash flow, DSCR, and NOI for any property, any loan type, any market. Free professional PDF reports."
        keywords="investment property analyzer, deal analyzer, cap rate calculator, cash flow calculator, DSCR calculator, real estate investment calculator, analyze any deal"
        canonical="https://www.capitaldistrictnest.com/analyze"
      />
      <CleanHeader />

      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative pt-32 pb-20 px-6" style={{ background: NAVY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.35em] uppercase mb-6" style={{ color: GOLD }}>
            Analyze Any Deal · Any Market · Any Loan Type
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-[1.05]">
            Know if a deal works<br />before you make it.
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            Institutional-quality investment analysis in 60 seconds. Find deals before anyone else. Replace your spreadsheet forever.
          </p>
          <AnalyzerInputBar />
        </div>

        {/* Trust Stats */}
        <div className="relative max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-white">{s.label}</p>
                <p className="text-xs text-white/40 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: LIVE DEAL FEED ===== */}
      <section className="py-20 px-6" style={{ background: NAVY }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-[0.35em] uppercase mb-3" style={{ color: GOLD }}>
            Live Capital District Deal Feed
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Find deals before anyone else.
          </h2>
          <p className="text-white/50 max-w-2xl mb-12 text-lg">
            Every active multi-family listing in the Capital District — scored, ranked, and analyzed. Updated weekly from live MLS data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {sampleDeals.map((deal, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-white/40">{deal.type}</span>
                    <ScoreBadge score={deal.score} />
                  </div>
                  <p className="text-white font-semibold mb-1">
                    <span style={{ filter: "blur(4px)" }} className="select-none">{deal.masked}</span>{" "}
                    {deal.address}
                  </p>
                  <p className="text-2xl font-bold text-white mb-4">{deal.price}</p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                    <MetricPill label="Cap Rate" value={`${deal.capRate}%`} positive={deal.capRate >= 7} />
                    <MetricPill
                      label="Cash Flow"
                      value={`${deal.cashFlow >= 0 ? "+" : ""}$${deal.cashFlow}/mo`}
                      positive={deal.cashFlow >= 0}
                    />
                    <MetricPill label="Rent" value={deal.grossRent} positive />
                    <MetricPill label="DSCR" value={`${deal.dscr}`} positive={deal.dscr >= 1} />
                  </div>

                  <button
                    className="text-xs font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                    style={{ color: GOLD }}
                  >
                    Unlock full address <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/dealdesk"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border font-semibold text-sm hover:bg-white/5 transition-colors"
              style={{ borderColor: GOLD, color: GOLD }}
            >
              View All Capital District Deals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: 4 PROMISES ===== */}
      <section className="py-24 px-6" style={{ background: LIGHT_BG }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ color: NAVY }}>
            Everything you need to make the right call.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f) => (
              <div key={f.title} className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-shadow">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${GOLD}20` }}
                >
                  <f.icon className="w-6 h-6" style={{ color: GOLD }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: NAVY }}>{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: LOAN TYPE SWITCHER ===== */}
      <section className="py-20 px-6" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.35em] uppercase mb-3" style={{ color: GOLD }}>
            7 Loan Types · Dynamic Inputs
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your loan type changes everything. We know that.
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto mb-12 text-lg">
            Each loan type adjusts the analysis automatically. FHA adds mortgage insurance. DSCR removes personal income requirements. 203k adds rehab budget and ARV. Pick your strategy and the math updates instantly.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {loanTypes.map((lt) => (
              <Link
                key={lt}
                to="/analyzer"
                className="px-5 py-2.5 rounded-full border text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                style={{ borderColor: GOLD }}
              >
                {lt}
              </Link>
            ))}
          </div>

          <Link to="/loan-types" className="text-sm text-white/40 hover:text-white/60 transition-colors">
            Not sure which loan type fits your deal? Visit our Loan Types guide →
          </Link>
        </div>
      </section>

      {/* ===== SECTION 5: HOW IT WORKS ===== */}
      <section className="py-24 px-6" style={{ background: LIGHT_BG }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ color: NAVY }}>
            From listing to decision in four steps.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-lg font-black"
                  style={{ background: GOLD, color: NAVY }}
                >
                  {s.num}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: NAVY }}>{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: MORTGAGE CTA ===== */}
      <section className="py-20 px-6" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Ready to act on a deal? Talk to a lender who knows the numbers.
          </h2>
          <p className="text-white/50 mb-12 text-lg">
            Joel Casso · Branch Manager · US Mortgage Corporation · Capital District's preferred DSCR and investment property lender.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="rounded-2xl border p-6" style={{ borderColor: GOLD }}>
              <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Today's Rates</p>
              <div className="space-y-3 text-left">
                {[
                  ["30-yr Fixed", "6.75%"],
                  ["DSCR", "6.42%"],
                  ["15-yr Fixed", "6.18%"],
                ].map(([label, rate]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">{label}</span>
                    <span className="text-white font-bold">{rate}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-6 flex flex-col justify-center items-center" style={{ background: GOLD }}>
              <p className="font-bold text-lg mb-3" style={{ color: NAVY }}>
                Get pre-approved before you make an offer.
              </p>
              <a
                href="tel:5186762347"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ background: NAVY, color: GOLD }}
              >
                <Phone className="w-4 h-4" />
                Talk to Joel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: FINAL CTA ===== */}
      <section className="py-24 px-6" style={{ background: GOLD }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ color: NAVY }}>
            Stop guessing. Start analyzing.
          </h2>
          <p className="text-lg mb-12" style={{ color: `${NAVY}99` }}>
            Free to use. No account required. Any property. Any loan type. In seconds.
          </p>

          {/* Dark input bar on gold bg */}
          <div className="w-full max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-stretch gap-3 p-2 rounded-2xl" style={{ background: NAVY }}>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10">
                <Search className="w-5 h-5 text-white/40 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter any property address to analyze..."
                  className="w-full bg-transparent text-white placeholder:text-white/40 outline-none text-base"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") window.location.href = "/analyzer";
                  }}
                />
              </div>
              <Link
                to="/analyzer"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all hover:brightness-110 shrink-0"
                style={{ background: GOLD, color: NAVY }}
              >
                Analyze This Deal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Attribution */}
      <div className="py-4 text-center text-xs text-muted-foreground border-t border-border">
        AnalyzeAnyDeal.com is powered by Capital District Nest · Built by Scott Alvarez · RE/MAX Solutions · Albany, NY
      </div>
    </div>
  );
};

export default AnalyzeHub;
