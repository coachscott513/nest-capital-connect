import React, { useEffect } from 'react';

interface ForSaleOptimizerProps {
  pageTitle: string;
  location: string;
  propertyType?: string;
  targetKeywords?: string[];
}

const ForSaleKeywordOptimizer = ({ 
  pageTitle, 
  location, 
  propertyType = 'investment properties',
  targetKeywords = []
}: ForSaleOptimizerProps) => {
  
  // Primary "for sale" keyword variations for maximum ranking
  const primaryForSaleKeywords = [
    `${location} properties for sale`,
    `${location} ${propertyType} for sale`,
    `${location} real estate for sale`,
    `${location} investment properties for sale`,
    `${location} rental properties for sale`,
    `${location} multi-unit properties for sale`,
    `${location} homes for sale`,
    `${location} houses for sale`
  ];

  // Capital District specific long-tail keywords
  const longTailKeywords = [
    `best ${propertyType} for sale in ${location}`,
    `affordable ${propertyType} for sale ${location} NY`,
    `cash flow ${propertyType} for sale ${location}`,
    `${propertyType} for sale near ${location}`,
    `${propertyType} for sale ${location} Capital District`,
    `investment ${propertyType} for sale ${location} NY`,
    `rental ${propertyType} for sale ${location}`,
    `multi-family ${propertyType} for sale ${location}`
  ];

  // Competitive analysis keywords
  const competitiveKeywords = [
    `${location} properties for sale vs rentals`,
    `${location} real estate for sale market analysis`,
    `${location} investment properties for sale ROI`,
    `${location} properties for sale cash flow analysis`,
    `${location} properties for sale cap rate`,
    `${location} properties for sale financing options`
  ];

  // Semantic keyword variations for natural language processing
  const semanticKeywords = [
    `buying properties in ${location}`,
    `purchasing real estate ${location}`,
    `acquiring investment properties ${location}`,
    `${location} property acquisition`,
    `${location} real estate investment opportunities`,
    `${location} property investment market`
  ];

  useEffect(() => {
    // Enhance page meta with location-specific "for sale" keywords
    const allKeywords = [
      ...primaryForSaleKeywords,
      ...longTailKeywords,
      ...competitiveKeywords,
      ...semanticKeywords,
      ...targetKeywords
    ];

    // Update or create enhanced meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const currentDesc = metaDescription.getAttribute('content') || '';
      if (!currentDesc.includes('for sale')) {
        const enhancedDesc = `${currentDesc} Find the best ${propertyType} for sale in ${location}, NY. Expert analysis of properties for sale in the Capital District.`;
        metaDescription.setAttribute('content', enhancedDesc);
      }
    }

    // Add location-specific Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && !ogTitle.getAttribute('content')?.includes('for sale')) {
      const currentTitle = ogTitle.getAttribute('content') || pageTitle;
      ogTitle.setAttribute('content', `${currentTitle} - Properties For Sale ${location}`);
    }

    // Add enhanced structured data for real estate listings
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": `${pageTitle} - ${location} Properties For Sale`,
      "description": `Comprehensive guide to ${propertyType} for sale in ${location}, Capital District NY. Expert investment analysis and market insights.`,
      "url": window.location.href,
      "mainEntity": {
        "@type": "RealEstateListing",
        "name": `${location} ${propertyType} For Sale`,
        "description": `Premium ${propertyType} for sale in ${location}, Capital District. Expert analysis and financing available.`,
        "address": {
          "@type": "PostalAddress", 
          "addressLocality": location,
          "addressRegion": "NY",
          "addressCountry": "US"
        },
        "offers": {
          "@type": "AggregateOffer",
          "availability": "https://schema.org/InStock",
          "businessFunction": "https://schema.org/Sell"
        }
      },
      "keywords": allKeywords.join(', '),
      "about": {
        "@type": "Thing",
        "name": `${location} Real Estate For Sale Market`,
        "description": `Investment opportunities and properties for sale in ${location}, Capital District NY`
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [pageTitle, location, propertyType, targetKeywords]);

  return null;
};

// Utility function to generate "for sale" optimized content
export const generateForSaleContent = (location: string, propertyType: string) => {
  return {
    title: `${location} ${propertyType} For Sale - Capital District Investment Guide`,
    metaDescription: `Discover the best ${propertyType} for sale in ${location}, NY. Expert analysis, market insights, and investment opportunities in the Capital District.`,
    h1: `Premium ${propertyType} For Sale in ${location}, Capital District NY`,
    h2: `Why ${location} ${propertyType} For Sale Are Smart Investments`,
    h3: `Top ${propertyType} For Sale Opportunities in ${location}`,
    keywords: [
      `${location} ${propertyType} for sale`,
      `${location} properties for sale`,
      `${location} real estate for sale`,
      `${location} investment properties for sale`,
      `${location} rental properties for sale`,
      `Capital District ${propertyType} for sale`
    ]
  };
};

// Export for use in blog posts and landing pages
export const forSaleKeywordDensity = {
  primary: 'properties for sale', // Target 2-3% density
  secondary: 'investment properties for sale', // Target 1-2% density  
  tertiary: 'real estate for sale', // Target 1% density
  location: 'Capital District properties for sale', // Target 1-2% density
  longTail: 'best investment properties for sale' // Target 0.5-1% density
};

export default ForSaleKeywordOptimizer;