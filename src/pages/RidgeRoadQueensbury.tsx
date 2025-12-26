import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Trees, 
  TrendingUp, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Phone,
  Mail,
  Award,
  Target,
  BarChart3,
  Compass,
  Star,
  Check,
  X,
  Users,
  Calendar,
  FileText,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import propertyMainPhoto from "@/assets/1999-ridge-road-queensbury.jpeg";

const RidgeRoadQueensbury = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const property = {
    address: "1999 Ridge Road",
    city: "Queensbury",
    state: "NY",
    zip: "12804",
    fullAddress: "1999 Ridge Road, Queensbury, NY 12804",
    price: 179900,
    acreage: 4,
    latitude: 43.3469,
    longitude: -73.6789,
    photos: [
      propertyMainPhoto,
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&h=900&fit=crop",
    ],
    googleEarthLink: `https://earth.google.com/web/@43.3469,-73.6789,200a,500d,35y,0h,45t,0r`,
    boldtrailUrl: "https://www.scottalvarez.com/property/1999-ridge-road-queensbury-ny"
  };

  // "Ideal For" criteria
  const idealFor = [
    "Value land and privacy over turnkey interiors",
    "Want optionality (future build, expansion, or resale)",
    "Are evaluating value per acre, not just list price",
    "Want room to grow without HOA or subdivision constraints"
  ];

  // "Not Ideal For" criteria
  const notIdealFor = [
    "Need a fully updated home immediately",
    "Prefer dense neighborhood living",
    "Are focused on short-term cosmetic appreciation only"
  ];

  // What you're really buying points
  const keyTakeaways = [
    { icon: Shield, text: "Acreage provides downside protection" },
    { icon: Target, text: "Flexibility matters more than finishes at this price" },
    { icon: TrendingUp, text: "Long-term land value outpaces short-term renovations" }
  ];

  // Smart buyer questions
  const smartBuyerQuestions = [
    "How does this price compare per acre?",
    "What are my realistic improvement options?",
    "What exit strategies exist in 3–7 years?",
    "How does zoning affect future use?"
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === property.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? property.photos.length - 1 : prev - 1
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Property Intelligence Report Request for ${property.fullAddress}`,
        type: "property_intelligence"
      });

      if (error) throw error;

      toast.success("Report request submitted! Check your email within 24 hours.");
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>1999 Ridge Road, Queensbury NY | 4 Acres | $179,900 | Capital District Nest</title>
        <meta name="description" content="A data-driven look at one of Queensbury's most flexible land opportunities. 4 acres at $179,900. Get the free Property Intelligence Report." />
        <meta property="og:title" content="1999 Ridge Road | 4 Acres in Queensbury, NY | $179,900" />
        <meta property="og:description" content="Land value, privacy, and long-term optionality. Data-driven property intelligence from Capital District Nest." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://capitaldistrictnest.com/listings/1999-ridge-road-queensbury-ny" />
      </Helmet>

      <MainHeader />

      <main className="min-h-screen bg-background">
        {/* HERO SECTION */}
        <section className="relative min-h-[70vh] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={property.photos[currentPhotoIndex]}
              alt={`${property.address} - Photo ${currentPhotoIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary hover:border-primary transition-all group"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6 text-foreground group-hover:text-primary-foreground" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary hover:border-primary transition-all group"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6 text-foreground group-hover:text-primary-foreground" />
          </button>

          {/* Photo Counter */}
          <div className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border">
            <span className="text-sm font-medium">{currentPhotoIndex + 1} / {property.photos.length}</span>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-12 lg:p-16">
            <div className="max-w-4xl">
              {/* Address */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-3">
                {property.address} · {property.city}, {property.state}
              </h1>

              {/* Price & Acreage Line */}
              <p className="text-2xl md:text-3xl font-semibold text-primary mb-6">
                {property.acreage} Acres | {formatPrice(property.price)}
              </p>

              {/* Value Statement */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4">
                A data-driven look at one of Queensbury's most flexible land opportunities.
              </p>
              <p className="text-base text-muted-foreground/80 max-w-2xl mb-8">
                This page is designed to help serious buyers understand <strong className="text-foreground">why this property works</strong> — not just what it is.
              </p>

              {/* CTA */}
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full font-bold"
                asChild
              >
                <a href="#intelligence-report">
                  <FileText className="h-5 w-5 mr-2" />
                  Get the Full Property Intelligence Report (Free)
                </a>
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                Includes pricing context, land comps, tax data, and buyer strategies.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 1: WHAT YOU'RE REALLY BUYING HERE */}
        <section className="py-20 md:py-24 border-b border-border">
          <div className="container mx-auto px-6 max-w-4xl">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3">What This Property Represents</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              What You're Really Buying Here
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground mb-10">
              <p>
                This property is not about cosmetic finishes — it's about <strong className="text-foreground">land value, privacy, and long-term optionality</strong>.
              </p>
              <p>
                With approximately {property.acreage} acres in Queensbury, opportunities like this are increasingly rare at this price point. Buyers who understand land economics recognize this as a <strong className="text-foreground">flexible asset</strong> rather than a fixed product.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Key takeaways buyers should understand:</h3>
              <div className="space-y-4">
                {keyTakeaways.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-lg text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHO THIS PROPERTY IS IDEAL FOR */}
        <section className="py-20 md:py-24 bg-card/30 border-b border-border">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold tracking-widest uppercase mb-3">Buyer Fit Assessment</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Who This Property Is Ideal For
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ideal For */}
              <Card className="bg-card border-border overflow-hidden">
                <div className="bg-primary/10 px-6 py-4 border-b border-border">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    This Property Is a Fit If You:
                  </h3>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {idealFor.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Not Ideal For */}
              <Card className="bg-card border-border overflow-hidden">
                <div className="bg-muted/50 px-6 py-4 border-b border-border">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <X className="h-5 w-5 text-muted-foreground" />
                    </div>
                    This Property May Not Be Ideal If You:
                  </h3>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {notIdealFor.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8 italic">
              (This helps buyers self-qualify — fewer wasted calls, stronger leads.)
            </p>
          </div>
        </section>

        {/* SECTION 3: QUEENSBURY LAND CONTEXT */}
        <section className="py-20 md:py-24 border-b border-border">
          <div className="container mx-auto px-6 max-w-4xl">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3">Buyer Intelligence</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Queensbury Land Context
            </h2>
            <p className="text-lg font-semibold text-foreground mb-4">How This Compares Locally</p>
            
            <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
              <p>
                Rather than guessing, buyers should understand:
              </p>
              <ul className="space-y-2">
                <li>Typical price ranges for acreage parcels in Queensbury</li>
                <li>Tax assessment vs asking price positioning</li>
                <li>Scarcity of similar-sized parcels at this entry level</li>
              </ul>
              <p>
                We provide this context inside the Intelligence Report, so buyers don't have to piece it together themselves.
              </p>
            </div>

            <Button 
              size="lg" 
              className="rounded-full font-bold"
              asChild
            >
              <a href="#intelligence-report">
                <BarChart3 className="h-5 w-5 mr-2" />
                Request the Intelligence Report →
              </a>
            </Button>
          </div>
        </section>

        {/* SECTION 4: BUYER STRATEGY NOTES */}
        <section className="py-20 md:py-24 bg-card/30 border-b border-border">
          <div className="container mx-auto px-6 max-w-4xl">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3">The Differentiator</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Buyer Strategy Notes
            </h2>

            <Card className="bg-card border-border mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Target className="h-6 w-6 text-primary" />
                  Smart Buyers Ask:
                </h3>
                <ul className="space-y-4">
                  {smartBuyerQuestions.map((question, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <span className="text-foreground text-lg">{question}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
              <p className="text-lg text-foreground mb-4">
                <strong>This listing includes strategy commentary</strong>, not just marketing language.
              </p>
              <p className="text-muted-foreground">
                Our goal is to help buyers make <strong className="text-foreground">confident decisions</strong>, not rushed ones.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: NEXT STEPS FOR BUYERS / LEAD FORM */}
        <section id="intelligence-report" className="py-20 md:py-24 border-b border-border">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold tracking-widest uppercase mb-3">Next Steps</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Interested in This Property?
              </h2>
              <p className="text-lg text-muted-foreground">
                You have three smart options:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Option 1 */}
              <Card className="bg-card border-primary/50 border-2">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Get the Full Property Intelligence Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Pricing context, land comps, tax data, strategy notes
                  </p>
                </CardContent>
              </Card>

              {/* Option 2 */}
              <Card className="bg-card border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Schedule a Short Buyer Strategy Call</h3>
                  <p className="text-sm text-muted-foreground">
                    10 minutes — ask questions about this property or others like it
                  </p>
                </CardContent>
              </Card>

              {/* Option 3 */}
              <Card className="bg-card border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Compass className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Tell Us What Else You're Looking For</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll apply the same analysis to other properties you're considering
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Lead Form */}
            <Card className="bg-card border-border max-w-xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-center">
                  Get the Free Property Intelligence Report
                </h3>
                <p className="text-muted-foreground mb-6 text-center">
                  We'll send you a clear, data-driven breakdown of this property — including pricing context, land value insights, and buyer strategy notes.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone (optional but encouraged)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full rounded-full font-bold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Send My Report"}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Your information is used only to deliver this report and to follow up if you request help evaluating properties. We never sell or share your information.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* POWERED BY CAPITALDEALDESK */}
        <section className="py-16 md:py-20 bg-card/50 border-b border-border">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 border border-secondary/50 mb-6">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Powered by CapitalDealDesk</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Wall Street Tools. Main Street Soul.
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              CapitalDealDesk is our proprietary property intelligence platform that combines institutional-grade 
              analytics with deep local market expertise. Every listing we represent benefits from 
              data-driven insights typically reserved for professional investors.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/dealdesk">Learn About DealDesk</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-full">
                <a href={property.boldtrailUrl} target="_blank" rel="noopener noreferrer">
                  View on ScottAlvarez.com <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* AGENT & BRAND FOOTER */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Agent Info */}
              <div>
                <p className="text-primary font-semibold tracking-widest uppercase mb-3">Your Local Expert</p>
                <h2 className="text-4xl font-bold mb-4">Scott Alvarez</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Licensed Real Estate Salesperson specializing in investment properties, land, and 
                  premium homes across the Capital District and Adirondack region.
                </p>
                <div className="space-y-3 mb-8">
                  <a 
                    href="tel:+15186762347" 
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">(518) 676-2347</span>
                  </a>
                  <a 
                    href="mailto:scott@capitaldistrictnest.com" 
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">scott@capitaldistrictnest.com</span>
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <span className="ml-2">5.0 Rating · RE/MAX</span>
                </div>
              </div>

              {/* Brand Card */}
              <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
                <div className="text-center">
                  <h3 className="text-2xl font-extrabold tracking-tight uppercase mb-2">
                    Capital District <span className="text-primary">Nest</span>
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Modern real estate intelligence for the Capital District.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { value: "200+", label: "Transactions" },
                      { value: "15+", label: "Years Experience" },
                      { value: "98%", label: "Client Satisfaction" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full rounded-full">
                    <Link to="/dealdesk">Start a Conversation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default RidgeRoadQueensbury;
