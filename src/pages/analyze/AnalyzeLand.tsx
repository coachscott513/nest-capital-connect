import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mountain } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AnalyzeLand = () => {
  const [inputs, setInputs] = useState({
    price: 120000, down: 30, rate: 7.5, term: 15,
    taxes: 1800, insurance: 600, improvements: 250000,
    resaleEstimate: 450000, closing: 3,
  });

  const downAmt = inputs.price * (inputs.down / 100);
  const loanAmt = inputs.price - downAmt;
  const mr = inputs.rate / 100 / 12;
  const n = inputs.term * 12;
  const pi = mr > 0 ? (loanAmt * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1) : loanAmt / n;
  const monthlyCarry = pi + (inputs.taxes / 12) + (inputs.insurance / 12);
  const totalAcquisition = inputs.price + (inputs.price * (inputs.closing / 100));
  const allInBasis = totalAcquisition + inputs.improvements;
  const estimatedEquity = inputs.resaleEstimate - allInBasis;
  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEOHead title="Land Analyzer | Property Intelligence" description="Estimate carrying costs, acquisition basis, and build or resale scenarios for land purchases." canonical="https://capitaldistrictnest.com/analyze/land" />
      <CleanHeader />
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/analyze" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors mb-8 text-sm font-medium"><ArrowLeft className="w-4 h-4" /> All Analyzers</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center"><Mountain className="w-7 h-7 text-gray-900" /></div>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">Land <span className="font-normal">Analyzer</span></h1>
          </div>
          <p className="text-lg text-gray-500 max-w-2xl">Estimate carrying costs, acquisition basis, and build or resale scenarios.</p>
        </div>
      </section>
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6 p-8 rounded-3xl border border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-semibold mb-4">Land & Build Details</h2>
            {[
              { id: "price", label: "Land Purchase Price", val: inputs.price, step: 5000 },
              { id: "down", label: "Down Payment (%)", val: inputs.down, step: 5 },
              { id: "rate", label: "Interest Rate (%)", val: inputs.rate, step: 0.125 },
              { id: "term", label: "Loan Term (years)", val: inputs.term, step: 5 },
              { id: "taxes", label: "Annual Taxes", val: inputs.taxes, step: 100 },
              { id: "insurance", label: "Annual Insurance", val: inputs.insurance, step: 100 },
              { id: "improvements", label: "Est. Improvement / Build Cost", val: inputs.improvements, step: 10000 },
              { id: "resaleEstimate", label: "Est. Resale / Completed Value", val: inputs.resaleEstimate, step: 10000 },
              { id: "closing", label: "Closing Costs (%)", val: inputs.closing, step: 0.5 },
            ].map((f) => (
              <div key={f.id}>
                <Label className="text-gray-700 text-sm font-medium">{f.label}</Label>
                <Input type="number" value={f.val} step={f.step} onChange={(e) => setInputs({ ...inputs, [f.id]: parseFloat(e.target.value) || 0 })} className="mt-1 bg-white border-gray-200 text-gray-900 rounded-xl h-12" />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Your Numbers</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Monthly Carry", value: `$${fmt(monthlyCarry)}` },
                { label: "Down Payment", value: `$${fmt(downAmt)}` },
                { label: "Total Acquisition", value: `$${fmt(totalAcquisition)}` },
                { label: "Build / Improve", value: `$${fmt(inputs.improvements)}` },
              ].map((s) => (
                <div key={s.label} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="p-8 rounded-3xl bg-gray-900 text-white text-center">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">All-In Basis</p>
              <p className="text-5xl font-bold">${fmt(allInBasis)}</p>
            </div>
            <div className={`p-6 rounded-2xl text-center ${estimatedEquity >= 0 ? "bg-emerald-50 border border-emerald-100" : "bg-red-50 border border-red-100"}`}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Estimated Equity at Completion</p>
              <p className={`text-3xl font-bold ${estimatedEquity >= 0 ? "text-emerald-700" : "text-red-700"}`}>${fmt(estimatedEquity)}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AnalyzeLand;
