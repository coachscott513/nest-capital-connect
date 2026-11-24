import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, Check, ChevronLeft, ChevronRight, Moon, Pause, Play, RefreshCw, Search, Sun, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyHero from '@/components/home/PropertyHero';
import { useRegion } from '@/hooks/useRegion';
import { homeDirectorySearch } from '@/lib/homeDirectorySearch';
import { queryLengthBucket } from '@/lib/homeAnalytics';
import { logEngagement } from '@/lib/engagement';
import { businessTelHref, normalizePhoneDigits } from '@/lib/businessContact';
import { PLATFORM_NAME, PHONE_RAW, PHONE_TEL, PHONE_DISPLAY, GENERAL_EMAIL_HREF } from '@/config/contact';
import { FEED_EDITIONS, feedTownOptions, filterRows, isNewListing, latestFinanceRow, publicUrl, type FeedCategory, type FeedEdition, type FeedRow } from './feedModel';
import { useDirectoryRows, useFeedTowns, useMarketFeed } from './useMarketFeed';
import './marketFeed.css';

const categories: {value:FeedCategory;label:string}[] = [
  {value:'all',label:'All updates'},{value:'property',label:'Property'},{value:'sales',label:'Sales'},
  {value:'price_changes',label:'Price changes'},{value:'business',label:'Business'},
  {value:'local_news',label:'Local news'},{value:'finance',label:'Finance'},{value:'events',label:'Events'},
];
function stored<T>(key:string,fallback:T):T { try { const value=localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
function persist(key:string,value:unknown) { try { localStorage.setItem(key,JSON.stringify(value)); } catch { /* Device storage may be unavailable. */ } }
function interaction(action:string,category?:string,town?:string) {
  logEngagement(`feed_${action}`,{}, {source_location:'homepage_feed',...(category ? {category_slug:category} : {})}, {town_slug:town || null});
}
function rowDate(row:FeedRow) {
  if (!row.date) return 'Directory profile';
  const date = row.dateOnly ? new Date(`${row.date.slice(0,10)}T12:00:00`) : new Date(row.date);
  return date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',...(row.dateOnly ? {} : {timeZone:'America/New_York'})});
}
const price = (value:number) => value.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
function FeedLine({row,saved,onSave}:{row:FeedRow;saved:boolean;onSave:(row:FeedRow)=>void}) {
  const listing = row.kind === 'listing';
  const townLink = row.townSlug ? <Link className={listing ? 'feed-town-pill' : undefined} to={`/towns/${row.townSlug}`}>{row.town}</Link> : row.town;
  return <div className={`feed-row${listing ? ' feed-listing-row' : ''}`} role="row">
    <div className="feed-date" role="cell">{listing ? <><div className="feed-listing-labels"><span className={`feed-listing-badge${isNewListing(row) ? ' is-new' : ''}`}>{isNewListing(row) ? 'NEW LISTING' : 'LISTED'}</span><span className="feed-listing-town-mobile">{townLink}</span></div><time dateTime={row.date}>Listed {rowDate(row)}</time></> : <>{rowDate(row)}<small>{row.date ? row.dateLabel : 'Not a news update'}{row.category === 'events' && row.date && ` · ${new Date(row.date).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',timeZone:'America/New_York'})} ET`}</small></>}</div>
    <div className="feed-town" role="cell">{townLink}</div>
    <div className="feed-type" role="cell">{row.date ? categories.find(c=>c.value===row.category)?.label : 'Business'}</div>
    <div className="feed-headline" role="cell"><a href={row.href} onClick={()=>interaction('details_click',row.category)}>{row.title}</a><small>{row.source}{row.facts && <> · {row.facts}</>}</small>{row.summary && <details className="feed-row-summary"><summary aria-label={`Summary: ${row.title}`}>Summary</summary><p>{row.summary}</p></details>}</div>
    <div className="feed-price" role="cell">{row.price !== undefined ? price(row.price) : '—'}</div>
    <div className="feed-actions" role="cell"><a href={row.href} onClick={()=>interaction('source_click',row.category)}>{row.date && row.category !== 'events' ? 'Source' : 'Details'}</a>{row.connect && <a href={row.connect} onClick={()=>interaction('connect_click',row.category)}>Connect</a>}<Button variant="ghost" size="icon" aria-label={`${saved ? 'Unsave' : 'Save'} ${row.title}`} aria-pressed={saved} onClick={()=>onSave(row)} title={saved ? 'Remove saved row' : 'Save on this device'}><Bookmark aria-hidden fill={saved ? 'currentColor' : 'none'}/></Button></div>
  </div>;
}
function MarketFeed({edition,onEditionChange}:{edition:FeedEdition;onEditionChange:(slug:string)=>void}) {
  const navigate=useNavigate();
  const [town,setTown]=useState(''); const [category,setCategory]=useState<FeedCategory>('all'); const [query,setQuery]=useState('');
  const [savedOnly,setSavedOnly]=useState(false); const [saved,setSaved]=useState<FeedRow[]>(()=>{const value=stored<FeedRow[]>('nest-feed-saved',[]); return Array.isArray(value) ? value.filter(r=>r && typeof r.id==='string' && (publicUrl(r.href) || /^\/biz\/[a-z0-9_-]+$/i.test(r.href))) : [];});
  const [dark,setDark]=useState(()=>stored<boolean>('nest-feed-dark',false) === true); const [large,setLarge]=useState(()=>stored<boolean>('nest-feed-large',false) === true);
  const [paused,setPaused]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [page,setPage]=useState(0); const [directoryQuery,setDirectoryQuery]=useState(''); const [directoryTown,setDirectoryTown]=useState(''); const [directoryCategory,setDirectoryCategory]=useState('');
  const feed=useMarketFeed(edition); const towns=useFeedTowns(edition); const directory=useDirectoryRows(edition,town,page);
  const townOptions=feedTownOptions(towns.data || [],savedOnly ? saved : feed.rows);
  useEffect(()=>{setTown('');setDirectoryTown('');setCategory('all');setQuery('');setPage(0);setSavedOnly(false);},[edition.slug]);
  useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)'); const change=()=>{if(media.matches)setPaused(true);};media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
  useEffect(()=>{document.body.classList.add('has-nest-feed');return()=>document.body.classList.remove('has-nest-feed');},[]);
  const save=(row:FeedRow)=>{const next=saved.some(r=>r.id===row.id) ? saved.filter(r=>r.id!==row.id) : [...saved,row];setSaved(next);persist('nest-feed-saved',next);};
  const filtered=filterRows(savedOnly ? saved : feed.rows,town,category,query);
  const showBusinesses=edition.live && !savedOnly && (category==='all' || category==='business');
  const ticker=feed.rows.filter(r=>r.category!=='events').slice(0,5);
  const finance=latestFinanceRow(feed.rows);
  const submit=(event:FormEvent)=>{event.preventDefault();logEngagement('regional_search_submit',{}, {source_location:'homepage_feed',intent_type:'contractor_directory_search',query_length_bucket:queryLengthBucket(directoryQuery),category_slug:directoryCategory}, {town_slug:directoryTown || null});navigate(homeDirectorySearch(directoryQuery,directoryTown,directoryCategory));};
  return <div className={`nest-feed${dark ? ' feed-dark' : ''}${large ? ' feed-large' : ''}`}>
    <a className="feed-skip" href="#feed-main">Skip to feed</a>
    <header className="feed-header"><div className="feed-header-inner">
      <Link to="/" className="feed-brand"><span className="feed-brand-mark" aria-hidden>N</span><span>Capital District Nest</span></Link>
      <nav aria-label="Main navigation"><a href="#feed-main">Live feed</a><Link to="/communities">Towns</Link><Link to="/homes">Real estate</Link><Link to="/local">Business directory</Link><Link to="/finances">Finance</Link><Link to="/home-services">Contractors</Link></nav>
      <div className="feed-settings"><Button variant="ghost" size="icon" title="Dark mode" aria-label="Dark mode" aria-pressed={dark} onClick={()=>{setDark(!dark);persist('nest-feed-dark',!dark);}}>{dark ? <Sun/> : <Moon/>}</Button><Button variant="ghost" size="icon" title="Larger text" aria-label="Larger text" aria-pressed={large} onClick={()=>{setLarge(!large);persist('nest-feed-large',!large);}}><Type/></Button></div>
    </div></header>
    <div className="feed-shell">
      <div className="feed-edition"><label>Edition <select aria-label="Market edition" value={edition.slug} onChange={e=>onEditionChange(e.target.value)}>{FEED_EDITIONS.map(e=><option key={e.slug} value={e.slug}>{e.label}</option>)}</select></label><span>{new Date().toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric',year:'numeric',timeZone:'America/New_York'})}</span></div>
      {edition.live && <><div className={`feed-ticker${paused ? ' is-paused' : ''}`}><span className="feed-ticker-label">{ticker.length ? 'Headlines' : 'Regional desk'}</span><div className="feed-ticker-window"><div className="feed-ticker-track">{[0,1].map(copy=><span key={copy} aria-hidden={copy===1 ? true : undefined}>{ticker.length ? ticker.map(r=><a key={r.id} href={r.href} tabIndex={copy===1 ? -1 : undefined} onClick={()=>interaction('source_click',r.category)}>{r.title}<i aria-hidden> / </i></a>) : <><Link tabIndex={copy===1 ? -1 : undefined} to="/local">Local business directory</Link><i aria-hidden> / </i><Link tabIndex={copy===1 ? -1 : undefined} to="/weekly">Events & stories</Link><i aria-hidden> / </i><Link tabIndex={copy===1 ? -1 : undefined} to="/homes">Real estate resources</Link><i aria-hidden> / </i></>}</span>)}</div></div><Button variant="ghost" size="icon" aria-label={paused ? 'Play ticker' : 'Pause ticker'} onClick={()=>setPaused(!paused)}>{paused ? <Play/> : <Pause/>}</Button></div>
      <div className="feed-finance"><span>Finance desk</span>{finance && <div className="feed-finance-update"><span>Dated weekly average · <time dateTime={finance.date}>{rowDate(finance)}</time></span><a href={finance.href} onClick={()=>interaction('source_click','finance')}>{finance.title}</a><span>{finance.source} · Not a real-time quote</span></div>}<div className="feed-finance-links"><Link to="/finances">Financing resources</Link><Link to="/loan-types">Loan options</Link><Link to="/homes/insurance">Insurance</Link><Link to="/grants">Grants & assistance</Link>{!finance && <small>Resources, not live rate quotes</small>}</div></div></>}
      <main id="feed-main">
        <div className="feed-title-row"><div><h1>{edition.live ? 'The local feed' : edition.label.replace(' — coming soon','')}</h1><p>{edition.live ? 'Market updates, local sources, and the business directory.' : 'Coming soon. Local sources are not connected for this edition.'}</p></div>{edition.live && <div className="feed-check"><span>{feed.checkedAt ? `Last checked ${new Date(feed.checkedAt).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',timeZone:'America/New_York'})} ET` : 'Checking sources…'}</span><Button variant="ghost" size="icon" aria-label="Check for updates" disabled={feed.fetching} onClick={()=>void feed.refresh()}><RefreshCw/></Button></div>}</div>
        {!edition.live ? <div className="feed-empty"><p>No live feed, properties or directory rows are published for this edition.</p><Button onClick={()=>onEditionChange('capital-district')}>Return to Capital District, NY</Button></div> : <>
        <div className="feed-filters"><label>Town<select aria-label="Feed town" value={town} onChange={e=>{setTown(e.target.value);setPage(0);interaction('town_select',undefined,e.target.value);}}><option value="">All towns</option>{townOptions.map(t=><option key={t.slug} value={t.slug}>{t.name}</option>)}</select></label><label>Type<select aria-label="Feed category" value={category} onChange={e=>{setCategory(e.target.value as FeedCategory);interaction('category_select',e.target.value);}}>{categories.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}</select></label><label className="feed-search">Search updates<span><Search aria-hidden/><input type="search" aria-label="Search updates" placeholder="Headline, town, or source" value={query} onChange={e=>setQuery(e.target.value)}/></span></label><Button variant="outline" aria-pressed={savedOnly} onClick={()=>setSavedOnly(!savedOnly)}><Bookmark/>Saved ({saved.length})</Button></div>
        {towns.isError && <p role="status" className="feed-notice">Town options could not load. <Link to="/local">Open the directory</Link>.</p>}
        {savedOnly && <p className="feed-notice">Saved on this device only; not synced to an account. Saved details may have changed at the source.</p>}
        {feed.errors.length>0 && <p role="status" className="feed-notice">Could not check: {feed.errors.join(', ')}. Previously loaded updates remain visible.</p>}
        {feed.pending && <Button className="feed-updates" onClick={feed.apply}><Check/>{feed.newCount ? `${feed.newCount} new updates` : 'Updated feed available'}</Button>}
        <div className="feed-table" role="table" aria-label="Local updates"><div className="feed-table-heading" role="row"><span role="columnheader">Date / time</span><span role="columnheader">Town</span><span role="columnheader">Type</span><span role="columnheader">Update / source</span><span role="columnheader">Price</span><span role="columnheader">Links / save</span></div>
          {filtered.map(row=><FeedLine key={row.id} row={row} saved={saved.some(r=>r.id===row.id)} onSave={save}/>)}</div>
        {!filtered.length && <div className="feed-empty" role="status">{feed.loading ? 'Checking approved records…' : savedOnly ? 'No saved rows match these filters.' : query || town ? 'No dated updates match these filters. Search local businesses below.' : `No approved ${category==='all' ? 'dated' : categories.find(c=>c.value===category)?.label.toLowerCase()} updates are available in this view.`}{!savedOnly && <small>Updates require approved records with original dates and source links. Imported listings are not sale or price-change history. This page checks approved database records, not external publisher updates or MLS.</small>}<div><Link to="/homes">Search homes</Link><Link to="/weekly">Events & stories</Link><Link to="/finances">Finance resources</Link></div></div>}
        {showBusinesses && <section className="feed-directory" aria-labelledby="feed-business-title"><div className="feed-section-title"><h2 id="feed-business-title">Local businesses <span>{directory.data ? directory.data.count.toLocaleString() : ''}</span></h2><Link to={homeDirectorySearch('',town)}>Full directory →</Link></div><p className="feed-notice">Directory profiles · alphabetical, not opening announcements{query ? ' · Use the directory search below to search businesses.' : ''}</p>
          <div role="table" aria-label="Local businesses">{directory.data?.rows.map(b=>{const phone=businessTelHref(b.phone,b.contact_status);const blockedPhone=normalizePhoneDigits(b.phone)===normalizePhoneDigits(PHONE_RAW);const website=publicUrl(b.website);const row:FeedRow={id:`business:${b.id}`,category:'business',title:b.name,town:b.town_name || 'Town not supplied',townSlug:b.town_slug || '',date:'',dateLabel:'',source:b.category || 'Local business',href:`/biz/${b.slug}`,connect:website || (!blockedPhone && phone ? phone : undefined)};return <FeedLine key={row.id} row={row} saved={saved.some(r=>r.id===row.id)} onSave={save}/>;})}</div>
          {directory.isLoading && <p role="status">Loading directory profiles…</p>}{directory.isError && <p role="status">Directory profiles could not load. <Link to="/local">Open the full directory</Link>.</p>}{directory.data?.count===0 && <p>No directory profiles match this town.</p>}
          <div className="feed-pagination"><span>{directory.data?.count ? `${page*15+1}–${Math.min((page+1)*15,directory.data.count)} of ${directory.data.count.toLocaleString()}` : '0 profiles'}</span><Button variant="ghost" size="icon" aria-label="Previous business rows" disabled={page===0} onClick={()=>setPage(page-1)}><ChevronLeft/></Button><Button variant="ghost" size="icon" aria-label="Next business rows" disabled={!directory.data || (page+1)*15>=directory.data.count} onClick={()=>setPage(page+1)}><ChevronRight/></Button></div>
        </section>}
        <section className="feed-directory-search" aria-labelledby="directory-search-title"><div className="feed-section-title"><h2 id="directory-search-title">Business & contractor search</h2><Link to="/home-services">Home services →</Link></div><form onSubmit={submit}><label className="feed-search">Business or service<input id="homepage-directory-query" type="search" placeholder="Name, trade, or service" value={directoryQuery} onChange={e=>setDirectoryQuery(e.target.value)}/></label><label>Town<select id="homepage-town" value={directoryTown} onChange={e=>setDirectoryTown(e.target.value)}><option value="">All towns</option>{(towns.data || []).map(t=><option key={t.slug} value={t.slug}>{t.name}</option>)}</select></label><label>Category<select id="homepage-category" value={directoryCategory} onChange={e=>setDirectoryCategory(e.target.value)}><option value="">All categories</option>{['Contractor','Restaurant','Coffee','Retail','Healthcare','Dental','Attorney','Accountant','Marketing'].map(c=><option key={c}>{c}</option>)}</select></label><Button type="submit"><Search/>Search directory</Button></form><div className="feed-utility-links"><Link to="/claim-business">Claim / add a business</Link><Link to="/business-login">Business sign in</Link><Link to="/businesses">Business hub</Link><Link to="/for-businesses">For businesses</Link></div></section>
        <details className="feed-realscout"><summary>Real estate search · Powered by RealScout</summary><PropertyHero embedded/></details>
        <details className="feed-provenance"><summary>Sources & coverage</summary><p>Approved publisher stories use the supplied publication date; active events use their scheduled start time (Eastern). Dated news and property updates are newest first; scheduled events follow in start-time order. Property updates require an approved publisher record or approved public listing link with an original date. Import, sync and profile creation dates are never treated as market events. Businesses are displayed alphabetically with no paid-tier preference.</p><p>This page checks approved database records every minute while open; it does not automatically fetch external publisher updates or MLS. New snapshots wait behind an update control. Finance headlines retain their original publication date and source; weekly survey averages are not individual lender offers or real-time quotes. Follow each source for its current release or status.</p></details>
        </>}
      </main>
      <footer className="feed-footer"><span>© {new Date().getFullYear()} {PLATFORM_NAME}</span><Link to="/about-editorial">Editorial policy</Link><Link to="/privacy">Privacy Policy</Link><Link to="/contact">Contact</Link><a href={GENERAL_EMAIL_HREF}>Email the team</a><a href={PHONE_TEL}>{PHONE_DISPLAY}</a><Link to="/site-index">Site index</Link><small>Real estate searches may connect users with licensed professionals and third-party listing providers. Equal Housing Opportunity.</small></footer>
    </div>
  </div>;
}
export default function MarketFeedHome() {
  const {region,loading}=useRegion(); const [selected,setSelected]=useState<string | null>(null);
  const resolved=FEED_EDITIONS.find(e=>e.slug===(selected || region.slug)) || {slug:region.slug,label:region.name,live:false};
  // Region resolution is authoritative; unknown/unsourced editions never inherit Capital District rows.
  const edition=loading && !selected ? {...resolved,live:false} : resolved;
  return <MarketFeed edition={edition} onEditionChange={setSelected}/>;
}
