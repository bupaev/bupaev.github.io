<template>
  <div class="timeline">
    <div class="jobs-wrapper">
      <div
        v-for="job in jobs"
        :key="job.company"
        :style="getJobPositionStyle(job)"
        class="job"
      >
        <span>{{ job.position }}</span>
        /
        <span>{{ job.company }}</span>
        <div class="has-text-weight-normal is-hidden">
          {{ job.skills }}
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

export default {
  name: 'Timeline',

  /***
   * Algorithm is simple:
   * 1. Get width of one millisecond on timeline in pixels
   * 2. Get start/end date in millisecond
   * 3. Get start/end date in pixels
   * 4. Set position of job in pixels
   */

  data () {
    return {
      years: Array(endYear - startYear).fill(1).map((_, i) => startYear + i),
      jobs: [
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
          position: 'Assistant Teacher',
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
    }
  },

  computed: {
    millisecondWidth () {
      const timelineDurationInMs = new Date(endYear, 0, 1).getTime() - new Date(startYear, 0, 1).getTime()

      if (this.$el) {
        return this.$el.clientWidth / timelineDurationInMs
      } else {
        return 1
      }
    }
  },

  mounted () {
    // this.getDatePosition(this.jobs[0].startDate)
  },

  methods: {
    getDatePosition (isoStringDate) {
      const timeFromStartInMs = new Date(isoStringDate).getTime() - new Date(startYear, 0, 1).getTime()

      return timeFromStartInMs * this.millisecondWidth
    },

    getJobPositionStyle (job) {
      const starPosition = this.getDatePosition(job.startDate)
      const width = this.getDatePosition(job.endDate) - starPosition

      // Need shift cause we show year marker in the center of year DOM-element
      const halfYearShift = this.millisecondWidth * 1000 * 3600 * 24 * 365 / 2

      return `left: ${starPosition + halfYearShift}px; width: ${width}px; height: ${(job.height || 1) * 50}px; z-index: ${job.zIndex || 0}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/mixins.sass";
@import "assets/scss/mixins.scss";

.timeline {
  $year-height: 30px;

  position: relative;
  width: 100%;
  height: 130px;
  font-size: 12px;

  .jobs-wrapper {
    position: absolute;
    bottom: $year-height;
  }

  .job {
    position: absolute;
    bottom: 0;
    height: 100px;
    border: 1px solid black;
    border-bottom-width: 0;
    font-weight: 700;
    background-color: rgba(gold, 0.4);
    // background-image: repeating-linear-gradient(135deg, rgba(#000, 0.2) 0, rgba(#000, 0.2) 1px, transparent 1px, transparent 10px);
    padding: 5px 10px;
    overflow: hidden;

    // @include text-contour(#fff, 1px);
  }

  .years-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;

    .year {
      position: relative;
      flex: 1 0 auto;
      height: $year-height;
      border-top: 1px solid black;
      text-align: center;

      &::after {
        @include rhombus;

        content: "";
        top: -4px;
        left: calc(50% - 2px);
        background-color: #fff;
      }

      &:last-of-type {
        &::before {
          @include arrow(black);

          content: "";
          border-width: 1px !important;
          transform: rotate(-135deg);
          right: 0;
          top: 2px;
          border-radius: 0;
        }
      }
    }
  }
}
</style>
