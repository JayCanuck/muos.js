import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const PACKAGE_JSON = resolve(import.meta.dirname!, '..', 'package.json');

/**
 * Increments the patch component of a semver version string.
 * E.g. "1.0.2" → "1.0.3", "2.3.9" → "2.3.10"
 */
export function bumpPatch(version: string): string {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(.*)$/);
  if (!match) {
    throw new Error(`Invalid semver version: "${version}"`);
  }
  const [, major, minor, patch, prerelease] = match;
  if (prerelease) {
    throw new Error(`Cannot bump patch on prerelease version: "${version}"`);
  }
  return `${major}.${minor}.${Number(patch) + 1}`;
}

function main(): void {
  const raw = readFileSync(PACKAGE_JSON, { encoding: 'utf8' });
  const pkg = JSON.parse(raw);

  const oldVersion: string = pkg.version;
  const newVersion = bumpPatch(oldVersion);

  pkg.version = newVersion;

  writeFileSync(PACKAGE_JSON, JSON.stringify(pkg, null, 2) + '\n', { encoding: 'utf8' });
  console.log(`Bumped version: ${oldVersion} → ${newVersion}`);
}

// Only run when executed directly (not when imported by tests)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
