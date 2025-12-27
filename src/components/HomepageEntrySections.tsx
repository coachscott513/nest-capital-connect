import { Link } from "react-router-dom";
import { MapPin, Home, Users, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface HomepageEntrySectionsProps {
  onTownClick?: () => void;
  onPropertyClick?: () => void;
  onBuyerClick?: () => void;
}

const HomepageEntrySections = ({ onTownClick, onPropertyClick, onBuyerClick }: HomepageEntrySectionsProps) => {
  return (
    <section className="px-[5%] py-12 bg-background border-b border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Where Would You Like to Start?
          </h2>
          <p className="text-muted-foreground">
            Choose your path to explore Capital District real estate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Town Intelligence */}
          <Card 
            className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
            onClick={onTownClick}
          >
            <CardContent className="p-6">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                Town Intelligence
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Explore local real estate data, school districts, and market trends by town.
              </p>
              <div className="flex items-center gap-1 text-primary text-sm font-medium">
                Explore Towns
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>

          {/* Property Intelligence */}
          <Link to="/deal-desk">
            <Card 
              className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group h-full"
              onClick={onPropertyClick}
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Home className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Property Intelligence
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Analyze individual properties and get detailed intelligence reports.
                </p>
                <div className="flex items-center gap-1 text-primary text-sm font-medium">
                  Analyze a Property
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Buyer & Investor Paths */}
          <Card 
            className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
            onClick={onBuyerClick}
          >
            <CardContent className="p-6">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                Buyer & Investor Paths
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Guidance for first-time buyers, investors, and financing options.
              </p>
              <div className="flex items-center gap-1 text-primary text-sm font-medium">
                Get Started
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomepageEntrySections;
