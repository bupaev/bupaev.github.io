import type { ReactNode } from "react";

export type PolygonId = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export type KeywordInfo = {
    name: string;
    description: string;
};

export type PolygonData = {
    id: PolygonId;
    points: string;
    scaleX: number;
    scaleY: number;
    cx: number;
    cy: number;
    label: ReactNode;
    keywords: KeywordInfo[];
};

/** Polygon data for the four skill areas */
export const POLYGONS: PolygonData[] = [
    {
        id: "topLeft",
        points: "80,0 535,0 463,288 8,288",
        scaleX: 1.4,
        scaleY: 1.5,
        cx: 310,
        cy: 170,
        label: (
            <>
                Front-end
                <br />
                engineering
            </>
        ),
        keywords: [
            {
                name: "Scalable SPA Architecture",
                description: "Reflecting 15+ years of experience building complex applications (like Electronic Health Records and Audio Workstations) using modern frameworks (Vue, React, Angular).",
            },
            {
                name: "Legacy System Modernization",
                description: "Highlighting ability to refactor \"minefield\" codebases and modernize technology stacks (e.g., AEM at VHI) to industry standards.",
            },
            {
                name: "Performance Engineering",
                description: "Emphasizing expertise in optimizing high-load applications, improving Core Web Vitals, and balancing aesthetics with performance.",
            },
            {
                name: "Code Quality Guardian",
                description: "Positioning as the senior engineer who enforces rigorous standards (linting, testing, security) to prevent the \"slow decay\" of code quality in the AI era.",
            },
            {
                name: "Modern JavaScript Ecosystem",
                description: "Showcasing deep mastery of ES6+, TypeScript, and Design Patterns rather than just framework usage.",
            },
            {
                name: "Strive to good DX",
                description: "Commitment to creating excellent Developer Experience through clean APIs, comprehensive documentation, and intuitive tooling.",
            },
        ],
    },
    {
        id: "topRight",
        points: "526,35 800,35 737,288 464,288",
        scaleX: 2.2,
        scaleY: 1.6,
        cx: 610,
        cy: 170,
        label: <>Leadership</>,
        keywords: [
            {
                name: "Technical Orchestrator",
                description: "Defining the role as a leader who designs systems and \"defines the melody\" while managing AI tools and team workflows.",
            },
            {
                name: "Engineering Culture Architect",
                description: "Reflecting ability to turn a \"cacophony\" into a \"symphony\" by establishing clear processes, documentation, and shared vision.",
            },
            {
                name: "Cross-Functional Influence",
                description: "Demonstrating ability to build trust and align Design, Product, and Backend teams without relying solely on formal authority.",
            },
            {
                name: "Crisis Management",
                description: "Validating proven track record of entering chaotic environments, identifying root causes, and restoring order and trust.",
            },
            {
                name: "Trust-Based Mentorship",
                description: "Highlighting commitment to teaching and knowledge sharing to prevent the \"skill atrophy\" of junior developers.",
            },
        ],
    },
    {
        id: "bottomLeft",
        points: "52,288 463,288 411,500 0,500",
        scaleX: 1.3,
        scaleY: 1.9,
        cx: 290,
        cy: 370,
        label: <>UI/UX Design</>,
        keywords: [
            {
                name: "UX/Engineering Bridge",
                description: "Replacing the \"Unicorn\" label to describe unique ability to translate abstract design concepts into concrete, feasible technical specifications.",
            },
            {
                name: "Reasonable Perfectionist",
                description: "Personal brand signature, signifying a pragmatic commitment to the highest possible quality within resource constraints.",
            },
            {
                name: "Accessibility (WCAG) Advocate",
                description: "A critical \"human\" skill where proactively enforcing inclusivity standards that AI often overlooks.",
            },
            {
                name: "Design Systems Integration",
                description: "Demonstrating technical capability to advocate for and implement consistent visual languages across products.",
            },
            {
                name: "Human-Centric Interface Design",
                description: "Leveraging background in behavioral psychology to create intuitive spaces for both users and developers.",
            },
        ],
    },
    {
        id: "bottomRight",
        points: "459,288 725,288 676,481 411,481",
        scaleX: 2.4,
        scaleY: 2.1,
        cx: 565,
        cy: 365,
        label: <>AI expertize</>,
        keywords: [
            {
                name: "High-Leverage Engineer",
                description: "Positioning as a senior professional who uses AI as a \"force multiplier\" to increase output while maintaining high standards.",
            },
            {
                name: "Critical Systems Thinker",
                description: "Emphasizing role in validating AI output, questioning assumptions, and ensuring systemic integrity against AI \"hallucinations\".",
            },
            {
                name: "GenAI Pair Programming",
                description: "Showcasing practical competence in using tools like Copilot for code explanation, refactoring, and documentation.",
            },
            {
                name: "AI Output Validation",
                description: "Differentiating from \"code janitors\" by highlighting ability to review and validate AI-generated solutions critically.",
            },
        ],
    },
];
