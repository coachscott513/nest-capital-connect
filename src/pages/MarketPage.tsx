import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MainLayout from '@/components/MainLayout';
import { TrendingUp, Home, DollarSign, Calendar, MapPin, ArrowRight, BarChart3, Building } from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';

interface MarketData {
  name: string;
  slug: string;
  county: string;
  medianPrice: string;
  priceChange: string;
  avgDaysOnMarket: string;
  inventory: string;
  description: string;
  highlights: string[];
  neighborhoods: string[];
}

const marketData: Record<string, MarketData> = {
  'troy': {
    name: 'Troy',
    slug: 'troy',
    county: 'Rensselaer',
    medianPrice: '$245,000',
    priceChange: '+8.2%',
    avgDaysOnMarket: '28',
    inventory: '142',
    description: 'Troy offers Victorian architecture, waterfront living along the Hudson River, and strong rental demand from RPI students. The city is experiencing significant downtown revitalization with growing investor interest.',
    highlights: [
      'RPI student rental demand drives 6-8% cap rates',
      'Downtown revitalization increasing property values',
      'Historic Victorian homes with character',
      'Hudson River waterfront development'
    ],
    neighborhoods: ['Downtown Troy', 'Lansingburgh', 'South Troy', 'North Central']
  },
  'albany': {
    name: 'Albany',
    slug: 'albany',
    county: 'Albany',
    medianPrice: '$275,000',
    priceChange: '+6.5%',
    avgDaysOnMarket: '32',
    inventory: '198',
    description: 'As New York\'s capital city, Albany offers diverse neighborhoods, strong government employment, and excellent investment opportunities. From Pine Hills to Center Square, each area has unique characteristics.',
    highlights: [
      'State government provides stable employment base',
      'Multiple universities drive rental demand',
      'Diverse price points across neighborhoods',
      'Strong appreciation in revitalizing areas'
    ],
    neighborhoods: ['Pine Hills', 'Center Square', 'Delaware Ave Corridor', 'Arbor Hill']
  },
  'schenectady': {
    name: 'Schenectady',
    slug: 'schenectady',
    county: 'Schenectady',
    medianPrice: '$195,000',
    priceChange: '+9.1%',
    avgDaysOnMarket: '25',
    inventory: '112',
    description: 'Schenectady offers the most affordable entry point in the Capital District with rapid appreciation. The Electric City is seeing major investment in downtown and the Stockade District.',
    highlights: [
      'Lowest median prices in the region',
      'Highest year-over-year appreciation',
      'GE and casino employment centers',
      'Historic Stockade District appeal'
    ],
    neighborhoods: ['Stockade District', 'Mont Pleasant', 'Hamilton Hill', 'Bellevue']
  },
  'saratoga-springs': {
    name: 'Saratoga Springs',
    slug: 'saratoga-springs',
    county: 'Saratoga',
    medianPrice: '$485,000',
    priceChange: '+5.8%',
    avgDaysOnMarket: '45',
    inventory: '87',
    description: 'Saratoga Springs represents the luxury market of the Capital District. World-class horse racing, performing arts, and mineral springs attract affluent buyers and tourists year-round.',
    highlights: [
      'Premium market with strong fundamentals',
      'SPAC and racing season tourism',
      'Excellent schools and amenities',
      'Short-term rental opportunity'
    ],
    neighborhoods: ['Downtown', 'East Side', 'West Side', 'Greenfield']
  },
  'clifton-park': {
    name: 'Clifton Park',
    slug: 'clifton-park',
    county: 'Saratoga',
    medianPrice: '$385,000',
    priceChange: '+7.3%',
    avgDaysOnMarket: '21',
    inventory: '156',
    description: 'Clifton Park is the premier suburban community in the Capital District. Top-rated Shenendehowa schools, abundant retail, and easy access to the Northway make it ideal for families.',
    highlights: [
      'Top-rated Shenendehowa School District',
      'Strong retail and dining options',
      'Easy commute to Albany and Saratoga',
      'New construction and established neighborhoods'
    ],
    neighborhoods: ['Clifton Gardens', 'Clifton Knolls', 'Country Knolls', 'Vischer Ferry']
  },
  'amsterdam': {
    name: 'Amsterdam',
    slug: 'amsterdam',
    county: 'Montgomery',
    medianPrice: '$145,000',
    priceChange: '+11.2%',
    avgDaysOnMarket: '35',
    inventory: '78',
    description: 'Amsterdam is an emerging market with exceptional value and the highest appreciation rates in the region. Historic architecture and a revitalizing downtown create opportunity for investors.',
    highlights: [
      'Lowest entry point in the region',
      'Highest appreciation rate (+11.2%)',
      'Historic downtown revitalization',
      'Strong rental yields due to low prices'
    ],
    neighborhoods: ['Downtown', 'East End', 'West End', 'Rockton']
  }
};

