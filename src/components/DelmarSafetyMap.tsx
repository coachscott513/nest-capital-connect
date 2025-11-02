import { Card } from "@/components/ui/card";
import { Shield, CheckCircle } from "lucide-react";

const DelmarSafetyMap = () => {
  const safetyStats = [
    { label: "Overall Safety Rating", value: "A+", color: "text-green-600" },
    { label: "Crime Rate vs NY Average", value: "-65%", color: "text-green-600" },
    { label: "Violent Crime", value: "Very Low", color: "text-green-600" },
    { label: "Property Crime", value: "Very Low", color: "text-green-600" },
  ];

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-green-600" />
            <h2 className="text-4xl font-bold text-foreground">
              Crime & Safety Overview
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Delmar maintains one of the Capital Region's highest safety ratings
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {safetyStats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                  <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="w-full h-[400px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23591.44!2d-73.823115!3d42.622707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89de0d0d2b0b0b0b%3A0x0!2sDelmar%2C+NY!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Delmar Safety Heatmap"
          />
        </Card>
      </div>
    </section>
  );
};

export default DelmarSafetyMap;
