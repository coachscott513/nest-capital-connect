import { Button } from "@/components/ui/button";
import { PropertyIntelData } from "./types";

interface ReportHeroProps {
  data: PropertyIntelData;
  onUnlockClick: () => void;
}

const ReportHero = ({ data, onUnlockClick }: ReportHeroProps) => {
  return (
    <section className="py-20 md:py-32 text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-report-fg mb-6">
          {data.address}
        </h1>
        <p className="text-lg md:text-xl text-report-muted mb-2">
          {data.city}, {data.state}
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm md:text-base text-report-muted my-8">
          <span>{data.beds} Beds</span>
          <span className="text-report-border">•</span>
          <span>{data.baths} Baths</span>
          <span className="text-report-border">•</span>
          <span>{data.sqft.toLocaleString()} Sq Ft</span>
          <span className="text-report-border">•</span>
          <span>{data.acres} Acres</span>
        </div>
        
        <p className="text-sm text-report-muted mb-10">
          {data.propertyType} • Built {data.yearBuilt}
        </p>
        
        <Button
          onClick={onUnlockClick}
          className="bg-report-fg text-report-bg hover:bg-report-fg/90 px-8 py-6 text-base font-medium rounded-full transition-all"
        >
          Unlock Full Property Intelligence
        </Button>
        
        <p className="text-xs text-report-muted mt-8 max-w-md mx-auto">
          Independent market intelligence generated from MLS, tax, and public records.
        </p>
      </div>
    </section>
  );
};

export default ReportHero;
