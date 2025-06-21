
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PropertySearchDialogProps {
  children: React.ReactNode;
}

const PropertySearchDialog = ({ children }: PropertySearchDialogProps) => {
  const [open, setOpen] = useState(false);
  const [searchType, setSearchType] = useState<"rent" | "buy" | "">("");
  const [selectedCounty, setSelectedCounty] = useState("");

  const countyLinks = {
    albany: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=2500&beds=0&baths=0&types%5B%5D=6&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=list&leadid=948",
    schenectady: "", // To be added later
    rensselaer: "", // To be added later
    saratoga: "", // To be added later
  };

  const handleSearch = () => {
    if (searchType === "buy") {
      // Original link for buying
      window.open("https://scottalvarez.remax.com/index.php?advanced=1&display=&custombox=&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map#rslt", "_blank");
      setOpen(false);
    } else if (searchType === "rent" && selectedCounty) {
      const link = countyLinks[selectedCounty as keyof typeof countyLinks];
      if (link) {
        window.open(link, "_blank");
        setOpen(false);
      }
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset form when dialog closes
      setSearchType("");
      setSelectedCounty("");
    }
  };

  const canProceed = searchType === "buy" || (searchType === "rent" && selectedCounty);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Find Your Perfect Nest</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">What are you looking for?</Label>
            <RadioGroup value={searchType} onValueChange={(value) => setSearchType(value as "rent" | "buy")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rent" id="rent" />
                <Label htmlFor="rent">Rent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buy" id="buy" />
                <Label htmlFor="buy">Buy</Label>
              </div>
            </RadioGroup>
          </div>

          {searchType === "rent" && (
            <div className="space-y-3">
              <Label className="text-base font-medium">Select County</Label>
              <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a county" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="albany">Albany County</SelectItem>
                  <SelectItem value="schenectady">Schenectady County</SelectItem>
                  <SelectItem value="rensselaer">Rensselaer County</SelectItem>
                  <SelectItem value="saratoga">Saratoga County</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button 
            onClick={handleSearch}
            disabled={!canProceed}
            className="w-full"
          >
            {searchType === "buy" ? "Search Properties to Buy" : "Search Rentals"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertySearchDialog;
