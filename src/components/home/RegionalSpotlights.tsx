import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  Clock,
  Facebook,
  FileText,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Music2,
  Phone,
  Sparkles,
  Utensils,
  Wallet,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { trackGAEvent } from "@/components/GARouteTracker";

/* =============================================================
   FEATURED LOCAL SPOTLIGHTS — Live premium demo partners.
   Three hand-built model profiles that prove Capital District Nest
   is a live local discovery platform, not a passive directory.
   ============================================================= */

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.84a8.16 8.16 0 0 0 4.77 1.52V6.91a4.85 4.85 0 0 1-1.84-.22Z" />
  </svg>
);

type ActionKey =
  | "call"
  | "email"
  | "website"
  | "directions"
  | "apply"
  | "mortgageHelp"
  | "reservation"
  | "menu"
  | "order"
  | "bookAppt";

type PartnerAction = {
  key: ActionKey;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  primary?: boolean;
  external?: boolean;
};

type EventPromo = {
  title: string;
  subtitle: string;
  schedule: string;
  cta: { label: string; href: string }[];
};

type Spotlight = {
  slug: string;
  name: string;
  category: string;
  town: string;
  tagline: string;
  bio: string;
  phone?: string;
  email?: string;
  website: string;
  address: string;
  hours: string;
  status: "open" | "closing-soon" | "closed";
  gallery: string[];
  socials: { facebook?: string; instagram?: string; tiktok?: string; linkedin?: string };
  accent: "gold" | "emerald" | "teal";
  vertical: "mortgage" | "restaurant" | "law";
  primaryActions: PartnerAction[];
  secondaryActions: PartnerAction[];
  specials?: string[];
  event?: EventPromo;
};

