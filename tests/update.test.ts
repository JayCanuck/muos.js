import { describe, expect, it } from 'vitest';
import {
  generateDataFile,
  parseFriendly,
  parseGitHubUrl,
  readSystems,
  readVersion,
  resolveAssignments,
  toEnumKey
} from '../scripts/update';

describe('toEnumKey', () => {
  it('should convert simple names to PascalCase', () => {
    expect(toEnumKey('Arcade')).toBe('Arcade');
    expect(toEnumKey('DOS')).toBe('DOS');
  });

  it('should handle spaces', () => {
    expect(toEnumKey('Atari 2600')).toBe('Atari2600');
    expect(toEnumKey('Nintendo N64')).toBe('NintendoN64');
  });

  it('should handle hyphens', () => {
    expect(toEnumKey('Chip-8')).toBe('Chip8');
    expect(toEnumKey('Nintendo SNES-SFC')).toBe('NintendoSNESSFC');
  });

  it('should handle combined spaces and hyphens', () => {
    expect(toEnumKey('Atari ST-STE-TT-Falcon')).toBe('AtariSTSTETTFalcon');
    expect(toEnumKey('Sega Mega CD - Sega CD')).toBe('SegaMegaCDSegaCD');
  });

  it('should capitalize the first letter of each token', () => {
    expect(toEnumKey('cave story')).toBe('CaveStory');
  });
});

describe('parseGitHubUrl', () => {
  it('should parse HTTPS URLs', () => {
    expect(parseGitHubUrl('https://github.com/MustardOS/internal')).toEqual({
      owner: 'MustardOS',
      repo: 'internal'
    });
  });

  it('should parse HTTPS URLs with .git suffix', () => {
    expect(parseGitHubUrl('https://github.com/MustardOS/internal.git')).toEqual({
      owner: 'MustardOS',
      repo: 'internal'
    });
  });

  it('should parse SSH URLs', () => {
    expect(parseGitHubUrl('git@github.com:MustardOS/internal.git')).toEqual({
      owner: 'MustardOS',
      repo: 'internal'
    });
  });

  it('should throw on non-GitHub URLs', () => {
    expect(() => parseGitHubUrl('https://gitlab.com/foo/bar')).toThrow('Cannot parse');
  });
});

describe('readSystems', () => {
  it('should extract system names from tree paths', () => {
    const paths = [
      'system/base/Arcade/assign/Arcade/global.ini',
      'system/base/Nintendo N64/assign/Nintendo N64/global.ini',
      'system/base/Arcade/assign/Arcade/mame 2003.ini',
      'system/base/DOS/assign/DOS/global.ini',
      'README.md'
    ];
    const systems = readSystems(paths);
    expect(systems).toEqual(['Arcade', 'DOS', 'Nintendo N64']);
  });

  it('should deduplicate systems from multiple .ini files', () => {
    const paths = [
      'system/base/Arcade/assign/Arcade/global.ini',
      'system/base/Arcade/assign/Arcade/fbneo.ini',
      'system/base/Arcade/assign/Arcade/mame.ini'
    ];
    expect(readSystems(paths)).toEqual(['Arcade']);
  });

  it('should throw if no matching paths are found', () => {
    expect(() => readSystems(['README.md'])).toThrow('No systems found');
    expect(() => readSystems([])).toThrow('No systems found');
  });

  it('should ignore paths that do not match the expected pattern', () => {
    const paths = [
      'system/base/Arcade/config/retroarch.cfg',
      'system/base/Arcade/assign/Arcade/global.ini'
    ];
    expect(readSystems(paths)).toEqual(['Arcade']);
  });
});

describe('parseFriendly', () => {
  it('should parse [friendly] section entries', () => {
    const content = [
      '[global]',
      'name=Arcade',
      'default=finalburn neo',
      '',
      '[friendly]',
      'arcade',
      'cps',
      'varcade',
      ''
    ].join('\n');
    expect(parseFriendly(content)).toEqual(['arcade', 'cps', 'varcade']);
  });

  it('should stop at the next section header', () => {
    const content = ['[friendly]', 'arcade', '[launch]', 'exec=/bin/foo'].join('\n');
    expect(parseFriendly(content)).toEqual(['arcade']);
  });

  it('should strip whitespace from alias lines', () => {
    const content = ['[friendly]', '  arcade game  ', 'cps 2'].join('\n');
    expect(parseFriendly(content)).toEqual(['arcadegame', 'cps2']);
  });

  it('should return empty array when no [friendly] section exists', () => {
    const content = ['[global]', 'name=Arcade'].join('\n');
    expect(parseFriendly(content)).toEqual([]);
  });

  it('should skip empty lines within [friendly]', () => {
    const content = ['[friendly]', 'arcade', '', 'cps', ''].join('\n');
    expect(parseFriendly(content)).toEqual(['arcade', 'cps']);
  });

  it('should handle emulator-specific ini files', () => {
    const content = [
      '[finalburn neo]',
      'name=FinalBurn Neo',
      'core=fbneo_libretro.so',
      '',
      '[launch]',
      'exec=/opt/muos/script/launch/lr-general.sh',
      '',
      '[friendly]',
      'arcadefinalburnneo',
      'finalburnneo'
    ].join('\n');
    expect(parseFriendly(content)).toEqual(['arcadefinalburnneo', 'finalburnneo']);
  });
});

