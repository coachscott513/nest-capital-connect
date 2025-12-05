import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import MainLayout from "@/components/MainLayout";
import { Building2, MapPin } from "lucide-react";

const HomesForSale = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cities = [
    {
      name: "Albany",
      slug: "albany",
      description: "New York's historic capital city with diverse neighborhoods and strong investment potential"
    },
    {
      name: "Troy",
      slug: "troy",
      description: "Victorian architecture and riverside charm with a thriving arts and culture scene"
    },
    {
      name: "Schenectady",
      slug: "schenectady",
      description: "Affordable housing options with growing downtown revitalization and excellent schools"
    },
    {
      name: "Saratoga Springs",
      slug: "saratoga-springs",
      description: "Upscale living with world-class horse racing, spas, and historic downtown"
    }
  ];

  return (
    <MainLayout>
      <SEOHead
        title="Capital District Homes for Sale | Albany, Troy, Schenectady & Saratoga Springs"
        description="Browse homes for sale in the Capital District. Search properties in Albany, Troy, Schenectady, and Saratoga Springs NY. Local expertise, better than Zillow."
        keywords="Capital District homes for sale, Albany NY real estate, Troy NY homes, Schenectady NY properties, Saratoga Springs NY real estate, homes for sale near me"
        canonical="https://capitaldistrictnest.com/homes-for-sale"
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-background py-16 px-4 border-b border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Capital District Homes for Sale
            </h1>
            <p className="text-xl text-muted-foreground">
              Search by city or neighborhood - Your local alternative to Zillow
            </p>
          </div>
        </section>

        {/* Cities Section */}
        <section className="py-16 px-4 bg-card border-b border-border">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-4 text-foreground">Search by City</h2>
              <p className="text-lg text-muted-foreground">
                Explore homes for sale in the Capital District's major cities
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {cities.map((city) => (
                <Link 
                  key={city.slug} 
                  to={`/homes-for-sale/${city.slug}`}
                  className="block transition-transform hover:scale-105"
                >
                  <Card className="h-full bg-background border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-2xl text-foreground">{city.name} Homes for Sale</CardTitle>
                      <CardDescription className="text-base text-muted-foreground">{city.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-primary font-semibold">View {city.name} Properties →</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods Coming Soon Section */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-4 text-foreground">Browse by Neighborhood</h2>
              <p className="text-lg text-muted-foreground">
                Hyperlocal market insights and listings for Capital District neighborhoods
              </p>
            </div>

            <Card className="max-w-2xl mx-auto bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Coming Soon</CardTitle>
                <CardDescription className="text-muted-foreground">
                  We're adding dedicated pages for popular neighborhoods including Pine Hills, Center Square, 
                  Downtown Troy, Stockade, and more. Each page will feature neighborhood-specific market data 
                  and property listings.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default HomesForSale;
