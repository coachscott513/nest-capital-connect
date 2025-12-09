import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PropertySearchBarProps {
  onSearch: (filters: { priceRange?: string; beds?: string; keyword?: string }) => void;
}

const PropertySearchBar = ({ onSearch }: PropertySearchBarProps) => {
  const [priceRange, setPriceRange] = useState<string>("any");
  const [beds, setBeds] = useState<string>("any");
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = () => {
    onSearch({
      priceRange: priceRange !== "any" ? priceRange : undefined,
      beds: beds !== "any" ? beds : undefined,
      keyword: keyword || undefined
    });
  };

  const handleReset = () => {
    setPriceRange("any");
    setBeds("any");
    setKeyword("");
    onSearch({});
  };

  return (
    <Card className="p-10 bg-card/95 backdrop-blur-md border-4 border-primary shadow-2xl shadow-primary/30 ring-4 ring-primary">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-primary font-semibold text-sm md:text-base mb-2 tracking-wide uppercase">
          Free, no obligation. Real Numbers — not guesses.
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Property Search Bar Analyzer
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          Search Any Home or Multi-Unit Property in the Capital District.<br />
          Instantly view details, rent estimates, comps, and more.<br />
          Want analysis? I'll run the numbers for you — no cost.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Price Range */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block uppercase tracking-wide">
            Price Range
          </label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-full h-14 text-base bg-background border-2 border-primary/50 text-foreground font-medium">
              <SelectValue placeholder="Any Price" />
            </SelectTrigger>
            <SelectContent className="bg-background border-2 border-primary">
              <SelectItem value="any" className="text-foreground font-medium">Any Price</SelectItem>
              <SelectItem value="0-300000" className="text-foreground font-medium">Under $300K</SelectItem>
              <SelectItem value="300000-400000" className="text-foreground font-medium">$300K - $400K</SelectItem>
              <SelectItem value="400000-500000" className="text-foreground font-medium">$400K - $500K</SelectItem>
              <SelectItem value="500000-600000" className="text-foreground font-medium">$500K - $600K</SelectItem>
              <SelectItem value="600000-999999999" className="text-foreground font-medium">$600K+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block uppercase tracking-wide">
            Bedrooms
          </label>
          <Select value={beds} onValueChange={setBeds}>
            <SelectTrigger className="w-full h-14 text-base bg-background border-2 border-primary/50 text-foreground font-medium">
              <SelectValue placeholder="Any Beds" />
            </SelectTrigger>
            <SelectContent className="bg-background border-2 border-primary">
              <SelectItem value="any" className="text-foreground font-medium">Any Beds</SelectItem>
              <SelectItem value="1" className="text-foreground font-medium">1+ Beds</SelectItem>
              <SelectItem value="2" className="text-foreground font-medium">2+ Beds</SelectItem>
              <SelectItem value="3" className="text-foreground font-medium">3+ Beds</SelectItem>
              <SelectItem value="4" className="text-foreground font-medium">4+ Beds</SelectItem>
              <SelectItem value="5" className="text-foreground font-medium">5+ Beds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Keyword Search */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block uppercase tracking-wide">
            Property Address
          </label>
          <Input 
            placeholder="Search by address, city, or MLS number…"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="h-14 text-base bg-background border-2 border-primary/50 text-foreground font-medium placeholder:text-muted-foreground/70"
          />
        </div>

        {/* Search Buttons */}
        <div className="flex gap-3 items-end">
          <Button 
            onClick={handleSearch}
            className="flex-1 h-14 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
          <Button 
            onClick={handleReset}
            variant="outline"
            className="h-14 px-5 text-base font-semibold border-2 border-primary/50"
          >
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertySearchBar;
