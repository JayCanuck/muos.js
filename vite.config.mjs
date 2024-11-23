import builtins from 'node:module';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// List of supported built-in node module import paths
// Supports both plain names and node: prefixed. Eg/ 'fs' and 'node:fs'
const nodeModules = builtins.builtinModules.concat(builtins.builtinModules.map(m => `node:${m}`));

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts', // Replace with the entry file for your library
      name: 'muos', // Global variable name for build
      fileName: () => 'muos.js', // Output file name
      formats: ['cjs'] // CommonJS format for Node.js compatibility
    },
    rollupOptions: {
      external: nodeModules, // Externalize Node.js built-ins
      output: {
        exports: 'named'
      }
    },
    minify: false // Disable minification
  },
  plugins: [
    dts({
      rollupTypes: true // Generate `index.d.ts` for type definitions
    })
  ]
});
