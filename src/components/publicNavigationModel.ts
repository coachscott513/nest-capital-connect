import { updateBrowseState } from './feed/browseState';

/** Header view links preserve the current homepage context or a town page's destination. */
export function homepageNavigationHref(pathname:string,search:string,changes:Record<string,string>) {
  const params=pathname==='/' ? new URLSearchParams(search) : new URLSearchParams();
  const town=pathname.match(/^\/towns\/([^/]+)$/)?.[1];
  if(town) params.set('town',town);
  const next=updateBrowseState(params,changes).toString();
  return `/${next ? `?${next}` : ''}#feed-main`;
}