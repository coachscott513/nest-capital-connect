
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerTrigger } from "@/components/ui/drawer";
import { MapPin } from "lucide-react";

interface AddressInputDialogProps {
  onAddressSubmit: (address: string) => void;
}

const AddressInputDialog = ({ onAddressSubmit }: AddressInputDialogProps) => {
  const [address, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    if (address.trim()) {
      // Geocode the address to get coordinates
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const encodedAddress = encodeURIComponent(address.trim());
      
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
        );
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          const earthUrl = `https://earth.google.com/web/@${lat},${lng},80a,0d,80y,0h,45t,0r`;
          window.open(earthUrl, '_blank');
        } else {
          // Fallback to address search if geocoding fails
          onAddressSubmit(address.trim());
        }
      } catch (error) {
        console.error('Geocoding error:', error);
        onAddressSubmit(address.trim());
      }
      
      setAddress("");
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="bg-background/10 border-white/30 text-white hover:bg-background/20 hover:border-white/50 px-4 md:px-8 py-3 md:py-4 text-base md:text-lg w-full max-w-sm md:min-w-[300px] md:w-auto"
        >
          <MapPin className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" />
          View Address on Google Earth
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md mx-auto">
        <DrawerHeader>
          <DrawerTitle>Enter Address for Google Earth</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <input
            type="text"
            placeholder="Enter an address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
        </div>
        <DrawerFooter>
          <Button 
            onClick={handleSubmit}
            disabled={!address.trim()}
            className="w-full"
          >
            View on Google Earth
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddressInputDialog;
