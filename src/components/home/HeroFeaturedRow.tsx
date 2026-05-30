/* =============================================================
   HERO FEATURED ROW
   The previous implementation rendered "Featured placement
   available" fallback CTA cards whenever the live directory had
   fewer than 3 featured businesses. That fallback is removed
   from the homepage. This section now renders the curated
   premium demo spotlights (Christie Hoyt Mortgage Team,
   Roosevelt Room, Premium Local Partner) via RegionalSpotlights.
   ============================================================= */
import RegionalSpotlights from "@/components/home/RegionalSpotlights";

const HeroFeaturedRow = () => <RegionalSpotlights />;

export default HeroFeaturedRow;
