import { TrendingUp, CheckCircle, Building2 } from "lucide-react";

const MarketPulse = () => {
  const pulseCards = [
    {
      icon: TrendingUp,
      label: "Average Capital Region Yield",
      value: "8.2",
      suffix: "%",
      subtext: "Multi-family average",
      gaugePercent: 82
    },
    {
      icon: CheckCircle,
      label: "Nest Verified Opportunities",
      value: "47",
      suffix: "",
      subtext: "Active this week",
      gaugePercent: 94
    },
    {
      icon: Building2,
      label: "New Business Permits",
      value: "+23",
      suffix: "",
      subtext: "Weekly local growth",
      gaugePercent: 76
    }
  ];

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Cinematic Breathing Line - 200px tall with pulse animation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[200px] breathing-line" />
      
      {/* Massive Vertical Padding - Command Center Feel */}
      <div className="pt-[15vh] pb-[10vh] px-[5%]">
        <div className="max-w-7xl mx-auto">
          {/* Cinematic Institutional Header - Massive Scale */}
          <div className="text-center mb-24">
            <h2 className="market-pulse-cinematic text-foreground uppercase mb-6">
              Market Pulse
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
              The data Zillow won't show you
            </p>
          </div>

          {/* 3-Column Command Center Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {pulseCards.map((card) => (
              <div 
                key={card.label}
                className="bento-card p-8 lg:p-12 group relative overflow-hidden"
              >
                {/* Teal Glow Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Circular Gauge - Larger for Command Center */}
                <div className="relative w-40 h-40 lg:w-48 lg:h-48 mx-auto mb-10">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background Ring */}
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="4"
                    />
                    {/* Progress Ring - Teal Glow with Animation */}
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                      strokeDasharray={`${card.gaugePercent * 2.64} 264`}
                      strokeLinecap="round"
                      className="gauge-ring drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]"
                    />
                  </svg>
                  {/* Center Value - Glowing Bloomberg Style */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl lg:text-5xl font-light text-primary text-glow tracking-tight">
                      {card.value}
                      <span className="text-2xl lg:text-3xl">{card.suffix}</span>
                    </span>
                  </div>
                </div>
                
                {/* Icon Badge */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors border border-primary/20">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                {/* Label - Command Center Typography */}
                <h3 className="text-lg lg:text-xl font-medium text-foreground text-center mb-3 tracking-wide">
                  {card.label}
                </h3>
                <p className="text-sm text-muted-foreground text-center tracking-wider uppercase">
                  {card.subtext}
                </p>
              </div>
            ))}
          </div>
          
          {/* Additional Data Row - Institutional Feel */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Days on Market", value: "28", trend: "↓ 12%" },
              { label: "Active Towns", value: "43", trend: "Coverage" },
              { label: "Monthly Views", value: "12K+", trend: "Growing" },
              { label: "Data Sources", value: "7", trend: "Verified" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 glass rounded-2xl">
                <p className="text-3xl lg:text-4xl font-light text-primary mb-2 tracking-tight">{stat.value}</p>
                <p className="text-sm text-foreground font-medium mb-1">{stat.label}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.trend}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPulse;
