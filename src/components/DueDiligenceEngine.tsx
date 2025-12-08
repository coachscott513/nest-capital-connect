import { useState } from "react";
import { Search, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const dataPoints = [
  "Annual Tax Bill",
  "Utility Split",
  "Water/Sewer Avg",
  "Current Rent Roll",
  "Lease Expiration",
];

const DueDiligenceEngine = () => {
  const [address, setAddress] = useState("");
  const [selectedPoints, setSelectedPoints] = useState<string[]>([]);

  const toggleDataPoint = (point: string) => {
    setSelectedPoints((prev) =>
      prev.includes(point)
        ? prev.filter((p) => p !== point)
        : [...prev, point]
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
    <section className="bg-[#0a0a0a] border-t border-border py-20 px-[5%]">
      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Search on Zillow.{" "}
          <span className="text-primary">Analyze like a Pro.</span>
        </h2>

        {/* Sub-headline */}
        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Zillow gives you the price. We give you the P&L. Enter any address
          below to request a deep-dive financial report.
        </p>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="e.g. 123 State St, Albany, NY"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full pl-12 pr-4 py-6 text-lg bg-background border-2 border-border rounded-xl focus:border-primary transition-colors"
          />
        </div>

        {/* Checkbox Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {dataPoints.map((point) => (
            <button
              type="button"
              key={point}
              onClick={() => toggleDataPoint(point)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-all ${
                selectedPoints.includes(point)
                  ? "bg-primary/20 border-primary text-primary"
                  : "bg-background border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedPoints.includes(point)
                    ? "bg-primary border-primary"
                    : "border-current"
                }`}
              >
                {selectedPoints.includes(point) && (
                  <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium">{point}</span>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Button
            onClick={handleRequestReport}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-bold rounded-full"
          >
            Request Intelligence Report
          </Button>
          <a
            href="tel:+15186762347"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-[22px] text-lg font-bold rounded-full hover:bg-primary/10 transition-colors animate-pulse"
          >
            <Phone className="w-5 h-5" />
            Call to Analyze: (518) 676-2347
          </a>
        </div>

        {/* Text Option */}
        <a
          href="sms:+15186762347"
          className="inline-block mb-6 text-primary/70 hover:text-primary transition-colors text-sm font-medium"
        >
          Prefer to text? SMS this address to (518) 676-2347
        </a>

        {/* Disclaimer */}
        <p className="text-sm text-muted-foreground/60">
          Report Timeline: 1 Business Day or Sooner. We manually verify tax and
          lease data for accuracy.
        </p>
      </div>
    </section>
  );
};

export default DueDiligenceEngine;
