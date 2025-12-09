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
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Search on Zillow.{" "}
          <span className="text-primary">Analyze with a Pro.</span>
        </h2>

        {/* Sub-headline */}
        <p className="text-muted-foreground text-lg md:text-xl mb-3 max-w-2xl mx-auto">
          Zillow gives you the price. We give you the P&L. Paste any address below and we'll send you a simple, investor-style report you can actually use.
        </p>
        
        {/* Supporting line */}
        <p className="text-muted-foreground text-base mb-2 max-w-2xl mx-auto">
          Free, no obligation. Real numbers — not guesses.
        </p>

        {/* Property Search Bar Analyzer Label */}
        <p className="text-primary font-bold text-lg md:text-xl uppercase tracking-wider mb-8">
          Property Search Bar Analyzer
        </p>

        {/* Search Bar - Always Green Border, Larger Size */}
        <div className="relative p-1 rounded-2xl bg-primary shadow-2xl shadow-primary/40 mb-8">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-primary" />
            <Input
              type="text"
              placeholder="e.g. 123 State St, Albany, NY (paste an address or Zillow link)"
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
