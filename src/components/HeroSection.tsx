
import PropertySearchDialog from "./PropertySearchDialog";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-gradient text-white min-h-screen flex items-center justify-center text-center relative overflow-hidden rounded-bl-[4rem] rounded-br-[4rem]">
      <div className="container mx-auto px-4 py-16 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Your Journey to the Perfect Nest Starts Here.
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
          Connecting renters with quality multi-unit homes and guiding them towards first-time homeownership in Albany, Troy, Schenectady, & Saratoga.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <PropertySearchDialog>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105">
              Find Your Nest
            </button>
          </PropertySearchDialog>
          <button
            onClick={() => scrollToSection('owners')}
            className="bg-transparent border-2 border-white text-white hover:bg-blue-50 hover:text-blue-500 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            List Your Property
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
