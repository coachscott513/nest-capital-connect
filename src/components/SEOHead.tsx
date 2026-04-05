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
  title = "Capital District Nest | Albany NY Real Estate Investment Intelligence",
  description = "Albany's hyperlocal real estate platform. Search homes, analyze any property, and track market trends across the Capital District. Updated daily.",
  keywords = "Capital District real estate, Albany homes for sale, property analysis Albany NY, real estate investment Capital District, Troy real estate, Schenectady homes, Saratoga Springs real estate",
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
      <meta name="author" content="Scott Alvarez - Capital District Nest" />
      
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
