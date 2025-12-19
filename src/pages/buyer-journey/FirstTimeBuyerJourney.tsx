import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import FAQSection from "@/components/FAQSection";
import JourneyLeadMagnet from "@/components/JourneyLeadMagnet";
import { Home, CheckCircle, ArrowRight, DollarSign, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const firstTimeFaqs = [
  {
    question: "How much do I need for a down payment in Albany?",
    answer: "Many first-time buyers put down 3-5% with conventional loans, or 3.5% with FHA. There are also down payment assistance programs in Albany County that can provide $10,000-$30,000+ toward your purchase. We help you find and apply for every program you qualify for.",
  },
  {
    question: "What grants are available for first-time buyers in NY?",
    answer: "New York offers several programs including SONYMA (State of NY Mortgage Agency) with down payment assistance, local municipal grants, and employer-assisted housing programs. Each has different income limits and requirements. We track all active programs and match you with the right ones.",
  },
  {
    question: "What credit score do I need to buy a house?",
    answer: "Minimum credit scores vary by loan type: 620+ for conventional, 580+ for FHA (or 500+ with 10% down), and no minimum for VA loans. However, higher scores get better rates. We work with lenders who specialize in helping buyers improve their credit if needed.",
  },
  {
    question: "How long does it take to buy a house?",
    answer: "Once you're pre-approved, the typical timeline is 30-60 days from accepted offer to closing. The pre-approval process takes 1-3 days. We recommend getting pre-approved before you start shopping so you can move quickly when you find the right home.",
  },
  {
    question: "What are closing costs and how much should I budget?",
    answer: "Closing costs in NY typically run 2-5% of the purchase price and include lender fees, title insurance, taxes, and attorney fees. On a $250,000 home, expect $5,000-$12,500. Some costs can be negotiated or covered by seller concessions — we help you minimize these expenses.",
  },
];

const FirstTimeBuyerJourney = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>First-Time Home Buyer Guide | Albany Area Grants & Programs | Capital District Nest</title>
        <meta 
          name="description" 
          content="First-time home buyer? We simplify grants, down-payment assistance, and the buying process in Albany, Troy, and Schenectady. Get your free buyer's checklist." 
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/buyer-journey/first-time-buyer" />
      </Helmet>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Home className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">First-Time Buyer Journey</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Your First Home, Made Simple
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Buying your first home doesn't have to be overwhelming. We break down grants, financing, and every step of the process — so you know exactly what to expect.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Link to="/first-time-homebuyers">
                  See Available Programs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/grants">View Grant Options</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-12 px-4 bg-card">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Your Path to Homeownership
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-background border-border relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                <CardContent className="pt-8">
                  <h3 className="font-semibold text-foreground mb-2">Get Pre-Approved</h3>
                  <p className="text-sm text-muted-foreground">
                    Know exactly what you can afford and show sellers you're serious.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                <CardContent className="pt-8">
                  <h3 className="font-semibold text-foreground mb-2">Find Your Home</h3>
                  <p className="text-sm text-muted-foreground">
                    We search listings, schedule tours, and help you find the right fit.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                <CardContent className="pt-8">
                  <h3 className="font-semibold text-foreground mb-2">Make an Offer</h3>
                  <p className="text-sm text-muted-foreground">
                    We negotiate terms, handle inspections, and protect your interests.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">4</div>
                <CardContent className="pt-8">
                  <h3 className="font-semibold text-foreground mb-2">Close & Move In</h3>
                  <p className="text-sm text-muted-foreground">
                    We guide you through closing and hand you the keys to your new home.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Help With */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              How We Help First-Time Buyers
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Grants & Assistance</h3>
                  <p className="text-sm text-muted-foreground">
                    We track every down payment assistance program in the Capital District and help you apply for everything you qualify for.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <FileText className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Paperwork Simplified</h3>
                  <p className="text-sm text-muted-foreground">
                    We explain every document, deadline, and step in plain language. No surprises, no confusion.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Lender Connections</h3>
                  <p className="text-sm text-muted-foreground">
                    We connect you with first-time-buyer-friendly lenders who offer competitive rates and excellent service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Lead Magnet Section */}
        <section className="py-12 px-4 bg-background">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Get Your Free Buyer's Checklist
              </h2>
              <p className="text-muted-foreground mb-6">
                Download our step-by-step checklist for first-time buyers, plus a complete guide to Albany-area grant programs and assistance.
              </p>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <span>Complete pre-approval checklist</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <span>Albany-area grant programs guide</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <span>Home search & offer timeline</span>
                </li>
              </ul>
            </div>
            <JourneyLeadMagnet
              journeyType="first-time"
              title="Free First-Time Buyer Kit"
              description="Checklist + grant guide delivered to your inbox."
              benefits={[
                "Know exactly what to expect",
                "Find grants you qualify for",
                "Avoid common first-time mistakes",
              ]}
              downloadName="Buyer's Checklist"
            />
          </div>
        </section>

        {/* FAQ Section with Schema */}
        <FAQSection 
          faqs={firstTimeFaqs}
          pageUrl="https://capitaldistrictnest.com/buyer-journey/first-time-buyer"
        />

        {/* Final CTA */}
        <section className="py-12 px-4 bg-emerald-600 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to Stop Renting?</h2>
            <p className="mb-6 opacity-90">
              Let's find out what you qualify for and start your home search today.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/first-time-homebuyers">
                See Your Options
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default FirstTimeBuyerJourney;
