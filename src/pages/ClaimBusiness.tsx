import { useEffect, useState } from "react";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import {
  Building2,
  Sparkles,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle,
  Mail,
  Phone,
  Globe,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Music2,
  Calendar,
  Star,
  Handshake,
  Megaphone,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const TEAL = "#5eead4";

const initialState = {
  // Basic
  businessName: "",
  ownerName: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  town: "",
  // Socials
  instagram: "",
  facebook: "",
  tiktok: "",
  linkedin: "",
  youtube: "",
  // Details
  category: "",
  shortDescription: "",
  services: "",
  hours: "",
  // Growth interests (checkboxes)
  interestEvents: false,
  interestFeatured: false,
  interestRealEstate: false,
  interestPromotions: false,
};

const TownOptions = [
  "Delmar", "Albany", "Saratoga Springs", "Troy", "Schenectady",
  "Clifton Park", "Niskayuna", "Colonie", "Guilderland", "Other / Capital District",
];

const CategoryOptions = [
  "Restaurant", "Coffee", "Bakery", "Retail", "Healthcare", "Dental", "Wellness", "Gym", "Salon", "Pet", "Auto",
  "Mortgage Lender", "Bank/Credit Union", "Real Estate Attorney", "Insurance", "Home Inspector",
  "Contractor", "Roofer", "Plumber", "Electrician", "HVAC", "Landscaper", "Handyman", "Cleaner",
  "Accountant", "Financial Advisor", "Attorney", "Marketing", "Other",
];

const track = (event: string, payload: Record<string, any> = {}) => {
  try {
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event, ...payload });
      const plausible = (window as any).plausible;
      if (typeof plausible === "function") plausible(event, { props: payload });
    }
  } catch {
    /* analytics is best-effort */
  }
};

const prettifyTown = (raw: string) =>
  raw
    ? raw
        .replace(/-/g, " ")
        .split(" ")
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "";

