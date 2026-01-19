import React from 'react';
import MainLayout from '@/components/MainLayout';
import SEOHead from '@/components/SEOHead';
import RentersSection from '@/components/RentersSection';
import FirstTimeBuyersSection from '@/components/FirstTimeBuyersSection';
import SaratogaRentalsSection from '@/components/SaratogaRentalsSection';
import AlbanyRentalsSection from '@/components/AlbanyRentalsSection';
import SchenectadyRentalsSection from '@/components/SchenectadyRentalsSection';
import TroyRentalsSection from '@/components/TroyRentalsSection';
import ContactSection from '@/components/ContactSection';
import RelatedContentSuggestions from '@/components/RelatedContentSuggestions';
import NeighborhoodCrossLinks from '@/components/NeighborhoodCrossLinks';
import CallToActionLinks from '@/components/CallToActionLinks';
import TownshipsSection from '@/components/TownshipsSection';

const Rentals = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Capital District Nest - Rentals & First-Time Buyers",
    "description": "Find quality rental properties and first-time homebuyer assistance in Albany, Troy, Schenectady, and Saratoga Springs, NY.",
    "url": "https://capitaldistrictnest.com/rentals",
    "telephone": "+1-518-671-8048",
    "email": "info@capitaldistrict.com",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "NY",
      "addressCountry": "US",
      "addressLocality": "Albany"
    },
    "serviceType": [
      "Property Rental Services",
      "First-Time Homebuyer Assistance",
      "Mortgage Pre-Approval Assistance"
    ]
  };

  return (
    <MainLayout>
      <SEOHead 
        title="Rentals & First-Time Buyers - Capital District Nest"
        description="Find quality rental properties and comprehensive first-time homebuyer assistance in Albany, Troy, Schenectady, and Saratoga Springs, NY."
        keywords="Albany NY rentals, Troy NY apartments, Schenectady NY housing, Saratoga Springs NY rentals, first time home buyers NY, rental properties Capital District"
        structuredData={structuredData}
      />
      
      <main role="main">
        <div className="py-16 px-4 border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Rentals & First-Time Homebuyers
            </h1>
            <p className="text-lg text-muted-foreground">
              Quality rental properties and comprehensive support for first-time homebuyers across the Capital District investment market.
            </p>
          </div>
        </div>
        
        <AlbanyRentalsSection />
        <CallToActionLinks context="rental" className="py-8" />
        <TroyRentalsSection />
        <SchenectadyRentalsSection />
        <SaratogaRentalsSection />
        <TownshipsSection />
        <NeighborhoodCrossLinks currentArea="rentals" />
        <RentersSection />
        <FirstTimeBuyersSection />
        <RelatedContentSuggestions currentPage="Capital District Rentals" />
        <ContactSection />
      </main>
    </MainLayout>
  );
};

export default Rentals;
