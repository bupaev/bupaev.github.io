/**
 * Data definitions for the Skills section.
 */

export type SkillItem = {
  title: string;
  info?: string;
  level: 1 | 2 | 3;
};

export type SkillGroup = {
  title: string;
  info?: string;
  items: SkillItem[];
};

export const SKILLS_DATA: SkillGroup[] = [
  {
    title: "Programming/Markup languages",
    items: [
      {
        title: "Javascript",
        info: "",
        level: 3,
      },
      {
        title: "TypeScript",
        info: "",
        level: 2,
      },
      {
        title: "HTML5",
        info: "Key points: Semantic markup, accessibility, native controls",
        level: 3,
      },
      {
        title: "CSS/SCSS",
        info: "Key points: Atomic and BEM, Flexbox, Grids, CSS Animation",
        level: 3,
      },
      {
        title: "Tailwind CSS",
        info: "Utility-first CSS framework",
        level: 2,
      },
    ],
  },
  {
    title: "JavaScript (Meta-)Frameworks",
    items: [
      {
        title: "React",
        info: "Modern React ecosystem (Hooks, React 19, Server Components)",
        level: 3,
      },
      {
        title: "Vue",
        info: "Standard stack (Vuex and Vue Router) plus TypeScript, Vuetify and Vuelidate",
        level: 2,
      },
      {
        title: "NextJS",
        info: "SSR/SSG, App Router, Server Actions",
        level: 2,
      },
      {
        title: "Astro",
        info: "Static Site Generation, Islands Architecture",
        level: 2,
      },
      {
        title: "NuxtJS",
        info: "Vue framework for SSR/SSG",
        level: 1,
      },
    ],
  },
  {
    title: "Browser APIs",
    items: [
      {
        title: "Web Audio (Web Audio API, MIDI API)",
        info: "",
        level: 3,
      },
      {
        title: "Web Graphics (SVG, Canvas)",
        info: "",
        level: 2,
      },
      {
        title: "Data Storage (Local Storage, IndexedDB)",
        info: "",
        level: 2,
      },
      {
        title: "Web Worker",
        info: "",
        level: 2,
      },
    ],
  },
  {
    title: "UX/UI, image processing",
    items: [
      {
        title: "Figma",
        level: 3,
      },
      {
        title: "Lightroom",
        level: 3,
      },
      {
        title: "Photoshop",
        level: 2,
      },
    ],
  },
  {
    title: "Infrastructure & Platforms",
    items: [
      {
        title: "Git (GitHub, Gitlab, Bitbucket)",
        level: 3,
      },
      {
        title: "Bundling/Automation (Vite, Webpack, Rollup)",
        level: 3,
      },
      {
        title: "CI/CD (GitHub Actions, Gitlab CI, Azure, AWS)",
        level: 2,
      },
      {
        title: "Enterprise CMS (Adobe Experience Manager)",
        level: 2,
      },
      {
        title: "Virtualization (Docker, VMware)",
        level: 1,
      },
    ],
  },
  {
    title: "Backend & Server Communication",
    items: [
      {
        title: "REST API",
        info: "Key points: API design, Axios, Fetch API, JSON",
        level: 3,
      },
      {
        title: "GraphQL",
        level: 2,
      },
      {
        title: "Node.js",
        info: "Backend services, custom scripts, and tooling",
        level: 1,
      },
      {
        title: "Express / NestJS",
        info: "Building REST APIs and server applications",
        level: 1,
      },
      {
        title: "Databases (SQL / NoSQL)",
        info: "MySQL, SQLite, MongoDB",
        level: 1,
      },
    ],
  },
  {
    title: "Code quality and performance",
    items: [
      {
        title: "Linting, Formatting, Style guides",
        info: "Establishing rigorous code review processes and automated linting (ESLint, Prettier, Airbnb styles)",
        level: 3,
      },
      {
        title: "Testing (Vitest, RTL, Jest, Playwright)",
        level: 3,
      },
      {
        title: "Documentation (JSDoc, Swagger)",
        info: "",
        level: 3,
      },
      {
        title: "Web accessibility (WCAG, a11y)",
        info: "Strict accessibility compliance, semantic markup",
        level: 3,
      },
      {
        title: "Web page performance",
        info: "PageSpeed, Lighthouse, Chrome Performance tools, Performance budgets",
        level: 3,
      },
    ],
  },
  {
    title: "Workflow & Methodology",
    items: [
      {
        title: "Agile SCRUM/KANBAN",
        level: 3,
      },
      {
        title: "AI-Assisted Programming / AI Pair Programming",
        level: 3,
      },
      {
        title: "JIRA / Confluence",
        level: 3,
      },
      {
        title: "Code review & Team mentoring",
        level: 3,
      },
    ],
  },
  {
    title: "AI Tools",
    items: [
      {
        title: "Claude Code & Gemini",
        info: "AI Pair Programming, codebase analysis, and architecture exploration",
        level: 3,
      },
      {
        title: "Antigravity",
        info: "AI Agent for automated coding and workflow acceleration",
        level: 3,
      },
      {
        title: "NotebookLM",
        info: "Contextual understanding and documentation synthesis",
        level: 3,
      },
      {
        title: "NanoClaw",
        info: "AI Agent for automated coding and workflow acceleration",
        level: 1,
      },
    ],
  },
  {
    title: "Languages",
    items: [
      {
        title: "Russian",
        info: "Native",
        level: 3,
      },
      {
        title: "English",
        info: "Working language for over 10 years (C1)",
        level: 3,
      },
      {
        title: "German",
        info: "Just enough to survive for several days in a German language-only environment 😅 (A2)",
        level: 1,
      },
    ],
  },
];
