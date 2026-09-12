import { defineConfig, configDefaults, coverageConfigDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: "./src/testSetup",
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      ...configDefaults.exclude,
      '**/old/**',
      '**/out/**',
      '**/coverage/**',
      '**/*.config.*',
      '**/testSetup.ts'
    ],
    coverage: {
      reporter: ['lcov', 'text'],
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/old/**',
        '**/out/**',
        '**/coverage/**',
        '**/*.config.*',
        '**/testSetup.ts'
      ]
    }
  },
});
