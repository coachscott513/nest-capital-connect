import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import RentersSection from '@/components/RentersSection';
import FirstTimeBuyersSection from '@/components/FirstTimeBuyersSection';
import SaratogaRentalsSection from '@/components/SaratogaRentalsSection';
import AlbanyRentalsSection from '@/components/AlbanyRentalsSection';
import SchenectadyRentalsSection from '@/components/SchenectadyRentalsSection';
import TroyRentalsSection from '@/components/TroyRentalsSection';
import ContactSection from '@/components/ContactSection';

const Rentals = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Capital District Nest - Rentals & First-Time Buyers",
    "description": "Find quality rental properties and first-time homebuyer assistance in Albany, Troy, Schenectady, and Saratoga Springs, NY.",
    "url": "https://your-domain.com/rentals",
    "telephone": "+1-518-XXX-XXXX",
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
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Rentals & First-Time Buyers - Capital District Nest"
        description="Find quality rental properties and comprehensive first-time homebuyer assistance in Albany, Troy, Schenectady, and Saratoga Springs, NY."
        keywords="Albany NY rentals, Troy NY apartments, Schenectady NY housing, Saratoga Springs NY rentals, first time home buyers NY, rental properties Capital District"
        structuredData={structuredData}
      />
      
      <Header />
      
      <main role="main">
        <div className="pt-20 pb-8 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 text-slate-800">
              Rentals & First-Time Homebuyers
            </h1>
            <p className="text-lg text-slate-600">
              Quality rental properties and comprehensive support for first-time homebuyers across the Capital District.
            </p>
          </div>
        </div>
        
        <AlbanyRentalsSection />
        <TroyRentalsSection />
        <SchenectadyRentalsSection />
        <SaratogaRentalsSection />
        <RentersSection />
        <FirstTimeBuyersSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Rentals;