import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Calculator,
  Building2,
  TrendingUp,
  Landmark,
  PiggyBank,
  Briefcase,
  Receipt,
  ShieldCheck,
  Banknote,
  LineChart,
  RefreshCw,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Product = {
  icon: typeof Calculator;
  title: string;
  blurb: string;
  cta: string;
  leadType: string;
};

const products: Product[] = [
  { icon: Banknote, title: "Mortgage Pre-Approval", blurb: "Compare payments, down-payment paths, and approval timelines with a local lender.", cta: "Request Introduction", leadType: "mortgage" },
  { icon: Landmark, title: "Banks & Credit Unions", blurb: "Local banking, lending, deposits, and business-account relationships.", cta: "Request Introduction", leadType: "banking" },
  { icon: TrendingUp, title: "Financial Advisors", blurb: "Wealth planning, investment strategy, retirement design, and insurance planning.", cta: "Request Introduction", leadType: "financial_advisor" },
  { icon: Receipt, title: "Accountants & CPAs", blurb: "Tax strategy, entity structuring, and accounting that scales with your goals.", cta: "Request Introduction", leadType: "accounting" },
  { icon: ShieldCheck, title: "Insurance & Risk Planning", blurb: "Life, business, property, landlord, and umbrella coverage from local pros.", cta: "Request Introduction", leadType: "insurance" },
  { icon: Building2, title: "Investment Property Analysis", blurb: "Underwrite rental income, debt service, cap rate, and cash flow before you offer.", cta: "Request Introduction", leadType: "investment_property" },
  { icon: LineChart, title: "DSCR / Rental Financing", blurb: "Qualify on the property's income — no W-2s. Built for investors scaling a portfolio.", cta: "Request Introduction", leadType: "dscr" },
  { icon: Briefcase, title: "Commercial Lending", blurb: "Multifamily, mixed-use, small commercial, and owner-occupied business property financing.", cta: "Request Introduction", leadType: "commercial_lending" },
  { icon: PiggyBank, title: "Business Owner Capital", blurb: "Expansion, acquisition, equipment financing, and working capital for operators.", cta: "Request Introduction", leadType: "business_capital" },
  { icon: RefreshCw, title: "Refinance Strategy", blurb: "Rate-and-term, cash-out, and portfolio refi modeling for owners and investors.", cta: "Request Introduction", leadType: "refinance" },
  { icon: Calculator, title: "Tax Strategy", blurb: "Proactive tax planning for W-2 earners, investors, and small business owners.", cta: "Request Introduction", leadType: "tax_strategy" },
  { icon: Sparkles, title: "Wealth & Retirement Planning", blurb: "Long-horizon planning for retirement, education, and generational wealth.", cta: "Request Introduction", leadType: "wealth_planning" },
];

const pulseCards = [
  { icon: Banknote, title: "Mortgage & lending activity", blurb: "Local buyers, investors, and business owners comparing financing options." },
  { icon: Landmark, title: "Business banking & capital", blurb: "Banks, credit unions, and commercial lenders supporting local growth." },
  { icon: TrendingUp, title: "Financial planning & tax strategy", blurb: "Advisors, accountants, and insurance professionals helping residents and business owners plan ahead." },
  { icon: Building2, title: "Investment property analysis", blurb: "Cash flow, DSCR, cap rate, and financing review for local property opportunities." },
];

const partners = [
  { icon: Banknote, label: "Mortgage", blurb: "Purchase, refinance, FHA, VA, jumbo, and investor loans from local lenders.", leadType: "mortgage" },
  { icon: Landmark, label: "Banking", blurb: "Community banks and credit unions for personal, business, and lending.", leadType: "banking" },
  { icon: TrendingUp, label: "Financial Planning", blurb: "Independent advisors for retirement, wealth, and legacy strategy.", leadType: "financial_advisor" },
  { icon: Receipt, label: "Accounting / Tax", blurb: "CPAs and tax pros for individuals, investors, and small businesses.", leadType: "accounting" },
  { icon: ShieldCheck, label: "Insurance", blurb: "Life, business, property, landlord, and risk-planning specialists.", leadType: "insurance" },
  { icon: Briefcase, label: "Commercial Lending", blurb: "Multifamily, mixed-use, and owner-occupied commercial financing.", leadType: "commercial_lending" },
  { icon: PiggyBank, label: "Business Capital", blurb: "Working capital, SBA, equipment, and growth financing.", leadType: "business_capital" },
];

