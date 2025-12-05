import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import SEOHead from '@/components/SEOHead';
import { getTownsByPriority } from '@/components/CapitalDistrictTowns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, TrendingUp, Layers, MapPin, ChevronRight } from 'lucide-react';

const Markets = () => {
  // Get all towns sorted by priority
  const highPriorityTowns = getTownsByPriority('high');
  const mediumPriorityTowns = getTownsByPriority('medium');
  
  return (
    <MainLayout>
      <SEOHead 
        title="Single-Family Home Markets in Capital District | Expert Analysis & Trends"
        description="Explore comprehensive market guides for single-family homes across Albany, Schenectady, Saratoga, and more. Get expert analysis, pricing trends, and neighborhood insights."
        keywords="capital district single family homes, albany real estate market, schenectady housing market, saratoga springs homes for sale, capital district real estate trends, new york single family home markets"
        canonical="https://capitaldistrictnest.com/markets"
      />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Capital District Single-Family Home Markets
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Comprehensive market guides with expert analysis, current trends, and neighborhood insights for single-family homes across the Capital District.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/markets/albany-single-family-homes"
                  className="bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform flex items-center"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Explore Albany Homes
                </Link>
                <Link 
                  to="#featured-markets"
                  className="border border-foreground text-foreground px-8 py-4 rounded-full font-extrabold hover:bg-foreground hover:text-background transition-colors flex items-center"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Browse All Markets
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Market Overview */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Capital District Real Estate Market Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <TrendingUp className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Market Trends</h3>
                  <p className="text-muted-foreground">
                    Our analysis of the Capital District shows steady appreciation for single-family homes, with an average 5.2% annual increase in property values across core markets.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-border">
                  <Layers className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Inventory Levels</h3>
                  <p className="text-muted-foreground">
                    Current inventory of single-family homes remains tight with approximately 2.1 months of supply, creating a competitive environment for buyers in most neighborhoods.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-border">
                  <Home className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Home Types</h3>
                  <p className="text-muted-foreground">
                    Colonial, Ranch, and Cape Cod styles dominate the single-family landscape, with growing interest in modern construction in developing communities.
                  </p>
                </div>
              </div>
              
              <div className="text-center mb-16">
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                  Our market guides provide comprehensive data and analysis for each town and city in the Capital District, 
                  helping you make informed decisions about buying or selling single-family homes.
                </p>
                
                <Link 
                  to="#contact"
                  className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform"
                >
                  Get a Custom Market Report
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Markets Section */}
        <section id="featured-markets" className="py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
              Featured Single-Family Home Markets
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Explore our in-depth market guides for key cities and towns across the Capital District
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {highPriorityTowns.map((town) => (
                <Card key={town.slug} className="overflow-hidden hover:border-primary transition-colors duration-300 bg-card border-border">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{town.name} Single-Family Homes</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      Explore the {town.name} market for single-family homes. Get insights on pricing trends, 
                      neighborhoods, and what makes this area unique for homebuyers.
                    </p>
                    <Link 
                      to={`/markets/${town.slug}-single-family-homes`}
                      className="inline-flex items-center border border-border px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors w-full justify-center"
                    >
                      Explore Market
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Additional Markets
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {mediumPriorityTowns.map((town) => (
                <Link 
                  key={town.slug} 
                  to={`/markets/${town.slug}-single-family-homes`}
                  className="flex items-center px-4 py-3 border border-border rounded-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors font-semibold"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {town.name} Homes
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="contact" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Get a Personalized Market Analysis
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Want to know more about a specific neighborhood or property? Our team can provide you with a 
                custom market analysis tailored to your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/first-time-homebuyers"
                  className="bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform"
                >
                  Request Market Analysis
                </Link>
                <Link 
                  to="/blog"
                  className="border border-foreground text-foreground px-8 py-4 rounded-full font-extrabold hover:bg-foreground hover:text-background transition-colors"
                >
                  Read Our Latest Market Updates
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default Markets;
