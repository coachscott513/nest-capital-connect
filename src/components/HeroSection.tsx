
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import AddressInputDialog from "./AddressInputDialog";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoogleEarthSearch = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const googleEarthUrl = `https://earth.google.com/web/search/${encodedAddress}`;
    window.open(googleEarthUrl, '_blank');
  };

  return (
    <section className="hero-gradient text-white min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden rounded-bl-[4rem] rounded-br-[4rem]" role="banner">
      <div className="container mx-auto px-4 py-8 md:py-16 animate-fade-in">
        <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight mb-6 md:mb-8">
          Capital District Nest
        </h1>
        
        <p className="text-lg md:text-2xl mb-6 md:mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
          Connecting Renters, Landlords and Investors in the Albany, Troy, Schenectady and Saratoga
        </p>
        
        {/* Property Search Iframe - New compact version */}
        <div className="mb-6 md:mb-8 w-full max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex justify-center">
            <iframe 
              src="https://scottalvarez.remax.com/embedsmall.php"
              width="280"
              height="680"
              frameBorder="0"
              allowTransparency={true}
              className="rounded border-0"
              title="Property Search Tool"
              loading="lazy"
            />
          </div>
        </div>

        {/* Google Earth Link - Mobile optimized with drawer */}
        <div className="mb-6 md:mb-8">
          <AddressInputDialog onAddressSubmit={handleGoogleEarthSearch} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
