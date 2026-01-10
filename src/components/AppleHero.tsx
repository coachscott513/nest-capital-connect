import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppleHeroProps {
  onScrollToTowns?: () => void;
}

const AppleHero = ({ onScrollToTowns }: AppleHeroProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/dealdesk?address=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Deep Space Cinematic Background */}
      <div className="absolute inset-0">
        {/* High-Fidelity Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          poster="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-small-town-in-nature-41460-large.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        
        {/* Teal glow orbs */}
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      {/* Content - Maximum White Space */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8 text-center py-40">
        {/* Floating Glass Badge */}
        <div className="inline-flex items-center gap-2 glass-strong rounded-full px-6 py-3 mb-16 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground tracking-wide">Capital District Real Estate Intelligence</span>
        </div>

        {/* Headline - Extra Light 84px */}
        <h1 className="headline-hero text-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Find clarity in<br />
          <span className="text-gradient-premium text-glow">every property decision</span>
        </h1>

        {/* Subheadline - Silver color */}
        <p className="text-xl md:text-2xl text-muted-foreground body-airy mb-16 max-w-2xl mx-auto animate-fade-in font-light" style={{ animationDelay: '0.2s' }}>
          Clear data. Local context. Town-by-town intelligence built for buyers who demand precision.
        </p>

        {/* Liquid Glass Search Bar */}
        <form 
          onSubmit={handleSearch}
          className="glass-strong rounded-2xl p-2.5 max-w-2xl mx-auto mb-16 animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-4 px-6">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter address for yield analysis..."
                className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/60 text-lg py-4 font-light tracking-wide"
              />
            </div>
            <Button 
              type="submit"
              size="lg" 
              className="h-14 px-8 rounded-xl font-semibold shrink-0 glow-primary"
            >
              Analyze
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>

        {/* Ghost Glass Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link 
            to="/investor-tools"
            className="px-8 py-4 rounded-full glass font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Invest
          </Link>
          <button 
            onClick={onScrollToTowns}
            className="px-8 py-4 rounded-full glass font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Relocate
          </button>
          <Link 
            to="/intel/1999-ridge-road-queensbury-ny"
            className="px-8 py-4 rounded-full glass font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View Reports
          </Link>
        </div>
      </div>

      {/* Scroll indicator - frosted */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-scroll">
        <div className="w-8 h-14 rounded-full glass flex items-start justify-center p-2.5">
          <div className="w-1.5 h-3 rounded-full bg-primary/60" />
        </div>
      </div>
    </section>
  );
};

export default AppleHero;
