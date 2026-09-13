import { defineConfig, configDefaults, coverageConfigDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [react()],
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
