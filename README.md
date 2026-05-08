# paulbu.com

[![Build](https://github.com/bupaev/bupaev.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/bupaev/bupaev.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/bupaev/bupaev.github.io/actions/workflows/cd.yml/badge.svg)](https://github.com/bupaev/bupaev.github.io/actions/workflows/cd.yml)

My personal site — a playful take on the classic CV format. Instead of a plain document, it experiments with interactive visualizations, SVG effects, and unconventional layouts to represent who I am and what I've been up to professionally. The code leans toward "make it look informative and interesting" rather than production-grade polish, so expect rough edges — both in the codebase and in rendering outside of Chrome. The latest iteration is AI-assisted, built in collaboration with Claude and Gemini, which has been a great way to push the boundaries of what I'd normally attempt solo.

**Live:** [paulbu.com](https://paulbu.com/)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Astro 5](https://astro.build/) — static output, MDX support |
| UI | [React 19](https://react.dev/) — functional components, hooks |
| Language | [TypeScript 5](https://www.typescriptlang.org/) — strict mode |
| Styling | [Vanilla SCSS](https://sass-lang.com/) with [CSS Layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), SCSS Modules, design tokens |
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
│   ├── layers.scss     # CSS Layer precedence definition
│   ├── reset.scss      # CSS baseline (layered)
│   ├── tokens.scss     # Color & spacing variables
│   ├── mixins.scss     # Media queries, visual effects
│   └── typography.scss # Type scale
e2e/                    # Playwright specs & snapshots
resume-export/          # Markdown → DOCX/PDF resume generators
├── md-to-docx.js       # Node script using `docx`
├── md-to-pdf.js        # Node script using `pdfkit`
├── merge-resume-with-template.py  # Python helper merging body PDF with branded header
├── fonts/              # Nunito TTFs (regular, bold, medium, italic)
└── template/           # Nunito 2026 Template.pdf (header source)
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
| `npm run resume:docx` | Generate `public/paul-buramensky-resume.docx` from the Markdown source |
| `npm run resume:pdf` | Generate `public/paul-buramensky-resume.pdf` (body styled by `pdfkit`, header merged from the Nunito 2026 template) |
| `npm run resume:build` | Run both resume exporters back-to-back |

## Resume Export

The Markdown resume at [`public/paul-buramensky-resume.md`](public/paul-buramensky-resume.md) is the single source of truth. Branded DOCX and PDF builds live next to it under `public/` and are regenerated via the scripts in [`resume-export/`](resume-export/).

```bash
# One-time Python dep for the PDF header merge
pip3 install -r resume-export/requirements.txt

# Build both formats from the canonical Markdown
npm run resume:build

# Or build a single format
npm run resume:docx
npm run resume:pdf

# Custom input/output (forward args after `--`)
npm run resume:docx -- path/to/resume.md path/to/output.docx
npm run resume:pdf  -- path/to/resume.md path/to/output.pdf
```

The DOCX renders best on machines with [Nunito](https://fonts.google.com/specimen/Nunito) installed; the PDF embeds the bundled Nunito TTFs and pulls the branded header from `resume-export/template/Nunito 2026 Template.pdf`.

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/) with atomic commit principles.

## License

This is a personal portfolio project. Source code is provided for reference.
