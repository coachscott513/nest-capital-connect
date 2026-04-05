import { TrendingUp, Gauge, Zap } from "lucide-react";

interface IntelligenceDashboardProps {
  townName: string;
  avgYield?: string;
  nestScore?: number;
  marketVelocity?: "High" | "Medium" | "Low";
  avgDaysOnMarket?: number;
}

const IntelligenceDashboard = ({
  townName = "Capital District",
  avgYield = "7.2%",
  nestScore = 7,
  marketVelocity = "High",
  avgDaysOnMarket = 28
}: IntelligenceDashboardProps) => {
  // Calculate market edge based on market velocity
  const getMarketEdge = () => {
    if (marketVelocity === "High") return "+2.4%";
    if (marketVelocity === "Medium") return "+1.2%";
    return "+0.6%";
  };

  const indicators = [
    {
      label: "Market Edge",
      value: getMarketEdge(),
      valueStyle: { color: "hsl(var(--emerald))" },
      icon: TrendingUp,
    },
    {
      label: "Nest Score",
      value: `${nestScore} / 10`,
      valueStyle: { color: "hsl(var(--primary-foreground))" },
      icon: Gauge,
    },
    {
      label: "Market Velocity",
      value: marketVelocity,
      valueStyle:
        marketVelocity === "High"
          ? { color: "hsl(var(--accent))" }
          : marketVelocity === "Medium"
            ? { color: "hsl(var(--amber))" }
            : { color: "hsl(var(--primary-foreground) / 0.8)" },
      icon: Zap,
    },
  ];

  return (
    <div className="w-full bg-background border-b border-border">
      {/* Title Section */}
      <div className="text-center pt-16 pb-8">
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl text-foreground uppercase tracking-[0.8em] font-[100] leading-tight"
          style={{ letterSpacing: '0.8em' }}
        >
          {townName.toUpperCase()} <span className="text-primary text-glow">: SPOTLIGHT</span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-muted-foreground tracking-[0.3em] uppercase font-light">
          [ Town Snapshot ]
        </p>
      </div>

      {/* Market Indicators Bar */}
      <div
        className="mx-auto max-w-5xl mb-8 rounded-[2rem] overflow-hidden bg-foreground/90 backdrop-blur-xl shadow-[0_18px_40px_-18px_hsl(var(--foreground)/0.45)]"
        style={{ border: "1px solid hsl(var(--primary-foreground) / 0.18)" }}
      >
        <div className="px-8 md:px-10 py-5 flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-0">
          {indicators.map((indicator, index) => (
            <>
              <div key={indicator.label} className="flex items-center gap-4 min-w-0 md:px-8">
                <indicator.icon className="w-5 h-5 shrink-0" style={{ ...indicator.valueStyle, opacity: 0.85 }} />
                <div className="flex flex-col min-w-0">
                  <span
                    className="text-[11px] uppercase tracking-[0.24em] font-medium"
                    style={{ color: "hsl(var(--primary-foreground) / 0.58)" }}
                  >
                    {indicator.label}
                  </span>
                  <span
                    className="text-lg md:text-[1.75rem] leading-none font-medium tracking-tight mt-1"
                    style={indicator.valueStyle}
                  >
                    {indicator.value}
                  </span>
                </div>
              </div>
              {index < indicators.length - 1 && (
                <div
                  className="hidden md:block w-px h-16"
                  style={{ backgroundColor: "hsl(var(--primary-foreground) / 0.18)" }}
                />
              )}
            </>
          ))}
        </div>
      </div>

      {/* Cinematic Teal Pulse Line Bridge */}
      <div className="flex justify-center pb-4">
        <div className="w-px h-16 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
      </div>
    </div>
  );
};

export default IntelligenceDashboard;
