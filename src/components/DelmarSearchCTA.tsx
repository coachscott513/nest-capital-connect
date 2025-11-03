import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import PropertySearchDialog from "@/components/PropertySearchDialog";

const DelmarSearchCTA = () => {
  const neighborhoods = [
    { name: "Bethlehem", path: "/communities" },
    { name: "Glenmont", path: "/communities" },
    { name: "Slingerlands", path: "/communities" },
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-red-50 to-red-100">
      <div className="max-w-5xl mx-auto">
        <Card className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Search Delmar Homes for Sale
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Filter by price, bedrooms, and location to find your perfect home
            </p>
          </div>

          {/* Mobile: Dialog Search */}
          <div className="md:hidden w-full max-w-[960px] mx-auto mb-8">
            <PropertySearchDialog>
              <Button size="lg" className="w-full">
                Open Property Search
              </Button>
            </PropertySearchDialog>
          </div>

          {/* Desktop: Embedded Search */}
          <div className="hidden md:block w-full max-w-[960px] mx-auto mb-8">
            <iframe 
              className="w-full h-[300px]"
              src="https://scottalvarez.remax.com/wide.php" 
              title="Property Search"
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Explore similar communities:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {neighborhoods.map((neighborhood, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  asChild
                >
                  <Link to={neighborhood.path}>
                    {neighborhood.name} Homes
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DelmarSearchCTA;
