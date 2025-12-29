import { TrendingUp, AlertCircle } from "lucide-react";
import { PropertyIntelData } from "./types";

interface RiskOpportunitySummaryProps {
  data: PropertyIntelData;
}

const RiskOpportunitySummary = ({ data }: RiskOpportunitySummaryProps) => {
  const opportunities = data.opportunities || [];
  const considerations = data.considerations || [];

  if (opportunities.length === 0 && considerations.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 border-b border-report-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-10 text-center">
          Risk & Opportunity Summary
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Opportunities */}
          <div className="p-6 rounded-2xl bg-report-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-report-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-report-success" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-report-fg">Opportunities</h3>
            </div>
            
            <ul className="space-y-3">
              {opportunities.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-report-success mt-2 flex-shrink-0" />
                  <span className="text-sm text-report-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Considerations */}
          <div className="p-6 rounded-2xl bg-report-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-report-warning/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-report-warning" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-report-fg">Considerations</h3>
            </div>
            
            <ul className="space-y-3">
              {considerations.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-report-warning mt-2 flex-shrink-0" />
                  <span className="text-sm text-report-muted">{item}</span>
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
