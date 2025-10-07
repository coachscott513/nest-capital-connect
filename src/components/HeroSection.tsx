import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import LeadCaptureForm from "./LeadCaptureForm";

const HeroSection = () => {
  return (
    <section className="relative bg-background" role="banner">
      {/* Hero Image Section */}
      <div className="relative h-[70vh] lg:h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png"
            alt="Capital District Real Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
            YOUR INVESTMENT<br />
            <span className="text-primary">STARTS HERE</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Expert guidance for multi-unit properties and investment opportunities
          </p>

          <Button 
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 rounded-full"
          >
            <Link to="/investment-landing">
              View Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Investment Opportunities Section */}
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            New York Investment Opportunities
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Stats */}
            <div className="bg-muted/30 rounded-3xl p-10">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">$25M+</div>
                  <div className="text-sm text-muted-foreground">Grants Available</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">$100M+</div>
                  <div className="text-sm text-muted-foreground">Funding Available</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">$500K</div>
                  <div className="text-sm text-muted-foreground">Max Grant</div>
                </div>
              </div>
            </div>

            {/* Lead Form */}
            <div>
              <LeadCaptureForm 
                type="investment"
                title="Get Started Today"
                description="Connect with us to explore funding opportunities"
                buttonText="Contact Us"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
