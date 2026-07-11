import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MasterGatekeeperModal from './MasterGatekeeperModal';

const NeighborhoodsSection = () => {
  const [gatekeeperOpen, setGatekeeperOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  const handleGatedClick = (url: string) => {
    setPendingUrl(url);
    setGatekeeperOpen(true);
  };

  const neighborhoods = [
    {
      name: "Albany, NY",
      description: "The vibrant heart of the Capital Region.",
      link: "Explore Albany Rentals",
      url: "/homes/search"
    },
    {
      name: "Troy, NY", 
      description: "Historic architecture meets modern revitalization.",
      link: "Discover Troy Rentals",
      url: "/homes/search"
    },
    {
      name: "Schenectady, NY",
      description: "A city on the rise with diverse communities.",
      link: "Find Schenectady Rentals",
      url: "/homes/search"
    },
    {
      name: "Saratoga Springs, NY",
      description: "Elegance, culture, and thriving downtown life.",
      link: "View Saratoga Rentals",
      url: "/homes/search"
    }
  ];

  return (
    <>
      <section id="neighborhoods" className="py-16 px-4 bg-background text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-foreground">
            Explore Capital District Neighborhoods
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            From the historic charm of <Link to="/living-in/albany" className="text-accent hover:text-blue-800 hover:underline transition-colors">Albany</Link> to the vibrant arts scene of <Link to="/living-in/troy" className="text-accent hover:text-blue-800 hover:underline transition-colors">Troy</Link>, the revitalized energy of <Link to="/living-in/schenectady" className="text-accent hover:text-blue-800 hover:underline transition-colors">Schenectady</Link>, and the elegant allure of <Link to="/living-in/saratoga-springs" className="text-accent hover:text-blue-800 hover:underline transition-colors">Saratoga Springs</Link>, we provide both <Link to="/rentals" className="text-accent hover:text-blue-800 hover:underline transition-colors">rental opportunities</Link> and <Link to="/#investment-properties" className="text-accent hover:text-blue-800 hover:underline transition-colors">investment properties</Link> across the Capital District.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {neighborhoods.map((neighborhood, index) => (
              <div key={index} className="bg-background p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {neighborhood.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {neighborhood.description}
                </p>
                {neighborhood.url ? (
                  <button 
                    onClick={() => handleGatedClick(neighborhood.url)}
                    className="text-accent hover:text-accent hover:underline transition-colors"
                  >
                    {neighborhood.link}
                  </button>
                ) : (
                  <button className="text-accent hover:text-accent hover:underline transition-colors">
                    {neighborhood.link}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nest Passport Gatekeeper - No anonymous exits */}
      <MasterGatekeeperModal 
        isOpen={gatekeeperOpen} 
        onClose={() => {
          setGatekeeperOpen(false);
          setPendingUrl(null);
        }}
        redirectUrl={pendingUrl || undefined}
      />
    </>
  );
};

export default NeighborhoodsSection;
