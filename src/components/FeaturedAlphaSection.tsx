import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight, Sparkles } from "lucide-react";

interface FeaturedAlphaSectionProps {
  townName: string;
  townSlug: string;
  featuredAddress?: string;
  featuredPrice?: string;
  featuredYield?: string;
  featuredType?: string;
}

const FeaturedAlphaSection = ({
  townName,
  townSlug,
  featuredAddress,
  featuredPrice,
  featuredYield,
  featuredType = "Multi-Family"
}: FeaturedAlphaSectionProps) => {
  // If no specific property, show generic CTA
  if (!featuredAddress) {
    return (
      <section className="section-massive px-[5%] bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="bento-card p-8 md:p-12 text-center relative overflow-hidden">
            {/* Teal glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Featured Alpha</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extralight text-foreground mb-4 tracking-tight">
                Get {townName} Investment Opportunities
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Be the first to know about verified high-yield properties in {townName}. 
                Our team analyzes every listing before it hits the general market.
              </p>
              
              <Link
                to="/dealdesk"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform glow-primary"
              >
                <TrendingUp className="w-5 h-5" />
                Request {townName} Intel
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-massive px-[5%] bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="bento-card p-8 md:p-12 relative overflow-hidden">
          {/* Teal glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Featured Alpha</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-light text-foreground mb-2">
                  {featuredAddress}
                </h3>
                
                <p className="text-muted-foreground">
                  {featuredType} in {townName}
                </p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary text-glow">{featuredYield}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Target Yield</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground">{featuredPrice}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">List Price</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/dealdesk"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform glow-primary"
              >
                Request Full Analysis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={`/towns/${townSlug}`}
                className="inline-flex items-center justify-center gap-2 glass border border-primary/30 text-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/20 transition-colors"
              >
                View All {townName} Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAlphaSection;