const ClaimBusiness = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const prefillBiz = searchParams.get("biz") || searchParams.get("name") || "";
  const prefillTown = searchParams.get("town") || "";
  const slugParam = searchParams.get("slug") || "";
  const tierParam = searchParams.get("tier") || "";
  const addonParam = searchParams.get("addon") || "";
  const categoryParam = searchParams.get("category") || "";
  const intentParam = searchParams.get("intent") || "";

  const [resolvedBiz, setResolvedBiz] = useState<{
    name: string;
    town: string;
    category: string;
  } | null>(null);
  const [slugLookupTried, setSlugLookupTried] = useState(false);

  const [form, setForm] = useState({
    ...initialState,
    businessName: prefillBiz,
    category: categoryParam || "",
    town: prettifyTown(prefillTown),
  });
  const [requestedTier, setRequestedTier] = useState<string>(
    ["free", "featured", "premier", "spotlight", "anchor"].includes(tierParam) ? tierParam : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const selectTierAndScroll = (tierId: string) => {
    setRequestedTier(tierId);
    track("claim_business_tier_select", { tier: tierId });
    if (typeof window !== "undefined") {
      const el = document.getElementById("claim-form");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  // Fire page view + attempt slug → business resolution.
  useEffect(() => {
    track("claim_business_page_view", {
      slug: slugParam || null,
      town: prefillTown || null,
      tier: tierParam || null,
      addon: addonParam || null,
      category: categoryParam || null,
      intent: intentParam || null,
      page_path: location.pathname + location.search,
    });

    let cancelled = false;
    const resolveSlug = async () => {
      if (!slugParam) return;
      try {
        const { data, error } = await supabase
          .from("businesses")
          .select("name, town_name, town_slug, category")
          .eq("slug", slugParam)
          .maybeSingle();
        if (cancelled) return;
        if (error || !data) {
          track("claim_business_prefill_error", {
            slug: slugParam,
            reason: error?.message || "not_found",
          });
        } else {
          const resolved = {
            name: data.name || "",
            town: data.town_name || prettifyTown(data.town_slug || prefillTown),
            category: data.category || categoryParam || "",
          };
          setResolvedBiz(resolved);
          setForm((p) => ({
            ...p,
            businessName: p.businessName || resolved.name,
            town: p.town || resolved.town,
            category: p.category || resolved.category,
          }));
          track("claim_business_prefill_success", {
            slug: slugParam,
            name: resolved.name,
          });
        }
      } catch (err: any) {
        if (!cancelled) {
          track("claim_business_prefill_error", {
            slug: slugParam,
            reason: err?.message || "exception",
          });
        }
      } finally {
        if (!cancelled) setSlugLookupTried(true);
      }
    };
    resolveSlug();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugParam]);

  // ─────────────────────────────────────────────────────────────
  // CONCIERGE PILOT MODE
  // No Stripe / no checkout / no automated billing.
  // Submissions land in the unified `leads` table; the team
  // reviews each business manually and (when ready) toggles
  // `is_claimed`, `is_featured`, and `plan_tier` from the admin.
  // Payment automation stays inactive until after the 25-business
  // pilot has validated demand.
  // ─────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.businessName.trim() || !form.ownerName.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Business name, your name, email, and phone are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      const interests = [
        form.interestEvents && "Events",
        form.interestFeatured && "Featured placement",
        form.interestRealEstate && "Real estate partnerships",
        form.interestPromotions && "Promotions/specials",
      ].filter(Boolean).join(", ") || "None specified";

      const message = [
        `Business: ${form.businessName}`,
        form.category && `Category: ${form.category}`,
        form.town && `Town: ${form.town}`,
        form.address && `Address: ${form.address}`,
        form.phone && `Phone: ${form.phone}`,
        form.website && `Website: ${form.website}`,
        form.hours && `Hours: ${form.hours}`,
        form.shortDescription && `Description: ${form.shortDescription}`,
        form.services && `Services: ${form.services}`,
        (form.instagram || form.facebook || form.tiktok || form.linkedin || form.youtube) &&
          `Socials — IG:${form.instagram || "-"} | FB:${form.facebook || "-"} | TT:${form.tiktok || "-"} | LI:${form.linkedin || "-"} | YT:${form.youtube || "-"}`,
        `Interests: ${interests}`,
        slugParam && `Slug: ${slugParam}`,
        (requestedTier || tierParam) && `Requested tier: ${requestedTier || tierParam}`,
        addonParam && `Add-on: ${addonParam}`,
        intentParam && `Intent: ${intentParam}`,
        `Source: ${location.pathname}${location.search}`,
      ].filter(Boolean).join("\n");


      const payload = {
        full_name: form.ownerName,
        email: form.email,
        phone: form.phone || null,
        message,
        type: "business_claim",
        origin_town: form.town || prettifyTown(prefillTown) || null,
        lead_type: "business_owner",
      };
      if (import.meta.env.DEV) console.log("[claim] submitting", payload);
      const { error } = await supabase.from("leads").insert(payload);
      if (error) {
        console.error("[claim] supabase error:", error);
        track("claim_business_form_error", {
          slug: slugParam || null,
          tier: tierParam || null,
          reason: error.message,
        });
        const detail = import.meta.env.DEV ? ` (${error.message})` : "";
        toast.error(
          `We couldn't submit this right now. Please email team@capitaldistrictnest.com or call/text 518-207-9348 and we'll help get it handled.${detail}`
        );
        return;
      }
      track("claim_business_form_submit", {
        slug: slugParam || null,
        tier: requestedTier || tierParam || null,
        town: form.town || null,
        category: form.category || null,
        source_location: location.pathname,
      });

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("[claim] submit exception:", err);
      track("claim_business_form_error", {
        slug: slugParam || null,
        tier: tierParam || null,
        reason: err?.message || "exception",
      });
      toast.error(
        "We couldn't submit this right now. Please email team@capitaldistrictnest.com or call/text 518-207-9348 and we'll help get it handled."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white">
        <Helmet>
          <title>Thanks — Capital District Nest</title>
        </Helmet>
        <MainHeader />
        <section className="pt-32 md:pt-40 pb-28 px-6">
          <div className="max-w-xl mx-auto text-center">
            <div
              className="w-20 h-20 mx-auto mb-7 rounded-2xl border flex items-center justify-center"
              style={{ borderColor: `${TEAL}66`, background: `${TEAL}1a` }}
            >
              <Sparkles className="w-9 h-9" style={{ color: TEAL }} />
            </div>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-4" style={{ color: TEAL }}>
              Received
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05]">
              Thank you.
            </h1>
            <p className="mt-6 text-lg text-white/70 font-light leading-relaxed">
              Our team will personally review your profile and reach out to help build your
              Capital District Nest presence. No automated funnels — a real person from our
              team will be in touch shortly.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/local"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
              >
                Browse the directory <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] hover:border-[#5eead4]/40 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back home
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Helmet>
        <title>Join Capital District Nest | Curated Local Business Concierge</title>
        <meta
          name="description"
          content="Be considered for Capital District Nest — a curated, concierge platform elevating the Capital District's best local businesses."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/claim-business" />
        {Array.from(searchParams.keys()).length > 0 && (
          <meta name="robots" content="noindex, follow" />
        )}
      </Helmet>

      <MainHeader />

      {/* HERO */}
      <section className="pt-28 md:pt-36 pb-14 px-6 md:px-10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(94,234,212,0.18) 0%, rgba(11,15,25,0) 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: TEAL }}>
            For Local Business Owners
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02]">
            Claim Your Business on Capital District Nest
          </h1>
          <p className="mt-6 text-lg text-white/65 font-light max-w-2xl mx-auto">
            Review your listing, update your profile, add photos, submit events, and request
            featured placement across the Capital District's local discovery platform.
          </p>
          <p className="mt-3 text-base text-white/55 font-light max-w-2xl mx-auto">
            Your business may already be listed. Review it for free, upgrade your profile, or
            request featured placement.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#claim-form"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition"
            >
              Find My Business <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#tiers"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition"
            >
              Compare Options
            </a>
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 text-xs text-white/55">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04]">
              <Handshake className="w-3.5 h-3.5" style={{ color: TEAL }} /> Concierge onboarding
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04]">
              <Star className="w-3.5 h-3.5" style={{ color: TEAL }} /> Editorial profile
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04]">
              <Megaphone className="w-3.5 h-3.5" style={{ color: TEAL }} /> Weekly pulse reach
            </span>
          </div>
        </div>
      </section>

      {/* PRICING TIERS — unified ladder */}
      <section id="tiers" className="pb-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-3" style={{ color: TEAL }}>
              Local Business Tiers
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em]">
              Free to be listed. $15 to stand out. $25 for a full business page.
            </h2>
            <p className="mt-4 text-sm text-white/60 max-w-2xl mx-auto font-light">
              One clean ladder across the entire site. Pick the tier that fits — our concierge
              team takes it from there.
            </p>
          </div>

          {(() => {
            const cards = [
              {
                id: "free",
                eyebrow: "Free Listing",
                price: "$0",
                cadence: "always",
                setup: null as string | null,
                tag: "Basic directory presence — already live for every Capital District business.",
                accent: "rgba(255,255,255,0.55)",
                items: [
                  "Capital District directory",
                  "Name, address & category",
                  "Click-to-call phone",
                  "Basic website link",
                ],
                cta: "Review Your Listing",
                style: "neutral" as const,
                badge: null as string | null,
              },
              {
                id: "featured",
                eyebrow: "Featured Listing",
                price: "$15",
                cadence: "/mo",
                setup: null,
                tag: "The simple upgrade — better visibility across search and town pages.",
                accent: TEAL,
                items: [
                  "Everything in Free",
                  "Featured badge",
                  "Priority placement in category & town search",
                  "Larger card in search results",
                  "Basic description",
                  "Basic photo / logo",
                ],
                cta: "Get Featured",
                style: "neutral" as const,
                badge: "Easy Yes",
              },
              {
                id: "premier",
                eyebrow: "Premier Business Page",
                price: "$25",
                cadence: "/mo",
                setup: "+ $25 one-time setup",
                tag: "A full business page that works like a mini website inside Nest.",
                accent: TEAL,
                items: [
                  "Everything in Featured",
                  "Full business profile page",
                  "Description, services & photos",
                  "Phone, text, email & website buttons",
                  "Request a Quote / contact button",
                  "Shareable profile link",
                  "Submit events & specials",
                  "Featured Local Partner badge (pilot)",
                ],
                cta: "Build My Business Page",
                style: "teal" as const,
                badge: "Most Popular",
              },
              {
                id: "spotlight",
                eyebrow: "Spotlight Partner",
                price: "$50",
                cadence: "/mo",
                setup: null,
                tag: "Premium visibility for businesses that want more local attention.",
                accent: "#c9a449",
                items: [
                  "Everything in Premier",
                  "Higher category & town placement",
                  "Specials & events promotion",
                  "Unlimited photo gallery",
                  "Newsletter / local pulse spotlight",
                  "Featured partner card",
                ],
                cta: "Request Spotlight",
                style: "gold" as const,
                badge: null,
              },
            ];
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {cards.map((c) => {
                  const isSelected = requestedTier === c.id;
                  return (
                  <div
                    key={c.id}
                    className={`relative rounded-3xl p-7 backdrop-blur-xl border flex flex-col transition ${
                      c.style === "teal"
                        ? "bg-gradient-to-br from-[#5eead4]/15 via-[#1E2230] to-[#1E2230] border-[#5eead4]/45 shadow-[0_30px_70px_-30px_rgba(94,234,212,0.45)]"
                        : c.style === "gold"
                        ? "bg-gradient-to-br from-[#c9a449]/15 via-[#1E2230] to-[#1E2230] border-[#c9a449]/40"
                        : "bg-white/[0.04] border-white/10 hover:border-white/25"
                    } ${isSelected ? "ring-2 ring-[#5eead4]/70" : ""}`}
                  >
                    {c.badge && (
                      <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
                        style={
                          c.style === "teal"
                            ? { background: TEAL, color: "#0B0F19" }
                            : { background: "rgba(255,255,255,0.92)", color: "#0B0F19" }
                        }
                      >
                        <Star className="w-3 h-3 fill-current" /> {c.badge}
                      </span>
                    )}
                    <p
                      className="text-[10px] font-semibold tracking-[0.22em] uppercase"
                      style={{ color: c.accent }}
                    >
                      {c.eyebrow}
                    </p>
                    <p className="mt-3 text-4xl font-semibold tracking-tight">
                      {c.price}
                      <span className="text-base text-white/55 font-light">{c.cadence === "always" ? " / always" : c.cadence}</span>
                    </p>
                    {c.setup && (
                      <p className="mt-1 text-[11.5px] font-semibold uppercase tracking-[0.18em]" style={{ color: c.accent }}>
                        {c.setup}
                      </p>
                    )}
                    <p className="mt-2 text-[13px] text-white/65 font-light leading-relaxed min-h-[40px]">
                      {c.tag}
                    </p>
                    <ul className="mt-4 space-y-2.5 text-sm text-white/75 font-light flex-1">
                      {c.items.map((it) => (
                        <li key={it} className="flex gap-2">
                          <CheckCircle
                            className="w-4 h-4 mt-0.5 shrink-0"
                            style={{ color: c.accent }}
                          />
                          {it}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => selectTierAndScroll(c.id)}
                      className={`mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[13px] font-semibold transition ${
                        c.style === "teal"
                          ? "bg-white text-[#0B0F19] hover:opacity-90"
                          : c.style === "gold"
                          ? "text-[#0B0F19] hover:opacity-90"
                          : "border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                      }`}
                      style={c.style === "gold" ? { background: "#c9a449" } : undefined}
                    >
                      {isSelected ? "Selected — Continue Below" : c.cta} <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                  );
                })}
              </div>
            );
          })()}

          {/* Anchor application strip */}
          <div className={`mt-6 rounded-3xl border bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-white/[0.02] backdrop-blur-xl p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-6 relative ${
            requestedTier === "anchor" ? "ring-2 ring-[#5eead4]/70 border-white/25" : "border-white/15"
          }`}>
            <span
              className="absolute -top-3 left-7 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
              style={{ background: "#e5e4e2", color: "#0B0F19" }}
            >
              <Star className="w-3 h-3 fill-current" /> Anchor Partner
            </span>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-3xl md:text-4xl font-semibold tracking-tight">$100–$150</span>
                <span className="text-sm text-white/55">/ mo · application-based</span>
              </div>
              <p className="mt-3 text-[14.5px] text-white/75 font-light leading-relaxed max-w-2xl">
                Everything in Spotlight, plus homepage rotation, category sponsorship, town
                sponsorship opportunities, competitor lockout where available, custom campaigns,
                and concierge setup.
              </p>
            </div>
            <button
              type="button"
              onClick={() => selectTierAndScroll("anchor")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[13px] font-semibold whitespace-nowrap hover:opacity-90 transition"
              style={{ background: "#e5e4e2", color: "#0B0F19" }}
            >
              {requestedTier === "anchor" ? "Selected — Continue Below" : "Apply as Anchor"} <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-white/45">
            Pick a tier or skip ahead — our concierge team will help you land on the right one.
          </p>
        </div>
      </section>



      {/* FORM */}
      <section id="claim-form" className="pb-28 px-6 md:px-10 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          {slugParam && (
            <div
              className="mb-5 rounded-2xl border px-5 py-4 text-sm flex items-start gap-3"
              style={{
                borderColor: resolvedBiz ? `${TEAL}55` : "rgba(255,255,255,0.12)",
                background: resolvedBiz ? `${TEAL}14` : "rgba(255,255,255,0.04)",
              }}
            >
              <Building2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: TEAL }} />
              <div className="text-white/80 leading-relaxed">
                {resolvedBiz ? (
                  <>
                    Claiming or updating{" "}
                    <span className="font-semibold text-white">{resolvedBiz.name}</span>
                    {resolvedBiz.town ? <> in <span className="text-white">{resolvedBiz.town}</span></> : null}.
                    Confirm the details below and add anything we should know.
                  </>
                ) : slugLookupTried ? (
                  <>
                    We couldn't find an existing profile for that link, but you can still claim or
                    update this business — just enter the name below.
                  </>
                ) : (
                  <>Looking up this business…</>
                )}
                {(requestedTier || tierParam) && (
                  <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em] border border-white/15 text-white/70">
                    Tier: {requestedTier || tierParam}
                  </span>
                )}

              </div>
            </div>
          )}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-[#1E2230] border border-white/[0.08] p-7 md:p-10 space-y-10"
        >
          {/* SECTION: Basic */}
          <SectionBlock
            eyebrow="Section 01"
            title="Basic info"
            desc="Only your business name and email are required. Everything else helps us build your profile faster."
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Business name" required>
                <input
                  value={form.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  placeholder="e.g. The Perfect Blend"
                  required
                  className={inputCls}
                />
              </Field>
              <Field label="Your name">
                <input
                  value={form.ownerName}
                  onChange={(e) => update("ownerName", e.target.value)}
                  placeholder="Owner or contact"
                  className={inputCls}
                />
              </Field>
              <Field label="Email" required icon={<Mail className="w-4 h-4" />}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@business.com"
                  required
                  className={inputCls + " pl-10"}
                />
              </Field>
              <Field label="Phone" icon={<Phone className="w-4 h-4" />}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(518) 555-0123"
                  className={inputCls + " pl-10"}
                />
              </Field>
              <Field label="Website" icon={<Globe className="w-4 h-4" />}>
                <input
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                  placeholder="https://"
                  className={inputCls + " pl-10"}
                />
              </Field>
              <Field label="Town / City">
                <select
                  value={form.town}
                  onChange={(e) => update("town", e.target.value)}
                  className={inputCls + " cursor-pointer [&>option]:text-black"}
                >
                  <option value="">Select town</option>
                  {TownOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Street address" icon={<MapPin className="w-4 h-4" />}>
                <input
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="123 Main St"
                  className={inputCls + " pl-10"}
                />
              </Field>
            </div>
          </SectionBlock>

          {/* SECTION: Social */}
          <SectionBlock
            eyebrow="Section 02"
            title="Social media"
            desc="Optional. Add any platforms you actively maintain — we'll wire them into your profile."
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Instagram" icon={<Instagram className="w-4 h-4" />}>
                <input value={form.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="@handle or URL" className={inputCls + " pl-10"} />
              </Field>
              <Field label="Facebook" icon={<Facebook className="w-4 h-4" />}>
                <input value={form.facebook} onChange={(e) => update("facebook", e.target.value)} placeholder="facebook.com/..." className={inputCls + " pl-10"} />
              </Field>
              <Field label="TikTok" icon={<Music2 className="w-4 h-4" />}>
                <input value={form.tiktok} onChange={(e) => update("tiktok", e.target.value)} placeholder="@handle" className={inputCls + " pl-10"} />
              </Field>
              <Field label="LinkedIn" icon={<Linkedin className="w-4 h-4" />}>
                <input value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="linkedin.com/company/..." className={inputCls + " pl-10"} />
              </Field>
              <Field label="YouTube" icon={<Youtube className="w-4 h-4" />}>
                <input value={form.youtube} onChange={(e) => update("youtube", e.target.value)} placeholder="youtube.com/@..." className={inputCls + " pl-10"} />
              </Field>
            </div>
          </SectionBlock>

          {/* SECTION: Business details */}
          <SectionBlock
            eyebrow="Section 03"
            title="Business details"
            desc="Help us understand what you do. All optional — share what's easy."
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className={inputCls + " cursor-pointer [&>option]:text-black"}
                >
                  <option value="">Select category</option>
                  {CategoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Hours" icon={<Calendar className="w-4 h-4" />}>
                <input value={form.hours} onChange={(e) => update("hours", e.target.value)} placeholder="e.g. Mon–Fri 9a–5p" className={inputCls + " pl-10"} />
              </Field>
            </div>
            <Field label="Short description">
              <textarea
                value={form.shortDescription}
                onChange={(e) => update("shortDescription", e.target.value)}
                placeholder="One or two sentences about your business."
                rows={3}
                className={inputCls + " resize-none"}
              />
            </Field>
            <Field label="Services">
              <textarea
                value={form.services}
                onChange={(e) => update("services", e.target.value)}
                placeholder="Comma-separated list, e.g. Espresso, Pastries, Catering"
                rows={2}
                className={inputCls + " resize-none"}
              />
            </Field>
            <p className="text-xs text-white/45 leading-relaxed">
              Logo and photo uploads aren't required here — our team will collect them
              directly with you during onboarding, so you get the visual treatment right.
            </p>
          </SectionBlock>

          {/* SECTION: Tier interest */}
          <SectionBlock
            eyebrow="Section 04"
            title="Which tier are you interested in?"
            desc="Pick whichever fits — you can change your mind. Our team confirms before any charges."
          >
            <Field label="Interested in">
              <select
                value={requestedTier}
                onChange={(e) => setRequestedTier(e.target.value)}
                className={inputCls + " cursor-pointer [&>option]:text-black"}
              >
                <option value="">Just exploring / not sure yet</option>
                <option value="free">Free Listing update — $0</option>
                <option value="featured">Featured Listing — $15/month</option>
                <option value="premier">Premier Business Page — $25 setup + $25/month</option>
                <option value="spotlight">Spotlight Partner — $50/month</option>
                <option value="anchor">Anchor Partner — $100–$150/month</option>
              </select>
            </Field>
          </SectionBlock>

          {/* SECTION: Growth interests */}
          <SectionBlock
            eyebrow="Section 05"
            title="What else are you interested in?"
            desc="Optional. Just check what sounds relevant — we'll bring ideas, not invoices."
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <Check
                label="Local events & sponsorships"
                checked={form.interestEvents}
                onChange={(v) => update("interestEvents", v)}
              />
              <Check
                label="Featured placement on the platform"
                checked={form.interestFeatured}
                onChange={(v) => update("interestFeatured", v)}
              />
              <Check
                label="Real estate / new-resident partnerships"
                checked={form.interestRealEstate}
                onChange={(v) => update("interestRealEstate", v)}
              />
              <Check
                label="Promotions, specials & weekly feed"
                checked={form.interestPromotions}
                onChange={(v) => update("interestPromotions", v)}
              />
            </div>
          </SectionBlock>


          {/* Submit */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-7">
            <p className="text-xs text-white/55 max-w-md leading-relaxed">
              A real person from our team will review your submission and reach out personally.
              No automated drip sequences.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition disabled:opacity-60"
            >
              {isSubmitting ? "Submitting…" : "Submit for review"}
              {!isSubmitting && <ArrowUpRight className="w-4 h-4" />}
            </button>
          </div>
        </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ─── primitives ─── */

const inputCls =
  "w-full bg-[#0B0F19] text-white placeholder:text-white/40 text-[15px] rounded-xl border border-white/10 px-4 py-3 focus:outline-none focus:border-[#5eead4]/50 transition";

const SectionBlock = ({
  eyebrow, title, desc, children,
}: { eyebrow: string; title: string; desc: string; children: React.ReactNode }) => (
  <div className="space-y-5">
    <div>
      <p className="text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: TEAL }}>
        {eyebrow}
      </p>
      <h2 className="mt-1.5 text-2xl md:text-3xl font-semibold tracking-[-0.02em]">{title}</h2>
      <p className="mt-2 text-sm text-white/55 font-light max-w-xl">{desc}</p>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Field = ({
  label, required, icon, children,
}: { label: string; required?: boolean; icon?: React.ReactNode; children: React.ReactNode }) => (
  <label className="block space-y-1.5">
    <span className="text-xs font-semibold text-white/70 inline-flex items-center gap-1.5">
      {label}
      {required && <span style={{ color: TEAL }}>*</span>}
    </span>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
          {icon}
        </span>
      )}
      {children}
    </div>
  </label>
);

const Check = ({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`text-left px-4 py-3.5 rounded-xl border text-sm transition flex items-start gap-3 ${
      checked
        ? "border-[#5eead4]/50 bg-[#5eead4]/[0.08] text-white"
        : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:text-white"
    }`}
  >
    <span
      className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition ${
        checked ? "bg-[#5eead4] border-[#5eead4]" : "border-white/30"
      }`}
    >
      {checked && <CheckCircle className="w-3.5 h-3.5 text-[#0B0F19]" strokeWidth={3} />}
    </span>
    <span className="leading-snug">{label}</span>
  </button>
);

export default ClaimBusiness;
