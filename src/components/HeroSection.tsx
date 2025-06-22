
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
        
        {/* Property Search Iframe */}
        <div className="mb-8 flex justify-center">
          <iframe 
            style={{width: "960px", height: "300px"}} 
            src="https://scottalvarez.remax.com/wide.php" 
            allowTransparency={true} 
            frameBorder="0"
            className="max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
