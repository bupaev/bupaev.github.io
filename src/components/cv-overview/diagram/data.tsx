import type { ReactNode } from "react";

export type PolygonId = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export type PolygonData = {
    id: PolygonId;
    points: string;
    scaleX: number;
    scaleY: number;
    cx: number;
    cy: number;
    label: ReactNode;
    keywords: string[];
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
            "Scalable SPA Architecture",
            "Legacy System Modernization",
            "Performance Engineering",
            "Code Quality Guardian",
            "Modern JavaScript Ecosystem",
            "Strive to good DX",
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
            "Technical Orchestrator",
            "Engineering Culture Architect",
            "Cross-Functional Influence",
            "Crisis Management",
            "Trust-Based Mentorship",
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
            "UX/Engineering Bridge",
            "Reasonable Perfectionist",
            "Accessibility (WCAG) Advocate",
            "Design Systems Integration",
            "Human-Centric Interface Design",
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
            "High-Leverage Engineer",
            "Critical Systems Thinker",
            "GenAI Pair Programming",
            "AI Output Validation",
        ],
    },
];
