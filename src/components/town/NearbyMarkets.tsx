import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

// Geographic proximity map — each town lists its 6 nearest neighbors
const nearbyTowns: Record<string, string[]> = {
  "albany": ["delmar", "colonie", "guilderland", "loudonville", "menands", "rensselaer"],
  "troy": ["watervliet", "cohoes", "rensselaer", "wynantskill", "north-greenbush", "green-island"],
  "schenectady": ["niskayuna", "rotterdam", "glenville", "colonie", "guilderland", "scotia"],
  "saratoga-springs": ["wilton", "malta", "ballston-spa", "stillwater", "halfmoon", "clifton-park"],
  "clifton-park": ["halfmoon", "malta", "saratoga-springs", "colonie", "waterford", "ballston-spa"],
  "delmar": ["bethlehem", "albany", "guilderland", "voorheesville", "ravena", "altamont"],
  "niskayuna": ["schenectady", "colonie", "glenville", "rotterdam", "waterford", "cohoes"],
  "loudonville": ["colonie", "albany", "latham", "menands", "guilderland", "watervliet"],
  "voorheesville": ["altamont", "guilderland", "delmar", "bethlehem", "schoharie", "ravena"],
  "cohoes": ["watervliet", "green-island", "troy", "waterford", "colonie", "latham"],
  "watervliet": ["cohoes", "green-island", "troy", "colonie", "albany", "menands"],
  "rensselaer": ["albany", "east-greenbush", "troy", "north-greenbush", "wynantskill", "menands"],
  "waterford": ["halfmoon", "cohoes", "mechanicville", "clifton-park", "saratoga-springs", "stillwater"],
  "green-island": ["cohoes", "watervliet", "troy", "waterford", "colonie", "latham"],
  "mechanicville": ["stillwater", "waterford", "schaghticoke", "halfmoon", "ballston-spa", "saratoga-springs"],
  "ballston-spa": ["malta", "saratoga-springs", "clifton-park", "mechanicville", "stillwater", "halfmoon"],
  "malta": ["ballston-spa", "saratoga-springs", "clifton-park", "halfmoon", "stillwater", "wilton"],
  "east-greenbush": ["rensselaer", "north-greenbush", "averill-park", "albany", "troy", "wynantskill"],
  "guilderland": ["altamont", "voorheesville", "albany", "delmar", "colonie", "schenectady"],
  "colonie": ["loudonville", "latham", "albany", "niskayuna", "guilderland", "menands"],
  "stillwater": ["mechanicville", "saratoga-springs", "waterford", "schaghticoke", "ballston-spa", "halfmoon"],
  "schaghticoke": ["mechanicville", "stillwater", "troy", "brunswick", "waterford", "halfmoon"],
  "north-greenbush": ["east-greenbush", "rensselaer", "wynantskill", "averill-park", "troy", "brunswick"],
  "brunswick": ["troy", "schaghticoke", "north-greenbush", "averill-park", "east-greenbush", "wynantskill"],
  "averill-park": ["east-greenbush", "north-greenbush", "brunswick", "rensselaer", "troy", "wynantskill"],
  "latham": ["colonie", "loudonville", "cohoes", "watervliet", "menands", "albany"],
  "menands": ["albany", "loudonville", "colonie", "latham", "watervliet", "rensselaer"],
  "ravena": ["bethlehem", "delmar", "coxsackie", "albany", "catskill", "voorheesville"],
  "altamont": ["guilderland", "voorheesville", "delmar", "schenectady", "schoharie", "cobleskill"],
  "wynantskill": ["troy", "north-greenbush", "east-greenbush", "rensselaer", "averill-park", "brunswick"],
  "bethlehem": ["delmar", "albany", "ravena", "guilderland", "voorheesville", "rensselaer"],
  "glenville": ["schenectady", "niskayuna", "rotterdam", "colonie", "clifton-park", "waterford"],
  "rotterdam": ["schenectady", "glenville", "niskayuna", "guilderland", "altamont", "colonie"],
  "halfmoon": ["clifton-park", "waterford", "mechanicville", "malta", "cohoes", "saratoga-springs"],
  "wilton": ["saratoga-springs", "malta", "ballston-spa", "stillwater", "clifton-park", "halfmoon"],
  "catskill": ["coxsackie", "athens", "hunter", "windham", "ravena", "bethlehem"],
  "coxsackie": ["athens", "catskill", "ravena", "bethlehem", "hunter", "windham"],
  "windham": ["hunter", "catskill", "athens", "middleburgh", "schoharie", "coxsackie"],
  "hunter": ["windham", "catskill", "athens", "middleburgh", "schoharie", "coxsackie"],
  "athens": ["coxsackie", "catskill", "hunter", "windham", "ravena", "bethlehem"],
  "schoharie": ["middleburgh", "cobleskill", "sharon-springs", "altamont", "guilderland", "voorheesville"],
  "cobleskill": ["schoharie", "middleburgh", "sharon-springs", "altamont", "guilderland", "voorheesville"],
  "middleburgh": ["schoharie", "cobleskill", "sharon-springs", "windham", "hunter", "catskill"],
  "sharon-springs": ["cobleskill", "schoharie", "middleburgh", "amsterdam", "altamont", "guilderland"],
  "amsterdam": ["sharon-springs", "schoharie", "cobleskill", "schenectady", "rotterdam", "glenville"],
};

// Display names for slugs
const townNames: Record<string, string> = {
  "albany": "Albany", "troy": "Troy", "schenectady": "Schenectady",
  "saratoga-springs": "Saratoga Springs", "clifton-park": "Clifton Park",
  "delmar": "Delmar", "niskayuna": "Niskayuna", "loudonville": "Loudonville",
  "voorheesville": "Voorheesville", "cohoes": "Cohoes", "watervliet": "Watervliet",
  "rensselaer": "Rensselaer", "waterford": "Waterford", "green-island": "Green Island",
  "mechanicville": "Mechanicville", "ballston-spa": "Ballston Spa", "malta": "Malta",
  "east-greenbush": "East Greenbush", "guilderland": "Guilderland", "colonie": "Colonie",
  "stillwater": "Stillwater", "schaghticoke": "Schaghticoke",
  "north-greenbush": "North Greenbush", "brunswick": "Brunswick",
  "averill-park": "Averill Park", "latham": "Latham", "menands": "Menands",
  "ravena": "Ravena", "altamont": "Altamont", "wynantskill": "Wynantskill",
  "bethlehem": "Bethlehem", "glenville": "Glenville", "rotterdam": "Rotterdam",
  "halfmoon": "Halfmoon", "wilton": "Wilton", "catskill": "Catskill",
  "coxsackie": "Coxsackie", "windham": "Windham", "hunter": "Hunter",
  "athens": "Athens", "schoharie": "Schoharie", "cobleskill": "Cobleskill",
  "middleburgh": "Middleburgh", "sharon-springs": "Sharon Springs",
  "amsterdam": "Amsterdam",
};

interface NearbyMarketsProps {
  townSlug: string;
  townName: string;
}

const NearbyMarkets = ({ townSlug, townName }: NearbyMarketsProps) => {
  const neighbors = nearbyTowns[townSlug]?.slice(0, 6) ?? [];

  if (neighbors.length === 0) return null;

  return (
    <section className="py-16 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Nearby Markets
          </h2>
        </div>
        <p className="text-muted-foreground mb-8">
          Explore real estate intelligence in communities near {townName}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {neighbors.map((slug) => (
            <Link
              key={slug}
              to={`/towns/${slug}`}
              className="group flex items-center justify-between px-5 py-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
            >
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {townNames[slug] || slug}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyMarkets;
