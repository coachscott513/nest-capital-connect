import { Button } from "@/components/ui/button";
import { PropertyIntelData } from "./types";
import { Lock } from "lucide-react";

interface ReportHeroProps {
  data: PropertyIntelData;
  onUnlockClick: () => void;
}

const ReportHero = ({ data, onUnlockClick }: ReportHeroProps) => {
  return (
    <section className="py-24 md:py-36 text-center bg-report-hero-bg relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">
          Property Intelligence Report
        </p>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
          {data.address}
        </h1>
        <p className="text-lg md:text-xl text-white/70 mb-2">
          {data.city}, {data.state}
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm md:text-base text-white/60 my-8">
          <span>{data.beds} Beds</span>
          <span className="text-white/30">•</span>
          <span>{data.baths} Baths</span>
          <span className="text-white/30">•</span>
          <span>{data.sqft.toLocaleString()} Sq Ft</span>
          <span className="text-white/30">•</span>
          <span>{data.acres} Acres</span>
        </div>
        
        <p className="text-sm text-white/50 mb-12">
          {data.propertyType} • Built {data.yearBuilt}
        </p>
        
        <Button
          onClick={onUnlockClick}
          className="bg-white text-report-hero-bg hover:bg-white/90 px-8 py-6 text-base font-medium rounded-full transition-all shadow-lg shadow-black/20 group"
        >
          <Lock className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Unlock Full Property Intelligence
        </Button>
        
        <p className="text-xs text-white/40 mt-10 max-w-md mx-auto">
          Independent market intelligence generated from MLS, tax, and public records.
        </p>
      </div>
    </section>
  );
};

export default ReportHero;
