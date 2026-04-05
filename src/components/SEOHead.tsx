import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { buildBreadcrumbSchema, buildBreadcrumbsFromPath } from '@/utils/seoSchemas';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  structuredData?: object | object[];
  ogImage?: string;
  ogType?: string;
  noBreadcrumb?: boolean;
}

const BASE_URL = "https://www.capitaldistrictnest.com";

const SEOHead = ({ 
  title = "Capital District Nest | Albany NY Real Estate Investment Intelligence",
  description = "Albany's hyperlocal real estate platform. Search homes, analyze any property, and track market trends across the Capital District. Updated daily.",
  keywords = "Capital District real estate, Albany homes for sale, property analysis Albany NY, real estate investment Capital District, Troy real estate, Schenectady homes, Saratoga Springs real estate",
  canonical,
  structuredData,
  ogImage = `${BASE_URL}/og-image-capital-district.jpg`,
  ogType = "website",
  noBreadcrumb = false
}: SEOHeadProps) => {
  const location = useLocation();
  const canonicalUrl = canonical || `${BASE_URL}${location.pathname}`;
  
  // Auto-generate breadcrumb schema for inner pages
  const isHomepage = location.pathname === "/";
  const breadcrumbSchema = (!noBreadcrumb && !isHomepage)
    ? buildBreadcrumbSchema(buildBreadcrumbsFromPath(location.pathname))
    : null;

  // Normalize structuredData to array
  const schemas: object[] = [];
  if (structuredData) {
    if (Array.isArray(structuredData)) {
      schemas.push(...structuredData);
    } else {
      schemas.push(structuredData);
    }
  }
  if (breadcrumbSchema) {
    schemas.push(breadcrumbSchema);
  }
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Scott Alvarez - Capital District Nest" />
      <meta httpEquiv="content-language" content="en-US" />
      
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Capital District Nest" />
      <meta property="og:locale" content="en_US" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@CapitalDistrictNest" />
      
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
