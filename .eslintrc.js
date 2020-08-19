module.exports = {
  root: true,
  extends: ['prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    camelcase: 'off',
    semi: ['error', 'never'],
    'standard/no-callback-literal': 0,
    'prettier/prettier': [
      'error',
      {
        semi: false,
        tabWidth: 2,
        arrowParens: 'always',
        singleQuote: true,
        trailingComma: 'es5',
        htmlWhitespaceSensitivity: 'ignore',
      },
    ],
  },
}
