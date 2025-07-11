import React from 'react';
import { Building, MapPin, Home, TrendingUp, Users, DollarSign } from 'lucide-react';

const InvestmentPropertiesSection = () => {
  const areaButtons = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Albany",
      description: "Investment Properties",
      href: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=3&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map&leadid=948",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Troy",
      description: "Investment Properties", 
      href: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=3&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map&leadid=948",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Schenectady",
      description: "Investment Properties",
      href: "https://scottalvarez.remax.com/index.php?advanced=1&display=Schenectady&min=0&max=100000000&beds=0&baths=0&types%5B%5D=3&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre7dfb1&sortby=listings.price+ASC&rtype=map",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Saratoga",
      description: "Investment Properties",
      href: "https://scottalvarez.remax.com/index.php?advanced=1&display=Saratoga&min=0&max=100000000&beds=0&baths=0&types%5B%5D=3&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dremppmy&sortby=listings.price+ASC&rtype=map",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Under 100k",
      description: "Properties",
      href: "https://scottalvarez.remax.com/index.php?advanced=1&display=&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000&rtype=map#rslt",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Financing",
      description: "Options",
      href: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=3&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map&leadid=948",
      gradient: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section id="investment-properties" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Investment & Rental Properties
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Discover profitable real estate opportunities across the Capital District. From <a href="/investment-properties" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">multi-unit properties</a> 
            to <a href="/rehab-properties" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">fix & flip investments</a>, we connect you with the best deals in <a href="/albany-rentals" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Albany</a>, <a href="/troy-rentals" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Troy</a>, <a href="/schenectady-rentals" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Schenectady</a>, and <a href="/saratoga-rentals" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Saratoga</a>. Need <a href="/financing" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">financing solutions</a>? We've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {areaButtons.map((area, index) => (
            <a
              key={index}
              href={area.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${area.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {area.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                  {area.title}
                </h3>
                <p className="text-slate-300 group-hover:text-slate-200 transition-colors">
                  {area.description}
                </p>
                <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${area.gradient} w-0 group-hover:w-full transition-all duration-500 ease-out`}></div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Ready to Build Your Portfolio?
            </h3>
            <p className="text-slate-300 mb-8 max-w-3xl mx-auto text-lg">
              Get personalized investment analysis and discover properties that match your investment strategy. 
              Our local expertise helps you make informed decisions in the Capital District market.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Get Investment Analysis
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPropertiesSection;