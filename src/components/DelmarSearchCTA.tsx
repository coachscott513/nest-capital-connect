import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import PropertySearchBar from "@/components/PropertySearchBar";

const DelmarSearchCTA = () => {
  const navigate = useNavigate();
  
  const neighborhoods = [
    { name: "Bethlehem", path: "/communities" },
    { name: "Glenmont", path: "/communities" },
    { name: "Slingerlands", path: "/communities" },
  ];

  const handleSearch = (filters: { priceRange?: string; beds?: string; keyword?: string }) => {
    // Navigate to Delmar homes for sale page with filters applied
    navigate('/delmar-homes-for-sale', { state: { filters } });
  };

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

          <div className="mb-8">
            <PropertySearchBar onSearch={handleSearch} />
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
