
const NeighborhoodsSection = () => {
  const neighborhoods = [
    {
      name: "Albany, NY",
      description: "The vibrant heart of the Capital Region.",
      link: "Explore Albany Rentals",
      url: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&pak=county%3Ag40_dre6kenh&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt"
    },
    {
      name: "Troy, NY", 
      description: "Historic architecture meets modern revitalization.",
      link: "Discover Troy Rentals",
      url: "https://scottalvarez.remax.com/index.php?advanced=1&display=Troy&min=0&max=100000000&beds=0&baths=0&types%5B%5D=6&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=city%3Ag30_dree57z2&sortby=listings.price+DESC&rtype=map"
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
    <section id="neighborhoods" className="py-16 px-4 bg-white text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-slate-800">
          Explore Capital District Neighborhoods
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          From the historic charm of Albany to the vibrant arts scene of Troy, the revitalized energy of Schenectady, and the elegant allure of Saratoga Springs, we've got you covered.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {neighborhoods.map((neighborhood, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-semibold mb-2 text-slate-800">
                {neighborhood.name}
              </h3>
              <p className="text-slate-600 mb-4">
                {neighborhood.description}
              </p>
              {neighborhood.url ? (
                <a 
                  href={neighborhood.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
                >
                  {neighborhood.link}
                </a>
              ) : (
                <button className="text-blue-500 hover:text-blue-600 hover:underline transition-colors">
                  {neighborhood.link}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodsSection;
