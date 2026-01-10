import { useParams } from "react-router-dom";
import AppleTownTemplate from "@/components/AppleTownTemplate";
import NotFound from "./NotFound";

// Map of town slugs to their display names and search URLs
const townConfig: Record<string, { name: string; searchUrl: string; schoolDistrict?: string }> = {
  // Core Hubs
  "albany": { name: "Albany", searchUrl: "https://capitaldistrictnest.com/search/albany", schoolDistrict: "Albany City Schools" },
  "troy": { name: "Troy", searchUrl: "https://capitaldistrictnest.com/search/troy", schoolDistrict: "Troy City Schools" },
  "schenectady": { name: "Schenectady", searchUrl: "https://capitaldistrictnest.com/search/schenectady", schoolDistrict: "Schenectady City Schools" },
  "saratoga-springs": { name: "Saratoga Springs", searchUrl: "https://capitaldistrictnest.com/search/saratoga-springs", schoolDistrict: "Saratoga Springs Central" },
  "cohoes": { name: "Cohoes", searchUrl: "https://capitaldistrictnest.com/search/cohoes", schoolDistrict: "Cohoes City Schools" },
  
  // High-End Suburban
  "clifton-park": { name: "Clifton Park", searchUrl: "https://capitaldistrictnest.com/search/clifton-park", schoolDistrict: "Shenendehowa Central" },
  "delmar": { name: "Delmar", searchUrl: "https://capitaldistrictnest.com/search/delmar", schoolDistrict: "Bethlehem Central" },
  "niskayuna": { name: "Niskayuna", searchUrl: "https://capitaldistrictnest.com/search/niskayuna", schoolDistrict: "Niskayuna Central" },
  "loudonville": { name: "Loudonville", searchUrl: "https://capitaldistrictnest.com/search/loudonville", schoolDistrict: "North Colonie Central" },
  "voorheesville": { name: "Voorheesville", searchUrl: "https://capitaldistrictnest.com/search/voorheesville", schoolDistrict: "Voorheesville Central" },
  
  // Growth Pockets
  "watervliet": { name: "Watervliet", searchUrl: "https://capitaldistrictnest.com/search/watervliet", schoolDistrict: "Watervliet City Schools" },
  "rensselaer": { name: "Rensselaer", searchUrl: "https://capitaldistrictnest.com/search/rensselaer", schoolDistrict: "Rensselaer City Schools" },
  "waterford": { name: "Waterford", searchUrl: "https://capitaldistrictnest.com/search/waterford", schoolDistrict: "Waterford-Halfmoon UFSD" },
  "green-island": { name: "Green Island", searchUrl: "https://capitaldistrictnest.com/search/green-island", schoolDistrict: "Green Island UFSD" },
  "mechanicville": { name: "Mechanicville", searchUrl: "https://capitaldistrictnest.com/search/mechanicville", schoolDistrict: "Mechanicville City Schools" },
  
  // Satellite Commuter
  "ballston-spa": { name: "Ballston Spa", searchUrl: "https://capitaldistrictnest.com/search/ballston-spa", schoolDistrict: "Ballston Spa Central" },
  "malta": { name: "Malta", searchUrl: "https://capitaldistrictnest.com/search/malta", schoolDistrict: "Ballston Spa Central" },
  "east-greenbush": { name: "East Greenbush", searchUrl: "https://capitaldistrictnest.com/search/east-greenbush", schoolDistrict: "East Greenbush Central" },
  "guilderland": { name: "Guilderland", searchUrl: "https://capitaldistrictnest.com/search/guilderland", schoolDistrict: "Guilderland Central" },
  "colonie": { name: "Colonie", searchUrl: "https://capitaldistrictnest.com/search/colonie", schoolDistrict: "South Colonie Central" },
  
  // Rural Yield
  "stillwater": { name: "Stillwater", searchUrl: "https://capitaldistrictnest.com/search/stillwater", schoolDistrict: "Stillwater Central" },
  "schaghticoke": { name: "Schaghticoke", searchUrl: "https://capitaldistrictnest.com/search/schaghticoke", schoolDistrict: "Hoosic Valley Central" },
  "north-greenbush": { name: "North Greenbush", searchUrl: "https://capitaldistrictnest.com/search/north-greenbush", schoolDistrict: "Averill Park Central" },
  "brunswick": { name: "Brunswick", searchUrl: "https://capitaldistrictnest.com/search/brunswick", schoolDistrict: "Brunswick Central" },
  "averill-park": { name: "Averill Park", searchUrl: "https://capitaldistrictnest.com/search/averill-park", schoolDistrict: "Averill Park Central" },
  
  // New Frontiers
  "latham": { name: "Latham", searchUrl: "https://capitaldistrictnest.com/search/latham", schoolDistrict: "North Colonie Central" },
  "menands": { name: "Menands", searchUrl: "https://capitaldistrictnest.com/search/menands", schoolDistrict: "Menands UFSD" },
  "ravena": { name: "Ravena", searchUrl: "https://capitaldistrictnest.com/search/ravena", schoolDistrict: "Ravena-Coeymans-Selkirk Central" },
  "altamont": { name: "Altamont", searchUrl: "https://capitaldistrictnest.com/search/altamont", schoolDistrict: "Guilderland Central" },
  "wynantskill": { name: "Wynantskill", searchUrl: "https://capitaldistrictnest.com/search/wynantskill", schoolDistrict: "North Greenbush Central" },
  
  // Additional towns
  "bethlehem": { name: "Bethlehem", searchUrl: "https://capitaldistrictnest.com/search/bethlehem", schoolDistrict: "Bethlehem Central" },
  "glenville": { name: "Glenville", searchUrl: "https://capitaldistrictnest.com/search/glenville", schoolDistrict: "Scotia-Glenville Central" },
  "rotterdam": { name: "Rotterdam", searchUrl: "https://capitaldistrictnest.com/search/rotterdam", schoolDistrict: "Mohonasen Central" },
  "halfmoon": { name: "Halfmoon", searchUrl: "https://capitaldistrictnest.com/search/halfmoon", schoolDistrict: "Shenendehowa Central" },
  "wilton": { name: "Wilton", searchUrl: "https://capitaldistrictnest.com/search/wilton", schoolDistrict: "Saratoga Springs Central" },
};

const DynamicTownIntelligence = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !townConfig[slug]) {
    return <NotFound />;
  }
  
  const town = townConfig[slug];
  
  return (
    <AppleTownTemplate
      townSlug={slug}
      townName={town.name}
      schoolDistrict={town.schoolDistrict}
      searchUrl={town.searchUrl}
    />
  );
};

export default DynamicTownIntelligence;
