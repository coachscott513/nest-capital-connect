import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import CommandCenter from "@/components/CommandCenter";

const faqItems = [
  {
    question: "What financing programs are available?",
    answer: "We specialize in FHA (3.5% down), VA Loans (0% down), and Commercial DSCR loans for investors. We also help you apply for the $30k Albany/Troy Homebuyer Grants."
  },
  {
    question: "Do I have to sign a Buyer's Agreement?",
    answer: "We believe in flexible, transparent representation. We will explain the NYS Agency Disclosure form so you understand your rights. You are never \"locked in\" without understanding the terms."
  },
  {
    question: "How do you calculate ROI on multi-units?",
    answer: "We don't just use listing prices. We request the actual Schedule E tax returns and current leases (Rent Roll). We plug this into our proprietary spreadsheet to show you the true Cap Rate and Cash-on-Cash return."
  },
  {
    question: "Can you help me if I live out of state?",
    answer: "Yes. 40% of our clients are in NYC, Boston, or remote. We provide video tours, handle inspections, and offer our Stewardship program to manage the asset after closing."
  },
  {
    question: "What does a Seller Concession cover?",
    answer: "A Seller Concession allows you to roll your closing costs (taxes, attorney fees, bank fees) into the mortgage. We can often negotiate up to 6% of the purchase price back to you, significantly lowering your cash-to-close."
  }
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Capital District Nest | Team at RE/MAX"
        description="Supercharge your investment with Wall Street tools and Main Street service. Grants, financing, and expert analysis for Capital District real estate."
        keywords="real estate Albany NY, Capital District homes, investment property, Troy homes for sale, down payment assistance"
        canonical="https://capitaldistrictnest.com"
        ogImage="/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png"
      />

      {/* Navigation Header */}
      <header className="sticky top-0 z-[2000] flex items-center justify-between px-5 md:px-10 h-20 bg-background/90 backdrop-blur-md border-b border-border">
        <Link to="/" className="font-extrabold text-lg md:text-xl tracking-tight uppercase">
          Capital District <span className="text-primary">Nest</span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="font-bold cursor-pointer hover:text-gold transition-colors"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {/* Simple Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-background z-[1500] pt-24 px-10">
          <nav className="flex flex-col gap-4">
            {[
              { label: "Invest", href: "/investment-landing" },
              { label: "Markets", href: "/markets" },
              { label: "Rentals", href: "/rentals" },
              { label: "Calculators", href: "/investor-tools" },
              { label: "Financing", href: "/first-time-homebuyers" },
              { label: "VIP List", href: "/auth" },
              { label: "Support", href: "/first-time-homebuyers" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-bold hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Hero 1: Grants */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-16 px-[5%] py-24 lg:py-32 border-b border-border/50">
        <div className="flex-1 max-w-xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05] mb-6">
            Start with <span className="text-gold">more.</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 max-w-lg">
            Supercharge your purchase with a <strong>$30,000 instant grant boost</strong>. 
            First-time buyers in Albany & Troy can apply for down-payment assistance immediately.
          </p>
          <Link to="/grants" className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
            Get Grant PDF
          </Link>
          <p className="text-xs text-muted-foreground mt-6 max-w-md leading-relaxed">
            *Grant eligibility based on income and location. $30,000 max award for 2025. 
            Capital District Nest helps facilitate applications but is not the lending authority.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-sm h-[500px] bg-card rounded-[40px] border-4 border-border overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <img 
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Grant Application" 
              className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Hero 2: Strategies (Reversed) */}
      <section className="flex flex-col lg:flex-row-reverse items-center justify-between gap-16 px-[5%] py-24 lg:py-32 border-b border-border/50">
        <div className="flex-1 max-w-xl">
          <span className="text-gold font-extrabold uppercase tracking-widest text-sm mb-4 block">Nest Strategies</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
            Your portfolio, handled by Strategists.
          </h2>
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 max-w-lg">
            Define your goals and get an expert-managed plan. 
            From identifying <strong>Hidden Value</strong> assets to running the Rent Rolls, 
            we handle the math so you don't have to guess.
          </p>
          <Link to="/investor-tools" className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
            Start Analysis
          </Link>
          <p className="text-xs text-muted-foreground mt-6 max-w-md leading-relaxed">
            *Analysis provided by licensed real estate professionals with degrees in Economics. 
            Past performance of a market does not guarantee future results.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-sm h-[500px] bg-card rounded-[40px] border-4 border-border overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <img 
              src="https://images.unsplash.com/photo-1611974765270-ca1258634369?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="ROI Graph" 
              className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Hero 3: Financing */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-16 px-[5%] py-24 lg:py-32 border-b border-border/50">
        <div className="flex-1 max-w-xl">
          <span className="text-gold font-extrabold uppercase tracking-widest text-sm mb-4 block">Financing Options</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
            Invest with<br />Creative Financing.
          </h2>
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 max-w-lg">
            Qualified buyers can acquire multi-units with as little as <strong>3.5% Down</strong> using FHA loans. 
            We negotiate 6% Seller Concessions to cover your closing costs.
          </p>
          <Link to="/first-time-homebuyers" className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
            See Loan Options
          </Link>
          <p className="text-xs text-muted-foreground mt-6 max-w-md leading-relaxed">
            *FHA loans subject to lender approval. Seller concessions negotiated on a per-deal basis. 
            We connect you with preferred lenders.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-sm h-[500px] bg-card rounded-[40px] border-4 border-border overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <img 
              src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Calculator" 
              className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Hero 4: Stewardship (Reversed) */}
      <section className="flex flex-col lg:flex-row-reverse items-center justify-between gap-16 px-[5%] py-24 lg:py-32 border-b border-border/50">
        <div className="flex-1 max-w-xl">
          <span className="text-gold font-extrabold uppercase tracking-widest text-sm mb-4 block">Nest Stewardship</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
            Local eyes.<br />Asset protection.
          </h2>
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 max-w-lg">
            We don't disappear at closing. 
            <strong> Nest Gold Members</strong> get complimentary boots-on-the-ground support. 
            We triage tenant calls, coordinate repairs, and protect your asset.
          </p>
          <Link to="/auth" className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
            Join VIP List
          </Link>
          <p className="text-xs text-muted-foreground mt-6 max-w-md leading-relaxed">
            *Stewardship service available for VIP clients in Albany, Schenectady, and Troy. 
            Not a property management contract. Terms apply.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-sm h-[500px] bg-card rounded-[40px] border-4 border-border overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <img 
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Keys" 
              className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-[5%] lg:px-[20%] py-24 lg:py-32">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-16">
          You've got questions.<br />We got answers.
        </h2>

        <div className="divide-y divide-border">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="py-6 cursor-pointer"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <div className="flex justify-between items-center text-xl md:text-2xl font-medium">
                {item.question}
                <span className={`transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </div>
              {openFaq === index && (
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Command Center FAB */}
      <CommandCenter />

      {/* Footer */}
      <footer className="px-[5%] py-12 border-t border-border text-sm text-muted-foreground">
        <div className="max-w-3xl">
          <div className="font-bold text-foreground mb-4">Capital District Nest Team at RE/MAX</div>
          <p className="mb-4">
            Capital District Nest LLC is a specialized real estate team. 
            Powered by RE/MAX. Each office independently owned and operated.
            Licensed in New York and Massachusetts.
          </p>
          <p>
            *The "Nest Gold" and "Stewardship" programs are exclusive service tiers offered by the team and are not insurance products.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
