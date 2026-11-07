import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Building2, Globe, Users, ChartNoAxesCombined } from "lucide-react";

const connections = [
  { label: "Business listing", to: "/claim-business", icon: Building2 },
  { label: "Website & marketing", detail: "Coach One Media", to: "https://coachonemedia.com", icon: Globe },
  { label: "Professional support", to: "/professional-services", icon: Users },
  { label: "Property tools", to: "/investment-properties", icon: ChartNoAxesCombined },
];

export default function NestServiceMap() {
  const [highlight, setHighlight] = useState<number | null>(null);
  return (
    <nav className="nest-service-map" aria-label="Service navigation map" data-entry-group>
      <p className="nest-map-heading">Find your next connection</p>
      <div className="nest-map-diagram" onMouseLeave={() => setHighlight(null)}>
        <svg viewBox="0 0 400 390" preserveAspectRatio="none" aria-hidden="true" className="nest-map-paths">
          {connections.map((item, index) => <path key={item.to} data-path={index} data-active={highlight === index} pathLength="1" d={`M 200 48 C 200 80, 22 60, 22 110 L 22 ${132 + index * 76} Q 22 ${146 + index * 76}, 70 ${146 + index * 76}`} />)}
        </svg>
        <div className="nest-map-hub">Capital District Nest</div>
        <div className="nest-map-nodes">
          {connections.map((item, index) => {
            const Icon = item.icon;
            const body = <><Icon aria-hidden="true" /><span>{item.label}{item.detail && <small>{item.detail}</small>}</span><ArrowUpRight aria-hidden="true" /></>;
            const props = { className: "nest-map-node", "data-node": index, onFocus: () => setHighlight(index), onBlur: () => setHighlight(null), onMouseEnter: () => setHighlight(index) };
            return item.to.startsWith("https")
              ? <a key={item.to} {...props} href={item.to} target="_blank" rel="noopener noreferrer">{body}<span className="sr-only"> (opens in a new tab)</span></a>
              : <Link key={item.to} {...props} to={item.to}>{body}</Link>;
          })}
        </div>
      </div>
    </nav>
  );
}