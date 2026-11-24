import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { chronologicalRows, easternDay, equivalentFeedTowns, eventRow, listingRow, storyRow, type FeedCategory, type FeedEdition, type FeedRow } from './feedModel';
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

export async function fetchInventory(source:InventorySource,town:string,search:string,view:BrowseView,from:number,size:number,newsCategory='all'):Promise<{rows:FeedRow[];count:number}> {
      const now=new Date(); const safe=escapeIlike(search); const INVENTORY_PAGE_SIZE=size;
      if(source==='homes') {
        let q=supabase.from('listings').select('id,full_address,city,town_slug,list_date,list_price,public_listing_url,public_listing_url_approved,status,listing_agent,agency,bedrooms,bathrooms,sqft',{count:'exact'})
          .eq('status','A').eq('public_listing_url_approved',true).lte('list_date',easternDay(now))
          .or('public_listing_url.like.https://%,public_listing_url.like.http://%');
        if(town) q=q.in('town_slug',equivalentFeedTowns(town));
        if(safe) q=q.or(`full_address.ilike.%${safe}%,city.ilike.%${safe}%,listing_agent.ilike.%${safe}%,agency.ilike.%${safe}%`);
        const {data,error,count}=await q.order('list_date',{ascending:false}).order('id').range(from,from+INVENTORY_PAGE_SIZE-1);
        if(error) throw error;
        return {rows:(data || []).map(l=>listingRow(l,now)).filter((r):r is FeedRow=>r!==null),count:count || 0};
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
        return {rows:(data || []).map(storyRow).filter((r):r is FeedRow=>r!==null),count:count || 0};
      }
      if(source==='events') {
        let q=supabase.from('town_events').select('id,title,town_name,town_slug,starts_at,cta_url,venue_name,is_active',{count:'exact'})
          .eq('is_active',true).not('starts_at','is',null).or('cta_url.like.https://%,cta_url.like.http://%');
        if(view==='latest') q=q.gte('starts_at',now.toISOString());
        if(town) q=q.in('town_slug',equivalentFeedTowns(town));
        if(safe) q=q.or(`title.ilike.%${safe}%,town_name.ilike.%${safe}%,venue_name.ilike.%${safe}%`);
        const {data,error,count}=await q.order('starts_at').order('id').range(from,from+INVENTORY_PAGE_SIZE-1);
        if(error) throw error;
        return {rows:(data || []).map(eventRow).filter((r):r is FeedRow=>r!==null),count:count || 0};
      }
      let q=supabase.from('rentals').select('id,town_slug,address,rent_price,available_date,bedrooms,bathrooms,sqft,listing_agent',{count:'exact'}).eq('is_active',true);
      if(town) q=q.in('town_slug',equivalentFeedTowns(town));
      if(safe) q=q.or(`address.ilike.%${safe}%,town_slug.ilike.%${safe}%,listing_agent.ilike.%${safe}%`);
      const {data,error,count}=await q.order('available_date',{nullsFirst:false}).order('address').order('id').range(from,from+INVENTORY_PAGE_SIZE-1);
      if(error) throw error;
      return {rows:(data || []).map(rentalBrowseRow),count:count || 0};
}

export function useBrowseInventory(edition:FeedEdition,source:InventorySource,town:string,search:string,view:BrowseView,page:number,enabled:boolean,version:string,newsCategory='all') {
  return useQuery({queryKey:['feed-inventory',edition.slug,source,town,search,view,page,version,newsCategory],
    enabled:enabled && edition.live && edition.slug==='capital-district',staleTime:60000,refetchOnWindowFocus:false,
    queryFn:()=>fetchInventory(source,town,search,view,page*INVENTORY_PAGE_SIZE,INVENTORY_PAGE_SIZE,newsCategory)});
}

/** Sources that contribute dated rows to Latest updates for a category. */
export function latestSources(category:FeedCategory):{source:InventorySource;newsCategory:string}[] {
  if(category==='all') return [{source:'homes',newsCategory:'all'},{source:'news',newsCategory:'all'},{source:'events',newsCategory:'all'}];
  if(category==='property') return [{source:'homes',newsCategory:'all'},{source:'news',newsCategory:'property'}];
  if(category==='events') return [{source:'events',newsCategory:'all'}];
  if(['local_news','finance','business'].includes(category)) return [{source:'news',newsCategory:category}];
  return [];
}
/** Every source is fetched from row 0 through the requested window plus a buffer, so merging never skips rows between pages. */
export const latestFetchSize=(page:number)=>(page+2)*LATEST_PAGE_SIZE;
export function latestWindow(results:{rows:FeedRow[];count:number}[],page:number) {
  const merged=chronologicalRows(results.flatMap(r=>r.rows));
  const complete=results.every(r=>r.rows.length>=r.count);
  const start=page*LATEST_PAGE_SIZE;
  return {rows:merged.slice(start,start+LATEST_PAGE_SIZE),start,
    hasNext:merged.length>start+LATEST_PAGE_SIZE || !complete,
    total:complete ? merged.length : null};
}
export function useLatestFeed(edition:FeedEdition,category:FeedCategory,town:string,search:string,page:number,enabled:boolean,version:string) {
  const sources=latestSources(category);
  return useQuery({queryKey:['feed-latest',edition.slug,category,town,search,page,version],
    enabled:enabled && sources.length>0 && edition.live && edition.slug==='capital-district',staleTime:60000,refetchOnWindowFocus:false,
    queryFn:async()=>latestWindow(await Promise.all(sources.map(s=>fetchInventory(s.source,town,search,'latest',0,latestFetchSize(page),s.newsCategory))),page)});
}