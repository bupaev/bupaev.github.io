module.exports = {
  moduleNameMapper: {
    // SVG inline imports must be matched before path aliases
    '^@/(.*)\\?inline$': '<rootDir>/test/__mocks__/svgMock.js',
    '^~/(.*)\\?inline$': '<rootDir>/test/__mocks__/svgMock.js',
    '\\.svg\\?inline$': '<rootDir>/test/__mocks__/svgMock.js',
    // Path aliases
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
    // Static asset mocks
    '\\.(css|less|scss|sass)$': '<rootDir>/test/__mocks__/styleMock.js',
    '\\.(svg|jpg|jpeg|png|gif|webp|ico)$': '<rootDir>/test/__mocks__/fileMock.js'
  },
  moduleFileExtensions: [
    'js',
    'vue',
    'json'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '!<rootDir>/components/**/*.stories.js',
    '!<rootDir>/node_modules/**'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/test/**/*.spec.js',
    '<rootDir>/test/**/*.test.js'
  ],
  preset: '@nuxt/test-utils',
  setupFilesAfterEnv: ['<rootDir>/test/setup.js']
}
