import { Utensils, Coffee, Wrench, Dumbbell, HeartPulse, Briefcase } from "lucide-react";

interface Props {
  townName: string;
}

const CATEGORIES = [
  { label: "Restaurants",           icon: Utensils },
  { label: "Coffee",                icon: Coffee },
  { label: "Home Services",         icon: Wrench },
  { label: "Fitness",               icon: Dumbbell },
  { label: "Health",                icon: HeartPulse },
  { label: "Professional Services", icon: Briefcase },
];

const BusinessCategoriesGrid = ({ townName }: Props) => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <p className="eyebrow-apple text-[#0d6e66] mb-4">Local Directory</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
            Explore {townName} Businesses
          </h2>
          <p className="mt-5 text-lg text-[#1d1d1f]/65 max-w-xl mx-auto font-light">
            The places locals actually use — curated, not crowdsourced.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {CATEGORIES.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className="card-lift group flex flex-col items-center justify-center gap-4 py-12 px-6 rounded-2xl bg-[#f5f3ee] hover:bg-white border border-transparent hover:border-[#0d6e66]/15 transition-all"
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white group-hover:bg-[#0d6e66]/10 transition-colors">
                <Icon className="w-6 h-6 text-[#0d6e66]" strokeWidth={1.5} />
              </span>
              <span className="text-base font-medium text-[#1d1d1f] tracking-tight">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessCategoriesGrid;
