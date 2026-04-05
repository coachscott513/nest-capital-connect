import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Home, Clock, DollarSign } from "lucide-react";

interface MarketAnalyticsProps {
  properties: Array<{
    price: number;
    sqft: number;
    daysOnMarket?: number;
  }>;
}

const DelmarMarketAnalytics = ({ properties }: MarketAnalyticsProps) => {
  const calculateMedianPrice = () => {
    if (properties.length === 0) return 0;
    const sorted = [...properties].sort((a, b) => a.price - b.price);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1].price + sorted[mid].price) / 2
      : sorted[mid].price;
  };

  const calculateAvgDOM = () => {
    const withDOM = properties.filter((p) => p.daysOnMarket);
    if (withDOM.length === 0) return 0;
    return Math.round(
      withDOM.reduce((sum, p) => sum + (p.daysOnMarket || 0), 0) / withDOM.length
    );
  };

  const calculatePricePerSqft = () => {
    const withSqft = properties.filter((p) => p.sqft > 0);
    if (withSqft.length === 0) return 0;
    const avgPrice = withSqft.reduce((sum, p) => sum + p.price, 0) / withSqft.length;
    const avgSqft = withSqft.reduce((sum, p) => sum + p.sqft, 0) / withSqft.length;
    return Math.round(avgPrice / avgSqft);
  };

  const medianPrice = calculateMedianPrice();
  const avgDOM = calculateAvgDOM();
  const pricePerSqft = calculatePricePerSqft();

  return (
    <section className="py-12 bg-gradient-to-br from-secondary to-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Delmar Market Analytics
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time market data to help you make informed decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="border-red-200 bg-background hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-10 h-10 mx-auto mb-3 text-red-600" />
              <div className="text-3xl font-bold text-foreground mb-1">
                ${(medianPrice / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-muted-foreground">Median List Price</div>
              <div className="text-xs text-green-600 mt-2">↑ 5% vs Last Year</div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-background hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Clock className="w-10 h-10 mx-auto mb-3 text-accent" />
              <div className="text-3xl font-bold text-foreground mb-1">{avgDOM}</div>
              <div className="text-sm text-muted-foreground">Avg Days on Market</div>
              <div className="text-xs text-green-600 mt-2">↓ 3 days vs Q1</div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-background hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-green-600" />
              <div className="text-3xl font-bold text-foreground mb-1">
                ${pricePerSqft}
              </div>
              <div className="text-sm text-muted-foreground">Price per Sq Ft</div>
              <div className="text-xs text-muted-foreground mt-2">
                vs Albany: $212
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-background hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Home className="w-10 h-10 mx-auto mb-3 text-purple-600" />
              <div className="text-3xl font-bold text-foreground mb-1">
                {properties.length}
              </div>
              <div className="text-sm text-muted-foreground">Active Inventory</div>
              <div className="text-xs text-orange-600 mt-2">Low Supply</div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Chart */}
        <Card className="bg-background">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Price Comparison: Delmar vs Albany County
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground/80">Delmar</span>
                  <span className="text-sm font-bold text-red-600">
                    ${pricePerSqft}/sqft
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-red-600 h-3 rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground/80">
                    Albany County Avg
                  </span>
                  <span className="text-sm font-bold text-accent">$212/sqft</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-accent h-3 rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DelmarMarketAnalytics;
