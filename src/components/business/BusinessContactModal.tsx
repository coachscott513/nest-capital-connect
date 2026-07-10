import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Phone, Mail, Globe, Calendar, Copy, Check, ExternalLink } from "lucide-react";
import { trackGAEvent } from "@/components/GARouteTracker";

export type BusinessContactInfo = {
  name: string;
  phoneDisplay: string;   // "(518) 244-3721"
  phoneHref: string;      // "tel:+15182443721"
  email: string;          // "rooseveltroomny@gmail.com"
  website: string;        // "https://rooseveltroom.com/"
  reservationUrl?: string;
  slug: string;           // GA slug e.g. "the-roosevelt-room"
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  business: BusinessContactInfo;
};

const INQUIRY_TYPES = [
  "General question",
  "Reservation question",
  "Private event",
  "Banquet inquiry",
  "Media inquiry",
  "Other",
];

const TEAL = "#5eead4";

const BusinessContactModal = ({ open, onOpenChange, business }: Props) => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: INQUIRY_TYPES[0],
    message: "",
  });

  const copyNumber = async () => {
    await navigator.clipboard.writeText(business.phoneDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const buildMailto = () => {
    const subject = encodeURIComponent(`Question from Capital District Nest — ${business.name}`);
    const bodyLines = [
      `Hello ${business.name},`,
      ``,
      `My name is ${form.name || "[Name]"}.`,
      ``,
      `I'm contacting you after viewing your Capital District Nest Spotlight page.`,
      ``,
      `Inquiry type: ${form.inquiryType}`,
      ``,
      form.message || "[Message]",
      ``,
      form.phone ? `Phone: ${form.phone}` : "",
      form.email ? `Reply email: ${form.email}` : "",
    ].filter(Boolean).join("\n");
    return `mailto:${business.email}?subject=${subject}&body=${encodeURIComponent(bodyLines)}`;
  };

  const track = (action: string) =>
    trackGAEvent.businessContactOpen({
      business_slug: business.slug,
      business_name: business.name,
      source_location: `contact_modal_${action}`,
    });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#0B0F19] border border-white/10 text-white p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          <DialogHeader>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase" style={{ color: TEAL }}>
              Contact
            </p>
            <DialogTitle className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Contact {business.name}
            </DialogTitle>
            <DialogDescription className="text-white/65 text-sm mt-2">
              Send an email, call the restaurant, or visit the official website.
              These actions contact {business.name} directly, not Capital District Nest.
            </DialogDescription>
          </DialogHeader>

          {/* Quick info */}
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-white/50">Phone</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <a href={business.phoneHref} onClick={() => track("call")} className="text-white font-medium">
                  {business.phoneDisplay}
                </a>
                <button
                  onClick={copyNumber}
                  className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white px-2 py-1 rounded-md border border-white/10"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-white/50">Email</p>
              <a
                href={`mailto:${business.email}`}
                onClick={() => track("email")}
                className="mt-2 block text-white font-medium truncate"
              >
                {business.email}
              </a>
            </div>
          </div>

          {/* Primary actions */}
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <a
              href={`mailto:${business.email}`}
              onClick={() => track("email_btn")}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
            >
              <Mail className="h-4 w-4" /> Email {business.name}
            </a>
            <a
              href={business.phoneHref}
              onClick={() => track("call_btn")}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold border border-white/25 bg-white/[0.06] hover:bg-white/[0.12] text-white transition"
            >
              <Phone className="h-4 w-4" /> Call {business.name}
            </a>
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("website_btn")}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold border border-white/25 bg-white/[0.06] hover:bg-white/[0.12] text-white transition"
            >
              <Globe className="h-4 w-4" /> Visit Official Website
            </a>
            {business.reservationUrl && (
              <a
                href={business.reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("reserve_btn")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white transition"
                style={{ backgroundColor: "#0d6e66" }}
              >
                <Calendar className="h-4 w-4" /> Reserve a Table
              </a>
            )}
          </div>

          {/* Inquiry form */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-white/50">
              Send a quick note
            </p>
            <p className="mt-2 text-sm text-white/60">
              Fill this out and we'll open your email app pre-addressed to {business.name}.
            </p>

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm placeholder:text-white/40 focus:outline-none focus:border-white/25"
              />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Your email"
                type="email"
                className="bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm placeholder:text-white/40 focus:outline-none focus:border-white/25"
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Your phone (optional)"
                className="bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm placeholder:text-white/40 focus:outline-none focus:border-white/25"
              />
              <select
                value={form.inquiryType}
                onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                className="bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white/25"
              >
                {INQUIRY_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-[#0B0F19]">{t}</option>
                ))}
              </select>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your message"
                rows={4}
                className="sm:col-span-2 bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm placeholder:text-white/40 focus:outline-none focus:border-white/25 resize-none"
              />
            </div>

            <a
              href={buildMailto()}
              onClick={() => track("open_email_app")}
              className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
            >
              <ExternalLink className="h-4 w-4" /> Open Email App
            </a>
            <p className="mt-3 text-xs text-white/40">
              This opens your device's email app pre-filled to {business.email}. Capital District Nest does not intercept these messages.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessContactModal;
