# muos.js

[![NPM](https://img.shields.io/npm/v/muos.svg?logo=npm)](https://www.npmjs.com/package/muos)
[![CI](https://github.com/jaycanuck/muos.js/actions/workflows/ci.yml/badge.svg)](https://github.com/jaycanuck/muos.js/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/jaycanuck/muos.js)](./LICENSE)

> JavaScript/TypeScript definitions and helper functions for [muOS](https://muos.dev/).

## Installation

```bash
npm install muos
```

Works with both ESM and CommonJS:

```ts
// ESM
import { System, defaultAssign, version } from 'muos';

// CommonJS
const { System, defaultAssign, version } = require('muos');
```

## API

### `System`

An enum of all currently supported systems in muOS. Each entry is keyed by a PascalCase name and valued by its display name (e.g. `'Nintendo N64'`). System definitions are sourced from `.ini` files in [`MustardOS/extra`](https://github.com/MustardOS/extra/tree/main/system/base).

```ts
import { System } from 'muos';

// All known systems are indexed and available
//   System.Amstrad = 'Amstrad'
//   System.Arcade = 'Arcade'
//   System.NintendoN64 = 'Nintendo N64'
//   ...

// Derive catalogue paths from enum values
const n64BoxArt = `MUOS/info/catalogue/${System.NintendoN64}/box`;

// Get an array of all systems
const allSystems = Object.values(System);
```

### `defaultAssign()`

Returns a copy of the default mapping of common ROM folder names to their respective `System` enum value. The mapping is equivalent to the output of muOS's [`assign.sh`](https://github.com/MustardOS/internal/blob/main/script/system/assign.sh), which parses `[friendly]` sections from `.ini` files in [`MustardOS/extra`](https://github.com/MustardOS/extra/tree/main/system/base).

- **Returns:** `Record<string, System>`

```ts
import { defaultAssign } from 'muos';

const mapping = defaultAssign();
console.log(mapping['n64']); // System.NintendoN64
```

### `readAssignJSON(file)`

Reads a JSON file in the muOS assign format (folder name → system name) and resolves each entry to its `System` enum value. Supports the format produced by muOS's [`assign.sh`](https://github.com/MustardOS/internal/blob/main/script/system/assign.sh).

- **Parameters:**
  - `file: string` — Path to the JSON file
- **Returns:** `Promise<Record<string, System>>`

```ts
import { readAssignJSON } from 'muos';

const mapping = await readAssignJSON('/path/to/assign.json');
```

### `writeAssignJSON(file, data)`

Writes a `Record<string, System>` mapping to a JSON file in the muOS assign format (folder name → system name). The output format matches what muOS's [`assign.sh`](https://github.com/MustardOS/internal/blob/main/script/system/assign.sh) produces.

- **Parameters:**
  - `file: string` — Path where the JSON file will be written
  - `data: Record<string, System>` — Mapping of folder names to System values
- **Returns:** `Promise<void>`

```ts
import { System, writeAssignJSON } from 'muos';

await writeAssignJSON('/path/to/assign.json', {
  n64: System.NintendoN64,
  snes: System.NintendoSNESSFC
});
```

### `version`

The [muOS version string](https://github.com/MustardOS/internal/blob/main/config/system/version) this library was generated from.

```ts
import { version } from 'muos';

console.log(version); // e.g. "2410.2_BIG_BANANA"
```

## Update Frequency

A GitHub Actions workflow runs weekly to check for upstream changes in the [MustardOS/extra](https://github.com/MustardOS/extra) and [MustardOS/internal](https://github.com/MustardOS/internal) repositories. It uses the GitHub REST API (Git Trees API + raw file fetches) to fetch only the required data — no git clone needed.

When changes to system definitions or assign mappings are detected, the library is automatically updated, the patch version is bumped, and a new release is published to npm.

The `version` export can be used to determine which muOS release this library was generated from.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Lint
npm run lint

# Build (outputs ESM + CJS to dist/)
npm run build

# Fetch latest muOS data and regenerate src/data.ts
npm run update

# Bump the patch version
npm run bump
```

### Project Structure

```
src/           — Library source (TypeScript)
  index.ts     — Public API exports
  data.ts      — Auto-generated system enum, assign map, and version
scripts/       — Dev tooling (TypeScript, not included in npm package)
  update.ts    — Fetches upstream muOS data via GitHub REST API
  bump.ts      — Bumps package.json patch version
tests/         — Unit tests (vitest)
dist/          — Build output (ESM + CJS + types)
```

## License

Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

See [LICENSE](./LICENSE) for the full text.
