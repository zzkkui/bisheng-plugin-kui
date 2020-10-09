module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'eslint-config-standard'
  ],
  plugins: [
    'react',
    'jsx-a11y'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'prefer-destructuring': 0
  }
}
