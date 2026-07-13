import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import EditorialBreather from "@/components/EditorialBreather";
import { BUSINESS_SPOTLIGHTS } from "@/data/businessSpotlights";

const STORY_SECTIONS = [
  { id: "business", label: "Business Spotlights" },
  { id: "food", label: "Food & Drink" },
  { id: "people", label: "People" },
  { id: "homes", label: "Homes" },
  { id: "town", label: "Town Life" },
  { id: "weekend", label: "Weekend" },
  { id: "new", label: "New & Notable" },
  { id: "community", label: "Community" },
];

const StoriesHub = () => {
  const canonical = "https://www.capitaldistrictnest.com/stories";
  const title = "Local Stories | Capital District Nest";
  const description =
    "Original local stories from Capital District Nest — business spotlights, food and drink, people, homes, town life, weekend picks, and community.";

  const spotlights = BUSINESS_SPOTLIGHTS.filter((s) => s.status === "published");
  const upcoming = BUSINESS_SPOTLIGHTS.filter((s) => s.status === "coming_soon");

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
      </Helmet>

      <CleanHeader />

      <section className="px-6 md:px-10 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#5eead4] mb-5">
            Local Stories
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.02em] leading-[1.05]">
            The Capital District, told by the people who live it.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light">
            Original spotlights, weekend picks, and community stories from
            across the region.
          </p>
        </div>
      </section>

      {/* Section chips */}
      <section className="px-6 md:px-10 pb-10">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2">
          {STORY_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-xs font-semibold text-white/80 hover:text-white transition"
            >
              {s.label}
            </a>
          ))}
        </div>
      </section>

      {/* Business spotlights */}
      <section id="business" className="px-6 md:px-10 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
            Business Spotlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {spotlights.map((s) => (
              <Link
                key={s.slug}
                to={s.profileRoute ?? "#"}
                className="group block rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] hover:border-[#0d6e66]/50 transition-all"
              >
                <div className="relative aspect-[4/3] bg-[#0d6e66]/10 overflow-hidden">
                  {s.heroImage ? (
                    <img
                      src={s.heroImage}
                      alt={s.businessName}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-[#5eead4]/40" />
                    </div>
                  )}
                  {s.hasVideo && (
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-[11px] font-medium text-white/50 mb-2">
                    {s.category} • {s.town}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight group-hover:text-[#5eead4] transition">
                    {s.businessName}
                  </h3>
                  <p className="text-sm text-white/65 mt-2 line-clamp-3">{s.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#5eead4]">
                    Read the story <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {upcoming.length > 0 && (
            <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#5eead4] mb-3">
                In production
              </p>
              <p className="text-white/70 max-w-2xl">
                {upcoming.length} more Spotlights are underway across coffee,
                home services, professional services, and wellness. Know a
                business worth featuring?{" "}
                <Link
                  to="/business-spotlight-intake"
                  className="text-[#5eead4] hover:text-white font-semibold"
                >
                  Nominate a business →
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Placeholder sections */}
      {STORY_SECTIONS.filter((s) => s.id !== "business").map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="px-6 md:px-10 pb-14 border-t border-white/[0.05]"
        >
          <div className="max-w-6xl mx-auto pt-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {s.label}
            </h2>
            <p className="text-white/55 mt-3 max-w-2xl">
              New {s.label.toLowerCase()} stories are on the way. Follow along
              from the homepage weekly feed or nominate a story worth telling.
            </p>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
};

export default StoriesHub;
