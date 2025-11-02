import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Shield, Building2, Car, TrendingUp, CloudRain } from "lucide-react";

const DelmarInteractiveMap = () => {
  const [activeLayers, setActiveLayers] = useState<string[]>(["schools", "businesses"]);

  const layers = [
    { id: "schools", label: "Schools & Districts", icon: GraduationCap, color: "bg-blue-600" },
    { id: "safety", label: "Crime/Safety", icon: Shield, color: "bg-green-600" },
    { id: "businesses", label: "Nearby Businesses", icon: Building2, color: "bg-purple-600" },
    { id: "commute", label: "Commute Times", icon: Car, color: "bg-orange-600" },
    { id: "investment", label: "Investment Heatmap", icon: TrendingUp, color: "bg-red-600" },
    { id: "weather", label: "Flood/Weather", icon: CloudRain, color: "bg-cyan-600" },
  ];

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Interactive Neighborhood Map
          </h2>
          <p className="text-lg text-muted-foreground">
            Toggle layers to explore schools, businesses, safety, and more
          </p>
        </div>

        {/* Layer Toggle Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {layers.map((layer) => {
            const Icon = layer.icon;
            const isActive = activeLayers.includes(layer.id);
            return (
              <Button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                variant={isActive ? "default" : "outline"}
                className={`${isActive ? layer.color : ''} transition-all duration-300`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {layer.label}
              </Button>
            );
          })}
        </div>

        {/* Map Container */}
        <Card className="w-full h-[600px] overflow-hidden">
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

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Active Layers:</strong> {activeLayers.map(id => layers.find(l => l.id === id)?.label).join(", ")}
          </p>
          <p className="text-xs text-muted-foreground">
            Toggle buttons above to view different neighborhood insights. The map shows Delmar's prime location near Four Corners, 
            with easy access to top-rated schools, shopping, dining, and major commuter routes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DelmarInteractiveMap;
