import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter } from "lucide-react";
import { useSupabase } from "@/hooks/useSupabase";
import { toast } from "@/hooks/use-toast";

interface PropertySearchDeckProps {
  sourcePropertyAddress?: string;
  visible?: boolean;
}

const narrowOptions = [
  { id: "price_range", label: "Price range" },
  { id: "lot_size", label: "Lot size / acreage" },
  { id: "taxes", label: "Taxes" },
  { id: "school_district", label: "School district" },
  { id: "zoning", label: "Zoning / land use" },
  { id: "investment", label: "Investment potential" },
  { id: "area_type", label: "Quiet residential vs. growth area" },
];

const PropertySearchDeck = ({ sourcePropertyAddress = "", visible = true }: PropertySearchDeckProps) => {
  const { addLead, loading } = useSupabase();
  
  // Search form state
  const [searchForm, setSearchForm] = useState({
    propertyAddress: "",
    name: "",
    email: "",
    phone: "",
  });

  // Narrow form state
  const [narrowForm, setNarrowForm] = useState({
    name: "",
    email: "",
    selectedOptions: [] as string[],
  });

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addLead({
        name: searchForm.name,
        email: searchForm.email,
        phone: searchForm.phone || undefined,
        message: `Property Search Request: ${searchForm.propertyAddress}. Source: ${sourcePropertyAddress || "Property Page"}`,
        type: "buyer",
        location: searchForm.propertyAddress,
      });
      
      toast({
        title: "Request Received",
        description: "We'll send your property intelligence report shortly.",
      });
      
      setSearchForm({ propertyAddress: "", name: "", email: "", phone: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNarrowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedLabels = narrowOptions
      .filter(opt => narrowForm.selectedOptions.includes(opt.id))
      .map(opt => opt.label)
      .join(", ");
    
    try {
      await addLead({
        name: narrowForm.name,
        email: narrowForm.email,
        message: `Search Narrowing Request. Priorities: ${selectedLabels || "General guidance"}. Source: ${sourcePropertyAddress || "Property Page"}`,
        type: "buyer",
      });
      
      toast({
        title: "Request Received",
        description: "We'll help you narrow your search with clear guidance.",
      });
      
      setNarrowForm({ name: "", email: "", selectedOptions: [] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleOption = (optionId: string) => {
    setNarrowForm(prev => ({
      ...prev,
      selectedOptions: prev.selectedOptions.includes(optionId)
        ? prev.selectedOptions.filter(id => id !== optionId)
        : [...prev.selectedOptions, optionId],
    }));
  };

  if (!visible) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Looking at Other Properties Like This?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare, filter, and narrow your search using the same intelligence you see here.
          </p>
        </div>

        {/* Two Panel Layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* LEFT PANEL - Search Another Property */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Search Another Property</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter any address, town, or listing link. We'll generate a clear, data-driven breakdown like this one.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search-address">Property address or town *</Label>
                  <Input
                    id="search-address"
                    placeholder="e.g., 123 Main St, Albany NY"
                    value={searchForm.propertyAddress}
                    onChange={(e) => setSearchForm(prev => ({ ...prev, propertyAddress: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search-name">Name *</Label>
                  <Input
                    id="search-name"
                    placeholder="Your name"
                    value={searchForm.name}
                    onChange={(e) => setSearchForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search-email">Email *</Label>
                  <Input
                    id="search-email"
                    type="email"
                    placeholder="you@email.com"
                    value={searchForm.email}
                    onChange={(e) => setSearchForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search-phone">Phone (optional)</Label>
                  <Input
                    id="search-phone"
                    type="tel"
                    placeholder="(518) 555-0000"
                    value={searchForm.phone}
                    onChange={(e) => setSearchForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  Get Property Intelligence
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  No obligation. Real numbers. Local context.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* RIGHT PANEL - Narrow My Search */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Filter className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Help Me Narrow My Search</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Not sure where to focus? We can help you filter based on what matters most.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNarrowSubmit} className="space-y-4">
                <div className="space-y-3">
                  <Label>What matters most to you?</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {narrowOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={option.id}
                          checked={narrowForm.selectedOptions.includes(option.id)}
                          onCheckedChange={() => toggleOption(option.id)}
                        />
                        <Label 
                          htmlFor={option.id} 
                          className="text-sm font-normal cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="narrow-name">Name *</Label>
                  <Input
                    id="narrow-name"
                    placeholder="Your name"
                    value={narrowForm.name}
                    onChange={(e) => setNarrowForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="narrow-email">Email *</Label>
                  <Input
                    id="narrow-email"
                    type="email"
                    placeholder="you@email.com"
                    value={narrowForm.email}
                    onChange={(e) => setNarrowForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  Help Me Narrow My Options
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  You'll get clear guidance, not sales pressure.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PropertySearchDeck;
