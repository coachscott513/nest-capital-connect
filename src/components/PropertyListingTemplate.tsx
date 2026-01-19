import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Maximize, MapPin, Calendar, DollarSign, Home, ExternalLink } from "lucide-react";
import PropertyPhotoCarousel from "./PropertyPhotoCarousel";
import PropertyContactForm from "./PropertyContactForm";
import { Helmet } from "react-helmet-async";

interface Property {
  id: string;
  mls_id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lot_size?: string;
  latitude: number;
  longitude: number;
  photos: string[];
  description?: string;
  status: string;
  days_on_market: number;
  property_taxes?: number;
  year_built?: number;
  property_type?: string;
  boldtrail_url?: string;
}

interface PropertyListingTemplateProps {
  property: Property;
}

const PropertyListingTemplate = ({ property }: PropertyListingTemplateProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const pricePerSqft = property.sqft ? Math.round(property.price / property.sqft) : null;
  const fullAddress = `${property.address}, ${property.city}, ${property.state} ${property.zip}`;
  const googleEarthUrl = `https://earth.google.com/web/@${property.latitude},${property.longitude},300m`;

  return (
    <>
      <Helmet>
        <title>{fullAddress} | Homes for Sale | Capital District Nest</title>
        <meta name="description" content={`Explore ${fullAddress} — ${property.beds} beds, ${property.baths} baths, ${property.sqft.toLocaleString()} sqft. Detailed analytics and insights from RE/MAX Realtor Scott Alvarez.`} />
        <meta name="keywords" content={`${property.city} homes for sale, ${property.address}, RE/MAX Scott Alvarez, Capital District real estate, Albany homes`} />
        <link rel="canonical" href={`https://capitaldistrictnest.com/listings/${property.mls_id}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${fullAddress} | Capital District Nest`} />
        <meta property="og:description" content={`${property.beds} bed, ${property.baths} bath home for ${formatPrice(property.price)}`} />
        <meta property="og:image" content={property.photos[0] || ""} />
        <meta property="og:type" content="website" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": fullAddress,
            "description": property.description,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": property.address,
              "addressLocality": property.city,
              "addressRegion": property.state,
              "postalCode": property.zip,
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": property.latitude,
              "longitude": property.longitude
            },
            "offers": {
              "@type": "Offer",
              "price": property.price,
              "priceCurrency": "USD"
            },
            "numberOfBedrooms": property.beds,
            "numberOfBathroomsTotal": property.baths,
            "floorSize": {
              "@type": "QuantitativeValue",
              "value": property.sqft,
              "unitCode": "FTK"
            }
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back button */}
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
          ← Back to Search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo carousel */}
            <PropertyPhotoCarousel
              photos={property.photos}
              address={fullAddress}
              price={property.price}
            />

            {/* Property summary */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{formatPrice(property.price)}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{fullAddress}</span>
                    </div>
                  </div>
                  <Badge variant={property.status === "active" ? "default" : "secondary"}>
                    {property.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{property.beds}</p>
                      <p className="text-sm text-muted-foreground">Beds</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{property.baths}</p>
                      <p className="text-sm text-muted-foreground">Baths</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{property.sqft.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Sq Ft</p>
                    </div>
                  </div>
                  {property.lot_size && (
                    <div className="flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">{property.lot_size}</p>
                        <p className="text-sm text-muted-foreground">Lot Size</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">MLS ID</p>
                    <p className="font-semibold">{property.mls_id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Days on Market</p>
                    <p className="font-semibold">{property.days_on_market}</p>
                  </div>
                  {pricePerSqft && (
                    <div>
                      <p className="text-muted-foreground">Price per Sq Ft</p>
                      <p className="font-semibold">${pricePerSqft}</p>
                    </div>
                  )}
                  {property.year_built && (
                    <div>
                      <p className="text-muted-foreground">Year Built</p>
                      <p className="font-semibold">{property.year_built}</p>
                    </div>
                  )}
                  {property.property_type && (
                    <div>
                      <p className="text-muted-foreground">Property Type</p>
                      <p className="font-semibold">{property.property_type}</p>
                    </div>
                  )}
                  {property.property_taxes && (
                    <div>
                      <p className="text-muted-foreground">Annual Taxes</p>
                      <p className="font-semibold">{formatPrice(property.property_taxes)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {property.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Property Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Google Earth */}
            <Card>
              <CardHeader>
                <CardTitle>Explore the Location</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" size="lg">
                  <a href={googleEarthUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View in Google Earth
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* BoldTrail Link */}
            {property.boldtrail_url && (
              <Button asChild size="lg" className="w-full">
                <a 
                  href={property.boldtrail_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  View Full Listing on ScottAlvarez.com
                </a>
              </Button>
            )}
            <PropertyContactForm propertyAddress={fullAddress} mlsId={property.mls_id} />
          </div>
        </div>

        {/* Lead capture footer */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Thinking of selling your {property.city} home?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact our team, your trusted RE/MAX agents, for a free valuation and expert guidance through the selling process.
            </p>
            <Button size="lg" asChild>
              <a href="/sell-investment-property">
                Find My Home Value →
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PropertyListingTemplate;
