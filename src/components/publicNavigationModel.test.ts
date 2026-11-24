import { describe,it,expect } from 'vitest';
import { homepageNavigationHref } from './publicNavigationModel';
import { SECTION_DEFS } from './publicNavigationData';
describe('public header destination contracts',()=>{
 it('preserves selected town and search in homepage view links while resetting pages',()=>{
  expect(homepageNavigationHref('/','?town=delmar&search=coffee&page_businesses=3',{view:'browse',type:'business'})).toBe('/?town=delmar&search=coffee&view=browse&type=business#feed-main');
 });
 it('carries a town page into browsing without copying unrelated route query values',()=>{
  expect(homepageNavigationHref('/towns/glenville','?token=irrelevant',{view:'browse',type:'property'})).toBe('/?town=glenville&view=browse&type=property#feed-main');
 });
 it('retains original business directory and service destinations in grouped navigation data',()=>{
  const links=SECTION_DEFS.flatMap(s=>s.columns.flatMap(c=>c.links.map(l=>l.href)));
  expect(links).toContain('/local');expect(links).toContain('/claim-business');expect(links).toContain('/homes/search');expect(links).toContain('/local?category=hvac');
 });
});