import type { Job } from "../content/jobs-data";

export type RowRange = {
    startYear: number;
    endYear: number;
};

export type JobElementProps = {
    job: Job;
    style: React.CSSProperties;
    isShort: boolean;
};





export type JobRowProps = {
    jobs: Job[];
    years: number[];
    isLastRow: boolean;
    getJobStyle: (job: Job) => React.CSSProperties;
    getYearStyle: (yearIndex: number) => React.CSSProperties;
    getNowStyle: () => React.CSSProperties;
    isJobShort: (job: Job) => boolean;
};
