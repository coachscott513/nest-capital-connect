import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
  Clock,
  Instagram,
  Facebook,
  Sparkles,
  ArrowUpRight,
  Wine,
  Utensils,
  Users,
  Gift,
  Leaf,
  CalendarHeart,
  MessageCircle,
  Copy,
  Check,
  MoreHorizontal,
  Image as ImageIcon,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import rooseveltHero from "@/assets/roosevelt-room-hero.png.asset.json";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import BusinessContactModal from "@/components/business/BusinessContactModal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { trackGAEvent } from "@/components/GARouteTracker";

const BUSINESS = {
  slug: "the-roosevelt-room",
  name: "The Roosevelt Room",
  phoneDisplay: "(518) 244-3721",
  phoneHref: "tel:+15182443721",
  email: "rooseveltroomny@gmail.com",
  website: "https://rooseveltroom.com/",
  reservationUrl: "https://www.exploretock.com/the-roosevelt-room-troy",
  instagramUrl: "https://www.instagram.com/the.roosevelt.room/",
  instagramHandle: "@the.roosevelt.room",
  facebookUrl: "https://www.facebook.com/100348325657557",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=The+Roosevelt+Room&destination_place_id=ChIJL17Q8DcJ3okRD6h2M0_yL3M",
  addressLine1: "112 North Greenbush Road",
  addressLine2: "North Greenbush, NY 12180",
};

const TEAL = "#5eead4";
const APPLY_URL = "/for-businesses/apply?business=the-roosevelt-room";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold tracking-[0.28em] uppercase" style={{ color: TEAL }}>
    {children}
  </p>
);

