import { describe, expect, it } from 'vitest';
import { defaultAssign } from '../src/index';
import {
  parseFriendly,
  readSystems,
  readVersion,
  resolveAssignments,
  toEnumKey
} from '../scripts/update';

const EXTRA_OWNER = 'MustardOS';
const EXTRA_REPO = 'extra';
const EXTRA_BRANCH = 'main';
const INTERNAL_OWNER = 'MustardOS';
const INTERNAL_REPO = 'internal';
const INTERNAL_BRANCH = 'main';

const INI_PATH_RE = /^system\/base\/(.+?)\/assign\/.+\/.+\.ini$/;

/** Fetches the recursive Git tree for a GitHub repo. */
async function fetchTree(owner: string, repo: string, branch: string) {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'muos-upstream-test',
    'X-GitHub-Api-Version': '2022-11-28'
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Tree fetch failed: ${res.status}`);
  return ((await res.json()) as { tree: { path: string; type: string }[] }).tree;
}

/** Fetches a raw file from GitHub. */
async function fetchRaw(owner: string, repo: string, branch: string, path: string) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Raw fetch failed: ${url} ${res.status}`);
  return res.text();
}

describe('upstream MustardOS repos', { timeout: 60_000 }, () => {
  describe('MustardOS/internal', () => {
    it('should serve a valid version.txt', async () => {
      const content = await fetchRaw(
        INTERNAL_OWNER,
        INTERNAL_REPO,
        INTERNAL_BRANCH,
        'config/system/version'
      );
      const version = readVersion(content);
      expect(version.length).toBeGreaterThan(0);
      expect(version).not.toMatch(/[\n\r]/);
    });

    it('should have assign.sh at the expected path', async () => {
      const content = await fetchRaw(
        INTERNAL_OWNER,
        INTERNAL_REPO,
        INTERNAL_BRANCH,
        'script/system/assign.sh'
      );
      expect(content).toContain('[friendly]');
      expect(content).toContain('DIR_NAME');
    });
  });

  describe('MustardOS/extra', () => {
    let tree: { path: string; type: string }[];
    let iniPaths: string[];

    // Fetch tree once for all tests in this block
    it('should return a valid Git tree', async () => {
      tree = await fetchTree(EXTRA_OWNER, EXTRA_REPO, EXTRA_BRANCH);
      expect(tree.length).toBeGreaterThan(0);
    });

    it('should contain system/base/ directories', () => {
      const baseDirs = tree.filter(
        e =>
          e.type === 'tree' && e.path.startsWith('system/base/') && e.path.split('/').length === 3
      );
      expect(baseDirs.length).toBeGreaterThan(0);
    });

    it('should contain .ini files matching the expected path pattern', () => {
      iniPaths = tree.filter(e => e.type === 'blob' && INI_PATH_RE.test(e.path)).map(e => e.path);
      expect(iniPaths.length).toBeGreaterThan(0);
    });

    it('should extract system names from .ini paths via readSystems', () => {
      const allPaths = tree.map(e => e.path);
      const systems = readSystems(allPaths);
      expect(systems.length).toBeGreaterThan(0);
      // Verify known systems exist
      expect(systems).toContain('Arcade');
      expect(systems).toContain('Nintendo N64');
      expect(systems).toContain('Sony PlayStation');
    });

    it('should serve .ini files with parseable [friendly] sections', async () => {
      // Spot-check the Arcade global.ini
      const content = await fetchRaw(
        EXTRA_OWNER,
        EXTRA_REPO,
        EXTRA_BRANCH,
        'system/base/Arcade/assign/Arcade/global.ini'
      );
      const aliases = parseFriendly(content);
      expect(aliases.length).toBeGreaterThan(0);
      expect(aliases).toContain('arcade');
    });
  });

  describe('assign.sh equivalence', () => {
    it('should produce the same mapping as defaultAssign()', async () => {
      // Replicate what assign.sh does: fetch tree, fetch all .ini files,
      // parse [friendly] sections, build folder→system mapping.
      const tree = await fetchTree(EXTRA_OWNER, EXTRA_REPO, EXTRA_BRANCH);

      const iniEntries = tree
        .filter(e => e.type === 'blob' && INI_PATH_RE.test(e.path))
        .map(e => ({ path: e.path, system: INI_PATH_RE.exec(e.path)![1] }));

      expect(iniEntries.length).toBeGreaterThan(0);

      // Fetch all .ini contents in parallel
      const iniContents = await Promise.all(
        iniEntries.map(async e => ({
          system: e.system,
          content: await fetchRaw(EXTRA_OWNER, EXTRA_REPO, EXTRA_BRANCH, e.path)
        }))
      );

      // Parse [friendly] sections
      const iniData = iniContents.map(({ system, content }) => ({
        system,
        aliases: parseFriendly(content)
      }));

      const allPaths = tree.map(e => e.path);
      const systems = readSystems(allPaths);
      const enumKeys = systems.map(toEnumKey);

      // Build the assign mapping the same way assign.sh would
      const assignments = resolveAssignments(iniData, systems, enumKeys);

      // Convert to a plain {folder: systemName} object for comparison
      const shResult: Record<string, string> = {};
      for (const [folder, enumKey] of assignments) {
        const systemIndex = enumKeys.indexOf(enumKey);
        shResult[folder] = systems[systemIndex];
      }

      // Get the library's defaultAssign and convert System values to strings
      const libResult: Record<string, string> = {};
      for (const [folder, system] of Object.entries(defaultAssign())) {
        libResult[folder] = system as string;
      }

      // Both should have identical entries
      expect(Object.keys(shResult).sort()).toEqual(Object.keys(libResult).sort());
      for (const key of Object.keys(shResult)) {
        expect(libResult[key], `Mismatch for folder "${key}"`).toBe(shResult[key]);
      }
    });
  });
});
