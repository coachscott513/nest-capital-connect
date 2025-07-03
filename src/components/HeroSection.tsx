
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
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

        {/* Contact Information & RE/MAX Solutions Logo */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-4xl mx-auto border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* RE/MAX Solutions Logo */}
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg p-3">
                <img 
                  src="/remax-solutions-logo.png" 
                  alt="RE/MAX Solutions Logo" 
                  className="h-12 md:h-16 w-auto"
                  onError={(e) => {
                    // Fallback if logo doesn't exist
                    const img = e.currentTarget as HTMLImageElement;
                    const fallback = img.nextElementSibling as HTMLElement;
                    img.style.display = 'none';
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div className="hidden bg-red-600 text-white px-4 py-2 rounded font-bold text-lg">
                  RE/MAX Solutions
                </div>
              </div>
              <div className="text-white">
                <p className="text-sm opacity-90">Powered by</p>
                <p className="font-semibold">RE/MAX Solutions</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="text-center md:text-right">
              <p className="text-white text-sm opacity-90 mb-1">Call Now for Expert Investment Advice</p>
              <a 
                href="tel:+15181234567" 
                className="text-white text-3xl md:text-4xl font-bold hover:text-blue-200 transition-colors duration-200 flex items-center justify-center md:justify-end"
              >
                📞 (518) 123-4567
              </a>
              <p className="text-white text-sm opacity-90 mt-1">Available 7 Days a Week</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
