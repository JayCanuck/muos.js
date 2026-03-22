import builtins from 'node:module';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// List of supported built-in node module import paths
// Supports both plain names and node: prefixed. Eg/ 'fs' and 'node:fs'
const nodeModules = builtins.builtinModules.concat(builtins.builtinModules.map(m => `node:${m}`));

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'muos',
      fileName: format => (format === 'es' ? 'muos.js' : 'muos.cjs'),
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: nodeModules,
      output: {
        exports: 'named'
      }
    },
    minify: false
  },
  plugins: [
    dts({
      rollupTypes: true
    })
  ],
  test: {
    globals: true,
    include: ['tests/**/*.test.ts']
  }
});
