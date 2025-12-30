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
    <section className="py-16 md:py-20 bg-report-section-light">
      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.2em] text-report-muted mb-6 text-center">
          Section 4
        </p>
        
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-4 text-center">
          Market Context
        </h2>
        
        <p className="text-sm text-report-muted text-center mb-10 max-w-lg mx-auto">
          Is this property fairly priced — really?
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {marketItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center p-5 rounded-2xl ${
                  item.isHighlight
                    ? getPressureBg(data.inventoryPressure)
                    : 'bg-report-section-muted'
                } border border-report-border/30`}
              >
                <Icon className="w-5 h-5 text-report-accent mb-3" strokeWidth={1.5} />
                <p className="text-xs uppercase tracking-wider text-report-muted mb-2">{item.label}</p>
                <p className={`text-xl font-light ${
                  item.isHighlight 
                    ? getPressureColor(data.inventoryPressure)
                    : 'text-report-fg'
                }`}>
                  {item.value}
                </p>
                <p className="text-[10px] text-report-muted/60 mt-2">{item.subtext}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MarketPulse;
