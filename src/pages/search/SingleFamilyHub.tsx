import { useState } from "react";
import { Helmet } from "react-helmet";
import { Search, ArrowRight, Home, MapPin, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/MainLayout";
import MasterGatekeeperModal from "@/components/MasterGatekeeperModal";
import AnalystCard from "@/components/AnalystCard";
import { useNavigate } from "react-router-dom";

const SingleFamilyHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gatekeeperOpen, setGatekeeperOpen] = useState(false);
  const [pendingRedirectUrl, setPendingRedirectUrl] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const redirectUrl = `/intelligence?address=${encodeURIComponent(searchQuery.trim())}&type=single-family`;
      setPendingRedirectUrl(redirectUrl);
      setGatekeeperOpen(true);
    }
  };

  const assistanceCards = [
    {
      icon: Calculator,
      title: "Get Pre-Approved",
      description: "Connect with our vetted mortgage lenders for competitive rates",
      action: () => navigate("/financing"),
      color: "from-emerald-500/20 to-emerald-600/10",
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10"
    },
    {
      icon: MapPin,
      title: "Explore Towns",
      description: "Discover the best neighborhoods in the Capital District",
      action: () => navigate("/communities"),
      color: "from-cyan-500/20 to-cyan-600/10",
      iconColor: "text-primary",
      iconBg: "bg-primary/10"
    }
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>Single Family Homes | Capital District Nest</title>
        <meta name="description" content="Find your perfect single family home in the Capital District. Expert analysis and market intelligence for Albany, Troy, Schenectady, and Saratoga." />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.08),transparent_50%)]" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Home className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Single Family Intelligence</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Find Your
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent"> Perfect Home</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Deep market intelligence for families relocating to the Capital District
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
                  placeholder="Enter an address to analyze..."
                  className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/60 text-lg py-4 font-light tracking-wide"
                />
              </div>
              <Button 
                type="submit"
                size="lg" 
                className="h-14 px-8 rounded-xl font-semibold shrink-0 glow-primary"
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
                <div className={`w-14 h-14 rounded-xl ${card.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <card.icon className={`w-7 h-7 ${card.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-muted-foreground font-light">{card.description}</p>
              </button>
            ))}
            
            {/* Analyst Card with Drop-down */}
            <AnalystCard 
              title="Speak with an Analyst"
              description="Get personalized guidance from our local experts"
              accentColor="amber"
            />
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

export default SingleFamilyHub;
