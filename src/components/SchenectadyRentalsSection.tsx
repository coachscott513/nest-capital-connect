import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrendingUp, Home, Calculator, MapPin, Building2 } from "lucide-react";

const faqData = [
  {
    question: "Is it better to rent or buy in Schenectady right now?",
    answer:
      "With homes selling in 24 days and a median price of $230k, buying often offers better long-term yield than the rising rental rates in the Stockade District. A $1,850/mo rent payment could cover a mortgage on a $230k home — meaning renters may be paying a 'convenience tax' instead of building equity.",
  },
  {
    question: "What is the median home price in Schenectady NY?",
    answer:
      "The median home price in Schenectady NY is approximately $230,000 as of April 2026. This makes Schenectady one of the most affordable cities in the Capital District for first-time buyers and investors.",
  },
  {
    question: "Is Schenectady a good place to invest in rental property?",
    answer:
      "Yes — Schenectady offers multi-family cap rates of 5–9%, driven by demand from GE employees, Union College students, and young professionals attracted by the city's revitalization. The Stockade District and Woodlawn are the region's top yield targets.",
  },
  {
    question: "What are the best neighborhoods to rent in Schenectady?",
    answer:
      "The Stockade District offers historic charm with walkable dining. Woodlawn provides family-friendly streets with strong schools. Niskayuna (bordering Schenectady) is popular with GE and tech workers. Downtown Schenectady is seeing rapid revitalization with new dining and entertainment.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const SchenectadyRentalsSection = () => {
  return (
    <section id="schenectady-rentals" className="py-16 px-4 bg-background border-b border-border">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Schenectady Rentals — Apartments, Homes & Your Path to Equity
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Schenectady is NY's #2 migration destination. With a new $7M tech hub in Niskayuna and 24-day market hotness, the Stockade and Woodlawn are the region's top yield targets.
          </p>
        </div>

        {/* Equity Insight Banner */}
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Renting vs. Owning in Schenectady
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                With a <strong className="text-foreground">$230k median home price</strong>, your current rent could likely cover a mortgage. 
                The average Schenectady renter paying $1,850/mo is spending <strong className="text-foreground">$110 more</strong> than a comparable mortgage — that's a "convenience tax" that builds zero equity.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                to="/analyze"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                <Calculator className="w-4 h-4" />
                Run My Rent-vs-Buy Math →
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Listing: Stockade Suite */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-10">
          <div className="bg-muted/50 px-6 py-3 border-b border-border flex items-center gap-2">
            <Building2 className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">Featured · Stockade District</span>
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              The Stockade Executive Suite · Historic Vibe
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
              Stop paying 100% interest to a landlord. Enjoy 12-foot ceilings and historic brick today — build your path to a Nest tomorrow.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground">Current Rent</p>
                <p className="text-2xl font-bold text-foreground">$1,850<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground">$230k Mortgage</p>
                <p className="text-2xl font-bold text-accent">$1,740<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground">Your "Convenience Tax"</p>
                <p className="text-2xl font-bold text-destructive">$110<span className="text-sm font-normal text-muted-foreground">/mo wasted</span></p>
              </div>
            </div>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Run the Numbers on a $230k Nest →
            </Link>
          </div>
        </div>

        {/* Neighborhood Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-card p-6 rounded-2xl border border-border">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-accent" />
              <h4 className="text-xl font-semibold text-foreground">
                Stockade District & Downtown
              </h4>
            </div>
            <p className="text-muted-foreground">
              Historic charm meets urban revival. Walking distance to Proctors Theater, restaurants, and the new innovation corridor. Walk Score: 88.
            </p>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Home className="w-5 h-5 text-accent" />
              <h4 className="text-xl font-semibold text-foreground">
                Woodlawn & Niskayuna Border
              </h4>
            </div>
            <p className="text-muted-foreground">
              Family-friendly with top-rated schools. Walking distance to GE Global Research. Pro-landlord managed properties with strong tenant retention.
            </p>
          </div>
        </div>

        {/* Browse CTA */}
        <div className="bg-card p-8 rounded-xl border border-border text-center mb-12">
          <h4 className="text-2xl font-semibold mb-4 text-foreground">
            Browse Available Schenectady Rental Properties
          </h4>
          <p className="text-muted-foreground mb-6">
            View our current inventory of rental apartments, condos, and houses in Schenectady and surrounding areas.
          </p>
          <a
            href="https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=6&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map&leadid=948"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
          >
            View All Schenectady Rentals →
          </a>
        </div>

        {/* FAQ Accordion — AEO Strategy */}
        <div className="max-w-4xl mx-auto mb-8">
          <h3 className="text-2xl font-bold text-center mb-2 text-foreground">
            Schenectady Rental & Homebuying — Investor Intel
          </h3>
          <p className="text-center text-muted-foreground mb-8">
            Answers to the most common questions about renting, buying, and investing in Schenectady, NY.
          </p>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqData.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-lg px-4"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-4 text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Footer Attribution */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Serving Schenectady, Schenectady County, and the greater Capital District region including Albany, Troy, and Saratoga Springs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SchenectadyRentalsSection;
