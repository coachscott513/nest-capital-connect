
import { useEffect } from 'react';

const LocalBusinessSchema = () => {
  useEffect(() => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Capital District Nest",
      "alternateName": "CDN Real Estate",
      "url": "https://your-domain.com",
      "logo": "https://your-domain.com/logo.png",
      "sameAs": [
        "https://www.facebook.com/capitaldistrict",
        "https://www.linkedin.com/company/capital-district-nest",
        "https://www.instagram.com/capitaldistrict"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-518-522-7265",
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": "English"
      }
    };

    const realEstateAgentSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Capital District Nest",
      "description": "Professional real estate services specializing in rental properties, first-time home buying, and investment opportunities in Albany, Troy, Schenectady, and Saratoga Springs, NY.",
      "url": "https://your-domain.com",
      "telephone": "+1-518-522-7265",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      "areaServed": [
        "Albany County, NY",
        "Rensselaer County, NY", 
        "Schenectady County, NY",
        "Saratoga County, NY"
      ],
      "serviceType": [
        "Apartment Rentals",
        "House Rentals",
        "Property Management",
        "Real Estate Sales",
        "First-Time Buyer Programs",
        "Investment Property Consulting"
      ],
      "priceRange": "$$"
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Capital District Property Rental Services",
      "description": "Comprehensive property rental and real estate services in New York's Capital District",
      "provider": {
        "@type": "Organization",
        "name": "Capital District Nest"
      },
      "areaServed": {
        "@type": "State",
        "name": "New York"
      },
      "serviceType": "Real Estate Services"
    };

    // Add schemas to head
    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.textContent = JSON.stringify(realEstateAgentSchema);
    document.head.appendChild(script2);

    const script3 = document.createElement('script');
    script3.type = 'application/ld+json';
    script3.textContent = JSON.stringify(serviceSchema);
    document.head.appendChild(script3);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      document.head.removeChild(script3);
    };
  }, []);

  return null;
};

export default LocalBusinessSchema;
