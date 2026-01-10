import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppleHeroProps {
  onScrollToTowns?: () => void;
}

const AppleHero = ({ onScrollToTowns }: AppleHeroProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to dealdesk with the address
      window.location.href = `/dealdesk?address=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[80px]" />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsla(0 0% 100% / 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, hsla(0 0% 100% / 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground/90">Capital District Real Estate Intelligence</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="text-foreground">Find clarity in</span>
          <br />
          <span className="text-gradient-premium">every property decision</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Clear data. Local context. Town-by-town intelligence<br className="hidden md:block" />
          built for buyers who demand precision.
        </p>

        {/* Glassmorphism Search Bar */}
        <form 
          onSubmit={handleSearch}
          className="glass-strong rounded-2xl p-2 max-w-2xl mx-auto mb-8 glow-subtle animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter an address for instant intelligence..."
                className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/60 text-base md:text-lg py-3"
              />
            </div>
            <Button 
              type="submit"
              size="lg" 
              className="h-12 px-6 rounded-xl font-semibold shrink-0"
            >
              Analyze
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>

        {/* Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            variant="ghost" 
            size="lg"
            className="h-12 px-6 text-foreground/80 hover:text-foreground hover:bg-white/5"
            onClick={onScrollToTowns}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Explore by town
          </Button>
          <span className="text-muted-foreground/40 hidden sm:block">or</span>
          <Button 
            variant="ghost" 
            size="lg"
            className="h-12 px-6 text-foreground/80 hover:text-foreground hover:bg-white/5"
            asChild
          >
            <Link to="/intel/1999-ridge-road-queensbury-ny">
              View sample report
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-border/30 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-muted-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm">Properties Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm">Towns Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">Local</div>
              <div className="text-sm">Capital District Focus</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
};

export default AppleHero;
