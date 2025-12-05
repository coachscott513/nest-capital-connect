
const TroyRentalsSection = () => {
  return (
    <section id="troy-rentals" className="py-16 px-4 bg-card border-b border-border">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-foreground">
          Troy Rentals - Historic Charm Meets Modern Living
        </h2>
        
        <div className="max-w-4xl mx-auto mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-foreground/90">
            Find Your Perfect Rental in Historic Troy, NY
          </h3>
          
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Discover exceptional rental properties in Troy, where historic architecture meets modern revitalization. 
            From converted loft apartments in Victorian buildings to contemporary family homes, our curated selection of Troy rentals offers 
            unique character with stunning Hudson River views and vibrant arts scene.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
            <div className="bg-background p-6 rounded-lg border border-border">
              <h4 className="text-xl font-semibold mb-3 text-foreground">
                Historic Downtown Troy Apartments
              </h4>
              <p className="text-muted-foreground">
                Live in beautifully preserved historic buildings with modern amenities and riverfront access.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg border border-border">
              <h4 className="text-xl font-semibold mb-3 text-foreground">
                Family Homes & Multi-Unit Properties
              </h4>
              <p className="text-muted-foreground">
                Spacious rental homes in tree-lined neighborhoods near RPI and with easy commuter access.
              </p>
            </div>
          </div>
          
          <div className="bg-background p-8 rounded-xl border border-border">
            <h4 className="text-2xl font-semibold mb-4 text-foreground">
              Browse Available Troy Rental Properties
            </h4>
            <p className="text-muted-foreground mb-6">
              View our current inventory of rental apartments, condos, and houses in Troy and surrounding areas.
            </p>
            
            <a 
              href="https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=6&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map&leadid=948"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              View All Troy Rentals →
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            Serving Troy, Rensselaer County, and the greater Capital District region including Albany, Schenectady, and Saratoga Springs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TroyRentalsSection;
