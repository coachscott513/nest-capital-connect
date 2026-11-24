import { beforeEach,describe,it,expect,vi } from 'vitest';
const state=vi.hoisted(()=>({calls:[] as [string,unknown[]][],options:{} as {queryFn?:()=>Promise<unknown>;enabled?:boolean}}));
vi.mock('@tanstack/react-query',()=>({useQuery:(options:typeof state.options)=>{state.options=options;return {};}}));
vi.mock('@/integrations/supabase/client',()=>({supabase:{from:(table:string)=>{
  state.calls.push(['from',[table]]);
  const q:Record<string,unknown>={then:(resolve:(v:unknown)=>void)=>resolve({data:[],error:null,count:0})};
  for(const method of ['select','eq','lte','gte','or','in','not','neq','ilike','order','range']) q[method]=(...args:unknown[])=>{state.calls.push([method,args]);return q;};
  return q;
}}}));
import { businessDirectoryQuery } from '@/hooks/usePaginatedBusinesses';
import { rentalBrowseRow,useBrowseInventory } from './useBrowseInventory';
const edition={slug:'capital-district',live:true,label:'Capital District, NY'};
beforeEach(()=>{state.calls=[];state.options={};});
describe('published inventory queries',()=>{
  it('server-pages approved active homes beyond row 100 with exact counts and equivalent towns',async()=>{
    useBrowseInventory(edition,'homes','delmar','Marion','browse',5,true,'test');
    await state.options.queryFn?.();
    expect(state.calls).toContainEqual(['eq',['status','A']]);
    expect(state.calls).toContainEqual(['eq',['public_listing_url_approved',true]]);
    expect(state.calls).toContainEqual(['range',[100,119]]);
    expect(state.calls).toContainEqual(['in',['town_slug',['delmar','bethlehem','delmar-bethlehem']]]);
    expect(state.calls.find(([name])=>name==='select')?.[1][1]).toEqual({count:'exact'});
    expect(state.calls.some(([method,args])=>method==='or' && String(args[0]).includes('full_address.ilike.%Marion%'))).toBe(true);
    expect(state.calls.some(([method])=>method==='lte')).toBe(true);
  });
  it('uses the existing directory keyword synonyms and alphabetic ordering for homepage business search',()=>{
    businessDirectoryQuery({townSlug:'glenville',search:'coffee'},'id,name',true,'capital-district',true).range(15,29);
    expect(state.calls).toContainEqual(['range',[15,29]]);
    expect(state.calls).toContainEqual(['eq',['region','capital-district']]);
    expect(state.calls).toContainEqual(['in',['town_slug',['glenville','scotia','scotia-glenville']]]);
    expect(state.calls.filter(([m])=>m==='order')).toEqual([['order',['name']],['order',['id']]]);
    expect(state.calls.some(([m,a])=>m==='or' && String(a[0]).includes('subcategory.ilike.%espresso%'))).toBe(true);
  });
  it('uses only active rental inventory and paginates instead of relabeling homes',async()=>{
    useBrowseInventory(edition,'rentals','albany','','browse',1,true,'test');await state.options.queryFn?.();
    expect(state.calls).toContainEqual(['from',['rentals']]);
    expect(state.calls).toContainEqual(['eq',['is_active',true]]);
    expect(state.calls).toContainEqual(['range',[20,39]]);
    expect(state.calls.some(([m,a])=>m==='select' && String(a[0]).includes('created_at'))).toBe(false);
  });
  it('retains supplied rental availability, masks street number and never creates a listing badge/publication date',()=>{
    const rental=rentalBrowseRow({id:'r',town_slug:'albany',address:'123 Main Street',rent_price:1500,available_date:'2026-12-01',bedrooms:2,bathrooms:1,sqft:null,listing_agent:null});
    expect(rental).toMatchObject({title:'Main Street',category:'rentals',date:'2026-12-01',dateLabel:'Available',price:1500,priceUnit:'month',href:'/rentals'});
    expect(rental.kind).toBeUndefined();
  });
  it('latest event queries use scheduled upcoming dates, while browse is independent of recency',async()=>{
    useBrowseInventory(edition,'events','','','latest',0,true,'test');await state.options.queryFn?.();
    expect(state.calls.some(([m,a])=>m==='gte' && a[0]==='starts_at')).toBe(true);
    state.calls=[];useBrowseInventory(edition,'events','','','browse',0,true,'test');await state.options.queryFn?.();
    expect(state.calls.some(([m])=>m==='gte')).toBe(false);
  });
});