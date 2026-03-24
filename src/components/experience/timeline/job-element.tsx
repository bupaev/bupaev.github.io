import { useCallback } from "react";
import styles from "./timeline.module.scss";
import type { JobElementProps } from "./timeline-types";

/**
 * Calculate human-readable duration between two dates
 */
const getDuration = (start: string, end?: string) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();

    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();

    if (months <= 0) return "< 1 month";

    const years = Math.floor(months / 12);
    const extraMonths = months % 12;

    const parts = [];
    if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (extraMonths > 0) parts.push(`${extraMonths} month${extraMonths > 1 ? "s" : ""}`);

    return parts.join(", ");
};

/**
 * Scroll to the corresponding job description in the experience section
 */
const goToJob = (id?: string) => {
    if (!id) return;

    const experienceEl = document.getElementById("experience");
    const jobEl = document.getElementById(id);

    if (experienceEl && jobEl) {
        const timelineEl = experienceEl.querySelector?.<HTMLElement>("[class*='timeline']") ?? null;
        const isWidescreen = window.matchMedia("(min-width: 1216px)").matches;
        const timelineHeight = isWidescreen ? (timelineEl?.offsetHeight ?? 0) : 0;

        window.scrollTo({
            top: experienceEl.offsetTop + jobEl.offsetTop - timelineHeight,
            left: 0,
            behavior: "smooth",
        });
    }
};

export function JobElement({ job, style, isShort }: JobElementProps) {
    const classNames = [
        styles.job,
        job.isBreak ? styles.isBreak : "",
        isShort ? styles.isShort : "",
    ]
        .filter(Boolean)
        .join(" ");

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty("--x", `${x}%`);
        e.currentTarget.style.setProperty("--y", `${y}%`);
    }, []);

    const handleMouseEnter = useCallback(() => {
        if (!job.id) return;
        const elements = document.querySelectorAll(`[data-job-id="${job.id}"]`);
        elements.forEach((el) => el.classList.add("is-hovered"));
    }, [job.id]);

    const handleMouseLeave = useCallback(() => {
        if (!job.id) return;
        const elements = document.querySelectorAll(`[data-job-id="${job.id}"]`);
        elements.forEach((el) => el.classList.remove("is-hovered"));
    }, [job.id]);

    return (
        <div
            style={style}
            className={classNames}
            data-job-id={job.id}
            onClick={() => goToJob(job.id)}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            title={job.skills}
        >
            <div className={styles.jobText}>
                {job.position}
                {job.company ? "," : ""}{" "}
                <span className={styles.companyName}>{job.company}</span>
            </div>
            <span className={styles.jobDuration}>
                <span className={styles.durationText}>◆ {getDuration(job.startDate, job.endDate)}</span>
            </span>
        </div>
    );
}
