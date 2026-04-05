import { TrendingUp, DollarSign, Calculator, BarChart3, Percent, Home, FileText, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ReportPreviewShowcaseProps {
  showCTA?: boolean;
  compact?: boolean;
}

const ReportPreviewShowcase = ({ showCTA = true, compact = false }: ReportPreviewShowcaseProps) => {
  const metrics = [
    {
      icon: TrendingUp,
      label: "Cash on Cash",
      value: "2.8%",
      description: "Annual return on invested capital",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      icon: Percent,
      label: "Cap Rate",
      value: "6.5%",
      description: "Net income relative to price",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Calculator,
      label: "DSCR",
      value: "1.08x",
      description: "Debt service coverage ratio",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      icon: BarChart3,
      label: "Break-Even",
      value: "95%",
      description: "Occupancy required to cover costs",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: DollarSign,
      label: "Monthly Cash Flow",
      value: "$149",
      description: "Net monthly income after all expenses",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Home,
      label: "Cash to Close",
      value: "$63,750",
      description: "Total capital required at closing",
      color: "text-muted-foreground",
      bgColor: "bg-muted"
    }
  ];

  const displayMetrics = compact ? metrics.slice(0, 4) : metrics;

  return (
    <section className={compact ? "" : "py-16 md:py-20 px-[5%] bg-muted/30"}>
      <div className={compact ? "" : "max-w-5xl mx-auto"}>
        {!compact && (
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              See What You Get
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Investment Executive Summary
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every deal analysis includes a comprehensive breakdown of the numbers that matter. 
              Here's a sample from 177 Lancaster St, Albany — a townhouse-style duplex.
            </p>
          </div>
        )}

        {/* Metrics Grid */}
        <div className={`grid ${compact ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"} gap-4 ${compact ? "" : "mb-8"}`}>
          {displayMetrics.map((metric) => (
            <Card key={metric.label} className="border border-border hover:border-primary/30 transition-colors">
              <CardContent className="p-4 md:p-5">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {metric.label}
                    </p>
                    <p className={`text-xl md:text-2xl font-bold ${metric.color}`}>
                      {metric.value}
                    </p>
                    {!compact && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {metric.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showCTA && !compact && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/analyzer">
                Analyze Your Deal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/assets/sample-investment-report.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-2" />
                View Full Sample PDF
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReportPreviewShowcase;
