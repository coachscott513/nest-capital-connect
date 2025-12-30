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
    <section className="py-20 md:py-28 bg-report-bg">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-report-card rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-report-border p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-medium text-report-text-headline mb-10 text-center">
            Tax & Ownership Intelligence
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-report-bg border border-report-border">
              <DollarSign className="w-6 h-6 text-report-text-muted mb-3" strokeWidth={1.5} />
              <p className="text-xs text-report-text-muted mb-2">Assessed Value</p>
              <p className="text-2xl font-medium text-report-text-headline">
                ${(data.assessedValue || 0).toLocaleString()}
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-report-bg border border-report-border">
              <Calendar className="w-6 h-6 text-report-text-muted mb-3" strokeWidth={1.5} />
              <p className="text-xs text-report-text-muted mb-2">Annual Taxes</p>
              <p className="text-2xl font-medium text-report-text-headline">
                ${(data.annualTaxes || 0).toLocaleString()}
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-report-bg border border-report-border">
              <Clock className="w-6 h-6 text-report-text-muted mb-3" strokeWidth={1.5} />
              <p className="text-xs text-report-text-muted mb-2">Ownership Duration</p>
              <p className="text-2xl font-medium text-report-text-headline">
                {data.ownershipDuration || "Unknown"}
              </p>
            </div>
          </div>
          
          {/* Tax History Timeline */}
          {data.taxHistory && data.taxHistory.length > 0 && (
            <div className="max-w-md mx-auto">
              <p className="text-sm text-report-text-muted text-center mb-4">Tax History</p>
              <div className="space-y-2">
                {data.taxHistory.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-report-border last:border-0">
                    <span className="text-sm text-report-text-muted">{item.year}</span>
                    <span className="text-sm font-medium text-report-text-headline">${item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {taxPercentage && (
            <p className="text-sm text-report-text-muted text-center mt-8">
              Taxes represent approximately <span className="font-medium text-report-text-headline">{taxPercentage}%</span> of estimated market value.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TaxOwnershipIntel;
