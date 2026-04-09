import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, BarChart3, GitCompare, FileText, Users, MapPin, Briefcase } from "lucide-react";
import Footer from "@/components/Footer";

const loanTypesPreview = [
  { name: "Conventional", description: "Standard financing. 5-25% down. Clean and simple." },
  { name: "FHA", description: "3.5% down. Mortgage insurance calculated automatically." },
  { name: "FHA 203(k)", description: "Purchase + rehab in one loan. Full budget modeling." },
  { name: "DSCR", description: "Investor loans. Qualification check built in." },
  { name: "VA", description: "Zero down. Funding fee calculated. No monthly MI." },
  { name: "Hard Money", description: "Bridge loans. Interest-only. Flip ROI analysis." },
  { name: "Cash", description: "No financing. Pure cap rate and cash flow." },
];

const YieldHome = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Capital District Nest | Know the numbers before you buy</title>
        <meta 
          name="description" 
          content="Institutional-quality deal analysis for rentals, multi-family, and land. Any property. Any loan type. In seconds. Free professional PDF reports." 
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/yield" />
      </Helmet>

      {/* Navigation */}
      <header 
        className="sticky top-0 z-[2000]"
        style={{
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(50px) saturate(200%)',
          WebkitBackdropFilter: 'blur(50px) saturate(200%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/yield" className="flex flex-col">
              <span className="text-lg font-bold text-white">Capital District Nest</span>
              <span className="text-xs text-primary tracking-wide">Know the numbers before you buy</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/yield" className="text-sm text-white/80 hover:text-white transition-colors">Home</Link>
              <Link to="/analyzer" className="text-sm text-primary font-semibold hover:text-primary/80 transition-colors">Analyzer</Link>
              <Link to="/loan-types" className="text-sm text-white/80 hover:text-white transition-colors">Loan Types</Link>
              <a href="#how-it-works" className="text-sm text-white/80 hover:text-white transition-colors">How It Works</a>
              <Link to="/reports" className="text-sm text-white/80 hover:text-white transition-colors">Reports</Link>
              <Link to="/about" className="text-sm text-white/80 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-sm text-white/80 hover:text-white transition-colors">Contact</Link>
            </div>

            <Link 
              to="/analyzer" 
              className="md:hidden px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold"
            >
              Analyze
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Know the deal before you make the deal.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Institutional-quality deal analysis for rentals, multi-family, and land. Any property. Any loan type. In seconds.
          </p>
          <Link 
            to="/analyzer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
          >
            Analyze a Property
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Free to use. No account required. Professional PDF reports you can share with your lender, partner, or client.
          </p>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="px-6 py-20 bg-card border-y border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The $36 billion blind spot
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Americans invest $36 billion a year in rental properties and land. Most of them decide based on a listing photo and a gut feeling. The platforms that show you properties don't analyze them. The calculators that analyze them don't know your market. We built something that does both.
          </p>
        </div>
      </section>

      {/* What We Do - 3 Cards */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Analyze any deal in 60 seconds
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Plug in a property, pick your loan type — FHA, conventional, 203(k) rehab, DSCR, VA, hard money, or cash — and see every number that matters. Cap rate, cash flow, DSCR, break-even, cash-on-cash. Model rentals, value-add rehabs, and land deals with realistic financing scenarios. All calculated live as you type.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <GitCompare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Compare financing scenarios instantly
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                See how the same property performs under different loan types side by side. FHA at 3.5% down vs. conventional at 20%? DSCR vs. hard money for a rehab flip? From duplex cash flow to land and construction assumptions — the math updates automatically.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Generate professional PDF reports
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Institutional-quality investment summaries you can download, print, or send to your lender. Scenario analysis, deal highlights, due diligence checklist — the kind of report a bank expects. The kind of report that closes deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 4 Steps */}
      <section id="how-it-works" className="px-6 py-20 bg-card border-y border-border scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            From listing to decision in four steps
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Enter the property</h3>
                <p className="text-muted-foreground">Address, price, unit count, land size — start with what you know from the listing.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Choose your financing</h3>
                <p className="text-muted-foreground">Pick from 7 loan types. Each one adjusts the inputs automatically. FHA adds mortgage insurance. 203(k) opens a full rehab budget. DSCR checks lender qualification. Hard money calculates your flip ROI. Cash strips it to the basics.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Add the expenses</h3>
                <p className="text-muted-foreground">Taxes, insurance, maintenance, holding costs. We show what to expect. You adjust to what you know.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">4</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">See the verdict</h3>
                <p className="text-muted-foreground">Cap rate, cash flow, DSCR, break-even — all live. Green means it works. Red means it doesn't. No ambiguity. Download the PDF and make your move.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For - 3 Blocks */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Investors</h3>
              <p className="text-muted-foreground">
                Whether you're house-hacking your first duplex, evaluating a value-add rehab, or analyzing land for development — the analyzer adapts to your strategy. New investors get clarity. Experienced investors get speed.
              </p>
            </div>

            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto md:mx-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Out-of-area buyers</h3>
              <p className="text-muted-foreground">
                Investing from a distance? Thousands of NYC, NJ, and CT investors buy income property and land in Upstate New York every year. We combine institutional-grade financial analysis with boots-on-the-ground market knowledge so you can invest with confidence from anywhere.
              </p>
            </div>

            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real estate agents</h3>
              <p className="text-muted-foreground">
                Your investor clients ask about cap rates, cash flow, and financing strategy. Now you have a tool that answers those questions — with professional reports you can brand and share. Stand out from every agent who just sends a listing link.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="px-6 py-20 bg-card border-y border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Not another calculator
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Most investment calculators give you a blank form and expect you to know every input. They don't tell you what FHA mortgage insurance costs. They don't calculate your cash-to-close after seller concessions. They don't model a 203(k) rehab budget with contingency reserves and holding costs. They don't show you how the same property performs under three different financing scenarios.
            </p>
            <p>
              We built Capital District Nest because we got tired of doing this math on spreadsheets for 1,500 investor calls a year. This tool is the product of actually working with investors — knowing what they ask, what they miss, and what they need to hear before they pull the trigger on a property.
            </p>
            <p className="text-white font-semibold text-lg">
              The analysis is free. The expertise is built in.
            </p>
          </div>
        </div>
      </section>

      {/* Loan Types Preview - 7 Cards */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              7 loan types. One analyzer.
            </h2>
            <p className="text-muted-foreground">
              Every financing structure works differently. The analyzer handles all of them.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {loanTypesPreview.map((loan) => (
              <div 
                key={loan.name}
                className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors"
              >
                <h4 className="font-semibold text-white text-sm mb-1">{loan.name}</h4>
                <p className="text-xs text-muted-foreground">{loan.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/loan-types"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Learn more about each loan type →
            </Link>
            <Link 
              to="/analyzer"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Try the Analyzer
            </Link>
          </div>
        </div>
      </section>

      {/* Credibility / About */}
      <section className="px-6 py-20 bg-card border-y border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Built by investors, for investors
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Capital District Nest was built by Scott Alvarez, a licensed real estate professional with RE/MAX Solutions in Albany, New York. After fielding over 1,500 investor calls a year and building custom analyses for every property, Scott created the platform to put that same expert-level analysis in the hands of every investor. Based in the heart of New York's Capital District, we specialize in multi-unit investment properties, rehab strategies, land opportunities, and the financing structures that make deals work.
          </p>
          <p className="text-white font-medium">
            Scott Alvarez | RE/MAX Solutions | 518-522-7265 | 2 Gold Street, Albany, NY
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Your next investment decision starts here.
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Analyze any property. Any loan type. Download the report. It's free.
          </p>
          <Link 
            to="/analyzer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
          >
            Open the Analyzer
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            No sign-up. No credit card. Just answers.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary border-t border-border px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Capital District Nest</h3>
              <p className="text-sm text-muted-foreground">Know the numbers before you buy</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="/yield" className="text-muted-foreground hover:text-white transition-colors">Home</Link>
              <Link to="/analyzer" className="text-primary hover:text-primary/80 transition-colors">Analyzer</Link>
              <Link to="/loan-types" className="text-muted-foreground hover:text-white transition-colors">Loan Types</Link>
              <a href="#how-it-works" className="text-muted-foreground hover:text-white transition-colors">How It Works</a>
              <Link to="/about" className="text-muted-foreground hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-white transition-colors">Contact</Link>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Scott Alvarez | RE/MAX Solutions</p>
              <p className="text-sm text-muted-foreground">518-522-7265</p>
              <p className="text-sm text-muted-foreground">2 Gold Street, Albany, NY</p>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              capitaldistrictnest.com — © {new Date().getFullYear()} Capital District Nest
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default YieldHome;
