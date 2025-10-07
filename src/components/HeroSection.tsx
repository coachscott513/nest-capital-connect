import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background" role="banner">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-16 lg:py-0">
          
          {/* Left Side - Content */}
          <div className="space-y-8 lg:space-y-10">
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

          {/* Right Side - Image with Stats */}
          <div className="relative">
            <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png"
                alt="Capital District Real Estate Investment Professional"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Stats Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center space-y-1">
                    <div className="text-2xl sm:text-3xl font-bold text-primary">$50M+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">Sales Volume</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-2xl sm:text-3xl font-bold text-primary">200+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">Properties</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-2xl sm:text-3xl font-bold text-primary">20+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">Years Exp.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
