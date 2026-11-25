import { describe, expect, it } from 'vitest';
import { quickTowns, FEATURED_TOWNS } from './TownNavigation';
const all=[...FEATURED_TOWNS,'saratoga-springs','colonie','guilderland','latham','niskayuna','cohoes','east-greenbush','ballston-spa','argyle'];
describe('quickTowns',()=>{
  it('keeps the original six first and adds eight desktop extras',()=>{
    const q=quickTowns('',all); expect(q.primary).toEqual(FEATURED_TOWNS); expect(q.extras).toHaveLength(8);
  });
  it('keeps a selected uncommon town visible without duplicates',()=>{
    const q=quickTowns('argyle',all); expect(q.primary).toEqual([...FEATURED_TOWNS,'argyle']);
    const c=quickTowns('colonie',all); expect(c.primary.at(-1)).toBe('colonie'); expect(c.extras).not.toContain('colonie');
  });
  it('never invents towns missing from loaded records',()=>{
    expect(quickTowns('',['albany','troy']).extras).toEqual([]);
  });
});
