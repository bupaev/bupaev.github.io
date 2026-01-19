import styles from "./timeline.module.scss";
import type { JobRowProps } from "./timeline-types";
import { JobElement } from "./job-element";

export function JobRow({
    jobs,
    years,
    isLastRow,
    getJobStyle,
    getYearStyle,
    getNowStyle,
    isJobShort,
}: JobRowProps) {
    return (
        <div className={styles.jobRow}>
            <div className={styles.jobsWrapper}>
                {jobs.map((job) => (
                    <JobElement
                        key={job.company || job.position}
                        job={job}
                        style={getJobStyle(job)}
                        isShort={isJobShort(job)}
                    />
                ))}
            </div>
            <div className={styles.yearsWrapper}>
                {isLastRow && <div className={styles.nowMarker} style={getNowStyle()} />}
                {years.map((year, yearIndex) => (
                    <div key={year} className={styles.year} style={getYearStyle(yearIndex)}>
                        {year}
                    </div>
                ))}
            </div>
        </div>
    );
}
