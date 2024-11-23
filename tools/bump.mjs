import fs from 'node:fs';
import path from 'node:path';
import semver from 'semver';

const packageJSON = path.join(import.meta.dirname, '../package.json');

try {
  const pkg = JSON.parse(fs.readFileSync(packageJSON, { encoding: 'utf8' }));

  pkg.version = semver.inc(pkg.version, 'patch');

  fs.writeFileSync(packageJSON, JSON.stringify(pkg, null, '  '), { encoding: 'utf8' });
  console.log('./package.json written');
} catch (err) {
  console.error('ERROR:', err.message);
  console.error(err);
  process.exit(1);
}
