// Expanded Routing System for Capital District Towns
// This component generates all the necessary routes for the expanded town coverage

import React from 'react';
import { Route } from 'react-router-dom';
import { capitalDistrictTowns, TownData } from './CapitalDistrictTowns';
import SEOHead from './SEOHead';

// Import existing pages
import AlbanyRealEstate from '@/pages/AlbanyRealEstate';
import TroyRealEstate from '@/pages/TroyRealEstate';
import SchenectadyRealEstate from '@/pages/SchenectadyRealEstate';
import SaratogaRealEstate from '@/pages/SaratogaRealEstate';
import Rentals from '@/pages/Rentals';

// Generic Real Estate Page Component for new towns
const TownRealEstatePage = ({ town }: { town: TownData }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": `Capital District Nest - ${town.name} Real Estate`,
    "description": `Expert real estate analysis and investment opportunities in ${town.name}, ${town.county} County, NY`,
    "areaServed": {
      "@type": "City",
      "name": town.name,
      "addressRegion": "NY"
    },
    "serviceType": ["Real Estate Analysis", "Investment Properties", "Rental Properties"],
    "url": `https://capitaldistrictnest.com/${town.slug}-real-estate`
  };

  const pageTitle = `${town.name} NY Homes for Sale | ${town.county} County Real Estate | Capital District Nest`;
  const pageDescription = `${town.description}. Find homes for sale in ${town.name}, ${town.county} County NY. Expert real estate services, investment properties, and market insights from Capital District Nest.`;
  const pageKeywords = town.keywords.join(', ');

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        structuredData={structuredData}
      />
      <header className="pt-20">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            {town.name} NY Homes for Sale
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {town.description}. Expert data-driven analysis of {town.name} real estate market, investment opportunities, and rental properties.
          </p>
        </div>
      </header>
      
      <main>
        {/* Market Overview Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{town.name} Real Estate Market Overview</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Market Trends</h3>
                <p className="text-muted-foreground">
                  Current market analysis for {town.name}, {town.county} County shows strong potential for investment properties and rental opportunities.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Investment Opportunities</h3>
                <p className="text-muted-foreground">
                  Discover profitable real estate investments in {town.name} with our data-driven property analysis and market insights.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Property Analysis</h3>
                <p className="text-muted-foreground">
                  Get expert analysis on every {town.name} property before you buy. Objective insights for informed investment decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhoods Section */}
        {town.neighborhoods && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Featured {town.name} Neighborhoods</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {town.neighborhoods.map((neighborhood) => (
                  <div key={neighborhood} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-lg font-semibold mb-2">{neighborhood}</h3>
                    <p className="text-muted-foreground mb-4">
                      Explore real estate opportunities in {neighborhood}, {town.name}.
                    </p>
                    <button className="text-primary hover:underline">
                      View Properties →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Invest in {town.name} Real Estate?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get expert analysis on any {town.name} property before you buy. We provide objective, 
              data-driven insights to help you make informed investment decisions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                Get Property Analysis
              </button>
              <button className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
                Contact Our Team
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Generate route mappings for existing pages
const existingPageMappings: { [key: string]: React.ComponentType } = {
  'albany': AlbanyRealEstate,
  'troy': TroyRealEstate,
  'schenectady': SchenectadyRealEstate,
  'saratoga-springs': SaratogaRealEstate,
};

// Generate routes for all towns
export const generateTownRoutes = () => {
  return capitalDistrictTowns.map(town => {
    const ExistingComponent = existingPageMappings[town.slug];
    
    return (
      <Route 
        key={`${town.slug}-real-estate`}
        path={`/${town.slug}-real-estate`} 
        element={ExistingComponent ? <ExistingComponent /> : <TownRealEstatePage town={town} />} 
      />
    );
  });
};

// Generate rental routes for all towns
export const generateTownRentalRoutes = () => {
  return capitalDistrictTowns.map(town => (
    <Route 
      key={`${town.slug}-rentals`}
      path={`/${town.slug}-rentals`} 
      element={<Rentals />} 
    />
  ));
};