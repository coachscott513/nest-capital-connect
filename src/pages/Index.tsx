import React from 'react';
import HeroSection from '@/components/HeroSection';
import NeighborhoodsSection from '@/components/NeighborhoodsSection';
import RentersSection from '@/components/RentersSection';
import FirstTimeBuyersSection from '@/components/FirstTimeBuyersSection';
import FinancingSection from '@/components/FinancingSection';
import OwnersSection from '@/components/OwnersSection';
import MissionSection from '@/components/MissionSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import SaratogaRentalsSection from '@/components/SaratogaRentalsSection';
import AlbanyRentalsSection from '@/components/AlbanyRentalsSection';
import SchenectadyRentalsSection from '@/components/SchenectadyRentalsSection';
import TroyRentalsSection from '@/components/TroyRentalsSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Capital District Nest",
    "description": "Premier real estate services connecting renters with quality homes and guiding first-time buyers in the Capital District of New York.",
    "url": "https://your-domain.com",
    "telephone": "+1-518-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "NY",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "42.6803",
      "longitude": "-73.8370"
    },
    "areaServed": [
      "Albany, NY",
      "Troy, NY", 
      "Schenectady, NY",
      "Saratoga Springs, NY",
      "Capital District, NY"
    ],
    "serviceType": [
      "Property Rental Services",
      "Real Estate Sales",
      "First-Time Homebuyer Assistance",
      "Property Management",
      "Mortgage Pre-Approval Assistance"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Capital District Nest - Rentals & Homeownership in Albany, Troy, Schenectady & Saratoga"
        description="Find quality rental properties and get expert guidance for first-time home buying in Albany, Troy, Schenectady, and Saratoga Springs. Professional real estate services in the Capital District."
        keywords="Albany rentals, Troy apartments, Schenectady housing, Saratoga Springs real estate, Capital District properties, first time home buyers NY, rental properties Albany, multi-unit homes"
        structuredData={structuredData}
      />
      
      <Header />
      
      <main role="main">
        <HeroSection />
        <NeighborhoodsSection />
        <AlbanyRentalsSection />
        <TroyRentalsSection />
        <SchenectadyRentalsSection />
        <SaratogaRentalsSection />
        <RentersSection />
        <FirstTimeBuyersSection />
        <FinancingSection />
        <OwnersSection />
        <MissionSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
