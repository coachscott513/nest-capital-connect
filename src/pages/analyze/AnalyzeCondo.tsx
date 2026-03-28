import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Building2, DollarSign, Shield, Calculator } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AnalyzeCondo = () => {
  const [inputs, setInputs] = useState({
    price: 450000, down: 20, rate: 6.5, term: 30,
    taxes: 5400, insurance: 4200, hoa: 600, assessment: 0, closing: 3,
  });

  const downAmt = inputs.price * (inputs.down / 100);
  const loanAmt = inputs.price - downAmt;
  const monthlyRate = inputs.rate / 100 / 12;
  const numPayments = inputs.term * 12;
  const monthlyPI = monthlyRate > 0
    ? (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : loanAmt / numPayments;
  const monthlyTax = inputs.taxes / 12;
  const monthlyIns = inputs.insurance / 12;
  const totalMonthly = monthlyPI + monthlyTax + monthlyIns + inputs.hoa + (inputs.assessment / 12);
  const cashToClose = downAmt + (inputs.price * (inputs.closing / 100));

  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEOHead title="Condo Analyzer | Property Intelligence" description="Analyze condo ownership costs including HOA, insurance, special assessments, and total monthly cost." canonical="https://capitaldistrictnest.com/analyze/condo" />
      <CleanHeader />

      <section className="pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/analyze" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> All Analyzers
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-gray-900" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">Condo <span className="font-normal">Analyzer</span></h1>
            </div>
          </div>
          <p className="text-lg text-gray-500 max-w-2xl">Review HOA, insurance, special assessments, and total monthly ownership cost.</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* INPUTS */}
          <div className="space-y-6 p-8 rounded-3xl border border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            {[
              { id: "price", label: "Purchase Price", prefix: "$", val: inputs.price, step: 5000 },
              { id: "down", label: "Down Payment (%)", suffix: "%", val: inputs.down, step: 1 },
              { id: "rate", label: "Interest Rate (%)", suffix: "%", val: inputs.rate, step: 0.125 },
              { id: "taxes", label: "Annual Taxes", prefix: "$", val: inputs.taxes, step: 100 },
              { id: "insurance", label: "Annual Insurance", prefix: "$", val: inputs.insurance, step: 100 },
              { id: "hoa", label: "Monthly HOA / Condo Fee", prefix: "$", val: inputs.hoa, step: 25 },
              { id: "assessment", label: "Annual Special Assessment", prefix: "$", val: inputs.assessment, step: 100 },
              { id: "closing", label: "Closing Costs (%)", suffix: "%", val: inputs.closing, step: 0.5 },
            ].map((field) => (
              <div key={field.id}>
                <Label className="text-gray-700 text-sm font-medium">{field.label}</Label>
                <Input
                  type="number"
                  value={field.val}
                  step={field.step}
                  onChange={(e) => setInputs({ ...inputs, [field.id]: parseFloat(e.target.value) || 0 })}
                  className="mt-1 bg-white border-gray-200 text-gray-900 rounded-xl h-12"
                />
              </div>
            ))}
          </div>

          {/* OUTPUTS */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Your Numbers</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Monthly P&I", value: `$${fmt(monthlyPI)}` },
                { label: "Monthly Taxes", value: `$${fmt(monthlyTax)}` },
                { label: "Monthly Insurance", value: `$${fmt(monthlyIns)}` },
                { label: "Monthly HOA", value: `$${fmt(inputs.hoa)}` },
              ].map((s) => (
                <div key={s.label} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="p-8 rounded-3xl bg-gray-900 text-white text-center">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Total Monthly Cost</p>
              <p className="text-5xl font-bold">${fmt(totalMonthly)}</p>
              <p className="text-gray-400 text-sm mt-2">all-in monthly ownership cost</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Down Payment</p>
                <p className="text-2xl font-bold text-gray-900">${fmt(downAmt)}</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Cash to Close</p>
                <p className="text-2xl font-bold text-gray-900">${fmt(cashToClose)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnalyzeCondo;
