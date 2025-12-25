import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3 } from "lucide-react";

const CleanHero = () => {
  return (
    <section className="relative px-[5%] py-20 md:py-28 bg-background border-b border-border">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
          Smart Real Estate Decisions<br />
          <span className="text-primary">Start With Better Data</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
          Live listings, real numbers, investment tools, and zero-down homebuyer paths — 
          built for the Capital District.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button 
            size="lg" 
            className="h-14 px-8 text-lg font-bold w-full sm:w-auto"
            asChild
          >
            <a href="#start-here">
              Start Here (30 Seconds)
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="h-14 px-8 text-lg font-semibold w-full sm:w-auto"
            asChild
          >
            <Link to="/markets">
              <BarChart3 className="w-5 h-5 mr-2" />
              Browse Everything
            </Link>
          </Button>
        </div>
        
        {/* Trust Strip */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            RE/MAX Licensed
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            Economics Trained
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            500+ Properties Analyzed
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            Local Experts
          </span>
        </div>
      </div>
    </section>
  );
};

export default CleanHero;