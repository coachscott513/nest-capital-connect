import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import dealImage from "@/assets/deal-of-month-triplex.jpg";

const DealOfMonthSection = () => {
  return (
    <section className="py-20 px-4 bg-background border-t border-border">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="text-primary font-bold text-sm mb-3 uppercase tracking-wider">
            Featured Investment
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Deal of the Month
          </h2>
        </div>

        {/* Property Card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg max-w-lg mx-auto">
          {/* Image with Overlay Tags */}
          <div className="relative">
            <img 
              src={dealImage} 
              alt="Triplex investment property in Troy, NY" 
              className="w-full h-64 object-cover"
            />
            {/* Overlay Tags */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                Triplex
              </span>
              <span className="bg-background/90 text-foreground px-3 py-1 rounded-full text-sm font-semibold">
                Troy, NY
              </span>
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                14% Cap Rate
              </span>
            </div>
          </div>

          {/* Data Grid */}
          <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
            <div className="p-4 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Purchase
              </div>
              <div className="text-xl font-bold text-foreground">
                $180,000
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Rehab
              </div>
              <div className="text-xl font-bold text-foreground">
                $20,000
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Net Cash Flow
              </div>
              <div className="text-xl font-bold text-primary">
                +$850/mo
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8">
          <Link to="/albany-investment-properties">
            <Button size="lg" className="px-8">
              See Current Inventory
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DealOfMonthSection;
