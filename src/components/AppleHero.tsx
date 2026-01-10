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
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#F5F5F7]">
      {/* Cinematic Video Background with Overlay */}
      <div className="absolute inset-0">
        {/* Video Background - Capital District aerial */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-small-town-in-nature-41460-large.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Soft gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />
        
        {/* Subtle animated gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-strong rounded-full px-5 py-2.5 mb-10 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground tracking-wide">Capital District Real Estate Intelligence</span>
        </div>

        {/* Headline - Apple SF Pro style */}
        <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.08] tracking-tight mb-6 animate-fade-in text-[#1D1D1F]" style={{ animationDelay: '0.1s' }}>
          Find clarity in<br />
          <span className="text-gradient-premium">every property decision</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-[#6E6E73] leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-in font-medium" style={{ animationDelay: '0.2s' }}>
          Clear data. Local context. Town-by-town intelligence<br className="hidden md:block" />
          built for buyers who demand precision.
        </p>

        {/* Glassmorphism Search Bar - 40px blur */}
        <form 
          onSubmit={handleSearch}
          className="glass-strong rounded-2xl p-2 max-w-2xl mx-auto mb-10 animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-5">
              <Search className="w-5 h-5 text-[#6E6E73] flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter a town, zip, or address..."
                className="w-full bg-transparent border-none outline-none text-[#1D1D1F] placeholder:text-[#6E6E73]/60 text-base md:text-lg py-4 font-medium"
              />
            </div>
            <Button 
              type="submit"
              size="lg" 
              className="h-14 px-8 rounded-xl font-semibold shrink-0"
            >
              Analyze
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>

        {/* Quick Links - Ghost Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link 
            to="/investor-tools"
            className="px-6 py-3 rounded-full border border-[#1D1D1F]/20 text-[#1D1D1F] font-semibold hover:bg-[#1D1D1F] hover:text-white transition-all duration-300"
          >
            Invest
          </Link>
          <button 
            onClick={onScrollToTowns}
            className="px-6 py-3 rounded-full border border-[#1D1D1F]/20 text-[#1D1D1F] font-semibold hover:bg-[#1D1D1F] hover:text-white transition-all duration-300"
          >
            Relocate
          </button>
          <Link 
            to="/intel/1999-ridge-road-queensbury-ny"
            className="px-6 py-3 rounded-full border border-[#1D1D1F]/20 text-[#1D1D1F] font-semibold hover:bg-[#1D1D1F] hover:text-white transition-all duration-300"
          >
            View Reports
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll">
        <div className="w-7 h-12 rounded-full border-2 border-[#1D1D1F]/20 flex items-start justify-center p-2">
          <div className="w-1.5 h-2.5 rounded-full bg-[#1D1D1F]/40" />
        </div>
      </div>
    </section>
  );
};

export default AppleHero;
