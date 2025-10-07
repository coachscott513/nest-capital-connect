import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-background" role="banner">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        {/* Unified Hero Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight">
                  <span className="block text-foreground">CAPITAL</span>
                  <span className="block text-foreground">DISTRICT</span>
                  <span className="block text-primary">NEST.</span>
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Premier real estate investment specialist serving Albany, Troy, Schenectady, and Saratoga Springs. Expert in multi-unit properties, rehab opportunities, and rental investments.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full transition-all"
                >
                  <Link to="/investment-landing">
                    View Properties
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full"
                >
                  <a href="tel:+15185227265" className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    (518) 522-7265
                  </a>
                </Button>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <p className="text-sm text-muted-foreground">Available 7 Days a Week</p>
                <a 
                  href="mailto:scottalvarez@remax.net" 
                  className="inline-flex items-center text-base text-foreground hover:text-primary transition-colors font-medium group"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  scottalvarez@remax.net
                </a>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative">
              <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png"
                  alt="Capital District Real Estate Investment Professional"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* NY Investment Funding Stats */}
          <div className="bg-muted/30 rounded-3xl p-8 lg:p-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">New York Real Estate Investment Opportunities</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <div className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary">$25M+</div>
                <div className="text-sm lg:text-base text-muted-foreground font-medium">Grants Available</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary">$100M+</div>
                <div className="text-sm lg:text-base text-muted-foreground font-medium">Funding Available</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary">15+</div>
                <div className="text-sm lg:text-base text-muted-foreground font-medium">Incentive Programs</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary">$500K</div>
                <div className="text-sm lg:text-base text-muted-foreground font-medium">Max Grant Amount</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
