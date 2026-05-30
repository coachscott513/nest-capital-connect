import { useState } from "react";
import { ArrowRight, Sparkles, Newspaper, CalendarDays, Building2, Wallet, Compass, Store, MapPin, X, Phone, Globe, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import SpotlightSearch from "@/components/home/SpotlightSearch";
import FloatingOmniSearch from "@/components/home/FloatingOmniSearch";
import { localBusinessSchema } from "@/utils/seoSchemas";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

import heroTownsWide from "@/assets/hero-towns-wide.jpg";
import heroMediaWide from "@/assets/hero-media-wide.jpg";
import heroEventsWide from "@/assets/hero-events-wide.jpg";
import heroBusinessWide from "@/assets/hero-business-wide.jpg";
import heroFinanceWide from "@/assets/hero-finance-wide.jpg";
import heroOwnersWide from "@/assets/hero-owners-wide.jpg";
import heroDiscoveryWide from "@/assets/hero-discovery-wide.jpg";

/* =============================================================
   CAPITAL DISTRICT NEST — HOMEPAGE
   Apple-style cinematic product launch page.
   ============================================================= */

type CTA = { label: string; to?: string; onClick?: () => void };

type AppleHeroProps = {
  id?: string;
  eyebrow: string;
  EyebrowIcon?: React.ComponentType<{ className?: string }>;
  headline: React.ReactNode;
  sub: string;
  primary: CTA;
  secondary?: CTA;
  bgImage?: string;
  overlay?: "soft" | "strong" | "medium";
  glow?: "teal" | "violet" | "amber" | "graphite";
  align?: "center" | "left";
  liveBadge?: string;
  showRadar?: boolean;
  className?: string;
};

const GLOW_BG: Record<NonNullable<AppleHeroProps["glow"]>, string> = {
  teal:
    "radial-gradient(55% 55% at 50% 35%, rgba(94,234,212,0.10), transparent 65%), radial-gradient(45% 60% at 15% 85%, rgba(13,110,102,0.18), transparent 70%)",
  violet:
    "radial-gradient(55% 55% at 50% 30%, rgba(167,139,250,0.10), transparent 65%), radial-gradient(45% 60% at 80% 80%, rgba(94,234,212,0.10), transparent 70%)",
  amber:
    "radial-gradient(55% 55% at 50% 30%, rgba(201,168,76,0.10), transparent 65%), radial-gradient(45% 60% at 20% 80%, rgba(13,110,102,0.18), transparent 70%)",
  graphite:
    "radial-gradient(55% 55% at 50% 30%, rgba(255,255,255,0.05), transparent 65%), radial-gradient(45% 60% at 80% 80%, rgba(13,110,102,0.14), transparent 70%)",
};

function CTAButton({ cta, variant = "primary" }: { cta: CTA; variant?: "primary" | "secondary" }) {
  const className =
    variant === "primary"
      ? "inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition shadow-[0_12px_32px_-12px_rgba(13,110,102,0.6)]"
      : "inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.08] backdrop-blur text-white border border-white/20 text-sm font-semibold hover:bg-white/[0.16] transition";
  const content = (
    <>
      {cta.label}
      {variant === "primary" && <ArrowRight className="w-4 h-4" />}
    </>
  );
  if (cta.onClick) {
    return (
      <button type="button" onClick={cta.onClick} className={className}>
        {content}
      </button>
    );
  }
  return (
    <Link to={cta.to ?? "#"} className={className}>
      {content}
    </Link>
  );
}

function AppleHero({
  id, eyebrow, EyebrowIcon, headline, sub, primary, secondary,
  bgImage, overlay = "soft", glow = "teal", align = "center",
  liveBadge, showRadar, className = "",
}: AppleHeroProps) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left";
  const overlayGradient =
    overlay === "strong"
      ? "linear-gradient(to bottom, rgba(11,15,25,0.92) 0%, rgba(11,15,25,0.78) 45%, rgba(11,15,25,0.92) 100%)"
      : overlay === "medium"
      ? "linear-gradient(to bottom, rgba(11,15,25,0.85) 0%, rgba(11,15,25,0.62) 45%, rgba(11,15,25,0.90) 100%)"
      : "linear-gradient(to bottom, rgba(11,15,25,0.82) 0%, rgba(11,15,25,0.55) 45%, rgba(11,15,25,0.88) 100%)";

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06] ${className}`}
    >
      {bgImage ? (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
            aria-hidden
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: overlayGradient }} aria-hidden />
          {/* vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
            aria-hidden
          />
        </>
      ) : (
        <div className="absolute inset-0 pointer-events-none" style={{ background: GLOW_BG[glow] }} aria-hidden />
      )}

      {showRadar && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden>
          <div className="relative w-[520px] h-[520px] max-w-[80vw] max-h-[80vw] opacity-40">
            <span className="absolute inset-0 rounded-full border border-[#5eead4]/20 animate-[ping_3.5s_ease-out_infinite]" />
            <span className="absolute inset-[12%] rounded-full border border-[#5eead4]/15 animate-[ping_3.5s_ease-out_infinite] [animation-delay:.8s]" />
            <span className="absolute inset-[28%] rounded-full border border-[#5eead4]/10 animate-[ping_3.5s_ease-out_infinite] [animation-delay:1.6s]" />
            <span className="absolute inset-[44%] rounded-full bg-[#5eead4]/15 blur-2xl" />
          </div>
        </div>
      )}

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 md:px-10 min-h-[80svh] md:min-h-[88svh] flex items-center py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full max-w-4xl ${alignClasses}`}
        >
          <p className={`inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-[#5eead4] ${align === "center" ? "justify-center" : ""}`}>
            {EyebrowIcon && <EyebrowIcon className="w-3 h-3" />}
            {eyebrow}
          </p>
          {liveBadge && (
            <p className={`mt-3 inline-flex items-center gap-2 text-[10px] md:text-[11px] font-semibold tracking-wider uppercase text-white/70 px-3 py-1 rounded-full border border-[#5eead4]/30 bg-[#5eead4]/[0.06] ${align === "center" ? "" : ""}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5eead4] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5eead4]" />
              </span>
              {liveBadge}
            </p>
          )}
          <h2 className="mt-6 text-[2.5rem] sm:text-5xl md:text-[4.5rem] lg:text-[5.25rem] font-semibold tracking-[-0.04em] leading-[1.0] text-white">
            {headline}
          </h2>
          <p className={`mt-7 text-base md:text-xl text-white/75 font-light leading-relaxed max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
            {sub}
          </p>
          <div className={`mt-10 flex flex-wrap items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
            <CTAButton cta={primary} variant="primary" />
            {secondary && <CTAButton cta={secondary} variant="secondary" />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============== Hero 1 — Cinematic Search Hero ============== */
function CinematicHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0B0F19]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 35%, rgba(94,234,212,0.10), transparent 65%), radial-gradient(45% 60% at 15% 85%, rgba(13,110,102,0.18), transparent 70%), radial-gradient(40% 50% at 85% 15%, rgba(94,234,212,0.06), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
        aria-hidden
      />
      <div className="relative w-full min-h-[100svh] flex items-center">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto text-center"
          >
            <h1 className="text-[2.75rem] sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-semibold tracking-[-0.045em] leading-[0.98] text-white">
              Search anything{" "}
              <span className="bg-gradient-to-r from-white via-white to-[#5eead4] bg-clip-text text-transparent">
                local.
              </span>
            </h1>
            <p className="mt-6 md:mt-8 text-base md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              The digital front door of the Capital District — businesses, towns, events,
              services, media, homes, and local updates in one place.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 md:mt-14"
            >
              <SpotlightSearch />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                to="/local"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition shadow-[0_12px_32px_-12px_rgba(13,110,102,0.6)]"
              >
                Start Searching <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/communities"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] backdrop-blur text-white border border-white/20 text-sm font-semibold hover:bg-white/[0.12] transition"
              >
                Explore the Region
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============== Featured Partners Section ============== */
type Partner = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  promo?: string;
  website: string;
  phone?: string;
  initials: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string }[];
  accent: string;
};

const PARTNERS: Partner[] = [
  {
    id: "christie",
    name: "Christie Hoyt Mortgage Team",
    category: "Mortgage / Home Lending",
    tagline: "Local mortgage guidance before you make a move.",
    website: "https://www.broadviewfcu.com/personal/home-lending-solutions/meet-the-mortgage-team/christie-hoyt/",
    initials: "CH",
    primary: { label: "Connect with Christie", href: "https://www.broadviewfcu.com/personal/home-lending-solutions/meet-the-mortgage-team/christie-hoyt/" },
    secondary: [
      { label: "Apply Now", href: "https://www.broadviewfcu.com/personal/home-lending-solutions/" },
      { label: "Website", href: "https://www.broadviewfcu.com/" },
    ],
    accent: "from-[#0d6e66] to-[#5eead4]",
  },
  {
    id: "dglaw",
    name: "D&G Law",
    category: "Legal / Real Estate Attorney",
    tagline: "Real estate, business, and legal guidance for Capital District clients.",
    website: "https://www.dglawny.com/",
    initials: "DG",
    primary: { label: "Visit Website", href: "https://www.dglawny.com/" },
    secondary: [
      { label: "Contact", href: "https://www.dglawny.com/contact" },
    ],
    accent: "from-[#1e3a5f] to-[#5eead4]",
  },
  {
    id: "roosevelt",
    name: "Roosevelt Room",
    category: "Restaurant / Cocktails / Live Jazz",
    tagline: "Dinner, cocktails, and live jazz in the heart of the Capital District.",
    promo: "Live Jazz Friday & Saturday Nights",
    website: "https://rooseveltroom.com/",
    initials: "RR",
    primary: { label: "Reservations", href: "https://rooseveltroom.com/" },
    secondary: [
      { label: "Menu", href: "https://rooseveltroom.com/menu" },
      { label: "Website", href: "https://rooseveltroom.com/" },
    ],
    accent: "from-[#5c2018] to-[#c9a449]",
  },
];

function FeaturedPartnersSection({ onOpen }: { onOpen: (p: Partner) => void }) {
  return (
    <section
      id="featured-partners"
      className="relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06] scroll-mt-24"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: GLOW_BG.amber }}
        aria-hidden
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#c9a449]">
            Premium Showcase
          </p>
          <h2 className="mt-5 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.05] text-white">
            Featured local <span className="text-[#5eead4]">partners.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/70 font-light">
            A curated set of premium Capital District businesses. Tap any partner to see profile,
            contact, and one-tap actions.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {PARTNERS.map((p) => (
            <button
              key={p.id}
              onClick={() => onOpen(p)}
              className="group text-left rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#5eead4]/40 transition overflow-hidden flex flex-col"
            >
              <div className={`relative h-44 bg-gradient-to-br ${p.accent} flex items-center justify-center`}>
                <span className="text-5xl font-semibold tracking-tight text-white/90 drop-shadow">{p.initials}</span>
                {p.promo && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/40 backdrop-blur text-[10px] font-semibold tracking-wider uppercase text-white border border-white/20">
                    {p.promo}
                  </span>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#5eead4]">{p.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{p.name}</h3>
                <p className="mt-3 text-sm text-white/65 flex-1">{p.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#5eead4] transition">
                  View profile <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/local" className="text-sm text-white/60 hover:text-white transition underline-offset-4 hover:underline">
            Explore full business directory →
          </Link>
        </div>
      </div>
    </section>
  );
}

function PartnerModal({ partner, onClose }: { partner: Partner | null; onClose: () => void }) {
  if (!partner) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0B0F19] border border-white/10 overflow-hidden">
        <div className={`relative h-44 bg-gradient-to-br ${partner.accent} flex items-center justify-center`}>
          <span className="text-6xl font-semibold tracking-tight text-white/90 drop-shadow">{partner.initials}</span>
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-7 md:p-9">
          {partner.promo && (
            <div className="mb-5 px-4 py-3 rounded-2xl bg-[#c9a449]/[0.12] border border-[#c9a449]/30 text-[#c9a449] text-sm font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {partner.promo}
            </div>
          )}
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5eead4]">{partner.category}</p>
          <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-white">{partner.name}</h3>
          <p className="mt-4 text-white/70 leading-relaxed">{partner.tagline}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={partner.primary.href} target="_blank" rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition">
              {partner.primary.label} <ArrowRight className="w-4 h-4" />
            </a>
            {partner.secondary.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.08] border border-white/20 text-white text-sm font-semibold hover:bg-white/[0.16] transition">
                {s.label}
              </a>
            ))}
          </div>

          <div className="mt-7 pt-6 border-t border-white/10 flex flex-wrap gap-4 text-sm text-white/60">
            <a href={partner.website} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 hover:text-white transition">
              <Globe className="w-4 h-4" /> {new URL(partner.website).hostname.replace("www.", "")}
            </a>
            {partner.phone && (
              <a href={`tel:${partner.phone}`} className="inline-flex items-center gap-2 hover:text-white transition">
                <Phone className="w-4 h-4" /> {partner.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============== Talk-to-a-Local-Expert Modal ============== */
const FIN_OPTIONS = [
  "Mortgage", "Business Banking", "Investing", "Tax Strategy", "Accounting",
  "Insurance", "Wealth Planning", "Business Capital", "Other",
];

function FinanceExpertModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", need: FIN_OPTIONS[0], message: "",
  });

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast({ title: "Missing info", description: "Name, email, and phone are required.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      full_name: form.name,
      email: form.email,
      phone: form.phone,
      type: "finance_expert",
      message: `Need: ${form.need}\n\n${form.message}`,
      lead_type: "finance",
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0B0F19] border border-white/10 p-7 md:p-9">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white">
          <X className="w-4 h-4" />
        </button>
        {done ? (
          <div className="text-center py-6">
            <h3 className="text-2xl font-semibold text-white">Thank you — we'll reach out shortly.</h3>
            <p className="mt-3 text-white/65">A local financial expert will follow up via phone or email.</p>
            <button onClick={onClose} className="mt-7 px-6 py-3 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight text-white">What financial help do you need?</h3>
            <p className="text-sm text-white/60">Tell us what you're working on. We'll connect you with the right local expert.</p>
            <ModalField label="Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <div className="grid grid-cols-2 gap-3">
              <ModalField label="Email *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <ModalField label="Phone *" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            </div>
            <label className="block">
              <span className="text-xs font-semibold tracking-wider uppercase text-white/60">What do you need help with?</span>
              <select
                value={form.need}
                onChange={(e) => setForm({ ...form, need: e.target.value })}
                className="mt-2 w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#5eead4] transition"
              >
                {FIN_OPTIONS.map((o) => (
                  <option key={o} value={o} className="bg-[#0B0F19]">{o}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold tracking-wider uppercase text-white/60">Message / details</span>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="mt-2 w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#5eead4] transition"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {submitting ? "Submitting…" : "Submit Request"} <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-center text-white/50">
              Prefer to speak now? <Link to="/contact" className="text-[#5eead4] hover:underline">Contact us directly</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function ModalField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold tracking-wider uppercase text-white/60">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#5eead4] transition"
      />
    </label>
  );
}

/* ============== PAGE ============== */
const Index = () => {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [financeOpen, setFinanceOpen] = useState(false);

  const useNearMe = () => {
    if (typeof window === "undefined") return;
    if (!("geolocation" in navigator)) {
      window.location.href = "/local?near=1";
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        window.location.href = `/local?near=1&lat=${latitude.toFixed(5)}&lng=${longitude.toFixed(5)}`;
      },
      () => { window.location.href = "/local?near=1"; },
      { maximumAge: 60_000, timeout: 8000 }
    );
  };

  const scrollTo = (id: string) => () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <SEOHead
        title="Capital District Nest | Search Anything Local in the Capital District"
        description="Capital District Nest is the digital front door of the Capital District. Search local businesses, homes, restaurants, services, events, towns, and community updates in one place."
        keywords="Capital District, search anything local, local businesses Albany NY, Capital District restaurants, Capital District events, Capital District towns, Capital District homes, Saratoga, Troy NY, Schenectady"
        structuredData={localBusinessSchema}
      />
      <CleanHeader />
      <FloatingOmniSearch />

      {/* HERO 1 — Search anything local */}
      <CinematicHero />

      {/* HERO 2 — Find what's near you (live local discovery) */}
      <AppleHero
        eyebrow="Live Local Discovery"
        EyebrowIcon={MapPin}
        liveBadge="Live local discovery"
        headline={<>Find what's <span className="text-[#5eead4]">near you.</span></>}
        sub="Tap once and discover restaurants, events, services, and businesses around you right now."
        primary={{ label: "Use Near Me", onClick: useNearMe }}
        secondary={{ label: "Browse Categories", to: "/local#categories" }}
        bgImage={heroDiscoveryWide}
        overlay="medium"
        showRadar
      />

      {/* HERO 3 — Local media pulse */}
      <AppleHero
        eyebrow="Local Media Pulse"
        EyebrowIcon={Newspaper}
        headline={<>Today's local coverage, <span className="text-[#5eead4]">curated.</span></>}
        sub="Business openings, restaurants, development, sports, events, and neighborhood stories from trusted local sources."
        primary={{ label: "Watch Coverage", to: "/media#featured" }}
        secondary={{ label: "View Local Media", to: "/media#sources" }}
        bgImage={heroMediaWide}
        overlay="medium"
      />

      {/* HERO 4 — Plan the week */}
      <AppleHero
        eyebrow="This Week"
        EyebrowIcon={CalendarDays}
        headline={<>Plan the week <span className="text-[#5eead4]">in one place.</span></>}
        sub="Concerts, restaurant weeks, markets, openings, family events, networking, and local specials."
        primary={{ label: "See This Week", to: "/weekly" }}
        secondary={{ label: "Submit Event", to: "/submit-event" }}
        bgImage={heroEventsWide}
        overlay="soft"
      />

      {/* HERO 5 — Discover every town */}
      <AppleHero
        eyebrow="Every Town"
        EyebrowIcon={Compass}
        headline={<>Discover every <span className="text-[#5eead4]">town.</span></>}
        sub="Explore Delmar, Albany, Troy, Saratoga Springs, Clifton Park, Schenectady, and more through one local discovery layer."
        primary={{ label: "Browse Towns", to: "/communities" }}
        secondary={{ label: "Search Near Me", onClick: useNearMe }}
        bgImage={heroTownsWide}
        overlay="soft"
      />

      {/* HERO 6 — Local businesses, brought to life */}
      <AppleHero
        eyebrow="Featured Local Partners"
        EyebrowIcon={Store}
        headline={<>Local businesses, <span className="text-[#5eead4]">brought to life.</span></>}
        sub="Premium profiles with photos, events, menus, reservations, social links, and one-tap contact."
        primary={{ label: "View Featured Partners", onClick: scrollTo("featured-partners") }}
        secondary={{ label: "For Businesses", to: "/claim-business" }}
        bgImage={heroBusinessWide}
        overlay="soft"
      />

      {/* Featured Partners showcase */}
      <FeaturedPartnersSection onOpen={setPartner} />

      {/* HERO 7 — Finances */}
      <AppleHero
        eyebrow="Finances"
        EyebrowIcon={Wallet}
        headline={<>Local financial help, <span className="text-[#5eead4]">connected.</span></>}
        sub="Mortgages, business banking, investing, tax strategy, accounting, insurance, and wealth planning from regional professionals."
        primary={{ label: "Explore Finances", to: "/finances" }}
        secondary={{ label: "Talk to a Local Expert", onClick: () => setFinanceOpen(true) }}
        bgImage={heroFinanceWide}
        overlay="strong"
      />

      {/* HERO 8 — Business owners */}
      <AppleHero
        eyebrow="For Local Business Owners"
        EyebrowIcon={Building2}
        headline={
          <>Your business is already searchable.<br className="hidden sm:block" />{" "}
            <span className="text-[#5eead4]">Now make it interactive.</span>
          </>
        }
        sub="Claim your profile, add photos, specials, events, social links, menus, booking options, and one-tap contact actions."
        primary={{ label: "Claim Your Profile", to: "/claim-business" }}
        secondary={{ label: "See Premium Options", to: "/pricing" }}
        bgImage={heroOwnersWide}
        overlay="strong"
      />

      <PartnerModal partner={partner} onClose={() => setPartner(null)} />
      <FinanceExpertModal open={financeOpen} onClose={() => setFinanceOpen(false)} />

      <Footer />
    </div>
  );
};

export default Index;
