import { Link } from "react-router-dom";
import { Building2, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MultiUnitSearchSection = () => {
  return (
    <section className="px-[5%] py-16 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Search Multi-Unit Investment Homes in the Capital District
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Hand-curated duplex, triplex, and 4-unit properties across Albany, Schenectady, and Troy. 
            Updated daily. Built for investors who want clean numbers and fast answers.
          </p>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 - Albany */}
          <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Albany NY Multi-Units</h3>
            <p className="text-muted-foreground mb-6">
              Explore cash-flowing duplexes, triplexes, and small apartment buildings in Albany.
            </p>
            <Button asChild className="w-full">
              <Link to="/albany-multi-unit">
                Search Albany Multi-Units
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Column 2 - Schenectady */}
          <div className="bg-card border border-border rounded-xl p-6 opacity-75">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Schenectady NY Multi-Units</h3>
            <p className="text-muted-foreground mb-6">
              Inventory coming online soon. Sign up to get notified when this page goes live.
            </p>
            <Button variant="outline" disabled className="w-full">
              Coming Soon
            </Button>
          </div>

          {/* Column 3 - Troy */}
          <div className="bg-card border border-border rounded-xl p-6 opacity-75">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Troy NY Multi-Units</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to see off-market and underpriced multi-units in Troy.
            </p>
            <Button variant="outline" disabled className="w-full">
              Coming Soon
            </Button>
          </div>
        </div>

        {/* Internal Link */}
        <div className="text-center mt-8">
          <Link 
            to="/albany-multi-unit" 
            className="text-primary font-semibold hover:underline inline-flex items-center gap-2"
          >
            Looking for multi-unit homes? Explore Albany investment properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MultiUnitSearchSection;
