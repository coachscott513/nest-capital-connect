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
    const markers = properties.map(p => `${p.latitude},${p.longitude}`).join('|');
    const url = `https://www.google.com/maps/search/?api=1&query=${centerLat},${centerLng}`;
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
    <Card className="overflow-hidden border-gray-200">
      {/* Map Preview - Using Google Static Maps or placeholder */}
      <div 
        className="h-96 bg-gradient-to-br from-blue-100 to-blue-50 relative cursor-pointer group"
        onClick={openMapView}
      >
        {/* Embedded Google Maps using iframe */}
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${centerLat},${centerLng}&zoom=14`}
        />
        
        {/* Overlay with property count */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge className="bg-white text-gray-900 shadow-lg">
            <MapPin className="w-3 h-3 mr-1" />
            {properties.length} properties
          </Badge>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            <span className="font-semibold">Open in Google Maps</span>
          </div>
        </div>
      </div>

      {/* Property List */}
      <div className="p-4 max-h-96 overflow-y-auto">
        <h4 className="font-semibold text-gray-900 mb-3">Property Locations</h4>
        <div className="space-y-3">
          {properties.map((property, index) => (
            <div 
              key={property.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => {
                const url = `https://www.google.com/maps/search/?api=1&query=${property.latitude},${property.longitude}`;
                window.open(url, '_blank');
              }}
            >
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">
                  {property.address.split(",")[0]}
                </div>
                <div className="text-sm text-red-600 font-bold">
                  {formatPrice(property.price)}
                </div>
                <div className="text-xs text-gray-500">
                  {property.beds} bd • {property.baths} ba • {property.sqft.toLocaleString()} sqft
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default InteractivePropertyMap;
