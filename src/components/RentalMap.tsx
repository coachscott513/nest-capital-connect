import { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface RentalPin {
  id: string;
  lat: number;
  lng: number;
  address: string;
  rent_price: number;
  bedrooms: number;
  bathrooms: number;
  town_slug: string;
}

interface RentalMapProps {
  rentals: RentalPin[];
  activeFilter: string;
  highlightedId: string | null;
  onPinClick: (id: string) => void;
}

const townCenters: Record<string, { lat: number; lng: number; zoom: number }> = {
  all: { lat: 42.6526, lng: -73.7562, zoom: 10 },
  albany: { lat: 42.6526, lng: -73.7562, zoom: 13 },
  troy: { lat: 42.7284, lng: -73.6918, zoom: 13 },
  schenectady: { lat: 42.8142, lng: -73.9396, zoom: 13 },
  "saratoga-springs": { lat: 43.0831, lng: -73.7846, zoom: 13 },
  colonie: { lat: 42.7179, lng: -73.8340, zoom: 13 },
  cohoes: { lat: 42.7743, lng: -73.7001, zoom: 14 },
};

const MapController = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

const maskAddress = (address: string) => address.replace(/^\d+\s*/, "");

const RentalMap = ({ rentals, activeFilter, highlightedId, onPinClick }: RentalMapProps) => {
  const target = townCenters[activeFilter] || townCenters.all;

  const activeIcon = useMemo(
    () =>
      new L.DivIcon({
        className: "rental-map-pin",
        html: `<div style="width:12px;height:12px;border-radius:50%;background:hsl(185,55%,42%);border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      }),
    []
  );

  const highlightIcon = useMemo(
    () =>
      new L.DivIcon({
        className: "rental-map-pin-highlight",
        html: `<div style="width:18px;height:18px;border-radius:50%;background:hsl(38,92%,50%);border:2px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.4);"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
    []
  );

  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
      <MapContainer
        center={[target.lat, target.lng]}
        zoom={target.zoom}
        style={{ height: "100%", width: "100%" }}
        className="h-[250px] md:h-[400px] z-0"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapController center={[target.lat, target.lng]} zoom={target.zoom} />
        {rentals.map((r) => (
          <Marker
            key={r.id}
            position={[r.lat, r.lng]}
            icon={highlightedId === r.id ? highlightIcon : activeIcon}
            eventHandlers={{ click: () => onPinClick(r.id) }}
          >
            <Popup>
              <div className="text-xs space-y-1 min-w-[160px]">
                <p className="font-semibold text-sm">{maskAddress(r.address)}</p>
                <p className="text-base font-bold">{formatPrice(r.rent_price)}/mo</p>
                <p className="text-muted-foreground">{r.bedrooms} bed · {r.bathrooms} bath</p>
                <button
                  onClick={() => onPinClick(r.id)}
                  className="text-accent font-medium hover:underline mt-1 block"
                >
                  View Details ↓
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RentalMap;
