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

const GOLD = "#C9A84C";
const NAVY = "#0A0F1E";

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
    ? "bg-emerald-500/10 text-emerald-600"
    : score >= 5
      ? "bg-amber-500/10 text-amber-600"
      : "bg-red-500/10 text-red-600";
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${cls}`}>
      Deal Score {score}
    </span>
  );
}

function MetricPill({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <span className="text-xs">
      <span className="text-muted-foreground">{label}</span>{" "}
      <span className={`font-semibold ${positive ? "text-emerald-600" : "text-red-500"}`}>{value}</span>
    </span>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-black text-foreground mb-1">Unlock Full Address</h3>
        <p className="text-sm text-muted-foreground mb-6">
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
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={255}
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            {submitting ? "Unlocking..." : "Unlock Address"}
            {!submitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
        <p className="text-xs text-muted-foreground/60 text-center mt-4">
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

      {/* ===== HERO ===== */}
      <section className="relative pt-40 pb-24 px-6 hero-gradient">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-left">
          <p className="text-xs font-bold tracking-[0.35em] uppercase mb-6" style={{ color: GOLD }}>
            Analyze Any Deal · Any Market · Any Loan Type
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary-foreground tracking-tight mb-6 leading-[1.05]">
            Know if a deal works<br />before you make it.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/60 max-w-2xl mb-14 leading-relaxed">
            Institutional-quality investment analysis in 60 seconds. Find deals before anyone else. Replace your spreadsheet forever.
          </p>

          {/* Hero input bar */}
          <div className="w-full max-w-3xl">
            <div className="flex flex-col md:flex-row items-stretch gap-3 p-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10">
                <Search className="w-5 h-5 text-white/40 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter any property address to analyze..."
                  className="w-full bg-transparent text-white placeholder:text-white/40 outline-none text-base"
                  onKeyDown={(e) => { if (e.key === "Enter") navigate("/analyzer"); }}
                />
              </div>
              <button
                onClick={() => navigate("/analyzer")}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide hover:opacity-90 transition-opacity shrink-0"
                style={{ backgroundColor: GOLD, color: NAVY }}
              >
                Analyze This Deal <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-white/30 text-xs mt-3">
              Free to use · No account required · Professional PDF reports
            </p>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="relative max-w-4xl mx-auto mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustStats.map((s) => (
              <div key={s.label} className="text-left">
                <p className="text-2xl font-bold text-primary-foreground">{s.label}</p>
                <p className="text-xs text-primary-foreground/40 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEAL FEED ===== */}
      <section className="pt-12 pb-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-[0.35em] uppercase mb-3" style={{ color: GOLD }}>
            Live Capital District Deal Feed
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-3">
            Find deals before anyone else.
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-14 text-lg">
            Every active multi-family listing in the Capital District — scored, ranked, and analyzed. Updated weekly from live MLS data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {sampleDeals.map((deal, i) => {
              const isUnlocked = unlockedIndexes.has(i);
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card hover-lift overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-muted-foreground">{deal.type}</span>
                      <ScoreBadge score={deal.score} />
                    </div>
                    <p className="text-foreground font-semibold mb-1">
                      {isUnlocked ? (
                        deal.fullAddress
                      ) : (
                        <>
                          <span className="blur-[4px] select-none">{deal.masked}</span>{" "}
                          {deal.address}
                        </>
                      )}
                    </p>
                    <p className="text-3xl font-black text-foreground tracking-tight mb-5">{deal.price}</p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-5">
                      <MetricPill label="Cap Rate" value={`${deal.capRate}%`} positive={deal.capRate >= 7} />
                      <MetricPill label="Cash Flow" value={`${deal.cashFlow >= 0 ? "+" : ""}$${deal.cashFlow}/mo`} positive={deal.cashFlow >= 0} />
                      <MetricPill label="Rent" value={deal.grossRent} positive />
                      <MetricPill label="DSCR" value={`${deal.dscr}`} positive={deal.dscr >= 1} />
                    </div>

                    {isUnlocked ? (
                      <span className="text-xs font-semibold text-emerald-600 inline-flex items-center gap-1">
                        ✓ Address unlocked
                      </span>
                    ) : (
                      <button
                        onClick={() => setUnlockDeal(deal)}
                        className="text-xs font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
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
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-colors"
            >
              View All Capital District Deals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 4 PROMISES ===== */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight text-left mb-10">
            Everything you need to<br />make the right call.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f) => (
              <div key={f.title} className="p-7 rounded-2xl bg-background border border-border hover-lift">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${GOLD}18` }}>
                  <f.icon className="w-5 h-5" style={{ color: GOLD }} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOAN TYPE SWITCHER ===== */}
      <section className="py-24 px-6 hero-gradient">
        <div className="max-w-4xl mx-auto text-left">
          <p className="text-xs font-bold tracking-[0.35em] uppercase mb-3" style={{ color: GOLD }}>
            7 Loan Types · Dynamic Inputs
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-primary-foreground tracking-tight mb-4">
            Your loan type changes everything.
          </h2>
          <p className="text-primary-foreground/50 max-w-2xl mb-12 text-lg">
            Each loan type adjusts the analysis automatically. FHA adds mortgage insurance. DSCR removes personal income requirements. 203k adds rehab budget and ARV.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {loanTypes.map((lt) => (
              <Link
                key={lt}
                to="/analyzer"
                className="px-5 py-2.5 rounded-full border border-white/20 text-sm font-semibold text-primary-foreground hover:bg-white/10 transition-colors"
              >
                {lt}
              </Link>
            ))}
          </div>

          <Link to="/loan-types" className="text-sm text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors">
            Not sure which loan type fits? Visit our Loan Types guide →
          </Link>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight text-left mb-16">
            From listing to decision<br />in four steps.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.num}>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5 text-lg font-black"
                  style={{ backgroundColor: NAVY, color: GOLD }}
                >
                  {s.num}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MORTGAGE CTA ===== */}
      <section className="py-24 px-6 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-3">
            Ready to act on a deal?
          </h2>
          <p className="text-muted-foreground mb-12 text-lg">
            Joel Casso · Branch Manager · US Mortgage Corporation · Capital District's preferred DSCR and investment property lender.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <div className="rounded-2xl border border-border bg-background p-6">
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Today's Rates</p>
              <div className="space-y-3">
                {[["30-yr Fixed", "6.75%"], ["DSCR", "6.42%"], ["15-yr Fixed", "6.18%"]].map(([label, rate]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">{label}</span>
                    <span className="text-foreground font-bold">{rate}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-6 flex flex-col justify-center" style={{ backgroundColor: NAVY }}>
              <p className="font-bold text-lg mb-4 text-white">
                Get pre-approved before you make an offer.
              </p>
              <a
                href="tel:5186762347"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: GOLD, color: NAVY }}
              >
                <Phone className="w-4 h-4" />
                Talk to Joel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-24 px-6 hero-gradient">
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">
            Stop guessing.<br />Start analyzing.
          </h2>
          <p className="text-lg mb-14 max-w-xl text-white/60">
            Free to use. No account required. Any property. Any loan type. In seconds.
          </p>

          {/* Bottom input bar */}
          <div className="w-full max-w-3xl">
            <div className="flex flex-col md:flex-row items-stretch gap-3 p-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10">
                <Search className="w-5 h-5 text-white/40 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter any property address to analyze..."
                  className="w-full bg-transparent text-white placeholder:text-white/40 outline-none text-base"
                  onKeyDown={(e) => { if (e.key === "Enter") navigate("/analyzer"); }}
                />
              </div>
              <button
                onClick={() => navigate("/analyzer")}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide hover:opacity-90 transition-opacity shrink-0"
                style={{ backgroundColor: GOLD, color: NAVY }}
              >
                Analyze This Deal <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-white/30 text-xs mt-3">
              Free to use · No account required · Professional PDF reports
            </p>
          </div>
        </div>

        {/* Gold accent strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: GOLD }} />
      </section>

      <Footer />

      <div className="py-4 text-center text-xs text-muted-foreground border-t border-border">
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
