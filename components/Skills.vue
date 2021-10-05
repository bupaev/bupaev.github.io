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
        class="is-flex is-flex-wrap-wrap pt-2"
        style="margin-left: -0.75rem;"
      >
        <div
          v-for="skillsGroup in skills"
          :key="skillsGroup.category"
          :class="['skill-group', 'mb-3', { 'expanded-area': hasInfoInGroup(skillsGroup) }]"
        >
          <div class="compensator-area p-3">
            <h4 class="is-size-5 mb-4">
              {{ skillsGroup.category }}
            </h4>
            <ul>
              <li v-for="item in skillsGroup.items" :key="item.title" class="skill-item">
                {{ item.title }}
                <span v-if="item.info">
                  <i class="info-icon">
                    <img alt="icon" src="../assets/icons/info-icon.svg">
                  </i>
                  <span class="info"><strong style="opacity: 0.6; font-size: 1.1em;">/</strong> {{ item.info }}</span>
                </span>
                <SkillBar :level="item.level" />
              </li>
            </ul>
          </div>
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
          category: 'JavaScript Frameworks',
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
            }
          ]
        },
        {
          category: 'Browser APIs',
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
          category: 'Soft skills',
          items: [
            {
              title: 'Communication',
              level: 3
            },
            {
              title: 'Team leading',
              level: 2
            },
            {
              title: 'Mentoring',
              level: 2
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
@import "~bulma/sass/base/_all.sass";

.info-icon {
  line-height: 1em;
  display: inline-block;
  width: 1em;
  cursor: pointer;
  vertical-align: -0.1em;
}

.skill-group {
  width: 33%;
  min-width: 33%;

  .skill-item {
    line-height: 1.1em;
  }
}

.expanded-area {
  transition: all 300ms ease;

  .compensator-area {
    transition: all 300ms ease;
    border-radius: 4px;
    background-color: white;
  }

  .info {
    font-size: 0.9em;
    display: none;
  }

  &:hover {
    z-index: 3;
    transform: scale(1.15);

    .info-icon {
      display: none;
    }

    .info {
      display: inline;
    }

    .compensator-area {
      transform: scale(0.9);
      box-shadow: 2px 2px 5px rgb(0 0 0 / 30%);
    }
  }
}
</style>
