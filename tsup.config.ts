import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: true,
  external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion'],
  sourcemap: true,
  banner: {
    js: '"use client";',
  },
});
