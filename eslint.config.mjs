import pluginJs from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
    { rules: { 'no-unused-vars': 'error', 'no-undef': 'error' } },
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { plugins: { prettier }, rules: { 'prettier/prettier': 'error' } },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended
]
