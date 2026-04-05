import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink } from "lucide-react";

interface Property {
  id: string;
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
}

interface InteractivePropertyMapProps {
  properties: Property[];
}

const InteractivePropertyMap = ({ properties }: InteractivePropertyMapProps) => {
  // Calculate map center (average of all property coordinates)
  const centerLat = properties.reduce((sum, p) => sum + p.latitude, 0) / properties.length || 42.6217;
  const centerLng = properties.reduce((sum, p) => sum + p.longitude, 0) / properties.length || -73.8326;

  const openMapView = () => {
    // Open Google Maps with all properties
    const url = `https://www.google.com/maps/search/?api=1&query=${centerLat},${centerLng}`;
    window.open(url, '_blank');
  };

  const openGoogleEarth = (lat: number, lng: number) => {
    const url = `https://earth.google.com/web/@${lat},${lng},80a,0d,80y,0h,45t,0r`;
    window.open(url, '_blank');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card className="overflow-hidden border-border">
      {/* Map Preview - Click to view in Google Maps */}
      <div 
        className="h-96 bg-gradient-to-br from-blue-100 via-gray-100 to-green-50 relative cursor-pointer group overflow-hidden"
        onClick={openMapView}
      >
        {/* Map-like grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-border" />
            ))}
          </div>
        </div>

        {/* Property markers */}
        <div className="absolute inset-0">
          {properties.slice(0, 8).map((property, index) => (
            <div
              key={property.id}
              className="absolute w-10 h-10 -ml-5 -mt-10"
              style={{
                left: `${20 + (index % 4) * 20}%`,
                top: `${25 + Math.floor(index / 4) * 35}%`,
              }}
            >
              <MapPin className="w-10 h-10 text-red-600 fill-red-500 drop-shadow-lg" />
            </div>
          ))}
        </div>
        
        {/* Overlay with property count */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge className="bg-background text-foreground shadow-lg">
            <MapPin className="w-3 h-3 mr-1" />
            {properties.length} properties
          </Badge>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-background px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            <span className="font-semibold">Open in Google Maps</span>
          </div>
        </div>
      </div>

      {/* Property List */}
      <div className="p-4 max-h-96 overflow-y-auto">
        <h4 className="font-semibold text-foreground mb-3">Property Locations</h4>
        <div className="space-y-3">
          {properties.map((property, index) => (
            <div 
              key={property.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
              onClick={() => openGoogleEarth(property.latitude, property.longitude)}
            >
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground truncate">
                  {property.address.split(",")[0]}
                </div>
                <div className="text-sm text-red-600 font-bold">
                  {formatPrice(property.price)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {property.beds} bd • {property.baths} ba • {property.sqft.toLocaleString()} sqft
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default InteractivePropertyMap;
