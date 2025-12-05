
import PropertySearchDialog from "./PropertySearchDialog";

const RentersSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="renters" className="py-16 px-4 bg-card border-b border-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          For Renters: Your Seamless Path Home
        </h2>
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <p className="text-lg mb-6 text-muted-foreground">
              Searching for your next home in the Capital District? Capital District Nest provides an unparalleled experience, connecting you directly with quality multi-unit apartment rentals across Albany, Troy, Schenectady, and Saratoga.
            </p>
            <ul className="space-y-3 mb-8 text-lg text-left max-w-2xl mx-auto">
              <li className="flex items-center text-muted-foreground">
                <svg className="w-6 h-6 mr-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14 9 11"></polyline>
                </svg>
                <span><strong className="text-foreground">Vetted Listings:</strong> We ensure all properties meet high standards.</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <svg className="w-6 h-6 mr-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8l4 4-4 4M8 12h8"></path>
                </svg>
                <span><strong className="text-foreground">Easy Applications:</strong> Streamlined, modern online application and vetting process.</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <svg className="w-6 h-6 mr-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 15C3 15 3 3 12 3C21 3 21 15 21 15M3 15H21M3 15V21C3 21 3 21 6 21C9 21 15 21 18 21C21 21 21 21 21 21V15"></path>
                </svg>
                <span><strong className="text-foreground">Path to Homeownership:</strong> Get exclusive guidance and resources when you're ready to buy your first home.</span>
              </li>
            </ul>
            <PropertySearchDialog>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Start Your Rental Search
              </button>
            </PropertySearchDialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentersSection;
