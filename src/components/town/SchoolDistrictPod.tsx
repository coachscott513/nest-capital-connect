import { GraduationCap, Trophy, Users, Star } from "lucide-react";

interface SchoolDistrictPodProps {
  townName: string;
  schoolDistrict?: string;
  nestScore: number;
}

// Town-specific school intelligence data
const SCHOOL_DATA: Record<string, {
  mascot: string;
  gradRate: string;
  athleticNote: string;
  specialPrograms: string[];
  rating: string;
}> = {
  delmar: {
    mascot: "Eagles",
    gradRate: "98%",
    athleticNote: "Division I feeder — lacrosse, track & field, swimming",
    specialPrograms: ["AP Scholar Program", "STEM Academy", "Arts Integration"],
    rating: "9/10",
  },
  troy: {
    mascot: "Flying Horses",
    gradRate: "82%",
    athleticNote: "Strong football & basketball programs",
    specialPrograms: ["IB Programme", "CTE Pathways", "Early College"],
    rating: "6/10",
  },
  "saratoga-springs": {
    mascot: "Blue Streaks",
    gradRate: "96%",
    athleticNote: "Nationally ranked swimming & cross-country",
    specialPrograms: ["BOCES Tech", "Honors Academy", "Music Conservatory"],
    rating: "9/10",
  },
  "clifton-park": {
    mascot: "Plainsmen",
    gradRate: "97%",
    athleticNote: "Shenendehowa — perennial state contenders",
    specialPrograms: ["Project Lead The Way", "AP Capstone", "World Languages"],
    rating: "9/10",
  },
  niskayuna: {
    mascot: "Silver Warriors",
    gradRate: "96%",
    athleticNote: "Top-tier Science Olympiad program",
    specialPrograms: ["Advanced Math/Science", "Robotics", "Fine Arts"],
    rating: "9/10",
  },
};

const DEFAULT_SCHOOL = {
  mascot: "—",
  gradRate: "—",
  athleticNote: "Contact us for athletic program details",
  specialPrograms: ["College Prep", "CTE", "Arts"],
  rating: "—",
};

const SchoolDistrictPod = ({ townName, schoolDistrict, nestScore }: SchoolDistrictPodProps) => {
  const townSlug = townName.toLowerCase().replace(/\s+/g, "-");
  const school = SCHOOL_DATA[townSlug] || DEFAULT_SCHOOL;

  return (
    <div className="bento-card p-6 hover-lift h-full">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Scout's Report</p>
          <h3 className="text-lg font-bold text-foreground">{schoolDistrict || `${townName} Schools`}</h3>
        </div>
      </div>

      {/* Key stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="text-center p-3 glass rounded-xl">
          <Trophy className="w-4 h-4 text-primary mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">{school.mascot}</p>
          <p className="text-[10px] text-muted-foreground uppercase">Mascot</p>
        </div>
        <div className="text-center p-3 glass rounded-xl">
          <Star className="w-4 h-4 text-primary mx-auto mb-1" />
          <p className="text-lg font-bold text-primary">{school.rating}</p>
          <p className="text-[10px] text-muted-foreground uppercase">Rating</p>
        </div>
        <div className="text-center p-3 glass rounded-xl">
          <Users className="w-4 h-4 text-primary mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">{school.gradRate}</p>
          <p className="text-[10px] text-muted-foreground uppercase">Grad Rate</p>
        </div>
      </div>

      {/* Athletic note */}
      <p className="text-sm text-muted-foreground mb-4 italic">"{school.athleticNote}"</p>

      {/* Special programs */}
      <div className="flex flex-wrap gap-2">
        {school.specialPrograms.map((prog) => (
          <span key={prog} className="text-xs px-3 py-1 rounded-full glass text-foreground font-medium">
            {prog}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SchoolDistrictPod;
