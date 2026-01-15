import { useState } from "react";
import { Search, ArrowRight, Home, Building, Trees, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MasterGatekeeperModal from "@/components/MasterGatekeeperModal";

type SearchType = "single-family" | "rental" | "land" | "apartments";

interface SearchPill {
  id: SearchType;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
}

const searchPills: SearchPill[] = [
  { 
    id: "single-family", 
    label: "Single Family", 
    icon: <Home className="w-4 h-4" />,
    placeholder: "Enter an address to analyze..."
  },
  { 
    id: "rental", 
    label: "Rental Property", 
    icon: <Building className="w-4 h-4" />,
    placeholder: "Enter a rental address to analyze..."
  },
  { 
    id: "land", 
    label: "Land", 
    icon: <Trees className="w-4 h-4" />,
    placeholder: "Enter a land parcel address..."
  },
  { 
    id: "apartments", 
    label: "Apartments", 
    icon: <Building2 className="w-4 h-4" />,
    placeholder: "Enter a multi-family address..."
  },
];

const SearchCommandCenter = () => {
  const [selectedType, setSelectedType] = useState<SearchType>("single-family");
  const [searchQuery, setSearchQuery] = useState("");
  const [gatekeeperOpen, setGatekeeperOpen] = useState(false);
  const [pendingRedirectUrl, setPendingRedirectUrl] = useState("");

  const currentPill = searchPills.find(p => p.id === selectedType) || searchPills[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const redirectUrl = `/intelligence?address=${encodeURIComponent(searchQuery.trim())}&type=${selectedType}`;
      setPendingRedirectUrl(redirectUrl);
      setGatekeeperOpen(true);
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
        {/* Lead-In Text */}
        <p className="text-center text-muted-foreground text-lg font-light tracking-wide mb-6">
          I am searching for...
        </p>

        {/* Horizontal Scrolling Pills */}
        <div className="flex items-center justify-center gap-3 mb-8 overflow-x-auto pb-2 hide-scrollbar">
          {searchPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedType(pill.id)}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm whitespace-nowrap
                transition-all duration-300 shrink-0
                ${selectedType === pill.id 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                  : "glass hover:bg-primary/20 text-foreground"
                }
              `}
              style={{
                backdropFilter: selectedType === pill.id ? 'none' : 'blur(30px)',
                WebkitBackdropFilter: selectedType === pill.id ? 'none' : 'blur(30px)',
              }}
            >
              {pill.icon}
              {pill.label}
            </button>
          ))}
        </div>

        {/* Liquid Glass Search Bar */}
        <form 
          onSubmit={handleSearch}
          className="glass-strong rounded-2xl p-2.5"
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-4 px-6">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentPill.placeholder}
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
      </div>

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

export default SearchCommandCenter;
