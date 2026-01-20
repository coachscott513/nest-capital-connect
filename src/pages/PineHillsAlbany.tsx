import LovableNeighborhoodTemplate from "@/components/LovableNeighborhoodTemplate";
import { Coffee, TreePine, Music, Utensils } from "lucide-react";

const PineHillsAlbany = () => {
  return (
    <LovableNeighborhoodTemplate
      neighborhoodName="Pine Hills"
      cityName="Albany"
      citySlug="albany"
      neighborhoodSlug="pine-hills"
      pageTitle="Pine Hills Homes for Sale | Albany, NY Real Estate | Capital District Nest"
      metaDescription="Find homes for sale in Pine Hills, Albany NY. Tree-lined streets near UAlbany, Washington Park, and Madison Ave. Your local guide to Pine Hills real estate."
      keywords="Pine Hills Albany homes for sale, Pine Hills real estate, Albany Pine Hills properties, UAlbany area homes, Madison Avenue Albany, Washington Park homes"
      vibeDescription="Historic charm meets urban energy—tree-lined streets and proximity to the park."
      dayInLifeNarrative="Imagine waking up to the sound of birds in the century-old oaks, grabbing a craft latte at your favorite Madison Ave cafe, and spending your afternoon strolling through Washington Park as the tulips bloom—all before dinner at a cozy neighborhood bistro."
      hiddenGems={[
        {
          name: "The Daily Grind",
          description: "The neighborhood's beloved coffee shop where regulars know your order. Best espresso on Madison Ave.",
          icon: <Coffee className="w-6 h-6 text-primary" />
        },
        {
          name: "Buckingham Pond",
          description: "A quiet escape just minutes away—perfect for morning jogs or peaceful evening walks with the dog.",
          icon: <TreePine className="w-6 h-6 text-primary" />
        },
        {
          name: "The Linda",
          description: "Intimate live music venue that's been hosting legendary acts since 2007. A true local gem.",
          icon: <Music className="w-6 h-6 text-primary" />
        },
        {
          name: "Crave",
          description: "Farm-to-table brunch spot with the best shakshuka in the Capital District. Get there early on weekends.",
          icon: <Utensils className="w-6 h-6 text-primary" />
        }
      ]}
      practicalData={{
        commuteToAlbany: "8 min",
        commuteToEmployers: "15 min to State Campus",
        schoolDistrict: "Albany CSD",
        schoolRating: "7/10",
        medianPrice: "$245,000",
        daysOnMarket: "26 days",
        priceChange: "+4.2% YoY"
      }}
      vendors={[
        {
          name: "Capital Region Mortgage",
          type: "finance",
          contactName: "Mike Thompson",
          phone: "5186762347",
          badge: "Top Lender"
        },
        {
          name: "Harrison Law Group",
          type: "legal",
          contactName: "Sarah Harrison, Esq.",
          phone: "5186762347",
          badge: "Closings Expert"
        },
        {
          name: "Pine Hills Contracting",
          type: "contractor",
          contactName: "Tom Russo",
          phone: "5186762347",
          badge: "Rehab Specialist"
        },
        {
          name: "Upstate Insurance",
          type: "insurance",
          contactName: "Lisa Chen",
          phone: "5186762347"
        }
      ]}
      highlights={[
        "Walking distance to UAlbany campus",
        "Madison Avenue restaurants & shops",
        "Steps from Washington Park",
        "Diverse architectural styles",
        "Strong rental market for investors",
        "Active neighborhood associations"
      ]}
    />
  );
};

export default PineHillsAlbany;
