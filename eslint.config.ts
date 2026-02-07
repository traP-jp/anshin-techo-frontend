import { defineConfig, globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import js from '@eslint/js'

export default defineConfig([
  globalIgnores(['dist']),

  {
    files: ['src/**/*.{ts,vue}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked, // TypeScript 用のベース設定
    ],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
      },
    },
  },

  {
    files: ['src/**/*.vue'],
    extends: [pluginVue.configs['flat/recommended']],
    rules: {
      'vue/component-name-in-template-casing': ['warn', 'kebab-case'],
      'vue/no-template-target-blank': ['error', { enforceDynamicLinks: 'always' }],
      'vue/no-v-html': 'error',
    },
  },
  {
    files: ['src/**/*.{ts,vue}'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      'no-undef': 'off',
    },
  },

  eslintConfigPrettier,
])
