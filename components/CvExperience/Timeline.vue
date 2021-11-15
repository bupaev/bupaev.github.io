<template>
  <div class="timeline">
    <div class="jobs-wrapper">
      <div
        v-for="job in jobs"
        :key="job.company"
        :style="getJobPositionStyle(job)"
        class="job"
        @click="goToJob(job.id)"
      >
        <div class="text-wrapper">
          {{ job.position }}, <span class="has-text-weight-normal">{{ job.company }}</span>
        </div>
      </div>
    </div>
    <div class="years-wrapper">
      <div v-for="i in years" :key="i" class="year">
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script>
const startYear = 2009
const endYear = 2022
const years = Array(endYear - startYear).fill(1).map((_, i) => startYear + i)
const jobs = [
  {
    position: 'Lead Front-end developer',
    company: 'Holmusk',
    skills: 'VueJS, Vuetify, TypeScript',
    startDate: '2018-07',
    endDate: '2021-05',
    id: 'holmusk'
  },
  {
    position: 'Lead UI/Front-end developer',
    company: 'Codenetix',
    skills: 'ES6, React, Gatsby',
    startDate: '2016-11',
    endDate: '2018-07',
    id: 'codenetix'
  },
  {
    position: 'Front-end developer',
    company: 'Bandlab',
    skills: 'React, Angular, VueJS',
    startDate: '2014-09',
    endDate: '2016-10',
    id: 'bandlab'
  },
  {
    position: 'Front-end developer',
    company: 'DXC Luxoft',
    skills: 'React, Angular, VueJS',
    startDate: '2012-07',
    endDate: '2014-09',
    zIndex: 2,
    id: 'luxoft'
  },
  {
    position: 'Web developer',
    company: 'Mir IT',
    skills: 'React, Angular, VueJS',
    startDate: '2011-06',
    endDate: '2012-07',
    zIndex: 2,
    id: 'mirIt'
  },
  {
    position: 'Teaching Assistant',
    company: 'Omsk State Technical University',
    skills: 'React, Angular, VueJS',
    startDate: '2009-09',
    endDate: '2014-09',
    height: 1.6,
    id: 'omstu'
  },
  {
    position: 'Software developer',
    company: 'Freelance',
    skills: 'React, Angular, VueJS',
    startDate: '2008-08',
    endDate: '2011-06',
    id: 'freelance',
    zIndex: 1
  }
]

export default {
  name: 'Timeline',

  data () {
    return {
      jobs,
      years,
      componentWidth: 0
    }
  },

  /***
   * Algorithm is simple:
   * 1. Get width of one millisecond on timeline in pixels
   * 2. Get start/end date in millisecond
   * 3. Get start/end date in pixels
   * 4. Set position of job in pixels
   */

  computed: {
    millisecondWidth () {
      const timelineDurationInMs = new Date(endYear, 0, 1).getTime() - new Date(startYear, 0, 1).getTime()

      return this.componentWidth / timelineDurationInMs
    },

    // Need this shift for jobs cause we show year marker in the center of year DOM-element
    halfYearShift () {
      return this.componentWidth / ((endYear - startYear) * 2)
    }

  },

  mounted () {
    const resizeObserver = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      this.componentWidth = cr.width
    })

    resizeObserver.observe(this.$el)
  },

  methods: {
    getDatePosition (isoStringDate) {
      const timeFromStartInMs = new Date(isoStringDate).getTime() - new Date(startYear, 0, 1).getTime()

      return timeFromStartInMs * this.millisecondWidth
    },

    getJobPositionStyle (job) {
      const starPosition = this.getDatePosition(job.startDate)
      const width = this.getDatePosition(job.endDate) - starPosition

      return `left: ${starPosition + this.halfYearShift}px; width: ${width - 1}px; height: ${(job.height || 1) * 60}%; z-index: ${job.zIndex || 0}`
    },

    goToJob(id) {
      const jobTopOffset = document.getElementById('experience').offsetTop + document.getElementById(id).offsetTop

      window.scrollTo({
        top: jobTopOffset,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/scss/mixins";

.timeline {
  $year-height: 30px;

  position: relative;
  width: 100%;
  height: 120px;

  .jobs-wrapper {
    position: absolute;
    bottom: $year-height;
    left: 1%;
    height: calc(100% - #{$year-height});
    width: 100%;
    transform: skew(-15deg);
  }

  .job {
    position: absolute;
    bottom: 0;
    height: 100%;
    outline: 1px solid var(--text-color);
    font-size: min(1vw, 13px);
    line-height: min(1.3vw, 16px);
    font-weight: 700;
    background-color: rgba($accent-color, 0.5);
    padding: 5px 5px 5px 10px;
    cursor: pointer;
    overflow: hidden;
    transition: background-color 200ms;

    &:hover {
      background-color: $accent-color;
      color: #000;
      z-index: 3 !important;
    }

    .text-wrapper {
      transform: skew(15deg);
    }

    // @include text-contour(#fff, 1px);
  }

  .years-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    z-index: 5;

    .year {
      position: relative;
      flex: 1 0 auto;
      height: $year-height;
      border-top: 1px solid var(--text-color);
      padding-top: 2px;
      text-align: center;
      font-size: 14px;

      &::after {
        font-size: 16px;

        @include rhombus(var(--text-color));

        content: "";
        top: -4px;
        left: calc(50% - 2px);
        background-color: var(--background-color);
      }

      &:last-of-type {
        &::before {
          @include arrow(var(--text-color));

          content: "";
          border-width: 1px !important;
          transform: rotate(-135deg);
          right: 1px;
          top: 1px;
          border-radius: 0;
        }
      }
    }
  }
}
</style>
