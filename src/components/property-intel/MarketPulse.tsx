import { Clock, TrendingUp, Percent, BarChart3 } from "lucide-react";
import { PropertyIntelData } from "./types";

interface MarketPulseProps {
  data: PropertyIntelData;
  isUnlocked?: boolean;
}

const MarketPulse = ({ data, isUnlocked = false }: MarketPulseProps) => {
  const getPressureColor = (pressure: string) => {
    switch (pressure) {
      case 'Low': return 'text-report-success';
      case 'Balanced': return 'text-report-accent';
      case 'High': return 'text-report-warning';
      default: return 'text-report-muted';
    }
  };

  const getPressureBg = (pressure: string) => {
    switch (pressure) {
      case 'Low': return 'bg-report-success/10';
      case 'Balanced': return 'bg-report-accent/10';
      case 'High': return 'bg-report-warning/10';
      default: return 'bg-report-section-muted';
    }
  };

  const marketItems = [
    {
      icon: Clock,
      label: "Avg Days on Market",
      value: `${data.avgDaysOnMarket} days`,
      subtext: "Time to sale in this area",
    },
    {
      icon: TrendingUp,
      label: "Demand Pressure",
      value: data.inventoryPressure,
      subtext: data.inventoryPressure === 'Low' 
        ? "Buyer-favorable conditions" 
        : data.inventoryPressure === 'High' 
          ? "Competitive market" 
          : "Balanced market",
      isHighlight: true,
    },
    {
      icon: Percent,
      label: "Sale-to-List Ratio",
      value: `${(data.saleToListRatio * 100).toFixed(1)}%`,
      subtext: "What properties sell for vs asking",
    },
    {
      icon: BarChart3,
      label: "Price Per Sq Ft",
      value: `$${data.pricePerSqFt}`,
      subtext: "Comparison benchmark",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-report-bg">
      <div className="container mx-auto px-4 max-w-4xl">
        <article className="bg-report-card rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-report-border p-8 md:p-10">
          <header className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-report-text-muted mb-4">
              Section 4
            </p>

            <h2 className="text-2xl md:text-3xl font-medium text-report-text-headline mb-3">
              Market Context
            </h2>

            <p className="text-sm text-report-text-muted mb-12 max-w-lg mx-auto">
              Is this property fairly priced — really?
            </p>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {marketItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center p-6 rounded-2xl border border-report-border ${
                    item.isHighlight ? getPressureBg(data.inventoryPressure) : "bg-report-section-light"
                  }`}
                >
                  <Icon className="w-5 h-5 text-report-accent mb-3" strokeWidth={1.5} />
                  <p className="text-xs uppercase tracking-wider text-report-text-muted mb-2">{item.label}</p>
                  <p
                    className={`text-xl font-medium ${
                      item.isHighlight ? getPressureColor(data.inventoryPressure) : "text-report-text-headline"
                    }`}
                  >
                    {item.value}
                  </p>
                  <p className="text-[10px] text-report-text-muted/70 mt-2">{item.subtext}</p>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
};

export default MarketPulse;
