
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background" role="banner">
      {/* Split Screen Layout - Ryan Serhant Style */}
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
        
        {/* Left Side - Bold Typography */}
        <div className="space-y-8 animate-fade-in">
          {/* Large Bold Name - Serhant Style */}
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight">
              <span className="text-foreground">CAPITAL</span>
              <br />
              <span className="text-foreground">DISTRICT</span>
              <br />
              <span className="text-primary">NEST.</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
            Premier real estate investment specialist and RE/MAX broker serving Albany, Troy, Schenectady, and Saratoga Springs. Expert in multi-unit properties, rehab opportunities, and rental investments.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 rounded-full"
            >
              <Link to="/investment-landing">
                View Investment Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-semibold text-lg px-8 py-6 rounded-full"
            >
              <a href="tel:+15185227265">
                (518) 522-7265
              </a>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 pt-4">
            <p className="text-sm text-muted-foreground">Available 7 Days a Week</p>
            <a 
              href="mailto:scottalvarez@remax.net" 
              className="text-base text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              scottalvarez@remax.net
            </a>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png"
            alt="Capital District Real Estate Investment"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Floating Stats Card */}
          <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">$50M+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Sales</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">200+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Properties</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">20+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-muted-foreground rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
