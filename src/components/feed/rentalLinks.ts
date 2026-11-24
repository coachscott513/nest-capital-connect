import { publicUrl, type FeedRow } from './feedModel';
export const validRentalId=(value:string)=>/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
const safeTown=(value:string)=>/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
export function rentalDetailHref(id:string,town:string) {
  const params=new URLSearchParams({rental:id});
  if(safeTown(town)) params.set('town',town);
  return `/rentals?${params}`;
}
export function isSafeSavedHref(href:unknown):href is string {
  if(typeof href!=='string' || href.startsWith('//') || href.includes('\\')) return false;
  if(publicUrl(href)) return true;
  if(/^\/biz\/[a-z0-9_-]+$/i.test(href)) return true;
  if(!href.startsWith('/rentals?')) return false;
  const url=new URL(href,'https://internal.invalid');
  if(url.pathname!=='/rentals' || url.hash || !validRentalId(url.searchParams.get('rental') || '')) return false;
  return Array.from(url.searchParams.keys()).every(key=>['rental','town'].includes(key) && url.searchParams.getAll(key).length===1)
    && (!url.searchParams.has('town') || safeTown(url.searchParams.get('town') || ''));
}
export function rentalInPlaceHref(search:string,id:string) {
  const params=new URLSearchParams(search);params.set('rental',id);
  return `/?${params}`;
}
export function hydrateSavedRows(value:unknown):FeedRow[] {
  if(!Array.isArray(value)) return [];
  return value.flatMap(row=>{
    if(!row || typeof row.id!=='string') return [];
    // Upgrade only the previously generated generic rental link, never an arbitrary unsafe URL.
    const id=row.category==='rentals' ? row.id.replace(/^rental:/,'') : '';
    const next=row.href==='/rentals' && validRentalId(id)
      ? {...row,href:rentalDetailHref(id,typeof row.townSlug==='string' ? row.townSlug : '')} : row;
    return isSafeSavedHref(next.href) ? [next] : [];
  });
}