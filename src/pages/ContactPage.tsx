import { Helmet } from "react-helmet-async";
import { Mail, Phone, ArrowRight } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import {
  GENERAL_EMAIL,
  MEDIA_EMAIL,
  BUSINESS_EMAIL,
  SUPPORT_EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  PLATFORM_TAGLINE,
  EDITORIAL_TEAM,
} from "@/config/contact";

const channels = [
  { label: "Editorial & Media", email: MEDIA_EMAIL, body: "Story tips, corrections, interviews, and press inquiries." },
  { label: "Business Partnerships", email: BUSINESS_EMAIL, body: "Feature your business, claim a profile, sponsorships, and partnerships." },
  { label: "General", email: GENERAL_EMAIL, body: "Anything else — we route it to the right person." },
  { label: "Support", email: SUPPORT_EMAIL, body: "Technical issues, account help, and platform bugs." },
];

const ContactPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Helmet>
      <title>Contact Capital District Nest | Editorial, Business & General</title>
      <meta
        name="description"
        content="Get in touch with the Capital District Nest editorial team for stories, business partnerships, events, and local coverage across New York's Capital District."
      />
      <link rel="canonical" href="https://www.capitaldistrictnest.com/contact" />
    </Helmet>

    <CleanHeader />

    {/* HERO (DARK) */}
    <section className="bg-[#0e0f12] text-white py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5 text-[#5eead4]">
          Contact the Team
        </p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02]">
          Capital District Nest
        </h1>
        <p className="mt-6 text-lg md:text-xl font-light text-white/70">
          {PLATFORM_TAGLINE}. An independent regional media and local
          discovery platform — answered by a real editorial team.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-[#0d6e66] text-white hover:opacity-90 transition"
          >
            <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
          </a>
          <a
            href={`mailto:${MEDIA_EMAIL}`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/20 text-white hover:bg-white/[0.06] transition"
          >
            <Mail className="w-4 h-4" /> {MEDIA_EMAIL}
          </a>
        </div>

        <p className="mt-6 text-xs text-white/45 tracking-wide">
          Mon–Sat · We typically reply within a few hours.
        </p>
      </div>
    </section>

    {/* CHANNELS (LIGHT) */}
    <section className="bg-white py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3 text-[#0d6e66]">
            {EDITORIAL_TEAM}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
            The right inbox for the right question
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {channels.map((c) => (
            <a
              key={c.label}
              href={`mailto:${c.email}`}
              className="rounded-2xl bg-white p-7 border border-[#1d1d1f]/[0.08] hover:border-[#0d6e66]/40 transition group"
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66] mb-2">
                {c.label}
              </p>
              <p className="text-[15px] text-[#1d1d1f]/70 font-light leading-relaxed mb-4">{c.body}</p>
              <p className="text-sm font-medium text-[#1d1d1f] inline-flex items-center gap-1 group-hover:text-[#0d6e66] transition">
                {c.email} <ArrowRight className="w-3.5 h-3.5" />
              </p>
            </a>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a href="/about-editorial" className="text-sm text-[#0d6e66] font-semibold hover:opacity-80">
            About Our Editorial Team →
          </a>
        </div>
      </div>
    </section>

    {/* REAL ESTATE DISCLOSURE (LIGHT, lower) */}
    <section className="bg-[#f7f7f5] py-20 md:py-24 px-6 md:px-10 border-t border-[#1d1d1f]/[0.06]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3 text-[#0d6e66]">
          Real Estate Inquiries
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
          Buying, selling, or investing?
        </h2>
        <p className="mt-3 text-[15px] text-[#1d1d1f]/65 font-light leading-relaxed">
          Licensed real estate services on Capital District Nest are provided by
          Scott Alvarez, a Licensed Real Estate Salesperson in New York State.
          Reach the real estate team directly:
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
          <a
            href="tel:+15185227265"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1d1d1f]/15 text-[#1d1d1f] hover:bg-[#1d1d1f]/[0.04] transition"
          >
            <Phone className="w-4 h-4" /> (518) 522-7265
          </a>
          <a
            href="mailto:scott@capitaldistrictnest.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1d1d1f]/15 text-[#1d1d1f] hover:bg-[#1d1d1f]/[0.04] transition"
          >
            <Mail className="w-4 h-4" /> scott@capitaldistrictnest.com
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ContactPage;
