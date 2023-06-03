module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "max-len": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "react/prop-types": "off",
    "arrow-parens": "off",
    "react/jsx-props-no-spreading": "off",
  },
};
