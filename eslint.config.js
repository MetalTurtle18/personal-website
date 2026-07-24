// eslint.config.js
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import prettier from 'eslint-config-prettier';
import { globalIgnores } from 'eslint/config';

export default [
  js.configs.recommended,

  // TypeScript & JS
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: { '@typescript-eslint': ts },
    rules: {
      ...ts.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-undef': 'off',
    },
  },

  // Astro
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
      },
    },
    plugins: { astro },
    rules: {
      ...astro.configs.recommended.rules,
      'astro/no-unused-css-selector': 'off',
    },
  },

  // Disable formatting conflicts
  prettier,
  // Global ignores
  globalIgnores(['.astro/*', 'dist/*']),
];
