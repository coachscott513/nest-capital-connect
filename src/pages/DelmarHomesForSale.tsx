import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import PropertySearchBar from "@/components/PropertySearchBar";
import InteractivePropertyMap from "@/components/InteractivePropertyMap";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { Card } from "@/components/ui/card";
import { MapPin, Home, TrendingUp } from "lucide-react";

// Sample property data - this would come from your Google Sheet/CSV in production
const sampleProperties = [
  {
    id: "1",
    address: "45 Oak Ridge Lane, Delmar, NY 12054",
    price: 475000,
    beds: 4,
    baths: 2.5,
    sqft: 2400,
    latitude: 42.6217,
    longitude: -73.8326,
    thumbnail: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    status: "Active",
    daysOnMarket: 12
  },
  {
    id: "2",
    address: "128 Delaware Avenue, Delmar, NY 12054",
    price: 389000,
    beds: 3,
    baths: 2,
    sqft: 1850,
    latitude: 42.6187,
    longitude: -73.8356,
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    status: "Active",
    daysOnMarket: 5
  },
  {
    id: "3",
    address: "92 Kenwood Avenue, Delmar, NY 12054",
    price: 525000,
    beds: 4,
    baths: 3,
    sqft: 2650,
    latitude: 42.6247,
    longitude: -73.8296,
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    status: "Active",
    daysOnMarket: 8
  },
  {
    id: "4",
    address: "215 Elsmere Avenue, Delmar, NY 12054",
    price: 319000,
    beds: 3,
    baths: 1.5,
    sqft: 1650,
    latitude: 42.6167,
    longitude: -73.8376,
    thumbnail: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800",
    status: "Pending",
    daysOnMarket: 22
  },
  {
    id: "5",
    address: "67 Wemple Road, Delmar, NY 12054",
    price: 595000,
    beds: 5,
    baths: 3.5,
    sqft: 3200,
    latitude: 42.6207,
    longitude: -73.8306,
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    status: "Active",
    daysOnMarket: 3
  },
  {
    id: "6",
    address: "184 Adams Street, Delmar, NY 12054",
    price: 449000,
    beds: 4,
    baths: 2,
    sqft: 2100,
    latitude: 42.6197,
    longitude: -73.8336,
    thumbnail: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    status: "Active",
    daysOnMarket: 15
  }
];

const DelmarHomesForSale = () => {
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties);

  const handleSearch = (filters: { priceRange?: string; beds?: string; keyword?: string }) => {
    let filtered = [...sampleProperties];

    // Filter by price range
    if (filters.priceRange && filters.priceRange !== "any") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter(p => {
        if (max) {
          return p.price >= min && p.price <= max;
        }
        return p.price >= min;
      });
    }

    // Filter by bedrooms
    if (filters.beds && filters.beds !== "any") {
      const minBeds = parseInt(filters.beds);
      filtered = filtered.filter(p => p.beds >= minBeds);
    }

    // Filter by keyword (address)
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(p => 
        p.address.toLowerCase().includes(keyword)
      );
    }

    setFilteredProperties(filtered);
  };

  return (
    <>
      <Helmet>
        <title>Delmar Homes for Sale | Capital District Nest Real Estate</title>
        <meta 
          name="description" 
          content="Discover homes for sale in Delmar, NY — explore listings with Google Earth views, pricing, and expert local guidance from RE/MAX Realtor Scott Alvarez." 
        />
        <meta 
          name="keywords" 
          content="Delmar homes for sale, Albany County real estate, Capital District homes, Bethlehem Central schools, RE/MAX Delmar, Scott Alvarez real estate" 
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/delmar-homes-for-sale" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Delmar Homes for Sale | Capital District Nest" />
        <meta property="og:description" content="Explore homes for sale in Delmar, NY — a charming Albany suburb with top-rated schools and tree-lined streets." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200" />
        <meta property="og:url" content="https://capitaldistrictnest.com/delmar-homes-for-sale" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Delmar Homes for Sale | Capital District Nest" />
        <meta name="twitter:description" content="Explore homes for sale in Delmar, NY with expert guidance from RE/MAX Realtor Scott Alvarez." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200" />

        {/* Schema.org markup for RealEstateAgent */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Scott Alvarez",
            "image": "https://capitaldistrictnest.com/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png",
            "email": "scott@remax.com",
            "telephone": "(518) 522-7265",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Delmar",
              "addressRegion": "NY",
              "addressCountry": "US"
            },
            "areaServed": "Delmar, NY",
            "priceRange": "$$$"
          })}
        </script>

        {/* Schema.org markup for Offers */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": filteredProperties.map((property, index) => ({
              "@type": "Offer",
              "position": index + 1,
              "itemOffered": {
                "@type": "House",
                "name": property.address,
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": property.address.split(",")[0],
                  "addressLocality": "Delmar",
                  "addressRegion": "NY"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": property.latitude,
                  "longitude": property.longitude
                },
                "numberOfRooms": property.beds,
                "floorSize": {
                  "@type": "QuantitativeValue",
                  "value": property.sqft,
                  "unitText": "sqft"
                }
              },
              "price": property.price,
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section - RE/MAX Red */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-red-600 to-red-700 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Delmar Homes for Sale
              </h1>
              <p className="text-xl text-red-50 max-w-3xl mx-auto leading-relaxed">
                Explore homes for sale in Delmar, NY — a charming Albany suburb known for its tree-lined streets, 
                top-rated schools, and small-town feel just minutes from downtown Albany.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center">
                <Home className="w-8 h-8 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold text-white">{filteredProperties.length}</div>
                <div className="text-red-50 text-sm">Active Listings</div>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold text-white">$475K</div>
                <div className="text-red-50 text-sm">Median Price</div>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold text-white">Bethlehem</div>
                <div className="text-red-50 text-sm">Top-Rated Schools</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Search Bar Section */}
        <section className="py-8 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <PropertySearchBar onSearch={handleSearch} />
          </div>
        </section>

        {/* Main Content - Property Grid and Map */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Property Grid - 2 columns on desktop */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {filteredProperties.length} Homes Found
                  </h2>
                  <p className="text-gray-600">
                    Showing the latest listings in Delmar, NY
                  </p>
                </div>
                <PropertyGrid properties={filteredProperties} />
              </div>

              {/* Interactive Map - 1 column on desktop */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Map View
                  </h3>
                  <InteractivePropertyMap properties={filteredProperties} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Blue Accents */}
        <section className="py-16 bg-blue-50 border-t border-blue-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Find Your Delmar Home?
              </h2>
              <p className="text-lg text-gray-600">
                Contact Scott Alvarez, your local RE/MAX expert, for personalized assistance
              </p>
            </div>
            <LeadCaptureForm 
              type="investment" 
              title="Contact Scott Alvarez"
              description="Get instant access to new Delmar listings and schedule a showing"
              buttonText="Get Started"
            />
          </div>
        </section>

        {/* Footer CTA - RE/MAX Red */}
        <section className="py-12 bg-gradient-to-br from-red-600 to-red-700 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Thinking of Selling Your Delmar Home?
            </h2>
            <p className="text-xl text-red-50 mb-6 leading-relaxed">
              Contact Scott Alvarez, your local RE/MAX expert, for a free property valuation.
            </p>
            <a 
              href="mailto:scott@remax.com" 
              className="inline-block bg-white text-red-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Free Home Valuation
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DelmarHomesForSale;
