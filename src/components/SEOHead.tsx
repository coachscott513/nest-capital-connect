
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  structuredData?: object;
  ogImage?: string;
  ogType?: string;
}

const SEOHead = ({ 
  title = "Capital District Nest - #1 Rentals & Real Estate in Albany, Troy, Schenectady & Saratoga Springs NY",
  description = "Find premium rental properties and expert real estate services in Albany, Troy, Schenectady, and Saratoga Springs. Top-rated property management, first-time buyer assistance, and investment opportunities in New York's Capital District.",
  keywords = "Albany NY rentals, Troy NY apartments, Schenectady NY housing, Saratoga Springs NY real estate, Capital District property management, NY first time home buyers, rental properties Albany, multi-unit homes NY",
  canonical = "https://your-domain.com",
  structuredData,
  ogImage = "https://your-domain.com/og-image-capital-district.jpg",
  ogType = "website"
}: SEOHeadProps) => {
  
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
    canonicalLink.href = canonical;

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
      { property: 'og:url', content: canonical },
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
  }, [title, description, keywords, canonical, structuredData, ogImage, ogType]);

  return null;
};

export default SEOHead;
