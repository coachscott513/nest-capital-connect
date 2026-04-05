import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Maximize, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
interface Property {
  id: string;
  mlsId?: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  latitude: number;
  longitude: number;
  thumbnail: string;
  status: string;
  daysOnMarket: number;
  boldtrailUrl?: string;
}

interface PropertyGridProps {
  properties: Property[];
}

const PropertyGrid = ({ properties }: PropertyGridProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const openGoogleMaps = (lat: number, lng: number, address: string) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-border">
          {/* Property Image */}
          <div className="relative h-64 overflow-hidden group">
            <img 
              src={property.thumbnail} 
              alt={property.address}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4">
              <Badge 
                className={property.status?.toLowerCase() === "active" ? "bg-green-600" : "bg-yellow-600"}
              >
                {property.status}
              </Badge>
            </div>
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-background/90 text-foreground">
                {property.daysOnMarket} days on market
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            {/* Price */}
            <div className="text-3xl font-bold text-red-600 mb-3">
              {formatPrice(property.price)}
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 mb-4">
              <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
              <p className="text-foreground/80 font-medium leading-tight">
                {property.address}
              </p>
            </div>

            {/* Property Details */}
            <div className="flex items-center gap-4 mb-6 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span className="font-semibold">{property.beds}</span>
                <span className="text-sm">beds</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span className="font-semibold">{property.baths}</span>
                <span className="text-sm">baths</span>
              </div>
              <div className="flex items-center gap-1">
                <Maximize className="w-4 h-4" />
                <span className="font-semibold">{property.sqft.toLocaleString()}</span>
                <span className="text-sm">sqft</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={() => openGoogleMaps(property.latitude, property.longitude, property.address)}
                variant="outline"
                className="flex-1 border-blue-600 text-accent hover:bg-accent/10"
              >
                <MapPin className="w-4 h-4 mr-2" />
                View on Map
              </Button>
              {property.mlsId ? (
                <Button 
                  asChild
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  <Link to={`/listings/${property.mlsId}`}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Details
                  </Link>
                </Button>
              ) : property.boldtrailUrl ? (
                <Button 
                  asChild
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  <a href={property.boldtrailUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Listing
                  </a>
                </Button>
              ) : (
                <Button 
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  disabled
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Details
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PropertyGrid;
