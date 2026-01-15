import { Sparkles } from "lucide-react";
import SearchCommandCenter from "@/components/SearchCommandCenter";

interface AppleHeroProps {
  onScrollToTowns?: () => void;
}

const AppleHero = ({ onScrollToTowns }: AppleHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Deep Space Cinematic Background with Liquid Glass Blur */}
      <div className="absolute inset-0">
        {/* High-Fidelity Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          poster="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-small-town-in-nature-41460-large.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* LIQUID GLASS BLUR OVERLAY - 40px blur for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
          }}
        />
        
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        
        {/* Teal glow orbs - Enhanced for glass effect */}
        <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[200px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[180px]" />
      </div>

      {/* Content - Maximum White Space */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8 text-center py-32 md:py-40">
        {/* Floating Glass Badge */}
        <div className="inline-flex items-center gap-2 glass-strong rounded-full px-6 py-3 mb-12 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground tracking-wide">Capital District Real Estate Intelligence</span>
        </div>

        {/* Headline - Extra Light 84px */}
        <h1 className="headline-hero text-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Find clarity in<br />
          <span className="text-gradient-premium text-glow">every property decision</span>
        </h1>

        {/* Subheadline - Silver color */}
        <p className="text-xl md:text-2xl text-muted-foreground body-airy mb-12 max-w-2xl mx-auto animate-fade-in font-light" style={{ animationDelay: '0.15s' }}>
          Clear data. Local context. Town-by-town intelligence built for buyers who demand precision.
        </p>

        {/* Search Command Center */}
        <SearchCommandCenter />
      </div>

      {/* Premium Breathing Line Indicator - Teal Glow */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 z-20">
        {/* Breathing Vertical Line with Glow */}
        <div className="h-16 w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent animate-breathe rounded-full shadow-[0_0_8px_hsl(185_100%_50%_/_0.5)]" />
        
        {/* Property Insights Text - Premium Typography */}
        <span className="text-[10px] font-light text-muted-foreground tracking-[0.35em] uppercase">
          Explore Markets
        </span>
      </div>
    </section>
  );
};

export default AppleHero;
