import type { FeedCategory } from './feedModel';
import { updateBrowseState } from './browseState';

/** Category links open existing homepage browse types or the shared directory keyword search; town is preserved. */
export type DirectoryLink = {label:string;type:FeedCategory;search?:string} | {label:string;href:string};
export const primaryCategories: DirectoryLink[] = [
  {label:'Homes for sale',type:'property'},{label:'Rentals',type:'rentals'},
  {label:'Local businesses',type:'business'},{label:'Restaurants',type:'business',search:'restaurant'},
  {label:'Coffee & cafés',type:'business',search:'coffee'},{label:'Contractors',type:'business',search:'contractor'},
  {label:'Home services',href:'/home-services'},{label:'Events',type:'events'},
  {label:'Local news',type:'local_news'},{label:'Mortgage lenders',type:'business',search:'mortgage'},
  {label:'Insurance',type:'business',search:'insurance'},{label:'Health & wellness',type:'business',search:'health'},
];
export const moreDirectoryCategories: DirectoryLink[] = [
  {label:'Roofing',type:'business',search:'roofing'},{label:'Plumbing',type:'business',search:'plumbing'},
  {label:'HVAC',type:'business',search:'hvac'},{label:'Electricians',type:'business',search:'electrician'},
  {label:'Landscaping',type:'business',search:'landscaping'},{label:'Cleaning',type:'business',search:'cleaning'},
  {label:'Attorneys',type:'business',search:'attorney'},{label:'Accountants',type:'business',search:'accountant'},
  {label:'Dentists',type:'business',search:'dental'},{label:'Fitness',type:'business',search:'fitness'},
  {label:'Salon & spa',type:'business',search:'salon'},{label:'Shopping',type:'business',search:'retail'},
  {label:'Auto services',type:'business',search:'auto'},{label:'Finance updates',type:'finance'},
];
export const allDirectoryLinks=[...primaryCategories,...moreDirectoryCategories];
const keywords=new Set(allDirectoryLinks.flatMap(l=>'search' in l && l.search ? [l.search] : []));
/** Category browse always opens a bounded Browse all page; only directory keywords replace the search text. */
export function categoryParams(params:URLSearchParams,link:Exclude<DirectoryLink,{href:string}>) {
  const current=params.get('search') || '';
  const search=link.search ?? (keywords.has(current) ? '' : current);
  return updateBrowseState(params,{type:link.type,view:'browse',search});
}
export function isActiveCategory(link:DirectoryLink,type:FeedCategory,view:string,search:string) {
  if('href' in link || view!=='browse' || link.type!==type) return false;
  return link.search ? link.search===search : !(type==='business' && keywords.has(search));
}
