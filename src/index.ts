import fs from 'node:fs/promises';
import { System, assign, version } from './data';

/** Internal lookup table mapping system display names to System enum values. */
const systemLookup = Object.values(System).reduce(
  (acc, sys) => Object.assign(acc, { [sys]: sys }),
  {} as Record<string, System>
);

/**
 * Returns a copy of the default assign.json mapping of common ROM folder names
 * to their respective {@link System} enum values. The mapping is equivalent
 * to the output of muOS's
 * [`assign.sh`](https://github.com/MustardOS/internal/blob/main/script/system/assign.sh),
 * which parses `[friendly]` sections from `.ini` files in
 * [`MustardOS/extra`](https://github.com/MustardOS/extra/tree/main/system/base).
 *
 * @returns A new `Record<string, System>` object (safe to mutate).
 */
export const defaultAssign = (): Record<string, System> => ({ ...assign });

/**
 * Reads a JSON file in muOS assign.json format (folder name → system name)
 * and resolves each entry to its {@link System} enum value.
 *
 * Supports the format produced by muOS's
 * [`assign.sh`](https://github.com/MustardOS/internal/blob/main/script/system/assign.sh)
 * where values are system display names (e.g. `"Arcade"`, `"Nintendo N64"`).
 *
 * @param file - Filepath to the JSON file to read.
 * @returns A promise resolving to a `Record<string, System>` mapping.
 */
export const readAssignJSON = async (file: string) => {
  const data: Record<string, string> = JSON.parse(await fs.readFile(file, { encoding: 'utf8' }));

  return Object.entries(data).reduce(
    (acc, [key, value]) => Object.assign(acc, { [key]: systemLookup[value] }),
    {} as Record<string, System>
  );
};

/**
 * Writes a mapping of ROM folder names to {@link System} values as a JSON
 * file in the muOS assign.json format (folder name → system name).
 *
 * The output format matches what muOS's
 * [`assign.sh`](https://github.com/MustardOS/internal/blob/main/script/system/assign.sh)
 * produces: `{"n64": "Nintendo N64", "arcade": "Arcade"}`.
 *
 * @param file - Filepath where the JSON file will be written.
 * @param data - Mapping of ROM folder names to System values.
 * @returns A promise that resolves when the file has been written.
 */
export const writeAssignJSON = async (file: string, data: Record<string, System>) => {
  const value = Object.entries(data).reduce(
    (acc, [key, value]) => Object.assign(acc, { [key]: value as string }),
    {} as Record<string, string>
  );

  return fs.writeFile(file, JSON.stringify(value, null, '    '), { encoding: 'utf-8' });
};

/**
 * Enum of all currently supported muOS systems.
 * Each entry is keyed by a PascalCase name and valued by its display name.
 * System definitions are sourced from `.ini` files in
 * [`MustardOS/extra`](https://github.com/MustardOS/extra/tree/main/system/base).
 */
export { System } from './data';

/**
 * The muOS version string this library was generated from.
 * @see https://github.com/MustardOS/internal/blob/main/config/system/version
 */
export { version } from './data';

export default {
  defaultAssign,
  readAssignJSON,
  writeAssignJSON,
  System,
  version
};
