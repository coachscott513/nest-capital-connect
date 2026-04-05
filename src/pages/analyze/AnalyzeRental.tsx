import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AnalyzeRental = () => {
  const [inputs, setInputs] = useState({
    price: 300000, down: 25, rate: 7.0, term: 30,
    rent: 2200, taxes: 3600, insurance: 1800, hoa: 0,
    vacancy: 8, maintenance: 5, management: 8, closing: 3,
  });

  const downAmt = inputs.price * (inputs.down / 100);
  const loanAmt = inputs.price - downAmt;
  const mr = inputs.rate / 100 / 12;
  const n = inputs.term * 12;
  const pi = mr > 0 ? (loanAmt * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1) : loanAmt / n;
  const grossRent = inputs.rent * 12;
  const vacancyLoss = grossRent * (inputs.vacancy / 100);
  const effectiveIncome = grossRent - vacancyLoss;
  const maintenanceCost = grossRent * (inputs.maintenance / 100);
  const managementCost = grossRent * (inputs.management / 100);
  const totalExpenses = inputs.taxes + inputs.insurance + (inputs.hoa * 12) + maintenanceCost + managementCost;
  const noi = effectiveIncome - totalExpenses;
  const annualDebt = pi * 12;
  const cashFlow = noi - annualDebt;
  const capRate = (noi / inputs.price) * 100;
  const cashInvested = downAmt + (inputs.price * (inputs.closing / 100));
  const coc = cashInvested > 0 ? (cashFlow / cashInvested) * 100 : 0;
  const dscr = annualDebt > 0 ? noi / annualDebt : 0;
  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="Rental Property Analyzer | Property Intelligence" description="Analyze rental property cash flow, cap rate, cash-on-cash return, and DSCR." canonical="https://capitaldistrictnest.com/analyze/rental" />
      <CleanHeader />
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/analyze" className="inline-flex items-center gap-2 text-muted-foreground/70 hover:text-foreground transition-colors mb-8 text-sm font-medium"><ArrowLeft className="w-4 h-4" /> All Analyzers</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center"><TrendingUp className="w-7 h-7 text-foreground" /></div>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">Rental Property <span className="font-normal">Analyzer</span></h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">Break down rent, expenses, cash flow, cap rate, and return.</p>
        </div>
      </section>
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6 p-8 rounded-3xl border border-border/50 bg-secondary/50">
            <h2 className="text-xl font-semibold mb-4">Property & Income</h2>
            {[
              { id: "price", label: "Purchase Price", val: inputs.price, step: 5000 },
              { id: "down", label: "Down Payment (%)", val: inputs.down, step: 1 },
              { id: "rate", label: "Interest Rate (%)", val: inputs.rate, step: 0.125 },
              { id: "rent", label: "Monthly Rent", val: inputs.rent, step: 50 },
              { id: "taxes", label: "Annual Taxes", val: inputs.taxes, step: 100 },
              { id: "insurance", label: "Annual Insurance", val: inputs.insurance, step: 100 },
              { id: "hoa", label: "Monthly HOA", val: inputs.hoa, step: 25 },
              { id: "vacancy", label: "Vacancy (%)", val: inputs.vacancy, step: 1 },
              { id: "maintenance", label: "Maintenance (%)", val: inputs.maintenance, step: 1 },
              { id: "management", label: "Management (%)", val: inputs.management, step: 1 },
            ].map((f) => (
              <div key={f.id}>
                <Label className="text-foreground/80 text-sm font-medium">{f.label}</Label>
                <Input type="number" value={f.val} step={f.step} onChange={(e) => setInputs({ ...inputs, [f.id]: parseFloat(e.target.value) || 0 })} className="mt-1 bg-background border-border text-foreground rounded-xl h-12" />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Investment Returns</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "NOI", value: `$${fmt(noi)}` },
                { label: "Cap Rate", value: `${capRate.toFixed(1)}%` },
                { label: "Cash on Cash", value: `${coc.toFixed(1)}%` },
                { label: "DSCR", value: dscr.toFixed(2) },
              ].map((s) => (
                <div key={s.label} className="p-6 rounded-2xl bg-secondary/40 border border-border/50 text-center">
                  <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>
            <div className={`p-8 rounded-3xl text-center ${cashFlow >= 0 ? "bg-foreground text-background" : "bg-red-900 text-background"}`}>
              <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Monthly Cash Flow</p>
              <p className="text-5xl font-bold">${fmt(cashFlow / 12)}</p>
              <p className="text-muted-foreground/70 text-sm mt-2">${fmt(cashFlow)} / year</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-secondary/40 border border-border/50 text-center">
                <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Cash Invested</p>
                <p className="text-2xl font-bold text-foreground">${fmt(cashInvested)}</p>
              </div>
              <div className="p-6 rounded-2xl bg-secondary/40 border border-border/50 text-center">
                <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Annual Debt Service</p>
                <p className="text-2xl font-bold text-foreground">${fmt(annualDebt)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AnalyzeRental;
