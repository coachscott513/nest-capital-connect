import { type MouseEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { updateBrowseState } from './browseState';
import { X } from 'lucide-react';

/** Compact popular towns; the complete searchable index lives in the single top-level Towns tab. */
export const FEATURED_TOWNS=['albany','delmar','voorheesville','clifton-park','schenectady','troy'];
/** Recognized desktop-sidebar extras; shown only when the town exists in loaded records. */
export const EXTRA_TOWNS=['saratoga-springs','colonie','guilderland','latham','niskayuna','cohoes','east-greenbush','ballston-spa','loudonville','glenmont','watervliet','halfmoon','mechanicville','malta'];
/** How many extras also show on phones (the first entries above). */
export const PHONE_EXTRA_COUNT=4;

/** Quick shortcuts: the original six, then a selected uncommon town, then desktop-only extras, never duplicated. */
export function quickTowns(town:string,available:string[]){
  const has=(slug:string)=>available.includes(slug);
  const featured=FEATURED_TOWNS.filter(has);
  const selected=town && has(town) && !featured.includes(town) ? [town] : [];
  const extras=EXTRA_TOWNS.filter(slug=>has(slug) && !featured.includes(slug) && !selected.includes(slug));
  return {primary:[...featured,...selected],extras};
}
const plain=(e:MouseEvent)=>!(e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button!==0);

export default function TownNavigation({town,towns,onSelect}:{town:string;towns:{slug:string;name:string}[];onSelect:(slug:string)=>void}) {
  const [params]=useSearchParams();
  const href=(slug:string)=>`?${updateBrowseState(params,{town:slug})}`;
  const select=(slug:string)=>onSelect(slug);
  const name=(slug:string)=>towns.find(t=>t.slug===slug)?.name || slug;
  const {primary,extras}=quickTowns(town,towns.map(t=>t.slug));
  const townLink=(slug:string,label:string,className?:string)=><Link key={slug || 'all'} className={className} to={href(slug)} aria-current={town===slug ? 'location' : undefined} onClick={e=>{if(!plain(e)) return;e.preventDefault();select(slug);}}>{label}</Link>;
  return <section className="feed-towns" aria-labelledby="feed-towns-title">
    <div className="feed-block-title"><h2 id="feed-towns-title">Popular towns</h2>
      {town && <Link className="feed-town-clear" to={href('')} onClick={e=>{if(!plain(e)) return;e.preventDefault();select('');}} aria-label={`Clear town filter (${name(town)})`}><X aria-hidden/>Clear</Link>}
    </div>
    <nav aria-label="Popular town shortcuts" className="feed-town-quick">
      {primary.map(slug=>townLink(slug,name(slug)))}
      {extras.map((slug,index)=>townLink(slug,name(slug),index<PHONE_EXTRA_COUNT ? 'feed-town-shortcut-more' : 'feed-town-extra'))}
    </nav>
  </section>;
}
