import { updateBrowseState } from './feed/browseState';

/** Header view links preserve the current homepage context or a town page's destination. */
export function homepageNavigationHref(pathname:string,search:string,changes:Record<string,string>) {
  const params=pathname==='/' ? new URLSearchParams(search) : new URLSearchParams();
  const town=pathname.match(/^\/towns\/([^/]+)$/)?.[1];
  if(town) params.set('town',town);
  if(params.has('look') && params.get('look')!=='glass') params.delete('look');
  const next=updateBrowseState(params,changes).toString();
  return `/${next ? `?${next}` : ''}#feed-main`;
}
/** Homepage brand link keeps only the exact opt-in glass preview; default stays '/'. */
export function homepageBrandHref(pathname:string,search:string) {
  return pathname==='/' && new URLSearchParams(search).get('look')==='glass' ? '/?look=glass' : '/';
}
