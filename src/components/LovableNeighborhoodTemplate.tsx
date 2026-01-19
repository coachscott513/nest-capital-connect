import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { 
  ChevronRight, 
  MapPin, 
  Clock, 
  GraduationCap, 
  TrendingUp, 
  Coffee, 
  TreePine, 
  Sparkles,
  Heart,
  Phone,
  MessageCircle,
  BadgeCheck,
  Building2,
  Home,
  Star,
  ArrowRight,
  Send
} from "lucide-react";
import { motion } from "framer-motion";

interface HiddenGem {
  name: string;
  description: string;
  icon?: React.ReactNode;
}

interface PracticalData {
  commuteToAlbany?: string;
  commuteToEmployers?: string;
  schoolDistrict?: string;
  schoolRating?: string;
  medianPrice?: string;
  daysOnMarket?: string;
  priceChange?: string;
}

interface VendorSpotlight {
  name: string;
  type: "finance" | "legal" | "contractor" | "insurance";
  contactName: string;
  phone: string;
  badge?: string;
}

interface LovableNeighborhoodTemplateProps {
  neighborhoodName: string;
  cityName: string;
  citySlug: string;
  neighborhoodSlug: string;
  pageTitle: string;
  metaDescription: string;
  keywords: string;
  // The Emotional Hook
  vibeDescription: string;
  dayInLifeNarrative: string;
  heroImage?: string;
  // Hidden Gems
  hiddenGems: HiddenGem[];
  // Practical Living Data
  practicalData: PracticalData;
  // Featured Vendors (Vendor Row)
  vendors?: VendorSpotlight[];
  // Additional highlights
  highlights?: string[];
}

