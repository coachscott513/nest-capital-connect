import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, Clock, Home, GraduationCap } from "lucide-react";

const DelmarMetricsGrid = () => {
  const metrics = [
    {
      icon: DollarSign,
      value: "$349,000",
      label: "Median Home Price",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: TrendingUp,
      value: "$221",
      label: "Average Price/SqFt",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Clock,
      value: "23",
      label: "Average Days on Market",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Home,
      value: "27",
      label: "Active Listings",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: GraduationCap,
      value: "9/10",
      label: "Bethlehem Central School District",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card 
                key={index}
                className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2"
              >
                <div className={`w-16 h-16 ${metric.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-8 h-8 ${metric.color}`} />
                </div>
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${metric.color} break-words`}>
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {metric.label}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DelmarMetricsGrid;
