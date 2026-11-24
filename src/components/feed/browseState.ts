import { canonicalFeedTown, type FeedCategory } from './feedModel';
import { directoryCategory } from '@/lib/directoryCategories';

export type BrowseView = 'latest' | 'browse';
export const browseCategories: {value:FeedCategory;label:string}[] = [
  {value:'all',label:'All'},{value:'property',label:'Homes'},{value:'rentals',label:'Rentals'},
  {value:'business',label:'Businesses'},{value:'events',label:'Events'},
];
export const moreCategories: {value:FeedCategory;label:string}[] = [
  {value:'local_news',label:'Local news'},{value:'finance',label:'Finance'},
  {value:'sales',label:'Sales'},{value:'price_changes',label:'Price changes'},
];
export function readBrowseState(params: URLSearchParams) {
  const raw=params.get('type');
  const category=[...browseCategories,...moreCategories].find(c=>c.value===raw)?.value || 'all';
  return {town:canonicalFeedTown(params.get('town') || ''),category,
    view:(params.get('view')==='browse' ? 'browse' : 'latest') as BrowseView,
    search:params.get('search') || '',
    // Structured business classification; only meaningful while browsing businesses.
    cat:category==='business' && directoryCategory(params.get('cat')) ? params.get('cat') as string : ''};
}
export function updateBrowseState(params:URLSearchParams, changes:Record<string,string>) {
  const next=new URLSearchParams(params);
  for (const [key,value] of Object.entries(changes)) {
    if (value && !(key==='type' && value==='all') && !(key==='view' && value==='latest')) next.set(key,value);
    else next.delete(key);
  }
  if ('type' in changes && changes.type!=='business' && !('cat' in changes)) next.delete('cat');
  // Reset only pagination when context changes; town and search survive category/view changes.
  if (['town','view','type','search','cat'].some(key=>key in changes))
    for (const key of Array.from(next.keys())) if(key.startsWith('page_')) next.delete(key);
  return next;
}
export function browsePage(params:URLSearchParams,source:string) {
  const value=Number(params.get(`page_${source}`) || 0);
  return Number.isSafeInteger(value) && value>=0 ? value : 0;
}