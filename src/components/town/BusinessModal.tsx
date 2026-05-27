import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Phone, Globe, MapPin, Facebook, Instagram, Linkedin, Star, Lock } from "lucide-react";
import type { Business } from "@/data/businesses";

interface Props {
  business: Business | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TEAL = "#0d6e66";

// TikTok icon (lucide doesn't ship one)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.84a8.16 8.16 0 0 0 4.77 1.52V6.91a4.85 4.85 0 0 1-1.84-.22Z"/>
  </svg>
);

const SocialIcon = ({
  href,
  enabled,
  Icon,
  label,
}: {
  href?: string;
  enabled: boolean;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
}) => {
  const base =
    "flex items-center justify-center w-11 h-11 rounded-full border transition-all";
  if (enabled && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`${base} border-[#5eead4]/30 text-[#5eead4] hover:bg-[#0d6e66] hover:text-white hover:border-[#0d6e66]`}
      >
        <Icon className="w-4 h-4" />
      </a>
    );
  }
  return (
    <span
      aria-label={`${label} (locked)`}
      title="Claim this profile to activate social links."
      className={`${base} border-white/10 text-white/25 cursor-not-allowed bg-white/[0.02]`}
    >
      <Icon className="w-4 h-4" />
    </span>
  );
};

const BusinessModal = ({ business, open, onOpenChange }: Props) => {
  if (!business) return null;
  const b = business;
  const verified = !!b.verified;
  const telHref = b.phone ? `tel:${b.phone.replace(/[^\d+]/g, "")}` : undefined;
  const socials = b.socials ?? {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] bg-[#0B0F19] text-white">
        <div className="p-7 md:p-8 bg-[#0B0F19]">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="min-w-0">
              <p
                className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-2"
                style={{ color: "#5eead4" }}
              >
                {b.category}
              </p>
              <DialogTitle className="text-2xl md:text-[28px] font-semibold tracking-tight text-white leading-tight">
                {b.name}
              </DialogTitle>
            </div>
            {b.featured && (
              <span
                className="shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
                style={{ backgroundColor: TEAL }}
              >
                <Star className="w-3 h-3 fill-current" /> Featured
              </span>
            )}
          </div>

          <DialogDescription className="text-white/70 text-[15px] leading-relaxed mt-3">
            {b.about}
          </DialogDescription>

          {/* Contact rows */}
          <div className="mt-6 space-y-2.5">
            {b.phone && (
              <a
                href={telHref}
                className="flex items-center gap-3 text-[15px] text-white/85 hover:text-white transition"
              >
                <Phone className="w-4 h-4 text-white/45" />
                <span>{b.phone}</span>
              </a>
            )}
            {b.website && (
              <a
                href={b.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[15px] text-white/85 hover:text-white transition truncate"
              >
                <Globe className="w-4 h-4 text-white/45 shrink-0" />
                <span className="truncate">{b.website.replace(/^https?:\/\//, "")}</span>
              </a>
            )}
            <div className="flex items-center gap-3 text-[15px] text-white/70">
              <MapPin className="w-4 h-4 text-white/45" />
              <span>{b.address}</span>
            </div>
          </div>

          {/* CTA */}
          {telHref && (
            <a
              href={telHref}
              className="mt-7 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: TEAL }}
            >
              <Phone className="w-4 h-4" /> Contact {b.name.split(" ")[0]}
            </a>
          )}

          {/* Socials — Facebook first */}
          <div className="mt-7 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/55">
                Social
              </p>
              {!verified && (
                <span className="inline-flex items-center gap-1 text-[11px] text-white/45">
                  <Lock className="w-3 h-3" /> Claim to activate
                </span>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              <SocialIcon href={socials.facebook}  enabled={verified} Icon={Facebook}    label="Facebook" />
              <SocialIcon href={socials.instagram} enabled={verified} Icon={Instagram}   label="Instagram" />
              <SocialIcon href={socials.linkedin}  enabled={verified} Icon={Linkedin}    label="LinkedIn" />
              <SocialIcon href={socials.twitter}   enabled={verified} Icon={TikTokIcon}  label="X" />
            </div>
            {!verified && (
              <>
                <p className="mt-3 text-xs text-white/45 leading-relaxed">
                  Business owner? Claim this profile to activate social links.
                </p>
                <a
                  href={`/pricing)}`}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-[#5eead4]/30 text-[#5eead4] hover:bg-[#0d6e66] hover:text-white hover:border-[#0d6e66] transition-all"
                >
                  Claim this listing
                </a>
                <p className="mt-2 text-[11px] text-white/45 text-center">
                  Free · No payment required
                </p>
              </>
            )}
          </div>
        </div>
      </DialogContent>

    </Dialog>
  );
};

export default BusinessModal;
