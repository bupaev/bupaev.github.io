<template>
  <div class="skills container">
    <h2 class="title is-2 has-text-weight-bold">
      Skills
    </h2>
    <div class="content">
      <h3>What I can do:</h3>
      <ul>
        <li>
          develop and maintain complex web apps with modern JS frameworks (preferably Vue, but I have worked with React and AngularJS too)
        </li>
        <li>
          create reasonably pixel-perfect, adaptive, rich-media web interfaces with a nontrivial design
        </li>
        <li>
          make wireframes and user flows based on business requirements, create interactive HTML prototypes
        </li>
        <li>
          manage a small team of developers in Agile process. However, I prefer coding and UX design more
        </li>
      </ul>
      <h3>Detailed list:</h3>
      <div
        class="is-flex is-flex-wrap-wrap is-justify-content-space-between"
        style="margin-left: -0.75rem; margin-bottom: -1.5rem;"
      >
        <SkillsGroup
          v-for="SkillsGroup in skills"
          :key="SkillsGroup.title"
          class="mb-3 p-3"
          v-bind="SkillsGroup"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SkillsGroup from '@/components/CvSkills/SkillsGroup'

export default {
  name: 'Skills',

  components: { SkillsGroup },

  data () {
    return {
      skills: [
        {
          title: 'Programming/Markup languages',
          items: [
            {
              title: 'Javascript',
              info: 'The main language I work with ⭐︎',
              level: 3
            },
            {
              title: 'TypeScript',
              info: 'Have been using TypeScript in production for a year',
              level: 2
            },
            {
              title: 'CSS, SCSS, LESS, JSS',
              info: 'Key points: Bootstrap and Bulma, Atomic and BEM, Flexbox, CSS Animation',
              level: 3
            },
            {
              title: 'HTML5',
              info: 'Key points: Semantic markup, accessibility, native controls',
              level: 3
            }
          ]
        },
        {
          title: 'JavaScript Frameworks and SSR',
          items: [
            {
              title: 'Vue',
              info: 'Standard stack (Vuex and Vue Router) plus TypeScript, Vuetify and Vuelidate',
              level: 3
            },
            {
              title: 'React',
              info: 'With Redux-Saga and JSS, but the last React version I used was 16.3',
              level: 1
            },
            {
              title: 'AngularJS 1.x',
              info: '',
              level: 1
            },
            {
              title: 'NuxtJS',
              info: '',
              level: 2
            },
            {
              title: 'Gatsby',
              info: '',
              level: 1
            }
          ]
        },
        {
          title: 'Browser APIs',
          items: [
            {
              title: 'Web Audio (Web Audio API, MIDI API)',
              info: '',
              level: 3
            },
            {
              title: 'Web Graphics (SVG, Canvas)',
              info: '',
              level: 2
            },
            {
              title: 'Data Storage (Local Storage, IndexedDB)',
              info: '',
              level: 2
            },
            {
              title: 'Web Worker',
              info: '',
              level: 2
            }
          ]
        },
        {
          title: 'UX/UI design tools',
          items: [
            {
              title: 'Photoshop',
              level: 2
            },
            {
              title: 'Figma',
              level: 2
            },
            {
              title: 'Illustrator',
              level: 1
            },
            {
              title: 'Balsamiq',
              level: 1
            }
          ]
        },
        {
          title: 'Infrastructure',
          info: '',
          items: [
            {
              title: 'Git (GitHub, Gitlab, Bitbucket)',
              level: 2
            },
            {
              title: 'Bundling/Automation (Webpack, gulp)',
              level: 2
            },
            {
              title: 'CI/CD (Azure, AWS, Travis, CircleCI, Gitlab Pipeline)',
              level: 1
            },
            {
              title: 'Virtualization (Docker, VMware Workstation)',
              level: 1
            }
          ]
        },
        {
          title: 'Server communication',
          items: [
            {
              title: 'REST API',
              level: 3
            },
            {
              title: 'GraphQL',
              level: 1
            },
            {
              title: 'WebSocket',
              level: 1
            }/* ,
            {
              title: 'WebRTC',
              level: 1
            } */
          ]
        },
        {
          title: 'Code quality and performance',
          info: '',
          items: [
            {
              title: 'Linting, Formatting, Style guides',
              info: 'I usually use ESLint, StyleLint, Prettier (it hurts), StandardJS and Airbnb styles ',
              level: 3
            },
            {
              title: 'Unit-testing (Jest, Vue Test Utils, Mocha/Ava)',
              level: 2
            },
            {
              title: 'Documentation (JSDoc, Swagger)',
              info: '',
              level: 2
            },
            {
              title: 'Code review',
              level: 3
            },
            {
              title: 'Web page performance',
              info: 'PageSpeed, Lighthouse, Chrome Performance tools',
              level: 2
            }/* ,
            {
              title: 'Error tracking (TrackJS, Sentry)',
              info: '',
              level: 2
            } */
          ]
        },
        {
          title: 'Workflow & Methodology',
          items: [
            {
              title: 'Agile SCRUM/KANBAN',
              level: 2
            },
            {
              title: 'JIRA',
              level: 2
            },
            {
              title: 'Confluence',
              level: 2
            },
            {
              title: 'Trello',
              level: 1
            }
          ]
        },
        {
          title: 'Languages',
          items: [
            {
              title: 'Russian',
              info: 'My native language',
              level: 3
            },
            {
              title: 'English',
              info: 'It\'s been my working language for the last seven years (~B2)',
              level: 2
            },
            {
              title: 'German',
              info: 'Just enough to survive for several days in the German language-only environment ☺︎ (~A1)',
              level: 1
            }
          ]
        }
      ]
    }
  }
}
</script>
