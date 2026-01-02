import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { Home, School, GraduationCap, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const cities = [
  { name: "Albany", slug: "albany", units: "1,200+", description: "State capital with diverse rental options" },
  { name: "Schenectady", slug: "schenectady", units: "600+", description: "Affordable rents in revitalized downtown" },
  { name: "Troy", slug: "troy", units: "800+", description: "Historic architecture near RPI & arts scene" },
];

const searchOptions = [
  { icon: MapPin, label: "By Neighborhood", description: "Downtown, suburbs, walkable areas" },
  { icon: School, label: "By School District", description: "Bethlehem, Niskayuna, Guilderland" },
  { icon: GraduationCap, label: "Near Colleges", description: "UAlbany, RPI, Union, Siena" },
  { icon: Home, label: "By Unit Type", description: "Studios, 2BR, family homes" },
];

const whyBetter = [
  "No scam listings — every property is verified",
  "Real landlord contact information",
  "Local market knowledge and pricing context",
  "No repost spam or ghost listings",
  "Human follow-up if you have questions",
];

const RentalsHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <Helmet>
        <title>Capital District Rentals — Albany, Schenectady, Troy | Capital District Nest</title>
        <meta name="description" content="Find verified rental properties in Albany, Schenectady, and Troy. Search by school district, college proximity, or neighborhood. No noise, no scams." />
        <meta name="keywords" content="albany ny rentals, schenectady apartments, troy ny rentals, capital district rentals, student housing albany, apartments near RPI, school district rentals" />
        <link rel="canonical" href="https://capitaldistrictnest.com/rentals" />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">Capital District Nest</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Rentals — Explained
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Local rentals. Real information. No noise.
            </p>
          </div>
        </section>

        {/* City Cards */}
        <section className="py-16 px-4 bg-card">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Browse by City</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/rentals/${city.slug}`}
                  className="group bg-background border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {city.name}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{city.description}</p>
                  <p className="text-xs text-muted-foreground/70">{city.units} rentals tracked</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Search the Right Way */}
        <section className="py-16 px-4 bg-background border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-3">Search Rentals the Right Way</h2>
              <p className="text-muted-foreground">Find housing that actually fits your life — not just your budget.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchOptions.map((option) => (
                <div key={option.label} className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{option.label}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Better Than Craigslist */}
        <section className="py-16 px-4 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-3">Why This Is Better Than Craigslist</h2>
              <p className="text-muted-foreground">Craigslist has never fixed the rental experience. We have.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {whyBetter.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-background border border-border rounded-lg p-4">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* List a Rental CTA */}
        <section className="py-16 px-4 bg-background border-t border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Have a Rental Property?</h2>
            <p className="text-muted-foreground mb-6">
              List it here for $50. Local visibility. Real inquiries. No spam.
            </p>
            <Button size="lg" className="rounded-full px-8">
              List a Rental — $50
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Curated local marketplace, not a classifieds site.
            </p>
          </div>
        </section>

        {/* Bridge to First-Time Buyers */}
        <section className="py-12 px-4 bg-card border-t border-border">
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

export default RentalsHub;
