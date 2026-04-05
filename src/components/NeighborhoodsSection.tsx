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
      url: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=6&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map&leadid=948"
    },
    {
      name: "Troy, NY", 
      description: "Historic architecture meets modern revitalization.",
      link: "Discover Troy Rentals",
      url: "https://scottalvarez.remax.com/index.php?advanced=1&display=Troy&min=0&max=100000000&beds=0&baths=0&types%5B%5D=6&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=city%3Ag30_dree57z2&sortby=listings.price+ASC&rtype=map&leadid=948"
    },
    {
      name: "Schenectady, NY",
      description: "A city on the rise with diverse communities.",
      link: "Find Schenectady Rentals",
      url: "https://scottalvarez.remax.com/index.php?advanced=1&display=Schenectady&min=0&max=100000000&beds=0&baths=0&types%5B%5D=6&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre7dfb1&sortby=listings.price+ASC&rtype=map&leadid=948"
    },
    {
      name: "Saratoga Springs, NY",
      description: "Elegance, culture, and thriving downtown life.",
      link: "View Saratoga Rentals",
      url: "https://scottalvarez.remax.com/index.php?advanced=1&display=Saratoga&min=0&max=100000000&beds=0&baths=0&types%5B%5D=6&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dremppmy&sortby=listings.price+ASC&rtype=grid&leadid=948"
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
            From the historic charm of <Link to="/towns/albany" className="text-accent hover:text-blue-800 hover:underline transition-colors">Albany</Link> to the vibrant arts scene of <Link to="/towns/troy" className="text-accent hover:text-blue-800 hover:underline transition-colors">Troy</Link>, the revitalized energy of <Link to="/towns/schenectady" className="text-accent hover:text-blue-800 hover:underline transition-colors">Schenectady</Link>, and the elegant allure of <Link to="/towns/saratoga-springs" className="text-accent hover:text-blue-800 hover:underline transition-colors">Saratoga Springs</Link>, we provide both <Link to="/rentals" className="text-accent hover:text-blue-800 hover:underline transition-colors">rental opportunities</Link> and <Link to="/#investment-properties" className="text-accent hover:text-blue-800 hover:underline transition-colors">investment properties</Link> across the Capital District.
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
