import { Helmet } from "react-helmet-async";
import { Mail, Phone } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import {
  PLATFORM_NAME,
  PLATFORM_TAGLINE,
  EDITORIAL_TEAM,
  MEDIA_EMAIL,
  BUSINESS_EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/config/contact";

const standards = [
  {
    title: "Original local reporting",
    body:
      "Every story, business feature, and neighborhood guide is written by the Capital District Nest editorial team based on first-hand research, verified public information, and direct conversations with local operators. We don't republish press releases as editorial coverage.",
  },
  {
    title: "No anonymous reviews, no public star ratings",
    body:
      "We don't aggregate anonymous ratings or publish public star scores for the businesses we cover. Business coverage reflects verifiable facts — hours, location, ownership, offerings — and clearly labels editorial opinion when we include it.",
  },
  {
    title: "Verified information only",
    body:
      "Business names, addresses, phone numbers, hours, ownership, and claims about longevity or scope are verified against public records and, wherever possible, confirmed directly with the business before publication. Unverified facts are marked or omitted.",
  },
  {
    title: "No fabricated content",
    body:
      "We do not invent team members, quotes, awards, project photos, or history. If we don't have a verified detail, we mark it as pending owner verification or leave it out.",
  },
  {
    title: "Owner review process",
    body:
      "Business profiles move through clear states — template, preview, owner review, verified, and published. Owners are invited to review and correct their profile before it moves to published. The current state is always shown on the page.",
  },
  {
    title: "Corrections policy",
    body:
      "If we get something wrong, we fix it and note the correction. Email corrections to our editorial team and we will respond within one business day.",
  },
  {
    title: "Sponsorship does not buy editorial opinion",
    body:
      "Featured placements, spotlights, and sponsorships are disclosed. Editorial opinion, ranking, and inclusion are not for sale. A business paying to be featured does not receive different treatment of the facts.",
  },
  {
    title: "How businesses can update their profile",
    body:
      "Owners can claim or update any Capital District Nest business profile at /claim-business or /for-businesses/apply. We prefer owner-supplied photography, hours, and descriptions over anything we might otherwise infer.",
  },
  {
    title: "Trust and independence",
    body:
      "Capital District Nest is an independent regional media and local discovery platform. Editorial coverage is separate from real estate services, and brokerage identity appears only on real estate pages where it is legally required.",
  },
];

const AboutEditorial = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Helmet>
      <title>About Our Editorial Team | Capital District Nest</title>
      <meta
        name="description"
        content="Capital District Nest is an independent regional media and local discovery platform. Learn about our editorial standards, verification process, and how to reach the team."
      />
      <link rel="canonical" href="https://www.capitaldistrictnest.com/about-editorial" />
    </Helmet>

    <CleanHeader />

    {/* Hero */}
    <section className="bg-[#0e0f12] text-white py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5 text-[#5eead4]">
          About Our Editorial Team
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
          {PLATFORM_NAME}
        </h1>
        <p className="mt-5 text-lg md:text-xl font-light text-white/70">
          {PLATFORM_TAGLINE}. An independent regional media and local
          discovery platform covering New York's Capital District — Albany,
          Rensselaer, Saratoga, Schenectady, and Warren counties.
        </p>
      </div>
    </section>

    {/* Standards */}
    <section className="bg-white py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3 text-[#0d6e66]">
          Editorial Standards
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[#1d1d1f] mb-10">
          How we cover the Capital District
        </h2>

        <div className="space-y-8">
          {standards.map((s) => (
            <div key={s.title} className="border-l-2 border-[#0d6e66]/30 pl-6">
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{s.title}</h3>
              <p className="text-[15px] text-[#1d1d1f]/70 font-light leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Contact */}
    <section className="bg-[#f7f7f5] py-20 px-6 md:px-10 border-t border-[#1d1d1f]/[0.06]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3 text-[#0d6e66]">
          Contact
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
          {EDITORIAL_TEAM}
        </h2>
        <p className="mt-3 text-[15px] text-[#1d1d1f]/65 font-light leading-relaxed">
          Story tips, corrections, media inquiries, and editorial questions.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
          <a href={`mailto:${MEDIA_EMAIL}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1d1d1f]/15 text-[#1d1d1f] hover:bg-[#1d1d1f]/[0.04] transition">
            <Mail className="w-4 h-4" /> {MEDIA_EMAIL}
          </a>
          <a href={PHONE_TEL} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1d1d1f]/15 text-[#1d1d1f] hover:bg-[#1d1d1f]/[0.04] transition">
            <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
          </a>
        </div>
        <p className="mt-8 text-xs text-[#1d1d1f]/50">
          For business partnerships, sponsorships, or claiming a profile, email{" "}
          <a href={`mailto:${BUSINESS_EMAIL}`} className="underline hover:text-[#0d6e66]">
            {BUSINESS_EMAIL}
          </a>
          .
        </p>
      </div>
    </section>

    <Footer />
  </div>
);

export default AboutEditorial;