const SPOTLIGHTS: Spotlight[] = [
  {
    slug: "christie-hoyt-broadview-mortgage",
    name: "Christie Hoyt Mortgage Team",
    category: "Mortgage · Home Lending · Broadview FCU",
    town: "Capital District",
    tagline:
      "Local-first home lending from a team that closes Capital District deals on time, every time.",
    bio:
      "Christie Hoyt and the Broadview Federal Credit Union mortgage team work side-by-side with Capital District buyers — from first-time homeowners to investors and relocators. Pre-approvals in days, in-house underwriting, and a real person on the phone when you need answers.",
    phone: "(800) 296-8882",
    email: "mortgages@broadviewfcu.com",
    website:
      "https://www.broadviewfcu.com/personal/home-lending-solutions/meet-the-mortgage-team/christie-hoyt/",
    address: "Broadview FCU · Capital District, NY",
    hours: "Mon–Fri · 9a – 5p",
    status: "open",
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80",
    ],
    socials: { linkedin: "https://www.linkedin.com" },
    accent: "teal",
    vertical: "mortgage",
    primaryActions: [
      {
        key: "apply",
        label: "Apply Now",
        href: "https://www.broadviewfcu.com/personal/home-lending-solutions/meet-the-mortgage-team/christie-hoyt/",
        icon: FileText,
        primary: true,
        external: true,
      },
      {
        key: "mortgageHelp",
        label: "Connect with Mortgage Expert",
        href: "/finances",
        icon: Wallet,
      },
    ],
    secondaryActions: [
      { key: "call", label: "Call", href: "tel:+18002968882", icon: Phone },
      { key: "email", label: "Email", href: "mailto:mortgages@broadviewfcu.com", icon: Mail },
      {
        key: "website",
        label: "Website",
        href: "https://www.broadviewfcu.com/personal/home-lending-solutions/meet-the-mortgage-team/christie-hoyt/",
        icon: Globe,
        external: true,
      },
    ],
  },
  {
    slug: "roosevelt-room-albany",
    name: "Roosevelt Room",
    category: "Restaurant · Cocktails · Live Music",
    town: "Albany",
    tagline:
      "Velvet booths, craft cocktails, and live jazz nights — Albany's most photogenic dinner-and-music spot.",
    bio:
      "A Roaring Twenties supper club tucked into downtown Albany. Wood-fired plates, hand-shaken cocktails, and a calendar of live jazz, soul, and weekend DJ sets that turns dinner into the whole night out.",
    phone: "(518) 463-9999",
    website: "https://rooseveltroom.com/",
    address: "Downtown Albany, NY",
    hours: "Wed–Sat · 5p – 1a",
    status: "open",
    gallery: [
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1400&q=80",
    ],
    socials: {
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      tiktok: "https://www.tiktok.com/",
    },
    accent: "gold",
    vertical: "restaurant",
    primaryActions: [
      {
        key: "reservation",
        label: "Make Reservation",
        href: "https://rooseveltroom.com/",
        icon: Calendar,
        primary: true,
        external: true,
      },
      {
        key: "menu",
        label: "View Menu",
        href: "https://rooseveltroom.com/",
        icon: Utensils,
        external: true,
      },
      {
        key: "order",
        label: "Order Online",
        href: "https://rooseveltroom.com/",
        icon: Globe,
        external: true,
      },
    ],
    secondaryActions: [
      { key: "call", label: "Call", href: "tel:+15184639999", icon: Phone },
      { key: "directions", label: "Directions", href: "https://www.google.com/maps/search/?api=1&query=Roosevelt+Room+Albany+NY", icon: MapPin, external: true },
    ],
    specials: [
      "Half-price oysters · Wed 5–7p",
      "Bartender's choice flight · $18",
      "Late-night kitchen until midnight",
    ],
    event: {
      title: "Live Jazz Friday & Saturday Nights",
      subtitle: "House quartet at 9p · No cover before 8p",
      schedule: "Every Fri & Sat · Doors at 7p",
      cta: [
        { label: "View Event Details", href: "https://rooseveltroom.com/" },
        { label: "Make Reservation", href: "https://rooseveltroom.com/" },
        { label: "View Menu", href: "https://rooseveltroom.com/" },
      ],
    },
  },
  {
    slug: "delmar-family-dental-demo",
    name: "Delmar Family Dental",
    category: "Dentist · Family & Cosmetic Care",
    town: "Delmar",
    tagline:
      "Modern family dentistry on Delaware Ave — same-day cleanings, on-time appointments, and a calm Apple-clean office.",
    bio:
      "Delmar Family Dental offers preventive, cosmetic, and pediatric dental care for the whole household. Digital X-rays, sedation options, and most major insurance plans accepted. Saturday openings every other week.",
    phone: "(518) 439-1234",
    email: "hello@delmarfamilydental.com",
    website: "https://www.capitaldistrictnest.com/local",
    address: "Delaware Ave, Delmar NY",
    hours: "Mon–Thu · 8a – 6p · Fri 8a – 2p",
    status: "open",
    gallery: [
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80",
    ],
    socials: {
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
    },
    accent: "emerald",
    vertical: "dental",
    primaryActions: [
      {
        key: "bookAppt",
        label: "Book Appointment",
        href: "tel:+15184391234",
        icon: Calendar,
        primary: true,
      },
      {
        key: "website",
        label: "Visit Website",
        href: "https://www.capitaldistrictnest.com/local",
        icon: Globe,
        external: true,
      },
    ],
    secondaryActions: [
      { key: "call", label: "Call", href: "tel:+15184391234", icon: Phone },
      { key: "email", label: "Email", href: "mailto:hello@delmarfamilydental.com", icon: Mail },
      {
        key: "directions",
        label: "Directions",
        href: "https://www.google.com/maps/search/?api=1&query=Delaware+Ave+Delmar+NY",
        icon: MapPin,
        external: true,
      },
    ],
    specials: [
      "New patient cleaning + X-rays · $99",
      "Free pediatric first visit",
      "Same-week emergency openings",
    ],
  },
];

const accentHex = (a: Spotlight["accent"]) =>
  a === "gold" ? "#c9a449" : a === "teal" ? "#5eead4" : "#34d399";

const accentSoftRGBA = (a: Spotlight["accent"]) =>
  a === "gold" ? "rgba(201,164,73,0.35)" : a === "teal" ? "rgba(94,234,212,0.35)" : "rgba(52,211,153,0.35)";

const bizPayload = (s: Spotlight, source: string) => ({
  business_id: s.slug,
  business_slug: s.slug,
  business_name: s.name,
  category: s.category,
  town: s.town,
  tier: "featured",
  source_location: source,
});

const trackAction = (s: Spotlight, key: ActionKey) => {
  const p = bizPayload(s, `regional_spotlight_${s.vertical}_${key}`);
  if (key === "call") trackGAEvent.callClick(p);
  else if (key === "email") trackGAEvent.emailClick(p);
  else if (key === "website" || key === "apply" || key === "menu" || key === "order")
    trackGAEvent.websiteClick(p);
  else if (key === "directions") trackGAEvent.directionsClick(p);
  else trackGAEvent.businessContactOpen(p);
};