const SectionHeading = ({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) => (
  <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white leading-[1.05]">
      {title}
    </h2>
    {intro && (
      <p className="mt-5 text-lg text-white/70 font-light leading-relaxed">{intro}</p>
    )}
  </div>
);

const GlassCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl ${className}`}
  >
    {children}
  </div>
);

// Abstract editorial background used in place of unverified restaurant photography.
// See mem://editorial/no-fabricated-content — do not present stock or AI imagery
// as though it depicts the actual business.
const AbstractBackdrop = ({ variant = "default" }: { variant?: "default" | "warm" | "cool" }) => {
  const grads =
    variant === "warm"
      ? "radial-gradient(60% 60% at 20% 30%, rgba(201,164,73,0.18), transparent 65%), radial-gradient(50% 50% at 80% 70%, rgba(94,234,212,0.10), transparent 70%)"
      : variant === "cool"
      ? "radial-gradient(55% 55% at 70% 25%, rgba(94,234,212,0.18), transparent 65%), radial-gradient(60% 60% at 20% 80%, rgba(13,110,102,0.20), transparent 70%)"
      : "radial-gradient(60% 60% at 30% 25%, rgba(94,234,212,0.16), transparent 65%), radial-gradient(55% 55% at 75% 75%, rgba(201,164,73,0.12), transparent 70%)";
  return (
    <>
      <div className="absolute inset-0" style={{ background: "#0B0F19" }} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div className="absolute inset-0" style={{ background: grads }} />
    </>
  );
};

const experiences = [
  { icon: CalendarHeart, title: "Anniversary Dinner", text: "The kind of quiet corner and unhurried service a memorable night calls for." },
  { icon: Wine, title: "Craft Cocktails", text: "A full bar program — see the current menu on the restaurant's official channels." },
  { icon: Utensils, title: "Modern American Menu", text: "Seasonal, ingredient-driven plates. Current dishes live on the restaurant's site and Instagram." },
  { icon: Users, title: "Private Dining", text: "Ask the restaurant directly about private events and larger parties." },
  { icon: Leaf, title: "Seasonal Sourcing", text: "Menu evolves through the year. Verified details come from the restaurant." },
  { icon: Gift, title: "Reservations Recommended", text: "Weekends book quickly. Reserve on Tock or call directly." },
];

const nearby = [
  { label: "Boutique shopping", href: "/local?town=troy&category=retail" },
  { label: "Coffee & cafés", href: "/local?town=troy&category=cafe" },
  { label: "Hotels & stays", href: "/local?town=troy&category=hotel" },
  { label: "Riverfront & parks", href: "/living-in/troy" },
  { label: "Parking", href: "/living-in/troy#parking" },
  { label: "Nightlife", href: "/local?town=troy&category=tavern" },
  { label: "Weekend events", href: "/weekly" },
  { label: "Nearby homes", href: "/homes/search/troy" },
];

const conciergeQuestions = [
  "Is this good for anniversaries?",
  "Do they take reservations?",
  "What is parking like?",
  "How far from downtown Troy?",
];

const RooseveltRoom = () => {
  const [conciergeInput, setConciergeInput] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const isMobile = useIsMobile();

  const track = (action: string, source: string) =>
    trackGAEvent.businessProfileOpen({
      business_slug: BUSINESS.slug,
      business_name: BUSINESS.name,
      source_location: `${action}::${source}`,
    });

  const copyPhone = async () => {
    await navigator.clipboard.writeText(BUSINESS.phoneDisplay);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 1600);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BUSINESS.name,
    servesCuisine: "Modern American",
    priceRange: "$$$",
    telephone: BUSINESS.phoneDisplay,
    email: BUSINESS.email,
    url: BUSINESS.website,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.addressLine1,
      addressLocality: "North Greenbush",
      addressRegion: "NY",
      postalCode: "12180",
      addressCountry: "US",
    },
    sameAs: [BUSINESS.instagramUrl, BUSINESS.facebookUrl],
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <SEOHead
        title="The Roosevelt Room — North Greenbush, NY | Capital District Nest Spotlight Template"
        description="Spotlight template featuring verified public information for The Roosevelt Room in North Greenbush, NY. Business-supplied photography and expanded details pending owner review."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CleanHeader />

      {/* HERO — typographic, no unverified imagery */}
      <section className="relative w-full min-h-[92vh] overflow-hidden">
        <img
          src={rooseveltHero.url}
          alt="The Roosevelt Room — official brand key art, North Greenbush, NY"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/70 via-[#0B0F19]/40 to-[#0B0F19]" />


        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24 flex flex-col justify-end min-h-[92vh]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md flex items-center justify-center">
              <span className="font-serif text-lg tracking-widest">RR</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Eyebrow>Capital District Nest · Spotlight</Eyebrow>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-[0.22em] uppercase border"
                  style={{ borderColor: `${TEAL}55`, color: TEAL, background: "rgba(94,234,212,0.06)" }}
                >
                  Spotlight Template
                </span>
              </div>
              <p className="text-white/70 text-sm mt-1">North Greenbush · Rensselaer County, NY</p>
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl font-semibold tracking-[-0.04em] leading-[0.95] max-w-4xl">
            The Roosevelt Room
          </h1>
          <p className="mt-5 text-xl md:text-2xl text-white/80 font-light max-w-2xl">
            A destination restaurant in North Greenbush, minutes from downtown Troy.
          </p>

          <p className="mt-5 text-sm text-white/55 max-w-2xl">
            This page demonstrates the Capital District Nest premium business experience.
            Business-supplied photography and additional verified details can be added
            after owner review.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BUSINESS.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("reserve", "hero")}
              className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
            >
              <Calendar className="h-4 w-4" /> Reserve
            </a>

            {isMobile ? (
              <a
                href={BUSINESS.phoneHref}
                onClick={() => track("call", "hero")}
                className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white border border-white/25 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md transition"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    onClick={() => track("call_popover", "hero")}
                    className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white border border-white/25 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md transition"
                  >
                    <Phone className="h-4 w-4" /> Call
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-[#0B0F19] border border-white/10 text-white w-72 p-5">
                  <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-white/50">Call</p>
                  <p className="mt-2 text-lg font-semibold">{BUSINESS.name}</p>
                  <p className="mt-1 text-white/80 text-xl tracking-tight">{BUSINESS.phoneDisplay}</p>
                  <div className="mt-4 flex gap-2">
                    <a
                      href={BUSINESS.phoneHref}
                      onClick={() => track("call", "hero_popover")}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90"
                    >
                      <Phone className="h-3.5 w-3.5" /> Call Now
                    </a>
                    <button
                      onClick={copyPhone}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full text-xs font-semibold border border-white/20 text-white hover:bg-white/10"
                    >
                      {phoneCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {phoneCopied ? "Copied" : "Copy Number"}
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            <button
              onClick={() => { setContactOpen(true); track("email", "hero"); }}
              className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white border border-white/25 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md transition"
            >
              <Mail className="h-4 w-4" /> Email
            </button>

            <a
              href={BUSINESS.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("directions", "hero")}
              className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white border border-white/25 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md transition"
            >
              <MapPin className="h-4 w-4" /> Directions
            </a>
            <a
              href={BUSINESS.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("website", "hero")}
              className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white border border-white/25 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md transition"
            >
              <Globe className="h-4 w-4" /> Website
            </a>

            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("instagram", "hero")}
              className="lift-hover inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white/85 border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] backdrop-blur-md transition"
            >
              <Instagram className="h-4 w-4" /> Official Instagram
            </a>
            <a
              href={BUSINESS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("facebook", "hero")}
              className="lift-hover inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white/85 border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] backdrop-blur-md transition"
            >
              <Facebook className="h-4 w-4" /> Official Facebook
            </a>
          </div>

          {/* Meta strip — verified public info only */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
            <span>Modern American</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Hours listed on the restaurant's official website</span>
            </div>
            <span>Reservations recommended</span>
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRO — original Capital District Nest editorial, no fabricated specifics */}
      <section className="px-6 md:px-10 py-24 md:py-32 max-w-4xl mx-auto">
        <Eyebrow>Capital District Nest Spotlight</Eyebrow>
        <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02]">
          A destination room in North Greenbush.
        </h2>
        <div className="mt-10 space-y-6 text-lg md:text-xl text-white/75 font-light leading-relaxed">
          <p>
            The Roosevelt Room sits just outside downtown Troy in North Greenbush —
            close enough to the city's dinner-hour momentum, far enough to feel
            like its own occasion. It's the kind of address locals point out-of-town
            guests toward when the night needs to feel considered.
          </p>
          <p>
            Capital District Nest is publishing this Spotlight as a template
            featuring verified public information for the restaurant. Menus,
            seasonal features, and current dishes live on the business's own
            website and social channels — the fastest source of truth.
          </p>
          <p>
            When the owner is ready, we can add approved photography, team
            profiles, menu highlights, and video — verified by the restaurant
            rather than assumed by us.
          </p>
        </div>
      </section>

      {/* FOLLOW THE BUSINESS — official social channels, no unverified imagery */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Follow the Business"
            title="Follow The Roosevelt Room."
            intro="For current dishes, events, reservations, and restaurant updates, follow the official channels directly."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Instagram */}
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("instagram", "social_hero")}
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] md:aspect-[5/6] border border-white/10 block"
            >
              <AbstractBackdrop variant="warm" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #E1306C 0%, transparent 70%)" }}
              />
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                <div>
                  <div
                    className="inline-flex items-center justify-center rounded-[26%] shadow-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #FEDA75 0%, #FA7E1E 25%, #D62976 50%, #962FBF 75%, #4F5BD5 100%)",
                      padding: "14px",
                    }}
                  >
                    <Instagram className="text-white h-12 w-12 md:h-[76px] md:w-[76px]" strokeWidth={1.6} />
                  </div>
                  <span className="mt-4 inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.22em] uppercase bg-white/10 border border-white/20 text-white/85 backdrop-blur">
                    Official Instagram
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-white/70">Instagram</p>
                  <h3 className="mt-2 text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white leading-tight">
                    {BUSINESS.instagramHandle}
                  </h3>
                  <p className="mt-4 text-white/85 max-w-md">
                    Current dishes, cocktails, and moments — posted by the restaurant.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-white text-black">
                    View Instagram <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>

            {/* Facebook */}
            <a
              href={BUSINESS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("facebook", "social_hero")}
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] md:aspect-[5/6] border border-white/10 block"
            >
              <AbstractBackdrop variant="cool" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #1877F2 0%, transparent 70%)" }}
              />
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                <div>
                  <div
                    className="inline-flex items-center justify-center rounded-2xl shadow-2xl h-16 w-16 md:h-[92px] md:w-[92px]"
                    style={{ background: "#1877F2" }}
                    aria-label="Facebook"
                  >
                    <span className="text-white font-bold leading-none text-[44px] md:text-[64px]" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                      f
                    </span>
                  </div>
                  <span className="mt-4 inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.22em] uppercase bg-white/10 border border-white/20 text-white/85 backdrop-blur">
                    Official Facebook
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-white/70">Facebook</p>
                  <h3 className="mt-2 text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white leading-tight">
                    The Roosevelt Room
                  </h3>
                  <p className="mt-4 text-white/85 max-w-md">
                    Announcements, updates, and events — posted by the restaurant.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-white text-black">
                    View Facebook <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* GALLERY — replaced with honest owner-invitation module */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 min-h-[420px] p-10 md:p-16">
            <AbstractBackdrop variant="default" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/50" />
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.05] backdrop-blur">
                <ImageIcon className="h-3.5 w-3.5 text-white/70" />
                <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/70">
                  Business photography pending owner review
                </span>
              </div>
              <h2 className="mt-6 text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
                The full visual story is coming soon.
              </h2>
              <p className="mt-5 text-lg text-white/70 font-light leading-relaxed">
                Capital District Nest can add approved photography, team profiles, menu
                highlights, and video after business review. We publish imagery only
                when it's verified and authorized by the business.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={APPLY_URL}
                  onClick={() => track("apply", "gallery_placeholder")}
                  className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90"
                >
                  Help complete this profile
                </Link>
                <a
                  href={BUSINESS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("instagram", "gallery_placeholder")}
                  className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white border border-white/25 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md"
                >
                  <Instagram className="h-4 w-4" /> See official photos
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORIES — honest placeholder */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <Eyebrow>Media Room</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
            Stories from The Roosevelt Room are coming soon.
          </h2>
          <p className="mt-6 text-lg text-white/70 font-light leading-relaxed">
            Capital District Nest is preparing original features, interviews, seasonal
            updates, and behind-the-scenes stories — published only after business
            review. Until then, follow the restaurant directly for the most current
            updates.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("instagram", "stories_placeholder")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href={BUSINESS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("facebook", "stories_placeholder")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white border border-white/25 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md transition"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Team section intentionally omitted — see mem://editorial/no-fabricated-content.
          The Team block is added only when real names, titles, bios, and owner-approved
          photos are supplied by the business. */}

      {/* WHAT A NIGHT CAN BE — generic experience shape, no fabricated specifics */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="What a Night Can Be"
            title="The shape of an evening here."
            intro="Common reasons locals visit destination rooms like this one — the restaurant's own channels are the source of truth for current specifics."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map(({ icon: Icon, title, text }) => (
              <GlassCard key={title} className="p-8 hover:border-white/20 transition">
                <Icon className="h-6 w-6" style={{ color: TEAL }} />
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* AI CONCIERGE */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="AI Concierge"
            title="Ask about the neighborhood."
            intro="Powered by Capital District Nest AI. Ask about the area, directions, and general context — for reservations and current menu details, use the official channels."
            align="center"
          />
          <GlassCard className="mt-12 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-5 w-5" style={{ color: TEAL }} />
              <p className="text-sm text-white/60">Capital District Nest AI</p>
            </div>
            <div className="flex gap-2">
              <input
                value={conciergeInput}
                onChange={(e) => setConciergeInput(e.target.value)}
                placeholder="Ask a question about the area or getting here…"
                className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-sm placeholder:text-white/40 focus:outline-none focus:border-white/25"
              />
              <button className="px-5 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90">
                Ask
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {conciergeQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => setConciergeInput(q)}
                  className="text-xs px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-white/25 transition"
                >
                  <MessageCircle className="h-3 w-3 inline mr-1.5" />
                  {q}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* NEARBY — real neighboring destinations, verifiable public places */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Nearby You'll Love"
            title="Make a night of it in Troy."
            intro="Real neighbors in the area — worth combining with your visit."
          />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {nearby.map((n) => (
              <Link
                key={n.label}
                to={n.href}
                className="group flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition"
              >
                <span className="text-sm text-white/80">{n.label}</span>
                <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN YOUR VISIT — verified public info only, no photo */}
      <section id="visit" className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <SectionHeading eyebrow="Plan Your Visit" title="Everything you need to know." />
            <div className="mt-10 space-y-6 text-white/80">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/50">Address</p>
                <a
                  href={BUSINESS.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("directions", "visit")}
                  className="mt-2 block hover:text-white transition"
                >
                  {BUSINESS.addressLine1}<br />{BUSINESS.addressLine2}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/50">Phone</p>
                <a
                  href={BUSINESS.phoneHref}
                  onClick={() => track("call", "visit")}
                  className="mt-2 block hover:text-white transition"
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/50">Email</p>
                <button
                  onClick={() => { setContactOpen(true); track("email", "visit"); }}
                  className="mt-2 block hover:text-white transition text-left"
                >
                  {BUSINESS.email}
                </button>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/50">Website</p>
                <a
                  href={BUSINESS.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("website", "visit")}
                  className="mt-2 block hover:text-white transition"
                >
                  rooseveltroom.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/50">Hours</p>
                <p className="mt-2">
                  Current hours are listed on the restaurant's{" "}
                  <a
                    href={BUSINESS.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-white/30 underline-offset-2 hover:text-white"
                  >
                    official website
                  </a>.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/50">Reservations</p>
                <a
                  href={BUSINESS.reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("reserve", "visit")}
                  className="mt-2 block hover:text-white transition"
                >
                  Reserve on Tock
                </a>
              </div>
              <div className="pt-2 flex flex-wrap gap-3" id="reserve">
                <a
                  href={BUSINESS.reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("reserve", "visit_cta")}
                  className="lift-hover inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90"
                >
                  <Calendar className="h-4 w-4" /> Reserve a Table
                </a>
                <a
                  href={BUSINESS.phoneHref}
                  onClick={() => track("call", "visit_cta")}
                  className="lift-hover inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-white/25 bg-white/[0.06] hover:bg-white/[0.12]"
                >
                  <Phone className="h-4 w-4" /> Call The Roosevelt Room
                </a>
                <a
                  href={BUSINESS.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("directions", "visit_cta")}
                  className="lift-hover inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-white/25 bg-white/[0.06] hover:bg-white/[0.12]"
                >
                  <MapPin className="h-4 w-4" /> Get Directions
                </a>
              </div>
            </div>
          </div>
          <GlassCard className="overflow-hidden min-h-[380px] relative">
            <AbstractBackdrop variant="warm" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs uppercase tracking-[0.22em]" style={{ color: TEAL }}>On the map</p>
              <p className="mt-2 text-lg font-semibold">North Greenbush · minutes from downtown Troy</p>
              <p className="mt-1 text-white/60 text-sm">Rensselaer County, New York</p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* BUSINESS STORY — awaiting owner input */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            align="center"
            eyebrow="Business Story"
            title="The full story, straight from the team."
            intro="We're inviting The Roosevelt Room to share their opening story, team, and milestones — verified by the owner, not guessed by us."
          />
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/60">
            Owner Review Pending
          </p>
        </div>
      </section>

      {/* OWNER CTA */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <Eyebrow>Own or manage The Roosevelt Room?</Eyebrow>
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
            Help us complete this Spotlight.
          </h2>
          <p className="mt-6 text-white/70 max-w-2xl mx-auto">
            Add approved photography, team information, seasonal updates, and anything
            you want local visitors to know. Capital District Nest publishes only what
            the business verifies.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to={APPLY_URL}
              onClick={() => track("apply", "owner_cta")}
              className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90"
            >
              Complete This Profile
            </Link>
            <Link
              to="/contact"
              onClick={() => track("contact", "owner_cta")}
              className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold border border-white/25 bg-white/[0.06] hover:bg-white/[0.12]"
            >
              Contact Capital District Nest
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* MOBILE STICKY ACTION BAR */}
      <div
        className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10"
        style={{
          backgroundColor: "rgba(11,15,25,0.92)",
          backdropFilter: "blur(16px) saturate(150%)",
          WebkitBackdropFilter: "blur(16px) saturate(150%)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="grid grid-cols-4 gap-1 p-2">
          <a
            href={BUSINESS.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("reserve", "mobile_bar")}
            className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl bg-white text-black text-[11px] font-semibold"
          >
            <Calendar className="h-4 w-4" /> Reserve
          </a>
          <a
            href={BUSINESS.phoneHref}
            onClick={() => track("call", "mobile_bar")}
            className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl text-white text-[11px] font-semibold border border-white/15 bg-white/[0.05]"
          >
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href={BUSINESS.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("directions", "mobile_bar")}
            className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl text-white text-[11px] font-semibold border border-white/15 bg-white/[0.05]"
          >
            <MapPin className="h-4 w-4" /> Directions
          </a>
          <button
            onClick={() => { setContactOpen(true); track("more", "mobile_bar"); }}
            className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl text-white text-[11px] font-semibold border border-white/15 bg-white/[0.05]"
          >
            <MoreHorizontal className="h-4 w-4" /> More
          </button>
        </div>
      </div>

      <BusinessContactModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        business={{
          slug: BUSINESS.slug,
          name: BUSINESS.name,
          phoneDisplay: BUSINESS.phoneDisplay,
          phoneHref: BUSINESS.phoneHref,
          email: BUSINESS.email,
          website: BUSINESS.website,
          reservationUrl: BUSINESS.reservationUrl,
        }}
      />
    </div>
  );
};

export default RooseveltRoom;
