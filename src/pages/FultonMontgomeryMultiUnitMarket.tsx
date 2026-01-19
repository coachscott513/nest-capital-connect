import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TrendingUp, MapPin, Phone, CheckCircle, MessageCircle, Crown, Percent, Wrench, DollarSign, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const SCOTT_PHONE = "518-671-8048";
const SCOTT_PHONE_TEL = "+15186718048";

const FultonMontgomeryMultiUnitMarket = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "Fulton & Montgomery County Multi-Unit Market Report: Cap Rates, ROI, and BRRRR Deals",
        "author": { "@type": "Person", "name": "Scott Alvarez" },
        "publisher": { "@type": "Organization", "name": "Capital District Nest" },
        "datePublished": "2025-01-01",
        "description": "Fulton & Montgomery County multi-unit market analysis with cap rates, cash-on-cash returns, BRRRR deals, and top ROI markets."
      },
      {
        "@type": "LocalBusiness",
        "name": "Capital District Nest",
        "telephone": "+15186762347",
        "address": { "@type": "PostalAddress", "addressLocality": "Amsterdam", "addressRegion": "NY" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why are cap rates highest in Fulton & Montgomery counties?",
            "acceptedAnswer": { "@type": "Answer", "text": "Lower acquisition prices combined with stable rental demand create exceptional cash flow opportunities, with cap rates of 11-15% common." }
          },
          {
            "@type": "Question",
            "name": "Is Fulton/Montgomery good for BRRRR investing?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, many properties qualify for value-add, refinance, and equity capture strategies with low entry costs." }
          }
        ]
      }
    ]
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Fulton & Montgomery Multi-Unit Market Report (Cap Rates, ROI, BRRRR Deals)</title>
        <meta name="description" content="Fulton & Montgomery County multi-unit market analysis. Cap rates 11–15%, cash-on-cash 20–35%, BRRRR deals, and top ROI markets. Call/Text 518-676-2347." />
        <meta name="keywords" content="fulton county multi family, montgomery county investment property, amsterdam duplex, gloversville triplex, johnstown rental, fulton cap rate, brrrr ny" />
        <link rel="canonical" href="https://capitaldistrictnest.com/investor/fulton-montgomery-multi-unit-market" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Sticky Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground py-2 px-4 text-center">
        <a 
          href={`tel:${SCOTT_PHONE_TEL}`}
          className="inline-flex items-center gap-2 text-sm md:text-base font-medium hover:opacity-90 transition-opacity"
        >
          <Phone className="w-4 h-4" />
          <span>📞 Call or Text an Agent — {SCOTT_PHONE}</span>
        </a>
      </div>

      <main className="flex-grow pt-10">
        {/* HERO SECTION */}
        <section className="bg-[#022c22] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
                FULTON & MONTGOMERY MARKET REPORT
              </span>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Fulton & Montgomery County Multi-Unit Market Report
              </h1>
              <p className="text-xl md:text-2xl text-primary font-semibold mb-2">
                Cap Rates: 11–15% • Cash-on-Cash: 20–35%
              </p>
              <p className="text-xl text-primary font-semibold mb-4">
                Highest Cash Flow in Upstate New York
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
                Fulton and Montgomery Counties offer the strongest ROI opportunities in the entire region. These counties are ideal for investors focused on cash flow, BRRRR strategies, and long-term rental portfolios.
              </p>
              
              {/* Highlighted Phone Contact Block */}
              <div 
                className="mt-6 mb-6 p-3 rounded-md mx-auto max-w-md"
                style={{ backgroundColor: '#dff7df' }}
              >
                <p className="text-center" style={{ color: '#000' }}>
                  <span className="font-bold">Call/Text an Agent: </span>
                  <a 
                    href={`tel:${SCOTT_PHONE_TEL}`}
                    className="font-bold hover:underline"
                    style={{ color: '#000' }}
                  >
                    {SCOTT_PHONE}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY INVESTORS CHOOSE FM COUNTIES */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              Why Investors Choose Fulton & Montgomery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Percent,
                  title: "11–15% Cap Rates",
                  description: "Double-digit returns are common in Amsterdam, Gloversville, and Johnstown."
                },
                {
                  icon: TrendingUp,
                  title: "20–35% Cash-on-Cash",
                  description: "The strongest ROI in the Capital Region."
                },
                {
                  icon: Wrench,
                  title: "Perfect for BRRRR Investors",
                  description: "Many properties qualify for value-add, refinance, and equity capture."
                },
                {
                  icon: DollarSign,
                  title: "Low Acquisition Costs",
                  description: "Duplexes: $130–200K • Triplexes: $150–250K • Fourplexes: $180–300K"
                }
              ].map((item, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECENT FM DEALS */}
        <section className="py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4 font-playfair">
              Recent Deals We Analyzed
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Real examples of what investors achieve in Fulton & Montgomery Counties.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  location: "Amsterdam — Triplex",
                  purchase: "$185,000",
                  rentRoll: "$2,450/mo",
                  capRate: "13.8%",
                  coc: "28%"
                },
                {
                  location: "Gloversville — Fourplex",
                  purchase: "$225,000",
                  rentRoll: "$3,300/mo",
                  capRate: "14.5%",
                  coc: "32%"
                },
                {
                  location: "Johnstown — Duplex",
                  purchase: "$155,000",
                  rentRoll: "$1,900/mo",
                  capRate: "12.3%",
                  coc: "25%"
                }
              ].map((deal, index) => (
                <Card key={index} className="bg-background border-border hover:border-primary/50 transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">{deal.location}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Purchase:</span>
                        <span className="text-foreground font-medium">{deal.purchase}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rent Roll:</span>
                        <span className="text-foreground font-medium">{deal.rentRoll}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cap Rate:</span>
                        <span className="text-primary font-semibold">{deal.capRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cash-on-Cash:</span>
                        <span className="text-primary font-semibold">{deal.coc}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* TOP INVESTMENT MARKETS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              Top Investment Markets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { name: "Amsterdam", description: "High ROI + proximity to Albany jobs" },
                { name: "Gloversville", description: "Overlooked market producing major returns" },
                { name: "Johnstown", description: "Affordable, stable rental town" },
                { name: "Broadalbin/Perth", description: "Growth corridor with appreciation upside" }
              ].map((market, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{market.name}</h3>
                      <p className="text-muted-foreground text-sm">{market.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VIP INVESTOR ACCESS */}
        <section className="py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-playfair">
                VIP Investor Access — FM Counties
              </h2>
              <p className="text-muted-foreground mb-6">
                Off-market deals, P&L modeling, BRRRR projections, verified rents, and tax audits.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
                asChild
              >
                <a href="/vip-buyer-access">
                  <Crown className="w-5 h-5 mr-2" />
                  Join VIP Multi-Unit Buyers
                </a>
              </Button>
              
              <p className="text-foreground mt-6">
                <span className="font-semibold">Call/Text: </span>
                <a href={`tel:${SCOTT_PHONE_TEL}`} className="text-primary font-semibold hover:underline">
                  {SCOTT_PHONE}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* FREE INTELLIGENCE REPORT */}
        <section className="py-20 bg-primary/10">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-playfair">
              Get a Free Intelligence Report
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Includes:
            </p>
            <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
              {[
                "Cap Rate",
                "Cash-on-Cash ROI",
                "Rent Roll vs Market Rent",
                "Expense Audit",
                "5-Year ROI Projection"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
              asChild
            >
              <a href={`sms:${SCOTT_PHONE_TEL}`}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Text any address to: {SCOTT_PHONE}
              </a>
            </Button>
          </div>
        </section>

        {/* MORE INVESTOR GUIDES */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-8 text-center">More Investor Guides</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  to="/investor/saratoga-multi-unit-market" 
                  className="block p-6 bg-card border border-border rounded-lg hover:border-primary/40 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-foreground mb-2">Saratoga County Multi-Unit Report</h4>
                  <p className="text-muted-foreground text-sm">Premium appreciation market with 7-10% cap rates and high-income tenants.</p>
                </Link>
                <Link 
                  to="/investor/albany-multi-unit-market" 
                  className="block p-6 bg-card border border-border rounded-lg hover:border-primary/40 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-foreground mb-2">Albany Multi-Unit Market Report</h4>
                  <p className="text-muted-foreground text-sm">Cap rates, rent trends, and investment outlook for the Capital District.</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default FultonMontgomeryMultiUnitMarket;
