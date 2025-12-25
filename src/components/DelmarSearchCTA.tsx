import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const DelmarSearchCTA = () => {
  const neighborhoods = [
    { name: "Bethlehem", path: "/communities" },
    { name: "Glenmont", path: "/communities" },
    { name: "Slingerlands", path: "/communities" },
  ];

  return (
    <section className="py-12 px-6 bg-gradient-to-br from-red-50 to-red-100">
      <div className="max-w-5xl mx-auto">
        <Card className="p-8 md:p-12">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Search Delmar Homes for Sale
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              Filter by price, bedrooms, and location to find your perfect home
            </p>
          </div>

          {/* Lead Capture CTA - Above Embed */}
          <div className="text-center mb-6 p-6 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-muted-foreground mb-4">
              Want the fastest answer? Paste any address and I'll send a free intelligence report.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3"
              asChild
            >
              <Link to="/#due-diligence">Get My Free Intelligence Report</Link>
            </Button>
          </div>

          {/* RE/MAX Search Widget - Responsive with branded styling */}
          <div className="w-full mx-auto">
            <iframe
              className="w-full h-[640px] md:h-[720px] rounded-[16px] border-2 border-primary shadow-lg"
              src="https://scottalvarez.remax.com/embedsmall.php"
              title="Search Delmar Properties"
              loading="lazy"
            />
          </div>

          <div className="text-center mt-8">
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
