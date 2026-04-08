import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Search, TrendingUp, Clock, Globe, FileText, ChevronRight,
  Phone, ArrowRight, X
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/* ─── Brand tokens ─── */
const GOLD = "#C9A84C";
const GOLD_MUTED = "#C9A84C20";
const NAVY = "#0A0F1E";
const CHARCOAL = "#111318";
const GRAPHITE = "#181B22";

const sampleDeals = [
  {
    address: "Delaware Ave, Delmar NY 12054",
    masked: "XXX",
    fullAddress: "142 Delaware Ave, Delmar NY 12054",
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
    fullAddress: "87 Kenwood Ave, Troy NY 12180",
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
    fullAddress: "219 3rd Street, Troy NY 12180",
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
  "FHA 3.5% Down", "Conventional", "DSCR", "203(k) Rehab",
  "VA Loan", "Hard Money", "Cash Purchase",
];

const features = [
  { icon: TrendingUp, title: "Find deals before anyone else", text: "Live MLS-powered deal feed scored and ranked by cap rate, cash flow, and DSCR. The best opportunities surface first." },
  { icon: Clock, title: "Know if a deal works in 60 seconds", text: "Enter an address, choose your loan type, see every number that matters. Cap rate, NOI, cash-on-cash return, DSCR — calculated live." },
  { icon: Globe, title: "Institutional-quality analysis, any market", text: "The same rigor a commercial underwriter applies to a $10M deal — applied to your duplex in 60 seconds. Three scenarios included." },
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

function ScoreBadge({ score }: { score: number }) {
  const cls = score >= 8
    ? "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20"
    : score >= 5
      ? "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20"
      : "bg-red-500/10 text-red-500 ring-1 ring-red-500/20";
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${cls}`}>
      {score.toFixed(1)}
    </span>
  );
}

function MetricPill({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">{label}</span>
      <span className={`text-sm font-semibold tabular-nums ${positive ? "text-emerald-500" : "text-red-400"}`}>{value}</span>
    </div>
  );
}

function UnlockModal({
  deal,
  onClose,
  onUnlocked,
}: {
  deal: typeof sampleDeals[0];
  onClose: () => void;
  onUnlocked: (idx: number) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dealIdx = sampleDeals.indexOf(deal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    try {
      await supabase.from("leads").insert({
        full_name: name.trim(),
        email: email.trim(),
        message: `Unlock address request: ${deal.address} (${deal.price})`,
        type: "deal_unlock",
        lead_type: "investor",
      });
      onUnlocked(dealIdx);
      toast.success("Address unlocked!");
      onClose();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={onClose}>
      <div
        className="relative w-full max-w-md rounded-3xl bg-card p-10 shadow-2xl border border-border/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-2xl font-semibold text-foreground mb-1 tracking-tight">Unlock Full Address</h3>
        <p className="text-sm text-muted-foreground mb-8">
          Enter your info to see the full address for this {deal.type} at {deal.price}.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
            className="w-full px-5 py-3.5 rounded-xl border border-border/50 bg-muted/50 text-foreground placeholder:text-muted-foreground/50 outline-none text-sm focus:ring-1 focus:ring-[#C9A84C]/30 transition-shadow"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={255}
            className="w-full px-5 py-3.5 rounded-xl border border-border/50 bg-muted/50 text-foreground placeholder:text-muted-foreground/50 outline-none text-sm focus:ring-1 focus:ring-[#C9A84C]/30 transition-shadow"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm tracking-wide hover:brightness-110 transition-all disabled:opacity-50"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            {submitting ? "Unlocking..." : "Unlock Address"}
            {!submitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
        <p className="text-[11px] text-muted-foreground/40 text-center mt-5">
          Free · No spam · Your data stays private
        </p>
      </div>
    </div>
  );
}

const AnalyzeHub = () => {
  const navigate = useNavigate();
  const [unlockDeal, setUnlockDeal] = useState<typeof sampleDeals[0] | null>(null);
  const [unlockedIndexes, setUnlockedIndexes] = useState<Set<number>>(new Set());

  const handleUnlocked = (idx: number) => {
    setUnlockedIndexes((prev) => new Set(prev).add(idx));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Analyze Any Deal | Free Investment Property Calculator | AnalyzeAnyDeal"
        description="Institutional-quality investment analysis in 60 seconds. Cap rate, cash flow, DSCR, and NOI for any property, any loan type, any market. Free professional PDF reports."
        keywords="investment property analyzer, deal analyzer, cap rate calculator, cash flow calculator, DSCR calculator, real estate investment calculator, analyze any deal"
        canonical="https://www.capitaldistrictnest.com/analyze"
      />
      <CleanHeader />

      {/* ═══════════════════════════════════════════════
          HERO — Cinematic flagship product reveal
          Deep charcoal → graphite with controlled radial glow
      ═══════════════════════════════════════════════ */}
      <section
        className="relative pt-44 pb-32 px-6 overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${CHARCOAL} 55%, ${GRAPHITE} 100%)` }}
      >
        {/* Atmospheric radial light — subtle, not muddy */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 30% 20%, rgba(201,168,76,0.06) 0%, transparent 70%),
                         radial-gradient(ellipse 50% 40% at 80% 60%, rgba(255,255,255,0.02) 0%, transparent 60%)`,
          }}
        />
        {/* Subtle grain overlay for depth */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-4xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-8 opacity-80" style={{ color: GOLD }}>
            Analyze Any Deal · Any Market · Any Loan Type
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extralight text-white tracking-tight leading-[1.08] mb-8">
            Know if a deal works
            <br />
            <span className="font-semibold">before you make it.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/45 max-w-xl mb-16 leading-relaxed font-light">
            Institutional-quality investment analysis in 60 seconds. 
            Find deals before anyone else. Replace your spreadsheet forever.
          </p>

          {/* ── Premium Input Bar ── */}
          <div className="w-full max-w-2xl">
            <div
              className="flex flex-col md:flex-row items-stretch gap-2 p-1.5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 0 80px rgba(201,168,76,0.04), 0 4px 32px rgba(0,0,0,0.3)",
              }}
            >
              <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                <Search className="w-4 h-4 text-white/30 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter any property address..."
                  className="w-full bg-transparent text-white placeholder:text-white/30 outline-none text-[15px] font-light"
                  onKeyDown={(e) => { if (e.key === "Enter") navigate("/analyzer"); }}
                />
              </div>
              <button
                onClick={() => navigate("/analyzer")}
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-[13px] tracking-wide shrink-0 transition-all hover:brightness-110 hover:shadow-lg"
                style={{ backgroundColor: GOLD, color: NAVY, boxShadow: "0 4px 20px rgba(201,168,76,0.25)" }}
              >
                Analyze This Deal <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-white/25 text-[11px] mt-4 tracking-wide">
              Free to use · No account required · Professional PDF reports
            </p>
          </div>
        </div>

        {/* Trust Stats — separated with elegant spacing */}
        <div className="relative max-w-4xl mx-auto mt-28">
          <div className="h-px w-full mb-12" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {trustStats.map((s) => (
              <div key={s.label}>
                <p className="text-xl font-semibold text-white/90 tracking-tight">{s.label}</p>
                <p className="text-[11px] text-white/30 mt-1.5 tracking-wide">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DEAL FEED — Warm white, clean, institutional
      ═══════════════════════════════════════════════ */}
      <section className="pt-24 pb-28 px-6" style={{ background: "linear-gradient(180deg, #FAFAF8 0%, #FFFFFF 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-4" style={{ color: GOLD }}>
            Live Capital District Deal Feed
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight text-foreground tracking-tight mb-3">
            Find deals <span className="font-semibold">before anyone else.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mb-16 text-base font-light leading-relaxed">
            Every active multi-family listing in the Capital District — scored, ranked, and analyzed. Updated weekly from live MLS data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {sampleDeals.map((deal, i) => {
              const isUnlocked = unlockedIndexes.has(i);
              return (
                <div
                  key={i}
                  className="group rounded-2xl bg-white border border-gray-100 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="p-7">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[11px] tracking-wider uppercase text-muted-foreground/60 font-medium">{deal.type}</span>
                      <ScoreBadge score={deal.score} />
                    </div>
                    <p className="text-foreground font-medium text-sm mb-1.5">
                      {isUnlocked ? (
                        deal.fullAddress
                      ) : (
                        <>
                          <span className="blur-[4px] select-none">{deal.masked}</span>{" "}
                          {deal.address}
                        </>
                      )}
                    </p>
                    <p className="text-3xl font-semibold text-foreground tracking-tight mb-6">{deal.price}</p>

                    <div className="grid grid-cols-4 gap-3 pb-6 mb-5 border-b border-gray-100/80">
                      <MetricPill label="Cap" value={`${deal.capRate}%`} positive={deal.capRate >= 7} />
                      <MetricPill label="Flow" value={`${deal.cashFlow >= 0 ? "+" : ""}$${deal.cashFlow}`} positive={deal.cashFlow >= 0} />
                      <MetricPill label="Rent" value={deal.grossRent} positive />
                      <MetricPill label="DSCR" value={`${deal.dscr}`} positive={deal.dscr >= 1} />
                    </div>

                    {isUnlocked ? (
                      <span className="text-[11px] font-medium text-emerald-500 inline-flex items-center gap-1.5 tracking-wide">
                        ✓ Address unlocked
                      </span>
                    ) : (
                      <button
                        onClick={() => setUnlockDeal(deal)}
                        className="text-[11px] font-medium inline-flex items-center gap-1 tracking-wide transition-all hover:gap-2 group-hover:opacity-100 opacity-70"
                        style={{ color: GOLD }}
                      >
                        Unlock full address <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/dealdesk"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-gray-200 text-foreground font-medium text-[13px] hover:bg-gray-50 transition-colors tracking-wide"
            >
              View All Capital District Deals <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4 PROMISES — Soft off-white, Apple capability modules
      ═══════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: "#F5F5F3" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extralight text-foreground tracking-tight mb-4">
            Everything you need to
            <br />
            <span className="font-semibold">make the right call.</span>
          </h2>
          <p className="text-muted-foreground text-base font-light mb-14 max-w-lg">
            Four capabilities that replace your entire analysis workflow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-8 rounded-2xl bg-white transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: GOLD_MUTED }}
                >
                  <f.icon className="w-[18px] h-[18px]" style={{ color: GOLD }} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm font-light">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          LOAN TYPE — Precision data panel (flatter, cleaner)
      ═══════════════════════════════════════════════ */}
      <section
        className="py-28 px-6"
        style={{ background: `linear-gradient(180deg, ${CHARCOAL} 0%, ${GRAPHITE} 100%)` }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-4 opacity-70" style={{ color: GOLD }}>
            7 Loan Types · Dynamic Inputs
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight text-white tracking-tight mb-4">
            Your loan type <span className="font-semibold">changes everything.</span>
          </h2>
          <p className="text-white/35 max-w-xl mb-14 text-base font-light leading-relaxed">
            Each loan type adjusts the analysis automatically. FHA adds mortgage insurance. DSCR removes personal income requirements. 203k adds rehab budget and ARV.
          </p>

          <div className="flex flex-wrap gap-2.5 mb-10">
            {loanTypes.map((lt) => (
              <Link
                key={lt}
                to="/analyzer"
                className="px-5 py-2.5 rounded-full text-[13px] font-medium text-white/70 transition-all duration-200 hover:text-white hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {lt}
              </Link>
            ))}
          </div>

          <Link to="/loan-types" className="text-[12px] text-white/25 hover:text-white/50 transition-colors tracking-wide">
            Not sure which loan type fits? Visit our Loan Types guide →
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOW IT WORKS — White, editorial pacing
      ═══════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-4 text-muted-foreground/50">
            How It Works
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight text-foreground tracking-tight mb-20">
            From listing to decision
            <br />
            <span className="font-semibold">in four steps.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {steps.map((s, i) => (
              <div key={s.num} className="relative">
                {/* Connecting line (desktop only) */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-7 left-[calc(100%+8px)] w-[calc(100%-40px)] h-px bg-gray-100" />
                )}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6 text-[13px] font-semibold tracking-wide"
                  style={{ backgroundColor: NAVY, color: GOLD }}
                >
                  {s.num}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MORTGAGE CTA — Soft warm surface
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: "#FAFAF8" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-4 text-muted-foreground/50">
            Pre-Approval
          </p>
          <h2 className="text-3xl md:text-4xl font-extralight text-foreground tracking-tight mb-3">
            Ready to <span className="font-semibold">act on a deal?</span>
          </h2>
          <p className="text-muted-foreground mb-14 text-base font-light max-w-lg leading-relaxed">
            Joel Casso · Branch Manager · US Mortgage Corporation · Capital District's preferred DSCR and investment property lender.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
            <div className="rounded-2xl bg-white p-7" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
              <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-muted-foreground/50 mb-5">Today's Rates</p>
              <div className="space-y-4">
                {[["30-yr Fixed", "6.75%"], ["DSCR", "6.42%"], ["15-yr Fixed", "6.18%"]].map(([label, rate]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm font-light">{label}</span>
                    <span className="text-foreground font-semibold text-sm tabular-nums">{rate}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-7 flex flex-col justify-center"
              style={{ backgroundColor: NAVY }}
            >
              <p className="font-medium text-lg mb-5 text-white tracking-tight leading-snug">
                Get pre-approved before you make an offer.
              </p>
              <a
                href="tel:5186762347"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[13px] tracking-wide transition-all hover:brightness-110"
                style={{ backgroundColor: GOLD, color: NAVY }}
              >
                <Phone className="w-4 h-4" />
                Talk to Joel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FINAL CTA — Minimal, iconic, conclusive
      ═══════════════════════════════════════════════ */}
      <section
        className="py-32 px-6"
        style={{ background: NAVY }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight mb-5 text-white leading-[1.1]">
            Stop guessing.
            <br />
            <span className="font-semibold">Start analyzing.</span>
          </h2>
          <p className="text-base mb-14 max-w-md mx-auto text-white/35 font-light leading-relaxed">
            Free to use. No account required. Any property. Any loan type. In seconds.
          </p>

          {/* Centered premium input bar */}
          <div className="w-full max-w-xl mx-auto">
            <div
              className="flex flex-col md:flex-row items-stretch gap-2 p-1.5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                <Search className="w-4 h-4 text-white/30 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter any property address..."
                  className="w-full bg-transparent text-white placeholder:text-white/30 outline-none text-[15px] font-light"
                  onKeyDown={(e) => { if (e.key === "Enter") navigate("/analyzer"); }}
                />
              </div>
              <button
                onClick={() => navigate("/analyzer")}
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-[13px] tracking-wide shrink-0 transition-all hover:brightness-110"
                style={{ backgroundColor: GOLD, color: NAVY }}
              >
                Analyze This Deal <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <div className="py-4 text-center text-[11px] text-muted-foreground/50 border-t border-border/50 tracking-wide">
        AnalyzeAnyDeal.com is powered by Capital District Nest · Built by Scott Alvarez · RE/MAX Solutions · Albany, NY
      </div>

      {/* Unlock modal */}
      {unlockDeal && (
        <UnlockModal
          deal={unlockDeal}
          onClose={() => setUnlockDeal(null)}
          onUnlocked={handleUnlocked}
        />
      )}
    </div>
  );
};

export default AnalyzeHub;
