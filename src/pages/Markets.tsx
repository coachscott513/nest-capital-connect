import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
    <div className="flex flex-col min-h-screen">
      <SEOHead 
        title="Single-Family Home Markets in Capital District | Expert Analysis & Trends"
        description="Explore comprehensive market guides for single-family homes across Albany, Schenectady, Saratoga, and more. Get expert analysis, pricing trends, and neighborhood insights."
        keywords="capital district single family homes, albany real estate market, schenectady housing market, saratoga springs homes for sale, capital district real estate trends, new york single family home markets"
        canonical="https://capitaldistrictnest.com/markets"
      />
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Capital District Single-Family Home Markets
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Comprehensive market guides with expert analysis, current trends, and neighborhood insights for single-family homes across the Capital District.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="font-medium">
                  <Link to="/markets/albany-single-family-homes">
                    <Home className="mr-2 h-5 w-5" />
                    Explore Albany Homes
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-medium">
                  <Link to="#featured-markets">
                    <MapPin className="mr-2 h-5 w-5" />
                    Browse All Markets
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Market Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Capital District Real Estate Market Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                  <TrendingUp className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Market Trends</h3>
                  <p className="text-muted-foreground">
                    Our analysis of the Capital District shows steady appreciation for single-family homes, with an average 5.2% annual increase in property values across core markets.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                  <Layers className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Inventory Levels</h3>
                  <p className="text-muted-foreground">
                    Current inventory of single-family homes remains tight with approximately 2.1 months of supply, creating a competitive environment for buyers in most neighborhoods.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
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
                
                <Button asChild>
                  <Link to="#contact">
                    Get a Custom Market Report
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Markets Section */}
        <section id="featured-markets" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
              Featured Single-Family Home Markets
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Explore our in-depth market guides for key cities and towns across the Capital District
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {highPriorityTowns.map((town) => (
                <Card key={town.slug} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{town.name} Single-Family Homes</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      Explore the {town.name} market for single-family homes. Get insights on pricing trends, 
                      neighborhoods, and what makes this area unique for homebuyers.
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/markets/${town.slug}-single-family-homes`}>
                        Explore Market
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Additional Markets
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {mediumPriorityTowns.map((town) => (
                <Button key={town.slug} asChild variant="ghost" className="justify-start h-auto py-3">
                  <Link to={`/markets/${town.slug}-single-family-homes`}>
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    {town.name} Homes
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="contact" className="py-16 bg-primary/5">
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
                <Button asChild size="lg">
                  <Link to="/contact">
                    Request Market Analysis
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/blog">
                    Read Our Latest Market Updates
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Markets;