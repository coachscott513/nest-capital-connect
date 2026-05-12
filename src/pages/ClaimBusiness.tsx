import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  CheckCircle, 
  Star, 
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Instagram,
  Facebook
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ClaimBusiness = () => {
  const [searchParams] = useSearchParams();
  const town = searchParams.get("town") || "";
  const category = searchParams.get("category") || "";
  const businessName = searchParams.get("name") || "";

  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    phone: "",
    businessName: businessName,
    website: "",
    instagram: "",
    facebook: "",
    description: "",
    action: "claim" as "claim" | "edit" | "remove"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.ownerName || !formData.email || !formData.businessName) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        full_name: formData.ownerName,
        email: formData.email,
        phone: formData.phone || null,
        message: `Business ${formData.action} request: ${formData.businessName} | Category: ${category} | Town: ${town} | Website: ${formData.website || 'N/A'} | Instagram: ${formData.instagram || 'N/A'} | Facebook: ${formData.facebook || 'N/A'} | Description: ${formData.description || 'N/A'}`,
        type: "business_claim",
        origin_town: town,
        lead_type: "business_owner"
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Request submitted! We'll be in touch soon.");
    } catch (error) {
      console.error("Error submitting claim:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Request Received | Capital District Nest</title>
        </Helmet>
        <MainHeader />
        
        <section className="px-[5%] py-20 md:py-28">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Request Received
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We'll review your request and get back to you within 24-48 hours.
            </p>
            <Button asChild>
              <Link to={town ? `/living-in/${town}` : "/"}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {town ? `${town.charAt(0).toUpperCase() + town.slice(1).replace(/-/g, ' ')}` : "Home"}
              </Link>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Claim Your Business | Capital District Nest Local Guide</title>
        <meta 
          name="description" 
          content="Claim, edit, or remove your business listing on Capital District Nest's Local Guide. Connect with new residents and homebuyers in your community."
        />
      </Helmet>

      <MainHeader />

      {/* Breadcrumb */}
      <nav className="bg-background/80 backdrop-blur-sm border-b border-border py-3 px-4 md:px-[5%]">
        <div className="max-w-7xl mx-auto">
          <Link 
            to={town ? `/living-in/${town}` : "/"} 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {town ? `${town.charAt(0).toUpperCase() + town.slice(1).replace(/-/g, ' ')}` : "Home"}
          </Link>
        </div>
      </nav>

      {/* Pricing Tiers */}
      <section className="px-[5%] py-12 md:py-16 bg-[#faf8f3]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight mb-3">
              Get your business listed.
            </h1>
            <p className="text-lg text-muted-foreground">
              Join 500+ Capital District businesses — start FREE.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                name: "Basic",
                price: "FREE",
                priceNote: "forever",
                features: ["Directory listing", "Contact info", "Category placement", "Town & city tagging"],
                cta: "Get Started",
                highlight: false,
              },
              {
                name: "Featured",
                price: "$25",
                priceNote: "/month",
                features: [
                  "Everything in Basic",
                  "“Featured” gold badge",
                  "Priority placement",
                  "Larger card with description",
                ],
                cta: "Get Started",
                highlight: true,
                badge: "Most Popular",
              },
              {
                name: "Premium",
                price: "$50",
                priceNote: "/month",
                features: [
                  "Everything in Featured",
                  "60-second video reel",
                  "Social media promotion",
                  "Monthly spotlight feature",
                ],
                cta: "Get Started",
                highlight: false,
                premium: true,
              },
            ].map((t) => (
              <div
                key={t.name}
                className={`relative rounded-3xl p-7 md:p-8 bg-white transition-all hover:-translate-y-1 ${
                  t.highlight
                    ? "border-2 border-[#c9a449] shadow-[0_18px_48px_-18px_rgba(201,164,73,0.45)]"
                    : t.premium
                    ? "border border-[#c9a449]/40 shadow-[0_0_24px_rgba(201,164,73,0.12)]"
                    : "border border-foreground/10"
                }`}
              >
                {t.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#c9a449] text-white text-[11px] font-bold tracking-wider uppercase">
                    {t.badge}
                  </span>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-bold text-foreground tracking-wide uppercase">
                    {t.name}
                  </h3>
                  {t.highlight && <Star className="w-4 h-4 text-[#c9a449] fill-[#c9a449]" />}
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-semibold text-foreground tracking-tight">
                    {t.price}
                  </span>
                  <span className="text-foreground/55 ml-1">{t.priceNote}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/75">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full rounded-full ${
                    t.highlight ? "bg-[#c9a449] hover:bg-[#b3902f] text-white" : ""
                  }`}
                  variant={t.highlight ? "default" : "outline"}
                >
                  <a href="#claim-form">{t.cta}</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="claim-form" className="px-[5%] py-12 md:py-20 scroll-mt-24">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {businessName ? `Manage "${businessName}"` : "Add Your Business"}
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below — listings appear in the directory within 24 hours.
            </p>
          </div>


          {/* Form */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Action Type */}
                <div className="space-y-2">
                  <Label>What would you like to do?</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "claim", label: "Claim / Add" },
                      { value: "edit", label: "Edit Info" },
                      { value: "remove", label: "Remove" }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, action: option.value as any }))}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          formData.action === option.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Owner Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Your Name *</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@business.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(518) 555-1234"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                      placeholder="Your Business Name"
                      required
                    />
                  </div>
                </div>

                {/* Business Links */}
                <div className="space-y-4">
                  <Label>Business Links (optional)</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={formData.website}
                        onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://yourbusiness.com"
                        className="pl-10"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          value={formData.instagram}
                          onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                          placeholder="@instagram"
                          className="pl-10"
                        />
                      </div>
                      <div className="relative">
                        <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          value={formData.facebook}
                          onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
                          placeholder="Facebook page"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Brief Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Tell us about your business in 1-2 sentences..."
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-12 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  We'll review your request and respond within 24-48 hours.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClaimBusiness;
