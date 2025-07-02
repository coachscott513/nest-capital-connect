
import React from 'react';
import HeroSection from '@/components/HeroSection';
import NeighborhoodsSection from '@/components/NeighborhoodsSection';
import InvestmentPropertiesSection from '@/components/InvestmentPropertiesSection';
import RehabPropertiesSection from '@/components/RehabPropertiesSection';
import FinancingSection from '@/components/FinancingSection';
import OwnersSection from '@/components/OwnersSection';
import MissionSection from '@/components/MissionSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import InternalLinkingNav from '@/components/InternalLinkingNav';
import AnimatedCapitalDistrictMap from '@/components/AnimatedCapitalDistrictMap';
import MeetTheTeamSection from '@/components/MeetTheTeamSection';

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Capital District Nest",
    "description": "Investment property specialists for rental properties, rehab projects, and multi-unit buildings in Albany, Troy, Schenectady, and Saratoga Springs, NY.",
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
      "Investment Property Sales",
      "Multi-Unit Property Acquisition", 
      "Property Rehabilitation Services",
      "Real Estate Investment Consulting",
      "Fix & Flip Properties",
      "Buy & Hold Investment Analysis"
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
        title="Capital District Investment Properties - Multi-Unit, Rehab & Rental Properties in NY"
        description="Specialized investment property services for multi-unit buildings, rehab projects, and rental properties in Albany, Troy, Schenectady, and Saratoga Springs. Expert investment analysis and property acquisition."
        keywords="investment properties Albany NY, multi-unit properties Troy NY, rehab properties Schenectady NY, rental properties Saratoga Springs NY, real estate investment Capital District, fix and flip properties NY, buy and hold investments, property rehabilitation NY"
        structuredData={structuredData}
      />
      
      <LocalBusinessSchema />
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      
      <Header />
      
      <main role="main">
        <HeroSection />
        <InvestmentPropertiesSection />
        <InternalLinkingNav />
        
        {/* Animated Map Section */}
        <section className="py-12 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">
              Discover the Capital District
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Our service area spans across four vibrant communities, each offering unique opportunities for renters, buyers, and investors.
            </p>
            <AnimatedCapitalDistrictMap />
          </div>
        </section>
        
        <NeighborhoodsSection />
        <RehabPropertiesSection />
        <FinancingSection />
        <OwnersSection />
        <MissionSection />
        <TestimonialsSection />
        <MeetTheTeamSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
