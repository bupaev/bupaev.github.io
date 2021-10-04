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
        maintainable code. My latest experience TypeScript + Vue + Vuetify + Vuevalidate with REST API FHIR Server.
        It has formed my development approach and <strong>the workflow:</strong>
      </p>
      <div class="is-flex is-flex-wrap-wrap pt-2">
        <div
          v-for="skillGroup in skills"
          :key="skillGroup.category"
          class="mb-6"
        >
          <h4 class="is-size-5 mb-2">
            {{ skillGroup.category }}
          </h4>
          <ul>
            <li v-for="item in skillGroup.items" :key="item.title">
              <span>
                {{ item.title }}
                <i class="info-icon">
                  <img src="../assets/icons/info-icon.svg" alt="icon">
                </i>
              </span>
              <div :class="`skill-bar skill-level-${item.level} mb-2`" />
            </li>
          </ul>
        </div>
      </div>
      <!--
            <ul>
              <li>
                <strong>Apps: </strong>WebStorm, Atom, Photoshop
              </li>
              <li>
                <strong>Code: </strong>HTML5, Vanilla JS, ES6, AngularJS 1.x,
                ReactJS, Lodash, SASS, CSSComb, Airbnb style guide
              </li>
              <li>
                <strong>Build</strong>: npm, Bower, Gulp, Browserify, Webpack, ESLint
              </li>
              <li>
                <strong>Test &amp; errors tracking: </strong>Mocha/AVA, TrackJS
              </li>
              <li>
                <strong>Deploy: </strong>Github, Travis, AWS
              </li>
              <li>
                <strong>Documentation: </strong>Confluence, Github Wiki, JSDoc
              </li>
              <li>
                <strong>Project tracking: </strong>JIRA, Trello
              </li>
              <li>
                <strong>Development methodology: </strong>Agile SCRUM
              </li>
            </ul>
            <p>
              <strong>Key skills in detail</strong>
              :
            </p>
            <ul>
              <li>
                <strong>Styling: </strong>CSS3 (prefer OOCSS/BEM approach),
                SASS/LESS; Frameworks: Bootstrap, Foundation
              </li>
              <li>
                <strong>Programming: </strong>JavaScript ES5/ES6, TypeScript;
                Frameworks: AngularJS, ReactJS, BackboneJS
              </li>
              <li>
                <strong>Web drawing</strong>: Canvas, SVG, d3.js
              </li>
              <li>
                <strong>Web multimedia</strong>: Web Audio API, MIDI API, WebRTC
              </li>
              <li>
                <strong>SPA essentials</strong>: IndexedDB, Local Storage, Web
                Workers, Service Workers
              </li>
            </ul>
            <p>
              <strong>Additional skills:</strong>
            </p>
            <ul>
              <li>
                <strong>Programming</strong>: C#, PHP
              </li>
              <li>
                <strong>Database</strong>: MS SQL Server, MySQL, SQLite
              </li>
              <li>
                <strong>Data analysis</strong>: Matlab, Statistica, R
              </li>
              <li>
                <strong>Multimedia</strong>: 3Ds Max, Sony Vegas, SoundForge,
                Audacity
              </li>
            </ul>
            <p>
              <strong>Communication:</strong>
            </p>
            <ul>
              <li>
                English (upper-intermediate)
              </li>
              <li>
                German (beginner)
              </li>
              <li>
                Russian (native)
              </li>
            </ul>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skills',

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
              title: 'CSS, SASS, JSS (+ Bootstrap, Bulma frameworks)',
              level: 3
            },
            {
              title: 'HTML5 (building cross-platform and adaptive layouts)',
              level: 3
            },
            {
              title: 'SVG',
              level: 2
            }
          ]
        },
        {
          category: 'JavaScript Frameworks',
          items: [
            {
              title: 'Vue (with Vuetify components library)',
              level: 3
            },
            {
              title: 'React (Redux-Saga)',
              level: 1
            },
            {
              title: 'Angular 1.x',
              level: 1
            }
          ]
        },
        {
          category: 'UX/UI design tools',
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
          category: 'Code quality',
          items: [
            {
              title: 'Unit-testing (Jest, Vue Test Utils, Ava)',
              level: 2
            },
            {
              title: 'Linting/Formatting (ESLint, SyleLint, Prettier)',
              level: 3
            },
            {
              title: 'Style guides (StandardJS, Airbnb)',
              level: 3
            },
            {
              title: 'Error tracking (TrackJS, Sentry)',
              level: 1
            },
            {
              title: 'Documentation (JSDoc, Swagger, Changelog)',
              level: 3
            },
            {
              title: 'Code review',
              level: 3
            },
            {
              title: 'Performance (Lighthouse, Chrome Performance tools)',
              level: 2
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
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/base/_all.sass";

.info-icon {
  display: inline-block;
  width: 1em;
  line-height: 1em;
  vertical-align: -0.2em;
  cursor: pointer;
}

.skill-bar {
  width: 12em;
  height: 0.5em;
  transform: skew(-15deg);
  border: 1px solid $text;

  &.skill-level-1 {
    background-image:
      repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0, rgba(0, 0, 0, 0.5) 1px, transparent 1px, transparent 4em),
      repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 1em),
      linear-gradient(90deg, darkgray 0, darkgray 34%, transparent 34%);
  }

  &.skill-level-2 {
    background-image:
      repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0, rgba(0, 0, 0, 0.5) 1px, transparent 1px, transparent 4em),
      repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 1em),
      linear-gradient(90deg, darkgray 0, darkgray 68%, transparent 68%);
  }

  &.skill-level-3 {
    // background-color: darkgray;
    background-image:
      repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0, rgba(0, 0, 0, 0.5) 1px, transparent 1px, transparent 4em),
      repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 1em),
      linear-gradient(90deg, darkgray 0, darkgray 100%);
  }
}
</style>
