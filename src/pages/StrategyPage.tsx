import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MainLayout from '@/components/MainLayout';
import { TrendingUp, Home, DollarSign, Calculator, Target, CheckCircle, ArrowRight, Building, Users, Percent } from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';

interface StrategyData {
  name: string;
  slug: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  keyMetrics: { label: string; value: string; description: string }[];
  investmentThesis: string[];
  idealFor: string[];
  caseStudy: {
    title: string;
    purchase: string;
    renovation?: string;
    monthlyIncome: string;
    capRate: string;
    cashOnCash: string;
  };
}

const strategyData: Record<string, StrategyData> = {
  'multi-family': {
    name: 'Multi-Family',
    slug: 'multi-family',
    icon: <Building className="w-8 h-8" />,
    tagline: 'Build Wealth Through Rental Income',
    description: 'Multi-family properties in the Capital District offer strong cash flow potential with cap rates averaging 6-9%. From duplexes to small apartment buildings, these assets provide multiple income streams and economies of scale.',
    keyMetrics: [
      { label: 'Avg Cap Rate', value: '7.2%', description: 'Net operating income / purchase price' },
      { label: 'Cash-on-Cash', value: '12-18%', description: 'Annual cash flow / total cash invested' },
      { label: 'Vacancy Rate', value: '4.5%', description: 'Capital District average' },
      { label: 'Rent Growth', value: '+5.8%', description: 'Year-over-year increase' }
    ],
    investmentThesis: [
      'Multiple income streams reduce risk vs. single-family',
      'Economies of scale on maintenance and management',
      'Strong rental demand from students and young professionals',
      'Value-add opportunities through unit renovations'
    ],
    idealFor: [
      'Investors seeking monthly cash flow',
      'Those looking to house-hack (live in one unit)',
      'Portfolio builders wanting scalable assets',
      'Investors comfortable with tenant management'
    ],
    caseStudy: {
      title: 'Troy Triplex - South Lake Ave',
      purchase: '$225,000',
      renovation: '$35,000',
      monthlyIncome: '$3,200',
      capRate: '8.1%',
      cashOnCash: '14.2%'
    }
  },
  'first-time-buyer': {
    name: 'First-Time Buyer',
    slug: 'first-time-buyer',
    icon: <Home className="w-8 h-8" />,
    tagline: 'Your First Home = Your First Asset',
    description: 'The Capital District offers first-time buyers exceptional value compared to NYC and Boston markets. With programs like FHA, SONYMA, and local down payment assistance, homeownership is more accessible than ever.',
    keyMetrics: [
      { label: 'Median Price', value: '$265,000', description: 'Capital District average' },
      { label: 'Min Down Payment', value: '3%', description: 'With FHA or conventional loans' },
      { label: 'SONYMA Rate', value: '5.875%', description: 'Below-market financing' },
      { label: 'Assistance Available', value: '$15,000', description: 'Down payment grants' }
    ],
    investmentThesis: [
      'Build equity instead of paying landlord\'s mortgage',
      'Lock in housing costs while rents increase',
      'Tax advantages through mortgage interest deduction',
      'Foundation for future real estate investment'
    ],
    idealFor: [
      'Renters paying $1,500+/month',
      'Young professionals with stable income',
      'Those qualifying for first-time buyer programs',
      'Investors interested in house-hacking'
    ],
    caseStudy: {
      title: 'Albany Colonial - Pine Hills',
      purchase: '$185,000',
      monthlyIncome: 'N/A (owner-occupied)',
      capRate: 'N/A',
      cashOnCash: '$6,500 down (FHA)'
    }
  },
  'fix-and-flip': {
    name: 'Fix & Flip',
    slug: 'fix-and-flip',
    icon: <TrendingUp className="w-8 h-8" />,
    tagline: 'Create Value Through Renovation',
    description: 'The Capital District\'s older housing stock creates opportunities for fix-and-flip investors. Victorian-era homes in Troy and historic properties in Albany offer significant upside for those willing to renovate.',
    keyMetrics: [
      { label: 'Avg Flip Profit', value: '$45,000', description: 'After all costs' },
      { label: 'Hold Time', value: '4-6 months', description: 'Average renovation period' },
      { label: 'ROI Target', value: '20%+', description: 'Minimum acceptable return' },
      { label: 'ARV Accuracy', value: '95%', description: 'Our comp analysis accuracy' }
    ],
    investmentThesis: [
      'Force appreciation through strategic renovations',
      'Capitalize on older housing stock needing updates',
      'Quick capital recycling vs. long-term holds',
      'Lower risk with proper due diligence'
    ],
    idealFor: [
      'Investors with renovation experience or contractors',
      'Those with access to short-term capital',
      'Active investors seeking quick returns',
      'Professionals who can manage timelines'
    ],
    caseStudy: {
      title: 'Schenectady Victorian - Stockade',
      purchase: '$120,000',
      renovation: '$55,000',
      monthlyIncome: 'Sold: $215,000',
      capRate: 'N/A (flip)',
      cashOnCash: '22.8% ROI'
    }
  },
  'buy-and-hold': {
    name: 'Buy & Hold',
    slug: 'buy-and-hold',
    icon: <Target className="w-8 h-8" />,
    tagline: 'Long-Term Wealth Building',
    description: 'Buy-and-hold investors benefit from appreciation, principal paydown, tax advantages, and cash flow. The Capital District\'s stable economy and growing population make it ideal for long-term holdings.',
    keyMetrics: [
      { label: '10-Year Appreciation', value: '+62%', description: 'Capital District average' },
      { label: 'Annual Cash Flow', value: '$4,800+', description: 'Per single-family rental' },
      { label: 'Principal Paydown', value: '$3,200/yr', description: 'First year (30-yr mortgage)' },
      { label: 'Depreciation', value: '$7,000/yr', description: 'Tax shield on $250K property' }
    ],
    investmentThesis: [
      'Build wealth through multiple return streams',
      'Hedge against inflation with real assets',
      'Create passive income for retirement',
      'Benefit from favorable tax treatment'
    ],
    idealFor: [
      'Long-term wealth builders',
      'Those seeking passive income',
      'Investors with 10+ year time horizon',
      'High-income earners needing tax advantages'
    ],
    caseStudy: {
      title: 'Albany Single-Family - Delaware Ave',
      purchase: '$195,000',
      monthlyIncome: '$1,850 rent',
      capRate: '6.8%',
      cashOnCash: '11.2% (Year 1)'
    }
  }
};

