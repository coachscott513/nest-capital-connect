import { describe,it,expect } from 'vitest';
import { hydrateSavedRows,isSafeSavedHref,rentalDetailHref,rentalInPlaceHref } from './rentalLinks';
import { updateBrowseState } from './browseState';
const id='12345678-abcd-4321-abcd-123456789abc';
describe('safe rental and town links',()=>{
 it('accepts only valid specific rental detail URLs for saved rows',()=>{
  expect(isSafeSavedHref(rentalDetailHref(id,'albany'))).toBe(true);
  expect(isSafeSavedHref(`/rentals?rental=${id}`)).toBe(true);
  expect(isSafeSavedHref('/rentals')).toBe(false);
  expect(isSafeSavedHref('/rentals?rental=invalid')).toBe(false);
 });
 it.each(['//evil.example/rentals','javascript:alert(1)','/\\evil.example','/rentals?rental='+id+'&redirect=https://evil.example','/rentals?rental='+id+'&town=../admin','/rentals?rental='+id+'#private','/rentals?rental='+id+'&rental='+id])('rejects unsafe or non-specific internal href %s',href=>{
  expect(isSafeSavedHref(href)).toBe(false);
 });
 it('retains existing business and HTTP source snapshots',()=>{
  expect(isSafeSavedHref('/biz/a-business')).toBe(true);
  expect(isSafeSavedHref('https://example.org/source')).toBe(true);
 });
 it('upgrades already-saved generic rental links from valid row IDs without accepting unsafe snapshots',()=>{
  const row={id:`rental:${id}`,category:'rentals',townSlug:'albany',href:'/rentals'};
  expect(hydrateSavedRows([row])[0]?.href).toBe(rentalDetailHref(id,'albany'));
  expect(hydrateSavedRows([{...row,href:'//evil.example'},{...row,id:'rental:invalid'}])).toEqual([]);
 });
 it('opening/closing details preserves exact town, search, view, type and page context',()=>{
  const context='town=albany&type=rentals&view=browse&search=Street&page_rentals=2';
  const url=rentalInPlaceHref(context,id);const params=new URLSearchParams(url.split('?')[1]);
  expect(params.get('rental')).toBe(id);params.delete('rental');expect(params.toString()).toBe(context);
 });
 it('town link hrefs preserve view/category/search and reset only source pages',()=>{
  const href=updateBrowseState(new URLSearchParams('view=browse&type=business&search=coffee&page_businesses=2'),{town:'delmar'});
  expect(href.toString()).toBe('view=browse&type=business&search=coffee&town=delmar');
 });
});