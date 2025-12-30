import { useState } from "react";
import { MapPin, Calendar, Ruler } from "lucide-react";
import { PropertyIntelData, ComparableSale } from "./types";
import { Button } from "@/components/ui/button";

interface ComparableSalesProps {
  data: PropertyIntelData;
}

const ComparableSales = ({ data }: ComparableSalesProps) => {
  const [showAll, setShowAll] = useState(false);
  const comps = data.comparables || [];
  const displayComps = showAll ? comps : comps.slice(0, 3);

  if (comps.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-report-bg">
      <div className="container mx-auto px-4 max-w-4xl">
        <article className="bg-report-card rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-report-border p-8 md:p-10">
          <header className="text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-report-text-headline mb-3">
              Comparable Sales
            </h2>

            <p className="text-sm text-report-text-muted mb-12 max-w-lg mx-auto">
              Recent transactions in the area
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {displayComps.map((comp, index) => (
              <CompCard key={index} comp={comp} />
            ))}
          </div>

          {comps.length > 3 && (
            <div className="text-center mt-10">
              <Button
                variant="ghost"
                onClick={() => setShowAll(!showAll)}
                className="text-report-text-muted hover:text-report-text-headline"
              >
                {showAll ? "Show Core Comps" : `Show All ${comps.length} Comps`}
              </Button>
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

const CompCard = ({ comp }: { comp: ComparableSale }) => {
  return (
    <div className="p-6 rounded-2xl bg-report-card shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-report-border">
      <p className="text-xl font-medium text-report-text-headline mb-4">
        ${comp.salePrice.toLocaleString()}
      </p>
      
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-report-text-body">
          <Calendar className="w-4 h-4 text-report-text-muted" strokeWidth={1.5} />
          <span>Sold {comp.saleDate}</span>
        </div>
        
        <div className="flex items-center gap-2 text-report-text-body">
          <MapPin className="w-4 h-4 text-report-text-muted" strokeWidth={1.5} />
          <span>{comp.distance} away</span>
        </div>
        
        <div className="flex items-center gap-2 text-report-text-body">
          <Ruler className="w-4 h-4 text-report-text-muted" strokeWidth={1.5} />
          <span>${comp.pricePerSqFt}/sq ft</span>
        </div>
      </div>
      
      <p className="text-xs text-report-text-muted mt-4 pt-4 border-t border-report-border/50">
        {comp.address}
      </p>
    </div>
  );
};

export default ComparableSales;
