import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Shield, Star, Phone, Mail } from "lucide-react";
import { useAnalytics } from '@/components/AnalyticsTracker';

const InvestmentLanding = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { trackLeadFormSubmission, trackPropertyInquiry } = useAnalytics();
  const navigate = useNavigate();

  const submitContactForm = async (formData: any) => {
    try {
      const response = await fetch('https://akonlzlpbdoqmczidfwm.supabase.co/functions/v1/submit-contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrb25semxwYmRvcW1jemlkZndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NTcxMjMsImV4cCI6MjA2NjEzMzEyM30.Aqc8YNgNPhnoKErL5FqnwHUnejVhuaRVGel9sm2PJHc`,
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: "Investment property inquiry from landing page",
        type: "investment"
      };

      const result = await submitContactForm(submissionData);

      if (result.success) {
        trackLeadFormSubmission('investment', 'Investment Landing Page');
        trackPropertyInquiry('investment', 'Capital District');

        // Track Google Ads conversion
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-922988725/MCepCNv03PgaELXhjrgD',
            'value': 1.0,
            'currency': 'USD'
          });
        }

        toast({
          title: "Success! Check your email",
          description: "We'll send your exclusive property list within 15 minutes.",
        });

        setFormData({ name: "", email: "", phone: "" });
        
        // Redirect to homepage after successful submission
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or call us at (518) 676-2347",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Helmet>
        <title>Investment Properties Capital District | High-Return Deals | Capital District Nest</title>
        <meta name="description" content="Get exclusive access to off-market multi-unit properties and rehab opportunities in Albany, Troy, Schenectady. Join 200+ investors receiving weekly alerts." />
        <link rel="canonical" href="https://capitaldistrictnest.com/investment-properties" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
            Find Your Next High-Return Investment Property in the Capital District
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Get exclusive access to off-market multi-unit properties and rehab opportunities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Left Column - Benefits */}
          <div className="space-y-8">
            {/* Benefits List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary">Why Choose Our Investment Properties?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Access exclusive off-market listings before they hit the market</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Expert analysis on rehab potential and ROI calculations</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Get matched with a local investment expert</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Properties in prime Capital District locations</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Detailed market analysis and comps included</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <a href="https://www.broadviewfcu.com/personal/home-lending-solutions/meet-the-mortgage-team/christie-hoyt/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
                      Financing assistance and investor-friendly lenders
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Scott's Photo & Info */}
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
                  <img 
                    src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" 
                    alt="Scott Alvarez - Investment Property Expert"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Scott Alvarez</h3>
                  <p className="text-sm text-muted-foreground">Remax Solutions</p>
                </div>
              </div>
              <blockquote className="text-muted-foreground italic">
                "Working with Scott helped me find my first investment property. The ROI analysis was spot-on, 
                and I've been getting consistent returns for 2 years now."
              </blockquote>
              <p className="text-sm text-muted-foreground mt-2">- Sarah M., Albany Investor</p>
            </div>

            {/* Large Contact Information */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-primary mb-4">Ready to Start Investing?</h3>
                
                <div className="space-y-3">
                  <p className="text-primary text-sm opacity-90">Call Now for Expert Investment Advice</p>
                  <a 
                    href="tel:+15186762347" 
                    className="text-primary text-3xl md:text-4xl font-bold hover:text-primary/80 transition-colors duration-200 flex items-center justify-center"
                  >
                    📞 (518) 676-2347
                  </a>
                  <a 
                    href="mailto:scottalvarez@remax.net" 
                    className="text-primary text-lg md:text-xl font-semibold hover:text-primary/80 transition-colors duration-200 flex items-center justify-center"
                  >
                    ✉️ scottalvarez@remax.net
                  </a>
                  <p className="text-primary text-sm opacity-90">Available 7 Days a Week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Lead Capture Form */}
          <div className="lg:sticky lg:top-8">
            <Card className="bg-white shadow-2xl border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-primary">
                  Get This Week's Exclusive Deals
                </CardTitle>
                <p className="text-muted-foreground">
                  Join 200+ local investors receiving weekly property alerts
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      placeholder="(518) 555-0123"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                  </div>

                  {/* CTA Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                  >
                    {isSubmitting ? "Sending..." : "See Available Properties Now"}
                  </Button>
                  
                  {/* Trust & Security */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        100% Secure
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        No Spam
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        (518) 676-2347
                      </div>
                    </div>
                    
                    <div className="text-center text-xs text-muted-foreground space-y-1">
                      <p>✓ Get your property list within 15 minutes</p>
                      <p>✓ Your information is 100% private</p>
                      <p>✓ Unsubscribe anytime with one click</p>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentLanding;