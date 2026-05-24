import { useState } from "react";
import {
  ArrowUpRight,
  Phone,
  Globe,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  X as XIcon,
  Clock,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export interface LocalPartner {
  id: string;
  name: string;
  category: string;
  tagline: string;
  about?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  hours?: string;
  image?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
}

interface Props {
  townName?: string;
  eyebrow?: string;
  headline?: string;
  sub?: string;
  partners?: LocalPartner[];
  variant?: "light" | "dark";
  showClaimCard?: boolean;
}

const TEAL = "#0d6e66";

const DEFAULT_PARTNERS: LocalPartner[] = [
  {
    id: "broadview",
    name: "Broadview Federal Credit Union",
    category: "Local Lending",
    tagline: "Local mortgage guidance for Capital Region buyers.",
    about:
      "A New York-based credit union offering first-time buyer programs, low down payment options, and personal mortgage guidance for families across the Capital District.",
    phone: "(800) 727-3328",
    website: "https://www.broadviewfcu.com",
    address: "Capital District, New York",
    hours: "Mon–Fri · 9:00 AM – 5:00 PM",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "us-mortgage",
    name: "US Mortgage",
    category: "Mortgage",
    tagline: "Low down payment and investor financing across New York.",
    about:
      "A direct mortgage lender supporting first-time buyers, investors, and move-up families with conventional, FHA, VA, and DSCR loan programs.",
    phone: "(800) 562-6715",
    website: "https://www.usmortgage.com",
    address: "Serving New York State",
    hours: "Mon–Fri · 9:00 AM – 6:00 PM",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "deangelis-law",
    name: "DeAngelis Law Firm",
    category: "Real Estate Attorney",
    tagline: "Calm, clear residential closings across the Capital District.",
    about:
      "Residential real estate attorneys handling Capital District closings — purchase, sale, and refinance — with a calm, organized, communication-first approach.",
    phone: "(518) 000-0000",
    website: "#",
    address: "Capital District, New York",
    hours: "Mon–Fri · 9:00 AM – 5:00 PM",
    image:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "romos-pizza",
    name: "Romo's Pizza",
    category: "Local Eats",
    tagline: "Neighborhood pizza loved across Delmar.",
    about:
      "A long-standing Delmar favorite — classic New York-style pies, calzones, and family dinners served with neighborhood warmth.",
    phone: "(518) 000-0000",
    website: "#",
    address: "Delmar, NY",
    hours: "Daily · 11:00 AM – 9:00 PM",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80",
  },
];

const SocialBtn = ({
  href,
  Icon,
  label,
}: {
  href?: string;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
}) => {
  const base =
    "flex items-center justify-center w-10 h-10 rounded-full border transition-all";
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`${base} border-[#0d6e66]/25 text-[#0d6e66] hover:bg-[#0d6e66] hover:text-white hover:border-[#0d6e66]`}
      >
        <Icon className="w-4 h-4" />
      </a>
    );
  }
  return (
    <span
      aria-label={`${label} (unavailable)`}
      className={`${base} border-foreground/10 text-foreground/25 cursor-not-allowed`}
    >
      <Icon className="w-4 h-4" />
    </span>
  );
};

