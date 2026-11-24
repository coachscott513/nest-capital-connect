import { useSearchParams, Link } from 'react-router-dom';
import { Bookmark, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { businessTelHref, normalizePhoneDigits } from '@/lib/businessContact';
import { PHONE_RAW } from '@/config/contact';
import { homeDirectorySearch } from '@/lib/homeDirectorySearch';
import { businessIdentity, filterRows, publicUrl, snapshotKey, type FeedEdition, type FeedRow } from './feedModel';
import { readBrowseState, updateBrowseState, browsePage } from './browseState';
import { useDirectoryRows } from './useMarketFeed';
import { INVENTORY_PAGE_SIZE, LATEST_PAGE_SIZE, useBrowseInventory, useLatestFeed, type InventorySource } from './useBrowseInventory';
import { FeedLine } from './FeedLine';
import TownNavigation from './TownNavigation';
import { rentalInPlaceHref, validRentalId } from './rentalLinks';
import { allDirectoryLinks, categoryParams, isActiveCategory, moreDirectoryCategories, primaryCategories, type DirectoryLink } from './categoryDirectory';

const plain=(e:React.MouseEvent)=>!(e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button!==0);

export default function FeedBrowse({edition,towns,saved,savedOnly,onSavedOnly,onSave,dark,large,version}:{edition:FeedEdition;towns:{slug:string;name:string}[];saved:FeedRow[];savedOnly:boolean;onSavedOnly:()=>void;onSave:(row:FeedRow)=>void;dark:boolean;large:boolean;version:FeedRow[]}) {
  const [params,setParams]=useSearchParams();const {town,category,view,search}=readBrowseState(params);
  const change=(values:Record<string,string>,replace=false)=>setParams(updateBrowseState(params,values),{replace,preventScrollReset:true});
  const active=!savedOnly; const key=snapshotKey(version);
  const browseSource:InventorySource|null=view!=='browse' ? null : category==='property' ? 'homes' : category==='rentals' ? 'rentals' : category==='events' ? 'events' : ['local_news','finance'].includes(category) ? 'news' : null;
  const latestPage=browsePage(params,'latest');
  const latest=useLatestFeed(edition,category,town,search,latestPage,active && view==='latest',key);
  const inventory=useBrowseInventory(edition,browseSource || 'homes',town,search,view,browsePage(params,browseSource || 'homes'),active && !!browseSource,key,category);
  const showBusinesses=active && view==='browse' && category==='business';
  const directory=useDirectoryRows(edition,town,browsePage(params,'businesses'),search,showBusinesses,INVENTORY_PAGE_SIZE);
  const townName=town ? towns.find(t=>t.slug===town)?.name || town : 'All towns';
  const activeLink=allDirectoryLinks.find(l=>isActiveCategory(l,category,view,search));
  const contextLabel=activeLink?.label || (category==='all' ? (view==='latest' ? 'Latest updates' : 'Choose a category') : {property:'Homes',rentals:'Rentals',business:'Local businesses',events:'Events',local_news:'Local news',finance:'Finance updates',sales:'Sales',price_changes:'Price changes'}[category]);
  const render=(row:FeedRow)=>{
    const id=row.category==='rentals' ? row.id.replace(/^rental:/,'') : '';
    const display=validRentalId(id) ? {...row,href:rentalInPlaceHref(params.toString(),id)} : row;
    return <FeedLine key={row.id} row={display} saved={saved.some(r=>r.id===row.id)} onSave={()=>onSave(row)}/>;
  };
  const pager=(source:string,label:string,start:number,shown:number,total:number|null,hasNext:boolean)=>{
    const page=browsePage(params,source);
    return <nav className="feed-pagination" aria-label={`${label} pages`}><span>{shown ? `${start+1}–${start+shown}` : '0'}{total!==null ? ` of ${total.toLocaleString()}` : ''} {label.toLowerCase()}</span>
      <Button variant="outline" disabled={page===0} onClick={()=>change({[`page_${source}`]:String(page-1)})}><ChevronLeft aria-hidden/>Previous</Button>
      <Button variant="outline" disabled={!hasNext} onClick={()=>change({[`page_${source}`]:String(page+1)})}>View more<ChevronRight aria-hidden/></Button>
    </nav>;
  };
  const categoryLink=(link:DirectoryLink)=>'href' in link
    ? <Link key={link.label} to={link.href}>{link.label}</Link>
    : <Link key={link.label} to={`?${categoryParams(params,link)}`} aria-current={isActiveCategory(link,category,view,search) ? 'page' : undefined} onClick={e=>{if(!plain(e)) return;e.preventDefault();setParams(categoryParams(params,link),{preventScrollReset:true});}}>{link.label}</Link>;
  const table=(rows:FeedRow[],label:string)=><div className="feed-table" role="table" aria-label={label}><div className="feed-table-heading" role="row"><span role="columnheader">Date</span><span role="columnheader">Town</span><span role="columnheader">Type</span><span role="columnheader">Update / source</span><span role="columnheader">Price</span><span role="columnheader">Links / save</span></div>{rows.map(render)}</div>;
  const fallbackLinks=<div><Link to="/homes">Search homes</Link><Link to="/rentals">Rental search</Link><Link to={homeDirectorySearch(search,town)}>Business directory</Link></div>;
  const savedRows=filterRows(saved,town,category,search);
  const businessRows=(directory.data?.rows || []).map(b=>{
    const phone=businessTelHref(b.phone,b.contact_status); const blockedPhone=normalizePhoneDigits(b.phone)===normalizePhoneDigits(PHONE_RAW);
    const identity=businessIdentity(b.category,b.subcategory);
    return {id:`business:${b.id}`,category:'business',identity,title:b.name,town:b.town_name || 'Town not supplied',townSlug:b.town_slug || '',date:'',dateLabel:'',source:identity,href:`/biz/${b.slug}`,connect:publicUrl(b.website) || (!blockedPhone && phone ? phone : undefined)} as FeedRow;
  });
  return <div className="feed-browse-results">
    <TownNavigation town={town} towns={towns} onSelect={slug=>change({town:slug})} dark={dark} large={large}/>
    <section className="feed-categories" aria-labelledby="feed-categories-title">
      <div className="feed-block-title"><h2 id="feed-categories-title">Browse categories</h2></div>
      <nav aria-label="Categories" className="feed-category-grid">{primaryCategories.map(categoryLink)}</nav>
      <details className="feed-more-categories"><summary>All categories</summary><nav aria-label="More categories" className="feed-category-grid">{moreDirectoryCategories.map(categoryLink)}</nav></details>
    </section>
    <div className="feed-searchbar"><label className="feed-search"><span className="sr-only">Search</span><span><Search aria-hidden/><input type="search" aria-label="Search updates, homes and businesses" placeholder={category==='business' ? 'Search businesses by name or service' : category==='rentals' ? 'Search rentals by street or town' : 'Search headlines, addresses, businesses'} value={search} onChange={e=>change({search:e.target.value},true)}/></span></label><Button variant="outline" aria-pressed={savedOnly} onClick={onSavedOnly}><Bookmark aria-hidden/>Saved ({saved.length})</Button></div>
    <div className="feed-context">
      <p><strong>{townName}</strong> · {savedOnly ? 'Saved on this device' : contextLabel}{search && !activeLink && <> · “{search}”</>}</p>
      {(town || category!=='all' || search) && <Button variant="ghost" onClick={()=>change({town:'',type:'all',search:'',view:view})}><X aria-hidden/>Clear</Button>}
    </div>
    <div className="feed-view-controls" role="group" aria-label="Feed view"><Button variant="ghost" aria-pressed={view==='latest'} onClick={()=>change({view:'latest'})}>Latest updates</Button><Button variant="ghost" aria-pressed={view==='browse'} onClick={()=>change({view:'browse'})}>Browse all</Button></div>
    {savedOnly ? <>{table(savedRows,'Saved rows')}{!savedRows.length && <div className="feed-empty" role="status">No saved rows match this town, category and search.</div>}<p className="feed-notice">Saved on this device; details may have changed at the source.</p></>
    : view==='latest' ? <>
      {latest.isError && <p role="alert" className="feed-notice">Some sources could not load. Try checking for updates.</p>}
      {table(latest.data?.rows || [],'Latest updates')}
      {!latest.data?.rows.length && <div className="feed-empty" role="status">{latest.isLoading ? 'Checking published records…' : category==='rentals' ? 'Rentals have no verified publication dates, so they are listed under Browse all.' : category==='sales' || category==='price_changes' ? 'No verified sale or price-change history is connected.' : 'No dated updates match this town, category and search.'}<div>{category==='rentals' && <Button variant="outline" onClick={()=>change({view:'browse'})}>Browse active rentals</Button>}{category!=='rentals' && <Button variant="outline" onClick={()=>change({view:'browse'})}>Browse all categories</Button>}</div></div>}
      {latest.data && latest.data.rows.length>0 && pager('latest','Updates',latest.data.start,latest.data.rows.length,latest.data.total,latest.data.hasNext)}
    </> : showBusinesses ? <>
      {table(businessRows,'Local businesses')}
      {directory.isLoading && <p className="feed-empty" role="status">Searching the business directory…</p>}
      {directory.isError && <p role="alert" className="feed-notice">The directory could not load. <Link to={homeDirectorySearch(search,town)}>Try the full directory</Link>.</p>}
      {directory.data?.count===0 && <div className="feed-empty" role="status">No published businesses match this town and search.{fallbackLinks}</div>}
      {!!directory.data?.count && pager('businesses','Businesses',browsePage(params,'businesses')*INVENTORY_PAGE_SIZE,businessRows.length,directory.data.count,(browsePage(params,'businesses')+1)*INVENTORY_PAGE_SIZE<directory.data.count)}
      <p className="feed-notice">Alphabetical directory profiles · <Link to={homeDirectorySearch(search,town)}>Open the full directory</Link></p>
    </> : browseSource ? <>
      {table(inventory.data?.rows || [],contextLabel || 'Results')}
      {inventory.isError && <p role="alert" className="feed-notice">These records could not load.</p>}
      {!inventory.data?.rows.length && <div className="feed-empty" role="status">{inventory.isLoading ? 'Checking published records…' : 'No published records match this town, category and search.'}{!inventory.isLoading && fallbackLinks}</div>}
      {!!inventory.data?.count && pager(browseSource,contextLabel || 'Records',browsePage(params,browseSource)*INVENTORY_PAGE_SIZE,inventory.data.rows.length,inventory.data.count,(browsePage(params,browseSource)+1)*INVENTORY_PAGE_SIZE<inventory.data.count)}
      {category==='rentals' && <p className="feed-notice">Active rentals · availability is not a listing announcement.</p>}
      {category==='property' && <p className="feed-notice">Published site listings · not complete MLS coverage · <Link to="/homes">Search all homes</Link></p>}
    </> : <div className="feed-empty" role="status">{category==='sales' || category==='price_changes' ? 'No verified sale or price-change history is connected.' : 'Choose a category above to browse published homes, rentals, businesses, events and news.'}{fallbackLinks}</div>}
    <p className="sr-only" aria-live="polite">{view==='latest' && latest.data ? `Showing ${latest.data.rows.length} of up to ${LATEST_PAGE_SIZE} updates` : ''}</p>
  </div>;
}
