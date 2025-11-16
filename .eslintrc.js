module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  // Explicitly ignore the Next.js subproject when linting from the repo root
  ignorePatterns: [
    'nextjs-app/**'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  rules: {
    'space-before-function-paren': 0,
    'vue/multi-word-component-names': 0,
    'no-console': 0
  }
}
