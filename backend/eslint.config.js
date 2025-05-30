import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },

  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        console: 'readonly',
      },
    },
  },

  tseslint.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    rules: {
      'array-callback-return': ['error', { checkForEach: true }],
      'no-await-in-loop': ['warn'],
      'no-self-compare': ['warn'],
      'no-console': ['warn'],
      'require-await': ['warn'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },

  eslintConfigPrettier,
]);
