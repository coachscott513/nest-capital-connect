import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { chronologicalRows, compareFeedRows, easternDay, equivalentFeedTowns, eventRow, listingRow, storyRow, type FeedCategory, type FeedEdition, type FeedRow } from './feedModel';
import { escapeIlike } from '@/hooks/usePaginatedBusinesses';
import type { BrowseView } from './browseState';
import { rentalDetailHref } from './rentalLinks';

export type InventorySource = 'homes' | 'news' | 'events' | 'rentals';
export const INVENTORY_PAGE_SIZE=8;
/** Homepage Latest shows one bounded mixed batch, never one batch per source. */
export const LATEST_PAGE_SIZE=6;
export interface RentalRecord {
  id:string;town_slug:string;address:string;rent_price:number;available_date:string|null;
  bedrooms:number|null;bathrooms:number|null;sqft:number|null;listing_agent:string|null;
}
export function rentalBrowseRow(r:RentalRecord):FeedRow {
  // Match the existing public rental teaser: do not unmask street numbers or invent a source/publication date.
  const facts=[[r.bedrooms,'beds'],[r.bathrooms,'baths'],[r.sqft,'sq ft']]
    .filter(([v])=>typeof v==='number' && v>0).map(([v,label])=>`${v} ${label}`).join(' · ');
  return {id:`rental:${r.id}`,category:'rentals',identity:'Rental',title:r.address.replace(/^\d+\s*/,''),
    town:r.town_slug.replace(/\b\w/g,c=>c.toUpperCase()).replace(/-/g,' '),townSlug:r.town_slug,
    date:r.available_date || '',dateOnly:true,dateLabel:'Available',source:r.listing_agent || 'Published rental directory',
    href:rentalDetailHref(r.id,r.town_slug),price:r.rent_price,priceUnit:'month',facts:facts || undefined};
}

const LISTING_FIELDS='id,full_address,city,town_slug,list_date,list_price,public_listing_url,public_listing_url_approved,status,is_featured,listing_agent,agency,bedrooms,bathrooms,sqft';
/** Shared active, approved, non-future, public-URL listing query used by Featured and regular home sources. */
function homesQuery(town:string,search:string,now:Date) {
  const safe=escapeIlike(search);
  let q=supabase.from('listings').select(LISTING_FIELDS,{count:'exact'})
    .eq('status','A').eq('public_listing_url_approved',true).lte('list_date',easternDay(now))
    .or('public_listing_url.like.https://%,public_listing_url.like.http://%');
  if(town) q=q.in('town_slug',equivalentFeedTowns(town));
  if(safe) q=q.or(`full_address.ilike.%${safe}%,city.ilike.%${safe}%,listing_agent.ilike.%${safe}%,agency.ilike.%${safe}%`);
  return q;
}
export const FEATURED_LISTING_LIMIT=4;
/** Editorially flagged listings (is_featured strictly true), newest first, bounded and deterministic. */
export async function fetchFeaturedListings(town:string,search:string):Promise<FeedRow[]> {
  const now=new Date();
  const {data,error}=await homesQuery(town,search,now).eq('is_featured',true).order('list_date',{ascending:false}).order('id').range(0,FEATURED_LISTING_LIMIT-1);
  if(error) throw error;
  return (data || []).filter(l=>l.is_featured===true).map(l=>listingRow(l,now)).filter((r):r is FeedRow=>r!==null);
}
/** Featured appears only for Homes/All contexts outside Saved. */
export function featuredApplies(category:FeedCategory,savedOnly:boolean) { return !savedOnly && (category==='all' || category==='property'); }
export function useFeaturedListings(edition:FeedEdition,town:string,search:string,enabled:boolean,version:string) {
  return useQuery({queryKey:['feed-featured',edition.slug,town,search,version],
    enabled:enabled && edition.live && edition.slug==='capital-district',staleTime:60000,refetchOnWindowFocus:false,
    queryFn:()=>fetchFeaturedListings(town,search)});
}

