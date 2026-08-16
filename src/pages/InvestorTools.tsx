import React from 'react';
import OpportunityCards from '@/components/OpportunityCards';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import MainLayout from '@/components/MainLayout';
import SEOHead from '@/components/SEOHead';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import RealEstateSchema from '@/components/RealEstateSchema';
import CoreWebVitalsOptimizer from '@/components/CoreWebVitalsOptimizer';
import MeetTheTeamSection from '@/components/MeetTheTeamSection';
import SEOAnalyzer from '@/components/SEOAnalyzer';
import { AdSenseCompliance } from '@/components/AdSenseOptimizer';
import EngagementTracker from '@/components/AnalyticsTracker';
import ForSaleKeywordOptimizer from '@/components/ForSaleKeywordOptimizer';
import CapitalDistrictSEOStrategy from '@/components/CapitalDistrictSEOStrategy';
import RehabPropertiesSection from '@/components/RehabPropertiesSection';
import FinancingSection from '@/components/FinancingSection';
import OwnersSection from '@/components/OwnersSection';
import FeaturedAreasSection from '@/components/FeaturedAreasSection';

const InvestorTools = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.capitaldistrictnest.com/#organization",
        "name": "Capital District Nest",
        "alternateName": ["Capital District Investment Properties", "CDN Real Estate"],
        "description": "Premier investment property specialists for rental properties, rehab projects, and multi-unit buildings in Albany, Troy, Schenectady, and Saratoga Springs, NY.",
        "url": "https://www.capitaldistrictnest.com",
        "telephone": "+1-518-522-7265",
        "email": "scott@capitaldistrictnest.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Albany",
          "addressRegion": "NY",
          "addressCountry": "US"
        },

        "areaServed": [
          { "@type": "City", "name": "Albany", "addressRegion": "NY", "addressCountry": "US" },
          { "@type": "City", "name": "Troy", "addressRegion": "NY", "addressCountry": "US" },
          { "@type": "City", "name": "Schenectady", "addressRegion": "NY", "addressCountry": "US" },
          { "@type": "City", "name": "Saratoga Springs", "addressRegion": "NY", "addressCountry": "US" }
        ],
        "serviceType": [
          "Investment Property Sales",
          "Multi-Unit Property Acquisition",
          "Property Rehabilitation Services",
          "Real Estate Investment Consulting"
        ],
        "priceRange": "$$"
      },
      {
        "@type": "RealEstateAgent",
        "@id": "https://www.capitaldistrictnest.com/#realestate",
        "name": "Capital District Nest Real Estate Services",
        "speciality": ["Investment Properties", "Multi-Unit Buildings", "Property Rehabilitation", "Rental Properties"],
        "telephone": "+1-518-522-7265"
      }
    ]
  };

  return (
    <MainLayout>
      <EngagementTracker pageTitle="Capital District Investment Properties - Investor Tools" />
      <ForSaleKeywordOptimizer
        pageTitle="Capital District Investment Properties For Sale"
        location="Capital District"
        propertyType="investment properties"
        targetKeywords={["multi-unit properties for sale", "rental properties for sale", "fix and flip properties for sale"]}
      />
      <CapitalDistrictSEOStrategy pageType="landing" location="Capital District" propertyType="investment properties" />
      <SEOHead
        title="Investor Tools | Capital District Nest - Calculators & Analysis"
        description="Access powerful investment property calculators, mortgage amortization tools, and cash flow analysis for Albany, Troy, Schenectady & Saratoga Springs real estate."
        keywords="investment property calculator, mortgage calculator Albany, cash flow analysis, real estate investment tools, Capital District investing"
        structuredData={structuredData}
      />

      <LocalBusinessSchema />
      <RealEstateSchema type="agent" />
      <RealEstateSchema type="organization" />
      <CoreWebVitalsOptimizer />
      <AdSenseCompliance />

      <main role="main">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Investor Tools & Resources
            </h1>
            <p className="text-xl text-muted-foreground">
              Calculators, analysis tools, and market data for Capital District real estate investors
            </p>
          </div>
        </section>

        {/* Unsupported performance/grant statistics removed — no verified source. */}


        <section id="investment-properties">
          <OpportunityCards />
        </section>

        <section id="rehab-properties">
          <RehabPropertiesSection />
        </section>

        <section id="financing">
          <FinancingSection />
        </section>

        <FeaturedAreasSection />
        <TestimonialsSection />
        <MeetTheTeamSection />

        <section id="owners">
          <OwnersSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>

      <SEOAnalyzer />
    </MainLayout>
  );
};

export default InvestorTools;
