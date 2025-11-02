import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const DelmarDemographics = () => {
  const demographics = [
    { label: "Median Household Income", value: "$98,500" },
    { label: "Owner Occupied", percentage: 78 },
    { label: "Renter Occupied", percentage: 22 },
    { label: "Median Age", value: "42 years" },
  ];

  const commuteData = [
    { type: "Car", percentage: 85 },
    { type: "Public Transit", percentage: 8 },
    { type: "Walk/Bike", percentage: 5 },
    { type: "Work from Home", percentage: 12 },
  ];

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Local Insights & Demographics
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Delmar offers a perfect blend of suburban tranquility and urban convenience. 
            Known for its excellent schools, tree-lined streets, and strong community spirit, 
            it's consistently rated as one of the Capital Region's most desirable neighborhoods.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Community Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {demographics.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-foreground">{item.label}</span>
                    <span className="font-bold text-primary">
                      {item.value || `${item.percentage}%`}
                    </span>
                  </div>
                  {item.percentage !== undefined && (
                    <Progress value={item.percentage} className="h-3" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Commute Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {commuteData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-foreground">{item.type}</span>
                    <span className="font-bold text-primary">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-3" />
                </div>
              ))}
              <p className="text-sm text-muted-foreground mt-4">
                Average commute to Downtown Albany: 15 minutes
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DelmarDemographics;
