import { useSearchParams, Link } from 'react-router-dom';
import { Bookmark, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { businessTelHref, normalizePhoneDigits } from '@/lib/businessContact';
import { PHONE_RAW } from '@/config/contact';
import { homeDirectorySearch } from '@/lib/homeDirectorySearch';
import { businessIdentity, chronologicalRows, filterRows, publicUrl, snapshotKey, type FeedEdition, type FeedRow } from './feedModel';
import { browseCategories, moreCategories, readBrowseState, updateBrowseState, browsePage } from './browseState';
import { useDirectoryRows } from './useMarketFeed';
import { INVENTORY_PAGE_SIZE, useBrowseInventory, type InventorySource } from './useBrowseInventory';
import { FeedLine } from './FeedLine';
import TownNavigation from './TownNavigation';
import { rentalInPlaceHref, validRentalId } from './rentalLinks';

export default function FeedBrowse({edition,towns,saved,savedOnly,onSavedOnly,onSave,dark,large,version}:{edition:FeedEdition;towns:{slug:string;name:string}[];saved:FeedRow[];savedOnly:boolean;onSavedOnly:()=>void;onSave:(row:FeedRow)=>void;dark:boolean;large:boolean;version:FeedRow[]}) {
  const [params,setParams]=useSearchParams();const {town,category,view,search}=readBrowseState(params);
  const change=(values:Record<string,string>,replace=false)=>setParams(updateBrowseState(params,values),{replace,preventScrollReset:true});
  const active=!savedOnly; const key=snapshotKey(version);
  const homes=useBrowseInventory(edition,'homes',town,search,view,browsePage(params,'homes'),active && (category==='all' || category==='property'),key);
  const newsEnabled=!['rentals','events','sales','price_changes'].includes(category) && (view==='latest' || !['business','property'].includes(category));
  const news=useBrowseInventory(edition,'news',town,search,view,browsePage(params,'news'),active && newsEnabled,key,category);
  const events=useBrowseInventory(edition,'events',town,search,view,browsePage(params,'events'),active && (category==='all' || category==='events'),key);
  const rentals=useBrowseInventory(edition,'rentals',town,search,view,browsePage(params,'rentals'),active && view==='browse' && (category==='all' || category==='rentals'),key);
  const showBusinesses=active && view==='browse' && (category==='all' || category==='business');
  const directory=useDirectoryRows(edition,town,browsePage(params,'businesses'),search,showBusinesses);
  const sources: {source:InventorySource;label:string;result:typeof homes;enabled:boolean}[]=[
    {source:'homes' as const,label:'Homes',result:homes,enabled:category==='all' || category==='property'},
    {source:'news' as const,label:'News & market updates',result:news,enabled:newsEnabled},
    {source:'events' as const,label:'Events',result:events,enabled:category==='all' || category==='events'},
    {source:'rentals' as const,label:'Rentals',result:rentals,enabled:view==='browse' && (category==='all' || category==='rentals')},
  ].filter(s=>s.enabled);
  const dated=chronologicalRows(sources.filter(s=>s.source!=='rentals').flatMap(s=>s.result.data?.rows || []));
  const rows=savedOnly ? filterRows(saved,town,category,search) : [...dated,...(sources.some(s=>s.source==='rentals') ? rentals.data?.rows || [] : [])];
  const busy=!savedOnly && sources.some(s=>s.result.isLoading);
  const errors=!savedOnly && sources.filter(s=>s.result.isError);
  const render=(row:FeedRow)=>{
    const id=row.category==='rentals' ? row.id.replace(/^rental:/,'') : '';
    const display=validRentalId(id) ? {...row,href:rentalInPlaceHref(params.toString(),id)} : row;
    return <FeedLine key={row.id} row={display} saved={saved.some(r=>r.id===row.id)} onSave={()=>onSave(row)}/>;
  };
  const pagination=(source:string,label:string,count:number,size:number)=>{
    const page=browsePage(params,source);
    return <div className="feed-pagination" key={source}><span>{label} · {count ? `${page*size+1}–${Math.min((page+1)*size,count)} of ${count.toLocaleString()}` : '0 records'}</span>
      <Button variant="ghost" size="icon" aria-label={`Previous ${label.toLowerCase()} page`} disabled={page===0} onClick={()=>change({[`page_${source}`]:String(page-1)})}><ChevronLeft/></Button>
      <Button variant="ghost" size="icon" aria-label={`Next ${label.toLowerCase()} page`} disabled={(page+1)*size>=count} onClick={()=>change({[`page_${source}`]:String(page+1)})}><ChevronRight/></Button>
    </div>;
  };
  return <div className="feed-browse-layout">
    <TownNavigation town={town} towns={towns} onSelect={slug=>change({town:slug})} dark={dark} large={large}/>
    <div className="feed-browse-results">
      <div className="feed-view-controls" role="group" aria-label="Feed view"><Button variant="ghost" aria-pressed={view==='latest'} onClick={()=>change({view:'latest'})}>Latest updates</Button><Button variant="ghost" aria-pressed={view==='browse'} onClick={()=>change({view:'browse'})}>Browse all</Button></div>
      <div className="feed-category-controls" role="group" aria-label="Result categories">{browseCategories.map(c=><Button key={c.value} variant="ghost" aria-pressed={category===c.value} onClick={()=>change({type:c.value,...(c.value==='business' || c.value==='rentals' ? {view:'browse'} : {})})}>{c.label}</Button>)}<label className="feed-more-filter"><span className="sr-only">More types</span><select aria-label="More types" value={moreCategories.some(c=>c.value===category) ? category : ''} onChange={e=>change({type:e.target.value})}><option value="">More types</option>{moreCategories.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}</select></label></div>
      <div className="feed-filters feed-browse-search"><label className="feed-search">{category==='business' ? 'Search businesses' : category==='rentals' ? 'Search rentals' : 'Search'}<span><Search aria-hidden/><input type="search" aria-label="Search feed and directory" placeholder={category==='business' ? 'Name or service' : category==='rentals' ? 'Street or town' : 'Headline or address'} value={search} onChange={e=>change({search:e.target.value},true)}/></span></label><Button variant="outline" aria-pressed={savedOnly} onClick={onSavedOnly}><Bookmark/>Saved ({saved.length})</Button></div>
      <p className="feed-notice">{towns.find(t=>t.slug===town)?.name || (town ? town : 'All towns')} · {view==='latest' ? 'Original-dated updates & upcoming events' : 'Published site inventory · not complete MLS coverage'}{category==='business' && view==='browse' ? ' · Alphabetical directory profiles, not opening announcements' : ''}</p>
      {savedOnly && <p className="feed-notice">Saved on this device; details may have changed at the source.</p>}
      {!!errors && errors.length>0 && <p role="alert" className="feed-notice">Could not load {errors.map(s=>s.label).join(', ')}. Try checking for updates or use the linked directory.</p>}
      {(!showBusinesses || category==='all' || savedOnly) && <>
        <div className="feed-table" role="table" aria-label="Local updates"><div className="feed-table-heading" role="row"><span role="columnheader">Date / time</span><span role="columnheader">Town</span><span role="columnheader">Type</span><span role="columnheader">Update / source</span><span role="columnheader">Price</span><span role="columnheader">Links / save</span></div>{rows.map(render)}</div>
        {!rows.length && <div className="feed-empty" role="status">{busy ? 'Checking published records…' : savedOnly ? 'No saved rows match these filters.' : category==='rentals' && view==='latest' ? 'Rentals have no verified publication dates for Latest updates. Browse all shows active rental records with supplied availability dates.' : category==='sales' || category==='price_changes' ? 'No verified sale or price-change history is connected.' : 'No published records match this town, type, and search.'}{!savedOnly && <div>{category==='rentals' && view==='latest' && <Button variant="outline" onClick={()=>change({view:'browse'})}>Browse active rentals</Button>}<Link to="/rentals">Rental search</Link><Link to="/homes">Search homes</Link><Link to={homeDirectorySearch(search,town)}>Business directory</Link></div>}</div>}
        {!savedOnly && sources.filter(s=>s.result.data?.count || sources.length===1).map(s=>pagination(s.source,s.label,s.result.data?.count || 0,INVENTORY_PAGE_SIZE))}
      </>}
      {showBusinesses && <section className="feed-directory" aria-label="Business results"><div className="feed-section-title"><h2>Businesses <span>{directory.data?.count.toLocaleString()}</span></h2><Link to={homeDirectorySearch(search,town)}>Full directory →</Link></div>
        <div role="table" aria-label="Local businesses">{directory.data?.rows.map(b=>{
          const phone=businessTelHref(b.phone,b.contact_status); const blockedPhone=normalizePhoneDigits(b.phone)===normalizePhoneDigits(PHONE_RAW);
          const identity=businessIdentity(b.category,b.subcategory);const row:FeedRow={id:`business:${b.id}`,category:'business',identity,title:b.name,town:b.town_name || 'Town not supplied',townSlug:b.town_slug || '',date:'',dateLabel:'',source:identity,href:`/biz/${b.slug}`,connect:publicUrl(b.website) || (!blockedPhone && phone ? phone : undefined)};
          return render(row);
        })}</div>
        {directory.isLoading && <p role="status">Searching the business directory…</p>}{directory.isError && <p role="alert">The directory could not load. <Link to={homeDirectorySearch(search,town)}>Try the full directory</Link>.</p>}
        {directory.data?.count===0 && <p className="feed-empty" role="status">No published businesses match this town and search.</p>}
        {pagination('businesses','Businesses',directory.data?.count || 0,15)}
      </section>}
      {category==='rentals' && view==='browse' && <p className="feed-notice">Active rental records · availability is not a listing announcement. Details open the selected rental; individual public source links are not supplied.</p>}
    </div>
  </div>;
}