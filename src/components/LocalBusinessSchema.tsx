import { useEffect } from 'react';

const LocalBusinessSchema = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "RealEstateAgent",
          "name": "Capital District Nest Team at RE/MAX",
          "image": "https://capitaldistrictnest.com/logo.png",
          "url": "https://capitaldistrictnest.com",
          "telephone": "+15186762347",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Albany",
            "addressRegion": "NY",
            "postalCode": "12203",
            "addressCountry": "US"
          },
          "areaServed": [
            "Albany",
            "Troy",
            "Schenectady",
            "Niskayuna",
            "Saratoga Springs",
            "Latham",
            "Clifton Park",
            "Rensselaer"
          ],
          "description": "Specialized investment team combining institutional-grade market analysis with local expertise in multi-family, land development, and first-time buyer grants."
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How can I buy a house in Albany with no money down?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We specialize in finding 3.5% down FHA loans and connecting buyers with the Albany & Troy Homeowner Grants which can provide up to $30,000 in down-payment assistance."
              }
            },
            {
              "@type": "Question",
              "name": "Is buying a multi-family home in Troy NY a good investment?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Troy offers some of the highest cap rates in New York State. Our team analyzes rent rolls and expense data to ensure your multi-unit property generates positive cash flow."
              }
            },
            {
              "@type": "Question",
              "name": "Do I need a real estate agent to buy land in Niskayuna?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Land acquisition requires specific knowledge of zoning, perc tests, and surveys. Our team specializes in land development and new construction processes."
              }
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default LocalBusinessSchema;
