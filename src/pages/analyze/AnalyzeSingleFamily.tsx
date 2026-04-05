import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AnalyzeSingleFamily = () => {
  const [inputs, setInputs] = useState({
    price: 375000, down: 20, rate: 6.5, term: 30,
    taxes: 4800, insurance: 2400, hoa: 0, maintenance: 200, closing: 3,
  });

  const downAmt = inputs.price * (inputs.down / 100);
  const loanAmt = inputs.price - downAmt;
  const mr = inputs.rate / 100 / 12;
  const n = inputs.term * 12;
  const pi = mr > 0 ? (loanAmt * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1) : loanAmt / n;
  const tax = inputs.taxes / 12;
  const ins = inputs.insurance / 12;
  const total = pi + tax + ins + inputs.hoa + inputs.maintenance;
  const cashClose = downAmt + (inputs.price * (inputs.closing / 100));
  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="Single Family Analyzer | Property Intelligence" description="Analyze single family home ownership costs, payment scenarios, taxes, insurance, and affordability." canonical="https://capitaldistrictnest.com/analyze/single-family" />
      <CleanHeader />
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/analyze" className="inline-flex items-center gap-2 text-muted-foreground/70 hover:text-foreground transition-colors mb-8 text-sm font-medium"><ArrowLeft className="w-4 h-4" /> All Analyzers</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center"><Home className="w-7 h-7 text-foreground" /></div>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">Single Family <span className="font-normal">Analyzer</span></h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">Understand payment scenarios, taxes, insurance, and affordability.</p>
        </div>
      </section>
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6 p-8 rounded-2xl border border-border/50 bg-secondary/50">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            {[
              { id: "price", label: "Purchase Price", val: inputs.price, step: 5000 },
              { id: "down", label: "Down Payment (%)", val: inputs.down, step: 1 },
              { id: "rate", label: "Interest Rate (%)", val: inputs.rate, step: 0.125 },
              { id: "taxes", label: "Annual Taxes", val: inputs.taxes, step: 100 },
              { id: "insurance", label: "Annual Insurance", val: inputs.insurance, step: 100 },
              { id: "hoa", label: "Monthly HOA (if any)", val: inputs.hoa, step: 25 },
              { id: "maintenance", label: "Monthly Maintenance Reserve", val: inputs.maintenance, step: 25 },
              { id: "closing", label: "Closing Costs (%)", val: inputs.closing, step: 0.5 },
            ].map((f) => (
              <div key={f.id}>
                <Label className="text-foreground/80 text-sm font-medium">{f.label}</Label>
                <Input type="number" value={f.val} step={f.step} onChange={(e) => setInputs({ ...inputs, [f.id]: parseFloat(e.target.value) || 0 })} className="mt-1 bg-background border-border text-foreground rounded-xl h-12" />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Your Numbers</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Monthly P&I", value: `$${fmt(pi)}` },
                { label: "Monthly Taxes", value: `$${fmt(tax)}` },
                { label: "Monthly Insurance", value: `$${fmt(ins)}` },
                { label: "Maintenance", value: `$${fmt(inputs.maintenance)}` },
              ].map((s) => (
                <div key={s.label} className="p-6 rounded-full bg-secondary/40 border border-border/50 text-center">
                  <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="p-8 rounded-2xl bg-foreground text-background text-center">
              <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Total Monthly Cost</p>
              <p className="text-5xl font-bold">${fmt(total)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-full bg-secondary/40 border border-border/50 text-center">
                <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Down Payment</p>
                <p className="text-2xl font-bold text-foreground">${fmt(downAmt)}</p>
              </div>
              <div className="p-6 rounded-full bg-secondary/40 border border-border/50 text-center">
                <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Cash to Close</p>
                <p className="text-2xl font-bold text-foreground">${fmt(cashClose)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AnalyzeSingleFamily;
