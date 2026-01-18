/**
 * Structured data for the career timeline component.
 * Each job entry represents a position in the work history.
 */

export type Job = {
    position: string;
    company?: string;
    skills: string;
    startDate: string;
    endDate: string;
    id?: string;
    height?: number;
    zIndex?: number;
    isSabbatical?: boolean;
};

export const jobs: Job[] = [
    {
        position: "Software developer",
        company: "Freelance",
        skills: "C#, .NET, HTML, CSS, jQuery",
        startDate: "2008-08",
        endDate: "2011-06",
        id: "freelance",
        zIndex: 1,
    },
    {
        position: "Teaching Assistant",
        company: "Omsk State Technical University",
        skills:
            "Developing and conducting courses, conducting exams, Artificial Intelligence Systems, Control theory",
        startDate: "2009-09",
        endDate: "2014-09",
        height: 1.6,
        id: "omstu",
    },
    {
        position: "Web developer",
        company: "Mir IT",
        skills: "C#, .NET, HTML, CSS, jQuery",
        startDate: "2011-06",
        endDate: "2012-07",
        zIndex: 2,
        id: "mirIt",
    },
    {
        position: "Front-end developer",
        company: "DXC Luxoft",
        skills: "React, Angular, VueJS",
        startDate: "2012-07",
        endDate: "2014-09",
        zIndex: 2,
        id: "luxoft",
    },
    {
        position: "Front-end developer",
        company: "Bandlab",
        skills: "Angular 1.x, Web Audio API",
        startDate: "2014-09",
        endDate: "2016-10",
        id: "bandlab",
    },
    {
        position: "Lead UI/Front-end developer",
        company: "Codenetix",
        skills: "ES6, React, Gatsby, UX/UI-design",
        startDate: "2016-11",
        endDate: "2018-07",
        id: "codenetix",
    },
    {
        position: "Lead Front-end developer",
        company: "Holmusk",
        skills: "VueJS, Vuetify, TypeScript, UX-design",
        startDate: "2018-07",
        endDate: "2021-05",
        id: "holmusk",
    },
    {
        position: "Sabbatical ⛱️",
        skills: "Take a break and some NuxtJS",
        startDate: "2021-05",
        endDate: "2021-12",
        isSabbatical: true,
    },
    {
        position: "Lead Front-end engineer",
        company: "EPAM",
        skills: "HTML, SCSS, Vanilla JS, TS, Team leading, UX/UI-design",
        startDate: "2021-12",
        endDate: new Date().toISOString(),
        id: "epam",
    },
];
