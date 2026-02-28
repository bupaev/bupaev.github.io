/**
 * Data definitions for the Skills section.
 */

export type SkillItem = {
  title: string;
  info?: string;
  level: "basic" | "advanced" | "expert";
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
        level: "expert",
      },
      {
        title: "TypeScript",
        info: "",
        level: "advanced",
      },
      {
        title: "HTML5",
        info: "Key points: Semantic markup, accessibility, native controls",
        level: "expert",
      },
      {
        title: "CSS/SCSS",
        info: "Key points: Atomic and BEM, Flexbox, Grids, CSS Animation",
        level: "expert",
      },
      {
        title: "Tailwind CSS",
        info: "Utility-first CSS framework",
        level: "advanced",
      },
    ],
  },
  {
    title: "JavaScript (Meta-)Frameworks",
    items: [
      {
        title: "React",
        info: "Modern React ecosystem (Hooks, React 19, Server Components)",
        level: "expert",
      },
      {
        title: "Vue",
        info: "Standard stack (Vuex and Vue Router) plus TypeScript, Vuetify and Vuelidate",
        level: "advanced",
      },
      {
        title: "NextJS",
        info: "SSR/SSG, App Router, Server Actions",
        level: "advanced",
      },
      {
        title: "Astro",
        info: "Static Site Generation, Islands Architecture",
        level: "advanced",
      },
      {
        title: "NuxtJS",
        info: "Vue framework for SSR/SSG",
        level: "basic",
      },
    ],
  },
  {
    title: "Browser APIs",
    items: [
      {
        title: "Web Audio (Web Audio API, MIDI API)",
        info: "",
        level: "expert",
      },
      {
        title: "Web Graphics (SVG, Canvas)",
        info: "",
        level: "advanced",
      },
      {
        title: "Data Storage (Local Storage, IndexedDB)",
        info: "",
        level: "advanced",
      },
      {
        title: "Web Worker",
        info: "",
        level: "advanced",
      },
    ],
  },
  {
    title: "UX/UI, image processing",
    items: [
      {
        title: "Figma",
        level: "expert",
      },
      {
        title: "Lightroom",
        level: "expert",
      },
      {
        title: "Photoshop",
        level: "advanced",
      },
    ],
  },
  {
    title: "Infrastructure & Platforms",
    items: [
      {
        title: "Git (GitHub, Gitlab, Bitbucket)",
        level: "expert",
      },
      {
        title: "Bundling/Automation (Vite, Webpack, Rollup)",
        level: "expert",
      },
      {
        title: "CI/CD (GitHub Actions, Gitlab CI, Azure, AWS)",
        level: "advanced",
      },
      {
        title: "Enterprise CMS (Adobe Experience Manager)",
        level: "advanced",
      },
      {
        title: "Virtualization (Docker, VMware)",
        level: "basic",
      },
    ],
  },
  {
    title: "Backend & Server Communication",
    items: [
      {
        title: "REST API",
        info: "Key points: API design, Axios, Fetch API, JSON",
        level: "expert",
      },
      {
        title: "GraphQL",
        level: "advanced",
      },
      {
        title: "Node.js",
        info: "Backend services, custom scripts, and tooling",
        level: "basic",
      },
      {
        title: "Express / NestJS",
        info: "Building REST APIs and server applications",
        level: "basic",
      },
      {
        title: "Databases (SQL / NoSQL)",
        info: "MySQL, SQLite, MongoDB",
        level: "basic",
      },
    ],
  },
  {
    title: "Code quality and performance",
    items: [
      {
        title: "Linting, Formatting, Style guides",
        info: "Establishing rigorous code review processes and automated linting (ESLint, Prettier, Airbnb styles)",
        level: "expert",
      },
      {
        title: "Testing (Vitest, RTL, Jest, Playwright)",
        level: "expert",
      },
      {
        title: "Documentation (JSDoc, Swagger)",
        info: "",
        level: "expert",
      },
      {
        title: "Web accessibility (WCAG, a11y)",
        info: "Strict accessibility compliance, semantic markup",
        level: "advanced",
      },
      {
        title: "Web page performance",
        info: "PageSpeed, Lighthouse, Chrome Performance tools, Performance budgets",
        level: "advanced",
      },
    ],
  },
  {
    title: "Workflow & Methodology",
    items: [
      {
        title: "Agile SCRUM/KANBAN",
        level: "expert",
      },
      {
        title: "AI-Assisted Programming / AI Pair Programming",
        level: "expert",
      },
      {
        title: "JIRA / Confluence",
        level: "advanced",
      },
      {
        title: "Code review & Team mentoring",
        level: "expert",
      },
    ],
  },
  {
    title: "AI Tools",
    items: [
      {
        title: "Claude Code & Gemini",
        info: "AI Pair Programming, codebase analysis, and architecture exploration",
        level: "expert",
      },
      {
        title: "Antigravity",
        info: "AI Agent for automated coding and workflow acceleration",
        level: "expert",
      },
      {
        title: "NotebookLM",
        info: "Contextual understanding and documentation synthesis",
        level: "expert",
      },
      {
        title: "NanoClaw, ClaudeClaw",
        info: "AI Agent for automated coding and workflow acceleration",
        level: "basic",
      },
    ],
  },
];