/** `fetched` is the raw row count returned before adapters reject invalid records. */
export interface InventoryChunk {rows:FeedRow[];count:number;fetched:number}
export async function fetchInventory(source:InventorySource,town:string,search:string,view:BrowseView,from:number,size:number,newsCategory='all',excludeListingIds:string[]=[]):Promise<InventoryChunk> {
      const now=new Date(); const safe=escapeIlike(search); const INVENTORY_PAGE_SIZE=size;
      if(source==='homes') {
        let q=homesQuery(town,search,now);
        // Listings already shown in the Featured section are excluded server-side so counts and pages stay exact.
        const ids=excludeListingIds.filter(id=>/^[0-9a-f-]{36}$/i.test(id));
        if(ids.length) q=q.not('id','in',`(${ids.join(',')})`);
        const {data,error,count}=await q.order('list_date',{ascending:false}).order('id').range(from,from+INVENTORY_PAGE_SIZE-1);
        if(error) throw error;
        return {rows:(data || []).map(l=>listingRow(l,now)).filter((r):r is FeedRow=>r!==null),count:count || 0,fetched:data?.length || 0};
      }
      if(source==='news') {
        let q=supabase.from('media_stories').select('id,headline,town,source_name,source_article_url,published_at,approved,category,summary',{count:'exact'})
          .eq('approved',true).lte('published_at',now.toISOString()).neq('source_name','')
          .or('source_article_url.like.https://%,source_article_url.like.http://%');
        // Stories supply municipality text, not the directory slug.
        if(town) q=q.or(equivalentFeedTowns(town).map(t=>`town.ilike.${t.replace(/-/g,' ')}`).join(','));
        if(newsCategory==='finance') q=q.ilike('category','%financ%');
        else if(newsCategory==='business') q=q.ilike('category','%business%');
        else if(newsCategory==='property') q=q.ilike('category','%real%estate%');
        else if(newsCategory==='local_news') q=q.not('category','ilike','%financ%').not('category','ilike','%business%').not('category','ilike','%real%estate%');
        if(safe) q=q.or(`headline.ilike.%${safe}%,town.ilike.%${safe}%,source_name.ilike.%${safe}%`);
        const {data,error,count}=await q.order('published_at',{ascending:false}).order('id').range(from,from+INVENTORY_PAGE_SIZE-1);
        if(error) throw error;
        return {rows:(data || []).map(storyRow).filter((r):r is FeedRow=>r!==null),count:count || 0,fetched:data?.length || 0};
      }
      if(source==='events') {
        let q=supabase.from('town_events').select('id,title,town_name,town_slug,starts_at,cta_url,venue_name,is_active',{count:'exact'})
          .eq('is_active',true).not('starts_at','is',null).or('cta_url.like.https://%,cta_url.like.http://%');
        if(view==='latest') q=q.gte('starts_at',now.toISOString());
        if(town) q=q.in('town_slug',equivalentFeedTowns(town));
        if(safe) q=q.or(`title.ilike.%${safe}%,town_name.ilike.%${safe}%,venue_name.ilike.%${safe}%`);
        const {data,error,count}=await q.order('starts_at').order('id').range(from,from+INVENTORY_PAGE_SIZE-1);
        if(error) throw error;
        return {rows:(data || []).map(eventRow).filter((r):r is FeedRow=>r!==null),count:count || 0,fetched:data?.length || 0};
      }
      let q=supabase.from('rentals').select('id,town_slug,address,rent_price,available_date,bedrooms,bathrooms,sqft,listing_agent',{count:'exact'}).eq('is_active',true);
      if(town) q=q.in('town_slug',equivalentFeedTowns(town));
      if(safe) q=q.or(`address.ilike.%${safe}%,town_slug.ilike.%${safe}%,listing_agent.ilike.%${safe}%`);
      const {data,error,count}=await q.order('available_date',{nullsFirst:false}).order('address').order('id').range(from,from+INVENTORY_PAGE_SIZE-1);
      if(error) throw error;
      return {rows:(data || []).map(rentalBrowseRow),count:count || 0,fetched:data?.length || 0};
}

export function useBrowseInventory(edition:FeedEdition,source:InventorySource,town:string,search:string,view:BrowseView,page:number,enabled:boolean,version:string,newsCategory='all',excludeListingIds:string[]=[]) {
  return useQuery({queryKey:['feed-inventory',edition.slug,source,town,search,view,page,version,newsCategory,excludeListingIds],
    enabled:enabled && edition.live && edition.slug==='capital-district',staleTime:60000,refetchOnWindowFocus:false,
    queryFn:()=>fetchInventory(source,town,search,view,page*INVENTORY_PAGE_SIZE,INVENTORY_PAGE_SIZE,newsCategory,excludeListingIds)});
}

