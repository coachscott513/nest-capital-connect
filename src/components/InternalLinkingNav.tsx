import React from 'react';
import { Link } from 'react-router-dom';
import { Building, MapPin, Home, TrendingUp, Users, DollarSign, Wrench, BarChart3 } from 'lucide-react';

const InternalLinkingNav = () => {
  const navigationLinks = [
    {
      title: "Albany Properties",
      description: "Investment opportunities in NY's capital city",
      icon: <Building className="w-6 h-6" />,
      href: "/communities/albany",
      category: "Location"
    },
    {
      title: "Troy Properties", 
      description: "Historic riverfront investment potential",
      icon: <MapPin className="w-6 h-6" />,
      href: "/communities/troy",
      category: "Location"
    },
    {
      title: "Schenectady Properties",
      description: "Affordable market with strong fundamentals", 
      icon: <Home className="w-6 h-6" />,
      href: "/communities/schenectady",
      category: "Location"
    },
    {
      title: "Saratoga Springs Properties",
      description: "Premium market with tourism potential",
      icon: <TrendingUp className="w-6 h-6" />,
      href: "/communities/saratoga", 
      category: "Location"
    },
    {
      title: "Multi-Unit Buildings",
      description: "Duplexes, triplexes, and apartment buildings",
      icon: <Users className="w-6 h-6" />,
      href: "#investment-properties",
      category: "Property Type"
    },
    {
      title: "Fix & Flip Properties",
      description: "Distressed properties with profit potential",
      icon: <Wrench className="w-6 h-6" />,
      href: "#rehab-properties",
      category: "Strategy"
    },
    {
      title: "Buy & Hold Investments",
      description: "Cash-flowing rental properties",
      icon: <DollarSign className="w-6 h-6" />,
      href: "#investment-properties",
      category: "Strategy"
    },
    {
      title: "Market Analysis", 
      description: "Capital District investment data",
      icon: <BarChart3 className="w-6 h-6" />,
      href: "#contact",
      category: "Resources"
    }
  ];

  const categoryColors = {
    "Location": "bg-accent/10 text-accent border-accent/20",
    "Property Type": "bg-emerald/10 text-green-600 border-green-200", 
    "Strategy": "bg-purple-50 text-purple-600 border-purple-200",
    "Resources": "bg-orange-50 text-orange-600 border-orange-200"
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Explore Capital District Investment Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Navigate our comprehensive investment resources organized by location, property type, and investment strategy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationLinks.map((link, index) => {
            const isInternalRoute = link.href.startsWith('/communities/');
            
            if (isInternalRoute) {
              return (
                <Link
                  key={index}
                  to={link.href}
                  className="group block p-6 bg-background rounded-xl shadow-sm border border-border hover:border-accent/20 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center mb-3">
                    <div className="text-accent mr-3 group-hover:scale-110 transition-transform">
                      {link.icon}
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[link.category as keyof typeof categoryColors]}`}>
                      {link.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {link.description}
                  </p>
                </Link>
              );
            }
            
            return (
              <a
                key={index}
                href={link.href}
                className="group block p-6 bg-background rounded-xl shadow-sm border border-border hover:border-accent/20 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-3">
                  <div className="text-accent mr-3 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[link.category as keyof typeof categoryColors]}`}>
                    {link.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {link.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {link.description}
                </p>
              </a>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ready to start your Capital District investment journey?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-accent hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Get Investment Analysis
          </button>
        </div>
      </div>
    </section>
  );
};

export default InternalLinkingNav;