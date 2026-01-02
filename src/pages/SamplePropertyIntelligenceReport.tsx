import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Home, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  MapPin,
  Building,
  Calendar,
  CheckCircle,
  BarChart3,
  AlertCircle,
  Ruler,
  Trees
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SamplePropertyIntelligenceReport = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    propertyAddress: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) {
      toast.error("Please enter your name and email");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('submit-contact-form', {
        body: {
          name: formData.firstName,
          email: formData.email,
          message: `Property Intelligence Report Request${formData.propertyAddress ? `: ${formData.propertyAddress}` : ''}`,
          type: 'intel-report',
          boldtrailTag: 'property-intel-request'
        }
      });

      if (error) throw error;

      toast.success("Request received! We'll be in touch soon.");
      setFormData({ firstName: "", email: "", propertyAddress: "" });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sample Property Intelligence Report | Capital District Nest</title>
        <meta 
          name="description" 
          content="See what a full property intelligence report includes: tax data, pricing context, market forces, and actionable insights for Delmar-area properties."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/reports/sample-property-intelligence" />
      </Helmet>

      <MainHeader />

      {/* Hero Section */}
      <section className="px-[5%] py-16 md:py-20 bg-gradient-to-br from-primary/5 via-background to-background border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            Sample Report
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground mb-4">
            Sample Delmar Property
          </h1>
          <p className="text-lg text-primary font-medium mb-4">
            Intelligence Report Example
          </p>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            This is a representative example for educational purposes. It shows the depth of analysis available when evaluating any property in Delmar.
          </p>
        </div>
      </section>

      {/* Section 1: Property Snapshot */}
      <section className="px-[5%] py-12 md:py-16 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Home className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Property Snapshot</h2>
          </div>

          <Card className="border-2 border-border">
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p className="font-semibold text-foreground">Single-Family Home</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Ruler className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Approx. Square Footage</p>
                      <p className="font-semibold text-foreground">1,800 – 2,400 sq ft</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Trees className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Lot Size Range</p>
                      <p className="font-semibold text-foreground">0.25 – 0.50 acres</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Year Built Range</p>
                      <p className="font-semibold text-foreground">1955 – 1985</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">School District</p>
                      <p className="font-semibold text-foreground">Bethlehem Central</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tax Class</p>
                      <p className="font-semibold text-foreground">Residential (210)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic">
                  Note: This is a representative example for educational purposes only.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 2: Tax & Ownership Intelligence */}
      <section className="px-[5%] py-12 md:py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Tax & Ownership Intelligence</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4">How Taxes Are Structured</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Town of Bethlehem property taxes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Bethlehem Central School District levy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Albany County taxes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Fire district assessment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4">Typical Delmar Tax Ranges</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Property Tax (Typical)</p>
                    <p className="text-xl font-bold text-foreground">$8,000 – $14,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tax Rate per $1,000</p>
                    <p className="text-lg font-semibold text-foreground">~$28 – $32</p>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      STAR exemption may reduce school taxes by $700–$1,500 annually for primary residents.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-3">What Buyers Often Overlook</h3>
              <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                  <span>Reassessment timing and frequency</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                  <span>Exemption transfer eligibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                  <span>Special district fees not shown on MLS</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                  <span>Assessment ratio vs. market value</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 3: Pricing Context */}
      <section className="px-[5%] py-12 md:py-16 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Pricing Context</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            This shows how pricing works in Delmar, not what a specific property is worth.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4">Recent Delmar Sale Ranges</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Entry-Level Homes</span>
                    <span className="font-semibold text-foreground">$300K – $380K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Mid-Market Homes</span>
                    <span className="font-semibold text-foreground">$380K – $500K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Upper-Market Homes</span>
                    <span className="font-semibold text-foreground">$500K – $750K+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4">Market Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Price per Sq Ft (Avg)</span>
                    <span className="font-semibold text-foreground">$175 – $220</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">List-to-Sale Ratio</span>
                    <span className="font-semibold text-foreground">98% – 102%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Days on Market (Median)</span>
                    <span className="font-semibold text-foreground">12 – 21 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4: Market Forces */}
      <section className="px-[5%] py-12 md:py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Market Forces</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-foreground mb-2">Inventory Pressure</h3>
                  <p className="text-muted-foreground text-sm">
                    Delmar consistently has low inventory relative to demand. Homes in the Bethlehem Central district often receive multiple offers within the first week.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Buyer Demand Signals</h3>
                  <p className="text-muted-foreground text-sm">
                    Strong demand from young families prioritizing school district. Relocation buyers from NYC metro continue to drive competition.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-foreground mb-2">Seasonality</h3>
                  <p className="text-muted-foreground text-sm">
                    Peak activity March–June. Inventory typically lowest in December–February. Fall market can offer less competition for buyers.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Delmar vs. Nearby Towns</h3>
                  <p className="text-muted-foreground text-sm">
                    Premium of 10–15% over Selkirk/Glenmont for comparable homes. Slightly below Slingerlands for larger properties.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 5: How to Use This Intelligence */}
      <section className="px-[5%] py-12 md:py-16 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">How to Use This Intelligence</h2>
          </div>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 md:p-8">
              <p className="text-lg text-foreground mb-6">
                This report shows the depth of analysis available when evaluating any property in Delmar.
              </p>
              <p className="text-muted-foreground mb-6">
                Buyers and homeowners can request a personalized version for a specific address. Each report includes:
              </p>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Actual tax data for the specific property</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Comparable sales and pricing context</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Local market trends and conditions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Ownership history and assessment data</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA: Request Private Report */}
      <section className="px-[5%] py-16 md:py-20 bg-muted/30">
        <div className="max-w-xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Request a Private Property Intelligence Report
                </h2>
                <p className="text-muted-foreground">
                  Tax data • Pricing context • Local trends • No obligation
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="h-12"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12"
                  required
                />
                <Input
                  type="text"
                  placeholder="Property address you'd like analyzed (optional)"
                  value={formData.propertyAddress}
                  onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                  className="h-12"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-12 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Request My Report"}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                No spam. No sales pressure. Just data.
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Link 
              to="/towns/delmar" 
              className="text-primary font-medium hover:underline"
            >
              ← Back to Delmar Market Intelligence
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border md:hidden z-50">
        <Button 
          size="lg" 
          className="w-full h-12 font-bold"
          onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Request My Report
        </Button>
      </div>
    </div>
  );
};

export default SamplePropertyIntelligenceReport;
