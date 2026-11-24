import type { FeedCategory } from './feedModel';
import { updateBrowseState } from './browseState';
import { directoryCategory } from '@/lib/directoryCategories';

/** Category links open existing browse types or a structured business classification (`cat`); town and typed search are preserved. */
export type DirectoryLink = {label:string;type:FeedCategory;cat?:string};
const biz=(cat:string):DirectoryLink=>({label:directoryCategory(cat)!.label,type:'business',cat});
export const primaryCategories: DirectoryLink[] = [
  {label:'Homes for sale',type:'property'},{label:'Rentals',type:'rentals'},
  {label:'Local businesses',type:'business'},biz('restaurants'),biz('coffee'),biz('contractors'),
  biz('home-services'),{label:'Events',type:'events'},{label:'Local news',type:'local_news'},
  biz('mortgage'),biz('insurance'),biz('health-wellness'),
];
export const moreDirectoryCategories: DirectoryLink[] = [
  biz('roofing'),biz('plumbing'),biz('hvac'),biz('electricians'),biz('landscaping'),biz('cleaning'),
  biz('attorneys'),biz('accountants'),biz('dentists'),biz('fitness'),biz('salon-spa'),biz('shopping'),
  biz('auto'),{label:'Finance updates',type:'finance'},
];
export const allDirectoryLinks=[...primaryCategories,...moreDirectoryCategories];
/** Category browse always opens a bounded Browse all page. */
export function categoryParams(params:URLSearchParams,link:DirectoryLink) {
  return updateBrowseState(params,{type:link.type,view:'browse',cat:link.cat || ''});
}
export function isActiveCategory(link:DirectoryLink,type:FeedCategory,view:string,cat:string) {
  if(view!=='browse' || link.type!==type) return false;
  return (link.cat || '')===cat;
}
