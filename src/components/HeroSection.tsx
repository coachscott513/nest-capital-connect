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
            alt="Capital District Real Estate"
            className="w-full h-full object-cover"
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

      {/* Investment Opportunities Section */}
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Unlock Free Grants & Home Buyer Programs
          </h2>
          
          <LeadCaptureForm 
            type="investment"
            title="Get Started Today"
            description="Connect with us to explore funding opportunities and investment properties"
            buttonText="Contact Us"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
