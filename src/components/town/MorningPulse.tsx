import { Sun, Newspaper, ArrowRight } from "lucide-react";

interface NewsItem {
  title: string;
  href?: string;
}

interface Props {
  townName?: string;
  temp?: string;
  conditions?: string;
  news?: NewsItem[];
  newsHref?: string;
}

const DEFAULT_NEWS: NewsItem[] = [
  { title: "New roundabout proposed for Route 9W" },
  { title: "Bethlehem 2026 town budget passes unanimously" },
  { title: "Delmar Farmers Market opens for the season" },
];

const MorningPulse = ({
  townName = "Delmar",
  temp = "72°F",
  conditions = "Partly Cloudy",
  news = DEFAULT_NEWS,
  newsHref = "https://www.timesunion.com/",
}: Props) => {
  const updated = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <section id="local-pulse" className="bg-[#faf8f3] py-16 md:py-20 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl bg-white border border-foreground/10 shadow-[0_18px_48px_-24px_rgba(0,0,0,0.18)] overflow-hidden">
          <div className="grid md:grid-cols-[280px_1fr] divide-y md:divide-y-0 md:divide-x divide-foreground/10">
            {/* Weather */}
            <div className="p-7 bg-gradient-to-br from-[#fdf6e3] to-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-primary">
                  Morning Pulse
                </span>
              </div>
              <p className="text-xs text-foreground/55 mb-4">{townName}, NY</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#c9a449]/15 flex items-center justify-center">
                  <Sun className="w-7 h-7 text-[#c9a449]" />
                </div>
                <div>
                  <p className="text-3xl font-semibold text-foreground tracking-tight">{temp}</p>
                  <p className="text-sm text-foreground/60">{conditions}</p>
                </div>
              </div>
            </div>

            {/* News */}
            <div className="p-7">
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Local News</span>
              </div>
              <ul className="space-y-2.5 mb-5">
                {news.map((n, i) => (
                  <li
                    key={i}
                    className="text-sm text-foreground/75 leading-snug flex items-start gap-2"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                    <span>{n.title}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <a
                  href={newsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80"
                >
                  See more local news <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-[11px] text-foreground/40">Updated {updated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MorningPulse;
