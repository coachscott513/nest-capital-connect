import { useState } from "react";
import { Helmet } from "react-helmet";
import { Search, ArrowRight, Building, TrendingUp, Calculator, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/MainLayout";
import MasterGatekeeperModal from "@/components/MasterGatekeeperModal";
import { useNavigate } from "react-router-dom";

const InvestorsHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gatekeeperOpen, setGatekeeperOpen] = useState(false);
  const [pendingRedirectUrl, setPendingRedirectUrl] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const redirectUrl = `/intelligence?address=${encodeURIComponent(searchQuery.trim())}&type=rental-investors`;
      setPendingRedirectUrl(redirectUrl);
      setGatekeeperOpen(true);
    }
  };

  const assistanceCards = [
    {
      icon: Calculator,
      title: "Cash Flow Calculator",
      description: "Analyze cap rates and NOI for any multi-unit property",
      action: () => navigate("/investor/analyze-multifamily"),
      color: "from-emerald-500/20 to-emerald-600/10"
    },
    {
      icon: TrendingUp,
      title: "Market Intel Reports",
      description: "Access deep-dive analysis on high-yield neighborhoods",
      action: () => navigate("/investor/best-neighborhoods-cash-flow-capital-district"),
      color: "from-cyan-500/20 to-cyan-600/10"
    },
    {
      icon: Phone,
      title: "Speak with an Analyst",
      description: "Get personalized DSCR loan guidance and deal analysis",
      action: () => navigate("/ask"),
      color: "from-amber-500/20 to-amber-600/10"
    }
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>Investor Intelligence | Capital District Nest</title>
        <meta name="description" content="Multi-unit investment analysis for the Capital District. Cash flow reports, cap rate data, and DSCR loan guidance for Albany, Troy, and Schenectady." />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-emerald-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_50%)]" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Building className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium">Investor Intelligence</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Build Your
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Portfolio</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Cash-flow focused analysis for 2-4 unit properties in the Capital District
            </p>
          </div>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="glass-strong rounded-2xl p-2.5 max-w-3xl mx-auto mb-20 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-4 px-6">
                <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter a multi-unit address to analyze..."
                  className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/60 text-lg py-4 font-light tracking-wide"
                />
              </div>
              <Button 
                type="submit"
                size="lg" 
                className="h-14 px-8 rounded-xl font-semibold shrink-0 bg-emerald-600 hover:bg-emerald-700"
              >
                Analyze
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>

          {/* Assistance Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {assistanceCards.map((card, index) => (
              <button
                key={index}
                onClick={card.action}
                className={`glass-strong rounded-2xl p-8 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group bg-gradient-to-br ${card.color}`}
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <card.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-muted-foreground font-light">{card.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <MasterGatekeeperModal
        isOpen={gatekeeperOpen}
        onClose={() => setGatekeeperOpen(false)}
        redirectUrl={pendingRedirectUrl}
        searchQuery={searchQuery}
      />
    </MainLayout>
  );
};

export default InvestorsHub;
