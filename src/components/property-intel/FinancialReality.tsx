import { DollarSign, Home, Zap, Wrench, TrendingUp } from "lucide-react";
import { PropertyIntelData } from "./types";

interface FinancialRealityProps {
  data: PropertyIntelData;
  isUnlocked?: boolean;
}

const FinancialReality = ({ data, isUnlocked = false }: FinancialRealityProps) => {
  // Calculate estimated monthly costs
  const monthlyTaxes = data.annualTaxes ? Math.round(data.annualTaxes / 12) : 0;
  const estimatedInsurance = Math.round((data.askingPrice * 0.004) / 12); // ~0.4% annually
  const estimatedUtilities = data.sqft ? Math.round(data.sqft * 0.12) : 350; // ~$0.12/sqft
  const maintenanceReserve = Math.round(data.askingPrice * 0.01 / 12); // 1% annually
  
  const totalMonthly = monthlyTaxes + estimatedInsurance + estimatedUtilities + maintenanceReserve;

  const costItems = [
    {
      icon: Home,
      label: "Property Taxes",
      value: isUnlocked ? monthlyTaxes : null,
      note: "Based on current assessment",
    },
    {
      icon: DollarSign,
      label: "Insurance (est.)",
      value: isUnlocked ? estimatedInsurance : null,
      note: "Estimated based on value",
    },
    {
      icon: Zap,
      label: "Utilities (est.)",
      value: isUnlocked ? estimatedUtilities : null,
      note: "Based on square footage",
    },
    {
      icon: Wrench,
      label: "Maintenance Reserve",
      value: isUnlocked ? maintenanceReserve : null,
      note: "1% annual reserve",
    },
  ];

  // Tax trend data
  const taxHistory = data.taxHistory || [];
  const maxTax = Math.max(...taxHistory.map(t => t.amount), 1);

  return (
    <section className="py-20 md:py-28 bg-report-bg">
      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.2em] text-report-text-muted mb-4 text-center">
          Section 3
        </p>
        
        <h2 className="text-2xl md:text-3xl font-medium text-report-text-headline mb-3 text-center">
          Financial Reality
        </h2>
        
        <p className="text-sm text-report-text-muted text-center mb-12 max-w-lg mx-auto">
          Beyond the purchase price — the true cost of ownership
        </p>
        
        {/* Monthly Carrying Costs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12">
          {costItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="p-6 rounded-2xl bg-report-card shadow-[0_2px_12px_-2px_hsl(30_20%_20%/0.15)] border border-report-border text-center">
                <Icon className="w-5 h-5 text-report-text-muted mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-xs text-report-text-muted mb-2">{item.label}</p>
                <p className="text-xl font-medium text-report-text-headline">
                  {item.value !== null ? `$${item.value.toLocaleString()}` : "—"}
                </p>
                <p className="text-[10px] text-report-text-muted/70 mt-1">{item.note}</p>
              </div>
            );
          })}
        </div>
        
        {/* Total Monthly */}
        <div className="text-center mb-12 p-8 rounded-2xl bg-report-card shadow-[0_2px_12px_-2px_hsl(30_20%_20%/0.15)] border border-report-border max-w-sm mx-auto">
          <p className="text-xs text-report-text-muted mb-2">Estimated Monthly Carrying Cost</p>
          <p className="text-3xl font-medium text-report-text-headline">
            {isUnlocked ? `$${totalMonthly.toLocaleString()}` : "$X,XXX"}
          </p>
          <p className="text-xs text-report-text-muted/70 mt-2">
            Excludes mortgage principal & interest
          </p>
        </div>
        
        {/* Tax Trend Chart */}
        {isUnlocked && taxHistory.length > 0 && (
          <div className="max-w-2xl mx-auto bg-report-card rounded-2xl shadow-[0_2px_12px_-2px_hsl(30_20%_20%/0.15)] border border-report-border p-8">
            <p className="text-sm text-report-text-body font-medium text-center mb-6">Tax Trend (5–10 Years)</p>
            <div className="flex items-end justify-center gap-3 h-32">
              {taxHistory.slice(-7).map((item, index) => {
                const height = (item.amount / maxTax) * 100;
                return (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div 
                      className="w-10 bg-report-accent/20 rounded-t-lg transition-all"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] text-report-text-muted">{item.year}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-report-text-muted text-center mt-4">
              Taxes have {taxHistory[taxHistory.length - 1]?.amount > taxHistory[0]?.amount ? "increased" : "remained stable"} over the past {taxHistory.length} years
            </p>
          </div>
        )}
        
        {!isUnlocked && (
          <p className="text-xs text-report-text-muted text-center mt-8 italic">
            Sample calculations — actual figures available after unlock
          </p>
        )}
      </div>
    </section>
  );
};

export default FinancialReality;
