import { useState, type MouseEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { updateBrowseState } from './browseState';
import * as Dialog from '@radix-ui/react-dialog';
import { MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Compact, always-visible local towns; the full alphabetical list lives in a bounded dialog. */
export const FEATURED_TOWNS=['albany','delmar','voorheesville','clifton-park','schenectady','troy'];
const plain=(e:MouseEvent)=>!(e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button!==0);

export default function TownNavigation({town,towns,onSelect,dark,large}:{town:string;towns:{slug:string;name:string}[];onSelect:(slug:string)=>void;dark:boolean;large:boolean}) {
  const [open,setOpen]=useState(false);const [find,setFind]=useState('');
  const [params]=useSearchParams();
  const href=(slug:string)=>`?${updateBrowseState(params,{town:slug})}`;
  const select=(slug:string)=>{onSelect(slug);setOpen(false);setFind('');};
  const name=(slug:string)=>towns.find(t=>t.slug===slug)?.name || slug;
  const featured=FEATURED_TOWNS.filter(slug=>towns.some(t=>t.slug===slug));
  const quick=town && !featured.includes(town) ? [...featured,town] : featured;
  const townLink=(slug:string,label:string)=><Link key={slug || 'all'} to={href(slug)} aria-current={town===slug ? 'location' : undefined} onClick={e=>{if(!plain(e)) return;e.preventDefault();select(slug);}}>{label}</Link>;
  const matches=towns.filter(t=>t.name.toLowerCase().includes(find.trim().toLowerCase()));
  return <section className="feed-towns" aria-labelledby="feed-towns-title">
    <div className="feed-block-title"><h2 id="feed-towns-title">Town</h2><span aria-live="polite">Showing <strong>{town ? name(town) : 'All towns'}</strong></span></div>
    <nav aria-label="Local towns" className="feed-town-quick">
      {townLink('','All towns')}
      {quick.map(slug=>townLink(slug,name(slug)))}
    <Dialog.Root open={open} onOpenChange={o=>{setOpen(o);if(!o)setFind('');}}>
      <Dialog.Trigger asChild><Button className="feed-towns-trigger" variant="outline"><MapPin aria-hidden/>All {towns.length} towns A–Z</Button></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="feed-town-overlay"/>
        <Dialog.Content className={`nest-feed feed-town-drawer${dark ? ' feed-dark' : ''}${large ? ' feed-large' : ''}`}>
          <Dialog.Title>Choose a town</Dialog.Title><Dialog.Description className="sr-only">Search the alphabetical list and choose a town for the current results.</Dialog.Description>
          <Dialog.Close asChild><Button variant="ghost" size="icon" className="feed-drawer-close" aria-label="Close towns"><X/></Button></Dialog.Close>
          <label>Find a town<input type="search" aria-label="Find a town" value={find} onChange={e=>setFind(e.target.value)} placeholder="Type a town name"/></label>
          <nav aria-label="All towns A to Z" className="feed-town-list">
            {!find && townLink('','All towns')}
            {matches.map(t=>townLink(t.slug,t.name))}
            {!matches.length && <p role="status">No matching towns.</p>}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    </nav>
  </section>;
}
