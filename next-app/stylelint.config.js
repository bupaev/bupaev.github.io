/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'theme',
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
          'config',
          'plugin',
          'utility',
          'variant',
          'use',
          'forward',
          'include',
          'mixin'
        ]
      }
    ],
    'import-notation': null
  }
}
