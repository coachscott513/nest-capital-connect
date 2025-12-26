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
  Mountain, 
  Ruler, 
  Home, 
  TrendingUp, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Phone,
  Mail,
  Zap,
  Award,
  Target,
  BarChart3,
  Compass,
  Star,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const RidgeRoadQueensbury = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const property = {
    address: "1999 Ridge Road",
    city: "Queensbury",
    state: "NY",
    zip: "12804",
    fullAddress: "1999 Ridge Road, Queensbury, NY 12804",
    price: 279900,
    acreage: 6.8,
    yearBuilt: 1983,
    latitude: 43.3469,
    longitude: -73.6789,
    photos: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&h=900&fit=crop",
    ],
    aerialPhotos: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&h=900&fit=crop",
    ],
    googleEarthLink: `https://earth.google.com/web/@43.3469,-73.6789,200a,500d,35y,0h,45t,0r`,
    boldtrailUrl: "https://www.scottalvarez.com/property/1999-ridge-road-queensbury-ny"
  };

  const whyThisMatters = [
    {
      icon: Trees,
      title: "6.8 Private Acres",
      description: "Rare acreage in Warren County with mature tree buffer and southern exposure"
    },
    {
      icon: Mountain,
      title: "Adirondack Proximity",
      description: "Minutes to Lake George, hiking trails, and year-round recreation"
    },
    {
      icon: Shield,
      title: "Low Tax Corridor",
      description: "Queensbury's favorable tax structure compared to Saratoga County"
    },
    {
      icon: TrendingUp,
      title: "Appreciation Zone",
      description: "Warren County land values up 12% YoY with limited new inventory"
    }
  ];

  const marketContext = [
    { label: "Median Land Price", value: "$45K/acre", trend: "+8% YoY" },
    { label: "Days on Market (Area)", value: "62 days", trend: "Below avg" },
    { label: "Similar Sales", value: "4 comps", trend: "Limited" },
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
        message: `Property Intelligence Request for ${property.fullAddress}: ${formData.message}`,
        type: "property_intelligence"
      });

      if (error) throw error;

      toast.success("Request submitted! We'll prepare your intelligence report.");
      setFormData({ name: "", email: "", phone: "", message: "" });
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
        <title>1999 Ridge Road, Queensbury NY | 6.8 Acres | Capital District Nest</title>
        <meta name="description" content="Premium 6.8-acre property in Queensbury, NY near Lake George. Explore aerial views, location intelligence, and market context. Powered by CapitalDealDesk." />
        <meta property="og:title" content="1999 Ridge Road | 6.8 Acres in Queensbury, NY" />
        <meta property="og:description" content="Rare acreage opportunity near Lake George. Visual-first property intelligence from Capital District Nest." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://capitaldistrictnest.com/listings/1999-ridge-road-queensbury-ny" />
      </Helmet>

      <MainHeader />

      <main className="min-h-screen bg-background">
        {/* HERO SECTION */}
        <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={property.photos[currentPhotoIndex]}
              alt={`${property.address} - Photo ${currentPhotoIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
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
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 backdrop-blur-sm mb-4">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Queensbury, Warren County</span>
              </div>

              {/* Address */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-4">
                {property.address}
              </h1>

              {/* Price & Acreage */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div>
                  <p className="text-5xl md:text-6xl font-extrabold text-primary">
                    {formatPrice(property.price)}
                  </p>
                </div>
                <div className="h-12 w-px bg-border hidden md:block" />
                <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm px-5 py-3 rounded-lg border border-border">
                  <Ruler className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{property.acreage} Acres</p>
                    <p className="text-sm text-muted-foreground">Private Land</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-lg px-8 py-6 rounded-full font-bold">
                  <Phone className="h-5 w-5 mr-2" />
                  Request Private Showing
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 rounded-full font-bold border-2"
                  asChild
                >
                  <a href="#intelligence">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Get Property Intelligence
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* WHY THIS PROPERTY MATTERS */}
        <section className="py-20 md:py-28 border-b border-border">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold tracking-widest uppercase mb-3">Property Highlights</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Why This Property Matters</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyThisMatters.map((item, index) => (
                <Card 
                  key={index} 
                  className="bg-card border-border hover:border-primary/50 transition-all group p-0 overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PHOTO & AERIAL GALLERY */}
        <section className="py-20 md:py-28 bg-card/30 border-b border-border">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold tracking-widest uppercase mb-3">Visual Tour</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Photo & Aerial Gallery</h2>
            </div>

            {/* Main Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {property.photos.map((photo, index) => (
                <div 
                  key={index}
                  className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                    index === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                  onClick={() => setCurrentPhotoIndex(index)}
                >
                  <img
                    src={photo}
                    alt={`Property view ${index + 1}`}
                    className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium bg-background/80 px-3 py-1.5 rounded-full">View {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Aerial Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Compass className="h-6 w-6 text-primary" />
                Aerial Perspectives
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {property.aerialPhotos.map((photo, index) => (
                  <div key={index} className="relative overflow-hidden rounded-xl group">
                    <img
                      src={photo}
                      alt={`Aerial view ${index + 1}`}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-semibold text-lg">{index === 0 ? "Property Overview" : "Surrounding Area"}</p>
                      <p className="text-sm text-muted-foreground">6.8 acres of private land</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Earth Link */}
              <div className="mt-8 text-center">
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <a href={property.googleEarthLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Explore in Google Earth 3D
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* LOCATION INTELLIGENCE */}
        <section className="py-20 md:py-28 border-b border-border">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold tracking-widest uppercase mb-3">Location Intelligence</p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Strategic Position in Warren County
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  1999 Ridge Road sits in one of the Capital Region's most desirable corridors—close enough 
                  to Lake George for weekend retreats, yet positioned for year-round living with full amenities nearby.
                </p>

                <div className="space-y-4">
                  {[
                    { label: "Lake George Village", distance: "8 min", icon: Mountain },
                    { label: "Glens Falls Hospital", distance: "12 min", icon: Shield },
                    { label: "Aviation Mall / Shopping", distance: "6 min", icon: Home },
                    { label: "I-87 Northway Access", distance: "4 min", icon: TrendingUp },
                    { label: "Albany International Airport", distance: "45 min", icon: Compass },
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <span className="text-primary font-bold">{item.distance}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden border border-border bg-card">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2900!2d${property.longitude}!3d${property.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDIwJzQ5LjciTiA3M8KwNDAnNDQuMCJX!5e0!3m2!1sen!2sus!4v1234567890`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg">
                  <p className="font-bold">Queensbury, NY</p>
                  <p className="text-sm opacity-80">Warren County</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARKET CONTEXT SNAPSHOT */}
        <section className="py-20 md:py-28 bg-card/30 border-b border-border">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold tracking-widest uppercase mb-3">Market Context</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Local Market Snapshot</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Data-driven context to help you understand this property's position in the current market.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {marketContext.map((item, index) => (
                <Card key={index} className="bg-card border-border text-center p-0">
                  <CardContent className="p-8">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">{item.label}</p>
                    <p className="text-4xl font-extrabold text-foreground mb-2">{item.value}</p>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      {item.trend}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Analyst Note</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Warren County's 6+ acre parcels have seen limited new inventory over the past 18 months, 
                    with demand driven by remote workers and second-home buyers seeking Adirondack proximity. 
                    This property's combination of acreage, privacy, and accessibility to Lake George creates 
                    a compelling value proposition in the current market environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROPERTY INTELLIGENCE TEASER + LEAD FORM */}
        <section id="intelligence" className="py-20 md:py-28 border-b border-border">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Intelligence Teaser */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Exclusive Analysis</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Get Your Property Intelligence Report
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our intelligence reports go beyond basic listing data. Receive actionable insights 
                  curated by local market experts—not algorithms.
                </p>

                <div className="space-y-4">
                  {[
                    "Detailed comparable sales analysis",
                    "Tax assessment breakdown & projections",
                    "Zoning and development potential",
                    "Infrastructure & utility assessment",
                    "Investment scenario modeling",
                    "Negotiation strategy recommendations"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Lead Form */}
              <div>
                <Card className="bg-card border-border">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-2">Request Your Report</h3>
                    <p className="text-muted-foreground mb-6">
                      Fill out the form below and our team will prepare a customized intelligence 
                      report for this property within 24 hours.
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <Input
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Input
                          type="tel"
                          placeholder="Phone (optional)"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="Any specific questions about this property?"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={3}
                          className="bg-background border-border resize-none"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full rounded-full font-bold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Get My Intelligence Report"}
                      </Button>
                    </form>

                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      By submitting, you agree to receive communications from Capital District Nest. 
                      Your information is never sold.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
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
              analytics with deep local market expertise. Every listing on Capital District Nest benefits from 
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
        <section className="py-20 md:py-28">
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