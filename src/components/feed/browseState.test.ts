import { describe,it,expect } from 'vitest';
import { browsePage,readBrowseState,updateBrowseState } from './browseState';
describe('shareable homepage navigation',()=>{
  it('defaults to latest/all without losing a shared search',()=>{
    expect(readBrowseState(new URLSearchParams('search=coffee'))).toMatchObject({view:'latest',category:'all',town:'',search:'coffee'});
  });
  it('retains Delmar and search when switching Businesses to Homes or changing view',()=>{
    const initial=new URLSearchParams('town=delmar&type=business&view=browse&search=Marion&page_businesses=2');
    const homes=updateBrowseState(initial,{type:'property'});
    expect(readBrowseState(homes)).toMatchObject({view:'browse',category:'property',town:'delmar',search:'Marion'});
    expect(homes.has('page_businesses')).toBe(false);
    expect(readBrowseState(updateBrowseState(homes,{view:'latest'}))).toMatchObject({view:'latest',category:'property',town:'delmar',search:'Marion'});
  });
  it('normalizes equivalent town URLs without rewriting source labels',()=>{
    expect(readBrowseState(new URLSearchParams('town=bethlehem')).town).toBe('delmar');
    expect(readBrowseState(new URLSearchParams('town=glenville')).town).toBe('scotia-glenville');
  });
  it('retains filters when advancing source-specific pages and rejects malformed pages',()=>{
    const page=updateBrowseState(new URLSearchParams('town=albany&type=property&search=Kent'),{page_homes:'5'});
    expect(browsePage(page,'homes')).toBe(5);
    expect(readBrowseState(page)).toMatchObject({town:'albany',category:'property',view:'latest',search:'Kent'});
    expect(browsePage(new URLSearchParams('page_homes=-1'),'homes')).toBe(0);
    expect(browsePage(new URLSearchParams('page_homes=Infinity'),'homes')).toBe(0);
  });
});