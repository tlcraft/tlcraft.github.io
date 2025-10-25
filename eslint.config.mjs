import { defineConfig, globalIgnores } from 'eslint/config'
import nextPlugin from '@next/eslint-plugin-next'

const eslintConfig = defineConfig([
  nextPlugin.configs['core-web-vitals'],
  globalIgnores(['node_modules/**', '.next/**', 'out/**', 'old/**', 'coverage/**', 'next-env.d.ts']),
  { 
    'rules': {
        'quotes': ['error', 'single']
    }
  }
]);
 
export default eslintConfig;
