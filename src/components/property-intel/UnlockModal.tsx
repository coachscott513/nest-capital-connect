import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadFormData } from "./types";
import { Lock } from "lucide-react";

interface UnlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: LeadFormData) => Promise<void>;
  isSubmitting: boolean;
}

const UnlockModal = ({ open, onOpenChange, onSubmit, isSubmitting }: UnlockModalProps) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    phone: "",
  });
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Bot trap
    await onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-report-bg border-report-border max-w-md rounded-3xl p-8">
        <DialogHeader className="text-center mb-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-report-card flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-report-muted" strokeWidth={1.5} />
          </div>
          <DialogTitle className="text-2xl font-light text-report-fg">
            Unlock the Full Report
          </DialogTitle>
          <p className="text-sm text-report-muted mt-2">
            See pricing context, comparable sales, tax analysis, and risks.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute opacity-0 pointer-events-none"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-report-fg">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-report-card border-report-border text-report-fg rounded-xl h-12"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-report-fg">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-report-card border-report-border text-report-fg rounded-xl h-12"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm text-report-fg">
              Phone <span className="text-report-muted">(optional)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-report-card border-report-border text-report-fg rounded-xl h-12"
              placeholder="(555) 123-4567"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-report-fg text-report-bg hover:bg-report-fg/90 h-12 rounded-xl font-medium mt-6"
          >
            {isSubmitting ? "Unlocking..." : "Unlock Intelligence →"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UnlockModal;
