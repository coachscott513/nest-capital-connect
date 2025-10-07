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

      {/* Calendly Booking Section */}
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
            Book a Free Consultation
          </h2>
          
          {/* Calendly Inline Widget */}
          <div className="bg-background border-2 border-primary/20 rounded-lg overflow-hidden">
            <iframe
              src="https://calendly.com/alvarez-team/new-meeting?embed_domain=localhost&embed_type=Inline"
              width="100%"
              height="700"
              frameBorder="0"
              title="Schedule a consultation"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
