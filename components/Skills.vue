<template>
  <div class="skills container">
    <h2 class="title is-2 has-text-weight-bold">
      Skills summary
    </h2>
    <div class="content">
      <p>
        Worked with all frameworks: Angular, React, Vue.
        Last 5 years manage small team developers as lead-developer (up to 5 people).
        Have 10 years overall experience in front-end.
        Did some UX-design works.
        Successfully managed to implement code in complex areas like Web Audio API or FHIR.
        Most of my career has been in large-scale web projects which require well
        thought out UI, flexible and reliable architecture, well-documented and
        maintainable code. My latest experience TypeScript + Vue + Vuetify + Vuelidate with REST API FHIR Server.
        It has formed my development approach and <strong>the workflow:</strong>
      </p>
      <div
        class="is-flex is-flex-wrap-wrap is-justify-content-space-between pt-2"
        style="margin-left: -0.75rem;"
      >
        <div
          v-for="skillsGroup in skills"
          :key="skillsGroup.category"
          :class="['skill-group mb-3 p-3', { 'interactive-area': hasInfoInGroup(skillsGroup) }]"
        >
          <h4 class="is-size-5 has-text-weight-bold mb-4">
            {{ skillsGroup.category }}
          </h4>
          <div>
            {{ skillsGroup.info }}
          </div>
          <ul>
            <li v-for="item in skillsGroup.items" :key="item.title" class="skill-item">
              <span class="item-title">{{ item.title }}</span>
              <span v-if="item.info">
                <i class="info-icon"><img alt="icon" src="../assets/icons/info.svg"></i>
                <span class="info">{{ item.info }}</span>
              </span>
              <SkillBar :level="item.level" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkillBar from '@/components/SkillBar'

export default {
  name: 'Skills',

  components: { SkillBar },

  data () {
    return {
      skills: [
        {
          category: 'Programming/Markup languages',
          info: 'I\'m trying to use the latest features of JavaScript to make my code robust and efficient. ' +
            'My HTML/CSS skills are not ultimate but pretty well. Just few additional lines of code to check how looks 5 lines of text in the element.',
          items: [
            {
              title: 'Javascript ES6',
              level: 3
            },
            {
              title: 'TypeScript',
              level: 2
            },
            {
              title: 'CSS, SASS, JSS',
              info: 'Bootstrap, Bulma frameworks, CSS Animation, Flexbox, MediaQuery',
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
          category: 'JavaScript Frameworks and SSR',
          info: 'During my career I have worked with all main frameworks: AngularJS, React, Vue. ' +
            'Vue is my personal favorite cause it took the best from the React and AngularJS in many ways.',
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
          category: 'Browser APIs',
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
              level: 3
            },
            {
              title: 'Workers',
              info: '',
              level: 2
            }
          ]
        },
        {
          category: 'UX/UI design tools',
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
            }
          ]
        },
        {
          category: 'Back-end communication',
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
            }
          ]
        },
        {
          category: 'Infrastructure',
          items: [
            {
              title: 'Webpack',
              level: 2
            },
            {
              title: 'Git (GitHub, Gitlab, Bitbucket)',
              level: 3
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
          category: 'Code quality & optimisation',
          items: [
            {
              title: 'Unit-testing (Jest, Vue Test Utils, Mocha/Ava)',
              level: 2
            },
            {
              title: 'Linting, Formatting, Style guides',
              info: 'ESLint, StyleLint, Prettier (but it still hurts), StandardJS and Airbnb are favorite styles ',
              level: 3
            },
            {
              title: 'Documentation (JSDoc, Swagger)',
              info: '',
              level: 3
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
          category: 'Workflow & Methodology',
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
          category: 'Languages',
          items: [
            {
              title: 'Russian',
              info: 'My native language, great and powerful',
              level: 3
            },
            {
              title: 'English',
              info: 'For the last 7 years it\'s my main language at work, so I can talk freely on any professional topics',
              level: 2
            },
            {
              title: 'German',
              info: 'Just enough to survive for several days in german language-only environment :)',
              level: 1
            }
          ]
        }
      ]
    }
  },

  methods: {
    hasInfoInGroup (skillsGroup) {
      return skillsGroup.items.some(({ info }) => info)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/mixins.sass";

.skill-group {
  width: 100%;
  min-width: 100%;

  @include desktop {
    width: 49%;
    min-width: 49%;
  }

  @include fullhd {
    width: 32%;
    min-width: 32%;
  }

  .skill-item {
    line-height: 1em;
  }

  .item-title {
    line-height: 1.4em;
  }

  ul {
    margin-left: 0;
    list-style: none;

    li {
      margin-top: -0.2em;
    }
  }
}

.interactive-area {
  cursor: pointer;
  outline: 2px solid transparent;

  .info-icon {
    display: inline-block;
    overflow: hidden;
    width: 1em;
    height: 1em;
    transition: opacity 400ms 100ms;
    vertical-align: -0.18em;
    opacity: 1;

    img {
      margin-bottom: 0;
      transition: margin-bottom 500ms 100ms;
    }
  }

  .info {
    font-size: 0.9em;
    line-height: 1.2em;
    display: block;
    overflow: hidden;
    max-height: 0;
    transition: max-height 500ms linear;
  }

  &:hover {
    outline-color: rgba(0, 0, 255, 0.03);

    .info-icon {
      opacity: 0;

      img {
        margin-bottom: -0.7em;
      }
    }

    .info {
      max-height: 2.5em; // space just for 2 lines
    }
  }
}
</style>
