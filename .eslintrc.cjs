module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
  settings: {
    react: {
      version: '16.5.2',
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', 'jsdoc', 'react', 'react-hooks'],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'jsdoc/check-access': 1, // Recommended
    'jsdoc/check-alignment': 1, // Recommended,
    'jsdoc/check-param-names': 1, // Recommended
    'jsdoc/check-property-names': 1, // Recommended,
    'jsdoc/check-tag-names': 1, // Recommended
    'jsdoc/check-types': 1, // Recommended
    'jsdoc/check-values': 1, // Recommended
    'jsdoc/empty-tags': 1, // Recommended
    'jsdoc/implements-on-classes': 1, // Recommended,
    'jsdoc/multiline-blocks': 1, // Recommended
    'jsdoc/newline-after-description': 1, // Recommended
    'jsdoc/no-multi-asterisks': 1, // Recommended
    'jsdoc/no-undefined-types': 1, // Recommended
    'jsdoc/require-jsdoc': 1, // Recommended
    'jsdoc/require-param': 1, // Recommended
    'jsdoc/require-param-name': 1, // Recommended
    'jsdoc/require-param-type': 1, // Recommended
    'jsdoc/require-property': 1, // Recommended
    'jsdoc/require-property-description': 1, // Recommended
    'jsdoc/require-property-name': 1, // Recommended
    'jsdoc/require-property-type': 1, // Recommended
    'jsdoc/require-returns': 1, // Recommended
    'jsdoc/require-returns-check': 1, // Recommended
    'jsdoc/require-returns-description': 1, // Recommended
    'jsdoc/require-returns-type': 1, // Recommended
    'jsdoc/require-yields': 1, // Recommended
    'jsdoc/require-yields-check': 1, // Recommended
    'jsdoc/tag-lines': 1, // Recommended
    'jsdoc/valid-types': 1, // Recommended
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
