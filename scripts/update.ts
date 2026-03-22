import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ─── Configuration ──────────────────────────────────────────────────────────────
// Adjust these values to change the upstream muOS source repositories and paths.
// Both URLs must point to GitHub repositories (REST API is used for fetching).
const CONFIG = {
  /** Extra repo — system definitions + assign .ini files. Override: MUOS_EXTRA_URL */
  extraUrl: process.env.MUOS_EXTRA_URL ?? 'https://github.com/MustardOS/extra',
  /** Branch for extra repo. Override: MUOS_EXTRA_BRANCH */
  extraBranch: process.env.MUOS_EXTRA_BRANCH ?? 'main',
  /** Internal repo — version string. Override: MUOS_REPO_URL */
  internalUrl: process.env.MUOS_REPO_URL ?? 'https://github.com/MustardOS/internal',
  /** Branch for internal repo. Override: MUOS_BRANCH */
  internalBranch: process.env.MUOS_BRANCH ?? 'main',
  /** Paths within the repos (relative to root) */
  paths: {
    /** Prefix for system definition directories in the extra repo */
    systemBase: 'system/base',
    /** Path to the version file in the internal repo */
    version: 'config/system/version'
  },
  /** Output data file path */
  dataFile: resolve(import.meta.dirname!, '..', 'src', 'data.ts')
} as const;

/** Pattern for system assign .ini files in the extra repo tree */
const INI_PATH_RE = /^system\/base\/(.+?)\/assign\/.+\/.+\.ini$/;

// ─── GitHub Fetching ────────────────────────────────────────────────────────────

/**
 * Extracts the GitHub owner and repo name from a GitHub URL.
 * Supports formats: https://github.com/owner/repo[.git]
 */
export function parseGitHubUrl(url: string): { owner: string; repo: string } {
  const match = url.match(/github\.com[/:]([^/]+)\/([^/.]+)/);
  if (!match) {
    throw new Error(`Cannot parse GitHub owner/repo from URL: "${url}"`);
  }
  return { owner: match[1], repo: match[2] };
}

/**
 * Builds standard request headers for GitHub API calls.
 * Uses GITHUB_TOKEN if available for higher rate limits in CI.
 */
function apiHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'muos-updater',
    'X-GitHub-Api-Version': '2022-11-28'
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

/**
 * Fetches the full recursive Git tree for a repository.
 * Returns an array of tree entries with path and type.
 */
async function fetchGitTree(owner: string, repo: string, branch: string) {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  const res = await fetch(url, { headers: apiHeaders() });
  if (!res.ok) {
    throw new Error(`Failed to fetch tree ${url}: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as { tree: { path: string; type: string }[]; truncated: boolean };
  if (data.truncated) {
    console.warn('Warning: Git tree response was truncated. Some files may be missing.');
  }
  return data.tree;
}

/**
 * Fetches a raw file from GitHub via raw.githubusercontent.com.
 */
async function fetchRawFile(owner: string, repo: string, branch: string, path: string) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

// ─── Data Generation ────────────────────────────────────────────────────────────

/**
 * Converts a system display name (e.g. "Atari 2600") to a PascalCase enum key
 * (e.g. "Atari2600") by splitting on whitespace/hyphens and capitalizing each token.
 */
export function toEnumKey(system: string): string {
  return system
    .split(/[\s-]+/)
    .map(token => token.charAt(0).toLocaleUpperCase() + token.slice(1))
    .join('');
}

/**
 * Extracts unique, sorted system names from Git tree paths.
 * Matches paths like `system/base/{SystemName}/assign/{SystemName}/*.ini`.
 */
export function readSystems(treePaths: string[]): string[] {
  const systems = [
    ...new Set(treePaths.map(p => INI_PATH_RE.exec(p)?.[1]).filter((s): s is string => s != null))
  ].sort((a, b) => a.localeCompare(b));

  if (systems.length === 0) {
    throw new Error('No systems found. Possible muOS directory format change.');
  }

  return systems;
}

/**
 * Parses the `[friendly]` section from an `.ini` file, returning folder name aliases.
 * Lines are whitespace-stripped (matching `assign.sh` behaviour: `tr -d '[:space:]'`).
 */
export function parseFriendly(content: string): string[] {
  const lines = content.split(/\r?\n/);
  const aliases: string[] = [];
  let inFriendly = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '[friendly]') {
      inFriendly = true;
      continue;
    }
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      inFriendly = false;
      continue;
    }
    if (inFriendly && trimmed.length > 0) {
      // assign.sh strips all whitespace: tr -d '[:space:]'
      aliases.push(trimmed.replace(/\s+/g, ''));
    }
  }
  return aliases;
}

