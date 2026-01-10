import { TrendingUp, CheckCircle, Building2 } from "lucide-react";

const MarketPulse = () => {
  const pulseCards = [
    {
      icon: TrendingUp,
      label: "Average Capital Region Yield",
      value: "8.2%",
      subtext: "Multi-family average",
      color: "text-primary"
    },
    {
      icon: CheckCircle,
      label: "Nest Verified Opportunities",
      value: "47",
      subtext: "Active this week",
      color: "text-primary"
    },
    {
      icon: Building2,
      label: "New Business Permits",
      value: "+23",
      subtext: "Weekly local growth",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-16 px-[5%] bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Market Pulse</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F]">
            The data Zillow won't show you
          </h2>
        </div>

        {/* Apple Health-style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pulseCards.map((card) => (
            <div 
              key={card.label}
              className="apple-card p-8 hover-lift group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <span className="text-sm font-medium text-[#6E6E73]">{card.label}</span>
              </div>
              
              <div className="mb-2">
                <span className={`text-5xl font-bold ${card.color}`}>{card.value}</span>
              </div>
              
              <p className="text-sm text-[#6E6E73]">{card.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketPulse;
