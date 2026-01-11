import { Link } from "react-router-dom";
import { Home, DollarSign, MapPin, TrendingUp, GraduationCap, FileText, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HomeBuyerHub = () => {
  const hubSections = [
    {
      id: "zero-down",
      icon: DollarSign,
      title: "Zero & Low Down Payment Programs",
      description: "Grants and assistance programs to help you buy with little to no money down.",
      links: [
        { label: "First-Time Homebuyer Programs", href: "/first-time-homebuyers" },
        { label: "$30k Down Payment Grants", href: "/grants" },
        { label: "Financing Options Guide", href: "/financing" },
      ],
    },
    {
      id: "mortgage",
      icon: FileText,
      title: "Mortgage Assistance & Grants",
      description: "Understand your financing options and find the best mortgage for your situation.",
      links: [
        { label: "First-Time Buyer Financing", href: "/buyer-journey/first-time-buyer" },
        { label: "Financing & Mortgages Hub", href: "/buyer-journey/financing" },
        { label: "Buyer Roadmap", href: "/buyer-roadmap" },
      ],
    },
    {
      id: "neighborhoods",
      icon: MapPin,
      title: "Neighborhood Guides",
      description: "Explore neighborhoods across the Capital District with local insights.",
      links: [
        { label: "Albany Neighborhoods", href: "/towns/albany" },
        { label: "Troy Neighborhoods", href: "/towns/troy" },
        { label: "Schenectady Areas", href: "/towns/schenectady" },
        { label: "Saratoga County", href: "/towns/saratoga-springs" },
        { label: "Delmar & Bethlehem", href: "/towns/delmar" },
        { label: "All Communities", href: "/communities" },
      ],
    },
    {
      id: "trends",
      icon: TrendingUp,
      title: "Market Trends",
      description: "Stay informed with the latest market data and price trends.",
      links: [
        { label: "Market Insights", href: "/insights" },
        { label: "Delmar Market Analysis", href: "/delmar-market-insights" },
        { label: "Single-Family Market Report", href: "/single-family-market" },
      ],
    },
    {
      id: "schools",
      icon: GraduationCap,
      title: "School District Insights",
      description: "Find homes in the best school districts for your family.",
      links: [
        { label: "Delmar Schools (Bethlehem CSD)", href: "/towns/delmar" },
        { label: "Niskayuna Schools", href: "/towns/niskayuna" },
        { label: "All Communities", href: "/communities" },
      ],
    },
  ];

  return (
    <section id="home-buyer-hub" className="px-[5%] py-16 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
            <Home className="w-4 h-4" />
            HOME BUYER HUB
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Clear Answers, No Guesswork
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to confidently buy your next home in the Capital District.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="mb-10">
          <Accordion type="multiple" className="space-y-3">
            {hubSections.map((section) => (
              <AccordionItem 
                key={section.id} 
                value={section.id}
                className="border border-border rounded-xl bg-card px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold text-foreground block">{section.title}</span>
                      <span className="text-sm text-muted-foreground">{section.description}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="pl-14 space-y-2">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors py-1.5 group"
                      >
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/buyer-journey/first-time-buyer">
            <Button size="lg" className="px-8">
              Get Personalized Buyer Info →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBuyerHub;
