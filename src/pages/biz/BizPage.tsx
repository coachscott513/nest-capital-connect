import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Phone,
  Globe,
  MapPin,
  Share2,
  Star,
  Clock,
  Sparkles,
  Crown,
  ArrowRight,
  CheckCircle2,
  Instagram,
  Facebook,
  Linkedin,
  Building2,
  Mail,
  MessageSquare,
  Youtube,
  LogIn,
} from "lucide-react";
import { z } from "zod";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const TEAL = "#5eead4";
const GOLD = "#c9a449";
const PLATINUM = "#e5e4e2";

type Business = {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  description?: string | null;
  long_description?: string | null;
  category?: string | null;
  town_name?: string | null;
  town_slug?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  hours?: Record<string, string> | null;
  rating?: number | null;
  review_count?: number | null;
  photos?: string[] | null;
  hero_image_url?: string | null;
  logo_url?: string | null;
  video_url?: string | null;
  menu_url?: string | null;
  services?: Array<{ name: string; price?: string; description?: string }> | null;
  plan_tier: string;
  is_claimed?: boolean | null;
  is_active?: boolean | null;
  latitude?: number | null;
  longitude?: number | null;
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  tiktok?: string | null;
  x_url?: string | null;
};

type Special = {
  id: string;
  headline: string;
  description?: string | null;
  image_url?: string | null;
  cta_url?: string | null;
  cta_label?: string | null;
  start_date?: string | null;
  end_date?: string | null;
};

// Routing tiers. DB stores `free_claimed | featured | spotlight | premium_partner`.
// We accept the shorter aliases (`free`, `anchor`) for forward-compat.
const PREMIUM_TIERS = new Set(["spotlight", "anchor", "premium_partner"]);
const FEATURED_TIERS = new Set(["featured"]);
const normalizeTier = (t?: string | null) => {
  const v = (t || "free_claimed").toLowerCase();
  if (v === "free" || v === "free_claimed" || v === "unclaimed") return "free_claimed";
  if (v === "anchor" || v === "premium_partner") return "anchor";
  if (v === "spotlight") return "spotlight";
  if (v === "featured") return "featured";
  return "free_claimed";
};

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(7, "Phone required").max(30),
  message: z.string().trim().min(1, "Message required").max(1000),
});

function getEmbedUrl(url?: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname === "youtu.be") return `https://www.youtube.com/embed${u.pathname}`;
    if (u.hostname.includes("vimeo.com")) return `https://player.vimeo.com/video${u.pathname}`;
    if (u.hostname.includes("tiktok.com")) return url;
    return url;
  } catch {
    return null;
  }
}

const TierBadge = ({ tier }: { tier: string }) => {
  if (tier === "anchor") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0F19]"
        style={{ background: PLATINUM }}
      >
        <Crown className="w-3 h-3" /> Anchor Partner
      </span>
    );
  }
  if (tier === "spotlight") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0F19]"
        style={{ background: GOLD }}
      >
        <Sparkles className="w-3 h-3" /> Spotlight Member
      </span>
    );
  }
  if (tier === "featured") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0F19]"
        style={{ background: TEAL }}
      >
        <Star className="w-3 h-3 fill-current" /> Featured
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 border border-white/15 bg-white/[0.04]">
      <Building2 className="w-3 h-3" /> Listed
    </span>
  );
};

const fmtAddress = (b: Business) =>
  [b.address, b.city || b.town_name, b.state].filter(Boolean).join(", ");

