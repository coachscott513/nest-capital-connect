
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  structuredData?: object;
}

const SEOHead = ({ 
  title = "Capital District Nest - Your Go-To for Rentals & Homeownership in Albany, Troy, Schenectady & Saratoga",
  description = "Connecting renters with quality multi-unit homes and guiding them towards first-time homeownership in Albany, Troy, Schenectady, & Saratoga.",
  keywords = "Albany rentals, Troy rentals, Schenectady rentals, Saratoga Springs rentals, Capital District real estate, first time home buyers",
  canonical = "https://your-domain.com",
  structuredData
}: SEOHeadProps) => {
  
  useEffect(() => {
    // Update page title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;
    
    // Add structured data if provided
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
      
      // Cleanup function to remove the script when component unmounts
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [title, description, keywords, canonical, structuredData]);

  return null; // This component doesn't render anything
};

export default SEOHead;
