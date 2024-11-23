# muos.js [![NPM](https://img.shields.io/npm/v/muos.svg?logo=npm)](https://www.npmjs.com/package/muos)
> Javascript/Typescript definitions and helper functions for [muOS](https://muos.dev/). 

### Installation
Install like any other NPM library:
```
npm install --save muos
```

### APIs
The following APIs are available from this `muos` javascript library:

##### `System`
An enum of all currently available systems supported by muOS. Each enum entry corresponds to its INI filename as well as the catalogue directories.
```
import { System } from 'muos';

/*
  All known system are indexed and avilable for usage.
    System.Amstrad = 'Amstrad',
    System.Arcade = 'Arcade',
    System.Arduboy = 'Arduboy',
    System.Atari2600 = 'Atari 2600',
    System.Atari5200 = 'Atari 5200',
    System.Atari7800 = 'Atari 7800',
    ...
*/

// Can use the enum values to derive catalogue paths
const n64BoxArtPath = `MUOS/info/catalogue/${System.NintendoN64}/box`

// Can use Object.values() to obtain an array of all systems
const allSystems = Object.values(System);
```

##### `defaultAssign`
Get the default assign mapping of common ROM folder names to their respective supported system. Sourced from muOS's [assign.json](https://github.com/MustardOS/internal/blob/main/init/MUOS/info/assign.json) file and resolved to the known System enum values.

Parameters:
* None

Returns:
* `Record<string, System>` - JSON mapping object

##### `readAssignJSON`
As an alternative to the default [assign.json](https://github.com/MustardOS/internal/blob/main/init/MUOS/info/assign.json) values, this API allows you to parse your own JSON file . This function will read a file and resolve System enum values from the ini file values found.

Parameters:
* `file: string` - Filepath where to read the JSON file

Returns:
* `Promise<Record<string, System>>` - Promise which is resolved or rejected on reading and parsing the JSON file, translating the ini file values into System enum values

##### `writeAssignJSON`
Takes a JSON object mapping of ROM folder names to their respective System values and writes an [assign.json](https://github.com/MustardOS/internal/blob/main/init/MUOS/info/assign.json) file of the corresponding INI files.

Parameters:
* `file: string` - Filepath where to write the JSON file
* `data: Record<string, System>` - Data mapping of ROM folder names to their respective System values

Returns:
* `Promise<void>` - Promise which is resolved or rejected on writing the JSON file

##### `version`
The [muOS version value](https://github.com/MustardOS/internal/blob/main/config/version.txt) string that this library was sourced from.

Example:
```
import { version } from 'muos';

console.log(version); // "2410.2_BIG_BANANA"
```

### Update Frequency
This repository is setup with  [muOS internal](https://github.com/MustardOS/internal/tree/main) as a submodule to generate it's data from.  It is setup to automatically update the submodule and reflect any changes detected upstream. When data changes are detect (for example, a new added system), the library is updated and an update is published to NPM as an incremental patch release.  The `version` value export can be used to validate which version of muOS this library is generated from.

### License
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
