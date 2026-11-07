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
        <div className="nest-map-hub">Capital District Nest</div>
        <div className="nest-map-nodes">
          <svg className="nest-map-trunk" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true"><path data-path="trunk" pathLength="1" vectorEffect="non-scaling-stroke" d="M1 0 V100" /></svg>
          {connections.map((item, index) => {
            const Icon = item.icon;
            const body = <><Icon aria-hidden="true" /><span>{item.label}{item.detail && <small>{item.detail}</small>}</span><ArrowUpRight aria-hidden="true" /></>;
            const props = { className: "nest-map-node", "data-node": index, onFocus: () => setHighlight(index), onBlur: () => setHighlight(null), onMouseEnter: () => setHighlight(index) };
            const branch = <svg className="nest-map-branch" viewBox="0 0 36 100" preserveAspectRatio="none" aria-hidden="true"><path data-path={index} data-active={highlight === index} pathLength="1" vectorEffect="non-scaling-stroke" d="M0 0 Q0 50 36 50" /></svg>;
            return item.to.startsWith("https")
              ? <a key={item.to} {...props} href={item.to} target="_blank" rel="noopener noreferrer">{branch}{body}<span className="sr-only"> (opens in a new tab)</span></a>
              : <Link key={item.to} {...props} to={item.to}>{branch}{body}</Link>;
          })}
        </div>
      </div>
    </nav>
  );
}