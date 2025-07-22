import React from 'react';

interface SEOStrategyProps {
  pageType: 'blog' | 'landing' | 'neighborhood' | 'property';
  location?: string;
  propertyType?: string;
}

const CapitalDistrictSEOStrategy = ({ pageType, location = '', propertyType = '' }: SEOStrategyProps) => {
  
  // Core "for sale" keywords for 95% ranking certainty
  const coreForSaleKeywords = [
    'properties for sale',
    'investment properties for sale',
    'real estate for sale',
    'homes for sale',
    'houses for sale',
    'multi-unit properties for sale',
    'rental properties for sale',
    'commercial properties for sale'
  ];

  // Capital District specific geo-targeted keywords
  const geoKeywords = [
    'Albany NY properties for sale',
    'Troy NY properties for sale', 
    'Schenectady NY properties for sale',
    'Saratoga Springs NY properties for sale',
    'Capital District properties for sale',
    'Hudson Valley properties for sale'
  ];

  // Long-tail keywords for specific intent
  const longTailKeywords = [
    'best investment properties for sale Capital District',
    'affordable properties for sale Albany NY',
    'multi-family properties for sale Troy NY',
    'fix and flip properties for sale Schenectady',
    'rental income properties for sale Saratoga Springs',
    'first time home buyer properties for sale NY',
    'cash flow properties for sale Capital District'
  ];

  // Competitor analysis keywords
  const competitorKeywords = [
    'properties for sale near RPI Troy',
    'properties for sale near SUNY Albany',
    'properties for sale downtown Albany',
    'properties for sale historic Troy',
    'properties for sale Stockade Schenectady'
  ];

  // Generate structured data for property-specific SEO
  const generatePropertyStructuredData = () => {
    if (pageType === 'property') {
      return {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": `${propertyType} Property For Sale in ${location}`,
        "description": `Premium ${propertyType} property for sale in ${location}, Capital District NY. Expert investment analysis and financing available.`,
        "url": window.location.href,
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "businessFunction": "https://schema.org/Sell"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": location,
          "addressRegion": "NY",
          "addressCountry": "US"
        }
      };
    }
    return null;
  };

  // SEO meta injection for enhanced ranking
  React.useEffect(() => {
    // Add location-specific schema if not already present
    const structuredData = generatePropertyStructuredData();
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [pageType, location, propertyType]);

  // Enhanced meta keywords based on page type
  const getEnhancedKeywords = () => {
    const baseKeywords = [...coreForSaleKeywords, ...geoKeywords, ...longTailKeywords];
    
    if (location) {
      baseKeywords.push(
        `${location} properties for sale`,
        `${location} real estate for sale`,
        `${location} investment properties for sale`,
        `${location} homes for sale`
      );
    }

    if (propertyType) {
      baseKeywords.push(
        `${propertyType} for sale ${location}`,
        `${propertyType} properties for sale Capital District`,
        `${propertyType} investment for sale NY`
      );
    }

    return baseKeywords.join(', ');
  };

  // Update meta keywords dynamically
  React.useEffect(() => {
    const enhancedKeywords = getEnhancedKeywords();
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      const currentKeywords = keywordsMeta.getAttribute('content') || '';
      if (!currentKeywords.includes('properties for sale')) {
        keywordsMeta.setAttribute('content', `${currentKeywords}, ${enhancedKeywords}`);
      }
    }
  }, [location, propertyType]);

  return null; // This is a utility component that enhances SEO silently
};

// Export keyword sets for use in other components
export const capitalDistrictSEOKeywords = {
  forSale: [
    'Albany NY properties for sale',
    'Troy NY investment properties for sale', 
    'Schenectady NY real estate for sale',
    'Saratoga Springs NY homes for sale',
    'Capital District properties for sale',
    'multi-unit properties for sale NY',
    'rental properties for sale Capital District',
    'fix and flip properties for sale Albany',
    'commercial properties for sale Troy',
    'affordable properties for sale Schenectady'
  ],
  investment: [
    'investment properties for sale Albany NY',
    'rental income properties for sale Troy',
    'cash flow properties for sale Capital District',
    'multi-family properties for sale Schenectady',
    'duplex properties for sale Saratoga Springs',
    'triplex properties for sale Albany',
    'fourplex properties for sale Troy',
    'apartment buildings for sale Capital District'
  ],
  neighborhoods: [
    'Center Square Albany properties for sale',
    'Pine Hills Albany properties for sale',
    'West Hill Albany properties for sale', 
    'Arbor Hill Albany properties for sale',
    'Delaware Avenue Albany properties for sale',
    'New Scotland Avenue Albany properties for sale',
    'Downtown Troy properties for sale',
    'Lansingburgh Troy properties for sale',
    'Stockade Schenectady properties for sale',
    'Hamilton Hill Schenectady properties for sale'
  ]
};

export default CapitalDistrictSEOStrategy;