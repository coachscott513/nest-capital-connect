import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import CommandCenter from "@/components/CommandCenter";

const faqItems = [
  {
    question: "I'm currently renting. Can I really buy?",
    answer: "Yes. If you have a credit score over 620 and a steady job, you likely qualify. With the $30k Grant programs in Albany and Troy, your out-of-pocket cost could be very low."
  },
  {
    question: "Do you sell single-family homes?",
    answer: "Absolutely. While we love investments, we help hundreds of people find their \"Forever Home\" in Niskayuna, Latham, and Clifton Park every year."
  },
  {
    question: "I want to buy land. How does that work?",
    answer: "Land loans are different than home mortgages. We will connect you with a \"Land Loan\" specialist and help you check the zoning to make sure you can actually build what you want."
  },
  {
    question: "Do I have to pay you?",
    answer: "In most cases, the Seller pays the commission. Our representation, advice, and grant assistance are usually free to the buyer."
  }
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Capital District Nest | Your First Asset"
        description="You don't need to be a hedge fund to invest like one. First homes, raw land, and multi-unit rentals. We provide the strategy, math, and grants to make it happen."
        keywords="first time home buyer Albany NY, land for sale Capital District, house hack Troy, down payment assistance, FHA loans"
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
          className="font-bold cursor-pointer border border-foreground px-5 py-2 rounded-full hover:bg-foreground hover:text-background transition-all"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {/* Simple Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-background z-[1500] pt-24 px-10">
          <nav className="flex flex-col gap-4">
            {[
              { label: "First-Time Buyers", href: "/first-time-homebuyers" },
              { label: "Land & Lots", href: "/albany-land" },
              { label: "Investors", href: "/investment-landing" },
              { label: "Rentals", href: "/rentals" },
              { label: "Markets", href: "/markets" },
              { label: "Grants", href: "/grants" },
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

      {/* Mission Section - Democratized Wealth */}
      <section className="text-center px-[5%] py-28 lg:py-36 border-b border-border/50 bg-[radial-gradient(circle_at_center,#111_0%,#000_70%)]">
        <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight leading-[1.05] mb-6">
          Wall Street Tools.<br />
          <span className="text-primary">For Your First Asset.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
          You don't need to be a hedge fund to invest like one. 
          Whether you are buying your <strong className="text-foreground">first home</strong>, <strong className="text-foreground">raw land</strong>, or a <strong className="text-foreground">multi-unit rental</strong>, 
          we provide the strategy, the math, and the grants to make it happen.
        </p>

        <div className="flex justify-center gap-4 flex-wrap mb-10">
          <div className="flex items-center gap-2 bg-card border border-border text-muted-foreground px-5 py-2 rounded-full text-sm font-bold">
            First-Time Buyers
          </div>
          <div className="flex items-center gap-2 bg-card border border-border text-muted-foreground px-5 py-2 rounded-full text-sm font-bold">
            Land & New Build
          </div>
          <div className="flex items-center gap-2 bg-card border border-border text-muted-foreground px-5 py-2 rounded-full text-sm font-bold">
            Investors
          </div>
        </div>

        <button 
          onClick={() => {
            const fabContainer = document.getElementById('command-center-fab');
            if (fabContainer) fabContainer.click();
          }}
          className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform cursor-pointer"
        >
          Chat with the Team
        </button>
      </section>

      {/* Hero 1: Stop Renting - House Hacking */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-16 px-[5%] py-24 lg:py-32 border-b border-border/50">
        <div className="flex-1 max-w-xl">
          <span className="text-gold font-extrabold uppercase tracking-widest text-sm mb-4 block">Stop Renting. Start Owning.</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] mb-6">
            Your rent is paying someone else's mortgage.
          </h2>
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 max-w-lg">
            Flip the script. Buy a 2-family home. Live in one unit, rent the other, and live for free. 
            We specialize in helping <strong>Renters become Owners</strong> using $30k Grants.
          </p>
          <Link to="/grants" className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
            Get the "House Hack" Guide
          </Link>
          <p className="text-xs text-muted-foreground mt-6 max-w-md leading-relaxed">
            *First-time buyer grants available in Albany & Troy. Income limits apply.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-sm h-[500px] bg-card rounded-[40px] border-4 border-border overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Keys to your first home" 
              className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Hero 2: Land - Build Your Future (Reversed) */}
      <section className="flex flex-col lg:flex-row-reverse items-center justify-between gap-16 px-[5%] py-24 lg:py-32 border-b border-border/50">
        <div className="flex-1 max-w-xl">
          <span className="text-gold font-extrabold uppercase tracking-widest text-sm mb-4 block">Build Your Future</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
            Land. The ultimate limited resource.
          </h2>
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 max-w-lg">
            Looking for acreage in Niskayuna or a buildable lot in Saratoga? 
            Land buying requires different expertise: Perc tests, zoning, and surveys. 
            We help you find the dirt to build your dream.
          </p>
          <Link to="/albany-land" className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
            View Land Listings
          </Link>
          <p className="text-xs text-muted-foreground mt-6 max-w-md leading-relaxed">
            *We assist with land acquisition and builder connections.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-sm h-[500px] bg-card rounded-[40px] border-4 border-border overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Land for sale" 
              className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Hero 3: Financing - Even if you're new */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-16 px-[5%] py-24 lg:py-32 border-b border-border/50">
        <div className="flex-1 max-w-xl">
          <span className="text-gold font-extrabold uppercase tracking-widest text-sm mb-4 block">No Approval? No Problem.</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
            Get Financed.<br />Even if you're new.
          </h2>
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 max-w-lg">
            Don't let the banks scare you. 
            We work with lenders who specialize in <strong>First-Time Buyers</strong> (3.5% Down) and <strong>Renovation Loans</strong> (fixing up an old house).
          </p>
          <Link to="/first-time-homebuyers" className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
            See Loan Options
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-sm h-[500px] bg-card rounded-[40px] border-4 border-border overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <img 
              src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Financing options" 
              className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-[5%] lg:px-[15%] py-24 lg:py-32">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-16">
          New to this?<br />We've got you.
        </h2>

        <div className="divide-y divide-border">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="py-8 cursor-pointer"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <div className="flex justify-between items-center text-xl md:text-2xl font-medium">
                {item.question}
                <span className={`transition-transform duration-300 text-sm ${openFaq === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </div>
              {openFaq === index && (
                <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
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
          <p>
            Capital District Nest LLC is a specialized real estate team. 
            Powered by RE/MAX. Each office independently owned and operated.
            Licensed in New York and Massachusetts.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
