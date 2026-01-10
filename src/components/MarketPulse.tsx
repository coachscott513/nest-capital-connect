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
    <section className="section-massive px-[5%] bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Maximum Breathing Room */}
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Market Pulse</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground tracking-tight">
            The data Zillow won't show you
          </h2>
        </div>

        {/* Bento Grid with Neon Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pulseCards.map((card) => (
            <div 
              key={card.label}
              className="bento-card p-10 group relative overflow-hidden"
            >
              {/* Circular Gauge - Neon Bloomberg Style */}
              <div className="relative w-32 h-32 mx-auto mb-8">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background Ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="6"
                  />
                  {/* Progress Ring - Teal Glow */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="6"
                    strokeDasharray={`${card.gaugePercent * 2.64} 264`}
                    className="gauge-ring"
                  />
                </svg>
                {/* Center Value - Glowing */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary text-glow">{card.value}<span className="text-xl">{card.suffix}</span></span>
                </div>
              </div>
              
              {/* Icon + Label */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground text-center mb-2">{card.label}</h3>
              <p className="text-sm text-muted-foreground text-center body-airy">{card.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketPulse;
