import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { TrendingUp, Home, Mountain, Wallet, ArrowRight, CheckCircle, BookOpen, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const journeys = [
  {
    id: "investor",
    title: "Investors",
    description: "Build long-term wealth with real data. Analyze cash flow, compare opportunities, and identify properties that actually make sense.",
    icon: TrendingUp,
    path: "/investment-properties",
    features: ["Deal analysis & cash flow", "Neighborhood investment guides", "Off-market opportunities"],
    hasLeadCapture: true,
  },
  {
    id: "first-time",
    title: "First-Time Home Buyers",
    description: "Buying your first home doesn't have to be overwhelming. We simplify grants, financing, and the buying process.",
    icon: Home,
    path: "/first-time-home-buyers",
    features: ["Down payment grants", "Low-cost financing options", "Step-by-step guidance"],
    hasLeadCapture: true,
  },
  {
    id: "land",
    title: "Land Buyers",
    description: "Land can be a smart investment — or a costly mistake. Understand zoning, utilities, and long-term potential.",
    icon: Mountain,
    path: "/land-buyers",
    features: ["Zoning & permits", "Utility feasibility", "Build cost estimates"],
    hasLeadCapture: true,
  },
  {
    id: "financing",
    title: "Financing & Mortgages",
    description: "Financing decisions impact everything. Explore mortgage options and how they affect long-term costs.",
    icon: Wallet,
    path: "/financing",
    features: ["Mortgage comparisons", "Assistance programs", "Investor vs. owner loans"],
    hasLeadCapture: true,
  },
];

const guides = [
  {
    title: "NYC to Albany Investment Playbook",
    description: "Why investors are leaving the city for 10%+ cap rates upstate.",
    path: "/investor/nyc-to-albany-roi",
  },
  {
    title: "Best Neighborhoods for Cash Flow",
    description: "Ranked analysis of Capital District neighborhoods by investment potential.",
    path: "/investor/best-neighborhoods-cash-flow-capital-district",
  },
  {
    title: "How to Analyze a Multi-Family Property",
    description: "Step-by-step guide to evaluating rental property deals.",
    path: "/investor/analyze-multifamily",
  },
  {
    title: "1031 Exchange: NYC to Albany",
    description: "Defer capital gains and upgrade your portfolio with upstate properties.",
    path: "/investor/1031-nyc-to-albany",
  },
];

interface QuickLeadFormProps {
  journeyId: string;
  journeyTitle: string;
}

const QuickLeadForm = ({ journeyId, journeyTitle }: QuickLeadFormProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        full_name: "Quick Lead",
        email: email,
        message: `Quick lead from ${journeyTitle} card`,
        type: journeyId,
        lead_type: "buyer",
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "You're in!",
        description: "We'll send you resources and next steps.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center gap-2 text-sm text-primary">
        <CheckCircle className="w-4 h-4" />
        <span>Check your inbox!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-10 flex-1"
      />
      <Button type="submit" size="sm" disabled={isSubmitting} className="h-10 px-3">
        {isSubmitting ? "..." : <Send className="w-4 h-4" />}
      </Button>
    </form>
  );
};

const BuyerRoadmap = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Your Capital District Real Estate Roadmap</title>
        <meta 
          name="description" 
          content="Find the right path for your real estate journey in the Capital District. Whether you're investing, buying your first home, purchasing land, or exploring financing — start here." 
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/buyer-roadmap" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 px-[5%] bg-card border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Your Capital District Real Estate Roadmap
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real estate success starts with the right information. Whether you are building an investment portfolio, buying your first home, exploring land, or navigating financing — we have a clear path for you.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 px-[5%] bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            How to Choose the Right Buying Path
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="font-bold text-foreground mb-2">Start With Your Goal</p>
              <p className="text-muted-foreground text-sm">
                Are you looking to build wealth through rental income? Buy a home to live in? Secure land for future development? Your goal determines which resources matter most.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="font-bold text-foreground mb-2">Understand Your Timeline</p>
              <p className="text-muted-foreground text-sm">
                First-time buyers and investors have different timelines and urgency levels. Land buyers often play a longer game. Know your timeline before diving into listings.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="font-bold text-foreground mb-2">Know Your Financing Options</p>
              <p className="text-muted-foreground text-sm">
                The right loan product can save you tens of thousands. Owner-occupied buyers have access to programs investors do not. Explore financing early — it shapes what you can buy.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="font-bold text-foreground mb-2">Get Local Market Knowledge</p>
              <p className="text-muted-foreground text-sm">
                The Capital District is not one market — it is dozens. Albany, Troy, Schenectady, and suburbs each have different dynamics. Local expertise helps you find the right fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Cards */}
      <section className="py-12 px-[5%] bg-card border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Choose Your Path
            </h2>
            <p className="text-muted-foreground">
              Select the journey that matches your goals. Each path includes educational content, local insights, and actionable next steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {journeys.map((journey) => {
              const Icon = journey.icon;
              return (
                <div key={journey.id} className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{journey.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{journey.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {journey.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Quick Lead Capture */}
                  {journey.hasLeadCapture && (
                    <div className="border-t border-border pt-4 mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Get free resources & next steps:</p>
                      <QuickLeadForm journeyId={journey.id} journeyTitle={journey.title} />
                    </div>
                  )}
                  
                  <Link 
                    to={journey.path}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
                  >
                    Explore {journey.title}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Guides Section */}
      <section className="py-12 px-[5%] bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Latest Guides & Insights</h2>
              <p className="text-muted-foreground text-sm">Deep-dive resources for serious buyers and investors</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {guides.map((guide, index) => (
              <Link
                key={index}
                to={guide.path}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group"
              >
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-muted-foreground text-sm">{guide.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-[5%] bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Subscribe for Weekly Market Updates
          </h2>
          <p className="text-muted-foreground mb-8">
            Get local market insights, new listings, and investment analysis delivered to your inbox every week. Stay ahead of the Capital District real estate market.
          </p>
          <Link
            to="/vip-buyer-access"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
          >
            Subscribe Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Free weekly updates
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Local market data
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Unsubscribe anytime
            </span>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default BuyerRoadmap;
