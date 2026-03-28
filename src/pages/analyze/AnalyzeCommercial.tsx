import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Store } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AnalyzeCommercial = () => {
  const [inputs, setInputs] = useState({
    price: 900000, down: 25, rate: 7.25, term: 25,
    noi: 72000, taxes: 12000, insurance: 4800, cam: 6000,
    vacancy: 10, reserves: 3, closing: 3,
  });

  const downAmt = inputs.price * (inputs.down / 100);
  const loanAmt = inputs.price - downAmt;
  const mr = inputs.rate / 100 / 12;
  const n = inputs.term * 12;
  const pi = mr > 0 ? (loanAmt * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1) : loanAmt / n;
  const annualDebt = pi * 12;
  const capRate = (inputs.noi / inputs.price) * 100;
  const cashFlow = inputs.noi - annualDebt;
  const cashIn = downAmt + (inputs.price * (inputs.closing / 100));
  const coc = cashIn > 0 ? (cashFlow / cashIn) * 100 : 0;
  const dscr = annualDebt > 0 ? inputs.noi / annualDebt : 0;
  const breakEven = inputs.noi > 0 ? ((annualDebt + inputs.taxes + inputs.insurance) / (inputs.noi + inputs.taxes + inputs.insurance)) * 100 : 0;
  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEOHead title="Commercial Analyzer | Property Intelligence" description="Review commercial property NOI, debt service, cap rate, and income potential." canonical="https://capitaldistrictnest.com/analyze/commercial" />
      <CleanHeader />
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/analyze" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors mb-8 text-sm font-medium"><ArrowLeft className="w-4 h-4" /> All Analyzers</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center"><Store className="w-7 h-7 text-gray-900" /></div>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">Commercial <span className="font-normal">Analyzer</span></h1>
          </div>
          <p className="text-lg text-gray-500 max-w-2xl">Review NOI, debt service, cap rate, and income potential.</p>
        </div>
      </section>
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6 p-8 rounded-3xl border border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-semibold mb-4">Property & Income</h2>
            {[
              { id: "price", label: "Purchase Price", val: inputs.price, step: 10000 },
              { id: "noi", label: "Annual NOI", val: inputs.noi, step: 1000 },
              { id: "down", label: "Down Payment (%)", val: inputs.down, step: 5 },
              { id: "rate", label: "Interest Rate (%)", val: inputs.rate, step: 0.125 },
              { id: "term", label: "Loan Term (years)", val: inputs.term, step: 5 },
              { id: "taxes", label: "Annual Taxes", val: inputs.taxes, step: 500 },
              { id: "insurance", label: "Annual Insurance", val: inputs.insurance, step: 200 },
              { id: "closing", label: "Closing Costs (%)", val: inputs.closing, step: 0.5 },
            ].map((f) => (
              <div key={f.id}>
                <Label className="text-gray-700 text-sm font-medium">{f.label}</Label>
                <Input type="number" value={f.val} step={f.step} onChange={(e) => setInputs({ ...inputs, [f.id]: parseFloat(e.target.value) || 0 })} className="mt-1 bg-white border-gray-200 text-gray-900 rounded-xl h-12" />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Investment Performance</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Cap Rate", value: `${capRate.toFixed(1)}%` },
                { label: "Cash on Cash", value: `${coc.toFixed(1)}%` },
                { label: "DSCR", value: dscr.toFixed(2) },
                { label: "Debt Service", value: `$${fmt(annualDebt)}` },
              ].map((s) => (
                <div key={s.label} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                </div>
              ))}
            </div>
            <div className={`p-8 rounded-3xl text-center ${cashFlow >= 0 ? "bg-gray-900 text-white" : "bg-red-900 text-white"}`}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Annual Cash Flow</p>
              <p className="text-5xl font-bold">${fmt(cashFlow)}</p>
              <p className="text-gray-400 text-sm mt-2">${fmt(cashFlow / 12)} / month</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Cash to Close</p>
              <p className="text-2xl font-bold text-gray-900">${fmt(cashIn)}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AnalyzeCommercial;
