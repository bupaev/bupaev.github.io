"use client";

import { useState, useLayoutEffect, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import styles from "./timeline.module.scss";
import { jobs, type Job } from "./content/jobs-data";

type RowRange = {
  startYear: number;
  endYear: number;
};

const optimalYearWidth = [110, 80];

export function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  /**
   * Return year intervals for each row of timeline.
   * Extracted as a standalone function so it can be used for initial state.
   */
  const getRowIntervals = useCallback((): RowRange[] => {
    // Add 1 year to real date 2008-08 because otherwise we'll draw timeline from 2007-06
    const firstJobStartYear = new Date(jobs[0].startDate).getFullYear() + 1;
    const lastJobEndDate = new Date(jobs[jobs.length - 1].endDate);
    // If last job reach end of the timeline (current year + half year) we add additional space
    const lastJobEndYear =
      lastJobEndDate.getFullYear() + (lastJobEndDate.getMonth() >= 5 ? 1 : 0);
    const wrapperWidth = timelineRef.current?.offsetWidth || 1000;
    const yearMinWidth =
      wrapperWidth > 580 ? optimalYearWidth[0] : optimalYearWidth[1];
    const yearsPerLineMaxCount = Math.floor(wrapperWidth / yearMinWidth);
    const totalYearsCount = lastJobEndYear - firstJobStartYear + 1;
    const linesCount = Math.ceil(totalYearsCount / yearsPerLineMaxCount);
    const yearsToShow = Math.ceil(totalYearsCount / linesCount) * linesCount;
    const yearsToShowPerLineCount = yearsToShow / linesCount;

    return Array.from({ length: linesCount }, (_, index) => {
      const lineYearStart = firstJobStartYear + index * yearsToShowPerLineCount;
      const lineYearEnd = lineYearStart + yearsToShowPerLineCount - 1;

      return {
        startYear: lineYearStart,
        endYear: lineYearEnd,
      };
    });
  }, []);

  /**
   * Split timeline to several lines if needed
   */
  const getJobRows = useCallback(
    (ranges: RowRange[]): Job[][] => {
      return Array.from({ length: ranges.length }, (_, index) => {
        return jobs.filter((job) => {
          const jobStartYear = new Date(job.startDate).getFullYear();
          const jobEndYear = new Date(job.endDate).getFullYear();
          const rowStartYear = ranges[index].startYear;
          const rowEndYear = ranges[index].endYear;

          return (
            (jobStartYear >= rowStartYear && jobEndYear <= rowEndYear) ||
            // Add a job that started in the previous intervals and ended it in this one
            (jobStartYear <= rowStartYear - 1 &&
              jobEndYear >= rowStartYear - 1) ||
            // Add a job that started in this interval and ended in the next ones
            (jobStartYear <= rowEndYear + 1 && jobEndYear >= rowEndYear + 1)
          );
        });
      });
    },
    []
  );

  // Start with empty state; populated by useLayoutEffect before first paint
  const [rowsRanges, setRowsRanges] = useState<RowRange[]>([]);
  const [jobRows, setJobRows] = useState<Job[][]>([]);

  const updateTimeline = useCallback(() => {
    const newRanges = getRowIntervals();
    setRowsRanges(newRanges);
    setJobRows(getJobRows(newRanges));
  }, [getRowIntervals, getJobRows]);

  // useLayoutEffect runs synchronously after DOM mutations but before paint.
  // This is the correct place to read refs and update state based on measurements.
  // Using flushSync explicitly signals intentional synchronous state update for layout.
  useLayoutEffect(() => {
    flushSync(() => {
      updateTimeline();
    });
    window.addEventListener("resize", updateTimeline);
    return () => window.removeEventListener("resize", updateTimeline);
  }, [updateTimeline]);

  /**
   * Calculate position of specific date on timeline in %
   */
  const getDatePosition = (isoStringDate: string, rowRange: RowRange): number => {
    const startYearTimeInMs = new Date(rowRange.startYear, 0, 1).getTime();
    const timelineDurationInSec =
      (new Date(rowRange.endYear + 1, 0, 1).getTime() - startYearTimeInMs) /
      1000;
    const timeFromStartInSec =
      (new Date(isoStringDate).getTime() - startYearTimeInMs) / 1000;
    const nonLinearCoefficient = 1; // 1 is for linear
    const transformedPosition = timeFromStartInSec * nonLinearCoefficient;
    const secondWidthInPercent =
      100 / (timelineDurationInSec * nonLinearCoefficient);

    return transformedPosition * secondWidthInPercent;
  };

  const getJobPositionStyle = (
    job: Job,
    jobRowIndex: number
  ): React.CSSProperties => {
    const rowRange = rowsRanges[jobRowIndex];
    if (!rowRange) return {};

    const startPosition = getDatePosition(job.startDate, rowRange);
    const width = getDatePosition(job.endDate, rowRange) - startPosition;
    // Need this shift for jobs because we show year marker in the center
    const halfYearShift = 100 / ((rowRange.endYear - rowRange.startYear) * 2);

    return {
      left: `${startPosition + halfYearShift}%`,
      width: `calc(${width}% - 1px)`,
      height: `${(job.height || 1) * 60}%`,
      zIndex: job.zIndex || 0,
    };
  };

  const getYearPositionStyle = (
    yearIndex: number,
    jobRowIndex: number
  ): React.CSSProperties => {
    const rowRange = rowsRanges[jobRowIndex];
    if (!rowRange) return {};

    const startPosition = getDatePosition(
      `${rowRange.startYear + yearIndex}-01-01`,
      rowRange
    );
    const width =
      getDatePosition(`${rowRange.startYear + yearIndex + 1}-01-01`, rowRange) -
      startPosition;

    return {
      left: `${startPosition}%`,
      width: `${width}%`,
    };
  };

  const getNowMarkPositionStyle = (): React.CSSProperties => {
    if (rowsRanges.length === 0) return {};

    const rowRange = rowsRanges[rowsRanges.length - 1];
    const startPosition = getDatePosition(new Date().toISOString(), rowRange);
    const halfYearShift = 100 / ((rowRange.endYear - rowRange.startYear) * 2);

    return {
      left: `calc(${startPosition + halfYearShift}% - 18px)`,
    };
  };

  const goToJob = (id?: string) => {
    if (!id) return;

    const experienceEl = document.getElementById("experience");
    const jobEl = document.getElementById(id);

    if (experienceEl && jobEl) {
      window.scrollTo({
        top: experienceEl.offsetTop + jobEl.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  /**
   * Return list of year numbers for time arrow
   */
  const getYearsMarks = (jobRowIndex: number): number[] => {
    const rowRange = rowsRanges[jobRowIndex];
    if (!rowRange) return [];

    return Array(rowRange.endYear - rowRange.startYear + 1)
      .fill(1)
      .map((_, i) => rowRange.startYear + i);
  };

  return (
    <div ref={timelineRef} className={styles.timeline}>
      {jobRows.map((jobRow, jobRowIndex) => (
        <div key={jobRowIndex} className={styles.jobRow}>
          <div className={styles.jobsWrapper}>
            {jobRow.map((job) => (
              <div
                key={job.company || job.position}
                title={job.skills}
                style={getJobPositionStyle(job, jobRowIndex)}
                className={`${styles.job} ${job.isBreak ? styles.isBreak : ""}`}
                onClick={() => goToJob(job.id)}
              >
                <div className={styles.jobText}>
                  {job.position}
                  {job.company ? "," : ""}{" "}
                  <span className="font-normal">{job.company}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.yearsWrapper}>
            {jobRowIndex === jobRows.length - 1 && (
              <div
                className={styles.nowMarker}
                style={getNowMarkPositionStyle()}
              />
            )}
            {getYearsMarks(jobRowIndex).map((year, yearIndex) => (
              <div
                key={year}
                className={styles.year}
                style={getYearPositionStyle(yearIndex, jobRowIndex)}
              >
                {year}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
