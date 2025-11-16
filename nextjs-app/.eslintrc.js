module.exports = {
  // Make this ESLint config the root for the Next.js app so it doesn't inherit the repo root config
  root: true,
  extends: [
    'next',
    'next/core-web-vitals'
  ],
  parserOptions: {
    // Ensure TypeScript parser resolves the correct tsconfig when present
    tsconfigRootDir: __dirname
  }
}
