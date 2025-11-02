import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyPhotoCarousel from "@/components/PropertyPhotoCarousel";
import PropertyContactForm from "@/components/PropertyContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, MapPin, Home, Bed, Bath, Ruler, Calendar, DollarSign } from "lucide-react";

const ElsmereProperty = () => {
  const property = {
    address: "137A Elsmere Avenue",
    city: "Delmar",
    state: "NY",
    zip: "12054",
    fullAddress: "137A Elsmere Avenue, Delmar, NY 12054",
    latitude: 42.622707,
    longitude: -73.823115,
    price: 349900,
    beds: 3,
    baths: 2,
    sqft: 1572,
    lotAcres: 0.27,
    yearBuilt: 1967,
    schoolDistrict: "Bethlehem Central School District",
    mlsId: "202527359",
    daysOnMarket: 7,
    pricePerSqFt: 223,
    delmarAvgPricePerSqFt: 212,
    photos: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
    ],
    googleEarthLink: `https://earth.google.com/web/@42.622707,-73.823115,60a,0d,60y,0h,45t,0r`,
    boldtrailUrl: "https://www.scottalvarez.com/property/137a-elsmere-ave-delmar-ny-12054"
  };

  const schools = [
    { name: "Eagle Elementary School", rating: "8/10", grades: "K-5" },
    { name: "Bethlehem Central Middle School", rating: "9/10", grades: "6-8" },
    { name: "Bethlehem Central High School", rating: "9/10", grades: "9-12" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <Helmet>
        <title>137A Elsmere Ave | Bethlehem Central Schools | Delmar Homes for Sale</title>
        <meta name="description" content={`Beautiful 3 bed, 2 bath home in Delmar, NY. ${property.sqft} sq ft, ${property.lotAcres} acre lot in top-rated Bethlehem Central School District. ${formatPrice(property.price)}`} />
        <meta property="og:title" content="137A Elsmere Ave | Bethlehem Central Schools | Delmar NY" />
        <meta property="og:description" content={`${property.beds} bed, ${property.baths} bath home in Delmar's Bethlehem Central School District`} />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Property Photos */}
          <div className="mb-8">
            <PropertyPhotoCarousel 
              photos={property.photos} 
              address={property.fullAddress}
              price={property.price}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Property Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">{property.fullAddress}</CardTitle>
                  <p className="text-4xl font-bold text-primary">{formatPrice(property.price)}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Bedrooms</p>
                        <p className="font-semibold">{property.beds}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Bathrooms</p>
                        <p className="font-semibold">{property.baths}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Square Feet</p>
                        <p className="font-semibold">{property.sqft.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Lot Size</p>
                        <p className="font-semibold">{property.lotAcres} acres</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Year Built</p>
                        <p className="font-semibold">{property.yearBuilt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Price/Sq Ft</p>
                        <p className="font-semibold">${property.pricePerSqFt}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-1">MLS ID: {property.mlsId}</p>
                    <p className="text-sm text-muted-foreground">Days on Market: {property.daysOnMarket}</p>
                  </div>
                </CardContent>
              </Card>

              {/* School District */}
              <Card>
                <CardHeader>
                  <CardTitle>School District: {property.schoolDistrict}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>School Name</TableHead>
                        <TableHead>Grades</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schools.map((school) => (
                        <TableRow key={school.name}>
                          <TableCell className="font-medium">{school.name}</TableCell>
                          <TableCell>{school.grades}</TableCell>
                          <TableCell className="text-green-600 font-semibold">{school.rating}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <p className="text-sm text-muted-foreground mt-4">
                    Bethlehem Central School District is consistently ranked among the top school districts in New York State, 
                    offering excellent educational opportunities for students of all ages.
                  </p>
                </CardContent>
              </Card>

              {/* Market Snapshot */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Snapshot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">This Property</p>
                      <p className="text-2xl font-bold text-primary">${property.pricePerSqFt}/sq ft</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Delmar Average</p>
                      <p className="text-2xl font-bold">${property.delmarAvgPricePerSqFt}/sq ft</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    This property is priced at <span className="font-semibold text-primary">${property.pricePerSqFt} per square foot</span>, 
                    which is slightly above the Delmar average of ${property.delmarAvgPricePerSqFt}/sq ft. 
                    The premium reflects the excellent condition, desirable location, and top-rated school district.
                  </p>
                </CardContent>
              </Card>

              {/* Local Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Local Insights - Delmar, NY</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Delmar is one of the Capital Region's most sought-after communities, known for its tree-lined streets, 
                    excellent schools, and strong sense of community. Located just minutes from downtown Albany, Delmar offers 
                    the perfect blend of suburban tranquility and urban convenience.
                  </p>
                  <p>
                    The Bethlehem Central School District serves this area and is consistently ranked among the top districts 
                    in New York State. Delaware Plaza and other local shopping centers provide convenient access to dining, 
                    shopping, and entertainment options.
                  </p>
                  <p>
                    Residents enjoy easy access to Five Rivers Environmental Education Center, Elm Avenue Park, and numerous 
                    walking trails. The location also provides quick access to I-87 and I-90, making commuting throughout 
                    the Capital Region convenient.
                  </p>
                </CardContent>
              </Card>

              {/* Google Earth */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location Views
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild className="w-full" size="lg">
                    <a 
                      href={property.googleEarthLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-5 w-5" />
                      View in Google Earth
                    </a>
                  </Button>
                  
                  {/* Street View */}
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1s${encodeURIComponent(`${property.latitude},${property.longitude}`)}!2m2!1d${property.latitude}!2d${property.longitude}!3f210!4f0!5f0.7525`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Street View"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Full Listing Link */}
              <Button asChild size="lg" className="w-full bg-red-600 hover:bg-red-700">
                <a 
                  href={property.boldtrailUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  View Full Listing on ScottAlvarez.com
                </a>
              </Button>

              <PropertyContactForm 
                propertyAddress={property.fullAddress} 
                mlsId={property.mlsId} 
              />

              {/* Seller CTA */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Thinking of Selling in Bethlehem Central?</h3>
                  <p className="text-sm">
                    Get your home value today! I specialize in properties within the Bethlehem Central School District 
                    and can help you maximize your home's value.
                  </p>
                  <Button asChild variant="secondary" className="w-full">
                    <a href="/#contact">Get Your Home Value</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ElsmereProperty;
