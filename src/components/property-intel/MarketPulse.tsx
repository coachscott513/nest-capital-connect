import { Clock, BarChart3, TrendingUp } from "lucide-react";
import { PropertyIntelData } from "./types";

interface MarketPulseProps {
  data: PropertyIntelData;
}

const MarketPulse = ({ data }: MarketPulseProps) => {
  const getPressureLabel = (pressure: string) => {
    switch (pressure) {
      case 'Low':
        return { text: 'Low', color: 'text-report-success', bg: 'bg-report-success/10' };
      case 'High':
        return { text: 'High', color: 'text-report-warning', bg: 'bg-report-warning/10' };
      default:
        return { text: 'Balanced', color: 'text-report-accent', bg: 'bg-report-accent/10' };
    }
  };

  const pressure = getPressureLabel(data.inventoryPressure);

  const metrics = [
    {
      icon: Clock,
      label: "Days on Market",
      value: data.avgDaysOnMarket.toString(),
      unit: "avg",
      subtext: "in this area",
    },
    {
      icon: BarChart3,
      label: "Inventory Pressure",
      value: pressure.text,
      valueClass: pressure.color,
      subtext: "buyer competition",
    },
    {
      icon: TrendingUp,
      label: "Sale-to-List",
      value: `${(data.saleToListRatio * 100).toFixed(0)}%`,
      subtext: "recent closings",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-report-section-light">
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-report-muted text-center mb-3">
          Market Conditions
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-report-fg mb-12 text-center">
          Market Pulse
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-report-section-muted border border-report-border/30"
            >
              <div className="w-14 h-14 rounded-2xl bg-report-accent/10 flex items-center justify-center mb-5">
                <metric.icon className="w-7 h-7 text-report-accent" strokeWidth={1.5} />
              </div>
              <p className="text-xs uppercase tracking-wider text-report-muted mb-4">{metric.label}</p>
              <div className="flex items-baseline gap-1.5">
                <p className={`text-4xl font-light ${metric.valueClass || 'text-report-fg'}`}>
                  {metric.value}
                </p>
                {metric.unit && (
                  <span className="text-sm text-report-muted">{metric.unit}</span>
                )}
              </div>
              <p className="text-xs text-report-muted mt-3">{metric.subtext}</p>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-report-muted text-center mt-10">
          Metrics reflect recent local market behavior.
        </p>
      </div>
    </section>
  );
};

export default MarketPulse;
