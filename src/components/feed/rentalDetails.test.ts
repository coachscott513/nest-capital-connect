import { beforeEach,describe,it,expect,vi } from 'vitest';
const state=vi.hoisted(()=>({calls:[] as [string,unknown][],data:null as null | {id:string},error:null as null | Error}));
vi.mock('@/integrations/supabase/client',()=>({supabase:{from:(table:string)=>{
 state.calls.push(['table',table]);
 const query={select:()=>query,eq:(key:string,value:unknown)=>{state.calls.push([key,value]);return query;},maybeSingle:async()=>({data:state.data,error:state.error})};return query;
}}}));
import { fetchActiveRental } from './RentalDetailsRoute';
const id='12345678-abcd-4321-abcd-123456789abc';
beforeEach(()=>{state.calls=[];state.data=null;state.error=null;});
describe('public rental detail fetch',()=>{
 it('fetches the exact ID only with active=true and returns honest unavailable on no active match',async()=>{
  expect(await fetchActiveRental(id)).toBeNull();
  expect(state.calls).toEqual([['table','rentals'],['id',id],['is_active',true]]);
 });
 it('does not fetch malformed IDs',async()=>{
  expect(await fetchActiveRental('invalid')).toBeNull();expect(state.calls).toHaveLength(0);
 });
 it('returns the selected active record and never invents missing brokerage',async()=>{
  state.data={id};expect(await fetchActiveRental(id)).toEqual({id,agency:null});
 });
});