/**
 * Builds `[folderName, enumKey]` tuples from parsed `.ini` data.
 * Each entry maps a folder alias to the System enum key for its parent system.
 * First occurrence wins when the same alias appears in multiple systems.
 */
export function resolveAssignments(
  iniData: { system: string; aliases: string[] }[],
  systems: string[],
  enumKeys: string[]
): [string, string][] {
  const entries: [string, string][] = [];
  const seen = new Set<string>();

  for (const { system, aliases } of iniData) {
    const index = systems.indexOf(system);
    if (index < 0) continue;

    for (const alias of aliases) {
      if (!seen.has(alias)) {
        seen.add(alias);
        entries.push([alias, enumKeys[index]]);
      }
    }
  }
  return entries;
}

/**
 * Extracts the muOS version string from version.txt content (first non-empty line).
 */
export function readVersion(content: string): string {
  const version = content
    .split(/[\n\r]+/)
    .map(line => line.trim())
    .find(line => line.length > 0);

  if (!version) {
    throw new Error('version.txt is empty or unreadable.');
  }
  return version;
}

/**
 * Generates the contents of `src/data.ts` from the discovered systems,
 * assign mappings, and version string.
 */
export function generateDataFile(
  systems: string[],
  enumKeys: string[],
  assignments: [string, string][],
  version: string
): string {
  let result = '// Auto-generated by scripts/update.ts — do not edit manually\n\n';

  // System enum
  result += 'export enum System {\n';
  systems.forEach((system, i) => {
    const comma = i < systems.length - 1 ? ',' : '';
    result += `  ${enumKeys[i]} = '${system}'${comma}\n`;
  });
  result += '}\n\n';

  // Assign mapping
  result += 'export const assign: Record<string, System> = {\n';
  assignments.forEach(([name, enumKey], i) => {
    const comma = i < assignments.length - 1 ? ',' : '';
    result += `  '${name}': System.${enumKey}${comma}\n`;
  });
  result += '};\n\n';

  // Version
  result += `export const version = '${version}';\n`;

  return result;
}

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const { extraUrl, extraBranch, internalUrl, internalBranch, paths, dataFile } = CONFIG;
  const extra = parseGitHubUrl(extraUrl);
  const internal = parseGitHubUrl(internalUrl);

  console.log(`Fetching Git tree from ${extra.owner}/${extra.repo}@${extraBranch}...`);

  // Fetch tree + version in parallel
  const [tree, versionContent] = await Promise.all([
    fetchGitTree(extra.owner, extra.repo, extraBranch),
    fetchRawFile(internal.owner, internal.repo, internalBranch, paths.version)
  ]);

  // Find all .ini paths under system/base/*/assign/*/*.ini
  const iniEntries = tree
    .filter(e => e.type === 'blob' && INI_PATH_RE.test(e.path))
    .map(e => ({ path: e.path, system: INI_PATH_RE.exec(e.path)![1] }));

  if (iniEntries.length === 0) {
    console.log('No system .ini files found — no upstream changes to apply.');
    return;
  }

  console.log(`Found ${iniEntries.length} .ini files. Fetching contents...`);

  // Fetch all .ini file contents in parallel
  const iniContents = await Promise.all(
    iniEntries.map(async e => ({
      system: e.system,
      content: await fetchRawFile(extra.owner, extra.repo, extraBranch, e.path)
    }))
  );

  // Parse [friendly] sections
  const iniData = iniContents.map(({ system, content }) => ({
    system,
    aliases: parseFriendly(content)
  }));

  console.log('Reading systems...');
  const allPaths = tree.map(e => e.path);
  const systems = readSystems(allPaths);
  const enumKeys = systems.map(toEnumKey);
  console.log(`Found ${systems.length} systems.`);

  console.log('Resolving assign mappings...');
  const assignments = resolveAssignments(iniData, systems, enumKeys);
  console.log(`Resolved ${assignments.length} folder aliases.`);

  console.log('Reading version...');
  const version = readVersion(versionContent);
  console.log(`muOS version: ${version}`);

  console.log('Generating src/data.ts...');
  const content = generateDataFile(systems, enumKeys, assignments, version);
  writeFileSync(dataFile, content, { encoding: 'utf8' });
  console.log('src/data.ts written successfully.');

  console.log('Update complete.');
}

// Only run when executed directly (not when imported by tests)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
