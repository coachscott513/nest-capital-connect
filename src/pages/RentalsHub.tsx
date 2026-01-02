import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const cities = [
  { name: "Albany", slug: "albany" },
  { name: "Schenectady", slug: "schenectady" },
  { name: "Troy", slug: "troy" },
];

const renterBenefits = [
  "Understand local rental markets",
  "See real listings (not outdated posts)",
  "Learn approval requirements before applying",
  "Navigate neighborhoods, school districts, and commute areas",
  "Avoid scams and misinformation",
];

const ownerBenefits = [
  "Position rentals accurately",
  "Attract qualified tenants",
  "Understand pricing and demand",
  "Reduce vacancy and friction",
  "Navigate local compliance and expectations",
];

const whyDifferent = [
  "Local, town-by-town intelligence",
  "Real market data — not scraped guesses",
  "Neutral guidance (not sales-driven)",
  "Designed for renters and owners",
  "Built to scale across the Capital District",
];

const RentalsHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <Helmet>
        <title>Rentals in the Capital District — Explained | Capital District Nest</title>
        <meta name="description" content="Clear, local rental intelligence for Albany, Schenectady, Troy, and surrounding areas. Real listings. Local context. No noise." />
        <meta name="keywords" content="albany ny rentals, schenectady apartments, troy ny rentals, capital district rentals, rental intelligence" />
        <link rel="canonical" href="https://capitaldistrictnest.com/rentals" />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Rentals in the Capital District — Explained
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Clear, local rental intelligence for Albany, Schenectady, Troy, and surrounding areas.
            </p>
            <p className="text-sm text-muted-foreground mb-10">
              Real listings. Local context. No noise.
            </p>
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/rentals/albany">Explore Rentals</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/contact">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Have a rental property? Talk with us
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section 1 — For Renters */}
        <section className="py-20 px-4 bg-card border-b border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Looking for a rental?</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-center">
              Finding a quality rental isn't just about availability — it's about timing, approval standards, location, and knowing what's realistic.
            </p>
            
            <p className="text-foreground font-medium mb-4">Capital District Nest helps renters:</p>
            <ul className="space-y-3 mb-8">
              {renterBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="text-muted-foreground text-sm space-y-1 mb-8 border-l-2 border-border pl-4">
              <p>We don't sell your information.</p>
              <p>We don't push listings.</p>
              <p>We help you make sense of the market.</p>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/rentals/albany">
                  Browse available rentals
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section 2 — For Property Owners & Investors */}
        <section className="py-20 px-4 bg-background border-b border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Own a rental property?</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-center">
              Placing a rental correctly matters more than most owners realize.
            </p>
            
            <p className="text-foreground font-medium mb-4">Capital District Nest works with property owners to:</p>
            <ul className="space-y-3 mb-8">
              {ownerBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="text-muted-foreground text-sm space-y-1 mb-8 border-l-2 border-border pl-4">
              <p>We're not a classifieds board.</p>
              <p>We're a local intelligence layer.</p>
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/contact">
                  Start a conversation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">No pricing. No promises. Just access.</p>
            </div>
          </div>
        </section>

        {/* Section 3 — Why This Is Different */}
        <section className="py-20 px-4 bg-card border-b border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-10">Why Capital District Nest</h2>
            
            <ul className="space-y-4 mb-10 text-left max-w-md mx-auto">
              {whyDifferent.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="text-muted-foreground text-sm space-y-1">
              <p>Capital District Nest is not a marketplace.</p>
              <p>It's a local intelligence hub.</p>
            </div>
          </div>
        </section>

        {/* Section 4 — Cities We Cover */}
        <section className="py-20 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-10 text-center">Rental markets we cover</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/rentals/${city.slug}`}
                  className="group bg-card border border-border rounded-xl p-8 text-center hover:border-primary hover:shadow-lg transition-all"
                >
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {city.name}
                  </h3>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/rentals/albany">
                  Explore rentals by city
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section 5 — Footer CTA */}
        <section className="py-20 px-4 bg-card">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-8">Questions about renting in the Capital District?</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/contact">
                  Ask a question
                </Link>
              </Button>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/contact">
                  Talk with a local specialist
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default RentalsHub;