const objectiveOptions: { value: string; label: string }[] = [
  { value: "mortgage", label: "Mortgage pre-approval" },
  { value: "banking", label: "Connect with a bank or credit union" },
  { value: "financial_advisor", label: "Connect with a financial advisor" },
  { value: "accounting", label: "Connect with an accountant / CPA" },
  { value: "insurance", label: "Insurance or risk planning" },
  { value: "investment_property", label: "Analyze an investment property" },
  { value: "dscr", label: "DSCR / rental property financing" },
  { value: "commercial_lending", label: "Commercial lending" },
  { value: "business_capital", label: "Business-owner capital" },
  { value: "refinance", label: "Refinance strategy" },
  { value: "tax_strategy", label: "Tax strategy" },
  { value: "wealth_planning", label: "Wealth / retirement planning" },
];

const money = (n: number) =>
  isFinite(n) && !isNaN(n)
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : "—";

const pct = (n: number) => (isFinite(n) && !isNaN(n) ? `${n.toFixed(2)}%` : "—");

function pmt(principal: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

// ───────────────────────────────── Calculators ─────────────────────────────────

const MortgageCalc = () => {
  const [price, setPrice] = useState(425000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState(30);
  const [taxes, setTaxes] = useState(7800);
  const [insurance, setInsurance] = useState(1800);

  const loan = price * (1 - down / 100);
  const pi = pmt(loan, rate, term);
  const total = pi + taxes / 12 + insurance / 12;

  return (
    <CalcShell
      inputs={
        <>
          <NumField label="Purchase price" value={price} onChange={setPrice} prefix="$" />
          <NumField label="Down payment %" value={down} onChange={setDown} suffix="%" />
          <NumField label="Interest rate" value={rate} onChange={setRate} suffix="%" step={0.125} />
          <NumField label="Term (years)" value={term} onChange={setTerm} />
          <NumField label="Annual taxes" value={taxes} onChange={setTaxes} prefix="$" />
          <NumField label="Annual insurance" value={insurance} onChange={setInsurance} prefix="$" />
        </>
      }
      results={[
        { label: "Loan amount", value: money(loan) },
        { label: "Principal & interest", value: money(pi) + " / mo" },
        { label: "Total PITI", value: money(total) + " / mo", highlight: true },
      ]}
    />
  );
};

const InvestmentCalc = () => {
  const [price, setPrice] = useState(350000);
  const [down, setDown] = useState(25);
  const [rate, setRate] = useState(7.5);
  const [term, setTerm] = useState(30);
  const [rent, setRent] = useState(3200);
  const [expenses, setExpenses] = useState(950);

  const loan = price * (1 - down / 100);
  const debt = pmt(loan, rate, term);
  const noi = (rent - expenses) * 12;
  const cashFlow = rent - expenses - debt;
  const cap = (noi / price) * 100;
  const cashIn = price * (down / 100);
  const coc = ((cashFlow * 12) / cashIn) * 100;

  return (
    <CalcShell
      inputs={
        <>
          <NumField label="Purchase price" value={price} onChange={setPrice} prefix="$" />
          <NumField label="Down payment %" value={down} onChange={setDown} suffix="%" />
          <NumField label="Interest rate" value={rate} onChange={setRate} suffix="%" step={0.125} />
          <NumField label="Term (years)" value={term} onChange={setTerm} />
          <NumField label="Gross monthly rent" value={rent} onChange={setRent} prefix="$" />
          <NumField label="Monthly operating exp." value={expenses} onChange={setExpenses} prefix="$" />
        </>
      }
      results={[
        { label: "NOI (annual)", value: money(noi) },
        { label: "Cap rate", value: pct(cap) },
        { label: "Monthly cash flow", value: money(cashFlow), highlight: true },
        { label: "Cash-on-cash", value: pct(coc) },
      ]}
    />
  );
};

const DscrCalc = () => {
  const [price, setPrice] = useState(425000);
  const [down, setDown] = useState(25);
  const [rate, setRate] = useState(8.25);
  const [term, setTerm] = useState(30);
  const [rent, setRent] = useState(3800);
  const [taxIns, setTaxIns] = useState(550);

  const loan = price * (1 - down / 100);
  const debt = pmt(loan, rate, term) + taxIns;
  const dscr = rent / debt;
  const verdict =
    dscr >= 1.25 ? "Strong — DSCR ≥ 1.25" : dscr >= 1.0 ? "Borderline — most lenders want 1.20+" : "Below 1.0 — negative coverage";

  return (
    <CalcShell
      inputs={
        <>
          <NumField label="Purchase price" value={price} onChange={setPrice} prefix="$" />
          <NumField label="Down payment %" value={down} onChange={setDown} suffix="%" />
          <NumField label="DSCR rate" value={rate} onChange={setRate} suffix="%" step={0.125} />
          <NumField label="Term (years)" value={term} onChange={setTerm} />
          <NumField label="Market rent (mo)" value={rent} onChange={setRent} prefix="$" />
          <NumField label="Taxes + insurance (mo)" value={taxIns} onChange={setTaxIns} prefix="$" />
        </>
      }
      results={[
        { label: "Total debt service (PITI)", value: money(debt) + " / mo" },
        { label: "DSCR", value: dscr.toFixed(2), highlight: true },
        { label: "Lender verdict", value: verdict },
      ]}
    />
  );
};

const RefinanceCalc = () => {
  const [balance, setBalance] = useState(280000);
  const [oldRate, setOldRate] = useState(7.5);
  const [newRate, setNewRate] = useState(6.0);
  const [term, setTerm] = useState(30);
  const [closing, setClosing] = useState(6500);

  const oldPI = pmt(balance, oldRate, term);
  const newPI = pmt(balance, newRate, term);
  const monthlySave = oldPI - newPI;
  const breakeven = closing / monthlySave;

  return (
    <CalcShell
      inputs={
        <>
          <NumField label="Current loan balance" value={balance} onChange={setBalance} prefix="$" />
          <NumField label="Current rate" value={oldRate} onChange={setOldRate} suffix="%" step={0.125} />
          <NumField label="New rate" value={newRate} onChange={setNewRate} suffix="%" step={0.125} />
          <NumField label="New term (years)" value={term} onChange={setTerm} />
          <NumField label="Closing costs" value={closing} onChange={setClosing} prefix="$" />
        </>
      }
      results={[
        { label: "Current P&I", value: money(oldPI) + " / mo" },
        { label: "New P&I", value: money(newPI) + " / mo" },
        { label: "Monthly savings", value: money(monthlySave), highlight: true },
        { label: "Break-even", value: isFinite(breakeven) && breakeven > 0 ? `${breakeven.toFixed(1)} months` : "—" },
      ]}
    />
  );
};

const BusinessCapitalCalc = () => {
  const [amount, setAmount] = useState(150000);
  const [rate, setRate] = useState(9.5);
  const [term, setTerm] = useState(7);
  const [revenue, setRevenue] = useState(45000);

  const monthly = pmt(amount, rate, term);
  const dscr = (revenue * 0.15) / monthly;

  return (
    <CalcShell
      inputs={
        <>
          <NumField label="Capital needed" value={amount} onChange={setAmount} prefix="$" />
          <NumField label="Rate" value={rate} onChange={setRate} suffix="%" step={0.125} />
          <NumField label="Term (years)" value={term} onChange={setTerm} />
          <NumField label="Monthly revenue" value={revenue} onChange={setRevenue} prefix="$" />
        </>
      }
      results={[
        { label: "Monthly payment", value: money(monthly) + " / mo", highlight: true },
        { label: "Est. coverage ratio", value: dscr.toFixed(2) },
        { label: "Lender guidance", value: dscr >= 1.25 ? "Strong coverage" : "Talk to a local banker" },
      ]}
    />
  );
};

// ──────────────────────── Calc primitives ────────────────────────

const NumField = ({
  label, value, onChange, prefix, suffix, step = 1,
}: { label: string; value: number; onChange: (n: number) => void; prefix?: string; suffix?: string; step?: number }) => (
  <label className="block">
    <span className="text-xs uppercase tracking-[0.14em] text-primary/90 font-medium">{label}</span>
    <div className="mt-1.5 flex items-center rounded-xl border border-border bg-background/60 focus-within:border-primary transition-colors">
      {prefix && <span className="pl-3 text-white/50">{prefix}</span>}
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full bg-transparent px-3 py-3 text-lg text-foreground outline-none"
      />
      {suffix && <span className="pr-3 text-white/50">{suffix}</span>}
    </div>
  </label>
);

const CalcShell = ({
  inputs, results,
}: { inputs: React.ReactNode; results: { label: string; value: string; highlight?: boolean }[] }) => (
  <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">
    <div className="rounded-2xl border border-border bg-card/60 p-5 md:p-6 space-y-4">{inputs}</div>
    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 md:p-6 space-y-3">
      {results.map((r) => (
        <div
          key={r.label}
          className={`rounded-xl border ${r.highlight ? "border-primary/50 bg-primary/10" : "border-border bg-background/40"} px-4 py-3 flex items-center justify-between gap-4`}
        >
          <span className="text-sm text-white/70">{r.label}</span>
          <span className={`text-base md:text-lg font-semibold ${r.highlight ? "text-primary" : "text-foreground"}`}>{r.value}</span>
        </div>
      ))}
      <p className="text-xs text-white/45 pt-1">
        Estimates only. Not a loan commitment. Verify with your lender, CPA, or financial advisor.
      </p>
    </div>
  </div>
);

// ───────────────────────────────── DealDesk Form ─────────────────────────────────

const DealDeskForm = ({ defaultObjective }: { defaultObjective?: string }) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    lead_type: defaultObjective || "",
    property_address: "",
    purchase_price: "",
    estimated_rent: "",
    notes: "",
  });

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.lead_type) {
      toast({ title: "Missing info", description: "Name, email, phone, and primary objective are required.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("investment_leads").insert({
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      lead_type: form.lead_type,
      property_address: form.property_address || null,
      purchase_price: form.purchase_price ? Number(form.purchase_price) : null,
      estimated_rent: form.estimated_rent ? Number(form.estimated_rent) : null,
      notes: form.notes || null,
      source_page: "/finances",
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }
    setDone(true);
    toast({ title: "Scenario received", description: "Scott or a Capital District financial partner will reach out shortly." });
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-primary/40 bg-primary/10 p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
        <h3 className="text-xl font-semibold mb-1">Your scenario is in.</h3>
        <p className="text-white/70">The Capital District Financial Console will reach out within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card/60 p-6 md:p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name *">
          <Input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} className="bg-background/60 border-border" required />
        </Field>
        <Field label="Email *">
          <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="bg-background/60 border-border" required />
        </Field>
        <Field label="Phone *">
          <Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="bg-background/60 border-border" required />
        </Field>
        <Field label="Primary objective *">
          <Select value={form.lead_type} onValueChange={(v) => update("lead_type", v)}>
            <SelectTrigger className="bg-background/60 border-border"><SelectValue placeholder="Select an option" /></SelectTrigger>
            <SelectContent>
              {objectiveOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Property address (optional)">
          <Input value={form.property_address} onChange={(e) => update("property_address", e.target.value)} className="bg-background/60 border-border" />
        </Field>
        <Field label="Purchase price (optional)">
          <Input type="number" value={form.purchase_price} onChange={(e) => update("purchase_price", e.target.value)} className="bg-background/60 border-border" />
        </Field>
        <Field label="Estimated rent (optional)">
          <Input type="number" value={form.estimated_rent} onChange={(e) => update("estimated_rent", e.target.value)} className="bg-background/60 border-border" />
        </Field>
      </div>
      <Field label="Notes (optional)">
        <Textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} className="bg-background/60 border-border min-h-[100px]" />
      </Field>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-primary text-primary-foreground font-medium py-3.5 hover:opacity-90 transition disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Request Financial Introduction"}
      </button>
      <p className="text-xs text-white/45 text-center">
        Routed to Scott Alvarez · RE/MAX Solutions · (518) 522-7265 · scott@capitaldistrictnest.com
      </p>
    </form>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="text-xs uppercase tracking-[0.14em] text-primary/90 font-medium block mb-1.5">{label}</span>
    {children}
  </label>
);

