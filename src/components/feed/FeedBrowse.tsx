import { useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Bookmark, ChevronDown, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { businessTelHref, normalizePhoneDigits } from '@/lib/businessContact';
import { PHONE_RAW } from '@/config/contact';
import { homeDirectorySearch } from '@/lib/homeDirectorySearch';
import { businessIdentity, filterRows, publicUrl, snapshotKey, type FeedEdition, type FeedRow } from './feedModel';
import { readBrowseState, updateBrowseState, browsePage } from './browseState';
import { useDirectoryRows } from './useMarketFeed';
import { INVENTORY_PAGE_SIZE, LATEST_PAGE_SIZE, featuredApplies, useBrowseInventory, useFeaturedListings, useLatestFeed, type InventorySource } from './useBrowseInventory';
import { FeedLine } from './FeedLine';
import TownNavigation from './TownNavigation';
import { rentalInPlaceHref, validRentalId } from './rentalLinks';
import { allDirectoryLinks, categoryParams, isActiveCategory, moreDirectoryCategories, primaryCategories, type DirectoryLink } from './categoryDirectory';
import { directoryCategory } from '@/lib/directoryCategories';

const plain=(e:React.MouseEvent)=>!(e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button!==0);

export default function FeedBrowse({edition,towns,saved,savedOnly,onSavedOnly,onSave,dark,large,version}:{edition:FeedEdition;towns:{slug:string;name:string}[];saved:FeedRow[];savedOnly:boolean;onSavedOnly:()=>void;onSave:(row:FeedRow)=>void;dark:boolean;large:boolean;version:FeedRow[]}) {
  const [params,setParams]=useSearchParams();const {town,category,view,search,cat}=readBrowseState(params);const [moreOpen,setMoreOpen]=useState(false);
  const change=(values:Record<string,string>,replace=false)=>setParams(updateBrowseState(params,values),{replace,preventScrollReset:true});
  const active=!savedOnly; const key=snapshotKey(version);
  const browseSource:InventorySource|null=view!=='browse' ? null : category==='property' ? 'homes' : category==='rentals' ? 'rentals' : category==='events' ? 'events' : ['local_news','finance'].includes(category) ? 'news' : null;
  const latestPage=browsePage(params,'latest');
  const showFeatured=featuredApplies(category,savedOnly);
  const featured=useFeaturedListings(edition,town,search,showFeatured,key);
  const featuredRows=showFeatured ? featured.data || [] : [];
  // Regular home queries wait for Featured so the same listings never appear twice on one view.
  const featuredReady=!showFeatured || !featured.isLoading;
  const excludeIds=featuredRows.map(r=>r.id.replace(/^listing:/,''));
  const latest=useLatestFeed(edition,category,town,search,latestPage,active && view==='latest' && featuredReady,key,excludeIds);
  const inventory=useBrowseInventory(edition,browseSource || 'homes',town,search,view,browsePage(params,browseSource || 'homes'),active && !!browseSource && featuredReady,key,category,browseSource==='homes' ? excludeIds : []);
  const showBusinesses=active && view==='browse' && category==='business';
  const directory=useDirectoryRows(edition,town,browsePage(params,'businesses'),search,showBusinesses,INVENTORY_PAGE_SIZE,cat);
  const legacyCategory=directoryCategory(cat)?.legacy || '';
  const fullDirectory=homeDirectorySearch(search,town,legacyCategory);
  const townName=town ? towns.find(t=>t.slug===town)?.name || town : 'All towns';
  const activeLink=allDirectoryLinks.find(l=>isActiveCategory(l,category,view,cat));
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
  const categoryLink=(link:DirectoryLink)=><Link key={link.label} to={`?${categoryParams(params,link)}`} aria-current={isActiveCategory(link,category,view,cat) ? 'page' : undefined} onClick={e=>{if(!plain(e)) return;e.preventDefault();setParams(categoryParams(params,link),{preventScrollReset:true});}}>{link.label}</Link>;
  const table=(rows:FeedRow[],label:string)=><div className="feed-table" role="table" aria-label={label}><div className="feed-table-heading" role="row"><span role="columnheader">Date</span><span role="columnheader">Town</span><span role="columnheader">Type</span><span role="columnheader">Update / source</span><span role="columnheader">Price</span><span role="columnheader">Links / save</span></div>{rows.map(render)}</div>;
  const fallbackLinks=<div><Link to="/homes">Search homes</Link><Link to="/rentals">Rental search</Link><Link to={fullDirectory}>Business directory</Link></div>;
  const savedRows=filterRows(saved,town,category,search);
  const businessRows=(directory.data?.rows || []).map(b=>{
    const phone=businessTelHref(b.phone,b.contact_status); const blockedPhone=normalizePhoneDigits(b.phone)===normalizePhoneDigits(PHONE_RAW);
    const identity=businessIdentity(b.category,b.subcategory);
    return {id:`business:${b.id}`,category:'business',identity,title:b.name,town:b.town_name || 'Town not supplied',townSlug:b.town_slug || '',date:'',dateLabel:'',source:identity,href:`/biz/${b.slug}`,connect:publicUrl(b.website) || (!blockedPhone && phone ? phone : undefined)} as FeedRow;
  });
  const searchLabel=savedOnly ? 'Search saved rows' : view==='latest' ? 'Search updates' : category==='business' ? 'Search businesses by name or service' : category==='rentals' ? 'Search rentals by street or town' : category==='property' ? 'Search homes by address or agent' : category==='events' ? 'Search events' : 'Search updates';
  const bizSearch=`?${updateBrowseState(params,{type:'business',view:'browse',search})}`;
  // Latest updates never query directory profiles; offer the directory explicitly instead of implying it.
  const businessSearchLink=view==='latest' && search.trim() && !savedOnly ? <p className="feed-notice feed-search-businesses">Latest updates do not include directory profiles. <Link to={bizSearch} onClick={e=>{if(!plain(e)) return;e.preventDefault();setParams(updateBrowseState(params,{type:'business',view:'browse',search}),{preventScrollReset:true});}}>Search businesses for “{search.trim()}”{town ? ` in ${townName}` : ''}</Link></p> : null;
  const filtered=!!(town || category!=='all' || search);
  return <div className="feed-browse-results">
    {featuredRows.length>0 && <section className="feed-featured-section" aria-labelledby="feed-featured-title">
      <div className="feed-block-title"><h2 id="feed-featured-title">Featured listings</h2></div>
      {table(featuredRows,'Featured listings')}
    </section>}
    <TownNavigation town={town} towns={towns} onSelect={slug=>change({town:slug})} dark={dark} large={large}/>
    <div className="feed-browse-main">
    <section className="feed-categories" aria-labelledby="feed-categories-title">
      <div className="feed-block-title"><h2 id="feed-categories-title">Categories</h2><Button variant="ghost" className="feed-more-toggle" aria-expanded={moreOpen} aria-controls="feed-more-categories" onClick={()=>setMoreOpen(!moreOpen)}>{moreOpen ? 'Fewer categories' : `All categories (${allDirectoryLinks.length})`}<ChevronDown aria-hidden/></Button></div>
      <nav aria-label="Categories" className="feed-category-grid">{primaryCategories.map(categoryLink)}</nav>
      <nav id="feed-more-categories" aria-label="More categories" className="feed-category-grid feed-more-grid" hidden={!moreOpen}>{moreDirectoryCategories.map(categoryLink)}</nav>
    </section>
    <div className="feed-toolbar">
      <label className="feed-search"><span className="sr-only">{searchLabel}</span><span><Search aria-hidden/><input type="search" aria-label={searchLabel} placeholder={searchLabel} value={search} onChange={e=>change({search:e.target.value},true)}/></span></label>
      <Button variant="outline" className="feed-saved-toggle" aria-pressed={savedOnly} onClick={onSavedOnly}><Bookmark aria-hidden/>Saved ({saved.length})</Button>
      <div className="feed-view-controls" role="group" aria-label="Feed view"><Button variant="ghost" aria-pressed={view==='latest'} onClick={()=>change({view:'latest'})}>Latest updates</Button><Button variant="ghost" aria-pressed={view==='browse'} onClick={()=>change({view:'browse'})}>Browse all</Button></div>
      <p className="feed-context-text" aria-live="polite"><strong>{townName}</strong> · {savedOnly ? 'Saved on this device' : contextLabel}{search && <> · “{search}”</>}</p>
      {filtered && <Button variant="ghost" className="feed-clear" onClick={()=>change({town:'',type:'all',search:'',cat:'',view:view})}><X aria-hidden/>Clear</Button>}
    </div>
    {savedOnly ? <>{table(savedRows,'Saved rows')}{!savedRows.length && <div className="feed-empty" role="status">No saved rows match this town, category and search.</div>}<p className="feed-notice">Saved on this device; details may have changed at the source.</p></>
    : view==='latest' ? <>
      {latest.isError && <p role="alert" className="feed-notice">Some sources could not load. Try checking for updates.</p>}
      {table(latest.data?.rows || [],'Latest updates')}
      {businessSearchLink}
      {!latest.data?.rows.length && <div className="feed-empty" role="status">{latest.isLoading ? 'Checking published records…' : category==='rentals' ? 'Rentals have no verified publication dates, so they are listed under Browse all.' : category==='sales' || category==='price_changes' ? 'No verified sale or price-change history is connected.' : 'No dated updates match this town, category and search.'}<div>{category==='rentals' && <Button variant="outline" onClick={()=>change({view:'browse'})}>Browse active rentals</Button>}{category!=='rentals' && <Button variant="outline" onClick={()=>change({view:'browse'})}>Browse all categories</Button>}</div></div>}
      {latest.data && latest.data.rows.length>0 && pager('latest','Updates',latest.data.start,latest.data.rows.length,latest.data.total,latest.data.hasNext)}
    </> : showBusinesses ? <>
      {table(businessRows,'Local businesses')}
      {directory.isLoading && <p className="feed-empty" role="status">Searching the business directory…</p>}
      {directory.isError && <p role="alert" className="feed-notice">The directory could not load. <Link to={fullDirectory}>Try the full directory</Link>.</p>}
      {directory.data?.count===0 && <div className="feed-empty" role="status">No published businesses match this town, category and search.{fallbackLinks}</div>}
      {!!directory.data?.count && pager('businesses','Businesses',browsePage(params,'businesses')*INVENTORY_PAGE_SIZE,businessRows.length,directory.data.count,(browsePage(params,'businesses')+1)*INVENTORY_PAGE_SIZE<directory.data.count)}
      <p className="feed-notice">Alphabetical directory profiles · <Link to={fullDirectory}>Open the full directory</Link></p>
    </> : browseSource ? <>
      {table(inventory.data?.rows || [],contextLabel || 'Results')}
      {inventory.isError && <p role="alert" className="feed-notice">These records could not load.</p>}
      {!inventory.data?.rows.length && <div className="feed-empty" role="status">{inventory.isLoading ? 'Checking published records…' : 'No published records match this town, category and search.'}{!inventory.isLoading && fallbackLinks}</div>}
      {!!inventory.data?.count && pager(browseSource,contextLabel || 'Records',browsePage(params,browseSource)*INVENTORY_PAGE_SIZE,inventory.data.rows.length,inventory.data.count,(browsePage(params,browseSource)+1)*INVENTORY_PAGE_SIZE<inventory.data.count)}
      {category==='rentals' && <p className="feed-notice">Active rentals · availability is not a listing announcement.</p>}
      {category==='property' && <p className="feed-notice">Published site listings · not complete MLS coverage · <Link to="/homes">Search all homes</Link></p>}
    </> : <div className="feed-empty" role="status">{category==='sales' || category==='price_changes' ? 'No verified sale or price-change history is connected.' : 'Choose a category above to browse published homes, rentals, businesses, events and news.'}{fallbackLinks}</div>}
    </div>
    <p className="sr-only" aria-live="polite">{view==='latest' && latest.data ? `Showing ${latest.data.rows.length} of up to ${LATEST_PAGE_SIZE} updates` : ''}</p>
  </div>;
}
