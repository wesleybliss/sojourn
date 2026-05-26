import { createRequire } from 'node:module'

import eslintJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
// import oxlint from 'eslint-plugin-oxlint'
import reactPlugin from 'eslint-plugin-react'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const require = createRequire(import.meta.url)
const indentEmptyLinesPlugin = require('eslint-plugin-indent-empty-lines').default

// @todo investigate these
// https://github.com/dustinspecker/awesome-eslint
// https://github.com/github/eslint-plugin-github
// https://github.com/sindresorhus/eslint-plugin-unicorn
// https://github.com/francoismassart/eslint-plugin-tailwindcss

// Turn this on while developing for extra hints, but
// disable before committing, since it generates tons of warnings
const strictMode = false

const sharedGlobals = {
    ...globals.browser,
    ...globals.jest,
    process: 'readonly',
    Logger: 'readonly',
}

const reactSettings = {
    react: {
        version: 'detect',
    },
}

const basePlugins = {
    react: reactPlugin,
    'react-compiler': reactCompiler,
    'react-hooks': reactHooksPlugin,
    'indent-empty-lines': indentEmptyLinesPlugin,
    'simple-import-sort': simpleImportSort,
}

/** @type {import('eslint').Linter.Config['rules']} */
const baseRules = {
    ...eslintJs.configs.recommended.rules,
    'react-compiler/react-compiler': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 'off',
    // exhaustive-deps configured separately after the hooks preset, so it can
    // be overridden without fighting plugin registration order
    'react/jsx-no-literals': 'off',
    'react/jsx-closing-bracket-location': ['error', 'after-props'],
    'no-restricted-globals': 'off',
    'no-restricted-syntax': [
        'error',
        {
            selector:
                'JSXAttribute[ name.name="className" ] > JSXExpressionContainer' +
                '> TemplateLiteral > TemplateElement[source.raw*="z-"]',
            message: 'Avoid using Tailwind z-index classes in JSX.',
        },
        {
            selector:
                'JSXAttribute[ name.name="style" ] > JSXExpressionContainer' +
                '> ObjectExpression > Property[key.name="zIndex"] > Literal',
            message: 'Avoid using Tailwind z-index values directly in style props.',
        },
        {
            selector: 'CallExpression[callee.name="setSearchParams"] > ObjectExpression',
            message: 'Use the callback syntax for setSearchParams.',
        },
    ],
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'no-eq-null': 'error',
    radix: ['error', 'always'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    // All formatting rules live under @stylistic — core equivalents are deprecated in ESLint 10+
    '@stylistic/indent': ['error', 4, { SwitchCase: 1 }],
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/max-len': ['error', { code: 120 }],
    '@stylistic/block-spacing': ['error', 'always'],
    '@stylistic/space-before-blocks': ['error', 'always'],
    '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
    '@stylistic/object-curly-spacing': ['error', 'always'],
    'indent-empty-lines/indent-empty-lines': ['error', 4],
    'preserve-caught-error': 'off',
    'no-unused-vars': 'off',
}

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...tseslint.configs.recommended,
    // global ignores
    {
        ignores: [
            'dist/**',
            'build/**',
            '.next/**',
            '**/.next/**',
            'node_modules/**',
            'apps/api/node_modules/**',
            'apps/web/node_modules/**',
            'components/ui/**',
            'src/components/ui/**',
            'apps/web/src/components/ui/**',
            'task/**',
        ],
    },
    {
        files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
            parserOptions: {
                // Allow checking Next & Jest configs
                projectService: true,
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: sharedGlobals,
        },
        plugins: {
            ...basePlugins,
            '@stylistic': stylistic,
        },
        settings: reactSettings,
        rules: {
            ...baseRules,
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': strictMode ? 'error' : 'warn',
        },
    },
    
    // TypeScript files: use tseslint for parser + plugin (replaces the separate
    // @typescript-eslint/eslint-plugin + @typescript-eslint/parser imports)
    ...tseslint.configs.recommended.map(config => ({
        ...config,
        files: ['**/*.{ts,tsx}'],
    })),
    
    {
        files: ['**/*.{ts,tsx}'],
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
            parser: tseslint.parser,
            parserOptions: {
                // Allow checking Next & Jest configs
                projectService: true,
                ecmaFeatures: {
                    jsx: true,
                },
                tsconfigRootDir: import.meta.dirname,
            },
            globals: sharedGlobals,
        },
        plugins: {
            ...basePlugins,
            '@typescript-eslint': tseslint.plugin,
            '@stylistic': stylistic,
        },
        settings: reactSettings,
        rules: {
            ...baseRules,
            'no-undef': 'off',
            'react-hooks/exhaustive-deps': strictMode ? 'error' : 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    args: 'none',          // tsc catches these instead
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
    
    // TBD: the plugin doesn't support ts files yet. Do not remove.
    // ...oxlint.configs['flat/recommended'], // oxlint should be the last one
    // ...oxlint.buildFromOxlintConfigFile('./oxlint.config.ts'), // oxlint should be the last one
]
