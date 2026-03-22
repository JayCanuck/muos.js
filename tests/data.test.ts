import { describe, expect, it } from 'vitest';
import { System, assign, version } from '../src/data';

describe('System enum', () => {
  const systemValues = Object.values(System);
  const systemKeys = Object.keys(System);

  it('should have at least one system defined', () => {
    expect(systemValues.length).toBeGreaterThan(0);
  });

  it('should have non-empty string values for all entries', () => {
    for (const value of systemValues) {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    }
  });

  it('should have PascalCase keys', () => {
    for (const key of systemKeys) {
      // PascalCase: starts with uppercase letter, no whitespace, no hyphens
      expect(key).toMatch(/^[A-Z][A-Za-z0-9]*$/);
    }
  });

  it('should have unique values', () => {
    const unique = new Set(systemValues);
    expect(unique.size).toBe(systemValues.length);
  });

  it('should have unique keys', () => {
    const unique = new Set(systemKeys);
    expect(unique.size).toBe(systemKeys.length);
  });

  it('should contain known systems', () => {
    expect(System.Arcade).toBe('Arcade');
    expect(System.NintendoN64).toBe('Nintendo N64');
    expect(System.SonyPlayStation).toBe('Sony PlayStation');
  });
});

describe('assign mapping', () => {
  const assignEntries = Object.entries(assign);
  const systemValues = new Set(Object.values(System));

  it('should have at least one entry', () => {
    expect(assignEntries.length).toBeGreaterThan(0);
  });

  it('should have lowercase keys', () => {
    for (const [key] of assignEntries) {
      expect(key).toBe(key.toLocaleLowerCase());
    }
  });

  it('should map every value to a valid System enum member', () => {
    for (const [key, value] of assignEntries) {
      expect(systemValues.has(value), `assign["${key}"] = "${value}" is not a valid System`).toBe(
        true
      );
    }
  });

  it('should contain known rom folder mappings', () => {
    expect(assign['n64']).toBe(System.NintendoN64);
    expect(assign['snes']).toBe(System.NintendoSNESSFC);
    expect(assign['psx']).toBe(System.SonyPlayStation);
    expect(assign['arcade']).toBe(System.Arcade);
  });
});

describe('version', () => {
  it('should be a non-empty string', () => {
    expect(typeof version).toBe('string');
    expect(version.length).toBeGreaterThan(0);
  });

  it('should not contain newlines or carriage returns', () => {
    expect(version).not.toMatch(/[\n\r]/);
  });
});
