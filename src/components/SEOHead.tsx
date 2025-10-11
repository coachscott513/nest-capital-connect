
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  structuredData?: object;
  ogImage?: string;
  ogType?: string;
}

const BASE_URL = "https://capitaldistrictnest.com";

const SEOHead = ({ 
  title = "Albany NY Homes for Sale | Capital District Nest | Capital Region Real Estate",
  description = "Find homes for sale in Albany, Troy, Schenectady, and Saratoga Springs NY. Expert local real estate services, investment properties, first-time buyer assistance, and rental properties in New York's Capital District.",
  keywords = "Albany NY homes for sale, Troy NY homes for sale, Schenectady NY homes for sale, Saratoga Springs NY real estate, Capital District homes, Albany real estate, investment properties Albany NY, Capital District property management, NY first time home buyers, rental properties Albany, multi-unit homes NY, Capital Region real estate",
  canonical,
  structuredData,
  ogImage = `${BASE_URL}/og-image-capital-district.jpg`,
  ogType = "website"
}: SEOHeadProps) => {
  const location = useLocation();
  
  // Generate canonical URL dynamically if not provided
  const canonicalUrl = canonical || `${BASE_URL}${location.pathname}`;
  
  useEffect(() => {
    // Update page title
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // Add robots meta
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      document.head.appendChild(robotsMeta);
    }

    // Add author meta
    let authorMeta = document.querySelector('meta[name="author"]');
    if (!authorMeta) {
      authorMeta = document.createElement('meta');
      authorMeta.setAttribute('name', 'author');
      authorMeta.setAttribute('content', 'Capital District Nest - Real Estate Professionals');
      document.head.appendChild(authorMeta);
    }

    // Add language meta
    let languageMeta = document.querySelector('meta[http-equiv="content-language"]');
    if (!languageMeta) {
      languageMeta = document.createElement('meta');
      languageMeta.setAttribute('http-equiv', 'content-language');
      languageMeta.setAttribute('content', 'en-US');
      document.head.appendChild(languageMeta);
    }

    // Update Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: 'Capital District Nest' },
      { property: 'og:locale', content: 'en_US' }
    ];

    ogTags.forEach(({ property, content }) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', property);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute('content', content);
    });

    // Update Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:site', content: '@CapitalDistrictNest' }
    ];

    twitterTags.forEach(({ name, content }) => {
      let twitterMeta = document.querySelector(`meta[name="${name}"]`);
      if (!twitterMeta) {
        twitterMeta = document.createElement('meta');
        twitterMeta.setAttribute('name', name);
        document.head.appendChild(twitterMeta);
      }
      twitterMeta.setAttribute('content', content);
    });
    
    // Add structured data if provided
    let structuredDataScript: HTMLScriptElement | null = null;
    if (structuredData) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }
    
    // Cleanup function
    return () => {
      if (structuredDataScript) {
        document.head.removeChild(structuredDataScript);
      }
    };
  }, [title, description, keywords, canonicalUrl, structuredData, ogImage, ogType, location.pathname]);

  return null;
};

export default SEOHead;
