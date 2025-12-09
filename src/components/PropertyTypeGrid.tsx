import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Home, TrendingUp, Target, ArrowRight } from 'lucide-react';

const PropertyTypeGrid = () => {
  const strategies = [
    {
      name: 'Multi-Family',
      slug: 'multi-family',
      icon: <Building className="w-7 h-7" />,
      description: 'Cash-flowing rental properties with 6-9% cap rates',
      metric: '7.2% Avg Cap',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      name: 'First-Time Buyer',
      slug: 'first-time-buyer',
      icon: <Home className="w-7 h-7" />,
      description: 'Build equity with low down payment programs',
      metric: '3% Down',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Fix & Flip',
      slug: 'fix-and-flip',
      icon: <TrendingUp className="w-7 h-7" />,
      description: 'Value-add opportunities in historic properties',
      metric: '20%+ ROI',
      color: 'from-amber-500 to-amber-600'
    },
    {
      name: 'Buy & Hold',
      slug: 'buy-and-hold',
      icon: <Target className="w-7 h-7" />,
      description: 'Long-term wealth through appreciation & cash flow',
      metric: '+62% 10yr',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Target className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Investment Strategies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your path to building wealth through real estate
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {strategies.map((strategy) => (
            <Link 
              key={strategy.slug}
              to={`/strategy/${strategy.slug}`}
              className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${strategy.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className="relative p-8 flex items-start gap-6">
                <div className={`flex-shrink-0 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${strategy.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {strategy.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {strategy.name}
                    </h3>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r ${strategy.color} text-white`}>
                      {strategy.metric}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {strategy.description}
                  </p>
                  <div className="flex items-center text-accent font-medium">
                    <span>Learn the Strategy</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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

export default PropertyTypeGrid;