const ActionChips = ({
  biz,
  directionsHref,
  onShare,
}: {
  biz: Business;
  directionsHref: string | null;
  onShare: () => void;
}) => {
  const telHref = biz.phone ? `tel:${biz.phone.replace(/[^\d+]/g, "")}` : null;
  const smsHref = biz.phone ? `sms:${biz.phone.replace(/[^\d+]/g, "")}` : null;
  return (
    <div className="mt-7 flex flex-wrap gap-2.5">
      {telHref && (
        <a href={telHref} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition">
          <Phone className="w-4 h-4" /> Call
        </a>
      )}
      {smsHref && (
        <a href={smsHref} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition">
          <MessageSquare className="w-4 h-4" /> Text
        </a>
      )}
      {biz.email && (
        <a href={`mailto:${biz.email}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition">
          <Mail className="w-4 h-4" /> Email
        </a>
      )}
      {directionsHref && (
        <a href={directionsHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition">
          <MapPin className="w-4 h-4" /> Directions
        </a>
      )}
      {biz.website && (
        <a href={biz.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition">
          <Globe className="w-4 h-4" /> Website
        </a>
      )}
      {biz.menu_url && (
        <a href={biz.menu_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition">
          <ArrowRight className="w-4 h-4" /> Menu
        </a>
      )}
      <button type="button" onClick={onShare} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition">
        <Share2 className="w-4 h-4" /> Share
      </button>
    </div>
  );
};

// Always-rendered Digital Channels block. Shows active icons when present,
// or a tasteful claim prompt when missing — never an empty section.
const DigitalChannels = ({ biz }: { biz: Business }) => {
  const channels = [
    { url: biz.instagram, Icon: Instagram, label: "Instagram" },
    { url: biz.facebook, Icon: Facebook, label: "Facebook" },
    { url: biz.linkedin, Icon: Linkedin, label: "LinkedIn" },
    { url: biz.tiktok, Icon: MessageSquare, label: "TikTok" },
    { url: biz.x_url, Icon: MessageSquare, label: "X" },
    { url: biz.video_url, Icon: Youtube, label: "YouTube" },
  ].filter((c) => c.url);

  return (
    <article>
      <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-4" style={{ color: TEAL }}>
        Digital Channels
      </p>
      {channels.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {channels.map(({ url, Icon, label }) => (
            <a key={label} href={url as string} target="_blank" rel="noreferrer" aria-label={label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-white/80 hover:text-white hover:border-white/25 transition text-sm">
              <Icon className="w-4 h-4" /> {label}
            </a>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 text-sm text-white/65 font-light leading-relaxed">
          Social links pending.{" "}
          <Link to={`/claim-business?slug=${biz.slug}`} className="text-white font-semibold hover:opacity-70 underline underline-offset-4">
            Claim this profile
          </Link>{" "}
          to add active channels.
        </div>
      )}
    </article>
  );
};


const HoursBlock = ({ hours }: { hours: Record<string, string> }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
    <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-4 inline-flex items-center gap-1.5" style={{ color: TEAL }}>
      <Clock className="w-3.5 h-3.5" /> Hours
    </p>
    <ul className="space-y-1.5 text-sm">
      {Object.entries(hours).map(([day, h]) => (
        <li key={day} className="flex items-center justify-between text-white/70">
          <span className="capitalize">{day}</span>
          <span className="text-white/55">{h as string}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ClaimCard = ({ biz }: { biz: Business }) => (
  <div
    className="rounded-2xl border p-6 backdrop-blur-xl"
    style={{ borderColor: "rgba(94,234,212,0.25)", background: "rgba(94,234,212,0.05)" }}
  >
    <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-3" style={{ color: TEAL }}>
      Own this business?
    </p>
    <h3 className="text-lg font-semibold text-white tracking-[-0.01em]">
      Claim & upgrade your listing
    </h3>
    <p className="mt-2 text-sm text-white/65 font-light leading-relaxed">
      Add photos, a description, specials, and a video showcase. Stand out across search and town pages.
    </p>
    <Link
      to={`/claim-business?slug=${biz.slug}&tier=featured`}
      className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition w-full"
    >
      Claim This Business <ArrowRight className="w-4 h-4" />
    </Link>
    <Link
      to={`/partner-auth?slug=${biz.slug}`}
      className="mt-2.5 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition w-full"
    >
      <LogIn className="w-4 h-4" /> Owner Login
    </Link>
    <Link
      to="/pricing"
      className="mt-2.5 inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 hover:text-white transition w-full"
    >
      See plans →
    </Link>
  </div>
);

// ──────────────────────────────────────────────────────────────
//  FREE / UNCLAIMED PROFILE
// ──────────────────────────────────────────────────────────────
const FreeProfile = ({ biz }: { biz: Business }) => {
  const fullAddress = fmtAddress(biz);
  const directionsHref = fullAddress
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`
    : null;
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: biz.name, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    }
  };

  return (
    <>
      <section className="px-6 md:px-10 pt-28 md:pt-32 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <TierBadge tier={biz.plan_tier} />
            {biz.category && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                {biz.category}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-white leading-[1.05]">
            {biz.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-white/65">
            {biz.rating && (
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-current" style={{ color: GOLD }} />
                <span className="text-white font-semibold">{biz.rating.toFixed(1)}</span>
                {biz.review_count ? <span className="text-white/45">({biz.review_count})</span> : null}
              </span>
            )}
            {biz.town_name && <span>{biz.town_name}, NY</span>}
          </div>
          <ActionChips biz={biz} directionsHref={directionsHref} onShare={handleShare} />
        </div>
      </section>

      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 space-y-4">
              {fullAddress && (
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-white/45 shrink-0" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45 mb-1">Address</p>
                    <p className="text-white/85">{fullAddress}</p>
                  </div>
                </div>
              )}
              {biz.phone && (
                <div className="flex items-start gap-3 text-sm">
                  <Phone className="w-4 h-4 mt-0.5 text-white/45 shrink-0" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45 mb-1">Phone</p>
                    <a href={`tel:${biz.phone.replace(/[^\d+]/g, "")}`} className="text-white/85 hover:text-white">{biz.phone}</a>
                  </div>
                </div>
              )}
              {biz.website && (
                <div className="flex items-start gap-3 text-sm">
                  <Globe className="w-4 h-4 mt-0.5 text-white/45 shrink-0" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45 mb-1">Website</p>
                    <a href={biz.website} target="_blank" rel="noreferrer" className="text-white/85 hover:text-white break-all">{biz.website.replace(/^https?:\/\//, "")}</a>
                  </div>
                </div>
              )}
            </div>

            {biz.description ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-3" style={{ color: TEAL }}>About</p>
                <p className="text-[15px] text-white/75 font-light leading-relaxed">{biz.description}</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-3" style={{ color: TEAL }}>About</p>
                <p className="text-[15px] text-white/75 font-light leading-relaxed">
                  {biz.name} is listed in the Capital District Nest local business index for {biz.town_name || biz.city || "the Capital District"}, NY. This profile includes available contact details, business category information, and local discovery tools. Business owners can claim this profile to add photos, social links, hours, specials, and updates.
                </p>
              </div>
            )}

            <DigitalChannels biz={biz} />
          </div>

          <aside className="space-y-5">
            {biz.hours && Object.keys(biz.hours).length > 0 && <HoursBlock hours={biz.hours} />}
            <ClaimCard biz={biz} />
          </aside>
        </div>
      </section>
    </>
  );
};

// ──────────────────────────────────────────────────────────────
//  FEATURED PROFILE
// ──────────────────────────────────────────────────────────────
const FeaturedProfile = ({ biz }: { biz: Business }) => {
  const fullAddress = fmtAddress(biz);
  const directionsHref = fullAddress
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`
    : null;
  const gallery = (biz.photos || []).slice(0, 10);
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) { try { await navigator.share({ title: biz.name, url }); } catch {} }
    else { await navigator.clipboard.writeText(url); toast.success("Link copied"); }
  };

  return (
    <>
      {gallery[0] && (
        <section className="relative w-full">
          <div className="relative w-full aspect-[21/9] md:aspect-[21/8] overflow-hidden bg-black">
            <img src={gallery[0]} alt={biz.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
          </div>
        </section>
      )}

      <section className={`px-6 md:px-10 ${gallery[0] ? "-mt-24 md:-mt-28 relative z-10" : "pt-28"}`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <TierBadge tier={biz.plan_tier} />
            {biz.category && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">{biz.category}</span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-white leading-[1.04]">{biz.name}</h1>
          {biz.tagline && <p className="mt-3 text-lg text-white/65 font-light">{biz.tagline}</p>}
          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-white/65">
            {biz.rating && (
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-current" style={{ color: GOLD }} />
                <span className="text-white font-semibold">{biz.rating.toFixed(1)}</span>
                {biz.review_count ? <span className="text-white/45">({biz.review_count})</span> : null}
              </span>
            )}
            {fullAddress && <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {fullAddress}</span>}
          </div>
          <ActionChips biz={biz} directionsHref={directionsHref} onShare={handleShare} />
        </div>
      </section>

      <section className="px-6 md:px-10 py-14 md:py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <div className="space-y-10">
            {(biz.long_description || biz.description) && (
              <article>
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-4" style={{ color: TEAL }}>About</p>
                <div className="text-[15px] text-white/75 font-light leading-[1.75] whitespace-pre-wrap">
                  {biz.long_description || biz.description}
                </div>
              </article>
            )}

            {gallery.length > 1 && (
              <article>
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-5" style={{ color: TEAL }}>Gallery</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gallery.slice(1).map((src, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                      <img src={src} alt={`${biz.name} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              </article>
            )}

            <DigitalChannels biz={biz} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {biz.hours && Object.keys(biz.hours).length > 0 && <HoursBlock hours={biz.hours} />}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
              <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-3" style={{ color: TEAL }}>Want more?</p>
              <p className="text-sm text-white/65 font-light leading-relaxed">
                Upgrade to <span className="text-white font-semibold">Spotlight</span> to unlock a cinematic microsite, video showcase, unlimited gallery, and embedded lead form.
              </p>
              <Link to="/pricing"
                className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition w-full">
                Explore Spotlight <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

// ──────────────────────────────────────────────────────────────
//  SPOTLIGHT / ANCHOR PREMIUM MICROSITE
// ──────────────────────────────────────────────────────────────
const PremiumMicrosite = ({ biz, specials }: { biz: Business; specials: Special[] }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const heroMedia = getEmbedUrl(biz.video_url);
  const heroImage = biz.hero_image_url || biz.photos?.[0];
  const gallery = (biz.photos || []).slice(0, 24);
  const fullAddress = fmtAddress(biz);
  const directionsHref = fullAddress
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`
    : null;
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) { try { await navigator.share({ title: biz.name, url }); } catch {} }
    else { await navigator.clipboard.writeText(url); toast.success("Link copied"); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setSubmitting(true);
    const { error } = await supabase.from("leads").insert([{
      full_name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: `[${biz.name}] ${parsed.data.message}`,
      type: "business_inquiry",
      lead_type: "business_inquiry",
      origin_town: biz.town_name || biz.town_slug || null,
      location: fullAddress || null,
    }]);
    setSubmitting(false);
    if (error) { toast.error("Could not send. Please try again."); return; }
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    toast.success("Message sent — we'll be in touch.");
  };


  return (
    <>
      <section className="relative w-full">
        <div className="relative w-full aspect-[21/9] md:aspect-[21/8] overflow-hidden bg-black">
          {heroMedia ? (
            <iframe src={heroMedia} className="absolute inset-0 w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={`${biz.name} video`} />
          ) : heroImage ? (
            <img src={heroImage} alt={biz.name} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#101422] to-[#0B0F19]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
        </div>
      </section>

      <section className="px-6 md:px-10 -mt-24 md:-mt-28 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <TierBadge tier={biz.plan_tier} />
            {biz.category && <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">{biz.category}</span>}
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.02]">{biz.name}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-white/65">
            {biz.rating && (
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-current" style={{ color: GOLD }} />
                <span className="text-white font-semibold">{biz.rating.toFixed(1)}</span>
                {biz.review_count ? <span className="text-white/45">({biz.review_count})</span> : null}
              </span>
            )}
            {fullAddress && <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {fullAddress}</span>}
          </div>
          <ActionChips biz={biz} directionsHref={directionsHref} onShare={handleShare} />
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14">
          <div className="space-y-14">
            {(biz.long_description || biz.description) && (
              <article>
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-4" style={{ color: TEAL }}>Our Story</p>
                <div className="text-[15px] md:text-base text-white/75 font-light leading-[1.75] whitespace-pre-wrap">{biz.long_description || biz.description}</div>
              </article>
            )}

            {gallery.length > 0 && (
              <article>
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-5" style={{ color: TEAL }}>Gallery</p>
                <div className="columns-2 md:columns-3 gap-3 [column-fill:_balance]">
                  {gallery.map((src, i) => (
                    <div key={i} className="mb-3 break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                      <img src={src} alt={`${biz.name} ${i + 1}`} className="w-full h-auto object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              </article>
            )}

            {specials.length > 0 && (
              <article>
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-5" style={{ color: GOLD }}>Current Specials</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specials.map((s) => (
                    <div key={s.id} className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-white/20 transition">
                      {s.image_url && (
                        <div className="aspect-[16/10] overflow-hidden bg-black">
                          <img src={s.image_url} alt={s.headline} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="text-base font-semibold text-white">{s.headline}</h3>
                        {s.description && <p className="mt-2 text-sm text-white/65 font-light leading-relaxed">{s.description}</p>}
                        {s.cta_url && (
                          <a href={s.cta_url} target="_blank" rel="noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] hover:opacity-70 transition" style={{ color: GOLD }}>
                            {s.cta_label || "View Special"} <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}

            {((biz.services && biz.services.length > 0) || biz.menu_url) && (
              <article>
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-5" style={{ color: TEAL }}>Services & Menu</p>
                {biz.services && biz.services.length > 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl divide-y divide-white/[0.06]">
                    {biz.services.map((srv, i) => (
                      <div key={i} className="flex items-start justify-between gap-6 p-5">
                        <div>
                          <h4 className="text-[15px] font-semibold text-white">{srv.name}</h4>
                          {srv.description && <p className="mt-1 text-sm text-white/55 font-light">{srv.description}</p>}
                        </div>
                        {srv.price && <span className="text-base font-semibold text-white whitespace-nowrap">{srv.price}</span>}
                      </div>
                    ))}
                  </div>
                )}
                {biz.menu_url && (
                  <a href={biz.menu_url} target="_blank" rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition" style={{ color: TEAL }}>
                    View full menu <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </article>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
              <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-3" style={{ color: TEAL }}>Contact & Inquire</p>
              <h3 className="text-xl font-semibold text-white tracking-[-0.01em]">Get in touch with {biz.name.split(" ")[0]}</h3>
              {submitted ? (
                <div className="mt-6 flex items-start gap-3 text-sm text-white/75">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: TEAL }} />
                  <p>Message sent. They'll be in touch shortly.</p>
                </div>
              ) : (
                <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
                  <input type="text" required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/30 transition" />
                  <input type="tel" required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/30 transition" />
                  <input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/30 transition" />
                  <textarea required rows={4} placeholder="How can we help?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/30 transition resize-none" />
                  <button type="submit" disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition disabled:opacity-50">
                    {submitting ? "Sending…" : "Send Inquiry"} <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {biz.hours && Object.keys(biz.hours).length > 0 && <HoursBlock hours={biz.hours} />}

            {biz.latitude && biz.longitude && (
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                <iframe title={`${biz.name} map`}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${biz.longitude - 0.01}%2C${biz.latitude - 0.005}%2C${biz.longitude + 0.01}%2C${biz.latitude + 0.005}&layer=mapnik&marker=${biz.latitude}%2C${biz.longitude}`}
                  className="w-full h-48" loading="lazy" />
              </div>
            )}

            <DigitalChannels biz={biz} />
          </aside>
        </div>
      </section>
    </>
  );
};

