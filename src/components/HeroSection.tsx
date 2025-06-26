
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoogleEarthSearch = () => {
    const address = prompt("Enter an address to view on Google Earth:");
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      const googleEarthUrl = `https://earth.google.com/web/search/${encodedAddress}`;
      window.open(googleEarthUrl, '_blank');
    }
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
        
        {/* Property Search Iframe - Simplified and working */}
        <div className="mb-6 md:mb-8 w-full max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
            <iframe 
              src="https://scottalvarez.remax.com/wide.php" 
              width="100%"
              height="350"
              frameBorder="0"
              scrolling="yes"
              allowTransparency={true}
              className="w-full h-[350px] md:h-[400px] rounded border-0"
              title="Property Search Tool"
              loading="lazy"
            />
          </div>
        </div>

        {/* Google Earth Link - Mobile optimized */}
        <div className="mb-6 md:mb-8">
          <Button
            onClick={handleGoogleEarthSearch}
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-4 md:px-8 py-3 md:py-4 text-base md:text-lg w-full max-w-sm md:min-w-[300px] md:w-auto"
          >
            <MapPin className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" />
            View Address on Google Earth
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
