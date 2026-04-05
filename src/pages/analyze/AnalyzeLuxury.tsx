import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Gem } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AnalyzeLuxury = () => {
  const [inputs, setInputs] = useState({
    price: 1200000, down: 20, rate: 6.75, term: 30,
    taxes: 18000, insurance: 8400, hoa: 1200, maintenance: 500, closing: 3,
  });

  const downAmt = inputs.price * (inputs.down / 100);
  const loanAmt = inputs.price - downAmt;
  const mr = inputs.rate / 100 / 12;
  const n = inputs.term * 12;
  const pi = mr > 0 ? (loanAmt * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1) : loanAmt / n;
  const tax = inputs.taxes / 12;
  const ins = inputs.insurance / 12;
  const total = pi + tax + ins + inputs.hoa + inputs.maintenance;
  const annual = total * 12;
  const cashClose = downAmt + (inputs.price * (inputs.closing / 100));
  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="Luxury Property Analyzer | Property Intelligence" description="Estimate true carrying cost for luxury and high-end properties including taxes, insurance, HOA, and cash to close." canonical="https://capitaldistrictnest.com/analyze/luxury" />
      <CleanHeader />
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/analyze" className="inline-flex items-center gap-2 text-muted-foreground/70 hover:text-foreground transition-colors mb-8 text-sm font-medium"><ArrowLeft className="w-4 h-4" /> All Analyzers</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center"><Gem className="w-7 h-7 text-foreground" /></div>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">Luxury Property <span className="font-normal">Analyzer</span></h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">Estimate true carrying cost, taxes, insurance, HOA, and cash needed to close.</p>
        </div>
      </section>
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6 p-8 rounded-2xl border border-border/50 bg-secondary/50">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            {[
              { id: "price", label: "Purchase Price", val: inputs.price, step: 25000 },
              { id: "down", label: "Down Payment (%)", val: inputs.down, step: 5 },
              { id: "rate", label: "Interest Rate (%)", val: inputs.rate, step: 0.125 },
              { id: "taxes", label: "Annual Taxes", val: inputs.taxes, step: 500 },
              { id: "insurance", label: "Annual Insurance", val: inputs.insurance, step: 200 },
              { id: "hoa", label: "Monthly HOA", val: inputs.hoa, step: 100 },
              { id: "maintenance", label: "Monthly Maintenance", val: inputs.maintenance, step: 100 },
              { id: "closing", label: "Closing Costs (%)", val: inputs.closing, step: 0.5 },
            ].map((f) => (
              <div key={f.id}>
                <Label className="text-foreground/80 text-sm font-medium">{f.label}</Label>
                <Input type="number" value={f.val} step={f.step} onChange={(e) => setInputs({ ...inputs, [f.id]: parseFloat(e.target.value) || 0 })} className="mt-1 bg-background border-border text-foreground rounded-xl h-12" />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Ownership Cost</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Monthly P&I", value: `$${fmt(pi)}` },
                { label: "Monthly Taxes", value: `$${fmt(tax)}` },
                { label: "Monthly Insurance", value: `$${fmt(ins)}` },
                { label: "Monthly HOA", value: `$${fmt(inputs.hoa)}` },
              ].map((s) => (
                <div key={s.label} className="p-6 rounded-full bg-secondary/40 border border-border/50 text-center">
                  <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="p-8 rounded-2xl bg-foreground text-background text-center">
              <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Total Monthly Carry</p>
              <p className="text-5xl font-bold">${fmt(total)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-full bg-secondary/40 border border-border/50 text-center">
                <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Annual Cost</p>
                <p className="text-2xl font-bold text-foreground">${fmt(annual)}</p>
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

export default AnalyzeLuxury;
