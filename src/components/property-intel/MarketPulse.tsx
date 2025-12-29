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
        return 'text-report-fg';
    }
  };

  const getPressureBg = (pressure: string) => {
    switch (pressure) {
      case 'Low':
        return 'bg-report-success/10';
      case 'High':
        return 'bg-report-warning/10';
      default:
        return 'bg-report-accent/10';
    }
  };

  const metrics = [
    {
      icon: Clock,
      label: "Avg Days on Market",
      value: `${data.avgDaysOnMarket}`,
      unit: "days",
      subtext: "in this area",
    },
    {
      icon: BarChart3,
      label: "Inventory Pressure",
      value: data.inventoryPressure,
      valueClass: getPressureColor(data.inventoryPressure),
      iconBg: getPressureBg(data.inventoryPressure),
      subtext: "buyer competition",
    },
    {
      icon: TrendingUp,
      label: "Sale-to-List Ratio",
      value: `${(data.saleToListRatio * 100).toFixed(0)}`,
      unit: "%",
      subtext: "recent closings",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-report-bg">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-10 text-center">
          Market Pulse
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-report-card border border-report-border/50 shadow-sm"
            >
              <div className={`w-12 h-12 rounded-full ${metric.iconBg || 'bg-report-accent/10'} flex items-center justify-center mb-4`}>
                <metric.icon className="w-6 h-6 text-report-accent" strokeWidth={1.5} />
              </div>
              <p className="text-xs uppercase tracking-wider text-report-muted mb-3">{metric.label}</p>
              <div className="flex items-baseline gap-1">
                <p className={`text-3xl font-light ${metric.valueClass || 'text-report-fg'}`}>
                  {metric.value}
                </p>
                {metric.unit && (
                  <span className="text-sm text-report-muted">{metric.unit}</span>
                )}
              </div>
              <p className="text-xs text-report-muted mt-2">{metric.subtext}</p>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-report-muted text-center mt-8">
          Metrics reflect recent local market behavior.
        </p>
      </div>
    </section>
  );
};

export default MarketPulse;
