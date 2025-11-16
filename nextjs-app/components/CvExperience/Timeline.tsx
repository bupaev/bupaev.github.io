'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import styles from './Timeline.module.scss'

interface Job {
  position: string
  company?: string
  skills: string
  startDate: string
  endDate: string
  id?: string
  zIndex?: number
  height?: number
  isSabbatical?: boolean
}

const jobs: Job[] = [
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
    skills: 'Developing and conducting courses, conducting exams, Artificial Intelligence Systems, Control theory',
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

interface RowRange {
  startYear: number
  endYear: number
}

export default function Timeline() {
  const [rowsRanges, setRowsRanges] = useState<RowRange[]>([])
  const [jobRows, setJobRows] = useState<Job[][]>([])
  const timelineRef = useRef<HTMLDivElement>(null)

  const getRowIntervals = (): RowRange[] => {
    const firstJobStartYear = new Date(jobs[0].startDate).getFullYear() + 1
    const lastJobEndDate = new Date(jobs[jobs.length - 1].endDate)
    const lastJobEndYear = lastJobEndDate.getFullYear() + (lastJobEndDate.getMonth() >= 5 ? 1 : 0)
    const wrapperWidth = timelineRef.current?.offsetWidth || 1000
    const yearMinWidth = wrapperWidth > 580 ? optimalYearWidth[0] : optimalYearWidth[1]
    const yearsPerLineMaxCount = Math.floor(wrapperWidth / yearMinWidth)
    const totalYearsCount = lastJobEndYear - firstJobStartYear + 1
    const linesCount = Math.ceil(totalYearsCount / yearsPerLineMaxCount)
    const yearsToShow = Math.ceil(totalYearsCount / linesCount) * linesCount
    const yearsToShowPerLineCount = yearsToShow / linesCount

    return Array.from({ length: linesCount }, (_, index) => {
      const lineYearStart = firstJobStartYear + index * yearsToShowPerLineCount
      const lineYearEnd = lineYearStart + yearsToShowPerLineCount - 1

      return {
        startYear: lineYearStart,
        endYear: lineYearEnd
      }
    })
  }

  const getJobRows = (ranges: RowRange[]): Job[][] => {
    return Array.from({ length: ranges.length }, (_, index) => {
      return jobs.filter((job) => {
        const jobStartYear = new Date(job.startDate).getFullYear()
        const jobEndYear = new Date(job.endDate).getFullYear()
        const rowStartYear = ranges[index].startYear
        const rowEndYear = ranges[index].endYear

        return (jobStartYear >= rowStartYear && jobEndYear <= rowEndYear) ||
          (jobStartYear <= rowStartYear - 1 && jobEndYear >= rowStartYear - 1) ||
          (jobStartYear <= rowEndYear + 1 && jobEndYear >= rowEndYear + 1)
      })
    })
  }

  const updateTimeline = () => {
    const ranges = getRowIntervals()
    setRowsRanges(ranges)
    setJobRows(getJobRows(ranges))
  }

  useEffect(() => {
    updateTimeline()
    window.addEventListener('resize', updateTimeline)
    return () => window.removeEventListener('resize', updateTimeline)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDatePosition = (isoStringDate: string, rowRange: RowRange): number => {
    const startYearTimeInMs = new Date(rowRange.startYear, 0, 1).getTime()
    const timelineDurationInSec = (new Date(rowRange.endYear + 1, 0, 1).getTime() - startYearTimeInMs) / 1000
    const timeFromStartInSec = (new Date(isoStringDate).getTime() - startYearTimeInMs) / 1000
    const nonLinearCoefficient = 1
    const transformedPosition = timeFromStartInSec * nonLinearCoefficient
    const secondWidthInPercent = 100 / (timelineDurationInSec * nonLinearCoefficient)

    return transformedPosition * secondWidthInPercent
  }

  const getJobPositionStyle = (job: Job, jobRowIndex: number): CSSProperties => {
    const rowRange = rowsRanges[jobRowIndex]
    const starPosition = getDatePosition(job.startDate, rowRange)
    const width = getDatePosition(job.endDate, rowRange) - starPosition
    const halfYearShift = 100 / ((rowRange.endYear - rowRange.startYear) * 2)

    return {
      left: `${starPosition + halfYearShift}%`,
      width: `calc(${width}% - 1px)`,
      height: `${(job.height || 1) * 60}%`,
      zIndex: job.zIndex || 0
    }
  }

  const getYearPositionStyle = (index: number, jobRowIndex: number): CSSProperties => {
    const rowRange = rowsRanges[jobRowIndex]
    const starPosition = getDatePosition(`${rowRange.startYear + index}-01-01`, rowRange)
    const width = getDatePosition(`${rowRange.startYear + index + 1}-01-01`, rowRange) - starPosition

    return {
      left: `${starPosition}%`,
      width: `${width}%`
    }
  }

  const getNowMarkPositionStyle = (): CSSProperties => {
    const rowRange = rowsRanges[rowsRanges.length - 1]
    const starPosition = getDatePosition(new Date().toISOString(), rowRange)
    const halfYearShift = 100 / ((rowRange.endYear - rowRange.startYear) * 2)

    return {
      left: `calc(${starPosition + halfYearShift}% - 18px)`
    }
  }

  const goToJob = (id?: string) => {
    if (!id) {
      return
    }

    const experienceElement = document.getElementById('experience')
    const jobElement = document.getElementById(id)
    if (experienceElement && jobElement) {
      window.scrollTo({
        top: experienceElement.offsetTop + jobElement.offsetTop,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  const yearsMarks = (jobRowIndex: number): number[] => {
    const rowsRange = rowsRanges[jobRowIndex]
    return Array(rowsRange.endYear - rowsRange.startYear + 1).fill(1).map((_, i) => {
      return rowsRange.startYear + i
    })
  }

  return (
    <div ref={timelineRef} className={styles.timeline}>
      {jobRows.map((jobRow, jobRowIndex) => (
        <div key={jobRowIndex} className={styles['job-row']}>
          <div className={styles['jobs-wrapper']}>
            {jobRow.map(job => (
              <div
                key={job.company || job.position}
                title={job.skills}
                style={getJobPositionStyle(job, jobRowIndex)}
                className={`${styles.job} ${job.isSabbatical ? styles['is-sabbatical'] : ''}`}
                onClick={() => goToJob(job.id)}
              >
                <div className={styles['job-text']}>
                  {job.position}{job.company ? ',' : ''}{' '}
                  <span className="has-text-weight-normal">{job.company}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles['years-wrapper']}>
            {jobRowIndex === jobRows.length - 1 && (
              <div
                className={styles['now-marker']}
                style={getNowMarkPositionStyle()}
              />
            )}
            {yearsMarks(jobRowIndex).map((year, yearIndex) => {
              return (
              <div
                key={year}
                className={styles.year}
                style={getYearPositionStyle(yearIndex, jobRowIndex)}
              >
                {year}
              </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
