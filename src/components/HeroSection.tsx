import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import LeadCaptureForm from "./LeadCaptureForm";

const HeroSection = () => {
  return (
    <section className="relative bg-background" role="banner">
      {/* Simple Hero */}
      <div className="relative h-[60vh] lg:h-[75vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png"
            alt="Capital District Real Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-4 tracking-tight">
            CAPITAL DISTRICT<br />
            <span className="text-primary">NEST</span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-white font-light">
            Your Premier Investment Property Partner
          </p>
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
