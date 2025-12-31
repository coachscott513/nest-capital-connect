import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FileText, Send } from "lucide-react";

interface MarketReportRequestFormProps {
  townName: string;
  townSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

const MarketReportRequestForm = ({ townName, townSlug, isOpen, onClose }: MarketReportRequestFormProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    buyerType: "buyer",
    addressToAnalyze: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast.error("Please enter your name and email");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('market_report_leads')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          buyer_type: formData.buyerType,
          address_to_analyze: formData.addressToAnalyze || null,
          town_slug: townSlug,
          town_name: townName
        });

      if (error) throw error;

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        buyerType: "buyer",
        addressToAnalyze: ""
      });
      
      onClose();
      
      // Navigate to thank you page
      navigate(`/towns/${townSlug}/report-request-thanks`);
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            Request the Full List + Breakdown
          </DialogTitle>
          <DialogDescription className="text-center">
            Get the complete market activity summary for {townName} — including price changes, new listings, and notable moves.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Your name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-11"
            />
          </div>

          <div className="space-y-3">
            <Label>I'm a...</Label>
            <RadioGroup
              value={formData.buyerType}
              onValueChange={(value) => setFormData({ ...formData, buyerType: value })}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buyer" id="buyer" />
                <Label htmlFor="buyer" className="font-normal cursor-pointer">Buyer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="investor" id="investor" />
                <Label htmlFor="investor" className="font-normal cursor-pointer">Investor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="homeowner" id="homeowner" />
                <Label htmlFor="homeowner" className="font-normal cursor-pointer">Homeowner</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Any address you want analyzed? (optional)</Label>
            <Textarea
              id="address"
              placeholder="Enter an address or leave blank"
              value={formData.addressToAnalyze}
              onChange={(e) => setFormData({ ...formData, addressToAnalyze: e.target.value })}
              className="resize-none"
              rows={2}
            />
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-12 font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send My Request
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We'll send your summary and full list shortly. No spam.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MarketReportRequestForm;
