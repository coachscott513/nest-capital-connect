
import React from 'react';
import HeroSection from '@/components/HeroSection';
import NeighborhoodsSection from '@/components/NeighborhoodsSection';
import InvestmentPropertiesSection from '@/components/InvestmentPropertiesSection';
import RehabPropertiesSection from '@/components/RehabPropertiesSection';
import RehabInvestmentHowTo from '@/components/RehabInvestmentHowTo';
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
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import RelatedContentSuggestions from '@/components/RelatedContentSuggestions';
import NeighborhoodCrossLinks from '@/components/NeighborhoodCrossLinks';
import CallToActionLinks from '@/components/CallToActionLinks';
import YouTubeAnalysisSection from '@/components/YouTubeAnalysisSection';
import EngagementTracker from '@/components/AnalyticsTracker';
import ForSaleKeywordOptimizer from '@/components/ForSaleKeywordOptimizer';
import CapitalDistrictSEOStrategy from '@/components/CapitalDistrictSEOStrategy';

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
      <EngagementTracker pageTitle="Capital District Investment Properties - Home" />
      <ForSaleKeywordOptimizer 
        pageTitle="Capital District Investment Properties For Sale"
        location="Capital District"
        propertyType="investment properties"
        targetKeywords={["multi-unit properties for sale", "rental properties for sale", "fix and flip properties for sale"]}
      />
      <CapitalDistrictSEOStrategy pageType="landing" location="Capital District" propertyType="investment properties" />
      <SEOHead
        title="Capital District Investment Properties For Sale | Multi-Unit, Rehab & Rental Properties Albany NY"
        description="Premier investment properties for sale specialists in Albany, Troy, Schenectady & Saratoga Springs NY. Expert services for multi-unit buildings for sale, fix & flip properties for sale, rental investments, and financing solutions. 20+ years experience in Capital District real estate for sale."
        keywords="investment properties for sale Albany NY, investment properties for sale Troy NY, investment properties for sale Schenectady NY, investment properties for sale Saratoga Springs NY, multi-unit buildings for sale Troy NY, fix and flip properties for sale Schenectady NY, rental properties for sale Saratoga Springs NY, real estate for sale investment Capital District NY, properties for sale rehabilitation NY, investment property for sale financing, buy and hold properties for sale NY, commercial real estate for sale Albany, multi-family properties for sale Troy, rental property for sale management NY, real estate investors for sale Capital District, property for sale flipping Albany NY, investment analysis for sale NY, ARV calculations for sale, fix and flip loans for sale NY, rental income properties for sale, cash flow properties for sale NY, real estate wholesaling for sale Albany, property acquisition for sale NY, investment property broker for sale Albany, multi-unit apartment buildings for sale NY, duplex properties for sale Albany, triplex investment for sale Troy, fourplex properties for sale Schenectady, rental property ROI for sale NY, investment property loans for sale Albany, hard money lending for sale NY, private money lenders for sale Capital District, real estate investment education for sale NY, property investment seminars for sale Albany, first time real estate investors for sale NY, experienced property investors for sale Albany, real estate investment mentoring for sale NY, property market analysis for sale Capital District, rental market trends for sale Albany NY, investment property calculator for sale NY, cash on cash return properties for sale Albany, cap rate analysis for sale NY, real estate investment strategy for sale Albany, property investment portfolio for sale NY, passive income properties for sale Albany, real estate investment opportunities for sale Capital District, distressed properties for sale Albany NY, foreclosure properties for sale Troy NY, estate sale properties for sale Schenectady NY, off market properties for sale Saratoga Springs NY"
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
      
      <BreadcrumbNavigation />
      <Header />
      
      <main role="main" className="pt-20">
        <HeroSection />
        <InvestmentPropertiesSection />
        <CallToActionLinks context="investment" className="py-8" />
        <RehabPropertiesSection />
        <RehabInvestmentHowTo />
        <NeighborhoodsSection />
        <NeighborhoodCrossLinks showAll={true} />
        <InternalLinkingNav />
        <FinancingSection />
        <OwnersSection />
        <MissionSection />
        <RelatedContentSuggestions currentPage="Capital District Real Estate" />
        <TestimonialsSection />
        <YouTubeAnalysisSection />
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
