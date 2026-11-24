import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { businessDirectoryQuery } from '@/hooks/usePaginatedBusinesses';
import type { Database } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';
import { chronologicalRows, easternDay, feedTownOptions, eventRow, listingRow, storyRow, snapshotKey, newRowCount, type FeedEdition, type FeedRow } from './feedModel';

export function useMarketFeed(edition: FeedEdition) {
  const query = useQuery({
    queryKey: ['market-feed', edition.slug], enabled: edition.live && edition.slug === 'capital-district',
    refetchInterval: 60000, refetchOnWindowFocus: true,
    queryFn: async () => {
      // These sources lack a region column. Never use them in another edition.
      const [stories,events,listings] = await Promise.all([
        supabase.from('media_stories').select('id,headline,town,source_name,source_article_url,published_at,approved,category,summary').eq('approved',true).order('published_at',{ascending:false}).limit(100),
        supabase.from('town_events').select('id,title,town_name,town_slug,starts_at,cta_url,venue_name,is_active').eq('is_active',true).order('starts_at',{ascending:true}).limit(100),
        supabase.from('listings').select('id,full_address,city,town_slug,list_date,list_price,public_listing_url,public_listing_url_approved,status,listing_agent,agency,bedrooms,bathrooms,sqft').eq('status','A').eq('public_listing_url_approved',true).order('list_date',{ascending:false}).limit(100),
      ]);
      const errors = [stories.error && 'Local news', events.error && 'Events', listings.error && 'Property'].filter(Boolean) as string[];
      const rows = chronologicalRows([
        ...(stories.data || []).map(storyRow), ...(events.data || []).map(eventRow), ...(listings.data || []).map(l => listingRow(l)),
      ].filter((row): row is FeedRow => row !== null));
      return { rows, errors, checkedAt: new Date().toISOString() };
    },
  });
  const [displayed, setDisplayed] = useState<{ edition: string; rows: FeedRow[] } | null>(null);
  useEffect(() => {
    if (query.data && (!displayed || displayed.edition !== edition.slug)) setDisplayed({edition:edition.slug,rows:query.data.rows});
  },[query.data,edition.slug,displayed]);
  const rows = displayed?.edition === edition.slug ? displayed.rows : [];
  const pending = !!query.data && snapshotKey(rows) !== snapshotKey(query.data.rows) && displayed?.edition === edition.slug;
  return { rows, pending, newCount: newRowCount(rows,query.data?.rows || []), apply: () => query.data && setDisplayed({edition:edition.slug,rows:query.data.rows}), checkedAt: query.data?.checkedAt, errors: query.data?.errors || [], loading: query.isLoading, refresh: query.refetch, fetching: query.isFetching };
}

export function useFeedTowns(edition: FeedEdition) {
  return useQuery({queryKey:['feed-towns',edition.slug],enabled:edition.live && edition.slug === 'capital-district',staleTime:300000,queryFn:async()=>{
    const {data,error} = await supabase.from('towns').select('town_slug,town_name,region').eq('is_active',true).order('town_name');
    if (error) throw error;
    const towns = new Map<string,string>();
    for (const t of data || []) if (!t.region || t.region === edition.slug) towns.set(t.town_slug,t.town_name);
    // Only location metadata is collected; this is not a business search index.
    for (let offset=0;;offset+=1000) {
      const result = await supabase.from('businesses').select('town_slug,town_name').eq('is_active',true).eq('region',edition.slug).order('id').range(offset,offset+999);
      if (result.error) throw result.error;
      for (const t of result.data || []) if (t.town_slug && t.town_slug !== 'unknown' && t.town_name) towns.set(t.town_slug,t.town_name);
      if ((result.data?.length || 0)<1000) break;
    }
    for (let offset=0;;offset+=1000) {
      const result=await supabase.from('listings').select('town_slug,city').eq('status','A').eq('public_listing_url_approved',true)
        .lte('list_date',easternDay(new Date()))
        .or('public_listing_url.like.https://%,public_listing_url.like.http://%').order('id').range(offset,offset+999);
      if(result.error) throw result.error;
      for(const t of result.data || []) if(t.town_slug && t.city && !towns.has(t.town_slug)) towns.set(t.town_slug,t.city);
      if((result.data?.length || 0)<1000) break;
    }
    for (let offset=0;;offset+=1000) {
      const result=await supabase.from('rentals').select('town_slug').eq('is_active',true).order('id').range(offset,offset+999);
      if(result.error) throw result.error;
      for(const t of result.data || []) if(t.town_slug && t.town_slug!=='unknown' && !towns.has(t.town_slug)) towns.set(t.town_slug,t.town_slug.replace(/\b\w/g,c=>c.toUpperCase()).replace(/-/g,' '));
      if((result.data?.length || 0)<1000) break;
    }
    return feedTownOptions(Array.from(towns,([slug,name])=>({slug,name})),[]);
  }});
}
export function useDirectoryRows(edition: FeedEdition,town: string,page: number,search = '',enabled = true,size = 8) {
  return useQuery({queryKey:['feed-directory',edition.slug,town,page,search,size],enabled:enabled && edition.live && edition.slug === 'capital-district',staleTime:60000,queryFn:async()=>{
    const query = businessDirectoryQuery({townSlug:town,search},'id,name,slug,town_name,town_slug,category,subcategory,website,phone,contact_status,source_url,source',true,edition.slug,true);
    const {data,error,count} = await query.range(page*size,page*size+size-1).returns<Pick<Database['public']['Tables']['businesses']['Row'],'id'|'name'|'slug'|'town_name'|'town_slug'|'category'|'subcategory'|'website'|'phone'|'contact_status'|'source_url'|'source'>[]>();
    if(error) throw error;
    return {rows:data || [],count:count || 0};
  }});
}
