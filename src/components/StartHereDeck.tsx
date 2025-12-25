import { useState } from "react";
import { Home, TrendingUp, ArrowRight, Users, Briefcase, Building2, MapPin, DollarSign, RefreshCw, Landmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type UserType = "buyer" | "investor" | "both" | null;
type BuyerPath = "first-time" | "moving-up" | "capital-district" | "researching" | null;
type InvestorPath = "cash-flow" | "appreciation" | "multi-family" | "commercial" | "nyc-arbitrage" | "1031" | null;

interface StartHereDeckProps {
  onBuyerPathSelected: () => void;
  onInvestorPathSelected: () => void;
}

const StartHereDeck = ({ onBuyerPathSelected, onInvestorPathSelected }: StartHereDeckProps) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [buyerPath, setBuyerPath] = useState<BuyerPath>(null);
  const [investorPath, setInvestorPath] = useState<InvestorPath>(null);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setBuyerPath(null);
    setInvestorPath(null);
  };

  const handleBuyerPathSelect = (path: BuyerPath) => {
    setBuyerPath(path);
    onBuyerPathSelected();
  };

  const handleInvestorPathSelect = (path: InvestorPath) => {
    setInvestorPath(path);
    onInvestorPathSelected();
  };

  const resetSelection = () => {
    setUserType(null);
    setBuyerPath(null);
    setInvestorPath(null);
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
            Get the Right Info in 60 Seconds
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Whether you're buying your first home or investing for cash flow, we'll guide you to exactly what matters.
          </p>
        </div>

        {/* Deck Card 1 - User Type */}
        {!userType && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold text-foreground mb-6">Who are you?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
                onClick={() => handleUserTypeSelect("buyer")}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Home className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-foreground">Home Buyer</span>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
                onClick={() => handleUserTypeSelect("investor")}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-foreground">Real Estate Investor</span>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
                onClick={() => handleUserTypeSelect("both")}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-foreground">Both</span>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Deck Card 2 - Home Buyer Path */}
        {(userType === "buyer" || userType === "both") && !buyerPath && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={resetSelection}
              className="text-sm text-muted-foreground hover:text-primary mb-4 flex items-center gap-1 mx-auto"
            >
              ← Back to selection
            </button>
            <h3 className="text-xl font-semibold text-foreground mb-6">What best describes you?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all p-6"
                onClick={() => handleBuyerPathSelect("first-time")}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Home className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-foreground block">First-time buyer</span>
                    <span className="text-sm text-muted-foreground">Low or no money down programs</span>
                  </div>
                </div>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all p-6"
                onClick={() => handleBuyerPathSelect("moving-up")}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-foreground block">Moving up / relocating</span>
                    <span className="text-sm text-muted-foreground">Upgrading or changing areas</span>
                  </div>
                </div>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all p-6"
                onClick={() => handleBuyerPathSelect("capital-district")}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-foreground block">Buying in the Capital District</span>
                    <span className="text-sm text-muted-foreground">Albany, Troy, Schenectady area</span>
                  </div>
                </div>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all p-6"
                onClick={() => handleBuyerPathSelect("researching")}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-foreground block">Just researching</span>
                    <span className="text-sm text-muted-foreground">Prices & neighborhoods</span>
                  </div>
                </div>
              </Card>
            </div>

            {userType === "both" && (
              <Button 
                variant="outline" 
                onClick={() => setUserType("investor")}
                className="mt-4"
              >
                Skip to Investor Options →
              </Button>
            )}
          </div>
        )}

        {/* Deck Card 3 - Investor Path */}
        {(userType === "investor" || (userType === "both" && buyerPath)) && !investorPath && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={resetSelection}
              className="text-sm text-muted-foreground hover:text-primary mb-4 flex items-center gap-1 mx-auto"
            >
              ← Back to selection
            </button>
            <h3 className="text-xl font-semibold text-foreground mb-6">What's your investment goal?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all p-5"
                onClick={() => handleInvestorPathSelect("cash-flow")}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-foreground text-sm block">Cash flow</span>
                    <span className="text-xs text-muted-foreground">10–14% cap rates</span>
                  </div>
                </div>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all p-5"
                onClick={() => handleInvestorPathSelect("appreciation")}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-foreground text-sm block">Long-term appreciation</span>
                    <span className="text-xs text-muted-foreground">Build equity over time</span>
                  </div>
                </div>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all p-5"
                onClick={() => handleInvestorPathSelect("multi-family")}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-foreground text-sm block">Multi-family (2–4 units)</span>
                    <span className="text-xs text-muted-foreground">Residential investment</span>
                  </div>
                </div>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all p-5"
                onClick={() => handleInvestorPathSelect("commercial")}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-foreground text-sm block">5+ unit / commercial</span>
                    <span className="text-xs text-muted-foreground">Larger properties</span>
                  </div>
                </div>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all p-5"
                onClick={() => handleInvestorPathSelect("nyc-arbitrage")}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-foreground text-sm block">NYC → Upstate arbitrage</span>
                    <span className="text-xs text-muted-foreground">Higher returns upstate</span>
                  </div>
                </div>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all p-5"
                onClick={() => handleInvestorPathSelect("1031")}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-foreground text-sm block">1031 Exchange</span>
                    <span className="text-xs text-muted-foreground">Tax-deferred swap</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Confirmation State */}
        {(buyerPath || investorPath) && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-primary font-semibold mb-2">✓ Great choice!</p>
              <p className="text-muted-foreground text-sm mb-4">
                Scroll down to see the content tailored for you, or explore the hubs below.
              </p>
              <Button onClick={resetSelection} variant="outline" size="sm">
                Start Over
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StartHereDeck;
