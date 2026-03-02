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
        title: "JavaScript",
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
    title: "UX/UI Design & Tools",
    items: [
      {
        title: "UX Design & Usability",
        level: "expert",
      },
      {
        title: "Web accessibility (WCAG, a11y)",
        info: "Strict accessibility compliance, semantic markup",
        level: "advanced",
      },
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
    title: "Backend & Server Communication",
    items: [
      {
        title: "REST API Design & Integration",
        info: "Architecting scalable endpoints and consuming services via Axios/Fetch",
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
        title: "Databases (MySQL, MS SQL, MongoDB)",
        info: "",
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
        title: "Web page performance",
        info: "PageSpeed, Lighthouse, Chrome Performance tools, Performance budgets",
        level: "advanced",
      },
    ],
  },
  {
    title: "Architecture & System Design",
    items: [
      {
        title: "System Design and Analysis",
        level: "advanced",
      },
      {
        title: "Solution Architecture",
        level: "advanced",
      },
      {
        title: "Micro frontend architecture",
        level: "advanced",
      },
      {
        title: "Application Modernization",
        level: "advanced",
      },
    ],
  },
  {
    title: "AI Practices & Tools",
    items: [
      {
        title: "Prompt Engineering",
        level: "expert",
      },
      {
        title: "Claude Code, Gemini",
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
      {
        title: "AI Agents Design and Integration",
        level: "basic",
      },
    ],
  },
  {
    title: "Infrastructure & Platforms",
    items: [
      {
        title: "Git (GitHub, Gitlab)",
        level: "expert",
      },
      {
        title: "Bundling/Automation (Vite, Webpack, Bun)",
        level: "expert",
      },
      {
        title: "CI/CD (GitHub Actions, Gitlab CI, Azure, AWS)",
        level: "advanced",
      },
      {
        title: "Cloud Platforms (AWS)",
        level: "basic",
      },
      {
        title: "Docker",
        level: "basic",
      },
      {
        title: "Enterprise CMS (Adobe Experience Manager)",
        level: "advanced",
      },
    ],
  },
  {
    title: "Leadership & Methodology",
    items: [
      {
        title: "Technical Leadership",
        level: "advanced",
      },
      {
        title: "Ownership & Critical Thinking",
        level: "advanced",
      },
      {
        title: "Agile SCRUM/KANBAN",
        level: "expert",
      },
      {
        title: "AI Pair Programming",
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
    title: "Web APIs & Graphics",
    items: [
      {
        title: "Web Audio (Web Audio API, MIDI API)",
        info: "",
        level: "expert",
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
      {
        title: "SVG Graphics",
        info: "",
        level: "expert",
      },
      {
        title: "D3.js",
        info: "Data visualization and 3D graphics",
        level: "basic",
      },
      {
        title: "Three.js",
        info: "Data visualization and 3D graphics",
        level: "basic",
      },
    ],
  },
  {
    title: "Languages",
    items: [
      {
        title: "English",
        info: "Working language for over 10 years (C1)",
        level: "expert",
      },
      {
        title: "Russian",
        info: "Native",
        level: "expert",
      },
      {
        title: "German",
        info: "Just enough to survive for several days in a German language-only environment 😅 (A2)",
        level: "basic",
      },
    ],
  },
];  