describe('resolveAssignments', () => {
  it('should map folder aliases to enum keys', () => {
    const iniData = [
      { system: 'Arcade', aliases: ['arcade', 'cps'] },
      { system: 'Nintendo N64', aliases: ['n64', 'N64'] }
    ];
    const systems = ['Arcade', 'Nintendo N64'];
    const enumKeys = systems.map(toEnumKey);

    const result = resolveAssignments(iniData, systems, enumKeys);
    expect(result).toEqual([
      ['arcade', 'Arcade'],
      ['cps', 'Arcade'],
      ['n64', 'NintendoN64'],
      ['N64', 'NintendoN64']
    ]);
  });

  it('should deduplicate — first occurrence wins', () => {
    const iniData = [
      { system: 'Arcade', aliases: ['arcade'] },
      { system: 'Arcade', aliases: ['arcade', 'cps'] }
    ];
    const systems = ['Arcade'];
    const enumKeys = ['Arcade'];

    const result = resolveAssignments(iniData, systems, enumKeys);
    expect(result).toEqual([
      ['arcade', 'Arcade'],
      ['cps', 'Arcade']
    ]);
  });

  it('should skip entries for unknown systems', () => {
    const iniData = [
      { system: 'Arcade', aliases: ['arcade'] },
      { system: 'Unknown', aliases: ['unknown'] }
    ];
    const systems = ['Arcade'];
    const enumKeys = ['Arcade'];

    const result = resolveAssignments(iniData, systems, enumKeys);
    expect(result).toEqual([['arcade', 'Arcade']]);
  });

  it('should return empty array when no iniData is provided', () => {
    expect(resolveAssignments([], ['Arcade'], ['Arcade'])).toEqual([]);
  });
});

describe('readVersion', () => {
  it('should read the first non-empty line', () => {
    expect(readVersion('2410.2_BIG_BANANA\n')).toBe('2410.2_BIG_BANANA');
  });

  it('should trim whitespace', () => {
    expect(readVersion('  2410.2_BIG_BANANA  \n\n')).toBe('2410.2_BIG_BANANA');
  });

  it('should skip empty lines', () => {
    expect(readVersion('\n\n2410.2_BIG_BANANA\n')).toBe('2410.2_BIG_BANANA');
  });

  it('should throw on empty content', () => {
    expect(() => readVersion('')).toThrow('empty or unreadable');
  });
});

describe('generateDataFile', () => {
  it('should generate valid TypeScript with enum, assign, and version', () => {
    const systems = ['Arcade', 'Nintendo N64'];
    const enumKeys = ['Arcade', 'NintendoN64'];
    const assignments: [string, string][] = [
      ['n64', 'NintendoN64'],
      ['arcade', 'Arcade']
    ];
    const version = '2410.2_BIG_BANANA';

    const result = generateDataFile(systems, enumKeys, assignments, version);

    // Should contain the auto-generated header
    expect(result).toContain('Auto-generated');

    // Should contain the enum
    expect(result).toContain('export enum System {');
    expect(result).toContain("Arcade = 'Arcade'");
    expect(result).toContain("NintendoN64 = 'Nintendo N64'");

    // Should contain the assign map
    expect(result).toContain('export const assign');
    expect(result).toContain("'n64': System.NintendoN64");
    expect(result).toContain("'arcade': System.Arcade");

    // Should contain the version
    expect(result).toContain("export const version = '2410.2_BIG_BANANA'");
  });

  it('should handle single system', () => {
    const result = generateDataFile(['Arcade'], ['Arcade'], [['arcade', 'Arcade']], '1.0');
    expect(result).toContain("Arcade = 'Arcade'");
    expect(result).toContain("export const version = '1.0'");
  });
});
