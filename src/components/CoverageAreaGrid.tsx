import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, Building, Home } from 'lucide-react';

const CoverageAreaGrid = () => {
  const markets = [
    {
      name: 'Troy',
      slug: 'troy',
      icon: <Building className="w-6 h-6" />,
      stats: { price: '$245K', change: '+8.2%' },
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      name: 'Albany',
      slug: 'albany',
      icon: <MapPin className="w-6 h-6" />,
      stats: { price: '$275K', change: '+6.5%' },
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Schenectady',
      slug: 'schenectady',
      icon: <Home className="w-6 h-6" />,
      stats: { price: '$195K', change: '+9.1%' },
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Saratoga Springs',
      slug: 'saratoga-springs',
      icon: <TrendingUp className="w-6 h-6" />,
      stats: { price: '$485K', change: '+5.8%' },
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <section className="py-20 px-4 bg-primary">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {markets.map((market) => (
            <Link 
              key={market.slug}
              to={`/market/${market.slug}`}
              className="group relative overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${market.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative p-6 text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${market.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {market.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {market.name}
                </h3>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span className="text-muted-foreground">{market.stats.price}</span>
                  <span className="text-accent font-medium">{market.stats.change}</span>
                </div>
                <div className="mt-4 w-full h-1 bg-border rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${market.color} w-0 group-hover:w-full transition-all duration-500 ease-out`} />
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