import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Shield, Building2, Car, TrendingUp, CloudRain, MapPin, Clock, DollarSign } from "lucide-react";

interface DelmarInteractiveMapProps {
  townName?: string;
  townSlug?: string;
  lat?: number;
  lng?: number;
}

const DelmarInteractiveMap = ({ 
  townName = "Delmar", 
  townSlug = "delmar",
  lat = 42.622707, 
  lng = -73.823115 
}: DelmarInteractiveMapProps) => {
  const [activeLayer, setActiveLayer] = useState<string>("schools");

  const layers = [
    { id: "schools", label: "Schools", icon: GraduationCap, color: "bg-primary" },
    { id: "safety", label: "Safety", icon: Shield, color: "bg-emerald-600" },
    { id: "businesses", label: "Businesses", icon: Building2, color: "bg-purple-600" },
    { id: "commute", label: "Commute", icon: Car, color: "bg-amber-600" },
    { id: "investment", label: "Investment", icon: TrendingUp, color: "bg-red-600" },
    { id: "weather", label: "Flood Risk", icon: CloudRain, color: "bg-cyan-600" },
  ];

  const layerContent: Record<string, { title: string; items: { name: string; detail: string; distance: string; icon: typeof GraduationCap }[] }> = {
    schools: {
      title: "Top-Rated Schools & Districts",
      items: [
        { name: "Eagle Elementary School", detail: "Rating: 8/10", distance: "0.7 mi", icon: GraduationCap },
        { name: "Bethlehem Central Middle", detail: "Rating: 9/10", distance: "1.4 mi", icon: GraduationCap },
        { name: "Bethlehem Central High", detail: "Rating: 9/10", distance: "1.6 mi", icon: GraduationCap },
        { name: "District Average", detail: "9/10 Overall Rating", distance: "", icon: GraduationCap },
      ]
    },
    safety: {
      title: "Crime & Safety Statistics",
      items: [
        { name: "Overall Safety Rating", detail: "A+ Grade", distance: "Top 10% in NY", icon: Shield },
        { name: "Violent Crime", detail: "Very Low", distance: "-72% vs Albany County", icon: Shield },
        { name: "Property Crime", detail: "Very Low", distance: "-58% vs County Average", icon: Shield },
        { name: "Police Response", detail: "Excellent", distance: "< 5 min average", icon: Shield },
      ]
    },
    businesses: {
      title: "Nearby Businesses & Amenities",
      items: [
        { name: "Delaware Plaza", detail: "Shopping Center", distance: "0.4 mi", icon: Building2 },
        { name: "Four Corners", detail: "Restaurants & Cafes", distance: "0.3 mi", icon: Building2 },
        { name: "Price Chopper", detail: "Grocery", distance: "0.8 mi", icon: Building2 },
        { name: "Elm Avenue Park", detail: "Recreation", distance: "0.5 mi", icon: Building2 },
      ]
    },
    commute: {
      title: "Commute Times & Transportation",
      items: [
        { name: "Downtown Albany", detail: "15 min drive", distance: "8 miles", icon: Car },
        { name: "Albany Airport", detail: "20 min drive", distance: "12 miles", icon: Car },
        { name: "SUNY Albany", detail: "12 min drive", distance: "6 miles", icon: Car },
        { name: "I-87 Access", detail: "5 min drive", distance: "2 miles", icon: Car },
      ]
    },
    investment: {
      title: "Investment Market Data",
      items: [
        { name: "Median Price/SqFt", detail: "$221", distance: "+8% YoY", icon: DollarSign },
        { name: "Average Appreciation", detail: "5.2% annually", distance: "Last 5 years", icon: TrendingUp },
        { name: "Days on Market", detail: "23 days", distance: "Fast-moving", icon: Clock },
        { name: "Rental Yield", detail: "4.2%", distance: "Strong demand", icon: TrendingUp },
      ]
    },
    weather: {
      title: "Flood Risk & Weather Data",
      items: [
        { name: "Flood Risk", detail: "Minimal", distance: "Zone X", icon: CloudRain },
        { name: "Elevation", detail: "300-400 ft", distance: "Above flood plain", icon: MapPin },
        { name: "Weather Rating", detail: "Low Risk", distance: "No major concerns", icon: CloudRain },
        { name: "Insurance", detail: "Standard Rates", distance: "No flood insurance required", icon: Shield },
      ]
    },
  };

  // Monochrome/Silver Google Maps style
  const mapStyle = "&styles=feature:all|element:geometry|color:0x1a1a2e&styles=feature:all|element:labels.text.fill|color:0x8892a4&styles=feature:all|element:labels.text.stroke|color:0x1a1a2e&styles=feature:water|element:geometry|color:0x0d1b2a&styles=feature:road|element:geometry|color:0x2a2a4a";

  return (
    <section className="py-16 px-[5%] bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-2">Neighborhood Intel</p>
          <h2 className="text-3xl md:text-4xl font-extralight text-foreground tracking-tight mb-4">
            Interactive {townName} Map
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore schools, businesses, safety, commute times, and more
          </p>
        </div>

        {/* Layer Toggle Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {layers.map((layer) => {
            const Icon = layer.icon;
            const isActive = activeLayer === layer.id;
            return (
              <Button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={`rounded-full ${isActive ? 'bg-primary text-primary-foreground' : ''}`}
              >
                <Icon className="w-4 h-4 mr-1.5" />
                {layer.label}
              </Button>
            );
          })}
        </div>

        {/* Map + Data side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Map — 3 columns */}
          <Card className="lg:col-span-3 overflow-hidden border-0">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d23591!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus${mapStyle}`}
              width="100%"
              height="450"
              style={{ border: 0, filter: "saturate(0.6) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${townName} NY Interactive Map`}
            />
          </Card>

          {/* Data Panel — 2 columns */}
          <Card className="lg:col-span-2 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                {(() => {
                  const layer = layers.find(l => l.id === activeLayer);
                  if (layer) {
                    const Icon = layer.icon;
                    return (
                      <>
                        <Icon className="w-5 h-5 text-primary" />
                        {layerContent[activeLayer].title}
                      </>
                    );
                  }
                  return null;
                })()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {layerContent[activeLayer].items.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="mt-0.5">
                        <ItemIcon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.detail}</div>
                        {item.distance && (
                          <div className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {item.distance}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DelmarInteractiveMap;
