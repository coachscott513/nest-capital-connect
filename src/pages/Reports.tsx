import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, FileText } from "lucide-react";

const Reports = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Sample Reports | Investment Analysis Reports | Capital District Nest</title>
        <meta 
          name="description" 
          content="View sample investment analysis reports. Professional PDF reports with cap rate, cash flow, DSCR, and financing analysis for rental properties." 
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/reports" />
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
              <span className="text-xs text-primary tracking-wide">The Yield Intelligence Platform</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/yield" className="text-sm text-white/80 hover:text-white transition-colors">Home</Link>
              <Link to="/analyzer" className="text-sm text-primary font-semibold hover:text-primary/80 transition-colors">Analyzer</Link>
              <Link to="/loan-types" className="text-sm text-white/80 hover:text-white transition-colors">Loan Types</Link>
              <Link to="/yield#how-it-works" className="text-sm text-white/80 hover:text-white transition-colors">How It Works</Link>
              <Link to="/reports" className="text-sm text-white hover:text-white transition-colors font-semibold">Reports</Link>
              <Link to="/about" className="text-sm text-white/80 hover:text-white transition-colors">About</Link>
            </div>

            <Link 
              to="/analyzer" 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold"
            >
              Open Analyzer
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <section className="px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sample Reports Coming Soon
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're putting together a library of sample investment analysis reports so you can see exactly what the analyzer produces before you run your own numbers.
          </p>

          <p className="text-muted-foreground mb-12">
            In the meantime, the best way to see a report is to generate one yourself. It takes 60 seconds and it's completely free.
          </p>

          <Link 
            to="/analyzer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
          >
            Try the Analyzer
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary border-t border-border px-6 py-12 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Capital District Nest</h3>
              <p className="text-sm text-muted-foreground">The Yield Intelligence Platform</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="/yield" className="text-muted-foreground hover:text-white transition-colors">Home</Link>
              <Link to="/analyzer" className="text-primary hover:text-primary/80 transition-colors">Analyzer</Link>
              <Link to="/loan-types" className="text-muted-foreground hover:text-white transition-colors">Loan Types</Link>
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

export default Reports;
