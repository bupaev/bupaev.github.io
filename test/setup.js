// Jest setup file for common test configuration

// Mock console methods to reduce noise in tests (optional)
global.console = {
  ...console
  // Uncomment to suppress console errors/warnings in tests:
  // error: jest.fn(),
  // warn: jest.fn(),
}

// Mock ResizeObserver for components that use it
global.ResizeObserver = class ResizeObserver {
  constructor (callback) {
    this.callback = callback
  }

  observe (target) {
    // Simulate observation with a default size
    this.callback([{ contentRect: { width: 400, height: 400 } }])
  }

  unobserve () {}
  disconnect () {}
}

// Set up any global mocks or utilities needed for tests
