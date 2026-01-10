import { TrendingUp, Zap, BarChart3 } from "lucide-react";

interface MarketPulseTickerProps {
  avgYield?: string;
  nestScore?: number;
  activeListings?: number;
  avgDaysOnMarket?: number;
  townName?: string;
}

const MarketPulseTicker = ({
  avgYield = "7.2%",
  nestScore = 7,
  activeListings = 24,
  avgDaysOnMarket = 28,
  townName = "Capital District"
}: MarketPulseTickerProps) => {
  const tickerItems = [
    { icon: TrendingUp, label: "Target Yield", value: avgYield, color: "text-primary" },
    { icon: Zap, label: "Nest Score", value: `${nestScore}/10`, color: "text-primary" },
    { icon: BarChart3, label: "Active Listings", value: activeListings.toString(), color: "text-foreground" },
    { icon: TrendingUp, label: "Avg DOM", value: `${avgDaysOnMarket} days`, color: "text-foreground" },
    { icon: TrendingUp, label: "Target Yield", value: avgYield, color: "text-primary" },
    { icon: Zap, label: "Nest Score", value: `${nestScore}/10`, color: "text-primary" },
    { icon: BarChart3, label: "Active Listings", value: activeListings.toString(), color: "text-foreground" },
    { icon: TrendingUp, label: "Avg DOM", value: `${avgDaysOnMarket} days`, color: "text-foreground" },
  ];

  return (
    <div className="w-full overflow-hidden bg-card/80 backdrop-blur-sm border-y border-border py-3">
      <div className="flex animate-ticker">
        {tickerItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-8 whitespace-nowrap"
          >
            <item.icon className={`w-4 h-4 ${item.color}`} />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {item.label}
            </span>
            <span className={`text-sm font-semibold ${item.color}`}>
              {item.value}
            </span>
            <span className="mx-6 text-border">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPulseTicker;