const StatusDot = ({ status }: { status: Spotlight["status"] }) => {
  const color = status === "open" ? "#22c55e" : status === "closing-soon" ? "#facc15" : "#ef4444";
  const label = status === "open" ? "Open Now" : status === "closing-soon" ? "Closing Soon" : "Closed";
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white">
      <span className="relative flex w-1.5 h-1.5">
        <span className="absolute inset-0 rounded-full animate-ping opacity-60" style={{ background: color }} />
        <span className="relative rounded-full w-1.5 h-1.5" style={{ background: color }} />
      </span>
      {label}
    </span>
  );
};

const monogram = (name: string) =>
  name
    .replace(/[^a-zA-Z ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const TypographicHero = ({
  s,
  size = "card",
}: {
  s: Spotlight;
  size?: "card" | "modal";
}) => {
  const accent = accentHex(s.accent);
  const accentSoft = accentSoftRGBA(s.accent);
  const h = size === "card" ? "h-56 md:h-64" : "h-44 md:h-52";
  const monoSize = size === "card" ? "text-[88px] md:text-[104px]" : "text-[72px] md:text-[88px]";
  return (
    <div className={`relative w-full overflow-hidden ${h}`}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 80% at 20% 0%, ${accent}26, transparent 55%), radial-gradient(100% 80% at 100% 100%, ${accentSoft}, transparent 60%), linear-gradient(160deg, #0E1426 0%, #13182A 60%, #0B0F19 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative h-full w-full flex items-center justify-between px-7">
        <span
          className={`font-semibold tracking-[-0.04em] leading-none ${monoSize}`}
          style={{ color: accent, textShadow: `0 8px 30px ${accentSoft}` }}
        >
          {monogram(s.name)}
        </span>
        <div className="text-right max-w-[55%]">
          <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-white/55">
            {s.town}
          </p>
          <p className="mt-1.5 text-[13px] text-white/80 font-medium leading-snug">
            {s.category.split(" · ")[0]}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#13182A] via-transparent to-transparent" />
    </div>
  );
};

const SpotlightCard = ({ s, onOpen }: { s: Spotlight; onOpen: (s: Spotlight) => void }) => {
  const accent = accentHex(s.accent);
  const accentSoft = accentSoftRGBA(s.accent);

  return (
    <article
      className="snap-center shrink-0 w-[86vw] sm:w-[420px] md:w-[460px] group relative rounded-[26px] overflow-hidden bg-[#13182A] border border-white/[0.06] cursor-pointer"
      style={{ boxShadow: `0 30px 70px -30px ${accentSoft}` }}
      onClick={() => onOpen(s)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[26px] opacity-70"
        style={{
          padding: 1,
          background: `linear-gradient(135deg, ${accent}55, transparent 35%, transparent 65%, ${accent}55)`,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative">
        <TypographicHero s={s} size="card" />


        <div className="absolute top-3.5 right-3.5">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{ background: accent, color: "#0B0F19", boxShadow: `0 6px 18px -4px ${accentSoft}` }}
          >
            <BadgeCheck className="w-3 h-3" /> Featured
          </span>
        </div>
        <div className="absolute top-3.5 left-3.5">
          <StatusDot status={s.status} />
        </div>

        {s.event && (
          <div className="absolute bottom-3 left-3 right-3 rounded-2xl px-3 py-2 bg-black/55 backdrop-blur-md border border-white/15 flex items-center gap-2">
            <Music2 className="w-3.5 h-3.5 text-[#c9a449]" />
            <span className="text-[11px] font-semibold text-white truncate">{s.event.title}</span>
          </div>
        )}
      </div>

      <div className="relative p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/55">
          {s.category} · {s.town}
        </p>
        <h3 className="mt-1.5 text-[22px] font-semibold tracking-tight text-white leading-snug">{s.name}</h3>
        <p className="mt-2.5 text-sm text-white/65 font-light leading-relaxed line-clamp-2">{s.tagline}</p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-white/55">
            <Clock className="w-3 h-3" /> {s.hours}
          </span>
          <span
            className="inline-flex items-center gap-1 text-sm font-semibold transition"
            style={{ color: accent }}
          >
            View Profile
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
};

const ActionButton = ({
  action,
  accent,
  onTrack,
  variant = "secondary",
}: {
  action: PartnerAction;
  accent: string;
  onTrack: (k: ActionKey) => void;
  variant?: "primary" | "secondary";
}) => {
  const Icon = action.icon;
  const isPrimary = variant === "primary" || action.primary;
  const isInternal = action.href.startsWith("/");
  const className = isPrimary
    ? "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90 w-full sm:w-auto"
    : "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold border border-white/15 bg-white/[0.04] text-white/85 hover:border-white/35 hover:bg-white/[0.08] transition";
  const style = isPrimary ? { background: accent, color: "#0B0F19" } : undefined;
  const inner = (
    <>
      <Icon className="w-4 h-4" /> {action.label}
    </>
  );
  const onClick = () => onTrack(action.key);

  if (isInternal) {
    return (
      <Link to={action.href} onClick={onClick} className={className} style={style}>
        {inner}
      </Link>
    );
  }
  return (
    <a
      href={action.href}
      onClick={onClick}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noopener noreferrer" : undefined}
      className={className}
      style={style}
    >
      {inner}
    </a>
  );
};

const EventPromoOverlay = ({
  s,
  onContinue,
  onClose,
}: {
  s: Spotlight;
  onContinue: () => void;
  onClose: () => void;
}) => {
  if (!s.event) return null;
  const accent = accentHex(s.accent);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0E1220] via-[#13182A] to-[#1a1407] p-8 md:p-10"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition"
      >
        <X className="w-4 h-4" />
      </button>
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40"
        style={{ background: accent }}
      />
      <p className="text-[11px] uppercase tracking-[0.24em] font-semibold" style={{ color: accent }}>
        <Music2 className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" /> Live This Weekend · {s.name}
      </p>
      <h3 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.05] text-white">
        {s.event.title}
      </h3>
      <p className="mt-3 text-base text-white/70 font-light">{s.event.subtitle}</p>
      <p className="mt-2 text-sm text-white/55">{s.event.schedule}</p>

      <div className="mt-7 flex flex-wrap gap-2.5">
        {s.event.cta.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAction(s, i === 0 ? "reservation" : i === 1 ? "reservation" : "menu")}
            className={
              i === 0
                ? "inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition hover:opacity-90"
                : "inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-white/20 text-white/85 hover:border-white/40 transition"
            }
            style={i === 0 ? { background: accent, color: "#0B0F19" } : undefined}
          >
            {c.label}
          </a>
        ))}
      </div>

      <button
        onClick={onContinue}
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white transition"
      >
        See full venue profile <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const PremiumPartnerModal = ({
  spotlight,
  onClose,
}: {
  spotlight: Spotlight | null;
  onClose: () => void;
}) => {
  const [stage, setStage] = useState<"event" | "profile">("event");

  useEffect(() => {
    if (spotlight) {
      setStage(spotlight.event ? "event" : "profile");
      trackGAEvent.businessContactOpen(bizPayload(spotlight, `regional_spotlight_${spotlight.vertical}`));
    }
  }, [spotlight]);

  if (!spotlight) return null;
  const accent = accentHex(spotlight.accent);
  const onTrack = (k: ActionKey) => trackAction(spotlight, k);

  return (
    <Dialog open={!!spotlight} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl p-0 gap-0 border border-white/10 bg-[#0B0F19] text-white rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
        <AnimatePresence mode="wait">
          {stage === "event" && spotlight.event ? (
            <EventPromoOverlay
              key="event"
              s={spotlight}
              onContinue={() => setStage("profile")}
              onClose={onClose}
            />
          ) : (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative overflow-hidden">
                <TypographicHero s={spotlight} size="modal" />
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/85 hover:text-white hover:bg-black/60 flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-5 right-5">
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.16em]"
                    style={{ background: accent, color: "#0B0F19" }}
                  >
                    <BadgeCheck className="w-3 h-3" /> Featured Partner
                  </span>
                </div>
              </div>


              <div className="p-7 md:p-8 max-h-[70vh] overflow-y-auto">
                <p
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-2"
                  style={{ color: accent }}
                >
                  {spotlight.category}
                </p>
                <DialogTitle className="text-2xl md:text-[28px] font-semibold tracking-tight text-white leading-tight">
                  {spotlight.name}
                </DialogTitle>
                <DialogDescription className="mt-3 text-white/70 text-[15px] leading-relaxed">
                  {spotlight.bio}
                </DialogDescription>

                {/* Primary actions */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {spotlight.primaryActions.map((a) => (
                    <ActionButton key={a.key} action={a} accent={accent} onTrack={onTrack} variant="primary" />
                  ))}
                </div>

                {/* Quick info */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2.5 text-white/75">
                    <MapPin className="w-4 h-4 text-white/45" /> {spotlight.address}
                  </div>
                  <div className="flex items-center gap-2.5 text-white/75">
                    <Clock className="w-4 h-4 text-white/45" /> {spotlight.hours}
                  </div>
                  {spotlight.phone && (
                    <div className="flex items-center gap-2.5 text-white/75">
                      <Phone className="w-4 h-4 text-white/45" /> {spotlight.phone}
                    </div>
                  )}
                  {spotlight.email && (
                    <div className="flex items-center gap-2.5 text-white/75 truncate">
                      <Mail className="w-4 h-4 text-white/45 shrink-0" />
                      <span className="truncate">{spotlight.email}</span>
                    </div>
                  )}
                </div>

                {/* Secondary actions */}
                {spotlight.secondaryActions.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {spotlight.secondaryActions.map((a) => (
                      <ActionButton key={a.key} action={a} accent={accent} onTrack={onTrack} />
                    ))}
                  </div>
                )}

                {/* Specials / live updates */}
                {spotlight.specials && spotlight.specials.length > 0 && (
                  <div className="mt-7 pt-6 border-t border-white/10">
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/55 mb-3">
                      {spotlight.vertical === "restaurant" ? "Live Events & Specials" : "Current Offers"}
                    </p>
                    <ul className="space-y-2">
                      {spotlight.specials.map((sp) => (
                        <li key={sp} className="flex items-start gap-2 text-sm text-white/80">
                          <Sparkles className="w-3.5 h-3.5 mt-1 shrink-0" style={{ color: accent }} />
                          <span>{sp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Socials */}
                {(spotlight.socials.instagram ||
                  spotlight.socials.facebook ||
                  spotlight.socials.tiktok ||
                  spotlight.socials.linkedin) && (
                  <div className="mt-7 pt-6 border-t border-white/10">
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/55 mb-3">
                      Follow
                    </p>
                    <div className="flex items-center gap-2.5">
                      {spotlight.socials.instagram && (
                        <a
                          href={spotlight.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="w-11 h-11 rounded-full border border-white/15 text-white/80 hover:border-[#5eead4]/50 hover:text-[#5eead4] flex items-center justify-center transition"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {spotlight.socials.facebook && (
                        <a
                          href={spotlight.socials.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          className="w-11 h-11 rounded-full border border-white/15 text-white/80 hover:border-[#5eead4]/50 hover:text-[#5eead4] flex items-center justify-center transition"
                        >
                          <Facebook className="w-4 h-4" />
                        </a>
                      )}
                      {spotlight.socials.tiktok && (
                        <a
                          href={spotlight.socials.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="TikTok"
                          className="w-11 h-11 rounded-full border border-white/15 text-white/80 hover:border-[#5eead4]/50 hover:text-[#5eead4] flex items-center justify-center transition"
                        >
                          <TikTokIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

const RegionalSpotlights = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Spotlight | null>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section className="relative bg-[#0B0F19] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between gap-6 mb-9 md:mb-12 flex-wrap"
        >
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.24em] uppercase text-[#5eead4] mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Live Local Spotlights
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.05] text-white">
              The businesses bringing the Capital District to life
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/60 font-light leading-relaxed">
              Hand-picked premium partners — finance, food, and local services — with live events,
              reservations, and one-tap contact, all from one local front door.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-white/15 text-white/80 hover:border-[#5eead4]/50 hover:text-[#5eead4] transition flex items-center justify-center"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-white/15 text-white/80 hover:border-[#5eead4]/50 hover:text-[#5eead4] transition flex items-center justify-center"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <div
          ref={trackRef}
          className="-mx-5 sm:-mx-6 md:-mx-10 px-5 sm:px-6 md:px-10 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-3"
        >
          {SPOTLIGHTS.map((s) => (
            <SpotlightCard key={s.slug} s={s} onOpen={setOpen} />
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-white/55 font-light">
            Want your business featured here?{" "}
            <span className="text-white/80">This is what a live local placement looks like.</span>
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c9a449] text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition"
          >
            Become a Featured Partner <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <PremiumPartnerModal spotlight={open} onClose={() => setOpen(null)} />
      </div>
    </section>
  );
};

export default RegionalSpotlights;
