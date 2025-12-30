import { TrendingUp, AlertTriangle } from "lucide-react";
import { PropertyIntelData } from "./types";

interface RiskOpportunitySummaryProps {
  data: PropertyIntelData;
}

const RiskOpportunitySummary = ({ data }: RiskOpportunitySummaryProps) => {
  // Use upsideFactors or opportunities, riskFactors or considerations
  const upside = data.upsideFactors || data.opportunities || [
    "Land value appreciation potential",
    "Zoning optionality for future use",
    "Strong school district demand driver",
  ];
  
  const risks = data.riskFactors || data.considerations || [
    "Carry cost sensitivity over time",
    "Market liquidity in this segment",
    "Renovation or update requirements",
  ];

  return (
    <section className="py-20 md:py-28 bg-report-bg">
      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.2em] text-report-text-muted mb-4 text-center">
          Section 5
        </p>
        
        <h2 className="text-2xl md:text-3xl font-medium text-report-text-headline mb-3 text-center">
          Upside & Risk
        </h2>
        
        <p className="text-sm text-report-text-muted text-center mb-12 max-w-lg mx-auto">
          What Zillow doesn't tell you
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Upside */}
          <div className="p-7 rounded-2xl bg-report-card shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-report-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-report-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-report-success" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-report-text-headline">Upside</h3>
            </div>
            
            <ul className="space-y-4">
              {upside.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-report-success mt-2 flex-shrink-0" />
                  <span className="text-sm text-report-text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Risk */}
          <div className="p-7 rounded-2xl bg-report-card shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-report-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-report-warning/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-report-warning" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-report-text-headline">Risk</h3>
            </div>
            
            <ul className="space-y-4">
              {risks.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-report-warning mt-2 flex-shrink-0" />
                  <span className="text-sm text-report-text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskOpportunitySummary;
