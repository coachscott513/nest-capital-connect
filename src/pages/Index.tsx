import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, TrendingUp, Home, DollarSign, Newspaper, ChevronRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import SEOHead from '@/components/SEOHead';
import Footer from '@/components/Footer';

const Index = () => {
  const marketTicker = [
    "Market Beat: Albany Inventory Down 12%",
    "Rates: 6.5% (30-Year Fixed)",
    "New Grant: $20k for First Time Buyers",
    "Troy Multi-Family: +8% YoY",
    "Schenectady Median: $185k",
    "Saratoga Springs: 15 Days Avg DOM"
  ];

  const newsItems = [
    { title: "Top 5 Neighborhoods in Troy for 2024", category: "Market Analysis", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=225&fit=crop" },
    { title: "Commercial Lending 101: What Investors Need to Know", category: "Education", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop" },
    { title: "Albany's Emerging Arts District: Investment Hotspot", category: "Opportunity", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=225&fit=crop" },
    { title: "First-Time Investor Success Story: From 0 to 4 Units", category: "Case Study", image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&h=225&fit=crop" },
    { title: "2024 Capital District Market Forecast", category: "Analysis", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=225&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-media-background text-media-foreground">
      <SEOHead
        title="Capital District Nest | Upstate NY Real Estate Media & Investment Hub"
        description="The authority on Capital District real estate. Market news, investment analysis, and property tools for Albany, Troy, Schenectady & Saratoga Springs."
        keywords="Capital District real estate, Albany NY homes, Troy investment properties, Schenectady real estate news, Saratoga Springs market analysis"
      />

      {/* Daily Pulse Ticker */}
      <div className="bg-media-accent/20 border-b border-media-border overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap py-2">
          {[...marketTicker, ...marketTicker].map((item, i) => (
            <span key={i} className="mx-8 text-sm font-medium text-media-muted">
              <span className="text-media-highlight mr-2">•</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-media-background/95 backdrop-blur-md border-b border-media-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-media-highlight rounded-lg flex items-center justify-center">
              <span className="text-media-background font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight">CAPITAL DISTRICT NEST</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/homes-for-sale" className="text-sm font-medium hover:text-media-highlight transition-colors">Buy</Link>
            <Link to="/rentals" className="text-sm font-medium hover:text-media-highlight transition-colors">Rent</Link>
            <Link to="/investor-tools" className="text-sm font-medium hover:text-media-highlight transition-colors">Invest</Link>
            <Link to="/blog" className="text-sm font-medium hover:text-media-highlight transition-colors">News</Link>
            <Link to="/markets" className="text-sm font-medium hover:text-media-highlight transition-colors">Markets</Link>
          </nav>
          <Link to="/investor-tools">
            <Button variant="media" size="sm">
              Access Tools
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section - Cinematic */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Video Placeholder Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-media-background via-media-card to-media-background">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-media-background via-transparent to-media-background/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-media-accent/30 border border-media-border mb-8">
            <span className="w-2 h-2 bg-media-highlight rounded-full animate-pulse" />
            <span className="text-sm font-medium">Live Market Data</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-none">
            CAPITAL DISTRICT
            <span className="block text-media-highlight">NEST</span>
          </h1>

          <p className="text-xl md:text-2xl text-media-muted max-w-3xl mx-auto mb-12 font-light">
            The Authority on Upstate Real Estate Media, News & Investing
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="media" size="lg" className="group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Market Update
            </Button>
            <Link to="/investor-tools">
              <Button variant="mediaOutline" size="lg">
                Access Investor Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-media-muted flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-media-muted rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* Bento Grid Navigation */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Your Path</h2>
            <p className="text-media-muted text-lg">Choose your journey in Capital District real estate</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* Buyers Card */}
            <Link to="/first-time-buyer-programs-albany" className="group">
              <Card className="bg-media-card border-media-border hover:border-media-highlight/50 transition-all duration-300 overflow-hidden h-[280px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
                <CardContent className="relative h-full flex flex-col justify-end p-6">
                  <div className="w-12 h-12 rounded-xl bg-media-highlight/20 flex items-center justify-center mb-4">
                    <Home className="w-6 h-6 text-media-highlight" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">0% Down Programs</h3>
                  <p className="text-sm text-media-muted">First-time buyer grants & financing</p>
                  <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-media-muted group-hover:text-media-highlight group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>

            {/* Investors Card - Links to preserved tools */}
            <Link to="/investor-tools" className="group lg:row-span-2">
              <Card className="bg-media-card border-media-border hover:border-media-highlight/50 transition-all duration-300 overflow-hidden h-full min-h-[280px] lg:min-h-[576px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&h=600&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
                <CardContent className="relative h-full flex flex-col justify-end p-6">
                  <div className="w-12 h-12 rounded-xl bg-media-highlight/20 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-media-highlight" />
                  </div>
                  <span className="text-xs font-semibold text-media-highlight mb-2">CALCULATORS & ANALYSIS</span>
                  <h3 className="text-2xl font-bold mb-2">Cash Flow Calculator</h3>
                  <p className="text-sm text-media-muted">Investment analysis, amortization tables & ROI projections</p>
                  <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-media-muted group-hover:text-media-highlight group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>

            {/* Sellers Card */}
            <Link to="/sell-investment-property" className="group">
              <Card className="bg-media-card border-media-border hover:border-media-highlight/50 transition-all duration-300 overflow-hidden h-[280px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
                <CardContent className="relative h-full flex flex-col justify-end p-6">
                  <div className="w-12 h-12 rounded-xl bg-media-highlight/20 flex items-center justify-center mb-4">
                    <DollarSign className="w-6 h-6 text-media-highlight" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">What's My Home Worth?</h3>
                  <p className="text-sm text-media-muted">Free property valuation</p>
                  <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-media-muted group-hover:text-media-highlight group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>

            {/* Newsroom Card */}
            <Link to="/blog" className="group">
              <Card className="bg-media-card border-media-border hover:border-media-highlight/50 transition-all duration-300 overflow-hidden h-[280px]">
                <div className="absolute inset-0 bg-gradient-to-br from-media-highlight/20 to-media-accent/20" />
                <CardContent className="relative h-full flex flex-col justify-end p-6">
                  <div className="w-12 h-12 rounded-xl bg-media-highlight/20 flex items-center justify-center mb-4">
                    <Newspaper className="w-6 h-6 text-media-highlight" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">The Newsroom</h3>
                  <p className="text-sm text-media-muted">Daily market analysis & insights</p>
                  <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-media-muted group-hover:text-media-highlight group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>

            {/* Markets Card */}
            <Link to="/markets" className="group">
              <Card className="bg-media-card border-media-border hover:border-media-highlight/50 transition-all duration-300 overflow-hidden h-[280px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
                <CardContent className="relative h-full flex flex-col justify-end p-6">
                  <div className="w-12 h-12 rounded-xl bg-media-highlight/20 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-media-highlight" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Market Data</h3>
                  <p className="text-sm text-media-muted">Live stats by neighborhood</p>
                  <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-media-muted group-hover:text-media-highlight group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsroom Feed */}
      <section className="py-20 px-4 bg-media-card/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest from the Newsroom</h2>
              <p className="text-media-muted">Articles, videos & market intelligence</p>
            </div>
            <Link to="/blog">
              <Button variant="mediaOutline" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {newsItems.map((item, i) => (
              <Link to="/blog" key={i} className="group flex-shrink-0 w-[320px]">
                <Card className="bg-media-card border-media-border hover:border-media-highlight/50 transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-media-background/80 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs font-semibold px-2 py-1 rounded bg-media-highlight/90 text-media-background">
                      {item.category}
                    </span>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-media-highlight transition-colors">
                      {item.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-media-highlight/10 to-media-accent/10 border-media-border p-8 md:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-media-highlight/20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-media-highlight" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Ahead of the Market</h2>
            <p className="text-media-muted mb-8 max-w-xl mx-auto">
              Get weekly market updates, investment opportunities, and exclusive analysis delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-media-background border-media-border text-media-foreground placeholder:text-media-muted"
              />
              <Button variant="media">Subscribe</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-media-border py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-media-highlight rounded-lg flex items-center justify-center">
                <span className="text-media-background font-bold">N</span>
              </div>
              <span className="font-bold">CAPITAL DISTRICT NEST</span>
            </div>
            <nav className="flex flex-wrap items-center gap-6 text-sm text-media-muted">
              <Link to="/investor-tools" className="hover:text-media-highlight transition-colors">Tools & Calculators</Link>
              <Link to="/homes-for-sale" className="hover:text-media-highlight transition-colors">Homes for Sale</Link>
              <Link to="/rentals" className="hover:text-media-highlight transition-colors">Rentals</Link>
              <Link to="/blog" className="hover:text-media-highlight transition-colors">News</Link>
              <Link to="/privacy-policy" className="hover:text-media-highlight transition-colors">Privacy</Link>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-media-border text-center text-sm text-media-muted">
            © {new Date().getFullYear()} Capital District Nest. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
