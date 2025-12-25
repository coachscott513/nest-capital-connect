import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Building2, TrendingUp, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MarketMapSection = () => {
  const counties = [
    {
      name: "Albany County",
      slug: "/albany-real-estate",
      description: "Government hub. Healthcare anchor. Stable demand for rentals and investment properties.",
      stats: {
        medianPrice: "$275K",
        trend: "+4.2%",
      },
      highlights: ["State capital", "Medical centers", "University district"],
    },
    {
      name: "Schenectady County",
      slug: "/schenectady-county-real-estate",
      description: "Tech resurgence. Affordable entry points. Strong cash flow potential in multi-family.",
      stats: {
        medianPrice: "$195K",
        trend: "+6.1%",
      },
      highlights: ["GE legacy", "Casino district", "Affordable duplexes"],
    },
    {
      name: "Rensselaer County (Troy)",
      slug: "/troy-real-estate",
      description: "College town energy. Downtown revival. RPI students drive rental demand.",
      stats: {
        medianPrice: "$215K",
        trend: "+5.3%",
      },
      highlights: ["RPI campus", "Historic downtown", "Waterfront redevelopment"],
    },
    {
      name: "Saratoga County",
      slug: "/saratoga-real-estate",
      description: "Affluent suburbs. Appreciation play. Premium rents and strong schools.",
      stats: {
        medianPrice: "$425K",
        trend: "+3.8%",
      },
      highlights: ["Race track", "Tech park", "Top schools"],
    },
  ];

  return (
    <section id="market-map" className="px-[5%] py-16 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
            <MapPin className="w-4 h-4" />
            EXPLORE THE CAPITAL DISTRICT
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Market Intelligence by County
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each county has its own personality, price point, and investment opportunity. Find yours.
          </p>
        </div>

        {/* County Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {counties.map((county) => (
            <Link key={county.name} to={county.slug} className="group">
              <Card className="h-full hover:border-primary hover:shadow-lg transition-all overflow-hidden">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {county.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-muted-foreground">
                          Median: <strong className="text-foreground">{county.stats.medianPrice}</strong>
                        </span>
                        <span className="text-sm text-green-500 font-semibold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {county.stats.trend} YoY
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {county.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {county.highlights.map((highlight) => (
                      <span 
                        key={highlight} 
                        className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              to="/homes-for-sale"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full font-semibold text-sm hover:scale-105 transition-transform"
            >
              <Home className="w-4 h-4" />
              All Homes for Sale
            </Link>
            <Link 
              to="/investment-properties"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:scale-105 transition-transform"
            >
              <Building2 className="w-4 h-4" />
              Investment Properties
            </Link>
            <Link 
              to="/markets"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground rounded-full font-semibold text-sm hover:bg-muted transition-colors"
            >
              <MapPin className="w-4 h-4" />
              All Markets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketMapSection;
