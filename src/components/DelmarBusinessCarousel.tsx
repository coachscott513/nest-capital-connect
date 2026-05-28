import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useDbBusinesses } from "@/hooks/useDbBusinesses";

const DelmarBusinessCarousel = () => {
  const { rows } = useDbBusinesses({ townSlug: "delmar", limit: 24 });
  const businesses = rows.slice(0, 12);

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-foreground mb-4">

            Local Businesses & Amenities
          </h2>
          <p className="text-lg text-muted-foreground">
            Live Delmar restaurants, fitness centers, shopping, and services from the regional directory
          </p>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-6 pb-4">
            {businesses.map((business) => (
              <Card key={business.slug} className="w-[300px] flex-shrink-0 hover:shadow-xl transition-shadow overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center bg-gradient-to-br from-primary/30 to-card"
                  style={business.image ? { backgroundImage: `url(${business.image})` } : undefined}
                />
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 truncate">{business.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm px-2 py-1 bg-primary/10 rounded text-primary font-medium">
                      {business.category}
                    </span>
                    {business.verified && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">Member</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{business.townLabel ?? "Delmar"}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default DelmarBusinessCarousel;