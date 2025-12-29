import { DollarSign, Calendar, Clock } from "lucide-react";
import { PropertyIntelData } from "./types";

interface TaxOwnershipIntelProps {
  data: PropertyIntelData;
}

const TaxOwnershipIntel = ({ data }: TaxOwnershipIntelProps) => {
  const taxPercentage = data.assessedValue && data.annualTaxes
    ? ((data.annualTaxes / data.assessedValue) * 100).toFixed(1)
    : null;

  return (
    <section className="py-16 md:py-20 border-b border-report-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-10 text-center">
          Tax & Ownership Intelligence
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-report-card">
            <DollarSign className="w-6 h-6 text-report-muted mb-3" strokeWidth={1.5} />
            <p className="text-xs text-report-muted mb-2">Assessed Value</p>
            <p className="text-2xl font-light text-report-fg">
              ${(data.assessedValue || 0).toLocaleString()}
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-report-card">
            <Calendar className="w-6 h-6 text-report-muted mb-3" strokeWidth={1.5} />
            <p className="text-xs text-report-muted mb-2">Annual Taxes</p>
            <p className="text-2xl font-light text-report-fg">
              ${(data.annualTaxes || 0).toLocaleString()}
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-report-card">
            <Clock className="w-6 h-6 text-report-muted mb-3" strokeWidth={1.5} />
            <p className="text-xs text-report-muted mb-2">Ownership Duration</p>
            <p className="text-2xl font-light text-report-fg">
              {data.ownershipDuration || "Unknown"}
            </p>
          </div>
        </div>
        
        {/* Tax History Timeline */}
        {data.taxHistory && data.taxHistory.length > 0 && (
          <div className="max-w-md mx-auto">
            <p className="text-sm text-report-muted text-center mb-4">Tax History</p>
            <div className="space-y-2">
              {data.taxHistory.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-report-border last:border-0">
                  <span className="text-sm text-report-muted">{item.year}</span>
                  <span className="text-sm font-medium text-report-fg">${item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {taxPercentage && (
          <p className="text-sm text-report-muted text-center mt-8">
            Taxes represent approximately <span className="font-medium text-report-fg">{taxPercentage}%</span> of estimated market value.
          </p>
        )}
      </div>
    </section>
  );
};

export default TaxOwnershipIntel;
