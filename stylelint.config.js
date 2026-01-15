/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: [
    '**/node_modules/**',
    '**/.next/**',
    '**/out/**',
    '**/build/**',
    '**/*.min.css'
  ],
  rules: {
    // Allow SCSS at-rules
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
          'mixin',
          'if',
          'else',
          'each',
          'for',
          'while',
          'function',
          'return',
          'extend',
          'at-root',
          'error',
          'warn',
          'debug'
        ]
      }
    ],
    // Allow CSS module naming patterns (camelCase and kebab-case)
    'selector-class-pattern': null,
    // Allow :global pseudo-class used in CSS modules
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local', 'export']
      }
    ],
    // Disable rules that don't work well with SCSS/Tailwind
    'import-notation': null,
    'no-invalid-double-slash-comments': null,
    'media-query-no-invalid': null,
    'declaration-property-value-no-unknown': null,
    'no-invalid-position-declaration': null,
    'font-family-name-quotes': null,
    'media-feature-range-notation': null,
    'color-function-alias-notation': null,
    'comment-empty-line-before': null,
    'no-descending-specificity': null,
    'declaration-property-value-keyword-no-deprecated': null,
    'custom-property-pattern': null,
    'at-rule-empty-line-before': null,
    'declaration-block-single-line-max-declarations': null,
    'no-duplicate-selectors': null,
    'selector-attribute-quotes': null,
    'nesting-selector-no-missing-scoping-root': null
  },
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ]
}
