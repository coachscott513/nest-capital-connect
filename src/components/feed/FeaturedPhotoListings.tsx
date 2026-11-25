import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { feedTownHref, isFeaturedListing, isNewListing, type FeedRow } from './feedModel';
import { featuredPhoto } from './featuredPhotos';
import { rowDate } from './FeedLine';

const price = (row: FeedRow) => row.price?.toLocaleString('en-US', {style:'currency',currency:'USD',maximumFractionDigits:0});
function PropertyPhoto({row}: {row: FeedRow}) {
  const photo=featuredPhoto(row); const [failed,setFailed]=useState(false);
  return photo.src && !failed
    ? <img src={photo.src} alt={photo.example ? `${row.title} — example finishes` : row.title} onError={()=>setFailed(true)}/>
    : <span className="featured-photo-missing"><strong>{row.title}</strong><span>{row.town}</span></span>;
}
export default function FeaturedPhotoListings({rows,saved,onSave}: {rows:FeedRow[];saved:FeedRow[];onSave:(row:FeedRow)=>void}) {
  const [selectedId,setSelectedId]=useState<string|null>(null);
  const selected=rows.find(row=>row.id===selectedId);
  const dialog=useRef<HTMLDialogElement>(null);
  const opener=useRef<HTMLElement|null>(null);
  useEffect(()=>{
    const node=dialog.current;
    if(!node) return;
    if(selected && !node.open) node.showModal();
    if(!selected && node.open) node.close();
    if(!selected) return;
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    return ()=>{document.body.style.overflow=previous;};
  },[selected]);
  const open=(event:MouseEvent<HTMLAnchorElement>,row:FeedRow)=>{
    if(event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); opener.current=event.currentTarget; setSelectedId(row.id);
  };
  const close=()=>dialog.current?.close();
  const saveButton=(row:FeedRow)=>{
    const isSaved=saved.some(item=>item.id===row.id);
    return <Button variant="ghost" size="icon" className="featured-photo-save" aria-label={`${isSaved ? 'Unsave' : 'Save'} ${row.title}`} aria-pressed={isSaved} title={isSaved ? 'Remove saved row' : 'Save on this device'} onClick={()=>onSave(row)}><Bookmark aria-hidden fill={isSaved ? 'currentColor' : 'none'}/></Button>;
  };
  const badge=(row:FeedRow)=><span className="featured-photo-badge">{isFeaturedListing(row) ? 'Featured' : 'Listed'}{isNewListing(row) ? ' · New' : ''}</span>;
  return <section className="feed-featured-section featured-photo-section" aria-labelledby="feed-featured-title">
    <div className="feed-block-title"><h2 id="feed-featured-title">Featured listings</h2></div>
    <div className="featured-photo-grid">{rows.map(row=><article key={row.id} className="featured-photo-tile" data-example={featuredPhoto(row).example || undefined} data-listing-id={row.id}>
      <a className="featured-photo-link featured-photo-media" href={row.href} aria-label={`View details for ${row.title}`} aria-haspopup="dialog" onClick={event=>open(event,row)}>
        <PropertyPhoto key={featuredPhoto(row).src} row={row}/>{badge(row)}{featuredPhoto(row).example && <span className="featured-photo-note">Example finishes</span>}
      </a>
      <div className="featured-photo-caption"><a className="featured-photo-title" href={row.href} aria-haspopup="dialog" onClick={event=>open(event,row)}>{row.title}</a>
        <Link className="featured-photo-town" to={feedTownHref(row.town)}>{row.town}</Link><span className="featured-photo-price">{price(row)}</span>
      </div>
      <div className="featured-photo-footer"><span className="featured-photo-courtesy">{row.source}</span><a className="featured-photo-source" href={row.href}>Source</a>{saveButton(row)}</div>
    </article>)}</div>
    <dialog ref={dialog} className="featured-dialog" aria-labelledby="featured-dialog-title" onClose={()=>{setSelectedId(null);opener.current?.focus();}} onKeyDown={event=>{
      if(event.key!=='Tab') return;
      const controls=Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex="0"]'));
      const first=controls[0],last=controls[controls.length-1];
      if(!first || !last) return;
      if(event.shiftKey && document.activeElement===first) {event.preventDefault();last.focus();}
      else if(!event.shiftKey && document.activeElement===last) {event.preventDefault();first.focus();}
    }} onClick={event=>{
      if(event.target!==event.currentTarget) return;
      const box=event.currentTarget.getBoundingClientRect();
      if(event.clientX<box.left || event.clientX>box.right || event.clientY<box.top || event.clientY>box.bottom) close();
    }}>
      {selected && <><div className="featured-dialog-media"><PropertyPhoto key={featuredPhoto(selected).src} row={selected}/>
        {featuredPhoto(selected).example && <span className="featured-photo-note">Example finishes</span>}
        <Button variant="ghost" size="icon" className="featured-dialog-close" aria-label="Close listing details" onClick={close} autoFocus><X aria-hidden/></Button>
      </div>
      <div className="featured-dialog-content"><Link className="featured-dialog-town" to={feedTownHref(selected.town)}>{selected.town}</Link>
        <h2 id="featured-dialog-title">{selected.title}</h2><p className="featured-dialog-price">{price(selected)}</p>
        {selected.facts && <p className="featured-dialog-facts">{selected.facts}</p>}
        <p className="featured-dialog-facts">Listed <time dateTime={selected.date}>{rowDate(selected)}</time></p>
        <div className="featured-dialog-footer"><div className="featured-dialog-agent">{selected.source}</div>{saveButton(selected)}
          <div className="featured-dialog-links"><a href={selected.href}>Source</a>{featuredPhoto(selected).mls && <a className="featured-dialog-mls" href={featuredPhoto(selected).mls}>MLS listing</a>}
            <Button asChild className="featured-dialog-cta"><a href={selected.href}>View agent’s listing<ExternalLink aria-hidden size={16}/></a></Button>
          </div>
        </div>
      </div></>}
    </dialog>
  </section>;
}