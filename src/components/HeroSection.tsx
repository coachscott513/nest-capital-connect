
import { Button } from "@/components/ui/button";
import { Home, Hammer, Building, Calculator } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: <Building className="w-8 h-8" />,
      title: "Investment Properties",
      description: "Multi-unit buildings and high-yield rental properties",
      sectionId: "investment-properties"
    },
    {
      icon: <Hammer className="w-8 h-8" />,
      title: "Rehab Projects",
      description: "Fix & flip opportunities with our proven loan program",
      sectionId: "rehab-properties"
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Rental Properties",
      description: "Premium rental listings across the Capital District",
      sectionId: "neighborhoods"
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Financing Solutions",
      description: "Expert guidance on investment property financing",
      sectionId: "financing"
    }
  ];

  return (
    <section className="hero-gradient text-white min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden rounded-bl-[4rem] rounded-br-[4rem]" role="banner">
      <div className="container mx-auto px-4 py-8 md:py-16 animate-fade-in">
        <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight mb-6 md:mb-8">
          Capital District Nest
        </h1>
        
        <p className="text-lg md:text-2xl mb-8 md:mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
          Your trusted partner for investment properties, rehab projects, and rental solutions in Albany, Troy, Schenectady, and Saratoga Springs
        </p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 md:mb-12 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => scrollToSection(service.sectionId)}
            >
              <div className="flex justify-center mb-4 text-white">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {service.title}
              </h3>
              <p className="text-sm opacity-90 text-white">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => scrollToSection('investment-properties')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
          >
            Explore Investments
          </Button>
          <Button 
            onClick={() => scrollToSection('contact')}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 text-lg"
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
