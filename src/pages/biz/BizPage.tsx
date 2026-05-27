import { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
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
  Youtube,
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
  is_active?: boolean | null;
  latitude?: number | null;
  longitude?: number | null;
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
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

const PREMIUM_TIERS = new Set(["spotlight", "anchor"]);

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
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0F19]"
      style={{ background: GOLD }}
    >
      <Sparkles className="w-3 h-3" /> Spotlight Member
    </span>
  );
};

const BizPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [biz, setBiz] = useState<Business | null>(null);
  const [specials, setSpecials] = useState<Special[]>([]);
  const [loading, setLoading] = useState(true);
  const [notPremium, setNotPremium] = useState<Business | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (error || !data) {
        setLoading(false);
        return;
      }

      const b = data as unknown as Business;
      if (!PREMIUM_TIERS.has(b.plan_tier)) {
        setNotPremium(b);
        setLoading(false);
        return;
      }

      setBiz(b);

      const { data: sp } = await supabase
        .from("business_specials")
        .select("id, headline, description, image_url, cta_url, cta_label, start_date, end_date")
        .eq("business_id", b.id)
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      setSpecials((sp as Special[]) ?? []);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-white/60 text-sm">
        Loading…
      </div>
    );
  }

  if (notPremium) {
    const town = notPremium.town_slug || "albany";
    return <Navigate to={`/towns/${town}?business=${notPremium.slug}`} replace />;
  }

  if (!biz) return <Navigate to="/local" replace />;

  const heroMedia = getEmbedUrl(biz.video_url);
  const heroImage = biz.hero_image_url || biz.photos?.[0];
  const gallery = (biz.photos || []).slice(0, 24);
  const fullAddress = [biz.address, biz.city || biz.town_name, biz.state]
    .filter(Boolean)
    .join(", ");
  const directionsHref = fullAddress
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`
    : null;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: biz.name, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("leads").insert([
      {
        full_name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        message: `[${biz.name}] ${parsed.data.message}`,
        type: "business_inquiry",
        lead_type: "business_inquiry",
        origin_town: biz.town_name || biz.town_slug || null,
        location: fullAddress || null,
      },
    ]);
    setSubmitting(false);
    if (error) {
      toast.error("Could not send. Please try again.");
      return;
    }
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    toast.success("Message sent — we'll be in touch.");
  };

  const socials = [
    { url: biz.instagram, Icon: Instagram, label: "Instagram" },
    { url: biz.facebook, Icon: Facebook, label: "Facebook" },
    { url: biz.linkedin, Icon: Linkedin, label: "LinkedIn" },
  ].filter((s) => s.url);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{biz.name} | {biz.town_name || "Capital District"} — Capital District Nest</title>
        <meta
          name="description"
          content={biz.tagline || biz.description?.slice(0, 155) || `${biz.name} — ${biz.category} in ${biz.town_name || "the Capital District"}.`}
        />
        <link rel="canonical" href={`https://www.capitaldistrictnest.com/biz/${biz.slug}`} />
      </Helmet>

      <CleanHeader />

      {/* HERO MEDIA */}
      <section className="relative w-full">
        <div className="relative w-full aspect-[21/9] md:aspect-[21/8] overflow-hidden bg-black">
          {heroMedia ? (
            <iframe
              src={heroMedia}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={`${biz.name} video`}
            />
          ) : heroImage ? (
            <img
              src={heroImage}
              alt={biz.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#101422] to-[#0B0F19]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
        </div>
      </section>

      {/* HEADER ROW */}
      <section className="px-6 md:px-10 -mt-24 md:-mt-28 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <TierBadge tier={biz.plan_tier} />
            {biz.category && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                {biz.category}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.02]">
            {biz.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-white/65">
            {biz.rating && (
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-current" style={{ color: GOLD }} />
                <span className="text-white font-semibold">{biz.rating.toFixed(1)}</span>
                {biz.review_count ? <span className="text-white/45">({biz.review_count})</span> : null}
              </span>
            )}
            {fullAddress && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {fullAddress}
              </span>
            )}
          </div>

          {/* Action chips */}
          <div className="mt-7 flex flex-wrap gap-2.5">
            {biz.phone && (
              <a
                href={`tel:${biz.phone.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition"
              >
                <Phone className="w-4 h-4" /> Call
              </a>
            )}
            {directionsHref && (
              <a
                href={directionsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition"
              >
                <MapPin className="w-4 h-4" /> Directions
              </a>
            )}
            {biz.website && (
              <a
                href={biz.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition"
              >
                <Globe className="w-4 h-4" /> Website
              </a>
            )}
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </section>

      {/* SPLIT GRID */}
      <section className="px-6 md:px-10 py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14">
          {/* LEFT COLUMN */}
          <div className="space-y-14">
            {/* OUR STORY */}
            {(biz.long_description || biz.description) && (
              <article>
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-4" style={{ color: TEAL }}>
                  Our Story
                </p>
                <div className="text-[15px] md:text-base text-white/75 font-light leading-[1.75] whitespace-pre-wrap">
                  {biz.long_description || biz.description}
                </div>
              </article>
            )}

            {/* GALLERY */}
            {gallery.length > 0 && (
              <article>
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-5" style={{ color: TEAL }}>
                  Gallery
                </p>
                <div className="columns-2 md:columns-3 gap-3 [column-fill:_balance]">
                  {gallery.map((src, i) => (
                    <div
                      key={i}
                      className="mb-3 break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                    >
                      <img src={src} alt={`${biz.name} ${i + 1}`} className="w-full h-auto object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              </article>
            )}

            {/* SPECIALS */}
            {specials.length > 0 && (
              <article>
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-5" style={{ color: GOLD }}>
                  Current Specials
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specials.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-white/20 transition"
                    >
                      {s.image_url && (
                        <div className="aspect-[16/10] overflow-hidden bg-black">
                          <img src={s.image_url} alt={s.headline} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="text-base font-semibold text-white">{s.headline}</h3>
                        {s.description && (
                          <p className="mt-2 text-sm text-white/65 font-light leading-relaxed">{s.description}</p>
                        )}
                        {s.cta_url && (
                          <a
                            href={s.cta_url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] hover:opacity-70 transition"
                            style={{ color: GOLD }}
                          >
                            {s.cta_label || "View Special"} <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}

            {/* SERVICES / MENU */}
            {((biz.services && biz.services.length > 0) || biz.menu_url) && (
              <article>
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-5" style={{ color: TEAL }}>
                  Services & Menu
                </p>
                {biz.services && biz.services.length > 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl divide-y divide-white/[0.06]">
                    {biz.services.map((srv, i) => (
                      <div key={i} className="flex items-start justify-between gap-6 p-5">
                        <div>
                          <h4 className="text-[15px] font-semibold text-white">{srv.name}</h4>
                          {srv.description && (
                            <p className="mt-1 text-sm text-white/55 font-light">{srv.description}</p>
                          )}
                        </div>
                        {srv.price && (
                          <span className="text-base font-semibold text-white whitespace-nowrap">{srv.price}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {biz.menu_url && (
                  <a
                    href={biz.menu_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition"
                    style={{ color: TEAL }}
                  >
                    View full menu <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </article>
            )}
          </div>

          {/* RIGHT STICKY SIDEBAR */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">
            {/* LEAD FORM */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
              <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-3" style={{ color: TEAL }}>
                Contact & Inquire
              </p>
              <h3 className="text-xl font-semibold text-white tracking-[-0.01em]">
                Get in touch with {biz.name.split(" ")[0]}
              </h3>

              {submitted ? (
                <div className="mt-6 flex items-start gap-3 text-sm text-white/75">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: TEAL }} />
                  <p>Message sent. They'll be in touch shortly.</p>
                </div>
              ) : (
                <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/30 transition"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/30 transition"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/30 transition"
                  />
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/30 transition resize-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
                  >
                    {submitting ? "Sending…" : "Send Inquiry"} <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* HOURS */}
            {biz.hours && Object.keys(biz.hours).length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-4 inline-flex items-center gap-1.5" style={{ color: TEAL }}>
                  <Clock className="w-3.5 h-3.5" /> Hours
                </p>
                <ul className="space-y-1.5 text-sm">
                  {Object.entries(biz.hours).map(([day, h]) => (
                    <li key={day} className="flex items-center justify-between text-white/70">
                      <span className="capitalize">{day}</span>
                      <span className="text-white/55">{h as string}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* MAP */}
            {biz.latitude && biz.longitude && (
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                <iframe
                  title={`${biz.name} map`}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${biz.longitude - 0.01}%2C${biz.latitude - 0.005}%2C${biz.longitude + 0.01}%2C${biz.latitude + 0.005}&layer=mapnik&marker=${biz.latitude}%2C${biz.longitude}`}
                  className="w-full h-48"
                  loading="lazy"
                />
              </div>
            )}

            {/* SOCIALS */}
            {socials.length > 0 && (
              <div className="flex items-center gap-2">
                {socials.map(({ url, Icon, label }) => (
                  <a
                    key={label}
                    href={url as string}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:border-white/25 transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="border-t border-white/[0.06] px-6 md:px-10 py-16 text-center">
        <p className="text-xs text-white/45">
          Own a business in the Capital District?{" "}
          <Link to="/pricing" className="text-white hover:opacity-70 transition underline underline-offset-4">
            See how Spotlight & Anchor work →
          </Link>
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default BizPage;
