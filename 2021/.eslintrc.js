module.exports = {
  extends: ['airbnb-typescript/base'],
  plugins: ['import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/lines-between-class-members': 'off',
  },
};