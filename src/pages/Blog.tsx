import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, User, Search, TrendingUp, BarChart3, ArrowRight, Building2, MapPin } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import SEOHead from '@/components/SEOHead';
import ForSaleKeywordOptimizer from '@/components/ForSaleKeywordOptimizer';
import CapitalDistrictSEOStrategy from '@/components/CapitalDistrictSEOStrategy';
import { Separator } from '@/components/ui/separator';

// Featured Market Forecast Article
const featuredArticle = {
  title: "The 2025 Capital District Market Forecast",
  subtitle: "How macro forces, local demand, and investor sentiment are reshaping Albany, Troy, and Schenectady real estate",
  slug: "2025-capital-district-market-forecast",
  author: "Scott Alvarez",
  authorTitle: "Principal Analyst",
  publishedAt: "December 8, 2025",
  readTime: "12 min read",
  category: "Market Analysis",
  isNew: true
};

// Blog posts organized by section
const topStories = [
  {
    id: 1,
    title: "Albany Investment Properties: Best Neighborhoods for Cash Flow in 2025",
    slug: "albany-investment-properties-for-sale-best-neighborhoods-2025",
    excerpt: "From Center Square to Pine Hills, discover where smart investors are buying to maximize cash flow.",
    author: "Scott Alvarez",
    publishedAt: "Jan 22, 2025",
    readTime: "8 min",
    category: "Market Analysis",
    location: "Albany"
  },
  {
    id: 2,
    title: "Troy Multi-Family: RPI Corridor Properties Outperform Market",
    slug: "troy-rpi-multi-family-properties-investment",
    excerpt: "Student housing near Rensselaer sees 15% rent growth as enrollment stabilizes.",
    author: "Scott Alvarez",
    publishedAt: "Jan 20, 2025",
    readTime: "6 min",
    category: "Property Analysis",
    location: "Troy"
  },
  {
    id: 3,
    title: "Schenectady Tax Abatement Program: A Complete Investor Guide",
    slug: "schenectady-tax-abatement-program-investor-guide",
    excerpt: "How to leverage 485-a exemptions for maximum after-tax returns on rehabilitation projects.",
    author: "Scott Alvarez",
    publishedAt: "Jan 18, 2025",
    readTime: "10 min",
    category: "Tax Strategy",
    location: "Schenectady"
  }
];

const marketData = [
  { label: "Albany Median", value: "$285K", change: "+4.2%", positive: true },
  { label: "Troy Median", value: "$198K", change: "+7.8%", positive: true },
  { label: "Schenectady", value: "$175K", change: "+5.1%", positive: true },
  { label: "Cap Rate Avg", value: "7.2%", change: "-0.3%", positive: false }
];

const latestAnalysis = [
  {
    title: "Center Square Albany: Multi-Family Investment Analysis",
    slug: "center-square-albany-multi-family-properties-for-sale-investment-analysis",
    category: "Neighborhood",
    date: "Jan 21"
  },
  {
    title: "Pine Hills Student Rentals: ROI Projections",
    slug: "pine-hills-albany-student-rental-properties-for-sale-analysis",
    category: "Student Housing",
    date: "Jan 20"
  },
  {
    title: "West Hill Albany: Opportunity or Value Trap?",
    slug: "west-hill-albany-properties-for-sale-investment-opportunity-analysis",
    category: "Due Diligence",
    date: "Jan 19"
  },
  {
    title: "House Hacking Guide: Albany 2-4 Unit Properties",
    slug: "albany-2-4-unit-properties-for-sale-house-hacking-guide",
    category: "Strategy",
    date: "Jan 18"
  },
  {
    title: "Delaware Avenue Premium Rental Market",
    slug: "delaware-avenue-albany-luxury-properties-for-sale-rental-market",
    category: "Luxury",
    date: "Jan 17"
  },
  {
    title: "Albany Medical District: Healthcare Worker Housing",
    slug: "new-scotland-avenue-albany-medical-district-properties-for-sale-investment",
    category: "Medical",
    date: "Jan 16"
  }
];

const opinionPieces = [
  {
    title: "Why I'm Bullish on Troy for 2025",
    author: "Scott Alvarez",
    excerpt: "The Collar City's fundamentals have never looked stronger.",
    slug: "why-bullish-troy-2025"
  },
  {
    title: "The BRRRR Strategy Still Works—With Adjustments",
    author: "Scott Alvarez",
    excerpt: "Higher rates require smarter execution, not abandonment.",
    slug: "brrrr-strategy-capital-district-guide"
  }
];

