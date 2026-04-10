import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RentalDetailModalProps {
  rental: {
    id: string;
    address: string;
    rent_price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number | null;
    property_sub_type: string | null;
    photos: string[] | null;
    listing_agent: string | null;
    agency: string | null;
    remarks: string | null;
    town_slug: string;
  } | null;
  open: boolean;
  onClose: () => void;
}

const maskAddress = (address: string) => address.replace(/^\d+\s*/, "");

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

const RentalDetailModal = ({ rental, open, onClose }: RentalDetailModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!rental) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      full_name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      type: "rental_inquiry",
      message: `Schedule showing: ${rental.address} — ${formatPrice(rental.rent_price)}/mo`,
      location: rental.town_slug.replace(/-/g, " "),
      origin_town: rental.town_slug,
    });

    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
      toast.success("Request submitted — we'll be in touch shortly.");
    }
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setEmail("");
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-2xl border-border bg-background">
        {/* Photo */}
        {rental.photos?.[0] && (
          <div className="h-52 w-full overflow-hidden bg-muted">
            <img
              src={rental.photos[0]}
              alt={maskAddress(rental.address)}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="px-6 pb-6 pt-5 space-y-5">
          {/* Header */}
          <div>
            <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-1">
              {rental.property_sub_type || "Apartment"}
            </p>
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              {maskAddress(rental.address)}
            </h3>
            <p className="text-sm text-muted-foreground capitalize">
              {rental.town_slug.replace(/-/g, " ")}
            </p>
          </div>

          {/* Price + specs */}
          <div className="flex items-baseline gap-4">
            <span className="text-2xl font-bold text-foreground tracking-tight">
              {formatPrice(rental.rent_price)}<span className="text-sm font-normal text-muted-foreground">/mo</span>
            </span>
            <span className="text-sm text-muted-foreground">
              {rental.bedrooms} bed · {rental.bathrooms} bath
              {rental.sqft && ` · ${rental.sqft.toLocaleString()} sqft`}
            </span>
          </div>

          {/* Remarks */}
          {rental.remarks && (
            <p className="text-sm text-foreground/70 leading-relaxed line-clamp-4">
              {rental.remarks}
            </p>
          )}

          {/* Agent info */}
          {(rental.listing_agent || rental.agency) && (
            <div className="text-xs text-muted-foreground border-t border-border pt-4">
              {rental.listing_agent && <span>Listed by {rental.listing_agent}</span>}
              {rental.listing_agent && rental.agency && <span> · </span>}
              {rental.agency && <span>{rental.agency}</span>}
            </div>
          )}

          {/* Schedule Showing form */}
          {submitted ? (
            <div className="bg-secondary/60 rounded-xl p-5 text-center">
              <p className="text-sm font-semibold text-foreground mb-1">Request received</p>
              <p className="text-xs text-muted-foreground">We'll reach out within 24 hours to schedule your showing.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 border-t border-border pt-5">
              <p className="text-sm font-semibold text-foreground mb-1">Schedule a Showing</p>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                maxLength={20}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-foreground text-background py-3 rounded-full text-sm font-semibold hover:bg-foreground/85 transition-colors disabled:opacity-50"
              >
                {submitting ? "Submitting…" : "Request Showing"}
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RentalDetailModal;
