import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Shield, Building2, Car, TrendingUp, CloudRain, MapPin, Clock, DollarSign } from "lucide-react";

const DelmarInteractiveMap = () => {
  const [activeLayer, setActiveLayer] = useState<string>("schools");

  const layers = [
    { id: "schools", label: "Schools & Districts", icon: GraduationCap, color: "bg-blue-600" },
    { id: "safety", label: "Crime/Safety", icon: Shield, color: "bg-green-600" },
    { id: "businesses", label: "Nearby Businesses", icon: Building2, color: "bg-purple-600" },
    { id: "commute", label: "Commute Times", icon: Car, color: "bg-orange-600" },
    { id: "investment", label: "Investment Heatmap", icon: TrendingUp, color: "bg-red-600" },
    { id: "weather", label: "Flood/Weather", icon: CloudRain, color: "bg-cyan-600" },
  ];

  const layerContent = {
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

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Interactive Neighborhood Insights
          </h2>
          <p className="text-lg text-muted-foreground">
            Click below to explore schools, businesses, safety, commute times, and more
          </p>
        </div>

        {/* Layer Toggle Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {layers.map((layer) => {
            const Icon = layer.icon;
            const isActive = activeLayer === layer.id;
            return (
              <Button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                variant={isActive ? "default" : "outline"}
                className={`${isActive ? layer.color + ' text-white' : ''} transition-all duration-300`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {layer.label}
              </Button>
            );
          })}
        </div>

        {/* Map Container */}
        <Card className="w-full h-[500px] overflow-hidden mb-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23591.44!2d-73.823115!3d42.622707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89de0d0d2b0b0b0b%3A0x0!2sDelmar%2C+NY!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Delmar NY Interactive Map"
          />
        </Card>

        {/* Layer Content Cards */}
        <Card className="border-2">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-2xl flex items-center gap-2">
              {(() => {
                const layer = layers.find(l => l.id === activeLayer);
                if (layer) {
                  const Icon = layer.icon;
                  return (
                    <>
                      <Icon className="w-6 h-6" />
                      {layerContent[activeLayer as keyof typeof layerContent].title}
                    </>
                  );
                }
              })()}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {layerContent[activeLayer as keyof typeof layerContent].items.map((item, index) => {
                const ItemIcon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="mt-1">
                      <ItemIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.detail}</div>
                      {item.distance && (
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
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
    </section>
  );
};

export default DelmarInteractiveMap;
