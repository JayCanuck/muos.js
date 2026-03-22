import { describe, expect, it } from 'vitest';
import { bumpPatch } from '../scripts/bump';

describe('bumpPatch', () => {
  it('should increment the patch version', () => {
    expect(bumpPatch('1.0.0')).toBe('1.0.1');
    expect(bumpPatch('1.0.2')).toBe('1.0.3');
    expect(bumpPatch('0.0.0')).toBe('0.0.1');
  });

  it('should handle double-digit patch numbers', () => {
    expect(bumpPatch('1.0.9')).toBe('1.0.10');
    expect(bumpPatch('1.0.99')).toBe('1.0.100');
  });

  it('should preserve major and minor versions', () => {
    expect(bumpPatch('3.5.7')).toBe('3.5.8');
    expect(bumpPatch('10.20.30')).toBe('10.20.31');
  });

  it('should throw on invalid semver', () => {
    expect(() => bumpPatch('invalid')).toThrow('Invalid semver');
    expect(() => bumpPatch('1.0')).toThrow('Invalid semver');
    expect(() => bumpPatch('')).toThrow('Invalid semver');
  });

  it('should throw on prerelease versions', () => {
    expect(() => bumpPatch('1.0.0-alpha')).toThrow('prerelease');
    expect(() => bumpPatch('1.0.0-beta.1')).toThrow('prerelease');
  });
});
