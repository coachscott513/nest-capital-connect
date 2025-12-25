import { Link } from "react-router-dom";
import { TrendingUp, Building2, Calculator, FileSpreadsheet, Search, RefreshCw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const InvestorHub = () => {
  const hubSections = [
    {
      id: "properties",
      icon: Building2,
      title: "Capital District Investment Properties",
      description: "Browse multi-family and investment properties across the region.",
      links: [
        { label: "Albany Multi-Unit Properties", href: "/albany-multi-unit" },
        { label: "Troy Multi-Unit Properties", href: "/troy-multi-unit" },
        { label: "Schenectady Multi-Unit Properties", href: "/schenectady-multi-unit" },
        { label: "All Investment Properties", href: "/investment-properties" },
        { label: "Investment Landing", href: "/investment-landing" },
      ],
    },
    {
      id: "analysis",
      icon: Calculator,
      title: "Pro Forma & P&L Analysis",
      description: "Run detailed financial analysis on any property.",
      links: [
        { label: "Property Analyzer", href: "/investor-tools" },
        { label: "How to Analyze Multi-Family", href: "/investor/analyze-multifamily" },
        { label: "Cash Flow Report", href: "/cash-flow-report" },
      ],
    },
    {
      id: "verification",
      icon: FileSpreadsheet,
      title: "Rent Roll Verification",
      description: "Verify income and expenses before you buy.",
      links: [
        { label: "Deal Desk (Request Analysis)", href: "/deal-desk" },
        { label: "Best Neighborhoods for Cash Flow", href: "/investor/best-neighborhoods-cash-flow-capital-district" },
      ],
    },
    {
      id: "rehab",
      icon: Search,
      title: "CapEx & Renovation Modeling",
      description: "Understand renovation costs and value-add opportunities.",
      links: [
        { label: "Sell Investment Property", href: "/sell-investment-property" },
        { label: "Market Insights", href: "/market-insights" },
      ],
    },
    {
      id: "off-market",
      icon: TrendingUp,
      title: "Off-Market Opportunities",
      description: "Access deals before they hit the market.",
      links: [
        { label: "VIP Buyer Access", href: "/vip-buyer-access" },
        { label: "Investor Journey", href: "/buyer-journey/investor" },
      ],
    },
    {
      id: "1031",
      icon: RefreshCw,
      title: "1031 Exchange Playbooks",
      description: "Tax-deferred exchange strategies from NYC to Albany.",
      links: [
        { label: "1031 Exchange Playbook", href: "/investor/1031-nyc-to-albany" },
        { label: "NYC → Albany ROI Playbook", href: "/investor/nyc-to-albany-roi" },
      ],
    },
  ];

  const marketReports = [
    { label: "Albany Multi-Unit Market", href: "/investor/albany-multi-unit-market" },
    { label: "Troy Multi-Unit Market", href: "/troy-multi-unit" },
    { label: "Schenectady Multi-Unit Market", href: "/schenectady-multi-unit" },
    { label: "Saratoga Multi-Unit Market", href: "/investor/saratoga-multi-unit-market" },
    { label: "Fulton & Montgomery", href: "/investor/fulton-montgomery-multi-unit-market" },
  ];

  return (
    <section id="investor-hub" className="px-[5%] py-16 bg-card border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
            <TrendingUp className="w-4 h-4" />
            INVESTOR HUB
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Real Numbers, Real Returns
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Investment analysis tools, market reports, and deal access built for serious investors.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="mb-10">
          <Accordion type="multiple" className="space-y-3">
            {hubSections.map((section) => (
              <AccordionItem 
                key={section.id} 
                value={section.id}
                className="border border-border rounded-xl bg-background px-6 data-[state=open]:border-primary/50"
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

        {/* Market Reports Quick Access */}
        <div className="bg-background border border-border rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-4">📊 Market Reports</h3>
          <div className="flex flex-wrap gap-2">
            {marketReports.map((report) => (
              <Link
                key={report.href}
                to={report.href}
                className="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary rounded-full text-sm font-medium transition-colors"
              >
                {report.label}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/vip-buyer-access">
            <Button size="lg" className="px-8 bg-primary hover:bg-primary/90">
              Get My Free Intelligence Report →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InvestorHub;
