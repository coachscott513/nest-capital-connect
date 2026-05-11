import { Helmet } from "react-helmet-async";
import { Phone, Mail, ArrowRight } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

const ContactPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Helmet>
      <title>Talk to Scott Alvarez | Capital District Nest</title>
      <meta
        name="description"
        content="Talk to Scott Alvarez, RE/MAX Solutions — Capital District real estate expert. Call or email for homes, neighborhoods, and market guidance."
      />
      <link rel="canonical" href="https://www.capitaldistrictnest.com/contact" />
    </Helmet>

    <CleanHeader />

    {/* HERO (DARK) */}
    <section className="bg-[#0e0f12] text-white py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5 text-[#5eead4]">
          Talk to an Expert
        </p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02]">
          Talk to Scott.
        </h1>
        <p className="mt-6 text-lg md:text-xl font-light text-white/70">
          Scott Alvarez · RE/MAX Solutions. Capital District real estate, honestly analyzed.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="tel:+15185227265"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(220,28,46,0.6)]"
            style={{ backgroundColor: "#DC1C2E" }}
          >
            <Phone className="w-4 h-4" /> (518) 522-7265
          </a>
          <a
            href="mailto:scott@capitaldistrictnest.com"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 transition"
          >
            <Mail className="w-4 h-4" /> scott@capitaldistrictnest.com
          </a>
        </div>
      </div>
    </section>

    {/* WHAT TO EXPECT (LIGHT) */}
    <section className="bg-white py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: "Buying", body: "Get matched to homes, towns, and financing that fit." },
            { title: "Selling", body: "Honest pricing, marketing, and a calm process." },
            { title: "Investing", body: "Real Capital Region rents, real underwriting." },
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
            href="tel:+15185227265"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white font-semibold hover:opacity-90 transition"
          >
            Call Scott Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ContactPage;
