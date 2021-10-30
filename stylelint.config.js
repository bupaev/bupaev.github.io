module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  plugins: [
    'stylelint-scss'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'function-comma-space-after': null,
    'function-name-case': null
  }
}
