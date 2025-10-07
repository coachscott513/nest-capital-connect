
import React from 'react';
import HeroSection from '@/components/HeroSection';
import OpportunityCards from '@/components/OpportunityCards';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import RealEstateSchema from '@/components/RealEstateSchema';
import CoreWebVitalsOptimizer from '@/components/CoreWebVitalsOptimizer';
import MeetTheTeamSection from '@/components/MeetTheTeamSection';
import SEOAnalyzer from '@/components/SEOAnalyzer';
import { AdSenseCompliance } from '@/components/AdSenseOptimizer';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
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
        "telephone": "+1-518-522-7265",
        "email": "scottalvarez@remax.net",
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
          "https://www.facebook.com/scottalvarez.remax",
          "https://www.linkedin.com/in/scottalvarez",
          "https://www.instagram.com/scottalvarez.remax"
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
        "telephone": "+1-518-522-7265"
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
    <div className="min-h-screen bg-background">
      <EngagementTracker pageTitle="Capital District Investment Properties - Home" />
      <ForSaleKeywordOptimizer 
        pageTitle="Capital District Investment Properties For Sale"
        location="Capital District"
        propertyType="investment properties"
        targetKeywords={["multi-unit properties for sale", "rental properties for sale", "fix and flip properties for sale"]}
      />
      <CapitalDistrictSEOStrategy pageType="landing" location="Capital District" propertyType="investment properties" />
      <SEOHead
        title="Capital District Nest - Albany Investment Properties | Multi-Unit & Rental Properties"
        description="Expert investment property specialists for multi-unit buildings, fix & flip, and rental properties in Albany, Troy, Schenectady & Saratoga Springs. Start building your portfolio today."
        keywords="Albany investment properties, multi-unit properties Albany, rental properties Capital District, fix and flip Albany, investment real estate Troy, Schenectady investment properties, Saratoga Springs rentals"
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
      
      <main role="main">
        <HeroSection />
        
        {/* Investment Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">500+</div>
                <div className="text-sm md:text-base text-muted-foreground">Properties Sold</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">$50M+</div>
                <div className="text-sm md:text-base text-muted-foreground">Total Volume</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">15+</div>
                <div className="text-sm md:text-base text-muted-foreground">Years Experience</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">4.8</div>
                <div className="text-sm md:text-base text-muted-foreground">Client Rating</div>
              </div>
            </div>
          </div>
        </section>

        <OpportunityCards />
        
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