/** Sources that contribute dated rows to Latest updates for a category. */
export function latestSources(category:FeedCategory):{source:InventorySource;newsCategory:string}[] {
  if(category==='all') return [{source:'homes',newsCategory:'all'},{source:'news',newsCategory:'all'},{source:'events',newsCategory:'all'}];
  if(category==='property') return [{source:'homes',newsCategory:'all'},{source:'news',newsCategory:'property'}];
  if(category==='events') return [{source:'events',newsCategory:'all'}];
  if(['local_news','finance','business'].includes(category)) return [{source:'news',newsCategory:category}];
  return [];
}
export type LatestFetcher=(from:number,size:number)=>Promise<InventoryChunk>;
export const LATEST_FIRST_CHUNK=12, LATEST_MAX_CHUNK=200, LATEST_MAX_REQUESTS=40;
/**
 * Fill one six-row window from valid, de-duplicated rows merged across sources.
 * Each source is read in bounded chunks in its own server order; a merged row is
 * final only once every unfinished source has already returned a row ordered at
 * or after it, so adapter rejections and duplicates never skip, repeat or short a page.
 */
export async function collectLatestWindow(fetchers:LatestFetcher[],page:number) {
  const start=page*LATEST_PAGE_SIZE, need=start+LATEST_PAGE_SIZE+1;
  const state=fetchers.map(()=>({rows:[] as FeedRow[],offset:0,done:false,chunk:LATEST_FIRST_CHUNK,last:undefined as FeedRow|undefined}));
  let requests=0;
  const settled=()=>{
    const merged=chronologicalRows(state.flatMap(s=>s.rows));
    let safe=0;
    while(safe<merged.length && state.every(s=>s.done || (s.last!==undefined && compareFeedRows(merged[safe],s.last)<=0))) safe++;
    return {merged,safe};
  };
  let view=settled();
  while(view.safe<need && state.some(s=>!s.done) && requests<LATEST_MAX_REQUESTS) {
    const next=view.merged[view.safe];
    // Advance only sources that still block the next row from being final.
    const blocking=state.filter(s=>!s.done && (s.last===undefined || !next || compareFeedRows(next,s.last)>0));
    await Promise.all(blocking.map(async s=>{
      const i=state.indexOf(s); requests++;
      const result=await fetchers[i](s.offset,s.chunk);
      s.offset+=result.fetched; s.rows.push(...result.rows);
      const valid=result.rows.filter(r=>!!Date.parse(r.dateOnly ? `${r.date}T12:00:00Z` : r.date));
      if(valid.length) s.last=valid.reduce((a,b)=>compareFeedRows(a,b)>=0 ? a : b,s.last ?? valid[0]);
      if(result.fetched<s.chunk || s.offset>=result.count) s.done=true;
      s.chunk=Math.min(s.chunk*2,LATEST_MAX_CHUNK);
    }));
    view=settled();
  }
  const complete=state.every(s=>s.done);
  const final=complete ? view.merged : view.merged.slice(0,view.safe);
  return {rows:final.slice(start,start+LATEST_PAGE_SIZE),start,
    hasNext:final.length>start+LATEST_PAGE_SIZE || (!complete && view.safe>=start+LATEST_PAGE_SIZE),
    total:complete ? view.merged.length : null};
}
export function useLatestFeed(edition:FeedEdition,category:FeedCategory,town:string,search:string,page:number,enabled:boolean,version:string,excludeListingIds:string[]=[]) {
  const sources=latestSources(category);
  return useQuery({queryKey:['feed-latest',edition.slug,category,town,search,page,version,excludeListingIds],
    enabled:enabled && sources.length>0 && edition.live && edition.slug==='capital-district',staleTime:60000,refetchOnWindowFocus:false,
    queryFn:()=>collectLatestWindow(sources.map(s=>(from,size)=>fetchInventory(s.source,town,search,'latest',from,size,s.newsCategory,excludeListingIds)),page)});
}