// ──────────────────────────────────────────────────────────────
//  ROUTER COMPONENT
// ──────────────────────────────────────────────────────────────
const titleizeSlug = (s: string) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const SLUG_ALIASES: Record<string, string> = {
  "the-perfect-blend-cafe": "perfect-blend-cafe-bakery-delmar",
  "perfect-blend": "perfect-blend-cafe-bakery-delmar",
  "mccarrolls-the-village-butcher": "mccarrolls-village-butcher-delmar",
};

const canonicalizeRequestedSlug = (value?: string) => {
  const clean = (value || "").trim().toLowerCase();
  return SLUG_ALIASES[clean] || clean;
};

const buildPlaceholderBusiness = (slug: string): Business => ({
  id: `placeholder-${slug}`,
  slug,
  name: titleizeSlug(slug),
  description: null,
  category: "Local Business",
  town_name: null,
  state: "NY",
  plan_tier: "free_claimed",
  is_active: true,
});

const NotFoundBiz = ({ slug }: { slug: string }) => {
  const guess = titleizeSlug(slug);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Business Not Found | Capital District Nest</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`https://www.capitaldistrictnest.com/biz/${slug}`} />
      </Helmet>
      <CleanHeader />
      <section className="px-6 md:px-10 pt-28 md:pt-32 pb-20 max-w-3xl mx-auto">
        <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-4 text-white/55">404 · Listing Unavailable</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-white leading-[1.05]">
          We couldn't find "{guess}"
        </h1>
        <p className="mt-5 text-[15px] text-white/70 font-light leading-relaxed">
          This profile may have been removed, renamed, or is not yet listed in the Capital District Nest local business index. Browse our active local directory or claim a business profile to get listed across the Capital District.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/local" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition">
            Browse Local Directory <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/claim-business" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition">
            Claim or Add a Business
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const BizPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [biz, setBiz] = useState<Business | null>(null);
  const [specials, setSpecials] = useState<Special[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setNotFound(false);
      setBiz(null);
      setSpecials([]);
      const canonicalSlug = canonicalizeRequestedSlug(slug);
      const requestedSlugs = Array.from(new Set([slug.toLowerCase(), canonicalSlug].filter(Boolean)));
      const { data, error } = await supabase
        .from("businesses").select("*").in("slug", requestedSlugs).eq("is_active", true).limit(2);
      if (cancelled) return;
      const row = (data || []).find((item: any) => item.slug === canonicalSlug) || data?.[0];
      if (error || !row) { setNotFound(true); setLoading(false); return; }
      const raw = row as unknown as Business;
      const b: Business = { ...raw, plan_tier: normalizeTier(raw.plan_tier) };
      setBiz(b);
      if (PREMIUM_TIERS.has(b.plan_tier)) {
        const { data: sp } = await supabase
          .from("business_specials")
          .select("id, headline, description, image_url, cta_url, cta_label, start_date, end_date")
          .eq("business_id", b.id).eq("is_active", true)
          .order("display_order", { ascending: true });
        if (cancelled) return;
        setSpecials((sp as Special[]) ?? []);
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [slug]);

  // Real 404 once we've confirmed the slug doesn't resolve.
  if (!loading && (notFound || !biz)) {
    return <NotFoundBiz slug={slug || ""} />;
  }

  // During loading, render the full Free profile shell using a slug-derived
  // placeholder so Googlebot never sees an empty "Loading…" page.
  const placeholderSlug = canonicalizeRequestedSlug(slug || "business");
  const activeBiz: Business = biz ?? buildPlaceholderBusiness(placeholderSlug);
  const tier = activeBiz.plan_tier;
  const isPremium = !loading && PREMIUM_TIERS.has(tier);
  const isFeatured = !loading && FEATURED_TIERS.has(tier);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {(() => {
        const biz = activeBiz;
        const town = biz.town_name || biz.city || "Capital District";
        const url = `https://www.capitaldistrictnest.com/biz/${biz.slug}`;
        const fallbackDesc = `Find ${biz.name} in ${town}, NY on Capital District Nest. View contact details, website, directions, business category, and claim this profile to add photos, social links, specials, and updates.`;
        const desc =
          biz.tagline ||
          biz.description?.slice(0, 155) ||
          fallbackDesc;
        const title = `${biz.name} | ${town}, NY | Capital District Nest`;
        const image = biz.hero_image_url || biz.photos?.[0] || biz.logo_url || undefined;
        const ldBusiness: Record<string, unknown> = {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: biz.name,
          url,
          ...(image && { image }),
          ...(biz.description && { description: biz.description }),
          ...(biz.phone && { telephone: biz.phone }),
          ...(biz.email && { email: biz.email }),
          ...(biz.website && { sameAs: [biz.website, biz.facebook, biz.instagram, biz.linkedin].filter(Boolean) }),
          address: {
            "@type": "PostalAddress",
            ...(biz.address && { streetAddress: biz.address }),
            addressLocality: biz.city || biz.town_name || undefined,
            addressRegion: biz.state || "NY",
            addressCountry: "US",
          },
          ...(biz.latitude && biz.longitude && {
            geo: { "@type": "GeoCoordinates", latitude: biz.latitude, longitude: biz.longitude },
          }),
          ...(biz.rating && biz.review_count && {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: biz.rating,
              reviewCount: biz.review_count,
            },
          }),
          ...(biz.category && { "@type": "LocalBusiness", additionalType: biz.category }),
        };
        const ldBreadcrumb = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.capitaldistrictnest.com/" },
            { "@type": "ListItem", position: 2, name: "Local Businesses", item: "https://www.capitaldistrictnest.com/local" },
            ...(biz.town_slug
              ? [{ "@type": "ListItem", position: 3, name: town, item: `https://www.capitaldistrictnest.com/towns/${biz.town_slug}` }]
              : []),
            { "@type": "ListItem", position: biz.town_slug ? 4 : 3, name: biz.name, item: url },
          ],
        };
        const ldEvents = specials.length
          ? specials.slice(0, 5).map((s) => ({
              "@context": "https://schema.org",
              "@type": "Event",
              name: s.headline,
              ...(s.description && { description: s.description }),
              ...(s.image_url && { image: s.image_url }),
              ...(s.start_date && { startDate: s.start_date }),
              ...(s.end_date && { endDate: s.end_date }),
              eventStatus: "https://schema.org/EventScheduled",
              location: {
                "@type": "Place",
                name: biz.name,
                address: {
                  "@type": "PostalAddress",
                  ...(biz.address && { streetAddress: biz.address }),
                  addressLocality: biz.city || biz.town_name || undefined,
                  addressRegion: biz.state || "NY",
                  addressCountry: "US",
                },
              },
              organizer: { "@type": "Organization", name: biz.name, url },
            }))
          : [];
        return (
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <link rel="canonical" href={url} />
            <meta property="og:type" content="business.business" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:url" content={url} />
            {image && <meta property="og:image" content={image} />}
            <meta name="twitter:card" content="summary_large_image" />
            <script type="application/ld+json">{JSON.stringify(ldBusiness)}</script>
            <script type="application/ld+json">{JSON.stringify(ldBreadcrumb)}</script>
            {ldEvents.map((e, i) => (
              <script key={i} type="application/ld+json">{JSON.stringify(e)}</script>
            ))}
          </Helmet>
        );
      })()}

      <CleanHeader />

      {loading && (
        <section className="px-6 md:px-10 pt-24 pb-0">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 text-sm text-white/65">
            Loading community partner profile index...
          </div>
        </section>
      )}

      {isPremium ? (
        <PremiumMicrosite biz={activeBiz} specials={specials} />
      ) : isFeatured ? (
        <FeaturedProfile biz={activeBiz} />
      ) : (
        <FreeProfile biz={activeBiz} />
      )}

      <section className="border-t border-white/[0.06] px-6 md:px-10 py-16 text-center">
        <p className="text-xs text-white/45">
          Own this business?{" "}
          <Link to={`/claim-business?slug=${activeBiz.slug}`} className="text-white hover:opacity-70 transition underline underline-offset-4">
            Claim this profile
          </Link>
          {" · "}
          <Link to={`/partner-auth?slug=${activeBiz.slug}`} className="text-white hover:opacity-70 transition underline underline-offset-4">
            Owner login
          </Link>
          {" · "}
          <Link to="/pricing" className="text-white hover:opacity-70 transition underline underline-offset-4">
            See plans
          </Link>
        </p>
      </section>


      <Footer />
    </div>
  );
};

export default BizPage;
