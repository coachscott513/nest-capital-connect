import { useState } from "react";
import { Home, TrendingUp, Search, MessageSquare, ArrowRight, Building2, DollarSign, MapPin, RefreshCw, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type UserPath = "buyer" | "investor" | "exploring" | "talk" | null;

interface StartHereDeckProps {
  onBuyerPathSelected: () => void;
  onInvestorPathSelected: () => void;
}

const StartHereDeck = ({ onBuyerPathSelected, onInvestorPathSelected }: StartHereDeckProps) => {
  const [selectedPath, setSelectedPath] = useState<UserPath>(null);

  const handlePathSelect = (path: UserPath) => {
    setSelectedPath(path);
    if (path === "buyer") {
      onBuyerPathSelected();
    } else if (path === "investor") {
      onInvestorPathSelected();
    }
  };

  const resetSelection = () => {
    setSelectedPath(null);
  };

  // Path-specific content reveals
  const pathContent = {
    buyer: {
      title: "Home Buyer Resources",
      items: [
        { label: "Zero & Low Down Payment Programs", href: "/grants", icon: DollarSign },
        { label: "First-Time Buyer Guide", href: "/buyer-journey/first-time-buyer", icon: Home },
        { label: "Neighborhood Guides", href: "/communities", icon: MapPin },
        { label: "Market Trends", href: "/markets", icon: TrendingUp },
        { label: "Mortgage & Affordability Tools", href: "/first-time-homebuyers", icon: Building2 },
      ],
    },
    investor: {
      title: "Investor Resources",
      items: [
        { label: "Multi-Unit Listings", href: "/albany-multi-unit", icon: Building2 },
        { label: "Cap Rate & Cash Flow Tools", href: "/investor-tools", icon: TrendingUp },
        { label: "County Investment Pages", href: "/markets", icon: MapPin },
        { label: "Off-Market Opportunities", href: "/vip-buyer-access", icon: DollarSign },
        { label: "1031 Exchange Playbook", href: "/investor/1031-nyc-to-albany", icon: RefreshCw },
      ],
    },
    exploring: {
      title: "Research & Data",
      items: [
        { label: "Sold Properties Map", href: "/markets", icon: MapPin },
        { label: "Market Trends & Stats", href: "/delmar-market-insights", icon: TrendingUp },
        { label: "Price Per Square Foot Data", href: "/investor-tools", icon: DollarSign },
        { label: "Blog & Data Library", href: "/blog", icon: Search },
      ],
    },
  };

  return (
    <section className="px-[5%] py-16 bg-gradient-to-b from-primary/5 to-background border-b border-border">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
            START HERE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            What are you here to do?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Select your path and we'll show you exactly what matters.
          </p>
        </div>

        {/* Path Selection Cards */}
        {!selectedPath && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {/* Card 1 - Homebuyer */}
              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
                onClick={() => handlePathSelect("buyer")}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Home className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-foreground block mb-1">I'm buying a home</span>
                  <span className="text-sm text-muted-foreground">First-time or upgrading</span>
                </CardContent>
              </Card>

              {/* Card 2 - Investor */}
              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
                onClick={() => handlePathSelect("investor")}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <TrendingUp className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-foreground block mb-1">I'm investing</span>
                  <span className="text-sm text-muted-foreground">Multi-units & cash flow</span>
                </CardContent>
              </Card>

              {/* Card 3 - Exploring */}
              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
                onClick={() => handlePathSelect("exploring")}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Search className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-foreground block mb-1">Just exploring</span>
                  <span className="text-sm text-muted-foreground">Research the market</span>
                </CardContent>
              </Card>

              {/* Card 4 - Talk to Expert */}
              <Link to="/deal-desk">
                <Card className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <MessageSquare className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-lg font-bold text-foreground block mb-1">Talk to an expert</span>
                    <span className="text-sm text-muted-foreground">Strategy session</span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        )}

        {/* Revealed Content Based on Selection */}
        {selectedPath && selectedPath !== "talk" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={resetSelection}
              className="text-sm text-muted-foreground hover:text-primary mb-6 flex items-center gap-1 mx-auto"
            >
              ← Back to selection
            </button>
            
            <div className="bg-card border border-border rounded-xl p-6 max-w-2xl mx-auto text-left">
              <h3 className="text-xl font-bold text-foreground mb-4 text-center">
                {pathContent[selectedPath].title}
              </h3>
              <div className="space-y-3">
                {pathContent[selectedPath].items.map((item, index) => (
                  <Link 
                    key={index}
                    to={item.href}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedPath === "buyer" 
                    ? "Ready to start your home search?"
                    : selectedPath === "investor"
                    ? "Want personalized deal recommendations?"
                    : "Have questions about the market?"}
                </p>
                <Button asChild>
                  <Link to="/deal-desk">
                    Get Personalized Guidance <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StartHereDeck;