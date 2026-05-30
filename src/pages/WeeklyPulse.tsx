import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import WeeklyFeed, { WeeklyNewsletterCTA } from "@/components/WeeklyFeed";

const WeeklyPulse = () => (
  <div className="min-h-screen bg-[#0B0F19]">
    <SEOHead
      title="This Week in the Capital District | Capital District Nest"
      description="Concerts, restaurant weeks, markets, openings, family events, networking, and local specials across the Capital District."
    />
    <CleanHeader />
    <main className="pt-24">
      <section className="px-6 md:px-10 pt-12 pb-6 max-w-5xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[#5eead4] mb-5">
          This Week
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.035em] text-white leading-[1.02]">
          Plan the week in one place.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto">
          Concerts, restaurant weeks, markets, openings, family events,
          networking, and local specials.
        </p>
      </section>
      <WeeklyFeed scope="region" />
      <WeeklyNewsletterCTA />
    </main>
    <Footer />
  </div>
);

export default WeeklyPulse;
