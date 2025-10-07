import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import LeadCaptureForm from "./LeadCaptureForm";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-background" role="banner">
      {/* Simple Hero */}
      <div className="relative h-[60vh] lg:h-[75vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBackground}
            alt="Free grants for New York real estate investors - Capital District investment properties and funding opportunities"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-4 tracking-tight">
            CAPITAL DISTRICT<br />
            <span className="text-white">NEST</span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-white font-light">
            Your Premier Investment Property Partner
          </p>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">
            Unlock Free Grants & Home Buyer Programs
          </h2>
          
          {/* Email - Large and Prominent */}
          <div className="bg-primary/5 border-2 border-primary rounded-lg p-8 hover:bg-primary/10 transition-colors">
            <p className="text-lg text-muted-foreground mb-2">Email</p>
            <a 
              href="mailto:Scott@capitaldistrictnest.com"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary hover:text-primary/80 transition-colors underline decoration-2"
            >
              Scott@capitaldistrictnest.com
            </a>
          </div>

          {/* Phone Number - Large and Prominent */}
          <div className="bg-primary/5 border-2 border-primary rounded-lg p-8 hover:bg-primary/10 transition-colors">
            <p className="text-lg text-muted-foreground mb-2">Call</p>
            <a 
              href="tel:518-522-7265"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary hover:text-primary/80 transition-colors underline decoration-2"
            >
              518-522-7265
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