const categories = ["All", "Market Analysis", "Property Analysis", "Investment Strategy", "Neighborhood", "Tax Strategy"];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <MainLayout>
      <ForSaleKeywordOptimizer 
        pageTitle="Market Intelligence | Capital District Nest"
        location="Capital District"
        propertyType="investment properties"
        targetKeywords={["real estate market analysis", "investment property insights", "capital district forecast"]}
      />
      <CapitalDistrictSEOStrategy pageType="blog" location="Capital District" propertyType="investment properties" />
      <SEOHead 
        title="Market Intelligence | Capital District Real Estate Analysis"
        description="In-depth real estate analysis, market forecasts, and investment insights for Albany, Troy, Schenectady, and Saratoga Springs. Data-driven intelligence for serious investors."
        keywords="capital district real estate, market analysis, investment properties, albany real estate forecast, troy property investment"
        canonical="https://capitaldistrictnest.com/blog"
      />
      
      {/* WSJ-Style Header Bar */}
      <header className="bg-primary text-primary-foreground border-b-4 border-primary/80">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold tracking-tight">
                Market Intelligence
              </h1>
              <p className="text-primary-foreground/80 text-sm mt-1 font-lora">
                Capital District Real Estate Analysis & Investment Research
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <span className="text-primary-foreground/70">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Market Ticker */}
      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Market Snapshot</span>
            {marketData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="font-playfair font-bold text-foreground">{item.value}</span>
                <span className={`text-xs font-medium ${item.positive ? 'text-primary' : 'text-destructive'}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search analysis, markets, strategies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border font-lora"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Column - Featured + Top Stories */}
            <div className="lg:col-span-8">
              
              {/* Featured Article - Lead Story */}
              <article className="mb-10">
                <Link to={`/blog/article/${featuredArticle.slug}`} className="group block">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-primary text-primary-foreground text-xs uppercase tracking-wider">
                      Lead Story
                    </Badge>
                    {featuredArticle.isNew && (
                      <Badge variant="outline" className="text-primary border-primary text-xs">New</Badge>
                    )}
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {featuredArticle.category}
                    </span>
                  </div>
                  
                  <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors mb-4">
                    {featuredArticle.title}
                  </h2>
                  
                  <p className="font-lora text-xl text-muted-foreground leading-relaxed mb-4">
                    {featuredArticle.subtitle}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{featuredArticle.author}</span>
                    <span>·</span>
                    <span>{featuredArticle.authorTitle}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredArticle.readTime}
                    </span>
                  </div>
                </Link>
              </article>

              <Separator className="mb-8" />

              {/* Top Stories Grid */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-playfair text-xl font-bold text-foreground">Top Stories</h3>
                </div>

                <div className="space-y-6">
                  {topStories.map((story, index) => (
                    <article key={story.id} className="group">
                      <Link to={`/blog/${story.slug}`} className="block">
                        <div className="flex gap-4">
                          <span className="font-playfair text-4xl font-bold text-muted-foreground/30">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 text-xs">
                              <Badge variant="secondary" className="font-medium">{story.category}</Badge>
                              <span className="text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {story.location}
                              </span>
                            </div>
                            <h4 className="font-playfair text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                              {story.title}
                            </h4>
                            <p className="font-lora text-muted-foreground text-sm leading-relaxed mb-2">
                              {story.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{story.author}</span>
                              <span>·</span>
                              <span>{story.publishedAt}</span>
                              <span>·</span>
                              <span>{story.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      {index < topStories.length - 1 && <Separator className="mt-6" />}
                    </article>
                  ))}
                </div>
              </section>

              {/* Opinion Section */}
              <section className="mt-12 p-6 bg-muted/30 border border-border">
                <h3 className="font-playfair text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  Opinion & Commentary
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {opinionPieces.map((piece, index) => (
                    <Link key={index} to={`/blog/${piece.slug}`} className="group block">
                      <h4 className="font-playfair text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                        {piece.title}
                      </h4>
                      <p className="font-lora text-sm text-muted-foreground italic mb-2">
                        {piece.excerpt}
                      </p>
                      <span className="text-xs text-primary font-medium">{piece.author}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <aside className="lg:col-span-4">
              
              {/* Latest Analysis */}
              <div className="mb-8">
                <h3 className="font-playfair text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-primary">
                  Latest Analysis
                </h3>
                <div className="space-y-4">
                  {latestAnalysis.map((item, index) => (
                    <Link key={index} to={`/blog/${item.slug}`} className="group block">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <span className="text-xs text-primary font-medium uppercase tracking-wider">
                            {item.category}
                          </span>
                          <h4 className="font-playfair text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight mt-1">
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {item.date}
                        </span>
                      </div>
                      {index < latestAnalysis.length - 1 && <Separator className="mt-4" />}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-primary text-primary-foreground p-6">
                <h3 className="font-playfair text-lg font-bold mb-2">The Weekly Brief</h3>
                <p className="text-sm text-primary-foreground/80 font-lora mb-4">
                  Market analysis, deal flow, and investment insights delivered every Thursday.
                </p>
                <Input 
                  placeholder="your@email.com" 
                  className="bg-primary-foreground text-foreground mb-3"
                />
                <button className="w-full bg-background text-foreground py-2 font-semibold text-sm hover:bg-background/90 transition-colors">
                  Subscribe
                </button>
                <p className="text-xs text-primary-foreground/60 mt-2 text-center">
                  Free. Unsubscribe anytime.
                </p>
              </div>

              {/* Quick Links */}
              <div className="mt-8">
                <h3 className="font-playfair text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <Link to="/cash-flow-report" className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary group">
                    <span>Request Cash Flow Report</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/investor-tools" className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary group">
                    <span>Investor Tools</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/homes-for-sale" className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary group">
                    <span>View Current Listings</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default Blog;