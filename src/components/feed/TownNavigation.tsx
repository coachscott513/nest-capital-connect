import { useState, type MouseEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { updateBrowseState } from './browseState';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Compact, always-visible local towns; the full alphabetical list lives in a bounded dialog. */
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

export default function TownNavigation({town,towns,onSelect,dark,large}:{town:string;towns:{slug:string;name:string}[];onSelect:(slug:string)=>void;dark:boolean;large:boolean}) {
  const [open,setOpen]=useState(false);const [find,setFind]=useState('');
  const [params]=useSearchParams();
  const href=(slug:string)=>`?${updateBrowseState(params,{town:slug})}`;
  const select=(slug:string)=>{onSelect(slug);setOpen(false);setFind('');};
  const name=(slug:string)=>towns.find(t=>t.slug===slug)?.name || slug;
  const {primary,extras}=quickTowns(town,towns.map(t=>t.slug));
  const townLink=(slug:string,label:string,className?:string)=><Link key={slug || 'all'} className={className} to={href(slug)} aria-current={town===slug ? 'location' : undefined} onClick={e=>{if(!plain(e)) return;e.preventDefault();select(slug);}}>{label}</Link>;
  const matches=towns.filter(t=>t.name.toLowerCase().includes(find.trim().toLowerCase()));
  return <section className="feed-towns" aria-labelledby="feed-towns-title">
    <div className="feed-block-title"><h2 id="feed-towns-title">Towns</h2>
      {town && <Link className="feed-town-clear" to={href('')} onClick={e=>{if(!plain(e)) return;e.preventDefault();select('');}} aria-label={`Clear town filter (${name(town)})`}><X aria-hidden/>Clear</Link>}
    </div>
    <Dialog.Root open={open} onOpenChange={o=>{setOpen(o);if(!o)setFind('');}}>
    <nav aria-label="Local towns" className="feed-town-quick">
      <Dialog.Trigger asChild><Button className="feed-towns-trigger feed-all-towns" variant="outline" aria-haspopup="dialog" aria-label={`All towns, ${towns.length} A to Z${town ? `, showing ${name(town)}` : ''}`}><MapPin aria-hidden/><span>All towns</span><small>{towns.length}</small><ChevronDown aria-hidden className="feed-all-chevron"/></Button></Dialog.Trigger>
      {primary.map(slug=>townLink(slug,name(slug)))}
      {extras.map((slug,i)=>townLink(slug,name(slug),i<PHONE_EXTRA_COUNT ? 'feed-town-shortcut-more' : 'feed-town-extra'))}
    </nav>
      <Dialog.Portal>
        <Dialog.Overlay className="feed-town-overlay"/>
        <Dialog.Content className={`nest-feed feed-glass feed-town-drawer${dark ? ' feed-dark' : ''}${large ? ' feed-large' : ''}`}>
          <Dialog.Title>Choose a town</Dialog.Title><Dialog.Description className="feed-town-drawer-status">{town ? <>Showing <strong>{name(town)}</strong></> : 'Showing all areas'} · {towns.length} towns A–Z</Dialog.Description>
          <Dialog.Close asChild><Button variant="ghost" size="icon" className="feed-drawer-close" aria-label="Close towns"><X/></Button></Dialog.Close>
          <label>Find a town<input type="search" aria-label="Find a town" value={find} onChange={e=>setFind(e.target.value)} placeholder="Type a town name"/></label>
          {townLink('',town ? 'Clear town filter · Show all areas' : 'Show all areas','feed-town-all')}
          <nav aria-label="All towns A to Z" className="feed-town-list">
            {matches.map(t=>townLink(t.slug,t.name))}
            {!matches.length && <p role="status">No matching towns.</p>}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </section>;
}
