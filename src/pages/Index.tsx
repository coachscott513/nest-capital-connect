
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
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import InternalLinkingNav from '@/components/InternalLinkingNav';

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Capital District Nest",
    "description": "Premier real estate services connecting renters with quality homes and guiding first-time buyers in Albany, Troy, Schenectady, and Saratoga Springs, NY.",
    "url": "https://your-domain.com",
    "telephone": "+1-518-XXX-XXXX",
    "email": "info@capitaldistrict.com",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "NY",
      "addressCountry": "US",
      "addressLocality": "Albany"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "42.6803",
      "longitude": "-73.8370"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Albany",
        "addressRegion": "NY"
      },
      {
        "@type": "City", 
        "name": "Troy",
        "addressRegion": "NY"
      },
      {
        "@type": "City",
        "name": "Schenectady", 
        "addressRegion": "NY"
      },
      {
        "@type": "City",
        "name": "Saratoga Springs",
        "addressRegion": "NY"
      }
    ],
    "serviceType": [
      "Property Rental Services",
      "Real Estate Sales", 
      "First-Time Homebuyer Assistance",
      "Property Management",
      "Mortgage Pre-Approval Assistance",
      "Real Estate Investment Consulting"
    ],
    "openingHours": "Mo-Su 08:00-20:00",
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Check"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://your-domain.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Capital District Rentals",
        "item": "https://your-domain.com#neighborhoods"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Capital District Nest - #1 Rentals & Real Estate in Albany, Troy, Schenectady & Saratoga Springs NY"
        description="Find premium rental properties and expert real estate services in Albany, Troy, Schenectady, and Saratoga Springs. Top-rated property management, first-time buyer assistance, and investment opportunities in New York's Capital District."
        keywords="Albany NY rentals, Troy NY apartments, Schenectady NY housing, Saratoga Springs NY real estate, Capital District property management, NY first time home buyers, rental properties Albany, multi-unit homes NY, real estate investment Capital District, property rental services NY"
        structuredData={structuredData}
      />
      
      <LocalBusinessSchema />
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      
      <Header />
      
      <main role="main">
        <HeroSection />
        <InternalLinkingNav />
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
