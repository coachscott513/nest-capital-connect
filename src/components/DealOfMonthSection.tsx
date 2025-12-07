import { Link } from "react-router-dom";
import dealImage from "@/assets/deal-of-month-triplex.jpg";

const DealOfMonthSection = () => {
  return (
    <section className="py-20 px-[5%] bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-4">
          <div className="text-[#10B981] font-bold text-sm mb-3 uppercase tracking-wider">
            Featured Investment
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Investment Spotlight: <span className="text-[#10B981]">The Alpha Asset</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Selected for immediate cash flow potential. Off-market status.
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div className="relative mt-12 rounded-2xl overflow-hidden bg-[#022c22]/30 backdrop-blur-xl border border-[#10B981]/50 shadow-[0_0_40px_rgba(16,185,129,0.15),0_20px_60px_rgba(0,0,0,0.5)]">
          
          {/* Split Layout */}
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Side: The Math */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
              {/* Deal Title */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                  <span className="text-[#10B981] text-xs font-bold uppercase tracking-wider">The Troy "BRRRR" Opportunity</span>
                </div>
                <p className="text-white/70 leading-relaxed">
                  This 3-unit asset in North Troy is currently under-rented by 30%. With a cosmetic renovation budget of $15k, the <strong className="text-white">Projected Cash Flow</strong> jumps to $900/month immediately. A perfect entry for the <strong className="text-white">Capital District BRRRR strategy</strong>.
                </p>
              </div>

              {/* Large Metrics */}
              <div className="space-y-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-black text-[#FFD700]">11.2%</span>
                  <span className="text-white/50 text-lg font-medium">Cap Rate</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-black text-[#10B981]">24%</span>
                  <span className="text-white/50 text-lg font-medium">Cash on Cash</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-black text-white">$1,200</span>
                  <span className="text-white/50 text-lg font-medium">/mo Net Income</span>
                </div>
              </div>
            </div>

            {/* Right Side: The Visual */}
            <div className="flex-1 relative min-h-[300px] lg:min-h-[450px]">
              <img 
                src={dealImage} 
                alt="Troy multi-family investment property - 3-unit BRRRR opportunity in Capital District" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#022c22]/90 via-[#022c22]/50 to-transparent lg:bg-gradient-to-r" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#022c22]/80 via-transparent to-[#022c22]/30" />
              
              {/* Property Tags */}
              <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
                <span className="bg-[#10B981] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  3-Unit Triplex
                </span>
                <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold border border-white/20">
                  North Troy, NY
                </span>
                <span className="bg-[#FFD700]/20 backdrop-blur-sm text-[#FFD700] px-4 py-1.5 rounded-full text-sm font-bold border border-[#FFD700]/30">
                  Off-Market
                </span>
              </div>
            </div>
          </div>

          {/* SEO Links Footer */}
          <div className="border-t border-[#10B981]/30 px-8 py-5 flex flex-wrap items-center justify-center gap-2 md:gap-6 text-sm">
            <Link 
              to="/troy-real-estate" 
              className="text-[#10B981] hover:text-white font-semibold transition-colors hover:underline"
            >
              Analyze this Troy Multi-Family
            </Link>
            <span className="text-white/30 hidden md:inline">|</span>
            <Link 
              to="/investor-tools" 
              className="text-[#10B981] hover:text-white font-semibold transition-colors hover:underline"
            >
              Compare vs. Albany Stocks
            </Link>
            <span className="text-white/30 hidden md:inline">|</span>
            <Link 
              to="/cash-flow-report" 
              className="text-[#10B981] hover:text-white font-semibold transition-colors hover:underline"
            >
              Request Rent Roll
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealOfMonthSection;