const MarketPage = () => {
  const { town } = useParams<{ town: string }>();
  const market = town ? marketData[town] : null;

  if (!market) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Market Not Found</h1>
            <Link to="/" className="text-accent hover:underline">Return to Home</Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const relatedArticles = [
    { title: `${market.name} Investment Property Analysis`, slug: 'investment-analysis', date: 'Dec 2024' },
    { title: `Best Neighborhoods in ${market.name} for Investors`, slug: 'best-neighborhoods', date: 'Nov 2024' },
    { title: `${market.name} Rental Market Trends`, slug: 'rental-trends', date: 'Oct 2024' }
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>{market.name} Real Estate Market | Capital District Nest</title>
        <meta name="description" content={`${market.name} real estate market data, trends, and investment opportunities. Median price ${market.medianPrice}, ${market.priceChange} YoY growth.`} />
        <link rel="canonical" href={`https://capitaldistrictnest.com/market/${market.slug}`} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-[#022c22] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-accent mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider">{market.county} County</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {market.name} Real Estate Market
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            {market.description}
          </p>
        </div>
      </section>

      {/* Market Stats Ticker */}
      <section className="bg-card border-y border-border py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">Median Price</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{market.medianPrice}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">YoY Change</span>
              </div>
              <p className="text-2xl font-bold text-accent">{market.priceChange}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">Avg Days on Market</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{market.avgDaysOnMarket}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Home className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">Active Listings</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{market.inventory}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Market Highlights */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Why Invest in {market.name}?
                </h2>
                <ul className="space-y-4">
                  {market.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <BarChart3 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Neighborhoods */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Featured Neighborhoods
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {market.neighborhoods.map((neighborhood, index) => (
                    <Link 
                      key={index}
                      to={`/homes-for-sale/${market.slug}`}
                      className="group p-4 bg-card border border-border rounded-lg hover:border-accent transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Building className="w-5 h-5 text-accent" />
                          <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                            {neighborhood}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related Articles */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  {market.name} Market Insights
                </h2>
                <div className="space-y-4">
                  {relatedArticles.map((article, index) => (
                    <Link 
                      key={index}
                      to={`/blog/${article.slug}`}
                      className="group block p-4 bg-card border border-border rounded-lg hover:border-accent transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{article.date}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              <LeadCaptureForm 
                type="investment"
                title={`Get ${market.name} Market Report`}
                description="Receive exclusive market data and off-market opportunities"
                buttonText="Send Me the Report"
              />

              {/* Cross-Links */}
              <div className="p-6 bg-card border border-border rounded-lg">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  Explore Other Markets
                </h3>
                <div className="space-y-3">
                  {Object.values(marketData)
                    .filter(m => m.slug !== market.slug)
                    .map((m, index) => (
                      <Link 
                        key={index}
                        to={`/market/${m.slug}`}
                        className="flex items-center justify-between text-muted-foreground hover:text-accent transition-colors"
                      >
                        <span>{m.name}</span>
                        <span className="text-sm">{m.medianPrice}</span>
                      </Link>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default MarketPage;