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
          :class="['job', {'is-sabbatical' : job.isSabbatical}]"
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
        <div
          v-if="jobRowIndex === jobRows.length - 1"
          class="now-marker"
          :style="getNowMarkPositionStyle()"
        />
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
    endDate: '2021-12',
    isSabbatical: true
  },
  {
    position: 'Lead Front-end engineer',
    company: 'EPAM',
    skills: 'HTML, SCSS, Vanilla JS, TS, Team leading, UX/UI-design',
    startDate: '2021-12',
    endDate: new Date().toISOString(),
    id: 'epam'
  }
]
const optimalYearWidth = [110, 80]

export default {
  name: 'Timeline',

  data () {
    return {
      jobs,
      rowsRanges: [],
      jobRows: []
    }
  },

  mounted () {
    window.addEventListener('resize', () => {
      this.updateTimeline()
    })

    this.updateTimeline()
  },

  /***
   * Algorithm is simple:
   * 1. Get width of one millisecond on timeline in %
   * 2. Get start/end date in millisecond
   * 3. Get start/end date in %
   * 4. Set position of job in %
   */
  methods: {
    updateTimeline () {
      this.rowsRanges = this.getRowIntervals()
      this.jobRows = this.getJobRows()
    },

    /**
     * Return year intervals for each row of timeline
     *
     * @returns {{startYear: number, endYear: number}[]} e.g. [[2008, 2015], [2016, 2023]] or [[2008, 2011], [2012, 2015], [2016, 2019], [2020, 2023]]
     */
    getRowIntervals () {
      // Add 1 year to real date 2008-08 because otherwise we'll draw timeline from 2007-06, that creates a lot of empty space.
      // With + 1 year we draw from 2008-06
      const firstJobStartYear = new Date(jobs[0].startDate).getFullYear() + 1
      const lastJobEndDate = new Date(jobs[jobs.length - 1].endDate)
      // If last job reach end of the timeline (current year + half year) we add additional space to the right side of timeline
      const lastJobEndYear = lastJobEndDate.getFullYear() + (lastJobEndDate.getMonth() >= 5) ?? 1
      const wrapperWidth = this.$refs.timeline?.offsetWidth || 1000
      const yearMinWidth = this.$refs.timeline?.offsetWidth > 580 ? optimalYearWidth[0] : optimalYearWidth[1]
      const yearsPerLineMaxCount = Math.floor(wrapperWidth / yearMinWidth)
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
     * The timeline has to be split to equally long (in years) rows.
     * Number of rows depends on max number of years that can fit in the container width.
     *
     * @returns {[[job]]}
     */
    getJobRows () {
      return Array.from(
        { length: this.rowsRanges.length },
        (_, index) => {
          return jobs.filter((job) => {
            const jobStartYear = new Date(job.startDate).getFullYear()
            const jobEndYear = new Date(job.endDate).getFullYear()
            const rowStartYear = this.rowsRanges[index].startYear
            const rowEndYear = this.rowsRanges[index].endYear

            return (jobStartYear >= rowStartYear && jobEndYear <= rowEndYear) ||
              // Add a job that started in the previous intervals and ended it in this one.
              // Subtract one year because on a screen timeline extended by half year to both sides
              (jobStartYear <= rowStartYear - 1 && jobEndYear >= rowStartYear - 1) ||
              // Add a job that started in this interval and ended in the next ones
              (jobStartYear <= rowEndYear + 1 && jobEndYear >= rowEndYear + 1)
          })
        }
      )
    },

    /**
     * Calculate position of specific date on timeline in % based on value of iso date strings.
     * Can be linear or non-linear (non-linear scale compresses past timeline, to give more space for the latest jobs)
     *
     * @param isoStringDate i.e. 2021-10-23
     * @param rowRange {Object}
     * @returns {number} %
     */
    getDatePosition (isoStringDate, rowRange) {
      const startYearTimeInMs = new Date(rowRange.startYear, 0, 1).getTime()
      const timelineDurationInSec = (new Date(rowRange.endYear + 1, 0, 1).getTime() - startYearTimeInMs) / 1000
      const timeFromStartInSec = (new Date(isoStringDate).getTime() - startYearTimeInMs) / 1000
      const nonLinearCoefficient = 1 // 1 is for linear, to make it non-linear use value Math.sqrt(timeFromStartInSec)
      const transformedPosition = timeFromStartInSec * nonLinearCoefficient
      const secondWidthInPercent = 100 / (timelineDurationInSec * nonLinearCoefficient)

      return transformedPosition * secondWidthInPercent
    },

    getJobPositionStyle (job, jobRowIndex) {
      const rowRange = this.rowsRanges[jobRowIndex]
      const starPosition = this.getDatePosition(job.startDate, rowRange)
      const width = this.getDatePosition(job.endDate, rowRange) - starPosition
      // Need this shift for jobs because we show year marker in the center of year DOM-element
      const halfYearShift = 100 / ((rowRange.endYear - rowRange.startYear) * 2)

      return `left: ${starPosition + halfYearShift}%;
              width: calc(${width}% - 1px);
              height: ${(job.height || 1) * 60}%;
              z-index: ${job.zIndex || 0}`
    },

    getYearPositionStyle (index, jobRowIndex) {
      const rowRange = this.rowsRanges[jobRowIndex]
      const starPosition = this.getDatePosition(`${rowRange.startYear + index}-01-01`, rowRange)
      const width = this.getDatePosition(`${rowRange.startYear + index + 1}-01-01`, rowRange) - starPosition

      return `left: ${starPosition}%; width: ${width}%`
    },

    getNowMarkPositionStyle () {
      const rowRange = this.rowsRanges[this.rowsRanges.length - 1]
      const starPosition = this.getDatePosition(new Date().toISOString(), rowRange)
      const halfYearShift = 100 / ((rowRange.endYear - rowRange.startYear) * 2)

      return `left: calc(${starPosition + halfYearShift}% - 18px);`
    },

    goToJob (id) {
      if (!id) {
        return
      }

      window.scrollTo({
        top: document.getElementById('experience').offsetTop + document.getElementById(id).offsetTop,
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
      const rowsRange = this.rowsRanges[jobRowIndex]

      return Array(rowsRange.endYear - rowsRange.startYear + 1).fill(1).map((_, i) => rowsRange.startYear + i)
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
  overflow: hidden;

  // Use more space on tablet and mobile
  @media (max-width: $desktop) {
    margin-left: -0.5rem;
    margin-right: -1rem;
    width: calc(100% + 1.5rem);
  }

  .job-row {
    position: relative;
    height: 120px;
    width: 100%;
    mask-image: linear-gradient(105deg, transparent 20px, #000 50px, #000 calc(100% - 50px), transparent calc(100% - 20px));

    &:first-child {
      mask-image: linear-gradient(105deg, #000 calc(100% - 50px), transparent calc(100% - 20px));
    }

    &:last-child {
      mask-image: linear-gradient(105deg, transparent 20px, #000 50px);

      .job:last-child {
        border-right-width: 0;
      }
    }
  }

  .jobs-wrapper {
    position: absolute;
    bottom: $year-height;
    left: 1%;
    height: calc(100% - #{$year-height});
    width: 100%;
    transform: skew(-15deg);
  }

  /* stylelint-disable-next-line no-descending-specificity */
  .job {
    position: absolute;
    bottom: -1px;
    height: 100%;
    border: 1px solid var(--text-color);
    font-size: 13px;
    line-height: 1.2;
    word-break: break-word;
    font-weight: 700;
    background-color: rgba($accent-color, 0.5);
    padding: 5px 5px 5px 10px;
    cursor: pointer;
    overflow: hidden;
    transition: background-color 200ms;

    @media (max-width: $desktop) {
      font-size: 12px;
    }

    @media (max-width: $small-mobile) {
      font-size: 11px;
    }

    &.is-sabbatical {
      background-color: rgba($secondary-light-color, 0.5);

      &:hover {
        background-color: $secondary-light-color;
      }
    }

    /* stylelint-disable-next-line no-descending-specificity */
    &:hover {
      background-color: $accent-color;
      color: #000;
      z-index: 3 !important;
    }

    .job-text {
      transform: skew(15deg);
    }
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
        left: calc(50% - 4px);
        background-color: var(--background-color);
      }

      &:last-of-type {
        &::before {
          @include arrow(var(--text-color));

          content: "";
          border-width: 1px !important;
          transform: rotate(-135deg);
          right: 2px;
          top: 1px;
          border-radius: 0;
        }
      }
    }
  }

  .now-marker {
    top: -4px;
    margin-left: min(1vw, 14px); /* @TODO: Replace this hack with proper fix of Marker position */
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px var(--accent-color) solid;
    border-radius: 100%;
    background-color: var(--background-color);
    z-index: 1;

    &::after {
      content: "NOW";
      position: absolute;
      top: -30px;
      left: 0;
      transform: rotate(-75deg);
      font-size: 0.7em;
      font-weight: 700;
      color: var(--accent-color);
    }
  }
}
</style>
