import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, Building, Home, ArrowRight } from 'lucide-react';

const CoverageAreaGrid = () => {
  const markets = [
    {
      name: 'Troy',
      slug: 'troy',
      icon: <Building className="w-7 h-7" />,
      description: 'Victorian architecture and waterfront living along the Hudson River',
      metric: '+8.2% YoY',
      price: '$245K',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      name: 'Albany',
      slug: 'albany',
      icon: <MapPin className="w-7 h-7" />,
      description: 'Diverse neighborhoods with strong government employment base',
      metric: '+6.5% YoY',
      price: '$275K',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Schenectady',
      slug: 'schenectady',
      icon: <Home className="w-7 h-7" />,
      description: 'Most affordable entry point with rapid appreciation potential',
      metric: '+9.1% YoY',
      price: '$195K',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Saratoga Springs',
      slug: 'saratoga-springs',
      icon: <TrendingUp className="w-7 h-7" />,
      description: 'Luxury market with world-class amenities and tourism',
      metric: '+5.8% YoY',
      price: '$485K',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <section className="py-20 px-4 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Coverage Area
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore real estate markets across the Capital District
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {markets.map((market) => (
            <Link 
              key={market.slug}
              to={`/market/${market.slug}`}
              className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${market.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className="relative p-8 flex items-start gap-6">
                <div className={`flex-shrink-0 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${market.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {market.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {market.name}
                    </h3>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r ${market.color} text-white`}>
                      {market.metric}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {market.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-accent font-medium">
                      <span>View Market Data</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-muted-foreground text-sm">Median: {market.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoverageAreaGrid;