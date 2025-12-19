import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TrendingUp, Home, Mountain, Wallet, ArrowRight, CheckCircle } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: { value: string; label: string; description: string }[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is your primary real estate goal?",
    options: [
      { value: "cashflow", label: "Generate rental income", description: "I want properties that produce monthly cash flow" },
      { value: "first-home", label: "Buy my first home", description: "I'm ready to stop renting and own my own place" },
      { value: "build", label: "Buy land to build or hold", description: "I want to develop or hold land long-term" },
      { value: "refinance", label: "Understand financing options", description: "I need help with mortgages and down payments" },
    ],
  },
  {
    id: 2,
    question: "What's your timeline for making a purchase?",
    options: [
      { value: "now", label: "Ready now (0-3 months)", description: "I'm actively looking and can move quickly" },
      { value: "soon", label: "Soon (3-6 months)", description: "Getting pre-approved and researching" },
      { value: "planning", label: "Planning ahead (6-12 months)", description: "Building savings and learning the market" },
      { value: "exploring", label: "Just exploring", description: "Gathering information for the future" },
    ],
  },
  {
    id: 3,
    question: "What's your experience level with real estate?",
    options: [
      { value: "none", label: "First-time buyer", description: "This will be my first property purchase" },
      { value: "owner", label: "Current homeowner", description: "I own my home and want to invest or upgrade" },
      { value: "investor", label: "Experienced investor", description: "I own multiple properties already" },
      { value: "professional", label: "Real estate professional", description: "I work in the industry" },
    ],
  },
];

type JourneyPath = "investor" | "first-time" | "land" | "financing";

const journeyResults: Record<JourneyPath, { title: string; description: string; path: string; icon: React.ElementType }> = {
  investor: {
    title: "Investment Properties",
    description: "You're ready to build wealth through real estate. Get cash-flow analysis, deal comparisons, and investor-level insights.",
    path: "/buyer-journey/investor",
    icon: TrendingUp,
  },
  "first-time": {
    title: "First-Time Home Buyer",
    description: "Discover grants, low-down-payment programs, and step-by-step guidance for your first home purchase.",
    path: "/buyer-journey/first-time-buyer",
    icon: Home,
  },
  land: {
    title: "Land Buyer",
    description: "Learn about zoning, utilities, build costs, and what makes land a smart long-term investment.",
    path: "/buyer-journey/land-buyer",
    icon: Mountain,
  },
  financing: {
    title: "Financing & Mortgages",
    description: "Explore mortgage options, assistance programs, and how financing impacts your long-term returns.",
    path: "/buyer-journey/financing",
    icon: Wallet,
  },
};

const BuyerJourneyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const determineJourney = (): JourneyPath => {
    const goal = answers[1];
    const experience = answers[3];

    if (goal === "cashflow" || experience === "investor" || experience === "professional") {
      return "investor";
    }
    if (goal === "build") {
      return "land";
    }
    if (goal === "refinance") {
      return "financing";
    }
    return "first-time";
  };

  const result = journeyResults[determineJourney()];
  const ResultIcon = result.icon;

  const currentAnswer = answers[questions[currentQuestion]?.id];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    return (
      <Card className="max-w-xl mx-auto bg-card border-border">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ResultIcon className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-foreground">Your Recommended Path</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-primary mb-2">{result.title}</h3>
            <p className="text-muted-foreground">{result.description}</p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              Personalized resources and guides
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              Curated property recommendations
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              Expert support tailored to your goals
            </div>
          </div>

          <Button 
            onClick={() => navigate(result.path)} 
            className="w-full"
            size="lg"
          >
            Start Your {result.title} Journey
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setShowResult(false);
            }}
            className="w-full text-muted-foreground"
          >
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}% complete
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <CardTitle className="text-xl mt-4 text-foreground">
          {questions[currentQuestion].question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={currentAnswer || ""}
          onValueChange={handleAnswer}
          className="space-y-3"
        >
          {questions[currentQuestion].options.map((option) => (
            <div key={option.value} className="relative">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="peer sr-only"
              />
              <Label
                htmlFor={option.value}
                className="flex flex-col p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
              >
                <span className="font-medium text-foreground">{option.label}</span>
                <span className="text-sm text-muted-foreground">{option.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex gap-3">
          {currentQuestion > 0 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Back
            </Button>
          )}
          <Button 
            onClick={handleNext} 
            disabled={!currentAnswer}
            className="flex-1"
          >
            {currentQuestion === questions.length - 1 ? "See My Path" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerJourneyQuiz;
