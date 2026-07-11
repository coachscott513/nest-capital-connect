import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
  Star,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Play,
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
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import FeaturedInModule from "@/components/business/FeaturedInModule";
import BusinessContactModal from "@/components/business/BusinessContactModal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { trackGAEvent } from "@/components/GARouteTracker";
import heroImg from "@/assets/roosevelt-hero.jpg";
import cocktailImg from "@/assets/roosevelt-cocktail.jpg";
import plateImg from "@/assets/roosevelt-plate.jpg";
import chefImg from "@/assets/roosevelt-chef.jpg";
import troyImg from "@/assets/roosevelt-troy.jpg";
import diningImg from "@/assets/roosevelt-dining.jpg";

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
  addressLine2: "Troy, NY 12180",
};

const TEAL = "#5eead4";

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


const team = [
  { name: "Michael Roosevelt", title: "Owner", bio: "Troy native, third-generation restaurateur.", img: chefImg },
  { name: "Chef Elena Ruiz", title: "Executive Chef", bio: "Formerly of Blue Hill at Stone Barns.", img: chefImg },
  { name: "Marcus Chen", title: "General Manager", bio: "Hospitality lead with 15 years at flagship dining rooms.", img: chefImg },
  { name: "Sara Delaney", title: "Lead Bartender", bio: "Craft cocktail program built around Hudson Valley spirits.", img: chefImg },
  { name: "Priya Iyer", title: "Pastry Chef", bio: "Seasonal desserts inspired by regional orchards.", img: chefImg },
];

const experiences = [
  { icon: CalendarHeart, title: "Anniversary Dinner", text: "A quiet corner, candlelight, and a menu designed to be remembered." },
  { icon: Wine, title: "Craft Cocktails", text: "A bar program grounded in classics, elevated with regional spirits." },
  { icon: Utensils, title: "Chef's Specials", text: "Nightly creations from Chef Ruiz — off-menu, seasonal, and rare." },
  { icon: Users, title: "Private Dining", text: "Intimate rooms for milestone gatherings, up to 24 guests." },
  { icon: Leaf, title: "Seasonal Menu", text: "Sourced from Hudson Valley farms and rotated with the seasons." },
  { icon: Gift, title: "Weekend Reservations", text: "The best tables of the week — book two weeks ahead." },
];

