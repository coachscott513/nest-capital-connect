import { useState } from "react";
import { Search, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const dataPoints = [
  { label: "Pro Forma (Projected P&L)", isHighlighted: true },
  { label: "Current / Potential Rent Roll", isHighlighted: false },
  { label: "Tax & Utility Audit", isHighlighted: false },
  { label: "CapEx / Renovation Estimate", isHighlighted: false },
  { label: "Sales Comps & ARV", isHighlighted: false },
];

const DueDiligenceEngine = () => {
  const [address, setAddress] = useState("");
  const [selectedPoints, setSelectedPoints] = useState<string[]>([]);

  const toggleDataPoint = (label: string) => {
    setSelectedPoints((prev) =>
      prev.includes(label)
        ? prev.filter((p) => p !== label)
        : [...prev, label]
    );
  };

  const handleRequestReport = () => {
    const searchTerm = address || "Property Address";
    const dataPointsText = selectedPoints.length > 0 
      ? `\n\nData points requested: ${selectedPoints.join(", ")}`
      : "";
    
    const subject = encodeURIComponent(`Intelligence Request: ${searchTerm}`);
    const body = encodeURIComponent(
      `I would like the financial report for ${searchTerm}. Please send it to this email address.${dataPointsText}`
    );
    
    window.location.href = `mailto:scott@capitaldistrictnest.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="due-diligence-engine" className="bg-[#0a0a0a] border-t border-border py-20 px-[5%]">
      <div className="max-w-3xl mx-auto text-center">
        {/* Label */}
        <p className="text-primary font-bold text-lg md:text-xl uppercase tracking-wider mb-4">
          Property Analyzer — Get Your Free Pro Report
        </p>

        {/* Performance highlight */}
        <p className="text-primary font-semibold text-base md:text-lg mb-8 max-w-2xl mx-auto">
          Albany is one of the few Northeast markets where investors can achieve 10–14% cap rates and 15–30% cash-on-cash returns.
        </p>

        {/* Search Bar - Always Green Border, Larger Size */}
        <div className="relative p-1 rounded-2xl bg-primary shadow-2xl shadow-primary/40 mb-8">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-primary" />
            <Input
              type="text"
              placeholder="e.g. 123 State St, Albany, NY"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full pl-16 pr-6 py-8 text-lg md:text-xl bg-background border-0 rounded-xl focus:ring-0 focus:ring-offset-0 text-foreground font-semibold placeholder:text-foreground/50 placeholder:font-medium"
            />
          </div>
        </div>

        {/* Caption for toggles */}
        <p className="text-lg md:text-xl font-bold text-foreground mb-4">
          Choose what you want in your report:
        </p>

        {/* Checkbox Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {dataPoints.map((point) => {
            const isSelected = selectedPoints.includes(point.label);
            const goldStyle = point.isHighlighted && !isSelected;
            
            return (
              <button
                type="button"
                key={point.label}
                onClick={() => toggleDataPoint(point.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-primary border-primary text-primary-foreground"
                    : goldStyle
                    ? "bg-background border-amber-500 text-amber-500 hover:border-amber-400 hover:text-amber-400"
                    : "bg-background border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-primary-foreground border-primary-foreground"
                      : goldStyle
                      ? "border-amber-500"
                      : "border-current"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium">{point.label}</span>
              </button>
            );
          })}
        </div>

        {/* Helper text explaining the flow */}
        <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-xl mx-auto">
          After you select what you want, click the button below and we'll send your free Intelligence Report by email, text, or phone call.
        </p>

        {/* Value Section */}
        <div className="bg-background/50 border border-border rounded-xl p-6 mb-8 text-left max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-foreground mb-4">What You'll Get in Your Free Investor-Style Report</h3>
          <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
            <li>✓ Cash Flow Breakdown (rents, expenses, taxes, insurance)</li>
            <li>✓ Cap Rate & Cash-on-Cash Returns</li>
            <li>✓ Rent Roll & Market Rent Estimates</li>
            <li>✓ 5-Year Projection Chart</li>
            <li>✓ Neighborhood Snapshot</li>
            <li>✓ Red Flags & Opportunities</li>
            <li>✓ Simple summary you can actually use to make a decision</li>
          </ul>
          <p className="text-primary font-semibold mt-4 text-sm">Real numbers. Plain English. Built for buyers, sellers & investors.</p>
        </div>

        {/* Main CTA Button - More Prominent */}
        <div className="mb-6">
          <Button
            onClick={handleRequestReport}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-xl font-bold rounded-full shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all animate-pulse"
          >
            Get My Free Intelligence Report
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a
            href="tel:+15186762347"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 text-lg font-bold rounded-full hover:bg-primary/10 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Call to Analyze: (518) 676-2347
          </a>
        </div>

        {/* Text Option */}
        <a
          href={`sms:+15186762347${address ? `?body=${encodeURIComponent(`I'd like a financial report for: ${address}`)}` : ''}`}
          className="inline-block mb-6 text-primary/70 hover:text-primary transition-colors text-sm font-medium"
        >
          Prefer to text? SMS any address to (518) 676-2347 and I'll send your report.
        </a>

        {/* Disclaimer */}
        <p className="text-sm text-muted-foreground/60">
          Report Timeline: About 1 business day or sooner. I personally verify tax, rent, and utility data for accuracy.
        </p>
      </div>
    </section>
  );
};

export default DueDiligenceEngine;
