import { useEffect, useMemo, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

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
  colonie: { lat: 42.7179, lng: -73.834, zoom: 13 },
  cohoes: { lat: 42.7743, lng: -73.7001, zoom: 14 },
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

const maskAddress = (address: string) => address.replace(/^\d+\s*/, "");

const createPinIcon = (highlighted = false) => {
  const size = highlighted ? 18 : 12;
  const anchor = size / 2;

  return L.divIcon({
    className: highlighted ? "rental-map-pin-highlight" : "rental-map-pin",
    html: `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:${highlighted ? "hsl(var(--accent))" : "hsl(var(--foreground))"};border:2px solid hsl(var(--background));box-shadow:0 2px 10px rgba(15,23,42,0.22);"></div>`,
    iconSize: [size, size],
    iconAnchor: [anchor, anchor],
    popupAnchor: [0, -anchor],
  });
};

const createPopupContent = (rental: RentalPin, onPinClick: (id: string) => void) => {
  const wrapper = document.createElement("div");
  wrapper.style.minWidth = "160px";
  wrapper.style.fontSize = "12px";
  wrapper.style.lineHeight = "1.4";

  const title = document.createElement("p");
  title.textContent = maskAddress(rental.address);
  title.style.margin = "0 0 4px";
  title.style.fontSize = "14px";
  title.style.fontWeight = "600";
  title.style.color = "hsl(var(--foreground))";

  const price = document.createElement("p");
  price.textContent = `${formatPrice(rental.rent_price)}/mo`;
  price.style.margin = "0 0 4px";
  price.style.fontSize = "16px";
  price.style.fontWeight = "700";
  price.style.color = "hsl(var(--foreground))";

  const meta = document.createElement("p");
  meta.textContent = `${rental.bedrooms} bed · ${rental.bathrooms} bath`;
  meta.style.margin = "0";
  meta.style.color = "hsl(var(--muted-foreground))";

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "View Details ↓";
  button.style.display = "block";
  button.style.marginTop = "8px";
  button.style.padding = "0";
  button.style.border = "0";
  button.style.background = "transparent";
  button.style.color = "hsl(var(--accent))";
  button.style.fontWeight = "600";
  button.style.cursor = "pointer";
  button.addEventListener("click", (event) => {
    event.preventDefault();
    onPinClick(rental.id);
  });

  wrapper.append(title, price, meta, button);
  L.DomEvent.disableClickPropagation(wrapper);

  return wrapper;
};

const RentalMap = ({ rentals, activeFilter, highlightedId, onPinClick }: RentalMapProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const target = townCenters[activeFilter] || townCenters.all;

  const activeIcon = useMemo(() => createPinIcon(false), []);
  const highlightIcon = useMemo(() => createPinIcon(true), []);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    map.setView([townCenters.all.lat, townCenters.all.lng], townCenters.all.zoom);
    markersLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    const timer = window.setTimeout(() => {
      map.invalidateSize();
    }, 0);

    return () => {
      window.clearTimeout(timer);
      markersLayerRef.current?.clearLayers();
      markersLayerRef.current?.remove();
      map.remove();
      markersLayerRef.current = null;
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.flyTo([target.lat, target.lng], target.zoom, { duration: 1.2 });
  }, [target.lat, target.lng, target.zoom]);

  useEffect(() => {
    const map = mapRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();
    const markers = new Map<string, L.Marker>();

    rentals.forEach((rental) => {
      const marker = L.marker([rental.lat, rental.lng], {
        icon: highlightedId === rental.id ? highlightIcon : activeIcon,
        title: maskAddress(rental.address),
      });

      marker.on("click", () => onPinClick(rental.id));
      marker.bindPopup(createPopupContent(rental, onPinClick), {
        closeButton: false,
        offset: [0, -8],
      });
      marker.addTo(markersLayer);
      markers.set(rental.id, marker);
    });

    if (highlightedId) {
      const highlightedMarker = markers.get(highlightedId);
      if (highlightedMarker) {
        highlightedMarker.openPopup();
        map.panTo(highlightedMarker.getLatLng(), { animate: true });
      }
    }
  }, [rentals, highlightedId, activeIcon, highlightIcon, onPinClick]);

  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-background">
      <div ref={containerRef} className="h-[250px] md:h-[400px] w-full" />
    </div>
  );
};

export default RentalMap;