const PartnerModal = ({
  partner,
  open,
  onOpenChange,
}: {
  partner: LocalPartner | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) => {
  if (!partner) return null;
  const p = partner;
  const tel = p.phone ? `tel:${p.phone.replace(/[^\d+]/g, "")}` : undefined;
  const mailto = p.email ? `mailto:${p.email}` : undefined;
  const directions = p.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address)}`
    : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 gap-0 rounded-3xl overflow-hidden border-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] bg-white">
        {/* Hero */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-[#0e0f12]">
          {p.image && (
            <img
              src={p.image}
              alt=""
              className="w-full h-full object-cover opacity-90"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/80 via-[#0e0f12]/30 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <p
              className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-1.5"
              style={{ color: "#5eead4" }}
            >
              {p.category}
            </p>
            <DialogTitle className="text-white text-2xl md:text-[28px] font-semibold tracking-tight leading-tight">
              {p.name}
            </DialogTitle>
          </div>
        </div>

        <div className="p-7 md:p-8">
          <DialogDescription className="text-foreground/70 text-[15px] leading-relaxed">
            {p.about ?? p.tagline}
          </DialogDescription>

          <div className="mt-6 space-y-2.5">
            {p.phone && (
              <a href={tel} className="flex items-center gap-3 text-[15px] text-foreground hover:opacity-70">
                <Phone className="w-4 h-4 text-foreground/50" /> {p.phone}
              </a>
            )}
            {p.website && p.website !== "#" && (
              <a
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[15px] text-foreground hover:opacity-70 truncate"
              >
                <Globe className="w-4 h-4 text-foreground/50 shrink-0" />
                <span className="truncate">{p.website.replace(/^https?:\/\//, "")}</span>
              </a>
            )}
            {p.email && (
              <a href={mailto} className="flex items-center gap-3 text-[15px] text-foreground hover:opacity-70">
                <Mail className="w-4 h-4 text-foreground/50" /> {p.email}
              </a>
            )}
            {p.address && (
              <div className="flex items-center gap-3 text-[15px] text-foreground/75">
                <MapPin className="w-4 h-4 text-foreground/50" /> {p.address}
              </div>
            )}
            {p.hours && (
              <div className="flex items-center gap-3 text-[15px] text-foreground/75">
                <Clock className="w-4 h-4 text-foreground/50" /> {p.hours}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            {tel && (
              <a
                href={tel}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 transition"
                style={{ backgroundColor: TEAL }}
              >
                <Phone className="w-4 h-4" /> Call
              </a>
            )}
            {p.website && p.website !== "#" && (
              <a
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold border border-[#0d6e66]/25 text-[#0d6e66] hover:bg-[#0d6e66] hover:text-white hover:border-[#0d6e66] transition"
              >
                <Globe className="w-4 h-4" /> Website
              </a>
            )}
            {mailto && (
              <a
                href={mailto}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold border border-foreground/15 text-foreground hover:bg-foreground/5 transition"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            )}
            {directions && (
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold border border-foreground/15 text-foreground hover:bg-foreground/5 transition"
              >
                <MapPin className="w-4 h-4" /> Directions
              </a>
            )}
          </div>

          {/* Socials */}
          <div className="mt-7 pt-6 border-t border-foreground/[0.08]">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground/60 mb-3">
              Social
            </p>
            <div className="flex items-center gap-2.5">
              <SocialBtn href={p.socials?.instagram} Icon={Instagram} label="Instagram" />
              <SocialBtn href={p.socials?.facebook} Icon={Facebook} label="Facebook" />
              <SocialBtn href={p.socials?.linkedin} Icon={Linkedin} label="LinkedIn" />
              <SocialBtn href={p.socials?.twitter} Icon={XIcon} label="X" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const TrustedLocalPartners = ({
  townName = "Delmar",
  eyebrow = "Trusted Local Partners",
  headline,
  sub = "A curated set of lenders, attorneys, and local favorites we recommend across the Capital District.",
  partners = DEFAULT_PARTNERS,
  variant = "light",
  showClaimCard = false,
}: Props) => {
  const isDark = variant === "dark";
  const [active, setActive] = useState<LocalPartner | null>(null);
  const [open, setOpen] = useState(false);

  const openPartner = (p: LocalPartner) => {
    setActive(p);
    setOpen(true);
  };

  return (
    <section
      className={`${isDark ? "bg-[#0e0f12] text-white" : "bg-white text-[#1d1d1f]"} py-24 md:py-32 px-6 md:px-10`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 md:mb-16 max-w-2xl">
          <p className={`eyebrow-apple mb-3 ${isDark ? "text-[#5eead4]" : "text-[#0d6e66]"}`}>
            {eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05]">
            {headline ?? <>Trusted {townName} partners.</>}
          </h2>
          <p className={`mt-5 text-lg font-light ${isDark ? "text-white/65" : "text-[#1d1d1f]/65"}`}>
            {sub}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {partners.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => openPartner(p)}
              className="group relative text-left overflow-hidden rounded-[28px] aspect-[4/5] md:aspect-[5/6] bg-[#0e0f12] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] focus:outline-none focus:ring-2 focus:ring-[#0d6e66]/40"
            >
              {/* Image */}
              {p.image ? (
                <img
                  src={p.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#0d6e66]/40 to-[#0e0f12]" />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/95 via-[#0e0f12]/45 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-7 md:p-9 flex flex-col justify-end text-white">
                <span
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-3"
                  style={{ color: "#5eead4" }}
                >
                  {p.category}
                </span>
                <h3 className="text-2xl md:text-[30px] font-semibold tracking-tight leading-[1.1]">
                  {p.name}
                </h3>
                <p className="mt-3 text-[15px] md:text-base font-light text-white/75 max-w-md">
                  {p.tagline}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-all group-hover:gap-2.5">
                  Explore Partner <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>

        <p
          className={`mt-12 text-center text-sm ${isDark ? "text-white/40" : "text-[#1d1d1f]/40"}`}
        >
          Curated by Capital District Nest. Want to be considered?{" "}
          <a
            href="/claim-business"
            className={isDark ? "text-[#5eead4] underline" : "text-[#0d6e66] underline"}
          >
            Apply here
          </a>
          .
        </p>
      </div>

      <PartnerModal partner={active} open={open} onOpenChange={setOpen} />
    </section>
  );
};

export default TrustedLocalPartners;
