import { Helmet } from "react-helmet-async";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Check, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DelmarMarketReport from "@/components/DelmarMarketReport";

const DelmarHomesForSale = () => {
  const quickFilters = [
    { label: "Under $350K", id: "under-350k" },
    { label: "$350K–$500K", id: "350k-500k" },
    { label: "$500K+", id: "500k-plus" },
    { label: "New Listings", id: "new-listings" },
    { label: "Open Houses", id: "open-houses" },
    { label: "3+ Bedrooms", id: "3-plus-beds" },
    { label: "Top School Areas", id: "top-schools" },
  ];

  const intelligenceReportFeatures = [
    "P&L / cash flow estimate (if rental)",
    "Rent roll estimate (if multi-unit)",
    "Taxes + key expense flags",
    "Comparable sales + price reality check",
  ];

  const faqs = [
    {
      question: "Are these listings live?",
      answer: "Yes—updated regularly via the embedded search.",
    },
    {
      question: "Can you show homes in Delmar?",
      answer: "Yes. I'll confirm availability and get you in quickly.",
    },
    {
      question: "Do you help with low-down-payment options?",
      answer: "Yes—FHA, conventional options, and assistance resources depending on eligibility.",
    },
  ];

  const scrollToSearch = () => {
    const searchSection = document.getElementById("listing-search");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Delmar Homes for Sale | Capital District Nest</title>
        <meta
          name="description"
          content="Search Delmar homes for sale with live listings and local pricing context. Get a free Intelligence Report on any property from Capital District Nest."
        />
        <meta
          name="keywords"
          content="Delmar homes for sale, Delmar NY real estate, Bethlehem Central schools, Albany County homes, Capital District real estate"
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/delmar-homes-for-sale" />
        <meta property="og:title" content="Delmar Homes for Sale | Capital District Nest" />
        <meta property="og:description" content="Live listings + local pricing context from Capital District Nest. Search Delmar homes for sale." />
        <meta property="og:url" content="https://capitaldistrictnest.com/delmar-homes-for-sale" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Delmar Homes for Sale | Capital District Nest" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <MainHeader />

        {/* 1) Hero Section */}
        <section className="pt-28 pb-16 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Delmar Homes for Sale
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Live listings + local pricing context from Capital District Nest.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Updated daily. Want the fastest answer on a specific home? Get a free Intelligence Report.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg"
                asChild
              >
                <Link to="/#due-diligence">Get My Free Intelligence Report</Link>
              </Button>
              <Link
                to="/delmar-market-insights"
                className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
              >
                See Delmar Market Insights
              </Link>
            </div>
          </div>
        </section>

        {/* 2) Quick Filters */}
        <section className="py-10 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
              Popular Delmar Searches
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 hover:border-primary text-foreground"
                  onClick={scrollToSearch}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* 3) Listing Search - RE/MAX Embed */}
        <section id="listing-search" className="py-14 bg-muted/30">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Search Delmar Listings
              </h2>
              <p className="text-muted-foreground">
                Use the live search below to browse available homes.
              </p>
            </div>

            {/* RE/MAX Embed - Responsive with branded styling */}
            <div
              className="w-full max-w-[980px] mx-auto rounded-[18px] overflow-hidden border-2 border-primary bg-white"
              style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
            >
              <iframe
                title="Delmar Home Search"
                src="https://scottalvarez.remax.com/embedsmall.php"
                loading="lazy"
                className="w-full h-[680px] md:h-[780px] block border-0"
              />
            </div>
          </div>
        </section>

        {/* 4) Delmar in 60 Seconds */}
        <section className="py-14 bg-background">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Delmar in 60 Seconds
            </h2>
            <ul className="space-y-4 text-lg text-foreground">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Strong owner-occupied neighborhoods and steady demand</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Commute-friendly access to Albany</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Prices vary by pocket—street-by-street matters</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Inventory moves fast when homes are priced correctly</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-6 text-center italic">
              I'll help you interpret the numbers so you don't overpay.
            </p>
          </div>
        </section>

        {/* Delmar Market Report Section */}
        <DelmarMarketReport />

        {/* 5) Free Intelligence Report CTA */}
        <section className="py-16 bg-primary/5 border-y border-primary/20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Get a Free Intelligence Report on Any Property
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Paste any address and I'll send an investor-style breakdown you can use.
            </p>

            <Card className="p-6 bg-background border-primary/20 mb-8 text-left max-w-lg mx-auto">
              <ul className="space-y-3">
                {intelligenceReportFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg mb-6"
              asChild
            >
              <Link to="/#due-diligence">Get My Free Intelligence Report</Link>
            </Button>

            <div className="flex items-center justify-center gap-2 text-foreground font-medium">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:+15186762347" className="hover:text-primary">
                Contact an Agent: (518) 676-2347
              </a>
            </div>
          </div>
        </section>

        {/* 6) FAQ */}
        <section className="py-14 bg-background">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-foreground font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Persistent Contact Line - Mobile Friendly */}
        <div className="py-4 bg-primary text-primary-foreground text-center">
          <a href="tel:+15186762347" className="flex items-center justify-center gap-2 font-semibold text-lg">
            <Phone className="w-5 h-5" />
            Contact an Agent: (518) 676-2347
          </a>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default DelmarHomesForSale;
