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
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/30 shadow-xl shadow-primary/10 ring-1 ring-primary/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Price Range */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Price Range
          </label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Price</SelectItem>
              <SelectItem value="0-300000">Under $300K</SelectItem>
              <SelectItem value="300000-400000">$300K - $400K</SelectItem>
              <SelectItem value="400000-500000">$400K - $500K</SelectItem>
              <SelectItem value="500000-600000">$500K - $600K</SelectItem>
              <SelectItem value="600000-999999999">$600K+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Bedrooms
          </label>
          <Select value={beds} onValueChange={setBeds}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any Beds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Beds</SelectItem>
              <SelectItem value="1">1+ Beds</SelectItem>
              <SelectItem value="2">2+ Beds</SelectItem>
              <SelectItem value="3">3+ Beds</SelectItem>
              <SelectItem value="4">4+ Beds</SelectItem>
              <SelectItem value="5">5+ Beds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Keyword Search */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Address Keyword
          </label>
          <Input 
            placeholder="Search by street name..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        {/* Search Buttons */}
        <div className="flex gap-2 items-end">
          <Button 
            onClick={handleSearch}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button 
            onClick={handleReset}
            variant="outline"
            className="px-4"
          >
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertySearchBar;
