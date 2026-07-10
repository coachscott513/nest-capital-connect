import { useParams } from "react-router-dom";
import TownPageTemplate from "@/components/town/TownPageTemplate";
import RealScoutAlbanySearch from "@/components/home/RealScoutAlbanySearch";
import { livingInTowns, makeTownPlaceholder, type LivingInTown as LivingInTownData } from "@/data/livingInTowns";
import { findTownInDirectory } from "@/data/capitalDistrictCounties";

interface LivingInTownProps {
  slugOverride?: string;
}

const titleizeSlug = (slug: string) =>
  decodeURIComponent(slug || "town")
    .replace(/^living-in-/, "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const resolveTown = (slug: string): LivingInTownData => {
  const existing = livingInTowns[slug];
  if (existing) return existing;

  const directory = findTownInDirectory(slug);
  const townName = directory?.name ?? titleizeSlug(slug);
  const county = directory?.county ?? "Capital District";
  const fallback = makeTownPlaceholder(townName, slug, county);

  if (directory?.nearby?.length) {
    fallback.nearbyTowns = directory.nearby;
  }
  return fallback;
};

const LivingInTown = ({ slugOverride }: LivingInTownProps) => {
  const { townSlug = "", slug = "", townPath = "" } = useParams();
  const routeSlug =
    townSlug ||
    slug ||
    (townPath.startsWith("living-in-") ? townPath.replace(/^living-in-/, "") : "");
  const resolvedSlug = (slugOverride ?? routeSlug).toLowerCase();

  const town = resolveTown(resolvedSlug);
  return (
    <>
      <TownPageTemplate town={town} />
      {resolvedSlug === "albany" && <RealScoutAlbanySearch />}
    </>
  );
};

export default LivingInTown;
