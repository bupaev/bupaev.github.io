import { ReactNode } from "react";

export interface PolygonData {
    id: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
    points: string;
    scaleX: number;
    scaleY: number;
    cx: number;
    cy: number;
    label: ReactNode;
    keywords: string[];
}

/** Polygon data for the four skill areas */
export const POLYGONS: PolygonData[] = [
    {
        id: "topLeft",
        points: "80,0 535,0 463,288 8,288",
        scaleX: 1.52,
        scaleY: 1.74,
        cx: 271,
        cy: 144,
        label: (
            <>
                Front - end
                < br />
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
        scaleX: 2.38,
        scaleY: 1.98,
        cx: 632,
        cy: 162,
        label: <>Leadership </>,
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
        scaleX: 1.73,
        scaleY: 2.36,
        cx: 232,
        cy: 394,
        label: <>UI / UX Design</>,
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
        points: "459,288 709,288 660,481 411,481",
        scaleX: 2.68,
        scaleY: 2.59,
        cx: 560,
        cy: 385,
        label: <>AI expertize </>,
        keywords: [
            "High-Leverage Engineer",
            "Critical Systems Thinker",
            "GenAI Pair Programming",
            "AI Output Validation",
        ],
    },
];

export type PolygonId = (typeof POLYGONS)[number]["id"] | null;
