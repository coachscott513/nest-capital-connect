import { Card } from "@/components/ui/card";
import PriceTrendChart from "@/components/PriceTrendChart";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const DelmarTrendFooter = () => {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Price Trends */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Market Trends
            </h2>
            <Card className="p-6">
              <PriceTrendChart 
                neighborhood="Delmar" 
                propertyType="all"
                showLeadCapture={false}
              />
            </Card>
          </div>

          {/* Lead Capture */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Get Your Home Value
            </h2>
            <Card className="p-6">
              <p className="text-muted-foreground mb-6">
                Curious about your home's value in today's market? Get a free, no-obligation 
                market analysis from our local experts.
              </p>
              <LeadCaptureForm 
                type="seller"
                boldtrailTag="Delmar_Market_Insights"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DelmarTrendFooter;
