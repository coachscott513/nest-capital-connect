import { Clock, BarChart3, TrendingUp } from "lucide-react";
import { PropertyIntelData } from "./types";

interface MarketPulseProps {
  data: PropertyIntelData;
}

const MarketPulse = ({ data }: MarketPulseProps) => {
  const getPressureColor = (pressure: string) => {
    switch (pressure) {
      case 'Low':
        return 'text-report-success';
      case 'High':
        return 'text-report-warning';
      default:
        return 'text-report-muted';
    }
  };

  const metrics = [
    {
      icon: Clock,
      label: "Avg Days on Market",
      value: `${data.avgDaysOnMarket} days`,
      subtext: "in this area",
    },
    {
      icon: BarChart3,
      label: "Inventory Pressure",
      value: data.inventoryPressure,
      valueClass: getPressureColor(data.inventoryPressure),
      subtext: "buyer competition",
    },
    {
      icon: TrendingUp,
      label: "Sale-to-List Ratio",
      value: `${(data.saleToListRatio * 100).toFixed(0)}%`,
      subtext: "recent closings",
    },
  ];

  return (
    <section className="py-16 md:py-20 border-b border-report-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-10 text-center">
          Market Pulse
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-report-card"
            >
              <metric.icon className="w-6 h-6 text-report-muted mb-4" strokeWidth={1.5} />
              <p className="text-xs text-report-muted mb-2">{metric.label}</p>
              <p className={`text-2xl font-light ${metric.valueClass || 'text-report-fg'}`}>
                {metric.value}
              </p>
              <p className="text-xs text-report-muted mt-1">{metric.subtext}</p>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-report-muted text-center mt-6">
          Metrics reflect recent local market behavior.
        </p>
      </div>
    </section>
  );
};

export default MarketPulse;
