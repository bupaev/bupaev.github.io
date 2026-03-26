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
        title: "UX Design & Prototyping",
        level: "expert",
      },
      {
        title: "Design Systems",
        level: "advanced",
      },
      {
        title: "Web accessibility (WCAG 2.2, a11y)",
        info: "Strict accessibility compliance, semantic markup",
        level: "advanced",
      },
      {
        title: "Figma",
        level: "expert",
      },
      {
        title: "Lightroom / Photoshop",
        level: "expert",
      }
    ],
  },
  {
    title: "Backend & Server Communication",
    items: [
      {
        title: "REST API Design & Architecture",
        info: "Architecting scalable endpoints and consuming services via Axios/Fetch",
        level: "expert",
      },
      {
        title: "GraphQL",
        level: "advanced",
      },
      {
        title: "Node.js, Express",
        level: "basic",
      },
      {
        title: "Databases (MySQL, MS SQL, MongoDB)",
        info: "",
        level: "basic",
      },
      {
        title: "FHIR API",
        level: "advanced",
      },
    ],
  },
  {
    title: "Code quality and performance",
    items: [
      {
        title: "Linting, Formatting, Style guides",
        info: "Automated linting, formatting, and shared conventions (ESLint, Prettier, Airbnb styles)",
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
        title: "Code Review",
        info: "Establishing rigorous review protocols, quality gates, and engineering culture across multiple teams",
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
        level: "expert",
      },
      {
        title: "SPA / SSR / SSG",
        level: "expert",
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
        level: "expert",
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
        title: "AI Pair Programming",
        level: "expert",
      },
      {
        title: "Claude Code, Gemini, OpenAI Codex",
        info: "AI Pair Programming, codebase analysis, and architecture exploration",
        level: "expert",
      },
      {
        title: "AI Agents Design and Integration",
        level: "basic",
      },
      {
        title: "Antigravity",
        info: "AI Agent for automated coding and workflow acceleration",
        level: "expert",
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
        title: "CI/CD (GitHub Actions, Gitlab CI, Jenkins)",
        level: "advanced",
      },
      {
        title: "Enterprise CMS (Adobe Experience Manager)",
        level: "advanced",
      },
      {
        title: "Docker",
        level: "basic",
      },
    ],
  },
  {
    title: "Leadership & Methodology",
    items: [
      {
        title: "Technical Leadership",
        level: "expert",
      },
      {
        title: "Ownership & Critical Thinking",
        level: "expert",
      },
      {
        title: "Team mentoring",
        level: "expert",
      },
      {
        title: "Technical Interviewing",
        level: "advanced",
      },
      {
        title: "Agile SCRUM/KANBAN",
        level: "advanced",
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
        title: "D3.js, Three.js",
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
        info: "Enough for basic communication (A2)",
        level: "basic",
      },
    ],
  },
];  