const StrategyPage = () => {
  const { asset } = useParams<{ asset: string }>();
  const strategy = asset ? strategyData[asset] : null;

  if (!strategy) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Strategy Not Found</h1>
            <Link to="/" className="text-accent hover:underline">Return to Home</Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>{strategy.name} Investment Strategy | Capital District Nest</title>
        <meta name="description" content={`${strategy.name} real estate investment strategy in the Capital District. ${strategy.tagline}. Learn the math behind successful ${strategy.name.toLowerCase()} investing.`} />
        <link rel="canonical" href={`https://capitaldistrictnest.com/strategy/${strategy.slug}`} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-accent mb-4">
            {strategy.icon}
            <span className="text-sm uppercase tracking-wider">Investment Strategy</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {strategy.name} Investing
          </h1>
          <p className="text-2xl text-accent font-medium mb-4">{strategy.tagline}</p>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {strategy.description}
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="bg-card border-y border-border py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {strategy.keyMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-accent mb-1">{metric.value}</p>
                <p className="font-medium text-foreground">{metric.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Investment Thesis */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  The Investment Thesis
                </h2>
                <ul className="space-y-4">
                  {strategy.investmentThesis.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Ideal Investor Profile
                </h2>
                <ul className="space-y-4">
                  {strategy.idealFor.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Case Study */}
              <div className="p-6 bg-card border border-accent/30 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-accent" />
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Case Study: {strategy.caseStudy.title}
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Purchase Price</p>
                    <p className="text-lg font-bold text-foreground">{strategy.caseStudy.purchase}</p>
                  </div>
                  {strategy.caseStudy.renovation && (
                    <div>
                      <p className="text-sm text-muted-foreground">Renovation</p>
                      <p className="text-lg font-bold text-foreground">{strategy.caseStudy.renovation}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Income / Sale</p>
                    <p className="text-lg font-bold text-foreground">{strategy.caseStudy.monthlyIncome}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cap Rate / Cash-on-Cash</p>
                    <p className="text-lg font-bold text-accent">
                      {strategy.caseStudy.capRate !== 'N/A' ? strategy.caseStudy.capRate : strategy.caseStudy.cashOnCash}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              <LeadCaptureForm 
                type="investment"
                title={`Get ${strategy.name} Opportunities`}
                description={`Receive curated ${strategy.name.toLowerCase()} properties matching your criteria`}
                buttonText="Send Me Properties"
              />

              {/* Cross-Links */}
              <div className="p-6 bg-card border border-border rounded-lg">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  Explore Other Strategies
                </h3>
                <div className="space-y-3">
                  {Object.values(strategyData)
                    .filter(s => s.slug !== strategy.slug)
                    .map((s, index) => (
                      <Link 
                        key={index}
                        to={`/strategy/${s.slug}`}
                        className="flex items-center justify-between text-muted-foreground hover:text-accent transition-colors"
                      >
                        <span>{s.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ))
                  }
                </div>
              </div>

              {/* Market Links */}
              <div className="p-6 bg-card border border-border rounded-lg">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  Browse by Market
                </h3>
                <div className="space-y-3">
                  {['troy', 'albany', 'schenectady', 'saratoga-springs'].map((market, index) => (
                    <Link 
                      key={index}
                      to={`/market/${market}`}
                      className="flex items-center justify-between text-muted-foreground hover:text-accent transition-colors"
                    >
                      <span className="capitalize">{market.replace('-', ' ')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default StrategyPage;