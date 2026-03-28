import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AnalyzeMultifamily = () => {
  const [inputs, setInputs] = useState({
    price: 650000, down: 25, rate: 7.0, term: 30, units: 4,
    grossRent: 6000, taxes: 8400, insurance: 3600,
    vacancy: 8, maintenance: 5, management: 8, utilities: 400, closing: 3,
  });

  const downAmt = inputs.price * (inputs.down / 100);
  const loanAmt = inputs.price - downAmt;
  const mr = inputs.rate / 100 / 12;
  const n = inputs.term * 12;
  const pi = mr > 0 ? (loanAmt * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1) : loanAmt / n;
  const annualGross = inputs.grossRent * 12;
  const vacLoss = annualGross * (inputs.vacancy / 100);
  const egi = annualGross - vacLoss;
  const maint = annualGross * (inputs.maintenance / 100);
  const mgmt = annualGross * (inputs.management / 100);
  const totalExp = inputs.taxes + inputs.insurance + maint + mgmt + (inputs.utilities * 12);
  const noi = egi - totalExp;
  const annualDebt = pi * 12;
  const cashFlow = noi - annualDebt;
  const capRate = (noi / inputs.price) * 100;
  const cashIn = downAmt + (inputs.price * (inputs.closing / 100));
  const coc = cashIn > 0 ? (cashFlow / cashIn) * 100 : 0;
  const dscr = annualDebt > 0 ? noi / annualDebt : 0;
  const breakEven = annualGross > 0 ? ((totalExp + annualDebt) / annualGross) * 100 : 0;
  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEOHead title="Multifamily Analyzer | Property Intelligence" description="Analyze multifamily rent roll, NOI, DSCR, cash flow, and break-even occupancy." canonical="https://capitaldistrictnest.com/analyze/multifamily" />
      <CleanHeader />
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/analyze" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors mb-8 text-sm font-medium"><ArrowLeft className="w-4 h-4" /> All Analyzers</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center"><Users className="w-7 h-7 text-gray-900" /></div>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">Multifamily <span className="font-normal">Analyzer</span></h1>
          </div>
          <p className="text-lg text-gray-500 max-w-2xl">Analyze rent roll, NOI, DSCR, cash flow, and break-even occupancy.</p>
        </div>
      </section>
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6 p-8 rounded-3xl border border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-semibold mb-4">Property & Income</h2>
            {[
              { id: "price", label: "Purchase Price", val: inputs.price, step: 5000 },
              { id: "units", label: "Number of Units", val: inputs.units, step: 1 },
              { id: "grossRent", label: "Total Monthly Rent", val: inputs.grossRent, step: 100 },
              { id: "down", label: "Down Payment (%)", val: inputs.down, step: 1 },
              { id: "rate", label: "Interest Rate (%)", val: inputs.rate, step: 0.125 },
              { id: "taxes", label: "Annual Taxes", val: inputs.taxes, step: 100 },
              { id: "insurance", label: "Annual Insurance", val: inputs.insurance, step: 100 },
              { id: "utilities", label: "Monthly Utilities (owner-paid)", val: inputs.utilities, step: 50 },
              { id: "vacancy", label: "Vacancy (%)", val: inputs.vacancy, step: 1 },
              { id: "maintenance", label: "Maintenance (%)", val: inputs.maintenance, step: 1 },
              { id: "management", label: "Management (%)", val: inputs.management, step: 1 },
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
                { label: "NOI", value: `$${fmt(noi)}` },
                { label: "Cap Rate", value: `${capRate.toFixed(1)}%` },
                { label: "Cash on Cash", value: `${coc.toFixed(1)}%` },
                { label: "DSCR", value: dscr.toFixed(2) },
                { label: "Break-Even", value: `${breakEven.toFixed(0)}%` },
                { label: "Price / Unit", value: `$${fmt(inputs.price / (inputs.units || 1))}` },
              ].map((s) => (
                <div key={s.label} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                </div>
              ))}
            </div>
            <div className={`p-8 rounded-3xl text-center ${cashFlow >= 0 ? "bg-gray-900 text-white" : "bg-red-900 text-white"}`}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Monthly Cash Flow</p>
              <p className="text-5xl font-bold">${fmt(cashFlow / 12)}</p>
              <p className="text-gray-400 text-sm mt-2">${fmt(cashFlow)} / year</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AnalyzeMultifamily;
