import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const FeaturedAreasSection = () => {
  const cities = [
    {
      name: "Albany",
      slug: "albany",
      description: "New York's capital with diverse neighborhoods and strong investment potential"
    },
    {
      name: "Troy",
      slug: "troy",
      description: "Victorian architecture and waterfront charm along the Hudson River"
    },
    {
      name: "Schenectady",
      slug: "schenectady",
      description: "Affordable homes with excellent schools and downtown revitalization"
    },
    {
      name: "Saratoga Springs",
      slug: "saratoga-springs",
      description: "Luxury market with world-class amenities and cultural events"
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Search Homes by City
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore homes for sale across the Capital District with expert local market insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {cities.map((city) => (
            <Link 
              key={city.slug} 
              to={`/towns/${city.slug}`}
              className="block transition-transform hover:scale-105"
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">{city.name} Homes for Sale</CardTitle>
                  <CardDescription className="text-base">{city.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-primary font-semibold">Browse {city.name} Properties →</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/communities"
            className="inline-block text-lg font-semibold text-primary hover:underline"
          >
            View All Cities & Neighborhoods →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAreasSection;
