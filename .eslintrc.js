module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'unicorn', 'no-for-of-loops'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-for-of-loops/no-for-of-loops': 'error',
    'no-restricted-imports': 'off',
    '@typescript-eslint/no-restricted-imports': ['error', {
      paths: [{
        name: '@nestjs/common',
        importNames: ['forwardRef'],
        message: 'Using forward reference is forbidden, maybe you need to split into different modules?'
      }],
      patterns: [{
        group: ['../*'],
        message: 'Please use alias imports configured in tsconfig.json file (e.g. @app/*)',
      }]
    }],
    'max-params': ['error', 6],
    'no-return-await': 'error',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    'unicorn/no-new-buffer': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
  },
};
