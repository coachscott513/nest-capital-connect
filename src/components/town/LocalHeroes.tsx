import { Trophy, Sparkles, ArrowRight } from "lucide-react";

interface Props {
  townName?: string;
}

const LocalHeroes = ({ townName = "Delmar" }: Props) => {
  const cards = [
    {
      icon: Trophy,
      label: "Athlete of the Week",
      prompt: "Know a local athlete who deserves recognition?",
      cta: "Nominate an athlete",
      tone: "from-[#c9a449]/15 to-transparent",
      iconColor: "text-[#c9a449]",
    },
    {
      icon: Sparkles,
      label: "Community Spotlight",
      prompt: "Nominate a local business owner or community leader.",
      cta: "Nominate a hero",
      tone: "from-primary/15 to-transparent",
      iconColor: "text-primary",
    },
  ];

  return (
    <section id="local-heroes" className="bg-[#faf8f3] py-20 md:py-24 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3 text-primary">
            Community
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-foreground leading-[1.1]">
            Local Heroes.
          </h2>
          <p className="mt-4 text-lg text-foreground/60 font-light">
            Celebrating the people who make {townName} great.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className={`rounded-3xl border border-foreground/10 bg-gradient-to-br ${c.tone} bg-white p-8 md:p-10 transition-all hover:-translate-y-0.5 hover:shadow-lg`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${c.iconColor}`} />
                  </div>
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-foreground/70">
                    {c.label}
                  </p>
                </div>

                <div className="aspect-[16/10] rounded-2xl bg-foreground/[0.04] border border-foreground/5 flex items-center justify-center mb-6">
                  <span className="text-sm text-foreground/40 font-medium">Coming Soon</span>
                </div>

                <p className="text-foreground/70 mb-5 leading-relaxed">{c.prompt}</p>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80"
                >
                  {c.cta} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LocalHeroes;
