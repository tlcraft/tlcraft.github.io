import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import maxOutputsRule from './eslint/rules/max-outputs.mjs';

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores(['node_modules/**', '.next/**', 'out/**', 'old/**', 'coverage/**', 'next-env.d.ts']),
  {
    plugins: {
      local: {
        rules: {
          'max-outputs': maxOutputsRule,
        },
      },
    },
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    rules: {
      quotes: ['error', 'single'], // Requires single quotes for consistency.
      complexity: ['warn', 10], // Warns when a function has too many decision paths.
      'max-lines-per-function': ['warn', { max: 60, skipBlankLines: true, skipComments: true }], // Warns when a function gets too long.
      'max-depth': ['warn', 4], // Warns when nesting gets too deep.
      'max-params': ['warn', 4], // Warns when a function takes too many parameters.
      'local/max-outputs': ['warn', { max: 2 }], // Warns when a function has too many return statements.
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', 'src/testSetup.ts'],
    rules: {
      quotes: ['error', 'single'], // Requires single quotes for consistency.
      complexity: ['warn', 12], // Allows slightly more branching in tests.
      'max-lines-per-function': ['warn', { max: 120, skipBlankLines: true, skipComments: true }], // Allows longer test helpers and setups.
      'max-depth': ['warn', 5], // Allows a bit more nesting in test code.
      'max-params': 'off', // Test helpers may need extra parameters.
      'local/max-outputs': 'off', // Tests often use multiple early returns for readability.
    },
  },
])
 
export default eslintConfig;