// ───────────────────────────────── Page ─────────────────────────────────

const FinancialConsole = () => {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FinancialService",
      name: "Capital District Financial Console",
      description:
        "Mortgages, banking, financial advisors, accountants, insurance, investment property analysis, commercial lending, DSCR, refinance, and business capital across the Capital District.",
      url: "https://www.capitaldistrictnest.com/finances",
      areaServed: "Capital District, New York",
      provider: {
        "@type": "RealEstateAgent",
        name: "Scott Alvarez · RE/MAX Solutions",
        telephone: "+1-518-522-7265",
        email: "scott@capitaldistrictnest.com",
      },
    }),
    []
  );

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Helmet>
        <title>Capital District Financial Console | Mortgages, Banking, Advisors & Investment Analysis</title>
        <meta
          name="description"
          content="Mortgages, banking, financial advisors, accountants, insurance, investment property analysis, commercial lending, DSCR, refinance strategy, and business capital across the Capital District."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/finances" />
        <meta property="og:title" content="Capital District Financial Console" />
        <meta
          property="og:description"
          content="The financial vertical of Capital District Nest — mortgages, banking, advisors, accountants, insurance, and investment analysis."
        />
        <meta property="og:url" content="https://www.capitaldistrictnest.com/finances" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <CleanHeader />

        {/* HERO */}
        <section className="px-[5%] pt-16 pb-12 md:pt-24 md:pb-20 border-b border-border/60">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs uppercase tracking-[0.18em] mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Capital District Financial Console
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl leading-[1.05]">
              Capital District
              <span className="text-primary"> Financial Console.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-white/70 text-lg md:text-xl">
              Mortgages, banking, advisors, accountants, insurance, investment property analysis,
              commercial lending, and business capital — all connected through one local financial network.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#calculator"
                onClick={scrollTo("calculator")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
              >
                Analyze a Financial Scenario <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#financial-intro"
                onClick={scrollTo("financial-intro")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:border-primary hover:text-primary transition"
              >
                Request Financial Introduction
              </a>
            </div>
          </div>
        </section>

        {/* FINANCIAL PULSE */}
        <section className="px-[5%] py-16 md:py-20 border-b border-border/60 bg-card/30">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-primary text-xs uppercase tracking-[0.18em] mb-3">Financial Pulse</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.08] mb-5">
                Where local growth meets <span className="text-primary">financial opportunity.</span>
              </h2>
              <p className="text-white/70 text-lg max-w-xl">
                Track mortgages, banking, business capital, investment property trends, commercial
                lending, insurance, accounting, and financial planning across the Capital District.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {pulseCards.map((c) => (
                <div key={c.title} className="rounded-2xl p-5 border border-border bg-card/70 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-[15px]">{c.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{c.blurb}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCT GRID */}
        <section id="products" className="px-[5%] py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="text-primary text-xs uppercase tracking-[0.18em] mb-2">Financial Product Hub</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Pick the path that matches your move.</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {products.map((p) => (
                <a
                  key={p.title}
                  href="#financial-intro"
                  onClick={scrollTo("financial-intro")}
                  data-lead-type={p.leadType}
                  className="group relative rounded-2xl p-5 bg-card/70 backdrop-blur-md border border-border hover:border-primary/60 transition-colors flex flex-col h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-[15px]">{p.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed mb-5 flex-1">{p.blurb}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                    {p.cta} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CALCULATOR CONSOLE */}
        <section id="calculator" className="px-[5%] py-16 md:py-20 border-y border-border/60 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 max-w-2xl">
              <p className="text-primary text-xs uppercase tracking-[0.18em] mb-2">Underwriting Console</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Run the numbers before you commit.</h2>
              <p className="text-white/65">Mortgage, investment property, DSCR, and refinance models — built on the same math local lenders use.</p>
            </div>

            <Tabs defaultValue="mortgage" className="w-full">
              <TabsList className="bg-card/60 border border-border rounded-full p-1 flex flex-wrap h-auto gap-1">
                <TabsTrigger value="mortgage" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Mortgage</TabsTrigger>
                <TabsTrigger value="investment" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Investment Property</TabsTrigger>
                <TabsTrigger value="dscr" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">DSCR / Cash Flow</TabsTrigger>
                <TabsTrigger value="refi" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Refinance</TabsTrigger>
              </TabsList>
              <TabsContent value="mortgage" className="mt-6"><MortgageCalc /></TabsContent>
              <TabsContent value="investment" className="mt-6"><InvestmentCalc /></TabsContent>
              <TabsContent value="dscr" className="mt-6"><DscrCalc /></TabsContent>
              <TabsContent value="refi" className="mt-6"><RefinanceCalc /></TabsContent>
            </Tabs>
          </div>
        </section>

        {/* PARTNER NETWORK */}
        <section id="financial-partners" className="px-[5%] py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 max-w-2xl">
              <p className="text-primary text-xs uppercase tracking-[0.18em] mb-2">Capital District Financial Partner Network</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Local lenders, advisors, accountants, and insurance pros.</h2>
              <p className="text-white/65">
                Connect with vetted Capital District mortgage lenders, banks, financial advisors,
                accountants, insurance professionals, and commercial lending partners.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((p) => (
                <div key={p.label} className="rounded-2xl p-6 border border-border bg-card/70 backdrop-blur-md hover:border-primary/60 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{p.label}</h3>
                  <p className="text-sm text-white/65 leading-relaxed mb-5">{p.blurb}</p>
                  <a
                    href="#financial-intro"
                    onClick={scrollTo("financial-intro")}
                    className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:translate-x-0.5 transition-transform"
                  >
                    Request Introduction <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl p-6 md:p-8 border border-primary/30 bg-primary/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">Are you a local financial partner?</h3>
                <p className="text-white/70 text-sm max-w-xl">
                  Mortgage lenders, CPAs, advisors, banks, and insurance pros — join the Capital
                  District Financial Console.
                </p>
              </div>
              <Link
                to="/claim-business"
                className="px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition whitespace-nowrap text-center"
              >
                Apply to join
              </Link>
            </div>
          </div>
        </section>

        {/* FINANCIAL INTRO LEAD FORM */}
        <section id="financial-intro" className="px-[5%] py-16 md:py-24 border-t border-border/60 bg-card/30">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-primary text-xs uppercase tracking-[0.18em] mb-2">Capital District Financial Console</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Submit your financial scenario.</h2>
              <p className="text-white/65 max-w-xl mx-auto">
                Tell us what you're working on, and we'll route you to the right local mortgage,
                banking, accounting, insurance, investment, or commercial lending partner.
              </p>
            </div>
            <DealDeskForm />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default FinancialConsole;
