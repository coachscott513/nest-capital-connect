import { useParams, Navigate } from "react-router-dom";
import TownPageTemplate from "@/components/town/TownPageTemplate";
import { livingInTowns } from "@/data/livingInTowns";

interface LivingInTownProps {
  slugOverride?: string;
}

const LivingInTown = ({ slugOverride }: LivingInTownProps) => {
  const { slug: routeSlug = "" } = useParams();
  const slug = slugOverride ?? routeSlug;
  const town = livingInTowns[slug];

  if (!town) return <Navigate to="/communities" replace />;

  return <TownPageTemplate town={town} />;
};

export default LivingInTown;
