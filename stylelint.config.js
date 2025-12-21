module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  plugins: [
    'stylelint-scss'
  ],
  // Ignore Tailwind CSS file (uses non-standard at-rules)
  ignoreFiles: [
    'next-app/styles/tailwind.css'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'function-comma-space-after': null,
    'function-name-case': null,
    'no-invalid-position-at-import-rule': null
  }
}
