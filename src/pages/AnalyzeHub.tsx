import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Search, TrendingUp, Clock, Globe, FileText, ChevronRight,
  Phone, ArrowRight, X
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getTopDeals, type Listing } from "@/lib/listings";
import { DealCard, UnlockModal, type UnlockedDetails } from "@/components/DealCard";

/* ─── Brand tokens — Platinum / Charcoal / Navy system ─── */
const NAVY = "#0B0F19";
const CHARCOAL = "#13161E";
const GRAPHITE = "#1A1D26";
const SLATE = "#64748B";       /* muted steel-blue accent */
const SLATE_DIM = "rgba(100,116,139,0.10)";
const PLATINUM = "#E2E8F0";    /* warm platinum for emphasis text */

const sampleDeals = [
  { address: "Delaware Ave, Delmar NY 12054", masked: "XXX", fullAddress: "142 Delaware Ave, Delmar NY 12054", type: "3-unit · Multi-family", score: 8.4, capRate: 7.2, cashFlow: 318, grossRent: "$3,400", dscr: 1.18, price: "$415,000" },
  { address: "Kenwood Ave, Troy NY 12180", masked: "XXX", fullAddress: "87 Kenwood Ave, Troy NY 12180", type: "2-unit · Multi-family", score: 6.1, capRate: 5.8, cashFlow: -84, grossRent: "$2,600", dscr: 0.97, price: "$349,000" },
  { address: "3rd Street, Troy NY 12180", masked: "XXX", fullAddress: "219 3rd Street, Troy NY 12180", type: "4-unit · Multi-family", score: 9.1, capRate: 8.4, cashFlow: 621, grossRent: "$4,800", dscr: 1.31, price: "$389,000" },
]; // fallback only

const loanTypes = ["FHA 3.5% Down", "Conventional", "DSCR", "203(k) Rehab", "VA Loan", "Hard Money", "Cash Purchase"];

