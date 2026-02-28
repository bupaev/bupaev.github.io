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
        title: "CSS/SCSS",
        info: "Key points: Atomic and BEM, Flexbox, Grids, CSS Animation",
        level: 3,
      },
      {
        title: "HTML5",
        info: "Key points: Semantic markup, accessibility, native controls",
        level: 3,
      },
    ],
  },
  {
    title: "JavaScript (Meta-)Frameworks",
    items: [
      {
        title: "React",
        info: "With Redux-Saga and JSS, but the last React version I used was 16.3",
        level: 3,
      },
      {
        title: "Vue",
        info: "Standard stack (Vuex and Vue Router) plus TypeScript, Vuetify and Vuelidate",
        level: 2,
      },
      {
        title: "AngularJS 1.x",
        info: "",
        level: 1,
      },
      {
        title: "NextJS",
        info: "",
        level: 2,
      },
      {
        title: "Astro",
        info: "",
        level: 2,
      },
      {
        title: "NuxtJS",
        info: "",
        level: 1,
      }
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
    title: "UX/UI design tools",
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
    title: "Infrastructure",
    items: [
      {
        title: "Git (GitHub, Gitlab, Bitbucket)",
        level: 2,
      },
      {
        title: "Bundling/Automation (Webpack, gulp)",
        level: 2,
      },
      {
        title: "CI/CD (Azure, AWS, Travis, CircleCI, Gitlab Pipeline)",
        level: 1,
      },
      {
        title: "Virtualization (Docker, VMware Workstation)",
        level: 1,
      },
    ],
  },
  {
    title: "Server communication",
    items: [
      {
        title: "REST API",
        level: 3,
      },
      {
        title: "GraphQL",
        level: 1,
      },
      {
        title: "WebSocket",
        level: 1,
      },
    ],
  },
  {
    title: "Code quality and performance",
    items: [
      {
        title: "Linting, Formatting, Style guides",
        info: "I usually use ESLint, StyleLint, Prettier (it hurts), StandardJS and Airbnb styles",
        level: 3,
      },
      {
        title: "Unit-testing (Jest, Vue Test Utils, Mocha/Ava)",
        level: 2,
      },
      {
        title: "Documentation (JSDoc, Swagger)",
        info: "",
        level: 2,
      },
      {
        title: "Code review",
        level: 3,
      },
      {
        title: "Web page performance",
        info: "PageSpeed, Lighthouse, Chrome Performance tools",
        level: 2,
      },
    ],
  },
  {
    title: "Workflow & Methodology",
    items: [
      {
        title: "Agile SCRUM/KANBAN",
        level: 2,
      },
      {
        title: "JIRA",
        level: 2,
      },
      {
        title: "Confluence",
        level: 2,
      },
      {
        title: "Trello",
        level: 1,
      },
    ],
  },
  {
    title: "Languages",
    items: [
      {
        title: "Russian",
        info: "My native language",
        level: 3,
      },
      {
        title: "English",
        info: "It's been my working language for the last seven years (~B2)",
        level: 2,
      },
      {
        title: "German",
        info: "Just enough to survive for several days in the German language-only environment ☺︎ (~A1)",
        level: 1,
      },
    ],
  },
];
