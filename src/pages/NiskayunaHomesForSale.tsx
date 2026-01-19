import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Check, Phone, ExternalLink, Home, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { niskayunaData } from "@/data/townData";

const NiskayunaHomesForSale = () => {
  const { toast } = useToast();
  const [iframeError, setIframeError] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", requirements: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const iframe = document.getElementById("niskayuna-listings-iframe") as HTMLIFrameElement;
      if (iframe) {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!iframeDoc || iframeDoc.body.innerHTML === "") setIframeError(true);
        } catch { setIframeError(true); }
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        full_name: formData.name, email: formData.email, phone: formData.phone || null,
        message: formData.requirements || "Niskayuna home search request", type: "niskayuna-homes",
        origin_town: "niskayuna", lead_type: "buyer",
      });
      if (error) throw error;
      toast({ title: "Request Sent!", description: "We'll send you matching properties shortly." });
      setFormData({ name: "", email: "", phone: "", requirements: "" });
    } catch (error) {
      console.error("Error:", error);
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  return (
    <>
      <Helmet>
        <title>Niskayuna Homes for Sale | Capital District Nest</title>
        <meta name="description" content="Browse live Niskayuna homes for sale plus buyer tools and local market insights." />
        <link rel="canonical" href="https://capitaldistrictnest.com/niskayuna-homes-for-sale" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <MainHeader />

        <section className="pt-28 pb-16 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Niskayuna Homes for Sale</h1>
            <p className="text-xl text-muted-foreground mb-2">Live listings + local market intel—built to make buying easier.</p>
            <p className="text-sm text-muted-foreground mb-8">Updated directly from RE/MAX. Map + list view.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 font-semibold px-8 py-6 text-lg" asChild>
                <a href={niskayunaData.remaxSearchUrl} target="_blank" rel="noopener noreferrer">View Live Niskayuna Listings <ExternalLink className="w-5 h-5 ml-2" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 font-semibold px-8 py-6 text-lg" asChild>
                <Link to="/dealdesk">Get My Free Intelligence Report →</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 bg-muted/30">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">Live Niskayuna Listings (RE/MAX)</h2>
            </div>
            {!iframeError ? (
              <div className="w-full max-w-[1200px] mx-auto rounded-[16px] overflow-hidden border-2 border-primary/30 bg-white">
                <iframe id="niskayuna-listings-iframe" title="Niskayuna Home Search" src={niskayunaData.remaxSearchUrl} loading="lazy" className="w-full h-[800px] md:h-[1100px] block border-0" onError={() => setIframeError(true)} />
              </div>
            ) : (
              <Card className="max-w-2xl mx-auto p-8 text-center">
                <Home className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">View Niskayuna Listings</h3>
                <Button size="lg" asChild><a href={niskayunaData.remaxSearchUrl} target="_blank" rel="noopener noreferrer">Open RE/MAX Search</a></Button>
              </Card>
            )}
          </div>
        </section>

        <section className="py-16 bg-primary/5 border-y border-primary/20">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">Want the best options fast?</h2>
              <p className="text-lg text-muted-foreground">Tell us what you're looking for.</p>
            </div>
            <Card className="p-6 md:p-8 bg-background">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input required placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  <Input required type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <Input type="tel" placeholder="Phone (optional)" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <Textarea placeholder="Price range + must-haves" value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} />
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Sending..." : <><Send className="w-5 h-5 mr-2" />Send My Matches</>}</Button>
              </form>
            </Card>
          </div>
        </section>

        <section className="py-14 bg-background">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Why Niskayuna?</h2>
            <ul className="space-y-4 text-lg text-foreground">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary mt-1" /><span>Top-rated Niskayuna Central School District</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary mt-1" /><span>Strong STEM programs and excellent college prep</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary mt-1" /><span>Established neighborhoods with mature landscaping</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary mt-1" /><span>Close to GE and local tech employers</span></li>
            </ul>
          </div>
        </section>

        <div className="py-4 bg-primary text-primary-foreground text-center">
          <a href="tel:+15186718048" className="flex items-center justify-center gap-2 font-semibold text-lg"><Phone className="w-5 h-5" />Call/Text an Agent: (518) 671-8048</a>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default NiskayunaHomesForSale;