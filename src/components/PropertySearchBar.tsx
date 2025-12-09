import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Mail, MessageSquare, Phone } from "lucide-react";

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

  const getReportSubject = () => {
    const parts = [];
    if (keyword) parts.push(`Address: ${keyword}`);
    if (priceRange !== "any") parts.push(`Price: ${priceRange}`);
    if (beds !== "any") parts.push(`Beds: ${beds}+`);
    return parts.length > 0 ? parts.join(" | ") : "Property Analysis Request";
  };

  const getReportBody = () => {
    return encodeURIComponent(`Hi Scott,\n\nPlease send me an analysis report for:\n\nAddress: ${keyword || "(any)"}\nPrice Range: ${priceRange === "any" ? "Any" : priceRange}\nBedrooms: ${beds === "any" ? "Any" : beds + "+"}\n\nThank you!`);
  };

  return (
    <div className="relative p-1 rounded-xl bg-primary shadow-2xl shadow-primary/40">
      <div className="p-8 md:p-10 bg-card rounded-lg">
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          {/* Price Range */}
          <div>
            <label className="text-sm font-bold text-foreground mb-2 block uppercase tracking-wide">
              Price Range
            </label>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full h-14 text-base bg-background border-2 border-primary text-foreground font-medium focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Any Price" />
              </SelectTrigger>
              <SelectContent className="bg-background border-2 border-primary z-50">
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
              <SelectTrigger className="w-full h-14 text-base bg-background border-2 border-primary text-foreground font-medium focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Any Beds" />
              </SelectTrigger>
              <SelectContent className="bg-background border-2 border-primary z-50">
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
              className="h-14 text-base bg-background border-2 border-primary text-foreground font-medium placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary"
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
              className="h-14 px-5 text-base font-semibold border-2 border-primary"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Get Your Report Section */}
        <div className="border-t-2 border-primary/30 pt-6">
          <p className="text-center text-lg font-bold text-foreground mb-4 uppercase tracking-wide">
            Step 2: Get Your Free Report
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href={`mailto:scott@capitaldistrictnest.com?subject=${encodeURIComponent(getReportSubject())}&body=${getReportBody()}`}
              className="flex items-center justify-center gap-3 h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base rounded-md transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email My Report
            </a>
            <a
              href={`sms:+15186762347?body=${encodeURIComponent(`Hi Scott, please analyze: ${keyword || "(paste address here)"}`)}`}
              className="flex items-center justify-center gap-3 h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-md transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Text My Report
            </a>
            <a
              href="tel:+15186762347"
              className="flex items-center justify-center gap-3 h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-md transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call for Report
            </a>
          </div>
          <p className="text-center text-muted-foreground text-sm mt-3">
            Reports delivered within 1 business day
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertySearchBar;
