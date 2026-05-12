import { Construction, Hammer, Route, ArrowRight } from "lucide-react";

type ProjectStatus = "Proposed" | "Planning" | "In Progress" | "Complete";

interface Project {
  icon: "construction" | "hammer" | "route";
  title: string;
  status: ProjectStatus;
  description?: string;
  href?: string;
}

interface Props {
  townName?: string;
  projects?: Project[];
  planningBoardHref?: string;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    icon: "construction",
    title: "Delaware Ave Repaving",
    status: "In Progress",
    description: "Full mill-and-pave from Four Corners through Elsmere. Expected complete fall 2026.",
  },
  {
    icon: "hammer",
    title: "New Library Wing",
    status: "Planning",
    description: "Bethlehem Public Library expansion adds a 12,000 sq ft community wing.",
  },
  {
    icon: "route",
    title: "Route 9W Roundabout",
    status: "Proposed",
    description: "Proposed roundabout at the 9W & Feura Bush intersection to reduce congestion.",
  },
];

const ICONS = { construction: Construction, hammer: Hammer, route: Route };

const STATUS_COLORS: Record<ProjectStatus, string> = {
  Proposed: "bg-foreground/8 text-foreground/70",
  Planning: "bg-blue-50 text-blue-700",
  "In Progress": "bg-amber-50 text-amber-700",
  Complete: "bg-emerald-50 text-emerald-700",
};

const TownProjects = ({
  townName = "Delmar",
  projects = DEFAULT_PROJECTS,
  planningBoardHref = "https://www.townofbethlehem.org/",
}: Props) => {
  return (
    <section id="town-projects" className="bg-white py-20 md:py-24 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3 text-primary">
            Infrastructure
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-foreground leading-[1.1]">
            Current town projects.
          </h2>
          <p className="mt-4 text-lg text-foreground/60 font-light">
            What's being built in {townName}.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {projects.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-foreground/10 bg-white p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                  {p.title}
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold mb-3 ${STATUS_COLORS[p.status]}`}
                >
                  {p.status}
                </span>
                {p.description && (
                  <p className="text-sm text-foreground/65 leading-relaxed">{p.description}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <a
            href={planningBoardHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80"
          >
            View all projects on the town planning board
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TownProjects;
