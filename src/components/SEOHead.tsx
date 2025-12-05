import { Helmet } from 'react-helmet-async';
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
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Author */}
      <meta name="author" content="Capital District Nest - Real Estate Professionals" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en-US" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Capital District Nest" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@CapitalDistrictNest" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
