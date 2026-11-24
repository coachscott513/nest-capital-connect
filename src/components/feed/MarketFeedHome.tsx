import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Moon, Pause, Play, RefreshCw, Search, Sun, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyHero from '@/components/home/PropertyHero';
import { useRegion } from '@/hooks/useRegion';
import { homeDirectorySearch } from '@/lib/homeDirectorySearch';
import { queryLengthBucket } from '@/lib/homeAnalytics';
import { logEngagement } from '@/lib/engagement';
import { PLATFORM_NAME, PHONE_TEL, PHONE_DISPLAY, GENERAL_EMAIL_HREF } from '@/config/contact';
import { FEED_EDITIONS, feedTownOptions, latestFinanceRow, publicUrl, type FeedEdition, type FeedRow } from './feedModel';
import { useFeedTowns, useMarketFeed } from './useMarketFeed';
import { rowDate } from './FeedLine';
import FeedBrowse from './FeedBrowse';
import PublicNavigation from '@/components/PublicNavigation';
import RentalDetailsRoute from './RentalDetailsRoute';
import { hydrateSavedRows } from './rentalLinks';
import './marketFeed.css';

function stored<T>(key:string,fallback:T):T { try { const value=localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
function persist(key:string,value:unknown) { try { localStorage.setItem(key,JSON.stringify(value)); } catch { /* Device storage may be unavailable. */ } }
function interaction(action:string,category?:string,town?:string) {
  logEngagement(`feed_${action}`,{}, {source_location:'homepage_feed',...(category ? {category_slug:category} : {})}, {town_slug:town || null});
}
function MarketFeed({edition,onEditionChange}:{edition:FeedEdition;onEditionChange:(slug:string)=>void}) {
  const navigate=useNavigate();
  const [savedOnly,setSavedOnly]=useState(false); const [saved,setSaved]=useState<FeedRow[]>(()=>hydrateSavedRows(stored<unknown>('nest-feed-saved',[])));
  const [dark,setDark]=useState(()=>stored<boolean>('nest-feed-dark',false) === true); const [large,setLarge]=useState(()=>stored<boolean>('nest-feed-large',false) === true);
  const [paused,setPaused]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [directoryQuery,setDirectoryQuery]=useState(''); const [directoryTown,setDirectoryTown]=useState(''); const [directoryCategory,setDirectoryCategory]=useState('');
  const feed=useMarketFeed(edition); const towns=useFeedTowns(edition);
  const townOptions=feedTownOptions(towns.data || [],savedOnly ? saved : feed.rows);
  useEffect(()=>{setDirectoryTown('');setSavedOnly(false);},[edition.slug]);
  useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)'); const change=()=>{if(media.matches)setPaused(true);};media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
  useEffect(()=>{document.body.classList.add('has-nest-feed');return()=>document.body.classList.remove('has-nest-feed');},[]);
  useEffect(()=>{window.dispatchEvent(new Event('nest-palette-change'));},[dark]);
  const save=(row:FeedRow)=>{const next=saved.some(r=>r.id===row.id) ? saved.filter(r=>r.id!==row.id) : [...saved,row];setSaved(next);persist('nest-feed-saved',next);};
  const ticker=feed.rows.filter(r=>r.category!=='events').slice(0,5);
  const finance=latestFinanceRow(feed.rows);
  const submit=(event:FormEvent)=>{event.preventDefault();logEngagement('regional_search_submit',{}, {source_location:'homepage_feed',intent_type:'contractor_directory_search',query_length_bucket:queryLengthBucket(directoryQuery),category_slug:directoryCategory}, {town_slug:directoryTown || null});navigate(homeDirectorySearch(directoryQuery,directoryTown,directoryCategory));};
  return <div className={`nest-feed${dark ? ' feed-dark' : ''}${large ? ' feed-large' : ''}`}>
    <RentalDetailsRoute/>
    <a className="feed-skip" href="#feed-main">Skip to feed</a>
    <PublicNavigation settings={
      <div className="feed-settings"><Button variant="ghost" size="icon" title="Dark mode" aria-label="Dark mode" aria-pressed={dark} onClick={()=>{setDark(!dark);persist('nest-feed-dark',!dark);}}>{dark ? <Sun/> : <Moon/>}</Button><Button variant="ghost" size="icon" title="Larger text" aria-label="Larger text" aria-pressed={large} onClick={()=>{setLarge(!large);persist('nest-feed-large',!large);}}><Type/></Button></div>
    }/>
    <div className="feed-shell">
      <div className="feed-edition"><label>Edition <select aria-label="Market edition" value={edition.slug} onChange={e=>onEditionChange(e.target.value)}>{FEED_EDITIONS.map(e=><option key={e.slug} value={e.slug}>{e.label}</option>)}</select></label><span>{new Date().toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric',year:'numeric',timeZone:'America/New_York'})}</span></div>
      {edition.live && <><div className={`feed-ticker${paused ? ' is-paused' : ''}`}><span className="feed-ticker-label">{ticker.length ? 'Headlines' : 'Regional desk'}</span><div className="feed-ticker-window"><div className="feed-ticker-track">{[0,1].map(copy=><span key={copy} aria-hidden={copy===1 ? true : undefined}>{ticker.length ? ticker.map(r=><a key={r.id} href={r.href} tabIndex={copy===1 ? -1 : undefined} onClick={()=>interaction('source_click',r.category)}>{r.title}<i aria-hidden> / </i></a>) : <><Link tabIndex={copy===1 ? -1 : undefined} to="/local">Local business directory</Link><i aria-hidden> / </i><Link tabIndex={copy===1 ? -1 : undefined} to="/weekly">Events & stories</Link><i aria-hidden> / </i><Link tabIndex={copy===1 ? -1 : undefined} to="/homes">Real estate resources</Link><i aria-hidden> / </i></>}</span>)}</div></div><Button variant="ghost" size="icon" aria-label={paused ? 'Play ticker' : 'Pause ticker'} onClick={()=>setPaused(!paused)}>{paused ? <Play/> : <Pause/>}</Button></div>
      {(()=>{const body=<>{finance && <div className="feed-finance-update"><span>Dated weekly average · <time dateTime={finance.date}>{rowDate(finance)}</time></span><a href={finance.href} onClick={()=>interaction('source_click','finance')}>{finance.title}</a><span>{finance.source} · Not a real-time quote</span></div>}<div className="feed-finance-links"><Link to="/finances">Financing resources</Link><Link to="/loan-types">Loan options</Link><Link to="/homes/insurance">Insurance</Link><Link to="/grants">Grants & assistance</Link>{!finance && <small>Resources, not live rate quotes</small>}</div></>;
        return <><div className="feed-finance feed-finance-wide"><span>Finance desk</span>{body}</div>
        <details className="feed-finance feed-finance-compact"><summary><span>Finance</span>{finance ? <em>Weekly average · {rowDate(finance)}</em> : <em>Resources</em>}</summary>{body}</details></>;})()}</>}
      <main id="feed-main">
        <div className="feed-title-row"><div><h1>{edition.live ? 'The local feed' : edition.label.replace(' — coming soon','')}</h1><p>{edition.live ? 'Pick a town and a category, or scan the latest dated updates.' : 'Coming soon. Local sources are not connected for this edition.'}</p></div>{edition.live && <div className="feed-check"><span>{feed.checkedAt ? `Last checked ${new Date(feed.checkedAt).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',timeZone:'America/New_York'})} ET` : 'Checking sources…'}</span><Button variant="ghost" size="icon" aria-label="Check for updates" disabled={feed.fetching} onClick={()=>void feed.refresh()}><RefreshCw/></Button></div>}</div>
        {!edition.live ? <div className="feed-empty"><p>No live feed, properties or directory rows are published for this edition.</p><Button onClick={()=>onEditionChange('capital-district')}>Return to Capital District, NY</Button></div> : <>
        {towns.isError && <p role="status" className="feed-notice">Town options could not load. <Link to="/local">Open the directory</Link>.</p>}
        {feed.errors.length>0 && <p role="status" className="feed-notice">Could not check: {feed.errors.join(', ')}.</p>}
        {feed.pending && <Button className="feed-updates" onClick={feed.apply}><Check/>{feed.newCount ? `${feed.newCount} new updates` : 'Updated feed available'}</Button>}
        <FeedBrowse edition={edition} towns={townOptions} saved={saved} savedOnly={savedOnly} onSavedOnly={()=>setSavedOnly(!savedOnly)} onSave={save} dark={dark} large={large} version={feed.rows}/>
        <details className="feed-directory-search-wrap"><summary>Business & contractor search</summary><section className="feed-directory-search" aria-label="Business & contractor search"><div className="feed-section-title"><Link to="/home-services">Home services →</Link></div><form onSubmit={submit}><label className="feed-search">Business or service<input id="homepage-directory-query" type="search" placeholder="Name, trade, or service" value={directoryQuery} onChange={e=>setDirectoryQuery(e.target.value)}/></label><label>Town<select id="homepage-town" value={directoryTown} onChange={e=>setDirectoryTown(e.target.value)}><option value="">All towns</option>{(towns.data || []).map(t=><option key={t.slug} value={t.slug}>{t.name}</option>)}</select></label><label>Category<select id="homepage-category" value={directoryCategory} onChange={e=>setDirectoryCategory(e.target.value)}><option value="">All categories</option>{['Contractor','Restaurant','Coffee','Retail','Healthcare','Dental','Attorney','Accountant','Marketing'].map(c=><option key={c}>{c}</option>)}</select></label><Button type="submit"><Search/>Search directory</Button></form><div className="feed-utility-links"><Link to="/claim-business">Claim / add a business</Link><Link to="/business-login">Business sign in</Link><Link to="/businesses">Business hub</Link><Link to="/for-businesses">For businesses</Link></div></section></details>
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
