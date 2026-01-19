import { useEffect } from 'react';

interface RealEstateSchemaProps {
  type: 'agent' | 'organization' | 'listing';
  data?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    price?: number;
    bedrooms?: number;
    bathrooms?: number;
    squareFootage?: number;
    propertyType?: string;
    listingUrl?: string;
    images?: string[];
  };
}

const RealEstateSchema = ({ type, data }: RealEstateSchemaProps) => {
  useEffect(() => {
    let schemaData: any = {};

    switch (type) {
      case 'agent':
        schemaData = {
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Capital District Nest",
          "description": "Premier real estate investment specialists in Albany, Troy, Schenectady & Saratoga Springs NY. Expert services for multi-unit buildings, fix & flip properties, rental investments, and financing solutions.",
          "url": window.location.origin,
          "telephone": "+15186718048",
          "email": "info@capitaldistrict.com",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "NY",
            "addressCountry": "US",
            "addressLocality": "Albany"
          },
          "areaServed": [
            {
              "@type": "City",
              "name": "Albany",
              "addressRegion": "NY"
            },
            {
              "@type": "City", 
              "name": "Troy",
              "addressRegion": "NY"
            },
            {
              "@type": "City",
              "name": "Schenectady", 
              "addressRegion": "NY"
            },
            {
              "@type": "City",
              "name": "Saratoga Springs",
              "addressRegion": "NY"
            }
          ],
          "serviceType": [
            "Investment Property Sales",
            "Multi-Unit Property Sales", 
            "Property Rehabilitation Services",
            "Rental Property Management",
            "Real Estate Investment Consulting",
            "Fix and Flip Properties",
            "Property Financing Solutions"
          ],
          "knowsAbout": [
            "Real Estate Investment",
            "Multi-Unit Properties",
            "Property Rehabilitation", 
            "Rental Property Management",
            "Capital District Real Estate Market",
            "Investment Property Financing"
          ],
          "priceRange": "$$",
          "openingHours": "Mo-Su 08:00-20:00"
        };
        break;

      case 'organization':
        schemaData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Capital District Nest",
          "alternateName": "CDN Real Estate",
          "url": window.location.origin,
          "logo": `${window.location.origin}/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png`,
          "description": "Capital District's premier real estate investment firm specializing in multi-unit properties, rehab projects, and rental investments.",
          "foundingDate": "2020",
          "sameAs": [
            "https://www.facebook.com/capitaldistrict",
            "https://www.linkedin.com/company/capital-district-nest",
            "https://www.instagram.com/capitaldistrict"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+15186718048",
            "contactType": "customer service",
            "areaServed": "US",
            "availableLanguage": "English"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Real Estate Investment Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Investment Property Sales"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "Multi-Unit Property Management"
                }
              }
            ]
          }
        };
        break;

      case 'listing':
        if (data) {
          schemaData = {
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": `${data.address}, ${data.city}, ${data.state} ${data.zipCode}`,
            "description": `${data.propertyType} for sale in ${data.city}, ${data.state}`,
            "url": data.listingUrl || window.location.href,
            "price": data.price,
            "priceCurrency": "USD",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": data.address,
              "addressLocality": data.city,
              "addressRegion": data.state,
              "postalCode": data.zipCode,
              "addressCountry": "US"
            },
            "floorSize": {
              "@type": "QuantitativeValue",
              "value": data.squareFootage,
              "unitCode": "SQF"
            },
            "numberOfRooms": data.bedrooms,
            "numberOfBathroomsTotal": data.bathrooms,
            "propertyType": data.propertyType,
            "image": data.images || [],
            "seller": {
              "@type": "RealEstateAgent",
              "name": "Capital District Nest"
            }
          };
        }
        break;
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [type, data]);

  return null;
};

export default RealEstateSchema;