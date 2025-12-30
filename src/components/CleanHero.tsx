import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CleanHeroProps {
  onScrollToTowns?: () => void;
}

const CleanHero = ({ onScrollToTowns }: CleanHeroProps) => {
  return (
    <section className="relative px-[5%] py-20 md:py-28 bg-background border-b border-border">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
          Modern Real Estate Intelligence<br />
          <span className="text-primary">for the Capital District</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
          Clear data. Local context.<br />
          Built town by town — not by algorithms.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button 
            size="lg" 
            className="h-14 px-8 text-lg font-bold w-full sm:w-auto"
            onClick={onScrollToTowns}
          >
            Start with your town
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="h-14 px-8 text-lg font-semibold w-full sm:w-auto"
            asChild
          >
            <Link to="/intelligence">
              See how property intelligence works
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CleanHero;