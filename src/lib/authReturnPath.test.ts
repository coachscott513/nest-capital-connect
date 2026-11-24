import { describe, expect, it } from 'vitest';
import { authReturnPath } from './authReturnPath';

describe('resource sign-in return path', () => {
  it('preserves internal paths and query strings', () => {
    expect(authReturnPath('/buyer-journey/investor?town=albany#guide')).toBe('/buyer-journey/investor?town=albany#guide');
  });
  it('rejects external and ambiguous destinations', () => {
    for (const value of [null, 'https://attacker.example', '//attacker.example', '/\\attacker.example', '/\n/attacker.example']) {
      expect(authReturnPath(value)).toBe('/');
    }
  });
});