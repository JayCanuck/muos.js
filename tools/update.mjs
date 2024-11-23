import fs from 'node:fs';
import path from 'node:path';

const muOSRepo = path.join(import.meta.dirname, '../internal');
const assignJSON = path.join(muOSRepo, 'init/MUOS/info/assign.json');
const assignDir = path.join(muOSRepo, 'init/MUOS/info/assign');
const versionTXT = path.join(muOSRepo, 'config/version.txt');
const dataFile = path.join(import.meta.dirname, '../src/data.ts');

try {
  const systemsSupported = fs
    .readdirSync(assignDir)
    .filter(
      e => fs.statSync(path.join(assignDir, e)).isFile() && e.toLocaleLowerCase().endsWith('ini')
    )
    .map(f => f.replace(/\.ini$/i, ''));

  if (systemsSupported.length === 0)
    throw Error('No systems found. Possible muOS directory format change.');

  // Generate System enum
  const enumKeys = systemsSupported.map(system =>
    system
      .split(/[\s-]+/)
      .map(token => token.charAt(0).toLocaleUpperCase() + token.slice(1))
      .join('')
  );
  let result = 'export enum System {\n';
  systemsSupported.forEach((system, i) => {
    result += `  ${enumKeys[i]} = '${system}'${i < systemsSupported.length - 1 ? ',' : ''}\n`;
  });
  result += '}\n\n';

  // Generate assign JSON-to-enum mapping
  const assign = JSON.parse(fs.readFileSync(assignJSON, { encoding: 'utf8' }));
  result += 'export const assign = {\n';
  Object.keys(assign).forEach((name, i, arr) => {
    const index = systemsSupported.findIndex(
      system => system.toLocaleLowerCase() === assign[name].replace(/\.ini$/, '')
    );
    if (index >= 0) {
      result += `  '${name}': System.${enumKeys[index]}${i < arr.length - 1 ? ',' : ''}\n`;
    }
  });
  result += '};\n\n';

  // Retreive muOS version value
  const version = fs
    .readFileSync(versionTXT, { encoding: 'utf8' })
    .split(/[\n\r]+/)[0]
    .trim();
  result += `export const version = '${version}';\n`;

  fs.writeFileSync(dataFile, result, { encoding: 'utf8' });
  console.log('./src/data.ts written');
} catch (err) {
  console.error('ERROR:', err.message);
  console.error(err);
  process.exit(1);
}
