<template>
  <div class="skills container">
    <h2 class="title is-2 has-text-weight-bold">
      Skills
    </h2>
    <div class="content">
      <p>Key points:</p>
      <ul>
        <li>Last 5 years manage small team developers as lead-developer (up to 5 people).</li>
        <li>Have 10 years overall experience in front-end.</li>
        <li>Did some UX-design works.</li>
        <li>
          Most of my career has been in large-scale web projects which require well thought out UI, flexible and reliable architecture,
          well-documented and maintainable code.
        </li>
        <li>My latest experience TypeScript + Vue + Vuetify + Vuelidate with REST API FHIR Server.</li>
      </ul>
      <div
        class="is-flex is-flex-wrap-wrap is-justify-content-space-between pt-2"
        style="margin-left: -0.75rem;"
      >
        <SkillsSection
          v-for="skillsSection in skills"
          :key="skillsSection.title"
          v-bind="skillsSection"
          class="mb-3 p-3"
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
          info: 'Javascript is my main language for most of my career. I\'m trying to use the latest features of JavaScript to make my code robust and efficient. ' +
            'My HTML/CSS skills are not ultimate but pretty well. Just few additional lines of code to check how looks 5 lines of text in the element.',
          items: [
            {
              title: 'Javascript',
              info: 'The main language for most of my career',
              level: 3
            },
            {
              title: 'TypeScript',
              info: 'Have been using TypeScript for the last two years. Useful but sometimes painful thing',
              level: 2
            },
            {
              title: 'CSS, SCSS, JSS',
              info: 'Bootstrap, Bulma frameworks, BEM, CSS Animation, Flexbox, MediaQuery',
              level: 3
            },
            {
              title: 'HTML5',
              info: 'Building cross-platform and adaptive layouts',
              level: 3
            }
          ]
        },
        {
          title: 'JavaScript Frameworks and SSR',
          info: 'I have worked with most of main modern frameworks: React, Vue, AngularJS.' +
            'My personal favorite is Vue, because for me it finds some good balance between React and AngularJS.',
          items: [
            {
              title: 'Vue',
              info: 'in stack with Vuetify and Vuelidate',
              level: 3
            },
            {
              title: 'React',
              info: 'with Redux-Saga and JSS, but it was long ago',
              level: 1
            },
            {
              title: 'Angular 1.x',
              info: 'are you really interested in this old monster?',
              level: 1
            },
            {
              title: 'NuxtJS',
              info: 'make this site with Nuxt',
              level: 2
            },
            {
              title: 'Gatsby',
              info: 'use to create my former company site',
              level: 1
            }
          ]
        },
        {
          title: 'Browser APIs',
          info: 'Modern WEB APIs are very powerful and help us to solve many problems. ' +
            'My HTML/CSS skills are not ultimate but pretty well. Just few additional lines of code to check how looks 5 lines of text in the element.',
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
              title: 'Workers',
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
              info: 'Use for creating and editing SVG icons mostly',
              level: 2
            },
            {
              title: 'Figma',
              level: 2
            },
            {
              title: 'Illustrator',
              info: 'nothing serious, mostly creating/editing SVG icons',
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
              title: 'Webpack',
              level: 2
            },
            {
              title: 'Docker',
              level: 1
            },
            {
              title: 'CI/CD (Azure, AWS, Travis, CircleCI, Gitlab Pipeline)',
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
              info: 'ESLint, StyleLint, Prettier (but it still hurts), StandardJS and Airbnb are favorite styles ',
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
