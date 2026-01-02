import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { Home, School, GraduationCap, MapPin, ArrowRight, CheckCircle2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const cities = [
  { name: "Albany", slug: "albany", description: "State capital with diverse rental options" },
  { name: "Schenectady", slug: "schenectady", description: "Affordable rents in revitalized downtown" },
  { name: "Troy", slug: "troy", description: "Historic architecture near RPI & arts scene" },
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
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertForm, setAlertForm] = useState({ name: "", email: "", phone: "" });
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "You're on the list!",
      description: "We'll notify you when new rentals match your criteria.",
    });
    setAlertDialogOpen(false);
    setAlertForm({ name: "", email: "", phone: "" });
  };

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Capital District Rentals — Clear, Local, Verified
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Search rentals across Albany, Schenectady, and Troy with real local insight — not scraped listings.
            </p>
            <p className="text-muted-foreground mb-10">
              Built for renters who want clarity now — and better options later.
            </p>
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/rentals/albany">Browse Available Rentals</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8"
                onClick={() => setAlertDialogOpen(true)}
              >
                <Bell className="w-4 h-4 mr-2" />
                Get Rental Alerts (Free)
              </Button>
            </div>
          </div>
        </section>

        {/* Search Rentals by City */}
        <section className="py-16 px-4 bg-card">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Search Rentals by City</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/rentals/${city.slug}`}
                  className="group bg-background border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {city.name} Rentals
                    </h3>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-muted-foreground text-sm">{city.description}</p>
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

        {/* Tired of Renting - First-Time Buyer Bridge */}
        <section className="py-16 px-4 bg-background border-t border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tired of Renting?</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Many renters qualify for first-time buyer programs with low or no down payment — often sooner than they expect.
              Capital District Nest helps renters understand when buying makes sense, without pressure.
            </p>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/first-time-homebuyers">
                Explore First-Time Buyer Options
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Owner Section */}
        <section className="py-12 px-4 bg-card border-t border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-bold text-foreground mb-3">Own a Rental Property?</h2>
            <p className="text-muted-foreground mb-6">
              We work with local owners to place quality tenants and provide market intelligence — without listing noise or national portals.
            </p>
            <Button asChild variant="ghost" className="text-primary hover:text-primary/80">
              <Link to="/first-time-homebuyers">
                Talk to Us About Your Property
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Rental Alerts Dialog */}
      <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get Rental Alerts</DialogTitle>
            <DialogDescription>
              Be the first to know when new rentals match your criteria.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAlertSubmit} className="space-y-4 mt-4">
            <Input
              placeholder="Your name"
              value={alertForm.name}
              onChange={(e) => setAlertForm({ ...alertForm, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Email address"
              value={alertForm.email}
              onChange={(e) => setAlertForm({ ...alertForm, email: e.target.value })}
              required
            />
            <Input
              type="tel"
              placeholder="Phone number"
              value={alertForm.phone}
              onChange={(e) => setAlertForm({ ...alertForm, phone: e.target.value })}
              required
            />
            <Button type="submit" className="w-full">
              Sign Up for Alerts
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default RentalsHub;
