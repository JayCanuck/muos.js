import fs from 'node:fs/promises';
import { System, assign, version } from './data';

export const defaultAssign = (): Record<string, System> => ({ ...assign });

const iniLookup = Object.values(System).reduce(
  (acc, sys) => Object.assign(acc, { [sys.toLocaleLowerCase() + '.ini']: sys }),
  {} as Record<string, System>
);

export const readAssignJSON = async (file: string) => {
  const data: Record<string, string> = JSON.parse(await fs.readFile(file, { encoding: 'utf8' }));

  return Object.entries(data).reduce(
    (acc, [key, value]) => Object.assign(acc, { [key]: iniLookup[value] }),
    {} as Record<string, System>
  );
};

export const writeAssignJSON = async (file: string, data: Record<string, System>) => {
  const value = Object.entries(data).reduce(
    (acc, [key, value]) => Object.assign(acc, { [key]: value.toLocaleLowerCase() + '.ini' }),
    {} as Record<string, string>
  );

  return fs.writeFile(file, JSON.stringify(value, null, '    '), { encoding: 'utf-8' });
};

export { System, version } from './data';

export default {
  defaultAssign,
  writeAssignJSON,
  System,
  version
};
