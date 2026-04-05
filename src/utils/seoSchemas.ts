const BASE_URL = "https://www.capitaldistrictnest.com";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Capital District Nest",
  "description": "Albany NY hyperlocal real estate investment intelligence platform",
  "url": BASE_URL,
  "telephone": "+1-518-676-2347",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Albany",
    "addressRegion": "NY",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 42.6526,
    "longitude": -73.7562
  },
  "areaServed": [
    "Albany", "Troy", "Schenectady", "Saratoga Springs",
    "Colonie", "Cohoes", "Watervliet", "Clifton Park"
  ],
  "priceRange": "$$",
  "sameAs": []
};

export function buildRealEstateListingSchema(property: {
  address: string;
  city: string;
  state?: string;
  price: number;
  beds?: number | null;
  baths?: number | null;
  sqft?: number | null;
  description?: string | null;
  photos?: string[] | null;
  created_at?: string;
  slug?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.address,
    "description": property.description || `Property listing at ${property.address}, ${property.city}`,
    "url": `${BASE_URL}/properties/${property.slug || encodeURIComponent(property.address)}`,
    "datePosted": property.created_at || new Date().toISOString(),
    "price": property.price,
    "priceCurrency": "USD",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address,
      "addressLocality": property.city,
      "addressRegion": property.state || "NY",
      "addressCountry": "US"
    },
    ...(property.beds && { "numberOfRooms": property.beds }),
    ...(property.sqft && {
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.sqft,
        "unitCode": "SQF"
      }
    }),
    ...(property.photos?.[0] && { "image": property.photos[0] }),
  };
}

export function buildArticleSchema(article: {
  title: string;
  description?: string;
  slug: string;
  publishedAt: string;
  modifiedAt?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description || "",
    "url": `${BASE_URL}/blog/${article.slug}`,
    "datePublished": article.publishedAt,
    "dateModified": article.modifiedAt || article.publishedAt,
    "image": article.image || `${BASE_URL}/og-image-capital-district.jpg`,
    "author": {
      "@type": "Person",
      "name": "Scott Lapierre",
      "jobTitle": "Licensed Real Estate Agent",
      "worksFor": {
        "@type": "Organization",
        "name": "RE/MAX Capital District"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Capital District Nest",
      "url": BASE_URL
    }
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.path}`
    }))
  };
}

export function buildBreadcrumbsFromPath(pathname: string): { name: string; path: string }[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { name: string; path: string }[] = [{ name: "Home", path: "/" }];

  const labelMap: Record<string, string> = {
    "towns": "Towns",
    "analyze": "Analyze",
    "blog": "Blog",
    "properties": "Properties",
    "markets": "Markets",
    "financing": "Financing",
    "communities": "Communities",
    "rentals": "Rentals",
    "investor-tools": "Investor Tools",
    "first-time-homebuyers": "First-Time Buyers",
    "dealdesk": "Deal Desk",
    "reports": "Reports",
  };

  let currentPath = "";
  for (const seg of segments) {
    currentPath += `/${seg}`;
    const label = labelMap[seg] || seg.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    crumbs.push({ name: label, path: currentPath });
  }

  return crumbs;
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
