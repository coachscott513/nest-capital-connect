import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import PropertyChatDialog from "@/components/PropertyChatDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PropertyFooterAttribution from "@/components/PropertyFooterAttribution";
import LiveConversationButton from "@/components/LiveConversationButton";
import PropertySearchDeck from "@/components/PropertySearchDeck";
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
  MessageSquare,
  Home,
  GraduationCap,
  MapPinned,
  ShoppingCart,
  Utensils,
  Building2,
  Bike
} from "lucide-react";

// Import property photos
import laveryFront from "@/assets/22-lavery-drive-front.jpg";
import laveryBackyard from "@/assets/22-lavery-drive-backyard.jpg";
import laveryLivingRoom1 from "@/assets/22-lavery-drive-living-room-1.jpg";
import laveryLivingRoom2 from "@/assets/22-lavery-drive-living-room-2.jpg";
import laveryDiningRoom from "@/assets/22-lavery-drive-dining-room.jpg";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const LaveryDriveDelmar = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [otherPropertyForm, setOtherPropertyForm] = useState({
    address: "",
    name: "",
    email: "",
    phone: ""
  });
  const [buyerIntakeForm, setBuyerIntakeForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtherPropertySubmitting, setIsOtherPropertySubmitting] = useState(false);
  const [isIntakeSubmitting, setIsIntakeSubmitting] = useState(false);

  const property = {
    address: "22 Lavery Drive",
    city: "Delmar",
    state: "NY",
    zip: "12054",
    fullAddress: "22 Lavery Drive, Delmar, NY 12054",
    price: null, // Auto-populate from MLS
    beds: null, // Auto-populate from MLS
    baths: null, // Auto-populate from MLS
    latitude: 42.6199,
    longitude: -73.8323,
    photos: [
      laveryFront,
      laveryBackyard,
      laveryLivingRoom1,
      laveryLivingRoom2,
      laveryDiningRoom,
    ],
    googleEarthLink: `https://earth.google.com/web/@42.6199,-73.8323,200a,500d,35y,0h,45t,0r`,
    boldtrailUrl: "https://www.scottalvarez.com/property/22-lavery-drive-delmar-ny"
  };

  // "Ideal For" criteria - Delmar specific
  const idealFor = [
    "Want Delmar schools and neighborhood stability",
    "Value long-term appreciation over speculation",
    "Prefer established residential streets",
    "Are comparing Delmar vs Voorheesville / Slingerlands"
  ];

  // "Not Ideal For" criteria - Delmar specific
  const notIdealFor = [
    "Are seeking rural acreage",
    "Want heavy value-add renovation projects",
    "Prefer HOA or new-construction communities"
  ];

  // What you're really buying points - Delmar specific
  const keyTakeaways = [
    { icon: MapPinned, text: "Street-level quality in a desirable Delmar pocket" },
    { icon: GraduationCap, text: "School district alignment with Bethlehem Central" },
    { icon: TrendingUp, text: "Long-term resale stability in supply-constrained market" }
  ];

  // Smart buyer questions - Delmar specific
  const smartBuyerQuestions = [
    "How does this compare to similar Delmar streets?",
    "How competitive is current inventory?",
    "What is the resale profile in 5–10 years?",
    "What tradeoffs exist vs nearby towns?"
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (price: number | null) => {
    if (!price) return "Price TBD";
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
      // Use the edge function to save lead and send email notifications
      const { data, error } = await supabase.functions.invoke('submit-contact-form', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Property Intelligence Report Request for ${property.fullAddress}`,
          type: "property_intelligence"
        }
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
        <title>22 Lavery Drive, Delmar NY | Bethlehem Schools | Capital District Nest</title>
        <meta name="description" content="A data-driven look at one of Delmar's most desirable residential streets. Get the free Property Intelligence Report for 22 Lavery Drive." />
        <meta property="og:title" content="22 Lavery Drive | Delmar, NY | Capital District Nest" />
        <meta property="og:description" content="Location precision in a high-confidence Delmar residential pocket. Data-driven property intelligence from Capital District Nest." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://capitaldistrictnest.com/listings/22-lavery-drive-delmar-ny" />
      </Helmet>

      <MainHeader />

      <main className="min-h-screen bg-background pt-20">
        {/* ADDRESS & PRICE HEADER */}
        <section className="bg-background border-b border-border">
          <div className="container mx-auto px-6 py-8 md:py-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-3">
              {property.address} · {property.city}, {property.state}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-primary">
              {property.beds && property.baths ? `${property.beds} Bed | ${property.baths} Bath | ` : ""}{formatPrice(property.price)}
            </p>
          </div>
        </section>

        {/* PHOTO CAROUSEL */}
        <section className="relative bg-muted/30">
          <div className="container mx-auto px-4 py-6">
            <div className="relative aspect-[4/3] md:aspect-[16/9] max-h-[70vh] overflow-hidden rounded-xl bg-muted">
              {/* Main Image */}
              <img
                src={property.photos[currentPhotoIndex]}
                alt={`${property.address} - Photo ${currentPhotoIndex + 1}`}
                className="w-full h-full object-contain"
              />

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
            </div>
          </div>
        </section>

        {/* VALUE STATEMENT & CTA */}
        <section className="bg-background border-b border-border">
          <div className="container mx-auto px-6 py-8 md:py-12 max-w-4xl">
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4">
              A data-driven look at one of Delmar's most desirable residential streets.
            </p>
            <p className="text-base text-muted-foreground/80 max-w-2xl mb-8">
              Built for buyers who want <strong className="text-foreground">clarity, context, and confidence</strong> — not guesswork.
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
              Includes recent Delmar sales comps, pricing context, and market velocity indicators.
            </p>
          </div>
        </section>

        {/* SECTION 1: WHAT THIS PROPERTY REPRESENTS */}
        <section className="py-20 md:py-24 border-b border-border">
          <div className="container mx-auto px-6 max-w-4xl">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3">What This Property Represents</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              What You're Really Buying Here
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground mb-10">
              <p>
                22 Lavery Drive is about <strong className="text-foreground">location precision</strong>.
              </p>
              <p>
                Delmar buyers care deeply about:
              </p>
              <ul className="space-y-2">
                <li>Street-level quality</li>
                <li>School district alignment</li>
                <li>Long-term resale stability</li>
                <li>Walkability and neighborhood character</li>
              </ul>
              <p>
                This property sits within a <strong className="text-foreground">high-confidence Delmar residential pocket</strong>, where pricing strength and buyer demand have remained consistent even during broader market shifts.
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
              <p className="text-primary font-semibold tracking-widest uppercase mb-3">Ideal For Buyers Who:</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Who This Property Is For
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
                    May Not Be Ideal If You:
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
          </div>
        </section>

        {/* SECTION 3: DELMAR MARKET CONTEXT */}
        <section className="py-20 md:py-24 border-b border-border">
          <div className="container mx-auto px-6 max-w-4xl">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3">Buyer Intelligence</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Delmar Market Context
            </h2>
            <p className="text-lg font-semibold text-foreground mb-4">How This Home Fits the Delmar Market</p>
            
            <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
              <p>
                Delmar is one of the Capital District's most <strong className="text-foreground">supply-constrained submarkets</strong>. Homes on established streets like Lavery Drive tend to:
              </p>
              <ul className="space-y-2">
                <li>Receive strong early interest</li>
                <li>Hold pricing relative to list</li>
                <li>Attract long-term owner-occupants</li>
              </ul>
              <p className="mt-6">
                <strong className="text-foreground">The full Intelligence Report includes:</strong>
              </p>
              <ul className="space-y-2">
                <li>Recent Delmar sales comps</li>
                <li>Pricing context by square footage</li>
                <li>Tax assessment comparison</li>
                <li>Market velocity indicators</li>
              </ul>
            </div>

            <Button 
              size="lg" 
              className="rounded-full font-bold"
              asChild
            >
              <a href="#intelligence-report">
                <BarChart3 className="h-5 w-5 mr-2" />
                View the Delmar Intelligence Report →
              </a>
            </Button>
          </div>
        </section>

        {/* AREA LANDMARKS & FEATURES */}
        <section className="py-20 md:py-24 bg-card/30 border-b border-border">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3">What's Nearby</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Delmar Area Landmarks & Features
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
              Lavery Drive sits in the heart of Delmar, with easy access to the amenities that make this community one of the Capital District's most sought-after.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Schools */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Bethlehem Central Schools</h3>
                  <p className="text-sm text-muted-foreground">
                    Highly-rated district with Elsmere Elementary, BCMS, and BCHS all within a short drive.
                  </p>
                </CardContent>
              </Card>

              {/* Shopping */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Delaware Plaza</h3>
                  <p className="text-sm text-muted-foreground">
                    Less than 1 mile — Hannaford, CVS, restaurants, and local shops for daily convenience.
                  </p>
                </CardContent>
              </Card>

              {/* Dining */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Utensils className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Four Corners District</h3>
                  <p className="text-sm text-muted-foreground">
                    Delmar's walkable village center with restaurants, cafes, and the beloved Perfect Blend.
                  </p>
                </CardContent>
              </Card>

              {/* Recreation */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Trees className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Five Rivers Environmental Center</h3>
                  <p className="text-sm text-muted-foreground">
                    450 acres of trails, wetlands, and wildlife education just minutes away.
                  </p>
                </CardContent>
              </Card>

              {/* Rail Trail */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Bike className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Albany County Rail Trail</h3>
                  <p className="text-sm text-muted-foreground">
                    9+ mile paved trail for biking, running, and walking — accessible from the neighborhood.
                  </p>
                </CardContent>
              </Card>

              {/* Town Services */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Town of Bethlehem Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Library, town park, community center, and excellent municipal services nearby.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 4: BUYER STRATEGY NOTES */}
        <section className="py-20 md:py-24 border-b border-border">
          <div className="container mx-auto px-6 max-w-4xl">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3">How Smart Buyers Evaluate This Home</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Buyer Strategy Notes
            </h2>

            <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
              <p>
                Instead of asking "Is this a good deal?"<br />
                <strong className="text-foreground">The better questions are:</strong>
              </p>
            </div>

            <Card className="bg-card border-border mb-8">
              <CardContent className="p-8">
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
              <p className="text-lg text-foreground">
                This page — and the report — are designed to help buyers answer those questions clearly.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: NEXT STEPS FOR BUYERS / LEAD FORM */}
        <section id="intelligence-report" className="py-20 md:py-24 border-b border-border scroll-mt-24">
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
                    Delmar sales comps, pricing context, market velocity
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
                  We'll send you a clear, data-driven breakdown of this property — including Delmar market context, pricing comps, and buyer strategy notes.
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

        {/* SECTION: LOOKING AT OTHER PROPERTIES? */}
        <section className="py-20 md:py-24 bg-background border-b border-border">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-10">
              <p className="text-primary font-semibold tracking-widest uppercase mb-3">Want Info on Another Property?</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Looking at Other Homes in Delmar or Nearby?
              </h2>
              <p className="text-lg text-muted-foreground">
                Enter any address and receive the same intelligence breakdown — even if the property isn't listed here.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">We'll Provide:</h3>
                <ul className="space-y-3">
                  {[
                    "Pricing context & comps",
                    "Market positioning",
                    "Tax and ownership insights",
                    "Strategy notes (not sales talk)"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsOtherPropertySubmitting(true);
                      try {
                        const { error } = await supabase.from("leads").insert({
                          name: otherPropertyForm.name,
                          email: otherPropertyForm.email,
                          phone: otherPropertyForm.phone || null,
                          message: `Property Intelligence Report Request for: ${otherPropertyForm.address}`,
                          type: "other_property_intelligence",
                          location: otherPropertyForm.address
                        });
                        if (error) throw error;
                        toast.success("Request submitted! We'll analyze this property and get back to you.");
                        setOtherPropertyForm({ address: "", name: "", email: "", phone: "" });
                      } catch (error) {
                        console.error("Form submission error:", error);
                        toast.error("Something went wrong. Please try again.");
                      } finally {
                        setIsOtherPropertySubmitting(false);
                      }
                    }}
                    className="space-y-4"
                  >
                    <Input
                      placeholder="Property Address (required)"
                      value={otherPropertyForm.address}
                      onChange={(e) => setOtherPropertyForm({ ...otherPropertyForm, address: e.target.value })}
                      required
                      className="bg-background border-border"
                    />
                    <Input
                      placeholder="Name"
                      value={otherPropertyForm.name}
                      onChange={(e) => setOtherPropertyForm({ ...otherPropertyForm, name: e.target.value })}
                      required
                      className="bg-background border-border"
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={otherPropertyForm.email}
                      onChange={(e) => setOtherPropertyForm({ ...otherPropertyForm, email: e.target.value })}
                      required
                      className="bg-background border-border"
                    />
                    <Input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={otherPropertyForm.phone}
                      onChange={(e) => setOtherPropertyForm({ ...otherPropertyForm, phone: e.target.value })}
                      className="bg-background border-border"
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full rounded-full font-bold"
                      disabled={isOtherPropertySubmitting}
                    >
                      {isOtherPropertySubmitting ? "Submitting..." : "Get Another Property Intelligence Report"}
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Your information is only used to deliver property insights and help you make informed decisions. No spam. No pressure.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION: NEED HELP NARROWING DOWN YOUR SEARCH? */}
        <section className="py-20 md:py-24 bg-card/30 border-b border-border">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-10">
              <p className="text-primary font-semibold tracking-widest uppercase mb-3">Need Help Narrowing Your Search?</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Not Sure Which Homes Make the Most Sense?
              </h2>
              <p className="text-lg text-muted-foreground">
                If you're comparing:
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Delmar vs Slingerlands",
                  "Different school zones",
                  "Price vs long-term value",
                  "Various neighborhoods in the area"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mt-6 text-center">
                I can help you narrow the field quickly using real data.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Option 1: Quick Buyer Intake */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Quick Buyer Intake</h3>
                    <p className="text-sm text-muted-foreground">
                      Tell us what you're looking for and we'll point you in the right direction.
                    </p>
                  </div>
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsIntakeSubmitting(true);
                      try {
                        const { error } = await supabase.from("leads").insert({
                          name: buyerIntakeForm.name,
                          email: buyerIntakeForm.email,
                          phone: buyerIntakeForm.phone || null,
                          message: buyerIntakeForm.message || "Buyer intake - help narrowing search",
                          type: "buyer_intake"
                        });
                        if (error) throw error;
                        toast.success("Got it! We'll reach out shortly to help narrow your search.");
                        setBuyerIntakeForm({ name: "", email: "", phone: "", message: "" });
                      } catch (error) {
                        console.error("Form submission error:", error);
                        toast.error("Something went wrong. Please try again.");
                      } finally {
                        setIsIntakeSubmitting(false);
                      }
                    }}
                    className="space-y-4"
                  >
                    <Input
                      placeholder="Full Name"
                      value={buyerIntakeForm.name}
                      onChange={(e) => setBuyerIntakeForm({ ...buyerIntakeForm, name: e.target.value })}
                      required
                      className="bg-background border-border"
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={buyerIntakeForm.email}
                      onChange={(e) => setBuyerIntakeForm({ ...buyerIntakeForm, email: e.target.value })}
                      required
                      className="bg-background border-border"
                    />
                    <Input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={buyerIntakeForm.phone}
                      onChange={(e) => setBuyerIntakeForm({ ...buyerIntakeForm, phone: e.target.value })}
                      className="bg-background border-border"
                    />
                    <Textarea
                      placeholder="What are you looking for? (areas, price range, property type, timeline)"
                      value={buyerIntakeForm.message}
                      onChange={(e) => setBuyerIntakeForm({ ...buyerIntakeForm, message: e.target.value })}
                      className="bg-background border-border min-h-[100px]"
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full rounded-full font-bold"
                      disabled={isIntakeSubmitting}
                    >
                      {isIntakeSubmitting ? "Submitting..." : "Help Me Narrow My Search"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Option 2: Strategy Call */}
              <Card className="bg-card border-border">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="text-center flex-1">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">10-Minute Strategy Call</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      A short, no-pressure conversation to help you prioritize your search.
                    </p>
                    <div className="space-y-4 text-left mb-8">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Ask questions specific to your situation</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Get clarity on what makes sense for you</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Compass className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Leave with a focused next step</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full rounded-full font-bold"
                    asChild
                  >
                    <a href="tel:+15186762347">
                      <Phone className="h-5 w-5 mr-2" />
                      Schedule a Quick Call
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SELLER SOFT-PITCH SECTION */}
        <section className="py-20 md:py-24 bg-background border-b border-border">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3">Thinking About Selling in Delmar?</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Every Listing I Represent Receives This Same Level of Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Data analysis, buyer positioning, and presentation that sets your property apart from the competition.
            </p>
            <Button 
              size="lg" 
              className="rounded-full font-bold"
              asChild
            >
              <Link to="/sell-investment-property">
                <Home className="h-5 w-5 mr-2" />
                See What Your Home Is Worth
              </Link>
            </Button>
          </div>
        </section>

        {/* PROPERTY SEARCH DECK - Looking at Other Properties Like This? */}
        <PropertySearchDeck sourcePropertyAddress={property.fullAddress} />

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
                  <LiveConversationButton className="w-full rounded-full" />
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Typical response time: under 2 minutes
                  </p>
                </div>
              </div>
            </div>

            {/* MLS Link & Agent Attribution */}
            <PropertyFooterAttribution 
              mlsUrl={property.boldtrailUrl}
              mlsId="Delmar-22-Lavery"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default LaveryDriveDelmar;