module.exports = {
  extends: ['airbnb-typescript/base'],
  plugins: ['import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
};