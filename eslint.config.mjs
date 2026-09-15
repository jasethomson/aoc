// eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import globals from 'globals'; // Import globals

export default [
    // Base ESLint recommended rules
    eslint.configs.recommended,

    // TypeScript files configuration
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
            },
            globals: {
                ...globals.node, // Enable Node.js global variables
                BufferEncoding: "readonly"
            }
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            // TypeScript-specific rules
            ...tseslint.configs.recommended.rules,

            // Custom rule overrides
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-explicit-any': 'error',

            // Require explicit accessibility modifiers
            '@typescript-eslint/explicit-member-accessibility': ['error', {
                accessibility: 'explicit',
                overrides: {
                    constructors: 'no-public',
                },
            }],

            // Disallow unused variables
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            }],

            // Disallow async functions with no await
            '@typescript-eslint/require-await': 'error',

            // Enforce consistent type assertions
            '@typescript-eslint/consistent-type-assertions': ['error', {
                assertionStyle: 'as',
                objectLiteralTypeAssertions: 'never',
            }],

            "no-useless-assignment": "off",
        },
    },

    // Ignore patterns
    {
        ignores: ['dist/**', 'node_modules/**', '*.js'],
    },
];