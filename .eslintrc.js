module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['import'],
  parserOptions: {
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.d.ts',
          '.android.js',
          '.android.jsx',
          '.android.ts',
          '.android.tsx',
          '.ios.js',
          '.ios.jsx',
          '.ios.ts',
          '.ios.tsx',
          '.web.js',
          '.web.jsx',
          '.web.ts',
          '.web.tsx',
        ],
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native-community',
  ],
  rules: {
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'max-len': ['error', 120],
    '@typescript-eslint/ban-ts-comment': 2,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/jsx-filename-extension': ['error', {extensions: ['.tsx']}],
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': 0,
    'import/no-extraneous-dependencies': 2,
    'import/extensions': ['error', 'never', {svg: 'always'}],
    'import/order': ['error', {'newlines-between': 'always'}],
    'import/no-duplicates': 2,
    'import/no-useless-path-segments': 2,
    'import/prefer-default-export': 0,
    'import/named': 0,
    'import/namespace': 0,
    'import/default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-named-as-default': 0,
    'import/no-unused-modules': 0,
    'import/no-deprecated': 0,
    '@typescript-eslint/indent': 0,
    'import/no-anonymous-default-export': 2,
    'react-hooks/rules-of-hooks': 1,
    'react-hooks/exhaustive-deps': ['warn', {additionalHooks: '(useMemoOne)'}],
    'jest/no-identical-title': 2,
    'jest/valid-expect': 2,
    camelcase: 1,
    'prefer-destructuring': 2,
    'no-nested-ternary': 2,
    'comma-dangle': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  env: {
    node: true,
    es2020: true,
  },
};