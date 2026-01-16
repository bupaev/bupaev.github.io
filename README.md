# My Personal Website 👽

A personal portfolio website built with [Next.js 16](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS v4](https://tailwindcss.com/).

🌐 **Live:** [paulbu.com](https://paulbu.com/)

## Tech Stack

- **Framework:** Next.js 16.1.0 (App Router, static export)
- **UI:** React 19, TypeScript
- **Styling:** Tailwind CSS v4, SCSS modules, Bulma (utilities)
- **Build:** Turbopack

## Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production (static export to ./out)
npm run build

# Run production server
npm run start
```

## Linting

```bash
# ESLint
npm run lint

# Stylelint (CSS/SCSS)
npm run lint:css
```

## Testing

```bash
# Unit tests (Vitest + React Testing Library)
npm run test

# Unit tests with watch mode
npm run test:watch

# Unit tests with coverage
npm run test:coverage

# E2E tests (Playwright)
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui
```

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

feat, fix, docs, style, refactor, perf, test, build, ci, chore
```
