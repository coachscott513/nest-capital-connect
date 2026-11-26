import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import type { MegaSection } from './publicNavigationData';
import { filterTownOptions } from './publicNavigationModel';

export type PublicTown = {slug:string;name:string};

interface PublicTownDirectoryProps {
  towns:PublicTown[];
  selectedTown:string;
  guideColumns:MegaSection['columns'];
  href:(slug:string)=>string;
  onNavigate:()=>void;
  loading?:boolean;
  error?:boolean;
  mobile?:boolean;
}

/** The one complete town directory, shared by the desktop tray and mobile menu. */
export default function PublicTownDirectory({towns,selectedTown,guideColumns,href,onNavigate,loading,error,mobile}:PublicTownDirectoryProps) {
  const id=useId();
  const [query,setQuery]=useState('');
  const matches=filterTownOptions(towns,query);
  const selectedName=towns.find(t=>t.slug===selectedTown)?.name || selectedTown;
  return <div className={`nest-town-directory${mobile ? ' nest-town-directory-mobile' : ''}`}>
    <div className="nest-town-directory-main">
      <div className="nest-town-directory-heading">
        <div><p>Capital District</p><h3 id={`${id}-title`}>Find your town</h3><span>{towns.length} towns A–Z</span></div>
        {selectedTown && <Link className="nest-town-directory-clear" to={href('')} onClick={onNavigate}><X aria-hidden/>Clear {selectedName}</Link>}
      </div>
      <label className="nest-town-search" htmlFor={`${id}-search`}>Search all towns
        <span><Search aria-hidden/><input id={`${id}-search`} type="search" autoComplete="off" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Type a town name"/></span>
      </label>
      <p className="nest-town-result-count" role="status">{loading ? 'Loading published towns…' : error ? 'The complete town list could not load.' : `${matches.length} ${matches.length===1 ? 'town' : 'towns'}${query ? ' matching' : ''}`}</p>
      {!loading && !error && <nav className="nest-town-index" aria-labelledby={`${id}-title`}>
        {matches.map(t=><Link key={t.slug} to={href(t.slug)} aria-current={selectedTown===t.slug ? 'location' : undefined} onClick={onNavigate}>{t.name}</Link>)}
        {!matches.length && <p>No matching towns.</p>}
      </nav>}
      {error && <Link className="nest-town-fallback" to="/communities" onClick={onNavigate}>Open All communities</Link>}
    </div>
    <aside className="nest-town-guides" aria-label="Town guides and community resources">
      {guideColumns.map((column,index)=><section key={`${column.title}-${index}`}><h3>{column.title}</h3>{column.links.map((link,linkIndex)=><Link key={`${link.label}-${linkIndex}`} to={link.href} onClick={onNavigate}>{link.label}</Link>)}</section>)}
    </aside>
  </div>;
}
