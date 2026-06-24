import { Helmet } from "react-helmet-async";
import { Phone, Mail, ArrowRight } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

const TEAM_PHONE_DISPLAY = "518-207-9348";
const TEAM_PHONE_TEL = "+15182079348";
const TEAM_EMAIL = "team@capitaldistrictnest.com";

const ContactPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Helmet>
      <title>Contact Capital District Nest | Local Real Estate & Business Platform</title>
      <meta
        name="description"
        content="Get in touch with the Capital District Nest team for real estate, business profiles, events, and local partnerships across New York's Capital District."
      />
      <link rel="canonical" href="https://www.capitaldistrictnest.com/contact" />
    </Helmet>

    <CleanHeader />

    {/* HERO (DARK) — brand-first */}
    <section className="bg-[#0e0f12] text-white py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5 text-[#5eead4]">
          Contact the Team
        </p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02]">
          Capital District Nest
        </h1>
        <p className="mt-6 text-lg md:text-xl font-light text-white/70">
          The digital front door of the Capital District. Real estate, local
          businesses, events, and neighborhood intelligence — answered by a
          real local team.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`tel:${TEAM_PHONE_TEL}`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(220,28,46,0.6)]"
            style={{ backgroundColor: "#DC1C2E" }}
          >
            <Phone className="w-4 h-4" /> {TEAM_PHONE_DISPLAY}
          </a>
          <a
            href={`mailto:${TEAM_EMAIL}`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 transition"
          >
            <Mail className="w-4 h-4" /> {TEAM_EMAIL}
          </a>
        </div>

        <p className="mt-6 text-xs text-white/45 tracking-wide">
          Mon–Sat · We typically reply within a few hours.
        </p>
      </div>
    </section>

    {/* WHAT WE HELP WITH (LIGHT) */}
    <section className="bg-white py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: "Real Estate", body: "Buying, selling, investing across the Capital District." },
            { title: "Business Profiles", body: "Claim, update, or feature your local business on the Nest." },
            { title: "Events & Local", body: "Submit events, partner with us, or get listed in your town." },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl bg-white p-7 border border-[#1d1d1f]/[0.08]"
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66] mb-2">
                {c.title}
              </p>
              <p className="text-[15px] text-[#1d1d1f]/70 font-light leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href={`mailto:${TEAM_EMAIL}`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white font-semibold hover:opacity-90 transition"
          >
            Email the Team <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>

    {/* FOUNDER (LIGHT, lower) */}
    <section className="bg-[#f7f7f5] py-20 md:py-24 px-6 md:px-10 border-t border-[#1d1d1f]/[0.06]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3 text-[#0d6e66]">
          Founder
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
          Scott Alvarez
        </h2>
        <p className="mt-3 text-[15px] text-[#1d1d1f]/65 font-light leading-relaxed">
          Founder of Capital District Nest · REALTOR® at RE/MAX Solutions.
          For direct real estate inquiries you can also reach Scott directly.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
          <a
            href="tel:+15185227265"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1d1d1f]/15 text-[#1d1d1f] hover:bg-[#1d1d1f]/[0.04] transition"
          >
            <Phone className="w-4 h-4" /> (518) 522-7265
          </a>
          <a
            href="mailto:team@capitaldistrictnest.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1d1d1f]/15 text-[#1d1d1f] hover:bg-[#1d1d1f]/[0.04] transition"
          >
            <Mail className="w-4 h-4" /> team@capitaldistrictnest.com
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ContactPage;
