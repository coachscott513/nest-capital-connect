import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight, Mail } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: 0,
    tag: "DSCR",
    headline: "Investment Analysis: 1022 Union St, Schenectady (The \"DSCR\" Leverage Play)",
    excerpt: "Stop looking at the price tag ($450k). Look at the Terms. A stabilized 4-unit generating $57,000/year with residential financing rates.",
    date: "Dec 9, 2025",
    author: "Scott Alvarez",
    slug: "1022-union-schenectady-dscr-analysis"
  },
  {
    id: 1,
    tag: "MULTI-FAMILY",
    headline: "Investment Analysis: 128 Hamilton St, Troy",
    excerpt: "A comprehensive breakdown of this Troy triplex opportunity. Cap rate, rent roll projections, and renovation cost estimates included.",
    date: "Dec 9, 2025",
    author: "Scott Alvarez",
    slug: "128-hamilton-troy-analysis"
  },
  {
    id: 2,
    tag: "MARKET DATA",
    headline: "Q4 2025 Capital District Market Report",
    excerpt: "Median prices, days on market, and inventory levels across Albany, Troy, Schenectady, and Saratoga counties.",
    date: "Dec 6, 2025",
    author: "Scott Alvarez",
    slug: "q4-2025-market-report"
  },
  {
    id: 3,
    tag: "RATES",
    headline: "Fed Holds Rates: What It Means for Investors",
    excerpt: "Breaking down the December FOMC decision and its implications for real estate financing in the Capital Region.",
    date: "Dec 4, 2025",
    author: "Scott Alvarez",
    slug: "fed-rates-december-2025"
  },
  {
    id: 4,
    tag: "BRRRR",
    headline: "Case Study: $42K Equity Created in 6 Months",
    excerpt: "How one investor turned a distressed Albany duplex into a cash-flowing asset using the BRRRR strategy.",
    date: "Dec 2, 2025",
    author: "Scott Alvarez",
    slug: "brrrr-case-study-albany"
  },
  {
    id: 5,
    tag: "GRANTS",
    headline: "New York State First-Time Buyer Programs Update",
    excerpt: "A complete guide to available down payment assistance and grant programs for 2025-2026.",
    date: "Nov 28, 2025",
    author: "Scott Alvarez",
    slug: "nys-buyer-programs-2025"
  },
  {
    id: 6,
    tag: "TROY",
    headline: "Troy Rent Growth Outpaces Albany for Third Quarter",
    excerpt: "Analyzing the continued momentum in Troy's rental market and what's driving tenant demand.",
    date: "Nov 25, 2025",
    author: "Scott Alvarez",
    slug: "troy-rent-growth-q3"
  }
];

const trendingTopics = [
  { name: "Troy", href: "/market/troy" },
  { name: "BRRRR", href: "/strategy/brrrr" },
  { name: "Rates", href: "/blog" },
  { name: "Grants", href: "/grants" }
];

const MarketInsights = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Market Insights | Capital District Nest</title>
        <meta name="description" content="Real estate market intelligence, investment memos, and analysis for the Capital District. Data-driven insights for serious investors." />
      </Helmet>

      {/* Header Banner */}
      <section className="bg-[#022c22] py-10 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-accent" />
            <span className="text-accent text-sm uppercase tracking-widest font-medium">Capital District Nest</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white tracking-tight">
            MARKET INTELLIGENCE & MEMOS
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-[#fafafa] min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Article Feed */}
            <div className="flex-1">
              <div className="space-y-0">
                {articles.map((article, index) => (
                  <article 
                    key={article.id} 
                    className={`py-8 ${index !== articles.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    {/* Tag */}
                    <span className="inline-block px-2.5 py-1 text-xs font-semibold tracking-wider text-white bg-primary rounded-sm mb-3">
                      {article.tag}
                    </span>
                    
                    {/* Headline */}
                    <h2 className="font-playfair text-xl md:text-2xl font-bold text-foreground leading-tight mb-2 hover:text-primary transition-colors cursor-pointer">
                      <Link to={`/blog/article/${article.slug}`}>
                        {article.headline}
                      </Link>
                    </h2>
                    
                    {/* Excerpt */}
                    <p className="text-muted-foreground text-base leading-relaxed mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {article.date} • By {article.author}
                      </span>
                      <Link 
                        to={`/blog/article/${article.slug}`}
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 group"
                      >
                        Read Memorandum 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar - Desktop Only */}
            <aside className="hidden lg:block w-80 space-y-8">
              
              {/* Subscribe Box */}
              <div className="bg-background border border-border p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <h3 className="font-playfair text-lg font-bold text-foreground">
                    Get the Daily Hot Sheet
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Receive our curated market intel, deal flow, and analysis straight to your inbox.
                </p>
                <form className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium">
                    Subscribe
                  </Button>
                </form>
              </div>

              {/* Trending Topics */}
              <div className="bg-background border border-border p-6">
                <h3 className="font-playfair text-lg font-bold text-foreground mb-4">
                  Trending Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic) => (
                    <Link
                      key={topic.name}
                      to={topic.href}
                      className="px-3 py-1.5 text-sm font-medium text-foreground/80 bg-secondary hover:bg-primary hover:text-white rounded-sm transition-colors"
                    >
                      {topic.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-background border border-border p-6">
                <h3 className="font-playfair text-lg font-bold text-foreground mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/markets" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      → All Markets
                    </Link>
                  </li>
                  <li>
                    <Link to="/strategy/multi-family" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      → Multi-Family Strategy
                    </Link>
                  </li>
                  <li>
                    <Link to="/cash-flow-report" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      → Request Cash Flow Report
                    </Link>
                  </li>
                  <li>
                    <Link to="/grants" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      → Grant Programs
                    </Link>
                  </li>
                </ul>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default MarketInsights;
