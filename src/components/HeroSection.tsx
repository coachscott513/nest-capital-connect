
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
      <div className="absolute top-36 md:top-20 left-0 right-0">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Capital District Nest
        </h1>
      </div>
      
      <div className="container mx-auto px-4 py-16 animate-fade-in">
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
          Connecting Renters, Landlords and Investors in the Albany, Troy, Schenectady and Saratoga
        </p>
        
        {/* Property Search Iframe - Fixed for mobile */}
        <div className="mb-4 flex justify-center">
          <iframe 
            style={{width: "100%", maxWidth: "960px", height: "300px"}} 
            src="https://scottalvarez.remax.com/wide.php" 
            allowTransparency={true} 
            frameBorder="0"
            className="w-full max-w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Google Earth Link */}
        <div className="mb-8">
          <Button
            onClick={handleGoogleEarthSearch}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
          >
            <MapPin className="mr-2 h-4 w-4" />
            View Address on Google Earth
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
