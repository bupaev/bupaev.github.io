# paulbu.com

[![Build](https://github.com/bupaev/bupaev.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/bupaev/bupaev.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/bupaev/bupaev.github.io/actions/workflows/cd.yml/badge.svg)](https://github.com/bupaev/bupaev.github.io/actions/workflows/cd.yml)

My personal site — a playful take on the classic CV format. Instead of a plain document, it experiments with interactive visualizations, SVG effects, and unconventional layouts to represent who I am and what I've been up to professionally. The code leans toward "make it look infomrative and interesting" rather than production-grade polish, so expect rough edges — both in the codebase and in rendering outside of Chrome. The latest iteration is AI-assisted, built in collaboration with Claude and Gemini, which has been a great way to push the boundaries of what I'd normally attempt solo.

**Live:** [paulbu.com](https://paulbu.com/)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Astro 5](https://astro.build/) — static output, MDX support |
| UI | [React 19](https://react.dev/) — functional components, hooks |
| Language | [TypeScript 5](https://www.typescriptlang.org/) — strict mode |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/), SCSS Modules, design tokens |
| Testing | [Vitest](https://vitest.dev/) (unit), [Playwright](https://playwright.dev/) (E2E) |
| Quality | [ESLint 9](https://eslint.org/), [Stylelint 17](https://stylelint.io/), Husky + lint-staged |

## Project Structure

```
src/
├── pages/              # Astro file-based routing
├── layouts/            # Page shells (Layout.astro)
├── components/
│   ├── overview/       # Interactive brain-map diagram
│   │   └── diagram/    # SVG geometry, area content, topic portals
│   ├── skills/         # Competencies grid
│   ├── experience/     # Work history timeline
│   ├── education/      # Education section
│   ├── hero-area/      # Landing hero
│   └── ...             # Dark-mode toggle, vertical menu, footer
├── styles/             # Global design system
│   ├── tokens.scss     # Color & spacing variables
│   ├── mixins.scss     # Media queries, visual effects
│   └── typography.scss # Type scale
e2e/                    # Playwright specs & snapshots
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build (static output)
npm run build

# Preview production build
npm run preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Astro dev server |
| `npm run build` | Production static build |
| `npm run preview` | Preview production build locally |
| `npm run check` | Astro type checking |
| `npm run lint` | Run ESLint |
| `npm run lint:css` | Run Stylelint on CSS/SCSS |
| `npm run lint:all` | Run both linters |
| `npm test` | Run Vitest unit tests |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:coverage` | Unit tests with coverage report |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Playwright with interactive UI |

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/) with atomic commit principles.

### Message Format

```
type(scope): subject

- Body point 1
- Body point 2
- Body point 3
```

- **Subject:** imperative mood, lowercase, no period, max 50 characters
- **Body:** bullet list, up to 3 points explaining *what* and *why* (not how)
- One logical change per commit — if more than 3 body points are needed, split the commit

### Types

`feat` · `fix` · `refactor` · `perf` · `style` · `docs` · `test` · `build` · `ci` · `chore` · `content`

Pre-commit hooks enforce linting and run related unit tests via lint-staged.

## License

This is a personal portfolio project. Source code is provided for reference.
