// Jest setup file for common test configuration

// Mock console methods to reduce noise in tests (optional)
global.console = {
  ...console
  // Uncomment to suppress console errors/warnings in tests:
  // error: jest.fn(),
  // warn: jest.fn(),
}

// Set up any global mocks or utilities needed for tests
