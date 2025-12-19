import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { TrendingUp, DollarSign, BarChart3, MapPin, Calculator, ArrowRight } from "lucide-react";

const InvestmentProperties = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Capital District Investment Properties & Cash Flow Analysis</title>
        <meta name="description" content="Learn how to evaluate investment properties in Albany, Troy, and Schenectady. Understand cash flow, cap rates, and what makes a property a smart investment in the Capital District." />
        <meta name="keywords" content="Capital District investment properties, Albany cash flow, Troy rental properties, cap rate NY, real estate investing upstate NY" />
        <link rel="canonical" href="https://capitaldistrictnest.com/investment-properties" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-card border-b border-border px-[5%] py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Capital District Investment Properties & Cash Flow Analysis
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Building wealth through real estate starts with understanding the numbers. This guide covers everything you need to evaluate investment properties in the Capital District.
          </p>
        </div>
      </section>

      {/* Guide Coming Soon Banner */}
      <div className="bg-primary/5 border-b border-primary/20 px-[5%] py-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <span className="text-sm font-medium text-foreground">
            📘 Free Investor Guide Coming Soon — Join the List to Get It First.
          </span>
          <Link to="/vip-buyer-access" className="text-sm font-bold text-primary hover:underline">
            Join Now →
          </Link>
        </div>
      </div>

      {/* Section 1: Intro */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            How to Evaluate Investment Properties in the Capital District
          </h2>
          <div className="prose prose-lg text-muted-foreground">
            <p className="mb-4">
              The Capital District — Albany, Troy, Schenectady, and surrounding towns — offers some of the strongest rental yields in the Northeast. But not every property is a good investment.
            </p>
            <p className="mb-4">
              Successful investors focus on three core metrics: <strong className="text-foreground">cash flow</strong> (what you pocket each month after expenses), <strong className="text-foreground">cap rate</strong> (your return on the property value), and <strong className="text-foreground">long-term appreciation potential</strong>.
            </p>
            <p>
              This page breaks down each concept with local context so you can make informed decisions — whether you are buying your first duplex or adding to an existing portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: What Makes a Good Investment Property */}
      <section className="px-[5%] py-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            What Makes a Good Investment Property Locally
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Strong Rent-to-Price Ratio</h3>
              <p className="text-muted-foreground text-sm">
                Look for properties where monthly rent equals at least 1% of the purchase price. A $200,000 property should generate $2,000+ in monthly rent. Many Capital District multi-units hit 1.2% or higher.
              </p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Location Fundamentals</h3>
              <p className="text-muted-foreground text-sm">
                Proximity to employers (hospitals, universities, state government), walkability, and neighborhood trajectory matter. Areas like Center Square, Pine Hills, and downtown Troy see consistent demand.
              </p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Manageable Expenses</h3>
              <p className="text-muted-foreground text-sm">
                Taxes, insurance, and utilities vary widely. A property with $8,000/year taxes behaves very differently from one at $4,000. Always verify actual expenses before calculating returns.
              </p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Upside Potential</h3>
              <p className="text-muted-foreground text-sm">
                Properties with below-market rents, deferred maintenance you can address, or units that can be added (converting attics, basements) offer forced appreciation opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Cash Flow vs Appreciation */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Cash Flow vs. Appreciation: Understanding the Tradeoff
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Cash Flow Strategy</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Cash flow investors prioritize monthly income. The goal is to collect rent, pay all expenses (mortgage, taxes, insurance, maintenance, management), and still have money left over.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Works well in the Capital District where rents are strong relative to prices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Provides immediate, reliable income</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Lower risk — you are not betting on future price increases</span>
                </li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Appreciation Strategy</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Appreciation investors accept lower (or no) monthly cash flow in exchange for expected property value growth. This works in rapidly growing markets.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>More speculative — depends on market conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Capital District appreciation is steady (3-5%/year) but not explosive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Best combined with cash flow for balanced returns</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-muted-foreground text-center">
            <strong className="text-foreground">Our recommendation:</strong> In the Capital District, prioritize cash flow. Appreciation is a bonus, not the strategy.
          </p>
        </div>
      </section>

      {/* Section 4: Cap Rates Explained */}
      <section className="px-[5%] py-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Cap Rates Explained (With Local Context)
          </h2>
          <div className="bg-background border border-border rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
              <div>
                <p className="text-lg font-bold text-foreground">Cap Rate Formula</p>
                <p className="text-muted-foreground text-sm">Net Operating Income ÷ Purchase Price × 100</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Example: A property generates $24,000/year in rent. After taxes ($4,000), insurance ($1,500), and maintenance ($2,500), your NOI is $16,000. If you paid $200,000, your cap rate is 8%.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-background border border-border rounded-lg">
              <p className="text-3xl font-bold text-primary mb-2">6-8%</p>
              <p className="text-sm text-muted-foreground">Albany & Surrounding Areas</p>
            </div>
            <div className="text-center p-4 bg-background border border-border rounded-lg">
              <p className="text-3xl font-bold text-primary mb-2">8-12%</p>
              <p className="text-sm text-muted-foreground">Troy & Schenectady</p>
            </div>
            <div className="text-center p-4 bg-background border border-border rounded-lg">
              <p className="text-3xl font-bold text-primary mb-2">5-7%</p>
              <p className="text-sm text-muted-foreground">Saratoga County</p>
            </div>
          </div>
          <p className="mt-6 text-muted-foreground text-sm text-center">
            Higher cap rates often come with more management intensity or deferred maintenance. Balance yield with your time and risk tolerance.
          </p>
        </div>
      </section>

      {/* Section 5: Neighborhood Investment Overview */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Neighborhood Investment Overview
          </h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Albany — Pine Hills, Center Square, Delaware Ave Corridor</h3>
              <p className="text-muted-foreground text-sm">
                Strong student and young professional rental demand. Multi-units range from $150K-$400K. Cap rates typically 6-9%. Well-maintained properties lease quickly.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Troy — Downtown, Lansingburgh, North Central</h3>
              <p className="text-muted-foreground text-sm">
                Highest cap rates in the region (8-12%). Revitalization ongoing. RPI and downtown growth driving demand. Entry prices lower, but tenant quality varies by block.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Schenectady — Stockade, Mont Pleasant, Hamilton Hill</h3>
              <p className="text-muted-foreground text-sm">
                Mixed opportunity. Stockade is premium and competitive. Other areas offer value-add potential with careful tenant screening. GE and casino employment drive demand.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Suburban — Colonie, Guilderland, Clifton Park, Delmar</h3>
              <p className="text-muted-foreground text-sm">
                Lower cap rates (5-7%) but stronger appreciation and lower turnover. Family renters stay longer. Better for buy-and-hold investors prioritizing stability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Example Deal Breakdown */}
      <section className="px-[5%] py-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Example Deal Breakdown
          </h2>
          <div className="bg-background border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <p className="text-lg font-bold text-foreground">Troy Triplex — 45 South Lake Ave</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Purchase Price</p>
                <p className="text-2xl font-bold text-foreground">$185,000</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monthly Gross Rent</p>
                <p className="text-2xl font-bold text-foreground">$2,850</p>
              </div>
            </div>
            <div className="border-t border-border pt-6">
              <p className="font-bold text-foreground mb-4">Annual Numbers</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Gross Income</p>
                  <p className="font-bold text-foreground">$34,200</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Taxes</p>
                  <p className="font-bold text-foreground">$4,800</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Insurance</p>
                  <p className="font-bold text-foreground">$1,800</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Maintenance (10%)</p>
                  <p className="font-bold text-foreground">$3,420</p>
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-6 mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Net Operating Income</p>
                  <p className="text-xl font-bold text-primary">$24,180</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Cap Rate</p>
                  <p className="text-xl font-bold text-primary">13.1%</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Rent-to-Price</p>
                  <p className="text-xl font-bold text-primary">1.54%</p>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-6">
              This deal demonstrates why Troy remains popular with investors. Even after financing costs, this property would cash flow $800-1,000/month with 25% down.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-[5%] py-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">What is a good cap rate for the Capital District?</h3>
              <p className="text-muted-foreground text-sm">
                In the Capital District, cap rates typically range from 6-12% depending on location and property condition. Troy and Schenectady often see 8-12% cap rates, while Albany suburbs like Delmar and Colonie trend toward 5-7%. Higher cap rates usually come with more management intensity or deferred maintenance.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">How much do I need to invest in a Capital District rental property?</h3>
              <p className="text-muted-foreground text-sm">
                Investment properties typically require 15-25% down payment. For a $200,000 duplex, expect to bring $30,000-$50,000 plus closing costs and reserves. Some investors use house hacking (living in one unit) to qualify for owner-occupied financing with as little as 3.5% down.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Is Albany or Troy better for rental property investment?</h3>
              <p className="text-muted-foreground text-sm">
                Troy generally offers higher cap rates and lower entry prices, making it attractive for cash flow investors. Albany provides more stability and slower but steadier appreciation. The best choice depends on your investment goals, risk tolerance, and management preferences.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">What expenses should I budget for on a rental property?</h3>
              <p className="text-muted-foreground text-sm">
                Budget for property taxes (varies widely by town), insurance ($1,200-$2,400/year for multi-units), maintenance (10% of gross rent), vacancy (5-8%), and property management if used (8-10% of collected rent). Always verify actual tax bills before purchasing — they vary significantly across the Capital District.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Can I invest in the Capital District if I live out of state?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, many of our investors are from NYC, New Jersey, Connecticut, and beyond. We help out-of-state investors with property analysis, local market knowledge, and connections to property managers. The key is having a reliable local team for management and maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: CTA */}
      <section className="px-[5%] py-16 bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Join the VIP Investor List for Weekly Deal Breakdowns
          </h2>
          <p className="text-muted-foreground mb-8">
            Get exclusive access to off-market properties, verified financials, and investment analysis delivered to your inbox every week.
          </p>
          <Link
            to="/vip-buyer-access"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
          >
            Join VIP Investor List
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-6 text-sm text-muted-foreground">
            No spam. Just real deals and real numbers.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default InvestmentProperties;
