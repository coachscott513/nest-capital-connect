import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { ArrowRight, CheckCircle2, MapPin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import LiveConversationButton from "@/components/LiveConversationButton";

const cities = [
  { name: "Albany", slug: "albany" },
  { name: "Schenectady", slug: "schenectady" },
  { name: "Troy", slug: "troy" },
];

const whatWeDoForRenters = [
  "Current rental listings across the Capital District",
  "Neighborhood and school district context",
  "Clear pricing and availability",
  "No bait-and-switch listings",
];

const RentalsHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <Helmet>
        <title>Capital District Rentals — Clearly Explained | Capital District Nest</title>
        <meta name="description" content="Local rental intelligence for Albany, Schenectady, Troy, and surrounding communities. Transparent listings. Local insight. No pressure." />
        <meta name="keywords" content="albany ny rentals, schenectady apartments, troy ny rentals, capital district rentals, rental listings" />
        <link rel="canonical" href="https://capitaldistrictnest.com/rentals" />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Capital District Rentals — Clearly Explained
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Local rental intelligence for Albany, Schenectady, Troy, and surrounding communities.
            </p>
            <p className="text-sm text-muted-foreground mb-10">
              Transparent listings. Local insight. No pressure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/rentals/albany">Browse Rentals</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What This Page Is */}
        <section className="py-20 px-4 bg-card border-b border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              What Capital District Nest Does for Renters
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-center">
              Capital District Nest helps renters understand what's actually available, where, and at what price — without the noise, hidden agendas, or outdated listings common on large platforms.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-center">
              We organize rental listings by city, neighborhood, school district, and lifestyle needs, so you can make informed decisions quickly.
            </p>
            
            <ul className="space-y-3 mb-8 max-w-xl mx-auto">
              {whatWeDoForRenters.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What This Page Is NOT */}
        <section className="py-16 px-4 bg-background border-b border-border">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-muted-foreground space-y-2 mb-6">
              <p>This is not a national classifieds site.</p>
              <p>This is not a lead-selling platform.</p>
              <p>And your information is not sold or shared.</p>
            </div>
            <p className="text-foreground font-medium">
              Capital District Nest is built to be useful first.
            </p>
          </div>
        </section>

        {/* Browse Rentals by Area */}
        <section className="py-20 px-4 bg-card border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Browse Rentals by Area
            </h2>
            <p className="text-muted-foreground text-lg text-center mb-10">
              Start broad or narrow down by what matters most to you.
            </p>
            
            {/* City Links - Ungated */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/rentals/${city.slug}`}
                  className="group bg-background border border-border rounded-xl p-8 text-center hover:border-primary hover:shadow-lg transition-all"
                >
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    Rentals in {city.name}
                  </h3>
                </Link>
              ))}
            </div>

            {/* Additional Links */}
            <div className="space-y-4 max-w-md mx-auto">
              <Link 
                to="/rentals/albany" 
                className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-primary transition-colors group"
              >
                <span className="text-foreground group-hover:text-primary transition-colors">Rentals by Neighborhood</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              
              {/* Gated - School District */}
              <div className="p-4 bg-background border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    Rentals by School District
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Advanced</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Advanced searches are delivered directly to ensure accuracy and relevance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Property Owners */}
        <section className="py-20 px-4 bg-background border-b border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              For Property Owners
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-center">
              Capital District Nest works with local owners who want their rentals presented accurately and professionally — without inflated fees or mass-market noise.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 text-center">
              If you own rental property and want visibility with serious renters, reach out to discuss options.
            </p>
            
            <div className="text-center">
              <LiveConversationButton 
                size="lg" 
                className="rounded-full px-8"
              />
              <p className="text-xs text-muted-foreground mt-3">
                No pricing. No promises. Conversation-first.
              </p>
            </div>
          </div>
        </section>

        {/* Renting Now — Buying Later? */}
        <section className="py-20 px-4 bg-card border-b border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Renting Now — Buying Later?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Many renters eventually explore first-time homebuyer options, grants, or low down payment programs. Capital District Nest provides education and market context — without pressure.
            </p>
            
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/first-time-buyers">
                Explore First-Time Buyer Information
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Footer Section */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground">
              Built for renters, owners, and communities — not advertisers.
            </p>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default RentalsHub;
