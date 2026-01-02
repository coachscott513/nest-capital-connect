import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { 
  DollarSign, 
  Home, 
  FileText, 
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const programs = [
  {
    title: "FHA Loans",
    description: "3.5% down payment with flexible credit requirements. Ideal for first-time buyers.",
    highlight: "3.5% down",
  },
  {
    title: "SONYMA Programs",
    description: "New York State low-interest mortgages with down payment assistance up to $15,000.",
    highlight: "Up to $15K assistance",
  },
  {
    title: "VA Loans",
    description: "0% down payment for veterans and active military. No PMI required.",
    highlight: "0% down",
  },
  {
    title: "USDA Loans",
    description: "0% down for rural areas. Many Capital District suburbs qualify.",
    highlight: "0% down (rural)",
  },
  {
    title: "Local Grants",
    description: "Albany, Schenectady, and Troy offer city-specific down payment assistance.",
    highlight: "City grants available",
  },
  {
    title: "Seller Concessions",
    description: "Negotiate up to 6% of purchase price for closing costs in buyer's markets.",
    highlight: "Up to 6% savings",
  },
];

const myths = [
  {
    myth: "You need 20% down to buy a house",
    reality: "Most first-time buyers put down 3-6%. Many programs offer 0% down options.",
  },
  {
    myth: "You need perfect credit",
    reality: "FHA loans accept credit scores as low as 580. Some programs go lower.",
  },
  {
    myth: "Renting is always cheaper than buying",
    reality: "In many Capital District markets, monthly mortgage payments are less than rent.",
  },
  {
    myth: "You can't afford closing costs",
    reality: "Seller concessions, lender credits, and grants can cover most or all closing costs.",
  },
  {
    myth: "You should wait until you're 'ready'",
    reality: "Building equity starts the day you close. Waiting means missing appreciation.",
  },
];

const wishTheyKnew = [
  "Get pre-approved BEFORE you start looking at homes — it makes offers stronger.",
  "The list price is a starting point. Almost everything is negotiable.",
  "Home inspections reveal issues sellers must address or credit you for.",
  "Your first home doesn't need to be your forever home.",
  "Closing costs are 2-5% of purchase price — budget for them.",
  "Interest rates matter, but so does the total payment including taxes and insurance.",
];

const rentVsBuy = [
  { rent: "Monthly payment builds landlord's wealth", buy: "Monthly payment builds your equity" },
  { rent: "Rent increases every year", buy: "Fixed mortgage payment (30-year)" },
  { rent: "No tax benefits", buy: "Mortgage interest deduction" },
  { rent: "Can't customize", buy: "Make it your own" },
  { rent: "Flexible — can move easily", buy: "Stability — roots in community" },
];

const FirstTimeBuyerHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <Helmet>
        <title>First-Time Home Buyer Guide — Grants, Programs & Real Advice | Capital District Nest</title>
        <meta name="description" content="Everything first-time home buyers need to know. FHA, SONYMA, VA loans, down payment assistance, and what people wish they knew before buying." />
        <meta name="keywords" content="first time home buyer albany ny, down payment assistance, fha loans capital district, sonyma programs, first time buyer grants ny" />
        <link rel="canonical" href="https://capitaldistrictnest.com/first-time-buyers" />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="py-20 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">Capital District Nest</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              First-Time Buyers
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Real information. No pressure. Just clarity.
            </p>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-16 px-4 bg-card border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <DollarSign className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Programs & Grants</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {programs.map((program) => (
                <div key={program.title} className="bg-background border border-border rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{program.title}</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                      {program.highlight}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Myths */}
        <section className="py-16 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Common Myths — Debunked</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {myths.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`myth-${index}`}
                  className="border border-border rounded-xl px-5 bg-card"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-foreground font-medium">"{item.myth}"</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-start gap-3 pt-2 pb-1">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{item.reality}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Rent vs Buy */}
        <section className="py-16 px-4 bg-card border-b border-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Rent vs. Buy</h2>
            </div>
            <div className="bg-background border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-2 bg-muted/50">
                <div className="p-4 text-center font-semibold text-muted-foreground border-r border-border">Renting</div>
                <div className="p-4 text-center font-semibold text-primary">Buying</div>
              </div>
              {rentVsBuy.map((row, index) => (
                <div key={index} className="grid grid-cols-2 border-t border-border">
                  <div className="p-4 text-sm text-muted-foreground border-r border-border">{row.rent}</div>
                  <div className="p-4 text-sm text-foreground">{row.buy}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What People Wish They Knew */}
        <section className="py-16 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Lightbulb className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">What People Wish They Knew Before Buying</h2>
            </div>
            <div className="space-y-3">
              {wishTheyKnew.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                  <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-card">
          <div className="max-w-2xl mx-auto text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Have Questions?</h2>
            <p className="text-muted-foreground mb-8">
              We'll explain — no pressure. This is about helping you understand your options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8">
                Ask a Question
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <a href="/grants">
                  View All Grants
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default FirstTimeBuyerHub;
