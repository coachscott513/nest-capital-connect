import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logEngagement } from '@/lib/engagement';
import { feedTownHref, isNewListing, rowIdentity, type FeedCategory, type FeedRow } from './feedModel';
import { browseCategories, moreCategories } from './browseState';
const categoryLabel=(category:FeedCategory)=>[...browseCategories,...moreCategories].find(c=>c.value===category)?.label;
function interaction(action:string,category?:string) {logEngagement(`feed_${action}`,{}, {source_location:'homepage_feed',...(category ? {category_slug:category} : {})});}
export function rowDate(row:FeedRow) {
  if (!row.date) return row.category==='rentals' ? 'Availability not supplied' : 'Directory profile';
  const date = row.dateOnly ? new Date(`${row.date.slice(0,10)}T12:00:00`) : new Date(row.date);
  return date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',...(row.dateOnly ? {} : {timeZone:'America/New_York'})});
}
const price = (value:number) => value.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
export function FeedLine({row,saved,onSave}:{row:FeedRow;saved:boolean;onSave:(row:FeedRow)=>void}) {
  const listing = row.kind === 'listing';
  const identity=rowIdentity(row);
  const detailsLink=(label:string,action:string)=>row.category==='rentals'
    ? <Link to={row.href} preventScrollReset onClick={()=>interaction(action,row.category)}>{label}</Link>
    : <a href={row.href} onClick={()=>interaction(action,row.category)}>{label}</a>;
  const townLink = row.townSlug ? <Link className="feed-town-pill" to={feedTownHref(row.town || row.townSlug)}>{row.town}</Link> : row.town;
  return <div className={`feed-row${listing ? ' feed-listing-row' : ''}${row.category==='rentals' ? ' feed-rental-row' : ''}`} role="row">
    <div className="feed-date" role="cell">{listing ? <><div className="feed-listing-labels"><span className={`feed-listing-badge${isNewListing(row) ? ' is-new' : ''}`}>{isNewListing(row) ? 'NEW LISTING' : 'LISTED'}</span><span className="feed-listing-town-mobile">{townLink}</span></div><time dateTime={row.date}>Listed {rowDate(row)}</time></> : <>{row.category==='rentals' && row.date ? 'Available ' : ''}{rowDate(row)}<small>{identity}{row.category === 'events' && row.date && ` · ${new Date(row.date).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',timeZone:'America/New_York'})} ET`}</small></>}</div>
    <div className="feed-town" role="cell">{townLink}{!listing && <span className="feed-mobile-identity">{identity}</span>}</div>
    <div className="feed-type" role="cell">{categoryLabel(row.category)}</div>
    <div className="feed-headline" role="cell">{detailsLink(row.title,'details_click')}{(row.date || row.source!==identity || row.facts) && <small>{row.source!==identity || row.date ? row.source : ''}{row.facts && <> · {row.facts}</>}</small>}{row.summary && <details className="feed-row-summary"><summary aria-label={`Summary: ${row.title}`}>Summary</summary><p>{row.summary}</p></details>}</div>
    <div className="feed-price" role="cell">{row.price !== undefined ? `${price(row.price)}${row.priceUnit==='month' ? '/mo' : ''}` : '—'}</div>
    <div className="feed-actions" role="cell">{detailsLink(row.date && row.category !== 'events' && row.category !== 'rentals' ? 'Source' : 'Details','source_click')}{row.connect && <a href={row.connect} onClick={()=>interaction('connect_click',row.category)}>Connect</a>}<Button variant="ghost" size="icon" aria-label={`${saved ? 'Unsave' : 'Save'} ${row.title}`} aria-pressed={saved} onClick={()=>onSave(row)} title={saved ? 'Remove saved row' : 'Save on this device'}><Bookmark aria-hidden fill={saved ? 'currentColor' : 'none'}/></Button></div>
  </div>;
}
