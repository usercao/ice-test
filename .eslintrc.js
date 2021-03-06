const { getESLintConfig } = require('@iceworks/spec');

// https://www.npmjs.com/package/@iceworks/spec
module.exports = getESLintConfig('react-ts', {
  rules: {
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'no-console': 'off',
    'max-lines': 'off',
    '@typescript-eslint/no-require-imports': 'off',
  },
});
