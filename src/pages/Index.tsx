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

const menuItems = [
  { label: "Invest", href: "/investment-landing" },
  { label: "Markets", href: "/markets" },
  { label: "Rentals", href: "/rentals" },
  { label: "Calculators", href: "/investor-tools" },
  { label: "Financing", href: "/first-time-homebuyers" },
  { label: "VIP List", href: "/grants" },
  { label: "Support", href: "/communities" },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (id: string) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);

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
          className={`font-bold cursor-pointer border px-5 py-2 rounded-full transition-all ${
            menuOpen 
              ? 'border-primary text-primary' 
              : 'border-foreground hover:bg-foreground hover:text-background'
          }`}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {/* Full Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-background z-[1500] pt-24 px-[5%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex flex-col gap-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl md:text-4xl font-bold hover:text-primary hover:pl-3 transition-all py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mission Section */}
      <section className="text-center px-[5%] py-28 lg:py-36 border-b border-border/50 bg-[radial-gradient(circle_at_center,hsl(var(--card))_0%,hsl(var(--background))_70%)]">
        <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight leading-[1.05] mb-6">
          Wall Street Tools.<br />
          <span className="text-primary">For Your First Asset.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
          You don't need to be a hedge fund to invest like one. 
          Whether you are buying your <strong className="text-foreground">first home</strong>, <strong className="text-foreground">raw land</strong>, or a <strong className="text-foreground">multi-unit rental</strong>, 
          we provide the strategy, the math, and the grants to make it happen.
        </p>

        {/* Trust Badges */}
        <div className="flex justify-center gap-4 flex-wrap mb-10">
          <div className="flex items-center gap-2 bg-card border border-[#004ecc] text-foreground px-5 py-2 rounded-full text-sm font-bold">
            <div className="w-2 h-2 bg-[#dc1c2e] rounded-full" />
            Powered by RE/MAX
          </div>
          <div className="flex items-center gap-2 bg-card border border-border text-muted-foreground px-5 py-2 rounded-full text-sm font-bold">
            <div className="w-2 h-2 bg-foreground rounded-full" />
            Econ & Business Degrees
          </div>
          <div className="flex items-center gap-2 bg-card border border-border text-muted-foreground px-5 py-2 rounded-full text-sm font-bold">
            <div className="w-2 h-2 bg-foreground rounded-full" />
            Local Experts
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

      {/* Choose Your Path - Card Grid */}
      <section className="px-[5%] py-20 lg:py-24 border-b border-border/50">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-4">
            Choose your <span className="text-primary">Path.</span>
          </h2>
          <p className="text-lg text-muted-foreground">Start where you are. We'll get you to the closing table.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Free Funding Card */}
          <div 
            onClick={() => openModal('grant')}
            className="bg-card p-10 rounded-2xl border border-border cursor-pointer hover:-translate-y-1 hover:border-primary transition-all relative"
          >
            <div className="text-4xl mb-5">💸</div>
            <h3 className="text-2xl font-medium mb-3">Free Funding</h3>
            <p className="text-muted-foreground mb-8">
              Buying your first rental? Don't use all your own cash. Download the <strong className="text-foreground">2025 Down-Payment Assistance PDF</strong> ($30k available).
            </p>
            <div className="text-primary font-bold">Get Grant PDF →</div>
          </div>

          {/* Get Financed Card */}
          <div 
            onClick={() => openModal('analysis')}
            className="bg-card p-10 rounded-2xl border border-border cursor-pointer hover:-translate-y-1 hover:border-primary transition-all relative"
          >
            <div className="text-4xl mb-5">🏦</div>
            <h3 className="text-2xl font-medium mb-3">Get Financed</h3>
            <p className="text-muted-foreground mb-8">
              No pre-approval? No problem. We connect you with lenders who specialize in <strong className="text-foreground">FHA (3.5% down)</strong> and <strong className="text-foreground">Renovation Loans</strong>.
            </p>
            <div className="text-primary font-bold">See Loan Options →</div>
          </div>

          {/* Deal Access Card */}
          <div 
            onClick={() => openModal('vip')}
            className="bg-card p-10 rounded-2xl border border-border cursor-pointer hover:-translate-y-1 hover:border-primary transition-all relative"
          >
            <div className="text-4xl mb-5">🔐</div>
            <h3 className="text-2xl font-medium mb-3">Deal Access</h3>
            <p className="text-muted-foreground mb-8">
              From your first duplex to a 10-unit portfolio. Get the list of <strong className="text-foreground">High Cash Flow</strong> properties before they hit Zillow.
            </p>
            <div className="text-primary font-bold">View Inventory →</div>
          </div>
        </div>
      </section>

      {/* Street-Level Economics Hero */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-16 px-[5%] py-24 lg:py-32 border-b border-border/50">
        <div className="flex-1 max-w-xl">
          <span className="text-gold font-extrabold uppercase tracking-widest text-sm mb-4 block">Street-Level Economics</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] mb-6">
            Not Agents.<br />Portfolio Managers.
          </h2>
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 max-w-lg">
            A standard agent opens the door. We analyze the asset. 
            Whether it's raw land in Niskayuna or a 3-family in Troy, we apply institutional-grade data to every transaction.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-8">
            <div className="border border-border px-4 py-2 rounded-full text-sm">🏠 Residential</div>
            <div className="border border-border px-4 py-2 rounded-full text-sm">🏙️ Multi-Unit</div>
            <div className="border border-border px-4 py-2 rounded-full text-sm">🌳 Land Development</div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-sm h-[500px] bg-card rounded-[40px] border-4 border-border overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Analytics Dashboard" 
              className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Boots on the Ground Hero (Reversed) */}
      <section className="flex flex-col lg:flex-row-reverse items-center justify-between gap-16 px-[5%] py-24 lg:py-32 border-b border-border/50">
        <div className="flex-1 max-w-xl">
          <span className="text-gold font-extrabold uppercase tracking-widest text-sm mb-4 block">Boots on the Ground</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
            Local eyes.<br />Asset protection.
          </h2>
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 max-w-lg">
            We don't disappear at closing. 
            <strong> Nest Stewardship</strong> handles the headaches for our VIP clients. 
            We triage tenant calls, coordinate repairs, and handle inspections so your passive income stays passive.
          </p>
          <button 
            onClick={() => openModal('vip')}
            className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform cursor-pointer"
          >
            Join VIP List
          </button>
          <p className="text-xs text-muted-foreground mt-6 max-w-md leading-relaxed">
            *Available for clients in Albany, Troy, Schenectady.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-sm h-[500px] bg-card rounded-[40px] border-4 border-border overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <img 
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Property keys handover" 
              className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Buyer Feed Section */}
      <section className="px-[5%] py-24 lg:py-28 border-b border-border/50 text-center">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-5">
          We have the <span className="text-primary">Demand.</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          We match properties with buyers instantly. From first-time house hackers to commercial developers.
        </p>

        <div className="bg-card border border-border rounded-2xl max-w-3xl mx-auto overflow-hidden text-left">
          <div className="bg-muted px-5 py-4 font-bold border-b border-border flex justify-between items-center">
            <span>🎯 LIVE BUYER FEED</span>
            <span className="text-primary text-sm">● ACTIVE</span>
          </div>
          <div>
            <div className="flex justify-between items-center px-5 py-5 border-b border-border/50">
              <div>
                <div className="font-bold">First-Time Investor</div>
                <div className="text-sm text-muted-foreground">Looking in: <span className="text-foreground/80">Troy / Lansingburgh</span></div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">$180k FHA</div>
              </div>
            </div>
            <div className="flex justify-between items-center px-5 py-5">
              <div>
                <div className="font-bold">Cash Buyer (NYC)</div>
                <div className="text-sm text-muted-foreground">Looking in: <span className="text-foreground/80">Albany Center Sq</span></div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">$450k Cash</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button 
            onClick={() => openModal('analysis')}
            className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform cursor-pointer"
          >
            Get Cash Offer Analysis
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-[5%] lg:px-[15%] py-24 lg:py-32">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-16">
          You've got questions.<br />We got answers.
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
          <p className="mb-4">
            Capital District Nest LLC is a specialized real estate team. 
            Powered by RE/MAX. Each office independently owned and operated.
            Licensed in New York and Massachusetts.
          </p>
          <p>*Nest Stewardship is a client service tier and not an insurance product.</p>
        </div>
      </footer>

      {/* MODALS */}
      {/* Grant Modal */}
      {activeModal === 'grant' && (
        <div 
          className="fixed inset-0 bg-background/85 backdrop-blur-sm z-[3000] flex items-center justify-center animate-in fade-in duration-200"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-card border border-border p-10 rounded-2xl max-w-md w-[90%] relative text-center shadow-2xl">
            <button onClick={closeModal} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl">×</button>
            <div className="text-5xl mb-4">💸</div>
            <h3 className="text-2xl font-medium mb-3">Claim Grant PDF</h3>
            <p className="text-muted-foreground mb-6">Enter details to receive the 2025 Application.</p>
            <form onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                className="w-full bg-background border border-border px-4 py-4 rounded-lg text-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="w-full bg-foreground text-background px-6 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
                Send PDF
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIP Modal */}
      {activeModal === 'vip' && (
        <div 
          className="fixed inset-0 bg-background/85 backdrop-blur-sm z-[3000] flex items-center justify-center animate-in fade-in duration-200"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-card border border-border p-10 rounded-2xl max-w-md w-[90%] relative text-center shadow-2xl">
            <button onClick={closeModal} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl">×</button>
            <div className="text-5xl mb-4">🔐</div>
            <h3 className="text-2xl font-medium mb-3">Join VIP List</h3>
            <p className="text-muted-foreground mb-6">Get "Coming Soon" inventory 48 hours early.</p>
            <form onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                className="w-full bg-background border border-border px-4 py-4 rounded-lg text-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="w-full bg-foreground text-background px-6 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
                Join List
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Analysis Modal */}
      {activeModal === 'analysis' && (
        <div 
          className="fixed inset-0 bg-background/85 backdrop-blur-sm z-[3000] flex items-center justify-center animate-in fade-in duration-200"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-card border border-border p-10 rounded-2xl max-w-md w-[90%] relative text-center shadow-2xl">
            <button onClick={closeModal} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl">×</button>
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-medium mb-3">Deal Analysis</h3>
            <p className="text-muted-foreground mb-6">Paste a Zillow link. We'll run the numbers.</p>
            <form onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
              <input 
                type="text" 
                placeholder="Property Address/URL"
                className="w-full bg-background border border-border px-4 py-4 rounded-lg text-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input 
                type="email" 
                placeholder="Email" 
                required
                className="w-full bg-background border border-border px-4 py-4 rounded-lg text-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="w-full bg-foreground text-background px-6 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
                Analyze
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
