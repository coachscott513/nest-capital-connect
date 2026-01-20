import { useState } from "react";
import { Search, Home, Building2, MapPin, TreePine, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface QuickMatchFormProps {
  townName?: string;
  className?: string;
  onSuccess?: () => void;
}

const searchIntents = [
  { value: "specific-property", label: "Specific Property", icon: Home, description: "I have an address I want analyzed" },
  { value: "area-search", label: "Search an Area", icon: MapPin, description: "Browse homes in a town or neighborhood" },
  { value: "multi-family", label: "Multi-Family / Investment", icon: Building2, description: "Cash-flowing rentals & multi-units" },
  { value: "land", label: "Land & Lots", icon: TreePine, description: "Building lots, acreage, or raw land" },
];

const QuickMatchForm = ({ townName, className = "", onSuccess }: QuickMatchFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    searchIntent: "",
    additionalInfo: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.searchIntent) {
      toast({
        title: "Please complete all required fields",
        description: "Name, email, and search type are required.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const searchIntentLabel = searchIntents.find(i => i.value === formData.searchIntent)?.label || formData.searchIntent;
      
      const { error } = await supabase.from("leads").insert({
        full_name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || null,
        message: `Quick Match Request - ${searchIntentLabel}${formData.additionalInfo ? `: ${formData.additionalInfo}` : ""}`,
        type: "quick-match",
        lead_type: searchIntentLabel,
        location: townName || "Capital District",
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Request Received!",
        description: "I'll text your curated list shortly.",
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Quick match form error:", error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or call us at (518) 676-2347",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-3xl p-8 text-center ${className}`}
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(25px)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-semibold mb-3">You're In!</h3>
        <p className="text-muted-foreground mb-6">
          Check your phone — I'll text your curated property list within the hour.
        </p>
        <p className="text-sm text-muted-foreground/60">
          Questions? Call or text: <a href="tel:+15186762347" className="text-primary hover:underline">(518) 676-2347</a>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl overflow-hidden ${className}`}
      style={{
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(25px)",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Search className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">VIP Property Access</h3>
        </div>
        <p className="text-muted-foreground text-sm font-light">
          {townName 
            ? `Get curated ${townName} listings that fit your criteria — including off-market opportunities.`
            : "Get curated listings that fit your criteria — including off-market opportunities."}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Search Intent */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">What are you searching for? *</Label>
          <Select
            value={formData.searchIntent}
            onValueChange={(value) => setFormData(prev => ({ ...prev, searchIntent: value }))}
          >
            <SelectTrigger className="h-12 bg-white/5 border-white/10 focus:border-primary">
              <SelectValue placeholder="Select your search type" />
            </SelectTrigger>
            <SelectContent>
              {searchIntents.map((intent) => {
                const IconComponent = intent.icon;
                return (
                  <SelectItem key={intent.value} value={intent.value}>
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4 text-primary" />
                      <div>
                        <span className="font-medium">{intent.label}</span>
                        <span className="text-xs text-muted-foreground ml-2">— {intent.description}</span>
                      </div>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Your Name *</Label>
          <Input
            type="text"
            placeholder="First name is fine"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="h-12 bg-white/5 border-white/10 focus:border-primary"
            required
          />
        </div>

        {/* Email & Phone Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Email *</Label>
            <Input
              type="email"
              placeholder="you@email.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="h-12 bg-white/5 border-white/10 focus:border-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Phone (for text updates)</Label>
            <Input
              type="tel"
              placeholder="(518) 555-0000"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="h-12 bg-white/5 border-white/10 focus:border-primary"
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Any specific requirements?</Label>
          <Input
            type="text"
            placeholder="e.g., 3+ beds, under $400K, near Delmar"
            value={formData.additionalInfo}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
            className="h-12 bg-white/5 border-white/10 focus:border-primary"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              Get My Curated List
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>

        {/* Trust Note */}
        <p className="text-xs text-center text-muted-foreground/60">
          No spam. Your info stays private. I'll personally text your matches.
        </p>
      </form>
    </motion.div>
  );
};

export default QuickMatchForm;
