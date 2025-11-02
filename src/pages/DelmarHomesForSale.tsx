import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import PropertySearchBar from "@/components/PropertySearchBar";
import InteractivePropertyMap from "@/components/InteractivePropertyMap";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import DelmarSmartFilters from "@/components/DelmarSmartFilters";
import DelmarMarketAnalytics from "@/components/DelmarMarketAnalytics";
import DelmarSchoolDistrict from "@/components/DelmarSchoolDistrict";
import DelmarNeighborhoodInsights from "@/components/DelmarNeighborhoodInsights";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Home, TrendingUp, ExternalLink, Bed, Bath, Ruler, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const DelmarHomesForSale = () => {
  const location = useLocation();
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDelmarProperties();
  }, []);

  // Apply filters from navigation state if present
  useEffect(() => {
    if (location.state?.filters && allProperties.length > 0) {
      handleSearch(location.state.filters);
    }
  }, [location.state, allProperties]);

  const fetchDelmarProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("city", "Delmar")
        .eq("status", "active");

      if (error) throw error;

      const formattedProperties = data?.map((p) => ({
        id: p.id,
        mlsId: p.mls_id,
        address: p.address,
        price: Number(p.price),
        beds: p.beds,
        baths: Number(p.baths),
        sqft: p.sqft,
        latitude: Number(p.latitude),
        longitude: Number(p.longitude),
        thumbnail: p.photos?.[0] || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
        status: p.status,
        daysOnMarket: p.days_on_market || 0,
        boldtrailUrl: p.boldtrail_url,
      })) || [];
      setAllProperties(formattedProperties);
      setFilteredProperties(formattedProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters: { priceRange?: string; beds?: string; keyword?: string }) => {
    let filtered = [...allProperties];

    if (filters.priceRange && filters.priceRange !== "any") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((p) => {
        if (max) {
          return p.price >= min && p.price <= max;
        }
        return p.price >= min;
      });
    }

    if (filters.beds && filters.beds !== "any") {
      const minBeds = parseInt(filters.beds);
      filtered = filtered.filter((p) => p.beds >= minBeds);
    }

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter((p) => p.address.toLowerCase().includes(keyword));
    }

    setFilteredProperties(filtered);
  };

  const handleSmartFilters = (filters: any) => {
    let filtered = [...allProperties];
    
    // For demo purposes, smart filters will show subset of data
    // In production, these would filter based on actual property metadata
    if (filters.bethlehem) {
      // All Delmar properties are in Bethlehem Central SD
      filtered = filtered;
    }
    if (filters.hasGoogleEarth) {
      // Filter properties with valid coordinates
      filtered = filtered.filter(p => p.latitude && p.longitude);
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
                Explore Homes for Sale in Delmar, NY
              </h1>
              <p className="text-xl text-red-50 max-w-3xl mx-auto leading-relaxed">
                Interactive maps, school data, and smart market insights for Albany's premier suburb.
              </p>
              <div className="mt-6">
                <Link to="/delmar-market-insights">
                  <Button className="bg-white text-red-600 hover:bg-red-50 font-semibold px-8 py-6 text-lg">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    View Full Market Analytics & Insights
                  </Button>
                </Link>
              </div>
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

        {/* Featured Listing */}
        <section className="py-8 bg-gradient-to-br from-blue-50 to-blue-100 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              ⭐ Featured Listing in Bethlehem Central Schools
            </h2>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop" 
                    alt="137A Elsmere Avenue, Delmar NY"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
                    NEW LISTING
                  </div>
                </div>
                <CardContent className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      137A Elsmere Avenue
                    </h3>
                    <p className="text-gray-600 mb-4 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Delmar, NY 12054 • Bethlehem Central SD
                    </p>
                    <p className="text-3xl font-bold text-red-600 mb-6">
                      $349,900
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Bed className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Beds</p>
                          <p className="font-semibold">3</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Baths</p>
                          <p className="font-semibold">2</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Sq Ft</p>
                          <p className="font-semibold">1,572</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6">
                      Beautiful home in top-rated Bethlehem Central School District. 
                      0.27 acre lot, built 1967. Perfect opportunity in sought-after Delmar location.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button asChild className="flex-1 bg-red-600 hover:bg-red-700">
                      <Link to="/listings/137a-elsmere-ave-delmar-ny" className="flex items-center justify-center gap-2">
                        View Details
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <a 
                        href="https://www.scottalvarez.com/property/137a-elsmere-ave-delmar-ny-12054"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Full Listing
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>

        {/* Search Bar & Smart Filters Section */}
        <section className="py-8 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <PropertySearchBar onSearch={handleSearch} />
            <div className="mt-6">
              <DelmarSmartFilters onFilterChange={handleSmartFilters} />
            </div>
          </div>
        </section>

        {/* Main Content - Property Grid and Map */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading Delmar properties...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {filteredProperties.length} Homes Found
                    </h2>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      All listings include Google Earth & Street View links
                    </p>
                  </div>
                  <PropertyGrid properties={filteredProperties} />
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Map View</h3>
                    <InteractivePropertyMap properties={filteredProperties} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Market Analytics Section */}
        <DelmarMarketAnalytics properties={filteredProperties} />

        {/* School District Section */}
        <DelmarSchoolDistrict />

        {/* Neighborhood Insights Section */}
        <DelmarNeighborhoodInsights />

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
