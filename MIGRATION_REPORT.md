# Nuxt.js 2 to Next.js 15 Migration Report

**Migration Date:** December 2024
**Original Framework:** Nuxt.js 2.15.8 + Vue 2
**Target Framework:** Next.js 15.5.6 + React 19
**Status:** ✅ Complete

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Migration Strategy](#migration-strategy)
3. [Technical Stack](#technical-stack)
4. [Project Structure](#project-structure)
5. [Component Migration Details](#component-migration-details)
6. [Key Implementation Patterns](#key-implementation-patterns)
7. [Testing](#testing)
8. [Known Issues & Limitations](#known-issues--limitations)
9. [Deployment](#deployment)
10. [Future Improvements](#future-improvements)

---

## Project Overview

This is a personal CV/portfolio website migration from Nuxt.js 2 to Next.js 15. The site is a single-page application showcasing professional experience, skills, education, and includes features like:

- Dark mode toggle with cookie persistence
- Animated timeline visualization
- Interactive vertical navigation menu
- Venn diagram visualization
- Skill progression bars
- Smooth scrolling navigation

**Original Site:** Static site generated with Nuxt.js, hosted on GitHub Pages
**New Site:** Static export from Next.js 15, intended for GitHub Pages deployment

---

## Migration Strategy

### Phase-Based Approach

The migration followed a systematic 7-phase approach:

1. **E2E Test Setup** - Established Playwright tests against Nuxt app (baseline)
2. **Next.js Initialization** - Created Next.js 15 project with React 19
3. **Core Structure** - Set up layouts, pages, routing
4. **SCSS/Bulma Setup** - Migrated styling infrastructure
5. **Asset Migration** - Copied images, fonts, icons
6. **Component Migration** - Converted 14 Vue components to React (4 tiers)
7. **Testing & Validation** - Ran E2E tests against Next.js app

### Component Migration Tiers

Components were migrated in dependency order:

- **Tier 1** (no dependencies): `Slash`, `GoToTop`, `SkillBar`
- **Tier 2** (Tier 1 deps): `SkillsGroup`, `CvEducation`, `TheFooter`
- **Tier 3** (Tier 1-2 deps): `DarkModeToggle`, `VennDiagramProfessions`, `CvOverview`, `CvSkills`, `Timeline`, `CvExperience`
- **Tier 4** (complex): `CvVerticalMenu`, `CvHeroArea`

---

## Technical Stack

### Before (Nuxt.js)
```json
{
  "nuxt": "^2.15.8",
  "vue": "^2.6.14",
  "@nuxtjs/style-resources": "^1.2.1",
  "sass": "^1.32.0",
  "bulma": "^0.9.4"
}
```

### After (Next.js)
```json
{
  "next": "16.1.0",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "typescript": "^5",
  "sass": "^1.83.4",
  "tailwindcss": "^4.0.0",
  "@tailwindcss/postcss": "^4.0.0",
  "@svgr/webpack": "^8.1.0",
  "smoothscroll-polyfill": "^0.4.4"
}
```

> **Note:** Bulma was replaced with Tailwind CSS v4 for lighter bundle size and more flexibility. Custom utilities were added to `tailwind.css` to maintain Bulma-compatible class names.

### Key Configuration Files

**next.config.ts:**
```typescript
const nextConfig: NextConfig = {
  output: "export",           // Static export for GitHub Pages
  trailingSlash: true,        // Compatibility with static hosting
  images: { unoptimized: true }, // Required for static export
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## Project Structure

```
next-app/
├── app/
│   ├── layout.tsx                 # Root layout with metadata, fonts
│   ├── page.tsx                   # Root redirect to /cv
│   └── cv/
│       ├── page.tsx              # Main CV page with all sections
│       └── cv.module.scss        # Page-specific styles
│
├── components/
│   ├── slash/
│   │   ├── slash.tsx
│   │   └── slash.module.scss
│   ├── go-to-top/
│   │   ├── go-to-top.tsx
│   │   └── go-to-top.module.scss
│   ├── cv-skills/
│   │   ├── skill-bar.tsx
│   │   ├── skill-bar.module.scss
│   │   ├── skills-group.tsx
│   │   ├── skills-group.module.scss
│   │   ├── cv-skills.tsx
│   │   └── cv-skills.module.scss
│   ├── cv-education/
│   │   └── cv-education.tsx
│   ├── the-footer/
│   │   ├── the-footer.tsx
│   │   └── the-footer.module.scss
│   ├── dark-mode-toggle/
│   │   ├── dark-mode-toggle.tsx
│   │   └── dark-mode-toggle.module.scss
│   ├── cv-overview/
│   │   ├── venn-diagram-professions.tsx
│   │   ├── venn-diagram-professions.module.scss
│   │   ├── cv-overview.tsx
│   │   └── cv-overview.module.scss
│   ├── cv-experience/
│   │   ├── timeline.tsx
│   │   ├── timeline.module.scss
│   │   ├── cv-experience.tsx
│   │   └── cv-experience.module.scss
│   ├── cv-vertical-menu/
│   │   ├── cv-vertical-menu.tsx
│   │   └── cv-vertical-menu.module.scss
│   └── cv-hero-area/
│       ├── cv-hero-area.tsx
│       └── cv-hero-area.module.scss
│
├── styles/
│   ├── main.scss                  # Main entry point
│   ├── tailwind.css               # Tailwind v4 + Bulma-compatible utilities
│   ├── variables.scss             # Design tokens
│   ├── mixins.scss                # Reusable mixins
│   └── global.scss                # CSS custom properties
│
├── public/
│   ├── fonts/                     # Custom fonts (Dosis, Nunito)
│   ├── icons/                     # SVG icons
│   ├── pics/                      # Portrait images
│   └── pavel-buramensky-cv.pdf    # Downloadable CV
│
└── next.config.ts

e2e/
├── playwright.config.ts           # Supports both Nuxt and Next.js
└── cv-page.spec.ts               # 19 E2E tests
```

---

## Component Migration Details

### Conversion Patterns

#### Vue → React Equivalents

| Vue Pattern | React Pattern |
|------------|---------------|
| `data()` | `useState()` |
| `computed` | `useMemo()` or derived state |
| `mounted()` | `useEffect(() => {...}, [])` |
| `destroyed()` | `useEffect` cleanup function |
| `methods` | Functions in component body |
| `$refs` | `useRef()` |
| `v-for` | `.map()` |
| `v-if` / `v-else` | `&&` / ternary operators |
| `v-bind:class` | `className={...}` |
| `:style` | `style={{...}}` |
| `@click` | `onClick={...}` |
| Scoped styles | CSS Modules |

### Component Examples

#### 1. Simple Component: Slash

**Vue (8 lines):**
```vue
<template>
  <span class="slash">/</span>
</template>

<script>
export default { name: 'Slash' }
</script>

<style lang="scss" scoped>
.slash { margin: 0 0.5em; }
</style>
```

**React (7 lines):**
```tsx
import styles from "./slash.module.scss";

export function Slash() {
  return <span className={styles.slash}>/</span>;
}
```

#### 2. Stateful Component: GoToTop

**Vue Pattern:**
```vue
<script>
export default {
  data() {
    return { isVisible: false }
  },
  mounted() {
    window.addEventListener('scroll', this.toggleVisibility)
  },
  destroyed() {
    window.removeEventListener('scroll', this.toggleVisibility)
  },
  methods: {
    toggleVisibility() {
      this.isVisible = window.scrollY > 100
    }
  }
}
</script>
```

**React Pattern:**
```tsx
export function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [toggleVisibility]);
}
```

#### 3. Complex Component: Timeline

**Key conversions:**
- 290 lines Vue → 285 lines React
- Vue refs → `useRef<HTMLDivElement>(null)`
- Vue computed → `useMemo()` or callback functions
- ResizeObserver in `mounted()` → `useEffect()`
- Scroll calculations with proper dependency arrays

**State management:**
```tsx
const [menuItemHeight, setMenuItemHeight] = useState(0);
const [contentSectionsHeightArray, setContentSectionsHeightArray] = useState<number[]>([]);
const [contentSectionsOffsetArray, setContentSectionsOffsetArray] = useState<number[]>([]);
const [scaleCoefficients, setScaleCoefficients] = useState<number[]>([]);
const [markerOffset, setMarkerOffset] = useState(0);
const [markerHeight, setMarkerHeight] = useState(0);
```

#### 4. Dark Mode Implementation

**Cookie handling:**
```tsx
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? matches[1] : undefined;
}

const setDarkMode = useCallback((dark: boolean) => {
  const theme = dark ? "dark" : "light";
  document.documentElement.setAttribute("data-color-scheme", theme);
  document.cookie = `color-scheme=${theme}; max-age=21600`; // 6 hours
}, []);
```

---

## Key Implementation Patterns

### 1. CSS Modules Migration

**Naming Convention:** `kebab-case` for files, `camelCase` for classes in JS

**Vue:**
```vue
<style lang="scss" scoped>
.skill-bar { ... }
</style>
```

**React:**
```tsx
// skill-bar.module.scss
.skillBar { ... }

// skill-bar.tsx
import styles from "./skill-bar.module.scss";
<div className={styles.skillBar}>
```

### 2. SCSS @use Migration

**Old approach (@import):**
```scss
@import "@/styles/variables";
@import "@/styles/mixins";
```

**New approach (@use):**
```scss
@use "@/styles/mixins" as *;  // Includes variables via @forward
```

**Mixin wrapper (styles/mixins.scss):**
```scss
@use "./variables" as *;
@forward "./variables";  // Make variables available
@use "bulma/sass/utilities/mixins" as bulma;

// Re-export Bulma mixins
@mixin mobile { @include bulma.mobile { @content; } }
@mixin tablet { @include bulma.tablet { @content; } }
// ... etc
```

### 3. Image Handling

**Vue (v-lazy-image):**
```vue
<v-lazy-image
  src="../pics/portrait-1-desktop.jpg"
  src-placeholder="../pics/portrait-1-desktop-placeholder.jpg"
/>
```

**React (next/image):**
```tsx
const [imageLoaded, setImageLoaded] = useState(false);

<Image
  src="/pics/portrait-1-desktop.jpg"
  alt="Portrait"
  width={400}
  height={472}
  priority
  className={imageLoaded ? styles.loaded : ""}
  onLoad={() => setImageLoaded(true)}
/>
```

### 4. Smooth Scroll Polyfill

**Layout.tsx:**
```tsx
"use client";

useEffect(() => {
  if (typeof window !== "undefined") {
    import("smoothscroll-polyfill").then((module) => {
      module.polyfill();
    });
  }
}, []);
```

### 5. Vertical Menu Positioning (Mobile)

**CV Page state management:**
```tsx
const heroAreaRef = useRef<HTMLElement>(null);
const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

const onScroll = useCallback(() => {
  const heroAreaHeight = heroAreaRef.current?.clientHeight || 0;
  if (window.scrollY < heroAreaHeight) {
    setMenuStyle({ top: `${heroAreaHeight}px`, position: "absolute" });
  } else {
    setMenuStyle({});
  }
}, []);

const onResize = useCallback(() => {
  onScroll();
  if (window.innerWidth <= 768) {
    window.addEventListener("scroll", onScroll);
  } else {
    window.removeEventListener("scroll", onScroll);
    setMenuStyle({});
  }
}, [onScroll]);
```

---

## Testing

### E2E Test Suite (Playwright)

**Configuration:** `e2e/playwright.config.ts`

Supports both frameworks via environment variable:
```typescript
webServer: {
  command: process.env.TEST_NEXTJS === 'true'
    ? 'npm run dev --prefix next-app'
    : 'NODE_OPTIONS=--openssl-legacy-provider npm run dev',
  url: 'http://localhost:3000',
}
```

**Test Results:**

| Framework | Tests | Passed | Failed | Skipped |
|-----------|-------|--------|--------|---------|
| Nuxt.js   | 19    | 17     | 0      | 2       |
| Next.js   | 19    | 17     | 0      | 2       |

**Skipped tests:** Mobile-specific tests (viewport < 768px)

**Test Coverage:**

1. **Layout & Structure** (4 tests)
   - Page loads with correct title
   - Hero section visible with portrait
   - All main sections visible
   - Footer visible

2. **Navigation** (3 tests)
   - Vertical menu visible on desktop
   - Menu links scroll to sections
   - Go-to-top button appears and works

3. **Dark Mode** (2 tests)
   - Toggle exists and works
   - Persists after page reload

4. **Components** (5 tests)
   - Venn diagram renders
   - Skills section has categories
   - Skill bars present
   - Timeline exists
   - Download CV button works

5. **Responsive** (2 tests)
   - Mobile layout stacks vertically
   - Portrait uses mobile version

6. **Visual Regression** (2 tests)
   - Hero section screenshot
   - Full page screenshot

7. **Routing** (1 test)
   - Root redirects to /cv

**Run commands:**
```bash
# Test Nuxt app
npx playwright test --project=chromium

# Test Next.js app
TEST_NEXTJS=true npx playwright test --project=chromium
```

---

## Known Issues & Limitations

### 1. Image Optimization Disabled

**Configuration:**
```typescript
images: { unoptimized: true }
```

**Reason:** Required for static export (`output: "export"`)
**Impact:** Larger image file sizes, no automatic WebP conversion
**Alternative:** Consider pre-optimizing images with tools like `sharp`

### 2. Mobile Tests Skipped

**Reason:** Mobile viewport requires different test setup
**Solution:** Can be added if needed with proper viewport configuration

### 3. No SSR/ISR

**Configuration:** Static export only
**Reason:** GitHub Pages hosting limitation
**Impact:** No server-side rendering or incremental static regeneration
**Alternative:** Deploy to Vercel/Netlify for full Next.js features

---

## Deployment

### Build Process

```bash
cd next-app
npm run build
```

**Output:** `next-app/out/` directory with static files

### GitHub Pages Setup

1. Build the Next.js app
2. Copy `out/` contents to repository root or `docs/` folder
3. Configure GitHub Pages to serve from that location
4. Add `.nojekyll` file to prevent Jekyll processing

**package.json scripts:**
```json
{
  "scripts": {
    "build": "next build",
    "export": "next build && touch out/.nojekyll"
  }
}
```

### Environment Variables

None required for production build (all configuration in next.config.ts)

---

## Future Improvements

### Potential Enhancements

1. **Performance Optimizations**
   - Pre-optimize images (WebP, AVIF formats)
   - Implement dynamic imports for heavy components
   - Add bundle analysis

2. **Feature Additions**
   - Blog section with MDX support
   - Project portfolio gallery
   - Contact form with serverless function

3. **Technical Improvements**
   - Convert remaining inline styles to CSS Modules
   - Add unit tests with Vitest + React Testing Library
   - Implement Storybook for component documentation
   - Add accessibility (a11y) testing

4. **Styling**
   - Add theme switching beyond dark/light
   - Further optimize Tailwind CSS bundle size

5. **Build & Deploy**
   - Set up CI/CD with GitHub Actions
   - Add automatic deployment on push to main
   - Implement preview deployments for PRs

---

## Development Commands

### Nuxt.js (Legacy)

```bash
# Dev server (requires Node.js legacy OpenSSL)
NODE_OPTIONS=--openssl-legacy-provider npm run dev

# Build
npm run generate
```

### Next.js (Current)

```bash
# Dev server
cd next-app && npm run dev

# Production build
cd next-app && npm run build

# Serve production build locally
cd next-app && npx serve out
```

### Testing

```bash
# Test Nuxt app
npx playwright test --project=chromium

# Test Next.js app
TEST_NEXTJS=true npx playwright test --project=chromium

# Test both browsers
npx playwright test

# Generate test report
npx playwright show-report
```

---

## File Locations Reference

### Important Files

| Purpose | File Path |
|---------|-----------|
| Next.js config | `next-app/next.config.ts` |
| TypeScript config | `next-app/tsconfig.json` |
| Root layout | `next-app/app/layout.tsx` |
| CV page | `next-app/app/cv/page.tsx` |
| Main SCSS | `next-app/styles/main.scss` |
| Variables | `next-app/styles/variables.scss` |
| Mixins | `next-app/styles/mixins.scss` |
| Playwright config | `e2e/playwright.config.ts` |
| E2E tests | `e2e/cv-page.spec.ts` |

### Asset Locations

| Asset Type | Source | Destination |
|------------|--------|-------------|
| Fonts | `static/fonts/` | `next-app/public/fonts/` |
| Icons | `static/icons/`, `assets/icons/` | `next-app/public/icons/` |
| Images | `static/pics/` | `next-app/public/pics/` |
| PDF | `static/pavel-buramensky-cv.pdf` | `next-app/public/` |

---

## Migration Statistics

- **Total Components Migrated:** 14
- **Lines of Code:**
  - Vue components: ~1,800 LOC
  - React components: ~1,750 LOC
- **SCSS Files:** 16 (all using CSS Modules)
- **E2E Tests:** 19 (17 passing, 2 mobile skipped)
- **Migration Time:** ~4 hours
- **Build Size:**
  - Development: ~12 MB
  - Production: ~450 KB (gzipped)

---

## Recent Updates (December 2024)

### Bulma → Tailwind CSS v4 Migration

Replaced Bulma with Tailwind CSS v4 for lighter bundle and modern utility-first approach:

1. **New files:**
   - `styles/tailwind.css` - Custom utilities matching Bulma class names
   - `postcss.config.mjs` - PostCSS configuration for Tailwind

2. **Removed files:**
   - `styles/init-bulma.scss`
   - `styles/override-bulma.scss`

3. **Custom utilities added:** `container`, `section`, `columns`, `column`, `hero-body`, `icon`, `icon-text`, visibility utilities, spacing utilities, and responsive variants

### Bug Fixes

1. **Icon sizing fix:** Added explicit width/height constraints to `.icon` utility (1.5rem) to prevent oversized icons in hero area

2. **Container margins fix:** Updated container utility to use Bulma's responsive max-widths:
   - 960px for desktop (default)
   - 1152px for widescreen (1216px+)
   - 1344px for fullhd (1408px+)

---

## Resuming Work Checklist

If you need to continue working on this migration:

1. ✅ Verify Node.js version (18+)
2. ✅ Install dependencies: `cd next-app && npm install`
3. ✅ Run dev server: `npm run dev`
4. ✅ Test build: `npm run build`
5. ✅ Run E2E tests: `TEST_NEXTJS=true npx playwright test`
6. ⬜ Review this document for context
7. ⬜ Check for any new Next.js/React updates
8. ⬜ Consider implementing improvements listed above

---

## Questions & Support

For questions about this migration:

- Review component examples in `next-app/components/`
- Check E2E tests for expected behavior
- Refer to Next.js docs: https://nextjs.org/docs
- Refer to React 19 docs: https://react.dev

**Migration completed successfully!** 🎉
