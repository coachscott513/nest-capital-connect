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
    <section className="py-16 md:py-20 border-b border-report-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-10 text-center">
          Comparable Sales
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayComps.map((comp, index) => (
            <CompCard key={index} comp={comp} />
          ))}
        </div>
        
        {comps.length > 3 && (
          <div className="text-center mt-8">
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
              className="text-report-muted hover:text-report-fg"
            >
              {showAll ? "Show Core Comps" : `Show All ${comps.length} Comps`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

const CompCard = ({ comp }: { comp: ComparableSale }) => {
  return (
    <div className="p-5 rounded-2xl bg-report-card">
      <p className="text-lg font-medium text-report-fg mb-4">
        ${comp.salePrice.toLocaleString()}
      </p>
      
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-report-muted">
          <Calendar className="w-4 h-4" strokeWidth={1.5} />
          <span>Sold {comp.saleDate}</span>
        </div>
        
        <div className="flex items-center gap-2 text-report-muted">
          <MapPin className="w-4 h-4" strokeWidth={1.5} />
          <span>{comp.distance} away</span>
        </div>
        
        <div className="flex items-center gap-2 text-report-muted">
          <Ruler className="w-4 h-4" strokeWidth={1.5} />
          <span>${comp.pricePerSqFt}/sq ft</span>
        </div>
      </div>
      
      <p className="text-xs text-report-muted mt-4 pt-3 border-t border-report-border">
        {comp.address}
      </p>
    </div>
  );
};

export default ComparableSales;
