import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Home, Calendar } from "lucide-react";
import { useAnalytics } from './AnalyticsTracker';
import LeadCaptureForm from './LeadCaptureForm';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceTrendChartProps {
  neighborhood: string;
  propertyType?: "single-family" | "multi-family" | "condo" | "all";
  showLeadCapture?: boolean;
}

const PriceTrendChart = ({ 
  neighborhood, 
  propertyType = "single-family", 
  showLeadCapture = true 
}: PriceTrendChartProps) => {
  const [timeRange, setTimeRange] = useState("12m");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const { trackChartInteraction } = useAnalytics();

  // Mock data - in real app, this would come from your analytics/MLS data
  const generateMockData = () => {
    const months = timeRange === "24m" ? 24 : 12;
    const basePrice = propertyType === "single-family" ? 450000 : 
                     propertyType === "multi-family" ? 650000 : 
                     propertyType === "condo" ? 320000 : 500000;
    
    const labels = [];
    const prices = [];
    const volumes = [];
    
    for (let i = months; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
      
      // Generate realistic price trends with some volatility
      const trend = (months - i) * 0.003; // 0.3% growth per month
      const volatility = (Math.random() - 0.5) * 0.04; // ±2% random variation
      const price = Math.round(basePrice * (1 + trend + volatility));
      prices.push(price);
      
      // Generate volume data (number of sales)
      const baseVolume = propertyType === "single-family" ? 25 : 15;
      const seasonality = Math.sin((i / 12) * 2 * Math.PI) * 0.3; // Seasonal variation
      const volume = Math.round(baseVolume * (1 + seasonality + volatility));
      volumes.push(Math.max(volume, 5)); // Minimum 5 sales
    }
    
    return { labels, prices, volumes };
  };

  const { labels, prices, volumes } = generateMockData();
  
  const currentPrice = prices[prices.length - 1];
  const previousPrice = prices[prices.length - 2];
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(1);
  const isPositiveChange = priceChange >= 0;

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Median Sale Price',
        data: prices,
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'hsl(var(--primary))',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'hsl(var(--background))',
        titleColor: 'hsl(var(--foreground))',
        bodyColor: 'hsl(var(--foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => `Median Price: $${context.parsed.y.toLocaleString()}`,
          afterBody: () => [`Click "Get Market Report" for detailed analysis`],
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
        },
      },
      y: {
        grid: {
          color: 'hsl(var(--border))',
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          callback: (value: any) => `$${(value / 1000).toFixed(0)}K`,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const handleGetReport = () => {
    trackChartInteraction('price_trend_report_request', neighborhood);
    setShowLeadForm(true);
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    trackChartInteraction('price_trend_timeframe_change', neighborhood, { timeframe: value });
  };

  if (showLeadForm) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Get Your Complete {neighborhood} Market Report
            </CardTitle>
            <CardDescription>
              Includes price trends, comparable sales, future projections, and investment opportunities
            </CardDescription>
          </CardHeader>
        </Card>
        <LeadCaptureForm 
          type="investment" 
          title={`${neighborhood} Market Analysis Request`}
          description="Get detailed market insights, price predictions, and investment opportunities in your inbox within 24 hours"
          buttonText="Send My Market Report"
        />
        <Button 
          variant="outline" 
          onClick={() => setShowLeadForm(false)}
          className="w-full"
        >
          ← Back to Price Chart
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Home className="w-5 h-5 text-primary" />
              {neighborhood} Price Trends
            </CardTitle>
            <CardDescription>
              {propertyType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} homes • Last {timeRange === "12m" ? "12" : "24"} months
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12m">12 Months</SelectItem>
                <SelectItem value="24m">24 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Current Median</p>
            <p className="text-2xl font-bold">${currentPrice.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Monthly Change</p>
            <div className="flex items-center gap-2">
              {isPositiveChange ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-lg font-semibold ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
                {isPositiveChange ? '+' : ''}{priceChangePercent}%
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Avg Monthly Sales</p>
            <p className="text-2xl font-bold">{Math.round(volumes.reduce((a, b) => a + b, 0) / volumes.length)}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-64 mb-6">
          <Line data={chartData} options={chartOptions} />
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Updated Daily
            </Badge>
            <Badge variant="outline">MLS Data</Badge>
            <Badge variant="outline">Expert Analysis</Badge>
          </div>
          
          {showLeadCapture && (
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-foreground">Want the complete market analysis?</h4>
                  <p className="text-sm text-muted-foreground">
                    Get detailed insights, comparable sales, and future projections
                  </p>
                </div>
                <Button onClick={handleGetReport} className="shrink-0">
                  Get Market Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceTrendChart;