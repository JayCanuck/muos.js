import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { System, defaultAssign, readAssignJSON, version, writeAssignJSON } from '../src/index';

describe('defaultAssign', () => {
  it('should return a plain object', () => {
    const result = defaultAssign();
    expect(typeof result).toBe('object');
    expect(result).not.toBeNull();
  });

  it('should return a copy each time (not the same reference)', () => {
    const a = defaultAssign();
    const b = defaultAssign();
    expect(a).toEqual(b);
    expect(a).not.toBe(b);
  });

  it('should map every value to a valid System member', () => {
    const systems = new Set(Object.values(System));
    const result = defaultAssign();
    for (const [key, value] of Object.entries(result)) {
      expect(systems.has(value), `defaultAssign()["${key}"] is not a valid System`).toBe(true);
    }
  });
});

describe('readAssignJSON / writeAssignJSON roundtrip', () => {
  it('should write and read back the same data', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'muos-test-'));
    const file = join(dir, 'assign.json');

    try {
      const data: Record<string, System> = {
        'n64': System.NintendoN64,
        'snes': System.NintendoSNESSFC,
        'psx': System.SonyPlayStation
      };

      await writeAssignJSON(file, data);
      const result = await readAssignJSON(file);

      expect(result).toEqual(data);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it('should handle an empty mapping', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'muos-test-'));
    const file = join(dir, 'assign.json');

    try {
      await writeAssignJSON(file, {});
      const result = await readAssignJSON(file);
      expect(result).toEqual({});
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it('should read a raw assign.json with system name values', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'muos-test-'));
    const file = join(dir, 'assign.json');

    try {
      // Simulate the format muOS assign.sh produces (folder → system name)
      const raw = {
        'n64': 'Nintendo N64',
        'snes': 'Nintendo SNES - SFC'
      };
      await writeFile(file, JSON.stringify(raw), { encoding: 'utf-8' });

      const result = await readAssignJSON(file);
      expect(result['n64']).toBe(System.NintendoN64);
      expect(result['snes']).toBe(System.NintendoSNESSFC);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe('version export', () => {
  it('should be a non-empty string', () => {
    expect(typeof version).toBe('string');
    expect(version.length).toBeGreaterThan(0);
  });
});

describe('System re-export', () => {
  it('should re-export System enum from index', () => {
    expect(System).toBeDefined();
    expect(System.Arcade).toBe('Arcade');
  });
});
