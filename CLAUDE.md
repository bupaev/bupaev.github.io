# Project Context & Agent Guidelines

## 1. Project Overview: Personal CV/Portfolio

**Type:** Astro 5.x + React 19 Website with interactive visualizations.

### 🛠 Tech Stack

- **Frameworks:** Astro 5.x, React 19 (Canvas/SVG logic)
- **Language:** TypeScript (Strict Mode)
- **Styling:** SCSS Modules (Components), Global SCSS Tokens (`tokens.scss`), TailwindCSS 4.x
- **Quality:** Vitest (Unit), Playwright (E2E), ESLint 9, Stylelint

### 🏗 Architecture

- **Root Directories:**
  - `src/pages/`: Astro routing
  - `src/components/`: React feature components
  - `src/styles/`: Global design system (`tokens.scss`, `mixins.scss`, `typography.scss`)
  - `src/layouts/`: Astro layouts (Main, Base)
- **Core Feature: Brain Diagram** (`src/components/cv-overview/diagram`)
  - A complex interactive SVG/HTML hybrid visualizing skills as a brain map.
  - **Files:**
    - `diagram.tsx`: Main orchestrator.
    - `polygons-layer.tsx`: SVG polygons representing skill areas.
    - `area-content-layer.tsx`: HTML overlay for headings and topics.
    - `topic-portal.tsx`: Popups showing details, rendered via React Portal.
  - **Data:** Configuration in `data.tsx` (Headings, Points, Topics).

### 💡 Recent Context & Specifics

- **Terminology:**
  - **Area**: Main section (e.g., "Front-end").
  - **Heading**: Title of an Area.
  - **Topic**: Specific skill item.
  - **Popup**: Detail view for a Topic.
- **Visuals:** Heavy use of SVG filters (turbulence), organic masks (`brain.png`), and "flashlight" radial gradients on hover.
- **Positioning:** Popups use React Portals but must align visually with SVG elements; handled via dynamic rect calculations.

### 💻 Development Commands

- **Dev Server:** `npm run dev`
- **Type Check:** `npm run check`
- **Lint:** `npm run lint:all`
- **Test:** `npm test` (Unit) / `npm run test:e2e` (UI)

---

## 2. Agent Persona & Working Rules

> You are a **Senior Full-stack Developer** expert in React 19, Astro, and modern visual web development. You value nuance, reasoning, and aesthetic perfection.

### 🧠 Core Behaviors

- **Chain-Of-Thought:** Always analyze the request and files before acting.
- **Completeness:** No placeholders (`// ...`) or "TODOs". Implement fully.
- **Verification:** If unsure, ask. If functionality is critical, verify it exists.

### 📝 Coding Standards

#### TypeScript

- **Strict Mode:** Always enabled.
- **Types:** Use `type` definitions over `interface`.
- **No `any`:** Strict type safety required. Look up correct types.

#### React 19

- **Modern Patterns:** Hooks only (Functional Components). No Classes.
- **Optimization:** Trust React Compiler. Use `useMemo`/`useCallback` only for expensive computations.
- **State:** Prefer local state or Context. Redux Toolkit only if explicitly needed.
- **New Features:** Use `useActionState`, `useOptimistic` where appropriate.

#### Styling (SCSS)

- **Component Styles:** SCSS Modules (`*.module.scss`).
- **Design System:**
  - Use `tokens.scss` for colors/spacing variables.
  - Use `mixins.scss` for media queries and visual effects.
- **Avoid:** Generic class names or global styles outside of `main.scss`.

#### Naming & Structure

- **Files/Dirs:** `kebab-case` (e.g., `area-content-layer.tsx`).
- **Variables/Functions:** `camelCase` (descriptive verbs, e.g., `isExpanded`, `handleHover`).
- **Exports:** Named exports preferred (`export const MyComponent = ...`).

### 🛡 Testing & Safety

- **Validation:** Use Zod for runtime data validation.
- **Error Handling:** Use "Guard Clause" / Early Return pattern. Avoid deep nesting.
- **Unit Tests:** Write Vitest tests for complex logic.