const themes = [
  "Excellent cocktails",
  "Professional service",
  "Elegant atmosphere",
  "Great date-night location",
  "Beautiful presentation",
  "Thoughtful wine list",
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

const timeline = [
  { year: "2014", title: "Opening", text: "Doors open on Broadway in downtown Troy." },
  { year: "2017", title: "Bar program", text: "Craft cocktail bar launches, quickly recognized regionally." },
  { year: "2019", title: "Private dining", text: "Expansion into the adjacent room for private events." },
  { year: "2022", title: "James Beard nod", text: "Semi-finalist recognition for outstanding hospitality." },
  { year: "2024", title: "Community fund", text: "Launches quarterly fundraising dinners for Troy nonprofits." },
];

const conciergeQuestions = [
  "Is this good for anniversaries?",
  "Do they take reservations?",
  "What is parking like?",
  "What should I order?",
  "Are there vegetarian options?",
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
      addressLocality: "Troy",
      addressRegion: "NY",
      postalCode: "12180",
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "312",
    },
    sameAs: [BUSINESS.instagramUrl, BUSINESS.facebookUrl],
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <SEOHead
        title="The Roosevelt Room — Troy, NY | Capital District Nest Spotlight"
        description="An editorial spotlight on The Roosevelt Room, a modern American restaurant in downtown Troy. Craft cocktails, seasonal menu, and one of the Capital District's most memorable dining rooms."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CleanHeader />

      {/* HERO */}
      <section className="relative w-full h-[92vh] min-h-[640px] overflow-hidden">
        <img
          src={heroImg}
          alt="The Roosevelt Room dining room in Troy, NY"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-[#0B0F19]" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md flex items-center justify-center">
              <span className="font-serif text-lg tracking-widest">RR</span>
            </div>
            <div>
              <Eyebrow>Capital District Nest · Spotlight</Eyebrow>
              <p className="text-white/70 text-sm mt-1">Troy, New York</p>
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl font-semibold tracking-[-0.04em] leading-[0.95] max-w-4xl">
            The Roosevelt Room
          </h1>
          <p className="mt-5 text-xl md:text-2xl text-white/80 font-light max-w-2xl">
            Modern American dining on Broadway — cocktails, seasonal menus, and one of Troy's most memorable rooms.
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

            {/* Secondary social */}
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("instagram", "hero")}
              className="lift-hover inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white/85 border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] backdrop-blur-md transition"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href={BUSINESS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("facebook", "hero")}
              className="lift-hover inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white/85 border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] backdrop-blur-md transition"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
          </div>


          {/* Meta strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" style={{ color: TEAL }} fill="currentColor" />
              <span className="text-white">4.8</span>
              <span>· 312 reviews</span>
            </div>
            <span>$$$</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Tue–Sun · 5pm–11pm</span>
            </div>
            <span>Reservations recommended</span>
          </div>
        </div>
      </section>

      {/* WHAT'S HAPPENING — living strip, owner-editable */}
      <section className="px-6 md:px-10 py-10 border-t border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping" style={{ background: TEAL }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: TEAL }} />
            </span>
            <p className="text-xs uppercase tracking-[0.28em] text-white/60">What's Happening</p>
          </div>
          <div className="flex-1 flex flex-wrap gap-2.5">
            {[
              { icon: "🍸", label: "Happy Hour Tonight" },
              { icon: "🎵", label: "Live Jazz Friday" },
              { icon: "🥃", label: "New Summer Cocktail Menu" },
              { icon: "🍽", label: "Reservations Available" },
            ].map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/12 bg-white/[0.04] text-sm text-white/90 hover:bg-white/[0.07] transition"
              >
                <span className="text-base leading-none">{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRO */}
      <section className="px-6 md:px-10 py-24 md:py-32 max-w-4xl mx-auto">
        <Eyebrow>Capital District Nest Spotlight</Eyebrow>
        <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02]">
          Why locals love The Roosevelt Room
        </h2>
        <div className="mt-10 space-y-6 text-lg md:text-xl text-white/75 font-light leading-relaxed">
          <p>
            Walk into The Roosevelt Room on a Thursday night and the first thing
            you notice isn't the food — it's the sound. A room full of people
            leaning in. Brass sconces, low light, the soft clatter of a bar
            that knows what it's doing. It feels less like a restaurant and
            more like a well-kept secret that a city decided to share.
          </p>
          <p>
            The kitchen is unshowy in the best way. Modern American, sourced
            from Hudson Valley farms, plated with restraint. Cocktails are the
            counterweight — a smoked old fashioned that arrives under glass, a
            martini that could pass a Manhattan blind taste test. This is a
            room where you order the second round without discussion.
          </p>
          <p>
            Downtown Troy is having a moment, and The Roosevelt Room is one of
            the reasons why. Anniversaries, deal-closers, the last dinner
            before someone moves away — this is the room people pick when the
            night has to mean something.
          </p>
        </div>
      </section>

      {/* REEL-FIRST MOMENT — experience the room */}
      <section className="px-6 md:px-10 py-16 md:py-24 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em]" style={{ color: TEAL }}>The Reel</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-light tracking-tight text-white">
              Experience The Roosevelt Room.
            </h2>
            <p className="mt-5 text-white/70 text-lg leading-relaxed">
              A minute inside the room — the bar, the plates, the light — straight from Instagram.
            </p>
          </div>

          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("reel_hero", "reel")}
            className="group relative mt-10 block overflow-hidden rounded-3xl border border-white/10 aspect-[9/12] sm:aspect-[16/9] max-h-[78vh] mx-auto"
          >
            <img
              src={plateImg}
              alt="The Roosevelt Room — reel preview"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 55%, rgba(225,48,108,0.35) 0%, transparent 60%)" }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-2xl opacity-70" style={{ background: TEAL }} />
                <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-full bg-white/95 flex items-center justify-center shadow-2xl transition group-hover:scale-105">
                  <Play className="h-9 w-9 md:h-10 md:w-10 text-black translate-x-0.5" fill="currentColor" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-white/90 text-xs uppercase tracking-[0.22em] border border-white/15">
                <Instagram className="h-3.5 w-3.5" />
                Official Reel
              </span>
              <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium">
                Watch on Instagram
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* FOLLOW THE BUSINESS — SOCIAL MEDIA FEATURE */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Follow the Business"
            title="Follow The Roosevelt Room."
            intro="See current dishes, events, restaurant updates, behind-the-scenes moments, and community activity directly from The Roosevelt Room."
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
              <img
                src={plateImg}
                alt="Instagram — The Roosevelt Room"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/45" />
              <div
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #E1306C 0%, transparent 70%)" }}
              />

              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                {/* Oversized Instagram glyph, upper-left */}
                <div>
                  <div
                    className="inline-flex items-center justify-center rounded-[26%] shadow-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #FEDA75 0%, #FA7E1E 25%, #D62976 50%, #962FBF 75%, #4F5BD5 100%)",
                      padding: "14px",
                    }}
                  >
                    <Instagram
                      className="text-white h-12 w-12 md:h-[76px] md:w-[76px]"
                      strokeWidth={1.6}
                    />
                  </div>
                  <span className="mt-4 inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.22em] uppercase bg-white/10 border border-white/20 text-white/85 backdrop-blur">
                    Official Instagram
                  </span>
                </div>

                <div>
                  <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-white/70">
                    Instagram
                  </p>
                  <h3 className="mt-2 text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white leading-tight">
                    {BUSINESS.instagramHandle}
                  </h3>
                  <p className="mt-4 text-white/85 max-w-md">
                    Explore new dishes, cocktails, special events, live jazz, and moments from inside The Roosevelt Room.
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
              <img
                src={diningImg}
                alt="Facebook — The Roosevelt Room"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/45" />
              <div
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #1877F2 0%, transparent 70%)" }}
              />

              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                {/* Oversized Facebook "f" glyph, upper-left */}
                <div>
                  <div
                    className="inline-flex items-center justify-center rounded-2xl shadow-2xl h-16 w-16 md:h-[92px] md:w-[92px]"
                    style={{ background: "#1877F2" }}
                    aria-label="Facebook"
                  >
                    <span
                      className="text-white font-bold leading-none text-[44px] md:text-[64px]"
                      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                    >
                      f
                    </span>
                  </div>
                  <span className="mt-4 inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.22em] uppercase bg-white/10 border border-white/20 text-white/85 backdrop-blur">
                    Official Facebook
                  </span>
                </div>

                <div>
                  <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-white/70">
                    Facebook
                  </p>
                  <h3 className="mt-2 text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white leading-tight">
                    The Roosevelt Room
                  </h3>
                  <p className="mt-4 text-white/85 max-w-md">
                    Follow restaurant updates, announcements, community events, reservations, live entertainment, and special experiences.
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

      {/* STORIES — placeholder until real editorial is published */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <Eyebrow>Media Room</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
            Stories from The Roosevelt Room are coming soon.
          </h2>
          <p className="mt-6 text-lg text-white/70 font-light leading-relaxed">
            Capital District Nest is preparing original features, interviews, seasonal updates, and behind-the-scenes stories. Until then, follow the restaurant directly for the most current updates.
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

      {/* MEET THE TEAM */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Meet the Team"
            title="The people behind the room."
            intro="From the pass to the bar, the crew that shapes every night at The Roosevelt Room."
          />
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {team.map((p) => (
              <GlassCard key={p.name} className="overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden bg-black/40">
                  <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-semibold tracking-[0.22em] text-white/50">{p.title.toUpperCase()}</p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{p.bio}</p>
                  <div className="mt-4 flex gap-3 text-white/50">
                    <Instagram className="h-4 w-4 hover:text-white cursor-pointer" />
                    <Linkedin className="h-4 w-4 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE EXPERIENCES */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Signature Experiences"
            title="What a night here can be."
            intro="Not a menu — the shape of an evening. Come for one, discover the others."
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

      {/* GALLERY */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Gallery" title="The room, the plates, the light." />
          <div className="mt-14 grid grid-cols-6 gap-3 md:gap-4">
            <img src={heroImg} alt="Dining room" loading="lazy" className="col-span-6 md:col-span-4 aspect-[16/10] object-cover rounded-2xl" />
            <img src={cocktailImg} alt="Cocktail" loading="lazy" className="col-span-3 md:col-span-2 aspect-square object-cover rounded-2xl" />
            <img src={plateImg} alt="Plated dish" loading="lazy" className="col-span-3 md:col-span-2 aspect-square object-cover rounded-2xl" />
            <img src={diningImg} alt="Table setting" loading="lazy" className="col-span-6 md:col-span-2 aspect-[4/5] object-cover rounded-2xl" />
            <img src={chefImg} alt="Chef at work" loading="lazy" className="col-span-3 md:col-span-2 aspect-[4/5] object-cover rounded-2xl" />
            <img src={troyImg} alt="Downtown Troy" loading="lazy" className="col-span-3 md:col-span-4 aspect-[16/10] object-cover rounded-2xl" />
          </div>
        </div>
      </section>

      {/* SHORT FILM */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Short Film" title="Experience The Roosevelt Room." align="center" />
          <div className="mt-12 relative rounded-3xl overflow-hidden aspect-video group cursor-pointer">
            <img src={heroImg} alt="Short film preview" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-105 transition">
                <Play className="h-8 w-8 md:h-9 md:w-9 text-black ml-1" fill="currentColor" />
              </div>
            </div>
            <p className="absolute bottom-6 left-6 text-white/80 text-sm">One-minute cinematic feature · CDN Films</p>
          </div>
        </div>
      </section>

      {/* AI CONCIERGE */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="AI Concierge"
            title="Ask about The Roosevelt Room."
            intro="Powered by Capital District Nest AI. Ask anything — reservations, atmosphere, what to order."
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
                placeholder="Ask a question about The Roosevelt Room…"
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

      {/* BEFORE YOU VISIT — quick-hit glass cards */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Before You Visit"
            title="Good to know."
            intro="A quick read of the room before you book — what to expect, and what it's best for."
          />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Calendar, title: "Reservations Recommended", text: "Weekends fill 10–14 days out. Weekdays easier." },
              { icon: Leaf, title: "Outdoor Seating", text: "Seasonal patio available May through October." },
              { icon: CalendarHeart, title: "Date Night", text: "Low light, quiet corners, unhurried service." },
              { icon: Wine, title: "Craft Cocktails", text: "Full bar with a Hudson Valley–forward program." },
              { icon: Users, title: "Private Events", text: "Adjacent room seats up to 24 for milestones." },
              { icon: Gift, title: "Gift Cards Available", text: "Purchase in-house or ask by phone." },
            ].map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/20 transition"
              >
                <c.icon className="h-6 w-6 mb-4" style={{ color: TEAL }} />
                <p className="text-base font-medium text-white">{c.title}</p>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY YOU'LL LOVE — real neighboring destinations */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Nearby You'll Love"
            title="Make a night of it in Troy."
            intro="Real neighbors on the block. Not paid placements — just what's genuinely worth walking to."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Lucas Confectionery", kind: "Wine bar · River Street", note: "Natural wine and small plates two blocks north." },
              { name: "Bard & Baker", kind: "Board game café · Broadway", note: "Coffee, dessert, and hundreds of games after dinner." },
              { name: "Superior Merchandise Co.", kind: "Café + cocktails · River Street", note: "Espresso by day, cocktails by night — a Troy fixture." },
              { name: "River Street", kind: "Walkable district", note: "Boutiques, galleries, and the Hudson a block away." },
              { name: "Troy Waterfront", kind: "Riverfront + park", note: "Sunset walk along the Hudson before or after dinner." },
              { name: "Troy Farmers Market", kind: "Saturdays · River Street", note: "Year-round market. One of the largest in the Northeast." },
            ].map((n) => (
              <div
                key={n.name}
                className="group p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/25 transition"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">{n.kind}</p>
                <p className="mt-3 text-lg font-medium text-white">{n.name}</p>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{n.note}</p>
              </div>
            ))}
          </div>

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

      {/* REVIEW THEMES */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            eyebrow="What Guests Say"
            title="Themes that come up, over and over."
            intro="Not a review aggregator — the patterns Capital District Nest editors hear again and again when locals talk about this room."
          />
          <div className="mt-12 flex flex-wrap gap-3">
            {themes.map((t) => (
              <span
                key={t}
                className="px-5 py-3 rounded-full border border-white/15 bg-white/[0.04] text-sm text-white/85"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED IN — editorial ecosystem placements */}
      <FeaturedInModule
        businessSlug="the-roosevelt-room"
        currentPath="/business/the-roosevelt-room"
      />

      {/* PLAN YOUR VISIT */}
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
                <p className="mt-2">Tuesday – Sunday · 5:00pm – 11:00pm</p>
                <p className="text-white/50 text-sm">Closed Monday</p>
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
            <img src={troyImg} alt="Downtown Troy" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs uppercase tracking-[0.22em]" style={{ color: TEAL }}>On the map</p>
              <p className="mt-2 text-lg font-semibold">Downtown Troy · Broadway corridor</p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* BUSINESS STORY / TIMELINE */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Business Story" title="A ten-year arc on Broadway." />
          <div className="mt-14 space-y-8">
            {timeline.map((t) => (
              <div key={t.year} className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 border-b border-white/[0.06] pb-8">
                <p className="text-2xl md:text-3xl font-semibold text-white/40 tracking-tight">{t.year}</p>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{t.title}</h3>
                  <p className="mt-2 text-white/60 leading-relaxed">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Related Stories" title="Keep exploring Troy." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "More restaurants nearby", href: "/local?town=troy&category=restaurant", img: plateImg },
              { title: "Things to do in Troy", href: "/weekly?town=troy", img: troyImg },
              { title: "Living in Troy", href: "/living-in/troy", img: diningImg },
              { title: "Homes near downtown Troy", href: "/homes/search/troy", img: heroImg },
            ].map((c) => (
              <Link key={c.title} to={c.href} className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700" />
                </div>
                <p className="mt-4 text-lg font-semibold tracking-tight group-hover:text-white/80">{c.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OWNER CTA */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <Eyebrow>Own this business?</Eyebrow>
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
            Claim your profile. Become a Featured Partner.
          </h2>
          <p className="mt-6 text-white/70 max-w-2xl mx-auto">
            This is the flagship editorial experience on Capital District Nest. Featured partners get original storytelling, media coverage, and a place inside the region's most trusted local guide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/claim-business" className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90">
              Claim this listing
            </Link>
            <Link to="/business" className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold border border-white/25 bg-white/[0.06] hover:bg-white/[0.12]">
              Become a Featured Partner
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
