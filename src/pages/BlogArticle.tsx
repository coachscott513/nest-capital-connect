import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark, TrendingUp, BarChart3 } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import SEOHead from '@/components/SEOHead';
import { Separator } from '@/components/ui/separator';

// Article data - in production this would come from a CMS or database
const articles: Record<string, {
  title: string;
  subtitle: string;
  author: string;
  authorTitle: string;
  publishedAt: string;
  readTime: string;
  category: string;
  heroImage?: string;
  content: React.ReactNode;
}> = {
  "1022-union-schenectady-dscr-analysis": {
    title: "Investment Analysis: 1022 Union St, Schenectady",
    subtitle: "The \"DSCR\" Leverage Play - Why the deal structure matters more than the price tag",
    author: "Scott Alvarez",
    authorTitle: "Principal Analyst, Capital District Nest",
    publishedAt: "December 9, 2025",
    readTime: "6 min read",
    category: "DSCR / Multi-Family",
    content: (
      <>
        <div className="bg-muted/30 border-l-4 border-primary p-6 my-8">
          <p className="text-sm text-muted-foreground mb-2">Asset Class: Multi-Family (4-Unit) • Financing Strategy: DSCR / Residential Loan (20% Down)</p>
        </div>

        <h2 className="font-playfair text-3xl font-semibold mt-12 mb-6 text-primary">
          The Analyst View
        </h2>

        <div className="bg-muted/30 border-l-4 border-accent p-6 my-8">
          <p className="font-playfair text-xl italic text-foreground/90">
            "Stop looking at the price tag ($450k). Look at the Terms."
          </p>
        </div>

        <p className="mb-6 font-lora leading-relaxed">
          1022 Union Street is a stabilized 4-unit generating <strong>$57,000/year</strong>. Because it is a 4-unit (and not 5+), it qualifies for residential financing rates, avoiding commercial loan headaches.
        </p>

        <p className="mb-6 font-lora leading-relaxed">
          <strong>The Alpha here is the deal structure:</strong> By negotiating a <strong>6% Seller Concession ($27,000)</strong>, we can effectively wipe out the closing costs and buy down the rate. This minimizes your "Cash to Close" and skyrockets your Cash-on-Cash return.
        </p>

        <h2 className="font-playfair text-3xl font-semibold mt-12 mb-6 text-primary">
          The Financials (The "Real" Numbers)
        </h2>

        <div className="grid md:grid-cols-2 gap-6 my-10">
          <div className="bg-card border border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Purchase Price</p>
            <p className="font-playfair text-3xl font-bold text-foreground">$450,000</p>
          </div>
          <div className="bg-card border border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Down Payment (20%)</p>
            <p className="font-playfair text-3xl font-bold text-foreground">$90,000</p>
          </div>
          <div className="bg-card border border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Seller Concession (6%)</p>
            <p className="font-playfair text-3xl font-bold text-accent">$27,000 credit</p>
            <p className="text-xs text-muted-foreground mt-1">Covers closing costs + prepaid taxes</p>
          </div>
          <div className="bg-card border border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Loan Strategy</p>
            <p className="font-playfair text-xl font-bold text-foreground">DSCR @ 6.25%</p>
            <p className="text-xs text-muted-foreground mt-1">No personal DTI required</p>
          </div>
        </div>

        <h2 className="font-playfair text-3xl font-semibold mt-12 mb-6 text-primary">
          Projected Monthly Cash Flow
        </h2>

        <div className="bg-card border border-border p-6 my-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="font-lora text-foreground">Gross Income</span>
              <span className="font-playfair text-xl font-bold text-accent">$4,750/mo</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="font-lora text-muted-foreground">Mortgage (P&I @ 6.25%)</span>
              <span className="font-playfair text-lg text-foreground">~$2,217/mo</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="font-lora text-muted-foreground">Taxes</span>
              <span className="font-playfair text-lg text-foreground">$737/mo</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="font-lora text-muted-foreground">Insurance (Est)</span>
              <span className="font-playfair text-lg text-foreground">$200/mo</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="font-lora font-semibold text-foreground">Total PITI</span>
              <span className="font-playfair text-lg font-semibold text-foreground">~$3,154/mo</span>
            </div>
            <div className="flex justify-between items-center py-3 bg-accent/10 px-4 -mx-4 rounded">
              <span className="font-lora font-bold text-foreground">Net Cash Flow</span>
              <span className="font-playfair text-2xl font-bold text-accent">+$1,596/mo</span>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">Before maintenance reserves</p>
          </div>
        </div>

        <h2 className="font-playfair text-3xl font-semibold mt-12 mb-6 text-primary">
          The Verdict
        </h2>

        <div className="bg-primary/10 border border-primary/30 p-6 my-8 rounded-lg">
          <p className="font-playfair text-2xl font-bold text-primary mb-4">STRONG BUY for Leverage</p>
          <p className="font-lora leading-relaxed text-foreground">
            Most investors think they need 25-30% down for a commercial loan on a deal this size. By keeping it as a <strong>residential 4-unit with a DSCR product</strong>, you put less money down, secure a fixed 6.25% rate, and let the tenants pay off the asset while you pocket ~$1,600/month.
          </p>
        </div>

        <div className="bg-card border border-border p-6 my-8">
          <p className="text-sm text-muted-foreground mb-2">Asset Grade</p>
          <p className="font-playfair text-3xl font-bold text-accent">A-</p>
          <p className="text-sm text-muted-foreground mt-2">Newer mechanics + Separate utilities = Low OpEx Risk</p>
        </div>

        <Separator className="my-12" />

        <div className="bg-muted/30 border border-border p-8 text-center rounded-lg">
          <p className="font-playfair text-xl font-semibold text-foreground mb-4">
            Want to see the full Rent Roll & Lease Dates?
          </p>
          <Link to="/" className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded transition-colors">
            Request the Intelligence Report on our Homepage
          </Link>
        </div>
      </>
    )
  },
  "2025-capital-district-market-forecast": {
    title: "The 2025 Capital District Market Forecast",
    subtitle: "How macro forces, local demand, and investor sentiment are reshaping Albany, Troy, and Schenectady real estate",
    author: "Scott Alvarez",
    authorTitle: "Principal Analyst, Capital District Nest",
    publishedAt: "December 8, 2025",
    readTime: "12 min read",
    category: "Market Analysis",
    content: (
      <>
        <p className="text-xl leading-relaxed mb-8 font-lora">
          The Capital District enters 2025 at a crossroads. After two years of elevated interest rates 
          and cooling transaction volumes nationwide, upstate New York's four-county metro area is 
          showing surprising resilience—and in some submarkets, outright strength.
        </p>

        <p className="mb-6 font-lora leading-relaxed">
          For investors and homebuyers alike, the question isn't whether to participate in this market, 
          but <em>how</em>. The data tells a nuanced story: one of compressed cap rates in premium 
          neighborhoods, emerging opportunities in transitional corridors, and a rental market that 
          continues to outpace housing supply.
        </p>

        <h2 className="font-playfair text-3xl font-semibold mt-12 mb-6 text-primary">
          The Macro Picture: Rates, Inflation, and Capital Flows
        </h2>

        <p className="mb-6 font-lora leading-relaxed">
          The Federal Reserve's latest projections suggest a gradual easing cycle through 2025, with 
          the fed funds rate potentially settling in the 4.0–4.5% range by year-end. For real estate, 
          this translates to mortgage rates in the mid-6s—still historically elevated, but meaningfully 
          below the 8% peaks of late 2023.
        </p>

        <div className="bg-muted/30 border-l-4 border-primary p-6 my-8">
          <p className="font-playfair text-lg italic text-foreground/90">
            "The spread between mortgage rates and Treasury yields remains wide by historical standards. 
            This suggests room for mortgage costs to compress even without Fed action."
          </p>
          <p className="text-sm text-muted-foreground mt-3">— Federal Reserve Bank of New York, Q4 2024 Report</p>
        </div>

        <p className="mb-6 font-lora leading-relaxed">
          More significant for Capital District investors: institutional capital is increasingly looking 
          beyond the saturated Sun Belt markets. Albany's government-anchored employment base, 
          Troy's growing tech corridor, and Schenectady's manufacturing renaissance are attracting 
          out-of-state buyers who see value in sub-$200,000 acquisition costs per unit.
        </p>

        <h2 className="font-playfair text-3xl font-semibold mt-12 mb-6 text-primary">
          Albany: The Government Anchor Holds
        </h2>

        <p className="mb-6 font-lora leading-relaxed">
          State government employment—the region's largest job sector—remained stable through 2024, 
          with modest expansion in healthcare administration and education technology. This stability 
          underpins rental demand in Center Square, Pine Hills, and the Delaware Avenue corridor.
        </p>

        <div className="grid md:grid-cols-3 gap-6 my-10">
          <div className="bg-card border border-border p-6 text-center">
            <p className="font-playfair text-4xl font-bold text-primary">$1,450</p>
            <p className="text-sm text-muted-foreground mt-2">Avg. 2BR Rent (Center Square)</p>
            <p className="text-xs text-primary mt-1">↑ 4.2% YoY</p>
          </div>
          <div className="bg-card border border-border p-6 text-center">
            <p className="font-playfair text-4xl font-bold text-primary">6.8%</p>
            <p className="text-sm text-muted-foreground mt-2">Avg. Cap Rate (Multi-Family)</p>
            <p className="text-xs text-muted-foreground mt-1">Compressed from 7.4% in 2023</p>
          </div>
          <div className="bg-card border border-border p-6 text-center">
            <p className="font-playfair text-4xl font-bold text-primary">23</p>
            <p className="text-sm text-muted-foreground mt-2">Days on Market (Avg.)</p>
            <p className="text-xs text-primary mt-1">↓ from 31 days in 2023</p>
          </div>
        </div>

        <h2 className="font-playfair text-3xl font-semibold mt-12 mb-6 text-primary">
          Troy: The Emerging Alpha Play
        </h2>

        <p className="mb-6 font-lora leading-relaxed">
          Troy continues to be our top conviction market for 2025. The combination of RPI's expanding 
          research footprint, downtown revitalization, and still-affordable acquisition costs creates 
          a rare value proposition. Properties in the 2–4 unit range near the riverfront are trading 
          at 20-30% discounts to comparable Albany inventory.
        </p>

        <p className="mb-6 font-lora leading-relaxed">
          The key risk: infrastructure. Municipal water and sewer systems in some Troy neighborhoods 
          require capital improvements that may result in special assessments. Investors should conduct 
          thorough due diligence on utility costs and planned infrastructure projects.
        </p>

        <h2 className="font-playfair text-3xl font-semibold mt-12 mb-6 text-primary">
          Schenectady: Industrial Renaissance
        </h2>

        <p className="mb-6 font-lora leading-relaxed">
          GE's continued presence and the growth of smaller advanced manufacturing firms have stabilized 
          Schenectady's employment base. The city's aggressive tax incentive programs for multi-family 
          rehabilitation continue to attract investors, though competition for quality deals has intensified.
        </p>

        <h2 className="font-playfair text-3xl font-semibold mt-12 mb-6 text-primary">
          Our 2025 Investment Thesis
        </h2>

        <ol className="list-decimal list-inside space-y-4 mb-8 font-lora">
          <li className="leading-relaxed">
            <strong>Value-add multi-family in Troy</strong> remains our highest-conviction strategy. 
            Target properties with below-market rents and deferred maintenance.
          </li>
          <li className="leading-relaxed">
            <strong>Albany student housing</strong> near SUNY and Albany Medical Center offers stable 
            cash flow with predictable tenant turnover cycles.
          </li>
          <li className="leading-relaxed">
            <strong>Schenectady tax-abated renovations</strong> provide attractive after-tax returns 
            for investors with 5+ year hold horizons.
          </li>
          <li className="leading-relaxed">
            <strong>Saratoga Springs</strong> is best approached as a premium/luxury play; cap rates 
            are compressed, but appreciation potential remains strong.
          </li>
        </ol>

        <Separator className="my-12" />

        <p className="font-lora leading-relaxed italic text-muted-foreground">
          This analysis is provided for informational purposes only and should not be construed as 
          investment advice. Past performance does not guarantee future results. Consult with a 
          licensed real estate professional before making investment decisions.
        </p>
      </>
    )
  }
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : null;

  if (!article) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-playfair text-4xl font-bold mb-4">Article Not Found</h1>
            <Link to="/blog" className="text-primary hover:underline">← Return to Blog</Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SEOHead 
        title={`${article.title} | Capital District Nest`}
        description={article.subtitle}
        keywords="Capital District real estate, market forecast, investment properties, Albany NY, Troy NY"
      />

      {/* WSJ-Style Article Layout */}
      <article className="min-h-screen bg-background">
        {/* Article Header */}
        <header className="bg-primary text-primary-foreground py-4 border-b border-primary/20">
          <div className="max-w-4xl mx-auto px-6">
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Market Intelligence</span>
            </Link>
          </div>
        </header>

        {/* Category & Meta */}
        <div className="bg-background border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-primary font-semibold uppercase tracking-wider">{article.category}</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article.publishedAt}
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-8">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
            {article.title}
          </h1>
          <p className="font-lora text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        {/* Author & Share */}
        <div className="max-w-4xl mx-auto px-6 pb-8">
          <div className="flex items-center justify-between py-6 border-t border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{article.author}</p>
                <p className="text-sm text-muted-foreground">{article.authorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-muted rounded-full transition-colors" title="Share">
                <Share2 className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-muted rounded-full transition-colors" title="Bookmark">
                <Bookmark className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="prose prose-lg max-w-none text-foreground">
            {article.content}
          </div>
        </div>

        {/* Related Articles Teaser */}
        <div className="bg-muted/30 border-t border-border py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="font-playfair text-2xl font-bold mb-8">More Market Intelligence</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/blog" className="group bg-card border border-border p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 text-primary text-sm mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span>Investment Strategy</span>
                </div>
                <h4 className="font-playfair text-lg font-semibold group-hover:text-primary transition-colors">
                  BRRRR Strategy in the Capital District: A Complete Guide
                </h4>
              </Link>
              <Link to="/blog" className="group bg-card border border-border p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 text-primary text-sm mb-3">
                  <BarChart3 className="w-4 h-4" />
                  <span>Property Analysis</span>
                </div>
                <h4 className="font-playfair text-lg font-semibold group-hover:text-primary transition-colors">
                  Troy Multi-Family: 3 Deals We Analyzed This Month
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </MainLayout>
  );
};

export default BlogArticle;
