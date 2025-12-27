import { useState } from "react";
import { Home, TrendingUp, MapPin, ArrowRight, ArrowLeft, Search, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type UserGoal = "buy" | "invest" | "research" | null;
type SelectedTown = string | null;
type DepthLevel = "quick" | "full" | null;

const towns = [
  { name: "Delmar", href: "/delmar" },
  { name: "Niskayuna", href: "/niskayuna-real-estate" },
  { name: "Voorheesville", href: "/voorheesville-real-estate" },
  { name: "Clifton Park", href: "/clifton-park-real-estate" },
  { name: "Albany", href: "/albany-real-estate" },
  { name: "Troy", href: "/troy-real-estate" },
  { name: "Schenectady", href: "/schenectady-real-estate" },
  { name: "Saratoga", href: "/saratoga-real-estate" },
  { name: "Amsterdam", href: "/amsterdam-real-estate" },
];

const GuidedDeck = () => {
  const [step, setStep] = useState(1);
  const [userGoal, setUserGoal] = useState<UserGoal>(null);
  const [selectedTown, setSelectedTown] = useState<SelectedTown>(null);
  const [depthLevel, setDepthLevel] = useState<DepthLevel>(null);

  const resetDeck = () => {
    setStep(1);
    setUserGoal(null);
    setSelectedTown(null);
    setDepthLevel(null);
  };

  const goBack = () => {
    if (step === 3) {
      setStep(2);
      setDepthLevel(null);
    } else if (step === 2) {
      setStep(1);
      setSelectedTown(null);
    }
  };

  const getDestination = () => {
    const townData = towns.find(t => t.name === selectedTown);
    const townHref = townData?.href || "/communities";

    if (userGoal === "buy") {
      if (depthLevel === "quick") {
        return townHref;
      }
      return "/buyer-journey/first-time-buyer";
    }
    if (userGoal === "invest") {
      if (depthLevel === "quick") {
        return townHref;
      }
      return "/buyer-journey/investor";
    }
    if (userGoal === "research") {
      if (depthLevel === "quick") {
        return townHref;
      }
      return "/delmar-market-insights";
    }
    return townHref;
  };

  return (
    <section className="px-[5%] py-16 bg-gradient-to-b from-muted/30 to-background border-b border-border">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
            GUIDED EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Let Us Guide You
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Answer a few questions and we'll point you to the right resources.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition-colors ${
                s === step ? "bg-primary" : s < step ? "bg-primary/50" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Step 1: What are you looking to do? */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Step 1: What are you looking to do?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Card
                className={`cursor-pointer transition-all ${
                  userGoal === "buy" ? "border-primary bg-primary/5" : "hover:border-primary hover:shadow-lg"
                }`}
                onClick={() => {
                  setUserGoal("buy");
                  setStep(2);
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Home className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-foreground">Buy</span>
                  <p className="text-sm text-muted-foreground mt-1">Find my home</p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${
                  userGoal === "invest" ? "border-primary bg-primary/5" : "hover:border-primary hover:shadow-lg"
                }`}
                onClick={() => {
                  setUserGoal("invest");
                  setStep(2);
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-foreground">Invest</span>
                  <p className="text-sm text-muted-foreground mt-1">Build wealth</p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${
                  userGoal === "research" ? "border-primary bg-primary/5" : "hover:border-primary hover:shadow-lg"
                }`}
                onClick={() => {
                  setUserGoal("research");
                  setStep(2);
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-foreground">Research</span>
                  <p className="text-sm text-muted-foreground mt-1">Explore a town</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 2: Which town are you interested in? */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Step 2: Which town are you interested in?
            </h3>
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
              {towns.map((town) => (
                <button
                  key={town.name}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    selectedTown === town.name
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary hover:bg-muted/50 text-foreground"
                  }`}
                  onClick={() => {
                    setSelectedTown(town.name);
                    setStep(3);
                  }}
                >
                  {town.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: How deep do you want to go? */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Step 3: How deep do you want to go?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
              <Card
                className={`cursor-pointer transition-all ${
                  depthLevel === "quick" ? "border-primary bg-primary/5" : "hover:border-primary hover:shadow-lg"
                }`}
                onClick={() => setDepthLevel("quick")}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-foreground">Quick Overview</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Browse {selectedTown} listings & stats
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${
                  depthLevel === "full" ? "border-primary bg-primary/5" : "hover:border-primary hover:shadow-lg"
                }`}
                onClick={() => setDepthLevel("full")}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-foreground">Full Intelligence</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    In-depth guides & resources
                  </p>
                </CardContent>
              </Card>
            </div>

            {depthLevel && (
              <div className="mt-8 animate-in fade-in duration-300">
                <Button asChild size="lg">
                  <Link to={getDestination()}>
                    Take Me There <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <button
                  onClick={resetDeck}
                  className="block mx-auto mt-4 text-sm text-muted-foreground hover:text-primary"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default GuidedDeck;
