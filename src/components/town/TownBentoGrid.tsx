import SchoolDistrictPod from "./SchoolDistrictPod";
import LocalFlavorCarousel from "./LocalFlavorCarousel";
import LiveDealFeed from "./LiveDealFeed";

interface TownBentoGridProps {
  townName: string;
  townSlug: string;
  schoolDistrict?: string;
  nestScore: number;
}

const TownBentoGrid = ({ townName, townSlug, schoolDistrict, nestScore }: TownBentoGridProps) => {
  return (
    <section className="py-16 px-[5%] bg-card">
      <div className="w-full">
        <div className="mb-10">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-2">Local Intelligence</p>
          <h2 className="text-3xl md:text-4xl font-extralight text-foreground tracking-tight">
            Inside {townName}
          </h2>
        </div>

        {/* 3-column bento: Schools | Local Flavor | Live Deals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SchoolDistrictPod
            townName={townName}
            schoolDistrict={schoolDistrict}
            nestScore={nestScore}
          />
          <LocalFlavorCarousel
            townName={townName}
            townSlug={townSlug}
          />
          <LiveDealFeed
            townSlug={townSlug}
            townName={townName}
          />
        </div>
      </div>
    </section>
  );
};

export default TownBentoGrid;
