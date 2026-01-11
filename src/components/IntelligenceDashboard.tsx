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
      color: "text-green-400",
      icon: TrendingUp
    },
    { 
      label: "Nest Score", 
      value: `${nestScore} / 10`, 
      color: "text-primary",
      icon: Gauge
    },
    { 
      label: "Market Velocity", 
      value: marketVelocity, 
      color: marketVelocity === "High" ? "text-primary" : marketVelocity === "Medium" ? "text-yellow-400" : "text-muted-foreground",
      icon: Zap
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
        className="mx-auto max-w-4xl mb-8 rounded-2xl border border-border/50 overflow-hidden"
        style={{
          background: 'rgba(11, 11, 11, 0.8)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
        }}
      >
        <div className="px-6 py-4 flex items-center justify-center gap-8 md:gap-16">
          {indicators.map((indicator, index) => (
            <div key={indicator.label} className="flex items-center gap-3">
              <indicator.icon className={`w-4 h-4 ${indicator.color} opacity-70`} />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-light">
                  {indicator.label}
                </span>
                <span className={`text-sm md:text-base font-light tracking-wide ${indicator.color}`}>
                  {indicator.value}
                </span>
              </div>
              {index < indicators.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-border/50 ml-8" />
              )}
            </div>
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
