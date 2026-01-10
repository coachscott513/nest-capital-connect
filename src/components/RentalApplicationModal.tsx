import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, User, Mail, Phone, DollarSign, Calendar, MapPin, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

interface Rental {
  id: string;
  address: string;
  rent_price: number;
  town_slug: string;
}

interface RentalApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rental: Rental | null;
}

const applicationSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  annual_income: z.string().min(1, "Income range is required"),
  move_in_date: z.string().min(1, "Move-in date is required"),
  current_address: z.string().trim().max(200).optional(),
  message: z.string().trim().max(1000).optional()
});

const RentalApplicationModal = ({ open, onOpenChange, rental }: RentalApplicationModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    annual_income: "",
    move_in_date: "",
    current_address: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const result = applicationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('rental_applications')
        .insert({
          rental_id: rental?.id,
          full_name: formData.full_name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          annual_income: formData.annual_income,
          move_in_date: formData.move_in_date,
          current_address: formData.current_address.trim() || null,
          message: formData.message.trim() || null
        });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Application submitted successfully!");
      
      // Reset after delay
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          annual_income: "",
          move_in_date: "",
          current_address: "",
          message: ""
        });
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            Apply to Rent
          </DialogTitle>
        </DialogHeader>

        {rental && (
          <div className="glass rounded-xl p-4 mb-6">
            <p className="font-semibold text-foreground">{rental.address}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-muted-foreground capitalize">
                {rental.town_slug.replace('-', ' ')}
              </span>
              <span className="text-lg font-bold text-primary">
                {formatPrice(rental.rent_price)}/mo
              </span>
            </div>
          </div>
        )}

        {isSuccess ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground">We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-sm font-medium text-foreground">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange("full_name", e.target.value)}
                  className="pl-10 bg-background border-border"
                  placeholder="Your full name"
                />
              </div>
              {errors.full_name && <p className="text-sm text-destructive">{errors.full_name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 bg-background border-border"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone (Optional)
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10 bg-background border-border"
                  placeholder="(518) 555-0123"
                />
              </div>
            </div>

            {/* Annual Income */}
            <div className="space-y-2">
              <Label htmlFor="annual_income" className="text-sm font-medium text-foreground">
                Annual Income *
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select 
                  value={formData.annual_income} 
                  onValueChange={(value) => handleInputChange("annual_income", value)}
                >
                  <SelectTrigger className="pl-10 bg-background border-border">
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-30k">Under $30,000</SelectItem>
                    <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
                    <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                    <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                    <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
                    <SelectItem value="over-150k">Over $150,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.annual_income && <p className="text-sm text-destructive">{errors.annual_income}</p>}
            </div>

            {/* Move-in Date */}
            <div className="space-y-2">
              <Label htmlFor="move_in_date" className="text-sm font-medium text-foreground">
                Desired Move-in Date *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="move_in_date"
                  type="date"
                  value={formData.move_in_date}
                  onChange={(e) => handleInputChange("move_in_date", e.target.value)}
                  className="pl-10 bg-background border-border"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.move_in_date && <p className="text-sm text-destructive">{errors.move_in_date}</p>}
            </div>

            {/* Current Address */}
            <div className="space-y-2">
              <Label htmlFor="current_address" className="text-sm font-medium text-foreground">
                Current Address (Optional)
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="current_address"
                  value={formData.current_address}
                  onChange={(e) => handleInputChange("current_address", e.target.value)}
                  className="pl-10 bg-background border-border"
                  placeholder="123 Main St, Albany, NY"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-foreground">
                Additional Information (Optional)
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="bg-background border-border min-h-[80px]"
                placeholder="Tell us about yourself, pets, roommates, etc."
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 glow-primary"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting, you agree to be contacted about this rental opportunity.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RentalApplicationModal;