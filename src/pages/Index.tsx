
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
import RealEstateSchema from '@/components/RealEstateSchema';
import CoreWebVitalsOptimizer from '@/components/CoreWebVitalsOptimizer';
import InternalLinkingNav from '@/components/InternalLinkingNav';
import AnimatedCapitalDistrictMap from '@/components/AnimatedCapitalDistrictMap';
import MeetTheTeamSection from '@/components/MeetTheTeamSection';
import SEOAnalyzer from '@/components/SEOAnalyzer';
import { AdSenseCompliance } from '@/components/AdSenseOptimizer';

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://your-domain.com/#organization",
        "name": "Capital District Nest",
        "alternateName": ["Capital District Investment Properties", "CDN Real Estate"],
        "description": "Premier investment property specialists for rental properties, rehab projects, and multi-unit buildings in Albany, Troy, Schenectady, and Saratoga Springs, NY.",
        "url": "https://your-domain.com",
        "telephone": "+1-518-XXX-XXXX",
        "email": "info@capitaldistrict.com",
        "foundingDate": "2020",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 State Street",
          "addressLocality": "Albany",
          "addressRegion": "NY",
          "postalCode": "12207",
          "addressCountry": "US"
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
            "addressRegion": "NY",
            "addressCountry": "US"
          },
          {
            "@type": "City", 
            "name": "Troy",
            "addressRegion": "NY",
            "addressCountry": "US"
          },
          {
            "@type": "City",
            "name": "Schenectady", 
            "addressRegion": "NY",
            "addressCountry": "US"
          },
          {
            "@type": "City",
            "name": "Saratoga Springs",
            "addressRegion": "NY",
            "addressCountry": "US"
          }
        ],
        "serviceType": [
          "Investment Property Sales",
          "Multi-Unit Property Acquisition", 
          "Property Rehabilitation Services",
          "Real Estate Investment Consulting",
          "Fix & Flip Properties",
          "Buy & Hold Investment Analysis",
          "Rental Property Management",
          "Property Market Analysis",
          "Investment Property Financing",
          "Real Estate Investment Education"
        ],
        "openingHours": [
          "Mo-Fr 08:00-18:00",
          "Sa 09:00-17:00", 
          "Su 10:00-16:00"
        ],
        "priceRange": "$$",
        "paymentAccepted": ["Cash", "Credit Card", "Check", "Bank Transfer"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        },
        "sameAs": [
          "https://www.facebook.com/CapitalDistrictNest",
          "https://www.linkedin.com/company/capital-district-nest",
          "https://www.instagram.com/capitaldistrict_nest"
        ]
      },
      {
        "@type": "RealEstateAgent",
        "@id": "https://your-domain.com/#realestate",
        "name": "Capital District Nest Real Estate Services",
        "speciality": ["Investment Properties", "Multi-Unit Buildings", "Property Rehabilitation", "Rental Properties"],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 State Street",
          "addressLocality": "Albany",
          "addressRegion": "NY",
          "postalCode": "12207",
          "addressCountry": "US"
        },
        "servesCuisine": "Real Estate Investment Services",
        "priceRange": "$$",
        "telephone": "+1-518-XXX-XXXX"
      },
      {
        "@type": "Service",
        "@id": "https://your-domain.com/#fixflip",
        "name": "Fix & Flip Loan Program",
        "description": "Comprehensive fix and flip financing with down payments as low as 10% for experienced investors. Fast 2-3 week closings.",
        "provider": {
          "@id": "https://your-domain.com/#organization"
        },
        "areaServed": {
          "@type": "State",
          "name": "New York"
        },
        "offers": {
          "@type": "Offer",
          "description": "Fix & Flip Financing",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "minPrice": "10",
            "maxPrice": "20",
            "priceCurrency": "USD",
            "unitText": "% down payment"
          }
        }
      }
    ]
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
        title="Capital District Investment Properties | Multi-Unit, Rehab & Rental Properties Albany NY"
        description="Premier investment property specialists in Albany, Troy, Schenectady & Saratoga Springs NY. Expert services for multi-unit buildings, fix & flip properties, rental investments, and financing solutions. 20+ years experience in Capital District real estate."
        keywords="investment properties Albany NY, multi-unit buildings Troy NY, fix and flip properties Schenectady NY, rental properties Saratoga Springs NY, real estate investment Capital District NY, property rehabilitation NY, investment property financing, buy and hold properties NY, commercial real estate Albany, multi-family properties Troy, rental property management NY, real estate investors Capital District, property flipping Albany NY, investment analysis NY, ARV calculations, fix and flip loans NY, rental income properties, cash flow properties NY, real estate wholesaling Albany, property acquisition NY, investment property broker Albany, multi-unit apartment buildings NY, duplex properties Albany, triplex investment Troy, fourplex properties Schenectady, rental property ROI NY, investment property loans Albany, hard money lending NY, private money lenders Capital District, real estate investment education NY, property investment seminars Albany, first time real estate investors NY, experienced property investors Albany, real estate investment mentoring NY, property market analysis Capital District, rental market trends Albany NY, investment property calculator NY, cash on cash return properties Albany, cap rate analysis NY, real estate investment strategy Albany, property investment portfolio NY, passive income properties Albany, real estate investment opportunities Capital District, distressed properties Albany NY, foreclosure properties Troy NY, estate sale properties Schenectady NY, off market properties Saratoga Springs NY"
        structuredData={structuredData}
      />
      
      <LocalBusinessSchema />
      <RealEstateSchema type="agent" />
      <RealEstateSchema type="organization" />
      <CoreWebVitalsOptimizer />
      <AdSenseCompliance />
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      
      <Header />
      
      <main role="main">
        <HeroSection />
        <InvestmentPropertiesSection />
        <RehabPropertiesSection />
        <NeighborhoodsSection />
        <InternalLinkingNav />
        
        
        <FinancingSection />
        <OwnersSection />
        <MissionSection />
        <TestimonialsSection />
        <MeetTheTeamSection />
        <ContactSection />
      </main>
      
      <Footer />
      
      {/* SEO and Analytics Components */}
      <SEOAnalyzer />
    </div>
  );
};

export default Index;
