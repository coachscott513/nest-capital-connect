import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import BuyerJourneyQuiz from "@/components/BuyerJourneyQuiz";
import { TrendingUp, Home, Mountain, Wallet, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const journeys = [
  {
    id: "investor",
    title: "Investors",
    description: "Build long-term wealth with real data. Analyze cash flow, compare opportunities, and identify properties that actually make sense.",
    icon: TrendingUp,
    path: "/buyer-journey/investor",
    features: ["Deal analysis & cash flow", "Neighborhood investment guides", "Off-market opportunities"],
    color: "bg-primary/10 text-primary",
  },
  {
    id: "first-time",
    title: "First-Time Home Buyers",
    description: "Buying your first home doesn't have to be overwhelming. We simplify grants, financing, and the buying process.",
    icon: Home,
    path: "/buyer-journey/first-time-buyer",
    features: ["Down payment grants", "Low-cost financing options", "Step-by-step guidance"],
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: "land",
    title: "Land Buyers",
    description: "Land can be a smart investment — or a costly mistake. Understand zoning, utilities, and long-term potential.",
    icon: Mountain,
    path: "/buyer-journey/land-buyer",
    features: ["Zoning & permits", "Utility feasibility", "Build cost estimates"],
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    id: "financing",
    title: "Financing & Mortgages",
    description: "Financing decisions impact everything. Explore mortgage options and how they affect long-term costs.",
    icon: Wallet,
    path: "/buyer-journey/financing",
    features: ["Mortgage comparisons", "Assistance programs", "Investor vs. owner loans"],
    color: "bg-blue-500/10 text-blue-600",
  },
];

const BuyerRoadmap = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Buyer Roadmap | Find Your Path to Real Estate Success | Capital District Nest</title>
        <meta 
          name="description" 
          content="Not sure where to start? Take our quiz to discover the right real estate path for you — whether you're investing, buying your first home, purchasing land, or exploring financing." 
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/buyer-roadmap" />
      </Helmet>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Your Buyer Roadmap
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Not sure where to start? We'll help you find the right path based on your goals, timeline, and experience level.
            </p>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Take the 60-Second Journey Quiz
              </h2>
              <p className="text-muted-foreground">
                Answer 3 quick questions and we'll recommend the perfect starting point for you.
              </p>
            </div>
            <BuyerJourneyQuiz />
          </div>
        </section>

        {/* Or Browse All Journeys */}
        <section className="py-12 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Or Choose Your Path
              </h2>
              <p className="text-muted-foreground">
                Already know what you're looking for? Jump directly to your journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {journeys.map((journey) => {
                const Icon = journey.icon;
                return (
                  <Card key={journey.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg ${journey.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-foreground">{journey.title}</CardTitle>
                          <p className="text-muted-foreground text-sm mt-1">{journey.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {journey.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full">
                        <Link to={journey.path}>
                          Start {journey.title} Journey
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 px-4 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Trusted by Buyers Across the Capital District
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>500+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>RE/MAX Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Economics-Driven Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Local Experts Since 2015</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default BuyerRoadmap;
