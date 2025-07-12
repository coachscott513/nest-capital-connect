import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, DollarSign, Building2 } from "lucide-react";

interface LeadCaptureFormProps {
  type: "investment" | "rental" | "rehab" | "multi-unit";
  title?: string;
  description?: string;
  buttonText?: string;
  variant?: "modal" | "inline" | "hero";
}

const LeadCaptureForm = ({ 
  type, 
  title, 
  description, 
  buttonText = "Get My Free Analysis",
  variant = "inline" 
}: LeadCaptureFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    priceRange: "",
    bedrooms: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const getFormContent = () => {
    switch (type) {
      case "investment":
        return {
          defaultTitle: "Get Weekly Investment Property Picks",
          defaultDescription: "See the top 3 underpriced properties in the Capital District this week",
          placeholder: "Tell us about your investment goals..."
        };
      case "multi-unit":
        return {
          defaultTitle: "Multi-Unit Deal Alert",
          defaultDescription: "Get notified when new multi-family properties hit the market",
          placeholder: "What type of multi-unit property interests you?"
        };
      case "rehab":
        return {
          defaultTitle: "Rehab Property Analysis",
          defaultDescription: "Free analysis of potential flip properties in your area",
          placeholder: "What's your rehab experience level?"
        };
      case "rental":
        return {
          defaultTitle: "Premium Rental Listings",
          defaultDescription: "Access exclusive rental properties before they go public",
          placeholder: "What are you looking for in a rental?"
        };
    }
  };

  const content = getFormContent();
  const formTitle = title || content.defaultTitle;
  const formDescription = description || content.defaultDescription;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          location: formData.location || null,
          price_range: formData.priceRange || null,
          bedrooms: formData.bedrooms || null,
          message: formData.message || null,
          type
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "We'll send you the latest deals within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        priceRange: "",
        bedrooms: "",
        message: ""
      });

    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardClass = variant === "hero" 
    ? "bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl" 
    : "bg-card border shadow-lg";

  return (
    <Card className={cardClass}>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-xl font-bold">
          {type === "investment" && <Building2 className="w-6 h-6 text-primary" />}
          {type === "multi-unit" && <Building2 className="w-6 h-6 text-primary" />}
          {type === "rehab" && <Building2 className="w-6 h-6 text-primary" />}
          {type === "rental" && <Building2 className="w-6 h-6 text-primary" />}
          {formTitle}
        </CardTitle>
        <CardDescription className="text-base">
          {formDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Full Name *
              </label>
              <Input
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="bg-background/50 border-muted"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="bg-background/50 border-muted"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="(518) 555-0123"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-background/50 border-muted"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Preferred Location
              </label>
              <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                <SelectTrigger className="bg-background/50 border-muted">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent className="bg-background border-muted shadow-lg z-50">
                  <SelectItem value="albany">Albany</SelectItem>
                  <SelectItem value="troy">Troy</SelectItem>
                  <SelectItem value="schenectady">Schenectady</SelectItem>
                  <SelectItem value="saratoga">Saratoga Springs</SelectItem>
                  <SelectItem value="other">Other Capital District</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(type === "investment" || type === "multi-unit" || type === "rehab") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Investment Budget
                </label>
                <Select value={formData.priceRange} onValueChange={(value) => setFormData({...formData, priceRange: value})}>
                  <SelectTrigger className="bg-background/50 border-muted">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-muted shadow-lg z-50">
                    <SelectItem value="under-200k">Under $200K</SelectItem>
                    <SelectItem value="200k-400k">$200K - $400K</SelectItem>
                    <SelectItem value="400k-600k">$400K - $600K</SelectItem>
                    <SelectItem value="600k-1m">$600K - $1M</SelectItem>
                    <SelectItem value="over-1m">Over $1M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Units/Bedrooms
                </label>
                <Select value={formData.bedrooms} onValueChange={(value) => setFormData({...formData, bedrooms: value})}>
                  <SelectTrigger className="bg-background/50 border-muted">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-muted shadow-lg z-50">
                    <SelectItem value="single-family">Single Family</SelectItem>
                    <SelectItem value="2-4-units">2-4 Units</SelectItem>
                    <SelectItem value="5-10-units">5-10 Units</SelectItem>
                    <SelectItem value="10plus-units">10+ Units</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {content.placeholder.replace("?", "")}
            </label>
            <Textarea
              placeholder={content.placeholder}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="bg-background/50 border-muted min-h-[80px]"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg"
          >
            {isSubmitting ? "Sending..." : buttonText}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;