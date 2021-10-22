<template>
  <div class="skills container">
    <h2 class="title is-2 has-text-weight-bold">
      Skills
    </h2>
    <div class="content">
      <h3>Key points:</h3>
      <ul>
        <li>
          I have worked with most of the main modern frameworks: React, Vue, AngularJS.
          My personal favorite is Vue because for me it finds some good balance between React and AngularJS.
          But undoubtedly each framework has its strong sides and optimal field of application.
        </li>
        <li>
          I can create a feature from idea to final result: draw a wireframe and user flow based on business requirements,
          make an interactive prototype (usually directly in HTML / CSS), design an optimal API with the backend,
          implement the necessary business logic and client data model, cover with tests and documentation
        </li>
        <li>
          Managed small team developers for last five years in Agile process. In general, I like to develop software and create design more than to manage people.
        </li>
      </ul>
      <h3>Detailed list:</h3>
      <div
        class="is-flex is-flex-wrap-wrap is-justify-content-space-between"
        style="margin-left: -0.75rem;"
      >
        <SkillsSection
          v-for="skillsSection in skills"
          :key="skillsSection.title"
          class="mb-3 p-3"
          v-bind="skillsSection"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SkillsSection from '~/components/SkillsSection'

export default {
  name: 'Skills',

  components: { SkillsSection },

  data () {
    return {
      skills: [
        {
          title: 'Programming/Markup languages',
          items: [
            {
              title: 'Javascript',
              info: 'The main language for most of my career',
              level: 3
            },
            {
              title: 'TypeScript',
              info: 'Have been using TypeScript in production for the last year. Useful but sometimes troublesome thing',
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
              info: 'With Redux-Saga and JSS, but it was long ago',
              level: 1
            },
            {
              title: 'Angular 1.x',
              info: 'Are you really interested in this old monster?',
              level: 1
            },
            {
              title: 'NuxtJS',
              info: 'Make this site with Nuxt',
              level: 2
            },
            {
              title: 'Gatsby',
              info: 'Use to create my former company site',
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
              title: 'WebWorkers',
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
          title: 'Server, p2p communication',
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
              title: 'WebSockets',
              level: 1
            },
            {
              title: 'WebRTC',
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
          title: 'Code quality and performance',
          info: '',
          items: [
            {
              title: 'Linting, Formatting, Style guides',
              info: 'Usually use ESLint, StyleLint, Prettier (it hurts), StandardJS and Airbnb styles ',
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
              info: 'For the last 7 years it\'s my main language at work, so I can talk freely on any professional topics (~B2)',
              level: 2
            },
            {
              title: 'German',
              info: 'Just enough to survive for several days in german language-only environment ☺︎ (~A1)',
              level: 1
            }
          ]
        }
      ]
    }
  }
}
</script>
