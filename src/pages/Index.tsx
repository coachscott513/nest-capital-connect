import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const markets = [
  "Albany", "Niskayuna", "Troy", "Schenectady", 
  "Saratoga", "Latham", "Clifton Park", "Rensselaer"
];

const menuItems = [
  { label: "Invest", href: "/investment-landing" },
  { label: "Markets", href: "/markets" },
  { label: "Rentals", href: "/rentals" },
  { label: "Calculators", href: "/investor-tools" },
  { label: "Financing", href: "/first-time-homebuyers" },
  { label: "Analytics", href: "/delmar-market-insights" },
  { label: "Social", href: "/blog" },
  { label: "Learn", href: "/communities" },
  { label: "Support", href: "/contact" },
];

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Capital District Nest | The Modern Real Estate Company"
        description="Real answers, right now. Get instant access to live, licensed agents who know the Capital District neighborhoods, schools, and market reality."
        keywords="real estate Albany NY, Capital District homes, Niskayuna real estate, Troy homes for sale, licensed real estate agent"
        canonical="https://capitaldistrictnest.com"
        ogImage="/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png"
      />

      {/* Navigation */}
      <header className="sticky top-0 z-[1000] flex items-center justify-between px-5 md:px-10 h-20 bg-background border-b border-border">
        {/* Mobile Menu Trigger */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 -ml-2 text-foreground hover:text-primary transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-background border-r border-border p-0">
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-5 border-b border-border">
                <Link to="/" className="font-extrabold text-2xl tracking-tight" onClick={() => setSidebarOpen(false)}>
                  CD<span className="text-primary">N</span>
                </Link>
              </div>
              
              {/* Sidebar Menu */}
              <nav className="flex-1 py-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center px-6 py-4 text-foreground font-bold text-lg hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/50"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              {/* Sidebar Footer */}
              <div className="p-5 border-t border-border space-y-3">
                <Link
                  to="/auth"
                  onClick={() => setSidebarOpen(false)}
                  className="block w-full text-center py-3 text-foreground font-bold hover:text-primary transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/first-time-homebuyers"
                  onClick={() => setSidebarOpen(false)}
                  className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-full font-extrabold hover:scale-105 transition-transform"
                >
                  Start Chat
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link to="/" className="font-extrabold text-2xl tracking-tight md:mr-10 whitespace-nowrap">
          CD<span className="text-primary">N</span>
        </Link>

        <ul className="hidden md:flex gap-7 list-none m-0 p-0 overflow-x-auto scrollbar-hide">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className="text-foreground font-bold text-[0.95rem] hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-5 ml-10">
          <Link to="/auth" className="text-foreground font-bold text-[0.95rem] hover:text-primary transition-colors">
            Log In
          </Link>
          <Link
            to="/first-time-homebuyers"
            className="bg-foreground text-background px-6 py-2.5 rounded-3xl font-extrabold text-[0.95rem] whitespace-nowrap hover:scale-105 transition-transform"
          >
            Start Chat
          </Link>
        </div>

        {/* Mobile: Show CTA */}
        <Link
          to="/first-time-homebuyers"
          className="md:hidden bg-foreground text-background px-5 py-2 rounded-3xl font-bold text-sm"
        >
          Start Chat
        </Link>
      </header>

      {/* Section 1: Live Agent */}
      <section className="flex flex-col lg:flex-row items-center gap-20 px-[5%] py-20 min-h-[90vh] border-b border-border justify-center">
        <div className="flex-1 max-w-[600px]">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-3 py-1.5 rounded-full text-xs font-bold uppercase mb-5">
            <div className="w-2 h-2 bg-primary rounded-full" />
            Live Agent Active
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6">
            Real answers.<br />Right <span className="text-primary">now.</span>
          </h2>
          <p className="text-xl text-muted-foreground font-light leading-relaxed mb-8">
            Buyers and sellers ask us daily: "Can I see this specific house?" "What are the schools like in Niskayuna?"
            <br /><br />
            Stop talking to bots. Get instant access to a <strong className="text-foreground">live, licensed agent</strong> who knows the neighborhood, the schools, and the market reality.
          </p>
          <Link to="/contact" className="inline-block border-2 border-foreground text-foreground px-9 py-4 rounded-[30px] font-bold hover:bg-foreground hover:text-background transition-colors">
            Ask a Question
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-card border border-border rounded-3xl p-8 w-full max-w-[450px] shadow-[0_20px_50px_rgba(0,200,5,0.1)]">
            <div className="text-center text-muted-foreground text-xs mb-4">Today, 2:14 PM</div>
            <div className="bg-muted p-4 rounded-2xl mb-4 text-sm max-w-[80%]">
              Hi, I'm looking at the multi-unit on Union St. What's the school district?
            </div>
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl mb-4 text-sm max-w-[80%] ml-auto">
              That's Schenectady Schools, but it borders Niskayuna. I have the tax map open, want me to send it?
            </div>
            <div className="bg-muted p-4 rounded-2xl mb-4 text-sm max-w-[80%]">
              Yes please! Also, what are the taxes?
            </div>
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl text-sm max-w-[80%] ml-auto">
              Checking now... Total is $6,400/yr.
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Graduate-Level Analysis (Reversed) */}
      <section className="flex flex-col lg:flex-row-reverse items-center gap-20 px-[5%] py-20 min-h-[90vh] border-b border-border justify-center">
        <div className="flex-1 max-w-[600px]">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6">
            Graduate-level<br />analysis.
          </h2>
          <p className="text-xl text-muted-foreground font-light leading-relaxed mb-8">
            Investing isn't a guessing game. Our agents hold Bachelor's and Graduate degrees in Economics and Business.
            <br /><br />
            We don't just open the door; we run the <strong className="text-foreground">Rent Rolls</strong>, calculate the <strong className="text-foreground">ROI</strong>, and build the spreadsheets for you.
          </p>
          <Link to="/investor-tools" className="inline-block border-2 border-foreground text-foreground px-9 py-4 rounded-[30px] font-bold hover:bg-foreground hover:text-background transition-colors">
            View Investor Tools
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-[500px]">
            <div className="text-xl font-extrabold mb-5">Troy Triplex Analysis</div>
            <div className="flex justify-between py-4 border-b border-border">
              <span>Monthly Rent Roll</span>
              <span className="font-bold text-primary">$4,250</span>
            </div>
            <div className="flex justify-between py-4 border-b border-border">
              <span>Operating Expenses</span>
              <span className="font-bold text-red-500">-$1,100</span>
            </div>
            <div className="flex justify-between py-4 border-b border-border">
              <span>Est. Mortgage (7%)</span>
              <span className="font-bold text-red-500">-$2,100</span>
            </div>
            <div className="flex justify-between pt-5">
              <span className="text-xl">Net Cash Flow</span>
              <span className="font-bold text-primary text-2xl">+$1,050/mo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Buying Power */}
      <section className="flex flex-col lg:flex-row items-center gap-20 px-[5%] py-20 min-h-[90vh] border-b border-border justify-center">
        <div className="flex-1 max-w-[600px]">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6">
            Know your<br />buying power.
          </h2>
          <p className="text-xl text-muted-foreground font-light leading-relaxed mb-8">
            "What will it cost per month?" "Can I get seller concessions?"
            <br /><br />
            We specialize in creative financing. From <strong className="text-foreground">FHA 3.5% Down</strong> programs to negotiating a <strong className="text-foreground">6% Sellers Concession</strong> to cover your closing costs. We make the math work.
          </p>
          <div className="flex gap-3 flex-wrap">
            <span className="bg-muted px-4 py-2 rounded-full text-sm">FHA Loans</span>
            <span className="bg-muted px-4 py-2 rounded-full text-sm">Grants</span>
            <span className="bg-muted px-4 py-2 rounded-full text-sm">VA Loans</span>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-card border border-border rounded-xl p-8 w-full max-w-[400px] text-center">
            <div className="text-muted-foreground text-sm mb-3">PURCHASE POWER</div>
            <div className="text-6xl md:text-7xl font-extrabold text-foreground leading-none">$30k</div>
            <div className="text-primary font-bold mt-3">Grant Money Available</div>
            <p className="text-muted-foreground text-sm mt-4">We help you apply for local down-payment assistance.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Freedom (Reversed) */}
      <section className="flex flex-col lg:flex-row-reverse items-center gap-20 px-[5%] py-20 min-h-[90vh] border-b border-border justify-center">
        <div className="flex-1 max-w-[600px]">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6">
            Your Freedom.<br />Our Expertise.
          </h2>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            Worried about being "locked in" with an agent? Confused by Buyer Agreements?
            <br /><br />
            We offer transparent, flexible representation. Whether you speak English, Spanish, or Italian, our <strong className="text-foreground">multilingual team</strong> ensures you understand every contract, every fee, and every option.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-[8rem]">🤝</div>
        </div>
      </section>

      {/* Markets Grid */}
      <section className="px-[5%] py-20 border-b border-border">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-10 text-center">
          We cover the<br />entire Capital District.
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {markets.map((market) => (
            <div
              key={market}
              className="border border-border px-4 py-4 text-center rounded-lg cursor-pointer font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              {market}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-[5%] py-12 text-center text-muted-foreground text-sm">
        <p>© 2025 Capital District Nest. Licensed Real Estate Broker.</p>
        <p className="mt-2">Providing VIP Service, Technology, and Professional Guidance.</p>
      </footer>
    </div>
  );
};

export default Index;
