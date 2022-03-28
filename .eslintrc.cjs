module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
    "node/file-extension-in-import": false,
    "func-names": ["error", "never"],
    "no-underscore-dangle": ["error", { allow: ["__filename", "__dirname"] }],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  ignorePatterns: ["packages/deno-sdk/*"],
};
