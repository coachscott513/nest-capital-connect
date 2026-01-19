import { useNavigate, Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, TrendingUp, Building2, Star, BarChart3, MapPin, Award, Crown } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToAnalyzer = () => {
    const element = document.getElementById('due-diligence-engine');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* MOBILE HERO */}
      <section 
        className="md:hidden relative py-12 px-4 bg-cover bg-center bg-no-repeat" 
        role="banner"
        style={{ backgroundImage: `url(${heroBackground})` }}
        aria-label="Capital District Nest - Albany Real Estate Search"
      >
        <div className="absolute inset-0 bg-black/60" aria-hidden="true"></div>
        
        <div className="relative z-10 max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4 text-white drop-shadow-lg leading-tight">
            Know the Real Numbers Behind Any Property.
          </h1>
          <p className="text-base text-white/90 mb-3 drop-shadow-md leading-relaxed">
            Paste any address and get a full pro-level breakdown — cash flow, rent roll, taxes, cap rate, and projected returns.
          </p>
          <p className="text-sm text-white/80 mb-6 drop-shadow-md leading-relaxed">
            Clear, simple analysis built for buyers, sellers, and investors who want the truth behind every deal.
          </p>
          
          {/* Mobile CTA Buttons - Stacked Full Width */}
          <div className="flex flex-col gap-3 mb-6">
            <Button 
              size="lg" 
              className="w-full h-14 text-base font-bold"
              onClick={scrollToAnalyzer}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Analyze Any Property (Free Report)
            </Button>
            <Button 
              size="lg" 
              className="w-full h-14 text-base font-bold bg-amber-500 hover:bg-amber-600 text-black"
              asChild
            >
              <Link to="/vip-buyer-access">
                <Crown className="w-5 h-5 mr-2" />
                Get VIP Buyer Access
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full h-14 text-base font-semibold bg-white/10 border-white text-white hover:bg-white/20"
              asChild
            >
              <a href="tel:+15186718048">
                <Phone className="w-5 h-5 mr-2" />
                Call an Agent (518) 671-8048
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full h-14 text-base font-semibold bg-white/10 border-white text-white hover:bg-white/20"
              asChild
            >
              <a href="sms:+15186718048">
                <MessageSquare className="w-5 h-5 mr-2" />
                Text an Address
              </a>
            </Button>
          </div>
          
          {/* Mobile Trust Strip */}
          <div className="text-xs text-white/80 space-y-1">
            <p>⭐ 500+ Properties Analyzed • 📊 Investor-Focused Analysis</p>
            <p>🌆 Albany • Troy • Saratoga Expert • 🏢 RE/MAX Licensed Professional</p>
          </div>
        </div>
      </section>

      {/* DESKTOP HERO */}
      <section 
        className="hidden md:block relative py-16 lg:py-20 px-4 bg-cover bg-center bg-no-repeat" 
        role="banner"
        style={{ backgroundImage: `url(${heroBackground})` }}
        aria-label="Capital District Nest - Albany Real Estate Search"
      >
        <div className="absolute inset-0 bg-black/55" aria-hidden="true"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-bold mb-5 text-white drop-shadow-lg leading-tight">
                Know the Real Numbers Behind Any Property.
              </h1>
              <p className="text-lg lg:text-xl text-white/90 mb-4 drop-shadow-md leading-relaxed max-w-xl">
                Paste any address and get a full pro-level breakdown — cash flow, rent roll, taxes, cap rate, and projected returns.
              </p>
              <p className="text-base text-white/80 mb-4 drop-shadow-md leading-relaxed max-w-xl">
                Clear, simple analysis built for buyers, sellers, and investors who want the truth behind every deal.
              </p>
              <p className="text-primary font-semibold text-base mb-8 drop-shadow-md max-w-xl">
                Albany is one of the few Northeast markets where investors can achieve 10–14% cap rates and 15–30% cash-on-cash returns.
              </p>
              
              {/* Desktop CTA Row */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-lg font-bold"
                  onClick={scrollToAnalyzer}
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Analyze Any Property (Free Report)
                </Button>
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-lg font-bold bg-amber-500 hover:bg-amber-600 text-black"
                  asChild
                >
                  <Link to="/vip-buyer-access">
                    <Crown className="w-5 h-5 mr-2" />
                    VIP Buyer Access
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-8 text-lg font-bold border-white text-white hover:bg-white/20"
                  asChild
                >
                  <Link to="/albany-multi-unit">
                    <Building2 className="w-5 h-5 mr-2" />
                    Search Albany Multi-Units
                  </Link>
                </Button>
              </div>
              
              {/* Secondary Links */}
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <a 
                  href="tel:+15186762347" 
                  className="flex items-center gap-2 hover:text-white transition-colors font-medium"
                >
                  <Phone className="w-4 h-4" />
                  Call 518-676-2347
                </a>
                <a 
                  href="sms:+15186762347" 
                  className="flex items-center gap-2 hover:text-white transition-colors font-medium"
                >
                  <MessageSquare className="w-4 h-4" />
                  Text an Address
                </a>
                <button 
                  onClick={() => navigate('/insights')}
                  className="flex items-center gap-2 hover:text-white transition-colors font-medium"
                >
                  <TrendingUp className="w-4 h-4" />
                  Market Insights
                </button>
              </div>
            </div>
            
            {/* Right Visual - Analytics Card */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Property Intelligence Report</p>
                    <p className="text-white/70 text-sm">Sample Analysis</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80 text-sm">Estimated Rent</span>
                    <span className="text-emerald-400 font-bold">$2,450/mo</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80 text-sm">Cap Rate</span>
                    <span className="text-emerald-400 font-bold">7.2%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80 text-sm">Cash on Cash</span>
                    <span className="text-emerald-400 font-bold">12.4%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/80 text-sm">5-Year Equity</span>
                    <span className="text-emerald-400 font-bold">+$87,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Trust Bar */}
      <div className="hidden md:block bg-muted/50 border-b border-border py-4">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-primary" />
              Trusted by investors across Albany, Troy & Saratoga
            </span>
            <span className="hidden lg:inline">•</span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-primary" />
              500+ properties analyzed yearly
            </span>
            <span className="hidden lg:inline">•</span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-primary" />
              Economics-trained analysts
            </span>
            <span className="hidden lg:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary" />
              Multi-unit & investor specialists
            </span>
            <span className="hidden lg:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-primary" />
              RE/MAX licensed professional
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
