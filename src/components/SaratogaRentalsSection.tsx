
const SaratogaRentalsSection = () => {
  return (
    <section id="saratoga-rentals" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-slate-800">
          Saratoga Springs Rentals - Premium Apartments & Homes
        </h2>
        
        <div className="max-w-4xl mx-auto mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-slate-700">
            Find Your Perfect Rental in Historic Saratoga Springs, NY
          </h3>
          
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            Discover exceptional rental properties in Saratoga Springs, New York's premier destination for elegant living. 
            From historic downtown apartments to modern family homes, our curated selection of Saratoga rentals offers 
            something for every lifestyle and budget.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-3 text-slate-800">
                Downtown Saratoga Apartments
              </h4>
              <p className="text-slate-600">
                Walk to restaurants, shops, and the famous Saratoga Race Course from our downtown rental properties.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-3 text-slate-800">
                Family Homes & Multi-Unit Properties
              </h4>
              <p className="text-slate-600">
                Spacious rental homes perfect for families, with easy access to excellent schools and parks.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h4 className="text-2xl font-semibold mb-4 text-slate-800">
              Browse Available Saratoga Springs Rental Properties
            </h4>
            <p className="text-slate-600 mb-6">
              View our current inventory of rental apartments, condos, and houses in Saratoga Springs and surrounding areas.
            </p>
            
            <a 
              href="https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=6&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map&leadid=948"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              View All Saratoga Springs Rentals →
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-slate-500">
          <p>
            Serving Saratoga Springs, Saratoga County, and the greater Capital District region including Albany, Troy, and Schenectady.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SaratogaRentalsSection;
