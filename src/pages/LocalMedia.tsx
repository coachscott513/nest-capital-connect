import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import LocalMediaPulse from "@/components/home/LocalMediaPulse";

const LocalMedia = () => (
  <div className="min-h-screen bg-[#0B0F19]">
    <SEOHead
      title="Local Media Coverage | Capital District Nest"
      description="Today's local coverage, curated. Business openings, restaurants, development, sports, events, and neighborhood stories from trusted local sources."
    />
    <CleanHeader />
    <main className="pt-24">
      <section className="px-6 md:px-10 pt-12 pb-6 max-w-5xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[#5eead4] mb-5">
          Local Media
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.035em] text-white leading-[1.02]">
          Today's local coverage, curated.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto">
          Business openings, restaurants, development, sports, events, and
          neighborhood stories from trusted local sources.
        </p>
      </section>
      <LocalMediaPulse />
    </main>
    <Footer />
  </div>
);

export default LocalMedia;