const LovableNeighborhoodTemplate = ({
  neighborhoodName,
  cityName,
  citySlug,
  neighborhoodSlug,
  pageTitle,
  metaDescription,
  keywords,
  vibeDescription,
  dayInLifeNarrative,
  heroImage,
  hiddenGems,
  practicalData,
  vendors = [],
  highlights = []
}: LovableNeighborhoodTemplateProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuickMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    // Reset form
    setEmail("");
    setName("");
  };

  const vendorTypeConfig = {
    finance: { label: "Mortgage Lender", icon: <Building2 className="h-5 w-5" />, color: "from-emerald-500/20 to-emerald-900/10" },
    legal: { label: "Real Estate Attorney", icon: <GraduationCap className="h-5 w-5" />, color: "from-blue-500/20 to-blue-900/10" },
    contractor: { label: "Vetted Contractor", icon: <Home className="h-5 w-5" />, color: "from-amber-500/20 to-amber-900/10" },
    insurance: { label: "Insurance Agent", icon: <BadgeCheck className="h-5 w-5" />, color: "from-purple-500/20 to-purple-900/10" }
  };

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={metaDescription}
        keywords={keywords}
        canonical={`https://capitaldistrictnest.com/neighborhoods/${citySlug}/${neighborhoodSlug}`}
      />
      <MainHeader />
      
      <main className="min-h-screen bg-background">
        {/* Breadcrumb Navigation */}
        <nav className="bg-muted/50 py-4 px-4 border-b border-border/50">
          <div className="container mx-auto max-w-6xl">
            <ol className="flex items-center space-x-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <li><Link to="/homes-for-sale" className="text-muted-foreground hover:text-primary transition-colors">Neighborhoods</Link></li>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <li><Link to={`/homes-for-sale/${citySlug}`} className="text-muted-foreground hover:text-primary transition-colors">{cityName}</Link></li>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <li className="font-medium text-foreground">{neighborhoodName}</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section - Emotional Hook */}
        <section className="relative py-24 px-4 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          
          {/* Decorative blurs */}
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-primary/30 bg-primary/5">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                {cityName} Neighborhood Guide
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight mb-6">
                {neighborhoodName}
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
                {vibeDescription}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Day in the Life Narrative */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
              
              <div className="pl-8">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-widest mb-4">
                  <Sparkles className="w-4 h-4" />
                  A Day in {neighborhoodName}
                </span>
                
                <p className="text-xl md:text-2xl text-foreground/90 font-light leading-relaxed italic">
                  "{dayInLifeNarrative}"
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hidden Gems Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">Local Secrets</span>
              <h2 className="text-4xl md:text-5xl font-light text-foreground mt-4">
                Hidden Gems
              </h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                The spots only locals know about—from quiet parks to neighborhood favorites
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hiddenGems.map((gem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        {gem.icon || <Heart className="w-6 h-6 text-primary" />}
                      </div>
                      <CardTitle className="text-lg font-semibold">{gem.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {gem.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhood Snapshot - Practical Data */}
        <section className="py-20 px-4 bg-gradient-to-br from-foreground to-foreground/95">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">Market Intelligence</span>
              <h2 className="text-4xl md:text-5xl font-light text-background mt-4">
                Neighborhood Snapshot
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Commute Times */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative rounded-3xl bg-background/10 backdrop-blur-[30px] border border-white/10 p-8">
                  <Clock className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-background mb-4">Commute Times</h3>
                  <div className="space-y-3 text-background/80">
                    {practicalData.commuteToAlbany && (
                      <div className="flex justify-between">
                        <span>To Downtown Albany</span>
                        <span className="font-medium text-primary">{practicalData.commuteToAlbany}</span>
                      </div>
                    )}
                    {practicalData.commuteToEmployers && (
                      <div className="flex justify-between">
                        <span>To Major Employers</span>
                        <span className="font-medium text-primary">{practicalData.commuteToEmployers}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* School Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative rounded-3xl bg-background/10 backdrop-blur-[30px] border border-white/10 p-8">
                  <GraduationCap className="w-10 h-10 text-cyan-400 mb-4" />
                  <h3 className="text-lg font-semibold text-background mb-4">Schools</h3>
                  <div className="space-y-3 text-background/80">
                    {practicalData.schoolDistrict && (
                      <div className="flex justify-between">
                        <span>District</span>
                        <span className="font-medium text-cyan-400">{practicalData.schoolDistrict}</span>
                      </div>
                    )}
                    {practicalData.schoolRating && (
                      <div className="flex justify-between">
                        <span>Rating</span>
                        <span className="font-medium text-cyan-400">{practicalData.schoolRating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Market Trends */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative rounded-3xl bg-background/10 backdrop-blur-[30px] border border-white/10 p-8">
                  <TrendingUp className="w-10 h-10 text-emerald-400 mb-4" />
                  <h3 className="text-lg font-semibold text-background mb-4">Market Trends</h3>
                  <div className="space-y-3 text-background/80">
                    {practicalData.medianPrice && (
                      <div className="flex justify-between">
                        <span>Median Price</span>
                        <span className="font-medium text-emerald-400">{practicalData.medianPrice}</span>
                      </div>
                    )}
                    {practicalData.daysOnMarket && (
                      <div className="flex justify-between">
                        <span>Days on Market</span>
                        <span className="font-medium text-emerald-400">{practicalData.daysOnMarket}</span>
                      </div>
                    )}
                    {practicalData.priceChange && (
                      <div className="flex justify-between">
                        <span>YoY Change</span>
                        <span className="font-medium text-emerald-400">{practicalData.priceChange}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vendor Row - Professional Network */}
        {vendors.length > 0 && (
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">Your Support Team</span>
                <h2 className="text-4xl md:text-5xl font-light text-foreground mt-4">
                  {neighborhoodName} Professional Network
                </h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Nest-vetted professionals who know {neighborhoodName} inside and out
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {vendors.map((vendor, index) => {
                  const config = vendorTypeConfig[vendor.type];
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative group rounded-3xl p-6 bg-gradient-to-br ${config.color} backdrop-blur-[30px] border border-white/10 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.2)] transition-all duration-300`}
                    >
                      {/* Nest Vetted Badge */}
                      <div className="absolute -top-3 -right-3 z-10">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-sm bg-primary/30 border-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
                          <BadgeCheck className="h-4 w-4 text-primary" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            Nest Vetted
                          </span>
                        </div>
                      </div>

                      {/* Category */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-background/20 flex items-center justify-center">
                          {config.icon}
                        </div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          {config.label}
                        </span>
                      </div>

                      {/* Vendor Info */}
                      <h4 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {vendor.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">{vendor.contactName}</p>
                      
                      {vendor.badge && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-primary/20 text-primary rounded-full border border-primary/30 mb-4">
                          <Star className="h-2.5 w-2.5 fill-primary" />
                          {vendor.badge}
                        </span>
                      )}

                      {/* Quick Actions */}
                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 h-9 text-xs bg-background/50 hover:bg-background/80 border-white/20"
                          onClick={() => window.open(`tel:${vendor.phone}`, "_self")}
                        >
                          <Phone className="h-3.5 w-3.5 mr-1.5" />
                          Call
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 h-9 text-xs bg-background/50 hover:bg-background/80 border-white/20"
                          onClick={() => window.open(`sms:${vendor.phone}`, "_self")}
                        >
                          <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                          Text
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Property Search Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-light text-foreground text-center mb-8">
              Available Homes in {neighborhoodName}
            </h2>
            
            <div className="w-full max-w-[960px] mx-auto mb-8">
              <iframe 
                className="w-full h-[600px] border-0 rounded-2xl"
                src={`https://scottalvarez.remax.com/wide.php?city=${encodeURIComponent(cityName)}&neighborhood=${encodeURIComponent(neighborhoodName)}`}
                title={`${neighborhoodName} Property Listings`}
              />
            </div>

            <div className="text-center mt-8">
              <Button size="lg" variant="outline" asChild>
                <Link to={`/homes-for-sale/${citySlug}`}>
                  View All {cityName} Homes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Match CTA Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto max-w-3xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-primary/30 bg-primary/5">
                <Heart className="w-4 h-4 mr-2 text-primary" />
                VIP Access
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
                Love the {neighborhoodName} vibe?
              </h2>
              <p className="text-xl text-muted-foreground mb-2">
                Get your VIP Neighborhood Access
              </p>
              <p className="text-muted-foreground max-w-xl mx-auto mb-10">
                Stop scrolling through old listings. Fill out our 30-second Quick Match form, and I'll send you a curated list of homes in {neighborhoodName} that actually fit your criteria—including properties not yet on the public market.
              </p>

              <form onSubmit={handleQuickMatch} className="max-w-md mx-auto space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-14 px-6 rounded-2xl border-border/50 bg-background/80 backdrop-blur-sm text-lg"
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 px-6 rounded-2xl border-border/50 bg-background/80 backdrop-blur-sm text-lg"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 text-lg rounded-2xl bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Get My VIP List
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-6">
                No spam. Just curated {neighborhoodName} listings matched to you.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default LovableNeighborhoodTemplate;