const features = [
  { icon: TrendingUp, title: "Find deals before anyone else", text: "Live MLS-powered deal feed scored and ranked by cap rate, cash flow, and DSCR. The best opportunities surface first." },
  { icon: Clock, title: "Know if a deal works in 60 seconds", text: "Enter an address, choose your loan type, see every number that matters. Cap rate, NOI, cash-on-cash return, DSCR — calculated live." },
  { icon: Globe, title: "Expert-level analysis, any market", text: "The same rigor a commercial underwriter applies to a $10M deal — applied to your duplex in 60 seconds. Three scenarios included." },
  { icon: FileText, title: "Replace your spreadsheet forever", text: "Generate a professional PDF investment summary you can download, print, or send to your lender, partner, or client." },
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

// ScoreBadge, MetricPill, and UnlockModal are now imported from DealCard
/* ─── Page ─── */
const AnalyzeHub = () => {
  const navigate = useNavigate();
  const [liveDeals, setLiveDeals] = useState<Listing[]>([]);
  const [dealsLoading, setDealsLoading] = useState(true);
  const [unlockListing, setUnlockListing] = useState<Listing | null>(null);
  const [unlockedMap, setUnlockedMap] = useState<Record<string, UnlockedDetails>>({});

  useEffect(() => {
    getTopDeals(9).then((deals) => {
      setLiveDeals(deals);
      setDealsLoading(false);
    });
  }, []);

  const handleUnlocked = (mlsNumber: string, details: UnlockedDetails) => {
    setUnlockedMap((prev) => ({ ...prev, [mlsNumber]: details }));
  };

  // Use live deals if available, fall back to sample data structure
  const displayDeals = liveDeals;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEOHead
        title="Investment Property Analyzer — Any Deal, Any Loan Type | AnalyzeAnyDeal"
        description="Institutional-quality investment analysis in 60 seconds. Cap rate, cash flow, DSCR, and NOI for any property, any loan type, any market. Free professional PDF reports."
        keywords="investment property analyzer, deal analyzer, cap rate calculator, cash flow calculator, DSCR calculator, real estate investment calculator, analyze any deal"
        canonical="https://www.capitaldistrictnest.com/analyze"
      />
      <CleanHeader />

      {/* ═══════════════════════════════════════════════
          HERO — Cinematic, clean, no grain, no muddy glow
      ═══════════════════════════════════════════════ */}
      <section
        className="relative pt-48 pb-36 px-6 overflow-hidden"
        style={{ background: `linear-gradient(178deg, ${NAVY} 0%, ${CHARCOAL} 60%, ${GRAPHITE} 100%)` }}
      >
        {/* Single controlled radial bloom — not atmospheric fog */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 55% 40% at 50% 35%, rgba(255,255,255,0.025) 0%, transparent 70%)",
        }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-medium tracking-[0.45em] uppercase mb-10" style={{ color: SLATE }}>
            Analyze Any Deal · Any Market · Any Loan Type
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-[5.25rem] text-white tracking-tight leading-[1.06] mb-8">
            <span className="font-extralight">Know if a deal works</span>
            <br />
            <span className="font-semibold">before you make it.</span>
          </h1>

          <p className="text-[17px] text-white/35 max-w-md mx-auto mb-14 leading-relaxed font-light">
            Expert-level investment analysis in seconds — built for investors, agents, and serious buyers.
          </p>

          {/* Internal links to key markets */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-20">
            <span className="text-[11px] text-white/20 tracking-wide uppercase">Popular markets:</span>
            {[
              { name: "Schenectady", slug: "schenectady" },
              { name: "Albany", slug: "albany" },
              { name: "Troy", slug: "troy" },
              { name: "Saratoga Springs", slug: "saratoga-springs" },
            ].map((t) => (
              <Link key={t.slug} to={`/towns/${t.slug}`}
                className="text-[12px] text-white/30 hover:text-white/60 transition-colors font-light underline underline-offset-2 decoration-white/10 hover:decoration-white/30">
                {t.name}
              </Link>
            ))}
          </div>

          {/* ── Input bar — bright white shell ── */}
          <div className="max-w-xl mx-auto">
            <div
              className="flex flex-col md:flex-row items-stretch gap-1.5 p-2 rounded-2xl"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl">
                <Search className="w-4 h-4 text-gray-300 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter any property address..."
                  className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 outline-none text-[15px] font-light"
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
            <p className="text-white/25 text-[11px] mt-5 tracking-wide">
              Free to use · No account required · Professional PDF reports
            </p>
          </div>
        </div>

        {/* Trust proof — elegant rule + stats */}
        <div className="relative max-w-3xl mx-auto mt-32">
          <div className="h-px w-1/3 mx-auto mb-14" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {trustStats.map((s) => (
              <div key={s.label}>
                <p className="text-[15px] font-medium text-white/70 tracking-tight">{s.label}</p>
                <p className="text-[11px] text-white/20 mt-1.5 tracking-wide">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DEAL FEED — Warm white, institutional
      ═══════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: "#FAFAFB" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-5" style={{ color: SLATE }}>
            Live Capital District Deal Feed
          </p>
          <h2 className="text-3xl md:text-5xl tracking-tight mb-3">
            <span className="font-extralight">Find deals</span> <span className="font-semibold">before anyone else.</span>
          </h2>
          <p className="text-gray-400 max-w-lg mb-16 text-base font-light leading-relaxed">
            Every active multi-family listing in the Capital District — scored, ranked, and analyzed. Updated weekly from live MLS data.
          </p>

          {dealsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl bg-white p-8 animate-pulse" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
                  <div className="h-4 bg-gray-100 rounded w-1/3 mb-6" />
                  <div className="h-5 bg-gray-100 rounded w-2/3 mb-2" />
                  <div className="h-8 bg-gray-100 rounded w-1/2 mb-7" />
                  <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((j) => <div key={j} className="h-10 bg-gray-50 rounded" />)}
                  </div>
                </div>
              ))}
            </div>
          ) : displayDeals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
              {displayDeals.map((listing) => (
                <DealCard
                  key={listing.id}
                  listing={listing}
                  unlockedDetails={unlockedMap[listing.mls_number || listing.id]}
                  onUnlockClick={setUnlockListing}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
              {sampleDeals.map((deal, i) => (
                <div key={i} className="group rounded-2xl bg-white transition-all duration-300 hover:shadow-[0_6px_32px_rgba(0,0,0,0.05)] hover:-translate-y-0.5" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-gray-300 font-medium">{deal.type}</span>
                    </div>
                    <p className="text-gray-900 font-medium text-sm mb-1.5">
                      <span className="blur-[4px] select-none">{deal.masked}</span> {deal.address}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 tracking-tight mb-7">{deal.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/dealdesk" className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-gray-900 font-medium text-[13px] transition-colors tracking-wide hover:bg-gray-100" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
              View All Capital District Deals <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4 PROMISES — White, spacious capability modules
      ═══════════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl tracking-tight mb-5">
            <span className="font-extralight">Everything you need to</span>
            <br />
            <span className="font-semibold">make the right call.</span>
          </h2>
          <p className="text-gray-400 text-base font-light mb-16 max-w-lg leading-relaxed">
            Four capabilities that replace your entire analysis workflow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f) => (
              <div key={f.title} className="group p-10 rounded-3xl transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)]" style={{ background: "#FAFAFB", border: "1px solid rgba(0,0,0,0.04)" }}>
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
          LOAN TYPE — Flat precision panel (distinct from hero)
      ═══════════════════════════════════════════════ */}
      <section className="py-32 px-6" style={{ background: GRAPHITE }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-5" style={{ color: SLATE }}>
            7 Loan Types · Dynamic Inputs
          </p>
          <h2 className="text-3xl md:text-5xl tracking-tight mb-5 text-white">
            <span className="font-extralight">Your loan type</span> <span className="font-semibold">changes everything.</span>
          </h2>
          <p className="text-white/25 max-w-lg mb-16 text-base font-light leading-relaxed">
            Each loan type adjusts the analysis automatically. FHA adds mortgage insurance. DSCR removes personal income requirements. 203k adds rehab budget and ARV.
          </p>

          <div className="flex flex-wrap gap-2.5 mb-12">
            {loanTypes.map((lt) => (
              <Link key={lt} to="/analyzer"
                className="px-5 py-2.5 rounded-full text-[13px] font-medium text-white/50 transition-all duration-200 hover:text-white/80 hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                {lt}
              </Link>
            ))}
          </div>

          <Link to="/loan-types" className="text-[12px] text-white/15 hover:text-white/35 transition-colors tracking-wide inline-flex items-center gap-1">
            Not sure which loan type fits? Explore our guide <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOW IT WORKS — White, premium editorial
      ═══════════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-5 text-gray-300">
            Process
          </p>
          <h2 className="text-3xl md:text-5xl tracking-tight mb-24">
            <span className="font-extralight">From listing to decision</span>
            <br />
            <span className="font-semibold">in four steps.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            {steps.map((s, i) => (
              <div key={s.num} className="relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-7 left-[calc(100%+16px)] w-[calc(100%-56px)] h-px" style={{ background: "rgba(0,0,0,0.04)" }} />
                )}
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
          MORTGAGE CTA — Quiet warm surface
      ═══════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: "#FAFAFB" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-5 text-gray-300">
            Pre-Approval
          </p>
          <h2 className="text-3xl md:text-4xl tracking-tight mb-3">
            <span className="font-extralight">Ready to</span> <span className="font-semibold">act on a deal?</span>
          </h2>
          <p className="text-gray-400 mb-14 text-base font-light max-w-lg leading-relaxed">
            Joel Casso · Branch Manager · US Mortgage Corporation · Capital District's preferred DSCR and investment property lender.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
            <div className="rounded-2xl bg-white p-8" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
              <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gray-300 mb-6">Today's Rates</p>
              <div className="space-y-5">
                {[["30-yr Fixed", "6.75%"], ["DSCR", "6.42%"], ["15-yr Fixed", "6.18%"]].map(([label, rate]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm font-light">{label}</span>
                    <span className="text-gray-900 font-semibold text-sm tabular-nums">{rate}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-8 flex flex-col justify-center" style={{ backgroundColor: NAVY }}>
              <p className="font-medium text-lg mb-6 tracking-tight leading-snug" style={{ color: PLATINUM }}>
                Get pre-approved before you make an offer.
              </p>
              <a href="tel:5186762347"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[13px] tracking-wide transition-all hover:brightness-125 bg-white/10 text-white">
                <Phone className="w-4 h-4" /> Talk to Joel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FINAL CTA — Minimal, iconic, stripped back
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-6" style={{ background: NAVY }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl tracking-tight mb-6 text-white leading-[1.08]">
            <span className="font-extralight">Stop guessing.</span>
            <br />
            <span className="font-semibold">Start analyzing.</span>
          </h2>
          <p className="text-[15px] mb-16 max-w-sm mx-auto text-white/25 font-light leading-relaxed">
            Any property. Any market. Any loan type. In seconds.
          </p>

          <div className="max-w-md mx-auto">
            <div
              className="flex flex-col md:flex-row items-stretch gap-1.5 p-2 rounded-2xl"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl">
                <Search className="w-4 h-4 text-gray-300 shrink-0" />
                <input type="text" placeholder="Enter any property address..."
                  className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 outline-none text-[15px] font-light"
                  onKeyDown={(e) => { if (e.key === "Enter") navigate("/analyzer"); }} />
              </div>
              <button onClick={() => navigate("/analyzer")}
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-[13px] tracking-wide shrink-0 transition-all text-white hover:opacity-90"
                style={{ backgroundColor: NAVY }}>
                Analyze <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <div className="py-4 text-center text-[11px] text-gray-300 tracking-wide" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
        AnalyzeAnyDeal.com is powered by Capital District Nest · Built by Scott Alvarez · RE/MAX Solutions · Albany, NY
      </div>

      {unlockListing && <UnlockModal listing={unlockListing} onClose={() => setUnlockListing(null)} onUnlocked={handleUnlocked} />}
    </div>
  );
};

export default AnalyzeHub;
