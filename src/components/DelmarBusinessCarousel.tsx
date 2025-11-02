import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const DelmarBusinessCarousel = () => {
  const businesses = [
    {
      name: "Delmar Marketplace",
      category: "Shopping",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      distance: "0.5 mi"
    },
    {
      name: "The Perfect Blend",
      category: "Restaurant",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      distance: "0.3 mi"
    },
    {
      name: "Delmar Fitness Center",
      category: "Fitness",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
      distance: "0.8 mi"
    },
    {
      name: "Four Corners Bistro",
      category: "Restaurant",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
      distance: "0.2 mi"
    },
    {
      name: "Delmar Dental Care",
      category: "Services",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400",
      distance: "0.6 mi"
    },
    {
      name: "Price Chopper Plaza",
      category: "Shopping",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400",
      distance: "0.9 mi"
    },
  ];

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Local Businesses & Amenities
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover restaurants, fitness centers, shopping, and services nearby
          </p>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-6 pb-4">
            {businesses.map((business, index) => (
              <Card key={index} className="w-[300px] flex-shrink-0 hover:shadow-xl transition-shadow">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${business.image})` }}
                />
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{business.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm px-2 py-1 bg-primary/10 rounded text-primary font-medium">
                      {business.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{business.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{business.distance}</span>
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
