import React from 'react';
import { Building, TrendingUp, Wrench, DollarSign } from 'lucide-react';

const InvestmentPropertiesSection = () => {
  const investmentTypes = [
    {
      icon: <Building className="w-12 h-12 text-blue-500" />,
      title: "Multi-Unit Properties",
      description: "Duplex, triplex, and apartment buildings for rental income generation.",
      features: ["Immediate cash flow", "Multiple revenue streams", "Tax advantages", "Appreciation potential"]
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-500" />,
      title: "Buy & Hold Investments",
      description: "Long-term rental properties for steady passive income.",
      features: ["Stable monthly income", "Property appreciation", "Mortgage paydown", "Portfolio diversification"]
    },
    {
      icon: <Wrench className="w-12 h-12 text-orange-500" />,
      title: "Fix & Flip Properties",
      description: "Distressed properties for renovation and resale profit.",
      features: ["Quick profit potential", "Market value creation", "Active investment strategy", "High ROI opportunities"]
    },
    {
      icon: <DollarSign className="w-12 h-12 text-purple-500" />,
      title: "BRRRR Strategy",
      description: "Buy, Rehab, Rent, Refinance, Repeat for wealth building.",
      features: ["Infinite returns", "Scale your portfolio", "Tax-efficient growth", "Cash recycling"]
    }
  ];

  return (
    <section id="investment-properties" className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-slate-800">
            Investment & Rental Properties
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Build wealth through strategic real estate investments. We specialize in identifying profitable 
            opportunities in multi-unit properties, fix & flips, and buy & hold investments across the Capital District.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {investmentTypes.map((type, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                {type.icon}
                <h3 className="text-2xl font-semibold ml-4 text-slate-800">
                  {type.title}
                </h3>
              </div>
              <p className="text-slate-600 mb-6 text-lg">
                {type.description}
              </p>
              <ul className="space-y-3">
                {type.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-4 text-slate-800">
            Ready to Start Your Investment Journey?
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Let's analyze your investment goals and find the perfect properties to build your real estate portfolio. 
            From market analysis to financing options, we'll guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              Get Investment Analysis
            </button>
            <a 
              href="https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=6&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map&leadid=948"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Browse Investment Properties
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPropertiesSection;