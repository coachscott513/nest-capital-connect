import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Home, Building, DollarSign, Bed, Bath, Square, Filter, Star, TrendingUp } from "lucide-react";
import { useAnalytics } from './AnalyticsTracker';
import LeadCaptureForm from './LeadCaptureForm';

interface PropertySearchToolProps {
  defaultLocation?: string;
  showResultsLimit?: boolean;
}

const PropertySearchTool = ({ 
  defaultLocation = "", 
  showResultsLimit = true 
}: PropertySearchToolProps) => {
  const [searchParams, setSearchParams] = useState({
    location: defaultLocation,
    propertyType: "",
    priceRange: [200000, 800000],
    bedrooms: "",
    bathrooms: "",
    minSquareFeet: "",
    listingType: "for-sale" // for-sale, for-rent, sold
  });
  
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  
  const { trackPropertyInquiry, trackChartInteraction } = useAnalytics();

  // Mock property data
  const mockProperties = [
    {
      id: 1,
      address: "123 State St, Albany, NY",
      price: 485000,
      beds: 3,
      baths: 2,
      sqft: 1850,
      type: "Single Family",
      status: "Active",
      daysOnMarket: 12,
      imageUrl: "/api/placeholder/300/200",
      listingAgent: "Capital District Realty",
      investment: { roi: "8.2%", cashFlow: "+$450/mo" }
    },
    {
      id: 2,
      address: "456 Madison Ave, Troy, NY",
      price: 325000,
      beds: 2,
      baths: 1,
      sqft: 1200,
      type: "Multi-Family",
      status: "Active",
      daysOnMarket: 5,
      imageUrl: "/api/placeholder/300/200",
      listingAgent: "Hudson Valley Properties",
      investment: { roi: "12.5%", cashFlow: "+$780/mo" }
    },
    {
      id: 3,
      address: "789 Union St, Schenectady, NY",
      price: 650000,
      beds: 4,
      baths: 3,
      sqft: 2400,
      type: "Single Family",
      status: "Active",
      daysOnMarket: 8,
      imageUrl: "/api/placeholder/300/200",
      listingAgent: "Electric City Realty",
      investment: { roi: "6.8%", cashFlow: "+$320/mo" }
    }
  ];

  const handleSearch = () => {
    setHasSearched(true);
    setSearchCount(prev => prev + 1);
    
    // Track search interaction
    trackChartInteraction('property_search', searchParams.location || 'Capital District', {
      property_type: searchParams.propertyType,
      price_range: `${searchParams.priceRange[0]}-${searchParams.priceRange[1]}`,
      listing_type: searchParams.listingType
    });

    // Filter mock properties based on search params
    let filtered = mockProperties.filter(property => {
      const inPriceRange = property.price >= searchParams.priceRange[0] && 
                          property.price <= searchParams.priceRange[1];
      const matchesBeds = !searchParams.bedrooms || property.beds >= parseInt(searchParams.bedrooms);
      const matchesBaths = !searchParams.bathrooms || property.baths >= parseInt(searchParams.bathrooms);
      const matchesLocation = !searchParams.location || 
                            property.address.toLowerCase().includes(searchParams.location.toLowerCase());
      
      return inPriceRange && matchesBeds && matchesBaths && matchesLocation;
    });

    setSearchResults(filtered);

    // Show lead capture after 2 searches or if no results
    if (searchCount >= 1 || filtered.length === 0) {
      setShowLeadCapture(true);
    }
  };

  const handlePropertyClick = (property: any) => {
    trackPropertyInquiry(property.type, searchParams.location || 'Capital District');
    setShowLeadCapture(true);
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  if (showLeadCapture) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Get Full Property Details & Market Analysis
            </CardTitle>
            <CardDescription>
              Access detailed property information, comparable sales, investment analysis, and get notified of new listings that match your criteria
            </CardDescription>
          </CardHeader>
        </Card>
        <LeadCaptureForm 
          type="investment" 
          title="Complete Property Search Results"
          description="Get full MLS access, detailed investment analysis, and exclusive off-market opportunities"
          buttonText="Unlock Full Property Details"
        />
        <Button 
          variant="outline" 
          onClick={() => setShowLeadCapture(false)}
          className="w-full"
        >
          ← Back to Search Results
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Property Search Tool
          </CardTitle>
          <CardDescription>
            Find properties that match your investment criteria in the Capital District
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={searchParams.listingType} onValueChange={(value) => 
            setSearchParams(prev => ({ ...prev, listingType: value }))
          }>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="for-sale">For Sale</TabsTrigger>
              <TabsTrigger value="for-rent">For Rent</TabsTrigger>
              <TabsTrigger value="sold">Sold</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Location Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </label>
            <Input
              placeholder="City, neighborhood, or zip code"
              value={searchParams.location}
              onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>

          {/* Property Type & Price Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Building className="w-4 h-4" />
                Property Type
              </label>
              <Select value={searchParams.propertyType} onValueChange={(value) => 
                setSearchParams(prev => ({ ...prev, propertyType: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Any type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single-family">Single Family</SelectItem>
                  <SelectItem value="multi-family">Multi-Family</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price Range: {formatPrice(searchParams.priceRange[0])} - {formatPrice(searchParams.priceRange[1])}
              </label>
              <Slider
                value={searchParams.priceRange}
                onValueChange={(value) => setSearchParams(prev => ({ ...prev, priceRange: value }))}
                max={1500000}
                min={50000}
                step={25000}
                className="w-full"
              />
            </div>
          </div>

          {/* Bedrooms, Bathrooms, Square Feet */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Bed className="w-4 h-4" />
                Min Bedrooms
              </label>
              <Select value={searchParams.bedrooms} onValueChange={(value) => 
                setSearchParams(prev => ({ ...prev, bedrooms: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Bath className="w-4 h-4" />
                Min Bathrooms
              </label>
              <Select value={searchParams.bathrooms} onValueChange={(value) => 
                setSearchParams(prev => ({ ...prev, bathrooms: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Square className="w-4 h-4" />
                Min Sq Ft
              </label>
              <Input
                type="number"
                placeholder="1000"
                value={searchParams.minSquareFeet}
                onChange={(e) => setSearchParams(prev => ({ ...prev, minSquareFeet: e.target.value }))}
              />
            </div>
          </div>

          <Button onClick={handleSearch} className="w-full">
            <Search className="w-4 h-4 mr-2" />
            Search Properties
          </Button>
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{searchResults.length} Properties Found</CardTitle>
                <CardDescription>
                  {searchParams.location && `in ${searchParams.location} • `}
                  {searchParams.listingType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Refine Search
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {searchResults.length === 0 ? (
              <div className="text-center py-8">
                <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No properties match your criteria</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or expanding your search area
                </p>
                <Button onClick={() => setShowLeadCapture(true)}>
                  Get Notified of New Listings
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {showResultsLimit && searchResults.length > 2 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-amber-800">
                          Showing 3 of {searchResults.length} properties
                        </p>
                        <p className="text-sm text-amber-700">
                          Get full access to all listings and detailed investment analysis
                        </p>
                      </div>
                      <Button onClick={() => setShowLeadCapture(true)} size="sm">
                        See All Results
                      </Button>
                    </div>
                  </div>
                )}
                
                {searchResults.slice(0, showResultsLimit ? 3 : searchResults.length).map((property) => (
                  <div 
                    key={property.id} 
                    className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handlePropertyClick(property)}
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-48 h-32 bg-muted rounded-lg flex items-center justify-center">
                        <Home className="w-8 h-8 text-muted-foreground" />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{property.address}</h3>
                            <p className="text-2xl font-bold text-primary">{formatPrice(property.price)}</p>
                          </div>
                          <Badge variant="secondary">{property.status}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            {property.beds} beds
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="w-4 h-4" />
                            {property.baths} baths
                          </span>
                          <span className="flex items-center gap-1">
                            <Square className="w-4 h-4" />
                            {property.sqft} sqft
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{property.type}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {property.daysOnMarket} days on market
                            </span>
                          </div>
                          
                          {searchParams.listingType === 'for-sale' && property.investment && (
                            <div className="flex items-center gap-3 text-sm">
                              <span className="flex items-center gap-1 text-green-600">
                                <TrendingUp className="w-3 h-3" />
                                {property.investment.roi} ROI
                              </span>
                              <span className="text-green-600">{property.investment.cashFlow}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertySearchTool;