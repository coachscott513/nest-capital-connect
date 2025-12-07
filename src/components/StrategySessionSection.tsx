import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const StrategySessionSection = () => {
  const handleBookCall = () => {
    // Opens Calendly in a new tab - replace with actual Calendly link
    window.open("https://calendly.com/capitaldistrictnest/strategy-call", "_blank");
  };

  return (
    <section className="py-20 px-4 bg-secondary/30 border-t border-border">
      <div className="container mx-auto max-w-3xl text-center">
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Calendar className="w-4 h-4" />
            Free Consultation
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Strategy Session
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Serious about investing? Let's run the numbers together.
          </p>
        </div>

        {/* Booking Widget Placeholder */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="flex flex-col items-center gap-6">
            {/* Calendar Icon */}
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Calendar className="w-10 h-10 text-primary" />
            </div>
            
            {/* Description */}
            <div className="max-w-md">
              <h3 className="text-xl font-bold text-foreground mb-2">
                15-Minute Strategy Call
              </h3>
              <p className="text-muted-foreground">
                Get personalized investment advice, cash flow analysis, and market insights 
                from our team of real estate strategists.
              </p>
            </div>

            {/* What You'll Get */}
            <ul className="text-left text-sm text-muted-foreground space-y-2 max-w-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> ROI projections for your target market
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Financing options tailored to your situation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Current off-market opportunities
              </li>
            </ul>

            {/* CTA Button */}
            <Button 
              size="lg" 
              className="px-10 py-6 text-lg"
              onClick={handleBookCall}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book a 15-Min Strategy Call
            </Button>

            <p className="text-xs text-muted-foreground">
              No obligation. No pressure. Just real answers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategySessionSection;
