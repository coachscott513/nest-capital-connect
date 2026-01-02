import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { 
  Home, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Users, 
  Calendar, 
  MapPin,
  GraduationCap,
  School,
  CheckCircle2,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { allCityRentalData, CityRentalData } from "@/data/rentalData";
import NotFound from "./NotFound";

const getTrendIcon = (direction: "up" | "down" | "stable") => {
  switch (direction) {
    case "up": return <TrendingUp className="w-4 h-4 text-amber-600" />;
    case "down": return <TrendingDown className="w-4 h-4 text-green-600" />;
    case "stable": return <Minus className="w-4 h-4 text-muted-foreground" />;
  }
};

const CityRentalPage = () => {
  const { city } = useParams<{ city: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [city]);

  const data: CityRentalData | undefined = city ? allCityRentalData[city] : undefined;

  if (!data) {
    return <NotFound />;
  }

  const marketTiles = [
    { label: "Typical Rent Range", value: data.marketSnapshot.typicalRentRange, icon: Home, isTrend: false },
    { label: "Most Common Units", value: data.marketSnapshot.mostCommonUnits, icon: Home, isTrend: false },
    { label: "Avg Days on Market", value: data.marketSnapshot.avgDaysOnMarket, icon: Clock, isTrend: false },
    { label: "Rented Under 30 Days", value: data.marketSnapshot.percentRentedUnder30Days, icon: Calendar, isTrend: false },
    { label: "Seasonal Trend", value: data.marketSnapshot.seasonalTrend, icon: null, isTrend: true },
    { label: "Student vs Professional", value: data.marketSnapshot.studentVsNonStudent, icon: Users, isTrend: false },
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>{data.cityName} Rentals — Apartments, Houses & Student Housing | Capital District Nest</title>
        <meta name="description" content={`Find verified rentals in ${data.cityName}, NY. ${data.tagline} Search by school district, college, or neighborhood.`} />
        <meta name="keywords" content={`${data.cityName.toLowerCase()} ny rentals, ${data.cityName.toLowerCase()} apartments, ${data.cityName.toLowerCase()} student housing, ${data.cityName.toLowerCase()} houses for rent`} />
        <link rel="canonical" href={`https://capitaldistrictnest.com/rentals/${data.slug}`} />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="py-16 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <Link to="/rentals" className="text-sm text-primary hover:underline mb-4 inline-block">
              ← All Rentals
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              {data.cityName} Rentals
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {data.tagline}
            </p>
          </div>
        </section>

        {/* Market Snapshot */}
        <section className="py-12 px-4 bg-card border-b border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6">Rental Market Snapshot</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {marketTiles.map((tile) => {
                const IconComponent = tile.icon;
                return (
                  <div key={tile.label} className="bg-background border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {tile.isTrend ? getTrendIcon(data.marketSnapshot.seasonalTrendDirection) : IconComponent && <IconComponent className="w-4 h-4 text-muted-foreground" />}
                      <span className="text-xs text-muted-foreground">{tile.label}</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{tile.value}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Updated from MLS & local market data.
            </p>
          </div>
        </section>

        {/* Search CTAs */}
        <section className="py-12 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8" asChild>
                <a href={data.mlsSearchUrl} target="_blank" rel="noopener noreferrer">
                  View Available Rentals
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                List a Rental
              </Button>
            </div>
          </div>
        </section>

        {/* Search by Neighborhood */}
        <section className="py-12 px-4 bg-card border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Search by Neighborhood</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.neighborhoods.map((neighborhood) => (
                <span 
                  key={neighborhood}
                  className="px-4 py-2 bg-background border border-border rounded-full text-sm text-foreground hover:border-primary hover:text-primary cursor-pointer transition-colors"
                >
                  {neighborhood}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Search by School District */}
        <section className="py-12 px-4 bg-background border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <School className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Search by School District</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {data.schoolDistricts.map((district) => (
                <div 
                  key={district.name}
                  className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <h3 className="font-semibold text-foreground mb-1">{district.name}</h3>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{district.rating}</span>
                    <span>Availability: {district.rentalAvailability}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Student & Faculty Housing */}
        <section className="py-12 px-4 bg-card border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Student & Faculty Housing</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              {data.cityName} is home to several colleges and universities. Here's what you need to know about renting nearby.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {data.colleges.map((college) => (
                <div 
                  key={college.name}
                  className="bg-background border border-border rounded-xl p-5"
                >
                  <h3 className="font-semibold text-foreground mb-1">{college.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{college.type}</p>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Typical rent:</span> <span className="text-foreground font-medium">{college.typicalRentRange}</span></p>
                    <p><span className="text-muted-foreground">Best time to secure:</span> <span className="text-foreground font-medium">{college.bestMonths}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Better Than Craigslist */}
        <section className="py-12 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6">Why This Is Better Than Craigslist</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {data.whyBetterThanCraigslist.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* List a Rental CTA */}
        <section className="py-12 px-4 bg-card border-b border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-bold text-foreground mb-3">Have a Rental in {data.cityName}?</h2>
            <p className="text-muted-foreground mb-6">
              Local visibility. Real inquiries. No spam.
            </p>
            <Button size="lg" className="rounded-full px-8">
              List a Rental
            </Button>
          </div>
        </section>

        {/* Bridge to First-Time Buyers */}
        <section className="py-10 px-4 bg-background">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground mb-4">
              Many renters become buyers sooner than they expect.
            </p>
            <Link 
              to="/first-time-buyers" 
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Learn about first-time buyer programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default CityRentalPage;
