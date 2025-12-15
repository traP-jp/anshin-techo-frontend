import { defineConfig } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import js from '@eslint/js'

export default defineConfig([
  { ignores: ['dist'] },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...pluginVue.configs['flat/recommended'],

  {
    files: ['**/*.{ts,vue}'],
    rules: { 'no-undef': 'off' }, // 型チェックは TSC に任せる
  },

  {
    files: ['**/*.vue'],
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
    rules: {
      'vue/component-name-in-template-casing': ['warn', 'kebab-case'],
      'vue/no-template-target-blank': ['error', { enforceDynamicLinks: 'always' }],
      'vue/no-v-html': 'error',
    },
  },

  eslintConfigPrettier, // 常に最後に置く
])
