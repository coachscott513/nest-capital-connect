import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { easternDay, equivalentFeedTowns, eventRow, listingRow, storyRow, type FeedEdition, type FeedRow } from './feedModel';
import { escapeIlike } from '@/hooks/usePaginatedBusinesses';
import type { BrowseView } from './browseState';

export type InventorySource = 'homes' | 'news' | 'events' | 'rentals';
export const INVENTORY_PAGE_SIZE=20;
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
    href:'/rentals',price:r.rent_price,priceUnit:'month',facts:facts || undefined};
}

export function useBrowseInventory(edition:FeedEdition,source:InventorySource,town:string,search:string,view:BrowseView,page:number,enabled:boolean,version:string,newsCategory='all') {
  return useQuery({queryKey:['feed-inventory',edition.slug,source,town,search,view,page,version,newsCategory],
    enabled:enabled && edition.live && edition.slug==='capital-district',staleTime:60000,refetchOnWindowFocus:false,
    queryFn:async()=>{
      const now=new Date(); const safe=escapeIlike(search); const from=page*INVENTORY_PAGE_SIZE;
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
    }});
}