
import { Button } from "@/components/ui/button";
import { Home, Hammer, Building, Calculator, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

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
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-5xl mx-auto border border-white/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
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

            {/* Phone Number & Email */}
            <div className="text-center lg:text-right">
              <p className="text-white text-sm opacity-90 mb-1">Call Now for Expert Investment Advice</p>
              <a 
                href="tel:+15185227265" 
                className="text-white text-3xl md:text-4xl font-bold hover:text-blue-200 transition-colors duration-200 flex items-center justify-center lg:justify-end mb-2"
              >
                📞 (518) 522-7265
              </a>
              <a 
                href="mailto:scottalvarez@remax.net" 
                className="text-white text-lg md:text-xl font-semibold hover:text-blue-200 transition-colors duration-200 flex items-center justify-center lg:justify-end mb-3"
              >
                ✉️ scottalvarez@remax.net
              </a>
              <p className="text-white text-sm opacity-90">Available 7 Days a Week</p>
            </div>
          </div>

          {/* Large Social Media Icons */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-white text-center text-lg font-semibold mb-4">Connect With Us</p>
            <div className="flex justify-center items-center gap-6">
              <a 
                href="https://www.facebook.com/scottalvarez.remax" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Facebook className="w-8 h-8 text-white" />
              </a>
              <a 
                href="https://www.instagram.com/scottalvarez.remax" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Instagram className="w-8 h-8 text-white" />
              </a>
              <a 
                href="https://www.linkedin.com/in/scottalvarez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-800 p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Linkedin className="w-8 h-8 text-white" />
              </a>
              <a 
                href="https://www.youtube.com/@scottalvarez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Youtube className="w-8 h-8 text-white" />
              </a>
              <a 
                href="https://www.tiktok.com/@scottalvarez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                </svg>
              </a>
            </div>
            <p className="text-white text-center text-sm opacity-80 mt-3">Follow for market updates & investment tips</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
