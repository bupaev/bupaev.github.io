<template>
  <div
    ref="timeline"
    class="timeline"
  >
    <div
      v-for="(jobRow, jobRowIndex) in jobRows"
      :key="jobRowIndex"
      class="job-row"
    >
      <div class="jobs-wrapper">
        <div
          v-for="job in jobRow"
          :key="job.company"
          :title="job.skills"
          :style="getJobPositionStyle(job, jobRowIndex)"
          class="job"
          @click="goToJob(job.id)"
        >
          <div class="job-text">
            {{ job.position }}{{ job.company ? ',' : '' }}
            <span class="has-text-weight-normal">{{ job.company }}</span>
          </div>
        </div>
      </div>
      <div class="years-wrapper">
        <div
          v-for="(year, yearIndex) in yearsMarks(jobRowIndex)"
          :key="year"
          class="year"
          :style="getYearPositionStyle(yearIndex, jobRowIndex)"
        >
          {{ year }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const jobs = [
  {
    position: 'Software developer',
    company: 'Freelance',
    skills: 'C#, .NET, HTML, CSS, jQuery',
    startDate: '2008-08',
    endDate: '2011-06',
    id: 'freelance',
    zIndex: 1
  },
  {
    position: 'Teaching Assistant',
    company: 'Omsk State Technical University',
    skills: 'AI',
    startDate: '2009-09',
    endDate: '2014-09',
    height: 1.6,
    id: 'omstu'
  },
  {
    position: 'Web developer',
    company: 'Mir IT',
    skills: 'C#, .NET, HTML, CSS, jQuery',
    startDate: '2011-06',
    endDate: '2012-07',
    zIndex: 2,
    id: 'mirIt'
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
    position: 'Front-end developer',
    company: 'Bandlab',
    skills: 'Angular 1.x, Web Audio API',
    startDate: '2014-09',
    endDate: '2016-10',
    id: 'bandlab'
  },
  {
    position: 'Lead UI/Front-end developer',
    company: 'Codenetix',
    skills: 'ES6, React, Gatsby, UX/UI-design',
    startDate: '2016-11',
    endDate: '2018-07',
    id: 'codenetix'
  },
  {
    position: 'Lead Front-end developer',
    company: 'Holmusk',
    skills: 'VueJS, Vuetify, TypeScript, UX-design',
    startDate: '2018-07',
    endDate: '2021-05',
    id: 'holmusk'
  },
  {
    position: 'Sabbatical ⛱️',
    skills: 'Take a break and some NuxtJS',
    startDate: '2021-05',
    endDate: '2022-01',
    id: 'sabbatical'
  },
  {
    position: 'Lead Front-end Engineer',
    company: 'EPAM',
    skills: 'HTML, SCSS, Vanilla JS, TS, team leading, UX/UI-design',
    startDate: '2022-01',
    endDate: '2023-06',
    id: 'epam'
  }
]

export default {
  name: 'Timeline',

  data () {
    return {
      jobs,
      rowIntervals: [],
      jobRows: [],
      yearWidth: 0
    }
  },

  mounted () {
    window.addEventListener('resize', () => {
      this.updateJobRows()
    })

    this.updateJobRows()
  },

  /***
   * Algorithm is simple:
   * 1. Get width of one millisecond on timeline in %
   * 2. Get start/end date in millisecond
   * 3. Get start/end date in %
   * 4. Set position of job in %
   */
  methods: {
    updateJobRows () {
      this.rowIntervals = this.getRowIntervals()
      this.jobRows = this.getJobRows()

      console.log('DEBUG: this.rowIntervals:', this.rowIntervals)
      console.log('DEBUG: this.jobRows:', this.jobRows)
    },

    /**
     * Return boundary years for each line of time
     *
     * @returns {{startYear: number, endYear: number}[]} e.g. [[2008, 2015], [2016, 2023]] or [[2008, 2011], [2012, 2015], [2016, 2019], [2020, 2023]]
     */
    getRowIntervals () {
      const firstJobStartYear = new Date(jobs[0].startDate).getFullYear() + 1
      const lastJobEndYear = new Date(jobs[jobs.length - 1].endDate).getFullYear()
      const yearMinSize = 120
      const wrapperWidth = this.$refs.timeline?.offsetWidth || 1000
      const yearsPerLineMaxCount = Math.floor(wrapperWidth / yearMinSize)
      const totalYearsCount = lastJobEndYear - firstJobStartYear + 1
      const linesCount = Math.ceil(totalYearsCount / yearsPerLineMaxCount)
      const yearsToShow = Math.ceil(totalYearsCount / linesCount) * linesCount
      const yearsToShowPerLineCount = yearsToShow / linesCount

      return Array.from(
        { length: linesCount },
        (_, index) => {
          const lineYearStart = firstJobStartYear + index * yearsToShowPerLineCount
          const lineYearEnd = lineYearStart + yearsToShowPerLineCount - 1

          return {
            startYear: lineYearStart,
            endYear: lineYearEnd
          }
        }
      )
    },
    /**
     * Split timeline to several lines if needed, based on minimal allowed year's size in px (e.g. one year has to be minimum 150px)
     *
     * Algorithm #1 - Timeline length in years depends only on max number of years that can fit in container width.
     *
     * 1. Find integer amount of years that can fit in available space (e.g. we have 1000px container,
     * if one year has to be minimum 150px, we can fit 1000/150 = 6 years to the container)
     * 2. Split jobs array to array of arrays where each subarray contains jobs inside time interval that calculated in (1),
     * by adding to first row maximum jobs that fit to the calculated time interval (e.g. find all jobs that fit to the first 6 years
     * and add them to the first line, then repeat the process for the next 6 years and so on)
     *
     * Algorithm #2 - The whole timeline has to be split to equally long lines of years,
     * that based on max number of years that can fit in container width.
     *
     * @returns {[[job]]}
     */
    getJobRows () {
      const rowIntervals = this.rowIntervals

      return Array.from(
        { length: rowIntervals.length },
        (_, index) => {
          return jobs.filter((job) => {
            const jobStartYear = new Date(job.startDate).getFullYear()
            const jobEndYear = new Date(job.endDate).getFullYear()
            const rowStartYear = rowIntervals[index].startYear
            const rowEndYear = rowIntervals[index].endYear

            return (jobStartYear >= rowStartYear && jobEndYear <= rowEndYear) ||
              // Add JOB that started in the previous intervals and ended it in this one.
              // Subtract one year because on a screen timeline extended by half year to both sides
              (jobStartYear <= rowStartYear - 1 && jobEndYear >= rowStartYear - 1) ||
              // Add JOB that started in this interval and ended in the next ones
              (jobStartYear <= rowEndYear && jobEndYear >= rowEndYear)
          })
        }
      )
    },

    /**
     * Calculate position of specific date on timeline in % based on value of iso date strings.
     * Can be linear or non-linear (non-linear scale compresses past timeline, to give more space for the latest jobs)
     *
     * @param isoStringDate i.e. 2021-10-23
     * @param timelineRange {Object}
     * @returns {number} %
     */
    getDatePosition (isoStringDate, timelineRange) {
      const nonLinearCoefficient = 1 // 1 is for linear, to make it non-linear use value Math.sqrt(timeFromStartInSec)
      const timelineDurationInSec = (new Date(timelineRange.endYear, 0, 1).getTime() - new Date(timelineRange.startYear, 0, 1).getTime()) / 1000
      const timeFromStartInSec = (new Date(isoStringDate).getTime() - new Date(timelineRange.startYear, 0, 1).getTime()) / 1000
      const transformedPosition = timeFromStartInSec * nonLinearCoefficient
      const secondWidthInPercent = 100 / (timelineDurationInSec * nonLinearCoefficient)

      return transformedPosition * secondWidthInPercent
    },

    getJobPositionStyle (job, jobRowIndex) {
      const timelineRange = this.rowIntervals[jobRowIndex]
      const starPosition = this.getDatePosition(job.startDate, timelineRange)
      const width = this.getDatePosition(job.endDate, timelineRange) - starPosition
      // Need this shift for jobs because we show year marker in the center of year DOM-element
      const halfYearShift = 100 / ((timelineRange.endYear - timelineRange.startYear) * 2)

      return `left: ${starPosition + halfYearShift}%;
              width: calc(${width}% - 1px);
              height: ${(job.height || 1) * 60}%;
              z-index: ${job.zIndex || 0}`
    },

    getYearPositionStyle (index, jobRowIndex) {
      const timelineRange = this.rowIntervals[jobRowIndex]
      const starPosition = this.getDatePosition(`${timelineRange.startYear + index}-01-01`, timelineRange)
      const width = this.getDatePosition(`${timelineRange.startYear + index + 1}-01-01`, timelineRange) - starPosition

      return `left: ${starPosition}%; width: ${width}%`
    },

    goToJob (id) {
      const jobTopOffset = document.getElementById('experience').offsetTop + document.getElementById(id).offsetTop

      window.scrollTo({
        top: jobTopOffset,
        left: 0,
        behavior: 'smooth'
      })
    },

    /**
     * Return list of year numbers for time arrow based on job years
     *
     * @param jobRowIndex {number}
     * @returns {[number]} - i.e. [2008, 2009, 2011, 2012]
     */
    yearsMarks (jobRowIndex) {
      const timelineRange = this.rowIntervals[jobRowIndex]
      const marks = Array(timelineRange.endYear - timelineRange.startYear + 1).fill(1).map((_, i) => timelineRange.startYear + i)
      return marks
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/scss/mixins";

.timeline {
  $year-height: 30px;

  position: relative;
  background: rgba(red, 0.05);
  width: 100%;

  .job-row {
    position: relative;
    height: 120px;
    width: 100%;
  }

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
    bottom: -1px;
    height: 100%;
    border: 1px solid var(--text-color);
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

    .job-text {
      transform: skew(15deg);
    }

    // @include text-contour(#fff, 1px);
  }

  .years-wrapper {
    position: absolute;
    bottom: 30px;
    width: 100%;
    // display: flex;
    // flex-wrap: nowrap;
    z-index: 5;

    .year {
      top: 0;
      position: absolute;
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
