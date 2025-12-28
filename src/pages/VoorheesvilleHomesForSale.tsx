import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Check, Phone, ExternalLink, Home, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const REMAX_URL = "https://scottalvarez.remax.com/index.php?advanced=1&display=Voorheesville&pak=city%3Ag30_dre6tsd2&statuses%5B%5D=0&statuses%5B%5D=57&custombox=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt";

const VoorheesvilleHomesForSale = () => {
  const { toast } = useToast();
  const [iframeError, setIframeError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Test if iframe can load (some sites block embedding)
  useEffect(() => {
    const timer = setTimeout(() => {
      // If iframe hasn't loaded properly, show fallback
      const iframe = document.getElementById("voorheesville-listings-iframe") as HTMLIFrameElement;
      if (iframe) {
        try {
          // Try to access iframe - will fail if blocked
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!iframeDoc || iframeDoc.body.innerHTML === "") {
            setIframeError(true);
          }
        } catch {
          setIframeError(true);
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.requirements || "Voorheesville home search request",
        type: "voorheesville-homes",
      });

      if (error) throw error;

      toast({
        title: "Request Sent!",
        description: "We'll send you matching properties and neighborhood intel shortly.",
      });

      setFormData({ name: "", email: "", phone: "", requirements: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Voorheesville Homes for Sale | Capital District Nest</title>
        <meta
          name="description"
          content="Browse live Voorheesville homes for sale plus buyer tools and local market insights."
        />
        <meta
          name="keywords"
          content="Voorheesville homes for sale, Voorheesville NY real estate, Voorheesville schools, Albany County homes, Capital District real estate"
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/voorheesville-homes-for-sale" />
        <meta property="og:title" content="Voorheesville Homes for Sale | Capital District Nest" />
        <meta property="og:description" content="Browse live Voorheesville homes for sale plus buyer tools and local market insights." />
        <meta property="og:url" content="https://capitaldistrictnest.com/voorheesville-homes-for-sale" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Voorheesville Homes for Sale | Capital District Nest" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <MainHeader />

        {/* Hero Section */}
        <section className="pt-28 pb-16 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Voorheesville Homes for Sale
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Live listings + local market intel—built to make buying easier.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Updated directly from RE/MAX. Map + list view.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg"
                asChild
              >
                <a href={REMAX_URL} target="_blank" rel="noopener noreferrer">
                  View Live Voorheesville Listings
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 text-foreground font-semibold px-8 py-6 text-lg"
                asChild
              >
                <Link to="/dealdesk">
                  Get My Free Intelligence Report →
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Live Listings Section */}
        <section id="live-listings" className="py-14 bg-muted/30">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Live Voorheesville Listings (RE/MAX)
              </h2>
              <p className="text-muted-foreground">
                Updated directly from RE/MAX. Map + list view.
              </p>
            </div>

            {/* Iframe or Fallback */}
            {!iframeError ? (
              <div
                className="w-full max-w-[1200px] mx-auto rounded-[16px] overflow-hidden border-2 border-primary/30 bg-white"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              >
                <iframe
                  id="voorheesville-listings-iframe"
                  title="Voorheesville Home Search"
                  src={REMAX_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[800px] md:h-[1100px] block border-0"
                  onError={() => setIframeError(true)}
                />
              </div>
            ) : (
              <Card className="max-w-2xl mx-auto p-8 bg-background border-primary/20 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  View Voorheesville Listings
                </h3>
                <p className="text-muted-foreground mb-6">
                  Browse the full RE/MAX property search with map view, filters, and detailed listing info.
                </p>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                  asChild
                >
                  <a href={REMAX_URL} target="_blank" rel="noopener noreferrer">
                    Open RE/MAX Search
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Opens in a new tab with full search capabilities
                </p>
              </Card>
            )}
          </div>
        </section>

        {/* Quick Request Section */}
        <section className="py-16 bg-primary/5 border-y border-primary/20">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Want the best options fast?
              </h2>
              <p className="text-lg text-muted-foreground">
                Tell us what you're looking for and we'll send hand-picked matches plus neighborhood intel.
              </p>
            </div>

            <Card className="p-6 md:p-8 bg-background border-primary/20">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@email.com"
                      className="border-border"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone (optional)
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(518) 555-1234"
                    className="border-border"
                  />
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-foreground mb-2">
                    Price range + must-haves
                  </label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="e.g., Under $400K, 3+ bedrooms, garage, good school district..."
                    className="border-border min-h-[100px]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send My Matches
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </section>

        {/* Voorheesville Quick Facts */}
        <section className="py-14 bg-background">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Why Voorheesville?
            </h2>
            <ul className="space-y-4 text-lg text-foreground">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Small-town feel with rural character and community events</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Highly-rated Voorheesville Central School District</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Easy commute to Albany (~15 minutes)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Access to Thacher State Park and outdoor recreation</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>More land and space compared to nearby suburbs</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Free Intelligence Report CTA */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Get a Free Intelligence Report
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Found a property you like? Get a personalized analysis with pricing context, comparable sales, and buyer insights.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg"
              asChild
            >
              <Link to="/dealdesk">Request Free Report →</Link>
            </Button>
          </div>
        </section>

        {/* Contact Line */}
        <div className="py-4 bg-primary text-primary-foreground text-center">
          <a href="tel:518-676-2347" className="flex items-center justify-center gap-2 font-semibold text-lg">
            <Phone className="w-5 h-5" />
            Call/Text Scott: 518-676-2347
          </a>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default VoorheesvilleHomesForSale;
