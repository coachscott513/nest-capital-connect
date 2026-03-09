import { TrendingUp } from "lucide-react";

interface MarketStats {
  totalDeals: number;
  avgCapRate: number;
  cashFlowPositivePercent: number;
  avgPrice: number;
  markets: string[];
}

const defaultStats: MarketStats = {
  totalDeals: 101,
  avgCapRate: 8.2,
  cashFlowPositivePercent: 84,
  avgPrice: 346000,
  markets: ["Albany", "Troy", "Schenectady", "Saratoga"],
};

const MarketStatsBar = ({ stats = defaultStats }: { stats?: MarketStats }) => {
  return (
    <div className="w-full bg-card border-y border-border/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber" />
            <span className="text-muted-foreground">Active Deals:</span>
            <span className="font-bold text-foreground">{stats.totalDeals}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Avg Cap Rate:</span>
            <span className="font-bold text-emerald">{stats.avgCapRate}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Cash Flow Positive:</span>
            <span className="font-bold text-emerald">{stats.cashFlowPositivePercent}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Avg Price:</span>
            <span className="font-bold text-foreground">${Math.round(stats.avgPrice / 1000)}K</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Markets:</span>
            <span className="text-foreground">
              {stats.markets.join(" · ")}
              <span className="text-muted-foreground/60"> +12 more</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketStatsBar;
