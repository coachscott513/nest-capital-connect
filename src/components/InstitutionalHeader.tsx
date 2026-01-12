import { useState } from "react";
import { Link } from "react-router-dom";
import { Map, Search, TrendingUp, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import MasterGatekeeperModal from "@/components/MasterGatekeeperModal";

const InstitutionalHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gatekeeperOpen, setGatekeeperOpen] = useState(false);
  const [pendingRedirectUrl, setPendingRedirectUrl] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const redirectUrl = `/intelligence?address=${encodeURIComponent(searchQuery.trim())}`;
      setPendingRedirectUrl(redirectUrl);
      setGatekeeperOpen(true);
    }
  };

  return (
    <>
      <section className="relative bg-background overflow-hidden">
        {/* Cinematic Breathing Line from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary/40 to-primary/60" />
        </div>

        {/* Main Content */}
        <div className="pt-32 pb-16 px-[5%]">
          <div className="max-w-6xl mx-auto">
            {/* Ultra-light Professional Title */}
            <div className="text-center mb-12">
              <h2 
                className="text-2xl md:text-3xl lg:text-4xl text-foreground uppercase leading-tight"
                style={{ 
                  fontWeight: 100, 
                  letterSpacing: '0.5em' 
                }}
              >
                Capital District <span className="text-primary text-glow">: Insights</span>
              </h2>
              <p 
                className="mt-3 text-[10px] md:text-xs text-muted-foreground uppercase font-light"
                style={{ letterSpacing: '0.3em' }}
              >
                [ Regional Market Hub ]
              </p>
            </div>

            {/* 4-Tile Bento Grid - Enhanced Glass Effect */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              
              {/* Tile 1: Regional Map (Large - spans 2 cols) */}
              <Link 
                to="/communities"
                className="lg:col-span-2 group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                <div className="p-8 h-full min-h-[200px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Map className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-light">
                        Town Map
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-light text-foreground tracking-tight mb-2">
                      42-Town Market Guide
                    </h3>
                    <p className="text-sm text-muted-foreground font-light">
                      Every neighborhood. Every trend. Your complete Capital District resource.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium mt-6 group-hover:gap-3 transition-all">
                    Explore Towns <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
              </Link>

              {/* Tile 2: Top Performer (Small) */}
              <div 
                className="rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                <div className="p-6 h-full min-h-[200px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-light">
                        Top Performer
                      </span>
                    </div>
                    <p className="text-3xl md:text-4xl font-[100] text-green-400 tracking-wide mb-1">
                      +8.2%
                    </p>
                    <p className="text-sm text-muted-foreground font-light">
                      YoY Appreciation
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-foreground font-medium">Clifton Park</p>
                    <p className="text-[10px] text-muted-foreground">Top Performer Q4 2025</p>
                  </div>
                </div>
              </div>

              {/* Tile 3: Investor Guide (Small) */}
              <Link 
                to="/intelligence"
                className="group rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                <div className="p-6 h-full min-h-[200px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-light">
                        Resource Hub
                      </span>
                    </div>
                    <h3 className="text-lg font-light text-foreground tracking-tight mb-2">
                      Buyer &<br />Investor Tools
                    </h3>
                    <p className="text-xs text-muted-foreground font-light">
                      Guides, reports, and helpful resources.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium mt-4 group-hover:gap-3 transition-all">
                    Access <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* Tile 4: Nest Passport Search (Wide - spans 4 cols on desktop) */}
              <div 
                className="lg:col-span-4 rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%)',
                  backdropFilter: 'blur(40px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                  border: '1px solid rgba(0, 245, 255, 0.2)',
                  boxShadow: '0 8px 48px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 245, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-medium">
                      Nest Passport
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-light text-foreground tracking-tight mb-4">
                    Request a property intelligence report
                  </h3>
                  <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 flex items-center gap-3 px-5 py-3 rounded-xl bg-background/50 border border-border/30">
                      <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter any Capital District address..."
                        className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 text-sm font-light"
                      />
                    </div>
                    <Button 
                      type="submit"
                      className="px-8 py-3 rounded-xl font-medium glow-primary"
                    >
                      Analyze
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Teal Pulse Line Bridge to Town Cards */}
        <div className="flex justify-center pb-8">
          <div className="w-px h-20 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
        </div>
      </section>

      {/* Master Gatekeeper Modal */}
      <MasterGatekeeperModal
        isOpen={gatekeeperOpen}
        onClose={() => setGatekeeperOpen(false)}
        redirectUrl={pendingRedirectUrl}
        searchQuery={searchQuery}
      />
    </>
  );
};

export default InstitutionalHeader;
